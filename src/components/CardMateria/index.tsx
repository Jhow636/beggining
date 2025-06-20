import React from "react";
import { Container, Gradient, Title } from "./styles";
import { useTheme } from "styled-components";
import { TouchableOpacityProps } from "react-native";

interface CardMateriaProps extends TouchableOpacityProps {
  title: string;
}

const CardMateria: React.FC<CardMateriaProps> = ({ title, ...rest }) => {
  const theme = useTheme();
  return (
    <Container {...rest}>
      <Gradient
        colors={[`${theme.COLORS.SECONDARY}`, `${theme.COLORS.TERTIARY}`]}
        style={{ flex: 1 }}
      >
        <Title>{title}</Title>
      </Gradient>
    </Container>
  );
};

export default CardMateria;
