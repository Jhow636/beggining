import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useCallback,
  useMemo, // Importe useMemo
} from "react";
import { auth, db } from "@config/firebase.client";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  User as FirebaseUser, // Renomeie para evitar conflito com 'user' state
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  Timestamp,
} from "firebase/firestore";

// --- NOVAS INTERFACES ---

interface UserProfileData {
  uid: string;
  email: string;
  fullName: string;
  username: string;
  createdAt: Timestamp; // Usar Timestamp do Firestore
  achievements_earned?: string[]; // IDs das conquistas que o usuário já ganhou
  progress?: {
    logins_count?: number;
    lessons_completed_count?: number;
    basic_lessons_read?: number;
    // Adicione outras métricas de progresso conforme necessário
    [key: string]: number | undefined; // Para permitir chaves dinâmicas no progresso
  };
}

interface AchievementDefinition {
  id: string;
  name: string;
  description: string;
  iconUrl?: string; // URL para o ícone da conquista
  type: string; // Tipo de critério (ex: "login", "lessons_completed", "category_completed")
  criteria: {
    // Defina a estrutura dos critérios específicos para cada tipo
    logins_required?: number;
    lessons_count?: number;
    category?: string;
    total_items?: number;
    // ... outros critérios
  };
}

// --- INTERFACE DO CONTEXTO DE AUTENTICAÇÃO ---

interface AuthContextType {
  user: FirebaseUser | null; // Usar a tipagem do Firebase
  userProfile: UserProfileData | null;
  loading: boolean;
  registrationData: {
    fullName: string;
    username: string;
    email: string;
    password: string;
  };
  updateRegistrationData: (newData: {
    fullName?: string;
    username?: string;
    email?: string;
    password?: string;
  }) => void;

