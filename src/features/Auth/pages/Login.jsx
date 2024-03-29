import { Form, Formik } from "formik";
import {
  Button,
  f7,
  Link,
  List,
  ListInput,
  Page,
} from "framework7-react";
import React, { useState } from "react";
import * as Yup from "yup";
import PromHelpers from "../../../helpers/PromHelpers";
import store from "../../../js/store";
import LogoImages from "../../../assets/media/logos/logo.png";
import BackgroundLogin from "../../../assets/media/pages/login/bg-login.png";
import AuthApi from "../../../api/AuthApi";

const USNSchema = Yup.object().shape({
  USN: Yup.string().required("Nhập tài khoản của bạn."),
  PWD: Yup.string().required("Nhập nhật khẩu của bạn."),
});

function Login({ f7router }) {
  const [initialValues] = useState({ USN: "", PWD: "" });

  const onSubmit = async (values, { setErrors }) => {
    f7.dialog.preloader("Vui lòng đợi...");
    try {
      const { data } = await AuthApi.Login(values);
      if (data.error) {
        const obj = {
          USN: "Tài khoản hoặc mật khẩu không chính xác.",
        };
        setErrors(obj);
        f7.dialog.close();
      } else {
        const obj = {
          User: data,
          Token: data.token,
        };
        PromHelpers.SEND_TOKEN_FIREBASE().then(async (response) => {
          await AuthApi.SendTokenFirebase({
            Token: data.token,
            ID: data.ID,
            Type: data.acc_type,
          });
          store.dispatch("setToken", obj).then(() => {
            f7.dialog.close();
            f7router.navigate("/", { transition: "f7-flip" });
          });
        }).catch(error => {
          console.log(error)
        });
      }
    } catch (error) {
      const obj = {
        USN: "Tài khoản không chính xác.",
      };
      setErrors(obj);
      f7.dialog.close();
    }
  };

  return (
    <Page
      className="bg-white"
      style={{
        backgroundImage: `url(${BackgroundLogin})`,
        backgroundSize: "cover",
      }}
      name="login"
      noNavbar
      noToolbar
      onPageBeforeIn={() => PromHelpers.STATUS_BAR_COLOR()}
      onPageBeforeOut={() => PromHelpers.STATUS_BAR_COLOR()}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={USNSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {(formikProps) => {
          const {
            errors,
            touched,
            values,
            handleChange,
            handleBlur,
            setFieldValue,
          } = formikProps;
          return (
            <Form className="d--f fd--c jc--sb h-100">
              <div className="p-safe-area-top">
                <div className="text-center pt-50px pb-30px">
                  <img className="max-w-140px" src={LogoImages} alt="GAIA" />
                </div>
                <div className="px-15px fw-600 font-size-lg text-center text-uppercase mb-30px">
                  Đăng nhập tài khoản
                </div>
                <List noHairlinesMd>
                  <ListInput
                    outline
                    label="Tài khoản"
                    floatingLabel
                    type="text"
                    name="USN"
                    placeholder="Nhập tài khoản"
                    value={values.USN}
                    clearButton
                    onInputClear={() => setFieldValue("USN", "", false)}
                    className="mt-20px auto-focus"
                    errorMessage={errors.USN}
                    validate
                    errorMessageForce={errors.USN && touched.USN}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ListInput
                    outline
                    label="Mật khẩu"
                    floatingLabel
                    type="password"
                    name="PWD"
                    placeholder="Nhập mật khẩu"
                    clearButton
                    onInputClear={() => setFieldValue("PWD", "", false)}
                    className="mt-20px auto-focus"
                    errorMessage={errors.PWD}
                    value={values.PWD}
                    validate
                    errorMessageForce={errors.PWD && touched.PWD}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </List>
              </div>
              <div className="p-15px bz-bb">
                <Button
                  type="submit"
                  className="btn btn-success-ezs w-100 text-uppercase"
                >
                  Đăng nhập
                </Button>
                <Button
                  className="btn btn-outline-black-ezs w-100 text-uppercase mt-10px"
                  onClick={() => f7router.navigate("/forgot/")}
                >
                  Quên mật khẩu
                </Button>
                <div className="text-center mt-15px">
                  <div className="text-muted font-size-xs mb-6px">
                    Bản quyền thuộc về GAIA
                  </div>
                  <div className="font-size-xs">
                    <Link>Các điều khoản</Link>
                    <span className="text-muted px-4px text-black-ezs">và</span>
                    <Link>Chính sách bảo mật</Link>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Page>
  );
}

export default Login;
