// AuthContext.js
import React, { useState, createContext, useContext, useEffect } from "react"; // Importe useContext e useEffect
import { auth, db } from "@config/firebase.client"; // Ajuste o caminho conforme sua configuração
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
  handleFinalRegister: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; user?: any; error?: any }>;
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
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
); // Defina o tipo aqui também

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Estados para o usuário logado e seu perfil (APENAS UMA DECLARAÇÃO)
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true); // Indica se o estado de autenticação está sendo carregado

  // Estado para armazenar os dados do formulário de registro (temporário)
  // Mova esta declaração para cima, perto dos outros estados, por organização.
  const [registrationData, setRegistrationData] = useState({
    fullName: "",
    username: "",
    email: "", // Inclua email e password aqui, pois o FormularioEmailSenha vai atualizar
    password: "",
  });

  // Função para atualizar partes do estado de registro
  const updateRegistrationData = (newData: {
    fullName?: string;
    username?: string;
    email?: string;
    password?: string;
  }) => {
    setRegistrationData((prevData) => ({ ...prevData, ...newData }));
  };

  /**
   * Função para enviar um e-mail de redefinição de senha para o e-mail fornecido.
   * @param {string} email - O e-mail do usuário para o qual a senha será redefinida.
   * @returns {Promise<object>} Um objeto indicando sucesso ou um erro.
   */
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
      return { success: false, error: error.message, code: error.code }; // Retorne o erro aqui
    }
  };

  /**
   * Função para obter dados adicionais de um usuário pelo UID.
   * @param {string} uid - O UID do usuário.
   * @returns {Promise<object|null>} Os dados do usuário ou null se não encontrado.
   */
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
      // Adicione any para o tipo de erro
      console.error(
        "Erro ao obter perfil do usuário:",
        error.code,
        error.message
      );
      return { error: error.message, code: error.code }; // Retorne o erro aqui
    }
  };

  /**
   * Função para registrar um novo usuário com e-mail, senha e dados adicionais.
   * Após o registro no Auth, salva nome e nome de usuário no Firestore.
   * @param {string} email - O e-mail do usuário.
   * @param {string} password - A senha do usuário.
   * @param {string} fullName - O nome completo do usuário.
   * @param {string} username - O nome de usuário.
   * @returns {Promise<object>} Um objeto contendo o usuário ou um erro.
   */
  // A função registerUser agora recebe email e password diretamente,
  // mas usará fullName e username do registrationData
  const registerUser = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; user?: any; error?: any }> => {
    // Tipagem de retorno mais específica
    // Use registrationData que já está no estado do Context
    const { fullName, username } = registrationData;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const currentUserFromAuth = userCredential.user; // Use um nome diferente para evitar conflitos (ex: currentUserFromAuth)

      await setDoc(doc(db, "users", currentUserFromAuth.uid), {
        uid: currentUserFromAuth.uid,
        email: currentUserFromAuth.email,
        fullName: fullName, // Vem do registrationData
        username: username, // Vem do registrationData
        createdAt: new Date(),
      });
      // Importante: o onAuthStateChanged no useEffect abaixo vai capturar este usuário e atualizar os estados 'user' e 'userProfile'
      return { success: true, user: currentUserFromAuth };
    } catch (error: any) {
      return { success: false, error: error.message, code: error.code }; // Retorne o erro
    }
  };

  /**
   * Função para fazer login de um usuário com e-mail e senha.
   * @param {string} email - O e-mail do usuário.
   * @param {string} password - A senha do usuário.
   * @returns {Promise<object>} Um objeto contendo o usuário ou um erro.
   */
  const loginUser = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; user?: any; error?: any }> => {
    // Tipagem de retorno mais específica
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // O onAuthStateChanged no useEffect abaixo vai capturar este usuário e atualizar os estados 'user' e 'userProfile'
      return { success: true, user: userCredential.user };
    } catch (error: any) {
      return { success: false, error: error.message, code: error.code }; // Retorne o erro
    }
  };

  const logoutUser = async (): Promise<{ success: boolean; error?: any }> => {
    // Tipagem de retorno
    try {
      await signOut(auth);
      return { success: true }; // Retorne sucesso
    } catch (error: any) {
      console.error("Error signing out:", error);
      return { success: false, error: error.message, code: error.code }; // Retorne o erro
    }
  };

  /**
   * Observador de estado de autenticação.
   * Esta função é exportada do authService, mas vamos chamar ela aqui diretamente.
   * (Se você tiver um authService.js separado, certifique-se de que subscribeToAuthChanges está lá e usa onAuthStateChanged)
   * @param {function} callback - A função a ser chamada quando o estado do usuário muda.
   * Recebe o objeto de usuário (ou null se deslogado).
   * @returns {function} Uma função para cancelar a observação.
   */
  // Esta função não é necessária se onAuthStateChanged for usado diretamente no useEffect
  // const subscribeToAuthChanges = (callback: any) => {
  //   return onAuthStateChanged(auth, (user) => {
  //     callback(user);
  //   });
  // };

  // >>>>>> ESTE É O useEffect CORRETO PARA CONTROLAR O ESTADO DO USUÁRIO NO CONTEXT <<<<<<
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      // Use onAuthStateChanged diretamente aqui
      setUser(currentUser); // Atualiza o estado do usuário Auth

      if (currentUser) {
        // Se há um usuário logado, tenta buscar os dados adicionais do Firestore
        const profile = await getUserProfile(currentUser.uid);
        if (profile && !profile.error) {
          // Verifique por 'error' na resposta do getUserProfile
          setUserProfile(profile);
        } else {
          setUserProfile(null); // Limpa o perfil se não for encontrado ou erro
        }
      } else {
        // Se nenhum usuário logado, limpa os dados do perfil
        setUserProfile(null);
      }
      setLoading(false); // O carregamento inicial está completo
    });

    // Função de limpeza para desinscrever o observador quando o componente for desmontado
    return () => unsubscribe();
  }, []); // Array de dependências vazio para que seja executado apenas uma vez ao montar

  // Adicione a função para lidar com o registro final que usa registrationData
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

      await setDoc(doc(db, "users", currentUser.uid), {
        uid: currentUser.uid,
        email,
        fullName,
        username,
        createdAt: new Date(),
      });

      return { success: true, user: currentUser };
    } catch (error: any) {
      console.error("Erro no registro:", error.message);
      return { success: false, error: error.message, code: error.code };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user, // O objeto de usuário do Firebase Auth
        userProfile, // Os dados adicionais do Firestore (nome, username)
        loading, // Se o AuthContext ainda está carregando o estado inicial
        registrationData, // Dados temporários do formulário de registro
        updateRegistrationData,
        handleFinalRegister, // Exponha a função de registro final
        loginUser,
        logoutUser,
        // subscribeToAuthChanges, // Não precisa expor se o useEffect do Context já o usa diretamente
        getUserProfile,
        sendPasswordReset,
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
    // Use 'undefined' para checar se está fora do Provider
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
