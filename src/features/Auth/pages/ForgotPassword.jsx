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
});

function ForgotPassword({ f7router }) {
    console.log(f7router.url);
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
                                {/* <div className="text-center pt-50px pb-30px">
                  <img src={LogoImages} alt="GAIA" />
                </div> */}
                                {/* <div className="px-15px fw-600 font-size-lg text-center text-uppercase mb-30px">Quên mật khẩu</div> */}
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
