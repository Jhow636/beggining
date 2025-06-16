import React, { useState, createContext } from "react";
import { auth, db } from "@config/firebase.client";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { doc, setDoc, getDoc } from "firebase/firestore";

export const AuthContext = createContext({});
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  /**
   * Função para registrar um novo usuário com e-mail, senha e dados adicionais.
   * Após o registro no Auth, salva nome e nome de usuário no Firestore.
   * @param {string} email - O e-mail do usuário.
   * @param {string} password - A senha do usuário.
   * @param {string} fullName - O nome completo do usuário.
   * @param {string} username - O nome de usuário.
   * @returns {Promise<object>} Um objeto contendo o usuário ou um erro.
   */

  const [registrationData, setRegistrationData] = useState({
    fullName: "",
    username: "",
  });

  const registerUser = async (
    email: string,
    password: string
  ): Promise<object> => {
    const { fullName, username } = registrationData;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        fullName: fullName,
        username: username,
        createdAt: new Date(), // Opcional: adicionar um timestamp de criação
      });
      return { user: userCredential.user };
    } catch (error) {
      return { error };
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
  ): Promise<object> => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return { user: userCredential.user };
    } catch (error) {
      return { error };
    }
  };

  const logoutUser = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  /**
   * Observador de estado de autenticação.
   * Esta função não é assíncrona, ela retorna uma função de unsubscribe.
   * @param {function} callback - A função a ser chamada quando o estado do usuário muda.
   * Recebe o objeto de usuário (ou null se deslogado).
   * @returns {function} Uma função para cancelar a observação.
   */
  const subscribeToAuthChanges = (callback: any) => {
    return onAuthStateChanged(auth, (user) => {
      callback(user);
    });
  };

  // useEffect(() => {
  //     // Quando o componente monta, começamos a observar as mudanças de autenticação
  //     const unsubscribe = subscribeToAuthChanges((currentUser) => {
  //       setUser(currentUser); // Atualiza o estado do React com o usuário atual
  //       if (currentUser) {
  //         console.log('Usuário atual:', currentUser.email);
  //       } else {
  //         console.log('Nenhum usuário logado.');
  //       }
  //     });

  //     // Quando o componente desmonta, paramos de observar para evitar vazamentos de memória
  //     return () => unsubscribe();
  // }, []);

  const [user, setUser] = useState<any>(null);

  return (
    <AuthContext.Provider
      value={{
        registerUser,
        setRegistrationData,
        loginUser,
        logoutUser,
        subscribeToAuthChanges,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
