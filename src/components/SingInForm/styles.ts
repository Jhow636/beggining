import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex-direction: column;
  gap: ${RFValue(20)}px;
  align-items: center;
  flex: 1;
`;
