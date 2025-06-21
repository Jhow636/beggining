import React from "react";
import { CustomInput } from "./style";
import { TextInputProps } from "react-native";
import { ContainerInput, ErrorText } from "./style";
import { useTheme } from "styled-components/native";
interface InputProps extends TextInputProps {
  error?: string;
  customBackground?: string;
  customColor?: string;
  colorText?: string;
}

const Input: React.FC<InputProps> = ({
  error,
  customBackground,
  customColor,
  colorText,
  ...rest
}) => {
  const theme = useTheme();
  return (
    <ContainerInput>
      <CustomInput
        customBackground={customBackground}
        {...rest}
        placeholderTextColor={customColor}
        colorText={colorText}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </ContainerInput>
  );
};

export default Input;
