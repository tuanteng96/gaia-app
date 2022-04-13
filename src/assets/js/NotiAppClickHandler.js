;
(function() {
    var clicked = [];
    //var $log = document.createElement('div');
    //$log.style.position = 'fixed';
    //$log.style.left = '0';
    //$log.style.top = '0';
    //$log.style.right = '0';
    //$log.style.color = '#fff';
    //$log.style.background = '#000';
    //$log.style.zIndex = 9999999;
    //document.body.appendChild($log);
    function stepLog(step, reset) {
        //if (!$log) {
        //    var a = $('.onApp123');
        //    if (a.length === 0) {
        //        a = $('<div/>').addClass('onApp123');
        //        a.appendTo('body');
        //        a.css({
        //            'z-index': 9999,
        //            'font-size': '11px',
        //            'top': 0,
        //            'left': 0,
        //            'right': 0,
        //            'color': '#000',
        //            'position': 'fixed',
        //            'white-space': 'nowrap',
        //            'overflow': 'hidden',
        //            'text-overflow': 'ellipsis'
        //        });
        //    }
        //    $log = a;
        //}
        //if (reset) $log.empty();
        //$log.append(' --> ' + step);
    }

    function ready() {
        return new Promise((rs) => {
            function fn() {
                if (window.APP_READY) {
                    rs();
                } else {
                    setTimeout(fn, 100);
                }
            }
            fn();
        })
    }

    function bodySendEvent(name, data) {
        _bodySendEvent(name, data);
        // ready().then(() => {
        //     _bodySendEvent(name, data);
        // })

    }

    function _bodySendEvent(name, data) {
        var e = new Event("noti_click." + name);
        e.data = data;
        document.body.dispatchEvent(e);
        console.log("On Click");
        //$log.innerHTML = name;
        //window.NotificationHandle(data);
    }



    //[noti_click.art_id]
    function art_id(id) {
        bodySendEvent('art_id', { id: id });

    }
    /*
    //example:
    document.addEventListener('noti_click.art_id', (e) => {
        console.log(e.data.id);
    })
    */

    //[noti_click.prod_id]
    function prod_id(id) {
        bodySendEvent('prod_id', { id: id });
    }
    //[noti_click.cate_prod_id]
    function cate_prod_id(id) {
        bodySendEvent('cate_prod_id', { id: id });
    }
    //[noti_click.voucher_id]
    function voucher_id(id) {

        bodySendEvent('voucher_id', { id: id });
    }
    //[noti_click.sale]
    function sale() {
        bodySendEvent('sale', { id: id });
    }
    //[noti_click.link]
    function link(_link) {
        var arr = [];
        for (var k in arguments) {
            arr.push(arguments[k]);
        }
        var url = arr.join(':');

        app21.prom('BROWSER', url);
    }
    //[server_noti]
    function server_noti() {
        //
    }

    function NONE() {
        goNoti();
    }
    //[noti_click.go_noti]
    function goNoti(noti_id) {
        bodySendEvent('go_noti', { id: noti_id });
    }

    //
    function notiClickParser(_o, fn, clickAgaint) {

        var o = {
            NOTI_ID: 0,
            click_action: null
        };

        if (_o) o = Object.assign(o, _o);

        var isClick = false;

        stepLog('AppResume:' + (o.click_action || '-'), true);
        if (o.NOTI_ID) {
            //
            var canClick = clickAgaint || clicked.indexOf(o.NOTI_ID) === -1; //

            if (o.click_action && canClick) {
                //chuỗi gồm nhiều tp, ngăn cách bằng dấu ":"
                var segs = o.click_action.split(':');
                try {
                    if (!segs[0]) {
                        goNoti(o.NOTI_ID)
                        return;
                    }

                    var f = eval(segs[0] || 'goNoti');
                    segs.splice(0, 1);
                    if (typeof f === "function") {
                        isClick = true;
                        stepLog('fn');
                        clicked.push(o.NOTI_ID);
                        f.apply(this, segs);
                    }

                } catch (e) {
                    //
                    //LogJ(e.toString());
                }
            } else {

                if (clicked.indexOf(o.NOTI_ID) === -1 && !clickAgaint && !o.click_action) {

                    //noti
                    goNoti(o.NOTI_ID);
                }
            }

        } else {
            goNoti();
        }


        //test

        fn && fn(isClick);
    }
    window.notiClickParser = notiClickParser;

    function isObjectEmpty(o) {
        if (o === null || !o || typeof o !== 'object') return true;
        for (var k in o) {
            return false;
        }
        return true;
    }

    /*
     * AppResume,AppPause
     * Android Activity lifecycle  see: https://developer.android.com/guide/components/activities/activity-lifecycle
     * IOS: không như And, ios sử dụng "NotificationCenter.default.addObserver" - lúc khở tạo (loadView) để bắt sự kiện:
     * "didBecomeActiveNotification" vs "didEnterBackgroundNotification"
     */
    function AppResume() {

        stepLog("waitProm.AppResume", true);

        //giảm sự phụ thuộc vào $
        document.dispatchEvent(new Event("onAppResume"));
        //  app => foreground
        app21.prom('NOTI_DATA').then(function(s) {

            //$log.innerHTML = JSON.stringify(s);

            var d = s.data;
            if (!isObjectEmpty(d)) {

                window.HAS_NOTI = true;

                notiClickParser(d);
            }
            //LogJ("waitProm->AppResume->" + JSON.stringify(d));
            app21.prom('NOTI_DATA', '{"reset":true}');
        })
    }

    function AppPause() {
        //  app => background
        document.dispatchEvent(new Event("onAppPause"));
    }





    //debug




    ////Với andoid khi bấm vào notikhi app chưa chạy sẽ truyền "data" voiws biến "ANDROID_EXTRAS"
    //if (window.ANDROID_EXTRAS) {
    //    notiClickParser(window.ANDROID_EXTRAS || {});

    //} else {
    //    waitProm();
    //}
    AppResume();

    //
    window.AppResume = AppResume;
    window.AppPause = AppPause;

    //$log('AppResume', AppResume);
    //$log.innerHTML = 'AppResume';

})();