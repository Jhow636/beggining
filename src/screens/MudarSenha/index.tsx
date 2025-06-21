import React from "react";
import { Container, MainWrapper, Form, ContainerButton, Title } from "./styles";
import HeaderMenu from "@components/HeaderMenu";
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { TouchableOpacity } from "react-native";
import CustomButton from "@components/CustomButton";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@contexts/authContext";
import Input from "@components/Input";
import { useTheme } from "styled-components";

const schema = yup
  .object({
    password: yup
      .string()
      .min(6, "Senha deve ter pelo menos 6 caracteres")
      .required("Senha é obrigatória"),
  })
  .required();

type InputData = {
  novaSenha: string;
  confirmarSenha: string;
};

const MudarSenha: React.FC = () => {
  const theme = useTheme();
  const { loading } = useAuth();
  const navigation = useNavigation();
  const handleBackPress = () => {
    navigation.goBack();
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<InputData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: InputData) => {
    console.log("Dados do formulário a serem enviados:", data);
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
            title="Alterar a senha"
            iconBack={true}
            onPress={handleBackPress}
          />
          <MainWrapper>
            <Form>
              <Title>Nova Senha</Title>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <Input
                    customBackground={theme.COLORS.GRAY6}
                    customColor={theme.COLORS.GRAY2}
                    colorText={theme.COLORS.DARKGRAY}
                    placeholder="Digite sua senha"
                    onChangeText={onChange}
                    value={value}
                    error={errors.password?.message}
                    secureTextEntry
                  />
                )}
              />
              <Title>Confirme a Senha</Title>
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, value } }) => (
                  <Input
                    customBackground={theme.COLORS.GRAY6}
                    customColor={theme.COLORS.GRAY2}
                    colorText={theme.COLORS.DARKGRAY}
                    placeholder="Confirme sua senha"
                    onChangeText={onChange}
                    value={value}
                    error={errors.confirmPassword?.message}
                    secureTextEntry
                  />
                )}
              />
              <ContainerButton>
                <CustomButton
                  title={loading ? "Salavando..." : "Salvar"}
                  onPress={handleSubmit(onSubmit)}
                  disabled={loading}
                />
              </ContainerButton>
            </Form>
          </MainWrapper>
        </Container>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default MudarSenha;
