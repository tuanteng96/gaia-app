import {
  f7,
  Link,
  Navbar,
  NavLeft,
  NavRight,
  NavTitle,
  Page,
  Toolbar,
  useStore,
} from "framework7-react";
import React, { useEffect, useState } from "react";
import ToolbarControls from "../../components/Toolbar/ToolbarControls";
import PromHelpers from "../../helpers/PromHelpers";
import APPS from "../../js/settings";
import IframeComm from "react-iframe-comm";


window.Info = {
  User: null,
  Stocks: [],
  CrStockID: 0,
};

function Statistical({ f7router }) {
  const { User } = useStore("Auth");
  const [data, setData] = useState(null);

  useEffect(() => {
    f7.dialog.preloader("Đang tải thống kê ... ");
  }, []);

  useEffect(() => {
    if (User) {
      setData({
        Info: User,
        Token: User.token,
        IsApp: true,
      });
    }
  }, [User]);

  return (
    <Page
      name="statistical"
      className="bg-white"
      onPageBeforeIn={() => PromHelpers.STATUS_BAR_COLOR()}
      onPageBeforeOut={() => PromHelpers.STATUS_BAR_COLOR()}
      ptr
      //ptrMousewheel={true}
      //onPtrRefresh={loadRefresh}
    >
      {/* Top Navbar */}
      <Navbar sliding={false} bgColor="white" innerClass="navbars-bg">
        <NavLeft backLink="Back" sliding={true}></NavLeft>
        <NavTitle sliding={true}>Thống kê</NavTitle>
        <NavRight>
          <Link href="/notification/" className="icon-only">
            <div className="text-center position-relative line-height-sm">
              <i className="font-size-h6 fa-regular fa-bell"></i>
              <div className="position-absolute w-6px h-6px border border-white rounded-circle bg-success shadow top-0 right-0"></div>
            </div>
          </Link>
        </NavRight>
      </Navbar>
      {/* Toolbar */}
      <Toolbar bottom className="bg-white">
        <ToolbarControls f7router={f7router} />
      </Toolbar>
      {/* Page content */}
      {data && (
        <IframeComm
          attributes={{
            src: `${
              APPS.DOMAIN_API
            }/App23/index.html?v=${new Date().valueOf()}`,
            width: "100%",
            height: "100%",
            frameBorder: 0,
          }}
          postMessageData={JSON.stringify(data)}
          handleReady={() => {
            f7.dialog.close();
          }}
        />
      )}
    </Page>
  );
}

export default Statistical;
