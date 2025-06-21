import React, { useState, useRef } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Easing,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  QuestionContainer,
  AnswerText,
  QuestionText,
} from "./styles";

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);
  const animationHeight = useRef(new Animated.Value(0)).current;
  const iconRotation = useRef(new Animated.Value(0)).current;

  const MAX_ANSWER_HEIGHT = 200;

  const toggleExpand = () => {
    setExpanded(!expanded);
    Animated.timing(animationHeight, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();

    Animated.timing(iconRotation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const heightInterpolation = animationHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, MAX_ANSWER_HEIGHT],
  });

  const rotateInterpolation = iconRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <Container>
      <QuestionContainer onPress={toggleExpand}>
        <QuestionText>{question}</QuestionText>
        <Animated.View style={{ transform: [{ rotate: rotateInterpolation }] }}>
          <Ionicons name="chevron-down" size={24} color="#333" />
        </Animated.View>
      </QuestionContainer>
      <Animated.View
        style={[styles.answerContainer, { maxHeight: heightInterpolation }]}
      >
        <AnswerText>{answer}</AnswerText>
      </Animated.View>
    </Container>
  );
};

const styles = StyleSheet.create({
  answerContainer: {
    paddingHorizontal: 15,
    backgroundColor: "#ffffff",
  },
});

export default FAQItem;
