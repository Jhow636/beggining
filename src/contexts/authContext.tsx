// AuthContext.js
import React, { useState, createContext, useContext, useEffect } from "react";
import { auth, db } from "@config/firebase.client";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";

import { doc, setDoc, getDoc } from "firebase/firestore";

// Definindo o tipo para o contexto (melhora a tipagem)
interface AuthContextType {
  user: any; // Objeto de usuário do Firebase Auth
  userProfile: any; // Dados adicionais do Firestore (nome, username)
  loading: boolean; // Indica se o estado de autenticação está sendo carregado
  registrationData: { fullName: string; username: string };
  updateRegistrationData: (newData: {
    fullName?: string;
    username?: string;
    email?: string;
    password?: string;
  }) => void;
  // handleFinalRegister original: (email: string, password: string) => Promise<{ success: boolean; user?: any; error?: any }>;
  // handleFinalRegister com dados completos:
  handleFinalRegister: (data: {
    fullName: string;
    username: string;
    email: string;
    password: string;
  }) => Promise<{ success: boolean; user?: any; error?: any }>;
  handleLogin: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; user?: any; error?: any }>;
  handleLogout: () => Promise<{ success: boolean; error?: any }>;
  sendPasswordReset: (
    email: string
  ) => Promise<{ success: boolean; error?: any; code?: string }>;
  getUserProfile: (uid: string) => Promise<any | null>;
  loginUser: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; user?: any; error?: any }>;
  logoutUser: () => Promise<{ success: boolean; error?: any }>;
  // >>> NOVAS PROPRIEDADES NO TIPO <<<
  isNewRegistration: boolean; // Indica se o usuário acabou de se registrar nesta sessão
  clearNewRegistrationFlag: () => void; // Função para limpar a flag
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  // >>> NOVO ESTADO AQUI <<<
  const [isNewRegistration, setIsNewRegistration] = useState(false);

  const [registrationData, setRegistrationData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const updateRegistrationData = (newData: {
    fullName?: string;
    username?: string;
    email?: string;
    password?: string;
  }) => {
    setRegistrationData((prevData) => ({ ...prevData, ...newData }));
  };

  const sendPasswordReset = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("E-mail de redefinição de senha enviado para:", email);
      return { success: true };
    } catch (error: any) {
      console.error(
        "Erro ao enviar e-mail de redefinição de senha:",
        error.code,
        error.message
      );
      return { success: false, error: error.message, code: error.code };
    }
  };

  const getUserProfile = async (uid: string) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Dados do perfil do usuário:", docSnap.data());
        return docSnap.data();
      } else {
        console.log("Nenhum perfil de usuário encontrado para o UID:", uid);
        return null;
      }
    } catch (error: any) {
      console.error(
        "Erro ao obter perfil do usuário:",
        error.code,
        error.message
      );
      return { error: error.message, code: error.code };
    }
  };

  const loginUser = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; user?: any; error?: any }> => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Se logar com sucesso, não é um "novo registro", então garantimos que a flag é falsa.
      setIsNewRegistration(false);
      return { success: true, user: userCredential.user };
    } catch (error: any) {
      return { success: false, error: error.message, code: error.code };
    }
  };

  const logoutUser = async (): Promise<{ success: boolean; error?: any }> => {
    try {
      await signOut(auth);
      setUser(null); // Limpa o user ao deslogar
      setUserProfile(null); // Limpa o userProfile ao deslogar
      setIsNewRegistration(false); // Limpa a flag ao deslogar
      return { success: true };
    } catch (error: any) {
      console.error("Error signing out:", error);
      return { success: false, error: error.message, code: error.code };
    }
  };

  // >>>>>> handleFinalRegister COM A FLAG isNewRegistration <<<<<<
  const handleFinalRegister = async ({
    fullName,
    username,
    email,
    password,
  }: {
    fullName: string;
    username: string;
    email: string;
    password: string;
  }): Promise<{ success: boolean; user?: any; error?: any }> => {
    if (!email || !password || !fullName || !username) {
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
      const profileData = {
        uid: currentUser.uid,
        email,
        fullName,
        username,
        createdAt: new Date(),
      };

      await setDoc(doc(db, "users", currentUser.uid), profileData);

      setUser(currentUser); // Atualiza o user Auth
      setUserProfile(profileData); // Atualiza o userProfile com os dados recém-criados
      setIsNewRegistration(true); // <<< DEFINE A FLAG PARA TRUE AQUI APÓS REGISTRO BEM-SUCEDIDO <<<

      return { success: true, user: currentUser };
    } catch (error: any) {
      console.error("Erro no registro:", error.message);
      setUser(null); // Limpa o user em caso de erro
      setUserProfile(null); // Limpa o perfil em caso de erro
      setIsNewRegistration(false); // Garante que a flag é falsa em caso de erro
      return { success: false, error: error.message, code: error.code };
    }
  };

  // >>>>>> FUNÇÃO PARA LIMPAR A FLAG <<<<<<
  const clearNewRegistrationFlag = () => {
    setIsNewRegistration(false);
  };

  // >>>>>> useEffect para controlar o estado do usuário (sem a flag) <<<<<<
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true); // Inicia o carregamento
      setUser(currentUser); // Atualiza o estado do usuário Auth

      if (currentUser) {
        // Se há um usuário logado, tenta buscar os dados adicionais do Firestore
        const profile = await getUserProfile(currentUser.uid);
        if (profile && !profile.error) {
          setUserProfile(profile);
        } else {
          setUserProfile(null); // Limpa o perfil se não for encontrado ou erro
        }
        // IMPORTANTE: Aqui, não definimos isNewRegistration como false se já estiver logado.
        // A flag é controlada APENAS pelo handleFinalRegister e clearNewRegistrationFlag.
      } else {
        // Se nenhum usuário logado, limpa os dados do perfil e a flag
        setUserProfile(null);
        setIsNewRegistration(false);
      }
      setLoading(false); // O carregamento inicial está completo
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
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
        // >>> EXPOÊNDO AS NOVAS PROPRIEDADES <<<
        isNewRegistration,
        clearNewRegistrationFlag,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 3. Cria um Hook personalizado para facilitar o uso do Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
