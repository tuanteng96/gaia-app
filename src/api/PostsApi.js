import axiosClient from "./axiosClient";

const GET_POST_ID_URL = "/api/gl/select2?cmd=art";

const getPostsToId = ({ Pi, Ps, ID }) => {
    return axiosClient.get(`${GET_POST_ID_URL}&includeSource=1&pi=${Pi}&ps=${Ps}&channels=${ID}`);
}

const PostsApi = {
    getPostsToId
}
export default PostsApi;