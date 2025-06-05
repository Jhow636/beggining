import React from "react";
import { Container, Image, ButtonBack } from "./styles";
import IconeFechar from "@assets/images/esc.png";
import { TouchableOpacityProps } from "react-native";

interface HeaderProps extends TouchableOpacityProps {}

const Header: React.FC<HeaderProps> = ({ ...rest }) => {
  return (
    <Container>
      <ButtonBack {...rest}>
        <Image source={IconeFechar} />
      </ButtonBack>
    </Container>
  );
};

export default Header;
