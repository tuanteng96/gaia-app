import axiosClient from "./axiosClient";

const GET_ALL_URL = "/api/v3/content4?cmd=TeacherCalendarDaily";
const REJECT_URL = "/api/v3/content4?cmd=TeacherReject";

const getList = (data) => {
    return axiosClient.post(GET_ALL_URL, JSON.stringify(data));
}

const reject = (data) => {
    return axiosClient.post(REJECT_URL, JSON.stringify(data));
}

const CalendarApi = {
    getList,
    reject
}
export default CalendarApi;