import { Form, Formik } from "formik";
import {
  Button,
  f7,
  Link,
  List,
  ListInput,
  Navbar,
  NavLeft,
  NavRight,
  NavTitle,
  Page,
} from "framework7-react";
import React, { useState } from "react";
import * as Yup from "yup";
import AuthApi from "../../../api/AuthApi";
import PromHelpers from "../../../helpers/PromHelpers";
import store from "../../../js/store";

const ForgotSchema = Yup.object().shape({
  secure: Yup.string().required("Nhập mã xác nhận."),
  new_password: Yup.string().required("Nhập mật khẩu mới."),
  re_newpassword: Yup.string()
    .required("Nhập lại mật khẩu mới.")
    .oneOf([Yup.ref("new_password"), null], "Mật khẩu không trùng khớp"),
});

function ResetPassword({ f7router }) {
  const [initialValues, setInitialValues] = useState({
    secure: "",
    new_password: "",
    re_newpassword: "",
  });

  const onSubmit = async (values, { setErrors }) => {
    f7.dialog.preloader("Đang kiểm tra...");
    var bodyFormData = new FormData();
    bodyFormData.append("secure", values.secure);
    bodyFormData.append("new_password", values.new_password);
    bodyFormData.append("re_newpassword", values.re_newpassword);
    bodyFormData.append("mess", "");
    bodyFormData.append("error", "");
    bodyFormData.append("autoLogin", "3");

    AuthApi.ResetPWD(bodyFormData)
      .then(({ data }) => {
        if (data.error) {
          const objErr = {};
          if (data.error === "SECURE_WRONG")
            objErr.secure = "Mã xác thực đã hết hạn hoặc không hợp lệ.";
          if (data.error === "RE_NEWPASSWORD_WRONG")
            objErr.re_newpassword = "Mật khẩu không trùng khớp.";
          setErrors(objErr);
          f7.dialog.close();
        } else {
          const { token, user } = data.data;
          store.dispatch("setToken", { User: user, Token: token }).then(() => {
            f7.dialog.close();
            f7router.navigate("/");
          });
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Page
      className="bg-white"
      name="page-reset-password"
      noToolbar
      onPageBeforeIn={() => PromHelpers.STATUS_BAR_COLOR()}
      onPageBeforeOut={() => PromHelpers.STATUS_BAR_COLOR()}
    >
      <Navbar
        innerClass="navbars-bg"
        //title="What is your email address?"
        noShadow={true}
        sliding={false}
        noHairline={true}
        bgColor="light"
      >
        <NavLeft backLink="Back" sliding={true}></NavLeft>
        <NavTitle sliding={true}>Quên mật khẩu ?</NavTitle>
        <NavRight></NavRight>
      </Navbar>
      <Formik
        initialValues={initialValues}
        validationSchema={ForgotSchema}
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
              <div>
                <List noHairlinesMd>
                  <ListInput
                    outline
                    label="Mã xác nhận"
                    floatingLabel
                    type="text"
                    name="secure"
                    placeholder="Nhập mã xác nhận của bạn"
                    clearButton
                    className="mt-20px auto-focus"
                    errorMessage={errors.secure}
                    validate
                    errorMessageForce={errors.secure && touched.secure}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ListInput
                    outline
                    label="Mật khẩu mới"
                    floatingLabel
                    type="password"
                    name="new_password"
                    placeholder="Nhập mật khẩu mới"
                    clearButton
                    className="mt-20px auto-focus"
                    errorMessage={errors.new_password}
                    validate
                    errorMessageForce={
                      errors.new_password && touched.new_password
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ListInput
                    outline
                    label="Nhập lại mật khẩu"
                    floatingLabel
                    type="password"
                    name="re_newpassword"
                    placeholder="Nhập lại mật khẩu mới"
                    clearButton
                    className="mt-20px auto-focus"
                    errorMessage={errors.re_newpassword}
                    validate
                    errorMessageForce={
                      errors.re_newpassword && touched.re_newpassword
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </List>
              </div>
              <div className="pl-15px pt-15px pr-15px bz-bb">
                <Button
                  type="submit"
                  className="btn btn-success-ezs w-100 text-uppercase"
                >
                  Quên mật khẩu
                </Button>
                <Button
                  className="btn btn-outline-black-ezs w-100 text-uppercase mt-10px"
                  onClick={() => f7router.navigate("/login/")}
                >
                  Đăng nhập tài khoản
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

export default ResetPassword;
