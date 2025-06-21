import React from "react";
import {
  Container,
  Wrapper,
  Header,
  Busca,
  Content,
  ContainerInput,
  StyledIcon,
} from "./styles";
import Icon from "@react-native-vector-icons/feather";
import CardsMaterias from "@components/CardsMaterias";
import { useNavigation } from "@react-navigation/native";

import {
  ALL_MATERIAS_CONTENT,
  findMateriaContentById,
} from "../../data/materiasContent";

import { useTheme } from "styled-components";

const TelaDeBusca: React.FC = () => {
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
        "Ops!",
        `A matéria '${materia.title}' não possui uma explicação disponível.`
      );
    }
  };
  return (
    <Container>
      <Wrapper>
        <Header>
          <ContainerInput>
            <Busca
              placeholder="Buscar conteúdo..."
              placeholderTextColor={theme.COLORS.WHITE}
              autoCapitalize="none"
            />
            <StyledIcon>
              <Icon name="search" size={20} color={theme.COLORS.WHITE} />
            </StyledIcon>
          </ContainerInput>
        </Header>
        <Content>
          <CardsMaterias onCardPress={handleMateriaCardToExplanation} />
        </Content>
      </Wrapper>
    </Container>
  );
};

export default TelaDeBusca;
