import axiosClient from "./axiosClient";

const GET_ALL_URL = "/api/v3/content4?cmd=TeacherCalendarDaily";

const getList = (data) => {
    return axiosClient.post(GET_ALL_URL, JSON.stringify(data));
}
const CalendarApi = {
    getList
}
export default CalendarApi;