import React from "react";
import {
  Container,
  Wrapper,
  Header,
  Busca,
  Content,
  ListaConteudo,
  ContainerInput,
  StyledIcon,
} from "./styles";
import Icon from "@react-native-vector-icons/feather";
import CardsMaterias from "@components/CardsMaterias";

import { useTheme } from "styled-components";

const TelaDeBusca: React.FC = () => {
  const theme = useTheme();
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
          <CardsMaterias />
        </Content>
      </Wrapper>
    </Container>
  );
};

export default TelaDeBusca;
