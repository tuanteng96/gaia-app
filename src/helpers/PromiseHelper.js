import { LocalStorageHelper } from "./LocalStorageHelper";

export const PromiseHelper = {
    Notification: () => {
        return new Promise((rs) => {
            const fn = () => {
                const splashScreen = document.getElementById("splash-screen");
                const isSplashScreen = splashScreen.classList.contains("hidden");
                if (isSplashScreen && LocalStorageHelper
                    .load("EZS_Token")) {
                    rs();
                } else {
                    setTimeout(fn, 50);
                }
            }
            fn();
        });
    }
}