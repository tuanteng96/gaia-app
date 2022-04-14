import {
  Panel,
  View,
  Page,
  Navbar,
  Block,
  useStore,
  f7,
  Link,
} from "framework7-react";
import React from "react";
import AuthApi from "../../api/AuthApi";
import PromHelpers from "../../helpers/PromHelpers";
import store from "../../js/store";

const LogoutDelay = () => {
  return new Promise((resolve) => {
    f7.dialog.preloader("Đang đăng xuất ...");
    f7.panel.close();
    setTimeout(resolve, 800);
  });
};

export default function PanelLeft() {
  const { Token, User } = useStore("Auth");

  const handlerLogout = () => {
    LogoutDelay().then(() => {
      PromHelpers.SEND_TOKEN_FIREBASE().then(async (response) => {
        await AuthApi.RemoveTokenFirebase({
          Token: Token,
          ID: User.ID,
          Type: User.acc_type,
        });
        store.dispatch("setLogout").then(() => {
          f7.dialog.close();
          f7.views.main.router.navigate("/");
        });
      });
    });
  };
  if (!User) return "";
  return (
    <Panel resizable left reveal>
      <View>
        <Page className="bg-white page-content-hidden">
          <Navbar title={`GV.${User.FullName}`} />
          <div className="h-100 d--f fd--c jc--sb">
            <div className="p-15px">
              <div>
                <Link className="d--f jc--fs ai--fe py-10px">
                  <div className="text-center w-40px">
                    <i className="fa-light fa-user font-size-md"></i>
                  </div>
                  <span className="pl-4 fw-500">Thông tin cá nhân</span>
                </Link>
                <Link className="d--f jc--fs ai--fe py-10px">
                  <div className="text-center w-40px">
                    <i className="fa-light fa-bell-on font-size-md"></i>
                  </div>
                  <span className="pl-4 fw-500">Thông báo</span>
                </Link>
                <Link className="d--f jc--fs ai--fe py-10px">
                  <div className="text-center w-40px">
                    <i className="fa-light fa-calendar-day font-size-md"></i>
                  </div>
                  <span className="pl-4 fw-500">Bảng lịch</span>
                </Link>
                <Link className="d--f jc--fs ai--fe py-10px">
                  <div className="text-center w-40px">
                    <i className="fa-light fa-circle-exclamation-check font-size-md"></i>
                  </div>
                  <span className="pl-4 fw-500">Cần xử lý</span>
                </Link>
                <Link className="d--f jc--fs ai--fe py-10px">
                  <div className="text-center w-40px">
                    <i className="fa-light fa-warehouse-full font-size-md"></i>
                  </div>
                  <span className="pl-4 fw-500">Kho</span>
                </Link>
                <Link className="d--f jc--fs ai--fe py-10px">
                  <div className="text-center w-40px">
                    <i className="fa-light fa-chart-pie font-size-md"></i>
                  </div>
                  <span className="pl-4 fw-500">Thống kê</span>
                </Link>
              </div>
            </div>
            <div>
              <div
                className="border-top h-45px d--f ai--c jc--c px-15px text-center"
                onClick={handlerLogout}
              >
                <i className="fa-light fa-arrow-right-from-bracket"></i>
                <span className="fw-500 pl-10px">Đăng xuất</span>
              </div>
            </div>
          </div>
        </Page>
      </View>
    </Panel>
  );
}
