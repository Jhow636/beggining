import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Button, Text } from "./styles";

interface BotaoMenuProps extends TouchableOpacityProps {
  text: string;
}

const BotaoMenu: React.FC<BotaoMenuProps> = ({ text, ...rest }) => {
  return (
    <Button {...rest}>
      <Text>{text}</Text>
    </Button>
  );
};

export default BotaoMenu;
