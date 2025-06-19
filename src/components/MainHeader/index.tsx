import React from "react";
import Trophy from "@assets/images/trophy.png";
import {
  Container,
  Wrapper,
  UserName,
  Image,
  Score,
  MainWrapper,
} from "./styles";
import { AuthContext } from "@contexts/authContext";

const MainHeader: React.FC = () => {
  const { userProfile } = React.useContext(AuthContext);
  return (
    <Container>
      <MainWrapper>
        <UserName>{userProfile.fullName}</UserName>

        <Wrapper>
          <Image source={Trophy} />
          <Score>245 pts</Score>
        </Wrapper>
      </MainWrapper>
    </Container>
  );
};

export default MainHeader;
