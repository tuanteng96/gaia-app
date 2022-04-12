import axios from 'axios';
import queryString from 'query-string';


const axiosClient = axios.create({
    baseURL: "https://ver2.hoccunggaia.edu.vn/",
    // headers: {
    //     'content-type': 'text/plain',
    //     "Set-Cookie": "promo_shown=1; SameSite=Lax"
    // },
    paramsSerializer: params => queryString.stringify(params),
});

export default axiosClient;