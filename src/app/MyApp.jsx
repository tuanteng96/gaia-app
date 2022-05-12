import React, { useEffect } from "react";

import { App, f7, f7ready, View } from "framework7-react";

import routes from "../js/routes";
import store from "../js/store";
import PromHelpers from "../helpers/PromHelpers";
import PanelLeft from "../components/Panel/PanelLeft";
import { ToastContainer } from "react-toastify";
import { PromiseHelper } from "../helpers/PromiseHelper";

const MyApp = (props) => {
  // Framework7 Parameters
  const f7params = {
    name: "Gaia Manager", // App name,
    id: "ezs.manager",
    theme: "ios", // Automatic theme detection ( ios / md / aurora / auto )
    version: "1.0.0",
    // App routes
    routes: routes,
    // App store
    store: store,
    panel: {
      // swipe: true,
      // visibleBreakpoint: 767,
    },
    // Extended by Dialog component:
    dialog: {
      title: "Gaia Manager",
      // change default "OK" button text
      buttonOk: "OK",
      buttonCancel: "Đóng",
    },
    touch: {
      activeState: true,
    },
    on: {
      init: function () {
        console.log("init");
      },
      pageInit: function () {
        console.log("Page Init");
      },
    },
    view: {
      allowDuplicateUrls: true,
      xhrCache: false,
      pushState: true,
    },
    //initOnDeviceReady: true,
  };

  const handleUserNotification = ({ data }) => {
    if (data.id) {
      PromiseHelper.Notification().then(() => {
        f7.views.main.router.navigate(
          `/posts/detail/${data.id}?isNotification=1`
        );
      });
    }
  };

  const ToBackBrowser = () => {
    const { history } = f7.views.main.router;
    if (history.length === 1 && history[0] === "/") {
      PromHelpers.CLOSE_APP();
    } else {
      f7.views.main.router.back();
    }
  };

  useEffect(() => {
    // To Back Browser handler
    window.ToBackBrowser = ToBackBrowser;
    window.APP_READY = true;
    // Notification the event handler
    document.body.addEventListener("noti_click.art_id", handleUserNotification);
    // this will clean up the event every time the component is re-rendered
    return function cleanup() {
      document.body.removeEventListener(
        "noti_click.art_id",
        handleUserNotification
      );
    };
  }, []);

  return (
    <App {...f7params}>
      <PanelLeft />
      {/* Your main view, should have "view-main" class */}
      <View main className="safe-areas" url="/" />
      <ToastContainer />
    </App>
  );
};
export default MyApp;
