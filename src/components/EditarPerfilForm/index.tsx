import React from "react";
import {
  Container,
  Title,
  ContainerButtons,
  InputPassword,
  TextInputPassword,
} from "./styles";
import { TouchableOpacity, ScrollView } from "react-native";
import CustomButton from "@components/CustomButton";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@contexts/authContext";
import Input from "@components/Input";
import { useTheme } from "styled-components";
import { ActivityIndicator, View } from "react-native";

const schema = yup
  .object({
    username: yup.string().required("Nome de usuário é obrigatório"),
    name: yup.string().required("Nome é obrigatório"),
    email: yup
      .string()
      .email("E-mail inválido")
      .required("E-mail é obrigatório"),
  })
  .required();

type InputData = {
  username: string;
  name: string;
  email: string;
};

const EditarPerfilForm: React.FC = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const { userProfile, loading } = useAuth();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<InputData>({
    resolver: yupResolver(schema),

    defaultValues: {
      username: userProfile?.username || "",
      name: userProfile?.fullName || "",
      email: userProfile?.email || "",
    },
  });

  const handleChangePassword = () => {
    navigation.navigate("MudarSenha");
  };

  const onSubmit = (data: InputData) => {
    console.log("Dados do formulário a serem enviados:", data);
  };

  if (!userProfile) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={theme.COLORS.PRIMARY} />
      </View>
    );
  }

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Nome de Usuário</Title>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, value } }) => (
            <Input
              customBackground={theme.COLORS.GRAY6}
              colorText={theme.COLORS.DARKGRAY}
              placeholder={`@${userProfile?.username}`}
              onChangeText={onChange}
              value={value}
              error={errors.username?.message}
              autoCapitalize="none"
            />
          )}
        />
        <Title>Nome Completo</Title>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              colorText={theme.COLORS.DARKGRAY}
              customBackground={theme.COLORS.GRAY6}
              placeholder={`${userProfile?.fullName}`}
              onChangeText={onChange}
              value={value}
              error={errors.name?.message}
            />
          )}
        />
        <Title>Senha</Title>
        <TouchableOpacity onPress={handleChangePassword}>
          <InputPassword>
            <TextInputPassword>******</TextInputPassword>
          </InputPassword>
        </TouchableOpacity>
        <Title>E-mail</Title>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              customBackground={theme.COLORS.GRAY6}
              colorText={theme.COLORS.DARKGRAY}
              placeholder={`${userProfile?.email}`}
              onChangeText={onChange}
              value={value}
              error={errors.email?.message}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />
        <ContainerButtons>
          <CustomButton
            title={loading ? "Salvando..." : "Salvar"}
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
          />
          <CustomButton title="Excluir Conta" />
        </ContainerButtons>
      </ScrollView>
    </Container>
  );
};

export default EditarPerfilForm;
