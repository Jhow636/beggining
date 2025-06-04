import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Container,
  Title,
  Footer,
  Description,
  CheckBox,
  Strong,
} from "./styles";
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Header from "@components/Header";
import Form from "@components/Form";

const SignUp: React.FC = () => {
  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled
      >
        <Container>
          <StatusBar style="light" />
          <Header />
          <Title>Cadastro de {"\n"} Usuário</Title>
          <Form />

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

export default SignUp;
