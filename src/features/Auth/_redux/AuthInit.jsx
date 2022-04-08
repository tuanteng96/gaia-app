import React, { useEffect, useState } from "react";
import { useStore } from "framework7-react";
import { LayoutSplashScreen } from "../../../layout/_core/EzsSplashScreen";

function AuthInit(props) {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const { Token } = useStore("Auth");

  // We should request user by authToken before rendering the application

  useEffect(() => {
    async function requestUser() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setShowSplashScreen(false);
      } catch (error) {
        console.log(error);
      }
    }

    if (Token) {
      requestUser();
    } else {
      setShowSplashScreen(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return showSplashScreen ? <LayoutSplashScreen /> : <>{props.children}</>;
}

export default AuthInit;
