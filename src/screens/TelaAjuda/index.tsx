// src/screens/TelaAjuda/index.tsx
import React from "react";
import {
  Container,
  Header,
  Image,
  MainWrapper,
  Title,
  ContactUs,
  Email,
} from "./styles";
import { TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FAQItem from "@components/FAQItem";
import IconeFechar from "@assets/images/esc.png";

const faqData = [
  {
    id: "1",
    question: "O app está travando. O que devo fazer?",
    answer:
      "Tente reiniciar o aplicativo e verificar sua conexão com a internet. Se o problema persistir, reinstale o aplicativo ou entre em contato com o suporte técnico.",
  },
  {
    id: "2",
    question: "O app funciona offline?",
    answer:
      "Algumas funcionalidades básicas podem funcionar offline, mas para a maioria dos recursos e atualizações, é necessária uma conexão com a internet.",
  },
  {
    id: "3",
    question: "Como muda o idioma do aplicativo?",
    answer:
      "O idioma do aplicativo geralmente segue as configurações de idioma do seu dispositivo. Você pode alterá-lo nas configurações de idioma do seu smartphone.",
  },
  {
    id: "4",
    question: "Como excluir minha conta?",
    answer:
      'Para excluir sua conta, vá para a seção de configurações do seu perfil e procure a opção "Excluir Conta". Siga as instruções para confirmar a exclusão.',
  },
];

const TelaAjuda: React.FC = () => {
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
        <Title>Perguntas {"\n"}Frequentes:</Title>
        <View style={{ marginTop: 20 }}>
          {faqData.map((item) => (
            <FAQItem
              key={item.id}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </View>
        <ContactUs>Entre em contato:</ContactUs>
        <Email>beggining@hotmail.com</Email>
      </MainWrapper>
    </Container>
  );
};

export default TelaAjuda;
