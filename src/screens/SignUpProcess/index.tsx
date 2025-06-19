import React from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import { Container, CheckBox, Description, Footer, Strong } from "./styles";

import { useNavigation } from "@react-navigation/native";
import Title from "@components/Title";

import Header from "@components/Header";
import SignUpProcessForm from "@components/SignUpProcessForm";

const SignUpProcess: React.FC = () => {
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled
      >
        <Container>
          <StatusBar style="light" />
          <Header onPress={handleBack} />
          <Title text={`Cadastro de${"\n"}Usuário`} />
          <SignUpProcessForm />

          <Footer>
            <CheckBox />
            <Description>
              Ao entrar em nossa plataforma, você concorda com os nossos
              <Strong> Termos</Strong> e
              <Strong> Políticas de Privacidade</Strong>
            </Description>
          </Footer>
        </Container>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SignUpProcess;
