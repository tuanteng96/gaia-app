import axiosClient from "./axiosClient";

const GET_ALL_URL = "/api/v3/content?cmd=pgs&type=WowTeachingItemIORemain&IReaderType=1&token_eq=_teacherid";
const GET_DETAIL_URL = "/api/v3/content4?cmd=TeacherIOItems&type=WowTeachingItemIOItemEnt";

const getList = (data) => {
    return axiosClient.post(GET_ALL_URL, JSON.stringify(data));
}
const getDetail = (data) => {
    return axiosClient.post(GET_DETAIL_URL, JSON.stringify(data));
}

const WareHouseApi = {
    getList,
    getDetail
}
export default WareHouseApi;