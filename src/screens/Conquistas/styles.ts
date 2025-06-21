import styled, { DefaultTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { FlatList, View, ScrollView } from "react-native"; // Certifique-se que ScrollView está importado
import { Ionicons } from "@expo/vector-icons"; // Para os ícones de troféu e cadeado

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.SECONDARY};
`;

export const HeaderContainer = styled.View`
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.PRIMARY}; /* Cor verde água do cabeçalho */
  padding-top: ${RFValue(
    60
  )}px; /* Espaço para StatusBar e padding interno superior */
  padding-bottom: ${RFValue(
    40
  )}px; /* Estende para baixo para o efeito "curvo" */
  padding-left: ${RFValue(20)}px; /* <<< Ajustado para padding horizontal */
  justify-content: flex-end; /* Alinha o conteúdo (nome, pontos) à parte inferior */
  align-items: flex-start; /* Alinha o conteúdo à esquerda */
  position: relative; /* Necessário para que o MainWrapper se sobreponha */
`;

export const MainWrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.WHITE};
  border-top-left-radius: ${RFValue(20)}px;
  border-top-right-radius: ${RFValue(20)}px;
  margin-top: ${RFValue(-20)}px;
  padding-top: ${RFValue(20)}px;
`;

export const UserName = styled.Text`
  font-size: ${RFValue(26)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.BOLD};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.WHITE};
  margin-bottom: ${RFValue(8)}px;
`;

export const PointsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: rgba(
    255,
    255,
    255,
    0.2
  ); /* Fundo semi-transparente para os pontos */
  border-radius: ${RFValue(15)}px;
  padding-left: ${RFValue(5)}px; /* Ajustado para padding-vertical */
  padding-left: ${RFValue(10)}px; /* Ajustado para padding-horizontal */
`;

export const TrophyIcon = styled(Ionicons)`
  margin-right: ${RFValue(5)}px;
`;

export const PointsText = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.REGULAR};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.WHITE};
`;

export const SectionTitle = styled.Text`
  font-size: ${RFValue(22)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.BOLD};
  color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.GRAY1}; /* Cor de texto escuro */
  margin-left: ${RFValue(20)}px;
  margin-bottom: ${RFValue(15)}px;
  margin-top: ${RFValue(10)}px; /* Espaço do topo da seção */
`;

export const AchievementsGrid = styled(
  FlatList as new (props: any) => FlatList<any>
).attrs({
  contentContainerStyle: {
    paddingHorizontal: RFValue(10), // Espaçamento interno
    paddingBottom: RFValue(20), // Espaço no final da lista
    // Removemos columnWrapperStyle daqui, ele deve ser aplicado diretamente na FlatList no componente
  },
})`
  flex-grow: 0; /* Impede que a FlatList ocupe todo o espaço disponível se houver pouco conteúdo */
  min-height: ${RFValue(
    200
  )}px; /* Adiciona uma altura mínima para FlatList, mesmo vazia, para evitar problemas de layout */
`;

export const RankingSection = styled.View`
  padding-left: ${RFValue(
    20
  )}px; /* Aplica padding horizontal para toda a seção de ranking */
  margin-top: ${RFValue(20)}px;
  margin-bottom: ${RFValue(
    20
  )}px; /* Adiciona um padding no final da seção de ranking */
`;

export const RankingItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: ${RFValue(10)}px; /* Ajustado para padding-vertical */
  padding-left: ${RFValue(
    0
  )}px; /* Removido o padding-left direto, pois o RankingSection já o tem. Ou adicione aqui se quiser indentar mais. */
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.GRAY4};
  margin-bottom: ${RFValue(5)}px;
`;

export const RankIcon = styled(Ionicons)`
  margin-right: ${RFValue(10)}px;
`;

export const RankPlaceholder = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.REGULAR};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.GRAY2};
`;

// NOVO ESTILO: Container para o ActivityIndicator durante o carregamento
export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.WHITE};
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); /* Fundo semi-transparente */
`;

export const ModalContent = styled.View`
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.WHITE};
  border-radius: ${RFValue(10)}px;
  padding: ${RFValue(20)}px;
  width: 90%; /* Largura do modal */
  max-width: ${RFValue(350)}px; /* Largura máxima */
  align-items: center;
`;

export const ModalTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.BOLD};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.GRAY1};
  margin-bottom: ${RFValue(10)}px;
  text-align: center;
`;

export const ModalDescription = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.REGULAR};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.GRAY2};
  text-align: center;
  line-height: ${RFValue(22)}px;
  margin-bottom: ${RFValue(15)}px;
`;
