import { createStackNavigator } from "@react-navigation/stack";

const ProfileStack = createStackNavigator();
import TelaPerfil from "@screens/TelaPerfil";
import Menu from "@screens/Menu";
import MudarSenha from "@screens/MudarSenha";
import TermosRegulamento from "@screens/TermosRegulamento";
import TelaAjuda from "@screens/TelaAjuda";

const ProfileStackRoute = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProfileStack.Screen name="MenuPrincipal" component={Menu} />
      <ProfileStack.Screen name="TelaPerfil" component={TelaPerfil} />
      <ProfileStack.Screen
        name="TermosRegulamento"
        component={TermosRegulamento}
      />
      <ProfileStack.Screen name="MudarSenha" component={MudarSenha} />
      <ProfileStack.Screen name="TelaAjuda" component={TelaAjuda} />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackRoute;
