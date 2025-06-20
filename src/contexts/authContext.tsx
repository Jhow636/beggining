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

interface AuthContextType {
  user: any;
  userProfile: any;
  loading: boolean;
  registrationData: { fullName: string; username: string };
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
  isNewRegistration: boolean;
  clearNewRegistrationFlag: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
      setIsNewRegistration(false);
      return { success: true, user: userCredential.user };
    } catch (error: any) {
      return { success: false, error: error.message, code: error.code };
    }
  };

  const logoutUser = async (): Promise<{ success: boolean; error?: any }> => {
    try {
      await signOut(auth);
      setUser(null);
      setUserProfile(null);
      setIsNewRegistration(false);
      return { success: true };
    } catch (error: any) {
      console.error("Error signing out:", error);
      return { success: false, error: error.message, code: error.code };
    }
  };

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

      setUser(currentUser);
      setUserProfile(profileData);
      setIsNewRegistration(true);

      return { success: true, user: currentUser };
    } catch (error: any) {
      console.error("Erro no registro:", error.message);
      setUser(null);
      setUserProfile(null);
      setIsNewRegistration(false);
      return { success: false, error: error.message, code: error.code };
    }
  };

  const clearNewRegistrationFlag = () => {
    setIsNewRegistration(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      setUser(currentUser);

      if (currentUser) {
        const profile = await getUserProfile(currentUser.uid);
        if (profile && !profile.error) {
          setUserProfile(profile);
        } else {
          setUserProfile(null);
        }
      } else {
        setUserProfile(null);
        setIsNewRegistration(false);
      }
      setLoading(false);
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
        isNewRegistration,
        clearNewRegistrationFlag,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
