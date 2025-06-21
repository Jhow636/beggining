import React from "react";
import { Container } from "./styles";
import { Image } from "react-native";
import { TouchableOpacityProps, TouchableOpacity } from "react-native";
import IconeFechar from "@assets/images/esc.png";

interface HeaderAtividadesProps extends TouchableOpacityProps {
  iconBack?: boolean;
}

const HeaderAtividades: React.FC<HeaderAtividadesProps> = ({
  iconBack,
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
              position: "absolute",
              right: 130,
              bottom: -10,
            }}
          />
        </TouchableOpacity>
      )}
    </Container>
  );
};
export default HeaderAtividades;
