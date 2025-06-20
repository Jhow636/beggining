import styled, { DefaultTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";

export const Container = styled.TouchableOpacity``;

export const Gradient = styled(LinearGradient)`
  width: 100%;
  height: ${RFValue(65)}px;
  border-radius: ${RFValue(10)}px;
  align-items: flex-start;
  justify-content: center;
  padding-left: ${RFValue(20)}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.REGULAR};
  font-size: ${RFValue(24)}px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.WHITE};
`;
