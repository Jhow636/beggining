import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { auth, db } from "@config/firebase.client";
import {
  deleteUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  User as FirebaseUser,
} from "firebase/auth";

import {
  doc,
  setDoc,
  Timestamp,
  collection, // Keep collection for other Firestore operations if needed
  query, // Keep query for other Firestore operations if needed
  where, // Keep where for other Firestore operations if needed
  getDocs, // Keep getDocs for other Firestore operations if needed
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { useModal } from "@contexts/ModalProvider"; // Adjust the path as needed

// --- INTERFACES ---

interface UserProfileData {
  uid: string;
  email: string;
  fullName: string;
  username: string;
  createdAt: Timestamp;
  achievements_earned?: string[];
  progress?: {
    logins_count?: number;
    lessons_completed_count?: number;
    basic_lessons_read?: number;
    [key: string]: number | undefined;
  };
}

interface AchievementDefinition {
  id: string;
  name: string;
  description: string;
  iconUrl?: string;
  type: string;
  criteria: {
    logins_required?: number;
    lessons_count?: number;
    category?: string;
    total_items?: number;
  };
}

interface AuthContextType {
  user: FirebaseUser | null;
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
  }) => Promise<{ success: boolean; user?: FirebaseUser; error?: any }>;
  loginUser: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; user?: FirebaseUser; error?: any }>;
  logoutUser: () => Promise<{ success: boolean; error?: any }>;
  sendPasswordReset: (
    email: string
  ) => Promise<{ success: boolean; error?: any; code?: string }>;
  getUserProfile: (uid: string) => Promise<UserProfileData | null>;
  isNewRegistration: boolean;
  clearNewRegistrationFlag: () => void;
  updateUserProgress: (metric: string, value: number) => Promise<void>;
  checkAndGrantAchievements: (
    profileToCheck?: UserProfileData
  ) => Promise<void>;
  getAllAchievementDefinitions: () => Promise<AchievementDefinition[]>;
  allAchievementDefinitions: AchievementDefinition[];
  deleteUserAccount: () => Promise<{
    success: boolean;
    error?: any;
    code?: string;
  }>;
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

  const { showModal } = useModal();

  // --- FUNÇÃO verificarUsuarioUnico REMOVIDA AQUI ---

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

  const deleteUserAccount = useCallback(async (): Promise<{
    success: boolean;
    error?: any;
    code?: string;
  }> => {
    if (!user) {
      showModal("Você precisa estar logado para excluir sua conta.", "warning");
      return { success: false, error: "Nenhum usuário logado." };
    }

    return new Promise((resolve) => {
      showModal(
        "Tem certeza que deseja excluir sua conta? Esta ação é irreversível.",
        "warning",
        async () => {
          try {
            await deleteDoc(doc(db, "users", user.uid));
            await deleteUser(user);

            setUser(null);
            setUserProfile(null);
            setIsNewRegistration(false);
            showModal("Sua conta foi excluída com sucesso.", "success");
            resolve({ success: true });
          } catch (error: any) {
            if (error.code === "auth/requires-recent-login") {
              const errorMessage =
                "Sua sessão expirou. Por favor, faça login novamente para excluir sua conta.";
              showModal(errorMessage, "error");
              resolve({
                success: false,
                error: errorMessage,
                code: error.code,
              });
            } else {
              showModal(`Erro ao excluir conta: ${error.message}`, "error");
              resolve({
                success: false,
                error: error.message,
                code: error.code,
              });
            }
          }
        },
        () => {
          showModal("Exclusão de conta cancelada.", "info");
          resolve({ success: false, error: "Exclusão cancelada." });
        }
      );
    });
  }, [user, setUser, setUserProfile, setIsNewRegistration, showModal]);

  const sendPasswordReset = useCallback(
    async (
      email: string
    ): Promise<{ success: boolean; error?: any; code?: string }> => {
      try {
        await sendPasswordResetEmail(auth, email);
        showModal(
          "Um e-mail para redefinição de senha foi enviado para " + email,
          "success"
        );
        return { success: true };
      } catch (error: any) {
        showModal(
          "Erro ao enviar e-mail de redefinição de senha: " + error.message,
          "error"
        );
        return { success: false, error: error.message, code: error.code };
      }
    },
    [showModal]
  );

  const getUserProfile = useCallback(
    async (uid: string): Promise<UserProfileData | null> => {
      try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as UserProfileData;
          return data;
        } else {
          return null;
        }
      } catch (error: any) {
        showModal("Erro ao carregar seu perfil. Tente novamente.", "error");
        return null;
      }
    },
    [showModal]
  );

  const logoutUser = useCallback(async (): Promise<{
    success: boolean;
    error?: any;
  }> => {
    try {
      await signOut(auth);
      setUser(null);
      setUserProfile(null);
      setIsNewRegistration(false);
      showModal("Você foi desconectado com sucesso!", "success");
      return { success: true };
    } catch (error: any) {
      showModal("Erro ao desconectar: " + error.message, "error");
      return { success: false, error: error.message, code: error.code };
    }
  }, [showModal]);

  const getAllAchievementDefinitions = useCallback(async (): Promise<
    AchievementDefinition[]
  > => {
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
      setAllAchievementDefinitions(definitions);
      return definitions;
    } catch (error) {
      showModal("Erro ao carregar definições de conquistas.", "error");
      return [];
    }
  }, [showModal]);

  const checkAndGrantAchievements = useCallback(
    async (profileToCheck?: UserProfileData) => {
      const activeUserProfile = profileToCheck || userProfile;

      if (!user || !activeUserProfile || !allAchievementDefinitions.length) {
        return;
      }

      const achievementsToGrant: string[] = [];
      const currentEarned = activeUserProfile.achievements_earned || [];

      allAchievementDefinitions.forEach((achievement) => {
        if (currentEarned.includes(achievement.id)) {
          return;
        }

        let criteriaMet = false;

        switch (achievement.type) {
          case "login":
            if (
              activeUserProfile.progress?.logins_count &&
              activeUserProfile.progress.logins_count >=
                (achievement.criteria.logins_required || 0)
            ) {
              criteriaMet = true;
            }
            break;
          case "lessons_completed":
            if (
              activeUserProfile.progress?.lessons_completed_count &&
              activeUserProfile.progress.lessons_completed_count >=
                (achievement.criteria.lessons_count || 0)
            ) {
              criteriaMet = true;
            }
            break;
          case "category_completed":
            if (
              achievement.criteria.category === "Básico" &&
              activeUserProfile.progress?.basic_lessons_read &&
              activeUserProfile.progress.basic_lessons_read >=
                (achievement.criteria.total_items || 0)
            ) {
              criteriaMet = true;
            }
            break;
          default:
            break;
        }

        if (criteriaMet) {
          achievementsToGrant.push(achievement.id);
        }
      });

      if (achievementsToGrant.length > 0) {
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
            return updatedProfile;
          });

          if (achievementsToGrant.length === 1) {
            const grantedAchievement = allAchievementDefinitions.find(
              (a) => a.id === achievementsToGrant[0]
            );
            if (grantedAchievement) {
              showModal(
                `Parabéns! Você ganhou a conquista: "${grantedAchievement.name}"!`,
                "success"
              );
            }
          } else {
            showModal(
              `Parabéns! Você ganhou ${achievementsToGrant.length} novas conquistas!`,
              "success"
            );
          }
        } catch (error) {
          showModal("Erro ao conceder conquistas.", "error");
        }
      }
    },
    [user, userProfile, allAchievementDefinitions, showModal]
  );

  const updateUserProgress = useCallback(
    async (metric: string, value: number) => {
      if (!user || !userProfile) {
        return;
      }

      const userRef = doc(db, "users", user.uid);
      try {
        const currentMetricValue = userProfile.progress?.[metric] || 0;
        const newProgressValue = currentMetricValue + value;

        await updateDoc(userRef, {
          [`progress.${metric}`]: newProgressValue,
        });

        const updatedUserProfile: UserProfileData = {
          ...userProfile,
          progress: {
            ...(userProfile.progress || {}),
            [metric]: newProgressValue,
          },
        };
        setUserProfile(updatedUserProfile);
        await checkAndGrantAchievements(updatedUserProfile);
      } catch (error) {
        showModal(`Erro ao atualizar seu progresso para ${metric}.`, "error");
      }
    },
    [user, userProfile, checkAndGrantAchievements, showModal]
  );

  const loginUser = useCallback(
    async (
      email: string,
      password: string
    ): Promise<{ success: boolean; user?: FirebaseUser; error?: any }> => {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        setIsNewRegistration(false);

        if (userProfile) {
          await updateUserProgress("logins_count", 1);
        }
        showModal("Login realizado com sucesso!", "success");
        return { success: true, user: userCredential.user };
      } catch (error: any) {
        let errorMessage = "Erro ao fazer login. Verifique suas credenciais.";
        if (error.code === "auth/user-not-found") {
          errorMessage =
            "Usuário não encontrado. Crie uma conta ou verifique o e-mail.";
        } else if (error.code === "auth/wrong-password") {
          errorMessage = "Senha incorreta. Tente novamente.";
        } else if (error.code === "auth/invalid-email") {
          errorMessage = "E-mail inválido.";
        }
        showModal(errorMessage, "error");
        return { success: false, error: error.message, code: error.code };
      }
    },
    [userProfile, updateUserProgress, showModal]
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
    }): Promise<{
      success: boolean;
      user?: FirebaseUser;
      error?: any;
      code?: string;
    }> => {
      if (!email || !password || !fullName || !username) {
        showModal("Por favor, preencha todos os dados de registro.", "warning");
        return {
          success: false,
          error: "Por favor, preencha todos os dados de registro.",
        };
      }

      try {
        // --- REMOVIDA A VERIFICAÇÃO DE UNICIDADE DO EMAIL AQUI ---
        // --- REMOVIDA A VERIFICAÇÃO DE UNICIDADE DO USERNAME AQUI ---

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const currentUser = userCredential.user;

        const profileData: UserProfileData = {
          uid: currentUser.uid,
          email,
          fullName,
          username,
          createdAt: Timestamp.now(),
          achievements_earned: [],
          progress: {
            logins_count: 1,
            lessons_completed_count: 0,
            basic_lessons_read: 0,
          },
        };

        await setDoc(doc(db, "users", currentUser.uid), profileData);

        setUser(currentUser);
        setUserProfile(profileData);
        setIsNewRegistration(true);

        await checkAndGrantAchievements(profileData);
        showModal("Cadastro realizado com sucesso! Bem-vindo(a)!", "success");
        return { success: true, user: currentUser };
      } catch (error: any) {
        if (error.code === "auth/email-already-in-use") {
          showModal(
            "Este e-mail já está cadastrado. Por favor, faça login ou use outro e-mail.",
            "error"
          );
          return {
            success: false,
            error: "Este e-mail já está cadastrado.",
            code: error.code,
          };
        } else if (error.code === "auth/weak-password") {
          showModal(
            "A senha é muito fraca. Por favor, use uma senha com pelo menos 6 caracteres.",
            "warning"
          );
        } else {
          showModal("Erro ao registrar: " + error.message, "error");
        }

        setUser(null);
        setUserProfile(null);
        setIsNewRegistration(false);
        return { success: false, error: error.message, code: error.code };
      }
    },
    [
      checkAndGrantAchievements,
      setUser,
      setUserProfile,
      setIsNewRegistration,
      showModal,
      // verificarUsuarioUnico REMOVIDO DAQUI
    ]
  );

  const clearNewRegistrationFlag = useCallback(() => {
    setIsNewRegistration(false);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      setUser(currentUser);

      if (currentUser) {
        const profile = await getUserProfile(currentUser.uid);
        if (profile) {
          setUserProfile(profile);
          await getAllAchievementDefinitions();
        } else {
          setUserProfile(null);
        }
      } else {
        setUserProfile(null);
        setIsNewRegistration(false);
        setAllAchievementDefinitions([]);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [getUserProfile, getAllAchievementDefinitions]);

  useEffect(() => {
    if (userProfile && allAchievementDefinitions.length > 0) {
      checkAndGrantAchievements();
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
      deleteUserAccount,
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
      deleteUserAccount,
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
