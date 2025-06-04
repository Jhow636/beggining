import React from "react";
import { Container, Image } from "./styles";
import IconeFechar from "@assets/images/esc.png";

const Header: React.FC = () => {
  return (
    <Container>
      <Image source={IconeFechar} />
    </Container>
  );
};

export default Header;
