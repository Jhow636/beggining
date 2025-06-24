import CustomButton from "@components/CustomButton";
import Input from "@components/Input";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container } from "./styles";
import { useAuth } from "@contexts/authContext";

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
  const { loginUser } = useAuth();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<InputData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: InputData) => {
    setLoading(true);

    const result = await loginUser(data.email, data.password);
    setLoading(false);

    if (result.success) {
      navigation.navigate("Home");
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
            keyboardType="email-address"
            autoCapitalize="none"
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
        title={loading ? "Entrando..." : "Entrar"}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      />
    </Container>
  );
};

export default SignInForm;
