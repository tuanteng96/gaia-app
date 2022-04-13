import axiosClient from "./axiosClient";

const LOGIN_URL = "/app/index.aspx?cmd=authen";
const SEND_TOKEN_URL = "/api/v3/apptoken?cmd=call"
const FORGOT_URL = "/api/v3/authen?cmd=forget";
const RESET_PWD_URL = "/api/v3/authen?cmd=reset";

const Login = ({ USN, PWD }) => {
    return axiosClient.get(`${LOGIN_URL}&USN=${USN}&PWD=${PWD}`);
}

const LoginByToken = (Token) => {
    return axiosClient.get(`${LOGIN_URL}&token=${Token}`)
}

const Forgot = (data) => {
    return axiosClient.post(FORGOT_URL, data);
}

const ResetPWD = (data) => {
    return axiosClient.post(RESET_PWD_URL, data);
}

const SendTokenFirebase = ({ Token, Type, ID }) => {
    return axiosClient.get(`${SEND_TOKEN_URL}&token=${Token}&accid=${ID}&acctype=${Type}`);
}
const RemoveTokenFirebase = ({ Token, Type, ID }) => {
    return axiosClient.get(`${SEND_TOKEN_URL}&token=${Token}&accid=${ID}&acctype=${Type}&logout=1`);
}


const AuthApi = {
    Login,
    LoginByToken,
    Forgot,
    ResetPWD,
    SendTokenFirebase,
    RemoveTokenFirebase,
}
export default AuthApi;