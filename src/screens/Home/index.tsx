import React from "react";
import HomeButton from "@components/HomeButton";
import {
  Container,
  Content,
  Image,
  Title,
  ButtonContainer,
  Description,
} from "./styles";
import { useNavigation } from "@react-navigation/native";

import camaleaoImage from "@assets/images/camaleao.png";

const Home: React.FC = () => {
  const navigation = useNavigation();

  const handleNavigateToUserRegistration = () => {
    navigation.navigate("UserRegistration");
  };

  const handleNavigateToSignIn = () => {
    navigation.navigate("SignIn");
  };

  return (
    <Container>
      <Content>
        <Image source={camaleaoImage} />
        <Title>BEGINNING</Title>
        <Description>O começo do seu {"\n"} aprendizado</Description>
      </Content>
      <ButtonContainer>
        <HomeButton
          onPress={handleNavigateToUserRegistration}
          title="COMEÇAR AGORA"
          variant="primary"
        />
        <HomeButton
          title="JÁ TENHO UMA CONTA"
          variant="secondary"
          onPress={handleNavigateToSignIn}
        />
      </ButtonContainer>
    </Container>
  );
};

export default Home;
