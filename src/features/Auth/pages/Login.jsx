import { Form, Formik } from "formik";
import { Button, f7, Link, List, ListInput, Navbar, NavLeft, NavRight, NavTitle, Page } from "framework7-react";
import React, { useState } from "react";
import * as Yup from "yup";
import { AsyncTimeOut } from "../../../helpers/AwaitHelpers";
import store from "../../../js/store";

const USNSchema = Yup.object().shape({
  USN: Yup.string().required("Nhập Email / Số điện thoại.").test('test-name', 'Email / Số điện thoại không hợp lệ.',
    function (value) {
      const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

      const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g; // /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
      let isValidEmail = emailRegex.test(value);
      let isValidPhone = phoneRegex.test(value);
      if (!isValidEmail && !isValidPhone) {
        return false;
      }
      return true;
    }),
});

function Login({ f7router }) {

  const [initialValues, setInitialValues] = useState({ USN: "" });

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
          f7router.navigate('/login-pwd/');
        });
      }
      else {
        throw { USN: "Tài khoản không tồn tại." };
      }
    } catch (error) {
      const obj = {
        USN: values.USN,
      }
      store.dispatch('setLogin', obj).then(() => {
        f7router.navigate('/registration/');
        f7.dialog.close();
      });
    }
  }

  return (
    <Page
      className="bg-white"
      name="login"
      noToolbar
    >
      {/* <Navbar
        innerClass="navbars-bg"
        //title="What is your email address?"
        noShadow={true}
        sliding={true}
        noHairline={true}
        bgColor="light"
      >
        <NavLeft backLink="Back" sliding={true}></NavLeft>
        <NavTitle sliding={true}>What is your email address?</NavTitle>
        <NavRight></NavRight>
      </Navbar> */}
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
              <div>
                <List noHairlinesMd>
                  <ListInput
                    outline
                    label="Email / Số điện thoại"
                    floatingLabel
                    type="text"
                    name="USN"
                    placeholder="09xxx"
                    clearButton
                    className="mt-20px auto-focus"
                    errorMessage={errors.USN}
                    validate
                    errorMessageForce={errors.USN && touched.USN}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </List>
              </div>
              <div className="p-15px bz-bb">
                <Button
                  type="submit"
                  className="btn btn-black-ezs w-100 text-uppercase"
                >
                  Tiếp tục
                </Button>
                <Button
                  className="btn btn-outline-black-ezs w-100 text-uppercase mt-10px"
                  onClick={() => f7router.navigate("/registration/")}
                >
                  Tạo tài khoản
                </Button>
                <div className="text-center mt-15px">
                  <div className="text-muted font-size-xs mb-6px">
                    By signing up I agree to the
                  </div>
                  <div className="font-size-xs">
                    <Link>Terms and Conditions</Link>
                    <span className="text-muted px-4px text-black-ezs">
                      and to the
                    </span>
                    <Link>Privacy Polocy</Link>
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
