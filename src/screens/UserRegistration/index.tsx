import React from "react";
import { StatusBar } from "expo-status-bar";
import { Container, Title } from "./styles";
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Header from "@components/Header";
import UserRegistrationForm from "@components/UserRegistrationForm";

const UserRegistration: React.FC = () => {
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
          <UserRegistrationForm />
        </Container>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default UserRegistration;
