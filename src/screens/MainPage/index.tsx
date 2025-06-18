import React from "react";
import { Container, Wrapper, MainWrapper, Title } from "./styles";
import MainHeader from "@components/MainHeader";
import { StatusBar } from "expo-status-bar";

const MainPage: React.FC = () => {
  return (
    <Container>
      <StatusBar />
      <MainWrapper>
        <MainHeader />
        <Wrapper>
          <Title>Continuar estudando</Title>
        </Wrapper>
        <Wrapper>
          <Title>Matérias</Title>
        </Wrapper>
      </MainWrapper>
    </Container>
  );
};

export default MainPage;
