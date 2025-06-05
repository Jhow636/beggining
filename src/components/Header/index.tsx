import React from "react";
import { Container, Image } from "./styles";
import IconeFechar from "@assets/images/esc.png";
import { TouchableOpacityProps } from "react-native";

interface HeaderProps extends TouchableOpacityProps {}

const Header: React.FC<HeaderProps> = ({ ...rest }) => {
  return (
    <Container {...rest}>
      <Image source={IconeFechar} />
    </Container>
  );
};

export default Header;
