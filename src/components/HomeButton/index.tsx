import React from "react";
import { TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary";
}

import { Button, ButtonText } from "./style";

const HomeButton: React.FC<ButtonProps> = ({ variant, title, ...rest }) => {
  return (
    <Button variant={variant} {...rest}>
      <ButtonText variant={variant}>{title}</ButtonText>
    </Button>
  );
};

export default HomeButton;
