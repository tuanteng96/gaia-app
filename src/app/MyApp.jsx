import React, { useEffect } from "react";

import { App, f7, f7ready, View } from "framework7-react";

import routes from "../js/routes";
import store from "../js/store";

const MyApp = (props) => {
  // Framework7 Parameters
  const f7params = {
    name: "Gaia Manage", // App name,
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
      title: "Gaia Manage",
      // change default "OK" button text
      buttonOk: "OK",
      buttonCancel: "Đóng",
    },
    touch: {
      activeState: true,
    },
    on: {
      init: function (router) {
        console.log("init");
      },
      pageInit: function () {
        console.log("pageInit");
      },
    },
    view: {
      allowDuplicateUrls: true,
      xhrCache: false,
      pushState: true,
    },
    initOnDeviceReady: true,
  };

  return (
    <App {...f7params}>
      {/* Your main view, should have "view-main" class */}
      <View main className="safe-areas" url="/" />
    </App>
  );
};
export default MyApp;
