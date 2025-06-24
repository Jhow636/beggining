import React from "react";
import { Container, Title } from "./styles";
import { Image } from "react-native";
import { TouchableOpacityProps, TouchableOpacity } from "react-native";
import IconeFechar from "@assets/images/esc.png";

interface HeaderAtividadesProps extends TouchableOpacityProps {
  iconBack?: boolean;
  title?: string;
}

const HeaderAtividades: React.FC<HeaderAtividadesProps> = ({
  iconBack,
  title,
  ...rest
}) => {
  return (
    <Container>
      {iconBack && (
        <TouchableOpacity {...rest}>
          <Image
            source={IconeFechar}
            style={{
              width: 34,
              height: 34,
            }}
          />
        </TouchableOpacity>
      )}
      <Title>{title}</Title>
    </Container>
  );
};
export default HeaderAtividades;
