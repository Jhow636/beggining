import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainPage from "@screens/MainPage";
import tab1 from "@assets/images/tab1.png";
import { Image } from "react-native";
import theme from "@styles/theme";

const AppTab = createBottomTabNavigator();

const AppRoutes = () => {
  return (
    <AppTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.COLORS.SECONDARY,
          height: 80,
          paddingTop: 20,
        },
      }}
    >
      <AppTab.Screen
        name="MainPage"
        component={MainPage}
        options={{
          tabBarIcon: ({ color, size }) => <Image source={tab1} />,
        }}
      />
    </AppTab.Navigator>
  );
};

export default AppRoutes;
