import {
  Container,
  Header,
  Title,
  Text,
  MainWrapper,
  Description,
} from "./styles";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Image } from "react-native";

import IconeFechar from "@assets/images/esc.png";

const TermosRegulamento: React.FC = () => {
  const navigation = useNavigation();
  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={handleBackPress}>
          <Image source={IconeFechar} />
        </TouchableOpacity>
      </Header>
      <MainWrapper showsVerticalScrollIndicator={false}>
        <Title>Termos e {"\n"}Regulamentos</Title>
        <Description>
          Empresa: BEGINNING {"\n"}Última atualização:{"\n"}[23 de maio de 2025]
        </Description>
        <Text>
          1. Aceitação dos Termos Ao acessar ou utilizar os serviços oferecidos
          pela BEGINNING, o usuário concorda com os presentes Termos e
          Regulamento. Caso não concorde com algum item, pedimos que não utilize
          nossos serviços.
        </Text>
        <Text>
          2. Descrição dos Serviços A BEGINNING oferece um serviço gratuido de
          aprendizagem em inglês. Os serviços estão sujeitos a modificações ou
          interrupções sem aviso prévio.
        </Text>
        <Text>
          3. Cadastro do Usuário Para utilizar determinados recursos, pode ser
          necessário realizar um cadastro. O usuário se compromete a fornecer
          informações verdadeiras e atualizadas. A BEGINNING se reserva o
          direito de suspender ou cancelar contas que violem estes termos.
        </Text>
        <Text>
          4. Propriedade Intelectual Todo o conteúdo disponibilizado pela
          BEGINNING, incluindo textos, imagens, marcas, logotipos e softwares, é
          protegido por direitos autorais e outras leis. É proibida sua cópia,
          reprodução ou uso não autorizado.
        </Text>
        <Text>
          5. Alterações nos Termos Estes Termos podem ser atualizados
          periodicamente. O uso contínuo dos serviços após alterações será
          considerado aceitação dos novos termos.
        </Text>
        <Text>
          10. Contato Para dúvidas, sugestões ou reclamações, entre em contato
          com nosso suporte: E-mail: contato@beginning.com
        </Text>
      </MainWrapper>
    </Container>
  );
};

export default TermosRegulamento;
