import React from "react";
import { TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary" | "default";
}

import { Button, ButtonText } from "./styles";

const CustomButton: React.FC<ButtonProps> = ({ variant, title, ...rest }) => {
  return (
    <Button variant={variant} {...rest}>
      <ButtonText>{title}</ButtonText>
    </Button>
  );
};

export default CustomButton;
