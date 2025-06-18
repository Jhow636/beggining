import React, { useState, useContext } from "react"; // Remova 'useContext' pois você usará 'useAuth'
import { Container } from "./style";
import { AuthContext, useAuth } from "@contexts/authContext"; // Importe 'useAuth' diretamente
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@components/Input";
import CustomButton from "@components/CustomButton";
import { Alert } from "react-native"; // Importe Alert para exibir mensagens
import { useNavigation } from "@react-navigation/native"; // Importe useNavigation

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
  confirmEmail: string; // Embora validado, não é enviado ao Firebase
  password: string;
  confirmPassword: string; // Embora validado, não é enviado ao Firebase
};

const SignupProcessForm: React.FC = () => {
  // Use useAuth() para acessar os valores do contexto
  const { handleFinalRegister, updateRegistrationData, registrationData } =
    useAuth();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation(); // Hook para navegação

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<InputData>({ resolver: yupResolver(schema) }); // Especifique o tipo para useForm

  const onSubmit = async (data: InputData) => {
    // Especifique o tipo para 'data'
    setLoading(true);

    // Primeiro, atualiza o Context com os dados desta tela (email e senha)
    // Isso é crucial para que 'handleFinalRegister' tenha todos os dados (nome, username, email, senha)
    updateRegistrationData({
      email: data.email,
      password: data.password,
    });

    // Agora, chama a função final de registro que usa TODOS os dados do Context.
    // 'handleFinalRegister' já espera email e password como parâmetros para passar ao registerUser.
    const result = await handleFinalRegister({
      fullName: registrationData.fullName,
      username: registrationData.username,
      email: data.email,
      password: data.password,
    }); // Passe email e password aqui
    setLoading(false);

    if (result.success) {
      navigation.navigate("WelcomeScreen");
    } else {
      let errorMessage = "Ocorreu um erro ao cadastrar.";
      // Use o código do erro para dar feedback mais específico ao usuário
      switch (result.code) {
        case "auth/email-already-in-use":
          errorMessage = "Este e-mail já está em uso.";
          break;
        default:
          errorMessage = result.error || "Erro desconhecido."; // Garante uma mensagem padrão
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
            placeholder="Digite o seu email"
            onChangeText={onChange}
            value={value}
            error={errors.email?.message}
            keyboardType="email-address" // Adicionado
            autoCapitalize="none" // Adicionado
          />
        )}
      />
      {/* Campo confirmEmail */}
      <Controller
        control={control}
        name="confirmEmail"
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Confirme o seu email"
            onChangeText={onChange}
            value={value}
            error={errors.confirmEmail?.message}
            keyboardType="email-address" // Adicionado
            autoCapitalize="none" // Adicionado
          />
        )}
      />
      {/* Campo password */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Digite sua senha"
            onChangeText={onChange}
            value={value}
            error={errors.password?.message}
            secureTextEntry // Adicionado para senhas
          />
        )}
      />
      {/* Campo confirmPassword */}
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Confirme sua senha"
            onChangeText={onChange}
            value={value}
            error={errors.confirmPassword?.message}
            secureTextEntry // Adicionado para senhas
          />
        )}
      />
      <CustomButton
        title={loading ? "Cadastrando..." : "Cadastrar"}
        onPress={handleSubmit(onSubmit)} // O React Hook Form chama 'onSubmit' com os dados validados
        disabled={loading}
      />
    </Container>
  );
};

export default SignupProcessForm;
