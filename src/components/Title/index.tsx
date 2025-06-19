import React from "react";
import { Text } from "./styles";

interface TitleProps {
  text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => {
  return <Text>{text}</Text>;
};

export default Title;
