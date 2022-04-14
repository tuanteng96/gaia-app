import axiosClient from "./axiosClient";

const GET_ALL_URL = "/api/v3/content?cmd=pgs&type=WowTeachingItemIORemain&IReaderType=1&token_eq=_teacherid";

const getList = (data) => {
    return axiosClient.post(GET_ALL_URL, JSON.stringify(data));
}
const WareHouseApi = {
    getList
}
export default WareHouseApi;