// AUTH PAGE
import LoginPage from "../features/Auth/pages/Login.jsx";
import ForgotPasswordPage from "../features/Auth/pages/ForgotPassword.jsx";
import ResetPasswordPage from "../features/Auth/pages/ResetPassword.jsx";
import ChangePasswordPage from "../features/Auth/pages/ChangePassword.jsx";

//HOME PAGE
import HomePage from '../features/Home/index.jsx';

//POSTS PAGE
import PostsDetailPage from "../features/Posts/PostsDetail.jsx";

//CALENDAR PAGE
import CalendarPage from "../features/Calendar/index.jsx";

// NOTIFICATION PAGE
import NotificationPage from "../features/Notification/index.jsx";

// WARE HOUSE PAGE
import WareHousePage from "../features/WareHouse/index.jsx";
import WareHouseDetailPage from "../features/WareHouse/pages/WareHouseDetail.jsx";

// NEED HANDLE PAGE
import NeedHandlePage from "../features/NeedHandle/index.jsx";

// STATISTICAL PAGE
import StatisticalPage from "../features/Statistical/index.jsx";

import AboutPage from '../features/about.jsx';
import FormPage from '../features/form.jsx';


import DynamicRoutePage from '../features/dynamic-route.jsx';
import RequestAndLoad from '../features/request-and-load.jsx';
import NotFoundPage from '../features/404.jsx';

import store from "./store.js";
import AuthApi from "../api/AuthApi.js";

function checkAuth({ resolve, reject }) {
    const router = this;
    if (store.state.Auth.Token) {
        resolve();
    } else {
        reject();
        router.navigate('/login/');
    }
}

var routes = [{
        path: "/",
        //component: HomePage,
        async: function({ router, to, resolve }) {
            const splashScreen = document.getElementById("splash-screen");
            const isSplashScreen = splashScreen.classList.contains("hidden");
            async function requestUser() {
                try {
                    if (isSplashScreen) {
                        splashScreen.classList.add("hidden");
                        resolve({
                            component: HomePage,
                        });
                    } else {
                        const { data } = await AuthApi.LoginByToken(store.state.Auth.Token);
                        if (data.error) {
                            store.dispatch("setLogout").then(() => {
                                resolve({
                                    component: LoginPage,
                                });
                                splashScreen.classList.add("hidden");
                            });
                        } else {
                            store
                                .dispatch("setToken", { User: data, Token: data.Token })
                                .then(() => {
                                    resolve({
                                        component: HomePage,
                                    });
                                    splashScreen.classList.add("hidden");
                                });
                        }
                    }
                } catch (error) {
                    splashScreen.classList.add("hidden");
                    resolve({
                        component: LoginPage,
                    });
                }
            }

            if (store.state.Auth.Token) {
                requestUser();
            } else {
                splashScreen.classList.add("hidden");
                resolve({
                    component: LoginPage,
                });
            }
        },
        options: {
            transition: "f7-cover",
        },
    },
    // AUTH PAGE
    {
        path: "/login/",
        component: LoginPage,
        options: {
            transition: "f7-cover",
        },
    },
    {
        path: "/forgot/",
        component: ForgotPasswordPage,
        options: {
            transition: "f7-cover",
        },
    },
    {
        path: "/reset-password/",
        component: ResetPasswordPage,
        options: {
            transition: "f7-cover",
        },
    },
    {
        path: "/change-password/",
        component: ChangePasswordPage,
        options: {
            transition: "f7-cover",
        },
    },
    // ================================================================= //

    // POST PAGE
    {
        path: "/posts/detail/:ID",
        component: PostsDetailPage,
        beforeEnter: checkAuth,
        options: {
            transition: "f7-cover",
        },
    },

    // ================================================================= //

    // CALENDAR PAGE
    {
        path: "/calendar/",
        component: CalendarPage,
        beforeEnter: checkAuth,
        options: {
            transition: "f7-cover",
        },
    },
    // ================================================================= //

    // NOTIFICATION PAGE
    {
        path: "/notification/",
        component: NotificationPage,
        beforeEnter: checkAuth,
        options: {
            transition: "f7-cover",
        },
    },
    // ================================================================= //

    // WARE HOUSE PAGE
    {
        path: "/warehouse/",
        component: WareHousePage,
        beforeEnter: checkAuth,
        options: {
            transition: "f7-cover",
        },
    },
    {
        path: "/warehouse/:ID",
        component: WareHouseDetailPage,
        beforeEnter: checkAuth,
        options: {
            transition: "f7-cover",
        },
    },
    // ================================================================= //

    // NEED HANDLE PAGE
    {
        path: "/need-handle/",
        component: NeedHandlePage,
        beforeEnter: checkAuth,
        options: {
            transition: "f7-cover",
        },
    },

    // STATISTICAL PAGE
    {
        path: "/statistical/",
        component: StatisticalPage,
        beforeEnter: checkAuth,
        options: {
            transition: "f7-cover",
        },
    },

    {
        path: "/about/",
        component: AboutPage,
        beforeEnter: checkAuth,
    },
    {
        path: "/form/",
        component: FormPage,
    },
    {
        path: "/dynamic-route/blog/:blogId/post/:postId/",
        component: DynamicRoutePage,
    },
    {
        path: "/request-and-load/user/:userId/",
        async: function({ router, to, resolve }) {
            // App instance
            var app = router.app;

            // Show Preloader
            app.preloader.show();

            // User ID from request
            var userId = to.params.userId;

            // Simulate Ajax Request
            setTimeout(function() {
                // We got user data from request
                var user = {
                    firstName: "Vladimir",
                    lastName: "Kharlampidi",
                    about: "Hello, i am creator of Framework7! Hope you like it!",
                    links: [{
                            title: "Framework7 Website",
                            url: "http://framework7.io",
                        },
                        {
                            title: "Framework7 Forum",
                            url: "http://forum.framework7.io",
                        },
                    ],
                };
                // Hide Preloader
                app.preloader.hide();

                // Resolve route to load page
                resolve({
                    component: RequestAndLoad,
                }, {
                    props: {
                        user: user,
                    },
                });
            }, 1000);
        },
    },
    {
        path: "(.*)",
        component: NotFoundPage,
    },
];

export default routes;