import axiosClient from "./axiosClient";

const LOGIN_URL = "/app/index.aspx?cmd=authen";
const SEND_TOKEN_URL = "/api/v3/apptoken?cmd=call"

const Login = ({ USN, PWD }) => {
    return axiosClient.get(`${LOGIN_URL}&USN=${USN}&PWD=${PWD}`);
}

const LoginByToken = (Token) => {
    return axiosClient.get(`${LOGIN_URL}&token=${Token}`)
}

const SendTokenFirebase = ({ Token, Type, ID }) => {
    return axiosClient.get(`${SEND_TOKEN_URL}&token=${Token}&accid=${ID}&acctype=${Type}`);
}
const RemoveFirebase = ({ Token, Type, ID }) => {
    return axiosClient.get(`${SEND_TOKEN_URL}&token=${Token}&accid=${ID}&acctype=${Type}&logout=1`);
}

const AuthApi = {
    Login,
    LoginByToken,
    SendTokenFirebase,
    RemoveFirebase
}
export default AuthApi;