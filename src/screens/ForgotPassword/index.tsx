import CustomButton from "@components/CustomButton";
import Header from "@components/Header";
import React, { useState } from "react"; // Adicione useState para o loading
import { Container, ContainerInput } from "./styles";
import Title from "@components/Title";
import Input from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@contexts/authContext"; // Importe useAuth em vez de AuthContext diretamente
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, ActivityIndicator } from "react-native"; // Importe ActivityIndicator para o loading

const schema = yup.object({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
});

// Defina um tipo para os dados do formulário
type ForgotPasswordFormData = {
  email: string;
};

const ForgotPassword: React.FC = () => {
  // Use o hook useAuth para acessar as funções do contexto
  const { sendPasswordReset } = useAuth();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false); // Estado para controlar o loading

  const handleGoBack = () => {
    navigation.goBack();
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    // Adicione a tipagem ao useForm
    resolver: yupResolver(schema),
  });

  const handleSendResetEmail = async (data: ForgotPasswordFormData) => {
    // Tipagem para 'data'
    setLoading(true); // Ativa o loading
    const result = await sendPasswordReset(data.email);
    setLoading(false); // Desativa o loading

    if (result.success) {
      Alert.alert(
        "E-mail Enviado",
        "Um link para redefinir sua senha foi enviado para seu e-mail. Verifique sua caixa de entrada e spam."
      );
      navigation.goBack(); // Volta para a tela de login ou anterior
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
          errorMessage = result.error || "Erro desconhecido."; // Garante uma mensagem padrão
      }
      Alert.alert("Erro", errorMessage);
    }
  };

  return (
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
              keyboardType="email-address" // Melhoria: teclado de e-mail
              autoCapitalize="none" // Melhoria: desativar auto-capitalização
            />
          )}
        />
        <CustomButton
          title={loading ? "Enviando..." : "Confirmar"} // Mostra "Enviando..." enquanto carrega
          onPress={handleSubmit(handleSendResetEmail)}
          disabled={loading} // Desabilita o botão enquanto carrega
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
  );
};

export default ForgotPassword;
