import React from "react";
import { StatusBar } from "expo-status-bar";
import { Container } from "./styles";
import Title from "@components/Title";
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Header from "@components/Header";
import UserRegistrationForm from "@components/UserRegistrationForm";
import { useNavigation } from "@react-navigation/native";

const UserRegistration: React.FC = () => {
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
          <UserRegistrationForm />
        </Container>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default UserRegistration;
