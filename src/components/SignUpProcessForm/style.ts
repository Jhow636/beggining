import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  margin: ${RFValue(24)}px 0;
  flex-direction: column;
  gap: ${RFValue(20)}px;
  justify-content: center;
  align-items: center;
`;
