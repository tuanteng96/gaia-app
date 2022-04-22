import {
  Panel,
  View,
  Page,
  Navbar,
  Block,
  useStore,
  f7,
  Link,
  Button,
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

  const OnChangePassword = () => {
    f7.panel.close();
    f7.views.main.router.navigate(`/change-password/`);
  }

  if (!User) return "";
  return (
    <Panel resizable left reveal>
      <View>
        <Page className="bg-white page-content-hidden">
          <Navbar title={`GV.${User?.FullName}`} />
          <div className="h-100 d--f fd--c jc--sb">
            <div className="p-15px d--f fd--c jc--sb">
              <div>
                <div className="mb-15px mt-10px">
                  <div className="text-muted font-size-xs text-uppercase mb-5px">
                    Họ Tên
                  </div>
                  <div className="font-size-md line-height-sm fw-500">
                    {User?.FullName}
                  </div>
                </div>
                <div className="mb-15px">
                  <div className="text-muted font-size-xs text-uppercase mb-5px">
                    Số điện thoại
                  </div>
                  <div className="font-size-md line-height-sm fw-500">
                    {User?.Phone || "Chưa có số điện thoại"}
                  </div>
                </div>
                <div className="mb-15px">
                  <div className="text-muted font-size-xs text-uppercase mb-5px">
                    Email
                  </div>
                  <div className="font-size-md line-height-sm fw-500">
                    {User?.Email || "Chưa có Email"}
                  </div>
                </div>
                <div className="mb-15px">
                  <div className="text-muted font-size-xs text-uppercase mb-5px">
                    Trường
                  </div>
                  <div className="font-size-md line-height-sm fw-500 text-capitalize">
                    {User?.SchoolTitle || "Chưa có trường"}
                  </div>
                </div>
                <div className="mb-15px">
                  <div className="text-muted font-size-xs text-uppercase mb-5px">
                    Địa chỉ
                  </div>
                  <div className="font-size-md line-height-sm fw-500 text-capitalize">
                    {User?.Address || "Chưa có địa chỉ"}
                  </div>
                </div>
              </div>
              <div>
                <Button
                  className="btn btn-black-ezs btn-sm w-100 text-uppercase mb-10px"
                  onClick={OnChangePassword}
                >
                  Đổi mật khẩu
                </Button>
                <Button
                  onClick={handlerLogout}
                  type="button"
                  className="btn btn-light btn-sm w-100"
                >
                  <i className="fa-light fa-arrow-right-from-bracket pr-5px"></i>{" "}
                  Đăng xuất
                </Button>
              </div>
            </div>
            <div>
              <div className="border-top h-45px d--f ai--c jc--c font-size-sm px-15px text-center text-muted fw-500">
                GAIA VERSION 1.0
              </div>
            </div>
          </div>
        </Page>
      </View>
    </Panel>
  );
}
