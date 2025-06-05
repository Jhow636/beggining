import CustomButton from "@components/CustomButton";
import Input from "@components/Input";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container } from "./styles";
import { useNavigation } from "@react-navigation/native";

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
  const handleFormSubmit = (data: any) => {
    console.log("Form data submitted:", data);
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
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Digite seu email"
            onChangeText={onChange}
            value={value}
            error={errors.email?.message}
          />
        )}
        name="email"
      />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Digite sua senha"
            onChangeText={onChange}
            value={value}
            secureTextEntry
            error={errors.password?.message}
          />
        )}
        name="password"
      />
      <CustomButton title="Entrar" onPress={handleSubmit(handleFormSubmit)} />
    </Container>
  );
};

export default SignInForm;
