import React from "react";
import { TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

import { Button, ButtonText } from "./styles";

const CustomButton: React.FC<ButtonProps> = ({ title, ...rest }) => {
  return (
    <Button {...rest}>
      <ButtonText>{title}</ButtonText>
    </Button>
  );
};

export default CustomButton;
