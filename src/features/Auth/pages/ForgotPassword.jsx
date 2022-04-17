import { Form, Formik } from "formik";
import { Button, f7, Link, List, ListInput, Navbar, NavLeft, NavRight, NavTitle, Page } from "framework7-react";
import React, { useState } from "react";
import * as Yup from "yup";
import AuthApi from "../../../api/AuthApi";
import PromHelpers from "../../../helpers/PromHelpers";

const ForgotSchema = Yup.object().shape({
    Email: Yup.string().required("Nhập Email của bạn."),
});

function ForgotPassword({ f7router }) {
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
                                        label="Email"
                                        floatingLabel
                                        type="text"
                                        name="Email"
                                        placeholder="Nhập Email của bạn"
                                        clearButton
                                        onInputClear={() => setFieldValue(Email, "", false)}
                                        className="mt-20px auto-focus"
                                        value={values.Email}
                                        errorMessage={errors.Email}
                                        validate
                                        errorMessageForce={errors.Email && touched.Email}
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

export default ForgotPassword;
