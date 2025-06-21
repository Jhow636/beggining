import React from "react";
import { Container, MainWrapper } from "./styles";
import HeaderMenu from "@components/HeaderMenu";
import EditarPerfilForm from "@components/EditarPerfilForm";
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const TelaPerfil: React.FC = () => {
  const navigation = useNavigation();
  const handleBackPress = () => {
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
          <HeaderMenu
            title="Perfil"
            iconBack={true}
            onPress={handleBackPress}
          />
          <MainWrapper>
            <EditarPerfilForm />
          </MainWrapper>
        </Container>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default TelaPerfil;
