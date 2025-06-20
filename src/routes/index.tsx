import React from "react";
import { AuthContext } from "@contexts/authContext";
import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";
import { ActivityIndicator, View } from "react-native";

const Routes = () => {
  const { user, loading, isNewRegistration } = React.useContext(AuthContext);
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0f4ff",
        }}
      >
        <ActivityIndicator size="large" color="#131313" />
      </View>
    );
  }

  if (user && isNewRegistration) {
    return <AuthRoutes initialRouteName="WelcomeScreen" />;
  }

  if (user) {
    return <AppRoutes />;
  }

  return <AuthRoutes initialRouteName="Home" />;
};

export default Routes;
