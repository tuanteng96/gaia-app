import { Form, Formik } from "formik";
import { Button, f7, Link, List, ListInput, Navbar, NavLeft, NavRight, NavTitle, Page } from "framework7-react";
import React, { useState } from "react";
import * as Yup from "yup";
import { AsyncTimeOut } from "../../../helpers/AwaitHelpers";
import PromHelpers from "../../../helpers/PromHelpers";
import store from "../../../js/store";
import LogoImages from "../../../assets/media/logos/logo-gaia.png";
import BackgroundLogin from "../../../assets/media/pages/login/bg-login.png"

const USNSchema = Yup.object().shape({
  USN: Yup.string().required("Nhập tài khoản của bạn."),
  PWD: Yup.string().required("Nhập nhật khẩu của bạn.")
});

function Login({ f7router }) {

  const [initialValues, setInitialValues] = useState({ USN: "", PWD: "" });

  const onSubmit = async (values, { setErrors }) => {
    f7.dialog.preloader('Đang kiểm tra...');
    try {
      await AsyncTimeOut(2000);
      if (values.USN === "0971021196") {
        const obj = {
          USN: values.USN,
          Profile: {
            FullName: "Nguyễn Tài Tuấn"
          }
        }
        store.dispatch('setLogin', obj).then(() => {
          f7.dialog.close();
          f7router.navigate('/home/');
        });
      }
      else {
        throw { USN: "Tài khoản không tồn tại." };
      }
    } catch (error) {
      const obj = {
        USN: "Tài khoản không tồn tại.",
      }
      setErrors(obj);
      f7.dialog.close();
    }
  }

  return (
    <Page
      className="bg-white"
      style={{ backgroundImage: `url(${BackgroundLogin})`, backgroundSize : "cover"}}
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
                  <img src={LogoImages} alt="GAIA" />
                </div>
                <div className="px-15px fw-600 font-size-lg text-center text-uppercase mb-30px">Đăng nhập tài khoản</div>
                <List noHairlinesMd>
                  <ListInput
                    outline
                    label="Tài khoản"
                    floatingLabel
                    type="text"
                    name="USN"
                    placeholder="Nhập tài khoản"
                    clearButton
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
                    className="mt-20px auto-focus"
                    errorMessage={errors.PWD}
                    validate
                    errorMessageForce={errors.PWD && touched.PWD}
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
                    <span className="text-muted px-4px text-black-ezs">
                      và
                    </span>
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
