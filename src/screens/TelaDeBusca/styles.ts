import styled, { DefaultTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import Icon from "@react-native-vector-icons/feather";

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
  width: 100%;
  height: ${RFValue(120)}px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.SECONDARY};
  justify-content: center;
  align-items: center;
`;

export const ContainerInput = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const StyledIcon = styled.TouchableOpacity`
  width: ${RFValue(20)}px;
  height: ${RFValue(20)}px;
  position: absolute;
  right: ${RFValue(10)}px;
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
  padding-right: ${RFValue(40)}px;
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
