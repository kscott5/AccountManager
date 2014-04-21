(function () {
    if (!window.WL) {
        var Zg = "download",
            h = "interface_method",
            Ie = "WL.Internal.jsonp.",
            Ed = 2000,
            ge = "body",
            r = "callback",
            Ub = "code",
            cb = "element",
            ce = "error",
            wh = "error_description",
            Od = "logging",
            Ch = "tracing",
            Nb = "message",
            R = "method",
            fg = "file_input",
            th = "stream_input",
            Mb = "file_name",
            xh = "file_output",
            J = "overwrite",
            y = "path",
            Dg = "pretty",
            Eg = "result",
            Eh = "status",
            Pf = "return_ssl_resources",
            Ah = "success",
            Fh = "error",
            rd = "suppress_redirects",
            ad = "suppress_response_codes",
            M = "x_http_live_library",
            de = 0,
            sd = 1,
            d = "access_token",
            bh = "appstate",
            Zb = "authentication_token",
            q = "client_id",
            ec = "display",
            kh = "code",
            k = "error",
            D = "error_description",
            gb = "expires",
            fb = "expires_in",
            fh = "locale",
            w = "redirect_uri",
            lb = "response_type",
            s = "request_ts",
            g = "scope",
            xe = "session",
            Qb = "secure_cookie",
            V = "state",
            e = "status",
            Tb = [d, Zb, g, fb, gb],
            E = "connected",
            Ig = "notConnected",
            T = "unchecked",
            xb = "unknown",
            dc = "expiring",
            Kh = "expired",
            Ih = "live-sdk-upload",
            Dh = "live-sdk-download",
            jh = "appId",
            Wg = "channelUrl",
            ve = "wl_auth",
            ke = "wl_upload",
            oe = "page",
            Jc = "touch",
            bc = "none",
            Xd = "none",
            Rb = "auth.login",
            Bc = "auth.logout",
            X = "auth.sessionChange",
            nc = "auth.statusChange",
            Ae = "wl.log",
            Jb = "access_denied",
            zf = "connection_failed",
            ng = "invalid_cookie",
            uh = "invalid_request",
            mb = "request_canceled",
            P = "request_failed",
            Vb = "timed_out",
            Bh = "unknown_user",
            zh = "user_canceled",
            of = "METHOD: Failed to get the required user permission to perform this operation.",
            pf = "The request could not be completed due to browser issues.",
            ld = "The request could not be completed due to browser limitations.",
            Ob = "METHOD: The operation has been canceled.",
            hd = "The 'wl_auth' cookie is not valid.",
            cd = "The 'wl_auth' cookie has been modified incorrectly. Ensure that the redirect URI only modifies sub-keys for values received from the OAuth endpoint.",
            Me = "The 'wl_auth' cookie has multiple values. Ensure that the redirect URI specifies a cookie domain and path when setting cookies.",
            Hf = "METHOD: The input property 'PARAM' does not reference a valid DOM element.",
            Wf = "METHOD: An exception was received for EVENT. Detail: MESSAGE",
            If = "METHOD: The WL object must be initialized with WL.init() prior to invoking this method.",
            od = "A connection to the server could not be established.",
            rh = "The user could not be identified.",
            Af = "The pending login request has been canceled.",
            Qe = "Logging out the user is not supported in current session because the user is logged in with a Microsoft account on this computer. To logout, the user may quit the app or log out from the computer.",
            qf = "METHOD: The input value for parameter/property 'PARAM' is not valid.",
            rf = "METHOD: The input parameter/property 'PARAM' must be included.",
            Te = "METHOD: The type of the provided value for the input parameter/property 'PARAM' is not valid.",
            hc = "METHOD: There is a pending METHOD request, the current call will be ignored.",
            Ke = hc.replace(/METHOD/g, "WL.login"),
            Fe = hc.replace(/METHOD/g, "WL.fileDialog"),
            ph = hc.replace(/METHOD/g, "WL.upload"),
            Re = "METHOD: The input property 'redirect_uri' is required if the value of the 'response_type' property is 'code'.",
            oh = "WL.init: The redirect_uri value should be the same as the value of 'Redirect Domain' of your registered app. It must begin with 'http://' or 'https://'.",
            qh = "METHOD: The api call is not supported on this platform.",
            nh = "WL.init: The response_type value 'code' is not supported on this platform.",
            og = "METHOD: The input property 'redirect_uri' must use https: to match the scheme of the current page.",
            sf = "The auth request is timed out.",
            Jf = "The popup is closed without receiving consent.",
            Cc = 0,
            jf = 1,
            md = 2,
            pg = 3,
            Sb = "GET",
            Zd = "POST",
            Ng = "PUT",
            rg = "DELETE",
            Gh = "COPY",
            Hh = "MOVE",
            Df = 30000,
            mh = "METHOD",
            n = "onSuccess",
            o = "onError",
            H = "onProgress",
            ac = "redirect_type",
            Md = "auth",
            Ad = "upload",
            sg = "code",
            ib = "token",
            cc = "https:",
            Oc = "http:",
            qe = "wl.signin",
            Tg = "wl.skydrive",
            Tf = "wl.skydrive_update",
            Ag = /\s|,/,
            rb = "boolean",
            Sc = "dom",
            j = "function",
            we = "number",
            b = "string",
            wb = "object",
            Ac = "string_or_array",
            Wb = "undefined",
            Yg = "name",
            db = "element",
            Xb = "brand",
            Mc = "type",
            Fb = "sign_in_text",
            Db = "sign_out_text",
            C = "theme",
            Hd = "onloggedin",
            Cd = "onloggedout",
            nb = "onerror",
            tg = "messenger",
            Hg = "hotmail",
            Bg = "skydrive",
            Dc = "windows",
            Bd = "windowslive",
            Lc = "none",
            Qc = "signin",
            qc = Qc,
            Dd = "login",
            wd = "connect",
            zd = "custom",
            Hb = "blue",
            Gb = "white",
            yh = "dark",
            vh = "light",
            fe = "id",
            eb = "auth_server",
            Q = "apiservice_uri",
            S = "skydrive_uri",
            F = "sdk_root",
            fc = "wl_trace";
        window.WL = {
            getSession: function () {
                try {
                    return a.getSession()
                } catch (b) {
                    t(b.message)
                }
            },
            getLoginStatus: function () {
                try {
                    return a.getLoginStatus({
                        callback: Kd(arguments, j, 2),
                        internal: false
                    }, Kd(arguments, rb, 2))
                } catch (d) {
                    return I("WL.getLoginStatus", d)
                }
            },
            logout: function (b) {
                try {
                    Yb(b, L, "WL.logout");
                    return a.logout({
                        callback: b
                    })
                } catch (c) {
                    return I("WL.logout", c)
                }
            },
            canLogout: function () {
                return a.canLogout()
            },
            api: function () {
                try {
                    var c = Rf(arguments);
                    m(c, [{
                            name: y,
                            type: b,
                            optional: false
                        }, {
                            name: R,
                            type: b,
                            optional: true
                        },
                        L
                    ], "WL.api");
                    return a.api(c)
                } catch (f) {
                    return I("WL.api", f)
                }
            }
        };
        var je = [Rb, Bc, X, nc, Ae];
        WL.Event = {
            subscribe: function (d, a) {
                try {
                    Yb([d, a], [{
                            name: "event",
                            type: b,
                            allowedValues: je,
                            caseSensitive: true,
                            optional: false
                        },
                        ff
                    ], "WL.Event.subscribe");
                    c.subscribe(d, a)
                } catch (e) {
                    t(e.message)
                }
            },
            unsubscribe: function (d, a) {
                try {
                    Yb([d, a], [{
                            name: "event",
                            type: b,
                            allowedValues: je,
                            caseSensitive: true,
                            optional: false
                        },
                        L
                    ], "WL.Event.unsubscribe");
                    c.unsubscribe(d, a)
                } catch (e) {
                    t(e.message)
                }
            }
        };
        WL.Internal = {};
        var c = {
            subscribe: function (a, b) {
                i("Subscribe " + a);
                var d = c.getHandlers(a);
                d.push(b)
            },
            unsubscribe: function (d, f) {
                i("Unsubscribe " + d);
                var b = c.getHandlers(d),
                    e = [];
                if (f != null) {
                    var g = false;
                    for (var a = 0; a < b.length; a++)
                        if (g || b[a] != f) e.push(b[a]);
                        else g = true
                }
                c._eHandlers[d] = e
            },
            getHandlers: function (b) {
                if (!c._eHandlers) c._eHandlers = {};
                var a = c._eHandlers[b];
                if (a == null) c._eHandlers[b] = a = [];
                return a
            },
            notify: function (d, e) {
                i("Notify " + d);
                var b = c.getHandlers(d);
                for (var a = 0; a < b.length; a++) b[a](e)
            }
        }, a = {
                _status: de,
                _statusRequests: [],
                _rpsAuth: false
            };
        a.appInit = function (c) {
            if (a._status == sd) {
                var e = a._session.getNormalStatus();
                return ab("WL.init", true, c.callback, e)
            }
            var b = WL[F];
            if (b) {
                if (b.charAt(b.length - 1) !== "/") b += "/";
                a[F] = b
            }
            var d = c[Od];
            if (d === false) a._logEnabled = d;
            if (a.testInit) a.testInit(c);
            a._status = sd;
            return wf(c)
        };
        a.onloadInit = function () {
            Qg();
            Sg()
        };

        function x(b) {
            if (a._status === de) throw new Error(If.replace("METHOD", b))
        }

        function Pc() {
            return WL.Internal.tApp || a
        }
        a.api = function (a) {
            x("WL.api");
            var c = a[ge];
            if (c) {
                a = K(Hc(c), a);
                delete a[ge]
            }
            var b = a[R];
            a[R] = (b != null ? U(b) : Sb).toUpperCase();
            return (new ye(a)).execute()
        };
        var Yf = function () {
            var b = a.api.lastId,
                c;
            b = b === undefined ? 1 : b + 1;
            c = "WLAPI_REQ_" + b + "_" + (new Date).getTime();
            a.api.lastId = b;
            return c
        }, ye = function (b) {
                var c = this;
                c._properties = b;
                c._completed = false;
                c._id = Yf();
                b[Dg] = false;
                b[Pf] = a._isHttps;
                b[M] = a[M];
                var d = b[y];
                c._url = Yd() + (d.charAt(0) === "/" ? d.substring(1) : d);
                c._promise = new l("WL.api", null, null)
            };
        ye.prototype = {
            execute: function () {
                xg(this);
                return this._promise
            },
            onCompleted: function (a) {
                if (this._completed) return;
                this._completed = true;
                B(this._properties.callback, a, true);
                if (a[k]) this._promise[o](a);
                else this._promise[n](a)
            }
        };

        function zc(e, c, a, d) {
            a = a ? U(a) : "";
            var b = a !== "" ? Ec(a) : null;
            if (b === null) {
                b = {};
                if (c / 100 !== 2) b[ce] = ug(c, d)
            }
            e.onCompleted(b)
        }

        function ug(c, b) {
            var a = {};
            a[Ub] = P;
            a[Nb] = b || od;
            return a
        }

        function rc() {
            var c = null;
            if (!a._rpsAuth) {
                var b = Pc()._session.getStatus();
                if (b.status === dc || b.status === E) c = b.session[d]
            }
            return c
        }

        function Hc(i) {
            var c = {};
            for (var b in i) {
                var a = i[b],
                    j = typeof a;
                if (a instanceof Array)
                    for (var d = 0; d < a.length; d++) {
                        var f = a[d],
                            l = typeof f;
                        if (j == wb && !(a instanceof Date)) {
                            var h = Hc(f);
                            for (var e in h) c[b + "." + d + "." + e] = h[e]
                        } else c[b + "." + d] = f
                    } else if (j == wb && !(a instanceof Date)) {
                        var k = Hc(a);
                        for (var g in k) c[b + "." + g] = k[g]
                    } else c[b] = a
            }
            return c
        }

        function cg(c) {
            if (!ih()) return false;
            var b = Ud(c),
                a = new XMLHttpRequest;
            a.open(b.method, b.url, true);
            var d = c._properties[R];
            if (b.method != Sb) a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            a.onreadystatechange = function () {
                if (a.readyState == 4) zc(c, a.status, a.responseText)
            };
            a.send(b.body);
            return true
        }

        function Ud(e) {
            var a = Qd(e._properties, null, [r, y, R]),
                f = e._properties[R],
                g = hb(e._url, {
                    "ts": (new Date).getTime()
                }),
                h = rc(),
                c, b;
            a[rd] = "true";
            a[ad] = "true";
            if (h != null) a[d] = h;
            if (f === Sb || f === rg) {
                c = null;
                b = Sb;
                g += "&" + v(a)
            } else {
                c = v(a);
                b = Zd
            }
            g += "&method=" + f;
            return {
                url: g,
                method: b,
                body: c
            }
        }
        a.download = function (a) {
            df(a);
            x("WL.download");
            return (new Rd(a)).execute()
        };

        function td(b, f) {
            var c = f || {}, g = Yd();
            if (!le(b)) b = g + (b.charAt(0) === "/" ? b.substring(1) : b);
            var e = rc();
            if (e) c[d] = e;
            c[M] = a[M];
            return hb(b, c)
        }
        var bd = "notStarted",
            ud = "ready",
            gc = "downloadCompleted",
            Wc = "downloadFailed",
            gd = "canceled",
            bf = "completed";

        function Rd(a) {
            this._properties = a;
            this._status = bd
        }
        Rd.prototype = {
            execute: function () {
                this._promise = new l("WL.download", this, null);
                this._process();
                return this._promise
            },
            cancel: function () {
                this._status = gd;
                if (this._cancel) try {
                    this._cancel()
                } catch (a) {} else {
                    this._result = p(mb, Ob.replace("METHOD", "WL.download"));
                    this._process()
                }
            },
            downloadComplete: function (b, c) {
                var a = this;
                a._result = c;
                a._status = b ? gc : Wc;
                a._process()
            },
            downloadProgress: function (a) {
                this._promise[H](a)
            },
            _process: function () {
                switch (this._status) {
                case bd:
                    this._start();
                    break;
                case ud:
                    this._download();
                    break;
                case gc:
                case Wc:
                case gd:
                    this._complete()
                }
            },
            _start: function () {
                var b = this;
                a.getLoginStatus({
                    internal: true,
                    callback: function () {
                        b._status = ud;
                        b._process()
                    }
                })
            },
            _download: function () {
                var a = this;
                Lg(a)
            },
            _complete: function () {
                var a = this,
                    c = a._result,
                    d = a._status === gc ? n : o;
                a._status = bf;
                var b = a._properties[r];
                if (b) b(c);
                a._promise[d](c)
            }
        };
        a.login = function (b, d) {
            x("WL.login");
            gg(b);
            if (!qg(d)) return ab("WL.login", false, null, p(P, Ke));
            var c = a._session.tryGetResponse(b.normalizedScope);
            if (c != null) return ab("WL.login", true, b.callback, c);
            a._pendingLogin = mg(b, Kf);
            return a._pendingLogin.execute()
        };

        function Kf(c, b) {
            a._pendingLogin = null;
            var d = b[k];
            if (d) zb("WL.login: " + b[D]);
            else B(c.callback, b, true)
        }

        function Fd(b) {
            var a = b || "";
            if (a instanceof Array) a = a.join(" ");
            return U(a)
        }
        a.getSession = function () {
            x("WL.getSession");
            return a._session.getStatus()[xe]
        };
        a.getLoginStatus = function (b, f) {
            x("WL.getLoginStatus");
            b = b || {};
            if (!f) {
                var d = a._session.tryGetResponse();
                if (d) return ab("WL.getLoginStatus", true, b.callback, d)
            }
            i("wl_app:getLoginStatus");
            var e = a._statusRequests,
                c = null;
            if (!a._pendingStatusRequest) {
                c = nf(b, lf);
                a._pendingStatusRequest = c
            }
            e.push(b);
            if (c != null) c.execute();
            return a._pendingStatusRequest._promise
        };

        function lf(h, b) {
            var f = a._statusRequests;
            a._pendingStatusRequest = null;
            i("wl_app:onGetLoginStatusCompleted");
            var d = b[k],
                e = false;
            while (f.length > 0) {
                var c = f.shift(),
                    g = K(b);
                if (!d || c.internal) B(c.callback, g, true);
                if (!c.internal) e = true
            }
            if (d)
                if (e && d !== Vb) zb("WL.getLoginStatus: " + b[D]);
                else i("wl_app-onGetLoginStatusCompleted: " + b[D])
        }
        a.logout = function (f) {
            var b = "WL.logout";
            x(b);
            var d = new l(b, null, null),
                c = function (c) {
                    ub(function () {
                        var e, g = n;
                        if (c) {
                            t(c.message);
                            g = o;
                            e = Cb(b, b, c)
                        } else e = a._session.getNormalStatus();
                        B(f.callback, e, false);
                        d[g](e)
                    })
                }, e = function () {
                    var b = a._session;
                    if (b.isSignedIn())
                        if (a.canLogout()) {
                            b.updateStatus(xb);
                            yg(c)
                        } else c(new Error(Qe));
                        else c()
                };
            if (a._pendingStatusRequest != null) a.getLoginStatus({
                internal: true,
                callback: e
            }, false);
            else e();
            return d
        };
        a.upload = function (a) {
            var c = a[h];
            x(c);
            m(a, [{
                    name: y,
                    type: b,
                    optional: false
                },
                L
            ], c);
            Ne(a);
            Ef(a);
            return (new Fc(a)).execute()
        };

        function Ef(a) {
            var b = a[fg],
                c = a[Mb];
            if (b) a[Mb] = c || b.name
        }

        function Ve(a, h, i) {
            var c = a.indexOf("?"),
                e = c !== -1,
                g = "";
            if (e) {
                g = a.substring(c + 1);
                a = a.substring(0, c)
            }
            var f = typeof h !== Wb,
                j = a.charAt(a.length - 1) === "/";
            if (f && !j) a += "/";
            var b = a,
                d = {};
            if (f) b += encodeURIComponent(h);
            if (i === "rename") d[J] = "choosenewname";
            else d[J] = i; if (e) b = Pd(b, g);
            return lc(b, d)
        }

        function eh(a) {
            return /^(file|\/file)/.test(a.toLowerCase())
        }

        function lc(b, a) {
            a = a || {};
            a[ad] = "true";
            return td(b, a)
        }

        function Ne(a) {
            if (J in a) {
                var c = a[h],
                    d = a[J],
                    f = typeof d,
                    i = f === rb,
                    e = f === b;
                if (!(i || e)) throw O(J, c);
                if (e) {
                    var g = /^(true|false|rename)$/i.test(d);
                    if (!g) throw Y(J, c)
                }
            } else a[J] = false
        }
        var jd = 0,
            nd = 1,
            kc = 2,
            jc = 3,
            Ab = 4,
            pd = 5,
            vf = 6;

        function Fc(a) {
            this._props = a;
            this._status = jd
        }
        Fc.prototype = {
            execute: function () {
                var a = this;
                a._strategy = a._getStrategy(a._props);
                a._promise = new l(a._props[h], a, null);
                a._process();
                return a._promise
            },
            cancel: function () {
                var a = this;
                a._status = pd;
                if (a._cancel) try {
                    a._cancel()
                } catch (c) {} else {
                    var b = Ob.replace(mh, a._props[h]);
                    a._result = p(mb, b);
                    a._process()
                }
            },
            uploadProgress: function (a) {
                this._promise[H](a)
            },
            uploadComplete: function (b, c) {
                var a = this;
                a._result = c;
                a._status = b ? jc : Ab;
                a._process()
            },
            onErr: function (c) {
                var a = this._props[h] + ":" + c,
                    b = p(P, a);
                this.uploadComplete(false, b)
            },
            onResp: function (a) {
                a = a ? U(a) : "";
                var b = a !== "" ? Ec(a) : null;
                b = b || {};
                this.uploadComplete(b.error == null, b)
            },
            setFileName: function (a) {
                this._props[Mb] = a
            },
            _process: function () {
                switch (this._status) {
                case jd:
                    this._start();
                    break;
                case nd:
                    this._getUploadPath();
                    break;
                case kc:
                    this._upload();
                    break;
                case jc:
                case Ab:
                case pd:
                    this._complete()
                }
            },
            _start: function () {
                var a = this;
                Pc().getLoginStatus({
                    internal: true,
                    callback: function () {
                        a._status = nd;
                        a._process()
                    }
                })
            },
            _getUploadPath: function () {
                var a = this,
                    c = a._props,
                    b = c[y];
                if (le(b)) {
                    a._uploadPath = lc(b);
                    a._status = kc;
                    a._process();
                    return
                }
                Pc().api({
                    path: b
                }).then(function (h) {
                    var d = h.upload_location;
                    if (d) {
                        var e = Gg(b);
                        d = Pd(d, e);
                        var f = c[Mb],
                            g = c[J];
                        if (eh(b)) a._uploadPath = lc(d);
                        else a._uploadPath = Ve(d, f, g);
                        a._status = kc
                    } else {
                        a._result = p(P, "WL.upload: Failed to get upload_location of the resource.");
                        a._status = Ab
                    }
                    a._process()
                }, function (b) {
                    a._result = b;
                    a._status = Ab;
                    a._process()
                })
            },
            _upload: function () {
                this._strategy.upload(this._uploadPath)
            },
            _complete: function () {
                var a = this,
                    c = a._result,
                    d = a._status === jc ? n : o;
                a._status = vf;
                var b = a._props[r];
                if (b) b(c);
                a._promise[d](c)
            }
        };

        function U(a) {
            return a.replace(/^\s+|\s+$/g, "")
        }

        function id(a, b) {
            if (a && b) return a.toLowerCase() === b.toLowerCase();
            return a === b
        }

        function Gd(a) {
            return a == null || a === ""
        }

        function K(b, d) {
            var c = d || {};
            if (b != null)
                for (var a in b) c[a] = b[a];
            return c
        }

        function Qd(e, d, b) {
            var c = K(e, d);
            for (var a = 0; a < b.length; a++) delete c[b[a]];
            return c
        }

        function Vg(b, c) {
            var a;
            for (a = 0; a < b.length; a++)
                if (b[a] === c) return true;
            return false
        }

        function ze(a) {
            return Array.prototype.slice.call(a)
        }

        function f(b, a) {
            return function () {
                if (typeof a === j) return a.apply(b, arguments)
            }
        }

        function Ce(a, e) {
            a = "[WL]" + a;
            var b = window.console;
            if (b && b.log) switch (e) {
            case "warning":
                b.warn(a);
                break;
            case "error":
                b.error(a);
                break;
            default:
                b.log(a)
            }
            var d = window.opera;
            if (d) d.postError(a);
            var c = window.debugService;
            if (c) c.trace(a)
        }

        function le(a) {
            return a.indexOf("https://") === 0 || a.indexOf("http://") === 0
        }

        function i(b) {
            if (a._traceEnabled) Ce(b)
        }

        function zb(b, d) {
            if (a._logEnabled || a._traceEnabled) Ce(b, d);
            c.notify(Ae, b)
        }
        if (window.WL && WL.Internal) {
            WL.Internal.trace = i;
            WL.Internal.log = zb
        }

        function t(a) {
            zb(a, "error")
        }

        function Jd(b, c) {
            var a = Ib("iframe");
            a.id = c;
            a.src = b;
            document.body.appendChild(a);
            return a
        }

        function Ib(b) {
            var a = document.createElement(b);
            a.style.position = "absolute";
            a.style.top = "-1000px";
            a.style.width = "300px";
            a.style.height = "300px";
            a.style.visibility = "hidden";
            return a
        }

        function pc() {
            var a = null;
            while (a == null) {
                a = "wl_" + Math.floor(Math.random() * 1024 * 1024);
                if (pb(a) != null) a = null
            }
            return a
        }

        function pb(a) {
            return document.getElementById(a)
        }

        function Ug(a, b) {
            if (a)
                if (a.innerText) a.innerText = b;
                else {
                    var c = document.createTextNode(b);
                    a.innerHTML = "";
                    a.appendChild(c)
                }
        }

        function Gg(b) {
            var a = b.indexOf("?");
            if (a === -1) return "";
            var c = b.indexOf("#", a + 1);
            if (c !== -1) return b.substring(a + 1, c);
            return b.substring(a + 1)
        }

        function Pd(a, b) {
            if (typeof b === Wb || b === null || b === "") return a;
            var c = a.indexOf("?");
            if (c === -1) return a + "?" + b;
            if (a.charAt(a.length - 1) !== "&") a += "&";
            return a + b
        }

        function De(a) {
            K(Rc(a), this)
        }
        De.prototype = {
            toString: function () {
                var a = this,
                    b = (a.scheme != "" ? a.scheme + "//" : "") + a.host + (a.port != "" ? ":" + a.port : "") + a.path;
                return b
            },
            resolve: function () {
                var a = this;
                if (a.scheme == "") {
                    var b = window.location.port,
                        c = window.location.host;
                    a.scheme = window.location.protocol;
                    a.host = c.split(":")[0];
                    a.port = b != null ? b : "";
                    if (a.path.charAt(0) != "/") a.path = ig(a.host, window.location.href, a.path)
                }
            }
        };

        function Rc(c) {
            var e = c.indexOf(cc) == 0 ? cc : c.indexOf(Oc) == 0 ? Oc : "",
                h = "",
                i = "",
                f;
            if (e != "") var b = c.substring(e.length + 2),
            a = b.indexOf("/"), g = a > 0 ? b.substring(0, a) : b, d = g.split(":"), h = d[0], i = d.length > 1 ? d[1] : "", f = a > 0 ? b.substring(a) : "";
            else f = c;
            return {
                scheme: e,
                host: h,
                port: i,
                path: f
            }
        }

        function Xg(a) {
            return Rc(a.toLowerCase()).host
        }

        function ig(e, b, h) {
            var d = function (a, c) {
                charIdx = b.indexOf(c);
                a = charIdx > 0 ? a.substring(0, charIdx) : a;
                return a
            };
            b = d(d(b, "?"), "#");
            var f = b.indexOf(e),
                a = b.substring(f + e.length),
                g = a.indexOf("/"),
                c = a.lastIndexOf("/");
            a = c >= 0 ? a.substring(g, c) : a;
            return a + "/" + h
        }

        function ah(a) {
            var b = a.indexOf("?");
            if (b > 0) a = a.substring(0, b);
            b = a.indexOf("#");
            if (b > 0) a = a.substring(0, b);
            return a
        }

        function B(a, b, d, c) {
            if (a != null) {
                if (c) b[V] = c;
                if (d) a(b);
                else ub(function () {
                    a(b)
                })
            }
        }

        function Ec(a) {
            if (window.JSON) return JSON.parse(a);
            else return eval("(" + a + ")")
        }

        function Td() {
            return Math.floor((new Date).getTime() / 1000)
        }

        function lh(b, c) {
            var d = b.length;
            for (var a = 0; a < d; a++) c(b[a])
        }

        function Jg(c, b) {
            var a = {};
            a[k] = c;
            a[D] = b;
            return a
        }

        function p(d, c) {
            var a = {}, b = {};
            a[Ub] = d, a[Nb] = c;
            b[ce] = a;
            return b
        }

        function Cb(a, b, c) {
            return p(P, Wf.replace("METHOD", a).replace("EVENT", b).replace("MESSAGE", c.message))
        }

        function Of(b) {
            var a = b.split(".");
            return a[0] + "." + a[1]
        }

        function ub(a, b) {
            if (window.wlUnitTests) wlUnitTests.delayInvoke(a);
            else window.setTimeout(a, b || 1)
        }

        function Qg() {
            var b = Rg(navigator.userAgent, document.documentMode),
                c = a[M];
            a._browser = b;
            a[M] = c.replace("DEVICE", b.device)
        }

        function Rg(a, e) {
            a = a.toLowerCase();
            var c = "other",
                b = {
                    "firefox": /firefox/.test(a),
                    "firefox1.5": /firefox\/1\.5/.test(a),
                    "firefox2": /firefox\/2/.test(a),
                    "firefox3": /firefox\/3/.test(a),
                    "firefox4": /firefox\/4/.test(a),
                    "ie": (/msie/.test(a) || /trident/.test(a)) && !/opera/.test(a),
                    "ie6": false,
                    "ie7": false,
                    "ie8": false,
                    "ie9": false,
                    "ie10": false,
                    "ie11": false,
                    "opera": /opera/.test(a),
                    "webkit": /webkit/.test(a),
                    "chrome": /chrome/.test(a),
                    "mobile": /mobile/.test(a) || /phone/.test(a)
                };
            if (b["ie"]) {
                var d = 0;
                if (e) d = e;
                else if (/msie 7/.test(a)) d = 7;
                d = Math.min(11, Math.max(d, 6));
                c = "ie" + d;
                b[c] = true
            } else if (b.firefox) c = "firefox";
            else if (b.chrome) c = "chrome";
            else if (b.webkit) c = "webkit";
            else if (b.opera) c = "opera";
            if (b.mobile) c += "mobile";
            b.device = c;
            return b
        }

        function Eb(e, c) {
            var f = c != null ? c : {};
            if (e != null) {
                var d = e.split("&");
                for (var b = 0; b < d.length; b++) {
                    var a = d[b].split("=");
                    if (a.length == 2) f[decodeURIComponent(a[0])] = decodeURIComponent(a[1])
                }
            }
            return f
        }

        function v(b) {
            var a = "";
            if (b != null)
                for (var c in b) {
                    var d = a.length == 0 ? "" : "&",
                        e = b[c];
                    a += d + encodeURIComponent(c) + "=" + encodeURIComponent(jg(e))
                }
            return a
        }

        function jg(a) {
            if (a instanceof Date) {
                var b = function (a, b) {
                    switch (b) {
                    case 2:
                        return a < 10 ? "0" + a : a;
                    case 3:
                        return (a < 10 ? "00" : a < 100 ? "0" : "") + a
                    }
                };
                return a.getUTCFullYear() + "-" + b(a.getUTCMonth() + 1, 2) + "-" + b(a.getUTCDate(), 2) + "T" + b(a.getUTCHours(), 2) + ":" + b(a.getUTCMinutes(), 2) + ":" + b(a.getUTCSeconds(), 2) + "." + b(a.getUTCMilliseconds(), 3) + "Z"
            }
            return "" + a
        }

        function zg(b) {
            var d = b.indexOf("?") + 1,
                c = b.indexOf("#") + 1,
                a = {};
            if (d > 0) {
                var e = c > d ? c - 1 : b.length;
                a = Eb(b.substring(d, e), a)
            }
            if (c > 0) a = Eb(b.substring(c), a);
            return a
        }

        function hb(a, b) {
            return a + (a.indexOf("?") < 0 ? "?" : "&") + v(b)
        }

        function Sf(a) {
            switch (typeof a) {
            case rb:
                return a;
            case we:
                return !!a;
            case b:
                return a.toLowerCase() === "true";
            default:
                return false
            }
        }
        var L = {
            name: r,
            type: j,
            optional: true
        }, ff = {
                name: r,
                type: j,
                optional: false
            };

        function Yb(a, c, d) {
            if (a instanceof Array)
                for (var b = 0; b < a.length; b++) me(a[b], c[b], d);
            else me(a, c, d)
        }

        function me(c, a, b) {
            Vd(c, a, b);
            if (a.type === "properties") m(c, a.properties, b)
        }

        function Vd(f, e, c) {
            var d = e.name,
                a = typeof f,
                g = e.type;
            if (a === "undefined" || f == null)
                if (e.optional) return;
                else throw mc(d, c);
            switch (g) {
            case "string":
                if (a !== b) throw O(d, c);
                if (!e.optional && U(f) === "") throw mc(d, c);
                break;
            case "properties":
                if (a != wb) throw O(d, c);
                break;
            case "function":
                if (a != j) throw O(a, c);
                break;
            case "dom":
                if (a == b) {
                    if (pb(f) == null) throw new Error(Hf.replace("METHOD", c).replace("PARAM", d))
                } else if (a != wb) throw O(d, c);
                break;
            case "string_or_array":
                if (a !== b && !(f instanceof Array)) throw O(a, c);
                break;
            default:
                if (a !== g) throw O(d, c)
            }
            if (e.allowedValues != null) dg(f, e.allowedValues, e.caseSensitive, d, c)
        }

        function m(g, c, f) {
            var d = g || {};
            for (var b = 0; b < c.length; b++) {
                var a = c[b],
                    e = d[a.name] || d[a.altName];
                Vd(e, a, f)
            }
        }

        function dg(d, a, e, f, h) {
            var g = typeof a[0] === b;
            for (var c = 0; c < a.length; c++)
                if (g && !e) {
                    if (d.toLowerCase() === a[c].toLowerCase()) return
                } else if (d === a[c]) return;
            throw Y(f, h)
        }

        function O(a, b) {
            return new Error(Te.replace("METHOD", b).replace("PARAM", a))
        }

        function mc(a, b) {
            return new Error(rf.replace("METHOD", b).replace("PARAM", a))
        }

        function Y(c, d, a) {
            var b = qf.replace("METHOD", d).replace("PARAM", c);
            if (typeof a !== Wb) b += " " + a;
            return new Error(b)
        }

        function Kd(b, d, c) {
            if (b)
                for (var a = 0; a < c && a < b.length; a++)
                    if (d === typeof b[a]) return b[a];
            return undefined
        }

        function bb(i, g) {
            var e = ze(i),
                a = null,
                b = null;
            for (var d = 0; d < e.length; d++) {
                var c = e[d],
                    f = typeof c;
                if (f === wb && a === null) a = K(c);
                else if (f === j && b === null) b = c
            }
            a = a || {};
            if (b) a.callback = b;
            a[h] = g;
            return a
        }

        function Rf(e) {
            var a = ze(e),
                d = null,
                c = null;
            if (typeof a[0] === b) {
                d = a.shift();
                if (typeof a[0] === b) c = a.shift()
            }
            normalizedArgs = bb(a);
            if (d !== null) {
                normalizedArgs[y] = d;
                if (c != null) normalizedArgs[R] = c
            }
            return normalizedArgs
        }

        function I(a, b) {
            var c = Cb(a, a, b);
            t(b.message);
            return ab(a, false, null, c)
        }
        var l = function (b, c, a) {
            this._name = b;
            this._op = c;
            this._uplinkPromise = a;
            this._isCompleted = false;
            this._listeners = []
        };
        l.prototype = {
            then: function (d, e, c) {
                var b = new l(null, null, this),
                    a = {};
                a[n] = d;
                a[o] = e;
                a[H] = c;
                a.chainedPromise = b;
                this._listeners.push(a);
                return b
            },
            cancel: function () {
                if (this._isCompleted) return;
                if (this._uplinkPromise && !this._uplinkPromise._isCompleted) this._uplinkPromise.cancel();
                else {
                    var a = this._op ? this._op.cancel : null;
                    if (typeof a === j) this._op.cancel();
                    else this.onError(p(mb, Ob.replace("METHOD", this._getName())))
                }
            },
            _getName: function () {
                if (this._name) return this._name;
                if (this._op && typeof this._op._getName === j) return this._op._getName();
                if (this._uplinkPromise) return this._uplinkPromise._getName();
                return ""
            },
            _onEvent: function (b, a) {
                if (this._isCompleted) return;
                this._isCompleted = a !== H;
                this._notify(b, a)
            },
            _notify: function (b, a) {
                var c = this;
                lh(this._listeners, function (g) {
                    var h = g[a],
                        d = g.chainedPromise,
                        f = a !== H;
                    if (h) try {
                        var e = h.apply(g, b);
                        if (f && e && e.then) {
                            d._op = e;
                            e.then(function (a) {
                                d[n](a)
                            }, function (a) {
                                d[o](a)
                            }, function (a) {
                                d[H](a)
                            })
                        }
                    } catch (i) {
                        if (f) d.onError(Cb(c._getName(), a, i))
                    } else if (f) d[a].apply(d, b)
                })
            }
        };
        l.prototype[n] = function () {
            this._onEvent(arguments, n)
        };
        l.prototype[o] = function () {
            this._onEvent(arguments, o)
        };
        l.prototype[H] = function () {
            this._onEvent(arguments, H)
        };

        function ab(e, d, b, f) {
            var a = new l(e, null, null),
                c = d ? n : o;
            if (typeof b === j) a.then(function (a) {
                b(a)
            });
            ub(function () {
                a[c](f)
            });
            return a
        }
        var Tb = [d, Zb, g, fb, gb, s, k, D],
            be = "refresh_type",
            eg = "app",
            vc = "ms",
            wc = "response_method",
            qd = "url",
            fd = "cookie",
            Lb = "onanalytics",
            Id = "login",
            kd = "loginstatus",
            xf = "file_dialog",
            Kb = "auth.response",
            N = "mode",
            W = "open",
            cf = "save",
            Z = "select",
            Zc = "single",
            Ue = "multi",
            Bb = "lightbox",
            Se = "grey",
            Tc = "transparent",
            ic = "white",
            Vc = "loading_timeout",
            dd = "onselected",
            Qf = "auth",
            gf = "rps",
            Ze = "oauth",
            hf = "v",
            Ge = "1",
            He = "2",
            Bf = "domain",
            tf = "livesdk",
            Xf = "mkt",
            Yc = "pickerscript",
            Ye = "onPickerComplete",
            We = "updateToken",
            yc = "WL.fileDialog",
            dh = 27,
            Pb = "skydrivepicker",
            ef = "Loading SkyDrive picker is timed out.";
        WL.init = function (d) {
            try {
                var c = K(d);
                Yb(c, {
                    name: "properties",
                    type: "properties",
                    optional: false,
                    properties: [{
                        name: q,
                        altName: jh,
                        type: b,
                        optional: false
                    }, {
                        name: g,
                        type: Ac,
                        optional: true
                    }, {
                        name: w,
                        altName: Wg,
                        type: b,
                        optional: true
                    }, {
                        name: lb,
                        type: b,
                        allowedValues: [sg, ib],
                        optional: true
                    }, {
                        name: be,
                        type: b,
                        allowedValues: [eg, vc],
                        optional: true
                    }, {
                        name: Od,
                        type: rb,
                        optional: true
                    }, {
                        name: e,
                        type: rb,
                        optional: true
                    }]
                }, "WL.init");
                if (!c[w] && c[lb] === kh) throw new Error(Re.replace("METHOD", "WL.init"));
                if (c[e] == null) c[e] = true;
                return a.appInit(c)
            } catch (f) {
                return I("WL.init", f)
            }
        };
        WL.login = function () {
            try {
                var c = bb(arguments);
                m(c, [{
                        name: g,
                        type: Ac,
                        optional: true
                    }, {
                        name: w,
                        type: b,
                        optional: true
                    }, {
                        name: V,
                        type: b,
                        optional: true
                    },
                    L
                ], "WL.login");
                return a.login(c)
            } catch (f) {
                return I("WL.login", f)
            }
        };
        WL.download = function () {
            try {
                var b = "WL.download",
                    c = bb(arguments, b);
                return a.download(c)
            } catch (f) {
                return I(b, f)
            }
        };
        WL.upload = function () {
            try {
                var b = "WL.upload",
                    c = bb(arguments, b);
                return a.upload(c)
            } catch (f) {
                return I(b, f)
            }
        };
        WL.ui = function () {
            try {
                var c = bb(arguments);
                m(c, [{
                        name: Yg,
                        type: b,
                        allowedValues: [Qc, Pb],
                        optional: false
                    },
                    L
                ], "WL.ui");
                a.ui(c)
            } catch (f) {
                vd(c, f)
            }
        };
        WL.fileDialog = function () {
            try {
                var b = yc,
                    c = bb(arguments, b);
                xd(c, b);
                return a.fileDialog(c)
            } catch (f) {
                return I(b, f)
            }
        };

        function xd(d, c) {
            m(d, [{
                    name: N,
                    type: b,
                    allowedValues: [W, cf],
                    optional: false
                }, {
                    name: Z,
                    type: b,
                    allowedValues: [Zc, Ue],
                    optional: true
                }, {
                    name: Bb,
                    type: b,
                    allowedValues: [Se, Tc, ic],
                    optional: true
                }, {
                    name: Vc,
                    type: we,
                    optional: true
                },
                L
            ], c);
            if (c !== yc) m(d, [{
                name: C,
                allowedValues: [Hb, Gb],
                type: b,
                optional: true
            }, {
                name: dd,
                type: j,
                optional: false
            }, {
                name: nb,
                type: j,
                optional: true
            }], c);
            if (!Gc.isSupported() || !window.JSON || a._browser.mobile) throw new Error(ld)
        }

        function bg() {
            a._urlParams = zg(window.location.href);
            a._pageState = Eb(a._urlParams[V])
        }

        function Nd() {
            var b = new tb(ve);
            b.load();
            var c = a._urlParams,
                f = a._pageState,
                i = true,
                m = f[s];
            if (m)
                if (m != b.get(s)) b.set(s, f[s]);
                else i = false;
            var j = c[d] != null,
                n = b.get(d) != null || j,
                o = n ? E : xb,
                p = Td();
            if (f[wc] === qd) {
                for (var h = 0; h < Tb.length; h++) {
                    var g = Tb[h];
                    if (c[g]) b.set(g, c[g])
                }
                if (j) {
                    b.set(gb, p + parseInt(c[fb]));
                    b.remove(k);
                    b.remove(D)
                } else if (!n)
                    if (c[k] === Jb) o = Ig
            } else if (i) {
                var l = yf(b);
                if (l) {
                    b.set(k, ng);
                    b.set(D, l)
                }
            } else return;
            b.set(e, o);
            b.save()
        }

        function Fg() {
            var b = a._pageState,
                e = b[ac];
            if (e === Ad) {
                var h = b[fe],
                    g = a._urlParams[Eg];
                Zf(h, g);
                return
            }
            var c = b[ec],
                f = b[Qb] === "true";
            a._logEnabled = true;
            a._traceEnabled = b[fc] || a._urlParams[fc];
            a._secureCookie = f;
            Gf();
            if (c === oe || c === Jc) {
                Nd();
                if (c === Jc && a._browser.ie) document.location = b[w];
                else window.close()
            } else if (c === bc) Nd();
            else {
                jb(Og);
                var d = window.wlAsyncInit;
                if (d && typeof d === j) d.call()
            }
        }

        function ag(a, b) {
            if (!a) a = ah(window.location.href);
            return Je(a, window.location.hostname, b)
        }

        function Je(f, e, d) {
            var b = new De(f);
            b.resolve();
            var e = e.split(":")[0].toLowerCase(),
                c = b.host.toLowerCase();
            a._domain = a._domain || c;
            if (a._isHttps && b.scheme == Oc) throw new Error(og.replace("METHOD", d));
            return b.toString()
        }

        function yf(a) {
            var i = a.get(d) != null,
                f = a.get(k) != null,
                h = a.get(g) != null,
                c = a.get(fb) != null,
                e = a.get(q) != null,
                b = null;
            if (!(i && h && c) && !f) {
                t(hd);
                b = hd
            }
            if (!e) {
                t(cd);
                b = cd
            }
            return b
        }

        function Sg() {
            Ed = a._browser.ie ? 2000 : 4000;
            bg();
            Fg()
        }

        function Zf(c, b) {
            var a = new tb(ke);
            a.load();
            a.set(c, b);
            a.save()
        }

        function wf(b) {
            a._authScope = Fd(b[g]);
            a._secureCookie = Sf(b[Qb]);
            a._redirect_uri = ag(b[w], "WL.init");
            a._response_type = (b[lb] || ib).toLowerCase();
            a._appId = b[q];
            a._refreshType = (b[be] || vc).toLowerCase();
            var i = new se(b[q], ve);
            a._session = i;
            var d = i.getNormalStatus(),
                j = d[e],
                f, h = "WL.init";
            if (j == E) {
                c.notify(X, d);
                c.notify(nc, d);
                c.notify(Rb, d);
                f = ab(h, true, b.callback, d)
            } else if (b[e]) {
                f = new l(h, null, null);
                a.getLoginStatus({
                    internal: true,
                    callback: function (a) {
                        var b = !! a.error ? o : n;
                        f[b](a)
                    }
                }, true)
            }
            return f
        }

        function qg() {
            var b = a._pendingLogin;
            if (b != null) {
                b.cancel();
                a._pendingLogin = null
            }
            return true
        }

        function gg(c) {
            var b = Fd(c[g]);
            if (b === "") b = a._authScope;
            if (!b || b === "") throw mc(g, "WL.login");
            c.normalizedScope = b
        }

        function mg(b, a) {
            return new Nc(Id, b, a)
        }

        function nf(b, a) {
            return new Nc(kd, b, a)
        }
        a.ensurePermission = function (d, e, f, b) {
            var c = p(Jb, of.replace("METHOD", f));
            a.login({
                scope: d
            }).then(function (f) {
                if (f.session[fb] < e) a.getLoginStatus({
                    internal: true
                }, true).then(function () {
                    a.login({
                        scope: d
                    }).then(function (a) {
                        b(a)
                    }, function () {
                        b(c)
                    })
                }, function () {
                    b(c)
                });
                else b(f)
            }, function () {
                b(c)
            })
        };
        a.canLogout = function () {
            return true
        };

        function yg(d) {
            Wd();
            var b = Ib("iframe"),
                c = Sd(),
                e = "/oauth20_logout.srf?ts=";
            b.src = "//" + c + e + (new Date).getTime();
            document.body.appendChild(b);
            a.logoutFrame = b;
            window.setTimeout(function () {
                Wd();
                d()
            }, 30000)
        }

        function Wd() {
            if (a.logoutFrame != null) {
                document.body.removeChild(a.logoutFrame);
                a.logoutFrame = null
            }
        }

        function vd(c, b) {
            t(b.message);
            var a = c[nb];
            if (a) ub(function () {
                error = Cb("WL.ui", "WL.ui", b), a(error)
            })
        }

        function he() {
            return a[F]
        }

        function pe() {
            return he() + "images"
        }
        var Kc = function (c) {
            var a = this;
            a._properties = c;
            var b = f(a, a.init);
            jb(b)
        };
        Kc.prototype = {
            init: function () {
                var d = this,
                    e = d._properties;
                if (d._inited === true) return;
                d._inited = true;
                try {
                    d.validate();
                    var g = e[db],
                        h = e[Mc],
                        m = e[r],
                        j = e[Fb],
                        i = e[Db];
                    af(e);
                    g = typeof g === b ? pb(e[db]) : g;
                    d._element = g;
                    h = h != null ? h : qc;
                    if (h == qc) {
                        j = u.signIn;
                        i = u.signOut
                    } else if (h == Dd) {
                        j = u.login;
                        i = u.logout
                    } else if (h == wd) {
                        j = u.connect;
                        i = u.signOut
                    }
                    d[Fb] = j;
                    d[Db] = i;
                    re(g, Ff(e));
                    var k = a._session.isSignedIn(),
                        l = k ? i : j;
                    d.updateUI(l, k);
                    Oe(d, g.childNodes[0]);
                    c.subscribe(Rb, f(d, d.onLoggedIn));
                    c.subscribe(Bc, f(d, d.onLoggedOut));
                    a.getLoginStatus({
                        internal: true
                    });
                    delete e[r];
                    B(m, e, false)
                } catch (n) {
                    vd(e, n)
                }
            },
            validate: function () {
                var a = this._properties;
                m(a, [{
                    name: db,
                    type: Sc,
                    optional: false
                }, {
                    name: Mc,
                    allowedValues: [qc, Dd, wd, zd],
                    type: b,
                    optional: true
                }, {
                    name: g,
                    type: Ac,
                    optional: true
                }, {
                    name: V,
                    type: b,
                    optional: true
                }, {
                    name: Hd,
                    type: j,
                    optional: true
                }, {
                    name: Cd,
                    type: j,
                    optional: true
                }, {
                    name: nb,
                    type: j,
                    optional: true
                }], "WL.ui-signin");
                Ee(a);
                var c = a[Mc];
                if (c == zd) m(a, [{
                    name: Fb,
                    type: b,
                    optional: false
                }, {
                    name: Db,
                    type: b,
                    optional: false
                }], "WL.ui-signin")
            },
            fireEvent: function (b, c) {
                var a = this._properties[b];
                if (a) a(c)
            },
            onClick: function () {
                var b = this;
                if (b._element.childNodes.length == 0) {
                    Xc(b);
                    return false
                }
                if (a._session.isSignedIn()) {
                    if (a.canLogout()) a.logout({})
                } else a.login(b._properties, true).then(function () {}, function (a) {
                    b.fireEvent(nb, a)
                });
                return false
            },
            onLoggedIn: function (a) {
                this.updateUI(this[Db], true);
                this.fireEvent(Hd, a)
            },
            onLoggedOut: function (a) {
                this.updateUI(this[Fb], false);
                this.fireEvent(Cd, a)
            }
        };

        function af(b) {
            if (a._authScope && a._authScope !== "") b[g] = a._authScope;
            if (!b[g]) b[g] = qe
        }

        function Le(d, a, c) {
            a._handlers = a._handlers || {};
            var b = f(a, c);
            a._handlers[d] = b;
            return b
        }

        function Xe(b, a) {
            return a._handlers[b]
        }
        a.ui = function (a) {
            x("WL.ui");
            switch (a.name) {
            case Qc:
                new Kc(a);
                break;
            case Pb:
                new yd(a)
            }
        };

        function Ee(a) {
            m(a, [{
                name: C,
                allowedValues: [Hb, Gb],
                type: b,
                optional: true
            }, {
                name: Xb,
                allowedValues: [tg, Hg, Bg, Dc, Bd, Lc],
                type: b,
                optional: true
            }], "WL.ui-signin");
            a[C] = a[C] || Hb;
            a[Xb] = a[Xb] || Dc
        }

        function Ff(f) {
            var d = f[Xb],
                e = f[C],
                g = a._locale,
                b = g.indexOf("ar") > -1 || g.indexOf("he") > -1 ? "RTL" : "LTR",
                h = "cursor:pointer;background-color:transparent;border:solid 0px;display:inline-block;overflow:hidden;white-space:nowrap;padding:0px;width:auto;",
                c = "margin:0px;padding:0px;border-width:0px;vertical-align:middle;background-attachment:scroll;display:inline-block;white-space:nowrap;",
                k = uc(d, b, e, "left") + c,
                i = uc(d, b, e, "center") + c,
                j = uc(d, b, e, "right") + c;
            return '<button style="' + h + '"><span style="' + k + '"></span><span style="' + i + '"><span style="' + kf(b) + '"></span></span><span style="' + j + '"></span></button>'
        }

        function kf(g) {
            var b = a._browser,
                j = b.ie6 || b.ie7,
                k = b.ie8 || b.ie9,
                f = b.chrome || b.safari ? "padding:2px 3px;margin:0px;" : "padding:1px 3px;margin:0px;",
                h = "font-family: Segoe UI, Verdana, Tahoma, Helvetica, Arial, sans-serif;",
                e = "direction:" + g.toLowerCase() + ";",
                d = "text-decoration:none;color:#3975a0;display:inline-block;",
                c = "150";
            switch (a._locale) {
            case "ar-ploc-sa":
                if (!j) c = "170";
                break;
            case "te":
            case "ja-ploc-jp":
                if (b.ie) c = "190"
            }
            var i = "height:18px;font-size:9pt;font-weight:bold;line-height:" + c + "%;";
            return f + e + d + h + i
        }

        function uc(a, b, i, g) {
            a = a == Dc ? Bd : a;
            var h = a + "_" + b + "_" + i,
                e, d, c, f = "background: url({imgpath}/signincontrol/{image}.png) scroll {repeat} 0px {vpos}; height: 22px; width: {width};";
            switch (g) {
            case "left":
                e = a === Lc || b === "RTL" ? "3px" : "25px";
                d = b === "LTR" ? "0px" : "-44px";
                c = "no-repeat";
                break;
            case "center":
                e = "auto";
                d = "-22px";
                c = "repeat-x";
                break;
            case "right":
                e = a === Lc || b === "LTR" ? "3px" : "25px";
                d = b === "LTR" ? "-44px" : "0px";
                c = "no-repeat"
            }
            return f.replace("{imgpath}", pe()).replace("{image}", h).replace("{vpos}", d).replace("{width}", e).replace("{repeat}", c)
        }
        Kc.prototype.updateUI = function (d) {
            if (this._element.childNodes.length == 0) {
                Xc(this);
                return
            }
            if (d != this._text) {
                var c = a._browser,
                    b = this._element.childNodes[0],
                    e = b.childNodes[1];
                Ug(e.childNodes[0], d);
                this._text = d;
                if (c.ie6 || c.ie7) {
                    e.style.width = "auto";
                    b.style.width = "auto";
                    var h = b.childNodes[0].clientWidth,
                        f = b.childNodes[1].clientWidth,
                        g = b.childNodes[2].clientWidth,
                        i = h + f + g;
                    b.style.width = i + "px";
                    if (c.ie6) {
                        b.childNodes[0].style.width = h + "px";
                        b.childNodes[1].style.width = f + "px";
                        b.childNodes[2].style.width = g + "px"
                    }
                }
            }
        };

        function Oe(a, b) {
            a._button = b;
            z(b, "click", Le("click", a, a.onClick))
        }

        function Xc(a) {
            var b = a._button;
            if (b) {
                A(b, "click", Xe("click", a));
                delete a._button
            }
        }
        var yd = function (b) {
            xd(b);
            var a = this;
            a._props = b;
            jb(f(a, a.init))
        };
        yd.prototype = {
            init: function () {
                var a = this;
                if (a._inited === true) return;
                a._inited = true;
                try {
                    var c = a._props,
                        d = c[db],
                        e = c[r];
                    c[h] = "WL.ui-" + Pb;
                    a.validate();
                    c[C] = c[C] || Gb;
                    d = typeof d === b ? pb(c[db]) : d;
                    a._element = d;
                    var g = Pe(c);
                    re(d, g);
                    mf(d, f(a, a.onClick), f(a, a.onRender));
                    a.onRender(false, false);
                    B(e, c, false)
                } catch (i) {
                    t(i.message)
                }
            },
            validate: function () {
                var a = this._props;
                m(a, [{
                    name: db,
                    type: Sc,
                    optional: false
                }], a[h])
            },
            onClick: function () {
                try {
                    return a.fileDialog(this._props)
                } catch (b) {
                    t(b.message)
                }
                return false
            },
            onRender: function () {
                var k = this._props,
                    f = k[C] === Gb,
                    h = a._locale,
                    e = h.indexOf("ar") > -1 || h.indexOf("he") > -1,
                    j = e ? "RTL" : "LTR",
                    b = this._element.childNodes[0],
                    i = b.childNodes[0],
                    c = b.childNodes[1],
                    d = "#094AB2",
                    g = "#ffffff";
                b.style.direction = j;
                b.style.backgroundColor = f ? g : d;
                b.style.border = "solid 1px";
                b.style.borderColor = d;
                b.style.height = "20px";
                b.style.paddingLeft = "4px";
                b.style.paddingRight = "4px";
                b.style.textAlign = "center";
                b.style.cursor = "pointer";
                i.style.verticalAlign = "middle";
                i.style.height = "16px";
                c.style.fontFamily = "'Segoe UI', 'Segoe UI Web Regular', 'Helvetica Neue', 'BBAlpha Sans', 'S60 Sans', Arial, 'sans-serif'";
                c.style.fontSize = "12px";
                c.style.fontWeight = "bold";
                c.style.color = f ? d : g;
                c.style.textAlign = "center";
                c.style.verticalAlign = "middle";
                c.style.marginLeft = e ? "0px" : "2px";
                c.style.marginRight = e ? "2px" : "0px"
            }
        };

        function Pe(b) {
            var k = b[N],
                j = b[C],
                a = k === W,
                e = a ? u.skyDriveOpenPickerButtonText : u.skyDriveSavePickerButtonText,
                c = a ? u.skyDriveOpenPickerButtonTooltip : u.skyDriveSavePickerButtonTooltip,
                f = a ? "skydriveopenpickerbutton" : "skydrivesavepickerbutton",
                i = j === Hb ? "SkyDriveIcon_white.png" : "SkyDriveIcon_blue.png",
                h = "<img alt='' src='" + pe() + "/SkyDrivePicker/" + i + "'>",
                g = "<span>" + e + "</span>",
                d = "<button id='" + f + "' title='" + c + "'>" + h + g + "</button>";
            return d
        }

        function mf(c, l, k) {
            var a = c.childNodes[0];
            if (l) {
                var f = function (b) {
                    if (c.childNodes.length == 0) {
                        A(a, "click", f);
                        return
                    }
                    l(b)
                };
                z(a, "click", f)
            }
            if (k) {
                var d = false,
                    e = false,
                    g = function (a) {
                        e = true;
                        b(a)
                    }, h = function (a) {
                        e = false;
                        b(a)
                    }, i = function (a) {
                        d = true;
                        b(a)
                    }, j = function (a) {
                        d = false;
                        b(a)
                    }, b = function () {
                        if (c.childNodes.length == 0) {
                            A(a, "mouseenter", g);
                            A(a, "mouseleave", h);
                            A(document, "mousedown", i);
                            A(document, "mouseup", j);
                            return
                        }
                        k(d, e)
                    };
                z(a, "mouseenter", g);
                z(a, "mouseleave", h);
                z(document, "mousedown", i);
                z(document, "mouseup", j)
            }
        }

        function gh(c) {
            var a = document.cookie;
            c += "=";
            var b = a.indexOf(c);
            if (b >= 0) {
                b += c.length;
                var d = a.indexOf(";", b);
                if (d < 0) d = a.length;
                else {
                    postCookie = a.substring(d);
                    if (postCookie.indexOf(c) >= 0) throw new Error(Me)
                }
                var e = a.substring(b, d);
                return e
            }
            return ""
        }

        function Be(g, d, f, e) {
            d = d ? d : "";
            var c = g + "=" + d + "; path=/";
            if (f && f != "localhost") c += "; domain=" + encodeURIComponent(f);
            if (e != null) {
                var b = new Date(0);
                if (e > 0) {
                    b = new Date;
                    b.setTime(b.getTime() + e * 1000)
                }
                c += ";expires=" + b.toUTCString()
            }
            if (a._isHttps && a._secureCookie) c += ";secure";
            document.cookie = c
        }
        var tb = function (a, b) {
            this._cookieName = a;
            this._states = b || {};
            this._listeners = [];
            this._cookieWatcher = null
        };
        tb.prototype = {
            getStates: function () {
                return this._states
            },
            get: function (a) {
                return this._states[a]
            },
            set: function (b, a) {
                this._states[b] = a
            },
            remove: function (a) {
                if (this._states[a]) delete this._states[a]
            },
            load: function () {
                try {
                    var a = gh(this._cookieName);
                    if (this._rawValue != a) {
                        i("Cookie changed: " + this._cookieName + "=" + a);
                        this._rawValue = a;
                        this._states = Eb(a);
                        for (var b = 0; b < this._listeners.length; b++) this._listeners[b]()
                    }
                } catch (c) {
                    t(c.message);
                    this.stopMonitor()
                }
            },
            flush: function (a) {
                this._states = a;
                this.save()
            },
            populate: function (a) {
                K(a, this._states);
                this.save()
            },
            save: function () {
                Be(this._cookieName, v(this._states), ee(), null)
            },
            clear: function () {
                this._states = {};
                Be(this._cookieName, "", ee(), 0)
            },
            addCookieChanged: function (a) {
                this._listeners.push(a);
                this.startMonitor()
            },
            startMonitor: function () {
                this._refreshInterval = 300;
                if (!this._cookieWatcher) {
                    i("Started monitoring cookie: " + this._cookieName);
                    this._cookieWatcher = window.setInterval(f(this, this.load), this._refreshInterval)
                }
            },
            stopMonitor: function () {
                if (this._cookieWatcher) {
                    i("Stopped monitoring cookie: " + this._cookieName);
                    window.clearInterval(this._cookieWatcher);
                    this._cookieWatcher = null
                }
            },
            isBeingMonitored: function () {
                return this._cookieWatcher !== null
            }
        };

        function ee() {
            var b = a._domain || window.location.hostname.split(":")[0];
            return b
        }
        var Nc = function (d, b, c) {
            var a = this;
            a._method = d;
            a._completed = false;
            a._requestFired = false;
            a._properties = b;
            a._callback = c;
            a._authMonitor = f(a, a._onAuthChanged);
            a.execute = a._method == Id ? a._login : a._getLoginStatus
        };
        Nc.prototype = {
            cancel: function () {
                this._onComplete({
                    error: mb,
                    error_description: Af
                })
            },
            _login: function () {
                var b = this;
                b._requestTs = (new Date).getTime();
                var e = a._browser.mobile,
                    d = e && a._browser.ie,
                    h = e ? Jc : oe,
                    g = ne(h, b._properties.normalizedScope, xc(b._properties), b._requestTs, d, b._properties.state);
                if (d) document.location = g;
                else {
                    b._popup = hh(g);
                    i("AuthRequest-login: popup is opened. " + b._popup);
                    b._popupWatcher = window.setInterval(f(b, b._checkPopup), 3000);
                    c.subscribe(Kb, b._authMonitor)
                }
                b._promise = new l("WL.login", null, null);
                return b._promise
            },
            _getLoginStatus: function () {
                hg(f(this, this._fireStatusRequest));
                this._timeout = window.setTimeout(f(this, this._onTimedOut), Df);
                this._promise = new l("WL.getLoginStatus", null, null);
                return this._promise
            },
            _fireStatusRequest: function () {
                var b = this;
                if (!b._requestFired) {
                    b._requestTs = (new Date).getTime();
                    var d = a._refreshType === vc ? ne(bc, a._authScope, xc(), b._requestTs, false) : lg(xc(), a._authScope, b._requestTs);
                    b._statusFrame = Jd(d);
                    c.subscribe(Kb, b._authMonitor);
                    b._requestFired = true
                }
            },
            _onAuthChanged: function () {
                var b = a._session.tryGetResponse(this._properties.normalizedScope, this._requestTs);
                if (b != null) this._onComplete(this._normalizeResp(b))
            },
            _normalizeResp: function (b) {
                if (this._method === kd && b.error === Jb) return a._session.getNormalStatus();
                return b
            },
            _onTimedOut: function () {
                this._onComplete({
                    error: Vb,
                    error_description: sf
                })
            },
            _checkPopup: function () {
                try {
                    if (this._popup === null) this._onComplete({
                        error: Jb,
                        error_description: Jf
                    });
                    else if (this._popup.closed) this._popup = null
                } catch (a) {
                    i("AuthRequest-checkPopup-error: " + a)
                }
            },
            _onComplete: function (a) {
                if (!this._completed) {
                    this._completed = true;
                    this._dispose();
                    this._callback(this._properties, a);
                    if (a[k]) this._promise[o](a);
                    else this._promise[n](a)
                }
            },
            _dispose: function () {
                i("AuthRequest: dispose " + this._method);
                if (this._timeout) {
                    window.clearTimeout(this._timeout);
                    this._timeout = null
                }
                if (this._statusFrame != null) {
                    document.body.removeChild(this._statusFrame);
                    this._statusFrame = null
                }
                if (this._popupWatcher) {
                    window.clearInterval(this._popupWatcher);
                    this._popupWatcher = null
                }
                c.unsubscribe(Kb, this._authMonitor)
            }
        };

        function hh(p) {
            var c = 525,
                b = 525,
                e, d;
            if (a._browser.ie) {
                var k = window.screenLeft,
                    l = window.screenTop,
                    f = document.documentElement,
                    i = 30;
                d = k + (f.clientWidth - c) / 2;
                e = l + (f.clientHeight - b) / 2 - i
            } else {
                var n = window.screenX,
                    o = window.screenY,
                    j = window.outerWidth,
                    h = window.outerHeight;
                d = n + (j - c) / 2;
                e = o + (h - b) / 2
            }
            var m = ["width=" + c, "height=" + b, "top=" + e, "left=" + d, "status=no", "resizable=yes", "toolbar=no", "menubar=no", "scrollbars=yes"],
                g = window.open(p, "oauth", m.join(","));
            g.focus();
            return g
        }

        function lg(d, i, f) {
            var b = {};
            b[ac] = Md;
            b[s] = f;
            b[Qb] = a._secureCookie;
            b[ec] = bc;
            b[wc] = fd;
            if (a.trace) b[fc] = true;
            var j = v(b),
                c = {};
            c[q] = a._session.get(q);
            c[lb] = ib;
            c[g] = i;
            c[V] = j;
            var h = d.indexOf("?") > 0,
                e = h ? "&" : "?",
                k = d + e + v(c);
            return k
        }

        function ne(d, m, i, k, l, f) {
            var b = {};
            b[ac] = Md;
            b[ec] = d;
            b[s] = k;
            if (l) b[w] = window.location.href;
            if (a.trace) b[fc] = true;
            if (f) b[bh] = f;
            var e = d === bc ? ib : a._response_type,
                h = e === ib ? qd : fd;
            b[wc] = h;
            b[Qb] = a._secureCookie;
            var n = v(b),
                c = {};
            c[q] = a._session.get(q);
            c[ec] = d;
            c[fh] = a._locale;
            c[w] = i;
            c[lb] = e;
            c[g] = m;
            c[V] = n;
            var j = Sd(),
                o = "https://" + j + "/oauth20_authorize.srf?" + v(c);
            return o
        }

        function xc(c) {
            var b = c != null ? c[w] : null;
            return b != null && b != "" ? b : a._redirect_uri
        }
        var se = function (b, a) {
            this._state = {};
            this._state[q] = b;
            this._state[e] = T;
            this._cookieName = a;
            this.init()
        };
        se.prototype = {
            get: function (a) {
                return this._state[a]
            },
            save: function () {
                if (this._stateDirty) {
                    this._cookie.flush(this._state);
                    this._stateDirty = false
                }
            },
            init: function () {
                var a = new tb(this._cookieName);
                a.load();
                this._cookie = a;
                if (a.get(q) != this._state[q]) {
                    a.clear();
                    a.flush(this._state)
                } else this._state = a.getStates();
                var b = this._state[e];
                this._statusChecked = b !== xb && b !== T;
                this._cookie.addCookieChanged(f(this, this.onCookieChanged))
            },
            refresh: function () {
                a.getLoginStatus({
                    internal: true
                }, true);
                this._refresh = undefined
            },
            scheduleRefresh: function () {
                this.cancelRefresh();
                var a = (this.tokenExpiresIn() - 600) * 1000;
                if (a > 0) this._refresh = window.setTimeout(f(this, this.refresh), a)
            },
            cancelRefresh: function () {
                if (this._refresh) {
                    window.clearTimeout(this._refresh);
                    this._refresh = undefined
                }
            },
            updateStatus: function (a) {
                var b = this._state[e],
                    f = this._state[d];
                if (b != a) {
                    this._state[e] = a;
                    this._stateDirty = true;
                    this.onStatusChanged(b, a);
                    this.save();
                    if (f != this._state[d]) c.notify(X, this.getNormalStatus())
                }
            },
            onStatusChanged: function (b, a) {
                i("AuthSession: Auth status changed: " + b + "=>" + a);
                if (b != a) {
                    var g = b == E,
                        d = a == E;
                    if (!d) {
                        for (var e = 0; e < Tb.length; e++) {
                            var f = Tb[e];
                            if (this._state[f]) delete this._state[f]
                        }
                        this._stateDirty = true;
                        this.save()
                    }
                    if (oc(b) != oc(a)) c.notify(nc, this.getNormalStatus());
                    if (d != g)
                        if (d) c.notify(Rb, this.getNormalStatus());
                        else c.notify(Bc, this.getNormalStatus())
                }
            },
            isSignedIn: function () {
                return this._state[e] === E
            },
            getNormalStatus: function () {
                var a = this.getStatus();
                a[e] = oc(a[e]);
                return a
            },
            tokenExpiresIn: function () {
                var a = this._state,
                    c = a[e],
                    b = parseInt(a[gb]);
                if (c === E) return b - Td();
                return -1
            },
            onCookieChanged: function () {
                var b = this._state,
                    a = this._cookie.getStates();
                this._state = a;
                i("AuthSession: cookie changed. Has token: " + (a[d] != null));
                this._statusChecked = a[e] !== T;
                if (b[d] != a[d] || b[k] != a[k] || b[s] != a[s]) {
                    c.notify(Kb);
                    delete a[k];
                    delete a[D];
                    this._stateDirty = true
                }
                if (b[e] != a[e]) this.onStatusChanged(b[e], a[e]);
                if (b[d] != a[d]) {
                    c.notify(X, this.getNormalStatus());
                    if (a[d]) this.scheduleRefresh();
                    else this.cancelRefresh()
                }
                this.save()
            },
            getStatus: function () {
                var b = null,
                    c = this._state[e];
                if (c === E) {
                    var f = this.tokenExpiresIn();
                    if (f <= 10) {
                        c = this._statusChecked ? xb : T;
                        this.updateStatus(c);
                        window.setTimeout(function () {
                            a.getLoginStatus({
                                internal: true
                            }, true)
                        }, 30000)
                    } else {
                        if (f < 60) c = dc;
                        b = {};
                        b[d] = this._state[d];
                        b[Zb] = this._state[Zb];
                        b[g] = this._state[g].split(" ");
                        b[fb] = f;
                        b[gb] = this._state[gb]
                    }
                } else if (!this._statusChecked) c = T;
                return {
                    status: c,
                    session: b
                }
            },
            tryGetResponse: function (b, c) {
                i("AuthSession.tryGetResponse: requestTs = " + c + " scope = " + b);
                var a = this.getStatus(),
                    h = a[e];
                session = a[xe];
                if (h == T || h == dc) return null;
                if (c === undefined)
                    if (b) return session && ae(session[g], b) ? a : null;
                    else return a;
                var d = this._state,
                    j = parseInt(d[s]),
                    f = d[k],
                    l = d[D];
                if (j >= c) {
                    if (session && ae(session[g], b)) return a;
                    if (f) return Jg(f, l);
                    if (!b) return a
                }
                return null
            }
        };

        function ae(e, a) {
            if (a == null || U(a) == "") return true;
            var c = a.split(Ag);
            for (var b = 0; b < c.length; b++) {
                var d = U(c[b]);
                if (d != "" && !Vg(e, d)) return false
            }
            return true
        }

        function oc(a) {
            return a === T ? xb : a === dc ? E : a
        }

        function xg(a) {
            if (Mf(a)) return;
            if (cg(a)) return;
            if (Lf(a)) return;
            var b = {};
            b[Ub] = P;
            b[Nb] = ld;
            a.onCompleted(b)
        }

        function ih() {
            return window.XMLHttpRequest && (new XMLHttpRequest).withCredentials !== undefined
        }

        function Sd() {
            return a[eb]
        }

        function Yd() {
            return a[Q]
        }

        function df(a) {
            m(a, [{
                name: y,
                type: b,
                optional: false
            }], a[h])
        }

        function Lg(a) {
            var b = a._properties,
                c = b[y];
            Nf(c, a)
        }
        var Nf = function () {
            var a = null,
                b = 1;
            return function (c) {
                var d = {};
                d[Zg] = b;
                c = td(c, d);
                if (a === null) {
                    var e = pc();
                    a = Jd(c, e)
                } else a.src = c
            }
        }();
        a.jsonp = {};
        WL.Internal.jsonp = a.jsonp;

        function Mf(c) {
            var i = document.getElementsByTagName("HEAD")[0],
                b = document.createElement("SCRIPT"),
                e = Qd(c._properties, e, [r, y]),
                f = c._id,
                g = rc();
            if (g != null) e[d] = g;
            e[r] = Ie + f;
            e[rd] = "true";
            var h = hb(c._url, e);
            if (h.length > Ed) return false;
            c.scriptTag = b;
            a.jsonp[f] = function (a) {
                sc(f, b);
                c.onCompleted(a)
            };
            kg(b, c);
            b.setAttribute("async", "async");
            b.type = "text/javascript";
            b.src = h;
            i.appendChild(b);
            window.setTimeout(function () {
                if (c._completed) return;
                sc(f, b)
            }, 30000);
            return true
        }

        function kg(b, c) {
            if (a._browser.ie && b.attachEvent) b.attachEvent("onreadystatechange", function (a) {
                Ic(a, c)
            });
            else {
                b.readyState = "complete";
                b.addEventListener("load", function (a) {
                    Ic(a, c)
                }, false);
                b.addEventListener("error", function (a) {
                    Ic(a, c)
                }, false)
            }
        }

        function Ic(d, c) {
            if (c._completed) return;
            var b = d.srcElement || d.currentTarget;
            if (!b.readyState) b = d.currentTarget;
            if (b.readyState != "complete" && b.readyState != "loaded") return;
            var f = c._id;
            failure = d.type == "error" || a.jsonp[f] != null;
            if (failure) {
                sc(f, c.scriptTag);
                var e = {};
                e[Ub] = zf;
                e[Nb] = od;
                c.onCompleted({
                    error: e
                })
            }
        }

        function sc(b, c) {
            delete a.jsonp[b];
            document.getElementsByTagName("HEAD")[0].removeChild(c)
        }

        function Lf(b) {
            ch();
            if (a._browser.flashVersion < 9) return false;
            a.xdrFlash.send(b);
            return true
        }
        a.xdrFlash = {
            _id: "",
            _status: Cc,
            _flashObject: null,
            _requests: {},
            _pending: [],
            init: function () {
                if (this._status != Cc) return;
                this._status = jf;
                var c = Ib("div");
                c.id = "wl_xdr_container";
                document.body.appendChild(c);
                this._id = pc();
                var b = Cf,
                    d = a[F] + "XDR.swf";
                b = b.replace(/{url}/g, d);
                b = b.replace(/{id}/g, this._id);
                b = b.replace(/{variables}/g, "domain=" + document.domain);
                c.innerHTML = b
            },
            onReady: function (b) {
                if (b) {
                    if (a._browser.firefox) this._flashObject = document.embeds[this._id];
                    else this._flashObject = pb(this._id);
                    this._status = md
                } else this._status = pg;
                while (this._pending.length > 0) this.send(this._pending.shift())
            },
            onRequestCompleted: function (b, e, c, f) {
                var d = a.xdrFlash._requests[b];
                delete a.xdrFlash._requests[b];
                zc(d, e, Kg(c), f)
            },
            send: function (a) {
                if (this._status < md) {
                    this._pending.push(a);
                    if (this._status == Cc) jb(f(this, this.init));
                    return
                }
                if (this._flashObject != null) {
                    this._requests[a._id] = a;
                    var b = Ud(a);
                    this.invoke("send", [a._id, b.url, b.method, b.body])
                } else zc(a, 0, null, pf)
            },
            invoke: function (d, a) {
                a = a || [];
                var c = window.__flash__argumentsToXML(a, 0),
                    e = '<invoke name="' + d + '" returntype="javascript">' + c + "</invoke>",
                    b = this._flashObject.CallFunction(e);
                if (b == null) return null;
                return eval(b)
            }
        };
        WL.Internal.xdrFlash = a.xdrFlash;

        function Kg(a) {
            return a ? a.replace(/\r/g, " ").replace(/\n/g, " ") : a
        }
        var Cf = "<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='https://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0' width='300' height='300' id='{id}' name='{id}' type='application/x-shockwave-flash' data='{url}'>" + "<param name='movie' value='{url}'></param>" + "<param name='allowScriptAccess' value='always'></param>" + "<param name='FlashVars' value='{variables}'></param>" + "<embed play='true' menu='false' swLiveConnect='true' allowScriptAccess='always' type='application/x-shockwave-flash' FlashVars='{variables}' src='{url}' width='300' height='300' name='{id}'></embed>" + "</object>",
            tc = null;
        (function () {
            a.fileDialog = function (b) {
                x(b[h]);
                if (a._pendingPickerOp != null) throw new Error(Fe);
                return (new tc(b)).execute()
            };
            var i = 0,
                b = 1,
                g = 2,
                e = 3;
            tc = function (c) {
                var b = this;
                b._props = c;
                b._startTs = (new Date).getTime();
                c[Bb] = c[Bb] || ic;
                c[Z] = c[Z] || Zc;
                b._state = i;
                b._authDelegate = f(b, b._onAuthResp);
                a._pendingPickerOp = b
            };
            tc.prototype = {
                execute: function () {
                    var a = this,
                        b = new l(a._props[h], a, null);
                    a._promise = b;
                    a._process();
                    return b
                },
                cancel: function (a) {
                    var b = this,
                        c = b._props;
                    if (b._state === e) return;
                    if (!a) a = p(mb, Ob.replace("METHOD", this._props[h]));
                    b._onComplete(a)
                },
                _process: function () {
                    var a = this;
                    switch (a._state) {
                    case i:
                        a._validateAuth();
                        break;
                    case b:
                        a._initPicker();
                        break;
                    case g:
                        a._complete()
                    }
                },
                _changeState: function (c, b) {
                    var a = this;
                    if (a._state !== e && a._state !== c) {
                        a._state = c;
                        if (b) a._result = b;
                        a._process()
                    }
                },
                _onComplete: function (a) {
                    this._changeState(g, a)
                },
                _validateAuth: function () {
                    var c = this;
                    if (a._rpsAuth) c._changeState(b);
                    else {
                        var g = c._props[N] === W,
                            d = g ? Tg : Tf,
                            f = c._props[h],
                            e = 650;
                        d += " " + qe;
                        a.ensurePermission(d, e, f, c._authDelegate)
                    }
                },
                _onAuthResp: function (c) {
                    var a = this;
                    if (c.error) {
                        if (!a._channel) a._onComplete(c)
                    } else {
                        var e = c.session[d];
                        a._props[d] = e;
                        if (a._channel) a._channel.send(We, e);
                        else a._changeState(b)
                    }
                },
                _initPicker: function () {
                    var b = this,
                        d = b._props;
                    m(d);
                    b._channel = a.channel.registerOuterChannel(xf, Rc(d.url).host, d.frame.contentWindow, d.url, f(b, b._onMessage));
                    c.subscribe(X, b._authDelegate);
                    var e = function (a) {
                        if (a.keyCode === dh) b.cancel()
                    };
                    d.keydownHandler = e;
                    z(window, "keydown", e);
                    b._initTimeout()
                },
                _initTimeout: function () {
                    var a = this;
                    timeoutSeconds = a._props[Vc];
                    if (timeoutSeconds && timeoutSeconds > 0) a._timeout = window.setTimeout(f(a, a._onTimeout), timeoutSeconds * 1000)
                },
                _onTimeout: function () {
                    var a = this,
                        b = a._channel._connected;
                    if (!b) a.cancel(p(Vb, ef));
                    a._clearTimeout()
                },
                _clearTimeout: function () {
                    var a = this;
                    if (a._timeout) {
                        window.clearTimeout(a._timeout);
                        a._timeout = undefined
                    }
                },
                _complete: function () {
                    var b = this,
                        c = b._result,
                        d = c.error ? o : n;
                    b._state = e;
                    b._cleanup();
                    b._normalizeResp();
                    if (b._props[h] === yc) B(b._props[r], c, true);
                    else if (c.data) B(b._props[dd], c, true);
                    else B(b._props[nb], c, true);
                    b._promise[d](c);
                    if (!a._rpsAuth) ub(function () {
                        b._report()
                    })
                },
                _report: function () {
                    var e = this._props,
                        b = this._result,
                        k = ((new Date).getTime() - this._startTs) / 1000,
                        i = "none",
                        c = 0,
                        d = 0;
                    if (b.data) {
                        if (b.data.folders != null) c = b.data.folders.length;
                        if (b.data.files != null) d = b.data.files.length
                    }
                    i = c > 0 && d > 0 ? "both" : c > 0 ? "folder" : d > 0 ? "file" : "none";
                    var j = c + d,
                        g = {
                            client: Pb,
                            api: e[h],
                            mode: e[N],
                            select: e[Z],
                            result: b.error ? b.error.code : "success",
                            duration: k,
                            object_selected: i,
                            selected_count: j
                        }, f = a[Lb];
                    a.api({
                        path: "web_analytics",
                        method: "POST",
                        body: g
                    });
                    if (f) f(g)
                },
                _onMessage: function (a, b) {
                    zb(a);
                    switch (a) {
                    case Ye:
                        this._onComplete(b)
                    }
                },
                _normalizeResp: function () {
                    var e = this,
                        g = e._props[N] === W,
                        b = e._result.data,
                        d = e._result.error,
                        f = function (c) {
                            var b = c.upload_location;
                            if (b) c.upload_location = b.replace("WL_APISERVICE_URL", a[Q])
                        };
                    if (b) {
                        if (b.folders)
                            for (var c = 0; c < b.folders.length; c++) f(b.folders[c]);
                        if (b.files)
                            for (var c = 0; c < b.files.length; c++) f(b.files[c])
                    }
                    if (d && d.message) d.message = d.message.replace("METHOD", e._props[h])
                },
                _cleanup: function () {
                    var d = this,
                        b = d._props,
                        g = d._channel,
                        f = b.resizeHandler,
                        e = b.keydownHandler;
                    d._clearTimeout();
                    c.unsubscribe(X, d._authDelegate);
                    if (b.lightBox) {
                        b.frame.style.display = Xd;
                        b.lightBox.style.display = Xd;
                        document.body.removeChild(b.frame);
                        document.body.removeChild(b.lightBox);
                        delete b.lightBox;
                        delete b.frame
                    }
                    if (g) {
                        g.dispose();
                        delete d._channel
                    }
                    if (f) A(window, "resize", f);
                    if (e) A(window, "keydown", e);
                    delete a._pendingPickerOp
                }
            };

            function m(c) {
                var f = c[N] === W,
                    e = f ? 800 : 500,
                    d = f ? 600 : 450,
                    g = c[Bb],
                    n = g === Tc,
                    i = n ? 0 : 60,
                    o = g === ic ? "white" : "rgb(0,0,0)",
                    l = i / 100,
                    h = j(e, d),
                    m = k(c),
                    b = document.createElement("div");
                b.style.top = "0px";
                b.style.left = "0px";
                b.style.position = "fixed";
                b.style.width = "100%";
                b.style.height = "100%";
                b.style.display = "block";
                b.style.backgroundColor = o;
                b.style.opacity = l;
                b.style.MozOpacity = l;
                b.style.filter = "alpha(opacity=" + i + ")";
                b.style.zIndex = "2600000";
                var a = document.createElement("iframe");
                a.id = "picker" + (new Date).getTime();
                a.style.top = h.top;
                a.style.left = h.left;
                a.style.position = "fixed";
                a.style.width = e + "px";
                a.style.height = d + "px";
                a.style.display = "block";
                a.style.zIndex = "2600001";
                a.style.borderWidth = "1px";
                a.style.borderColor = "gray";
                a.style.maxHeight = "100%";
                a.style.maxWidth = "100%";
                a.src = m;
                a.setAttribute("sutra", "picker");
                document.body.appendChild(a);
                document.body.appendChild(b);
                c.resizeHandler = function () {
                    var b = j(e, d);
                    a.style.top = b.top;
                    a.style.left = b.left
                };
                z(window, "resize", c.resizeHandler);
                c.lightBox = b;
                c.frame = a;
                c.url = m
            }

            function k(e) {
                var f = e[N] === W,
                    g = f ? He : Ge,
                    b = {}, c = he() + a[Yc];
                if (c.charAt(0) === "/") c = cc + c;
                b[hf] = g;
                b[Qf] = a._rpsAuth ? gf : Ze;
                b[Bf] = window.location.hostname.toLowerCase();
                b[tf] = c;
                b[q] = a._appId;
                b[s] = (new Date).getTime();
                b[Xf] = a._locale;
                if (!a._rpsAuth) b[d] = e[d];
                if (f) b[Z] = e[Z];
                return hb(a[S], b)
            }

            function j(f, e) {
                var b, c;
                if (a._browser.ie) {
                    var d = document.documentElement;
                    b = (d.clientWidth - f) / 2;
                    c = (d.clientHeight - e) / 2
                } else {
                    b = (window.innerWidth - f) / 2;
                    c = (window.innerHeight - e) / 2
                }
                b = b < 10 ? 10 : b;
                c = c < 10 ? 10 : c;
                return {
                    left: b + "px",
                    top: c + "px"
                }
            }
        })();
        var ie = 60 * 1000;
        Fc.prototype._getStrategy = function (e) {
            var g = this,
                c = e[h],
                a = e[cb],
                f = "file";
            m(e, [{
                name: cb,
                type: Sc,
                optional: false
            }], c);
            if (typeof a === b) a = document.getElementById(a);
            if (!(a instanceof HTMLInputElement) || a.type !== f) throw Y(cb, c, "It must be an HTMLInputElement with its type attribute set to " + '"file" (i.e., <input type="file" />).');
            if (a.value === "") throw Y(cb, c, "It did not contain a selected file.");
            if (a.files && window.FileReader) {
                if (a.files.length !== 1) throw Y(cb, c, "It must contain one selected file.");
                var i = a.files[0];
                g.setFileName(i.name);
                return new Cg(g, i)
            }
            var j = a.name !== "";
            if (!j) a.name = f;
            var d = null;
            if (a.form === null) d = "It must be a child of an HTMLFormElement.";
            else if (a.form.length !== 1) d = "It must be the only HTMLInputElement in its parent HTMLFormElement.";
            else if (a.name !== f) d = 'Its name attribute must be set to "file" ' + '(i.e., <input name="file" />).';
            if (d !== null) throw Y(cb, c, d);
            return new ed(g, a, c)
        };

        function ed(b, d, c) {
            var a = this;
            a._op = b;
            a._iMethod = c;
            a._element = d;
            a._uploadIFrame = null;
            a._uploadTimeoutId = null;
            b.setFileName(undefined)
        }
        ed.prototype = {
            getId: function () {
                var a = this;
                if (a._uploadIFrame === null) a._createUploadIFrame();
                return a._uploadIFrame.id
            },
            setUploadTimeout: function () {
                var a = this;
                a._uploadTimeoutId = window.setTimeout(function () {
                    a.onTimeout()
                }, ie)
            },
            clearUploadTimeout: function () {
                var a = this;
                if (a._uploadTimeoutId === null) return;
                window.clearTimeout(a._uploadTimeoutId);
                a._uploadTimeoutId = null
            },
            onTimeout: function () {
                var a = this;
                a._uploadTimeoutId = null;
                var b = a._iMethod + ": did not receive a response in " + ie + " milliseconds.",
                    c = p(Vb, b);
                a._op.uploadComplete(false, c)
            },
            onUploadComplete: function (a) {
                var b = this;
                b.clearUploadTimeout();
                b._removeUploadIFrame();
                a = Ec(a);
                var d = a.error,
                    c = typeof d === Wb;
                b._op.uploadComplete(c, a)
            },
            upload: function (a) {
                this._multiPartFormUpload(a)
            },
            _getRequestUrl: function (d) {
                var b = {};
                b[w] = a._redirect_uri;
                var c = {};
                c[ac] = Ad;
                c[fe] = this.getId();
                b[V] = v(c);
                return hb(d, b)
            },
            _createUploadIFrame: function () {
                var a = this;
                if (a._uploadIFrame !== null) return;
                a._uploadIFrame = Ib("iframe");
                a._uploadIFrame.name = a._uploadIFrame.id = pc();
                document.body.appendChild(a._uploadIFrame)
            },
            _multiPartFormUpload: function (c) {
                var a = this;
                a._createUploadIFrame();
                var b = a._getRequestUrl(c);
                a._submitForm(b);
                a.setUploadTimeout();
                kb.add(a);
                uf()
            },
            _removeUploadIFrame: function () {
                var a = this;
                if (a._uploadIFrame === null) return;
                a._uploadIFrame.parentNode.removeChild(a._uploadIFrame);
                a._uploadIFrame = null
            },
            _submitForm: function (c) {
                var b = this,
                    a = b._element.form;
                a.target = b._uploadIFrame.name;
                a.method = Zd;
                a.enctype = "multipart/form-data";
                a.action = c;
                a.submit()
            }
        };

        function Uc() {
            this._pendingUploads = {}
        }
        Uc.prototype = {
            add: function (a) {
                var b = a.getId();
                this._pendingUploads[b] = a
            },
            hasPendingUploads: function () {
                for (var a in this._pendingUploads) return true;
                return false
            },
            isPending: function (a) {
                return a in this._pendingUploads
            },
            get: function (a) {
                return this._pendingUploads[a]
            },
            remove: function (a) {
                delete this._pendingUploads[a]
            }
        };
        var kb = new Uc,
            uf = function () {
                var b = false,
                    a = new tb(ke),
                    c = function () {
                        var d = a.getStates(),
                            c = false;
                        for (var b in d) {
                            if (!kb.isPending(b)) continue;
                            var f = d[b],
                                e = kb.get(b);
                            kb.remove(b);
                            a.remove(b);
                            c = true;
                            e.onUploadComplete(f)
                        }
                        if (!kb.hasPendingUploads()) a.stopMonitor();
                        if (c) {
                            a.save();
                            c = false
                        }
                    };
                return function () {
                    if (a.isBeingMonitored()) return;
                    if (b) a.startMonitor();
                    else {
                        a.addCookieChanged(c);
                        b = true
                    }
                }
            }();

        function Cg(a, b) {
            var c = this;
            c.upload = function (d) {
                var c = null;
                if (window.File && b instanceof window.File) c = new FileReader;
                c.onerror = function (b) {
                    error = b.target.error;
                    a.onErr(error.name)
                };
                c.onload = function (e) {
                    var c = e.target.result,
                        b = new XMLHttpRequest;
                    b.open(Ng, d, true);
                    b.onload = function (b) {
                        a.onResp(b.currentTarget.responseText)
                    };
                    b.onerror = function (b) {
                        a.onErr(b.currentTarget.statusText)
                    };
                    if (b.upload) b.upload.onprogress = function (b) {
                        if (b.lengthComputable) {
                            var c = {
                                bytesTransferred: b.loaded,
                                totalBytes: b.total,
                                progressPercentage: b.total === 0 ? 0 : b.loaded / b.total * 100
                            };
                            a.uploadProgress(c)
                        }
                    };
                    a._cancel = f(b, b.abort);
                    b.send(c)
                };
                c.readAsArrayBuffer(b)
            }
        }

        function Gf() {
            a._isHttps = document.location.protocol.toLowerCase() == cc
        }

        function ch() {
            if (a._browser.flash !== undefined) return;
            var b = 0;
            try {
                if (a._browser.ie) {
                    var k = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"),
                        f = k.GetVariable("$version"),
                        i = f.split(" "),
                        g = i[1],
                        d = g.split(",");
                    b = d[0]
                } else if (navigator.plugins && navigator.plugins.length > 0)
                    if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
                        var j = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "",
                            e = navigator.plugins["Shockwave Flash" + j].description,
                            h = e.split(" "),
                            c = h[2].split(".");
                        b = c[0]
                    }
            } catch (l) {}
            a._browser.flashVersion = b;
            a._browser.flash = b >= 8
        }

        function Og() {
            if (a._documentReady === undefined) a._documentReady = (new Date).getTime()
        }

        function hg(b) {
            jb(function () {
                if (a._browser.firefox && (!a._documentReady || (new Date).getTime() - a._documentReady < 1000)) window.setTimeout(b, 1000);
                else b()
            })
        }

        function jb(b) {
            if (document.body) switch (document.readyState) {
            case "complete":
                b();
                return;
            case "loaded":
                if (a._browser.webkit) {
                    b();
                    return
                }
                break;
            case "interactive":
            case undefined:
                if (a._browser.firefox || a._browser.webkit) {
                    b();
                    return
                }
            }
            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", b, false);
                document.addEventListener("load", b, false)
            } else if (window.attachEvent) window.attachEvent("onload", b);
            if (a._browser.ie && document.attachEvent) document.attachEvent("onreadystatechange", function () {
                if (document.readyState === "complete") {
                    document.detachEvent("onreadystatechange", arguments.callee);
                    b()
                }
            })
        }

        function re(b, a) {
            b.innerHTML = a
        }

        function z(a, b, c) {
            if (a.addEventListener) a.addEventListener(b, c, false);
            else if (a.attachEvent) a.attachEvent("on" + b, c)
        }

        function A(a, b, c) {
            if (a.removeEventListener) a.removeEventListener(b, c, false);
            else if (a.detachEvent) a.detachEvent("on" + b, c)
        }
        var Gc = {
            registerOuterChannel: function (e, b, c, d, a) {
                return G.registerChannel(e, b, c, d, a)
            },
            registerInnerChannel: function (c, b, a) {
                return G.registerChannel(c, b, null, null, a)
            },
            isSupported: function () {
                return G.isSupported()
            }
        }, G = {
                _channels: [],
                isSupported: function () {
                    return window.postMessage != null
                },
                registerChannel: function (h, e, f, g, d) {
                    var b = G,
                        c = b._channels,
                        a = null;
                    if (b.isSupported()) {
                        a = new Ld(h, e, f, g, d);
                        if (c.length === 0) z(window, "message", b._onMessage);
                        c.push(a)
                    }
                    return a
                },
                unregisterChannel: function (d) {
                    var c = G,
                        a = c._channels;
                    for (var b = 0; b < a.length; b++)
                        if (a[b] == d) {
                            a.splice(b, 1);
                            break
                        }
                    if (a.length === 0) A(window, "message", c._onMessage)
                },
                _onMessage: function (a) {
                    var d = G,
                        a = a || window.event,
                        c = Pg(a);
                    if (c != null) {
                        var b = d._findChannel(a, c);
                        if (b != null) switch (c.text) {
                        case ue:
                            b._onConnectReq(a.source, a.origin);
                            break;
                        case te:
                            b._onConnectAck(a.source);
                            break;
                        default:
                            b._onMessage(c.text)
                        }
                    }
                },
                _findChannel: function (g, f) {
                    var d = G,
                        c = d._channels,
                        e = Xg(g.origin);
                    for (var b = 0; b < c.length; b++) {
                        var a = c[b];
                        if (id(a._name, f.name) && id(a._allowedDomain, e)) return a
                    }
                    return null
                }
            }, ue = "@ConnectReq",
            te = "@ConnectAck";

        function Ld(f, d, b, e, c) {
            var a = this;
            a._name = f;
            a._allowedDomain = d;
            a._msgHandler = c;
            if (b) {
                a._targetWindow = b;
                a._targetUrl = Mg(e);
                a._connect()
            }
        }
        Ld.prototype = {
            _disposed: false,
            _connected: false,
            _allowedDomain: null,
            _targetWindow: null,
            _targetUrl: null,
            _msgHandler: null,
            _connectSchedule: -1,
            _pendingQueue: [],
            _recvQueue: [],
            dispose: function () {
                var a = this;
                if (!a._disposed) {
                    a._disposed = true;
                    a._cancelConnect();
                    G.unregisterChannel(a)
                }
            },
            send: function (c, d) {
                var a = this;
                if (a._disposed) return;
                var b = Vf(c, d);
                if (a._connected) a._post(b);
                else a._pendingQueue.push(b)
            },
            _connect: function () {
                var a = this;
                if (a._disposed || a._connected) return;
                var b = function () {
                    a._post(ue)
                };
                if (a._connectSchedule === -1) {
                    a._connectSchedule = window.setInterval(b, 500);
                    b()
                }
            },
            _post: function (b) {
                var a = this,
                    c = wg(a._name, b);
                a._targetWindow.postMessage(c, a._targetUrl)
            },
            _onConnectReq: function (c, b) {
                var a = this;
                if (!a._connected) {
                    a._connected = true;
                    a._targetWindow = c;
                    a._targetUrl = b;
                    a._post(te);
                    a._onConnected()
                }
            },
            _onConnectAck: function (b) {
                var a = this;
                if (!a._connected) {
                    a._targetWindow = b;
                    a._onConnected()
                }
            },
            _onConnected: function () {
                var a = this,
                    c = a._pendingQueue;
                a._connected = true;
                for (var b = 0; b < c.length; b++) a._post(c[b]);
                a._pendingQueue = [];
                a._cancelConnect()
            },
            _cancelConnect: function () {
                var a = this;
                if (a._connectSchedule != -1) {
                    window.clearInterval(a._connectSchedule);
                    a._connectSchedule = -1
                }
            },
            _onMessage: function (b) {
                if (this._msgHandler) {
                    var a = Uf(b);
                    this._msgHandler(a.cmd, a.args)
                }
            }
        };

        function Mg(b) {
            var a = b.indexOf("://");
            if (a >= 0) {
                a = b.indexOf("/", a + 3);
                if (a >= 0) b = b.substring(0, a)
            }
            return b
        }

        function Pg(a) {
            var b = null;
            if (!Gd(a.origin) && !Gd(a.data) && a.source != null) b = vg(a.data);
            return b
        }

        function wg(a, b) {
            return "<" + a + ">" + b
        }

        function vg(a) {
            var c = null;
            if (a.charAt(0) == "<") {
                var b = a.indexOf(">");
                if (b > 0) {
                    var d = a.substring(1, b),
                        e = a.substr(b + 1);
                    c = {
                        name: d,
                        text: e
                    }
                }
            }
            return c
        }

        function Vf(a, c) {
            var b = {
                cmd: a,
                args: c
            };
            return JSON.stringify(b)
        }

        function Uf(b) {
            var a = JSON.parse(b);
            return a
        }
        if (window.WL) a.channel = Gc;
        else window.WL = {
            channel: Gc
        };
        var u = {
            connect: "Connect",
            signIn: "Sign in",
            signOut: "Sign out",
            login: "Log in",
            logout: "Log out",
            skyDriveOpenPickerButtonText: "Open from SkyDrive",
            skyDriveOpenPickerButtonTooltip: "Open from SkyDrive",
            skyDriveSavePickerButtonText: "Save to SkyDrive",
            skyDriveSavePickerButtonTooltip: "Save to SkyDrive"
        };
        a._locale = "en";
        a[M] = "Web/DEVICE_" + Of("5.5.7531.3000");
        a.testInit = function (b) {
            if (b.env) a._settings.init(b.env);
            if (b.skydrive_uri) a._settings[S] = b.skydrive_uri;
            if (b[Lb]) a[Lb] = b[Lb]
        };
        var qb = {};
        qb[eb] = "login.live.com";
        qb[Q] = "https://apis.live.net/v5.0/";
        qb[S] = "https://onedrive.live.com/";
        qb[F] = "//js.live.net/v5.0/";
        var yb = {};
        yb[eb] = "login.live.com";
        yb[Q] = "https://df.apis.live.net/v5.0/";
        yb[S] = "https://onedrive.live.com/";
        yb[F] = "//df-js.live.net/v5.0/";
        var vb = {};
        vb[eb] = "login.live-int.com";
        vb[Q] = "https://apis.live-int.net/v5.0/";
        vb[S] = "https://onedrive.live-int.com/";
        vb[F] = "//js.live-int.net/v5.0/";
        var ob = {};
        ob[eb] = "login.live-int.com";
        ob[Q] = "https://current.apis.live-tst.net/v5.0/";
        ob[S] = "https://onedrive.live-int.com/";
        ob[F] = "//current-js.live-int.net/v5.0/";
        var sb = {};
        sb[eb] = "login.live-int.com";
        sb[Q] = "https://bvt.apis.live-tst.net/v5.0/";
        sb[S] = "https://onedrive-bvt.live-int.com/";
        sb[F] = "//bvt-js.live-int.net/v5.0/";
        a._settings = {
            PROD: qb,
            DF: yb,
            INT: vb,
            CURRENT: ob,
            BVT: sb,
            init: function (b) {
                b = b.toUpperCase();
                var c = this[b];
                if (c) K(c, a)
            }
        };
        a._settings.init("PROD");
        a[Yc] = "wl.skydrivepicker.debug.js";
        a.onloadInit()
    }
})();