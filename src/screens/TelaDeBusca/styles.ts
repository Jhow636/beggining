import styled, { DefaultTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.SECONDARY};
`;

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.WHITE};
`;

export const Header = styled.View`
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.SECONDARY};
  border-bottom-left-radius: ${RFValue(20)}px;
  border-bottom-right-radius: ${RFValue(20)}px;
  flex-direction: row;
  height: ${RFValue(120)}px;
  align-items: center;
  justify-content: center;
`;

export const ContainerInput = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const StyledIcon = styled.TouchableOpacity`
  width: ${RFValue(20)}px;
  height: ${RFValue(20)}px;
  position: absolute;
  right: ${RFValue(40)}px;
  z-index: 1;
`;

export const Busca = styled.TextInput`
  width: 90%;
  height: ${RFValue(40)}px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.GRAY4};
  border-radius: ${RFValue(20)}px;
  justify-content: center;
  padding-left: ${RFValue(10)}px;
  padding-right: ${RFValue(50)}px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.WHITE};
`;

export const Content = styled.View`
  flex: 1;

  padding: ${RFValue(20)}px;
`;

export const ListaConteudo = styled.FlatList`
  width: 100%;
  padding: ${RFValue(10)}px;
`;
