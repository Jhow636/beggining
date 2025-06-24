import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainPage from "@screens/MainPage";

import MateriasStack from "./MateriasStack.routes";
import MainPageStack from "./MainPageStack";
import tab1 from "@assets/images/tab1.png";
import tab2 from "@assets/images/tab2.png";
import tab3 from "@assets/images/tab3.png";
import tab4 from "@assets/images/tab4.png";
import tab5 from "@assets/images/tab5.png";
import { Image } from "react-native";
import theme from "@styles/theme";
import ProfileStackRoute from "./ProfileStack.route";
import Conquistas from "@screens/Conquistas";
import AtividadesStack from "./AtividadesStack.routes";

const AppTab = createBottomTabNavigator();

const AppRoutes = () => {
  return (
    <AppTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.COLORS.SECONDARY,
          height: 90,
          paddingTop: 20,
        },
      }}
    >
      <AppTab.Screen
        name="MainPage"
        component={MainPageStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={tab3} style={{ width: 30, height: 30 }} />
          ),
        }}
      />
      <AppTab.Screen
        name="TelaAtividade"
        component={AtividadesStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={tab2} style={{ width: 30, height: 30 }} />
          ),
        }}
      />
      <AppTab.Screen
        name="Materias"
        component={MateriasStack}
        options={{
          tabBarIcon: ({ color, size }) => <Image source={tab4} />,
        }}
      />
      <AppTab.Screen
        name="Conquistas"
        component={Conquistas}
        options={{
          tabBarIcon: ({ color, size }) => <Image source={tab5} />,
        }}
      />
      <AppTab.Screen
        name="Menu"
        component={ProfileStackRoute}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={tab1} style={{ width: 28, height: 28 }} />
          ),
        }}
      />
    </AppTab.Navigator>
  );
};

export default AppRoutes;
