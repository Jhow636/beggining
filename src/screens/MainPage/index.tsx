import React from "react";
import {
  Container,
  Wrapper,
  MainWrapper,
  Title,
  CardAssistindo,
  Text,
} from "./styles";
import MainHeader from "@components/MainHeader";
import { StatusBar } from "expo-status-bar";
import CardsMaterias from "@components/CardsMaterias";
import { useTheme } from "styled-components";
import { Gradient } from "@components/CardMateria/styles";
import {
  ALL_MATERIAS_CONTENT,
  findMateriaContentById,
} from "../../data/materiasContent";
import { useNavigation } from "@react-navigation/native";

const MainPage: React.FC = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const handleMateriaCardToExplanation = (
    materia: (typeof ALL_MATERIAS_CONTENT)[0]
  ) => {
    const materiaDetails = findMateriaContentById(materia.id);

    if (materiaDetails && materiaDetails.explanationTextId) {
      navigation.navigate("MateriaExplicacao", {
        explanationId: materiaDetails.explanationTextId,
        materiaTitle: materia.title,
      });
    } else {
      Alert.alert(
        // <<< Alert agora funciona
        "Ops!",
        `A matéria '${materia.title}' não possui uma explicação disponível.`
      );
    }
  };
  return (
    <Container>
      <StatusBar />
      <MainHeader />
      <MainWrapper>
        <Title>Vamos começar com:</Title>
        <CardAssistindo>
          <Gradient
            colors={[`${theme.COLORS.SECONDARY}`, `${theme.COLORS.TERTIARY}`]}
            style={{
              flex: 1,
              alignItems: "center",
            }}
          >
            <Text>B - 1</Text>
          </Gradient>
        </CardAssistindo>
        <Wrapper>
          <Title>Matérias</Title>
          <CardsMaterias onCardPress={handleMateriaCardToExplanation} />
        </Wrapper>
      </MainWrapper>
    </Container>
  );
};

export default MainPage;
