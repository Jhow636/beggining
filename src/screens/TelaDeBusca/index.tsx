import React from "react";
import { Alert } from "react-native"; // <<< Importe Alert
import {
  Container,
  Wrapper,
  Header,
  Busca,
  Content,
  ContainerInput,
  StyledIcon,
} from "./styles";
import Icon from "@react-native-vector-icons/feather"; // Certifique-se que @react-native-vector-icons/feather está instalado
import CardsMaterias from "@components/CardsMaterias";
import { useNavigation } from "@react-navigation/native"; // <<< useNavigation já está importado

import {
  ALL_MATERIAS_CONTENT,
  findMateriaContentById,
} from "../../data/materiasContent";

import { useTheme } from "styled-components";

const TelaDeBusca: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation(); // <<< CORREÇÃO: Desestruture navigation do hook

  const handleMateriaCardToExplanation = (
    materia: (typeof ALL_MATERIAS_CONTENT)[0]
  ) => {
    const materiaDetails = findMateriaContentById(materia.id);

    if (materiaDetails && materiaDetails.explanationTextId) {
      // Certifique-se que "MateriaExplicacao" é o nome da rota no seu Stack Navigator
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
