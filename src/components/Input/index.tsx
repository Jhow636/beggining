import React from "react";
import { CustomInput } from "./style";
import { TextInputProps } from "react-native";
import { ContainerInput, ErrorText } from "./style";

interface InputProps extends TextInputProps {
  error?: string;
}

const Input: React.FC<InputProps> = ({ error, ...rest }) => {
  return (
    <ContainerInput>
      <CustomInput {...rest} placeholderTextColor="#B3B3B3" />
      {error && <ErrorText>{error}</ErrorText>}
    </ContainerInput>
  );
};

export default Input;
