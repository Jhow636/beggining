import { createStackNavigator } from "@react-navigation/stack";

const ProfileStack = createStackNavigator();
import TelaAtividade from "@screens/TelaAtividades";

const AtividadesStack = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProfileStack.Screen name="TelaAtividade" component={TelaAtividade} />
    </ProfileStack.Navigator>
  );
};

export default AtividadesStack;
