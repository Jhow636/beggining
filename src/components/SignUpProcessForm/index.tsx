import React, { useContext } from "react";
import { Container } from "./style";
import { AuthContext } from "@contexts/authContext";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@components/Input";
import CustomButton from "@components/CustomButton";
import { useRoute } from "@react-navigation/native";

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
  const { registerUser } = useContext(AuthContext);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  const handleFormSubmit = (data: any) => {
    registerUser(data.email, data.password)
      .then((response: any) => {})
      .catch((error) => {
        console.error("Erro ao cadastrar", error);
      });
  };

  return (
    <Container>
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
      <CustomButton
        title="CADASTRAR"
        onPress={handleSubmit(handleFormSubmit)}
      />
    </Container>
  );
};

export default SignupProcessForm;
