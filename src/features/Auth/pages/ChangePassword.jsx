import { Form, Formik } from "formik";
import { Button, f7, Link, List, ListInput, Navbar, NavLeft, NavRight, NavTitle, Page } from "framework7-react";
import React, { useState } from "react";
import * as Yup from "yup";
import AuthApi from "../../../api/AuthApi";
import PromHelpers from "../../../helpers/PromHelpers";

const ChangePWDSchema = Yup.object().shape({
    secure: Yup.string().required("Nhập mã xác nhận."),
    new_password: Yup.string().required("Nhập mật khẩu mới."),
    re_newpassword: Yup.string()
        .required("Nhập lại mật khẩu mới.")
        .oneOf([Yup.ref("new_password"), null], "Mật khẩu không trùng khớp"),
});

function ChangePassword({ f7router }) {
    const [initialValues, setInitialValues] = useState({ Email: "" });

    const onSubmit = async (values, { setErrors }) => {
        f7.dialog.preloader('Đang kiểm tra...');
        var bodyFormData = new FormData();
        bodyFormData.append("input", values.Email);
        bodyFormData.append("loading", true);
        bodyFormData.append("mess", "");
        bodyFormData.append("error", "");
        bodyFormData.append("currentPhoneNumber", "");
        AuthApi.Forgot(bodyFormData).then(({ data }) => {
            if (data.error) {
                f7.dialog.close();
                setErrors({ Email: data.error === "FORGET_METHOD_OVER_SECTION" ? "Vượt quá số lượng đổi mật khẩu trong ngày." : "Địa chỉ Email không hợp lệ." })
            }
            else {
                f7.dialog.close();
                f7router.navigate('/reset-password/');
            }
        }).catch((error) => console.log(error));
    }

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
                                        name="secure"
                                        placeholder="Nhập mật khẩu hiện tại"
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
