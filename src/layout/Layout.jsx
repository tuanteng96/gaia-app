import { View, f7 } from "framework7-react";
import React from "react";
import AuthInit from "../features/Auth/_redux/AuthInit";
import { EzsSplashScreenProvider } from "./_core/EzsSplashScreen";

function Layout(props) {
  return (
    <EzsSplashScreenProvider>
      <AuthInit>
        {/* Your main view, should have "view-main" class */}
        <View main className="safe-areas" url="/" />
      </AuthInit>
    </EzsSplashScreenProvider>
  );
}

export default Layout;
