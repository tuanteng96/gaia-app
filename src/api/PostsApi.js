import axiosClient from "./axiosClient";

const GET_POST_ID_URL = "/api/gl/select2?cmd=art";
const GET_POST_DETAIL_ID_URL = "/api/v3/article?cmd=get";

const getPostsToId = ({ Pi, Ps, ID }) => {
    return axiosClient.get(`${GET_POST_ID_URL}&includeSource=1&pi=${Pi}&ps=${Ps}&channels=${ID}`);
}
const getPostsDetailToId = (ID) => {
    return axiosClient.get(`${GET_POST_DETAIL_ID_URL}&ids=${ID}`);
}

const PostsApi = {
    getPostsToId,
    getPostsDetailToId
}
export default PostsApi;