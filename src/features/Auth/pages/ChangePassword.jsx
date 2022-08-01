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
import { toast } from "react-toastify";

const ChangePWDSchema = Yup.object().shape({
  crpwd: Yup.string()
    .required("Nhập mật khẩu hiện tại.")
    .min(4, "Mật khẩu quá ngắn > 4 kí tự."),
  pwd: Yup.string()
    .required("Nhập mật khẩu mới.")
    .min(4, "Mật khẩu quá ngắn > 4 kí tự."),
  repwd: Yup.string()
    .required("Nhập lại mật khẩu mới.")
    .oneOf([Yup.ref("pwd"), null], "Mật khẩu không trùng khớp")
    .min(4, "Mật khẩu quá ngắn > 4 kí tự."),
});

function ChangePassword({ f7router }) {
  const [initialValues, setInitialValues] = useState({
    crpwd: "", // MK hiện tại
    pwd: "", // MK mới
    repwd: "", // Nhập lại mật khẩu mới
  });

  const onSubmit = async (values, { setErrors, resetForm }) => {
    f7.dialog.preloader("Đang kiểm tra...");
    var bodyFormData = new FormData();
    bodyFormData.append("pwd", values.pwd);
    bodyFormData.append("repwd", values.repwd);
    bodyFormData.append("crpwd", values.crpwd);
    AuthApi.ChangePWD(bodyFormData)
      .then(({ data }) => {
        if (data.error) {
          f7.dialog.close();
          const objError = {};
          if (data.error === "Mật khẩu hiện tại sai") {
            objError.crpwd = "Mật khẩu hiện tại sai.";
          }
          setErrors(objError);
        } else {
          f7.dialog.close();
          resetForm();
          toast.success("Đổi mật khẩu thành công !", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Page
      className="bg-white"
      name="page-forgot-password"
      noToolbar
      onPageBeforeIn={() => PromHelpers.STATUS_BAR_COLOR()}
      onPageBeforeOut={() => PromHelpers.STATUS_BAR_COLOR()}
    >
      <Navbar
        innerClass="navbars-bg"
        sliding={false}
        noHairline={true}
        bgColor="white"
      >
        <NavLeft backLink="Back" sliding={true}></NavLeft>
        <NavTitle sliding={true}>Thay đổi mật khẩu ?</NavTitle>
        <NavRight></NavRight>
      </Navbar>
      <Formik
        initialValues={initialValues}
        validationSchema={ChangePWDSchema}
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
                    label="Mật khẩu hiện tại"
                    floatingLabel
                    type="text"
                    name="crpwd"
                    value={values.crpwd}
                    placeholder="Nhập mật khẩu hiện tại"
                    clearButton
                    onInputClear={() => setFieldValue(crpwd, "", false)}
                    className="mt-20px auto-focus"
                    errorMessage={errors.crpwd}
                    validate
                    errorMessageForce={errors.crpwd && touched.crpwd}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ListInput
                    outline
                    label="Mật khẩu mới"
                    floatingLabel
                    type="password"
                    name="pwd"
                    placeholder="Nhập mật khẩu mới"
                    clearButton
                    onInputClear={() => setFieldValue(pwd, "", false)}
                    className="mt-20px auto-focus"
                    value={values.pwd}
                    errorMessage={errors.pwd}
                    validate
                    errorMessageForce={errors.pwd && touched.pwd}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ListInput
                    outline
                    label="Nhập lại mật khẩu"
                    floatingLabel
                    type="password"
                    name="repwd"
                    placeholder="Nhập lại mật khẩu mới"
                    clearButton
                    onInputClear={() => setFieldValue(repwd, "", false)}
                    className="mt-20px auto-focus"
                    value={values.repwd}
                    errorMessage={errors.repwd}
                    validate
                    errorMessageForce={errors.repwd && touched.repwd}
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
                  Đổi mật khẩu
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

export default ChangePassword;
