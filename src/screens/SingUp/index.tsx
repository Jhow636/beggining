import React from "react";
import {
  Container,
  Title,
  Form,
  Footer,
  Description,
  CheckBox,
  Strong,
} from "./styles";
import Header from "@components/Header";
import CustomButton from "@components/CustomButton";

const SignUp: React.FC = () => {
  return (
    <Container>
      <Header />
      <Title>Cadastro de {"\n"} Usuário</Title>
      <Form></Form>
      <CustomButton title="ENTRAR" />
      <Footer>
        <CheckBox />
        <Description>
          Ao entrar em nossa plataforma, você concorda com os nossos
          <Strong> Termos</Strong> e<Strong> Políticas de Privacidade</Strong>
        </Description>
      </Footer>
    </Container>
  );
};

export default SignUp;
