export default function setupAxios(axios, store) {
    const { Token } = store.state.Auth
        // Request interceptor for API calls
    axios.interceptors.request.use(
        (config) => {
            if (Token) {
                config.headers.Authorization = `Bearer ${Token}`;
            }
            return config;
        },
        (err) => Promise.reject(err)
    );

    // Response interceptor for API calls
    axios.interceptors.response.use(
        (response) => {
            // if (response && response.data) {
            //     if (
            //         response.config.responseType &&
            //         response.config.responseType === "blob"
            //     ) {
            //         return {
            //             data: response.data,
            //             headers: response.headers,
            //         };
            //     }
            //     return response.data;
            // }

            return response;
        },
        (error) => {
            // Check Error Token
            return Promise.reject(error);
        }
    );
}