import React from "react";
import AuthRoutes from "./auth.routes";

const singed = false; // This is just a placeholder. Replace with actual authentication logic.

const Routes = () => {
  return singed ? null : <AuthRoutes />;
};

export default Routes;
