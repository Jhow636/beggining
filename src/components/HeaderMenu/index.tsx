import React from "react";
import IconMenu from "@assets/images/iconMenu.png";
import { Container, Image, Title, Wrapper } from "./styles";
import IconeFechar from "@assets/images/esc.png";
import { TouchableOpacityProps, TouchableOpacity } from "react-native";

interface HeaderMenuProps extends TouchableOpacityProps {
  title: string;
  iconBack?: boolean;
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({
  title,
  iconBack,
  ...rest
}) => {
  return (
    <Container>
      <Wrapper>
        {iconBack && (
          <TouchableOpacity
            {...rest}
            style={{ width: 34, height: 34, position: "absolute", left: 30 }}
          >
            <Image source={IconeFechar} />
          </TouchableOpacity>
        )}
        <Image source={IconMenu} />
        <Title>{title}</Title>
      </Wrapper>
    </Container>
  );
};

export default HeaderMenu;
