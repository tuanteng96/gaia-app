// AUTH PAGE
import LoginPage from "../features/Auth/pages/Login.jsx";
import ForgotPasswordPage from "../features/Auth/pages/ForgotPassword.jsx";

//HOME PAGE
import HomePage from '../features/Home/index.jsx';

//CALENDAR PAGE
import CalendarPage from "../features/Calendar/index.jsx";

import AboutPage from '../features/about.jsx';
import FormPage from '../features/form.jsx';


import DynamicRoutePage from '../features/dynamic-route.jsx';
import RequestAndLoad from '../features/request-and-load.jsx';
import NotFoundPage from '../features/404.jsx';
import store from "./store.js";

function checkAuth({ resolve, reject }) {
    const router = this;
    if (store.state.Auth.Token) {
        resolve()
    } else {
        reject();
        router.navigate('/login/');
    }
}

var routes = [{
        path: '/',
        //component: HomePage,
        async: function({ router, to, resolve }) {
            const splashScreen = document.getElementById("splash-screen");
            const isSplashScreen = splashScreen.classList.contains("hidden")
            async function requestUser() {
                try {
                    if(isSplashScreen) {
                        splashScreen.classList.add("hidden");
                        resolve({
                            component: HomePage,
                        });
                    }
                    else {
                        await new Promise((resolve) => setTimeout(resolve, 1000));
                        store.dispatch("setToken", "abcccc").then(() => {
                            splashScreen.classList.add("hidden");
                            resolve({
                                component: HomePage,
                            });
                        });
                    }
                } catch (error) {
                    splashScreen.classList.add("hidden");
                    resolve({
                        component: LoginPage,
                    });
                }
            }
            if (1 === 1) {
                requestUser();
            } else {
                splashScreen.classList.add("hidden");
                resolve({
                    component: LoginPage,
                });
            }
        }
    },
    // AUTH PAGE
    {
        path: '/login/',
        component: LoginPage,
    },
    {
        path: '/forgot/',
        component: ForgotPasswordPage,
    },
    // ================================================================= //

    // CALENDAR PAGE
    {
        path: '/calendar/',
        component: CalendarPage,
    },
    // ================================================================= //
    
    {
        path: '/about/',
        component: AboutPage,
        beforeEnter: checkAuth,
    },
    {
        path: '/form/',
        component: FormPage,
    },
    {
        path: '/dynamic-route/blog/:blogId/post/:postId/',
        component: DynamicRoutePage,
    },
    {
        path: '/request-and-load/user/:userId/',
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
                    firstName: 'Vladimir',
                    lastName: 'Kharlampidi',
                    about: 'Hello, i am creator of Framework7! Hope you like it!',
                    links: [{
                            title: 'Framework7 Website',
                            url: 'http://framework7.io',
                        },
                        {
                            title: 'Framework7 Forum',
                            url: 'http://forum.framework7.io',
                        },
                    ]
                };
                // Hide Preloader
                app.preloader.hide();

                // Resolve route to load page
                resolve({
                    component: RequestAndLoad,
                }, {
                    props: {
                        user: user,
                    }
                });
            }, 1000);
        },
    },
    {
        path: '(.*)',
        component: NotFoundPage,
    },
];

export default routes;