import axios from 'axios';
import queryString from 'query-string';
import APPS from "../js/settings";

const axiosClient = axios.create({
    baseURL: APPS.DOMAIN_API,
    // headers: {
    //     'content-type': 'text/plain',
    //     "Set-Cookie": "promo_shown=1; SameSite=Lax"
    // },
    paramsSerializer: params => queryString.stringify(params),
});

export default axiosClient;