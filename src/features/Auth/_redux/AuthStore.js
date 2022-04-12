import { LocalStorageHelper } from "../../../helpers/LocalStorageHelper";

export const authStore = {
    state: {
        Auth: {
            User: LocalStorageHelper.load("EZS_User") || null,
            Token: LocalStorageHelper.load("EZS_Token") || null
        }
    },
    getters: {
        Auth: ({ state }) => {
            return state.Auth;
        },
    },
    actions: {
        setToken: ({ state }, { Token, User }) => {
            LocalStorageHelper.add("EZS_Token", Token);
            LocalStorageHelper.add("EZS_User", User);
            state.Auth = {
                ...state.Auth,
                Token: Token,
                User: User
            }
        },
        setLogout: ({ state }) => {
            LocalStorageHelper.remove("EZS_Token");
            LocalStorageHelper.remove("EZS_User");
            state.Auth = {
                ...state.Auth,
                Token: "",
                User: ""
            }
        }
    }
};