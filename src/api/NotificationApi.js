import axiosClient from "./axiosClient";

const GET_LIST_URL = "/api/v3/noti2?cmd=getpages";
const CLEAR_URL = "/api/v3/noti2/?cmd=clear2"

const getList = ({ UserID, Ps, Pi, acc_type }) => {
    return axiosClient.get(`${GET_LIST_URL}&acctype=${acc_type}&accid=${UserID}&ps=${Ps}&pi=${Pi}`);
}

const clearList = (data) => {
    return axiosClient.post(`${CLEAR_URL}`, data);
}

const NotificationApi = {
    getList,
    clearList
}
export default NotificationApi;