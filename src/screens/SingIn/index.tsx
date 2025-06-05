import Header from "@components/Header";
import { Container } from "@screens/SignUpProcess/styles";
import React from "react";
import SignInForm from "@components/SingInForm";
import { useNavigation } from "@react-navigation/native";

import {
  Tittle,
  ForgetPassword,
  PrivacyPolicy,
  Strong,
  ForgetPasswordText,
} from "./styles";

const SignIn: React.FC = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <Container>
      <Header onPress={handleGoBack} />
      <Tittle>Insira os seus dados</Tittle>
      <SignInForm />
      <ForgetPassword>
        <ForgetPasswordText>ESQUECI MINHA SENHA</ForgetPasswordText>
      </ForgetPassword>
      <PrivacyPolicy>
        Ao entrar em nossa plataforma, você concorda com os nossos{" "}
        <Strong>Termos</Strong> e <Strong>Políticas de Privacidade</Strong>
      </PrivacyPolicy>
    </Container>
  );
};

export default SignIn;
