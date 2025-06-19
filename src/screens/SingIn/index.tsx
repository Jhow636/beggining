import Header from "@components/Header";
import React from "react";
import SignInForm from "@components/SingInForm";
import { useNavigation } from "@react-navigation/native";
import Title from "@components/Title";
import {
  Container,
  ForgetPassword,
  PrivacyPolicy,
  Strong,
  ForgetPasswordText,
} from "./styles";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

const SignIn: React.FC = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleNavigateToForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };
  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <Container>
        <Header onPress={handleGoBack} />
        <Title text={`Insira os seus ${"\n"}dados`} />
        <SignInForm />
        <ForgetPassword onPress={handleNavigateToForgotPassword}>
          <ForgetPasswordText>ESQUECI MINHA SENHA</ForgetPasswordText>
        </ForgetPassword>
        <PrivacyPolicy>
          Ao entrar em nossa plataforma, você concorda com os nossos{" "}
          <Strong>Termos</Strong> e <Strong>Políticas de Privacidade</Strong>
        </PrivacyPolicy>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;
