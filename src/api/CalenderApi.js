import axiosClient from "./axiosClient";

const GET_ALL_URL = "/api/v3/content4?cmd=TeacherCalendarDaily";
const ACCEPT_URL = "/api/v3/content4?cmd=TeacherAccept";
const REJECT_URL = "/api/v3/content4?cmd=TeacherReject";
const REJECT_TEACHER_URL = "/api/v3/content4?cmd=offday";
const GET_ALL_REJECT_TEACH_URL = "/api/v3/content?cmd=pgs&type=WowOffDayEnt";

const getList = (data) => {
    return axiosClient.post(GET_ALL_URL, JSON.stringify(data));
}

const reject = (data) => {
    return axiosClient.post(REJECT_URL, JSON.stringify(data));
}

const accept = (data) => {
    return axiosClient.post(ACCEPT_URL, JSON.stringify(data));
}

const rejectTeacher = (data) => {
    return axiosClient.post(REJECT_TEACHER_URL, JSON.stringify(data));
}

const getListRejectTeacher = (data) => {
    return axiosClient.post(GET_ALL_REJECT_TEACH_URL, JSON.stringify(data));
}

const CalendarApi = {
    getList,
    accept,
    reject,
    rejectTeacher,
    getListRejectTeacher
}
export default CalendarApi;