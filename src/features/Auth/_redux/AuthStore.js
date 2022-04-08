export const authStore = {
    state: {
        Login: {
            USN: "",
            Phone: "84971021196",
            Profile: null
        },
        Auth: {
            user: null,
            Token: null
        }
    },
    getters: {
        getLogin: ({ state }) => {
            return state.Login;
        },
        Auth: ({ state }) => {
            return state.Auth;
        },
    },
    actions : {
        setLogin: ({ state }, Login) => {
            state.Login = {
                ...state.Login,
                ...Login
            }
        },
        setToken: ({ state }, Token) => {
            state.Auth = {
                ...state.Auth,
                Token: Token
            }
        }
    }
};