  handleFinalRegister: (data: {
    fullName: string;
    username: string;
    email: string;
    password: string;
  }) => Promise<{ success: boolean; user?: FirebaseUser; error?: any }>; // Use FirebaseUser
  loginUser: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; user?: FirebaseUser; error?: any }>; // Use FirebaseUser
  logoutUser: () => Promise<{ success: boolean; error?: any }>;
  sendPasswordReset: (
    email: string
  ) => Promise<{ success: boolean; error?: any; code?: string }>;
  getUserProfile: (uid: string) => Promise<UserProfileData | null>;
  isNewRegistration: boolean;
  clearNewRegistrationFlag: () => void;
  // --- NOVAS FUNÇÕES PARA CONQUISTAS ---
  updateUserProgress: (metric: string, value: number) => Promise<void>;
  checkAndGrantAchievements: (
    profileToCheck?: UserProfileData
  ) => Promise<void>;
  getAllAchievementDefinitions: () => Promise<AchievementDefinition[]>;
  allAchievementDefinitions: AchievementDefinition[];
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNewRegistration, setIsNewRegistration] = useState(false);
  const [allAchievementDefinitions, setAllAchievementDefinitions] = useState<
    AchievementDefinition[]
  >([]);

  const [registrationData, setRegistrationData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const updateRegistrationData = useCallback(
    (newData: {
      fullName?: string;
      username?: string;
      email?: string;
      password?: string;
    }) => {
      setRegistrationData((prevData) => ({ ...prevData, ...newData }));
    },
    []
  );

  const sendPasswordReset = useCallback(async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log(
        "[sendPasswordReset] E-mail de redefinição de senha enviado para:",
        email
      );
      return { success: true };
    } catch (error: any) {
      console.error(
        "[sendPasswordReset] Erro ao enviar e-mail de redefinição de senha:",
        error.code,
        error.message
      );
      return { success: false, error: error.message, code: error.code };
    }
  }, []);

  const getUserProfile = useCallback(
    async (uid: string): Promise<UserProfileData | null> => {
      console.log(`[getUserProfile] Tentando obter perfil para UID: ${uid}`);
      try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as UserProfileData;
          console.log("[getUserProfile] Dados do perfil obtidos:", data);
          return data;
        } else {
          console.log(
            "[getUserProfile] Nenhum perfil de usuário encontrado para o UID:",
            uid
          );
          return null;
        }
      } catch (error: any) {
        console.error(
          "[getUserProfile] Erro ao obter perfil do usuário:",
          error.code,
          error.message
        );
        return null;
      }
    },
    []
  );

  console.log(
    allAchievementDefinitions.length,
    "definições de conquistas carregadas."
  );

  const logoutUser = useCallback(async (): Promise<{
    success: boolean;
    error?: any;
  }> => {
    console.log("[logoutUser] Tentando deslogar usuário.");
    try {
      await signOut(auth);
      setUser(null);
      setUserProfile(null);
      setIsNewRegistration(false);
      console.log("[logoutUser] Usuário deslogado com sucesso.");
      return { success: true };
    } catch (error: any) {
      console.error("[logoutUser] Erro ao deslogar:", error);
      return { success: false, error: error.message, code: error.code };
    }
  }, []);

  // --- NOVAS FUNÇÕES DE CONQUISTAS E PROGRESSO ---

  const getAllAchievementDefinitions = useCallback(async (): Promise<
    AchievementDefinition[]
  > => {
    console.log(
      "[getAllAchievementDefinitions] Tentando carregar definições de conquistas."
    );
    try {
      const querySnapshot = await getDocs(
        collection(db, "achievements_definitions")
      );
      const definitions: AchievementDefinition[] = [];
      querySnapshot.forEach((doc) => {
        definitions.push({
          id: doc.id,
          ...(doc.data() as AchievementDefinition),
        });
      });
      console.log(
        "[getAllAchievementDefinitions] Definições de conquistas carregadas:",
        definitions.length,
        definitions
      );
      setAllAchievementDefinitions(definitions);
      return definitions;
    } catch (error) {
      console.error(
        "[getAllAchievementDefinitions] Erro ao obter definições de conquistas:",
        error
      );
      return [];
    }
  }, []);

  const checkAndGrantAchievements = useCallback(
    async (profileToCheck?: UserProfileData) => {
      const activeUserProfile = profileToCheck || userProfile;

      console.log(
        "[checkAndGrantAchievements] Iniciando verificação de conquistas."
      );
      console.log(
        "[checkAndGrantAchievements] Usuário atual:",
        user?.uid || "NULO"
      );
      console.log(
        "[checkAndGrantAchievements] Perfil sendo verificado:",
        activeUserProfile
          ? {
              uid: activeUserProfile.uid,
              progress: activeUserProfile.progress,
              earned: activeUserProfile.achievements_earned,
            }
          : "NULO"
      );
      console.log(
        "[checkAndGrantAchievements] Definições de conquistas carregadas:",
        allAchievementDefinitions.length
      );

      if (!user || !activeUserProfile || !allAchievementDefinitions.length) {
        console.log(
          "[checkAndGrantAchievements] Condição inicial não atendida (usuário, perfil ou definições ausentes). Retornando."
        );
        return;
      }

      const achievementsToGrant: string[] = [];
      const currentEarned = activeUserProfile.achievements_earned || [];
      console.log(
        "[checkAndGrantAchievements] Conquistas já ganhas pelo perfil:",
        currentEarned
      );

      allAchievementDefinitions.forEach((achievement) => {
        console.log(
          `[checkAndGrantAchievements] Verificando conquista: ${achievement.id} (Tipo: ${achievement.type})`
        );
        if (currentEarned.includes(achievement.id)) {
          console.log(
            `[checkAndGrantAchievements] Conquista ${achievement.id} já ganha. Pulando.`
          );
          return;
        }

        let criteriaMet = false;

        switch (achievement.type) {
          case "login":
            console.log(
              `[checkAndGrantAchievements] Tipo 'login'. Progresso de logins: ${
                activeUserProfile.progress?.logins_count || 0
              }, Requerido: ${achievement.criteria.logins_required || 0}`
            );
            if (
              activeUserProfile.progress?.logins_count &&
              activeUserProfile.progress.logins_count >=
                (achievement.criteria.logins_required || 0)
            ) {
              criteriaMet = true;
              console.log(
                `[checkAndGrantAchievements] Critério para '${achievement.id}' (login) ATENDIDO.`
              );
            }
            break;
          case "lessons_completed":
            console.log(
              `[checkAndGrantAchievements] Tipo 'lessons_completed'. Progresso: ${
                activeUserProfile.progress?.lessons_completed_count || 0
              }, Requerido: ${achievement.criteria.lessons_count || 0}`
            );
            if (
              activeUserProfile.progress?.lessons_completed_count &&
              activeUserProfile.progress.lessons_completed_count >=
                (achievement.criteria.lessons_count || 0)
            ) {
              criteriaMet = true;
              console.log(
                `[checkAndGrantAchievements] Critério para '${achievement.id}' (lições) ATENDIDO.`
              );
            }
            break;
          case "category_completed":
            console.log(
              `[checkAndGrantAchievements] Tipo 'category_completed'. Categoria: ${
                achievement.criteria.category || "N/A"
              }, Progresso 'basic_lessons_read': ${
                activeUserProfile.progress?.basic_lessons_read || 0
              }, Requerido: ${achievement.criteria.total_items || 0}`
            );
            if (
              achievement.criteria.category === "Básico" &&
              activeUserProfile.progress?.basic_lessons_read &&
              activeUserProfile.progress.basic_lessons_read >=
                (achievement.criteria.total_items || 0)
            ) {
              criteriaMet = true;
              console.log(
                `[checkAndGrantAchievements] Critério para '${achievement.id}' (categoria) ATENDIDO.`
              );
            }
            break;
          default:
            console.warn(
              `[checkAndGrantAchievements] Tipo de conquista desconhecido: ${achievement.type}`
            );
        }

        if (criteriaMet) {
          achievementsToGrant.push(achievement.id);
          console.log(
            `[checkAndGrantAchievements] Conquista '${achievement.id}' adicionada para concessão.`
          );
        }
      });

      if (achievementsToGrant.length > 0) {
        console.log(
          "[checkAndGrantAchievements] Conquistas a serem concedidas:",
          achievementsToGrant
        );
        const userRef = doc(db, "users", user.uid);
        const newAchievementsEarned = [
          ...currentEarned,
          ...achievementsToGrant,
        ];

        try {
          await updateDoc(userRef, {
            achievements_earned: newAchievementsEarned,
          });

          setUserProfile((prev: UserProfileData | null) => {
            if (!prev) return null;
            const updatedProfile = {
              ...prev,
              achievements_earned: newAchievementsEarned,
            };
            console.log(
              "[checkAndGrantAchievements] userProfile no estado com conquistas atualizado:",
              updatedProfile.achievements_earned
            );
            return updatedProfile;
          });
          console.log(
            `[checkAndGrantAchievements] Firestore atualizado para ${user.uid} com novas conquistas.`
          );
        } catch (error) {
          console.error(
            "[checkAndGrantAchievements] Erro ao conceder conquistas e atualizar Firestore:",
            error
          );
        }
      } else {
        console.log(
          "[checkAndGrantAchievements] Nenhuma nova conquista a ser concedida nesta rodada."
        );
      }
    },
    [user, userProfile, allAchievementDefinitions]
  );

  const updateUserProgress = useCallback(
    async (metric: string, value: number) => {
      console.log(
        `[updateUserProgress] Chamado para métrica: ${metric}, valor: ${value}`
      );
      if (!user || !userProfile) {
        console.warn(
          "[updateUserProgress] Usuário ou perfil não disponíveis. user:",
          user ? user.uid : "NULO",
          "userProfile:",
          userProfile
            ? { uid: userProfile.uid, progress: userProfile.progress }
            : "NULO"
        );
        return;
      }

      const userRef = doc(db, "users", user.uid);
      try {
        const currentMetricValue = userProfile.progress?.[metric] || 0;
        const newProgressValue = currentMetricValue + value;
        console.log(
          `[updateUserProgress] Progresso atual de ${metric}: ${currentMetricValue}, Novo valor: ${newProgressValue}`
        );

        await updateDoc(userRef, {
          [`progress.${metric}`]: newProgressValue,
        });
        console.log(
          `[updateUserProgress] Firestore atualizado para ${metric}: ${newProgressValue}`
        );

        const updatedUserProfile: UserProfileData = {
          ...userProfile,
          progress: {
            ...(userProfile.progress || {}),
            [metric]: newProgressValue,
          },
        };
        setUserProfile(updatedUserProfile);
        console.log(
          "[updateUserProgress] userProfile no estado atualizado:",
          updatedUserProfile.progress
        );

        console.log(
          "[updateUserProgress] Chamando checkAndGrantAchievements com o perfil atualizado."
        );
        await checkAndGrantAchievements(updatedUserProfile);
      } catch (error) {
        console.error(
          `[updateUserProgress] Erro ao atualizar progresso de '${metric}':`,
          error
        );
      }
    },
    [user, userProfile, checkAndGrantAchievements]
  );

  const loginUser = useCallback(
    async (
      email: string,
      password: string
    ): Promise<{ success: boolean; user?: FirebaseUser; error?: any }> => {
      console.log("[loginUser] Tentando fazer login para:", email);
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(
          "[loginUser] Login bem-sucedido para UID:",
          userCredential.user.uid
        );
        setIsNewRegistration(false);

        // O onAuthStateChanged (useEffect principal) buscará o perfil e iniciará o fluxo de verificação.
        // Chamaremos updateUserProgress APENAS se o userProfile já existir.
        // Se for o primeiro login após um registro, o perfil já terá logins_count: 1 (da criação em handleFinalRegister).
        // Se for login de um usuário existente, o updateUserProgress atualizará.
        if (userProfile) {
          // Verifica se 'userProfile' já está no estado após o carregamento inicial
          await updateUserProgress("logins_count", 1);
          console.log(
            "[loginUser] updateUserProgress (logins_count) disparado após login."
          );
        } else {
          console.log(
            "[loginUser] userProfile não disponível imediatamente, updateUserProgress será handled pelo useEffect principal após o carregamento do perfil."
          );
        }

        return { success: true, user: userCredential.user };
      } catch (error: any) {
        console.error(
          "[loginUser] Erro ao fazer login:",
          error.code,
          error.message
        );
        return { success: false, error: error.message, code: error.code };
      }
    },
    [userProfile, updateUserProgress] // Adicionado userProfile aqui
  );

  const handleFinalRegister = useCallback(
    async ({
      fullName,
      username,
      email,
      password,
    }: {
      fullName: string;
      username: string;
      email: string;
      password: string;
    }): Promise<{ success: boolean; user?: FirebaseUser; error?: any }> => {
      console.log("[handleFinalRegister] Iniciando registro para:", email);
      if (!email || !password || !fullName || !username) {
        console.warn("[handleFinalRegister] Dados de registro incompletos.");
        return {
          success: false,
          error: "Por favor, preencha todos os dados de registro.",
        };
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const currentUser = userCredential.user;
        console.log(
          "[handleFinalRegister] Usuário Firebase Auth criado:",
          currentUser.uid
        );

        const profileData: UserProfileData = {
          uid: currentUser.uid,
          email,
          fullName,
          username,
          createdAt: Timestamp.now(),
          achievements_earned: [],
          progress: {
            logins_count: 1, // <<< INICIALIZA COM 1 LOGIN AQUI para garantir no Firestore
            lessons_completed_count: 0,
            basic_lessons_read: 0,
          },
        };

        await setDoc(doc(db, "users", currentUser.uid), profileData);
        console.log(
          "[handleFinalRegister] Perfil inicial do usuário criado no Firestore para UID:",
          currentUser.uid,
          "com progress:",
          profileData.progress
        );

        // Define o user e userProfile no estado local IMEDIATAMENTE após a criação
        // para que as funções de verificação/atualização tenham os dados mais frescos.
        setUser(currentUser);
        setUserProfile(profileData);
        setIsNewRegistration(true);

        console.log(
          "[handleFinalRegister] Chamando checkAndGrantAchievements diretamente com o profileData inicial."
        );
        await checkAndGrantAchievements(profileData); // Usa o perfil que já tem logins_count: 1
        console.log(
          "[handleFinalRegister] checkAndGrantAchievements disparado após registro."
        );

        return { success: true, user: currentUser };
      } catch (error: any) {
        console.error(
          "[handleFinalRegister] Erro no registro:",
          error.code,
          error.message
        );
        setUser(null);
        setUserProfile(null);
        setIsNewRegistration(false);
        return { success: false, error: error.message, code: error.code };
      }
    },
    [checkAndGrantAchievements]
  );

  const clearNewRegistrationFlag = useCallback(() => {
    setIsNewRegistration(false);
  }, []);

  useEffect(() => {
    console.log(
      "[useEffect: onAuthStateChanged] Iniciando observador de autenticação."
    );
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      console.log(
        "[onAuthStateChanged] Estado de autenticação mudou. currentUser:",
        currentUser ? currentUser.uid : "NULO"
      );
      setUser(currentUser);

      if (currentUser) {
        const profile = await getUserProfile(currentUser.uid); // Obtém o perfil do Firestore
        if (profile) {
          console.log(
            "[onAuthStateChanged] Perfil do usuário carregado:",
            profile.uid
          );
          setUserProfile(profile); // Define o perfil do usuário
          await getAllAchievementDefinitions(); // Carrega as definições de conquistas.
        } else {
          console.log(
            "[onAuthStateChanged] Usuário autenticado mas sem perfil no Firestore (UID:",
            currentUser.uid,
            "). Definindo userProfile como NULO."
          );
          setUserProfile(null);
        }
      } else {
        console.log("[onAuthStateChanged] Usuário deslogado.");
        setUserProfile(null);
        setIsNewRegistration(false);
        setAllAchievementDefinitions([]);
      }
      setLoading(false);
      console.log(
        "[onAuthStateChanged] Carregamento inicial de AuthProvider concluído."
      );
    });

    return () => {
      console.log(
        "[useEffect: onAuthStateChanged] Desinscrevendo observador de autenticação."
      );
      unsubscribe();
    };
  }, [getUserProfile, getAllAchievementDefinitions]);

  useEffect(() => {
    console.log("[useEffect: checkAndGrantAchievements trigger]");
    console.log("   - userProfile presente:", !!userProfile);
    console.log(
      "   - allAchievementDefinitions carregado:",
      allAchievementDefinitions.length > 0
    );
    if (userProfile && allAchievementDefinitions.length > 0) {
      console.log(
        "[useEffect: checkAndGrantAchievements trigger] Disparando checkAndGrantAchievements."
      );
      checkAndGrantAchievements(); // Chama a versão sem argumento, que usará o userProfile do estado
    }
  }, [userProfile, allAchievementDefinitions, checkAndGrantAchievements]);

  const contextValue = useMemo(
    () => ({
      user,
      userProfile,
      loading,
      registrationData,
      updateRegistrationData,
      handleFinalRegister,
      loginUser,
      logoutUser,
      getUserProfile,
      sendPasswordReset,
      isNewRegistration,
      clearNewRegistrationFlag,
      updateUserProgress,
      checkAndGrantAchievements,
      getAllAchievementDefinitions,
      allAchievementDefinitions,
    }),
    [
      user,
      userProfile,
      loading,
      registrationData,
      updateRegistrationData,
      handleFinalRegister,
      loginUser,
      logoutUser,
      getUserProfile,
      sendPasswordReset,
      isNewRegistration,
      clearNewRegistrationFlag,
      updateUserProgress,
      checkAndGrantAchievements,
      getAllAchievementDefinitions,
      allAchievementDefinitions,
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
