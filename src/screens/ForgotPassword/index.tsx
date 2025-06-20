import CustomButton from "@components/CustomButton";
import Header from "@components/Header";
import React, { useState } from "react";
import { Container, ContainerInput } from "./styles";
import Title from "@components/Title";
import Input from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@contexts/authContext";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, ActivityIndicator } from "react-native";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

const schema = yup.object({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
});

type ForgotPasswordFormData = {
  email: string;
};

const ForgotPassword: React.FC = () => {
  const { sendPasswordReset } = useAuth();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(schema),
  });

  const handleSendResetEmail = async (data: ForgotPasswordFormData) => {
    setLoading(true);
    const result = await sendPasswordReset(data.email);
    setLoading(false);

    if (result.success) {
      Alert.alert(
        "E-mail Enviado",
        "Um link para redefinir sua senha foi enviado para seu e-mail. Verifique sua caixa de entrada e spam."
      );
      navigation.goBack();
    } else {
      let errorMessage = "Ocorreu um erro ao enviar o e-mail de redefinição.";
      switch (result.code) {
        case "auth/user-not-found":
          errorMessage = "Nenhuma conta encontrada com este e-mail.";
          break;
        case "auth/invalid-email":
          errorMessage = "O formato do e-mail é inválido.";
          break;
        default:
          errorMessage = result.error || "Erro desconhecido.";
      }
      Alert.alert("Erro", errorMessage);
    }
  };

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <Container>
        <Header onPress={handleGoBack} />
        <Title text={`Esqueceu sua ${"\n"}senha`} />
        <ContainerInput>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Digite seu e-mail..."
                onChangeText={onChange}
                value={value}
                error={errors.email?.message}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />
          <CustomButton
            title={loading ? "Enviando..." : "Confirmar"}
            onPress={handleSubmit(handleSendResetEmail)}
            disabled={loading}
          />
          {loading && (
            <ActivityIndicator
              size="small"
              color="#0000ff"
              style={{ marginTop: 10 }}
            />
          )}
        </ContainerInput>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default ForgotPassword;
