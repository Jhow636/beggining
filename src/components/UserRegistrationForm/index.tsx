import React from "react"; // Remova useContext, pois usará useAuth
import Input from "@components/Input";
import { Container } from "./styles";
import CustomButton from "@components/CustomButton";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";
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
  const theme = useTheme();
  const { updateRegistrationData } = useAuth();

  const handleFormSubmit = (data: InputData) => {
    updateRegistrationData({
      username: data.username,
      fullName: data.name,
    });

    navigation.navigate("SignUpProcess");
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<InputData>({
    resolver: yupResolver(schema),
  });

  return (
    <Container>
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, value } }) => (
          <Input
            customBackground={theme.COLORS.GRAY6}
            placeholder="Digite o nome do seu usuário"
            onChangeText={onChange}
            value={value}
            error={errors.username?.message}
            autoCapitalize="none"
          />
        )}
      />
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <Input
            customBackground={theme.COLORS.GRAY6}
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
