import styled, { DefaultTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: ${RFValue(60)}px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.DARKGRAY};
  justify-content: center;
  margin-left: ${RFValue(50)}px;
`;

export const Image = styled.Image`
  width: ${RFValue(34)}px;
  height: ${RFValue(34)}px;
  margin-right: 16px;
`;
