import React from "react";
import Input from "@components/Input";
import { Container } from "./style";
import CustomButton from "@components/CustomButton";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object({
    username: yup.string().required("Nome de usuário é obrigatório"),
    name: yup.string().required("Nome é obrigatório"),
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
  })
  .required();

type InputData = {
  username: string;
  name: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
};

const Form: React.FC = () => {
  const handleFormSubmit = (data: InputData) => {
    console.log("Form data submitted:", data);
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
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Digite o seu email"
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
            placeholder="Confirme o seu email"
            onChangeText={onChange}
            value={value}
            error={errors.confirmEmail?.message}
          />
        )}
        name="confirmEmail"
      />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Digite sua senha"
            onChangeText={onChange}
            value={value}
            error={errors.password?.message}
          />
        )}
        name="password"
      />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Confirme sua senha"
            onChangeText={onChange}
            value={value}
            error={errors.confirmPassword?.message}
          />
        )}
        name="confirmPassword"
      />
      <CustomButton title="ENTRAR" onPress={handleSubmit(handleFormSubmit)} />
    </Container>
  );
};

export default Form;
