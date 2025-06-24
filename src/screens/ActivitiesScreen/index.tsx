import React from "react";
import {
  Container,
  MainWrapper,
  Wrapper,
  Title,
  MainTitle,
  Card,
  Text,
} from "./styles";
import { useNavigation } from "@react-navigation/native";
import MainHeader from "@components/MainHeader";
import { TouchableOpacity } from "react-native";

import EquipeImage from "@assets/images/equipe.png";

const ActivitiesScreen: React.FC = () => {
  const navigation = useNavigation();
  const handleNavigateToQuestions = () => {
    navigation.navigate("TelaAtividade");
  };

  const handleNavigateToCards = () => {
    navigation.navigate("TelaTutorialCards");
  };
  return (
    <Container>
      <MainHeader />
      <MainWrapper>
        <MainTitle>Vocabulary</MainTitle>
        <Wrapper>
          <Title>Cards</Title>
          <TouchableOpacity onPress={handleNavigateToCards}>
            <Card>
              <Text>Words - Grow your knowledge</Text>
            </Card>
          </TouchableOpacity>
        </Wrapper>
        <Wrapper>
          <Title>Questions</Title>
          <TouchableOpacity onPress={handleNavigateToQuestions}>
            <Card>
              <Text>Remember your knowledge</Text>
            </Card>
          </TouchableOpacity>
        </Wrapper>
      </MainWrapper>
    </Container>
  );
};

export default ActivitiesScreen;
