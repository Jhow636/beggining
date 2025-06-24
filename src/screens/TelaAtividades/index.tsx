import React from "react";
import { Container, MainWrapper, Title, Description, Wrapper } from "./styles";
import HeaderAtividades from "@components/HeaderAtividades";
import CustomButton from "@components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const TelaAtividade: React.FC = () => {
  const navigation = useNavigation();

  const handleTelaNiveis = () => {
    navigation.navigate("TelaNiveis");
  };

  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <Container>
      <HeaderAtividades iconBack={true} onPress={handleGoBack} />
      <MainWrapper>
        <Wrapper>
          <Title>Como Jogar?</Title>
          <Description>
            Escolha o nivel da sua materia, você deve identificar a resposta
            correta entre as opções em multipla escolha
          </Description>
          <CustomButton title="Começar" onPress={handleTelaNiveis} />
        </Wrapper>
      </MainWrapper>
    </Container>
  );
};

export default TelaAtividade;
