import React, { useState, useContext } from "react";
import { Container } from "./style";
import { useAuth } from "@contexts/authContext";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@components/Input";
import CustomButton from "@components/CustomButton";
import { Alert } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useTheme } from "styled-components";

const schema = yup.object({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  confirmEmail: yup
    .string()
    .oneOf([yup.ref("email")], "Os emails devem ser iguais")
    .required("Confirmação de email é obrigatória"),
  password: yup
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .required("Senha é obrigatória"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas devem ser iguais")
    .required("Confirmação de senha é obrigatória"),
});

type InputData = {
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
};

const SignupProcessForm: React.FC = () => {
  const { handleFinalRegister, updateRegistrationData, registrationData } =
    useAuth();
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  type RootStackParamList = {
    WelcomeScreen: undefined;
  };

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<InputData>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: InputData) => {
    setLoading(true);

    updateRegistrationData({
      email: data.email,
      password: data.password,
    });

    const result = await handleFinalRegister({
      fullName: registrationData.fullName,
      username: registrationData.username,
      email: data.email,
      password: data.password,
    });
    setLoading(false);

    if (result.success) {
      navigation.navigate("WelcomeScreen");
    } else {
      let errorMessage = "Ocorreu um erro ao cadastrar.";

      switch (result.code) {
        case "auth/email-already-in-use":
          errorMessage = "Este e-mail já está em uso.";
          break;
        default:
          errorMessage = result.error || "Erro desconhecido.";
      }
      Alert.alert("Erro no Cadastro", errorMessage);
    }
  };

  return (
    <Container>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <Input
            customBackground={theme.COLORS.GRAY6}
            placeholder="Digite o seu email"
            onChangeText={onChange}
            value={value}
            error={errors.email?.message}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      <Controller
        control={control}
        name="confirmEmail"
        render={({ field: { onChange, value } }) => (
          <Input
            customBackground={theme.COLORS.GRAY6}
            placeholder="Confirme o seu email"
            onChangeText={onChange}
            value={value}
            error={errors.confirmEmail?.message}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <Input
            customBackground={theme.COLORS.GRAY6}
            placeholder="Digite sua senha"
            onChangeText={onChange}
            value={value}
            error={errors.password?.message}
            secureTextEntry
          />
        )}
      />
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <Input
            customBackground={theme.COLORS.GRAY6}
            placeholder="Confirme sua senha"
            onChangeText={onChange}
            value={value}
            error={errors.confirmPassword?.message}
            secureTextEntry
          />
        )}
      />
      <CustomButton
        title={loading ? "Cadastrando..." : "Cadastrar"}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      />
    </Container>
  );
};

export default SignupProcessForm;
