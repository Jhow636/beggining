import CustomButton from "@components/CustomButton";
import Input from "@components/Input";
import React, { useState } from "react"; // Adicione useState para o loading
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container } from "./styles";
import { useAuth } from "@contexts/authContext"; // Use useAuth hook para consumir o contexto
import { Alert, ActivityIndicator } from "react-native"; // Importe Alert e ActivityIndicator
import { useNavigation } from "@react-navigation/native"; // Para navegação

const schema = yup.object({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .required("Senha é obrigatória"),
});

type InputData = {
  email: string;
  password: string;
};

const SignInForm: React.FC = () => {
  // Use o hook `useAuth` para acessar o contexto
  const { loginUser } = useAuth();
  const navigation = useNavigation(); // Hook de navegação
  const [loading, setLoading] = useState(false); // Estado para controlar o loading

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<InputData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: InputData) => {
    // Renomeado para `onSubmit` para clareza
    setLoading(true); // Ativa o loading

    const result = await loginUser(data.email, data.password); // Usa async/await para aguardar o resultado
    setLoading(false); // Desativa o loading

    if (result.success) {
      Alert.alert("Sucesso", "Login realizado com sucesso!");
      // O `onAuthStateChanged` no AuthContext já vai atualizar o estado global
      // Aqui você pode navegar para a tela principal
      navigation.navigate("Home"); // Certifique-se de que 'Home' é uma rota válida
    } else {
      let errorMessage = "Ocorreu um erro ao fazer login.";
      // Trata erros específicos do Firebase Auth
      switch (result.code) {
        case "auth/user-not-found":
          errorMessage = "Nenhuma conta encontrada com este e-mail.";
          break;
        case "auth/wrong-password":
          errorMessage = "Senha incorreta.";
          break;
        case "auth/invalid-email":
          errorMessage = "O formato do e-mail é inválido.";
          break;
        default:
          errorMessage = result.error || "Erro desconhecido."; // Mensagem padrão para outros erros
      }
      Alert.alert("Erro no Login", errorMessage);
    }
  };

  return (
    <Container>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Digite seu email"
            onChangeText={onChange}
            value={value}
            error={errors.email?.message}
            keyboardType="email-address" // Boa prática
            autoCapitalize="none" // Boa prática
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Digite sua senha"
            onChangeText={onChange}
            value={value}
            secureTextEntry
            error={errors.password?.message}
          />
        )}
      />
      <CustomButton
        title={loading ? "Entrando..." : "Entrar"} // Mostra "Entrando..." quando carregando
        onPress={handleSubmit(onSubmit)} // Chama `onSubmit` através de `handleSubmit`
        disabled={loading} // Desabilita o botão enquanto carrega
      />
      {loading && (
        <ActivityIndicator
          size="small"
          color="#0000ff"
          style={{ marginTop: 10 }}
        />
      )}
    </Container>
  );
};

export default SignInForm;
