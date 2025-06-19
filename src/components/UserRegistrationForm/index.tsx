import React from "react"; // Remova useContext, pois usará useAuth
import Input from "@components/Input";
import { Container } from "./styles";
import CustomButton from "@components/CustomButton";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
// Importe useAuth, que é o hook personalizado para seu contexto
import { useAuth } from "@contexts/authContext";

const schema = yup
  .object({
    username: yup.string().required("Nome de usuário é obrigatório"),
    name: yup.string().required("Nome é obrigatório"),
  })
  .required();

type InputData = {
  username: string;
  name: string;
};

const UserRegistrationForm: React.FC = () => {
  const navigation = useNavigation();
  // Use o hook personalizado useAuth para acessar setRegistrationData
  const { updateRegistrationData } = useAuth(); // Use updateRegistrationData

  const handleFormSubmit = (data: InputData) => {
    // Chame updateRegistrationData para mesclar os novos dados no contexto
    updateRegistrationData({
      fullName: data.name,
      username: data.username, // Mantenha os dados anteriores
    });
    // Certifique-se de que 'SignUpProcess' é o nome da rota da sua próxima tela de cadastro (e-mail/senha)
    navigation.navigate("SignUpProcess");
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<InputData>({
    // Adicione a tipagem para useForm
    resolver: yupResolver(schema),
  });

  return (
    <Container>
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Digite o nome do seu usuário"
            onChangeText={onChange}
            value={value}
            error={errors.username?.message}
            autoCapitalize="none" // Boas práticas para nomes de usuário
          />
        )}
      />
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Digite o seu nome"
            onChangeText={onChange}
            value={value}
            error={errors.name?.message}
          />
        )}
      />

      <CustomButton title="PRÓXIMO" onPress={handleSubmit(handleFormSubmit)} />
    </Container>
  );
};

export default UserRegistrationForm;
