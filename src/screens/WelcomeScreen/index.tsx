import { AuthContext } from "@contexts/authContext";
import React, { useContext } from "react";
import Title from "@components/Title";
import {
  Container,
  Description,
  ContainerButton,
  Text,
  HeaderTitle,
} from "./styles";
import CustomButton from "@components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { userProfile } = useContext(AuthContext);
  const handleStartApp = () => {
    navigation.navigate("MainPage");
  };
  return (
    <Container>
      <HeaderTitle>
        <Title text={`Bem-vindo ${"\n"} @${userProfile.username}!`} />
      </HeaderTitle>
      <Description>
        <Text>
          O projeto beginning tem o objetivo de tornar os estudos mais fluidos e
          acessiveis
          {"\n"}
          {"\n"}
          Aqui, disponibilizamos vários módulos de diferentes niveis sobre
          Ingles para que voce possa adquirir a oportunidade de apreender mais
          um idioma.
          {"\n"}
          {"\n"}O projeto não é vinculado a instituições de ensino, não
          viabilizando um diploma.
        </Text>
      </Description>
      <ContainerButton>
        <CustomButton title="Continuar" onPress={handleStartApp} />
      </ContainerButton>
    </Container>
  );
};

export default WelcomeScreen;
