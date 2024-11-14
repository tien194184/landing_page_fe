// TikTokPixel.js
import { useEffect } from 'react';

const TikTokPixel = () => {
    useEffect(() => {
        (function (w, d, t) {
            w.TiktokAnalyticsObject = t;
            var ttq = (w[t] = w[t] || []);
            ttq.methods = [
                'page',
                'track',
                'identify',
                'instances',
                'debug',
                'on',
                'off',
                'once',
                'ready',
                'alias',
                'group',
                'enableCookie',
                'disableCookie',
                'holdConsent',
                'revokeConsent',
                'grantConsent',
            ];
            ttq.setAndDefer = function (t, e) {
                t[e] = function () {
                    t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
                };
            };
            for (var i = 0; i < ttq.methods.length; i++) {
                ttq.setAndDefer(ttq, ttq.methods[i]);
            }
            ttq.instance = function (t) {
                var e = ttq._i[t] || [];
                for (var n = 0; n < ttq.methods.length; n++) {
                    ttq.setAndDefer(e, ttq.methods[n]);
                }
                return e;
            };
            ttq.load = function (e, n) {
                var r = 'https://analytics.tiktok.com/i18n/pixel/events.js';
                var o = n && n.partner;
                ttq._i = ttq._i || {};
                ttq._i[e] = [];
                ttq._i[e]._u = r;
                ttq._t = ttq._t || {};
                ttq._t[e] = +new Date();
                ttq._o = ttq._o || {};
                ttq._o[e] = n || {};
                n = document.createElement('script');
                n.type = 'text/javascript';
                n.async = true;
                n.src = r + '?sdkid=' + e + '&lib=' + t;
                var eTag = document.getElementsByTagName('script')[0];
                eTag.parentNode.insertBefore(n, eTag);
            };

            ttq.load('CSQO6CRC77U7NCGBVIR0');
            ttq.page();
        })(window, document, 'ttq');
    }, []);

    return null; // This component doesn’t render any HTML
};

export default TikTokPixel;
