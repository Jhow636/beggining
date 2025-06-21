import React from "react";
import { Container, MainWrapper, Wrapper, Title } from "./styles";
import HeaderMenu from "@components/HeaderMenu";
import { AuthContext } from "@contexts/authContext";
import BotaoMenu from "@components/BotaoMenu";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

const Menu: React.FC = () => {
  const { userProfile, logoutUser } = React.useContext(AuthContext);
  const navigation = useNavigation();

  const handleTermosRegulamentoPress = () => {
    navigation.navigate("TermosRegulamento");
  };

  const handleProfilePress = () => {
    navigation.navigate("TelaPerfil");
  };

  const handleTelaAjudaPress = () => {
    navigation.navigate("TelaAjuda");
  };

  const handleLogout = async () => {
    Alert.alert(
      "Sair da Conta",
      "Tem certeza que deseja sair?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sair",
          onPress: async () => {
            const { success, error } = await logoutUser();

            if (success) {
              console.log("Usuário deslogado com sucesso!");
            } else {
              console.error("Erro ao deslogar:", error);
              Alert.alert(
                "Erro",
                "Não foi possível sair da conta. Tente novamente."
              );
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <Container>
      <HeaderMenu title={userProfile.fullName} />
      <MainWrapper>
        <Wrapper>
          <Title>Conta</Title>
          <BotaoMenu text="Perfil" onPress={handleProfilePress} />
          <BotaoMenu text="Sair" onPress={handleLogout} />
        </Wrapper>

        <Wrapper>
          <Title>Suporte</Title>
          <BotaoMenu text="Ajuda" onPress={handleTelaAjudaPress} />
          <BotaoMenu
            text="Termos e Regulamento"
            onPress={handleTermosRegulamentoPress}
          />
        </Wrapper>
      </MainWrapper>
    </Container>
  );
};

export default Menu;
