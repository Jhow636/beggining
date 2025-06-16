import React, { useContext } from "react";
import Input from "@components/Input";
import { Container } from "./style";
import CustomButton from "@components/CustomButton";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "@contexts/authContext";

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
  const { setRegistrationData } = useContext(AuthContext);

  const handleFormSubmit = (data: InputData) => {
    setRegistrationData({
      fullName: data.name,
      username: data.username,
    });
    navigation.navigate("SignUpProcess");
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Digite o nome do seu usuário"
            onChangeText={onChange}
            value={value}
            error={errors.username?.message}
          />
        )}
        name="username"
      />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Digite o seu nome"
            onChangeText={onChange}
            value={value}
            error={errors.name?.message}
          />
        )}
        name="name"
      />

      <CustomButton title="PRÓXIMO" onPress={handleSubmit(handleFormSubmit)} />
    </Container>
  );
};

export default UserRegistrationForm;
