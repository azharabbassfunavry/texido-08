! function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(require("@firebase/app-compat"), require("@firebase/app")) : "function" == typeof define && define.amd ? define(["@firebase/app-compat", "@firebase/app"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).firebase, e.firebase.INTERNAL.modularAPIs)
}(this, function (gl, ml) {
    "use strict";
    try {
        !(function () {
            function e(e) {
                return e && "object" == typeof e && "default" in e ? e : {
                    default: e
                }
            }
            var l, t = e(gl);

            function n(t) {
                const n = [];
                let r = 0;
                for (let i = 0; i < t.length; i++) {
                    let e = t.charCodeAt(i);
                    e < 128 ? n[r++] = e : (e < 2048 ? n[r++] = e >> 6 | 192 : (55296 == (64512 & e) && i + 1 < t.length && 56320 == (64512 & t.charCodeAt(i + 1)) ? (e = 65536 + ((1023 & e) << 10) + (1023 & t.charCodeAt(++i)), n[r++] = e >> 18 | 240, n[r++] = e >> 12 & 63 | 128) : n[r++] = e >> 12 | 224, n[r++] = e >> 6 & 63 | 128), n[r++] = 63 & e | 128)
                }
                return n
            }
            const r = {
                byteToCharMap_: null,
                charToByteMap_: null,
                byteToCharMapWebSafe_: null,
                charToByteMapWebSafe_: null,
                ENCODED_VALS_BASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
                get ENCODED_VALS() {
                    return this.ENCODED_VALS_BASE + "+/="
                },
                get ENCODED_VALS_WEBSAFE() {
                    return this.ENCODED_VALS_BASE + "-_."
                },
                HAS_NATIVE_SUPPORT: "function" == typeof atob,
                encodeByteArray(n, e) {
                    if (!Array.isArray(n)) throw Error("encodeByteArray takes an array as a parameter");
                    this.init_();
                    var r = e ? this.byteToCharMapWebSafe_ : this.byteToCharMap_;
                    const i = [];
                    for (let h = 0; h < n.length; h += 3) {
                        var s = n[h],
                            a = h + 1 < n.length,
                            o = a ? n[h + 1] : 0,
                            u = h + 2 < n.length,
                            c = u ? n[h + 2] : 0;
                        let e = (15 & o) << 2 | c >> 6,
                            t = 63 & c;
                        u || (t = 64, a || (e = 64)), i.push(r[s >> 2], r[(3 & s) << 4 | o >> 4], r[e], r[t])
                    }
                    return i.join("")
                },
                encodeString(e, t) {
                    return this.HAS_NATIVE_SUPPORT && !t ? btoa(e) : this.encodeByteArray(n(e), t)
                },
                decodeString(e, t) {
                    return this.HAS_NATIVE_SUPPORT && !t ? atob(e) : function (e) {
                        const t = [];
                        let n = 0,
                            r = 0;
                        for (; n < e.length;) {
                            var i, s, a = e[n++];
                            a < 128 ? t[r++] = String.fromCharCode(a) : 191 < a && a < 224 ? (i = e[n++], t[r++] = String.fromCharCode((31 & a) << 6 | 63 & i)) : 239 < a && a < 365 ? (s = ((7 & a) << 18 | (63 & e[n++]) << 12 | (63 & e[n++]) << 6 | 63 & e[n++]) - 65536, t[r++] = String.fromCharCode(55296 + (s >> 10)), t[r++] = String.fromCharCode(56320 + (1023 & s))) : (i = e[n++], s = e[n++], t[r++] = String.fromCharCode((15 & a) << 12 | (63 & i) << 6 | 63 & s))
                        }
                        return t.join("")
                    }(this.decodeStringToByteArray(e, t))
                },
                decodeStringToByteArray(e, t) {
                    this.init_();
                    var n = t ? this.charToByteMapWebSafe_ : this.charToByteMap_;
                    const r = [];
                    for (let u = 0; u < e.length;) {
                        var i = n[e.charAt(u++)],
                            s = u < e.length ? n[e.charAt(u)] : 0;
                        ++u;
                        var a = u < e.length ? n[e.charAt(u)] : 64;
                        ++u;
                        var o = u < e.length ? n[e.charAt(u)] : 64;
                        if (++u, null == i || null == s || null == a || null == o) throw new c;
                        r.push(i << 2 | s >> 4), 64 !== a && (r.push(s << 4 & 240 | a >> 2), 64 !== o && r.push(a << 6 & 192 | o))
                    }
                    return r
                },
                init_() {
                    if (!this.byteToCharMap_) {
                        this.byteToCharMap_ = {}, this.charToByteMap_ = {}, this.byteToCharMapWebSafe_ = {}, this.charToByteMapWebSafe_ = {};
                        for (let e = 0; e < this.ENCODED_VALS.length; e++) this.byteToCharMap_[e] = this.ENCODED_VALS.charAt(e), this.charToByteMap_[this.byteToCharMap_[e]] = e, this.byteToCharMapWebSafe_[e] = this.ENCODED_VALS_WEBSAFE.charAt(e), this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]] = e, e >= this.ENCODED_VALS_BASE.length && (this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)] = e, this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)] = e)
                    }
                }
            };
            class c extends Error {
                constructor() {
                    super(...arguments), this.name = "DecodeBase64StringError"
                }
            }
            const o = function (e) {
                return e = e, t = n(e), r.encodeByteArray(t, !0).replace(/\./g, "");
                var t
            };
            const i = () => function () {
                    if ("undefined" != typeof self) return self;
                    if ("undefined" != typeof window) return window;
                    if ("undefined" != typeof global) return global;
                    throw new Error("Unable to locate global object.")
                }().__FIREBASE_DEFAULTS__,
                s = () => {
                    if ("undefined" != typeof document) {
                        let e;
                        try {
                            e = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)
                        } catch (e) {
                            return
                        }
                        var t = e && function (e) {
                            try {
                                return r.decodeString(e, !0)
                            } catch (e) {
                                console.error("base64Decode failed: ", e)
                            }
                            return null
                        }(e[1]);
                        return t && JSON.parse(t)
                    }
                },
                a = () => {
                    try {
                        return i() || (() => {
                            if ("undefined" != typeof process && void 0 !== process.env) {
                                var e = process.env.__FIREBASE_DEFAULTS__;
                                return e ? JSON.parse(e) : void 0
                            }
                        })() || s()
                    } catch (e) {
                        return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`)
                    }
                };

            function u() {
                return "undefined" != typeof navigator && "string" == typeof navigator.userAgent ? navigator.userAgent : ""
            }

            function h() {
                return ! function () {
                    var e = null === (e = a()) || void 0 === e ? void 0 : e.forceEnvironment;
                    if ("node" === e) return 1;
                    if ("browser" !== e) try {
                        return "[object process]" === Object.prototype.toString.call(global.process)
                    } catch (e) {
                        return
                    }
                }() && navigator.userAgent && navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome")
            }
            class d extends Error {
                constructor(e, t, n) {
                    super(t), this.code = e, this.customData = n, this.name = "FirebaseError", Object.setPrototypeOf(this, d.prototype), Error.captureStackTrace && Error.captureStackTrace(this, f.prototype.create)
                }
            }
            class f {
                constructor(e, t, n) {
                    this.service = e, this.serviceName = t, this.errors = n
                }
                create(e, ...t) {
                    var r, n = t[0] || {},
                        i = `${this.service}/${e}`,
                        s = this.errors[e],
                        s = s ? (r = n, s.replace(g, (e, t) => {
                            var n = r[t];
                            return null != n ? String(n) : `<${t}?>`
                        })) : "Error",
                        s = `${this.serviceName}: ${s} (${i}).`;
                    return new d(i, s, n)
                }
            }
            const g = /\{\$([^}]+)}/g;

            function m(e, t) {
                if (e === t) return !0;
                const n = Object.keys(e),
                    r = Object.keys(t);
                for (const a of n) {
                    if (!r.includes(a)) return !1;
                    var i = e[a],
                        s = t[a];
                    if (p(i) && p(s)) {
                        if (!m(i, s)) return !1
                    } else if (i !== s) return !1
                }
                for (const o of r)
                    if (!n.includes(o)) return !1;
                return !0
            }

            function p(e) {
                return null !== e && "object" == typeof e
            }

            function y(e) {
                return e && e._delegate ? e._delegate : e
            }
            class v {
                constructor(e, t, n) {
                    this.name = e, this.instanceFactory = t, this.type = n, this.multipleInstances = !1, this.serviceProps = {}, this.instantiationMode = "LAZY", this.onInstanceCreated = null
                }
                setInstantiationMode(e) {
                    return this.instantiationMode = e, this
                }
                setMultipleInstances(e) {
                    return this.multipleInstances = e, this
                }
                setServiceProps(e) {
                    return this.serviceProps = e, this
                }
                setInstanceCreatedCallback(e) {
                    return this.onInstanceCreated = e, this
                }
            }(pc = l = l || {})[pc.DEBUG = 0] = "DEBUG", pc[pc.VERBOSE = 1] = "VERBOSE", pc[pc.INFO = 2] = "INFO", pc[pc.WARN = 3] = "WARN", pc[pc.ERROR = 4] = "ERROR", pc[pc.SILENT = 5] = "SILENT";
            const w = {
                    debug: l.DEBUG,
                    verbose: l.VERBOSE,
                    info: l.INFO,
                    warn: l.WARN,
                    error: l.ERROR,
                    silent: l.SILENT
                },
                _ = l.INFO,
                b = {
                    [l.DEBUG]: "log",
                    [l.VERBOSE]: "log",
                    [l.INFO]: "info",
                    [l.WARN]: "warn",
                    [l.ERROR]: "error"
                },
                I = (e, t, ...n) => {
                    if (!(t < e.logLevel)) {
                        var r = (new Date).toISOString(),
                            i = b[t];
                        if (!i) throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);
                        console[i](`[${r}]  ${e.name}:`, ...n)
                    }
                };
            var T, E, S = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
            !(function () {
                var e, t, s;

                function n() {
                    this.blockSize = -1, this.blockSize = 64, this.g = Array(4), this.B = Array(this.blockSize), this.o = this.h = 0, this.s()
                }

                function r() {}

                function a(e, t, n) {
                    n = n || 0;
                    var r = Array(16);
                    if ("string" == typeof t)
                        for (var i = 0; i < 16; ++i) r[i] = t.charCodeAt(n++) | t.charCodeAt(n++) << 8 | t.charCodeAt(n++) << 16 | t.charCodeAt(n++) << 24;
                    else
                        for (i = 0; i < 16; ++i) r[i] = t[n++] | t[n++] << 8 | t[n++] << 16 | t[n++] << 24;
                    t = e.g[0], n = e.g[1];
                    var i = e.g[2],
                        s = e.g[3],
                        a = (n = (i = (s = (t = (n = (i = (s = (t = (n = (i = (s = (t = (n = (i = (s = (t = (n = (i = (s = (t = (n = (i = (s = (t = (n = (i = (s = (t = (n = (i = (s = (t = (n = (i = (s = (t = (n = (i = (s = (t = (n = (i = (s = (t = (n = (i = (s = (t = (n = (i = (s = (t = (n = (i = (s = (t = (n = (i = (s = (t = n + ((a = t + (s ^ n & (i ^ s)) + r[0] + 3614090360 & 4294967295) << 7 & 4294967295 | a >>> 25)) + ((a = s + (i ^ t & (n ^ i)) + r[1] + 3905402710 & 4294967295) << 12 & 4294967295 | a >>> 20)) + ((a = i + (n ^ s & (t ^ n)) + r[2] + 606105819 & 4294967295) << 17 & 4294967295 | a >>> 15)) + ((a = n + (t ^ i & (s ^ t)) + r[3] + 3250441966 & 4294967295) << 22 & 4294967295 | a >>> 10)) + ((a = t + (s ^ n & (i ^ s)) + r[4] + 4118548399 & 4294967295) << 7 & 4294967295 | a >>> 25)) + ((a = s + (i ^ t & (n ^ i)) + r[5] + 1200080426 & 4294967295) << 12 & 4294967295 | a >>> 20)) + ((a = i + (n ^ s & (t ^ n)) + r[6] + 2821735955 & 4294967295) << 17 & 4294967295 | a >>> 15)) + ((a = n + (t ^ i & (s ^ t)) + r[7] + 4249261313 & 4294967295) << 22 & 4294967295 | a >>> 10)) + ((a = t + (s ^ n & (i ^ s)) + r[8] + 1770035416 & 4294967295) << 7 & 4294967295 | a >>> 25)) + ((a = s + (i ^ t & (n ^ i)) + r[9] + 2336552879 & 4294967295) << 12 & 4294967295 | a >>> 20)) + ((a = i + (n ^ s & (t ^ n)) + r[10] + 4294925233 & 4294967295) << 17 & 4294967295 | a >>> 15)) + ((a = n + (t ^ i & (s ^ t)) + r[11] + 2304563134 & 4294967295) << 22 & 4294967295 | a >>> 10)) + ((a = t + (s ^ n & (i ^ s)) + r[12] + 1804603682 & 4294967295) << 7 & 4294967295 | a >>> 25)) + ((a = s + (i ^ t & (n ^ i)) + r[13] + 4254626195 & 4294967295) << 12 & 4294967295 | a >>> 20)) + ((a = i + (n ^ s & (t ^ n)) + r[14] + 2792965006 & 4294967295) << 17 & 4294967295 | a >>> 15)) + ((a = n + (t ^ i & (s ^ t)) + r[15] + 1236535329 & 4294967295) << 22 & 4294967295 | a >>> 10)) + ((a = t + (i ^ s & (n ^ i)) + r[1] + 4129170786 & 4294967295) << 5 & 4294967295 | a >>> 27)) + ((a = s + (n ^ i & (t ^ n)) + r[6] + 3225465664 & 4294967295) << 9 & 4294967295 | a >>> 23)) + ((a = i + (t ^ n & (s ^ t)) + r[11] + 643717713 & 4294967295) << 14 & 4294967295 | a >>> 18)) + ((a = n + (s ^ t & (i ^ s)) + r[0] + 3921069994 & 4294967295) << 20 & 4294967295 | a >>> 12)) + ((a = t + (i ^ s & (n ^ i)) + r[5] + 3593408605 & 4294967295) << 5 & 4294967295 | a >>> 27)) + ((a = s + (n ^ i & (t ^ n)) + r[10] + 38016083 & 4294967295) << 9 & 4294967295 | a >>> 23)) + ((a = i + (t ^ n & (s ^ t)) + r[15] + 3634488961 & 4294967295) << 14 & 4294967295 | a >>> 18)) + ((a = n + (s ^ t & (i ^ s)) + r[4] + 3889429448 & 4294967295) << 20 & 4294967295 | a >>> 12)) + ((a = t + (i ^ s & (n ^ i)) + r[9] + 568446438 & 4294967295) << 5 & 4294967295 | a >>> 27)) + ((a = s + (n ^ i & (t ^ n)) + r[14] + 3275163606 & 4294967295) << 9 & 4294967295 | a >>> 23)) + ((a = i + (t ^ n & (s ^ t)) + r[3] + 4107603335 & 4294967295) << 14 & 4294967295 | a >>> 18)) + ((a = n + (s ^ t & (i ^ s)) + r[8] + 1163531501 & 4294967295) << 20 & 4294967295 | a >>> 12)) + ((a = t + (i ^ s & (n ^ i)) + r[13] + 2850285829 & 4294967295) << 5 & 4294967295 | a >>> 27)) + ((a = s + (n ^ i & (t ^ n)) + r[2] + 4243563512 & 4294967295) << 9 & 4294967295 | a >>> 23)) + ((a = i + (t ^ n & (s ^ t)) + r[7] + 1735328473 & 4294967295) << 14 & 4294967295 | a >>> 18)) + ((a = n + (s ^ t & (i ^ s)) + r[12] + 2368359562 & 4294967295) << 20 & 4294967295 | a >>> 12)) + ((a = t + (n ^ i ^ s) + r[5] + 4294588738 & 4294967295) << 4 & 4294967295 | a >>> 28)) + ((a = s + (t ^ n ^ i) + r[8] + 2272392833 & 4294967295) << 11 & 4294967295 | a >>> 21)) + ((a = i + (s ^ t ^ n) + r[11] + 1839030562 & 4294967295) << 16 & 4294967295 | a >>> 16)) + ((a = n + (i ^ s ^ t) + r[14] + 4259657740 & 4294967295) << 23 & 4294967295 | a >>> 9)) + ((a = t + (n ^ i ^ s) + r[1] + 2763975236 & 4294967295) << 4 & 4294967295 | a >>> 28)) + ((a = s + (t ^ n ^ i) + r[4] + 1272893353 & 4294967295) << 11 & 4294967295 | a >>> 21)) + ((a = i + (s ^ t ^ n) + r[7] + 4139469664 & 4294967295) << 16 & 4294967295 | a >>> 16)) + ((a = n + (i ^ s ^ t) + r[10] + 3200236656 & 4294967295) << 23 & 4294967295 | a >>> 9)) + ((a = t + (n ^ i ^ s) + r[13] + 681279174 & 4294967295) << 4 & 4294967295 | a >>> 28)) + ((a = s + (t ^ n ^ i) + r[0] + 3936430074 & 4294967295) << 11 & 4294967295 | a >>> 21)) + ((a = i + (s ^ t ^ n) + r[3] + 3572445317 & 4294967295) << 16 & 4294967295 | a >>> 16)) + ((a = n + (i ^ s ^ t) + r[6] + 76029189 & 4294967295) << 23 & 4294967295 | a >>> 9)) + ((a = t + (n ^ i ^ s) + r[9] + 3654602809 & 4294967295) << 4 & 4294967295 | a >>> 28)) + ((a = s + (t ^ n ^ i) + r[12] + 3873151461 & 4294967295) << 11 & 4294967295 | a >>> 21)) + ((a = i + (s ^ t ^ n) + r[15] + 530742520 & 4294967295) << 16 & 4294967295 | a >>> 16)) + ((a = n + (i ^ s ^ t) + r[2] + 3299628645 & 4294967295) << 23 & 4294967295 | a >>> 9)) + ((a = t + (i ^ (n | ~s)) + r[0] + 4096336452 & 4294967295) << 6 & 4294967295 | a >>> 26)) + ((a = s + (n ^ (t | ~i)) + r[7] + 1126891415 & 4294967295) << 10 & 4294967295 | a >>> 22)) + ((a = i + (t ^ (s | ~n)) + r[14] + 2878612391 & 4294967295) << 15 & 4294967295 | a >>> 17)) + ((a = n + (s ^ (i | ~t)) + r[5] + 4237533241 & 4294967295) << 21 & 4294967295 | a >>> 11)) + ((a = t + (i ^ (n | ~s)) + r[12] + 1700485571 & 4294967295) << 6 & 4294967295 | a >>> 26)) + ((a = s + (n ^ (t | ~i)) + r[3] + 2399980690 & 4294967295) << 10 & 4294967295 | a >>> 22)) + ((a = i + (t ^ (s | ~n)) + r[10] + 4293915773 & 4294967295) << 15 & 4294967295 | a >>> 17)) + ((a = n + (s ^ (i | ~t)) + r[1] + 2240044497 & 4294967295) << 21 & 4294967295 | a >>> 11)) + ((a = t + (i ^ (n | ~s)) + r[8] + 1873313359 & 4294967295) << 6 & 4294967295 | a >>> 26)) + ((a = s + (n ^ (t | ~i)) + r[15] + 4264355552 & 4294967295) << 10 & 4294967295 | a >>> 22)) + ((a = i + (t ^ (s | ~n)) + r[6] + 2734768916 & 4294967295) << 15 & 4294967295 | a >>> 17)) + ((a = n + (s ^ (i | ~t)) + r[13] + 1309151649 & 4294967295) << 21 & 4294967295 | a >>> 11)) + ((s = (t = n + ((a = t + (i ^ (n | ~s)) + r[4] + 4149444226 & 4294967295) << 6 & 4294967295 | a >>> 26)) + ((a = s + (n ^ (t | ~i)) + r[11] + 3174756917 & 4294967295) << 10 & 4294967295 | a >>> 22)) ^ ((i = s + ((a = i + (t ^ (s | ~n)) + r[2] + 718787259 & 4294967295) << 15 & 4294967295 | a >>> 17)) | ~t)) + r[9] + 3951481745 & 4294967295;
                    e.g[0] = e.g[0] + t & 4294967295, e.g[1] = e.g[1] + (i + (a << 21 & 4294967295 | a >>> 11)) & 4294967295, e.g[2] = e.g[2] + i & 4294967295, e.g[3] = e.g[3] + s & 4294967295
                }

                function c(e, t) {
                    this.h = t;
                    for (var n = [], r = !0, i = e.length - 1; 0 <= i; i--) {
                        var s = 0 | e[i];
                        r && s == t || (n[i] = s, r = !1)
                    }
                    this.g = n
                }
                t = n, r.prototype = (s = function () {
                    this.blockSize = -1
                }).prototype, t.D = s.prototype, t.prototype = new r, (t.prototype.constructor = t).C = function (e, t, n) {
                    for (var r = Array(arguments.length - 2), i = 2; i < arguments.length; i++) r[i - 2] = arguments[i];
                    return s.prototype[t].apply(e, r)
                }, n.prototype.s = function () {
                    this.g[0] = 1732584193, this.g[1] = 4023233417, this.g[2] = 2562383102, this.g[3] = 271733878, this.o = this.h = 0
                }, n.prototype.u = function (e, t) {
                    for (var n = (t = void 0 === t ? e.length : t) - this.blockSize, r = this.B, i = this.h, s = 0; s < t;) {
                        if (0 == i)
                            for (; s <= n;) a(this, e, s), s += this.blockSize;
                        if ("string" == typeof e) {
                            for (; s < t;)
                                if (r[i++] = e.charCodeAt(s++), i == this.blockSize) {
                                    a(this, r), i = 0;
                                    break
                                }
                        } else
                            for (; s < t;)
                                if (r[i++] = e[s++], i == this.blockSize) {
                                    a(this, r), i = 0;
                                    break
                                }
                    }
                    this.h = i, this.o += t
                }, n.prototype.v = function () {
                    var e = Array((this.h < 56 ? this.blockSize : 2 * this.blockSize) - this.h);
                    e[0] = 128;
                    for (var t = 1; t < e.length - 8; ++t) e[t] = 0;
                    for (var n = 8 * this.o, t = e.length - 8; t < e.length; ++t) e[t] = 255 & n, n /= 256;
                    for (this.u(e), e = Array(16), t = n = 0; t < 4; ++t)
                        for (var r = 0; r < 32; r += 8) e[n++] = this.g[t] >>> r & 255;
                    return e
                };
                var i = {};

                function o(e) {
                    return -128 <= e && e < 128 ? (t = e, n = function (e) {
                        return new c([0 | e], e < 0 ? -1 : 0)
                    }, r = i, Object.prototype.hasOwnProperty.call(r, t) ? r[t] : r[t] = n(t)) : new c([0 | e], e < 0 ? -1 : 0);
                    var t, n, r
                }

                function h(e) {
                    if (isNaN(e) || !isFinite(e)) return l;
                    if (e < 0) return m(h(-e));
                    for (var t = [], n = 1, r = 0; n <= e; r++) t[r] = e / n | 0, n *= 4294967296;
                    return new c(t, 0)
                }
                var l = o(0),
                    u = o(1),
                    d = o(16777216);

                function f(e) {
                    if (0 == e.h) {
                        for (var t = 0; t < e.g.length; t++)
                            if (0 != e.g[t]) return;
                        return 1
                    }
                }

                function g(e) {
                    return -1 == e.h
                }

                function m(e) {
                    for (var t = e.g.length, n = [], r = 0; r < t; r++) n[r] = ~e.g[r];
                    return new c(n, ~e.h).add(u)
                }

                function p(e, t) {
                    return e.add(m(t))
                }

                function y(e, t) {
                    for (;
                        (65535 & e[t]) != e[t];) e[t + 1] += e[t] >>> 16, e[t] &= 65535, t++
                }

                function v(e, t) {
                    this.g = e, this.h = t
                }

                function w(e, t) {
                    if (f(t)) throw Error("division by zero");
                    if (f(e)) return new v(l, l);
                    if (g(e)) return t = w(m(e), t), new v(m(t.g), m(t.h));
                    if (g(t)) return t = w(e, m(t)), new v(m(t.g), t.h);
                    if (30 < e.g.length) {
                        if (g(e) || g(t)) throw Error("slowDivide_ only works with positive integers.");
                        for (var n = u, r = t; r.l(e) <= 0;) n = _(n), r = _(r);
                        for (var i = b(n, 1), s = b(r, 1), r = b(r, 2), n = b(n, 2); !f(r);) {
                            var a = s.add(r);
                            a.l(e) <= 0 && (i = i.add(n), s = a), r = b(r, 1), n = b(n, 1)
                        }
                        return t = p(e, i.j(t)), new v(i, t)
                    }
                    for (i = l; 0 <= e.l(t);) {
                        for (n = Math.max(1, Math.floor(e.m() / t.m())), r = (r = Math.ceil(Math.log(n) / Math.LN2)) <= 48 ? 1 : Math.pow(2, r - 48), a = (s = h(n)).j(t); g(a) || 0 < a.l(e);) a = (s = h(n -= r)).j(t);
                        f(s) && (s = u), i = i.add(s), e = p(e, a)
                    }
                    return new v(i, e)
                }

                function _(e) {
                    for (var t = e.g.length + 1, n = [], r = 0; r < t; r++) n[r] = e.i(r) << 1 | e.i(r - 1) >>> 31;
                    return new c(n, e.h)
                }

                function b(e, t) {
                    var n = t >> 5;
                    t %= 32;
                    for (var r = e.g.length - n, i = [], s = 0; s < r; s++) i[s] = 0 < t ? e.i(s + n) >>> t | e.i(s + n + 1) << 32 - t : e.i(s + n);
                    return new c(i, e.h)
                }(e = c.prototype).m = function () {
                    if (g(this)) return -m(this).m();
                    for (var e = 0, t = 1, n = 0; n < this.g.length; n++) {
                        var r = this.i(n);
                        e += (0 <= r ? r : 4294967296 + r) * t, t *= 4294967296
                    }
                    return e
                }, e.toString = function (e) {
                    if ((e = e || 10) < 2 || 36 < e) throw Error("radix out of range: " + e);
                    if (f(this)) return "0";
                    if (g(this)) return "-" + m(this).toString(e);
                    for (var t = h(Math.pow(e, 6)), n = this, r = "";;) {
                        var i = w(n, t).g,
                            s = ((0 < (n = p(n, i.j(t))).g.length ? n.g[0] : n.h) >>> 0).toString(e);
                        if (f(n = i)) return s + r;
                        for (; s.length < 6;) s = "0" + s;
                        r = s + r
                    }
                }, e.i = function (e) {
                    return e < 0 ? 0 : e < this.g.length ? this.g[e] : this.h
                }, e.l = function (e) {
                    return g(e = p(this, e)) ? -1 : f(e) ? 0 : 1
                }, e.abs = function () {
                    return g(this) ? m(this) : this
                }, e.add = function (e) {
                    for (var t = Math.max(this.g.length, e.g.length), n = [], r = 0, i = 0; i <= t; i++) {
                        var s = r + (65535 & this.i(i)) + (65535 & e.i(i)),
                            a = (s >>> 16) + (this.i(i) >>> 16) + (e.i(i) >>> 16),
                            r = a >>> 16;
                        s &= 65535, a &= 65535, n[i] = a << 16 | s
                    }
                    return new c(n, -2147483648 & n[n.length - 1] ? -1 : 0)
                }, e.j = function (e) {
                    if (f(this) || f(e)) return l;
                    if (g(this)) return g(e) ? m(this).j(m(e)) : m(m(this).j(e));
                    if (g(e)) return m(this.j(m(e)));
                    if (this.l(d) < 0 && e.l(d) < 0) return h(this.m() * e.m());
                    for (var t = this.g.length + e.g.length, n = [], r = 0; r < 2 * t; r++) n[r] = 0;
                    for (r = 0; r < this.g.length; r++)
                        for (var i = 0; i < e.g.length; i++) {
                            var s = this.i(r) >>> 16,
                                a = 65535 & this.i(r),
                                o = e.i(i) >>> 16,
                                u = 65535 & e.i(i);
                            n[2 * r + 2 * i] += a * u, y(n, 2 * r + 2 * i), n[2 * r + 2 * i + 1] += s * u, y(n, 2 * r + 2 * i + 1), n[2 * r + 2 * i + 1] += a * o, y(n, 2 * r + 2 * i + 1), n[2 * r + 2 * i + 2] += s * o, y(n, 2 * r + 2 * i + 2)
                        }
                    for (r = 0; r < t; r++) n[r] = n[2 * r + 1] << 16 | n[2 * r];
                    for (r = t; r < 2 * t; r++) n[r] = 0;
                    return new c(n, 0)
                }, e.A = function (e) {
                    return w(this, e).h
                }, e.and = function (e) {
                    for (var t = Math.max(this.g.length, e.g.length), n = [], r = 0; r < t; r++) n[r] = this.i(r) & e.i(r);
                    return new c(n, this.h & e.h)
                }, e.or = function (e) {
                    for (var t = Math.max(this.g.length, e.g.length), n = [], r = 0; r < t; r++) n[r] = this.i(r) | e.i(r);
                    return new c(n, this.h | e.h)
                }, e.xor = function (e) {
                    for (var t = Math.max(this.g.length, e.g.length), n = [], r = 0; r < t; r++) n[r] = this.i(r) ^ e.i(r);
                    return new c(n, this.h ^ e.h)
                }, n.prototype.digest = n.prototype.v, n.prototype.reset = n.prototype.s, n.prototype.update = n.prototype.u, E = n, c.prototype.multiply = c.prototype.j, c.prototype.modulo = c.prototype.A, c.prototype.compare = c.prototype.l, c.prototype.toNumber = c.prototype.m, c.prototype.getBits = c.prototype.i, c.fromNumber = h, c.fromString = function e(t, n) {
                    if (0 == t.length) throw Error("number format error: empty string");
                    if ((n = n || 10) < 2 || 36 < n) throw Error("radix out of range: " + n);
                    if ("-" == t.charAt(0)) return m(e(t.substring(1), n));
                    if (0 <= t.indexOf("-")) throw Error('number format error: interior "-" character');
                    for (var r = h(Math.pow(n, 8)), i = l, s = 0; s < t.length; s += 8) var a = Math.min(8, t.length - s),
                        o = parseInt(t.substring(s, s + a), n),
                        i = a < 8 ? (a = h(Math.pow(n, a)), i.j(a).add(h(o))) : (i = i.j(r)).add(h(o));
                    return i
                }, T = c
            }).apply(void 0 !== S ? S : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
            var dn, fn, gn, mn, pn, yn, vn, wn, x, D, C, _n = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
            !(function () {
                var e, s = "function" == typeof Object.defineProperties ? Object.defineProperty : function (e, t, n) {
                    return e == Array.prototype || e == Object.prototype || (e[t] = n.value), e
                };
                var a = function (e) {
                    e = ["object" == typeof globalThis && globalThis, e, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof _n && _n];
                    for (var t = 0; t < e.length; ++t) {
                        var n = e[t];
                        if (n && n.Math == Math) return n
                    }
                    throw Error("Cannot find global object")
                }(this);
                ! function (e, t) {
                    if (t) e: {
                        var n = a;e = e.split(".");
                        for (var r = 0; r < e.length - 1; r++) {
                            var i = e[r];
                            if (!(i in n)) break e;
                            n = n[i]
                        }(t = t(r = n[e = e[e.length - 1]])) != r && null != t && s(n, e, {
                            configurable: !0,
                            writable: !0,
                            value: t
                        })
                    }
                }("Array.prototype.values", function (e) {
                    return e || function () {
                        return function (t, n) {
                            t instanceof String && (t += "");
                            var r = 0,
                                i = !1,
                                e = {
                                    next: function () {
                                        if (!i && r < t.length) {
                                            var e = r++;
                                            return {
                                                value: n(e, t[e]),
                                                done: !1
                                            }
                                        }
                                        return {
                                            done: i = !0,
                                            value: void 0
                                        }
                                    }
                                };
                            return e[Symbol.iterator] = function () {
                                return e
                            }, e
                        }(this, function (e, t) {
                            return t
                        })
                    }
                });
                var o = o || {},
                    E = this || self;

                function u(e) {
                    var t = typeof e;
                    return "array" == (t = "object" != t ? t : e ? Array.isArray(e) ? "array" : t : "null") || "object" == t && "number" == typeof e.length
                }

                function c(e) {
                    var t = typeof e;
                    return "object" == t && null != e || "function" == t
                }

                function r(e, t, n) {
                    return e.call.apply(e.bind, arguments)
                }

                function i(t, n, e) {
                    if (!t) throw Error();
                    if (2 < arguments.length) {
                        var r = Array.prototype.slice.call(arguments, 2);
                        return function () {
                            var e = Array.prototype.slice.call(arguments);
                            return Array.prototype.unshift.apply(e, r), t.apply(n, e)
                        }
                    }
                    return function () {
                        return t.apply(n, arguments)
                    }
                }

                function p(e, t, n) {
                    return (p = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? r : i).apply(null, arguments)
                }

                function h(t) {
                    var n = Array.prototype.slice.call(arguments, 1);
                    return function () {
                        var e = n.slice();
                        return e.push.apply(e, arguments), t.apply(this, e)
                    }
                }

                function t(e, s) {
                    function t() {}
                    t.prototype = s.prototype, e.aa = s.prototype, e.prototype = new t, (e.prototype.constructor = e).Qb = function (e, t, n) {
                        for (var r = Array(arguments.length - 2), i = 2; i < arguments.length; i++) r[i - 2] = arguments[i];
                        return s.prototype[t].apply(e, r)
                    }
                }

                function l(t) {
                    var n = t.length;
                    if (0 < n) {
                        const r = Array(n);
                        for (let e = 0; e < n; e++) r[e] = t[e];
                        return r
                    }
                    return []
                }

                function n(t) {
                    for (let e = 1; e < arguments.length; e++) {
                        var n = arguments[e];
                        if (u(n)) {
                            var r = t.length || 0,
                                i = n.length || 0;
                            t.length = r + i;
                            for (let e = 0; e < i; e++) t[r + e] = n[e]
                        } else t.push(n)
                    }
                }

                function S(e) {
                    return /^[\s\xa0]*$/.test(e)
                }

                function d() {
                    var e = E.navigator;
                    return (e = e && e.userAgent) ? e : ""
                }

                function f(e) {
                    return f[" "](e), e
                }
                f[" "] = function () {};
                var g = !(-1 == d().indexOf("Gecko") || -1 != d().toLowerCase().indexOf("webkit") && -1 == d().indexOf("Edge") || -1 != d().indexOf("Trident") || -1 != d().indexOf("MSIE") || -1 != d().indexOf("Edge"));

                function m(e, t, n) {
                    for (const r in e) t.call(n, e[r], r, e)
                }

                function y(e) {
                    const t = {};
                    for (const n in e) t[n] = e[n];
                    return t
                }
                const v = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

                function w(t) {
                    let n, r;
                    for (let i = 1; i < arguments.length; i++) {
                        for (n in r = arguments[i]) t[n] = r[n];
                        for (let e = 0; e < v.length; e++) n = v[e], Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
                    }
                }
                var _ = new class {
                    constructor(e, t) {
                        this.i = e, this.j = t, this.h = 0, this.g = null
                    }
                    get() {
                        let e;
                        return 0 < this.h ? (this.h--, e = this.g, this.g = e.next, e.next = null) : e = this.i(), e
                    }
                }(() => new b, e => e.reset());
                class b {
                    constructor() {
                        this.next = this.g = this.h = null
                    }
                    set(e, t) {
                        this.h = e, this.g = t, this.next = null
                    }
                    reset() {
                        this.next = this.g = this.h = null
                    }
                }
                let I, T = !1,
                    x = new class {
                        constructor() {
                            this.h = this.g = null
                        }
                        add(e, t) {
                            const n = _.get();
                            n.set(e, t), this.h ? this.h.next = n : this.g = n, this.h = n
                        }
                    },
                    D = () => {
                        const e = E.Promise.resolve(void 0);
                        I = () => {
                            e.then(C)
                        }
                    };
                var C = () => {
                    for (var e; e = function () {
                            var e = x;
                            let t = null;
                            return e.g && (t = e.g, e.g = e.g.next, e.g || (e.h = null), t.next = null), t
                        }();) {
                        try {
                            e.h.call(e.g)
                        } catch (e) {
                            ! function (e) {
                                E.setTimeout(() => {
                                    throw e
                                }, 0)
                            }(e)
                        }
                        var t = _;
                        t.j(e), t.h < 100 && (t.h++, e.next = t.g, t.g = e)
                    }
                    T = !1
                };

                function A() {
                    this.s = this.s, this.C = this.C
                }

                function N(e, t) {
                    this.type = e, this.g = this.target = t, this.defaultPrevented = !1
                }
                A.prototype.s = !1, A.prototype.ma = function () {
                    this.s || (this.s = !0, this.N())
                }, A.prototype.N = function () {
                    if (this.C)
                        for (; this.C.length;) this.C.shift()()
                }, N.prototype.h = function () {
                    this.defaultPrevented = !0
                };
                var k = function () {
                    if (!E.addEventListener || !Object.defineProperty) return !1;
                    var e = !1,
                        t = Object.defineProperty({}, "passive", {
                            get: function () {
                                e = !0
                            }
                        });
                    try {
                        var n = () => {};
                        E.addEventListener("test", n, t), E.removeEventListener("test", n, t)
                    } catch (e) {}
                    return e
                }();

                function R(e, t) {
                    if (N.call(this, e ? e.type : ""), this.relatedTarget = this.g = this.target = null, this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0, this.key = "", this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1, this.state = null, this.pointerId = 0, this.pointerType = "", this.i = null, e) {
                        var n = this.type = e.type,
                            r = e.changedTouches && e.changedTouches.length ? e.changedTouches[0] : null;
                        if (this.target = e.target || e.srcElement, this.g = t, t = e.relatedTarget) {
                            if (g) {
                                e: {
                                    try {
                                        f(t.nodeName);
                                        var i = !0;
                                        break e
                                    } catch (e) {}
                                    i = !1
                                }
                                i || (t = null)
                            }
                        } else "mouseover" == n ? t = e.fromElement : "mouseout" == n && (t = e.toElement);
                        this.relatedTarget = t, r ? (this.clientX = void 0 !== r.clientX ? r.clientX : r.pageX, this.clientY = void 0 !== r.clientY ? r.clientY : r.pageY, this.screenX = r.screenX || 0, this.screenY = r.screenY || 0) : (this.clientX = void 0 !== e.clientX ? e.clientX : e.pageX, this.clientY = void 0 !== e.clientY ? e.clientY : e.pageY, this.screenX = e.screenX || 0, this.screenY = e.screenY || 0), this.button = e.button, this.key = e.key || "", this.ctrlKey = e.ctrlKey, this.altKey = e.altKey, this.shiftKey = e.shiftKey, this.metaKey = e.metaKey, this.pointerId = e.pointerId || 0, this.pointerType = "string" == typeof e.pointerType ? e.pointerType : O[e.pointerType] || "", this.state = e.state, (this.i = e).defaultPrevented && R.aa.h.call(this)
                    }
                }
                t(R, N);
                var O = {
                    2: "touch",
                    3: "pen",
                    4: "mouse"
                };
                R.prototype.h = function () {
                    R.aa.h.call(this);
                    var e = this.i;
                    e.preventDefault ? e.preventDefault() : e.returnValue = !1
                };
                var L = "closure_listenable_" + (1e6 * Math.random() | 0),
                    M = 0;

                function F(e, t, n, r, i) {
                    this.listener = e, this.proxy = null, this.src = t, this.type = n, this.capture = !!r, this.ha = i, this.key = ++M, this.da = this.fa = !1
                }

                function V(e) {
                    e.da = !0, e.listener = null, e.proxy = null, e.src = null, e.ha = null
                }

                function P(e) {
                    this.src = e, this.g = {}, this.h = 0
                }

                function U(e, t) {
                    var n, r, i, s = t.type;
                    s in e.g && (n = e.g[s], (i = 0 <= (r = Array.prototype.indexOf.call(n, t, void 0))) && Array.prototype.splice.call(n, r, 1), i && (V(t), 0 == e.g[s].length && (delete e.g[s], e.h--)))
                }

                function B(e, t, n, r) {
                    for (var i = 0; i < e.length; ++i) {
                        var s = e[i];
                        if (!s.da && s.listener == t && s.capture == !!n && s.ha == r) return i
                    }
                    return -1
                }
                P.prototype.add = function (e, t, n, r, i) {
                    var s = e.toString();
                    (e = this.g[s]) || (e = this.g[s] = [], this.h++);
                    var a = B(e, t, r, i);
                    return -1 < a ? (t = e[a], n || (t.fa = !1)) : ((t = new F(t, this.src, s, !!r, i)).fa = n, e.push(t)), t
                };
                var q = "closure_lm_" + (1e6 * Math.random() | 0),
                    j = {};

                function K(e, t, n, r, i) {
                    if (r && r.once) return function e(t, n, r, i, s) {
                        if (Array.isArray(n)) {
                            for (var a = 0; a < n.length; a++) e(t, n[a], r, i, s);
                            return null
                        }
                        r = J(r);
                        return t && t[L] ? t.L(n, r, c(i) ? !!i.capture : !!i, s) : G(t, n, r, !0, i, s)
                    }(e, t, n, r, i);
                    if (Array.isArray(t)) {
                        for (var s = 0; s < t.length; s++) K(e, t[s], n, r, i);
                        return null
                    }
                    return n = J(n), e && e[L] ? e.K(t, n, c(r) ? !!r.capture : !!r, i) : G(e, t, n, !1, r, i)
                }

                function G(e, t, n, r, i, s) {
                    if (!t) throw Error("Invalid event type");
                    var a = c(i) ? !!i.capture : !!i,
                        o = H(e);
                    if (o || (e[q] = o = new P(e)), (n = o.add(t, n, r, a, s)).proxy) return n;
                    if (r = function () {
                            const n = Q;
                            return function e(t) {
                                return n.call(e.src, e.listener, t)
                            }
                        }(), (n.proxy = r).src = e, r.listener = n, e.addEventListener) void 0 === (i = !k ? a : i) && (i = !1), e.addEventListener(t.toString(), r, i);
                    else if (e.attachEvent) e.attachEvent($(t.toString()), r);
                    else {
                        if (!e.addListener || !e.removeListener) throw Error("addEventListener and attachEvent are unavailable.");
                        e.addListener(r)
                    }
                    return n
                }

                function z(e) {
                    var t, n, r;
                    "number" != typeof e && e && !e.da && ((t = e.src) && t[L] ? U(t.i, e) : (n = e.type, r = e.proxy, t.removeEventListener ? t.removeEventListener(n, r, e.capture) : t.detachEvent ? t.detachEvent($(n), r) : t.addListener && t.removeListener && t.removeListener(r), (n = H(t)) ? (U(n, e), 0 == n.h && (n.src = null, t[q] = null)) : V(e)))
                }

                function $(e) {
                    return e in j ? j[e] : j[e] = "on" + e
                }

                function Q(e, t) {
                    var n, r;
                    return e = !!e.da || (t = new R(t, this), n = e.listener, r = e.ha || e.src, e.fa && z(e), n.call(r, t))
                }

                function H(e) {
                    return (e = e[q]) instanceof P ? e : null
                }
                var W = "__closure_events_fn_" + (1e9 * Math.random() >>> 0);

                function J(t) {
                    return "function" == typeof t ? t : (t[W] || (t[W] = function (e) {
                        return t.handleEvent(e)
                    }), t[W])
                }

                function Y() {
                    A.call(this), this.i = new P(this), (this.M = this).F = null
                }

                function X(e, t) {
                    var n, r = e.F;
                    if (r)
                        for (n = []; r; r = r.F) n.push(r);
                    if (e = e.M, r = t.type || t, "string" == typeof t ? t = new N(t, e) : t instanceof N ? t.target = t.target || e : (a = t, w(t = new N(r, e), a)), a = !0, n)
                        for (var i = n.length - 1; 0 <= i; i--) var s = t.g = n[i],
                            a = Z(s, r, !0, t) && a;
                    if (a = Z(s = t.g = e, r, !0, t) && a, a = Z(s, r, !1, t) && a, n)
                        for (i = 0; i < n.length; i++) a = Z(s = t.g = n[i], r, !1, t) && a
                }

                function Z(e, t, n, r) {
                    if (!(t = e.i.g[String(t)])) return !0;
                    t = t.concat();
                    for (var i = !0, s = 0; s < t.length; ++s) {
                        var a, o, u = t[s];
                        u && !u.da && u.capture == n && (a = u.listener, o = u.ha || u.src, u.fa && U(e.i, u), i = !1 !== a.call(o, r) && i)
                    }
                    return i && !r.defaultPrevented
                }

                function ee(e, t, n) {
                    if ("function" == typeof e) n && (e = p(e, n));
                    else {
                        if (!e || "function" != typeof e.handleEvent) throw Error("Invalid listener argument");
                        e = p(e.handleEvent, e)
                    }
                    return 2147483647 < Number(t) ? -1 : E.setTimeout(e, t || 0)
                }
                t(Y, A), Y.prototype[L] = !0, Y.prototype.removeEventListener = function (e, t, n, r) {
                    ! function e(t, n, r, i, s) {
                        if (Array.isArray(n))
                            for (var a = 0; a < n.length; a++) e(t, n[a], r, i, s);
                        else i = c(i) ? !!i.capture : !!i, r = J(r), t && t[L] ? (t = t.i, (n = String(n).toString()) in t.g && -1 < (r = B(a = t.g[n], r, i, s)) && (V(a[r]), Array.prototype.splice.call(a, r, 1), 0 == a.length && (delete t.g[n], t.h--))) : (t = t && H(t)) && (n = t.g[n.toString()], (r = (t = -1) < (t = n ? B(n, r, i, s) : t) ? n[t] : null) && z(r))
                    }(this, e, t, n, r)
                }, Y.prototype.N = function () {
                    if (Y.aa.N.call(this), this.i) {
                        var e, t = this.i;
                        for (e in t.g) {
                            for (var n = t.g[e], r = 0; r < n.length; r++) V(n[r]);
                            delete t.g[e], t.h--
                        }
                    }
                    this.F = null
                }, Y.prototype.K = function (e, t, n, r) {
                    return this.i.add(String(e), t, !1, n, r)
                }, Y.prototype.L = function (e, t, n, r) {
                    return this.i.add(String(e), t, !0, n, r)
                };
                class te extends A {
                    constructor(e, t) {
                        super(), this.m = e, this.l = t, this.h = null, this.i = !1, this.g = null
                    }
                    j(e) {
                        this.h = arguments, this.g ? this.i = !0 : function e(t) {
                            t.g = ee(() => {
                                t.g = null, t.i && (t.i = !1, e(t))
                            }, t.l);
                            var n = t.h;
                            t.h = null, t.m.apply(null, n)
                        }(this)
                    }
                    N() {
                        super.N(), this.g && (E.clearTimeout(this.g), this.g = null, this.i = !1, this.h = null)
                    }
                }

                function ne(e) {
                    A.call(this), this.h = e, this.g = {}
                }
                t(ne, A);
                var re = [];

                function ie(e) {
                    m(e.g, function (e, t) {
                        this.g.hasOwnProperty(t) && z(e)
                    }, e), e.g = {}
                }
                ne.prototype.N = function () {
                    ne.aa.N.call(this), ie(this)
                }, ne.prototype.handleEvent = function () {
                    throw Error("EventHandler.handleEvent not implemented")
                };
                var se = E.JSON.stringify,
                    ae = E.JSON.parse,
                    oe = class {
                        stringify(e) {
                            return E.JSON.stringify(e, void 0)
                        }
                        parse(e) {
                            return E.JSON.parse(e, void 0)
                        }
                    };

                function ue() {}

                function ce(e) {
                    return e.h || (e.h = e.i())
                }

                function he() {}
                ue.prototype.h = null;
                var le = {
                    OPEN: "a",
                    kb: "b",
                    Ja: "c",
                    wb: "d"
                };

                function de() {
                    N.call(this, "d")
                }

                function fe() {
                    N.call(this, "c")
                }
                t(de, N), t(fe, N);
                var ge = {},
                    me = null;

                function pe() {
                    return me = me || new Y
                }

                function ye(e) {
                    N.call(this, ge.La, e)
                }

                function ve() {
                    var e = pe();
                    X(e, new ye(e))
                }

                function we(e, t) {
                    N.call(this, ge.STAT_EVENT, e), this.stat = t
                }

                function _e(e) {
                    var t = pe();
                    X(t, new we(t, e))
                }

                function be(e, t) {
                    N.call(this, ge.Ma, e), this.size = t
                }

                function Ie(e, t) {
                    if ("function" != typeof e) throw Error("Fn must not be null and must be a function");
                    return E.setTimeout(function () {
                        e()
                    }, t)
                }

                function Te() {
                    this.g = !0
                }

                function Ee(e, t, n, r) {
                    e.info(function () {
                        return "XMLHTTP TEXT (" + t + "): " + function (e, t) {
                            if (!e.g) return t;
                            if (!t) return null;
                            try {
                                var n = JSON.parse(t);
                                if (n)
                                    for (e = 0; e < n.length; e++)
                                        if (Array.isArray(n[e])) {
                                            var r = n[e];
                                            if (!(r.length < 2)) {
                                                var i = r[1];
                                                if (Array.isArray(i) && !(i.length < 1)) {
                                                    var s = i[0];
                                                    if ("noop" != s && "stop" != s && "close" != s)
                                                        for (var a = 1; a < i.length; a++) i[a] = ""
                                                }
                                            }
                                        } return se(n)
                            } catch (e) {
                                return t
                            }
                        }(e, n) + (r ? " " + r : "")
                    })
                }
                ge.La = "serverreachability", t(ye, N), ge.STAT_EVENT = "statevent", t(we, N), ge.Ma = "timingevent", t(be, N), Te.prototype.xa = function () {
                    this.g = !1
                }, Te.prototype.info = function () {};
                var Se = {
                        NO_ERROR: 0,
                        gb: 1,
                        tb: 2,
                        sb: 3,
                        nb: 4,
                        rb: 5,
                        ub: 6,
                        Ia: 7,
                        TIMEOUT: 8,
                        xb: 9
                    },
                    xe = {
                        lb: "complete",
                        Hb: "success",
                        Ja: "error",
                        Ia: "abort",
                        zb: "ready",
                        Ab: "readystatechange",
                        TIMEOUT: "timeout",
                        vb: "incrementaldata",
                        yb: "progress",
                        ob: "downloadprogress",
                        Pb: "uploadprogress"
                    };

                function De() {}

                function Ce(e, t, n, r) {
                    this.j = e, this.i = t, this.l = n, this.R = r || 1, this.U = new ne(this), this.I = 45e3, this.H = null, this.o = !1, this.m = this.A = this.v = this.L = this.F = this.S = this.B = null, this.D = [], this.g = null, this.C = 0, this.s = this.u = null, this.X = -1, this.J = !1, this.O = 0, this.M = null, this.W = this.K = this.T = this.P = !1, this.h = new Ae
                }

                function Ae() {
                    this.i = null, this.g = "", this.h = !1
                }
                t(De, ue), De.prototype.g = function () {
                    return new XMLHttpRequest
                }, De.prototype.i = function () {
                    return {}
                };
                var Ne = new De,
                    ke = {},
                    Re = {};

                function Oe(e, t, n) {
                    e.L = 1, e.v = it(Ze(t)), e.m = n, e.P = !0, Le(e, null)
                }

                function Le(e, t) {
                    e.F = Date.now(), Fe(e), e.A = Ze(e.v);
                    var n = e.A,
                        r = e.R;
                    Array.isArray(r) || (r = [String(r)]), vt(n.i, "t", r), e.C = 0, n = e.j.J, e.h = new Ae, e.g = sn(e.j, n ? t : null, !e.m), 0 < e.O && (e.M = new te(p(e.Y, e, e.g), e.O)), t = e.U;
                    var n = e.g,
                        r = e.ca,
                        i = "readystatechange";
                    Array.isArray(i) || (i && (re[0] = i.toString()), i = re);
                    for (var a, o, u, c, h, l, s = 0; s < i.length; s++) {
                        var d = K(n, i[s], r || t.handleEvent, !1, t.h || t);
                        if (!d) break;
                        t.g[d.key] = d
                    }
                    t = e.H ? y(e.H) : {}, e.m ? (e.u || (e.u = "POST"), t["Content-Type"] = "application/x-www-form-urlencoded", e.g.ea(e.A, e.u, e.m, t)) : (e.u = "GET", e.g.ea(e.A, e.u, null, t)), ve(), a = e.i, o = e.u, u = e.A, c = e.l, h = e.R, l = e.m, a.info(function () {
                        if (a.g)
                            if (l)
                                for (var e = "", t = l.split("&"), n = 0; n < t.length; n++) {
                                    var r, i, s = t[n].split("=");
                                    1 < s.length && (r = s[0], s = s[1], e = 2 <= (i = r.split("_")).length && "type" == i[1] ? e + (r + "=") + s + "&" : e + (r + "=redacted&"))
                                } else e = null;
                            else e = l;
                        return "XMLHTTP REQ (" + c + ") [attempt " + h + "]: " + o + "\n" + u + "\n" + e
                    })
                }

                function Me(e) {
                    return e.g && ("GET" == e.u && 2 != e.L && e.j.Ca)
                }

                function Fe(e) {
                    e.S = Date.now() + e.I, Ve(e, e.I)
                }

                function Ve(e, t) {
                    if (null != e.B) throw Error("WatchDog timer not null");
                    e.B = Ie(p(e.ba, e), t)
                }

                function Pe(e) {
                    e.B && (E.clearTimeout(e.B), e.B = null)
                }

                function Ue(e) {
                    0 == e.j.G || e.J || Zt(e.j, e)
                }

                function Be(e) {
                    Pe(e);
                    var t = e.M;
                    t && "function" == typeof t.ma && t.ma(), e.M = null, ie(e.U), e.g && (t = e.g, e.g = null, t.abort(), t.ma())
                }

                function qe(e, t) {
                    try {
                        var n = e.j;
                        if (0 != n.G && (n.g == e || $e(n.h, e)))
                            if (!e.K && $e(n.h, e) && 3 == n.G) {
                                try {
                                    var r = n.Da.g.parse(t)
                                } catch (e) {
                                    r = null
                                }
                                if (Array.isArray(r) && 3 == r.length) {
                                    var i = r;
                                    if (0 == i[0]) {
                                        e: if (!n.u) {
                                            if (n.g) {
                                                if (!(n.g.F + 3e3 < e.F)) break e;
                                                Xt(n), jt(n)
                                            }
                                            Wt(n), _e(18)
                                        }
                                    }
                                    else n.za = i[1], 0 < n.za - n.T && i[2] < 37500 && n.F && 0 == n.v && !n.C && (n.C = Ie(p(n.Za, n), 6e3));
                                    if (ze(n.h) <= 1 && n.ca) {
                                        try {
                                            n.ca()
                                        } catch (e) {}
                                        n.ca = void 0
                                    }
                                } else tn(n, 11)
                            } else if (!e.K && n.g != e || Xt(n), !S(t))
                            for (i = n.Da.g.parse(t), t = 0; t < i.length; t++) {
                                var s = i[t];
                                if (n.T = s[0], s = s[1], 2 == n.G)
                                    if ("c" == s[0]) {
                                        n.K = s[1], n.ia = s[2];
                                        var a = s[3];
                                        null != a && (n.la = a, n.j.info("VER=" + n.la));
                                        var o = s[4];
                                        null != o && (n.Aa = o, n.j.info("SVER=" + n.Aa));
                                        var u, c, h = s[5];
                                        null != h && "number" == typeof h && 0 < h && (r = 1.5 * h, n.L = r, n.j.info("backChannelRequestTimeoutMs_=" + r)), r = n;
                                        const g = e.g;
                                        if (g) {
                                            const m = g.g ? g.g.getResponseHeader("X-Client-Wire-Protocol") : null;
                                            m && ((u = r.h).g || -1 == m.indexOf("spdy") && -1 == m.indexOf("quic") && -1 == m.indexOf("h2") || (u.j = u.l, u.g = new Set, u.h && (Qe(u, u.h), u.h = null))), !r.D || (c = g.g ? g.g.getResponseHeader("X-HTTP-Session-Id") : null) && (r.ya = c, rt(r.I, r.D, c))
                                        }
                                        n.G = 3, n.l && n.l.ua(), n.ba && (n.R = Date.now() - e.F, n.j.info("Handshake RTT: " + n.R + "ms"));
                                        var l, d, f = e;
                                        (r = n).qa = rn(r, r.J ? r.ia : null, r.W), f.K ? (He(r.h, f), l = f, (d = r.L) && (l.I = d), l.B && (Pe(l), Fe(l)), r.g = f) : Ht(r), 0 < n.i.length && Gt(n)
                                    } else "stop" != s[0] && "close" != s[0] || tn(n, 7);
                                else 3 == n.G && ("stop" == s[0] || "close" == s[0] ? "stop" == s[0] ? tn(n, 7) : qt(n) : "noop" != s[0] && n.l && n.l.ta(s), n.v = 0)
                            }
                        ve()
                    } catch (e) {}
                }
                Ce.prototype.ca = function (e) {
                    e = e.target;
                    const t = this.M;
                    t && 3 == Vt(e) ? t.j() : this.Y(e)
                }, Ce.prototype.Y = function (e) {
                    try {
                        if (e == this.g) e: {
                            var t = Vt(this.g),
                                n = this.g.Ba();this.g.Z();
                            if (!(t < 3) && (3 != t || this.g && (this.h.h || this.g.oa() || Pt(this.g)))) {
                                this.J || 4 != t || 7 == n || ve(), Pe(this);
                                var r = this.g.Z();
                                this.X = r;
                                t: if (Me(this)) {
                                    var i = Pt(this.g);
                                    e = "";
                                    var s = i.length,
                                        a = 4 == Vt(this.g);
                                    if (!this.h.i) {
                                        if ("undefined" == typeof TextDecoder) {
                                            Be(this), Ue(this);
                                            var o = "";
                                            break t
                                        }
                                        this.h.i = new E.TextDecoder
                                    }
                                    for (n = 0; n < s; n++) this.h.h = !0, e += this.h.i.decode(i[n], {
                                        stream: !(a && n == s - 1)
                                    });
                                    i.length = 0, this.h.g += e, this.C = 0, o = this.h.g
                                } else o = this.g.oa();
                                if (this.o = 200 == r, y = this.i, v = this.u, w = this.A, _ = this.l, b = this.R, I = t, T = r, y.info(function () {
                                        return "XMLHTTP RESP (" + _ + ") [ attempt " + b + "]: " + v + "\n" + w + "\n" + I + " " + T
                                    }), this.o) {
                                    if (this.T && !this.K) {
                                        t: {
                                            if (this.g) {
                                                var u, c = this.g;
                                                if ((u = c.g ? c.g.getResponseHeader("X-HTTP-Initial-Response") : null) && !S(u)) {
                                                    var h = u;
                                                    break t
                                                }
                                            }
                                            h = null
                                        }
                                        if (!(r = h)) {
                                            this.o = !1, this.s = 3, _e(12), Be(this), Ue(this);
                                            break e
                                        }
                                        Ee(this.i, this.l, r, "Initial handshake response via X-HTTP-Initial-Response"),
                                        this.K = !0,
                                        qe(this, r)
                                    }
                                    if (this.P) {
                                        for (var l, d, r = !0; !this.J && this.C < o.length;) {
                                            if (g = o, p = m = void 0, m = (f = this).C, (l = -1 == (p = g.indexOf("\n", m)) ? Re : (m = Number(g.substring(m, p)), isNaN(m) ? ke : (p += 1) + m > g.length ? Re : (g = g.slice(p, p + m), f.C = p + m, g))) == Re) {
                                                4 == t && (this.s = 4, _e(14), r = !1), Ee(this.i, this.l, null, "[Incomplete Response]");
                                                break
                                            }
                                            if (l == ke) {
                                                this.s = 4, _e(15), Ee(this.i, this.l, o, "[Invalid Chunk]"), r = !1;
                                                break
                                            }
                                            Ee(this.i, this.l, l, null), qe(this, l)
                                        }
                                        Me(this) && 0 != this.C && (this.h.g = this.h.g.slice(this.C), this.C = 0), 4 != t || 0 != o.length || this.h.h || (this.s = 1, _e(16), r = !1), this.o = this.o && r, r ? 0 < o.length && !this.W && (this.W = !0, (d = this.j).g == this && d.ba && !d.M && (d.j.info("Great, no buffering proxy detected. Bytes received: " + o.length), Jt(d), d.M = !0, _e(11))) : (Ee(this.i, this.l, o, "[Invalid Chunked Response]"), Be(this), Ue(this))
                                    } else Ee(this.i, this.l, o, null), qe(this, o);
                                    4 == t && Be(this), this.o && !this.J && (4 == t ? Zt(this.j, this) : (this.o = !1, Fe(this)))
                                } else(function (e) {
                                    const t = {};
                                    e = (e.g && 2 <= Vt(e) && e.g.getAllResponseHeaders() || "").split("\r\n");
                                    for (let i = 0; i < e.length; i++)
                                        if (!S(e[i])) {
                                            var n = function (e) {
                                                    var t = 1;
                                                    e = e.split(":");
                                                    const n = [];
                                                    for (; 0 < t && e.length;) n.push(e.shift()), t--;
                                                    return e.length && n.push(e.join(":")), n
                                                }(e[i]),
                                                r = n[0];
                                            if ("string" == typeof (n = n[1])) {
                                                n = n.trim();
                                                const s = t[r] || [];
                                                t[r] = s, s.push(n)
                                            }
                                        }!
                                    function (e, t) {
                                        for (const n in e) t.call(void 0, e[n], n, e)
                                    }(t, function (e) {
                                        return e.join(", ")
                                    })
                                })(this.g), 400 == r && 0 < o.indexOf("Unknown SID") ? (this.s = 3, _e(12)) : (this.s = 0, _e(13)), Be(this), Ue(this)
                            }
                        }
                    } catch (e) {}
                    var f, g, m, p, y, v, w, _, b, I, T
                }, Ce.prototype.cancel = function () {
                    this.J = !0, Be(this)
                }, Ce.prototype.ba = function () {
                    this.B = null;
                    var e, t, n = Date.now();
                    0 <= n - this.S ? (e = this.i, t = this.A, e.info(function () {
                        return "TIMEOUT: " + t
                    }), 2 != this.L && (ve(), _e(17)), Be(this), this.s = 2, Ue(this)) : Ve(this, this.S - n)
                };
                var je = class {
                    constructor(e, t) {
                        this.g = e, this.map = t
                    }
                };

                function Ke(e) {
                    this.l = e || 10, e = E.PerformanceNavigationTiming ? 0 < (e = E.performance.getEntriesByType("navigation")).length && ("hq" == e[0].nextHopProtocol || "h2" == e[0].nextHopProtocol) : !!(E.chrome && E.chrome.loadTimes && E.chrome.loadTimes() && E.chrome.loadTimes().wasFetchedViaSpdy), this.j = e ? this.l : 1, this.g = null, 1 < this.j && (this.g = new Set), this.h = null, this.i = []
                }

                function Ge(e) {
                    return e.h || e.g && e.g.size >= e.j
                }

                function ze(e) {
                    return e.h ? 1 : e.g ? e.g.size : 0
                }

                function $e(e, t) {
                    return e.h ? e.h == t : e.g && e.g.has(t)
                }

                function Qe(e, t) {
                    e.g ? e.g.add(t) : e.h = t
                }

                function He(e, t) {
                    e.h && e.h == t ? e.h = null : e.g && e.g.has(t) && e.g.delete(t)
                }

                function We(t) {
                    if (null != t.h) return t.i.concat(t.h.D);
                    if (null == t.g || 0 === t.g.size) return l(t.i); {
                        let e = t.i;
                        for (const n of t.g.values()) e = e.concat(n.D);
                        return e
                    }
                }

                function Je(e, t) {
                    if (e.forEach && "function" == typeof e.forEach) e.forEach(t, void 0);
                    else if (u(e) || "string" == typeof e) Array.prototype.forEach.call(e, t, void 0);
                    else
                        for (var n = function (e) {
                                if (e.na && "function" == typeof e.na) return e.na();
                                if (!e.V || "function" != typeof e.V) {
                                    if ("undefined" != typeof Map && e instanceof Map) return Array.from(e.keys());
                                    if (!("undefined" != typeof Set && e instanceof Set)) {
                                        if (u(e) || "string" == typeof e) {
                                            var t = [];
                                            e = e.length;
                                            for (var n = 0; n < e; n++) t.push(n);
                                            return t
                                        }
                                        t = [], n = 0;
                                        for (const r in e) t[n++] = r;
                                        return t
                                    }
                                }
                            }(e), r = function (e) {
                                if (e.V && "function" == typeof e.V) return e.V();
                                if ("undefined" != typeof Map && e instanceof Map || "undefined" != typeof Set && e instanceof Set) return Array.from(e.values());
                                if ("string" == typeof e) return e.split("");
                                if (u(e)) {
                                    for (var t = [], n = e.length, r = 0; r < n; r++) t.push(e[r]);
                                    return t
                                }
                                for (r in t = [], n = 0, e) t[n++] = e[r];
                                return t
                            }(e), i = r.length, s = 0; s < i; s++) t.call(void 0, r[s], n && n[s], e)
                }
                Ke.prototype.cancel = function () {
                    if (this.i = We(this), this.h) this.h.cancel(), this.h = null;
                    else if (this.g && 0 !== this.g.size) {
                        for (const e of this.g.values()) e.cancel();
                        this.g.clear()
                    }
                };
                var Ye = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");

                function Xe(e) {
                    var t, n;
                    this.g = this.o = this.j = "", this.s = null, this.m = this.l = "", this.h = !1, e instanceof Xe ? (this.h = e.h, et(this, e.j), this.o = e.o, this.g = e.g, tt(this, e.s), this.l = e.l, t = e.i, (n = new gt).i = t.i, t.g && (n.g = new Map(t.g), n.h = t.h), nt(this, n), this.m = e.m) : e && (t = String(e).match(Ye)) ? (this.h = !1, et(this, t[1] || "", !0), this.o = st(t[2] || ""), this.g = st(t[3] || "", !0), tt(this, t[4]), this.l = st(t[5] || "", !0), nt(this, t[6] || "", !0), this.m = st(t[7] || "")) : (this.h = !1, this.i = new gt(null, this.h))
                }

                function Ze(e) {
                    return new Xe(e)
                }

                function et(e, t, n) {
                    e.j = n ? st(t, !0) : t, e.j && (e.j = e.j.replace(/:$/, ""))
                }

                function tt(e, t) {
                    if (t) {
                        if (t = Number(t), isNaN(t) || t < 0) throw Error("Bad port number " + t);
                        e.s = t
                    } else e.s = null
                }

                function nt(e, t, n) {
                    var r, i;
                    t instanceof gt ? (e.i = t, r = e.i, (i = e.h) && !r.j && (mt(r), r.i = null, r.g.forEach(function (e, t) {
                        var n = t.toLowerCase();
                        t != n && (pt(this, t), vt(this, n, e))
                    }, r)), r.j = i) : (n || (t = at(t, dt)), e.i = new gt(t, e.h))
                }

                function rt(e, t, n) {
                    e.i.set(t, n)
                }

                function it(e) {
                    return rt(e, "zx", Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ Date.now()).toString(36)), e
                }

                function st(e, t) {
                    return e ? t ? decodeURI(e.replace(/%25/g, "%2525")) : decodeURIComponent(e) : ""
                }

                function at(e, t, n) {
                    return "string" == typeof e ? (e = encodeURI(e).replace(t, ot), e = n ? e.replace(/%25([0-9a-fA-F]{2})/g, "%$1") : e) : null
                }

                function ot(e) {
                    return "%" + ((e = e.charCodeAt(0)) >> 4 & 15).toString(16) + (15 & e).toString(16)
                }
                Xe.prototype.toString = function () {
                    var e = [],
                        t = this.j;
                    t && e.push(at(t, ct, !0), ":");
                    var n = this.g;
                    return !n && "file" != t || (e.push("//"), (t = this.o) && e.push(at(t, ct, !0), "@"), e.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), null != (n = this.s) && e.push(":", String(n))), (n = this.l) && (this.g && "/" != n.charAt(0) && e.push("/"), e.push(at(n, "/" == n.charAt(0) ? lt : ht, !0))), (n = this.i.toString()) && e.push("?", n), (n = this.m) && e.push("#", at(n, ft)), e.join("")
                };
                var ut, ct = /[#\/\?@]/g,
                    ht = /[#\?:]/g,
                    lt = /[#\?]/g,
                    dt = /[#\?@]/g,
                    ft = /#/g;

                function gt(e, t) {
                    this.h = this.g = null, this.i = e || null, this.j = !!t
                }

                function mt(n) {
                    n.g || (n.g = new Map, n.h = 0, n.i && function (e, t) {
                        if (e) {
                            e = e.split("&");
                            for (var n = 0; n < e.length; n++) {
                                var r, i = e[n].indexOf("="),
                                    s = null;
                                0 <= i ? (r = e[n].substring(0, i), s = e[n].substring(i + 1)) : r = e[n], t(r, s ? decodeURIComponent(s.replace(/\+/g, " ")) : "")
                            }
                        }
                    }(n.i, function (e, t) {
                        n.add(decodeURIComponent(e.replace(/\+/g, " ")), t)
                    }))
                }

                function pt(e, t) {
                    mt(e), t = wt(e, t), e.g.has(t) && (e.i = null, e.h -= e.g.get(t).length, e.g.delete(t))
                }

                function yt(e, t) {
                    return mt(e), t = wt(e, t), e.g.has(t)
                }

                function vt(e, t, n) {
                    pt(e, t), 0 < n.length && (e.i = null, e.g.set(wt(e, t), l(n)), e.h += n.length)
                }

                function wt(e, t) {
                    return t = String(t), t = e.j ? t.toLowerCase() : t
                }

                function _t(e, t, n, r, i) {
                    try {
                        i && (i.onload = null, i.onerror = null, i.onabort = null, i.ontimeout = null), r(n)
                    } catch (e) {}
                }

                function bt() {
                    this.g = new oe
                }

                function It(e) {
                    this.l = e.Ub || null, this.j = e.eb || !1
                }

                function Tt(e, t) {
                    Y.call(this), this.D = e, this.o = t, this.m = void 0, this.status = this.readyState = 0, this.responseType = this.responseText = this.response = this.statusText = "", this.onreadystatechange = null, this.u = new Headers, this.h = null, this.B = "GET", this.A = "", this.g = !1, this.v = this.j = this.l = null
                }

                function Et(e) {
                    e.j.read().then(e.Pa.bind(e)).catch(e.ga.bind(e))
                }

                function St(e) {
                    e.readyState = 4, e.l = null, e.j = null, e.v = null, xt(e)
                }

                function xt(e) {
                    e.onreadystatechange && e.onreadystatechange.call(e)
                }

                function Dt(e) {
                    let n = "";
                    return m(e, function (e, t) {
                        n += t, n += ":", n += e, n += "\r\n"
                    }), n
                }

                function Ct(e, t, n) {
                    e: {
                        for (r in n) {
                            var r = !1;
                            break e
                        }
                        r = !0
                    }
                    r || (n = Dt(n), "string" == typeof e ? null != n && encodeURIComponent(String(n)) : rt(e, t, n))
                }

                function At(e) {
                    Y.call(this), this.headers = new Map, this.o = e || null, this.h = !1, this.v = this.g = null, this.D = "", this.m = 0, this.l = "", this.j = this.B = this.u = this.A = !1, this.I = null, this.H = "", this.J = !1
                }(e = gt.prototype).add = function (e, t) {
                    mt(this), this.i = null, e = wt(this, e);
                    var n = this.g.get(e);
                    return n || this.g.set(e, n = []), n.push(t), this.h += 1, this
                }, e.forEach = function (n, r) {
                    mt(this), this.g.forEach(function (e, t) {
                        e.forEach(function (e) {
                            n.call(r, e, t, this)
                        }, this)
                    }, this)
                }, e.na = function () {
                    mt(this);
                    const t = Array.from(this.g.values()),
                        n = Array.from(this.g.keys()),
                        r = [];
                    for (let s = 0; s < n.length; s++) {
                        var i = t[s];
                        for (let e = 0; e < i.length; e++) r.push(n[s])
                    }
                    return r
                }, e.V = function (t) {
                    mt(this);
                    let n = [];
                    if ("string" == typeof t) yt(this, t) && (n = n.concat(this.g.get(wt(this, t))));
                    else {
                        t = Array.from(this.g.values());
                        for (let e = 0; e < t.length; e++) n = n.concat(t[e])
                    }
                    return n
                }, e.set = function (e, t) {
                    return mt(this), this.i = null, yt(this, e = wt(this, e)) && (this.h -= this.g.get(e).length), this.g.set(e, [t]), this.h += 1, this
                }, e.get = function (e, t) {
                    return e && 0 < (e = this.V(e)).length ? String(e[0]) : t
                }, e.toString = function () {
                    if (this.i) return this.i;
                    if (!this.g) return "";
                    const e = [],
                        t = Array.from(this.g.keys());
                    for (var n = 0; n < t.length; n++)
                        for (var r = t[n], i = encodeURIComponent(String(r)), s = this.V(r), r = 0; r < s.length; r++) {
                            var a = i;
                            "" !== s[r] && (a += "=" + encodeURIComponent(String(s[r]))), e.push(a)
                        }
                    return this.i = e.join("&")
                }, t(It, ue), It.prototype.g = function () {
                    return new Tt(this.l, this.j)
                }, It.prototype.i = (ut = {}, function () {
                    return ut
                }), t(Tt, Y), (e = Tt.prototype).open = function (e, t) {
                    if (0 != this.readyState) throw this.abort(), Error("Error reopening a connection");
                    this.B = e, this.A = t, this.readyState = 1, xt(this)
                }, e.send = function (e) {
                    if (1 != this.readyState) throw this.abort(), Error("need to call open() first. ");
                    this.g = !0;
                    const t = {
                        headers: this.u,
                        method: this.B,
                        credentials: this.m,
                        cache: void 0
                    };
                    e && (t.body = e), (this.D || E).fetch(new Request(this.A, t)).then(this.Sa.bind(this), this.ga.bind(this))
                }, e.abort = function () {
                    this.response = this.responseText = "", this.u = new Headers, this.status = 0, this.j && this.j.cancel("Request was aborted.").catch(() => {}), 1 <= this.readyState && this.g && 4 != this.readyState && (this.g = !1, St(this)), this.readyState = 0
                }, e.Sa = function (e) {
                    if (this.g && (this.l = e, this.h || (this.status = this.l.status, this.statusText = this.l.statusText, this.h = e.headers, this.readyState = 2, xt(this)), this.g && (this.readyState = 3, xt(this), this.g)))
                        if ("arraybuffer" === this.responseType) e.arrayBuffer().then(this.Qa.bind(this), this.ga.bind(this));
                        else if (void 0 !== E.ReadableStream && "body" in e) {
                        if (this.j = e.body.getReader(), this.o) {
                            if (this.responseType) throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');
                            this.response = []
                        } else this.response = this.responseText = "", this.v = new TextDecoder;
                        Et(this)
                    } else e.text().then(this.Ra.bind(this), this.ga.bind(this))
                }, e.Pa = function (e) {
                    var t;
                    this.g && (this.o && e.value ? this.response.push(e.value) : this.o || (t = e.value || new Uint8Array(0), (t = this.v.decode(t, {
                        stream: !e.done
                    })) && (this.response = this.responseText += t)), (e.done ? St : xt)(this), 3 == this.readyState && Et(this))
                }, e.Ra = function (e) {
                    this.g && (this.response = this.responseText = e, St(this))
                }, e.Qa = function (e) {
                    this.g && (this.response = e, St(this))
                }, e.ga = function () {
                    this.g && St(this)
                }, e.setRequestHeader = function (e, t) {
                    this.u.append(e, t)
                }, e.getResponseHeader = function (e) {
                    return this.h && this.h.get(e.toLowerCase()) || ""
                }, e.getAllResponseHeaders = function () {
                    if (!this.h) return "";
                    const e = [],
                        t = this.h.entries();
                    for (var n = t.next(); !n.done;) n = n.value, e.push(n[0] + ": " + n[1]), n = t.next();
                    return e.join("\r\n")
                }, Object.defineProperty(Tt.prototype, "withCredentials", {
                    get: function () {
                        return "include" === this.m
                    },
                    set: function (e) {
                        this.m = e ? "include" : "same-origin"
                    }
                }), t(At, Y);
                var Nt = /^https?$/i,
                    kt = ["POST", "PUT"];

                function Rt(e, t) {
                    e.h = !1, e.g && (e.j = !0, e.g.abort(), e.j = !1), e.l = t, e.m = 5, Ot(e), Mt(e)
                }

                function Ot(e) {
                    e.A || (e.A = !0, X(e, "complete"), X(e, "error"))
                }

                function Lt(e) {
                    if (e.h && void 0 !== o && (!e.v[1] || 4 != Vt(e) || 2 != e.Z()))
                        if (e.u && 4 == Vt(e)) ee(e.Ea, 0, e);
                        else if (X(e, "readystatechange"), 4 == Vt(e)) {
                        e.h = !1;
                        try {
                            var t, n, r, i = e.Z();
                            e: switch (i) {
                                case 200:
                                case 201:
                                case 202:
                                case 204:
                                case 206:
                                case 304:
                                case 1223:
                                    var s = !0;
                                    break e;
                                default:
                                    s = !1
                            }
                            if ((t = s) || ((n = 0 === i) && (!(r = String(e.D).match(Ye)[1] || null) && E.self && E.self.location && (r = E.self.location.protocol.slice(0, -1)), n = !Nt.test(r ? r.toLowerCase() : "")), t = n), t) X(e, "complete"), X(e, "success");
                            else {
                                e.m = 6;
                                try {
                                    var a = 2 < Vt(e) ? e.g.statusText : ""
                                } catch (e) {
                                    a = ""
                                }
                                e.l = a + " [" + e.Z() + "]", Ot(e)
                            }
                        } finally {
                            Mt(e)
                        }
                    }
                }

                function Mt(e, t) {
                    if (e.g) {
                        Ft(e);
                        const n = e.g,
                            r = e.v[0] ? () => {} : null;
                        e.g = null, e.v = null, t || X(e, "ready");
                        try {
                            n.onreadystatechange = r
                        } catch (e) {}
                    }
                }

                function Ft(e) {
                    e.I && (E.clearTimeout(e.I), e.I = null)
                }

                function Vt(e) {
                    return e.g ? e.g.readyState : 0
                }

                function Pt(e) {
                    try {
                        if (!e.g) return null;
                        if ("response" in e.g) return e.g.response;
                        switch (e.H) {
                            case "":
                            case "text":
                                return e.g.responseText;
                            case "arraybuffer":
                                if ("mozResponseArrayBuffer" in e.g) return e.g.mozResponseArrayBuffer
                        }
                        return null
                    } catch (e) {
                        return null
                    }
                }

                function Ut(e, t, n) {
                    return n && n.internalChannelParams && n.internalChannelParams[e] || t
                }

                function Bt(e) {
                    this.Aa = 0, this.i = [], this.j = new Te, this.ia = this.qa = this.I = this.W = this.g = this.ya = this.D = this.H = this.m = this.S = this.o = null, this.Ya = this.U = 0, this.Va = Ut("failFast", !1, e), this.F = this.C = this.u = this.s = this.l = null, this.X = !0, this.za = this.T = -1, this.Y = this.v = this.B = 0, this.Ta = Ut("baseRetryDelayMs", 5e3, e), this.cb = Ut("retryDelaySeedMs", 1e4, e), this.Wa = Ut("forwardChannelMaxRetries", 2, e), this.wa = Ut("forwardChannelRequestTimeoutMs", 2e4, e), this.pa = e && e.xmlHttpFactory || void 0, this.Xa = e && e.Tb || void 0, this.Ca = e && e.useFetchStreams || !1, this.L = void 0, this.J = e && e.supportsCrossDomainXhr || !1, this.K = "", this.h = new Ke(e && e.concurrentRequestLimit), this.Da = new bt, this.P = e && e.fastHandshake || !1, this.O = e && e.encodeInitMessageHeaders || !1, this.P && this.O && (this.O = !1), this.Ua = e && e.Rb || !1, e && e.xa && this.j.xa(), e && e.forceLongPolling && (this.X = !1), this.ba = !this.P && this.X && e && e.detectBufferingProxy || !1, this.ja = void 0, e && e.longPollingTimeout && 0 < e.longPollingTimeout && (this.ja = e.longPollingTimeout), this.ca = void 0, this.R = 0, this.M = !1, this.ka = this.A = null
                }

                function qt(e) {
                    if (Kt(e), 3 == e.G) {
                        var t = e.U++,
                            n = Ze(e.I);
                        if (rt(n, "SID", e.K), rt(n, "RID", t), rt(n, "TYPE", "terminate"), $t(e, n), (t = new Ce(e, e.j, t)).L = 2, t.v = it(Ze(n)), n = !1, E.navigator && E.navigator.sendBeacon) try {
                            n = E.navigator.sendBeacon(t.v.toString(), "")
                        } catch (e) {}!n && E.Image && ((new Image).src = t.v, n = !0), n || (t.g = sn(t.j, null), t.g.ea(t.v)), t.F = Date.now(), Fe(t)
                    }
                    nn(e)
                }

                function jt(e) {
                    e.g && (Jt(e), e.g.cancel(), e.g = null)
                }

                function Kt(e) {
                    jt(e), e.u && (E.clearTimeout(e.u), e.u = null), Xt(e), e.h.cancel(), e.s && ("number" == typeof e.s && E.clearTimeout(e.s), e.s = null)
                }

                function Gt(e) {
                    var t;
                    Ge(e.h) || e.s || (e.s = !0, t = e.Ga, I || D(), T || (I(), T = !0), x.add(t, e), e.B = 0)
                }

                function zt(e, t) {
                    var n = t ? t.l : e.U++,
                        r = Ze(e.I);
                    rt(r, "SID", e.K), rt(r, "RID", n), rt(r, "AID", e.T), $t(e, r), e.m && e.o && Ct(r, e.m, e.o), n = new Ce(e, e.j, n, e.B + 1), null === e.m && (n.H = e.o), t && (e.i = t.D.concat(e.i)), t = Qt(e, n, 1e3), n.I = Math.round(.5 * e.wa) + Math.round(.5 * e.wa * Math.random()), Qe(e.h, n), Oe(n, r, t)
                }

                function $t(e, n) {
                    e.H && m(e.H, function (e, t) {
                        rt(n, t, e)
                    }), e.l && Je({}, function (e, t) {
                        rt(n, t, e)
                    })
                }

                function Qt(e, t, r) {
                    r = Math.min(e.i.length, r);
                    var i = e.l ? p(e.l.Na, e.l, e) : null;
                    e: {
                        var s = e.i;
                        let n = -1;
                        for (;;) {
                            const u = ["count=" + r]; - 1 == n ? 0 < r ? (n = s[0].g, u.push("ofs=" + n)) : n = 0 : u.push("ofs=" + n);
                            let e = !0;
                            for (let t = 0; t < r; t++) {
                                var a = s[t].g,
                                    o = s[t].map;
                                if ((a -= n) < 0) n = Math.max(0, s[t].g - 100), e = !1;
                                else try {
                                    ! function (e, r, t) {
                                        const i = t || "";
                                        try {
                                            Je(e, function (e, t) {
                                                let n = e;
                                                c(e) && (n = se(e)), r.push(i + t + "=" + encodeURIComponent(n))
                                            })
                                        } catch (e) {
                                            throw r.push(i + "type=" + encodeURIComponent("_badmap")), e
                                        }
                                    }(o, u, "req" + a + "_")
                                } catch (e) {
                                    i && i(o)
                                }
                            }
                            if (e) {
                                i = u.join("&");
                                break e
                            }
                        }
                    }
                    return e = e.i.splice(0, r), t.D = e, i
                }

                function Ht(e) {
                    var t;
                    e.g || e.u || (e.Y = 1, t = e.Fa, I || D(), T || (I(), T = !0), x.add(t, e), e.v = 0)
                }

                function Wt(e) {
                    return !(e.g || e.u || 3 <= e.v) && (e.Y++, e.u = Ie(p(e.Fa, e), en(e, e.v)), e.v++, 1)
                }

                function Jt(e) {
                    null != e.A && (E.clearTimeout(e.A), e.A = null)
                }

                function Yt(e) {
                    e.g = new Ce(e, e.j, "rpc", e.Y), null === e.m && (e.g.H = e.o), e.g.O = 0;
                    var t = Ze(e.qa);
                    rt(t, "RID", "rpc"), rt(t, "SID", e.K), rt(t, "AID", e.T), rt(t, "CI", e.F ? "0" : "1"), !e.F && e.ja && rt(t, "TO", e.ja), rt(t, "TYPE", "xmlhttp"), $t(e, t), e.m && e.o && Ct(t, e.m, e.o), e.L && (e.g.I = e.L);
                    var n = e.g;
                    e = e.ia, n.L = 1, n.v = it(Ze(t)), n.m = null, n.P = !0, Le(n, e)
                }

                function Xt(e) {
                    null != e.C && (E.clearTimeout(e.C), e.C = null)
                }

                function Zt(e, t) {
                    var n, r, i, s = null;
                    if (e.g == t) {
                        Xt(e), Jt(e), e.g = null;
                        var a = 2
                    } else {
                        if (!$e(e.h, t)) return;
                        s = t.D, He(e.h, t), a = 1
                    }
                    if (0 != e.G)
                        if (t.o) 1 == a ? (s = t.m ? t.m.length : 0, t = Date.now() - t.F, n = e.B, X(a = pe(), new be(a, s)), Gt(e)) : Ht(e);
                        else if (3 == (n = t.s) || 0 == n && 0 < t.X || (1 != a || (i = t, ze((r = e).h) >= r.h.j - (r.s ? 1 : 0) || (r.s ? (r.i = i.D.concat(r.i), 0) : 1 == r.G || 2 == r.G || r.B >= (r.Va ? 0 : r.Wa) || (r.s = Ie(p(r.Ga, r, i), en(r, r.B)), r.B++, 0)))) && (2 != a || !Wt(e))) switch (s && 0 < s.length && (t = e.h, t.i = t.i.concat(s)), n) {
                        case 1:
                            tn(e, 5);
                            break;
                        case 4:
                            tn(e, 10);
                            break;
                        case 3:
                            tn(e, 6);
                            break;
                        default:
                            tn(e, 2)
                    }
                }

                function en(e, t) {
                    let n = e.Ta + Math.floor(Math.random() * e.cb);
                    return e.isActive() || (n *= 2), n * t
                }

                function tn(e, t) {
                    var n, r, i;
                    e.j.info("Error code " + t), 2 == t ? (n = p(e.fb, e), r = !(i = e.Xa), i = new Xe(i || "//www.google.com/images/cleardot.gif"), E.location && "http" == E.location.protocol || et(i, "https"), it(i), (r ? function (e, t) {
                        var n = new Te;
                        if (E.Image) {
                            const r = new Image;
                            r.onload = h(_t, n, "TestLoadImage: loaded", !0, t, r), r.onerror = h(_t, n, "TestLoadImage: error", !1, t, r), r.onabort = h(_t, n, "TestLoadImage: abort", !1, t, r), r.ontimeout = h(_t, n, "TestLoadImage: timeout", !1, t, r), E.setTimeout(function () {
                                r.ontimeout && r.ontimeout()
                            }, 1e4), r.src = e
                        } else t(!1)
                    } : function (e, t) {
                        const n = new Te,
                            r = new AbortController,
                            i = setTimeout(() => {
                                r.abort(), _t(n, 0, !1, t)
                            }, 1e4);
                        fetch(e, {
                            signal: r.signal
                        }).then(e => {
                            clearTimeout(i), e.ok ? _t(n, 0, !0, t) : _t(n, 0, !1, t)
                        }).catch(() => {
                            clearTimeout(i), _t(n, 0, !1, t)
                        })
                    })(i.toString(), n)) : _e(2), e.G = 0, e.l && e.l.sa(t), nn(e), Kt(e)
                }

                function nn(e) {
                    var t;
                    e.G = 0, e.ka = [], e.l && (0 == (t = We(e.h)).length && 0 == e.i.length || (n(e.ka, t), n(e.ka, e.i), e.h.i.length = 0, l(e.i), e.i.length = 0), e.l.ra())
                }

                function rn(e, t, n) {
                    var r, i, s = n instanceof Xe ? Ze(n) : new Xe(n);
                    return "" != s.g ? (t && (s.g = t + "." + s.g), tt(s, s.s)) : (s = (r = E.location).protocol, t = t ? t + "." + r.hostname : r.hostname, r = +r.port, i = new Xe(null), s && et(i, s), t && (i.g = t), r && tt(i, r), n && (i.l = n), s = i), n = e.D, t = e.ya, n && t && rt(s, n, t), rt(s, "VER", e.la), $t(e, s), s
                }

                function sn(e, t, n) {
                    if (t && !e.J) throw Error("Can't create secondary domain capable XhrIo object.");
                    return (t = e.Ca && !e.pa ? new At(new It({
                        eb: n
                    })) : new At(e.pa)).Ha(e.J), t
                }

                function an() {}

                function on() {}

                function un(e, t) {
                    Y.call(this), this.g = new Bt(t), this.l = e, this.h = t && t.messageUrlParams || null, e = t && t.messageHeaders || null, t && t.clientProtocolHeaderRequired && (e ? e["X-Client-Protocol"] = "webchannel" : e = {
                        "X-Client-Protocol": "webchannel"
                    }), this.g.o = e, e = t && t.initMessageHeaders || null, t && t.messageContentType && (e ? e["X-WebChannel-Content-Type"] = t.messageContentType : e = {
                        "X-WebChannel-Content-Type": t.messageContentType
                    }), t && t.va && (e ? e["X-WebChannel-Client-Profile"] = t.va : e = {
                        "X-WebChannel-Client-Profile": t.va
                    }), this.g.S = e, (e = t && t.Sb) && !S(e) && (this.g.m = e), this.v = t && t.supportsCrossDomainXhr || !1, this.u = t && t.sendRawJson || !1, (t = t && t.httpSessionIdParam) && !S(t) && (this.g.D = t, null !== (e = this.h) && t in e && (t in (e = this.h) && delete e[t])), this.j = new ln(this)
                }

                function cn(e) {
                    de.call(this), e.__headers__ && (this.headers = e.__headers__, this.statusCode = e.__status__, delete e.__headers__, delete e.__status__);
                    var t = e.__sm__;
                    if (t) {
                        e: {
                            for (const n in t) {
                                e = n;
                                break e
                            }
                            e = void 0
                        }(this.i = e) && (e = this.i, t = null !== t && e in t ? t[e] : void 0),
                        this.data = t
                    }
                    else this.data = e
                }

                function hn() {
                    fe.call(this), this.status = 1
                }

                function ln(e) {
                    this.g = e
                }(e = At.prototype).Ha = function (e) {
                    this.J = e
                }, e.ea = function (e, t, n, r) {
                    if (this.g) throw Error("[goog.net.XhrIo] Object is active with another request=" + this.D + "; newUri=" + e);
                    t = t ? t.toUpperCase() : "GET", this.D = e, this.l = "", this.m = 0, this.A = !1, this.h = !0, this.g = (this.o || Ne).g(), this.v = this.o ? ce(this.o) : ce(Ne), this.g.onreadystatechange = p(this.Ea, this);
                    try {
                        this.B = !0, this.g.open(t, String(e), !0), this.B = !1
                    } catch (e) {
                        return void Rt(this, e)
                    }
                    if (e = n || "", n = new Map(this.headers), r)
                        if (Object.getPrototypeOf(r) === Object.prototype)
                            for (var i in r) n.set(i, r[i]);
                        else {
                            if ("function" != typeof r.keys || "function" != typeof r.get) throw Error("Unknown input type for opt_headers: " + String(r));
                            for (const o of r.keys()) n.set(o, r.get(o))
                        } r = Array.from(n.keys()).find(e => "content-type" == e.toLowerCase()), i = E.FormData && e instanceof E.FormData, 0 <= Array.prototype.indexOf.call(kt, t, void 0) && !r && !i && n.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
                    for (var [s, a] of n) this.g.setRequestHeader(s, a);
                    this.H && (this.g.responseType = this.H), "withCredentials" in this.g && this.g.withCredentials !== this.J && (this.g.withCredentials = this.J);
                    try {
                        Ft(this), this.u = !0, this.g.send(e), this.u = !1
                    } catch (e) {
                        Rt(this, e)
                    }
                }, e.abort = function (e) {
                    this.g && this.h && (this.h = !1, this.j = !0, this.g.abort(), this.j = !1, this.m = e || 7, X(this, "complete"), X(this, "abort"), Mt(this))
                }, e.N = function () {
                    this.g && (this.h && (this.h = !1, this.j = !0, this.g.abort(), this.j = !1), Mt(this, !0)), At.aa.N.call(this)
                }, e.Ea = function () {
                    this.s || (this.B || this.u || this.j ? Lt(this) : this.bb())
                }, e.bb = function () {
                    Lt(this)
                }, e.isActive = function () {
                    return !!this.g
                }, e.Z = function () {
                    try {
                        return 2 < Vt(this) ? this.g.status : -1
                    } catch (e) {
                        return -1
                    }
                }, e.oa = function () {
                    try {
                        return this.g ? this.g.responseText : ""
                    } catch (e) {
                        return ""
                    }
                }, e.Oa = function (e) {
                    if (this.g) {
                        var t = this.g.responseText;
                        return e && 0 == t.indexOf(e) && (t = t.substring(e.length)), ae(t)
                    }
                }, e.Ba = function () {
                    return this.m
                }, e.Ka = function () {
                    return "string" == typeof this.l ? this.l : String(this.l)
                }, (e = Bt.prototype).la = 8, e.G = 1, e.connect = function (e, t, n, r) {
                    _e(0), this.W = e, this.H = t || {}, n && void 0 !== r && (this.H.OSID = n, this.H.OAID = r), this.F = this.X, this.I = rn(this, null, this.W), Gt(this)
                }, e.Ga = function (t) {
                    if (this.s)
                        if (this.s = null, 1 == this.G) {
                            if (!t) {
                                this.U = Math.floor(1e5 * Math.random()), t = this.U++;
                                const s = new Ce(this, this.j, t);
                                let e = this.o;
                                if (this.S && (e ? (e = y(e), w(e, this.S)) : e = this.S), null !== this.m || this.O || (s.H = e, e = null), this.P) e: {
                                    for (var n = 0, r = 0; r < this.i.length; r++) {
                                        var i = this.i[r];
                                        if ("__data__" in i.map && "string" == typeof (i = i.map.__data__) ? i = i.length : i = void 0, void 0 === i) break;
                                        if (4096 < (n += i)) {
                                            n = r;
                                            break e
                                        }
                                        if (4096 === n || r === this.i.length - 1) {
                                            n = r + 1;
                                            break e
                                        }
                                    }
                                    n = 1e3
                                }
                                else n = 1e3;
                                n = Qt(this, s, n), rt(r = Ze(this.I), "RID", t), rt(r, "CVER", 22), this.D && rt(r, "X-HTTP-Session-Id", this.D), $t(this, r), e && (this.O ? n = "headers=" + encodeURIComponent(String(Dt(e))) + "&" + n : this.m && Ct(r, this.m, e)), Qe(this.h, s), this.Ua && rt(r, "TYPE", "init"), this.P ? (rt(r, "$req", n), rt(r, "SID", "null"), s.T = !0, Oe(s, r, null)) : Oe(s, r, n), this.G = 2
                            }
                        } else 3 == this.G && (t ? zt(this, t) : 0 == this.i.length || Ge(this.h) || zt(this))
                }, e.Fa = function () {
                    var e;
                    this.u = null, Yt(this), this.ba && !(this.M || null == this.g || this.R <= 0) && (e = 2 * this.R, this.j.info("BP detection timer enabled: " + e), this.A = Ie(p(this.ab, this), e))
                }, e.ab = function () {
                    this.A && (this.A = null, this.j.info("BP detection timeout reached."), this.j.info("Buffering proxy detected and switch to long-polling!"), this.F = !1, this.M = !0, _e(10), jt(this), Yt(this))
                }, e.Za = function () {
                    null != this.C && (this.C = null, jt(this), Wt(this), _e(19))
                }, e.fb = function (e) {
                    e ? (this.j.info("Successfully pinged google.com"), _e(2)) : (this.j.info("Failed to ping google.com"), _e(1))
                }, e.isActive = function () {
                    return !!this.l && this.l.isActive(this)
                }, (e = an.prototype).ua = function () {}, e.ta = function () {}, e.sa = function () {}, e.ra = function () {}, e.isActive = function () {
                    return !0
                }, e.Na = function () {}, on.prototype.g = function (e, t) {
                    return new un(e, t)
                }, t(un, Y), un.prototype.m = function () {
                    this.g.l = this.j, this.v && (this.g.J = !0), this.g.connect(this.l, this.h || void 0)
                }, un.prototype.close = function () {
                    qt(this.g)
                }, un.prototype.o = function (e) {
                    var t, n = this.g;
                    "string" == typeof e ? ((t = {}).__data__ = e, e = t) : this.u && ((t = {}).__data__ = se(e), e = t), n.i.push(new je(n.Ya++, e)), 3 == n.G && Gt(n)
                }, un.prototype.N = function () {
                    this.g.l = null, delete this.j, qt(this.g), delete this.g, un.aa.N.call(this)
                }, t(cn, de), t(hn, fe), t(ln, an), ln.prototype.ua = function () {
                    X(this.g, "a")
                }, ln.prototype.ta = function (e) {
                    X(this.g, new cn(e))
                }, ln.prototype.sa = function (e) {
                    X(this.g, new hn)
                }, ln.prototype.ra = function () {
                    X(this.g, "b")
                }, on.prototype.createWebChannel = on.prototype.g, un.prototype.send = un.prototype.o, un.prototype.open = un.prototype.m, wn = function () {
                    return new on
                }, vn = pe, yn = ge, pn = {
                    mb: 0,
                    pb: 1,
                    qb: 2,
                    Jb: 3,
                    Ob: 4,
                    Lb: 5,
                    Mb: 6,
                    Kb: 7,
                    Ib: 8,
                    Nb: 9,
                    PROXY: 10,
                    NOPROXY: 11,
                    Gb: 12,
                    Cb: 13,
                    Db: 14,
                    Bb: 15,
                    Eb: 16,
                    Fb: 17,
                    ib: 18,
                    hb: 19,
                    jb: 20
                }, Se.NO_ERROR = 0, Se.TIMEOUT = 8, Se.HTTP_ERROR = 6, mn = Se, xe.COMPLETE = "complete", gn = xe, (he.EventType = le).OPEN = "a", le.CLOSE = "b", le.ERROR = "c", le.MESSAGE = "d", Y.prototype.listen = Y.prototype.K, fn = he, At.prototype.listenOnce = At.prototype.L, At.prototype.getLastError = At.prototype.Ka, At.prototype.getLastErrorCode = At.prototype.Ba, At.prototype.getStatus = At.prototype.Z, At.prototype.getResponseJson = At.prototype.Oa, At.prototype.getResponseText = At.prototype.oa, At.prototype.send = At.prototype.ea, At.prototype.setWithCredentials = At.prototype.Ha, dn = At
            }).apply(void 0 !== _n ? _n : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
            const A = "@firebase/firestore";
            class N {
                constructor(e) {
                    this.uid = e
                }
                isAuthenticated() {
                    return null != this.uid
                }
                toKey() {
                    return this.isAuthenticated() ? "uid:" + this.uid : "anonymous-user"
                }
                isEqual(e) {
                    return e.uid === this.uid
                }
            }
            N.UNAUTHENTICATED = new N(null), N.GOOGLE_CREDENTIALS = new N("google-credentials-uid"), N.FIRST_PARTY = new N("first-party-uid"), N.MOCK_USER = new N("mock-user");
            let k = "11.0.1";
            const R = new class {
                constructor(e) {
                    this.name = e, this._logLevel = _, this._logHandler = I, this._userLogHandler = null
                }
                get logLevel() {
                    return this._logLevel
                }
                set logLevel(e) {
                    if (!(e in l)) throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);
                    this._logLevel = e
                }
                setLogLevel(e) {
                    this._logLevel = "string" == typeof e ? w[e] : e
                }
                get logHandler() {
                    return this._logHandler
                }
                set logHandler(e) {
                    if ("function" != typeof e) throw new TypeError("Value assigned to `logHandler` must be a function");
                    this._logHandler = e
                }
                get userLogHandler() {
                    return this._userLogHandler
                }
                set userLogHandler(e) {
                    this._userLogHandler = e
                }
                debug(...e) {
                    this._userLogHandler && this._userLogHandler(this, l.DEBUG, ...e), this._logHandler(this, l.DEBUG, ...e)
                }
                log(...e) {
                    this._userLogHandler && this._userLogHandler(this, l.VERBOSE, ...e), this._logHandler(this, l.VERBOSE, ...e)
                }
                info(...e) {
                    this._userLogHandler && this._userLogHandler(this, l.INFO, ...e), this._logHandler(this, l.INFO, ...e)
                }
                warn(...e) {
                    this._userLogHandler && this._userLogHandler(this, l.WARN, ...e), this._logHandler(this, l.WARN, ...e)
                }
                error(...e) {
                    this._userLogHandler && this._userLogHandler(this, l.ERROR, ...e), this._logHandler(this, l.ERROR, ...e)
                }
            }("@firebase/firestore");

            function O() {
                return R.logLevel
            }

            function L(e, ...t) {
                var n;
                R.logLevel <= l.DEBUG && (n = t.map(V), R.debug(`Firestore (${k}): ${e}`, ...n))
            }

            function M(e, ...t) {
                var n;
                R.logLevel <= l.ERROR && (n = t.map(V), R.error(`Firestore (${k}): ${e}`, ...n))
            }

            function F(e, ...t) {
                var n;
                R.logLevel <= l.WARN && (n = t.map(V), R.warn(`Firestore (${k}): ${e}`, ...n))
            }

            function V(t) {
                if ("string" == typeof t) return t;
                try {
                    return JSON.stringify(t)
                } catch (e) {
                    return t
                }
            }

            function P(e = "Unexpected state") {
                var t = `FIRESTORE (${k}) INTERNAL ASSERTION FAILED: ` + e;
                throw M(t), new Error(t)
            }

            function U(e) {
                e || P()
            }
            const B = {
                OK: "ok",
                CANCELLED: "cancelled",
                UNKNOWN: "unknown",
                INVALID_ARGUMENT: "invalid-argument",
                DEADLINE_EXCEEDED: "deadline-exceeded",
                NOT_FOUND: "not-found",
                ALREADY_EXISTS: "already-exists",
                PERMISSION_DENIED: "permission-denied",
                UNAUTHENTICATED: "unauthenticated",
                RESOURCE_EXHAUSTED: "resource-exhausted",
                FAILED_PRECONDITION: "failed-precondition",
                ABORTED: "aborted",
                OUT_OF_RANGE: "out-of-range",
                UNIMPLEMENTED: "unimplemented",
                INTERNAL: "internal",
                UNAVAILABLE: "unavailable",
                DATA_LOSS: "data-loss"
            };
            class q extends d {
                constructor(e, t) {
                    super(e, t), this.code = e, this.message = t, this.toString = () => `${this.name}: [code=${this.code}]: ${this.message}`
                }
            }
            class j {
                constructor() {
                    this.promise = new Promise((e, t) => {
                        this.resolve = e, this.reject = t
                    })
                }
            }
            class K {
                constructor(e, t) {
                    this.user = t, this.type = "OAuth", this.headers = new Map, this.headers.set("Authorization", `Bearer ${e}`)
                }
            }
            class G {
                getToken() {
                    return Promise.resolve(null)
                }
                invalidateToken() {}
                start(e, t) {
                    e.enqueueRetryable(() => t(N.UNAUTHENTICATED))
                }
                shutdown() {}
            }
            class z {
                constructor(e) {
                    this.token = e, this.changeListener = null
                }
                getToken() {
                    return Promise.resolve(this.token)
                }
                invalidateToken() {}
                start(e, t) {
                    this.changeListener = t, e.enqueueRetryable(() => t(this.token.user))
                }
                shutdown() {
                    this.changeListener = null
                }
            }
            class $ {
                constructor(e) {
                    this.t = e, this.currentUser = N.UNAUTHENTICATED, this.i = 0, this.forceRefresh = !1, this.auth = null
                }
                start(t, n) {
                    U(void 0 === this.o);
                    let r = this.i;
                    const i = e => this.i !== r ? (r = this.i, n(e)) : Promise.resolve();
                    let s = new j;
                    this.o = () => {
                        this.i++, this.currentUser = this.u(), s.resolve(), s = new j, t.enqueueRetryable(() => i(this.currentUser))
                    };
                    const a = () => {
                            const e = s;
                            t.enqueueRetryable(async () => {
                                await e.promise, await i(this.currentUser)
                            })
                        },
                        o = e => {
                            L("FirebaseAuthCredentialsProvider", "Auth detected"), this.auth = e, this.o && (this.auth.addAuthTokenListener(this.o), a())
                        };
                    this.t.onInit(e => o(e)), setTimeout(() => {
                        var e;
                        this.auth || ((e = this.t.getImmediate({
                            optional: !0
                        })) ? o(e) : (L("FirebaseAuthCredentialsProvider", "Auth not yet detected"), s.resolve(), s = new j))
                    }, 0), a()
                }
                getToken() {
                    const t = this.i,
                        e = this.forceRefresh;
                    return this.forceRefresh = !1, this.auth ? this.auth.getToken(e).then(e => this.i !== t ? (L("FirebaseAuthCredentialsProvider", "getToken aborted due to token change."), this.getToken()) : e ? (U("string" == typeof e.accessToken), new K(e.accessToken, this.currentUser)) : null) : Promise.resolve(null)
                }
                invalidateToken() {
                    this.forceRefresh = !0
                }
                shutdown() {
                    this.auth && this.o && this.auth.removeAuthTokenListener(this.o), this.o = void 0
                }
                u() {
                    var e = this.auth && this.auth.getUid();
                    return U(null === e || "string" == typeof e), new N(e)
                }
            }
            class Q {
                constructor(e, t, n) {
                    this.l = e, this.h = t, this.P = n, this.type = "FirstParty", this.user = N.FIRST_PARTY, this.I = new Map
                }
                T() {
                    return this.P ? this.P() : null
                }
                get headers() {
                    this.I.set("X-Goog-AuthUser", this.l);
                    var e = this.T();
                    return e && this.I.set("Authorization", e), this.h && this.I.set("X-Goog-Iam-Authorization-Token", this.h), this.I
                }
            }
            class H {
                constructor(e, t, n) {
                    this.l = e, this.h = t, this.P = n
                }
                getToken() {
                    return Promise.resolve(new Q(this.l, this.h, this.P))
                }
                start(e, t) {
                    e.enqueueRetryable(() => t(N.FIRST_PARTY))
                }
                shutdown() {}
                invalidateToken() {}
            }
            class W {
                constructor(e) {
                    this.value = e, this.type = "AppCheck", this.headers = new Map, e && 0 < e.length && this.headers.set("x-firebase-appcheck", this.value)
                }
            }
            class J {
                constructor(e) {
                    this.A = e, this.forceRefresh = !1, this.appCheck = null, this.R = null
                }
                start(t, n) {
                    U(void 0 === this.o);
                    const r = e => {
                        null != e.error && L("FirebaseAppCheckTokenProvider", `Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);
                        var t = e.token !== this.R;
                        return this.R = e.token, L("FirebaseAppCheckTokenProvider", `Received ${t?"new":"existing"} token.`), t ? n(e.token) : Promise.resolve()
                    };
                    this.o = e => {
                        t.enqueueRetryable(() => r(e))
                    };
                    const i = e => {
                        L("FirebaseAppCheckTokenProvider", "AppCheck detected"), this.appCheck = e, this.o && this.appCheck.addTokenListener(this.o)
                    };
                    this.A.onInit(e => i(e)), setTimeout(() => {
                        var e;
                        this.appCheck || ((e = this.A.getImmediate({
                            optional: !0
                        })) ? i(e) : L("FirebaseAppCheckTokenProvider", "AppCheck not yet detected"))
                    }, 0)
                }
                getToken() {
                    var e = this.forceRefresh;
                    return this.forceRefresh = !1, this.appCheck ? this.appCheck.getToken(e).then(e => e ? (U("string" == typeof e.token), this.R = e.token, new W(e.token)) : null) : Promise.resolve(null)
                }
                invalidateToken() {
                    this.forceRefresh = !0
                }
                shutdown() {
                    this.appCheck && this.o && this.appCheck.removeTokenListener(this.o), this.o = void 0
                }
            }
            class Y {
                static newId() {
                    var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
                        n = Math.floor(256 / t.length) * t.length;
                    let r = "";
                    for (; r.length < 20;) {
                        var i = function (t) {
                            const n = "undefined" != typeof self && (self.crypto || self.msCrypto),
                                r = new Uint8Array(t);
                            if (n && "function" == typeof n.getRandomValues) n.getRandomValues(r);
                            else
                                for (let e = 0; e < t; e++) r[e] = Math.floor(256 * Math.random());
                            return r
                        }(40);
                        for (let e = 0; e < i.length; ++e) r.length < 20 && i[e] < n && (r += t.charAt(i[e] % t.length))
                    }
                    return r
                }
            }

            function X(e, t) {
                return e < t ? -1 : t < e ? 1 : 0
            }

            function Z(e, n, r) {
                return e.length === n.length && e.every((e, t) => r(e, n[t]))
            }

            function ee(e) {
                return e + "\0"
            }
            class te {
                constructor(e, t) {
                    if (this.seconds = e, (this.nanoseconds = t) < 0) throw new q(B.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + t);
                    if (1e9 <= t) throw new q(B.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + t);
                    if (e < -62135596800) throw new q(B.INVALID_ARGUMENT, "Timestamp seconds out of range: " + e);
                    if (253402300800 <= e) throw new q(B.INVALID_ARGUMENT, "Timestamp seconds out of range: " + e)
                }
                static now() {
                    return te.fromMillis(Date.now())
                }
                static fromDate(e) {
                    return te.fromMillis(e.getTime())
                }
                static fromMillis(e) {
                    var t = Math.floor(e / 1e3),
                        n = Math.floor(1e6 * (e - 1e3 * t));
                    return new te(t, n)
                }
                toDate() {
                    return new Date(this.toMillis())
                }
                toMillis() {
                    return 1e3 * this.seconds + this.nanoseconds / 1e6
                }
                _compareTo(e) {
                    return this.seconds === e.seconds ? X(this.nanoseconds, e.nanoseconds) : X(this.seconds, e.seconds)
                }
                isEqual(e) {
                    return e.seconds === this.seconds && e.nanoseconds === this.nanoseconds
                }
                toString() {
                    return "Timestamp(seconds=" + this.seconds + ", nanoseconds=" + this.nanoseconds + ")"
                }
                toJSON() {
                    return {
                        seconds: this.seconds,
                        nanoseconds: this.nanoseconds
                    }
                }
                valueOf() {
                    var e = this.seconds - -62135596800;
                    return String(e).padStart(12, "0") + "." + String(this.nanoseconds).padStart(9, "0")
                }
            }
            class ne {
                constructor(e) {
                    this.timestamp = e
                }
                static fromTimestamp(e) {
                    return new ne(e)
                }
                static min() {
                    return new ne(new te(0, 0))
                }
                static max() {
                    return new ne(new te(253402300799, 999999999))
                }
                compareTo(e) {
                    return this.timestamp._compareTo(e.timestamp)
                }
                isEqual(e) {
                    return this.timestamp.isEqual(e.timestamp)
                }
                toMicroseconds() {
                    return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3
                }
                toString() {
                    return "SnapshotVersion(" + this.timestamp.toString() + ")"
                }
                toTimestamp() {
                    return this.timestamp
                }
            }
            class re {
                constructor(e, t, n) {
                    void 0 === t ? t = 0 : t > e.length && P(), void 0 === n ? n = e.length - t : n > e.length - t && P(), this.segments = e, this.offset = t, this.len = n
                }
                get length() {
                    return this.len
                }
                isEqual(e) {
                    return 0 === re.comparator(this, e)
                }
                child(e) {
                    const t = this.segments.slice(this.offset, this.limit());
                    return e instanceof re ? e.forEach(e => {
                        t.push(e)
                    }) : t.push(e), this.construct(t)
                }
                limit() {
                    return this.offset + this.length
                }
                popFirst(e) {
                    return this.construct(this.segments, this.offset + (e = void 0 === e ? 1 : e), this.length - e)
                }
                popLast() {
                    return this.construct(this.segments, this.offset, this.length - 1)
                }
                firstSegment() {
                    return this.segments[this.offset]
                }
                lastSegment() {
                    return this.get(this.length - 1)
                }
                get(e) {
                    return this.segments[this.offset + e]
                }
                isEmpty() {
                    return 0 === this.length
                }
                isPrefixOf(e) {
                    if (e.length < this.length) return !1;
                    for (let t = 0; t < this.length; t++)
                        if (this.get(t) !== e.get(t)) return !1;
                    return !0
                }
                isImmediateParentOf(e) {
                    if (this.length + 1 !== e.length) return !1;
                    for (let t = 0; t < this.length; t++)
                        if (this.get(t) !== e.get(t)) return !1;
                    return !0
                }
                forEach(e) {
                    for (let t = this.offset, n = this.limit(); t < n; t++) e(this.segments[t])
                }
                toArray() {
                    return this.segments.slice(this.offset, this.limit())
                }
                static comparator(e, t) {
                    const n = Math.min(e.length, t.length);
                    for (let r = 0; r < n; r++) {
                        const n = e.get(r),
                            i = t.get(r);
                        if (n < i) return -1;
                        if (n > i) return 1
                    }
                    return e.length < t.length ? -1 : e.length > t.length ? 1 : 0
                }
            }
            class ie extends re {
                construct(e, t, n) {
                    return new ie(e, t, n)
                }
                canonicalString() {
                    return this.toArray().join("/")
                }
                toString() {
                    return this.canonicalString()
                }
                toUriEncodedString() {
                    return this.toArray().map(encodeURIComponent).join("/")
                }
                static fromString(...e) {
                    const t = [];
                    for (const n of e) {
                        if (0 <= n.indexOf("//")) throw new q(B.INVALID_ARGUMENT, `Invalid segment (${n}). Paths must not contain // in them.`);
                        t.push(...n.split("/").filter(e => 0 < e.length))
                    }
                    return new ie(t)
                }
                static emptyPath() {
                    return new ie([])
                }
            }
            const se = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
            class ae extends re {
                construct(e, t, n) {
                    return new ae(e, t, n)
                }
                static isValidIdentifier(e) {
                    return se.test(e)
                }
                canonicalString() {
                    return this.toArray().map(e => (e = e.replace(/\\/g, "\\\\").replace(/`/g, "\\`"), e = !ae.isValidIdentifier(e) ? "`" + e + "`" : e)).join(".")
                }
                toString() {
                    return this.canonicalString()
                }
                isKeyField() {
                    return 1 === this.length && "__name__" === this.get(0)
                }
                static keyField() {
                    return new ae(["__name__"])
                }
                static fromServerFormat(e) {
                    const t = [];
                    let n = "",
                        r = 0;
                    var i = () => {
                        if (0 === n.length) throw new q(B.INVALID_ARGUMENT, `Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);
                        t.push(n), n = ""
                    };
                    let s = !1;
                    for (; r < e.length;) {
                        const t = e[r];
                        if ("\\" === t) {
                            if (r + 1 === e.length) throw new q(B.INVALID_ARGUMENT, "Path has trailing escape character: " + e);
                            const t = e[r + 1];
                            if ("\\" !== t && "." !== t && "`" !== t) throw new q(B.INVALID_ARGUMENT, "Path has invalid escape sequence: " + e);
                            n += t, r += 2
                        } else "`" === t ? s = !s : "." !== t || s ? n += t : i(), r++
                    }
                    if (i(), s) throw new q(B.INVALID_ARGUMENT, "Unterminated ` in path: " + e);
                    return new ae(t)
                }
                static emptyPath() {
                    return new ae([])
                }
            }
            class oe {
                constructor(e) {
                    this.path = e
                }
                static fromPath(e) {
                    return new oe(ie.fromString(e))
                }
                static fromName(e) {
                    return new oe(ie.fromString(e).popFirst(5))
                }
                static empty() {
                    return new oe(ie.emptyPath())
                }
                get collectionGroup() {
                    return this.path.popLast().lastSegment()
                }
                hasCollectionId(e) {
                    return 2 <= this.path.length && this.path.get(this.path.length - 2) === e
                }
                getCollectionGroup() {
                    return this.path.get(this.path.length - 2)
                }
                getCollectionPath() {
                    return this.path.popLast()
                }
                isEqual(e) {
                    return null !== e && 0 === ie.comparator(this.path, e.path)
                }
                toString() {
                    return this.path.toString()
                }
                static comparator(e, t) {
                    return ie.comparator(e.path, t.path)
                }
                static isDocumentKey(e) {
                    return e.length % 2 == 0
                }
                static fromSegments(e) {
                    return new oe(new ie(e.slice()))
                }
            }
            class ue {
                constructor(e, t, n, r) {
                    this.indexId = e, this.collectionGroup = t, this.fields = n, this.indexState = r
                }
            }

            function ce(e) {
                return e.fields.find(e => 2 === e.kind)
            }

            function he(e) {
                return e.fields.filter(e => 2 !== e.kind)
            }
            ue.UNKNOWN_ID = -1;
            class le {
                constructor(e, t) {
                    this.fieldPath = e, this.kind = t
                }
            }
            class de {
                constructor(e, t) {
                    this.sequenceNumber = e, this.offset = t
                }
                static empty() {
                    return new de(0, me.min())
                }
            }

            function fe(e, t) {
                var n = e.toTimestamp().seconds,
                    r = e.toTimestamp().nanoseconds + 1,
                    r = ne.fromTimestamp(1e9 === r ? new te(n + 1, 0) : new te(n, r));
                return new me(r, oe.empty(), t)
            }

            function ge(e) {
                return new me(e.readTime, e.key, -1)
            }
            class me {
                constructor(e, t, n) {
                    this.readTime = e, this.documentKey = t, this.largestBatchId = n
                }
                static min() {
                    return new me(ne.min(), oe.empty(), -1)
                }
                static max() {
                    return new me(ne.max(), oe.empty(), -1)
                }
            }

            function pe(e, t) {
                let n = e.readTime.compareTo(t.readTime);
                return 0 !== n ? n : (n = oe.comparator(e.documentKey, t.documentKey), 0 !== n ? n : X(e.largestBatchId, t.largestBatchId))
            }
            const ye = "The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";
            class ve {
                constructor() {
                    this.onCommittedListeners = []
                }
                addOnCommittedListener(e) {
                    this.onCommittedListeners.push(e)
                }
                raiseOnCommittedEvent() {
                    this.onCommittedListeners.forEach(e => e())
                }
            }
            async function we(e) {
                if (e.code !== B.FAILED_PRECONDITION || e.message !== ye) throw e;
                L("LocalStore", "Unexpectedly lost primary lease")
            }
            class _e {
                constructor(e) {
                    this.nextCallback = null, this.catchCallback = null, this.result = void 0, this.error = void 0, this.isDone = !1, this.callbackAttached = !1, e(e => {
                        this.isDone = !0, this.result = e, this.nextCallback && this.nextCallback(e)
                    }, e => {
                        this.isDone = !0, this.error = e, this.catchCallback && this.catchCallback(e)
                    })
                } catch (e) {
                    return this.next(void 0, e)
                }
                next(r, i) {
                    return this.callbackAttached && P(), this.callbackAttached = !0, this.isDone ? this.error ? this.wrapFailure(i, this.error) : this.wrapSuccess(r, this.result) : new _e((t, n) => {
                        this.nextCallback = e => {
                            this.wrapSuccess(r, e).next(t, n)
                        }, this.catchCallback = e => {
                            this.wrapFailure(i, e).next(t, n)
                        }
                    })
                }
                toPromise() {
                    return new Promise((e, t) => {
                        this.next(e, t)
                    })
                }
                wrapUserFunction(e) {
                    try {
                        var t = e();
                        return t instanceof _e ? t : _e.resolve(t)
                    } catch (e) {
                        return _e.reject(e)
                    }
                }
                wrapSuccess(e, t) {
                    return e ? this.wrapUserFunction(() => e(t)) : _e.resolve(t)
                }
                wrapFailure(e, t) {
                    return e ? this.wrapUserFunction(() => e(t)) : _e.reject(t)
                }
                static resolve(n) {
                    return new _e((e, t) => {
                        e(n)
                    })
                }
                static reject(n) {
                    return new _e((e, t) => {
                        t(n)
                    })
                }
                static waitFor(e) {
                    return new _e((t, n) => {
                        let r = 0,
                            i = 0,
                            s = !1;
                        e.forEach(e => {
                            ++r, e.next(() => {
                                ++i, s && i === r && t()
                            }, e => n(e))
                        }), s = !0, i === r && t()
                    })
                }
                static or(e) {
                    let t = _e.resolve(!1);
                    for (const n of e) t = t.next(e => e ? _e.resolve(e) : n());
                    return t
                }
                static forEach(e, n) {
                    const r = [];
                    return e.forEach((e, t) => {
                        r.push(n.call(this, e, t))
                    }), this.waitFor(r)
                }
                static mapArray(o, u) {
                    return new _e((t, n) => {
                        const r = o.length,
                            i = new Array(r);
                        let s = 0;
                        for (let e = 0; e < r; e++) {
                            const a = e;
                            u(o[a]).next(e => {
                                i[a] = e, ++s, s === r && t(i)
                            }, e => n(e))
                        }
                    })
                }
                static doWhile(r, i) {
                    return new _e((e, t) => {
                        const n = () => {
                            !0 === r() ? i().next(() => {
                                n()
                            }, t) : e()
                        };
                        n()
                    })
                }
            }
            class be {
                constructor(n, e) {
                    this.action = n, this.transaction = e, this.aborted = !1, this.V = new j, this.transaction.oncomplete = () => {
                        this.V.resolve()
                    }, this.transaction.onabort = () => {
                        e.error ? this.V.reject(new Se(n, e.error)) : this.V.resolve()
                    }, this.transaction.onerror = e => {
                        var t = Ne(e.target.error);
                        this.V.reject(new Se(n, t))
                    }
                }
                static open(e, t, n, r) {
                    try {
                        return new be(t, e.transaction(r, n))
                    } catch (e) {
                        throw new Se(t, e)
                    }
                }
                get m() {
                    return this.V.promise
                }
                abort(e) {
                    e && this.V.reject(e), this.aborted || (L("SimpleDb", "Aborting transaction:", e ? e.message : "Client-initiated abort"), this.aborted = !0, this.transaction.abort())
                }
                g() {
                    const e = this.transaction;
                    this.aborted || "function" != typeof e.commit || e.commit()
                }
                store(e) {
                    var t = this.transaction.objectStore(e);
                    return new De(t)
                }
            }
            class Ie {
                constructor(e, t, n) {
                    this.name = e, this.version = t, this.p = n, 12.2 === Ie.S(u()) && M("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")
                }
                static delete(e) {
                    return L("SimpleDb", "Removing database:", e), Ce(window.indexedDB.deleteDatabase(e)).toPromise()
                }
                static D() {
                    if (! function () {
                            try {
                                return "object" == typeof indexedDB
                            } catch (e) {
                                return
                            }
                        }()) return !1;
                    if (Ie.v()) return !0;
                    const e = u(),
                        t = Ie.S(e),
                        n = 0 < t && t < 10,
                        r = Te(e),
                        i = 0 < r && r < 4.5;
                    return !(0 < e.indexOf("MSIE ") || 0 < e.indexOf("Trident/") || 0 < e.indexOf("Edge/") || n || i)
                }
                static v() {
                    var e;
                    return "undefined" != typeof process && "YES" === (null === (e = process.__PRIVATE_env) || void 0 === e ? void 0 : e.C)
                }
                static F(e, t) {
                    return e.store(t)
                }
                static S(e) {
                    const t = e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),
                        n = t ? t[1].split("_").slice(0, 2).join(".") : "-1";
                    return Number(n)
                }
                async M(s) {
                    return this.db || (L("SimpleDb", "Opening database:", this.name), this.db = await new Promise((n, r) => {
                        const i = indexedDB.open(this.name, this.version);
                        i.onsuccess = e => {
                            var t = e.target.result;
                            n(t)
                        }, i.onblocked = () => {
                            r(new Se(s, "Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))
                        }, i.onerror = e => {
                            var t = e.target.error;
                            "VersionError" === t.name ? r(new q(B.FAILED_PRECONDITION, "A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")) : "InvalidStateError" === t.name ? r(new q(B.FAILED_PRECONDITION, "Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: " + t)) : r(new Se(s, t))
                        }, i.onupgradeneeded = e => {
                            L("SimpleDb", 'Database "' + this.name + '" requires upgrade from version:', e.oldVersion);
                            var t = e.target.result;
                            this.p.O(t, i.transaction, e.oldVersion, this.version).next(() => {
                                L("SimpleDb", "Database upgrade to version " + this.version + " complete")
                            })
                        }
                    })), this.N && (this.db.onversionchange = e => this.N(e)), this.db
                }
                L(t) {
                    this.N = t, this.db && (this.db.onversionchange = e => t(e))
                }
                async runTransaction(e, t, n, r) {
                    var i = "readonly" === t;
                    let s = 0;
                    for (;;) {
                        ++s;
                        try {
                            this.db = await this.M(e);
                            const t = be.open(this.db, e, i ? "readonly" : "readwrite", n),
                                s = r(t).next(e => (t.g(), e)).catch(e => (t.abort(e), _e.reject(e))).toPromise();
                            return s.catch(() => {}), await t.m, s
                        } catch (e) {
                            const t = e,
                                n = "FirebaseError" !== t.name && s < 3;
                            if (L("SimpleDb", "Transaction failed with error:", t.message, "Retrying:", n), this.close(), !n) return Promise.reject(t)
                        }
                    }
                }
                close() {
                    this.db && this.db.close(), this.db = void 0
                }
            }

            function Te(e) {
                const t = e.match(/Android ([\d.]+)/i),
                    n = t ? t[1].split(".").slice(0, 2).join(".") : "-1";
                return Number(n)
            }
            class Ee {
                constructor(e) {
                    this.B = e, this.k = !1, this.q = null
                }
                get isDone() {
                    return this.k
                }
                get K() {
                    return this.q
                }
                set cursor(e) {
                    this.B = e
                }
                done() {
                    this.k = !0
                }
                $(e) {
                    this.q = e
                }
                delete() {
                    return Ce(this.B.delete())
                }
            }
            class Se extends q {
                constructor(e, t) {
                    super(B.UNAVAILABLE, `IndexedDB transaction '${e}' failed: ${t}`), this.name = "IndexedDbTransactionError"
                }
            }

            function xe(e) {
                return "IndexedDbTransactionError" === e.name
            }
            class De {
                constructor(e) {
                    this.store = e
                }
                put(e, t) {
                    let n;
                    return n = void 0 !== t ? (L("SimpleDb", "PUT", this.store.name, e, t), this.store.put(t, e)) : (L("SimpleDb", "PUT", this.store.name, "<auto-key>", e), this.store.put(e)), Ce(n)
                }
                add(e) {
                    return L("SimpleDb", "ADD", this.store.name, e, e), Ce(this.store.add(e))
                }
                get(t) {
                    return Ce(this.store.get(t)).next(e => (L("SimpleDb", "GET", this.store.name, t, e = void 0 === e ? null : e), e))
                }
                delete(e) {
                    return L("SimpleDb", "DELETE", this.store.name, e), Ce(this.store.delete(e))
                }
                count() {
                    return L("SimpleDb", "COUNT", this.store.name), Ce(this.store.count())
                }
                U(e, n) {
                    const t = this.options(e, n),
                        r = t.index ? this.store.index(t.index) : this.store;
                    if ("function" == typeof r.getAll) {
                        const e = r.getAll(t.range);
                        return new _e((t, n) => {
                            e.onerror = e => {
                                n(e.target.error)
                            }, e.onsuccess = e => {
                                t(e.target.result)
                            }
                        })
                    } {
                        const e = this.cursor(t),
                            n = [];
                        return this.W(e, (e, t) => {
                            n.push(t)
                        }).next(() => n)
                    }
                }
                G(e, t) {
                    const r = this.store.getAll(e, null === t ? void 0 : t);
                    return new _e((t, n) => {
                        r.onerror = e => {
                            n(e.target.error)
                        }, r.onsuccess = e => {
                            t(e.target.result)
                        }
                    })
                }
                j(e, t) {
                    L("SimpleDb", "DELETE ALL", this.store.name);
                    const n = this.options(e, t);
                    n.H = !1;
                    var r = this.cursor(n);
                    return this.W(r, (e, t, n) => n.delete())
                }
                J(e, t) {
                    let n;
                    t ? n = e : (n = {}, t = e);
                    var r = this.cursor(n);
                    return this.W(r, t)
                }
                Y(i) {
                    const e = this.cursor({});
                    return new _e((n, r) => {
                        e.onerror = e => {
                            var t = Ne(e.target.error);
                            r(t)
                        }, e.onsuccess = e => {
                            const t = e.target.result;
                            t ? i(t.primaryKey, t.value).next(e => {
                                e ? t.continue() : n()
                            }) : n()
                        }
                    })
                }
                W(e, s) {
                    const a = [];
                    return new _e((i, t) => {
                        e.onerror = e => {
                            t(e.target.error)
                        }, e.onsuccess = e => {
                            const t = e.target.result;
                            if (t) {
                                const n = new Ee(t),
                                    r = s(t.primaryKey, t.value, n);
                                if (r instanceof _e) {
                                    const e = r.catch(e => (n.done(), _e.reject(e)));
                                    a.push(e)
                                }
                                n.isDone ? i() : null === n.K ? t.continue() : t.continue(n.K)
                            } else i()
                        }
                    }).next(() => _e.waitFor(a))
                }
                options(e, t) {
                    let n;
                    return void 0 !== e && ("string" == typeof e ? n = e : t = e), {
                        index: n,
                        range: t
                    }
                }
                cursor(e) {
                    let t = "next";
                    if (e.reverse && (t = "prev"), e.index) {
                        const n = this.store.index(e.index);
                        return e.H ? n.openKeyCursor(e.range, t) : n.openCursor(e.range, t)
                    }
                    return this.store.openCursor(e.range, t)
                }
            }

            function Ce(e) {
                return new _e((n, r) => {
                    e.onsuccess = e => {
                        var t = e.target.result;
                        n(t)
                    }, e.onerror = e => {
                        var t = Ne(e.target.error);
                        r(t)
                    }
                })
            }
            let Ae = !1;

            function Ne(e) {
                const t = Ie.S(u());
                if (12.2 <= t && t < 13) {
                    const t = "An internal error was encountered in the Indexed Database server";
                    if (0 <= e.message.indexOf(t)) {
                        const e = new q("internal", `IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);
                        return Ae || (Ae = !0, setTimeout(() => {
                            throw e
                        }, 0)), e
                    }
                }
                return e
            }
            class ke {
                constructor(e, t) {
                    this.asyncQueue = e, this.Z = t, this.task = null
                }
                start() {
                    this.X(15e3)
                }
                stop() {
                    this.task && (this.task.cancel(), this.task = null)
                }
                get started() {
                    return null !== this.task
                }
                X(e) {
                    L("IndexBackfiller", `Scheduled in ${e}ms`), this.task = this.asyncQueue.enqueueAfterDelay("index_backfill", e, async () => {
                        this.task = null;
                        try {
                            L("IndexBackfiller", `Documents written: ${await this.Z.ee()}`)
                        } catch (e) {
                            xe(e) ? L("IndexBackfiller", "Ignoring IndexedDB error during index backfill: ", e) : await we(e)
                        }
                        await this.X(6e4)
                    })
                }
            }
            class Re {
                constructor(e, t) {
                    this.localStore = e, this.persistence = t
                }
                async ee(t = 50) {
                    return this.persistence.runTransaction("Backfill Indexes", "readwrite-primary", e => this.te(e, t))
                }
                te(e, t) {
                    const n = new Set;
                    let r = t,
                        i = !0;
                    return _e.doWhile(() => !0 === i && 0 < r, () => this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(t => null === t || n.has(t) ? void(i = !1) : (L("IndexBackfiller", `Processing collection: ${t}`), this.ne(e, t, r).next(e => {
                        r -= e, n.add(t)
                    })))).next(() => t - r)
                }
                ne(r, i, e) {
                    return this.localStore.indexManager.getMinOffsetFromCollectionGroup(r, i).next(n => this.localStore.localDocuments.getNextDocuments(r, i, n, e).next(e => {
                        const t = e.changes;
                        return this.localStore.indexManager.updateIndexEntries(r, t).next(() => this.re(n, e)).next(e => (L("IndexBackfiller", `Updating offset: ${e}`), this.localStore.indexManager.updateCollectionGroup(r, i, e))).next(() => t.size)
                    }))
                }
                re(e, t) {
                    let r = e;
                    return t.changes.forEach((e, t) => {
                        var n = ge(t);
                        0 < pe(n, r) && (r = n)
                    }), new me(r.readTime, r.documentKey, Math.max(t.batchId, e.largestBatchId))
                }
            }
            class Oe {
                constructor(e, t) {
                    this.previousValue = e, t && (t.sequenceNumberHandler = e => this.ie(e), this.se = e => t.writeSequenceNumber(e))
                }
                ie(e) {
                    return this.previousValue = Math.max(e, this.previousValue), this.previousValue
                }
                next() {
                    var e = ++this.previousValue;
                    return this.se && this.se(e), e
                }
            }

            function Le(e) {
                return null == e
            }

            function Me(e) {
                return 0 === e && 1 / e == -1 / 0
            }

            function Fe(e) {
                return "number" == typeof e && Number.isInteger(e) && !Me(e) && e <= Number.MAX_SAFE_INTEGER && e >= Number.MIN_SAFE_INTEGER
            }

            function Ve(e) {
                let t = "";
                for (let n = 0; n < e.length; n++) 0 < t.length && (t = Pe(t)), t = function (e, t) {
                    let n = t;
                    const r = e.length;
                    for (let i = 0; i < r; i++) {
                        const r = e.charAt(i);
                        switch (r) {
                            case "\0":
                                n += "";
                                break;
                            case "":
                                n += "";
                                break;
                            default:
                                n += r
                        }
                    }
                    return n
                }(e.get(n), t);
                return Pe(t)
            }

            function Pe(e) {
                return e + ""
            }

            function Ue(t) {
                const n = t.length;
                if (U(2 <= n), 2 === n) return U("" === t.charAt(0) && "" === t.charAt(1)), ie.emptyPath();
                const __PRIVATE_lastReasonableEscapeIndex = n - 2,
                    r = [];
                let i = "";
                for (let a = 0; a < n;) {
                    const n = t.indexOf("", a);
                    switch ((n < 0 || n > __PRIVATE_lastReasonableEscapeIndex) && P(), t.charAt(n + 1)) {
                        case "":
                            var s = t.substring(a, n);
                            let e;
                            0 === i.length ? e = s : (i += s, e = i, i = ""), r.push(e);
                            break;
                        case "":
                            i += t.substring(a, n), i += "\0";
                            break;
                        case "":
                            i += t.substring(a, n + 1);
                            break;
                        default:
                            P()
                    }
                    a = n + 2
                }
                return new ie(r)
            }
            Oe.oe = -1;
            const Be = ["userId", "batchId"];

            function qe(e, t) {
                return [e, Ve(t)]
            }

            function je(e, t, n) {
                return [e, Ve(t), n]
            }
            const Ke = {},
                Ge = ["prefixPath", "collectionGroup", "readTime", "documentId"],
                ze = ["prefixPath", "collectionGroup", "documentId"],
                $e = ["collectionGroup", "readTime", "prefixPath", "documentId"],
                Qe = ["canonicalId", "targetId"],
                He = ["targetId", "path"],
                We = ["path", "targetId"],
                Je = ["collectionId", "parent"],
                Ye = ["indexId", "uid"],
                Xe = ["uid", "sequenceNumber"],
                Ze = ["indexId", "uid", "arrayValue", "directionalValue", "orderedDocumentKey", "documentKey"],
                et = ["indexId", "uid", "orderedDocumentKey"],
                tt = ["userId", "collectionPath", "documentId"],
                nt = ["userId", "collectionPath", "largestBatchId"],
                rt = ["userId", "collectionGroup", "largestBatchId"],
                it = ["mutationQueues", "mutations", "documentMutations", "remoteDocuments", "targets", "owner", "targetGlobal", "targetDocuments", "clientMetadata", "remoteDocumentGlobal", "collectionParents", "bundles", "namedQueries"],
                st = [...it, "documentOverlays"],
                at = ["mutationQueues", "mutations", "documentMutations", "remoteDocumentsV14", "targets", "owner", "targetGlobal", "targetDocuments", "clientMetadata", "remoteDocumentGlobal", "collectionParents", "bundles", "namedQueries", "documentOverlays"],
                ot = at,
                ut = [...ot, "indexConfiguration", "indexState", "indexEntries"],
                ct = ut,
                ht = [...ut, "globals"];
            class lt extends ve {
                constructor(e, t) {
                    super(), this._e = e, this.currentSequenceNumber = t
                }
            }

            function dt(e, t) {
                var n = e;
                return Ie.F(n._e, t)
            }

            function ft(e) {
                let t = 0;
                for (const n in e) Object.prototype.hasOwnProperty.call(e, n) && t++;
                return t
            }

            function gt(e, t) {
                for (const n in e) Object.prototype.hasOwnProperty.call(e, n) && t(n, e[n])
            }

            function mt(e) {
                for (const t in e)
                    if (Object.prototype.hasOwnProperty.call(e, t)) return !1;
                return !0
            }
            class pt {
                constructor(e, t) {
                    this.comparator = e, this.root = t || vt.EMPTY
                }
                insert(e, t) {
                    return new pt(this.comparator, this.root.insert(e, t, this.comparator).copy(null, null, vt.BLACK, null, null))
                }
                remove(e) {
                    return new pt(this.comparator, this.root.remove(e, this.comparator).copy(null, null, vt.BLACK, null, null))
                }
                get(e) {
                    let t = this.root;
                    for (; !t.isEmpty();) {
                        var n = this.comparator(e, t.key);
                        if (0 === n) return t.value;
                        n < 0 ? t = t.left : 0 < n && (t = t.right)
                    }
                    return null
                }
                indexOf(e) {
                    let t = 0,
                        n = this.root;
                    for (; !n.isEmpty();) {
                        var r = this.comparator(e, n.key);
                        if (0 === r) return t + n.left.size;
                        n = r < 0 ? n.left : (t += n.left.size + 1, n.right)
                    }
                    return -1
                }
                isEmpty() {
                    return this.root.isEmpty()
                }
                get size() {
                    return this.root.size
                }
                minKey() {
                    return this.root.minKey()
                }
                maxKey() {
                    return this.root.maxKey()
                }
                inorderTraversal(e) {
                    return this.root.inorderTraversal(e)
                }
                forEach(n) {
                    this.inorderTraversal((e, t) => (n(e, t), !1))
                }
                toString() {
                    const n = [];
                    return this.inorderTraversal((e, t) => (n.push(`${e}:${t}`), !1)), `{${n.join(", ")}}`
                }
                reverseTraversal(e) {
                    return this.root.reverseTraversal(e)
                }
                getIterator() {
                    return new yt(this.root, null, this.comparator, !1)
                }
                getIteratorFrom(e) {
                    return new yt(this.root, e, this.comparator, !1)
                }
                getReverseIterator() {
                    return new yt(this.root, null, this.comparator, !0)
                }
                getReverseIteratorFrom(e) {
                    return new yt(this.root, e, this.comparator, !0)
                }
            }
            class yt {
                constructor(e, t, n, r) {
                    this.isReverse = r, this.nodeStack = [];
                    let i = 1;
                    for (; !e.isEmpty();)
                        if (i = t ? n(e.key, t) : 1, t && r && (i *= -1), i < 0) e = this.isReverse ? e.left : e.right;
                        else {
                            if (0 === i) {
                                this.nodeStack.push(e);
                                break
                            }
                            this.nodeStack.push(e), e = this.isReverse ? e.right : e.left
                        }
                }
                getNext() {
                    let e = this.nodeStack.pop();
                    var t = {
                        key: e.key,
                        value: e.value
                    };
                    if (this.isReverse)
                        for (e = e.left; !e.isEmpty();) this.nodeStack.push(e), e = e.right;
                    else
                        for (e = e.right; !e.isEmpty();) this.nodeStack.push(e), e = e.left;
                    return t
                }
                hasNext() {
                    return 0 < this.nodeStack.length
                }
                peek() {
                    if (0 === this.nodeStack.length) return null;
                    var e = this.nodeStack[this.nodeStack.length - 1];
                    return {
                        key: e.key,
                        value: e.value
                    }
                }
            }
            class vt {
                constructor(e, t, n, r, i) {
                    this.key = e, this.value = t, this.color = null != n ? n : vt.RED, this.left = null != r ? r : vt.EMPTY, this.right = null != i ? i : vt.EMPTY, this.size = this.left.size + 1 + this.right.size
                }
                copy(e, t, n, r, i) {
                    return new vt(null != e ? e : this.key, null != t ? t : this.value, null != n ? n : this.color, null != r ? r : this.left, null != i ? i : this.right)
                }
                isEmpty() {
                    return !1
                }
                inorderTraversal(e) {
                    return this.left.inorderTraversal(e) || e(this.key, this.value) || this.right.inorderTraversal(e)
                }
                reverseTraversal(e) {
                    return this.right.reverseTraversal(e) || e(this.key, this.value) || this.left.reverseTraversal(e)
                }
                min() {
                    return this.left.isEmpty() ? this : this.left.min()
                }
                minKey() {
                    return this.min().key
                }
                maxKey() {
                    return this.right.isEmpty() ? this.key : this.right.maxKey()
                }
                insert(e, t, n) {
                    let r = this;
                    var i = n(e, r.key);
                    return r = i < 0 ? r.copy(null, null, null, r.left.insert(e, t, n), null) : 0 === i ? r.copy(null, t, null, null, null) : r.copy(null, null, null, null, r.right.insert(e, t, n)), r.fixUp()
                }
                removeMin() {
                    if (this.left.isEmpty()) return vt.EMPTY;
                    let e = this;
                    return e.left.isRed() || e.left.left.isRed() || (e = e.moveRedLeft()), e = e.copy(null, null, null, e.left.removeMin(), null), e.fixUp()
                }
                remove(e, t) {
                    let n, r = this;
                    if (t(e, r.key) < 0) r.left.isEmpty() || r.left.isRed() || r.left.left.isRed() || (r = r.moveRedLeft()), r = r.copy(null, null, null, r.left.remove(e, t), null);
                    else {
                        if (r.left.isRed() && (r = r.rotateRight()), r.right.isEmpty() || r.right.isRed() || r.right.left.isRed() || (r = r.moveRedRight()), 0 === t(e, r.key)) {
                            if (r.right.isEmpty()) return vt.EMPTY;
                            n = r.right.min(), r = r.copy(n.key, n.value, null, null, r.right.removeMin())
                        }
                        r = r.copy(null, null, null, null, r.right.remove(e, t))
                    }
                    return r.fixUp()
                }
                isRed() {
                    return this.color
                }
                fixUp() {
                    let e = this;
                    return e.right.isRed() && !e.left.isRed() && (e = e.rotateLeft()), e.left.isRed() && e.left.left.isRed() && (e = e.rotateRight()), e.left.isRed() && e.right.isRed() && (e = e.colorFlip()), e
                }
                moveRedLeft() {
                    let e = this.colorFlip();
                    return e.right.left.isRed() && (e = e.copy(null, null, null, null, e.right.rotateRight()), e = e.rotateLeft(), e = e.colorFlip()), e
                }
                moveRedRight() {
                    let e = this.colorFlip();
                    return e.left.left.isRed() && (e = e.rotateRight(), e = e.colorFlip()), e
                }
                rotateLeft() {
                    var e = this.copy(null, null, vt.RED, null, this.right.left);
                    return this.right.copy(null, null, this.color, e, null)
                }
                rotateRight() {
                    var e = this.copy(null, null, vt.RED, this.left.right, null);
                    return this.left.copy(null, null, this.color, null, e)
                }
                colorFlip() {
                    var e = this.left.copy(null, null, !this.left.color, null, null),
                        t = this.right.copy(null, null, !this.right.color, null, null);
                    return this.copy(null, null, !this.color, e, t)
                }
                checkMaxDepth() {
                    var e = this.check();
                    return Math.pow(2, e) <= this.size + 1
                }
                check() {
                    if (this.isRed() && this.left.isRed()) throw P();
                    if (this.right.isRed()) throw P();
                    var e = this.left.check();
                    if (e !== this.right.check()) throw P();
                    return e + (this.isRed() ? 0 : 1)
                }
            }
            vt.EMPTY = null, vt.RED = !0, vt.BLACK = !1, vt.EMPTY = new class {
                constructor() {
                    this.size = 0
                }
                get key() {
                    throw P()
                }
                get value() {
                    throw P()
                }
                get color() {
                    throw P()
                }
                get left() {
                    throw P()
                }
                get right() {
                    throw P()
                }
                copy(e, t, n, r, i) {
                    return this
                }
                insert(e, t, n) {
                    return new vt(e, t)
                }
                remove(e, t) {
                    return this
                }
                isEmpty() {
                    return !0
                }
                inorderTraversal(e) {
                    return !1
                }
                reverseTraversal(e) {
                    return !1
                }
                minKey() {
                    return null
                }
                maxKey() {
                    return null
                }
                isRed() {
                    return !1
                }
                checkMaxDepth() {
                    return !0
                }
                check() {
                    return 0
                }
            };
            class wt {
                constructor(e) {
                    this.comparator = e, this.data = new pt(this.comparator)
                }
                has(e) {
                    return null !== this.data.get(e)
                }
                first() {
                    return this.data.minKey()
                }
                last() {
                    return this.data.maxKey()
                }
                get size() {
                    return this.data.size
                }
                indexOf(e) {
                    return this.data.indexOf(e)
                }
                forEach(n) {
                    this.data.inorderTraversal((e, t) => (n(e), !1))
                }
                forEachInRange(e, t) {
                    const n = this.data.getIteratorFrom(e[0]);
                    for (; n.hasNext();) {
                        var r = n.getNext();
                        if (0 <= this.comparator(r.key, e[1])) return;
                        t(r.key)
                    }
                }
                forEachWhile(e, t) {
                    let n;
                    for (n = void 0 !== t ? this.data.getIteratorFrom(t) : this.data.getIterator(); n.hasNext();)
                        if (!e(n.getNext().key)) return
                }
                firstAfterOrEqual(e) {
                    const t = this.data.getIteratorFrom(e);
                    return t.hasNext() ? t.getNext().key : null
                }
                getIterator() {
                    return new _t(this.data.getIterator())
                }
                getIteratorFrom(e) {
                    return new _t(this.data.getIteratorFrom(e))
                }
                add(e) {
                    return this.copy(this.data.remove(e).insert(e, !0))
                }
                delete(e) {
                    return this.has(e) ? this.copy(this.data.remove(e)) : this
                }
                isEmpty() {
                    return this.data.isEmpty()
                }
                unionWith(e) {
                    let t = this;
                    return t.size < e.size && (t = e, e = this), e.forEach(e => {
                        t = t.add(e)
                    }), t
                }
                isEqual(e) {
                    if (!(e instanceof wt)) return !1;
                    if (this.size !== e.size) return !1;
                    const t = this.data.getIterator(),
                        n = e.data.getIterator();
                    for (; t.hasNext();) {
                        const e = t.getNext().key,
                            r = n.getNext().key;
                        if (0 !== this.comparator(e, r)) return !1
                    }
                    return !0
                }
                toArray() {
                    const t = [];
                    return this.forEach(e => {
                        t.push(e)
                    }), t
                }
                toString() {
                    const t = [];
                    return this.forEach(e => t.push(e)), "SortedSet(" + t.toString() + ")"
                }
                copy(e) {
                    const t = new wt(this.comparator);
                    return t.data = e, t
                }
            }
            class _t {
                constructor(e) {
                    this.iter = e
                }
                getNext() {
                    return this.iter.getNext().key
                }
                hasNext() {
                    return this.iter.hasNext()
                }
            }

            function bt(e) {
                return e.hasNext() ? e.getNext() : void 0
            }
            class It {
                constructor(e) {
                    (this.fields = e).sort(ae.comparator)
                }
                static empty() {
                    return new It([])
                }
                unionWith(e) {
                    let t = new wt(ae.comparator);
                    for (const e of this.fields) t = t.add(e);
                    for (const n of e) t = t.add(n);
                    return new It(t.toArray())
                }
                covers(e) {
                    for (const t of this.fields)
                        if (t.isPrefixOf(e)) return !0;
                    return !1
                }
                isEqual(e) {
                    return Z(this.fields, e.fields, (e, t) => e.isEqual(t))
                }
            }
            class Tt extends Error {
                constructor() {
                    super(...arguments), this.name = "Base64DecodeError"
                }
            }
            class Et {
                constructor(e) {
                    this.binaryString = e
                }
                static fromBase64String(e) {
                    var t = function (e) {
                        try {
                            return atob(e)
                        } catch (e) {
                            throw "undefined" != typeof DOMException && e instanceof DOMException ? new Tt("Invalid base64 string: " + e) : e
                        }
                    }(e);
                    return new Et(t)
                }
                static fromUint8Array(e) {
                    var t = function (e) {
                        let t = "";
                        for (let n = 0; n < e.length; ++n) t += String.fromCharCode(e[n]);
                        return t
                    }(e);
                    return new Et(t)
                } [Symbol.iterator]() {
                    let e = 0;
                    return {
                        next: () => e < this.binaryString.length ? {
                            value: this.binaryString.charCodeAt(e++),
                            done: !1
                        } : {
                            value: void 0,
                            done: !0
                        }
                    }
                }
                toBase64() {
                    return e = this.binaryString, btoa(e);
                    var e
                }
                toUint8Array() {
                    return function (e) {
                        const t = new Uint8Array(e.length);
                        for (let n = 0; n < e.length; n++) t[n] = e.charCodeAt(n);
                        return t
                    }(this.binaryString)
                }
                approximateByteSize() {
                    return 2 * this.binaryString.length
                }
                compareTo(e) {
                    return X(this.binaryString, e.binaryString)
                }
                isEqual(e) {
                    return this.binaryString === e.binaryString
                }
            }
            Et.EMPTY_BYTE_STRING = new Et("");
            const St = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);

            function xt(t) {
                if (U(!!t), "string" != typeof t) return {
                    seconds: Dt(t.seconds),
                    nanos: Dt(t.nanos)
                }; {
                    let e = 0;
                    var n = St.exec(t);
                    U(!!n), n[1] && (n = ((n = n[1]) + "000000000").substr(0, 9), e = Number(n));
                    const r = new Date(t);
                    return {
                        seconds: Math.floor(r.getTime() / 1e3),
                        nanos: e
                    }
                }
            }

            function Dt(e) {
                return "number" == typeof e ? e : "string" == typeof e ? Number(e) : 0
            }

            function Ct(e) {
                return "string" == typeof e ? Et.fromBase64String(e) : Et.fromUint8Array(e)
            }

            function At(e) {
                var t;
                return "server_timestamp" === (null === (t = ((null === (t = null == e ? void 0 : e.mapValue) || void 0 === t ? void 0 : t.fields) || {}).__type__) || void 0 === t ? void 0 : t.stringValue)
            }

            function Nt(e) {
                var t = e.mapValue.fields.__previous_value__;
                return At(t) ? Nt(t) : t
            }

            function kt(e) {
                var t = xt(e.mapValue.fields.__local_write_time__.timestampValue);
                return new te(t.seconds, t.nanos)
            }
            class Rt {
                constructor(e, t, n, r, i, s, a, o, u) {
                    this.databaseId = e, this.appId = t, this.persistenceKey = n, this.host = r, this.ssl = i, this.forceLongPolling = s, this.autoDetectLongPolling = a, this.longPollingOptions = o, this.useFetchStreams = u
                }
            }
            class Ot {
                constructor(e, t) {
                    this.projectId = e, this.database = t || "(default)"
                }
                static empty() {
                    return new Ot("", "")
                }
                get isDefaultDatabase() {
                    return "(default)" === this.database
                }
                isEqual(e) {
                    return e instanceof Ot && e.projectId === this.projectId && e.database === this.database
                }
            }
            const Lt = {
                    mapValue: {
                        fields: {
                            __type__: {
                                stringValue: "__max__"
                            }
                        }
                    }
                },
                Mt = {
                    nullValue: "NULL_VALUE"
                };

            function Ft(e) {
                return "nullValue" in e ? 0 : "booleanValue" in e ? 1 : "integerValue" in e || "doubleValue" in e ? 2 : "timestampValue" in e ? 3 : "stringValue" in e ? 5 : "bytesValue" in e ? 6 : "referenceValue" in e ? 7 : "geoPointValue" in e ? 8 : "arrayValue" in e ? 9 : "mapValue" in e ? At(e) ? 4 : Yt(e) ? 9007199254740991 : Wt(e) ? 10 : 11 : P()
            }

            function Vt(e, t) {
                if (e === t) return !0;
                var n, r, i = Ft(e);
                if (i !== Ft(t)) return !1;
                switch (i) {
                    case 0:
                    case 9007199254740991:
                        return !0;
                    case 1:
                        return e.booleanValue === t.booleanValue;
                    case 4:
                        return kt(e).isEqual(kt(t));
                    case 3:
                        return function (e, t) {
                            if ("string" == typeof e.timestampValue && "string" == typeof t.timestampValue && e.timestampValue.length === t.timestampValue.length) return e.timestampValue === t.timestampValue;
                            var n = xt(e.timestampValue),
                                r = xt(t.timestampValue);
                            return n.seconds === r.seconds && n.nanos === r.nanos
                        }(e, t);
                    case 5:
                        return e.stringValue === t.stringValue;
                    case 6:
                        return r = t, Ct(e.bytesValue).isEqual(Ct(r.bytesValue));
                    case 7:
                        return e.referenceValue === t.referenceValue;
                    case 8:
                        return n = t, Dt((r = e).geoPointValue.latitude) === Dt(n.geoPointValue.latitude) && Dt(r.geoPointValue.longitude) === Dt(n.geoPointValue.longitude);
                    case 2:
                        return function (e, t) {
                            if ("integerValue" in e && "integerValue" in t) return Dt(e.integerValue) === Dt(t.integerValue);
                            if ("doubleValue" in e && "doubleValue" in t) {
                                var n = Dt(e.doubleValue),
                                    r = Dt(t.doubleValue);
                                return n === r ? Me(n) === Me(r) : isNaN(n) && isNaN(r)
                            }
                            return !1
                        }(e, t);
                    case 9:
                        return Z(e.arrayValue.values || [], t.arrayValue.values || [], Vt);
                    case 10:
                    case 11:
                        return function (e, t) {
                            const n = e.mapValue.fields || {},
                                r = t.mapValue.fields || {};
                            if (ft(n) !== ft(r)) return !1;
                            for (const e in n)
                                if (n.hasOwnProperty(e) && (void 0 === r[e] || !Vt(n[e], r[e]))) return !1;
                            return !0
                        }(e, t);
                    default:
                        return P()
                }
            }

            function Pt(e, t) {
                return void 0 !== (e.values || []).find(e => Vt(e, t))
            }

            function Ut(e, t) {
                if (e === t) return 0;
                var n, r, i, s, a, o, u, c = Ft(e),
                    h = Ft(t);
                if (c !== h) return X(c, h);
                switch (c) {
                    case 0:
                    case 9007199254740991:
                        return 0;
                    case 1:
                        return X(e.booleanValue, t.booleanValue);
                    case 2:
                        return a = t, o = Dt((s = e).integerValue || s.doubleValue), u = Dt(a.integerValue || a.doubleValue), o < u ? -1 : u < o ? 1 : o === u ? 0 : isNaN(o) ? isNaN(u) ? 0 : -1 : 1;
                    case 3:
                        return Bt(e.timestampValue, t.timestampValue);
                    case 4:
                        return Bt(kt(e), kt(t));
                    case 5:
                        return X(e.stringValue, t.stringValue);
                    case 6:
                        return function (e, t) {
                            const n = Ct(e),
                                r = Ct(t);
                            return n.compareTo(r)
                        }(e.bytesValue, t.bytesValue);
                    case 7:
                        return function (e, t) {
                            var n = e.split("/"),
                                r = t.split("/");
                            for (let i = 0; i < n.length && i < r.length; i++) {
                                const t = X(n[i], r[i]);
                                if (0 !== t) return t
                            }
                            return X(n.length, r.length)
                        }(e.referenceValue, t.referenceValue);
                    case 8:
                        return n = e.geoPointValue, r = t.geoPointValue, 0 !== (i = X(Dt(n.latitude), Dt(r.latitude))) ? i : X(Dt(n.longitude), Dt(r.longitude));
                    case 9:
                        return qt(e.arrayValue, t.arrayValue);
                    case 10:
                        return n = e.mapValue, r = t.mapValue, o = n.fields || {}, u = r.fields || {}, o = null === (i = o.value) || void 0 === i ? void 0 : i.arrayValue, u = null === (i = u.value) || void 0 === i ? void 0 : i.arrayValue, 0 !== (i = X((null === (i = null == o ? void 0 : o.values) || void 0 === i ? void 0 : i.length) || 0, (null === (i = null == u ? void 0 : u.values) || void 0 === i ? void 0 : i.length) || 0)) ? i : qt(o, u);
                    case 11:
                        return function (e, t) {
                            if (e === Lt.mapValue && t === Lt.mapValue) return 0;
                            if (e === Lt.mapValue) return 1;
                            if (t === Lt.mapValue) return -1;
                            const n = e.fields || {},
                                r = Object.keys(n),
                                i = t.fields || {},
                                s = Object.keys(i);
                            r.sort(), s.sort();
                            for (let o = 0; o < r.length && o < s.length; ++o) {
                                const t = X(r[o], s[o]);
                                if (0 !== t) return t;
                                var a = Ut(n[r[o]], i[s[o]]);
                                if (0 !== a) return a
                            }
                            return X(r.length, s.length)
                        }(e.mapValue, t.mapValue);
                    default:
                        throw P()
                }
            }

            function Bt(e, t) {
                if ("string" == typeof e && "string" == typeof t && e.length === t.length) return X(e, t);
                var n = xt(e),
                    r = xt(t),
                    i = X(n.seconds, r.seconds);
                return 0 !== i ? i : X(n.nanos, r.nanos)
            }

            function qt(e, t) {
                var n = e.values || [],
                    r = t.values || [];
                for (let i = 0; i < n.length && i < r.length; ++i) {
                    const t = Ut(n[i], r[i]);
                    if (t) return t
                }
                return X(n.length, r.length)
            }

            function jt(e) {
                return function s(e) {
                    return "nullValue" in e ? "null" : "booleanValue" in e ? "" + e.booleanValue : "integerValue" in e ? "" + e.integerValue : "doubleValue" in e ? "" + e.doubleValue : "timestampValue" in e ? function (e) {
                        const t = xt(e);
                        return `time(${t.seconds},${t.nanos})`
                    }(e.timestampValue) : "stringValue" in e ? e.stringValue : "bytesValue" in e ? function (e) {
                        return Ct(e).toBase64()
                    }(e.bytesValue) : "referenceValue" in e ? function (e) {
                        return oe.fromName(e).toString()
                    }(e.referenceValue) : "geoPointValue" in e ? function (e) {
                        return `geo(${e.latitude},${e.longitude})`
                    }(e.geoPointValue) : "arrayValue" in e ? function (e) {
                        let t = "[",
                            n = !0;
                        for (const r of e.values || []) n ? n = !1 : t += ",", t += s(r);
                        return t + "]"
                    }(e.arrayValue) : "mapValue" in e ? function (e) {
                        const t = Object.keys(e.fields || {}).sort();
                        let n = "{",
                            r = !0;
                        for (const i of t) r ? r = !1 : n += ",", n += `${i}:${s(e.fields[i])}`;
                        return n + "}"
                    }(e.mapValue) : P()
                }(e)
            }

            function Kt(e, t) {
                return {
                    referenceValue: `projects/${e.projectId}/databases/${e.database}/documents/${t.path.canonicalString()}`
                }
            }

            function Gt(e) {
                return !!e && "integerValue" in e
            }

            function zt(e) {
                return !!e && "arrayValue" in e
            }

            function $t(e) {
                return e && "nullValue" in e
            }

            function Qt(e) {
                return e && "doubleValue" in e && isNaN(Number(e.doubleValue))
            }

            function Ht(e) {
                return e && "mapValue" in e
            }

            function Wt(e) {
                var t;
                return "__vector__" === (null === (t = ((null === (t = null == e ? void 0 : e.mapValue) || void 0 === t ? void 0 : t.fields) || {}).__type__) || void 0 === t ? void 0 : t.stringValue)
            }

            function Jt(t) {
                if (t.geoPointValue) return {
                    geoPointValue: Object.assign({}, t.geoPointValue)
                };
                if (t.timestampValue && "object" == typeof t.timestampValue) return {
                    timestampValue: Object.assign({}, t.timestampValue)
                };
                if (t.mapValue) {
                    const n = {
                        mapValue: {
                            fields: {}
                        }
                    };
                    return gt(t.mapValue.fields, (e, t) => n.mapValue.fields[e] = Jt(t)), n
                }
                if (t.arrayValue) {
                    const r = {
                        arrayValue: {
                            values: []
                        }
                    };
                    for (let e = 0; e < (t.arrayValue.values || []).length; ++e) r.arrayValue.values[e] = Jt(t.arrayValue.values[e]);
                    return r
                }
                return Object.assign({}, t)
            }

            function Yt(e) {
                return "__max__" === (((e.mapValue || {}).fields || {}).__type__ || {}).stringValue
            }
            const Xt = {
                mapValue: {
                    fields: {
                        __type__: {
                            stringValue: "__vector__"
                        },
                        value: {
                            arrayValue: {}
                        }
                    }
                }
            };

            function Zt(e, t) {
                var n = Ut(e.value, t.value);
                return 0 !== n ? n : e.inclusive && !t.inclusive ? -1 : !e.inclusive && t.inclusive ? 1 : 0
            }

            function en(e, t) {
                var n = Ut(e.value, t.value);
                return 0 !== n ? n : e.inclusive && !t.inclusive ? 1 : !e.inclusive && t.inclusive ? -1 : 0
            }
            class tn {
                constructor(e) {
                    this.value = e
                }
                static empty() {
                    return new tn({
                        mapValue: {}
                    })
                }
                field(n) {
                    if (n.isEmpty()) return this.value; {
                        let e = this.value;
                        for (let t = 0; t < n.length - 1; ++t)
                            if (e = (e.mapValue.fields || {})[n.get(t)], !Ht(e)) return null;
                        return e = (e.mapValue.fields || {})[n.lastSegment()], e || null
                    }
                }
                set(e, t) {
                    this.getFieldsMap(e.popLast())[e.lastSegment()] = Jt(t)
                }
                setAll(e) {
                    let n = ae.emptyPath(),
                        r = {},
                        i = [];
                    e.forEach((e, t) => {
                        if (!n.isImmediateParentOf(t)) {
                            const e = this.getFieldsMap(n);
                            this.applyChanges(e, r, i), r = {}, i = [], n = t.popLast()
                        }
                        e ? r[t.lastSegment()] = Jt(e) : i.push(t.lastSegment())
                    });
                    var t = this.getFieldsMap(n);
                    this.applyChanges(t, r, i)
                }
                delete(e) {
                    const t = this.field(e.popLast());
                    Ht(t) && t.mapValue.fields && delete t.mapValue.fields[e.lastSegment()]
                }
                isEqual(e) {
                    return Vt(this.value, e.value)
                }
                getFieldsMap(t) {
                    let n = this.value;
                    n.mapValue.fields || (n.mapValue = {
                        fields: {}
                    });
                    for (let r = 0; r < t.length; ++r) {
                        let e = n.mapValue.fields[t.get(r)];
                        Ht(e) && e.mapValue.fields || (e = {
                            mapValue: {
                                fields: {}
                            }
                        }, n.mapValue.fields[t.get(r)] = e), n = e
                    }
                    return n.mapValue.fields
                }
                applyChanges(n, e, t) {
                    gt(e, (e, t) => n[e] = t);
                    for (const e of t) delete n[e]
                }
                clone() {
                    return new tn(Jt(this.value))
                }
            }
            class nn {
                constructor(e, t, n, r, i, s, a) {
                    this.key = e, this.documentType = t, this.version = n, this.readTime = r, this.createTime = i, this.data = s, this.documentState = a
                }
                static newInvalidDocument(e) {
                    return new nn(e, 0, ne.min(), ne.min(), ne.min(), tn.empty(), 0)
                }
                static newFoundDocument(e, t, n, r) {
                    return new nn(e, 1, t, ne.min(), n, r, 0)
                }
                static newNoDocument(e, t) {
                    return new nn(e, 2, t, ne.min(), ne.min(), tn.empty(), 0)
                }
                static newUnknownDocument(e, t) {
                    return new nn(e, 3, t, ne.min(), ne.min(), tn.empty(), 2)
                }
                convertToFoundDocument(e, t) {
                    return !this.createTime.isEqual(ne.min()) || 2 !== this.documentType && 0 !== this.documentType || (this.createTime = e), this.version = e, this.documentType = 1, this.data = t, this.documentState = 0, this
                }
                convertToNoDocument(e) {
                    return this.version = e, this.documentType = 2, this.data = tn.empty(), this.documentState = 0, this
                }
                convertToUnknownDocument(e) {
                    return this.version = e, this.documentType = 3, this.data = tn.empty(), this.documentState = 2, this
                }
                setHasCommittedMutations() {
                    return this.documentState = 2, this
                }
                setHasLocalMutations() {
                    return this.documentState = 1, this.version = ne.min(), this
                }
                setReadTime(e) {
                    return this.readTime = e, this
                }
                get hasLocalMutations() {
                    return 1 === this.documentState
                }
                get hasCommittedMutations() {
                    return 2 === this.documentState
                }
                get hasPendingWrites() {
                    return this.hasLocalMutations || this.hasCommittedMutations
                }
                isValidDocument() {
                    return 0 !== this.documentType
                }
                isFoundDocument() {
                    return 1 === this.documentType
                }
                isNoDocument() {
                    return 2 === this.documentType
                }
                isUnknownDocument() {
                    return 3 === this.documentType
                }
                isEqual(e) {
                    return e instanceof nn && this.key.isEqual(e.key) && this.version.isEqual(e.version) && this.documentType === e.documentType && this.documentState === e.documentState && this.data.isEqual(e.data)
                }
                mutableCopy() {
                    return new nn(this.key, this.documentType, this.version, this.readTime, this.createTime, this.data.clone(), this.documentState)
                }
                toString() {
                    return `Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`
                }
            }
            class rn {
                constructor(e, t) {
                    this.position = e, this.inclusive = t
                }
            }

            function sn(e, t, n) {
                let r = 0;
                for (let i = 0; i < e.position.length; i++) {
                    const s = t[i],
                        a = e.position[i];
                    if (r = s.field.isKeyField() ? oe.comparator(oe.fromName(a.referenceValue), n.key) : Ut(a, n.data.field(s.field)), "desc" === s.dir && (r *= -1), 0 !== r) break
                }
                return r
            }

            function an(e, t) {
                if (null === e) return null === t;
                if (null === t) return !1;
                if (e.inclusive !== t.inclusive || e.position.length !== t.position.length) return !1;
                for (let n = 0; n < e.position.length; n++)
                    if (!Vt(e.position[n], t.position[n])) return !1;
                return !0
            }
            class on {
                constructor(e, t = "asc") {
                    this.field = e, this.dir = t
                }
            }
            class un {}
            class cn extends un {
                constructor(e, t, n) {
                    super(), this.field = e, this.op = t, this.value = n
                }
                static create(e, t, n) {
                    return e.isKeyField() ? "in" === t || "not-in" === t ? this.createKeyFieldInFilter(e, t, n) : new xn(e, t, n) : "array-contains" === t ? new Nn(e, n) : "in" === t ? new kn(e, n) : "not-in" === t ? new Rn(e, n) : "array-contains-any" === t ? new On(e, n) : new cn(e, t, n)
                }
                static createKeyFieldInFilter(e, t, n) {
                    return new("in" === t ? Dn : Cn)(e, n)
                }
                matches(e) {
                    var t = e.data.field(this.field);
                    return "!=" === this.op ? null !== t && this.matchesComparison(Ut(t, this.value)) : null !== t && Ft(this.value) === Ft(t) && this.matchesComparison(Ut(t, this.value))
                }
                matchesComparison(e) {
                    switch (this.op) {
                        case "<":
                            return e < 0;
                        case "<=":
                            return e <= 0;
                        case "==":
                            return 0 === e;
                        case "!=":
                            return 0 !== e;
                        case ">":
                            return 0 < e;
                        case ">=":
                            return 0 <= e;
                        default:
                            return P()
                    }
                }
                isInequality() {
                    return 0 <= ["<", "<=", ">", ">=", "!=", "not-in"].indexOf(this.op)
                }
                getFlattenedFilters() {
                    return [this]
                }
                getFilters() {
                    return [this]
                }
            }
            class hn extends un {
                constructor(e, t) {
                    super(), this.filters = e, this.op = t, this.ae = null
                }
                static create(e, t) {
                    return new hn(e, t)
                }
                matches(t) {
                    return ln(this) ? void 0 === this.filters.find(e => !e.matches(t)) : void 0 !== this.filters.find(e => e.matches(t))
                }
                getFlattenedFilters() {
                    return null !== this.ae || (this.ae = this.filters.reduce((e, t) => e.concat(t.getFlattenedFilters()), [])), this.ae
                }
                getFilters() {
                    return Object.assign([], this.filters)
                }
            }

            function ln(e) {
                return "and" === e.op
            }

            function bn(e) {
                return "or" === e.op
            }

            function In(e) {
                return Tn(e) && ln(e)
            }

            function Tn(e) {
                for (const t of e.filters)
                    if (t instanceof hn) return !1;
                return !0
            }

            function En(e, t) {
                var n = e.filters.concat(t);
                return hn.create(n, e.op)
            }

            function Sn(e) {
                return e instanceof cn ? `${(t=e).field.canonicalString()} ${t.op} ${jt(t.value)}` : e instanceof hn ? (e = e).op.toString() + " {" + e.getFilters().map(Sn).join(" ,") + "}" : "Filter";
                var t
            }
            class xn extends cn {
                constructor(e, t, n) {
                    super(e, t, n), this.key = oe.fromName(n.referenceValue)
                }
                matches(e) {
                    var t = oe.comparator(e.key, this.key);
                    return this.matchesComparison(t)
                }
            }
            class Dn extends cn {
                constructor(e, t) {
                    super(e, "in", t), this.keys = An(0, t)
                }
                matches(t) {
                    return this.keys.some(e => e.isEqual(t.key))
                }
            }
            class Cn extends cn {
                constructor(e, t) {
                    super(e, "not-in", t), this.keys = An(0, t)
                }
                matches(t) {
                    return !this.keys.some(e => e.isEqual(t.key))
                }
            }

            function An(e, t) {
                var n;
                return ((null === (n = t.arrayValue) || void 0 === n ? void 0 : n.values) || []).map(e => oe.fromName(e.referenceValue))
            }
            class Nn extends cn {
                constructor(e, t) {
                    super(e, "array-contains", t)
                }
                matches(e) {
                    var t = e.data.field(this.field);
                    return zt(t) && Pt(t.arrayValue, this.value)
                }
            }
            class kn extends cn {
                constructor(e, t) {
                    super(e, "in", t)
                }
                matches(e) {
                    var t = e.data.field(this.field);
                    return null !== t && Pt(this.value.arrayValue, t)
                }
            }
            class Rn extends cn {
                constructor(e, t) {
                    super(e, "not-in", t)
                }
                matches(e) {
                    if (Pt(this.value.arrayValue, {
                            nullValue: "NULL_VALUE"
                        })) return !1;
                    var t = e.data.field(this.field);
                    return null !== t && !Pt(this.value.arrayValue, t)
                }
            }
            class On extends cn {
                constructor(e, t) {
                    super(e, "array-contains-any", t)
                }
                matches(e) {
                    const t = e.data.field(this.field);
                    return !(!zt(t) || !t.arrayValue.values) && t.arrayValue.values.some(e => Pt(this.value.arrayValue, e))
                }
            }
            class Ln {
                constructor(e, t = null, n = [], r = [], i = null, s = null, a = null) {
                    this.path = e, this.collectionGroup = t, this.orderBy = n, this.filters = r, this.limit = i, this.startAt = s, this.endAt = a, this.ue = null
                }
            }

            function Mn(e, t = null, n = [], r = [], i = null, s = null, a = null) {
                return new Ln(e, t, n, r, i, s, a)
            }

            function Fn(e) {
                const t = e;
                if (null === t.ue) {
                    let e = t.path.canonicalString();
                    null !== t.collectionGroup && (e += "|cg:" + t.collectionGroup), e += "|f:", e += t.filters.map(e => function t(e) {
                        if (e instanceof cn) return e.field.canonicalString() + e.op.toString() + jt(e.value);
                        if (In(e)) return e.filters.map(e => t(e)).join(",");
                        var n = e.filters.map(e => t(e)).join(",");
                        return `${e.op}(${n})`
                    }(e)).join(","), e += "|ob:", e += t.orderBy.map(e => function (e) {
                        return e.field.canonicalString() + e.dir
                    }(e)).join(","), Le(t.limit) || (e += "|l:", e += t.limit), t.startAt && (e += "|lb:", e += t.startAt.inclusive ? "b:" : "a:", e += t.startAt.position.map(e => jt(e)).join(",")), t.endAt && (e += "|ub:", e += t.endAt.inclusive ? "a:" : "b:", e += t.endAt.position.map(e => jt(e)).join(",")), t.ue = e
                }
                return t.ue
            }

            function Vn(e, t) {
                if (e.limit !== t.limit) return !1;
                if (e.orderBy.length !== t.orderBy.length) return !1;
                for (let i = 0; i < e.orderBy.length; i++)
                    if (n = e.orderBy[i], r = t.orderBy[i], n.dir !== r.dir || !n.field.isEqual(r.field)) return !1;
                var n, r;
                if (e.filters.length !== t.filters.length) return !1;
                for (let s = 0; s < e.filters.length; s++)
                    if (! function r(e, t) {
                            return e instanceof cn ? (n = e, (s = t) instanceof cn && n.op === s.op && n.field.isEqual(s.field) && Vt(n.value, s.value)) : e instanceof hn ? (i = t) instanceof hn && e.op === i.op && e.filters.length === i.filters.length && e.filters.reduce((e, t, n) => e && r(t, i.filters[n]), !0) : void P();
                            var i, n, s
                        }(e.filters[s], t.filters[s])) return !1;
                return e.collectionGroup === t.collectionGroup && !!e.path.isEqual(t.path) && !!an(e.startAt, t.startAt) && an(e.endAt, t.endAt)
            }

            function Pn(e) {
                return oe.isDocumentKey(e.path) && null === e.collectionGroup && 0 === e.filters.length
            }

            function Un(e, t) {
                return e.filters.filter(e => e instanceof cn && e.field.isEqual(t))
            }

            function Bn(t, n, r) {
                let i = Mt,
                    s = !0;
                for (const r of Un(t, n)) {
                    let e = Mt,
                        t = !0;
                    switch (r.op) {
                        case "<":
                        case "<=":
                            e = "nullValue" in (a = r.value) ? Mt : "booleanValue" in a ? {
                                booleanValue: !1
                            } : "integerValue" in a || "doubleValue" in a ? {
                                doubleValue: NaN
                            } : "timestampValue" in a ? {
                                timestampValue: {
                                    seconds: Number.MIN_SAFE_INTEGER
                                }
                            } : "stringValue" in a ? {
                                stringValue: ""
                            } : "bytesValue" in a ? {
                                bytesValue: ""
                            } : "referenceValue" in a ? Kt(Ot.empty(), oe.empty()) : "geoPointValue" in a ? {
                                geoPointValue: {
                                    latitude: -90,
                                    longitude: -180
                                }
                            } : "arrayValue" in a ? {
                                arrayValue: {}
                            } : "mapValue" in a ? Wt(a) ? Xt : {
                                mapValue: {}
                            } : P();
                            break;
                        case "==":
                        case "in":
                        case ">=":
                            e = r.value;
                            break;
                        case ">":
                            e = r.value, t = !1;
                            break;
                        case "!=":
                        case "not-in":
                            e = Mt
                    }
                    Zt({
                        value: i,
                        inclusive: s
                    }, {
                        value: e,
                        inclusive: t
                    }) < 0 && (i = e, s = t)
                }
                var a;
                if (null !== r)
                    for (let e = 0; e < t.orderBy.length; ++e)
                        if (t.orderBy[e].field.isEqual(n)) {
                            const t = r.position[e];
                            Zt({
                                value: i,
                                inclusive: s
                            }, {
                                value: t,
                                inclusive: r.inclusive
                            }) < 0 && (i = t, s = r.inclusive);
                            break
                        } return {
                    value: i,
                    inclusive: s
                }
            }

            function qn(t, n, r) {
                let i = Lt,
                    s = !0;
                for (const r of Un(t, n)) {
                    let e = Lt,
                        t = !0;
                    switch (r.op) {
                        case ">=":
                        case ">":
                            e = "nullValue" in (a = r.value) ? {
                                booleanValue: !1
                            } : "booleanValue" in a ? {
                                doubleValue: NaN
                            } : "integerValue" in a || "doubleValue" in a ? {
                                timestampValue: {
                                    seconds: Number.MIN_SAFE_INTEGER
                                }
                            } : "timestampValue" in a ? {
                                stringValue: ""
                            } : "stringValue" in a ? {
                                bytesValue: ""
                            } : "bytesValue" in a ? Kt(Ot.empty(), oe.empty()) : "referenceValue" in a ? {
                                geoPointValue: {
                                    latitude: -90,
                                    longitude: -180
                                }
                            } : "geoPointValue" in a ? {
                                arrayValue: {}
                            } : "arrayValue" in a ? Xt : "mapValue" in a ? Wt(a) ? {
                                mapValue: {}
                            } : Lt : P(), t = !1;
                            break;
                        case "==":
                        case "in":
                        case "<=":
                            e = r.value;
                            break;
                        case "<":
                            e = r.value, t = !1;
                            break;
                        case "!=":
                        case "not-in":
                            e = Lt
                    }
                    0 < en({
                        value: i,
                        inclusive: s
                    }, {
                        value: e,
                        inclusive: t
                    }) && (i = e, s = t)
                }
                var a;
                if (null !== r)
                    for (let e = 0; e < t.orderBy.length; ++e)
                        if (t.orderBy[e].field.isEqual(n)) {
                            const t = r.position[e];
                            0 < en({
                                value: i,
                                inclusive: s
                            }, {
                                value: t,
                                inclusive: r.inclusive
                            }) && (i = t, s = r.inclusive);
                            break
                        } return {
                    value: i,
                    inclusive: s
                }
            }
            class jn {
                constructor(e, t = null, n = [], r = [], i = null, s = "F", a = null, o = null) {
                    this.path = e, this.collectionGroup = t, this.explicitOrderBy = n, this.filters = r, this.limit = i, this.limitType = s, this.startAt = a, this.endAt = o, this.ce = null, this.le = null, this.he = null, this.startAt, this.endAt
                }
            }

            function Kn(e, t, n, r, i, s, a, o) {
                return new jn(e, t, n, r, i, s, a, o)
            }

            function Gn(e) {
                return new jn(e)
            }

            function zn(e) {
                return 0 === e.filters.length && null === e.limit && null == e.startAt && null == e.endAt && (0 === e.explicitOrderBy.length || 1 === e.explicitOrderBy.length && e.explicitOrderBy[0].field.isKeyField())
            }

            function $n(e) {
                return null !== e.collectionGroup
            }

            function Qn(t) {
                const n = t;
                if (null === n.ce) {
                    n.ce = [];
                    const t = new Set;
                    for (const i of n.explicitOrderBy) n.ce.push(i), t.add(i.field.canonicalString());
                    const r = 0 < n.explicitOrderBy.length ? n.explicitOrderBy[n.explicitOrderBy.length - 1].dir : "asc",
                        e = function (e) {
                            let t = new wt(ae.comparator);
                            return e.filters.forEach(e => {
                                e.getFlattenedFilters().forEach(e => {
                                    e.isInequality() && (t = t.add(e.field))
                                })
                            }), t
                        }(n);
                    e.forEach(e => {
                        t.has(e.canonicalString()) || e.isKeyField() || n.ce.push(new on(e, r))
                    }), t.has(ae.keyField().canonicalString()) || n.ce.push(new on(ae.keyField(), r))
                }
                return n.ce
            }

            function Hn(e) {
                const t = e;
                return t.le || (t.le = function (e, t) {
                    if ("F" === e.limitType) return Mn(e.path, e.collectionGroup, t, e.filters, e.limit, e.startAt, e.endAt); {
                        t = t.map(e => {
                            var t = "desc" === e.dir ? "asc" : "desc";
                            return new on(e.field, t)
                        });
                        var n = e.endAt ? new rn(e.endAt.position, e.endAt.inclusive) : null,
                            r = e.startAt ? new rn(e.startAt.position, e.startAt.inclusive) : null;
                        return Mn(e.path, e.collectionGroup, t, e.filters, e.limit, n, r)
                    }
                }(t, Qn(e))), t.le
            }

            function Wn(e, t) {
                var n = e.filters.concat([t]);
                return new jn(e.path, e.collectionGroup, e.explicitOrderBy.slice(), n, e.limit, e.limitType, e.startAt, e.endAt)
            }

            function Jn(e, t, n) {
                return new jn(e.path, e.collectionGroup, e.explicitOrderBy.slice(), e.filters.slice(), t, n, e.startAt, e.endAt)
            }

            function Yn(e, t) {
                return Vn(Hn(e), Hn(t)) && e.limitType === t.limitType
            }

            function Xn(e) {
                return `${Fn(Hn(e))}|lt:${e.limitType}`
            }

            function Zn(e) {
                return `Query(target=${function(e){let t=e.path.canonicalString();return null!==e.collectionGroup&&(t+=" collectionGroup="+e.collectionGroup),0<e.filters.length&&(t+=`, filters: [${e.filters.map(e=>Sn(e)).join(", ")}]`),Le(e.limit)||(t+=", limit: "+e.limit),0<e.orderBy.length&&(t+=`, orderBy: [${e.orderBy.map(e=>function(e){return`${e.field.canonicalString()} (${e.dir})`}(e)).join(", ")}]`),e.startAt&&(t+=", startAt: ",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(e=>jt(e)).join(",")),e.endAt&&(t+=", endAt: ",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(e=>jt(e)).join(",")),`Target(${t})`}(Hn(e))}; limitType=${e.limitType})`
            }

            function er(e, t) {
                return t.isFoundDocument() && (i = e, a = (s = t).key.path, null !== i.collectionGroup ? s.key.hasCollectionId(i.collectionGroup) && i.path.isPrefixOf(a) : oe.isDocumentKey(i.path) ? i.path.isEqual(a) : i.path.isImmediateParentOf(a)) && function (e, t) {
                    for (const n of Qn(e))
                        if (!n.field.isKeyField() && null === t.data.field(n.field)) return;
                    return 1
                }(e, t) && function (e, t) {
                    for (const n of e.filters)
                        if (!n.matches(t)) return;
                    return 1
                }(e, t) && (i = t, (!(t = e).startAt || (n = t.startAt, e = Qn(t), r = sn(n, e, i), n.inclusive ? r <= 0 : r < 0)) && (!t.endAt || (n = t.endAt, t = Qn(t), r = sn(n, t, i), n.inclusive ? 0 <= r : 0 < r)));
                var n, r, i, s, a
            }

            function tr(e) {
                return e.collectionGroup || (e.path.length % 2 == 1 ? e.path.lastSegment() : e.path.get(e.path.length - 2))
            }

            function nr(i) {
                return (e, t) => {
                    let n = !1;
                    for (const r of Qn(i)) {
                        const i = function (e, t, n) {
                            var r = e.field.isKeyField() ? oe.comparator(t.key, n.key) : function (e, t, n) {
                                var r = t.data.field(e),
                                    i = n.data.field(e);
                                return null !== r && null !== i ? Ut(r, i) : P()
                            }(e.field, t, n);
                            switch (e.dir) {
                                case "asc":
                                    return r;
                                case "desc":
                                    return -1 * r;
                                default:
                                    return P()
                            }
                        }(r, e, t);
                        if (0 !== i) return i;
                        n = n || r.field.isKeyField()
                    }
                    return 0
                }
            }
            class rr {
                constructor(e, t) {
                    this.mapKeyFn = e, this.equalsFn = t, this.inner = {}, this.innerSize = 0
                }
                get(e) {
                    const t = this.mapKeyFn(e),
                        n = this.inner[t];
                    if (void 0 !== n)
                        for (const [t, r] of n)
                            if (this.equalsFn(t, e)) return r
                }
                has(e) {
                    return void 0 !== this.get(e)
                }
                set(e, t) {
                    const n = this.mapKeyFn(e),
                        r = this.inner[n];
                    if (void 0 === r) return this.inner[n] = [
                        [e, t]
                    ], void this.innerSize++;
                    for (let i = 0; i < r.length; i++)
                        if (this.equalsFn(r[i][0], e)) return void(r[i] = [e, t]);
                    r.push([e, t]), this.innerSize++
                }
                delete(e) {
                    const t = this.mapKeyFn(e),
                        n = this.inner[t];
                    if (void 0 === n) return !1;
                    for (let r = 0; r < n.length; r++)
                        if (this.equalsFn(n[r][0], e)) return 1 === n.length ? delete this.inner[t] : n.splice(r, 1), this.innerSize--, !0;
                    return !1
                }
                forEach(r) {
                    gt(this.inner, (e, t) => {
                        for (const [e, n] of t) r(e, n)
                    })
                }
                isEmpty() {
                    return mt(this.inner)
                }
                size() {
                    return this.innerSize
                }
            }
            const ir = new pt(oe.comparator);
            const sr = new pt(oe.comparator);

            function ar(...e) {
                let t = sr;
                for (const n of e) t = t.insert(n.key, n);
                return t
            }

            function or(e) {
                let n = sr;
                return e.forEach((e, t) => n = n.insert(e, t.overlayedDocument)), n
            }

            function ur() {
                return new rr(e => e.toString(), (e, t) => e.isEqual(t))
            }
            const cr = new pt(oe.comparator),
                hr = new wt(oe.comparator);

            function lr(...e) {
                let t = hr;
                for (const n of e) t = t.add(n);
                return t
            }
            const dr = new wt(X);

            function fr(e, t) {
                if (e.useProto3Json) {
                    if (isNaN(t)) return {
                        doubleValue: "NaN"
                    };
                    if (t === 1 / 0) return {
                        doubleValue: "Infinity"
                    };
                    if (t === -1 / 0) return {
                        doubleValue: "-Infinity"
                    }
                }
                return {
                    doubleValue: Me(t) ? "-0" : t
                }
            }

            function gr(e) {
                return {
                    integerValue: "" + e
                }
            }

            function mr(e, t) {
                return Fe(t) ? gr(t) : fr(e, t)
            }
            class pr {
                constructor() {
                    this._ = void 0
                }
            }

            function yr(e, t) {
                return e instanceof Tr ? Gt(e = t) || (e = e) && "doubleValue" in e ? t : {
                    integerValue: 0
                } : null
            }
            class vr extends pr {}
            class wr extends pr {
                constructor(e) {
                    super(), this.elements = e
                }
            }

            function _r(e, t) {
                const n = Sr(t);
                for (const t of e.elements) n.some(e => Vt(e, t)) || n.push(t);
                return {
                    arrayValue: {
                        values: n
                    }
                }
            }
            class br extends pr {
                constructor(e) {
                    super(), this.elements = e
                }
            }

            function Ir(e, t) {
                let n = Sr(t);
                for (const t of e.elements) n = n.filter(e => !Vt(e, t));
                return {
                    arrayValue: {
                        values: n
                    }
                }
            }
            class Tr extends pr {
                constructor(e, t) {
                    super(), this.serializer = e, this.Pe = t
                }
            }

            function Er(e) {
                return Dt(e.integerValue || e.doubleValue)
            }

            function Sr(e) {
                return zt(e) && e.arrayValue.values ? e.arrayValue.values.slice() : []
            }
            class xr {
                constructor(e, t) {
                    this.field = e, this.transform = t
                }
            }
            class Dr {
                constructor(e, t) {
                    this.version = e, this.transformResults = t
                }
            }
            class Cr {
                constructor(e, t) {
                    this.updateTime = e, this.exists = t
                }
                static none() {
                    return new Cr
                }
                static exists(e) {
                    return new Cr(void 0, e)
                }
                static updateTime(e) {
                    return new Cr(e)
                }
                get isNone() {
                    return void 0 === this.updateTime && void 0 === this.exists
                }
                isEqual(e) {
                    return this.exists === e.exists && (this.updateTime ? !!e.updateTime && this.updateTime.isEqual(e.updateTime) : !e.updateTime)
                }
            }

            function Ar(e, t) {
                return void 0 !== e.updateTime ? t.isFoundDocument() && t.version.isEqual(e.updateTime) : void 0 === e.exists || e.exists === t.isFoundDocument()
            }
            class Nr {}

            function kr(e, n) {
                if (!e.hasLocalMutations || n && 0 === n.fields.length) return null;
                if (null === n) return e.isNoDocument() ? new Br(e.key, Cr.none()) : new Mr(e.key, e.data, Cr.none()); {
                    const i = e.data,
                        s = tn.empty();
                    let t = new wt(ae.comparator);
                    for (var r of n.fields)
                        if (!t.has(r)) {
                            let e = i.field(r);
                            null === e && 1 < r.length && (r = r.popLast(), e = i.field(r)), null === e ? s.delete(r) : s.set(r, e), t = t.add(r)
                        } return new Fr(e.key, s, new It(t.toArray()), Cr.none())
                }
            }

            function Rr(e, t, n) {
                e instanceof Mr ? function (e, t, n) {
                    const r = e.value.clone(),
                        i = Pr(e.fieldTransforms, t, n.transformResults);
                    r.setAll(i), t.convertToFoundDocument(n.version, r).setHasCommittedMutations()
                }(e, t, n) : e instanceof Fr ? function (e, t, n) {
                    if (!Ar(e.precondition, t)) return t.convertToUnknownDocument(n.version);
                    const r = Pr(e.fieldTransforms, t, n.transformResults),
                        i = t.data;
                    i.setAll(Vr(e)), i.setAll(r), t.convertToFoundDocument(n.version, i).setHasCommittedMutations()
                }(e, t, n) : t.convertToNoDocument(n.version).setHasCommittedMutations()
            }

            function Or(e, t, n, r) {
                return e instanceof Mr ? function (e, t, n, r) {
                    if (!Ar(e.precondition, t)) return n;
                    const i = e.value.clone(),
                        s = Ur(e.fieldTransforms, r, t);
                    return i.setAll(s), t.convertToFoundDocument(t.version, i).setHasLocalMutations(), null
                }(e, t, n, r) : e instanceof Fr ? function (e, t, n, r) {
                    if (!Ar(e.precondition, t)) return n;
                    const i = Ur(e.fieldTransforms, r, t),
                        s = t.data;
                    return s.setAll(Vr(e)), s.setAll(i), t.convertToFoundDocument(t.version, s).setHasLocalMutations(), null === n ? null : n.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map(e => e.field))
                }(e, t, n, r) : (t = t, n = n, Ar(e.precondition, t) ? (t.convertToNoDocument(t.version).setHasLocalMutations(), null) : n)
            }

            function Lr(e, t) {
                return e.type === t.type && !!e.key.isEqual(t.key) && !!e.precondition.isEqual(t.precondition) && (n = e.fieldTransforms, r = t.fieldTransforms, !!(void 0 === n && void 0 === r || n && r && Z(n, r, (e, t) => function (e, t) {
                    return e.field.isEqual(t.field) && (e = e.transform, t = t.transform, e instanceof wr && t instanceof wr || e instanceof br && t instanceof br ? Z(e.elements, t.elements, Vt) : e instanceof Tr && t instanceof Tr ? Vt(e.Pe, t.Pe) : e instanceof vr && t instanceof vr)
                }(e, t))) && (0 === e.type ? e.value.isEqual(t.value) : 1 !== e.type || e.data.isEqual(t.data) && e.fieldMask.isEqual(t.fieldMask)));
                var n, r
            }
            class Mr extends Nr {
                constructor(e, t, n, r = []) {
                    super(), this.key = e, this.value = t, this.precondition = n, this.fieldTransforms = r, this.type = 0
                }
                getFieldMask() {
                    return null
                }
            }
            class Fr extends Nr {
                constructor(e, t, n, r, i = []) {
                    super(), this.key = e, this.data = t, this.fieldMask = n, this.precondition = r, this.fieldTransforms = i, this.type = 1
                }
                getFieldMask() {
                    return this.fieldMask
                }
            }

            function Vr(n) {
                const r = new Map;
                return n.fieldMask.fields.forEach(e => {
                    var t;
                    e.isEmpty() || (t = n.data.field(e), r.set(e, t))
                }), r
            }

            function Pr(e, t, n) {
                const r = new Map;
                U(e.length === n.length);
                for (let h = 0; h < n.length; h++) {
                    var i = e[h],
                        s = i.transform,
                        a = t.data.field(i.field);
                    r.set(i.field, (o = s, u = a, c = n[h], o instanceof wr ? _r(o, u) : o instanceof br ? Ir(o, u) : c))
                }
                var o, u, c;
                return r
            }

            function Ur(e, t, n) {
                const r = new Map;
                for (const c of e) {
                    const e = c.transform,
                        h = n.data.field(c.field);
                    r.set(c.field, (i = e, s = h, a = t, u = o = void 0, i instanceof vr ? function (e, t) {
                        const n = {
                            fields: {
                                __type__: {
                                    stringValue: "server_timestamp"
                                },
                                __local_write_time__: {
                                    timestampValue: {
                                        seconds: e.seconds,
                                        nanos: e.nanoseconds
                                    }
                                }
                            }
                        };
                        return (t = t && At(t) ? Nt(t) : t) && (n.fields.__previous_value__ = t), {
                            mapValue: n
                        }
                    }(a, s) : i instanceof wr ? _r(i, s) : i instanceof br ? Ir(i, s) : (o = yr(i = i, s), u = Er(o) + Er(i.Pe), Gt(o) && Gt(i.Pe) ? gr(u) : fr(i.serializer, u))))
                }
                var i, s, a, o, u;
                return r
            }
            class Br extends Nr {
                constructor(e, t) {
                    super(), this.key = e, this.precondition = t, this.type = 2, this.fieldTransforms = []
                }
                getFieldMask() {
                    return null
                }
            }
            class qr extends Nr {
                constructor(e, t) {
                    super(), this.key = e, this.precondition = t, this.type = 3, this.fieldTransforms = []
                }
                getFieldMask() {
                    return null
                }
            }
            class jr {
                constructor(e, t, n, r) {
                    this.batchId = e, this.localWriteTime = t, this.baseMutations = n, this.mutations = r
                }
                applyToRemoteDocument(e, t) {
                    var n = t.mutationResults;
                    for (let r = 0; r < this.mutations.length; r++) {
                        const i = this.mutations[r];
                        i.key.isEqual(e.key) && Rr(i, e, n[r])
                    }
                }
                applyToLocalView(e, t) {
                    for (const n of this.baseMutations) n.key.isEqual(e.key) && (t = Or(n, e, t, this.localWriteTime));
                    for (const r of this.mutations) r.key.isEqual(e.key) && (t = Or(r, e, t, this.localWriteTime));
                    return t
                }
                applyToLocalDocumentSet(s, a) {
                    const o = ur();
                    return this.mutations.forEach(e => {
                        const t = s.get(e.key),
                            n = t.overlayedDocument;
                        let r = this.applyToLocalView(n, t.mutatedFields);
                        r = a.has(e.key) ? null : r;
                        var i = kr(n, r);
                        null !== i && o.set(e.key, i), n.isValidDocument() || n.convertToNoDocument(ne.min())
                    }), o
                }
                keys() {
                    return this.mutations.reduce((e, t) => e.add(t.key), lr())
                }
                isEqual(e) {
                    return this.batchId === e.batchId && Z(this.mutations, e.mutations, (e, t) => Lr(e, t)) && Z(this.baseMutations, e.baseMutations, (e, t) => Lr(e, t))
                }
            }
            class Kr {
                constructor(e, t, n, r) {
                    this.batch = e, this.commitVersion = t, this.mutationResults = n, this.docVersions = r
                }
                static from(e, t, n) {
                    U(e.mutations.length === n.length);
                    let r = cr;
                    var i = e.mutations;
                    for (let s = 0; s < i.length; s++) r = r.insert(i[s].key, n[s].version);
                    return new Kr(e, t, n, r)
                }
            }
            class Gr {
                constructor(e, t) {
                    this.largestBatchId = e, this.mutation = t
                }
                getKey() {
                    return this.mutation.key
                }
                isEqual(e) {
                    return null !== e && this.mutation === e.mutation
                }
                toString() {
                    return `Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`
                }
            }
            class zr {
                constructor(e, t) {
                    this.count = e, this.unchangedNames = t
                }
            }

            function $r(e) {
                switch (e) {
                    default:
                        return P();
                    case B.CANCELLED:
                    case B.UNKNOWN:
                    case B.DEADLINE_EXCEEDED:
                    case B.RESOURCE_EXHAUSTED:
                    case B.INTERNAL:
                    case B.UNAVAILABLE:
                    case B.UNAUTHENTICATED:
                        return !1;
                    case B.INVALID_ARGUMENT:
                    case B.NOT_FOUND:
                    case B.ALREADY_EXISTS:
                    case B.PERMISSION_DENIED:
                    case B.FAILED_PRECONDITION:
                    case B.ABORTED:
                    case B.OUT_OF_RANGE:
                    case B.UNIMPLEMENTED:
                    case B.DATA_LOSS:
                        return !0
                }
            }

            function Qr(e) {
                if (void 0 === e) return M("GRPC error has no .code"), B.UNKNOWN;
                switch (e) {
                    case x.OK:
                        return B.OK;
                    case x.CANCELLED:
                        return B.CANCELLED;
                    case x.UNKNOWN:
                        return B.UNKNOWN;
                    case x.DEADLINE_EXCEEDED:
                        return B.DEADLINE_EXCEEDED;
                    case x.RESOURCE_EXHAUSTED:
                        return B.RESOURCE_EXHAUSTED;
                    case x.INTERNAL:
                        return B.INTERNAL;
                    case x.UNAVAILABLE:
                        return B.UNAVAILABLE;
                    case x.UNAUTHENTICATED:
                        return B.UNAUTHENTICATED;
                    case x.INVALID_ARGUMENT:
                        return B.INVALID_ARGUMENT;
                    case x.NOT_FOUND:
                        return B.NOT_FOUND;
                    case x.ALREADY_EXISTS:
                        return B.ALREADY_EXISTS;
                    case x.PERMISSION_DENIED:
                        return B.PERMISSION_DENIED;
                    case x.FAILED_PRECONDITION:
                        return B.FAILED_PRECONDITION;
                    case x.ABORTED:
                        return B.ABORTED;
                    case x.OUT_OF_RANGE:
                        return B.OUT_OF_RANGE;
                    case x.UNIMPLEMENTED:
                        return B.UNIMPLEMENTED;
                    case x.DATA_LOSS:
                        return B.DATA_LOSS;
                    default:
                        return P()
                }
            }

            function Hr() {
                return new TextEncoder
            }(S = x = x || {})[S.OK = 0] = "OK", S[S.CANCELLED = 1] = "CANCELLED", S[S.UNKNOWN = 2] = "UNKNOWN", S[S.INVALID_ARGUMENT = 3] = "INVALID_ARGUMENT", S[S.DEADLINE_EXCEEDED = 4] = "DEADLINE_EXCEEDED", S[S.NOT_FOUND = 5] = "NOT_FOUND", S[S.ALREADY_EXISTS = 6] = "ALREADY_EXISTS", S[S.PERMISSION_DENIED = 7] = "PERMISSION_DENIED", S[S.UNAUTHENTICATED = 16] = "UNAUTHENTICATED", S[S.RESOURCE_EXHAUSTED = 8] = "RESOURCE_EXHAUSTED", S[S.FAILED_PRECONDITION = 9] = "FAILED_PRECONDITION", S[S.ABORTED = 10] = "ABORTED", S[S.OUT_OF_RANGE = 11] = "OUT_OF_RANGE", S[S.UNIMPLEMENTED = 12] = "UNIMPLEMENTED", S[S.INTERNAL = 13] = "INTERNAL", S[S.UNAVAILABLE = 14] = "UNAVAILABLE", S[S.DATA_LOSS = 15] = "DATA_LOSS";
            const Wr = new T([4294967295, 4294967295], 0);

            function Jr(e) {
                const t = Hr().encode(e),
                    n = new E;
                return n.update(t), new Uint8Array(n.digest())
            }

            function Yr(e) {
                const t = new DataView(e.buffer),
                    n = t.getUint32(0, !0),
                    r = t.getUint32(4, !0),
                    i = t.getUint32(8, !0),
                    s = t.getUint32(12, !0);
                return [new T([n, r], 0), new T([i, s], 0)]
            }
            class Xr {
                constructor(e, t, n) {
                    if (this.bitmap = e, this.padding = t, this.hashCount = n, t < 0 || 8 <= t) throw new Zr(`Invalid padding: ${t}`);
                    if (n < 0) throw new Zr(`Invalid hash count: ${n}`);
                    if (0 < e.length && 0 === this.hashCount) throw new Zr(`Invalid hash count: ${n}`);
                    if (0 === e.length && 0 !== t) throw new Zr(`Invalid padding when bitmap length is 0: ${t}`);
                    this.Ie = 8 * e.length - t, this.Te = T.fromNumber(this.Ie)
                }
                Ee(e, t, n) {
                    let r = e.add(t.multiply(T.fromNumber(n)));
                    return 1 === r.compare(Wr) && (r = new T([r.getBits(0), r.getBits(1)], 0)), r.modulo(this.Te).toNumber()
                }
                de(e) {
                    return 0 != (this.bitmap[Math.floor(e / 8)] & 1 << e % 8)
                }
                mightContain(e) {
                    if (0 === this.Ie) return !1;
                    const t = Jr(e),
                        [n, r] = Yr(t);
                    for (let i = 0; i < this.hashCount; i++) {
                        const t = this.Ee(n, r, i);
                        if (!this.de(t)) return !1
                    }
                    return !0
                }
                static create(e, t, n) {
                    const r = e % 8 == 0 ? 0 : 8 - e % 8,
                        i = new Uint8Array(Math.ceil(e / 8)),
                        s = new Xr(i, r, t);
                    return n.forEach(e => s.insert(e)), s
                }
                insert(t) {
                    if (0 !== this.Ie) {
                        const n = Jr(t),
                            [r, i] = Yr(n);
                        for (let e = 0; e < this.hashCount; e++) {
                            const n = this.Ee(r, i, e);
                            this.Ae(n)
                        }
                    }
                }
                Ae(e) {
                    var t = Math.floor(e / 8);
                    this.bitmap[t] |= 1 << e % 8
                }
            }
            class Zr extends Error {
                constructor() {
                    super(...arguments), this.name = "BloomFilterError"
                }
            }
            class ei {
                constructor(e, t, n, r, i) {
                    this.snapshotVersion = e, this.targetChanges = t, this.targetMismatches = n, this.documentUpdates = r, this.resolvedLimboDocuments = i
                }
                static createSynthesizedRemoteEventForCurrentChange(e, t, n) {
                    const r = new Map;
                    return r.set(e, ti.createSynthesizedTargetChangeForCurrentChange(e, t, n)), new ei(ne.min(), r, new pt(X), ir, lr())
                }
            }
            class ti {
                constructor(e, t, n, r, i) {
                    this.resumeToken = e, this.current = t, this.addedDocuments = n, this.modifiedDocuments = r, this.removedDocuments = i
                }
                static createSynthesizedTargetChangeForCurrentChange(e, t, n) {
                    return new ti(n, t, lr(), lr(), lr())
                }
            }
            class ni {
                constructor(e, t, n, r) {
                    this.Re = e, this.removedTargetIds = t, this.key = n, this.Ve = r
                }
            }
            class ri {
                constructor(e, t) {
                    this.targetId = e, this.me = t
                }
            }
            class ii {
                constructor(e, t, n = Et.EMPTY_BYTE_STRING, r = null) {
                    this.state = e, this.targetIds = t, this.resumeToken = n, this.cause = r
                }
            }
            class si {
                constructor() {
                    this.fe = 0, this.ge = ui(), this.pe = Et.EMPTY_BYTE_STRING, this.ye = !1, this.we = !0
                }
                get current() {
                    return this.ye
                }
                get resumeToken() {
                    return this.pe
                }
                get Se() {
                    return 0 !== this.fe
                }
                get be() {
                    return this.we
                }
                De(e) {
                    0 < e.approximateByteSize() && (this.we = !0, this.pe = e)
                }
                ve() {
                    let n = lr(),
                        r = lr(),
                        i = lr();
                    return this.ge.forEach((e, t) => {
                        switch (t) {
                            case 0:
                                n = n.add(e);
                                break;
                            case 2:
                                r = r.add(e);
                                break;
                            case 1:
                                i = i.add(e);
                                break;
                            default:
                                P()
                        }
                    }), new ti(this.pe, this.ye, n, r, i)
                }
                Ce() {
                    this.we = !1, this.ge = ui()
                }
                Fe(e, t) {
                    this.we = !0, this.ge = this.ge.insert(e, t)
                }
                Me(e) {
                    this.we = !0, this.ge = this.ge.remove(e)
                }
                xe() {
                    this.fe += 1
                }
                Oe() {
                    --this.fe, U(0 <= this.fe)
                }
                Ne() {
                    this.we = !0, this.ye = !0
                }
            }
            class ai {
                constructor(e) {
                    this.Le = e, this.Be = new Map, this.ke = ir, this.qe = oi(), this.Qe = new pt(X)
                }
                Ke(e) {
                    for (const t of e.Re) e.Ve && e.Ve.isFoundDocument() ? this.$e(t, e.Ve) : this.Ue(t, e.key, e.Ve);
                    for (const n of e.removedTargetIds) this.Ue(n, e.key, e.Ve)
                }
                We(n) {
                    this.forEachTarget(n, e => {
                        const t = this.Ge(e);
                        switch (n.state) {
                            case 0:
                                this.ze(e) && t.De(n.resumeToken);
                                break;
                            case 1:
                                t.Oe(), t.Se || t.Ce(), t.De(n.resumeToken);
                                break;
                            case 2:
                                t.Oe(), t.Se || this.removeTarget(e);
                                break;
                            case 3:
                                this.ze(e) && (t.Ne(), t.De(n.resumeToken));
                                break;
                            case 4:
                                this.ze(e) && (this.je(e), t.De(n.resumeToken));
                                break;
                            default:
                                P()
                        }
                    })
                }
                forEachTarget(e, n) {
                    0 < e.targetIds.length ? e.targetIds.forEach(n) : this.Be.forEach((e, t) => {
                        this.ze(t) && n(t)
                    })
                }
                He(e) {
                    const t = e.targetId,
                        n = e.me.count,
                        r = this.Je(t);
                    if (r) {
                        var i = r.target;
                        if (Pn(i))
                            if (0 === n) {
                                const e = new oe(i.path);
                                this.Ue(t, e, nn.newNoDocument(e, ne.min()))
                            } else U(1 === n);
                        else {
                            const r = this.Ye(t);
                            if (r !== n) {
                                const n = this.Ze(e),
                                    s = n ? this.Xe(n, e, r) : 1;
                                if (0 !== s) {
                                    this.je(t);
                                    const e = 2 === s ? "TargetPurposeExistenceFilterMismatchBloom" : "TargetPurposeExistenceFilterMismatch";
                                    this.Qe = this.Qe.insert(t, e)
                                }
                            }
                        }
                    }
                }
                Ze(e) {
                    var t = e.me.unchangedNames;
                    if (!t || !t.bits) return null;
                    var {
                        bits: {
                            bitmap: n = "",
                            padding: r = 0
                        },
                        hashCount: t = 0
                    } = t;
                    let i, s;
                    try {
                        i = Ct(n).toUint8Array()
                    } catch (e) {
                        if (e instanceof Tt) return F("Decoding the base64 bloom filter in existence filter failed (" + e.message + "); ignoring the bloom filter and falling back to full re-query."), null;
                        throw e
                    }
                    try {
                        s = new Xr(i, r, t)
                    } catch (e) {
                        return F(e instanceof Zr ? "BloomFilter error: " : "Applying bloom filter failed: ", e), null
                    }
                    return 0 === s.Ie ? null : s
                }
                Xe(e, t, n) {
                    return t.me.count === n - this.nt(e, t.targetId) ? 0 : 2
                }
                nt(n, r) {
                    const e = this.Le.getRemoteKeysForTarget(r);
                    let i = 0;
                    return e.forEach(e => {
                        var t = this.Le.tt(),
                            t = `projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`;
                        n.mightContain(t) || (this.Ue(r, e, null), i++)
                    }), i
                }
                rt(r) {
                    const i = new Map;
                    this.Be.forEach((e, t) => {
                        var n = this.Je(t);
                        if (n) {
                            if (e.current && Pn(n.target)) {
                                const i = new oe(n.target.path);
                                null !== this.ke.get(i) || this.it(t, i) || this.Ue(t, i, nn.newNoDocument(i, r))
                            }
                            e.be && (i.set(t, e.ve()), e.Ce())
                        }
                    });
                    let s = lr();
                    this.qe.forEach((e, t) => {
                        let n = !0;
                        t.forEachWhile(e => {
                            var t = this.Je(e);
                            return !t || "TargetPurposeLimboResolution" === t.purpose || (n = !1)
                        }), n && (s = s.add(e))
                    }), this.ke.forEach((e, t) => t.setReadTime(r));
                    var e = new ei(r, i, this.Qe, this.ke, s);
                    return this.ke = ir, this.qe = oi(), this.Qe = new pt(X), e
                }
                $e(e, t) {
                    var n;
                    this.ze(e) && (n = this.it(e, t.key) ? 2 : 0, this.Ge(e).Fe(t.key, n), this.ke = this.ke.insert(t.key, t), this.qe = this.qe.insert(t.key, this.st(t.key).add(e)))
                }
                Ue(e, t, n) {
                    if (this.ze(e)) {
                        const r = this.Ge(e);
                        this.it(e, t) ? r.Fe(t, 1) : r.Me(t), this.qe = this.qe.insert(t, this.st(t).delete(e)), n && (this.ke = this.ke.insert(t, n))
                    }
                }
                removeTarget(e) {
                    this.Be.delete(e)
                }
                Ye(e) {
                    var t = this.Ge(e).ve();
                    return this.Le.getRemoteKeysForTarget(e).size + t.addedDocuments.size - t.removedDocuments.size
                }
                xe(e) {
                    this.Ge(e).xe()
                }
                Ge(e) {
                    let t = this.Be.get(e);
                    return t || (t = new si, this.Be.set(e, t)), t
                }
                st(e) {
                    let t = this.qe.get(e);
                    return t || (t = new wt(X), this.qe = this.qe.insert(e, t)), t
                }
                ze(e) {
                    var t = null !== this.Je(e);
                    return t || L("WatchChangeAggregator", "Detected inactive target", e), t
                }
                Je(e) {
                    var t = this.Be.get(e);
                    return t && t.Se ? null : this.Le.ot(e)
                }
                je(t) {
                    this.Be.set(t, new si), this.Le.getRemoteKeysForTarget(t).forEach(e => {
                        this.Ue(t, e, null)
                    })
                }
                it(e, t) {
                    return this.Le.getRemoteKeysForTarget(e).has(t)
                }
            }

            function oi() {
                return new pt(oe.comparator)
            }

            function ui() {
                return new pt(oe.comparator)
            }
            const ci = {
                    asc: "ASCENDING",
                    desc: "DESCENDING"
                },
                hi = {
                    "<": "LESS_THAN",
                    "<=": "LESS_THAN_OR_EQUAL",
                    ">": "GREATER_THAN",
                    ">=": "GREATER_THAN_OR_EQUAL",
                    "==": "EQUAL",
                    "!=": "NOT_EQUAL",
                    "array-contains": "ARRAY_CONTAINS",
                    in: "IN",
                    "not-in": "NOT_IN",
                    "array-contains-any": "ARRAY_CONTAINS_ANY"
                },
                li = {
                    and: "AND",
                    or: "OR"
                };
            class di {
                constructor(e, t) {
                    this.databaseId = e, this.useProto3Json = t
                }
            }

            function fi(e, t) {
                return e.useProto3Json || Le(t) ? t : {
                    value: t
                }
            }

            function gi(e, t) {
                return e.useProto3Json ? `${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z` : {
                    seconds: "" + t.seconds,
                    nanos: t.nanoseconds
                }
            }

            function mi(e, t) {
                return e.useProto3Json ? t.toBase64() : t.toUint8Array()
            }

            function pi(e) {
                return U(!!e), ne.fromTimestamp((t = xt(e), new te(t.seconds, t.nanos)));
                var t
            }

            function yi(e, t) {
                return vi(e, t).canonicalString()
            }

            function vi(e, t) {
                const n = (e = e, new ie(["projects", e.projectId, "databases", e.database]).child("documents"));
                return void 0 === t ? n : n.child(t)
            }

            function wi(e) {
                var t = ie.fromString(e);
                return U(Vi(t)), t
            }

            function _i(e, t) {
                return yi(e.databaseId, t.path)
            }

            function bi(e, t) {
                const n = wi(t);
                if (n.get(1) !== e.databaseId.projectId) throw new q(B.INVALID_ARGUMENT, "Tried to deserialize key from different project: " + n.get(1) + " vs " + e.databaseId.projectId);
                if (n.get(3) !== e.databaseId.database) throw new q(B.INVALID_ARGUMENT, "Tried to deserialize key from different database: " + n.get(3) + " vs " + e.databaseId.database);
                return new oe(Si(n))
            }

            function Ii(e, t) {
                return yi(e.databaseId, t)
            }

            function Ti(e) {
                var t = wi(e);
                return 4 === t.length ? ie.emptyPath() : Si(t)
            }

            function Ei(e) {
                return new ie(["projects", e.databaseId.projectId, "databases", e.databaseId.database]).canonicalString()
            }

            function Si(e) {
                return U(4 < e.length && "documents" === e.get(4)), e.popFirst(5)
            }

            function xi(e, t, n) {
                return {
                    name: _i(e, t),
                    fields: n.value.mapValue.fields
                }
            }

            function Di(e, t, n) {
                const r = bi(e, t.name),
                    i = pi(t.updateTime),
                    s = t.createTime ? pi(t.createTime) : ne.min(),
                    a = new tn({
                        mapValue: {
                            fields: t.fields
                        }
                    }),
                    o = nn.newFoundDocument(r, i, s, a);
                return n && o.setHasCommittedMutations(), n ? o.setHasCommittedMutations() : o
            }

            function Ci(e, t) {
                let n;
                if (t instanceof Mr) n = {
                    update: xi(e, t.key, t.value)
                };
                else if (t instanceof Br) n = {
                    delete: _i(e, t.key)
                };
                else if (t instanceof Fr) n = {
                    update: xi(e, t.key, t.data),
                    updateMask: function (e) {
                        const t = [];
                        return e.fields.forEach(e => t.push(e.canonicalString())), {
                            fieldPaths: t
                        }
                    }(t.fieldMask)
                };
                else {
                    if (!(t instanceof qr)) return P();
                    n = {
                        verify: _i(e, t.key)
                    }
                }
                return 0 < t.fieldTransforms.length && (n.updateTransforms = t.fieldTransforms.map(e => function (e) {
                    var t = e.transform;
                    if (t instanceof vr) return {
                        fieldPath: e.field.canonicalString(),
                        setToServerValue: "REQUEST_TIME"
                    };
                    if (t instanceof wr) return {
                        fieldPath: e.field.canonicalString(),
                        appendMissingElements: {
                            values: t.elements
                        }
                    };
                    if (t instanceof br) return {
                        fieldPath: e.field.canonicalString(),
                        removeAllFromArray: {
                            values: t.elements
                        }
                    };
                    if (t instanceof Tr) return {
                        fieldPath: e.field.canonicalString(),
                        increment: t.Pe
                    };
                    throw P()
                }(e))), t.precondition.isNone || (n.currentDocument = (r = e, void 0 !== (e = t.precondition).updateTime ? {
                    updateTime: (t = e.updateTime, gi(r, t.toTimestamp()))
                } : void 0 !== e.exists ? {
                    exists: e.exists
                } : P())), n;
                var r
            }

            function Ai(t, e) {
                const n = e.currentDocument ? void 0 !== (i = e.currentDocument).updateTime ? Cr.updateTime(pi(i.updateTime)) : void 0 !== i.exists ? Cr.exists(i.exists) : Cr.none() : Cr.none(),
                    r = e.updateTransforms ? e.updateTransforms.map(e => function (e, t) {
                        let n = null;
                        if ("setToServerValue" in t) U("REQUEST_TIME" === t.setToServerValue), n = new vr;
                        else if ("appendMissingElements" in t) {
                            const e = t.appendMissingElements.values || [];
                            n = new wr(e)
                        } else if ("removeAllFromArray" in t) {
                            const e = t.removeAllFromArray.values || [];
                            n = new br(e)
                        } else "increment" in t ? n = new Tr(e, t.increment) : P();
                        var r = ae.fromServerFormat(t.fieldPath);
                        return new xr(r, n)
                    }(t, e)) : [];
                var i;
                if (e.update) {
                    e.update.name;
                    var s = bi(t, e.update.name),
                        a = new tn({
                            mapValue: {
                                fields: e.update.fields
                            }
                        });
                    if (e.updateMask) {
                        const t = function (e) {
                            const t = e.fieldPaths || [];
                            return new It(t.map(e => ae.fromServerFormat(e)))
                        }(e.updateMask);
                        return new Fr(s, a, t, n, r)
                    }
                    return new Mr(s, a, n, r)
                }
                if (e.delete) {
                    const r = bi(t, e.delete);
                    return new Br(r, n)
                }
                if (e.verify) {
                    const r = bi(t, e.verify);
                    return new qr(r, n)
                }
                return P()
            }

            function Ni(e, t) {
                return {
                    documents: [Ii(e, t.path)]
                }
            }

            function ki(e, t) {
                const n = {
                        structuredQuery: {}
                    },
                    r = t.path;
                let i;
                null !== t.collectionGroup ? (i = r, n.structuredQuery.from = [{
                    collectionId: t.collectionGroup,
                    allDescendants: !0
                }]) : (i = r.popLast(), n.structuredQuery.from = [{
                    collectionId: r.lastSegment()
                }]), n.parent = Ii(e, i);
                var s = function (e) {
                    if (0 !== e.length) return function n(e) {
                        return e instanceof cn ? function (e) {
                            if ("==" === e.op) {
                                if (Qt(e.value)) return {
                                    unaryFilter: {
                                        field: Mi(e.field),
                                        op: "IS_NAN"
                                    }
                                };
                                if ($t(e.value)) return {
                                    unaryFilter: {
                                        field: Mi(e.field),
                                        op: "IS_NULL"
                                    }
                                }
                            } else if ("!=" === e.op) {
                                if (Qt(e.value)) return {
                                    unaryFilter: {
                                        field: Mi(e.field),
                                        op: "IS_NOT_NAN"
                                    }
                                };
                                if ($t(e.value)) return {
                                    unaryFilter: {
                                        field: Mi(e.field),
                                        op: "IS_NOT_NULL"
                                    }
                                }
                            }
                            return {
                                fieldFilter: {
                                    field: Mi(e.field),
                                    op: Oi(e.op),
                                    value: e.value
                                }
                            }
                        }(e) : e instanceof hn ? function (e) {
                            const t = e.getFilters().map(e => n(e));
                            return 1 === t.length ? t[0] : {
                                compositeFilter: {
                                    op: Li(e.op),
                                    filters: t
                                }
                            }
                        }(e) : P()
                    }(hn.create(e, "and"))
                }(t.filters);
                s && (n.structuredQuery.where = s);
                s = function (e) {
                    if (0 !== e.length) return e.map(e => function (e) {
                        return {
                            field: Mi(e.field),
                            direction: (e = e.dir, ci[e])
                        }
                    }(e))
                }(t.orderBy);
                s && (n.structuredQuery.orderBy = s);
                s = fi(e, t.limit);
                return null !== s && (n.structuredQuery.limit = s), t.startAt && (n.structuredQuery.startAt = {
                    before: (e = t.startAt).inclusive,
                    values: e.position
                }), t.endAt && (n.structuredQuery.endAt = {
                    before: !(t = t.endAt).inclusive,
                    values: t.position
                }), {
                    _t: n,
                    parent: i
                }
            }

            function Ri(e) {
                let t = Ti(e.parent);
                var n, r, i, s = e.structuredQuery,
                    a = s.from ? s.from.length : 0;
                let o = null;
                if (0 < a) {
                    U(1 === a);
                    const f = s.from[0];
                    f.allDescendants ? o = f.collectionId : t = t.child(f.collectionId)
                }
                let u = [];
                s.where && (u = function (e) {
                    const t = function t(e) {
                        return void 0 !== e.unaryFilter ? function (e) {
                            switch (e.unaryFilter.op) {
                                case "IS_NAN":
                                    const t = Fi(e.unaryFilter.field);
                                    return cn.create(t, "==", {
                                        doubleValue: NaN
                                    });
                                case "IS_NULL":
                                    const n = Fi(e.unaryFilter.field);
                                    return cn.create(n, "==", {
                                        nullValue: "NULL_VALUE"
                                    });
                                case "IS_NOT_NAN":
                                    const r = Fi(e.unaryFilter.field);
                                    return cn.create(r, "!=", {
                                        doubleValue: NaN
                                    });
                                case "IS_NOT_NULL":
                                    const i = Fi(e.unaryFilter.field);
                                    return cn.create(i, "!=", {
                                        nullValue: "NULL_VALUE"
                                    });
                                default:
                                    return P()
                            }
                        }(e) : void 0 !== e.fieldFilter ? function (e) {
                            return cn.create(Fi(e.fieldFilter.field), function (e) {
                                switch (e) {
                                    case "EQUAL":
                                        return "==";
                                    case "NOT_EQUAL":
                                        return "!=";
                                    case "GREATER_THAN":
                                        return ">";
                                    case "GREATER_THAN_OR_EQUAL":
                                        return ">=";
                                    case "LESS_THAN":
                                        return "<";
                                    case "LESS_THAN_OR_EQUAL":
                                        return "<=";
                                    case "ARRAY_CONTAINS":
                                        return "array-contains";
                                    case "IN":
                                        return "in";
                                    case "NOT_IN":
                                        return "not-in";
                                    case "ARRAY_CONTAINS_ANY":
                                        return "array-contains-any";
                                    default:
                                        return P()
                                }
                            }(e.fieldFilter.op), e.fieldFilter.value)
                        }(e) : void 0 !== e.compositeFilter ? function (e) {
                            return hn.create(e.compositeFilter.filters.map(e => t(e)), function (e) {
                                switch (e) {
                                    case "AND":
                                        return "and";
                                    case "OR":
                                        return "or";
                                    default:
                                        return P()
                                }
                            }(e.compositeFilter.op))
                        }(e) : P()
                    }(e);
                    return t instanceof hn && In(t) ? t.getFilters() : [t]
                }(s.where));
                let c = [];
                s.orderBy && (c = s.orderBy.map(e => function (e) {
                    return new on(Fi(e.field), function (e) {
                        switch (e) {
                            case "ASCENDING":
                                return "asc";
                            case "DESCENDING":
                                return "desc";
                            default:
                                return
                        }
                    }(e.direction))
                }(e)));
                let h = null;
                s.limit && (h = (e = s.limit, Le(n = "object" == typeof e ? e.value : e) ? null : n));
                let l = null;
                s.startAt && (l = (r = s.startAt, i = !!r.before, n = r.values || [], new rn(n, i)));
                let d = null;
                return s.endAt && (d = (r = s.endAt, i = !r.before, s = r.values || [], new rn(s, i))), Kn(t, o, c, u, h, "F", l, d)
            }

            function Oi(e) {
                return hi[e]
            }

            function Li(e) {
                return li[e]
            }

            function Mi(e) {
                return {
                    fieldPath: e.canonicalString()
                }
            }

            function Fi(e) {
                return ae.fromServerFormat(e.fieldPath)
            }

            function Vi(e) {
                return 4 <= e.length && "projects" === e.get(0) && "databases" === e.get(2)
            }
            class Pi {
                constructor(e, t, n, r, i = ne.min(), s = ne.min(), a = Et.EMPTY_BYTE_STRING, o = null) {
                    this.target = e, this.targetId = t, this.purpose = n, this.sequenceNumber = r, this.snapshotVersion = i, this.lastLimboFreeSnapshotVersion = s, this.resumeToken = a, this.expectedCount = o
                }
                withSequenceNumber(e) {
                    return new Pi(this.target, this.targetId, this.purpose, e, this.snapshotVersion, this.lastLimboFreeSnapshotVersion, this.resumeToken, this.expectedCount)
                }
                withResumeToken(e, t) {
                    return new Pi(this.target, this.targetId, this.purpose, this.sequenceNumber, t, this.lastLimboFreeSnapshotVersion, e, null)
                }
                withExpectedCount(e) {
                    return new Pi(this.target, this.targetId, this.purpose, this.sequenceNumber, this.snapshotVersion, this.lastLimboFreeSnapshotVersion, this.resumeToken, e)
                }
                withLastLimboFreeSnapshotVersion(e) {
                    return new Pi(this.target, this.targetId, this.purpose, this.sequenceNumber, this.snapshotVersion, e, this.resumeToken, this.expectedCount)
                }
            }
            class Ui {
                constructor(e) {
                    this.ct = e
                }
            }

            function Bi(e, t) {
                const n = t.key,
                    r = {
                        prefixPath: n.getCollectionPath().popLast().toArray(),
                        collectionGroup: n.collectionGroup,
                        documentId: n.path.lastSegment(),
                        readTime: qi(t.readTime),
                        hasCommittedMutations: t.hasCommittedMutations
                    };
                if (t.isFoundDocument()) r.document = {
                    name: _i(i = e.ct, (e = t).key),
                    fields: e.data.value.mapValue.fields,
                    updateTime: gi(i, e.version.toTimestamp()),
                    createTime: gi(i, e.createTime.toTimestamp())
                };
                else if (t.isNoDocument()) r.noDocument = {
                    path: n.path.toArray(),
                    readTime: ji(t.version)
                };
                else {
                    if (!t.isUnknownDocument()) return P();
                    r.unknownDocument = {
                        path: n.path.toArray(),
                        version: ji(t.version)
                    }
                }
                var i;
                return r
            }

            function qi(e) {
                var t = e.toTimestamp();
                return [t.seconds, t.nanoseconds]
            }

            function ji(e) {
                var t = e.toTimestamp();
                return {
                    seconds: t.seconds,
                    nanoseconds: t.nanoseconds
                }
            }

            function Ki(e) {
                var t = new te(e.seconds, e.nanoseconds);
                return ne.fromTimestamp(t)
            }

            function Gi(t, e) {
                const n = (e.baseMutations || []).map(e => Ai(t.ct, e));
                for (let s = 0; s < e.mutations.length - 1; ++s) {
                    const n = e.mutations[s];
                    if (s + 1 < e.mutations.length && void 0 !== e.mutations[s + 1].transform) {
                        const r = e.mutations[s + 1];
                        n.updateTransforms = r.transform.fieldTransforms, e.mutations.splice(s + 1, 1), ++s
                    }
                }
                const r = e.mutations.map(e => Ai(t.ct, e)),
                    i = te.fromMillis(e.localWriteTimeMs);
                return new jr(e.batchId, i, n, r)
            }

            function zi(e) {
                var t, n = Ki(e.readTime),
                    r = void 0 !== e.lastLimboFreeSnapshotVersion ? Ki(e.lastLimboFreeSnapshotVersion) : ne.min(),
                    i = void 0 !== e.query.documents ? (U(1 === (t = e.query).documents.length), Hn(Gn(Ti(t.documents[0])))) : Hn(Ri(e.query));
                return new Pi(i, e.targetId, "TargetPurposeListen", e.lastListenSequenceNumber, n, r, Et.fromBase64String(e.resumeToken))
            }

            function $i(e, t) {
                var n = ji(t.snapshotVersion),
                    r = ji(t.lastLimboFreeSnapshotVersion),
                    i = Pn(t.target) ? Ni(e.ct, t.target) : ki(e.ct, t.target)._t,
                    s = t.resumeToken.toBase64();
                return {
                    targetId: t.targetId,
                    canonicalId: Fn(t.target),
                    readTime: n,
                    resumeToken: s,
                    lastListenSequenceNumber: t.sequenceNumber,
                    lastLimboFreeSnapshotVersion: r,
                    query: i
                }
            }

            function Qi(e) {
                var t = Ri({
                    parent: e.parent,
                    structuredQuery: e.structuredQuery
                });
                return "LAST" === e.limitType ? Jn(t, t.limit, "L") : t
            }

            function Hi(e, t) {
                return new Gr(t.largestBatchId, Ai(e.ct, t.overlayMutation))
            }

            function Wi(e, t) {
                var n = t.path.lastSegment();
                return [e, Ve(t.path.popLast()), n]
            }

            function Ji(e, t, n, r) {
                return {
                    indexId: e,
                    uid: t,
                    sequenceNumber: n,
                    readTime: ji(r.readTime),
                    documentKey: Ve(r.documentKey.path),
                    largestBatchId: r.largestBatchId
                }
            }
            class Yi {
                getBundleMetadata(e, t) {
                    return Xi(e).get(t).next(e => {
                        if (e) return {
                            id: (e = e).bundleId,
                            createTime: Ki(e.createTime),
                            version: e.version
                        }
                    })
                }
                saveBundleMetadata(e, t) {
                    return Xi(e).put({
                        bundleId: (t = t).id,
                        createTime: ji(pi(t.createTime)),
                        version: t.version
                    })
                }
                getNamedQuery(e, t) {
                    return Zi(e).get(t).next(e => {
                        if (e) return {
                            name: (e = e).name,
                            query: Qi(e.bundledQuery),
                            readTime: Ki(e.readTime)
                        }
                    })
                }
                saveNamedQuery(e, t) {
                    return Zi(e).put({
                        name: (t = t).name,
                        readTime: ji(pi(t.readTime)),
                        bundledQuery: t.bundledQuery
                    })
                }
            }

            function Xi(e) {
                return dt(e, "bundles")
            }

            function Zi(e) {
                return dt(e, "namedQueries")
            }
            class es {
                constructor(e, t) {
                    this.serializer = e, this.userId = t
                }
                static lt(e, t) {
                    var n = t.uid || "";
                    return new es(e, n)
                }
                getOverlay(e, t) {
                    return ts(e).get(Wi(this.userId, t)).next(e => e ? Hi(this.serializer, e) : null)
                }
                getOverlays(e, t) {
                    const n = ur();
                    return _e.forEach(t, t => this.getOverlay(e, t).next(e => {
                        null !== e && n.set(t, e)
                    })).next(() => n)
                }
                saveOverlays(r, i, e) {
                    const s = [];
                    return e.forEach((e, t) => {
                        var n = new Gr(i, t);
                        s.push(this.ht(r, n))
                    }), _e.waitFor(s)
                }
                removeOverlaysForBatchId(n, e, r) {
                    const t = new Set;
                    e.forEach(e => t.add(Ve(e.getCollectionPath())));
                    const i = [];
                    return t.forEach(e => {
                        var t = IDBKeyRange.bound([this.userId, e, r], [this.userId, e, r + 1], !1, !0);
                        i.push(ts(n).j("collectionPathOverlayIndex", t))
                    }), _e.waitFor(i)
                }
                getOverlaysForCollection(e, t, n) {
                    const r = ur(),
                        i = Ve(t),
                        s = IDBKeyRange.bound([this.userId, i, n], [this.userId, i, Number.POSITIVE_INFINITY], !0);
                    return ts(e).U("collectionPathOverlayIndex", s).next(e => {
                        for (const t of e) {
                            const e = Hi(this.serializer, t);
                            r.set(e.getKey(), e)
                        }
                        return r
                    })
                }
                getOverlaysForCollectionGroup(e, t, n, i) {
                    const s = ur();
                    let a;
                    var r = IDBKeyRange.bound([this.userId, t, n], [this.userId, t, Number.POSITIVE_INFINITY], !0);
                    return ts(e).J({
                        index: "collectionGroupOverlayIndex",
                        range: r
                    }, (e, t, n) => {
                        const r = Hi(this.serializer, t);
                        s.size() < i || r.largestBatchId === a ? (s.set(r.getKey(), r), a = r.largestBatchId) : n.done()
                    }).next(() => s)
                }
                ht(e, t) {
                    return ts(e).put(function (e, t, n) {
                        var [, r, i] = Wi(t, n.mutation.key);
                        return {
                            userId: t,
                            collectionPath: r,
                            documentId: i,
                            collectionGroup: n.mutation.key.getCollectionGroup(),
                            largestBatchId: n.largestBatchId,
                            overlayMutation: Ci(e.ct, n.mutation)
                        }
                    }(this.serializer, this.userId, t))
                }
            }

            function ts(e) {
                return dt(e, "documentOverlays")
            }
            class ns {
                Pt(e) {
                    return dt(e, "globals")
                }
                getSessionToken(e) {
                    return this.Pt(e).get("sessionToken").next(e => {
                        var t = null == e ? void 0 : e.value;
                        return t ? Et.fromUint8Array(t) : Et.EMPTY_BYTE_STRING
                    })
                }
                setSessionToken(e, t) {
                    return this.Pt(e).put({
                        name: "sessionToken",
                        value: t.toUint8Array()
                    })
                }
            }
            class rs {
                constructor() {}
                It(e, t) {
                    this.Tt(e, t), t.Et()
                }
                Tt(t, n) {
                    if ("nullValue" in t) this.dt(n, 5);
                    else if ("booleanValue" in t) this.dt(n, 10), n.At(t.booleanValue ? 1 : 0);
                    else if ("integerValue" in t) this.dt(n, 15), n.At(Dt(t.integerValue));
                    else if ("doubleValue" in t) {
                        var e = Dt(t.doubleValue);
                        isNaN(e) ? this.dt(n, 13) : (this.dt(n, 15), Me(e) ? n.At(0) : n.At(e))
                    } else if ("timestampValue" in t) {
                        let e = t.timestampValue;
                        this.dt(n, 20), "string" == typeof e && (e = xt(e)), n.Rt(`${e.seconds||""}`), n.At(e.nanos || 0)
                    } else "stringValue" in t ? (this.Vt(t.stringValue, n), this.ft(n)) : "bytesValue" in t ? (this.dt(n, 30), n.gt(Ct(t.bytesValue)), this.ft(n)) : "referenceValue" in t ? this.yt(t.referenceValue, n) : "geoPointValue" in t ? (e = t.geoPointValue, this.dt(n, 45), n.At(e.latitude || 0), n.At(e.longitude || 0)) : "mapValue" in t ? Yt(t) ? this.dt(n, Number.MAX_SAFE_INTEGER) : Wt(t) ? this.wt(t.mapValue, n) : (this.St(t.mapValue, n), this.ft(n)) : "arrayValue" in t ? (this.bt(t.arrayValue, n), this.ft(n)) : P()
                }
                Vt(e, t) {
                    this.dt(t, 25), this.Dt(e, t)
                }
                Dt(e, t) {
                    t.Rt(e)
                }
                St(e, t) {
                    var n = e.fields || {};
                    this.dt(t, 55);
                    for (const e of Object.keys(n)) this.Vt(e, t), this.Tt(n[e], t)
                }
                wt(e, t) {
                    var n = e.fields || {};
                    this.dt(t, 53);
                    var r = (null === (r = null === (r = n.value.arrayValue) || void 0 === r ? void 0 : r.values) || void 0 === r ? void 0 : r.length) || 0;
                    this.dt(t, 15), t.At(Dt(r)), this.Vt("value", t), this.Tt(n.value, t)
                }
                bt(e, t) {
                    var n = e.values || [];
                    this.dt(t, 50);
                    for (const e of n) this.Tt(e, t)
                }
                yt(e, t) {
                    this.dt(t, 37), oe.fromName(e).path.forEach(e => {
                        this.dt(t, 60), this.Dt(e, t)
                    })
                }
                dt(e, t) {
                    e.At(t)
                }
                ft(e) {
                    e.At(2)
                }
            }

            function is(e) {
                var t = 64 - function (e) {
                    let t = 0;
                    for (let r = 0; r < 8; ++r) {
                        var n = function (e) {
                            if (0 === e) return 8;
                            let t = 0;
                            return e >> 4 == 0 && (t += 4, e <<= 4), e >> 6 == 0 && (t += 2, e <<= 2), e >> 7 == 0 && (t += 1), t
                        }(255 & e[r]);
                        if (t += n, 8 !== n) break
                    }
                    return t
                }(e);
                return Math.ceil(t / 8)
            }
            rs.vt = new rs;
            class ss {
                constructor() {
                    this.buffer = new Uint8Array(1024), this.position = 0
                }
                Ct(e) {
                    const t = e[Symbol.iterator]();
                    let n = t.next();
                    for (; !n.done;) this.Ft(n.value), n = t.next();
                    this.Mt()
                }
                xt(e) {
                    const t = e[Symbol.iterator]();
                    let n = t.next();
                    for (; !n.done;) this.Ot(n.value), n = t.next();
                    this.Nt()
                }
                Lt(e) {
                    for (const t of e) {
                        const e = t.charCodeAt(0);
                        if (e < 128) this.Ft(e);
                        else if (e < 2048) this.Ft(960 | e >>> 6), this.Ft(128 | 63 & e);
                        else if (t < "\ud800" || "\udbff" < t) this.Ft(480 | e >>> 12), this.Ft(128 | 63 & e >>> 6), this.Ft(128 | 63 & e);
                        else {
                            const e = t.codePointAt(0);
                            this.Ft(240 | e >>> 18), this.Ft(128 | 63 & e >>> 12), this.Ft(128 | 63 & e >>> 6), this.Ft(128 | 63 & e)
                        }
                    }
                    this.Mt()
                }
                Bt(e) {
                    for (const t of e) {
                        const e = t.charCodeAt(0);
                        if (e < 128) this.Ot(e);
                        else if (e < 2048) this.Ot(960 | e >>> 6), this.Ot(128 | 63 & e);
                        else if (t < "\ud800" || "\udbff" < t) this.Ot(480 | e >>> 12), this.Ot(128 | 63 & e >>> 6), this.Ot(128 | 63 & e);
                        else {
                            const e = t.codePointAt(0);
                            this.Ot(240 | e >>> 18), this.Ot(128 | 63 & e >>> 12), this.Ot(128 | 63 & e >>> 6), this.Ot(128 | 63 & e)
                        }
                    }
                    this.Nt()
                }
                kt(e) {
                    var t = this.qt(e),
                        n = is(t);
                    this.Qt(1 + n), this.buffer[this.position++] = 255 & n;
                    for (let r = t.length - n; r < t.length; ++r) this.buffer[this.position++] = 255 & t[r]
                }
                Kt(e) {
                    var t = this.qt(e),
                        n = is(t);
                    this.Qt(1 + n), this.buffer[this.position++] = ~(255 & n);
                    for (let r = t.length - n; r < t.length; ++r) this.buffer[this.position++] = ~(255 & t[r])
                }
                $t() {
                    this.Ut(255), this.Ut(255)
                }
                Wt() {
                    this.Gt(255), this.Gt(255)
                }
                reset() {
                    this.position = 0
                }
                seed(e) {
                    this.Qt(e.length), this.buffer.set(e, this.position), this.position += e.length
                }
                zt() {
                    return this.buffer.slice(0, this.position)
                }
                qt(e) {
                    const t = function (e) {
                            const t = new DataView(new ArrayBuffer(8));
                            return t.setFloat64(0, e, !1), new Uint8Array(t.buffer)
                        }(e),
                        n = 0 != (128 & t[0]);
                    t[0] ^= n ? 255 : 128;
                    for (let r = 1; r < t.length; ++r) t[r] ^= n ? 255 : 0;
                    return t
                }
                Ft(e) {
                    var t = 255 & e;
                    0 == t ? (this.Ut(0), this.Ut(255)) : 255 == t ? (this.Ut(255), this.Ut(0)) : this.Ut(t)
                }
                Ot(e) {
                    var t = 255 & e;
                    0 == t ? (this.Gt(0), this.Gt(255)) : 255 == t ? (this.Gt(255), this.Gt(0)) : this.Gt(e)
                }
                Mt() {
                    this.Ut(0), this.Ut(1)
                }
                Nt() {
                    this.Gt(0), this.Gt(1)
                }
                Ut(e) {
                    this.Qt(1), this.buffer[this.position++] = e
                }
                Gt(e) {
                    this.Qt(1), this.buffer[this.position++] = ~e
                }
                Qt(e) {
                    var t = e + this.position;
                    if (!(t <= this.buffer.length)) {
                        let e = 2 * this.buffer.length;
                        e < t && (e = t);
                        const n = new Uint8Array(e);
                        n.set(this.buffer), this.buffer = n
                    }
                }
            }
            class as {
                constructor(e) {
                    this.jt = e
                }
                gt(e) {
                    this.jt.Ct(e)
                }
                Rt(e) {
                    this.jt.Lt(e)
                }
                At(e) {
                    this.jt.kt(e)
                }
                Et() {
                    this.jt.$t()
                }
            }
            class os {
                constructor(e) {
                    this.jt = e
                }
                gt(e) {
                    this.jt.xt(e)
                }
                Rt(e) {
                    this.jt.Bt(e)
                }
                At(e) {
                    this.jt.Kt(e)
                }
                Et() {
                    this.jt.Wt()
                }
            }
            class us {
                constructor() {
                    this.jt = new ss, this.Ht = new as(this.jt), this.Jt = new os(this.jt)
                }
                seed(e) {
                    this.jt.seed(e)
                }
                Yt(e) {
                    return 0 === e ? this.Ht : this.Jt
                }
                zt() {
                    return this.jt.zt()
                }
                reset() {
                    this.jt.reset()
                }
            }
            class cs {
                constructor(e, t, n, r) {
                    this.indexId = e, this.documentKey = t, this.arrayValue = n, this.directionalValue = r
                }
                Zt() {
                    const e = this.directionalValue.length,
                        t = 0 === e || 255 === this.directionalValue[e - 1] ? e + 1 : e,
                        n = new Uint8Array(t);
                    return n.set(this.directionalValue, 0), t !== e ? n.set([0], this.directionalValue.length) : ++n[n.length - 1], new cs(this.indexId, this.documentKey, this.arrayValue, n)
                }
            }

            function hs(e, t) {
                let n = e.indexId - t.indexId;
                return 0 !== n ? n : (n = ls(e.arrayValue, t.arrayValue), 0 !== n ? n : (n = ls(e.directionalValue, t.directionalValue), 0 !== n ? n : oe.comparator(e.documentKey, t.documentKey)))
            }

            function ls(e, t) {
                for (let r = 0; r < e.length && r < t.length; ++r) {
                    var n = e[r] - t[r];
                    if (0 != n) return n
                }
                return e.length - t.length
            }
            class ds {
                constructor(e) {
                    this.Xt = new wt((e, t) => ae.comparator(e.field, t.field)), this.collectionId = null != e.collectionGroup ? e.collectionGroup : e.path.lastSegment(), this.en = e.orderBy, this.tn = [];
                    for (const t of e.filters) {
                        const e = t;
                        e.isInequality() ? this.Xt = this.Xt.add(e) : this.tn.push(e)
                    }
                }
                get nn() {
                    return 1 < this.Xt.size
                }
                rn(e) {
                    if (U(e.collectionGroup === this.collectionId), this.nn) return !1;
                    const t = ce(e);
                    if (void 0 !== t && !this.sn(t)) return !1;
                    const n = he(e);
                    let r = new Set,
                        i = 0,
                        s = 0;
                    for (; i < n.length && this.sn(n[i]); ++i) r = r.add(n[i].fieldPath.canonicalString());
                    if (i === n.length) return !0;
                    if (0 < this.Xt.size) {
                        const e = this.Xt.getIterator().getNext();
                        if (!r.has(e.field.canonicalString())) {
                            const t = n[i];
                            if (!this.on(e, t) || !this._n(this.en[s++], t)) return !1
                        }++i
                    }
                    for (; i < n.length; ++i) {
                        const e = n[i];
                        if (s >= this.en.length || !this._n(this.en[s++], e)) return !1
                    }
                    return !0
                }
                an() {
                    if (this.nn) return null;
                    let e = new wt(ae.comparator);
                    const t = [];
                    for (const n of this.tn) n.field.isKeyField() || ("array-contains" === n.op || "array-contains-any" === n.op ? t.push(new le(n.field, 2)) : e.has(n.field) || (e = e.add(n.field), t.push(new le(n.field, 0))));
                    for (const r of this.en) r.field.isKeyField() || e.has(r.field) || (e = e.add(r.field), t.push(new le(r.field, "asc" === r.dir ? 0 : 1)));
                    return new ue(ue.UNKNOWN_ID, this.collectionId, t, de.empty())
                }
                sn(e) {
                    for (const t of this.tn)
                        if (this.on(t, e)) return !0;
                    return !1
                }
                on(e, t) {
                    if (void 0 === e || !e.field.isEqual(t.fieldPath)) return !1;
                    var n = "array-contains" === e.op || "array-contains-any" === e.op;
                    return 2 === t.kind == n
                }
                _n(e, t) {
                    return !!e.field.isEqual(t.fieldPath) && (0 === t.kind && "asc" === e.dir || 1 === t.kind && "desc" === e.dir)
                }
            }

            function fs(e) {
                if (0 === e.getFilters().length) return [];
                const t = function t(e) {
                    if (U(e instanceof cn || e instanceof hn), e instanceof cn) return e;
                    if (1 === e.filters.length) return t(e.filters[0]);
                    const n = e.filters.map(e => t(e));
                    let r = hn.create(n, e.op);
                    return r = ws(r), ps(r) ? r : (U(r instanceof hn), U(ln(r)), U(1 < r.filters.length), r.filters.reduce((e, t) => ys(e, t)))
                }(function t(n) {
                    var e;
                    if (U(n instanceof cn || n instanceof hn), n instanceof cn) {
                        if (n instanceof kn) {
                            const r = (null === (e = null === (e = n.value.arrayValue) || void 0 === e ? void 0 : e.values) || void 0 === e ? void 0 : e.map(e => cn.create(n.field, "==", e))) || [];
                            return hn.create(r, "or")
                        }
                        return n
                    }
                    const r = n.filters.map(e => t(e));
                    return hn.create(r, n.op)
                }(e));
                return U(ps(t)), gs(t) || ms(t) ? [t] : t.getFilters()
            }

            function gs(e) {
                return e instanceof cn
            }

            function ms(e) {
                return e instanceof hn && In(e)
            }

            function ps(e) {
                return gs(e) || ms(e) || function (e) {
                    if (e instanceof hn && bn(e)) {
                        for (const t of e.getFilters())
                            if (!gs(t) && !ms(t)) return !1;
                        return !0
                    }
                    return !1
                }(e)
            }

            function ys(e, t) {
                var n, r;
                return U(e instanceof cn || e instanceof hn), U(t instanceof cn || t instanceof hn), ws(e instanceof cn ? t instanceof cn ? (n = e, r = t, hn.create([n, r], "and")) : vs(e, t) : t instanceof cn ? vs(t, e) : function (e, t) {
                    if (U(0 < e.filters.length && 0 < t.filters.length), ln(e) && ln(t)) return En(e, t.getFilters());
                    const n = bn(e) ? e : t,
                        r = bn(e) ? t : e,
                        i = n.filters.map(e => ys(e, r));
                    return hn.create(i, "or")
                }(e, t))
            }

            function vs(t, e) {
                if (ln(e)) return En(e, t.getFilters());
                var n = e.filters.map(e => ys(t, e));
                return hn.create(n, "or")
            }

            function ws(t) {
                if (U(t instanceof cn || t instanceof hn), t instanceof cn) return t;
                const e = t.getFilters();
                if (1 === e.length) return ws(e[0]);
                if (Tn(t)) return t;
                const n = e.map(e => ws(e)),
                    r = [];
                return n.forEach(e => {
                    e instanceof cn ? r.push(e) : e instanceof hn && (e.op === t.op ? r.push(...e.filters) : r.push(e))
                }), 1 === r.length ? r[0] : hn.create(r, t.op)
            }
            class _s {
                constructor() {
                    this.un = new bs
                }
                addToCollectionParentIndex(e, t) {
                    return this.un.add(t), _e.resolve()
                }
                getCollectionParents(e, t) {
                    return _e.resolve(this.un.getEntries(t))
                }
                addFieldIndex(e, t) {
                    return _e.resolve()
                }
                deleteFieldIndex(e, t) {
                    return _e.resolve()
                }
                deleteAllFieldIndexes(e) {
                    return _e.resolve()
                }
                createTargetIndexes(e, t) {
                    return _e.resolve()
                }
                getDocumentsMatchingTarget(e, t) {
                    return _e.resolve(null)
                }
                getIndexType(e, t) {
                    return _e.resolve(0)
                }
                getFieldIndexes(e, t) {
                    return _e.resolve([])
                }
                getNextCollectionGroupToUpdate(e) {
                    return _e.resolve(null)
                }
                getMinOffset(e, t) {
                    return _e.resolve(me.min())
                }
                getMinOffsetFromCollectionGroup(e, t) {
                    return _e.resolve(me.min())
                }
                updateCollectionGroup(e, t, n) {
                    return _e.resolve()
                }
                updateIndexEntries(e, t) {
                    return _e.resolve()
                }
            }
            class bs {
                constructor() {
                    this.index = {}
                }
                add(e) {
                    const t = e.lastSegment(),
                        n = e.popLast(),
                        r = this.index[t] || new wt(ie.comparator),
                        i = !r.has(n);
                    return this.index[t] = r.add(n), i
                }
                has(e) {
                    const t = e.lastSegment(),
                        n = e.popLast(),
                        r = this.index[t];
                    return r && r.has(n)
                }
                getEntries(e) {
                    return (this.index[e] || new wt(ie.comparator)).toArray()
                }
            }
            const Is = new Uint8Array(0);
            class Ts {
                constructor(e, t) {
                    this.databaseId = t, this.cn = new bs, this.ln = new rr(e => Fn(e), (e, t) => Vn(e, t)), this.uid = e.uid || ""
                }
                addToCollectionParentIndex(e, t) {
                    if (this.cn.has(t)) return _e.resolve();
                    var n = t.lastSegment(),
                        r = t.popLast();
                    e.addOnCommittedListener(() => {
                        this.cn.add(t)
                    });
                    r = {
                        collectionId: n,
                        parent: Ve(r)
                    };
                    return Es(e).put(r)
                }
                getCollectionParents(e, n) {
                    const r = [],
                        t = IDBKeyRange.bound([n, ""], [ee(n), ""], !1, !0);
                    return Es(e).U(t).next(e => {
                        for (const t of e) {
                            if (t.collectionId !== n) break;
                            r.push(Ue(t.parent))
                        }
                        return r
                    })
                }
                addFieldIndex(e, t) {
                    const n = xs(e),
                        r = {
                            indexId: t.indexId,
                            collectionGroup: t.collectionGroup,
                            fields: t.fields.map(e => [e.fieldPath.canonicalString(), e.kind])
                        };
                    delete r.indexId;
                    const i = n.add(r);
                    if (t.indexState) {
                        const n = Ds(e);
                        return i.next(e => {
                            n.put(Ji(e, this.uid, t.indexState.sequenceNumber, t.indexState.offset))
                        })
                    }
                    return i.next()
                }
                deleteFieldIndex(e, t) {
                    const n = xs(e),
                        r = Ds(e),
                        i = Ss(e);
                    return n.delete(t.indexId).next(() => r.delete(IDBKeyRange.bound([t.indexId], [t.indexId + 1], !1, !0))).next(() => i.delete(IDBKeyRange.bound([t.indexId], [t.indexId + 1], !1, !0)))
                }
                deleteAllFieldIndexes(e) {
                    const t = xs(e),
                        n = Ss(e),
                        r = Ds(e);
                    return t.j().next(() => n.j()).next(() => r.j())
                }
                createTargetIndexes(n, e) {
                    return _e.forEach(this.hn(e), t => this.getIndexType(n, t).next(e => {
                        if (0 === e || 1 === e) {
                            const e = new ds(t).an();
                            if (null != e) return this.addFieldIndex(n, e)
                        }
                    }))
                }
                getDocumentsMatchingTarget(e, h) {
                    const l = Ss(e);
                    let d = !0;
                    const n = new Map;
                    return _e.forEach(this.hn(h), t => this.Pn(e, t).next(e => {
                        d = d && !!e, n.set(t, e)
                    })).next(() => {
                        if (d) {
                            let c = lr();
                            const d = [];
                            return _e.forEach(n, (e, t) => {
                                var n;
                                L("IndexedDbIndexManager", `Using index ${n=e,`id=${n.indexId}|cg=${n.collectionGroup}|f=${n.fields.map(e=>`${e.fieldPath}:${e.kind}`).join(",")}`} to execute ${Fn(h)}`);
                                var r = function (e, t) {
                                        var n = ce(t);
                                        if (void 0 === n) return null;
                                        for (const t of Un(e, n.fieldPath)) switch (t.op) {
                                            case "array-contains-any":
                                                return t.value.arrayValue.values || [];
                                            case "array-contains":
                                                return [t.value]
                                        }
                                        return null
                                    }(t, e),
                                    i = function (e, t) {
                                        const n = new Map;
                                        for (const r of he(t))
                                            for (const t of Un(e, r.fieldPath)) switch (t.op) {
                                                case "==":
                                                case "in":
                                                    n.set(r.fieldPath.canonicalString(), t.value);
                                                    break;
                                                case "not-in":
                                                case "!=":
                                                    return n.set(r.fieldPath.canonicalString(), t.value), Array.from(n.values())
                                            }
                                        return null
                                    }(t, e),
                                    s = function (e, t) {
                                        const n = [];
                                        let r = !0;
                                        for (const i of he(t)) {
                                            const t = (0 === i.kind ? Bn : qn)(e, i.fieldPath, e.startAt);
                                            n.push(t.value), r = r && t.inclusive
                                        }
                                        return new rn(n, r)
                                    }(t, e),
                                    a = function (e, t) {
                                        const n = [];
                                        let r = !0;
                                        for (const i of he(t)) {
                                            const t = (0 === i.kind ? qn : Bn)(e, i.fieldPath, e.endAt);
                                            n.push(t.value), r = r && t.inclusive
                                        }
                                        return new rn(n, r)
                                    }(t, e),
                                    o = this.In(e, t, s),
                                    u = this.In(e, t, a),
                                    i = this.Tn(e, t, i),
                                    i = this.En(e.indexId, r, o, s.inclusive, u, a.inclusive, i);
                                return _e.forEach(i, e => l.G(e, h.limit).next(e => {
                                    e.forEach(e => {
                                        var t = oe.fromSegments(e.documentKey);
                                        c.has(t) || (c = c.add(t), d.push(t))
                                    })
                                }))
                            }).next(() => d)
                        }
                        return _e.resolve(null)
                    })
                }
                hn(t) {
                    let e = this.ln.get(t);
                    return e || (e = 0 === t.filters.length ? [t] : fs(hn.create(t.filters, "and")).map(e => Mn(t.path, t.collectionGroup, t.orderBy, e.getFilters(), t.limit, t.startAt, t.endAt)), this.ln.set(t, e), e)
                }
                En(t, e, n, r, i, s, a) {
                    const o = (null != e ? e.length : 1) * Math.max(n.length, i.length),
                        u = o / (null != e ? e.length : 1),
                        c = [];
                    for (let h = 0; h < o; ++h) {
                        const o = e ? this.dn(e[h / u]) : Is,
                            l = this.An(t, o, n[h % u], r),
                            d = this.Rn(t, o, i[h % u], s),
                            f = a.map(e => this.An(t, o, e, !0));
                        c.push(...this.createRange(l, d, f))
                    }
                    return c
                }
                An(e, t, n, r) {
                    const i = new cs(e, oe.empty(), t, n);
                    return r ? i : i.Zt()
                }
                Rn(e, t, n, r) {
                    const i = new cs(e, oe.empty(), t, n);
                    return r ? i.Zt() : i
                }
                Pn(e, t) {
                    const r = new ds(t),
                        n = null != t.collectionGroup ? t.collectionGroup : t.path.lastSegment();
                    return this.getFieldIndexes(e, n).next(e => {
                        let t = null;
                        for (const n of e) r.rn(n) && (!t || n.fields.length > t.fields.length) && (t = n);
                        return t
                    })
                }
                getIndexType(e, t) {
                    let n = 2;
                    const r = this.hn(t);
                    return _e.forEach(r, t => this.Pn(e, t).next(e => {
                        e ? 0 !== n && e.fields.length < function (e) {
                            let t = new wt(ae.comparator),
                                n = !1;
                            for (const r of e.filters)
                                for (const e of r.getFlattenedFilters()) e.field.isKeyField() || ("array-contains" === e.op || "array-contains-any" === e.op ? n = !0 : t = t.add(e.field));
                            for (const n of e.orderBy) n.field.isKeyField() || (t = t.add(n.field));
                            return t.size + (n ? 1 : 0)
                        }(t) && (n = 1) : n = 0
                    })).next(() => function (e) {
                        return null !== e.limit
                    }(t) && 1 < r.length && 2 === n ? 1 : n)
                }
                Vn(e, t) {
                    const n = new us;
                    for (const i of he(e)) {
                        const e = t.data.field(i.fieldPath);
                        if (null == e) return null;
                        var r = n.Yt(i.kind);
                        rs.vt.It(e, r)
                    }
                    return n.zt()
                }
                dn(e) {
                    const t = new us;
                    return rs.vt.It(e, t.Yt(0)), t.zt()
                }
                mn(e, t) {
                    const n = new us;
                    return rs.vt.It(Kt(this.databaseId, t), n.Yt(0 === (r = he(e)).length ? 0 : r[r.length - 1].kind)), n.zt();
                    var r
                }
                Tn(e, t, n) {
                    if (null === n) return [];
                    let r = [];
                    r.push(new us);
                    let i = 0;
                    for (const s of he(e)) {
                        const e = n[i++];
                        for (const n of r)
                            if (this.fn(t, s.fieldPath) && zt(e)) r = this.gn(r, s, e);
                            else {
                                const t = n.Yt(s.kind);
                                rs.vt.It(e, t)
                            }
                    }
                    return this.pn(r)
                }
                In(e, t, n) {
                    return this.Tn(e, t, n.position)
                }
                pn(e) {
                    const t = [];
                    for (let n = 0; n < e.length; ++n) t[n] = e[n].zt();
                    return t
                }
                gn(e, t, n) {
                    const r = [...e],
                        i = [];
                    for (const e of n.arrayValue.values || [])
                        for (const n of r) {
                            const r = new us;
                            r.seed(n.zt()), rs.vt.It(e, r.Yt(t.kind)), i.push(r)
                        }
                    return i
                }
                fn(e, t) {
                    return !!e.filters.find(e => e instanceof cn && e.field.isEqual(t) && ("in" === e.op || "not-in" === e.op))
                }
                getFieldIndexes(e, t) {
                    const n = xs(e),
                        r = Ds(e);
                    return (t ? n.U("collectionGroupIndex", IDBKeyRange.bound(t, t)) : n.U()).next(e => {
                        const s = [];
                        return _e.forEach(e, i => r.get([i.indexId, this.uid]).next(e => {
                            var t, n, r;
                            s.push((t = i, n = (e = e) ? new de(e.sequenceNumber, new me(Ki(e.readTime), new oe(Ue(e.documentKey)), e.largestBatchId)) : de.empty(), r = t.fields.map(([e, t]) => new le(ae.fromServerFormat(e), t)), new ue(t.indexId, t.collectionGroup, r, n)))
                        })).next(() => s)
                    })
                }
                getNextCollectionGroupToUpdate(e) {
                    return this.getFieldIndexes(e).next(e => 0 === e.length ? null : (e.sort((e, t) => {
                        var n = e.indexState.sequenceNumber - t.indexState.sequenceNumber;
                        return 0 != n ? n : X(e.collectionGroup, t.collectionGroup)
                    }), e[0].collectionGroup))
                }
                updateCollectionGroup(e, n, r) {
                    const i = xs(e),
                        s = Ds(e);
                    return this.yn(e).next(t => i.U("collectionGroupIndex", IDBKeyRange.bound(n, n)).next(e => _e.forEach(e, e => s.put(Ji(e.indexId, this.uid, t, r)))))
                }
                updateIndexEntries(i, e) {
                    const n = new Map;
                    return _e.forEach(e, (t, r) => {
                        var e = n.get(t.collectionGroup);
                        return (e ? _e.resolve(e) : this.getFieldIndexes(i, t.collectionGroup)).next(e => (n.set(t.collectionGroup, e), _e.forEach(e, n => this.wn(i, t, n).next(e => {
                            var t = this.Sn(r, n);
                            return e.isEqual(t) ? _e.resolve() : this.bn(i, r, n, e, t)
                        }))))
                    })
                }
                Dn(e, t, n, r) {
                    return Ss(e).put({
                        indexId: r.indexId,
                        uid: this.uid,
                        arrayValue: r.arrayValue,
                        directionalValue: r.directionalValue,
                        orderedDocumentKey: this.mn(n, t.key),
                        documentKey: t.key.path.toArray()
                    })
                }
                vn(e, t, n, r) {
                    return Ss(e).delete([r.indexId, this.uid, r.arrayValue, r.directionalValue, this.mn(n, t.key), t.key.path.toArray()])
                }
                wn(e, n, r) {
                    const t = Ss(e);
                    let i = new wt(hs);
                    return t.J({
                        index: "documentKeyIndex",
                        range: IDBKeyRange.only([r.indexId, this.uid, this.mn(r, n)])
                    }, (e, t) => {
                        i = i.add(new cs(r.indexId, n, t.arrayValue, t.directionalValue))
                    }).next(() => i)
                }
                Sn(e, t) {
                    let n = new wt(hs);
                    var r = this.Vn(t, e);
                    if (null == r) return n;
                    const i = ce(t);
                    if (null != i) {
                        var s = e.data.field(i.fieldPath);
                        if (zt(s))
                            for (const i of s.arrayValue.values || []) n = n.add(new cs(t.indexId, e.key, this.dn(i), r))
                    } else n = n.add(new cs(t.indexId, e.key, Is, r));
                    return n
                }
                bn(t, n, r, e, i) {
                    L("IndexedDbIndexManager", "Updating index entries for document '%s'", n.key);
                    const s = [];
                    return function (e, t, n, r, i) {
                        var s = e.getIterator(),
                            a = t.getIterator();
                        let o = bt(s),
                            u = bt(a);
                        for (; o || u;) {
                            let e = !1,
                                t = !1;
                            if (o && u) {
                                const r = n(o, u);
                                r < 0 ? t = !0 : 0 < r && (e = !0)
                            } else null != o ? t = !0 : e = !0;
                            e ? (r(u), u = bt(a)) : t ? (i(o), o = bt(s)) : (o = bt(s), u = bt(a))
                        }
                    }(e, i, hs, e => {
                        s.push(this.Dn(t, n, r, e))
                    }, e => {
                        s.push(this.vn(t, n, r, e))
                    }), _e.waitFor(s)
                }
                yn(e) {
                    let r = 1;
                    return Ds(e).J({
                        index: "sequenceNumberIndex",
                        reverse: !0,
                        range: IDBKeyRange.upperBound([this.uid, Number.MAX_SAFE_INTEGER])
                    }, (e, t, n) => {
                        n.done(), r = t.sequenceNumber + 1
                    }).next(() => r)
                }
                createRange(e, t, n) {
                    n = n.sort((e, t) => hs(e, t)).filter((e, t, n) => !t || 0 !== hs(e, n[t - 1]));
                    const r = [];
                    r.push(e);
                    for (const i of n) {
                        const n = hs(i, e),
                            s = hs(i, t);
                        if (0 === n) r[0] = e.Zt();
                        else if (0 < n && s < 0) r.push(i), r.push(i.Zt());
                        else if (0 < s) break
                    }
                    r.push(t);
                    const i = [];
                    for (let a = 0; a < r.length; a += 2) {
                        if (this.Cn(r[a], r[a + 1])) return [];
                        const t = [r[a].indexId, this.uid, r[a].arrayValue, r[a].directionalValue, Is, []],
                            n = [r[a + 1].indexId, this.uid, r[a + 1].arrayValue, r[a + 1].directionalValue, Is, []];
                        i.push(IDBKeyRange.bound(t, n))
                    }
                    return i
                }
                Cn(e, t) {
                    return 0 < hs(e, t)
                }
                getMinOffsetFromCollectionGroup(e, t) {
                    return this.getFieldIndexes(e, t).next(Cs)
                }
                getMinOffset(t, e) {
                    return _e.mapArray(this.hn(e), e => this.Pn(t, e).next(e => e || P())).next(Cs)
                }
            }

            function Es(e) {
                return dt(e, "collectionParents")
            }

            function Ss(e) {
                return dt(e, "indexEntries")
            }

            function xs(e) {
                return dt(e, "indexConfiguration")
            }

            function Ds(e) {
                return dt(e, "indexState")
            }

            function Cs(e) {
                U(0 !== e.length);
                let t = e[0].indexState.offset,
                    n = t.largestBatchId;
                for (let i = 1; i < e.length; i++) {
                    var r = e[i].indexState.offset;
                    pe(r, t) < 0 && (t = r), n < r.largestBatchId && (n = r.largestBatchId)
                }
                return new me(t.readTime, t.documentKey, n)
            }
            const As = {
                didRun: !1,
                sequenceNumbersCollected: 0,
                targetsRemoved: 0,
                documentsRemoved: 0
            };
            class Ns {
                constructor(e, t, n) {
                    this.cacheSizeCollectionThreshold = e, this.percentileToCollect = t, this.maximumSequenceNumbersToCollect = n
                }
                static withCacheSize(e) {
                    return new Ns(e, Ns.DEFAULT_COLLECTION_PERCENTILE, Ns.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)
                }
            }

            function ks(e, t, n) {
                const r = e.store("mutations"),
                    i = e.store("documentMutations"),
                    s = [],
                    a = IDBKeyRange.only(n.batchId);
                let o = 0;
                const u = r.J({
                    range: a
                }, (e, t, n) => (o++, n.delete()));
                s.push(u.next(() => {
                    U(1 === o)
                }));
                const c = [];
                for (const e of n.mutations) {
                    const r = je(t, e.key.path, n.batchId);
                    s.push(i.delete(r)), c.push(e.key)
                }
                return _e.waitFor(s).next(() => c)
            }

            function Rs(e) {
                if (!e) return 0;
                let t;
                if (e.document) t = e.document;
                else if (e.unknownDocument) t = e.unknownDocument;
                else {
                    if (!e.noDocument) throw P();
                    t = e.noDocument
                }
                return JSON.stringify(t).length
            }
            Ns.DEFAULT_COLLECTION_PERCENTILE = 10, Ns.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT = 1e3, Ns.DEFAULT = new Ns(41943040, Ns.DEFAULT_COLLECTION_PERCENTILE, Ns.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT), Ns.DISABLED = new Ns(-1, 0, 0);
            class Os {
                constructor(e, t, n, r) {
                    this.userId = e, this.serializer = t, this.indexManager = n, this.referenceDelegate = r, this.Fn = {}
                }
                static lt(e, t, n, r) {
                    U("" !== e.uid);
                    var i = e.isAuthenticated() ? e.uid : "";
                    return new Os(i, t, n, r)
                }
                checkEmpty(e) {
                    let r = !0;
                    var t = IDBKeyRange.bound([this.userId, Number.NEGATIVE_INFINITY], [this.userId, Number.POSITIVE_INFINITY]);
                    return Ms(e).J({
                        index: "userMutationsIndex",
                        range: t
                    }, (e, t, n) => {
                        r = !1, n.done()
                    }).next(() => r)
                }
                addMutationBatch(h, l, d, f) {
                    const g = Fs(h),
                        m = Ms(h);
                    return m.add({}).next(e => {
                        U("number" == typeof e);
                        const t = new jr(e, l, d, f),
                            n = (i = this.serializer, s = this.userId, a = t, o = a.baseMutations.map(e => Ci(i.ct, e)), u = a.mutations.map(e => Ci(i.ct, e)), {
                                userId: s,
                                batchId: a.batchId,
                                localWriteTimeMs: a.localWriteTime.toMillis(),
                                baseMutations: o,
                                mutations: u
                            }),
                            r = [];
                        var i, s, a, o, u;
                        let c = new wt((e, t) => X(e.canonicalString(), t.canonicalString()));
                        for (const h of f) {
                            const l = je(this.userId, h.key.path, e);
                            c = c.add(h.key.path.popLast()), r.push(m.put(n)), r.push(g.put(l, Ke))
                        }
                        return c.forEach(e => {
                            r.push(this.indexManager.addToCollectionParentIndex(h, e))
                        }), h.addOnCommittedListener(() => {
                            this.Fn[e] = t.keys()
                        }), _e.waitFor(r).next(() => t)
                    })
                }
                lookupMutationBatch(e, t) {
                    return Ms(e).get(t).next(e => e ? (U(e.userId === this.userId), Gi(this.serializer, e)) : null)
                }
                Mn(e, n) {
                    return this.Fn[n] ? _e.resolve(this.Fn[n]) : this.lookupMutationBatch(e, n).next(e => {
                        if (e) {
                            var t = e.keys();
                            return this.Fn[n] = t
                        }
                        return null
                    })
                }
                getNextMutationBatchAfterBatchId(e, t) {
                    const r = t + 1,
                        n = IDBKeyRange.lowerBound([this.userId, r]);
                    let i = null;
                    return Ms(e).J({
                        index: "userMutationsIndex",
                        range: n
                    }, (e, t, n) => {
                        t.userId === this.userId && (U(t.batchId >= r), i = Gi(this.serializer, t)), n.done()
                    }).next(() => i)
                }
                getHighestUnacknowledgedBatchId(e) {
                    var t = IDBKeyRange.upperBound([this.userId, Number.POSITIVE_INFINITY]);
                    let r = -1;
                    return Ms(e).J({
                        index: "userMutationsIndex",
                        range: t,
                        reverse: !0
                    }, (e, t, n) => {
                        r = t.batchId, n.done()
                    }).next(() => r)
                }
                getAllMutationBatches(e) {
                    var t = IDBKeyRange.bound([this.userId, -1], [this.userId, Number.POSITIVE_INFINITY]);
                    return Ms(e).U("userMutationsIndex", t).next(e => e.map(e => Gi(this.serializer, e)))
                }
                getAllMutationBatchesAffectingDocumentKey(a, o) {
                    const e = qe(this.userId, o.path),
                        t = IDBKeyRange.lowerBound(e),
                        u = [];
                    return Fs(a).J({
                        range: t
                    }, (e, t, n) => {
                        var [r, i, s] = e, i = Ue(i);
                        if (r === this.userId && o.path.isEqual(i)) return Ms(a).get(s).next(e => {
                            if (!e) throw P();
                            U(e.userId === this.userId), u.push(Gi(this.serializer, e))
                        });
                        n.done()
                    }).next(() => u)
                }
                getAllMutationBatchesAffectingDocumentKeys(t, e) {
                    let o = new wt(X);
                    const n = [];
                    return e.forEach(a => {
                        var e = qe(this.userId, a.path),
                            e = IDBKeyRange.lowerBound(e),
                            e = Fs(t).J({
                                range: e
                            }, (e, t, n) => {
                                var [r, i, s] = e, i = Ue(i);
                                r === this.userId && a.path.isEqual(i) ? o = o.add(s) : n.done()
                            });
                        n.push(e)
                    }), _e.waitFor(n).next(() => this.xn(t, o))
                }
                getAllMutationBatchesAffectingQuery(e, t) {
                    const a = t.path,
                        o = a.length + 1,
                        n = qe(this.userId, a),
                        r = IDBKeyRange.lowerBound(n);
                    let u = new wt(X);
                    return Fs(e).J({
                        range: r
                    }, (e, t, n) => {
                        var [r, i, s] = e, i = Ue(i);
                        r === this.userId && a.isPrefixOf(i) ? i.length === o && (u = u.add(s)) : n.done()
                    }).next(() => this.xn(e, u))
                }
                xn(t, e) {
                    const n = [],
                        r = [];
                    return e.forEach(e => {
                        r.push(Ms(t).get(e).next(e => {
                            if (null === e) throw P();
                            U(e.userId === this.userId), n.push(Gi(this.serializer, e))
                        }))
                    }), _e.waitFor(r).next(() => n)
                }
                removeMutationBatch(t, n) {
                    return ks(t._e, this.userId, n).next(e => (t.addOnCommittedListener(() => {
                        this.On(n.batchId)
                    }), _e.forEach(e, e => this.referenceDelegate.markPotentiallyOrphaned(t, e))))
                }
                On(e) {
                    delete this.Fn[e]
                }
                performConsistencyCheck(n) {
                    return this.checkEmpty(n).next(e => {
                        if (!e) return _e.resolve();
                        const t = IDBKeyRange.lowerBound([this.userId]),
                            r = [];
                        return Fs(n).J({
                            range: t
                        }, (e, t, n) => {
                            if (e[0] === this.userId) {
                                const t = Ue(e[1]);
                                r.push(t)
                            } else n.done()
                        }).next(() => {
                            U(0 === r.length)
                        })
                    })
                }
                containsKey(e, t) {
                    return Ls(e, this.userId, t)
                }
                Nn(e) {
                    return Vs(e).get(this.userId).next(e => e || {
                        userId: this.userId,
                        lastAcknowledgedBatchId: -1,
                        lastStreamToken: ""
                    })
                }
            }

            function Ls(e, s, t) {
                const n = qe(s, t.path),
                    a = n[1],
                    r = IDBKeyRange.lowerBound(n);
                let o = !1;
                return Fs(e).J({
                    range: r,
                    H: !0
                }, (e, t, n) => {
                    var [r, i] = e;
                    r === s && i === a && (o = !0), n.done()
                }).next(() => o)
            }

            function Ms(e) {
                return dt(e, "mutations")
            }

            function Fs(e) {
                return dt(e, "documentMutations")
            }

            function Vs(e) {
                return dt(e, "mutationQueues")
            }
            class Ps {
                constructor(e) {
                    this.Ln = e
                }
                next() {
                    return this.Ln += 2, this.Ln
                }
                static Bn() {
                    return new Ps(0)
                }
                static kn() {
                    return new Ps(-1)
                }
            }
            class Us {
                constructor(e, t) {
                    this.referenceDelegate = e, this.serializer = t
                }
                allocateTargetId(n) {
                    return this.qn(n).next(e => {
                        const t = new Ps(e.highestTargetId);
                        return e.highestTargetId = t.next(), this.Qn(n, e).next(() => e.highestTargetId)
                    })
                }
                getLastRemoteSnapshotVersion(e) {
                    return this.qn(e).next(e => ne.fromTimestamp(new te(e.lastRemoteSnapshotVersion.seconds, e.lastRemoteSnapshotVersion.nanoseconds)))
                }
                getHighestSequenceNumber(e) {
                    return this.qn(e).next(e => e.highestListenSequenceNumber)
                }
                setTargetsMetadata(t, n, r) {
                    return this.qn(t).next(e => (e.highestListenSequenceNumber = n, r && (e.lastRemoteSnapshotVersion = r.toTimestamp()), n > e.highestListenSequenceNumber && (e.highestListenSequenceNumber = n), this.Qn(t, e)))
                }
                addTargetData(t, n) {
                    return this.Kn(t, n).next(() => this.qn(t).next(e => (e.targetCount += 1, this.$n(n, e), this.Qn(t, e))))
                }
                updateTargetData(e, t) {
                    return this.Kn(e, t)
                }
                removeTargetData(t, e) {
                    return this.removeMatchingKeysForTargetId(t, e.targetId).next(() => Bs(t).delete(e.targetId)).next(() => this.qn(t)).next(e => (U(0 < e.targetCount), --e.targetCount, this.Qn(t, e)))
                }
                removeTargets(r, i, s) {
                    let a = 0;
                    const o = [];
                    return Bs(r).J((e, t) => {
                        var n = zi(t);
                        n.sequenceNumber <= i && null === s.get(n.targetId) && (a++, o.push(this.removeTargetData(r, n)))
                    }).next(() => _e.waitFor(o)).next(() => a)
                }
                forEachTarget(e, r) {
                    return Bs(e).J((e, t) => {
                        var n = zi(t);
                        r(n)
                    })
                }
                qn(e) {
                    return qs(e).get("targetGlobalKey").next(e => (U(null !== e), e))
                }
                Qn(e, t) {
                    return qs(e).put("targetGlobalKey", t)
                }
                Kn(e, t) {
                    return Bs(e).put($i(this.serializer, t))
                }
                $n(e, t) {
                    let n = !1;
                    return e.targetId > t.highestTargetId && (t.highestTargetId = e.targetId, n = !0), e.sequenceNumber > t.highestListenSequenceNumber && (t.highestListenSequenceNumber = e.sequenceNumber, n = !0), n
                }
                getTargetCount(e) {
                    return this.qn(e).next(e => e.targetCount)
                }
                getTargetData(e, i) {
                    var t = Fn(i),
                        t = IDBKeyRange.bound([t, Number.NEGATIVE_INFINITY], [t, Number.POSITIVE_INFINITY]);
                    let s = null;
                    return Bs(e).J({
                        range: t,
                        index: "queryTargetsIndex"
                    }, (e, t, n) => {
                        var r = zi(t);
                        Vn(i, r.target) && (s = r, n.done())
                    }).next(() => s)
                }
                addMatchingKeys(n, e, r) {
                    const i = [],
                        s = js(n);
                    return e.forEach(e => {
                        var t = Ve(e.path);
                        i.push(s.put({
                            targetId: r,
                            path: t
                        })), i.push(this.referenceDelegate.addReference(n, r, e))
                    }), _e.waitFor(i)
                }
                removeMatchingKeys(n, e, r) {
                    const i = js(n);
                    return _e.forEach(e, e => {
                        var t = Ve(e.path);
                        return _e.waitFor([i.delete([r, t]), this.referenceDelegate.removeReference(n, r, e)])
                    })
                }
                removeMatchingKeysForTargetId(e, t) {
                    const n = js(e),
                        r = IDBKeyRange.bound([t], [t + 1], !1, !0);
                    return n.delete(r)
                }
                getMatchingKeysForTargetId(e, t) {
                    const n = IDBKeyRange.bound([t], [t + 1], !1, !0),
                        r = js(e);
                    let i = lr();
                    return r.J({
                        range: n,
                        H: !0
                    }, (e, t, n) => {
                        var r = Ue(e[1]),
                            r = new oe(r);
                        i = i.add(r)
                    }).next(() => i)
                }
                containsKey(e, t) {
                    var n = Ve(t.path),
                        n = IDBKeyRange.bound([n], [ee(n)], !1, !0);
                    let r = 0;
                    return js(e).J({
                        index: "documentTargetsIndex",
                        H: !0,
                        range: n
                    }, ([e], t, n) => {
                        0 !== e && (r++, n.done())
                    }).next(() => 0 < r)
                }
                ot(e, t) {
                    return Bs(e).get(t).next(e => e ? zi(e) : null)
                }
            }

            function Bs(e) {
                return dt(e, "targets")
            }

            function qs(e) {
                return dt(e, "targetGlobal")
            }

            function js(e) {
                return dt(e, "targetDocuments")
            }

            function Ks([e, t], [n, r]) {
                var i = X(e, n);
                return 0 === i ? X(t, r) : i
            }
            class Gs {
                constructor(e) {
                    this.Un = e, this.buffer = new wt(Ks), this.Wn = 0
                }
                Gn() {
                    return ++this.Wn
                }
                zn(e) {
                    var t = [e, this.Gn()];
                    if (this.buffer.size < this.Un) this.buffer = this.buffer.add(t);
                    else {
                        const e = this.buffer.last();
                        Ks(t, e) < 0 && (this.buffer = this.buffer.delete(e).add(t))
                    }
                }
                get maxValue() {
                    return this.buffer.last()[0]
                }
            }
            class zs {
                constructor(e, t, n) {
                    this.garbageCollector = e, this.asyncQueue = t, this.localStore = n, this.jn = null
                }
                start() {
                    -1 !== this.garbageCollector.params.cacheSizeCollectionThreshold && this.Hn(6e4)
                }
                stop() {
                    this.jn && (this.jn.cancel(), this.jn = null)
                }
                get started() {
                    return null !== this.jn
                }
                Hn(e) {
                    L("LruGarbageCollector", `Garbage collection scheduled in ${e}ms`), this.jn = this.asyncQueue.enqueueAfterDelay("lru_garbage_collection", e, async () => {
                        this.jn = null;
                        try {
                            await this.localStore.collectGarbage(this.garbageCollector)
                        } catch (e) {
                            xe(e) ? L("LruGarbageCollector", "Ignoring IndexedDB error during garbage collection: ", e) : await we(e)
                        }
                        await this.Hn(3e5)
                    })
                }
            }
            class $s {
                constructor(e, t) {
                    this.Jn = e, this.params = t
                }
                calculateTargetCount(e, t) {
                    return this.Jn.Yn(e).next(e => Math.floor(t / 100 * e))
                }
                nthSequenceNumber(e, t) {
                    if (0 === t) return _e.resolve(Oe.oe);
                    const n = new Gs(t);
                    return this.Jn.forEachTarget(e, e => n.zn(e.sequenceNumber)).next(() => this.Jn.Zn(e, e => n.zn(e))).next(() => n.maxValue)
                }
                removeTargets(e, t, n) {
                    return this.Jn.removeTargets(e, t, n)
                }
                removeOrphanedDocuments(e, t) {
                    return this.Jn.removeOrphanedDocuments(e, t)
                }
                collect(t, n) {
                    return -1 === this.params.cacheSizeCollectionThreshold ? (L("LruGarbageCollector", "Garbage collection skipped; disabled"), _e.resolve(As)) : this.getCacheSize(t).next(e => e < this.params.cacheSizeCollectionThreshold ? (L("LruGarbageCollector", `Garbage collection skipped; Cache size ${e} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`), As) : this.Xn(t, n))
                }
                getCacheSize(e) {
                    return this.Jn.getCacheSize(e)
                }
                Xn(t, n) {
                    let r, i, s, a, o, u, c;
                    const h = Date.now();
                    return this.calculateTargetCount(t, this.params.percentileToCollect).next(e => (i = e > this.params.maximumSequenceNumbersToCollect ? (L("LruGarbageCollector", `Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${e}`), this.params.maximumSequenceNumbersToCollect) : e, a = Date.now(), this.nthSequenceNumber(t, i))).next(e => (r = e, o = Date.now(), this.removeTargets(t, r, n))).next(e => (s = e, u = Date.now(), this.removeOrphanedDocuments(t, r))).next(e => (c = Date.now(), O() <= l.DEBUG && L("LruGarbageCollector", `LRU Garbage Collection\n\tCounted targets in ${a-h}ms\n\tDetermined least recently used ${i} in ` + (o - a) + "ms\n" + `\tRemoved ${s} targets in ` + (u - o) + "ms\n" + `\tRemoved ${e} documents in ` + (c - u) + "ms\n" + `Total Duration: ${c-h}ms`), _e.resolve({
                        didRun: !0,
                        sequenceNumbersCollected: i,
                        targetsRemoved: s,
                        documentsRemoved: e
                    })))
                }
            }

            function Qs(e, t) {
                return new $s(e, t)
            }
            class Hs {
                constructor(e, t) {
                    this.db = e, this.garbageCollector = Qs(this, t)
                }
                Yn(e) {
                    const n = this.er(e);
                    return this.db.getTargetCache().getTargetCount(e).next(t => n.next(e => t + e))
                }
                er(e) {
                    let t = 0;
                    return this.Zn(e, e => {
                        t++
                    }).next(() => t)
                }
                forEachTarget(e, t) {
                    return this.db.getTargetCache().forEachTarget(e, t)
                }
                Zn(e, n) {
                    return this.tr(e, (e, t) => n(t))
                }
                addReference(e, t, n) {
                    return Ws(e, n)
                }
                removeReference(e, t, n) {
                    return Ws(e, n)
                }
                removeTargets(e, t, n) {
                    return this.db.getTargetCache().removeTargets(e, t, n)
                }
                markPotentiallyOrphaned(e, t) {
                    return Ws(e, t)
                }
                nr(t, n) {
                    let r = !1;
                    return Vs(t).Y(e => Ls(t, e, n).next(e => (e && (r = !0), _e.resolve(!e)))).next(() => r)
                }
                removeOrphanedDocuments(n, r) {
                    const i = this.db.getRemoteDocumentCache().newChangeBuffer(),
                        s = [];
                    let a = 0;
                    return this.tr(n, (t, e) => {
                        if (e <= r) {
                            const r = this.nr(n, t).next(e => {
                                if (!e) return a++, i.getEntry(n, t).next(() => (i.removeEntry(t, ne.min()), js(n).delete(function (e) {
                                    return [0, Ve(e.path)]
                                }(t))))
                            });
                            s.push(r)
                        }
                    }).next(() => _e.waitFor(s)).next(() => i.apply(n)).next(() => a)
                }
                removeTarget(e, t) {
                    var n = t.withSequenceNumber(e.currentSequenceNumber);
                    return this.db.getTargetCache().updateTargetData(e, n)
                }
                updateLimboDocument(e, t) {
                    return Ws(e, t)
                }
                tr(e, r) {
                    const t = js(e);
                    let i, s = Oe.oe;
                    return t.J({
                        index: "documentTargetsIndex"
                    }, ([e], {
                        path: t,
                        sequenceNumber: n
                    }) => {
                        0 === e ? (s !== Oe.oe && r(new oe(Ue(i)), s), s = n, i = t) : s = Oe.oe
                    }).next(() => {
                        s !== Oe.oe && r(new oe(Ue(i)), s)
                    })
                }
                getCacheSize(e) {
                    return this.db.getRemoteDocumentCache().getSize(e)
                }
            }

            function Ws(e, t) {
                return js(e).put((e = e.currentSequenceNumber, {
                    targetId: 0,
                    path: Ve(t.path),
                    sequenceNumber: e
                }))
            }
            class Js {
                constructor() {
                    this.changes = new rr(e => e.toString(), (e, t) => e.isEqual(t)), this.changesApplied = !1
                }
                addEntry(e) {
                    this.assertNotApplied(), this.changes.set(e.key, e)
                }
                removeEntry(e, t) {
                    this.assertNotApplied(), this.changes.set(e, nn.newInvalidDocument(e).setReadTime(t))
                }
                getEntry(e, t) {
                    this.assertNotApplied();
                    var n = this.changes.get(t);
                    return void 0 !== n ? _e.resolve(n) : this.getFromCache(e, t)
                }
                getEntries(e, t) {
                    return this.getAllFromCache(e, t)
                }
                apply(e) {
                    return this.assertNotApplied(), this.changesApplied = !0, this.applyChanges(e)
                }
                assertNotApplied() {}
            }
            class Ys {
                constructor(e) {
                    this.serializer = e
                }
                setIndexManager(e) {
                    this.indexManager = e
                }
                addEntry(e, t, n) {
                    return ta(e).put(n)
                }
                removeEntry(e, t, n) {
                    return ta(e).delete(function (e, t) {
                        const n = e.path.toArray();
                        return [n.slice(0, n.length - 2), n[n.length - 2], qi(t), n[n.length - 1]]
                    }(t, n))
                }
                updateMetadata(t, n) {
                    return this.getMetadata(t).next(e => (e.byteSize += n, this.rr(t, e)))
                }
                getEntry(e, n) {
                    let r = nn.newInvalidDocument(n);
                    return ta(e).J({
                        index: "documentKeyIndex",
                        range: IDBKeyRange.only(na(n))
                    }, (e, t) => {
                        r = this.ir(n, t)
                    }).next(() => r)
                }
                sr(e, n) {
                    let r = {
                        size: 0,
                        document: nn.newInvalidDocument(n)
                    };
                    return ta(e).J({
                        index: "documentKeyIndex",
                        range: IDBKeyRange.only(na(n))
                    }, (e, t) => {
                        r = {
                            document: this.ir(n, t),
                            size: Rs(t)
                        }
                    }).next(() => r)
                }
                getEntries(e, t) {
                    let r = ir;
                    return this._r(e, t, (e, t) => {
                        var n = this.ir(e, t);
                        r = r.insert(e, n)
                    }).next(() => r)
                }
                ar(e, t) {
                    let r = ir,
                        i = new pt(oe.comparator);
                    return this._r(e, t, (e, t) => {
                        var n = this.ir(e, t);
                        r = r.insert(e, n), i = i.insert(e, Rs(t))
                    }).next(() => ({
                        documents: r,
                        ur: i
                    }))
                }
                _r(e, t, i) {
                    if (t.isEmpty()) return _e.resolve();
                    let n = new wt(ia);
                    t.forEach(e => n = n.add(e));
                    const r = IDBKeyRange.bound(na(n.first()), na(n.last())),
                        s = n.getIterator();
                    let a = s.getNext();
                    return ta(e).J({
                        index: "documentKeyIndex",
                        range: r
                    }, (e, t, n) => {
                        for (var r = oe.fromSegments([...t.prefixPath, t.collectionGroup, t.documentId]); a && ia(a, r) < 0;) i(a, null), a = s.getNext();
                        a && a.isEqual(r) && (i(a, t), a = s.hasNext() ? s.getNext() : null), a ? n.$(na(a)) : n.done()
                    }).next(() => {
                        for (; a;) i(a, null), a = s.hasNext() ? s.getNext() : null
                    })
                }
                getDocumentsMatchingQuery(e, n, t, r, i) {
                    const s = n.path,
                        a = [s.popLast().toArray(), s.lastSegment(), qi(t.readTime), t.documentKey.path.isEmpty() ? "" : t.documentKey.path.lastSegment()],
                        o = [s.popLast().toArray(), s.lastSegment(), [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER], ""];
                    return ta(e).U(IDBKeyRange.bound(a, o, !0)).next(e => {
                        null == i || i.incrementDocumentReadCount(e.length);
                        let t = ir;
                        for (const i of e) {
                            const e = this.ir(oe.fromSegments(i.prefixPath.concat(i.collectionGroup, i.documentId)), i);
                            e.isFoundDocument() && (er(n, e) || r.has(e.key)) && (t = t.insert(e.key, e))
                        }
                        return t
                    })
                }
                getAllFromCollectionGroup(e, t, n, i) {
                    let s = ir;
                    var r = ra(t, n),
                        a = ra(t, me.max());
                    return ta(e).J({
                        index: "collectionGroupIndex",
                        range: IDBKeyRange.bound(r, a, !0)
                    }, (e, t, n) => {
                        var r = this.ir(oe.fromSegments(t.prefixPath.concat(t.collectionGroup, t.documentId)), t);
                        s = s.insert(r.key, r), s.size === i && n.done()
                    }).next(() => s)
                }
                newChangeBuffer(e) {
                    return new Zs(this, !!e && e.trackRemovals)
                }
                getSize(e) {
                    return this.getMetadata(e).next(e => e.byteSize)
                }
                getMetadata(e) {
                    return ea(e).get("remoteDocumentGlobalKey").next(e => (U(!!e), e))
                }
                rr(e, t) {
                    return ea(e).put("remoteDocumentGlobalKey", t)
                }
                ir(e, t) {
                    if (t) {
                        const e = function (e, t) {
                            let n;
                            if (t.document) n = Di(e.ct, t.document, !!t.hasCommittedMutations);
                            else if (t.noDocument) {
                                const e = oe.fromSegments(t.noDocument.path),
                                    i = Ki(t.noDocument.readTime);
                                n = nn.newNoDocument(e, i), t.hasCommittedMutations && n.setHasCommittedMutations()
                            } else {
                                if (!t.unknownDocument) return P(); {
                                    const e = oe.fromSegments(t.unknownDocument.path),
                                        s = Ki(t.unknownDocument.version);
                                    n = nn.newUnknownDocument(e, s)
                                }
                            }
                            return t.readTime && n.setReadTime((t = t.readTime, r = new te(t[0], t[1]), ne.fromTimestamp(r))), n;
                            var r
                        }(this.serializer, t);
                        if (!e.isNoDocument() || !e.version.isEqual(ne.min())) return e
                    }
                    return nn.newInvalidDocument(e)
                }
            }

            function Xs(e) {
                return new Ys(e)
            }
            class Zs extends Js {
                constructor(e, t) {
                    super(), this.cr = e, this.trackRemovals = t, this.lr = new rr(e => e.toString(), (e, t) => e.isEqual(t))
                }
                applyChanges(s) {
                    const a = [];
                    let o = 0,
                        u = new wt((e, t) => X(e.canonicalString(), t.canonicalString()));
                    return this.changes.forEach((e, t) => {
                        var n = this.lr.get(e);
                        if (a.push(this.cr.removeEntry(s, e, n.readTime)), t.isValidDocument()) {
                            var r = Bi(this.cr.serializer, t);
                            u = u.add(e.path.popLast());
                            var i = Rs(r);
                            o += i - n.size, a.push(this.cr.addEntry(s, e, r))
                        } else if (o -= n.size, this.trackRemovals) {
                            const o = Bi(this.cr.serializer, t.convertToNoDocument(ne.min()));
                            a.push(this.cr.addEntry(s, e, o))
                        }
                    }), u.forEach(e => {
                        a.push(this.cr.indexManager.addToCollectionParentIndex(s, e))
                    }), a.push(this.cr.updateMetadata(s, o)), _e.waitFor(a)
                }
                getFromCache(e, t) {
                    return this.cr.sr(e, t).next(e => (this.lr.set(t, {
                        size: e.size,
                        readTime: e.document.readTime
                    }), e.document))
                }
                getAllFromCache(e, t) {
                    return this.cr.ar(e, t).next(({
                        documents: n,
                        ur: e
                    }) => (e.forEach((e, t) => {
                        this.lr.set(e, {
                            size: t,
                            readTime: n.get(e).readTime
                        })
                    }), n))
                }
            }

            function ea(e) {
                return dt(e, "remoteDocumentGlobal")
            }

            function ta(e) {
                return dt(e, "remoteDocumentsV14")
            }

            function na(e) {
                const t = e.path.toArray();
                return [t.slice(0, t.length - 2), t[t.length - 2], t[t.length - 1]]
            }

            function ra(e, t) {
                const n = t.documentKey.path.toArray();
                return [e, qi(t.readTime), n.slice(0, n.length - 2), 0 < n.length ? n[n.length - 1] : ""]
            }

            function ia(e, t) {
                var n = e.path.toArray(),
                    r = t.path.toArray();
                let i = 0;
                for (let s = 0; s < n.length - 2 && s < r.length - 2; ++s)
                    if (i = X(n[s], r[s]), i) return i;
                return i = X(n.length, r.length), i || (i = X(n[n.length - 2], r[r.length - 2]), i || X(n[n.length - 1], r[r.length - 1]))
            }
            class sa {
                constructor(e, t) {
                    this.overlayedDocument = e, this.mutatedFields = t
                }
            }
            class aa {
                constructor(e, t, n, r) {
                    this.remoteDocumentCache = e, this.mutationQueue = t, this.documentOverlayCache = n, this.indexManager = r
                }
                getDocument(t, n) {
                    let r = null;
                    return this.documentOverlayCache.getOverlay(t, n).next(e => (r = e, this.remoteDocumentCache.getEntry(t, n))).next(e => (null !== r && Or(r.mutation, e, It.empty(), te.now()), e))
                }
                getDocuments(t, e) {
                    return this.remoteDocumentCache.getEntries(t, e).next(e => this.getLocalViewOfDocuments(t, e, lr()).next(() => e))
                }
                getLocalViewOfDocuments(e, t, n = lr()) {
                    const r = ur();
                    return this.populateOverlays(e, r, t).next(() => this.computeViews(e, t, r, n).next(e => {
                        let n = ar();
                        return e.forEach((e, t) => {
                            n = n.insert(e, t.overlayedDocument)
                        }), n
                    }))
                }
                getOverlayedDocuments(e, t) {
                    const n = ur();
                    return this.populateOverlays(e, n, t).next(() => this.computeViews(e, t, n, lr()))
                }
                populateOverlays(e, n, t) {
                    const r = [];
                    return t.forEach(e => {
                        n.has(e) || r.push(e)
                    }), this.documentOverlayCache.getOverlays(e, r).next(e => {
                        e.forEach((e, t) => {
                            n.set(e, t)
                        })
                    })
                }
                computeViews(e, t, r, i) {
                    let s = ir;
                    const a = ur(),
                        o = ur();
                    return t.forEach((e, t) => {
                        const n = r.get(t.key);
                        i.has(t.key) && (void 0 === n || n.mutation instanceof Fr) ? s = s.insert(t.key, t) : void 0 !== n ? (a.set(t.key, n.mutation.getFieldMask()), Or(n.mutation, t, n.mutation.getFieldMask(), te.now())) : a.set(t.key, It.empty())
                    }), this.recalculateAndSaveOverlays(e, s).next(e => (e.forEach((e, t) => a.set(e, t)), t.forEach((e, t) => {
                        var n;
                        return o.set(e, new sa(t, null !== (n = a.get(e)) && void 0 !== n ? n : null))
                    }), o))
                }
                recalculateAndSaveOverlays(s, a) {
                    const o = ur();
                    let u = new pt((e, t) => e - t),
                        c = lr();
                    return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(s, a).next(e => {
                        for (const r of e) r.keys().forEach(e => {
                            var t, n = a.get(e);
                            null !== n && (t = o.get(e) || It.empty(), t = r.applyToLocalView(n, t), o.set(e, t), t = (u.get(r.batchId) || lr()).add(e), u = u.insert(r.batchId, t))
                        })
                    }).next(() => {
                        const e = [],
                            t = u.getReverseIterator();
                        for (; t.hasNext();) {
                            const u = t.getNext(),
                                n = u.key,
                                r = u.value,
                                i = ur();
                            r.forEach(e => {
                                var t;
                                c.has(e) || (null !== (t = kr(a.get(e), o.get(e))) && i.set(e, t), c = c.add(e))
                            }), e.push(this.documentOverlayCache.saveOverlays(s, n, i))
                        }
                        return _e.waitFor(e)
                    }).next(() => o)
                }
                recalculateAndSaveOverlaysForDocumentKeys(t, e) {
                    return this.remoteDocumentCache.getEntries(t, e).next(e => this.recalculateAndSaveOverlays(t, e))
                }
                getDocumentsMatchingQuery(e, t, n, r) {
                    return i = t, oe.isDocumentKey(i.path) && null === i.collectionGroup && 0 === i.filters.length ? this.getDocumentsMatchingDocumentQuery(e, t.path) : $n(t) ? this.getDocumentsMatchingCollectionGroupQuery(e, t, n, r) : this.getDocumentsMatchingCollectionQuery(e, t, n, r);
                    var i
                }
                getNextDocuments(s, t, a, o) {
                    return this.remoteDocumentCache.getAllFromCollectionGroup(s, t, a, o).next(n => {
                        const e = 0 < o - n.size ? this.documentOverlayCache.getOverlaysForCollectionGroup(s, t, a.largestBatchId, o - n.size) : _e.resolve(ur());
                        let r = -1,
                            i = n;
                        return e.next(e => _e.forEach(e, (t, e) => (r < e.largestBatchId && (r = e.largestBatchId), n.get(t) ? _e.resolve() : this.remoteDocumentCache.getEntry(s, t).next(e => {
                            i = i.insert(t, e)
                        }))).next(() => this.populateOverlays(s, e, n)).next(() => this.computeViews(s, i, e, lr())).next(e => ({
                            batchId: r,
                            changes: or(e)
                        })))
                    })
                }
                getDocumentsMatchingDocumentQuery(e, t) {
                    return this.getDocument(e, new oe(t)).next(e => {
                        let t = ar();
                        return e.isFoundDocument() && (t = t.insert(e.key, e)), t
                    })
                }
                getDocumentsMatchingCollectionGroupQuery(r, i, s, a) {
                    const o = i.collectionGroup;
                    let u = ar();
                    return this.indexManager.getCollectionParents(r, o).next(e => _e.forEach(e, e => {
                        var t, n = (t = i, e = e.child(o), new jn(e, null, t.explicitOrderBy.slice(), t.filters.slice(), t.limit, t.limitType, t.startAt, t.endAt));
                        return this.getDocumentsMatchingCollectionQuery(r, n, s, a).next(e => {
                            e.forEach((e, t) => {
                                u = u.insert(e, t)
                            })
                        })
                    }).next(() => u))
                }
                getDocumentsMatchingCollectionQuery(t, s, n, r) {
                    let a;
                    return this.documentOverlayCache.getOverlaysForCollection(t, s.path, n.largestBatchId).next(e => (a = e, this.remoteDocumentCache.getDocumentsMatchingQuery(t, s, n, a, r))).next(r => {
                        a.forEach((e, t) => {
                            var n = t.getKey();
                            null === r.get(n) && (r = r.insert(n, nn.newInvalidDocument(n)))
                        });
                        let i = ar();
                        return r.forEach((e, t) => {
                            var n = a.get(e);
                            void 0 !== n && Or(n.mutation, t, It.empty(), te.now()), er(s, t) && (i = i.insert(e, t))
                        }), i
                    })
                }
            }
            class oa {
                constructor(e) {
                    this.serializer = e, this.hr = new Map, this.Pr = new Map
                }
                getBundleMetadata(e, t) {
                    return _e.resolve(this.hr.get(t))
                }
                saveBundleMetadata(e, t) {
                    return this.hr.set(t.id, {
                        id: t.id,
                        version: t.version,
                        createTime: pi(t.createTime)
                    }), _e.resolve()
                }
                getNamedQuery(e, t) {
                    return _e.resolve(this.Pr.get(t))
                }
                saveNamedQuery(e, t) {
                    return this.Pr.set(t.name, {
                        name: (t = t).name,
                        query: Qi(t.bundledQuery),
                        readTime: pi(t.readTime)
                    }), _e.resolve()
                }
            }
            class ua {
                constructor() {
                    this.overlays = new pt(oe.comparator), this.Ir = new Map
                }
                getOverlay(e, t) {
                    return _e.resolve(this.overlays.get(t))
                }
                getOverlays(e, t) {
                    const n = ur();
                    return _e.forEach(t, t => this.getOverlay(e, t).next(e => {
                        null !== e && n.set(t, e)
                    })).next(() => n)
                }
                saveOverlays(n, r, e) {
                    return e.forEach((e, t) => {
                        this.ht(n, r, t)
                    }), _e.resolve()
                }
                removeOverlaysForBatchId(e, t, n) {
                    const r = this.Ir.get(n);
                    return void 0 !== r && (r.forEach(e => this.overlays = this.overlays.remove(e)), this.Ir.delete(n)), _e.resolve()
                }
                getOverlaysForCollection(e, t, n) {
                    const r = ur(),
                        i = t.length + 1,
                        s = new oe(t.child("")),
                        a = this.overlays.getIteratorFrom(s);
                    for (; a.hasNext();) {
                        const e = a.getNext().value,
                            s = e.getKey();
                        if (!t.isPrefixOf(s.path)) break;
                        s.path.length === i && e.largestBatchId > n && r.set(e.getKey(), e)
                    }
                    return _e.resolve(r)
                }
                getOverlaysForCollectionGroup(t, e, n, r) {
                    let i = new pt((e, t) => e - t);
                    const s = this.overlays.getIterator();
                    for (; s.hasNext();) {
                        const t = s.getNext().value;
                        if (t.getKey().getCollectionGroup() === e && t.largestBatchId > n) {
                            let e = i.get(t.largestBatchId);
                            null === e && (e = ur(), i = i.insert(t.largestBatchId, e)), e.set(t.getKey(), t)
                        }
                    }
                    const a = ur(),
                        o = i.getIterator();
                    for (; o.hasNext() && (o.getNext().value.forEach((e, t) => a.set(e, t)), !(a.size() >= r)););
                    return _e.resolve(a)
                }
                ht(e, t, n) {
                    var r = this.overlays.get(n.key);
                    if (null !== r) {
                        const e = this.Ir.get(r.largestBatchId).delete(n.key);
                        this.Ir.set(r.largestBatchId, e)
                    }
                    this.overlays = this.overlays.insert(n.key, new Gr(t, n));
                    let i = this.Ir.get(t);
                    void 0 === i && (i = lr(), this.Ir.set(t, i)), this.Ir.set(t, i.add(n.key))
                }
            }
            class ca {
                constructor() {
                    this.sessionToken = Et.EMPTY_BYTE_STRING
                }
                getSessionToken(e) {
                    return _e.resolve(this.sessionToken)
                }
                setSessionToken(e, t) {
                    return this.sessionToken = t, _e.resolve()
                }
            }
            class ha {
                constructor() {
                    this.Tr = new wt(la.Er), this.dr = new wt(la.Ar)
                }
                isEmpty() {
                    return this.Tr.isEmpty()
                }
                addReference(e, t) {
                    var n = new la(e, t);
                    this.Tr = this.Tr.add(n), this.dr = this.dr.add(n)
                }
                Rr(e, t) {
                    e.forEach(e => this.addReference(e, t))
                }
                removeReference(e, t) {
                    this.Vr(new la(e, t))
                }
                mr(e, t) {
                    e.forEach(e => this.removeReference(e, t))
                }
                gr(e) {
                    const t = new oe(new ie([])),
                        n = new la(t, e),
                        r = new la(t, e + 1),
                        i = [];
                    return this.dr.forEachInRange([n, r], e => {
                        this.Vr(e), i.push(e.key)
                    }), i
                }
                pr() {
                    this.Tr.forEach(e => this.Vr(e))
                }
                Vr(e) {
                    this.Tr = this.Tr.delete(e), this.dr = this.dr.delete(e)
                }
                yr(e) {
                    var t = new oe(new ie([])),
                        n = new la(t, e),
                        t = new la(t, e + 1);
                    let r = lr();
                    return this.dr.forEachInRange([n, t], e => {
                        r = r.add(e.key)
                    }), r
                }
                containsKey(e) {
                    var t = new la(e, 0),
                        t = this.Tr.firstAfterOrEqual(t);
                    return null !== t && e.isEqual(t.key)
                }
            }
            class la {
                constructor(e, t) {
                    this.key = e, this.wr = t
                }
                static Er(e, t) {
                    return oe.comparator(e.key, t.key) || X(e.wr, t.wr)
                }
                static Ar(e, t) {
                    return X(e.wr, t.wr) || oe.comparator(e.key, t.key)
                }
            }
            class da {
                constructor(e, t) {
                    this.indexManager = e, this.referenceDelegate = t, this.mutationQueue = [], this.Sr = 1, this.br = new wt(la.Er)
                }
                checkEmpty(e) {
                    return _e.resolve(0 === this.mutationQueue.length)
                }
                addMutationBatch(e, t, n, r) {
                    var i = this.Sr;
                    this.Sr++, 0 < this.mutationQueue.length && this.mutationQueue[this.mutationQueue.length - 1];
                    var s = new jr(i, t, n, r);
                    this.mutationQueue.push(s);
                    for (const t of r) this.br = this.br.add(new la(t.key, i)), this.indexManager.addToCollectionParentIndex(e, t.key.path.popLast());
                    return _e.resolve(s)
                }
                lookupMutationBatch(e, t) {
                    return _e.resolve(this.Dr(t))
                }
                getNextMutationBatchAfterBatchId(e, t) {
                    var n = this.vr(t + 1),
                        n = n < 0 ? 0 : n;
                    return _e.resolve(this.mutationQueue.length > n ? this.mutationQueue[n] : null)
                }
                getHighestUnacknowledgedBatchId() {
                    return _e.resolve(0 === this.mutationQueue.length ? -1 : this.Sr - 1)
                }
                getAllMutationBatches(e) {
                    return _e.resolve(this.mutationQueue.slice())
                }
                getAllMutationBatchesAffectingDocumentKey(e, t) {
                    const n = new la(t, 0),
                        r = new la(t, Number.POSITIVE_INFINITY),
                        i = [];
                    return this.br.forEachInRange([n, r], e => {
                        var t = this.Dr(e.wr);
                        i.push(t)
                    }), _e.resolve(i)
                }
                getAllMutationBatchesAffectingDocumentKeys(e, t) {
                    let r = new wt(X);
                    return t.forEach(e => {
                        var t = new la(e, 0),
                            n = new la(e, Number.POSITIVE_INFINITY);
                        this.br.forEachInRange([t, n], e => {
                            r = r.add(e.wr)
                        })
                    }), _e.resolve(this.Cr(r))
                }
                getAllMutationBatchesAffectingQuery(e, t) {
                    const n = t.path,
                        r = n.length + 1;
                    let i = n;
                    oe.isDocumentKey(i) || (i = i.child(""));
                    var s = new la(new oe(i), 0);
                    let a = new wt(X);
                    return this.br.forEachWhile(e => {
                        var t = e.key.path;
                        return !!n.isPrefixOf(t) && (t.length === r && (a = a.add(e.wr)), !0)
                    }, s), _e.resolve(this.Cr(a))
                }
                Cr(e) {
                    const n = [];
                    return e.forEach(e => {
                        var t = this.Dr(e);
                        null !== t && n.push(t)
                    }), n
                }
                removeMutationBatch(n, r) {
                    U(0 === this.Fr(r.batchId, "removed")), this.mutationQueue.shift();
                    let i = this.br;
                    return _e.forEach(r.mutations, e => {
                        var t = new la(e.key, r.batchId);
                        return i = i.delete(t), this.referenceDelegate.markPotentiallyOrphaned(n, e.key)
                    }).next(() => {
                        this.br = i
                    })
                }
                On(e) {}
                containsKey(e, t) {
                    var n = new la(t, 0),
                        n = this.br.firstAfterOrEqual(n);
                    return _e.resolve(t.isEqual(n && n.key))
                }
                performConsistencyCheck(e) {
                    return this.mutationQueue.length, _e.resolve()
                }
                Fr(e, t) {
                    return this.vr(e)
                }
                vr(e) {
                    return 0 === this.mutationQueue.length ? 0 : e - this.mutationQueue[0].batchId
                }
                Dr(e) {
                    var t = this.vr(e);
                    return t < 0 || t >= this.mutationQueue.length ? null : this.mutationQueue[t]
                }
            }
            class fa {
                constructor(e) {
                    this.Mr = e, this.docs = new pt(oe.comparator), this.size = 0
                }
                setIndexManager(e) {
                    this.indexManager = e
                }
                addEntry(e, t) {
                    const n = t.key,
                        r = this.docs.get(n),
                        i = r ? r.size : 0,
                        s = this.Mr(t);
                    return this.docs = this.docs.insert(n, {
                        document: t.mutableCopy(),
                        size: s
                    }), this.size += s - i, this.indexManager.addToCollectionParentIndex(e, n.path.popLast())
                }
                removeEntry(e) {
                    var t = this.docs.get(e);
                    t && (this.docs = this.docs.remove(e), this.size -= t.size)
                }
                getEntry(e, t) {
                    const n = this.docs.get(t);
                    return _e.resolve(n ? n.document.mutableCopy() : nn.newInvalidDocument(t))
                }
                getEntries(e, t) {
                    let n = ir;
                    return t.forEach(e => {
                        const t = this.docs.get(e);
                        n = n.insert(e, t ? t.document.mutableCopy() : nn.newInvalidDocument(e))
                    }), _e.resolve(n)
                }
                getDocumentsMatchingQuery(e, t, n, r) {
                    let i = ir;
                    const s = t.path,
                        a = new oe(s.child("")),
                        o = this.docs.getIteratorFrom(a);
                    for (; o.hasNext();) {
                        const {
                            key: e,
                            value: {
                                document: a
                            }
                        } = o.getNext();
                        if (!s.isPrefixOf(e.path)) break;
                        e.path.length > s.length + 1 || pe(ge(a), n) <= 0 || (r.has(a.key) || er(t, a)) && (i = i.insert(a.key, a.mutableCopy()))
                    }
                    return _e.resolve(i)
                }
                getAllFromCollectionGroup(e, t, n, r) {
                    P()
                }
                Or(e, t) {
                    return _e.forEach(this.docs, e => t(e))
                }
                newChangeBuffer(e) {
                    return new ga(this)
                }
                getSize(e) {
                    return _e.resolve(this.size)
                }
            }
            class ga extends Js {
                constructor(e) {
                    super(), this.cr = e
                }
                applyChanges(n) {
                    const r = [];
                    return this.changes.forEach((e, t) => {
                        t.isValidDocument() ? r.push(this.cr.addEntry(n, t)) : this.cr.removeEntry(e)
                    }), _e.waitFor(r)
                }
                getFromCache(e, t) {
                    return this.cr.getEntry(e, t)
                }
                getAllFromCache(e, t) {
                    return this.cr.getEntries(e, t)
                }
            }
            class ma {
                constructor(e) {
                    this.persistence = e, this.Nr = new rr(e => Fn(e), Vn), this.lastRemoteSnapshotVersion = ne.min(), this.highestTargetId = 0, this.Lr = 0, this.Br = new ha, this.targetCount = 0, this.kr = Ps.Bn()
                }
                forEachTarget(e, n) {
                    return this.Nr.forEach((e, t) => n(t)), _e.resolve()
                }
                getLastRemoteSnapshotVersion(e) {
                    return _e.resolve(this.lastRemoteSnapshotVersion)
                }
                getHighestSequenceNumber(e) {
                    return _e.resolve(this.Lr)
                }
                allocateTargetId(e) {
                    return this.highestTargetId = this.kr.next(), _e.resolve(this.highestTargetId)
                }
                setTargetsMetadata(e, t, n) {
                    return n && (this.lastRemoteSnapshotVersion = n), t > this.Lr && (this.Lr = t), _e.resolve()
                }
                Kn(e) {
                    this.Nr.set(e.target, e);
                    var t = e.targetId;
                    t > this.highestTargetId && (this.kr = new Ps(t), this.highestTargetId = t), e.sequenceNumber > this.Lr && (this.Lr = e.sequenceNumber)
                }
                addTargetData(e, t) {
                    return this.Kn(t), this.targetCount += 1, _e.resolve()
                }
                updateTargetData(e, t) {
                    return this.Kn(t), _e.resolve()
                }
                removeTargetData(e, t) {
                    return this.Nr.delete(t.target), this.Br.gr(t.targetId), --this.targetCount, _e.resolve()
                }
                removeTargets(n, r, i) {
                    let s = 0;
                    const a = [];
                    return this.Nr.forEach((e, t) => {
                        t.sequenceNumber <= r && null === i.get(t.targetId) && (this.Nr.delete(e), a.push(this.removeMatchingKeysForTargetId(n, t.targetId)), s++)
                    }), _e.waitFor(a).next(() => s)
                }
                getTargetCount(e) {
                    return _e.resolve(this.targetCount)
                }
                getTargetData(e, t) {
                    var n = this.Nr.get(t) || null;
                    return _e.resolve(n)
                }
                addMatchingKeys(e, t, n) {
                    return this.Br.Rr(t, n), _e.resolve()
                }
                removeMatchingKeys(t, e, n) {
                    this.Br.mr(e, n);
                    const r = this.persistence.referenceDelegate,
                        i = [];
                    return r && e.forEach(e => {
                        i.push(r.markPotentiallyOrphaned(t, e))
                    }), _e.waitFor(i)
                }
                removeMatchingKeysForTargetId(e, t) {
                    return this.Br.gr(t), _e.resolve()
                }
                getMatchingKeysForTargetId(e, t) {
                    var n = this.Br.yr(t);
                    return _e.resolve(n)
                }
                containsKey(e, t) {
                    return _e.resolve(this.Br.containsKey(t))
                }
            }
            class pa {
                constructor(e, t) {
                    this.qr = {}, this.overlays = {}, this.Qr = new Oe(0), this.Kr = !1, this.Kr = !0, this.$r = new ca, this.referenceDelegate = e(this), this.Ur = new ma(this), this.indexManager = new _s, this.remoteDocumentCache = (e = e => this.referenceDelegate.Wr(e), new fa(e)), this.serializer = new Ui(t), this.Gr = new oa(this.serializer)
                }
                start() {
                    return Promise.resolve()
                }
                shutdown() {
                    return this.Kr = !1, Promise.resolve()
                }
                get started() {
                    return this.Kr
                }
                setDatabaseDeletedListener() {}
                setNetworkEnabled() {}
                getIndexManager(e) {
                    return this.indexManager
                }
                getDocumentOverlayCache(e) {
                    let t = this.overlays[e.toKey()];
                    return t || (t = new ua, this.overlays[e.toKey()] = t), t
                }
                getMutationQueue(e, t) {
                    let n = this.qr[e.toKey()];
                    return n || (n = new da(t, this.referenceDelegate), this.qr[e.toKey()] = n), n
                }
                getGlobalsCache() {
                    return this.$r
                }
                getTargetCache() {
                    return this.Ur
                }
                getRemoteDocumentCache() {
                    return this.remoteDocumentCache
                }
                getBundleCache() {
                    return this.Gr
                }
                runTransaction(e, t, n) {
                    L("MemoryPersistence", "Starting transaction:", e);
                    const r = new ya(this.Qr.next());
                    return this.referenceDelegate.zr(), n(r).next(e => this.referenceDelegate.jr(r).next(() => e)).toPromise().then(e => (r.raiseOnCommittedEvent(), e))
                }
                Hr(t, n) {
                    return _e.or(Object.values(this.qr).map(e => () => e.containsKey(t, n)))
                }
            }
            class ya extends ve {
                constructor(e) {
                    super(), this.currentSequenceNumber = e
                }
            }
            class va {
                constructor(e) {
                    this.persistence = e, this.Jr = new ha, this.Yr = null
                }
                static Zr(e) {
                    return new va(e)
                }
                get Xr() {
                    if (this.Yr) return this.Yr;
                    throw P()
                }
                addReference(e, t, n) {
                    return this.Jr.addReference(n, t), this.Xr.delete(n.toString()), _e.resolve()
                }
                removeReference(e, t, n) {
                    return this.Jr.removeReference(n, t), this.Xr.add(n.toString()), _e.resolve()
                }
                markPotentiallyOrphaned(e, t) {
                    return this.Xr.add(t.toString()), _e.resolve()
                }
                removeTarget(e, t) {
                    this.Jr.gr(t.targetId).forEach(e => this.Xr.add(e.toString()));
                    const n = this.persistence.getTargetCache();
                    return n.getMatchingKeysForTargetId(e, t.targetId).next(e => {
                        e.forEach(e => this.Xr.add(e.toString()))
                    }).next(() => n.removeTargetData(e, t))
                }
                zr() {
                    this.Yr = new Set
                }
                jr(n) {
                    const r = this.persistence.getRemoteDocumentCache().newChangeBuffer();
                    return _e.forEach(this.Xr, e => {
                        const t = oe.fromPath(e);
                        return this.ei(n, t).next(e => {
                            e || r.removeEntry(t, ne.min())
                        })
                    }).next(() => (this.Yr = null, r.apply(n)))
                }
                updateLimboDocument(e, t) {
                    return this.ei(e, t).next(e => {
                        e ? this.Xr.delete(t.toString()) : this.Xr.add(t.toString())
                    })
                }
                Wr(e) {
                    return 0
                }
                ei(e, t) {
                    return _e.or([() => _e.resolve(this.Jr.containsKey(t)), () => this.persistence.getTargetCache().containsKey(e, t), () => this.persistence.Hr(e, t)])
                }
            }
            class wa {
                constructor(e, t) {
                    this.persistence = e, this.ti = new rr(e => Ve(e.path), (e, t) => e.isEqual(t)), this.garbageCollector = Qs(this, t)
                }
                static Zr(e, t) {
                    return new wa(e, t)
                }
                zr() {}
                jr(e) {
                    return _e.resolve()
                }
                forEachTarget(e, t) {
                    return this.persistence.getTargetCache().forEachTarget(e, t)
                }
                Yn(e) {
                    const n = this.er(e);
                    return this.persistence.getTargetCache().getTargetCount(e).next(t => n.next(e => t + e))
                }
                er(e) {
                    let t = 0;
                    return this.Zn(e, e => {
                        t++
                    }).next(() => t)
                }
                Zn(n, r) {
                    return _e.forEach(this.ti, (e, t) => this.nr(n, e, t).next(e => e ? _e.resolve() : r(t)))
                }
                removeTargets(e, t, n) {
                    return this.persistence.getTargetCache().removeTargets(e, t, n)
                }
                removeOrphanedDocuments(e, n) {
                    let r = 0;
                    const t = this.persistence.getRemoteDocumentCache(),
                        i = t.newChangeBuffer();
                    return t.Or(e, t => this.nr(e, t, n).next(e => {
                        e || (r++, i.removeEntry(t, ne.min()))
                    })).next(() => i.apply(e)).next(() => r)
                }
                markPotentiallyOrphaned(e, t) {
                    return this.ti.set(t, e.currentSequenceNumber), _e.resolve()
                }
                removeTarget(e, t) {
                    var n = t.withSequenceNumber(e.currentSequenceNumber);
                    return this.persistence.getTargetCache().updateTargetData(e, n)
                }
                addReference(e, t, n) {
                    return this.ti.set(n, e.currentSequenceNumber), _e.resolve()
                }
                removeReference(e, t, n) {
                    return this.ti.set(n, e.currentSequenceNumber), _e.resolve()
                }
                updateLimboDocument(e, t) {
                    return this.ti.set(t, e.currentSequenceNumber), _e.resolve()
                }
                Wr(e) {
                    let t = e.key.toString().length;
                    return e.isFoundDocument() && (t += function r(e) {
                        switch (Ft(e)) {
                            case 0:
                            case 1:
                                return 4;
                            case 2:
                                return 8;
                            case 3:
                            case 8:
                                return 16;
                            case 4:
                                var t = Nt(e);
                                return t ? 16 + r(t) : 16;
                            case 5:
                                return 2 * e.stringValue.length;
                            case 6:
                                return Ct(e.bytesValue).approximateByteSize();
                            case 7:
                                return e.referenceValue.length;
                            case 9:
                                return (e.arrayValue.values || []).reduce((e, t) => e + r(t), 0);
                            case 10:
                            case 11:
                                return function (e) {
                                    let n = 0;
                                    return gt(e.fields, (e, t) => {
                                        n += e.length + r(t)
                                    }), n
                                }(e.mapValue);
                            default:
                                throw P()
                        }
                    }(e.data.value)), t
                }
                nr(e, t, n) {
                    return _e.or([() => this.persistence.Hr(e, t), () => this.persistence.getTargetCache().containsKey(e, t), () => {
                        var e = this.ti.get(t);
                        return _e.resolve(void 0 !== e && n < e)
                    }])
                }
                getCacheSize(e) {
                    return this.persistence.getRemoteDocumentCache().getSize(e)
                }
            }
            class _a {
                constructor(e) {
                    this.serializer = e
                }
                O(t, e, n, r) {
                    const i = new be("createOrUpgrade", e);
                    var s;
                    n < 1 && 1 <= r && (t.createObjectStore("owner"), (s = t).createObjectStore("mutationQueues", {
                        keyPath: "userId"
                    }), s.createObjectStore("mutations", {
                        keyPath: "batchId",
                        autoIncrement: !0
                    }).createIndex("userMutationsIndex", Be, {
                        unique: !0
                    }), s.createObjectStore("documentMutations"), ba(t), t.createObjectStore("remoteDocuments"));
                    let a = _e.resolve();
                    return n < 3 && 3 <= r && (0 !== n && ((s = t).deleteObjectStore("targetDocuments"), s.deleteObjectStore("targets"), s.deleteObjectStore("targetGlobal"), ba(t)), a = a.next(() => function (e) {
                        const t = e.store("targetGlobal"),
                            n = {
                                highestTargetId: 0,
                                highestListenSequenceNumber: 0,
                                lastRemoteSnapshotVersion: ne.min().toTimestamp(),
                                targetCount: 0
                            };
                        return t.put("targetGlobalKey", n)
                    }(i))), n < 4 && 4 <= r && (0 !== n && (a = a.next(() => function (r, i) {
                        return i.store("mutations").U().next(e => {
                            r.deleteObjectStore("mutations"), r.createObjectStore("mutations", {
                                keyPath: "batchId",
                                autoIncrement: !0
                            }).createIndex("userMutationsIndex", Be, {
                                unique: !0
                            });
                            const t = i.store("mutations"),
                                n = e.map(e => t.put(e));
                            return _e.waitFor(n)
                        })
                    }(t, i))), a = a.next(() => {
                        t.createObjectStore("clientMetadata", {
                            keyPath: "clientId"
                        })
                    })), n < 5 && 5 <= r && (a = a.next(() => this.ni(i))), n < 6 && 6 <= r && (a = a.next(() => (function (e) {
                        e.createObjectStore("remoteDocumentGlobal")
                    }(t), this.ri(i)))), n < 7 && 7 <= r && (a = a.next(() => this.ii(i))), n < 8 && 8 <= r && (a = a.next(() => this.si(t, i))), n < 9 && 9 <= r && (a = a.next(() => {
                        var e;
                        (e = t).objectStoreNames.contains("remoteDocumentChanges") && e.deleteObjectStore("remoteDocumentChanges")
                    })), n < 10 && 10 <= r && (a = a.next(() => this.oi(i))), n < 11 && 11 <= r && (a = a.next(() => {
                        t.createObjectStore("bundles", {
                            keyPath: "bundleId"
                        }), t.createObjectStore("namedQueries", {
                            keyPath: "name"
                        })
                    })), n < 12 && 12 <= r && (a = a.next(() => {
                        ! function (e) {
                            const t = e.createObjectStore("documentOverlays", {
                                keyPath: tt
                            });
                            t.createIndex("collectionPathOverlayIndex", nt, {
                                unique: !1
                            }), t.createIndex("collectionGroupOverlayIndex", rt, {
                                unique: !1
                            })
                        }(t)
                    })), n < 13 && 13 <= r && (a = a.next(() => function (e) {
                        const t = e.createObjectStore("remoteDocumentsV14", {
                            keyPath: Ge
                        });
                        t.createIndex("documentKeyIndex", ze), t.createIndex("collectionGroupIndex", $e)
                    }(t)).next(() => this._i(t, i)).next(() => t.deleteObjectStore("remoteDocuments"))), n < 14 && 14 <= r && (a = a.next(() => this.ai(t, i))), n < 15 && 15 <= r && (a = a.next(() => function (e) {
                        e.createObjectStore("indexConfiguration", {
                            keyPath: "indexId",
                            autoIncrement: !0
                        }).createIndex("collectionGroupIndex", "collectionGroup", {
                            unique: !1
                        }), e.createObjectStore("indexState", {
                            keyPath: Ye
                        }).createIndex("sequenceNumberIndex", Xe, {
                            unique: !1
                        }), e.createObjectStore("indexEntries", {
                            keyPath: Ze
                        }).createIndex("documentKeyIndex", et, {
                            unique: !1
                        })
                    }(t))), n < 16 && 16 <= r && (a = a.next(() => {
                        e.objectStore("indexState").clear()
                    }).next(() => {
                        e.objectStore("indexEntries").clear()
                    })), n < 17 && 17 <= r && (a = a.next(() => {
                        t.createObjectStore("globals", {
                            keyPath: "name"
                        })
                    })), a
                }
                ri(t) {
                    let n = 0;
                    return t.store("remoteDocuments").J((e, t) => {
                        n += Rs(t)
                    }).next(() => {
                        var e = {
                            byteSize: n
                        };
                        return t.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey", e)
                    })
                }
                ni(r) {
                    const e = r.store("mutationQueues"),
                        t = r.store("mutations");
                    return e.U().next(e => _e.forEach(e, n => {
                        var e = IDBKeyRange.bound([n.userId, -1], [n.userId, n.lastAcknowledgedBatchId]);
                        return t.U("userMutationsIndex", e).next(e => _e.forEach(e, e => {
                            U(e.userId === n.userId);
                            var t = Gi(this.serializer, e);
                            return ks(r, n.userId, t).next(() => {})
                        }))
                    }))
                }
                ii(e) {
                    const a = e.store("targetDocuments"),
                        t = e.store("remoteDocuments");
                    return e.store("targetGlobal").get("targetGlobalKey").next(i => {
                        const s = [];
                        return t.J((e, t) => {
                            const n = new ie(e),
                                r = [0, Ve(n)];
                            s.push(a.get(r).next(e => e ? _e.resolve() : (e => a.put({
                                targetId: 0,
                                path: Ve(e),
                                sequenceNumber: i.highestListenSequenceNumber
                            }))(n)))
                        }).next(() => _e.waitFor(s))
                    })
                }
                si(e, t) {
                    e.createObjectStore("collectionParents", {
                        keyPath: Je
                    });
                    const n = t.store("collectionParents"),
                        r = new bs,
                        i = e => {
                            if (r.add(e)) {
                                const t = e.lastSegment(),
                                    r = e.popLast();
                                return n.put({
                                    collectionId: t,
                                    parent: Ve(r)
                                })
                            }
                        };
                    return t.store("remoteDocuments").J({
                        H: !0
                    }, (e, t) => {
                        const n = new ie(e);
                        return i(n.popLast())
                    }).next(() => t.store("documentMutations").J({
                        H: !0
                    }, ([, e], t) => {
                        const n = Ue(e);
                        return i(n.popLast())
                    }))
                }
                oi(e) {
                    const r = e.store("targets");
                    return r.J((e, t) => {
                        var n = zi(t),
                            n = $i(this.serializer, n);
                        return r.put(n)
                    })
                }
                _i(e, a) {
                    const t = a.store("remoteDocuments"),
                        o = [];
                    return t.J((e, t) => {
                        const n = a.store("remoteDocumentsV14"),
                            r = ((s = t).document ? new oe(ie.fromString(s.document.name).popFirst(5)) : s.noDocument ? oe.fromSegments(s.noDocument.path) : s.unknownDocument ? oe.fromSegments(s.unknownDocument.path) : P()).path.toArray(),
                            i = {
                                prefixPath: r.slice(0, r.length - 2),
                                collectionGroup: r[r.length - 2],
                                documentId: r[r.length - 1],
                                readTime: t.readTime || [0, 0],
                                unknownDocument: t.unknownDocument,
                                noDocument: t.noDocument,
                                document: t.document,
                                hasCommittedMutations: !!t.hasCommittedMutations
                            };
                        var s;
                        o.push(n.put(i))
                    }).next(() => _e.waitFor(o))
                }
                ai(e, s) {
                    const t = s.store("mutations"),
                        a = Xs(this.serializer),
                        o = new pa(va.Zr, this.serializer.ct);
                    return t.U().next(e => {
                        const r = new Map;
                        return e.forEach(e => {
                            var t;
                            let n = null !== (t = r.get(e.userId)) && void 0 !== t ? t : lr();
                            Gi(this.serializer, e).keys().forEach(e => n = n.add(e)), r.set(e.userId, n)
                        }), _e.forEach(r, (e, t) => {
                            var n = new N(t),
                                r = es.lt(this.serializer, n),
                                i = o.getIndexManager(n),
                                n = Os.lt(n, this.serializer, i, o.referenceDelegate);
                            return new aa(a, n, r, i).recalculateAndSaveOverlaysForDocumentKeys(new lt(s, Oe.oe), e).next()
                        })
                    })
                }
            }

            function ba(e) {
                e.createObjectStore("targetDocuments", {
                    keyPath: He
                }).createIndex("documentTargetsIndex", We, {
                    unique: !0
                }), e.createObjectStore("targets", {
                    keyPath: "targetId"
                }).createIndex("queryTargetsIndex", Qe, {
                    unique: !0
                }), e.createObjectStore("targetGlobal")
            }
            const Ia = "Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";
            class Ta {
                constructor(e, t, n, r, i, s, a, o, u, c, h = 17) {
                    if (this.allowTabSynchronization = e, this.persistenceKey = t, this.clientId = n, this.ui = i, this.window = s, this.document = a, this.ci = u, this.li = c, this.hi = h, this.Qr = null, this.Kr = !1, this.isPrimary = !1, this.networkEnabled = !0, this.Pi = null, this.inForeground = !1, this.Ii = null, this.Ti = null, this.Ei = Number.NEGATIVE_INFINITY, this.di = e => Promise.resolve(), !Ta.D()) throw new q(B.UNIMPLEMENTED, "This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");
                    this.referenceDelegate = new Hs(this, r), this.Ai = t + "main", this.serializer = new Ui(o), this.Ri = new Ie(this.Ai, this.hi, new _a(this.serializer)), this.$r = new ns, this.Ur = new Us(this.referenceDelegate, this.serializer), this.remoteDocumentCache = Xs(this.serializer), this.Gr = new Yi, this.window && this.window.localStorage ? this.Vi = this.window.localStorage : (this.Vi = null, !1 === c && M("IndexedDbPersistence", "LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))
                }
                start() {
                    return this.mi().then(() => {
                        if (!this.isPrimary && !this.allowTabSynchronization) throw new q(B.FAILED_PRECONDITION, Ia);
                        return this.fi(), this.gi(), this.pi(), this.runTransaction("getHighestListenSequenceNumber", "readonly", e => this.Ur.getHighestSequenceNumber(e))
                    }).then(e => {
                        this.Qr = new Oe(e, this.ci)
                    }).then(() => {
                        this.Kr = !0
                    }).catch(e => (this.Ri && this.Ri.close(), Promise.reject(e)))
                }
                yi(t) {
                    return this.di = async e => {
                        if (this.started) return t(e)
                    }, t(this.isPrimary)
                }
                setDatabaseDeletedListener(t) {
                    this.Ri.L(async e => {
                        null === e.newVersion && await t()
                    })
                }
                setNetworkEnabled(e) {
                    this.networkEnabled !== e && (this.networkEnabled = e, this.ui.enqueueAndForget(async () => {
                        this.started && await this.mi()
                    }))
                }
                mi() {
                    return this.runTransaction("updateClientMetadataAndTryBecomePrimary", "readwrite", t => Sa(t).put({
                        clientId: this.clientId,
                        updateTimeMs: Date.now(),
                        networkEnabled: this.networkEnabled,
                        inForeground: this.inForeground
                    }).next(() => {
                        if (this.isPrimary) return this.wi(t).next(e => {
                            e || (this.isPrimary = !1, this.ui.enqueueRetryable(() => this.di(!1)))
                        })
                    }).next(() => this.Si(t)).next(e => this.isPrimary && !e ? this.bi(t).next(() => !1) : !!e && this.Di(t).next(() => !0))).catch(e => {
                        if (xe(e)) return L("IndexedDbPersistence", "Failed to extend owner lease: ", e), this.isPrimary;
                        if (!this.allowTabSynchronization) throw e;
                        return L("IndexedDbPersistence", "Releasing owner lease after error during lease refresh", e), !1
                    }).then(e => {
                        this.isPrimary !== e && this.ui.enqueueRetryable(() => this.di(e)), this.isPrimary = e
                    })
                }
                wi(e) {
                    return Ea(e).get("owner").next(e => _e.resolve(this.vi(e)))
                }
                Ci(e) {
                    return Sa(e).delete(this.clientId)
                }
                async Fi() {
                    if (this.isPrimary && !this.Mi(this.Ei, 18e5)) {
                        this.Ei = Date.now();
                        var e = await this.runTransaction("maybeGarbageCollectMultiClientState", "readwrite-primary", e => {
                            const r = dt(e, "clientMetadata");
                            return r.U().next(e => {
                                const t = this.xi(e, 18e5),
                                    n = e.filter(e => -1 === t.indexOf(e));
                                return _e.forEach(n, e => r.delete(e.clientId)).next(() => n)
                            })
                        }).catch(() => []);
                        if (this.Vi)
                            for (const t of e) this.Vi.removeItem(this.Oi(t.clientId))
                    }
                }
                pi() {
                    this.Ti = this.ui.enqueueAfterDelay("client_metadata_refresh", 4e3, () => this.mi().then(() => this.Fi()).then(() => this.pi()))
                }
                vi(e) {
                    return !!e && e.ownerId === this.clientId
                }
                Si(t) {
                    return this.li ? _e.resolve(!0) : Ea(t).get("owner").next(e => {
                        if (null !== e && this.Mi(e.leaseTimestampMs, 5e3) && !this.Ni(e.ownerId)) {
                            if (this.vi(e) && this.networkEnabled) return !0;
                            if (!this.vi(e)) {
                                if (!e.allowTabSynchronization) throw new q(B.FAILED_PRECONDITION, Ia);
                                return !1
                            }
                        }
                        return !(!this.networkEnabled || !this.inForeground) || Sa(t).U().next(e => void 0 === this.xi(e, 5e3).find(e => {
                            if (this.clientId !== e.clientId) {
                                var t = !this.networkEnabled && e.networkEnabled,
                                    n = !this.inForeground && e.inForeground,
                                    r = this.networkEnabled === e.networkEnabled;
                                if (t || n && r) return !0
                            }
                            return !1
                        }))
                    }).next(e => (this.isPrimary !== e && L("IndexedDbPersistence", `Client ${e?"is":"is not"} eligible for a primary lease.`), e))
                }
                async shutdown() {
                    this.Kr = !1, this.Li(), this.Ti && (this.Ti.cancel(), this.Ti = null), this.Bi(), this.ki(), await this.Ri.runTransaction("shutdown", "readwrite", ["owner", "clientMetadata"], e => {
                        const t = new lt(e, Oe.oe);
                        return this.bi(t).next(() => this.Ci(t))
                    }), this.Ri.close(), this.qi()
                }
                xi(e, t) {
                    return e.filter(e => this.Mi(e.updateTimeMs, t) && !this.Ni(e.clientId))
                }
                Qi() {
                    return this.runTransaction("getActiveClients", "readonly", e => Sa(e).U().next(e => this.xi(e, 18e5).map(e => e.clientId)))
                }
                get started() {
                    return this.Kr
                }
                getGlobalsCache() {
                    return this.$r
                }
                getMutationQueue(e, t) {
                    return Os.lt(e, this.serializer, t, this.referenceDelegate)
                }
                getTargetCache() {
                    return this.Ur
                }
                getRemoteDocumentCache() {
                    return this.remoteDocumentCache
                }
                getIndexManager(e) {
                    return new Ts(e, this.serializer.ct.databaseId)
                }
                getDocumentOverlayCache(e) {
                    return es.lt(this.serializer, e)
                }
                getBundleCache() {
                    return this.Gr
                }
                runTransaction(t, n, r) {
                    L("IndexedDbPersistence", "Starting transaction:", t);
                    var e, i = "readonly" === n ? "readonly" : "readwrite",
                        s = 17 === (e = this.hi) ? ht : 16 === e ? ct : 15 === e ? ut : 14 === e ? ot : 13 === e ? at : 12 === e ? st : 11 === e ? it : void P();
                    let a;
                    return this.Ri.runTransaction(t, i, s, e => (a = new lt(e, this.Qr ? this.Qr.next() : Oe.oe), "readwrite-primary" === n ? this.wi(a).next(e => !!e || this.Si(a)).next(e => {
                        if (!e) throw M(`Failed to obtain primary lease for action '${t}'.`), this.isPrimary = !1, this.ui.enqueueRetryable(() => this.di(!1)), new q(B.FAILED_PRECONDITION, ye);
                        return r(a)
                    }).next(e => this.Di(a).next(() => e)) : this.Ki(a).next(() => r(a)))).then(e => (a.raiseOnCommittedEvent(), e))
                }
                Ki(e) {
                    return Ea(e).get("owner").next(e => {
                        if (null !== e && this.Mi(e.leaseTimestampMs, 5e3) && !this.Ni(e.ownerId) && !this.vi(e) && !(this.li || this.allowTabSynchronization && e.allowTabSynchronization)) throw new q(B.FAILED_PRECONDITION, Ia)
                    })
                }
                Di(e) {
                    var t = {
                        ownerId: this.clientId,
                        allowTabSynchronization: this.allowTabSynchronization,
                        leaseTimestampMs: Date.now()
                    };
                    return Ea(e).put("owner", t)
                }
                static D() {
                    return Ie.D()
                }
                bi(e) {
                    const t = Ea(e);
                    return t.get("owner").next(e => this.vi(e) ? (L("IndexedDbPersistence", "Releasing primary lease."), t.delete("owner")) : _e.resolve())
                }
                Mi(e, t) {
                    var n = Date.now();
                    return !(e < n - t || n < e && (M(`Detected an update time that is in the future: ${e} > ${n}`), 1))
                }
                fi() {
                    null !== this.document && "function" == typeof this.document.addEventListener && (this.Ii = () => {
                        this.ui.enqueueAndForget(() => (this.inForeground = "visible" === this.document.visibilityState, this.mi()))
                    }, this.document.addEventListener("visibilitychange", this.Ii), this.inForeground = "visible" === this.document.visibilityState)
                }
                Bi() {
                    this.Ii && (this.document.removeEventListener("visibilitychange", this.Ii), this.Ii = null)
                }
                gi() {
                    var e;
                    "function" == typeof (null === (e = this.window) || void 0 === e ? void 0 : e.addEventListener) && (this.Pi = () => {
                        this.Li();
                        var e = /(?:Version|Mobile)\/1[456]/;
                        h() && (navigator.appVersion.match(e) || navigator.userAgent.match(e)) && this.ui.enterRestrictedMode(!0), this.ui.enqueueAndForget(() => this.shutdown())
                    }, this.window.addEventListener("pagehide", this.Pi))
                }
                ki() {
                    this.Pi && (this.window.removeEventListener("pagehide", this.Pi), this.Pi = null)
                }
                Ni(e) {
                    var t;
                    try {
                        var n = null !== (null === (t = this.Vi) || void 0 === t ? void 0 : t.getItem(this.Oi(e)));
                        return L("IndexedDbPersistence", `Client '${e}' ${n?"is":"is not"} zombied in LocalStorage`), n
                    } catch (e) {
                        return M("IndexedDbPersistence", "Failed to get zombied client id.", e), !1
                    }
                }
                Li() {
                    if (this.Vi) try {
                        this.Vi.setItem(this.Oi(this.clientId), String(Date.now()))
                    } catch (e) {
                        M("Failed to set zombie client id.", e)
                    }
                }
                qi() {
                    if (this.Vi) try {
                        this.Vi.removeItem(this.Oi(this.clientId))
                    } catch (e) {}
                }
                Oi(e) {
                    return `firestore_zombie_${this.persistenceKey}_${e}`
                }
            }

            function Ea(e) {
                return dt(e, "owner")
            }

            function Sa(e) {
                return dt(e, "clientMetadata")
            }

            function xa(e, t) {
                let n = e.projectId;
                return e.isDefaultDatabase || (n += "." + e.database), "firestore/" + t + "/" + n + "/"
            }
            class Da {
                constructor(e, t, n, r) {
                    this.targetId = e, this.fromCache = t, this.$i = n, this.Ui = r
                }
                static Wi(e, t) {
                    let n = lr(),
                        r = lr();
                    for (const e of t.docChanges) switch (e.type) {
                        case 0:
                            n = n.add(e.doc.key);
                            break;
                        case 1:
                            r = r.add(e.doc.key)
                    }
                    return new Da(e, t.fromCache, n, r)
                }
            }
            class Ca {
                constructor() {
                    this._documentReadCount = 0
                }
                get documentReadCount() {
                    return this._documentReadCount
                }
                incrementDocumentReadCount(e) {
                    this._documentReadCount += e
                }
            }
            class Aa {
                constructor() {
                    this.Gi = !1, this.zi = !1, this.ji = 100, this.Hi = h() ? 8 : 0 < Te(u()) ? 6 : 4
                }
                initialize(e, t) {
                    this.Ji = e, this.indexManager = t, this.Gi = !0
                }
                getDocumentsMatchingQuery(n, r, e, t) {
                    const i = {
                        result: null
                    };
                    return this.Yi(n, r).next(e => {
                        i.result = e
                    }).next(() => {
                        if (!i.result) return this.Zi(n, r, t, e).next(e => {
                            i.result = e
                        })
                    }).next(() => {
                        if (!i.result) {
                            const t = new Ca;
                            return this.Xi(n, r, t).next(e => {
                                if (i.result = e, this.zi) return this.es(n, r, t, e.size)
                            })
                        }
                    }).next(() => i.result)
                }
                es(e, t, n, r) {
                    return n.documentReadCount < this.ji ? (O() <= l.DEBUG && L("QueryEngine", "SDK will not create cache indexes for query:", Zn(t), "since it only creates cache indexes for collection contains", "more than or equal to", this.ji, "documents"), _e.resolve()) : (O() <= l.DEBUG && L("QueryEngine", "Query:", Zn(t), "scans", n.documentReadCount, "local documents and returns", r, "documents as results."), n.documentReadCount > this.Hi * r ? (O() <= l.DEBUG && L("QueryEngine", "The SDK decides to create cache indexes for query:", Zn(t), "as using cache indexes may help improve performance."), this.indexManager.createTargetIndexes(e, Hn(t))) : _e.resolve())
                }
                Yi(i, s) {
                    if (zn(s)) return _e.resolve(null);
                    let t = Hn(s);
                    return this.indexManager.getIndexType(i, t).next(e => 0 === e ? null : (null !== s.limit && 1 === e && (s = Jn(s, null, "F"), t = Hn(s)), this.indexManager.getDocumentsMatchingTarget(i, t).next(e => {
                        const r = lr(...e);
                        return this.Ji.getDocuments(i, r).next(n => this.indexManager.getMinOffset(i, t).next(e => {
                            var t = this.ts(s, n);
                            return this.ns(s, t, r, e.readTime) ? this.Yi(i, Jn(s, null, "F")) : this.rs(i, t, s, e)
                        }))
                    })))
                }
                Zi(n, r, i, s) {
                    return zn(r) || s.isEqual(ne.min()) ? _e.resolve(null) : this.Ji.getDocuments(n, i).next(e => {
                        var t = this.ts(r, e);
                        return this.ns(r, t, i, s) ? _e.resolve(null) : (O() <= l.DEBUG && L("QueryEngine", "Re-using previous result from %s to execute query: %s", s.toString(), Zn(r)), this.rs(n, t, r, fe(s, -1)).next(e => e))
                    })
                }
                ts(n, e) {
                    let r = new wt(nr(n));
                    return e.forEach((e, t) => {
                        er(n, t) && (r = r.add(t))
                    }), r
                }
                ns(e, t, n, r) {
                    if (null === e.limit) return !1;
                    if (n.size !== t.size) return !0;
                    const i = "F" === e.limitType ? t.last() : t.first();
                    return !!i && (i.hasPendingWrites || 0 < i.version.compareTo(r))
                }
                Xi(e, t, n) {
                    return O() <= l.DEBUG && L("QueryEngine", "Using full collection scan to execute query:", Zn(t)), this.Ji.getDocumentsMatchingQuery(e, t, me.min(), n)
                }
                rs(e, n, t, r) {
                    return this.Ji.getDocumentsMatchingQuery(e, t, r).next(t => (n.forEach(e => {
                        t = t.insert(e.key, e)
                    }), t))
                }
            }
            class Na {
                constructor(e, t, n, r) {
                    this.persistence = e, this.ss = t, this.serializer = r, this.os = new pt(X), this._s = new rr(e => Fn(e), Vn), this.us = new Map, this.cs = e.getRemoteDocumentCache(), this.Ur = e.getTargetCache(), this.Gr = e.getBundleCache(), this.ls(n)
                }
                ls(e) {
                    this.documentOverlayCache = this.persistence.getDocumentOverlayCache(e), this.indexManager = this.persistence.getIndexManager(e), this.mutationQueue = this.persistence.getMutationQueue(e, this.indexManager), this.localDocuments = new aa(this.cs, this.mutationQueue, this.documentOverlayCache, this.indexManager), this.cs.setIndexManager(this.indexManager), this.ss.initialize(this.localDocuments, this.indexManager)
                }
                collectGarbage(t) {
                    return this.persistence.runTransaction("Collect garbage", "readwrite-primary", e => t.collect(e, this.os))
                }
            }

            function ka(e, t, n, r) {
                return new Na(e, t, n, r)
            }
            async function Ra(e, t) {
                const a = e;
                return a.persistence.runTransaction("Handle user change", "readonly", i => {
                    let s;
                    return a.mutationQueue.getAllMutationBatches(i).next(e => (s = e, a.ls(t), a.mutationQueue.getAllMutationBatches(i))).next(e => {
                        const t = [],
                            n = [];
                        let r = lr();
                        for (const i of s) {
                            t.push(i.batchId);
                            for (const e of i.mutations) r = r.add(e.key)
                        }
                        for (const i of e) {
                            n.push(i.batchId);
                            for (const e of i.mutations) r = r.add(e.key)
                        }
                        return a.localDocuments.getDocuments(i, r).next(e => ({
                            hs: e,
                            removedBatchIds: t,
                            addedBatchIds: n
                        }))
                    })
                })
            }

            function Oa(e) {
                const t = e;
                return t.persistence.runTransaction("Get last remote snapshot version", "readonly", e => t.Ur.getLastRemoteSnapshotVersion(e))
            }

            function La(e, c) {
                const h = e,
                    l = c.snapshotVersion;
                let d = h.os;
                return h.persistence.runTransaction("Apply remote event", "readwrite-primary", o => {
                    const e = h.cs.newChangeBuffer({
                        trackRemovals: !0
                    });
                    d = h.os;
                    const u = [];
                    c.targetChanges.forEach((t, n) => {
                        const r = d.get(n);
                        if (r) {
                            u.push(h.Ur.removeMatchingKeys(o, t.removedDocuments, n).next(() => h.Ur.addMatchingKeys(o, t.addedDocuments, n)));
                            let e = r.withSequenceNumber(o.currentSequenceNumber);
                            var i, s, a;
                            null !== c.targetMismatches.get(n) ? e = e.withResumeToken(Et.EMPTY_BYTE_STRING, ne.min()).withLastLimboFreeSnapshotVersion(ne.min()) : 0 < t.resumeToken.approximateByteSize() && (e = e.withResumeToken(t.resumeToken, l)), d = d.insert(n, e), i = r, s = e, a = t, 0 !== i.resumeToken.approximateByteSize() && !(3e8 <= s.snapshotVersion.toMicroseconds() - i.snapshotVersion.toMicroseconds() || 0 < a.addedDocuments.size + a.modifiedDocuments.size + a.removedDocuments.size) || u.push(h.Ur.updateTargetData(o, e))
                        }
                    });
                    let t = ir,
                        n = lr();
                    if (c.documentUpdates.forEach(e => {
                            c.resolvedLimboDocuments.has(e) && u.push(h.persistence.referenceDelegate.updateLimboDocument(o, e))
                        }), u.push(Ma(o, e, c.documentUpdates).next(e => {
                            t = e.Ps, n = e.Is
                        })), !l.isEqual(ne.min())) {
                        const c = h.Ur.getLastRemoteSnapshotVersion(o).next(e => h.Ur.setTargetsMetadata(o, o.currentSequenceNumber, l));
                        u.push(c)
                    }
                    return _e.waitFor(u).next(() => e.apply(o)).next(() => h.localDocuments.getLocalViewOfDocuments(o, t, n)).next(() => t)
                }).then(e => (h.os = d, e))
            }

            function Ma(e, s, t) {
                let n = lr(),
                    a = lr();
                return t.forEach(e => n = n.add(e)), s.getEntries(e, n).next(r => {
                    let i = ir;
                    return t.forEach((e, t) => {
                        const n = r.get(e);
                        t.isFoundDocument() !== n.isFoundDocument() && (a = a.add(e)), t.isNoDocument() && t.version.isEqual(ne.min()) ? (s.removeEntry(e, t.readTime), i = i.insert(e, t)) : !n.isValidDocument() || 0 < t.version.compareTo(n.version) || 0 === t.version.compareTo(n.version) && n.hasPendingWrites ? (s.addEntry(t), i = i.insert(e, t)) : L("LocalStore", "Ignoring outdated watch update for ", e, ". Current version:", n.version, " Watch version:", t.version)
                    }), {
                        Ps: i,
                        Is: a
                    }
                })
            }

            function Fa(e, r) {
                const i = e;
                return i.persistence.runTransaction("Allocate target", "readwrite", t => {
                    let n;
                    return i.Ur.getTargetData(t, r).next(e => e ? (n = e, _e.resolve(n)) : i.Ur.allocateTargetId(t).next(e => (n = new Pi(r, e, "TargetPurposeListen", t.currentSequenceNumber), i.Ur.addTargetData(t, n).next(() => n))))
                }).then(e => {
                    var t = i.os.get(e.targetId);
                    return (null === t || 0 < e.snapshotVersion.compareTo(t.snapshotVersion)) && (i.os = i.os.insert(e.targetId, e), i._s.set(r, e.targetId)), e
                })
            }
            async function Va(e, t, n) {
                const r = e,
                    i = r.os.get(t),
                    s = n ? "readwrite" : "readwrite-primary";
                try {
                    n || await r.persistence.runTransaction("Release target", s, e => r.persistence.referenceDelegate.removeTarget(e, i))
                } catch (e) {
                    if (!xe(e)) throw e;
                    L("LocalStore", `Failed to update sequence numbers for target ${t}: ${e}`)
                }
                r.os = r.os.remove(t), r._s.delete(i.target)
            }

            function Pa(e, n, r) {
                const i = e;
                let s = ne.min(),
                    a = lr();
                return i.persistence.runTransaction("Execute query", "readwrite", t => function (e, t, n) {
                    const r = e,
                        i = r._s.get(n);
                    return void 0 !== i ? _e.resolve(r.os.get(i)) : r.Ur.getTargetData(t, n)
                }(i, t, Hn(n)).next(e => {
                    if (e) return s = e.lastLimboFreeSnapshotVersion, i.Ur.getMatchingKeysForTargetId(t, e.targetId).next(e => {
                        a = e
                    })
                }).next(() => i.ss.getDocumentsMatchingQuery(t, n, r ? s : ne.min(), r ? a : lr())).next(e => (qa(i, tr(n), e), {
                    documents: e,
                    Ts: a
                })))
            }

            function Ua(e, t) {
                const n = e,
                    r = n.Ur,
                    i = n.os.get(t);
                return i ? Promise.resolve(i.target) : n.persistence.runTransaction("Get target data", "readonly", e => r.ot(e, t).next(e => e ? e.target : null))
            }

            function Ba(e, t) {
                const n = e,
                    r = n.us.get(t) || ne.min();
                return n.persistence.runTransaction("Get new document changes", "readonly", e => n.cs.getAllFromCollectionGroup(e, t, fe(r, -1), Number.MAX_SAFE_INTEGER)).then(e => (qa(n, t, e), e))
            }

            function qa(e, t, n) {
                let r = e.us.get(t) || ne.min();
                n.forEach((e, t) => {
                    0 < t.readTime.compareTo(r) && (r = t.readTime)
                }), e.us.set(t, r)
            }

            function ja(e, t) {
                return `firestore_clients_${e}_${t}`
            }

            function Ka(e, t, n) {
                let r = `firestore_mutations_${e}_${n}`;
                return t.isAuthenticated() && (r += `_${t.uid}`), r
            }

            function Ga(e, t) {
                return `firestore_targets_${e}_${t}`
            }
            class za {
                constructor(e, t, n, r) {
                    this.user = e, this.batchId = t, this.state = n, this.error = r
                }
                static Rs(e, t, n) {
                    var r = JSON.parse(n);
                    let i, s = "object" == typeof r && -1 !== ["pending", "acknowledged", "rejected"].indexOf(r.state) && (void 0 === r.error || "object" == typeof r.error);
                    return s && r.error && (s = "string" == typeof r.error.message && "string" == typeof r.error.code, s && (i = new q(r.error.code, r.error.message))), s ? new za(e, t, r.state, i) : (M("SharedClientState", `Failed to parse mutation state for ID '${t}': ${n}`), null)
                }
                Vs() {
                    const e = {
                        state: this.state,
                        updateTimeMs: Date.now()
                    };
                    return this.error && (e.error = {
                        code: this.error.code,
                        message: this.error.message
                    }), JSON.stringify(e)
                }
            }
            class $a {
                constructor(e, t, n) {
                    this.targetId = e, this.state = t, this.error = n
                }
                static Rs(e, t) {
                    var n = JSON.parse(t);
                    let r, i = "object" == typeof n && -1 !== ["not-current", "current", "rejected"].indexOf(n.state) && (void 0 === n.error || "object" == typeof n.error);
                    return i && n.error && (i = "string" == typeof n.error.message && "string" == typeof n.error.code, i && (r = new q(n.error.code, n.error.message))), i ? new $a(e, n.state, r) : (M("SharedClientState", `Failed to parse target state for ID '${e}': ${t}`), null)
                }
                Vs() {
                    const e = {
                        state: this.state,
                        updateTimeMs: Date.now()
                    };
                    return this.error && (e.error = {
                        code: this.error.code,
                        message: this.error.message
                    }), JSON.stringify(e)
                }
            }
            class Qa {
                constructor(e, t) {
                    this.clientId = e, this.activeTargetIds = t
                }
                static Rs(e, t) {
                    var n = JSON.parse(t);
                    let r = "object" == typeof n && n.activeTargetIds instanceof Array,
                        i = dr;
                    for (let s = 0; r && s < n.activeTargetIds.length; ++s) r = Fe(n.activeTargetIds[s]), i = i.add(n.activeTargetIds[s]);
                    return r ? new Qa(e, i) : (M("SharedClientState", `Failed to parse client data for instance '${e}': ${t}`), null)
                }
            }
            class Ha {
                constructor(e, t) {
                    this.clientId = e, this.onlineState = t
                }
                static Rs(e) {
                    var t = JSON.parse(e);
                    return "object" == typeof t && -1 !== ["Unknown", "Online", "Offline"].indexOf(t.onlineState) && "string" == typeof t.clientId ? new Ha(t.clientId, t.onlineState) : (M("SharedClientState", `Failed to parse online state: ${e}`), null)
                }
            }
            class Wa {
                constructor() {
                    this.activeTargetIds = dr
                }
                fs(e) {
                    this.activeTargetIds = this.activeTargetIds.add(e)
                }
                gs(e) {
                    this.activeTargetIds = this.activeTargetIds.delete(e)
                }
                Vs() {
                    var e = {
                        activeTargetIds: this.activeTargetIds.toArray(),
                        updateTimeMs: Date.now()
                    };
                    return JSON.stringify(e)
                }
            }
            class Ja {
                constructor(e, t, n, r, i) {
                    this.window = e, this.ui = t, this.persistenceKey = n, this.ps = r, this.syncEngine = null, this.onlineStateHandler = null, this.sequenceNumberHandler = null, this.ys = this.ws.bind(this), this.Ss = new pt(X), this.started = !1, this.bs = [];
                    var s = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                    this.storage = this.window.localStorage, this.currentUser = i, this.Ds = ja(this.persistenceKey, this.ps), this.vs = `firestore_sequence_number_${this.persistenceKey}`, this.Ss = this.Ss.insert(this.ps, new Wa), this.Cs = new RegExp(`^firestore_clients_${s}_([^_]*)$`), this.Fs = new RegExp(`^firestore_mutations_${s}_(\\d+)(?:_(.*))?$`), this.Ms = new RegExp(`^firestore_targets_${s}_(\\d+)$`), this.xs = `firestore_online_state_${this.persistenceKey}`, this.Os = `firestore_bundle_loaded_v2_${this.persistenceKey}`, this.window.addEventListener("storage", this.ys)
                }
                static D(e) {
                    return !(!e || !e.localStorage)
                }
                async start() {
                    const e = await this.syncEngine.Qi();
                    for (const n of e)
                        if (n !== this.ps) {
                            const e = this.getItem(ja(this.persistenceKey, n));
                            var t;
                            !e || (t = Qa.Rs(n, e)) && (this.Ss = this.Ss.insert(t.clientId, t))
                        } this.Ns();
                    const n = this.storage.getItem(this.xs);
                    if (n) {
                        const e = this.Ls(n);
                        e && this.Bs(e)
                    }
                    for (const e of this.bs) this.ws(e);
                    this.bs = [], this.window.addEventListener("pagehide", () => this.shutdown()), this.started = !0
                }
                writeSequenceNumber(e) {
                    this.setItem(this.vs, JSON.stringify(e))
                }
                getAllActiveQueryTargets() {
                    return this.ks(this.Ss)
                }
                isActiveQueryTarget(n) {
                    let r = !1;
                    return this.Ss.forEach((e, t) => {
                        t.activeTargetIds.has(n) && (r = !0)
                    }), r
                }
                addPendingMutation(e) {
                    this.qs(e, "pending")
                }
                updateMutationState(e, t, n) {
                    this.qs(e, t, n), this.Qs(e)
                }
                addLocalQueryTarget(e, t = !0) {
                    let n = "not-current";
                    if (this.isActiveQueryTarget(e)) {
                        const t = this.storage.getItem(Ga(this.persistenceKey, e));
                        var r;
                        !t || (r = $a.Rs(e, t)) && (n = r.state)
                    }
                    return t && this.Ks.fs(e), this.Ns(), n
                }
                removeLocalQueryTarget(e) {
                    this.Ks.gs(e), this.Ns()
                }
                isLocalQueryTarget(e) {
                    return this.Ks.activeTargetIds.has(e)
                }
                clearQueryState(e) {
                    this.removeItem(Ga(this.persistenceKey, e))
                }
                updateQueryState(e, t, n) {
                    this.$s(e, t, n)
                }
                handleUserChange(e, t, n) {
                    t.forEach(e => {
                        this.Qs(e)
                    }), this.currentUser = e, n.forEach(e => {
                        this.addPendingMutation(e)
                    })
                }
                setOnlineState(e) {
                    this.Us(e)
                }
                notifyBundleLoaded(e) {
                    this.Ws(e)
                }
                shutdown() {
                    this.started && (this.window.removeEventListener("storage", this.ys), this.removeItem(this.Ds), this.started = !1)
                }
                getItem(e) {
                    var t = this.storage.getItem(e);
                    return L("SharedClientState", "READ", e, t), t
                }
                setItem(e, t) {
                    L("SharedClientState", "SET", e, t), this.storage.setItem(e, t)
                }
                removeItem(e) {
                    L("SharedClientState", "REMOVE", e), this.storage.removeItem(e)
                }
                ws(e) {
                    const i = e;
                    i.storageArea === this.storage && (L("SharedClientState", "EVENT", i.key, i.newValue), i.key !== this.Ds ? this.ui.enqueueRetryable(async () => {
                        if (this.started) {
                            if (null !== i.key)
                                if (this.Cs.test(i.key)) {
                                    if (null == i.newValue) {
                                        var e = this.Gs(i.key);
                                        return this.zs(e, null)
                                    }
                                    e = this.js(i.key, i.newValue);
                                    if (e) return this.zs(e.clientId, e)
                                } else if (this.Fs.test(i.key)) {
                                if (null !== i.newValue) {
                                    var t = this.Hs(i.key, i.newValue);
                                    if (t) return this.Js(t)
                                }
                            } else if (this.Ms.test(i.key)) {
                                if (null !== i.newValue) {
                                    t = this.Ys(i.key, i.newValue);
                                    if (t) return this.Zs(t)
                                }
                            } else if (i.key === this.xs) {
                                if (null !== i.newValue) {
                                    var n = this.Ls(i.newValue);
                                    if (n) return this.Bs(n)
                                }
                            } else if (i.key === this.vs) {
                                n = function (e) {
                                    let t = Oe.oe;
                                    if (null != e) try {
                                        var n = JSON.parse(e);
                                        U("number" == typeof n), t = n
                                    } catch (e) {
                                        M("SharedClientState", "Failed to read sequence number from WebStorage", e)
                                    }
                                    return t
                                }(i.newValue);
                                n !== Oe.oe && this.sequenceNumberHandler(n)
                            } else if (i.key === this.Os) {
                                const r = this.Xs(i.newValue);
                                await Promise.all(r.map(e => this.syncEngine.eo(e)))
                            }
                        } else this.bs.push(i)
                    }) : M("Received WebStorage notification for local change. Another client might have garbage-collected our state"))
                }
                get Ks() {
                    return this.Ss.get(this.ps)
                }
                Ns() {
                    this.setItem(this.Ds, this.Ks.Vs())
                }
                qs(e, t, n) {
                    const r = new za(this.currentUser, e, t, n),
                        i = Ka(this.persistenceKey, this.currentUser, e);
                    this.setItem(i, r.Vs())
                }
                Qs(e) {
                    var t = Ka(this.persistenceKey, this.currentUser, e);
                    this.removeItem(t)
                }
                Us(e) {
                    var t = {
                        clientId: this.ps,
                        onlineState: e
                    };
                    this.storage.setItem(this.xs, JSON.stringify(t))
                }
                $s(e, t, n) {
                    const r = Ga(this.persistenceKey, e),
                        i = new $a(e, t, n);
                    this.setItem(r, i.Vs())
                }
                Ws(e) {
                    var t = JSON.stringify(Array.from(e));
                    this.setItem(this.Os, t)
                }
                Gs(e) {
                    var t = this.Cs.exec(e);
                    return t ? t[1] : null
                }
                js(e, t) {
                    var n = this.Gs(e);
                    return Qa.Rs(n, t)
                }
                Hs(e, t) {
                    var n = this.Fs.exec(e),
                        r = Number(n[1]),
                        n = void 0 !== n[2] ? n[2] : null;
                    return za.Rs(new N(n), r, t)
                }
                Ys(e, t) {
                    var n = this.Ms.exec(e),
                        n = Number(n[1]);
                    return $a.Rs(n, t)
                }
                Ls(e) {
                    return Ha.Rs(e)
                }
                Xs(e) {
                    return JSON.parse(e)
                }
                async Js(e) {
                    if (e.user.uid === this.currentUser.uid) return this.syncEngine.no(e.batchId, e.state, e.error);
                    L("SharedClientState", `Ignoring mutation for non-active user ${e.user.uid}`)
                }
                Zs(e) {
                    return this.syncEngine.ro(e.targetId, e.state, e.error)
                }
                zs(e, t) {
                    const n = t ? this.Ss.insert(e, t) : this.Ss.remove(e),
                        r = this.ks(this.Ss),
                        i = this.ks(n),
                        s = [],
                        a = [];
                    return i.forEach(e => {
                        r.has(e) || s.push(e)
                    }), r.forEach(e => {
                        i.has(e) || a.push(e)
                    }), this.syncEngine.io(s, a).then(() => {
                        this.Ss = n
                    })
                }
                Bs(e) {
                    this.Ss.get(e.clientId) && this.onlineStateHandler(e.onlineState)
                }
                ks(e) {
                    let n = dr;
                    return e.forEach((e, t) => {
                        n = n.unionWith(t.activeTargetIds)
                    }), n
                }
            }
            class Ya {
                constructor() {
                    this.so = new Wa, this.oo = {}, this.onlineStateHandler = null, this.sequenceNumberHandler = null
                }
                addPendingMutation(e) {}
                updateMutationState(e, t, n) {}
                addLocalQueryTarget(e, t = !0) {
                    return t && this.so.fs(e), this.oo[e] || "not-current"
                }
                updateQueryState(e, t, n) {
                    this.oo[e] = t
                }
                removeLocalQueryTarget(e) {
                    this.so.gs(e)
                }
                isLocalQueryTarget(e) {
                    return this.so.activeTargetIds.has(e)
                }
                clearQueryState(e) {
                    delete this.oo[e]
                }
                getAllActiveQueryTargets() {
                    return this.so.activeTargetIds
                }
                isActiveQueryTarget(e) {
                    return this.so.activeTargetIds.has(e)
                }
                start() {
                    return this.so = new Wa, Promise.resolve()
                }
                handleUserChange(e, t, n) {}
                setOnlineState(e) {}
                shutdown() {}
                writeSequenceNumber(e) {}
                notifyBundleLoaded(e) {}
            }
            class Xa {
                _o(e) {}
                shutdown() {}
            }
            class Za {
                constructor() {
                    this.ao = () => this.uo(), this.co = () => this.lo(), this.ho = [], this.Po()
                }
                _o(e) {
                    this.ho.push(e)
                }
                shutdown() {
                    window.removeEventListener("online", this.ao), window.removeEventListener("offline", this.co)
                }
                Po() {
                    window.addEventListener("online", this.ao), window.addEventListener("offline", this.co)
                }
                uo() {
                    L("ConnectivityMonitor", "Network connectivity changed: AVAILABLE");
                    for (const e of this.ho) e(0)
                }
                lo() {
                    L("ConnectivityMonitor", "Network connectivity changed: UNAVAILABLE");
                    for (const e of this.ho) e(1)
                }
                static D() {
                    return "undefined" != typeof window && void 0 !== window.addEventListener && void 0 !== window.removeEventListener
                }
            }
            let eo = null;

            function to() {
                return null === eo ? eo = 268435456 + Math.round(2147483648 * Math.random()) : eo++, "0x" + eo.toString(16)
            }
            const no = {
                BatchGetDocuments: "batchGet",
                Commit: "commit",
                RunQuery: "runQuery",
                RunAggregationQuery: "runAggregationQuery"
            };
            class ro {
                constructor(e) {
                    this.Io = e.Io, this.To = e.To
                }
                Eo(e) {
                    this.Ao = e
                }
                Ro(e) {
                    this.Vo = e
                }
                mo(e) {
                    this.fo = e
                }
                onMessage(e) {
                    this.po = e
                }
                close() {
                    this.To()
                }
                send(e) {
                    this.Io(e)
                }
                yo() {
                    this.Ao()
                }
                wo() {
                    this.Vo()
                }
                So(e) {
                    this.fo(e)
                }
                bo(e) {
                    this.po(e)
                }
            }
            const io = "WebChannelConnection";
            class so extends class {
                constructor(e) {
                    this.databaseInfo = e, this.databaseId = e.databaseId;
                    var t = e.ssl ? "https" : "http",
                        n = encodeURIComponent(this.databaseId.projectId),
                        r = encodeURIComponent(this.databaseId.database);
                    this.Do = t + "://" + e.host, this.vo = `projects/${n}/databases/${r}`, this.Co = "(default)" === this.databaseId.database ? `project_id=${n}` : `project_id=${n}&database_id=${r}`
                }
                get Fo() {
                    return !1
                }
                Mo(t, e, n, r, i) {
                    const s = to(),
                        a = this.xo(t, e.toUriEncodedString());
                    L("RestConnection", `Sending RPC '${t}' ${s}:`, a, n);
                    var o = {
                        "google-cloud-resource-prefix": this.vo,
                        "x-goog-request-params": this.Co
                    };
                    return this.Oo(o, r, i), this.No(t, a, o, n).then(e => (L("RestConnection", `Received RPC '${t}' ${s}: `, e), e), e => {
                        throw F("RestConnection", `RPC '${t}' ${s} failed with error: `, e, "url: ", a, "request:", n), e
                    })
                }
                Lo(e, t, n, r, i, s) {
                    return this.Mo(e, t, n, r, i)
                }
                Oo(n, e, t) {
                    n["X-Goog-Api-Client"] = "gl-js/ fire/" + k, n["Content-Type"] = "text/plain", this.databaseInfo.appId && (n["X-Firebase-GMPID"] = this.databaseInfo.appId), e && e.headers.forEach((e, t) => n[t] = e), t && t.headers.forEach((e, t) => n[t] = e)
                }
                xo(e, t) {
                    var n = no[e];
                    return `${this.Do}/v1/${t}:${n}`
                }
                terminate() {}
            } {
                constructor(e) {
                    super(e), this.forceLongPolling = e.forceLongPolling, this.autoDetectLongPolling = e.autoDetectLongPolling, this.useFetchStreams = e.useFetchStreams, this.longPollingOptions = e.longPollingOptions
                }
                No(u, t, n, r) {
                    const c = to();
                    return new Promise((s, a) => {
                        const o = new dn;
                        o.setWithCredentials(!0), o.listenOnce(gn.COMPLETE, () => {
                            try {
                                switch (o.getLastErrorCode()) {
                                    case mn.NO_ERROR:
                                        var e = o.getResponseJson();
                                        L(io, `XHR for RPC '${u}' ${c} received:`, JSON.stringify(e)), s(e);
                                        break;
                                    case mn.TIMEOUT:
                                        L(io, `RPC '${u}' ${c} timed out`), a(new q(B.DEADLINE_EXCEEDED, "Request time out"));
                                        break;
                                    case mn.HTTP_ERROR:
                                        var t = o.getStatus();
                                        if (L(io, `RPC '${u}' ${c} failed with status:`, t, "response text:", o.getResponseText()), 0 < t) {
                                            let e = o.getResponseJson();
                                            Array.isArray(e) && (e = e[0]);
                                            var n = null == e ? void 0 : e.error;
                                            if (n && n.status && n.message) {
                                                const u = (r = n.status, i = r.toLowerCase().replace(/_/g, "-"), 0 <= Object.values(B).indexOf(i) ? i : B.UNKNOWN);
                                                a(new q(u, n.message))
                                            } else a(new q(B.UNKNOWN, "Server responded with status " + o.getStatus()))
                                        } else a(new q(B.UNAVAILABLE, "Connection failed."));
                                        break;
                                    default:
                                        P()
                                }
                            } finally {
                                L(io, `RPC '${u}' ${c} completed.`)
                            }
                            var r, i
                        });
                        var e = JSON.stringify(r);
                        L(io, `RPC '${u}' ${c} sending request:`, r), o.send(t, "POST", e, n, 15)
                    })
                }
                Bo(i, e, t) {
                    const s = to(),
                        n = [this.Do, "/", "google.firestore.v1.Firestore", "/", i, "/channel"],
                        r = wn(),
                        a = vn(),
                        o = {
                            httpSessionIdParam: "gsessionid",
                            initMessageHeaders: {},
                            messageUrlParams: {
                                database: `projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`
                            },
                            sendRawJson: !0,
                            supportsCrossDomainXhr: !0,
                            internalChannelParams: {
                                forwardChannelRequestTimeoutMs: 6e5
                            },
                            forceLongPolling: this.forceLongPolling,
                            detectBufferingProxy: this.autoDetectLongPolling
                        },
                        u = this.longPollingOptions.timeoutSeconds;
                    void 0 !== u && (o.longPollingTimeout = Math.round(1e3 * u)), this.useFetchStreams && (o.useFetchStreams = !0), this.Oo(o.initMessageHeaders, e, t), o.encodeInitMessageHeaders = !0;
                    var c = n.join("");
                    L(io, `Creating RPC '${i}' stream ${s}: ${c}`, o);
                    const h = r.createWebChannel(c, o);
                    let l = !1,
                        d = !1;
                    const f = new ro({
                            Io: e => {
                                d ? L(io, `Not sending because RPC '${i}' stream ${s} is closed:`, e) : (l || (L(io, `Opening RPC '${i}' stream ${s} transport.`), h.open(), l = !0), L(io, `RPC '${i}' stream ${s} sending:`, e), h.send(e))
                            },
                            To: () => h.close()
                        }),
                        g = (e, t, n) => {
                            e.listen(t, e => {
                                try {
                                    n(e)
                                } catch (e) {
                                    setTimeout(() => {
                                        throw e
                                    }, 0)
                                }
                            })
                        };
                    return g(h, fn.EventType.OPEN, () => {
                        d || (L(io, `RPC '${i}' stream ${s} transport opened.`), f.yo())
                    }), g(h, fn.EventType.CLOSE, () => {
                        d || (d = !0, L(io, `RPC '${i}' stream ${s} transport closed`), f.So())
                    }), g(h, fn.EventType.ERROR, e => {
                        d || (d = !0, F(io, `RPC '${i}' stream ${s} transport errored:`, e), f.So(new q(B.UNAVAILABLE, "The operation could not be completed")))
                    }), g(h, fn.EventType.MESSAGE, n => {
                        if (!d) {
                            var e = n.data[0];
                            U(!!e);
                            var r = e.error || (null === (r = e[0]) || void 0 === r ? void 0 : r.error);
                            if (r) {
                                L(io, `RPC '${i}' stream ${s} received error:`, r);
                                const n = r.status;
                                let e = function (e) {
                                        var t = x[e];
                                        if (void 0 !== t) return Qr(t)
                                    }(n),
                                    t = r.message;
                                void 0 === e && (e = B.INTERNAL, t = "Unknown error status: " + n + " with message " + r.message), d = !0, f.So(new q(e, t)), h.close()
                            } else L(io, `RPC '${i}' stream ${s} received:`, e), f.bo(e)
                        }
                    }), g(a, yn.STAT_EVENT, e => {
                        e.stat === pn.PROXY ? L(io, `RPC '${i}' stream ${s} detected buffering proxy`) : e.stat === pn.NOPROXY && L(io, `RPC '${i}' stream ${s} detected no buffering proxy`)
                    }), setTimeout(() => {
                        f.wo()
                    }, 0), f
                }
            }

            function ao() {
                return "undefined" != typeof window ? window : null
            }

            function oo() {
                return "undefined" != typeof document ? document : null
            }

            function uo(e) {
                return new di(e, !0)
            }
            class co {
                constructor(e, t, n = 1e3, r = 1.5, i = 6e4) {
                    this.ui = e, this.timerId = t, this.ko = n, this.qo = r, this.Qo = i, this.Ko = 0, this.$o = null, this.Uo = Date.now(), this.reset()
                }
                reset() {
                    this.Ko = 0
                }
                Wo() {
                    this.Ko = this.Qo
                }
                Go(e) {
                    this.cancel();
                    var t = Math.floor(this.Ko + this.zo()),
                        n = Math.max(0, Date.now() - this.Uo),
                        r = Math.max(0, t - n);
                    0 < r && L("ExponentialBackoff", `Backing off for ${r} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`), this.$o = this.ui.enqueueAfterDelay(this.timerId, r, () => (this.Uo = Date.now(), e())), this.Ko *= this.qo, this.Ko < this.ko && (this.Ko = this.ko), this.Ko > this.Qo && (this.Ko = this.Qo)
                }
                jo() {
                    null !== this.$o && (this.$o.skipDelay(), this.$o = null)
                }
                cancel() {
                    null !== this.$o && (this.$o.cancel(), this.$o = null)
                }
                zo() {
                    return (Math.random() - .5) * this.Ko
                }
            }
            class ho {
                constructor(e, t, n, r, i, s, a, o) {
                    this.ui = e, this.Ho = n, this.Jo = r, this.connection = i, this.authCredentialsProvider = s, this.appCheckCredentialsProvider = a, this.listener = o, this.state = 0, this.Yo = 0, this.Zo = null, this.Xo = null, this.stream = null, this.e_ = 0, this.t_ = new co(e, t)
                }
                n_() {
                    return 1 === this.state || 5 === this.state || this.r_()
                }
                r_() {
                    return 2 === this.state || 3 === this.state
                }
                start() {
                    this.e_ = 0, 4 !== this.state ? this.auth() : this.i_()
                }
                async stop() {
                    this.n_() && await this.close(0)
                }
                s_() {
                    this.state = 0, this.t_.reset()
                }
                o_() {
                    this.r_() && null === this.Zo && (this.Zo = this.ui.enqueueAfterDelay(this.Ho, 6e4, () => this.__()))
                }
                a_(e) {
                    this.u_(), this.stream.send(e)
                }
                async __() {
                    if (this.r_()) return this.close(0)
                }
                u_() {
                    this.Zo && (this.Zo.cancel(), this.Zo = null)
                }
                c_() {
                    this.Xo && (this.Xo.cancel(), this.Xo = null)
                }
                async close(e, t) {
                    this.u_(), this.c_(), this.t_.cancel(), this.Yo++, 4 !== e ? this.t_.reset() : t && t.code === B.RESOURCE_EXHAUSTED ? (M(t.toString()), M("Using maximum backoff delay to prevent overloading the backend."), this.t_.Wo()) : t && t.code === B.UNAUTHENTICATED && 3 !== this.state && (this.authCredentialsProvider.invalidateToken(), this.appCheckCredentialsProvider.invalidateToken()), null !== this.stream && (this.l_(), this.stream.close(), this.stream = null), this.state = e, await this.listener.mo(t)
                }
                l_() {}
                auth() {
                    this.state = 1;
                    const e = this.h_(this.Yo),
                        n = this.Yo;
                    Promise.all([this.authCredentialsProvider.getToken(), this.appCheckCredentialsProvider.getToken()]).then(([e, t]) => {
                        this.Yo === n && this.P_(e, t)
                    }, t => {
                        e(() => {
                            var e = new q(B.UNKNOWN, "Fetching auth token failed: " + t.message);
                            return this.I_(e)
                        })
                    })
                }
                P_(e, t) {
                    const n = this.h_(this.Yo);
                    this.stream = this.T_(e, t), this.stream.Eo(() => {
                        n(() => this.listener.Eo())
                    }), this.stream.Ro(() => {
                        n(() => (this.state = 2, this.Xo = this.ui.enqueueAfterDelay(this.Jo, 1e4, () => (this.r_() && (this.state = 3), Promise.resolve())), this.listener.Ro()))
                    }), this.stream.mo(e => {
                        n(() => this.I_(e))
                    }), this.stream.onMessage(e => {
                        n(() => 1 == ++this.e_ ? this.E_(e) : this.onNext(e))
                    })
                }
                i_() {
                    this.state = 5, this.t_.Go(async () => {
                        this.state = 0, this.start()
                    })
                }
                I_(e) {
                    return L("PersistentStream", `close with error: ${e}`), this.stream = null, this.close(4, e)
                }
                h_(t) {
                    return e => {
                        this.ui.enqueueAndForget(() => this.Yo === t ? e() : (L("PersistentStream", "stream callback skipped by getCloseGuardedDispatcher."), Promise.resolve()))
                    }
                }
            }
            class lo extends ho {
                constructor(e, t, n, r, i, s) {
                    super(e, "listen_stream_connection_backoff", "listen_stream_idle", "health_check_timeout", t, n, r, s), this.serializer = i
                }
                T_(e, t) {
                    return this.connection.Bo("Listen", e, t)
                }
                E_(e) {
                    return this.onNext(e)
                }
                onNext(e) {
                    this.t_.reset();
                    var t = function (e, t) {
                            let n;
                            if ("targetChange" in t) {
                                t.targetChange;
                                var r = "NO_CHANGE" === (f = t.targetChange.targetChangeType || "NO_CHANGE") ? 0 : "ADD" === f ? 1 : "REMOVE" === f ? 2 : "CURRENT" === f ? 3 : "RESET" === f ? 4 : P(),
                                    i = t.targetChange.targetIds || [],
                                    s = (f = t.targetChange.resumeToken, e.useProto3Json ? (U(void 0 === f || "string" == typeof f), Et.fromBase64String(f || "")) : (U(void 0 === f || f instanceof Buffer || f instanceof Uint8Array), Et.fromUint8Array(f || new Uint8Array))),
                                    a = t.targetChange.cause,
                                    o = a && (o = void 0 === (f = a).code ? B.UNKNOWN : Qr(f.code), new q(o, f.message || ""));
                                n = new ii(r, i, s, o || null)
                            } else if ("documentChange" in t) {
                                t.documentChange;
                                var u = t.documentChange;
                                u.document, u.document.name, u.document.updateTime;
                                var s = bi(e, u.document.name),
                                    o = pi(u.document.updateTime),
                                    c = u.document.createTime ? pi(u.document.createTime) : ne.min(),
                                    h = new tn({
                                        mapValue: {
                                            fields: u.document.fields
                                        }
                                    }),
                                    c = nn.newFoundDocument(s, o, c, h),
                                    h = u.targetIds || [],
                                    u = u.removedTargetIds || [];
                                n = new ni(h, u, c.key, c)
                            } else if ("documentDelete" in t) {
                                t.documentDelete;
                                h = t.documentDelete;
                                h.document;
                                u = bi(e, h.document), c = h.readTime ? pi(h.readTime) : ne.min(), c = nn.newNoDocument(u, c), h = h.removedTargetIds || [];
                                n = new ni([], h, c.key, c)
                            } else if ("documentRemove" in t) {
                                t.documentRemove;
                                var l = t.documentRemove;
                                l.document;
                                var d = bi(e, l.document),
                                    l = l.removedTargetIds || [];
                                n = new ni([], l, d, null)
                            } else {
                                if (!("filter" in t)) return P(); {
                                    t.filter;
                                    const e = t.filter;
                                    e.targetId;
                                    var {
                                        count: l = 0,
                                        unchangedNames: d
                                    } = e, l = new zr(l, d), d = e.targetId;
                                    n = new ri(d, l)
                                }
                            }
                            var o, f;
                            return n
                        }(this.serializer, e),
                        n = function (e) {
                            if (!("targetChange" in e)) return ne.min();
                            var t = e.targetChange;
                            return (!t.targetIds || !t.targetIds.length) && t.readTime ? pi(t.readTime) : ne.min()
                        }(e);
                    return this.listener.d_(t, n)
                }
                A_(e) {
                    const t = {};
                    t.database = Ei(this.serializer), t.addTarget = function (e, t) {
                        let n;
                        const r = t.target;
                        if (n = Pn(r) ? {
                                documents: Ni(e, r)
                            } : {
                                query: ki(e, r)._t
                            }, n.targetId = t.targetId, 0 < t.resumeToken.approximateByteSize()) {
                            n.resumeToken = mi(e, t.resumeToken);
                            const r = fi(e, t.expectedCount);
                            null !== r && (n.expectedCount = r)
                        } else if (0 < t.snapshotVersion.compareTo(ne.min())) {
                            n.readTime = gi(e, t.snapshotVersion.toTimestamp());
                            const r = fi(e, t.expectedCount);
                            null !== r && (n.expectedCount = r)
                        }
                        return n
                    }(this.serializer, e);
                    var n, n = (this.serializer, e, null == (n = function (e) {
                        switch (e) {
                            case "TargetPurposeListen":
                                return null;
                            case "TargetPurposeExistenceFilterMismatch":
                                return "existence-filter-mismatch";
                            case "TargetPurposeExistenceFilterMismatchBloom":
                                return "existence-filter-mismatch-bloom";
                            case "TargetPurposeLimboResolution":
                                return "limbo-document";
                            default:
                                return P()
                        }
                    }(e.purpose)) ? null : {
                        "goog-listen-tags": n
                    });
                    n && (t.labels = n), this.a_(t)
                }
                R_(e) {
                    const t = {};
                    t.database = Ei(this.serializer), t.removeTarget = e, this.a_(t)
                }
            }
            class fo extends ho {
                constructor(e, t, n, r, i, s) {
                    super(e, "write_stream_connection_backoff", "write_stream_idle", "health_check_timeout", t, n, r, s), this.serializer = i
                }
                get V_() {
                    return 0 < this.e_
                }
                start() {
                    this.lastStreamToken = void 0, super.start()
                }
                l_() {
                    this.V_ && this.m_([])
                }
                T_(e, t) {
                    return this.connection.Bo("Write", e, t)
                }
                E_(e) {
                    return U(!!e.streamToken), this.lastStreamToken = e.streamToken, U(!e.writeResults || 0 === e.writeResults.length), this.listener.f_()
                }
                onNext(e) {
                    U(!!e.streamToken), this.lastStreamToken = e.streamToken, this.t_.reset();
                    var t, n, r = (t = e.writeResults, n = e.commitTime, t && 0 < t.length ? (U(void 0 !== n), t.map(e => function (e, t) {
                            let n = e.updateTime ? pi(e.updateTime) : pi(t);
                            return n.isEqual(ne.min()) && (n = pi(t)), new Dr(n, e.transformResults || [])
                        }(e, n))) : []),
                        i = pi(e.commitTime);
                    return this.listener.g_(i, r)
                }
                p_() {
                    const e = {};
                    e.database = Ei(this.serializer), this.a_(e)
                }
                m_(e) {
                    var t = {
                        streamToken: this.lastStreamToken,
                        writes: e.map(e => Ci(this.serializer, e))
                    };
                    this.a_(t)
                }
            }
            class go extends class {} {
                constructor(e, t, n, r) {
                    super(), this.authCredentials = e, this.appCheckCredentials = t, this.connection = n, this.serializer = r, this.y_ = !1
                }
                w_() {
                    if (this.y_) throw new q(B.FAILED_PRECONDITION, "The client has already been terminated.")
                }
                Mo(n, r, i, s) {
                    return this.w_(), Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()]).then(([e, t]) => this.connection.Mo(n, vi(r, i), s, e, t)).catch(e => {
                        throw "FirebaseError" === e.name ? (e.code === B.UNAUTHENTICATED && (this.authCredentials.invalidateToken(), this.appCheckCredentials.invalidateToken()), e) : new q(B.UNKNOWN, e.toString())
                    })
                }
                Lo(n, r, i, s, a) {
                    return this.w_(), Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()]).then(([e, t]) => this.connection.Lo(n, vi(r, i), s, e, t, a)).catch(e => {
                        throw "FirebaseError" === e.name ? (e.code === B.UNAUTHENTICATED && (this.authCredentials.invalidateToken(), this.appCheckCredentials.invalidateToken()), e) : new q(B.UNKNOWN, e.toString())
                    })
                }
                terminate() {
                    this.y_ = !0, this.connection.terminate()
                }
            }
            class mo {
                constructor(e, t) {
                    this.asyncQueue = e, this.onlineStateHandler = t, this.state = "Unknown", this.S_ = 0, this.b_ = null, this.D_ = !0
                }
                v_() {
                    0 === this.S_ && (this.C_("Unknown"), this.b_ = this.asyncQueue.enqueueAfterDelay("online_state_timeout", 1e4, () => (this.b_ = null, this.F_("Backend didn't respond within 10 seconds."), this.C_("Offline"), Promise.resolve())))
                }
                M_(e) {
                    "Online" === this.state ? this.C_("Unknown") : (this.S_++, 1 <= this.S_ && (this.x_(), this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`), this.C_("Offline")))
                }
                set(e) {
                    this.x_(), this.S_ = 0, "Online" === e && (this.D_ = !1), this.C_(e)
                }
                C_(e) {
                    e !== this.state && (this.state = e, this.onlineStateHandler(e))
                }
                F_(e) {
                    var t = `Could not reach Cloud Firestore backend. ${e}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;
                    this.D_ ? (M(t), this.D_ = !1) : L("OnlineStateTracker", t)
                }
                x_() {
                    null !== this.b_ && (this.b_.cancel(), this.b_ = null)
                }
            }
            class po {
                constructor(e, t, n, r, i) {
                    this.localStore = e, this.datastore = t, this.asyncQueue = n, this.remoteSyncer = {}, this.O_ = [], this.N_ = new Map, this.L_ = new Set, this.B_ = [], this.k_ = i, this.k_._o(e => {
                        n.enqueueAndForget(async () => {
                            So(this) && (L("RemoteStore", "Restarting streams for network reachability change."), await async function (e) {
                                const t = e;
                                t.L_.add(4), await vo(t), t.q_.set("Unknown"), t.L_.delete(4), await yo(t)
                            }(this))
                        })
                    }), this.q_ = new mo(n, r)
                }
            }
            async function yo(e) {
                if (So(e))
                    for (const t of e.B_) await t(!0)
            }
            async function vo(e) {
                for (const t of e.B_) await t(!1)
            }

            function wo(e, t) {
                const n = e;
                n.N_.has(t.targetId) || (n.N_.set(t.targetId, t), Eo(n) ? To(n) : Mo(n).r_() && bo(n, t))
            }

            function _o(e, t) {
                const n = e,
                    r = Mo(n);
                n.N_.delete(t), r.r_() && Io(n, t), 0 === n.N_.size && (r.r_() ? r.o_() : So(n) && n.q_.set("Unknown"))
            }

            function bo(e, t) {
                var n;
                e.Q_.xe(t.targetId), (0 < t.resumeToken.approximateByteSize() || 0 < t.snapshotVersion.compareTo(ne.min())) && (n = e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size, t = t.withExpectedCount(n)), Mo(e).A_(t)
            }

            function Io(e, t) {
                e.Q_.xe(t), Mo(e).R_(t)
            }

            function To(t) {
                t.Q_ = new ai({
                    getRemoteKeysForTarget: e => t.remoteSyncer.getRemoteKeysForTarget(e),
                    ot: e => t.N_.get(e) || null,
                    tt: () => t.datastore.serializer.databaseId
                }), Mo(t).start(), t.q_.v_()
            }

            function Eo(e) {
                return So(e) && !Mo(e).n_() && 0 < e.N_.size
            }

            function So(e) {
                return 0 === e.L_.size
            }

            function xo(e) {
                e.Q_ = void 0
            }
            async function Do(e, t, n) {
                if (!xe(t)) throw t;
                e.L_.add(1), await vo(e), e.q_.set("Offline"), n = n || (() => Oa(e.localStore)), e.asyncQueue.enqueueRetryable(async () => {
                    L("RemoteStore", "Retrying IndexedDB access"), await n(), e.L_.delete(1), await yo(e)
                })
            }

            function Co(t, n) {
                return n().catch(e => Do(t, e, n))
            }
            async function Ao(e) {
                const t = e,
                    n = Fo(t);
                let r = 0 < t.O_.length ? t.O_[t.O_.length - 1].batchId : -1;
                for (; So(i = t) && i.O_.length < 10;) try {
                    const e = await
                    function (e, t) {
                        const n = e;
                        return n.persistence.runTransaction("Get next mutation batch", "readonly", e => (void 0 === t && (t = -1), n.mutationQueue.getNextMutationBatchAfterBatchId(e, t)))
                    }(t.localStore, r);
                    if (null === e) {
                        0 === t.O_.length && n.o_();
                        break
                    }
                    r = e.batchId,
                        function (e, t) {
                            e.O_.push(t);
                            const n = Fo(e);
                            n.r_() && n.V_ && n.m_(t.mutations)
                        }(t, e)
                } catch (e) {
                    await Do(t, e)
                }
                var i;
                No(t) && ko(t)
            }

            function No(e) {
                return So(e) && !Fo(e).n_() && 0 < e.O_.length
            }

            function ko(e) {
                Fo(e).start()
            }
            async function Ro(e, t) {
                t && Fo(e).V_ && await async function (e, t) {
                    if ($r(n = t.code) && n !== B.ABORTED) {
                        const r = e.O_.shift();
                        Fo(e).s_(), await Co(e, () => e.remoteSyncer.rejectFailedWrite(r.batchId, t)), await Ao(e)
                    }
                    var n
                }(e, t), No(e) && ko(e)
            }
            async function Oo(e, t) {
                const n = e;
                n.asyncQueue.verifyOperationInProgress(), L("RemoteStore", "RemoteStore received new credentials");
                var r = So(n);
                n.L_.add(3), await vo(n), r && n.q_.set("Unknown"), await n.remoteSyncer.handleCredentialChange(t), n.L_.delete(3), await yo(n)
            }
            async function Lo(e, t) {
                const n = e;
                t ? (n.L_.delete(2), await yo(n)) : (n.L_.add(2), await vo(n), n.q_.set("Unknown"))
            }

            function Mo(t) {
                return t.K_ || (t.K_ = function (e, t, n) {
                    const r = e;
                    return r.w_(), new lo(t, r.connection, r.authCredentials, r.appCheckCredentials, r.serializer, n)
                }(t.datastore, t.asyncQueue, {
                    Eo: (async function (e) {
                        e.q_.set("Online")
                    }).bind(null, t),
                    Ro: (async function (n) {
                        n.N_.forEach((e, t) => {
                            bo(n, e)
                        })
                    }).bind(null, t),
                    mo: (async function (e, t) {
                        xo(e), Eo(e) ? (e.q_.M_(t), To(e)) : e.q_.set("Unknown")
                    }).bind(null, t),
                    d_: (async function (e, t, n) {
                        if (e.q_.set("Online"), t instanceof ii && 2 === t.state && t.cause) try {
                            await async function (e, t) {
                                var n = t.cause;
                                for (const r of t.targetIds) e.N_.has(r) && (await e.remoteSyncer.rejectListen(r, n), e.N_.delete(r), e.Q_.removeTarget(r))
                            }(e, t)
                        } catch (n) {
                            L("RemoteStore", "Failed to remove targets %s: %s ", t.targetIds.join(","), n), await Do(e, n)
                        } else if (t instanceof ni ? e.Q_.Ke(t) : t instanceof ri ? e.Q_.He(t) : e.Q_.We(t), !n.isEqual(ne.min())) try {
                            const t = await Oa(e.localStore);
                            0 <= n.compareTo(t) && await
                            function (i, r) {
                                const e = i.Q_.rt(r);
                                return e.targetChanges.forEach((e, t) => {
                                    if (0 < e.resumeToken.approximateByteSize()) {
                                        const n = i.N_.get(t);
                                        n && i.N_.set(t, n.withResumeToken(e.resumeToken, r))
                                    }
                                }), e.targetMismatches.forEach((e, t) => {
                                    const n = i.N_.get(e);
                                    var r;
                                    n && (i.N_.set(e, n.withResumeToken(Et.EMPTY_BYTE_STRING, n.snapshotVersion)), Io(i, e), r = new Pi(n.target, e, t, n.sequenceNumber), bo(i, r))
                                }), i.remoteSyncer.applyRemoteEvent(e)
                            }(e, n)
                        } catch (t) {
                            L("RemoteStore", "Failed to raise snapshot:", t), await Do(e, t)
                        }
                    }).bind(null, t)
                }), t.B_.push(async e => {
                    e ? (t.K_.s_(), Eo(t) ? To(t) : t.q_.set("Unknown")) : (await t.K_.stop(), xo(t))
                })), t.K_
            }

            function Fo(t) {
                return t.U_ || (t.U_ = function (e, t, n) {
                    const r = e;
                    return r.w_(), new fo(t, r.connection, r.authCredentials, r.appCheckCredentials, r.serializer, n)
                }(t.datastore, t.asyncQueue, {
                    Eo: () => Promise.resolve(),
                    Ro: (async function (e) {
                        Fo(e).p_()
                    }).bind(null, t),
                    mo: Ro.bind(null, t),
                    f_: (async function (e) {
                        const t = Fo(e);
                        for (const n of e.O_) t.m_(n.mutations)
                    }).bind(null, t),
                    g_: (async function (e, t, n) {
                        const r = e.O_.shift(),
                            i = Kr.from(r, t, n);
                        await Co(e, () => e.remoteSyncer.applySuccessfulWrite(i)), await Ao(e)
                    }).bind(null, t)
                }), t.B_.push(async e => {
                    e ? (t.U_.s_(), await Ao(t)) : (await t.U_.stop(), 0 < t.O_.length && (L("RemoteStore", `Stopping write stream with ${t.O_.length} pending writes`), t.O_ = []))
                })), t.U_
            }
            class Vo {
                constructor(e, t, n, r, i) {
                    this.asyncQueue = e, this.timerId = t, this.targetTimeMs = n, this.op = r, this.removalCallback = i, this.deferred = new j, this.then = this.deferred.promise.then.bind(this.deferred.promise), this.deferred.promise.catch(e => {})
                }
                get promise() {
                    return this.deferred.promise
                }
                static createAndSchedule(e, t, n, r, i) {
                    const s = Date.now() + n,
                        a = new Vo(e, t, s, r, i);
                    return a.start(n), a
                }
                start(e) {
                    this.timerHandle = setTimeout(() => this.handleDelayElapsed(), e)
                }
                skipDelay() {
                    return this.handleDelayElapsed()
                }
                cancel(e) {
                    null !== this.timerHandle && (this.clearTimeout(), this.deferred.reject(new q(B.CANCELLED, "Operation cancelled" + (e ? ": " + e : ""))))
                }
                handleDelayElapsed() {
                    this.asyncQueue.enqueueAndForget(() => null !== this.timerHandle ? (this.clearTimeout(), this.op().then(e => this.deferred.resolve(e))) : Promise.resolve())
                }
                clearTimeout() {
                    null !== this.timerHandle && (this.removalCallback(this), clearTimeout(this.timerHandle), this.timerHandle = null)
                }
            }

            function Po(e, t) {
                if (M("AsyncQueue", `${t}: ${e}`), xe(e)) return new q(B.UNAVAILABLE, `${t}: ${e}`);
                throw e
            }
            class Uo {
                constructor(n) {
                    this.comparator = n ? (e, t) => n(e, t) || oe.comparator(e.key, t.key) : (e, t) => oe.comparator(e.key, t.key), this.keyedMap = ar(), this.sortedSet = new pt(this.comparator)
                }
                static emptySet(e) {
                    return new Uo(e.comparator)
                }
                has(e) {
                    return null != this.keyedMap.get(e)
                }
                get(e) {
                    return this.keyedMap.get(e)
                }
                first() {
                    return this.sortedSet.minKey()
                }
                last() {
                    return this.sortedSet.maxKey()
                }
                isEmpty() {
                    return this.sortedSet.isEmpty()
                }
                indexOf(e) {
                    var t = this.keyedMap.get(e);
                    return t ? this.sortedSet.indexOf(t) : -1
                }
                get size() {
                    return this.sortedSet.size
                }
                forEach(n) {
                    this.sortedSet.inorderTraversal((e, t) => (n(e), !1))
                }
                add(e) {
                    const t = this.delete(e.key);
                    return t.copy(t.keyedMap.insert(e.key, e), t.sortedSet.insert(e, null))
                }
                delete(e) {
                    var t = this.get(e);
                    return t ? this.copy(this.keyedMap.remove(e), this.sortedSet.remove(t)) : this
                }
                isEqual(e) {
                    if (!(e instanceof Uo)) return !1;
                    if (this.size !== e.size) return !1;
                    const t = this.sortedSet.getIterator(),
                        n = e.sortedSet.getIterator();
                    for (; t.hasNext();) {
                        const e = t.getNext().key,
                            r = n.getNext().key;
                        if (!e.isEqual(r)) return !1
                    }
                    return !0
                }
                toString() {
                    const t = [];
                    return this.forEach(e => {
                        t.push(e.toString())
                    }), 0 === t.length ? "DocumentSet ()" : "DocumentSet (\n  " + t.join("  \n") + "\n)"
                }
                copy(e, t) {
                    const n = new Uo;
                    return n.comparator = this.comparator, n.keyedMap = e, n.sortedSet = t, n
                }
            }
            class Bo {
                constructor() {
                    this.W_ = new pt(oe.comparator)
                }
                track(e) {
                    var t = e.doc.key,
                        n = this.W_.get(t);
                    !n || 0 !== e.type && 3 === n.type ? this.W_ = this.W_.insert(t, e) : 3 === e.type && 1 !== n.type ? this.W_ = this.W_.insert(t, {
                        type: n.type,
                        doc: e.doc
                    }) : 2 === e.type && 2 === n.type ? this.W_ = this.W_.insert(t, {
                        type: 2,
                        doc: e.doc
                    }) : 2 === e.type && 0 === n.type ? this.W_ = this.W_.insert(t, {
                        type: 0,
                        doc: e.doc
                    }) : 1 === e.type && 0 === n.type ? this.W_ = this.W_.remove(t) : 1 === e.type && 2 === n.type ? this.W_ = this.W_.insert(t, {
                        type: 1,
                        doc: n.doc
                    }) : 0 === e.type && 1 === n.type ? this.W_ = this.W_.insert(t, {
                        type: 2,
                        doc: e.doc
                    }) : P()
                }
                G_() {
                    const n = [];
                    return this.W_.inorderTraversal((e, t) => {
                        n.push(t)
                    }), n
                }
            }
            class qo {
                constructor(e, t, n, r, i, s, a, o, u) {
                    this.query = e, this.docs = t, this.oldDocs = n, this.docChanges = r, this.mutatedKeys = i, this.fromCache = s, this.syncStateChanged = a, this.excludesMetadataChanges = o, this.hasCachedResults = u
                }
                static fromInitialDocuments(e, t, n, r, i) {
                    const s = [];
                    return t.forEach(e => {
                        s.push({
                            type: 0,
                            doc: e
                        })
                    }), new qo(e, t, Uo.emptySet(t), s, n, r, !0, !1, i)
                }
                get hasPendingWrites() {
                    return !this.mutatedKeys.isEmpty()
                }
                isEqual(e) {
                    if (!(this.fromCache === e.fromCache && this.hasCachedResults === e.hasCachedResults && this.syncStateChanged === e.syncStateChanged && this.mutatedKeys.isEqual(e.mutatedKeys) && Yn(this.query, e.query) && this.docs.isEqual(e.docs) && this.oldDocs.isEqual(e.oldDocs))) return !1;
                    const t = this.docChanges,
                        n = e.docChanges;
                    if (t.length !== n.length) return !1;
                    for (let r = 0; r < t.length; r++)
                        if (t[r].type !== n[r].type || !t[r].doc.isEqual(n[r].doc)) return !1;
                    return !0
                }
            }
            class jo {
                constructor() {
                    this.z_ = void 0, this.j_ = []
                }
                H_() {
                    return this.j_.some(e => e.J_())
                }
            }
            class Ko {
                constructor() {
                    this.queries = Go(), this.onlineState = "Unknown", this.Y_ = new Set
                }
                terminate() {
                    ! function (e, n) {
                        const t = e,
                            r = t.queries;
                        t.queries = Go(), r.forEach((e, t) => {
                            for (const e of t.j_) e.onError(n)
                        })
                    }(this, new q(B.ABORTED, "Firestore shutting down"))
                }
            }

            function Go() {
                return new rr(e => Xn(e), Yn)
            }
            async function zo(e, t) {
                const n = e;
                let r = 3;
                var i = t.query;
                let s = n.queries.get(i);
                s ? !s.H_() && t.J_() && (r = 2) : (s = new jo, r = t.J_() ? 0 : 1);
                try {
                    switch (r) {
                        case 0:
                            s.z_ = await n.onListen(i, !0);
                            break;
                        case 1:
                            s.z_ = await n.onListen(i, !1);
                            break;
                        case 2:
                            await n.onFirstRemoteStoreListen(i)
                    }
                } catch (e) {
                    const n = Po(e, `Initialization of query '${Zn(t.query)}' failed`);
                    return void t.onError(n)
                }
                n.queries.set(i, s), s.j_.push(t), t.Z_(n.onlineState), !s.z_ || t.X_(s.z_) && Qo(n)
            }
            async function $o(e, t) {
                const n = e,
                    r = t.query;
                let i = 3;
                const s = n.queries.get(r);
                if (s) {
                    const e = s.j_.indexOf(t);
                    0 <= e && (s.j_.splice(e, 1), 0 === s.j_.length ? i = t.J_() ? 0 : 1 : !s.H_() && t.J_() && (i = 2))
                }
                switch (i) {
                    case 0:
                        return n.queries.delete(r), n.onUnlisten(r, !0);
                    case 1:
                        return n.queries.delete(r), n.onUnlisten(r, !1);
                    case 2:
                        return n.onLastRemoteStoreUnlisten(r);
                    default:
                        return
                }
            }

            function Qo(e) {
                e.Y_.forEach(e => {
                    e.next()
                })
            }(D = D || {}).ea = "default", D.Cache = "cache";
            class Ho {
                constructor(e, t, n) {
                    this.query = e, this.ta = t, this.na = !1, this.ra = null, this.onlineState = "Unknown", this.options = n || {}
                }
                X_(e) {
                    if (!this.options.includeMetadataChanges) {
                        const t = [];
                        for (const n of e.docChanges) 3 !== n.type && t.push(n);
                        e = new qo(e.query, e.docs, e.oldDocs, t, e.mutatedKeys, e.fromCache, e.syncStateChanged, !0, e.hasCachedResults)
                    }
                    let t = !1;
                    return this.na ? this.ia(e) && (this.ta.next(e), t = !0) : this.sa(e, this.onlineState) && (this.oa(e), t = !0), this.ra = e, t
                }
                onError(e) {
                    this.ta.error(e)
                }
                Z_(e) {
                    this.onlineState = e;
                    let t = !1;
                    return this.ra && !this.na && this.sa(this.ra, e) && (this.oa(this.ra), t = !0), t
                }
                sa(e, t) {
                    return !e.fromCache || (!this.J_() || (!this.options._a || !("Offline" !== t)) && (!e.docs.isEmpty() || e.hasCachedResults || "Offline" === t))
                }
                ia(e) {
                    if (0 < e.docChanges.length) return !0;
                    var t = this.ra && this.ra.hasPendingWrites !== e.hasPendingWrites;
                    return !(!e.syncStateChanged && !t) && !0 === this.options.includeMetadataChanges
                }
                oa(e) {
                    e = qo.fromInitialDocuments(e.query, e.docs, e.mutatedKeys, e.fromCache, e.hasCachedResults), this.na = !0, this.ta.next(e)
                }
                J_() {
                    return this.options.source !== D.Cache
                }
            }
            class Wo {
                constructor(e, t) {
                    this.aa = e, this.byteLength = t
                }
                ua() {
                    return "metadata" in this.aa
                }
            }
            class Jo {
                constructor(e) {
                    this.serializer = e
                }
                Es(e) {
                    return bi(this.serializer, e)
                }
                ds(e) {
                    return e.metadata.exists ? Di(this.serializer, e.document, !1) : nn.newNoDocument(this.Es(e.metadata.name), this.As(e.metadata.readTime))
                }
                As(e) {
                    return pi(e)
                }
            }
            class Yo {
                constructor(e, t, n) {
                    this.ca = e, this.localStore = t, this.serializer = n, this.queries = [], this.documents = [], this.collectionGroups = new Set, this.progress = Xo(e)
                }
                la(e) {
                    this.progress.bytesLoaded += e.byteLength;
                    let t = this.progress.documentsLoaded;
                    if (e.aa.namedQuery) this.queries.push(e.aa.namedQuery);
                    else if (e.aa.documentMetadata) {
                        this.documents.push({
                            metadata: e.aa.documentMetadata
                        }), e.aa.documentMetadata.exists || ++t;
                        const n = ie.fromString(e.aa.documentMetadata.name);
                        this.collectionGroups.add(n.get(n.length - 2))
                    } else e.aa.document && (this.documents[this.documents.length - 1].document = e.aa.document, ++t);
                    return t !== this.progress.documentsLoaded ? (this.progress.documentsLoaded = t, Object.assign({}, this.progress)) : null
                }
                ha(e) {
                    const t = new Map,
                        n = new Jo(this.serializer);
                    for (const i of e)
                        if (i.metadata.queries) {
                            const e = n.Es(i.metadata.name);
                            for (const n of i.metadata.queries) {
                                var r = (t.get(n) || lr()).add(e);
                                t.set(n, r)
                            }
                        } return t
                }
                async complete() {
                    const e = await async function (e, t, n, r) {
                        const i = e;
                        let s = lr(),
                            a = ir;
                        for (const e of n) {
                            const n = t.Es(e.metadata.name);
                            e.document && (s = s.add(n));
                            const c = t.ds(e);
                            c.setReadTime(t.As(e.metadata.readTime)), a = a.insert(n, c)
                        }
                        const o = i.cs.newChangeBuffer({
                                trackRemovals: !0
                            }),
                            u = await Fa(i, (r = r, Hn(Gn(ie.fromString(`__bundle__/docs/${r}`)))));
                        return i.persistence.runTransaction("Apply bundle documents", "readwrite", t => Ma(t, o, a).next(e => (o.apply(t), e)).next(e => i.Ur.removeMatchingKeysForTargetId(t, u.targetId).next(() => i.Ur.addMatchingKeys(t, s, u.targetId)).next(() => i.localDocuments.getLocalViewOfDocuments(t, e.Ps, e.Is)).next(() => e.Ps)))
                    }(this.localStore, new Jo(this.serializer), this.documents, this.ca.id), t = this.ha(this.documents);
                    for (const e of this.queries) await async function (e, n, r = lr()) {
                        const i = await Fa(e, Hn(Qi(n.bundledQuery))),
                            s = e;
                        return s.persistence.runTransaction("Save named query", "readwrite", e => {
                            var t = pi(n.readTime);
                            if (0 <= i.snapshotVersion.compareTo(t)) return s.Gr.saveNamedQuery(e, n);
                            t = i.withResumeToken(Et.EMPTY_BYTE_STRING, t);
                            return s.os = s.os.insert(t.targetId, t), s.Ur.updateTargetData(e, t).next(() => s.Ur.removeMatchingKeysForTargetId(e, i.targetId)).next(() => s.Ur.addMatchingKeys(e, r, i.targetId)).next(() => s.Gr.saveNamedQuery(e, n))
                        })
                    }(this.localStore, e, t.get(e.name));
                    return this.progress.taskState = "Success", {
                        progress: this.progress,
                        Pa: this.collectionGroups,
                        Ia: e
                    }
                }
            }

            function Xo(e) {
                return {
                    taskState: "Running",
                    documentsLoaded: 0,
                    bytesLoaded: 0,
                    totalDocuments: e.totalDocuments,
                    totalBytes: e.totalBytes
                }
            }
            class Zo {
                constructor(e) {
                    this.key = e
                }
            }
            class eu {
                constructor(e) {
                    this.key = e
                }
            }
            class tu {
                constructor(e, t) {
                    this.query = e, this.Ta = t, this.Ea = null, this.hasCachedResults = !1, this.current = !1, this.da = lr(), this.mutatedKeys = lr(), this.Aa = nr(e), this.Ra = new Uo(this.Aa)
                }
                get Va() {
                    return this.Ta
                }
                ma(e, t) {
                    const o = t ? t.fa : new Bo,
                        u = (t || this).Ra;
                    let c = (t || this).mutatedKeys,
                        h = u,
                        l = !1;
                    const d = "F" === this.query.limitType && u.size === this.query.limit ? u.last() : null,
                        f = "L" === this.query.limitType && u.size === this.query.limit ? u.first() : null;
                    if (e.inorderTraversal((e, t) => {
                            const n = u.get(e),
                                r = er(this.query, t) ? t : null,
                                i = !!n && this.mutatedKeys.has(n.key),
                                s = !!r && (r.hasLocalMutations || this.mutatedKeys.has(r.key) && r.hasCommittedMutations);
                            let a = !1;
                            n && r ? n.data.isEqual(r.data) ? i !== s && (o.track({
                                type: 3,
                                doc: r
                            }), a = !0) : this.ga(n, r) || (o.track({
                                type: 2,
                                doc: r
                            }), a = !0, (d && 0 < this.Aa(r, d) || f && this.Aa(r, f) < 0) && (l = !0)) : !n && r ? (o.track({
                                type: 0,
                                doc: r
                            }), a = !0) : n && !r && (o.track({
                                type: 1,
                                doc: n
                            }), a = !0, (d || f) && (l = !0)), a && (c = r ? (h = h.add(r), s ? c.add(e) : c.delete(e)) : (h = h.delete(e), c.delete(e)))
                        }), null !== this.query.limit)
                        for (; h.size > this.query.limit;) {
                            const e = "F" === this.query.limitType ? h.last() : h.first();
                            h = h.delete(e.key), c = c.delete(e.key), o.track({
                                type: 1,
                                doc: e
                            })
                        }
                    return {
                        Ra: h,
                        fa: o,
                        ns: l,
                        mutatedKeys: c
                    }
                }
                ga(e, t) {
                    return e.hasLocalMutations && t.hasCommittedMutations && !t.hasLocalMutations
                }
                applyChanges(e, t, n, r) {
                    var i = this.Ra;
                    this.Ra = e.Ra, this.mutatedKeys = e.mutatedKeys;
                    const s = e.fa.G_();
                    s.sort((e, t) => function (e, t) {
                        var n = e => {
                            switch (e) {
                                case 0:
                                    return 1;
                                case 2:
                                case 3:
                                    return 2;
                                case 1:
                                    return 0;
                                default:
                                    return P()
                            }
                        };
                        return n(e) - n(t)
                    }(e.type, t.type) || this.Aa(e.doc, t.doc)), this.pa(n), r = null != r && r;
                    var a = t && !r ? this.ya() : [],
                        o = 0 === this.da.size && this.current && !r ? 1 : 0,
                        u = o !== this.Ea;
                    return this.Ea = o, 0 !== s.length || u ? {
                        snapshot: new qo(this.query, e.Ra, i, s, e.mutatedKeys, 0 == o, u, !1, !!n && 0 < n.resumeToken.approximateByteSize()),
                        wa: a
                    } : {
                        wa: a
                    }
                }
                Z_(e) {
                    return this.current && "Offline" === e ? (this.current = !1, this.applyChanges({
                        Ra: this.Ra,
                        fa: new Bo,
                        mutatedKeys: this.mutatedKeys,
                        ns: !1
                    }, !1)) : {
                        wa: []
                    }
                }
                Sa(e) {
                    return !this.Ta.has(e) && !!this.Ra.has(e) && !this.Ra.get(e).hasLocalMutations
                }
                pa(e) {
                    e && (e.addedDocuments.forEach(e => this.Ta = this.Ta.add(e)), e.modifiedDocuments.forEach(e => {}), e.removedDocuments.forEach(e => this.Ta = this.Ta.delete(e)), this.current = e.current)
                }
                ya() {
                    if (!this.current) return [];
                    const t = this.da;
                    this.da = lr(), this.Ra.forEach(e => {
                        this.Sa(e.key) && (this.da = this.da.add(e.key))
                    });
                    const n = [];
                    return t.forEach(e => {
                        this.da.has(e) || n.push(new eu(e))
                    }), this.da.forEach(e => {
                        t.has(e) || n.push(new Zo(e))
                    }), n
                }
                ba(e) {
                    this.Ta = e.Ts, this.da = lr();
                    var t = this.ma(e.documents);
                    return this.applyChanges(t, !0)
                }
                Da() {
                    return qo.fromInitialDocuments(this.query, this.Ra, this.mutatedKeys, 0 === this.Ea, this.hasCachedResults)
                }
            }
            class nu {
                constructor(e, t, n) {
                    this.query = e, this.targetId = t, this.view = n
                }
            }
            class ru {
                constructor(e) {
                    this.key = e, this.va = !1
                }
            }
            class iu {
                constructor(e, t, n, r, i, s) {
                    this.localStore = e, this.remoteStore = t, this.eventManager = n, this.sharedClientState = r, this.currentUser = i, this.maxConcurrentLimboResolutions = s, this.Ca = {}, this.Fa = new rr(e => Xn(e), Yn), this.Ma = new Map, this.xa = new Set, this.Oa = new pt(oe.comparator), this.Na = new Map, this.La = new ha, this.Ba = {}, this.ka = new Map, this.qa = Ps.kn(), this.onlineState = "Unknown", this.Qa = void 0
                }
                get isPrimaryClient() {
                    return !0 === this.Qa
                }
            }
            async function su(e, t, n, r) {
                var i = await Fa(e.localStore, Hn(t)),
                    s = i.targetId,
                    a = e.sharedClientState.addLocalQueryTarget(s, n);
                let o;
                return r && (o = await au(e, t, s, "current" === a, i.resumeToken)), e.isPrimaryClient && n && wo(e.remoteStore, i), o
            }
            async function au(r, e, t, n, i) {
                r.Ka = (e, t, n) => async function (e, t, n, r) {
                    let i = t.view.ma(n);
                    i.ns && (i = await Pa(e.localStore, t.query, !1).then(({
                        documents: e
                    }) => t.view.ma(e, i)));
                    var s = r && r.targetChanges.get(t.targetId),
                        a = r && null != r.targetMismatches.get(t.targetId),
                        a = t.view.applyChanges(i, e.isPrimaryClient, s, a);
                    return mu(e, t.targetId, a.wa), a.snapshot
                }(r, e, t, n);
                const s = await Pa(r.localStore, e, !0),
                    a = new tu(e, s.Ts),
                    o = a.ma(s.documents),
                    u = ti.createSynthesizedTargetChangeForCurrentChange(t, n && "Offline" !== r.onlineState, i),
                    c = a.applyChanges(o, r.isPrimaryClient, u);
                mu(r, t, c.wa);
                var h = new nu(e, t, a);
                return r.Fa.set(e, h), r.Ma.has(t) ? r.Ma.get(t).push(e) : r.Ma.set(t, [e]), c.snapshot
            }
            async function ou(e, t, n) {
                const r = Iu(e);
                try {
                    const e = await
                    function (e, i) {
                        const s = e,
                            a = te.now(),
                            o = i.reduce((e, t) => e.add(t.key), lr());
                        let u, c;
                        return s.persistence.runTransaction("Locally write mutations", "readwrite", n => {
                            let t = ir,
                                r = lr();
                            return s.cs.getEntries(n, o).next(e => {
                                t = e, t.forEach((e, t) => {
                                    t.isValidDocument() || (r = r.add(e))
                                })
                            }).next(() => s.localDocuments.getOverlayedDocuments(n, t)).next(e => {
                                u = e;
                                const t = [];
                                for (const n of i) {
                                    const i = function (e, t) {
                                        let n = null;
                                        for (const r of e.fieldTransforms) {
                                            const e = t.data.field(r.field),
                                                i = yr(r.transform, e || null);
                                            null != i && (null === n && (n = tn.empty()), n.set(r.field, i))
                                        }
                                        return n || null
                                    }(n, u.get(n.key).overlayedDocument);
                                    null != i && t.push(new Fr(n.key, i, function r(e) {
                                        const i = [];
                                        return gt(e.fields, (e, t) => {
                                            const n = new ae([e]);
                                            if (Ht(t)) {
                                                const e = r(t.mapValue).fields;
                                                if (0 === e.length) i.push(n);
                                                else
                                                    for (const t of e) i.push(n.child(t))
                                            } else i.push(n)
                                        }), new It(i)
                                    }(i.value.mapValue), Cr.exists(!0)))
                                }
                                return s.mutationQueue.addMutationBatch(n, a, t, i)
                            }).next(e => {
                                var t = (c = e).applyToLocalDocumentSet(u, r);
                                return s.documentOverlayCache.saveOverlays(n, e.batchId, t)
                            })
                        }).then(() => ({
                            batchId: c.batchId,
                            changes: or(u)
                        }))
                    }(r.localStore, t);
                    r.sharedClientState.addPendingMutation(e.batchId),
                        function (e, t, n) {
                            let r = e.Ba[e.currentUser.toKey()];
                            r = r || new pt(X), r = r.insert(t, n), e.Ba[e.currentUser.toKey()] = r
                        }(r, e.batchId, n), await yu(r, e.changes), await Ao(r.remoteStore)
                } catch (e) {
                    const t = Po(e, "Failed to persist write");
                    n.reject(t)
                }
            }
            async function uu(e, t) {
                const r = e;
                try {
                    const e = await La(r.localStore, t);
                    t.targetChanges.forEach((e, t) => {
                        const n = r.Na.get(t);
                        n && (U(e.addedDocuments.size + e.modifiedDocuments.size + e.removedDocuments.size <= 1), 0 < e.addedDocuments.size ? n.va = !0 : 0 < e.modifiedDocuments.size ? U(n.va) : 0 < e.removedDocuments.size && (U(n.va), n.va = !1))
                    }), await yu(r, e, t)
                } catch (e) {
                    await we(e)
                }
            }

            function cu(r, i, e) {
                const t = r;
                if (t.isPrimaryClient && 0 === e || !t.isPrimaryClient && 1 === e) {
                    const r = [];
                    t.Fa.forEach((e, t) => {
                            var n = t.view.Z_(i);
                            n.snapshot && r.push(n.snapshot)
                        }),
                        function (e, n) {
                            const t = e;
                            t.onlineState = n;
                            let r = !1;
                            t.queries.forEach((e, t) => {
                                for (const e of t.j_) e.Z_(n) && (r = !0)
                            }), r && Qo(t)
                        }(t.eventManager, i), r.length && t.Ca.d_(r), t.onlineState = i, t.isPrimaryClient && t.sharedClientState.setOnlineState(i)
                }
            }
            async function hu(e, t) {
                const n = e,
                    r = t.batch.batchId;
                try {
                    const e = await
                    function (e, r) {
                        const i = e;
                        return i.persistence.runTransaction("Acknowledge batch", "readwrite-primary", e => {
                            const t = r.batch.keys(),
                                n = i.cs.newChangeBuffer({
                                    trackRemovals: !0
                                });
                            return function (e, t, r, i) {
                                const s = r.batch,
                                    n = s.keys();
                                let a = _e.resolve();
                                return n.forEach(n => {
                                    a = a.next(() => i.getEntry(t, n)).next(e => {
                                        var t = r.docVersions.get(n);
                                        U(null !== t), e.version.compareTo(t) < 0 && (s.applyToRemoteDocument(e, r), e.isValidDocument() && (e.setReadTime(r.commitVersion), i.addEntry(e)))
                                    })
                                }), a.next(() => e.mutationQueue.removeMutationBatch(t, s))
                            }(i, e, r, n).next(() => n.apply(e)).next(() => i.mutationQueue.performConsistencyCheck(e)).next(() => i.documentOverlayCache.removeOverlaysForBatchId(e, t, r.batch.batchId)).next(() => i.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e, function (e) {
                                let t = lr();
                                for (let n = 0; n < e.mutationResults.length; ++n) 0 < e.mutationResults[n].transformResults.length && (t = t.add(e.batch.mutations[n].key));
                                return t
                            }(r))).next(() => i.localDocuments.getDocuments(e, t))
                        })
                    }(n.localStore, t);
                    du(n, r, null), lu(n, r), n.sharedClientState.updateMutationState(r, "acknowledged"), await yu(n, e)
                } catch (e) {
                    await we(e)
                }
            }

            function lu(e, t) {
                (e.ka.get(t) || []).forEach(e => {
                    e.resolve()
                }), e.ka.delete(t)
            }

            function du(e, t, n) {
                const r = e;
                let i = r.Ba[r.currentUser.toKey()];
                if (i) {
                    const e = i.get(t);
                    e && (n ? e.reject(n) : e.resolve(), i = i.remove(t)), r.Ba[r.currentUser.toKey()] = i
                }
            }

            function fu(t, e, n = null) {
                t.sharedClientState.removeLocalQueryTarget(e);
                for (const r of t.Ma.get(e)) t.Fa.delete(r), n && t.Ca.$a(r, n);
                t.Ma.delete(e), t.isPrimaryClient && t.La.gr(e).forEach(e => {
                    t.La.containsKey(e) || gu(t, e)
                })
            }

            function gu(e, t) {
                e.xa.delete(t.path.canonicalString());
                var n = e.Oa.get(t);
                null !== n && (_o(e.remoteStore, n), e.Oa = e.Oa.remove(t), e.Na.delete(n), pu(e))
            }

            function mu(e, t, n) {
                for (const r of n) r instanceof Zo ? (e.La.addReference(r.key, t), function (e, t) {
                    const n = t.key,
                        r = n.path.canonicalString();
                    e.Oa.get(n) || e.xa.has(r) || (L("SyncEngine", "New document in limbo: " + n), e.xa.add(r), pu(e))
                }(e, r)) : r instanceof eu ? (L("SyncEngine", "Document no longer in limbo: " + r.key), e.La.removeReference(r.key, t), e.La.containsKey(r.key) || gu(e, r.key)) : P()
            }

            function pu(e) {
                for (; 0 < e.xa.size && e.Oa.size < e.maxConcurrentLimboResolutions;) {
                    var t = e.xa.values().next().value;
                    e.xa.delete(t);
                    var n = new oe(ie.fromString(t)),
                        t = e.qa.next();
                    e.Na.set(t, new ru(n)), e.Oa = e.Oa.insert(n, t), wo(e.remoteStore, new Pi(Hn(Gn(n.path)), t, "TargetPurposeLimboResolution", Oe.oe))
                }
            }
            async function yu(e, t, r) {
                const i = e,
                    s = [],
                    a = [],
                    o = [];
                i.Fa.isEmpty() || (i.Fa.forEach((e, n) => {
                    o.push(i.Ka(n, t, r).then(e => {
                        var t;
                        if ((e || r) && i.isPrimaryClient) {
                            const s = e ? !e.fromCache : null === (t = null == r ? void 0 : r.targetChanges.get(n.targetId)) || void 0 === t ? void 0 : t.current;
                            i.sharedClientState.updateQueryState(n.targetId, s ? "current" : "not-current")
                        }
                        if (e) {
                            s.push(e);
                            const t = Da.Wi(n.targetId, e);
                            a.push(t)
                        }
                    }))
                }), await Promise.all(o), i.Ca.d_(s), await async function (e, t) {
                    const r = e;
                    try {
                        await r.persistence.runTransaction("notifyLocalViewChanges", "readwrite", n => _e.forEach(t, t => _e.forEach(t.$i, e => r.persistence.referenceDelegate.addReference(n, t.targetId, e)).next(() => _e.forEach(t.Ui, e => r.persistence.referenceDelegate.removeReference(n, t.targetId, e)))))
                    } catch (e) {
                        if (!xe(e)) throw e;
                        L("LocalStore", "Failed to update sequence numbers: " + e)
                    }
                    for (const e of t) {
                        const t = e.targetId;
                        if (!e.fromCache) {
                            const e = r.os.get(t),
                                n = e.snapshotVersion,
                                i = e.withLastLimboFreeSnapshotVersion(n);
                            r.os = r.os.insert(t, i)
                        }
                    }
                }(i.localStore, a))
            }
            async function vu(r, e) {
                const i = r;
                if (bu(i), Iu(i), !0 === e && !0 !== i.Qa) {
                    const r = i.sharedClientState.getAllActiveQueryTargets(),
                        e = await wu(i, r.toArray());
                    i.Qa = !0, await Lo(i.remoteStore, !0);
                    for (const r of e) wo(i.remoteStore, r)
                } else if (!1 === e && !1 !== i.Qa) {
                    const r = [];
                    let n = Promise.resolve();
                    i.Ma.forEach((e, t) => {
                            i.sharedClientState.isLocalQueryTarget(t) ? r.push(t) : n = n.then(() => (fu(i, t), Va(i.localStore, t, !0))), _o(i.remoteStore, t)
                        }), await n, await wu(i, r),
                        function (e) {
                            const n = e;
                            n.Na.forEach((e, t) => {
                                _o(n.remoteStore, t)
                            }), n.La.pr(), n.Na = new Map, n.Oa = new pt(oe.comparator)
                        }(i), i.Qa = !1, await Lo(i.remoteStore, !1)
                }
            }
            async function wu(t, n) {
                const r = t,
                    i = [],
                    s = [];
                for (const t of n) {
                    let e;
                    const h = r.Ma.get(t);
                    if (h && 0 !== h.length) {
                        e = await Fa(r.localStore, Hn(h[0]));
                        for (const t of h) {
                            const n = r.Fa.get(t),
                                h = (a = r, o = n, c = u = void 0, c = await Pa((u = a).localStore, o.query, !0), c = o.view.ba(c), u.isPrimaryClient && mu(u, o.targetId, c.wa), await c);
                            h.snapshot && s.push(h.snapshot)
                        }
                    } else {
                        const h = await Ua(r.localStore, t);
                        e = await Fa(r.localStore, h), await au(r, _u(h), t, !1, e.resumeToken)
                    }
                    i.push(e)
                }
                var a, o, u, c;
                return r.Ca.d_(s), i
            }

            function _u(e) {
                return Kn(e.path, e.collectionGroup, e.orderBy, e.filters, e.limit, "F", e.startAt, e.endAt)
            }

            function bu(e) {
                const t = e;
                return t.remoteStore.remoteSyncer.applyRemoteEvent = uu.bind(null, t), t.remoteStore.remoteSyncer.getRemoteKeysForTarget = (function (e, t) {
                    const n = e,
                        r = n.Na.get(t);
                    if (r && r.va) return lr().add(r.key); {
                        let e = lr();
                        const r = n.Ma.get(t);
                        if (!r) return e;
                        for (const t of r) {
                            const r = n.Fa.get(t);
                            e = e.unionWith(r.view.Va)
                        }
                        return e
                    }
                }).bind(null, t), t.remoteStore.remoteSyncer.rejectListen = (async function (e, t, n) {
                    const r = e;
                    r.sharedClientState.updateQueryState(t, "rejected", n);
                    const i = r.Na.get(t),
                        s = i && i.key;
                    if (s) {
                        let e = new pt(oe.comparator);
                        e = e.insert(s, nn.newNoDocument(s, ne.min()));
                        const n = lr().add(s),
                            i = new ei(ne.min(), new Map, new pt(X), e, n);
                        await uu(r, i), r.Oa = r.Oa.remove(s), r.Na.delete(t), pu(r)
                    } else await Va(r.localStore, t, !1).then(() => fu(r, t, n)).catch(we)
                }).bind(null, t), t.Ca.d_ = (function (e, t) {
                    const n = e;
                    let r = !1;
                    for (const e of t) {
                        const t = e.query,
                            i = n.queries.get(t);
                        if (i) {
                            for (const t of i.j_) t.X_(e) && (r = !0);
                            i.z_ = e
                        }
                    }
                    r && Qo(n)
                }).bind(null, t.eventManager), t.Ca.$a = (function (e, t, n) {
                    const r = e,
                        i = r.queries.get(t);
                    if (i)
                        for (const e of i.j_) e.onError(n);
                    r.queries.delete(t)
                }).bind(null, t.eventManager), t
            }

            function Iu(e) {
                const t = e;
                return t.remoteStore.remoteSyncer.applySuccessfulWrite = hu.bind(null, t), t.remoteStore.remoteSyncer.rejectFailedWrite = (async function (e, t, n) {
                    const r = e;
                    try {
                        const e = await
                        function (e, r) {
                            const i = e;
                            return i.persistence.runTransaction("Reject batch", "readwrite-primary", t => {
                                let n;
                                return i.mutationQueue.lookupMutationBatch(t, r).next(e => (U(null !== e), n = e.keys(), i.mutationQueue.removeMutationBatch(t, e))).next(() => i.mutationQueue.performConsistencyCheck(t)).next(() => i.documentOverlayCache.removeOverlaysForBatchId(t, n, r)).next(() => i.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(t, n)).next(() => i.localDocuments.getDocuments(t, n))
                            })
                        }(r.localStore, t);
                        du(r, t, n), lu(r, t), r.sharedClientState.updateMutationState(t, "rejected", n), await yu(r, e)
                    } catch (n) {
                        await we(n)
                    }
                }).bind(null, t), t
            }
            class Tu {
                constructor() {
                    this.kind = "memory", this.synchronizeTabs = !1
                }
                async initialize(e) {
                    this.serializer = uo(e.databaseInfo.databaseId), this.sharedClientState = this.Wa(e), this.persistence = this.Ga(e), await this.persistence.start(), this.localStore = this.za(e), this.gcScheduler = this.ja(e, this.localStore), this.indexBackfillerScheduler = this.Ha(e, this.localStore)
                }
                ja(e, t) {
                    return null
                }
                Ha(e, t) {
                    return null
                }
                za(e) {
                    return ka(this.persistence, new Aa, e.initialUser, this.serializer)
                }
                Ga(e) {
                    return new pa(va.Zr, this.serializer)
                }
                Wa(e) {
                    return new Ya
                }
                async terminate() {
                    var e;
                    null === (e = this.gcScheduler) || void 0 === e || e.stop(), null === (e = this.indexBackfillerScheduler) || void 0 === e || e.stop(), this.sharedClientState.shutdown(), await this.persistence.shutdown()
                }
            }
            Tu.provider = {
                build: () => new Tu
            };
            class Eu extends Tu {
                constructor(e) {
                    super(), this.cacheSizeBytes = e
                }
                ja(e, t) {
                    U(this.persistence.referenceDelegate instanceof wa);
                    var n = this.persistence.referenceDelegate.garbageCollector;
                    return new zs(n, e.asyncQueue, t)
                }
                Ga(e) {
                    const t = void 0 !== this.cacheSizeBytes ? Ns.withCacheSize(this.cacheSizeBytes) : Ns.DEFAULT;
                    return new pa(e => wa.Zr(e, t), this.serializer)
                }
            }
            class Su extends Tu {
                constructor(e, t, n) {
                    super(), this.Ja = e, this.cacheSizeBytes = t, this.forceOwnership = n, this.kind = "persistent", this.synchronizeTabs = !1
                }
                async initialize(e) {
                    await super.initialize(e), await this.Ja.initialize(this, e), await Iu(this.Ja.syncEngine), await Ao(this.Ja.remoteStore), await this.persistence.yi(() => (this.gcScheduler && !this.gcScheduler.started && this.gcScheduler.start(), this.indexBackfillerScheduler && !this.indexBackfillerScheduler.started && this.indexBackfillerScheduler.start(), Promise.resolve()))
                }
                za(e) {
                    return ka(this.persistence, new Aa, e.initialUser, this.serializer)
                }
                ja(e, t) {
                    var n = this.persistence.referenceDelegate.garbageCollector;
                    return new zs(n, e.asyncQueue, t)
                }
                Ha(e, t) {
                    var n = new Re(t, this.persistence);
                    return new ke(e.asyncQueue, n)
                }
                Ga(e) {
                    var t = xa(e.databaseInfo.databaseId, e.databaseInfo.persistenceKey),
                        n = void 0 !== this.cacheSizeBytes ? Ns.withCacheSize(this.cacheSizeBytes) : Ns.DEFAULT;
                    return new Ta(this.synchronizeTabs, t, e.clientId, n, e.asyncQueue, ao(), oo(), this.serializer, this.sharedClientState, !!this.forceOwnership)
                }
                Wa(e) {
                    return new Ya
                }
            }
            class xu extends Su {
                constructor(e, t) {
                    super(e, t, !1), this.Ja = e, this.cacheSizeBytes = t, this.synchronizeTabs = !0
                }
                async initialize(e) {
                    await super.initialize(e);
                    var t = this.Ja.syncEngine;
                    this.sharedClientState instanceof Ja && (this.sharedClientState.syncEngine = {
                        no: (async function (e, t, n, r) {
                            var i = e,
                                s = await
                            function (e, n) {
                                const r = e,
                                    i = r.mutationQueue;
                                return r.persistence.runTransaction("Lookup mutation documents", "readonly", t => i.Mn(t, n).next(e => e ? r.localDocuments.getDocuments(t, e) : _e.resolve(null)))
                            }(i.localStore, t);
                            null !== s ? ("pending" === n ? await Ao(i.remoteStore) : "acknowledged" === n || "rejected" === n ? (du(i, t, r || null), lu(i, t), i.localStore.mutationQueue.On(t)) : P(), await yu(i, s)) : L("SyncEngine", "Cannot apply mutation batch with id: " + t)
                        }).bind(null, t),
                        ro: (async function (e, t, n, r) {
                            const i = e;
                            if (i.Qa) L("SyncEngine", "Ignoring unexpected query state notification.");
                            else {
                                var s = i.Ma.get(t);
                                if (s && 0 < s.length) switch (n) {
                                    case "current":
                                    case "not-current": {
                                        const e = await Ba(i.localStore, tr(s[0])),
                                            r = ei.createSynthesizedRemoteEventForCurrentChange(t, "current" === n, Et.EMPTY_BYTE_STRING);
                                        await yu(i, e, r);
                                        break
                                    }
                                    case "rejected":
                                        await Va(i.localStore, t, !0), fu(i, t, r);
                                        break;
                                    default:
                                        P()
                                }
                            }
                        }).bind(null, t),
                        io: (async function (e, t, n) {
                            const r = bu(e);
                            if (r.Qa) {
                                for (const e of t)
                                    if (r.Ma.has(e) && r.sharedClientState.isActiveQueryTarget(e)) L("SyncEngine", "Adding an already active target " + e);
                                    else {
                                        const t = await Ua(r.localStore, e),
                                            n = await Fa(r.localStore, t);
                                        await au(r, _u(t), n.targetId, !1, n.resumeToken), wo(r.remoteStore, n)
                                    } for (const e of n) r.Ma.has(e) && await Va(r.localStore, e, !1).then(() => {
                                    _o(r.remoteStore, e), fu(r, e)
                                }).catch(we)
                            }
                        }).bind(null, t),
                        Qi: (function (e) {
                            return e.localStore.persistence.Qi()
                        }).bind(null, t),
                        eo: (async function (e, t) {
                            const n = e;
                            return Ba(n.localStore, t).then(e => yu(n, e))
                        }).bind(null, t)
                    }, await this.sharedClientState.start()), await this.persistence.yi(async e => {
                        await vu(this.Ja.syncEngine, e), this.gcScheduler && (e && !this.gcScheduler.started ? this.gcScheduler.start() : e || this.gcScheduler.stop()), this.indexBackfillerScheduler && (e && !this.indexBackfillerScheduler.started ? this.indexBackfillerScheduler.start() : e || this.indexBackfillerScheduler.stop())
                    })
                }
                Wa(e) {
                    var t = ao();
                    if (!Ja.D(t)) throw new q(B.UNIMPLEMENTED, "IndexedDB persistence is only available on platforms that support LocalStorage.");
                    var n = xa(e.databaseInfo.databaseId, e.databaseInfo.persistenceKey);
                    return new Ja(t, e.asyncQueue, n, e.clientId, e.initialUser)
                }
            }
            class Du {
                async initialize(e, t) {
                    this.localStore || (this.localStore = e.localStore, this.sharedClientState = e.sharedClientState, this.datastore = this.createDatastore(t), this.remoteStore = this.createRemoteStore(t), this.eventManager = this.createEventManager(t), this.syncEngine = this.createSyncEngine(t, !e.synchronizeTabs), this.sharedClientState.onlineStateHandler = e => cu(this.syncEngine, e, 1), this.remoteStore.remoteSyncer.handleCredentialChange = (async function (e, t) {
                        const n = e;
                        if (!n.currentUser.isEqual(t)) {
                            L("SyncEngine", "User change. New user:", t.toKey());
                            const i = await Ra(n.localStore, t);
                            n.currentUser = t, e = n, r = "'waitForPendingWrites' promise is rejected due to a user change.", e.ka.forEach(e => {
                                e.forEach(e => {
                                    e.reject(new q(B.CANCELLED, r))
                                })
                            }), e.ka.clear(), n.sharedClientState.handleUserChange(t, i.removedBatchIds, i.addedBatchIds), await yu(n, i.hs)
                        }
                        var r
                    }).bind(null, this.syncEngine), await Lo(this.remoteStore, this.syncEngine.isPrimaryClient))
                }
                createEventManager(e) {
                    return new Ko
                }
                createDatastore(e) {
                    var t, n, r, i = uo(e.databaseInfo.databaseId),
                        s = (r = e.databaseInfo, new so(r));
                    return t = e.authCredentials, n = e.appCheckCredentials, r = s, e = i, new go(t, n, r, e)
                }
                createRemoteStore(e) {
                    return t = this.localStore, n = this.datastore, r = e.asyncQueue, i = e => cu(this.syncEngine, e, 0), e = new(Za.D() ? Za : Xa), new po(t, n, r, i, e);
                    var t, n, r, i
                }
                createSyncEngine(e, t) {
                    return function (e, t, n, r, i, s, a) {
                        const o = new iu(e, t, n, r, i, s);
                        return a && (o.Qa = !0), o
                    }(this.localStore, this.remoteStore, this.eventManager, this.sharedClientState, e.initialUser, e.maxConcurrentLimboResolutions, t)
                }
                async terminate() {
                    var e;
                    await async function (e) {
                        const t = e;
                        L("RemoteStore", "RemoteStore shutting down."), t.L_.add(5), await vo(t), t.k_.shutdown(), t.q_.set("Unknown")
                    }(this.remoteStore), null === (e = this.datastore) || void 0 === e || e.terminate(), null === (e = this.eventManager) || void 0 === e || e.terminate()
                }
            }

            function Cu(t, n = 10240) {
                let r = 0;
                return {
                    async read() {
                        if (r < t.byteLength) {
                            var e = {
                                value: t.slice(r, r + n),
                                done: !1
                            };
                            return r += n, e
                        }
                        return {
                            done: !0
                        }
                    },
                    async cancel() {},
                    releaseLock() {},
                    closed: Promise.resolve()
                }
            }
            Du.provider = {
                build: () => new Du
            };
            class Au {
                constructor(e) {
                    this.observer = e, this.muted = !1
                }
                next(e) {
                    this.muted || this.observer.next && this.Ya(this.observer.next, e)
                }
                error(e) {
                    this.muted || (this.observer.error ? this.Ya(this.observer.error, e) : M("Uncaught Error in snapshot listener:", e.toString()))
                }
                Za() {
                    this.muted = !0
                }
                Ya(e, t) {
                    setTimeout(() => {
                        this.muted || e(t)
                    }, 0)
                }
            }
            class Nu {
                constructor(e, t) {
                    this.Xa = e, this.serializer = t, this.metadata = new j, this.buffer = new Uint8Array, this.eu = new TextDecoder("utf-8"), this.tu().then(e => {
                        e && e.ua() ? this.metadata.resolve(e.aa.metadata) : this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is\n             ${JSON.stringify(null==e?void 0:e.aa)}`))
                    }, e => this.metadata.reject(e))
                }
                close() {
                    return this.Xa.cancel()
                }
                async getMetadata() {
                    return this.metadata.promise
                }
                async Ua() {
                    return await this.getMetadata(), this.tu()
                }
                async tu() {
                    var e = await this.nu();
                    if (null === e) return null;
                    var t = this.eu.decode(e),
                        n = Number(t);
                    isNaN(n) && this.ru(`length string (${t}) is not valid number`);
                    t = await this.iu(n);
                    return new Wo(JSON.parse(t), e.length + n)
                }
                su() {
                    return this.buffer.findIndex(e => e === "{".charCodeAt(0))
                }
                async nu() {
                    for (; this.su() < 0 && !await this.ou(););
                    if (0 === this.buffer.length) return null;
                    var e = this.su();
                    e < 0 && this.ru("Reached the end of bundle when a length string is expected.");
                    var t = this.buffer.slice(0, e);
                    return this.buffer = this.buffer.slice(e), t
                }
                async iu(e) {
                    for (; this.buffer.length < e;) await this.ou() && this.ru("Reached the end of bundle when more is expected.");
                    var t = this.eu.decode(this.buffer.slice(0, e));
                    return this.buffer = this.buffer.slice(e), t
                }
                ru(e) {
                    throw this.Xa.cancel(), new Error(`Invalid bundle format: ${e}`)
                }
                async ou() {
                    var e = await this.Xa.read();
                    if (!e.done) {
                        const t = new Uint8Array(this.buffer.length + e.value.length);
                        t.set(this.buffer), t.set(e.value, this.buffer.length), this.buffer = t
                    }
                    return e.done
                }
            }
            class ku {
                constructor(e) {
                    this.datastore = e, this.readVersions = new Map, this.mutations = [], this.committed = !1, this.lastTransactionError = null, this.writtenDocs = new Set
                }
                async lookup(e) {
                    if (this.ensureCommitNotCalled(), 0 < this.mutations.length) throw this.lastTransactionError = new q(B.INVALID_ARGUMENT, "Firestore transactions require all reads to be executed before all writes."), this.lastTransactionError;
                    const t = await async function (e, t) {
                        const r = e,
                            n = {
                                documents: t.map(e => _i(r.serializer, e))
                            },
                            i = await r.Lo("BatchGetDocuments", r.serializer.databaseId, ie.emptyPath(), n, t.length),
                            s = new Map;
                        i.forEach(e => {
                            const t = (n = r.serializer, "found" in (e = e) ? function (e, t) {
                                U(!!t.found), t.found.name, t.found.updateTime;
                                var n = bi(e, t.found.name),
                                    r = pi(t.found.updateTime),
                                    i = t.found.createTime ? pi(t.found.createTime) : ne.min(),
                                    s = new tn({
                                        mapValue: {
                                            fields: t.found.fields
                                        }
                                    });
                                return nn.newFoundDocument(n, r, i, s)
                            }(n, e) : "missing" in e ? function (e, t) {
                                U(!!t.missing), U(!!t.readTime);
                                var n = bi(e, t.missing),
                                    r = pi(t.readTime);
                                return nn.newNoDocument(n, r)
                            }(n, e) : P());
                            var n;
                            s.set(t.key.toString(), t)
                        });
                        const a = [];
                        return t.forEach(e => {
                            var t = s.get(e.toString());
                            U(!!t), a.push(t)
                        }), a
                    }(this.datastore, e);
                    return t.forEach(e => this.recordVersion(e)), t
                }
                set(e, t) {
                    this.write(t.toMutation(e, this.precondition(e))), this.writtenDocs.add(e.toString())
                }
                update(e, t) {
                    try {
                        this.write(t.toMutation(e, this.preconditionForUpdate(e)))
                    } catch (e) {
                        this.lastTransactionError = e
                    }
                    this.writtenDocs.add(e.toString())
                }
                delete(e) {
                    this.write(new Br(e, this.precondition(e))), this.writtenDocs.add(e.toString())
                }
                async commit() {
                    if (this.ensureCommitNotCalled(), this.lastTransactionError) throw this.lastTransactionError;
                    const t = this.readVersions;
                    this.mutations.forEach(e => {
                        t.delete(e.key.toString())
                    }), t.forEach((e, t) => {
                        var n = oe.fromPath(t);
                        this.mutations.push(new qr(n, this.precondition(n)))
                    }), await async function (e, t) {
                        const n = e,
                            r = {
                                writes: t.map(e => Ci(n.serializer, e))
                            };
                        await n.Mo("Commit", n.serializer.databaseId, ie.emptyPath(), r)
                    }(this.datastore, this.mutations), this.committed = !0
                }
                recordVersion(e) {
                    let t;
                    if (e.isFoundDocument()) t = e.version;
                    else {
                        if (!e.isNoDocument()) throw P();
                        t = ne.min()
                    }
                    var n = this.readVersions.get(e.key.toString());
                    if (n) {
                        if (!t.isEqual(n)) throw new q(B.ABORTED, "Document version changed between two reads.")
                    } else this.readVersions.set(e.key.toString(), t)
                }
                precondition(e) {
                    const t = this.readVersions.get(e.toString());
                    return !this.writtenDocs.has(e.toString()) && t ? t.isEqual(ne.min()) ? Cr.exists(!1) : Cr.updateTime(t) : Cr.none()
                }
                preconditionForUpdate(e) {
                    const t = this.readVersions.get(e.toString());
                    if (this.writtenDocs.has(e.toString()) || !t) return Cr.exists(!0);
                    if (t.isEqual(ne.min())) throw new q(B.INVALID_ARGUMENT, "Can't update a document that doesn't exist.");
                    return Cr.updateTime(t)
                }
                write(e) {
                    this.ensureCommitNotCalled(), this.mutations.push(e)
                }
                ensureCommitNotCalled() {}
            }
            class Ru {
                constructor(e, t, n, r, i) {
                    this.asyncQueue = e, this.datastore = t, this.options = n, this.updateFunction = r, this.deferred = i, this._u = n.maxAttempts, this.t_ = new co(this.asyncQueue, "transaction_retry")
                }
                au() {
                    --this._u, this.uu()
                }
                uu() {
                    this.t_.Go(async () => {
                        const t = new ku(this.datastore),
                            e = this.cu(t);
                        e && e.then(e => {
                            this.asyncQueue.enqueueAndForget(() => t.commit().then(() => {
                                this.deferred.resolve(e)
                            }).catch(e => {
                                this.lu(e)
                            }))
                        }).catch(e => {
                            this.lu(e)
                        })
                    })
                }
                cu(e) {
                    try {
                        var t = this.updateFunction(e);
                        return !Le(t) && t.catch && t.then ? t : (this.deferred.reject(Error("Transaction callback must return a Promise")), null)
                    } catch (e) {
                        return this.deferred.reject(e), null
                    }
                }
                lu(e) {
                    0 < this._u && this.hu(e) ? (--this._u, this.asyncQueue.enqueueAndForget(() => (this.uu(), Promise.resolve()))) : this.deferred.reject(e)
                }
                hu(e) {
                    if ("FirebaseError" !== e.name) return !1;
                    var t = e.code;
                    return "aborted" === t || "failed-precondition" === t || "already-exists" === t || !$r(t)
                }
            }
            class Ou {
                constructor(e, t, n, r, i) {
                    this.authCredentials = e, this.appCheckCredentials = t, this.asyncQueue = n, this.databaseInfo = r, this.user = N.UNAUTHENTICATED, this.clientId = Y.newId(), this.authCredentialListener = () => Promise.resolve(), this.appCheckCredentialListener = () => Promise.resolve(), this._uninitializedComponentsProvider = i, this.authCredentials.start(n, async e => {
                        L("FirestoreClient", "Received user=", e.uid), await this.authCredentialListener(e), this.user = e
                    }), this.appCheckCredentials.start(n, e => (L("FirestoreClient", "Received new app check token=", e), this.appCheckCredentialListener(e, this.user)))
                }
                get configuration() {
                    return {
                        asyncQueue: this.asyncQueue,
                        databaseInfo: this.databaseInfo,
                        clientId: this.clientId,
                        authCredentials: this.authCredentials,
                        appCheckCredentials: this.appCheckCredentials,
                        initialUser: this.user,
                        maxConcurrentLimboResolutions: 100
                    }
                }
                setCredentialChangeListener(e) {
                    this.authCredentialListener = e
                }
                setAppCheckTokenChangeListener(e) {
                    this.appCheckCredentialListener = e
                }
                terminate() {
                    this.asyncQueue.enterRestrictedMode();
                    const n = new j;
                    return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async () => {
                        try {
                            this._onlineComponents && await this._onlineComponents.terminate(), this._offlineComponents && await this._offlineComponents.terminate(), this.authCredentials.shutdown(), this.appCheckCredentials.shutdown(), n.resolve()
                        } catch (e) {
                            var t = Po(e, "Failed to shutdown persistence");
                            n.reject(t)
                        }
                    }), n.promise
                }
            }
            async function Lu(e, t) {
                e.asyncQueue.verifyOperationInProgress(), L("FirestoreClient", "Initializing OfflineComponentProvider");
                var n = e.configuration;
                await t.initialize(n);
                let r = n.initialUser;
                e.setCredentialChangeListener(async e => {
                    r.isEqual(e) || (await Ra(t.localStore, e), r = e)
                }), t.persistence.setDatabaseDeletedListener(() => e.terminate()), e._offlineComponents = t
            }
            async function Mu(e, n) {
                e.asyncQueue.verifyOperationInProgress();
                var t = await Fu(e);
                L("FirestoreClient", "Initializing OnlineComponentProvider"), await n.initialize(t, e.configuration), e.setCredentialChangeListener(e => Oo(n.remoteStore, e)), e.setAppCheckTokenChangeListener((e, t) => Oo(n.remoteStore, t)), e._onlineComponents = n
            }
            async function Fu(t) {
                if (!t._offlineComponents)
                    if (t._uninitializedComponentsProvider) {
                        L("FirestoreClient", "Using user provided OfflineComponentProvider");
                        try {
                            await Lu(t, t._uninitializedComponentsProvider._offline)
                        } catch (e) {
                            var n = e;
                            if (!("FirebaseError" === (r = n).name ? r.code === B.FAILED_PRECONDITION || r.code === B.UNIMPLEMENTED : !("undefined" != typeof DOMException && r instanceof DOMException) || 22 === r.code || 20 === r.code || 11 === r.code)) throw n;
                            F("Error using user provided cache. Falling back to memory cache: " + n), await Lu(t, new Tu)
                        }
                    } else L("FirestoreClient", "Using default OfflineComponentProvider"), await Lu(t, new Eu(void 0));
                var r;
                return t._offlineComponents
            }
            async function Vu(e) {
                return e._onlineComponents || (e._uninitializedComponentsProvider ? (L("FirestoreClient", "Using user provided OnlineComponentProvider"), await Mu(e, e._uninitializedComponentsProvider._online)) : (L("FirestoreClient", "Using default OnlineComponentProvider"), await Mu(e, new Du))), e._onlineComponents
            }

            function Pu(e) {
                return Fu(e).then(e => e.persistence)
            }

            function Uu(e) {
                return Fu(e).then(e => e.localStore)
            }

            function Bu(e) {
                return Vu(e).then(e => e.remoteStore)
            }

            function qu(e) {
                return Vu(e).then(e => e.syncEngine)
            }
            async function ju(e) {
                const t = await Vu(e),
                    n = t.eventManager;
                return n.onListen = (async function (e, t, n = !0) {
                    const r = bu(e);
                    let i;
                    const s = r.Fa.get(t);
                    return i = s ? (r.sharedClientState.addLocalQueryTarget(s.targetId), s.view.Da()) : await su(r, t, n, !0), i
                }).bind(null, t.syncEngine), n.onUnlisten = (async function (e, t, n) {
                    const r = e,
                        i = r.Fa.get(t),
                        s = r.Ma.get(i.targetId);
                    if (1 < s.length) return r.Ma.set(i.targetId, s.filter(e => !Yn(e, t))), void r.Fa.delete(t);
                    r.isPrimaryClient ? (r.sharedClientState.removeLocalQueryTarget(i.targetId), r.sharedClientState.isActiveQueryTarget(i.targetId) || await Va(r.localStore, i.targetId, !1).then(() => {
                        r.sharedClientState.clearQueryState(i.targetId), n && _o(r.remoteStore, i.targetId), fu(r, i.targetId)
                    }).catch(we)) : (fu(r, i.targetId), await Va(r.localStore, i.targetId, !0))
                }).bind(null, t.syncEngine), n.onFirstRemoteStoreListen = (async function (e, t) {
                    await su(bu(e), t, !0, !1)
                }).bind(null, t.syncEngine), n.onLastRemoteStoreUnlisten = (async function (e, t) {
                    const n = e,
                        r = n.Fa.get(t),
                        i = n.Ma.get(r.targetId);
                    n.isPrimaryClient && 1 === i.length && (n.sharedClientState.removeLocalQueryTarget(r.targetId), _o(n.remoteStore, r.targetId))
                }).bind(null, t.syncEngine), n
            }

            function Ku(e, t, n = {}) {
                const r = new j;
                return e.asyncQueue.enqueueAndForget(async () => function (n, r, i, s, a) {
                    const o = new Au({
                            next: e => {
                                o.Za(), r.enqueueAndForget(() => $o(n, u));
                                var t = e.docs.has(i);
                                !t && e.fromCache ? a.reject(new q(B.UNAVAILABLE, "Failed to get document because the client is offline.")) : t && e.fromCache && s && "server" === s.source ? a.reject(new q(B.UNAVAILABLE, 'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')) : a.resolve(e)
                            },
                            error: e => a.reject(e)
                        }),
                        u = new Ho(Gn(i.path), o, {
                            includeMetadataChanges: !0,
                            _a: !0
                        });
                    return zo(n, u)
                }(await ju(e), e.asyncQueue, t, n, r)), r.promise
            }

            function Gu(e, t, n = {}) {
                const r = new j;
                return e.asyncQueue.enqueueAndForget(async () => function (t, n, e, r, i) {
                    const s = new Au({
                            next: e => {
                                s.Za(), n.enqueueAndForget(() => $o(t, a)), e.fromCache && "server" === r.source ? i.reject(new q(B.UNAVAILABLE, 'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')) : i.resolve(e)
                            },
                            error: e => i.reject(e)
                        }),
                        a = new Ho(e, s, {
                            includeMetadataChanges: !0,
                            _a: !0
                        });
                    return zo(t, a)
                }(await ju(e), e.asyncQueue, t, n, r)), r.promise
            }

            function zu(e, t, n, r) {
                const i = (n = n, t = uo(t), s = "string" == typeof n ? Hr().encode(n) : n, n = function (e, t) {
                    if (e instanceof Uint8Array) return Cu(e, t);
                    if (e instanceof ArrayBuffer) return Cu(new Uint8Array(e), t);
                    if (e instanceof ReadableStream) return e.getReader();
                    throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")
                }(s), t = t, new Nu(n, t));
                var s;
                e.asyncQueue.enqueueAndForget(async () => {
                    ! function (e, t, n) {
                        const r = e;
                        !async function (t, n, r) {
                            try {
                                var i = await n.getMetadata();
                                if (await
                                    function (e, t) {
                                        const n = e,
                                            r = pi(t.createTime);
                                        return n.persistence.runTransaction("hasNewerBundle", "readonly", e => n.Gr.getBundleMetadata(e, t.id)).then(e => !!e && 0 <= e.createTime.compareTo(r))
                                    }(t.localStore, i)) return await n.close(), r._completeWith({
                                    taskState: "Success",
                                    documentsLoaded: i.totalDocuments,
                                    bytesLoaded: i.totalBytes,
                                    totalDocuments: i.totalDocuments,
                                    totalBytes: i.totalBytes
                                }), Promise.resolve(new Set);
                                r._updateProgress(Xo(i));
                                const a = new Yo(i, t.localStore, n.serializer);
                                let e = await n.Ua();
                                for (; e;) {
                                    const t = await a.la(e);
                                    t && r._updateProgress(t), e = await n.Ua()
                                }
                                var s = await a.complete();
                                return await yu(t, s.Ia, void 0), await
                                function (e, t) {
                                    const n = e;
                                    return n.persistence.runTransaction("Save bundle", "readwrite", e => n.Gr.saveBundleMetadata(e, t))
                                }(t.localStore, i), r._completeWith(s.progress), Promise.resolve(s.Pa)
                            } catch (t) {
                                return F("SyncEngine", `Loading bundle failed with ${t}`), r._failWith(t), Promise.resolve(new Set)
                            }
                        }(r, t, n).then(e => {
                            r.sharedClientState.notifyBundleLoaded(e)
                        })
                    }(await qu(e), i, r)
                })
            }

            function $u(e) {
                const t = {};
                return void 0 !== e.timeoutSeconds && (t.timeoutSeconds = e.timeoutSeconds), t
            }
            const Qu = new Map;

            function Hu(e, t, n) {
                if (!n) throw new q(B.INVALID_ARGUMENT, `Function ${e}() cannot be called with an empty ${t}.`)
            }

            function Wu(e, t, n, r) {
                if (!0 === t && !0 === r) throw new q(B.INVALID_ARGUMENT, `${e} and ${n} cannot be used together.`)
            }

            function Ju(e) {
                if (!oe.isDocumentKey(e)) throw new q(B.INVALID_ARGUMENT, `Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)
            }

            function Yu(e) {
                if (oe.isDocumentKey(e)) throw new q(B.INVALID_ARGUMENT, `Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)
            }

            function Xu(e) {
                if (void 0 === e) return "undefined";
                if (null === e) return "null";
                if ("string" == typeof e) return 20 < e.length && (e = `${e.substring(0,20)}...`), JSON.stringify(e);
                if ("number" == typeof e || "boolean" == typeof e) return "" + e;
                if ("object" != typeof e) return "function" == typeof e ? "a function" : P();
                if (e instanceof Array) return "an array";
                var t = (e = e).constructor ? e.constructor.name : null;
                return t ? `a custom ${t} object` : "an object"
            }

            function Zu(e, t) {
                if ((e = "_delegate" in e ? e._delegate : e) instanceof t) return e;
                if (t.name === e.constructor.name) throw new q(B.INVALID_ARGUMENT, "Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");
                var n = Xu(e);
                throw new q(B.INVALID_ARGUMENT, `Expected type '${t.name}', but it was: ${n}`)
            }

            function ec(e, t) {
                if (t <= 0) throw new q(B.INVALID_ARGUMENT, `Function ${e}() requires a positive number, but it was: ${t}.`)
            }
            class tc {
                constructor(e) {
                    var t;
                    if (void 0 === e.host) {
                        if (void 0 !== e.ssl) throw new q(B.INVALID_ARGUMENT, "Can't provide ssl option if host option is not set");
                        this.host = "firestore.googleapis.com", this.ssl = !0
                    } else this.host = e.host, this.ssl = null === (t = e.ssl) || void 0 === t || t;
                    if (this.credentials = e.credentials, this.ignoreUndefinedProperties = !!e.ignoreUndefinedProperties, this.localCache = e.localCache, void 0 === e.cacheSizeBytes) this.cacheSizeBytes = 41943040;
                    else {
                        if (-1 !== e.cacheSizeBytes && e.cacheSizeBytes < 1048576) throw new q(B.INVALID_ARGUMENT, "cacheSizeBytes must be at least 1048576");
                        this.cacheSizeBytes = e.cacheSizeBytes
                    }
                    Wu("experimentalForceLongPolling", e.experimentalForceLongPolling, "experimentalAutoDetectLongPolling", e.experimentalAutoDetectLongPolling), this.experimentalForceLongPolling = !!e.experimentalForceLongPolling, this.experimentalForceLongPolling ? this.experimentalAutoDetectLongPolling = !1 : void 0 === e.experimentalAutoDetectLongPolling ? this.experimentalAutoDetectLongPolling = !0 : this.experimentalAutoDetectLongPolling = !!e.experimentalAutoDetectLongPolling, this.experimentalLongPollingOptions = $u(null !== (t = e.experimentalLongPollingOptions) && void 0 !== t ? t : {}),
                        function (e) {
                            if (void 0 !== e.timeoutSeconds) {
                                if (isNaN(e.timeoutSeconds)) throw new q(B.INVALID_ARGUMENT, `invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`);
                                if (e.timeoutSeconds < 5) throw new q(B.INVALID_ARGUMENT, `invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`);
                                if (30 < e.timeoutSeconds) throw new q(B.INVALID_ARGUMENT, `invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`)
                            }
                        }(this.experimentalLongPollingOptions), this.useFetchStreams = !!e.useFetchStreams
                }
                isEqual(e) {
                    return this.host === e.host && this.ssl === e.ssl && this.credentials === e.credentials && this.cacheSizeBytes === e.cacheSizeBytes && this.experimentalForceLongPolling === e.experimentalForceLongPolling && this.experimentalAutoDetectLongPolling === e.experimentalAutoDetectLongPolling && (t = this.experimentalLongPollingOptions, n = e.experimentalLongPollingOptions, t.timeoutSeconds === n.timeoutSeconds) && this.ignoreUndefinedProperties === e.ignoreUndefinedProperties && this.useFetchStreams === e.useFetchStreams;
                    var t, n
                }
            }
            class nc {
                constructor(e, t, n, r) {
                    this._authCredentials = e, this._appCheckCredentials = t, this._databaseId = n, this._app = r, this.type = "firestore-lite", this._persistenceKey = "(lite)", this._settings = new tc({}), this._settingsFrozen = !1, this._terminateTask = "notTerminated"
                }
                get app() {
                    if (!this._app) throw new q(B.FAILED_PRECONDITION, "Firestore was not initialized using the Firebase SDK. 'app' is not available");
                    return this._app
                }
                get _initialized() {
                    return this._settingsFrozen
                }
                get _terminated() {
                    return "notTerminated" !== this._terminateTask
                }
                _setSettings(e) {
                    if (this._settingsFrozen) throw new q(B.FAILED_PRECONDITION, "Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");
                    this._settings = new tc(e), void 0 !== e.credentials && (this._authCredentials = function (e) {
                        if (!e) return new G;
                        switch (e.type) {
                            case "firstParty":
                                return new H(e.sessionIndex || "0", e.iamToken || null, e.authTokenFactory || null);
                            case "provider":
                                return e.client;
                            default:
                                throw new q(B.INVALID_ARGUMENT, "makeAuthCredentialsProvider failed due to invalid credential type")
                        }
                    }(e.credentials))
                }
                _getSettings() {
                    return this._settings
                }
                _freezeSettings() {
                    return this._settingsFrozen = !0, this._settings
                }
                _delete() {
                    return "notTerminated" === this._terminateTask && (this._terminateTask = this._terminate()), this._terminateTask
                }
                async _restart() {
                    "notTerminated" === this._terminateTask ? await this._terminate() : this._terminateTask = "notTerminated"
                }
                toJSON() {
                    return {
                        app: this._app,
                        databaseId: this._databaseId,
                        settings: this._settings
                    }
                }
                _terminate() {
                    return function (e) {
                        const t = Qu.get(e);
                        t && (L("ComponentProvider", "Removing Datastore"), Qu.delete(e), t.terminate())
                    }(this), Promise.resolve()
                }
            }

            function rc(n, e, t, r = {}) {
                var i;
                const s = (n = Zu(n, nc))._getSettings(),
                    a = `${e}:${t}`;
                if ("firestore.googleapis.com" !== s.host && s.host !== a && F("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."), n._setSettings(Object.assign(Object.assign({}, s), {
                        host: a,
                        ssl: !1
                    })), r.mockUserToken) {
                    let e, t;
                    if ("string" == typeof r.mockUserToken) e = r.mockUserToken, t = N.MOCK_USER;
                    else {
                        e = function (e, t) {
                            if (e.uid) throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');
                            var n = t || "demo-project",
                                r = e.iat || 0,
                                i = e.sub || e.user_id;
                            if (!i) throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");
                            return i = Object.assign({
                                iss: `https://securetoken.google.com/${n}`,
                                aud: n,
                                iat: r,
                                exp: r + 3600,
                                auth_time: r,
                                sub: i,
                                user_id: i,
                                firebase: {
                                    sign_in_provider: "custom",
                                    identities: {}
                                }
                            }, e), [o(JSON.stringify({
                                alg: "none",
                                type: "JWT"
                            })), o(JSON.stringify(i)), ""].join(".")
                        }(r.mockUserToken, null === (i = n._app) || void 0 === i ? void 0 : i.options.projectId);
                        const s = r.mockUserToken.sub || r.mockUserToken.user_id;
                        if (!s) throw new q(B.INVALID_ARGUMENT, "mockUserToken must contain 'sub' or 'user_id' field!");
                        t = new N(s)
                    }
                    n._authCredentials = new z(new K(e, t))
                }
            }
            class ic {
                constructor(e, t, n) {
                    this.converter = t, this._query = n, this.type = "query", this.firestore = e
                }
                withConverter(e) {
                    return new ic(this.firestore, e, this._query)
                }
            }
            class sc {
                constructor(e, t, n) {
                    this.converter = t, this._key = n, this.type = "document", this.firestore = e
                }
                get _path() {
                    return this._key.path
                }
                get id() {
                    return this._key.path.lastSegment()
                }
                get path() {
                    return this._key.path.canonicalString()
                }
                get parent() {
                    return new ac(this.firestore, this.converter, this._key.path.popLast())
                }
                withConverter(e) {
                    return new sc(this.firestore, e, this._key)
                }
            }
            class ac extends ic {
                constructor(e, t, n) {
                    super(e, t, Gn(n)), this._path = n, this.type = "collection"
                }
                get id() {
                    return this._query.path.lastSegment()
                }
                get path() {
                    return this._query.path.canonicalString()
                }
                get parent() {
                    const e = this._path.popLast();
                    return e.isEmpty() ? null : new sc(this.firestore, null, new oe(e))
                }
                withConverter(e) {
                    return new ac(this.firestore, e, this._path)
                }
            }

            function oc(e, t, ...n) {
                if (e = y(e), Hu("collection", "path", t), e instanceof nc) {
                    var r = ie.fromString(t, ...n);
                    return Yu(r), new ac(e, null, r)
                }
                if (!(e instanceof sc || e instanceof ac)) throw new q(B.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
                r = e._path.child(ie.fromString(t, ...n));
                return Yu(r), new ac(e.firestore, null, r)
            }

            function uc(e, t, ...n) {
                if (e = y(e), Hu("doc", "path", t = 1 === arguments.length ? Y.newId() : t), e instanceof nc) {
                    var r = ie.fromString(t, ...n);
                    return Ju(r), new sc(e, null, new oe(r))
                }
                if (!(e instanceof sc || e instanceof ac)) throw new q(B.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
                r = e._path.child(ie.fromString(t, ...n));
                return Ju(r), new sc(e.firestore, e instanceof ac ? e.converter : null, new oe(r))
            }

            function cc(e, t) {
                return e = y(e), t = y(t), (e instanceof sc || e instanceof ac) && (t instanceof sc || t instanceof ac) && e.firestore === t.firestore && e.path === t.path && e.converter === t.converter
            }

            function hc(e, t) {
                return e = y(e), t = y(t), e instanceof ic && t instanceof ic && e.firestore === t.firestore && Yn(e._query, t._query) && e.converter === t.converter
            }
            class lc {
                constructor(e = Promise.resolve()) {
                    this.Pu = [], this.Iu = !1, this.Tu = [], this.Eu = null, this.du = !1, this.Au = !1, this.Ru = [], this.t_ = new co(this, "async_queue_retry"), this.Vu = () => {
                        var e = oo();
                        e && L("AsyncQueue", "Visibility state changed to " + e.visibilityState), this.t_.jo()
                    }, this.mu = e;
                    const t = oo();
                    t && "function" == typeof t.addEventListener && t.addEventListener("visibilitychange", this.Vu)
                }
                get isShuttingDown() {
                    return this.Iu
                }
                enqueueAndForget(e) {
                    this.enqueue(e)
                }
                enqueueAndForgetEvenWhileRestricted(e) {
                    this.fu(), this.gu(e)
                }
                enterRestrictedMode(e) {
                    if (!this.Iu) {
                        this.Iu = !0, this.Au = e || !1;
                        const t = oo();
                        t && "function" == typeof t.removeEventListener && t.removeEventListener("visibilitychange", this.Vu)
                    }
                }
                enqueue(e) {
                    if (this.fu(), this.Iu) return new Promise(() => {});
                    const t = new j;
                    return this.gu(() => this.Iu && this.Au ? Promise.resolve() : (e().then(t.resolve, t.reject), t.promise)).then(() => t.promise)
                }
                enqueueRetryable(e) {
                    this.enqueueAndForget(() => (this.Pu.push(e), this.pu()))
                }
                async pu() {
                    if (0 !== this.Pu.length) {
                        try {
                            await this.Pu[0](), this.Pu.shift(), this.t_.reset()
                        } catch (e) {
                            if (!xe(e)) throw e;
                            L("AsyncQueue", "Operation failed with retryable error: " + e)
                        }
                        0 < this.Pu.length && this.t_.Go(() => this.pu())
                    }
                }
                gu(e) {
                    var t = this.mu.then(() => (this.du = !0, e().catch(e => {
                        throw this.Eu = e, this.du = !1, M("INTERNAL UNHANDLED ERROR: ", function (e) {
                            let t = e.message || "";
                            return e.stack && (t = e.stack.includes(e.message) ? e.stack : e.message + "\n" + e.stack), t
                        }(e)), e
                    }).then(e => (this.du = !1, e))));
                    return this.mu = t
                }
                enqueueAfterDelay(e, t, n) {
                    this.fu(), -1 < this.Ru.indexOf(e) && (t = 0);
                    var r = Vo.createAndSchedule(this, e, t, n, e => this.yu(e));
                    return this.Tu.push(r), r
                }
                fu() {
                    this.Eu && P()
                }
                verifyOperationInProgress() {}
                async wu() {
                    for (var e; await (e = this.mu), e !== this.mu;);
                }
                Su(e) {
                    for (const t of this.Tu)
                        if (t.timerId === e) return !0;
                    return !1
                }
                bu(t) {
                    return this.wu().then(() => {
                        this.Tu.sort((e, t) => e.targetTimeMs - t.targetTimeMs);
                        for (const e of this.Tu)
                            if (e.skipDelay(), "all" !== t && e.timerId === t) break;
                        return this.wu()
                    })
                }
                Du(e) {
                    this.Ru.push(e)
                }
                yu(e) {
                    var t = this.Tu.indexOf(e);
                    this.Tu.splice(t, 1)
                }
            }

            function dc(e) {
                return function (e, t) {
                    if ("object" == typeof e && null !== e) {
                        var n = e;
                        for (const e of t)
                            if (e in n && "function" == typeof n[e]) return 1
                    }
                }(e, ["next", "error", "complete"])
            }
            class fc {
                constructor() {
                    this._progressObserver = {}, this._taskCompletionResolver = new j, this._lastProgress = {
                        taskState: "Running",
                        totalBytes: 0,
                        totalDocuments: 0,
                        bytesLoaded: 0,
                        documentsLoaded: 0
                    }
                }
                onProgress(e, t, n) {
                    this._progressObserver = {
                        next: e,
                        error: t,
                        complete: n
                    }
                } catch (e) {
                    return this._taskCompletionResolver.promise.catch(e)
                }
                then(e, t) {
                    return this._taskCompletionResolver.promise.then(e, t)
                }
                _completeWith(e) {
                    this._updateProgress(e), this._progressObserver.complete && this._progressObserver.complete(), this._taskCompletionResolver.resolve(e)
                }
                _failWith(e) {
                    this._lastProgress.taskState = "Error", this._progressObserver.next && this._progressObserver.next(this._lastProgress), this._progressObserver.error && this._progressObserver.error(e), this._taskCompletionResolver.reject(e)
                }
                _updateProgress(e) {
                    this._lastProgress = e, this._progressObserver.next && this._progressObserver.next(e)
                }
            }
            var gc, mc, pc, yc, vc;
            class wc extends nc {
                constructor(e, t, n, r) {
                    super(e, t, n, r), this.type = "firestore", this._queue = new lc, this._persistenceKey = (null == r ? void 0 : r.name) || "[DEFAULT]"
                }
                async _terminate() {
                    var e;
                    this._firestoreClient && (e = this._firestoreClient.terminate(), this._queue = new lc(e), this._firestoreClient = void 0, await e)
                }
            }

            function _c(e) {
                if (e._terminated) throw new q(B.FAILED_PRECONDITION, "The client has already been terminated.");
                return e._firestoreClient || bc(e), e._firestoreClient
            }

            function bc(e) {
                var t, n, r, i, s, a, o = e._freezeSettings(),
                    u = (r = e._databaseId, i = (null === (t = e._app) || void 0 === t ? void 0 : t.options.appId) || "", s = e._persistenceKey, a = o, new Rt(r, i, s, a.host, a.ssl, a.experimentalForceLongPolling, a.experimentalAutoDetectLongPolling, $u(a.experimentalLongPollingOptions), a.useFetchStreams));
                e._componentsProvider || null !== (t = o.localCache) && void 0 !== t && t._offlineComponentProvider && null !== (n = o.localCache) && void 0 !== n && n._onlineComponentProvider && (e._componentsProvider = {
                    _offline: o.localCache._offlineComponentProvider,
                    _online: o.localCache._onlineComponentProvider
                }), e._firestoreClient = new Ou(e._authCredentials, e._appCheckCredentials, e._queue, u, e._componentsProvider && (e = e._componentsProvider, u = null == e ? void 0 : e._online.build(), {
                    _offline: null == e ? void 0 : e._offline.build(u),
                    _online: u
                }))
            }

            function Ic(e, t, n) {
                if ((e = Zu(e, wc))._firestoreClient || e._terminated) throw new q(B.FAILED_PRECONDITION, "Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");
                if (e._componentsProvider || e._getSettings().localCache) throw new q(B.FAILED_PRECONDITION, "SDK cache is already specified.");
                e._componentsProvider = {
                    _online: t,
                    _offline: n
                }, bc(e)
            }

            function Tc(e) {
                return function (e) {
                    const t = new j;
                    return e.asyncQueue.enqueueAndForget(async () => async function (e, t) {
                        const n = e;
                        So(n.remoteStore) || L("SyncEngine", "The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");
                        try {
                            const e = await
                            function (e) {
                                const t = e;
                                return t.persistence.runTransaction("Get highest unacknowledged batch id", "readonly", e => t.mutationQueue.getHighestUnacknowledgedBatchId(e))
                            }(n.localStore);
                            if (-1 === e) return void t.resolve();
                            const r = n.ka.get(e) || [];
                            r.push(t), n.ka.set(e, r)
                        } catch (e) {
                            const n = Po(e, "Initialization of waitForPendingWrites() operation failed");
                            t.reject(n)
                        }
                    }(await qu(e), t)), t.promise
                }(_c(e = Zu(e, wc)))
            }

            function Ec(e) {
                return (n = _c(e = Zu(e, wc))).asyncQueue.enqueue(async () => {
                    const e = await Pu(n),
                        t = await Bu(n);
                    return e.setNetworkEnabled(!0),
                        function (e) {
                            const t = e;
                            return t.L_.delete(0), yo(t)
                        }(t)
                });
                var n
            }

            function Sc(e) {
                return (n = _c(e = Zu(e, wc))).asyncQueue.enqueue(async () => {
                    const e = await Pu(n),
                        t = await Bu(n);
                    return e.setNetworkEnabled(!1), async function (e) {
                        const t = e;
                        t.L_.add(0), await vo(t), t.q_.set("Offline")
                    }(t)
                });
                var n
            }

            function xc(t, e) {
                return n = _c(t = Zu(t, wc)), r = e, n.asyncQueue.enqueue(async () => function (e, t) {
                    const n = e;
                    return n.persistence.runTransaction("Get named query", "readonly", e => n.Gr.getNamedQuery(e, t))
                }(await Uu(n), r)).then(e => e ? new ic(t, null, e.query) : null);
                var n, r
            }
            class Dc {
                constructor(e) {
                    this._byteString = e
                }
                static fromBase64String(e) {
                    try {
                        return new Dc(Et.fromBase64String(e))
                    } catch (e) {
                        throw new q(B.INVALID_ARGUMENT, "Failed to construct data from Base64 string: " + e)
                    }
                }
                static fromUint8Array(e) {
                    return new Dc(Et.fromUint8Array(e))
                }
                toBase64() {
                    return this._byteString.toBase64()
                }
                toUint8Array() {
                    return this._byteString.toUint8Array()
                }
                toString() {
                    return "Bytes(base64: " + this.toBase64() + ")"
                }
                isEqual(e) {
                    return this._byteString.isEqual(e._byteString)
                }
            }
            class Cc {
                constructor(...e) {
                    for (let t = 0; t < e.length; ++t)
                        if (0 === e[t].length) throw new q(B.INVALID_ARGUMENT, "Invalid field name at argument $(i + 1). Field names must not be empty.");
                    this._internalPath = new ae(e)
                }
                isEqual(e) {
                    return this._internalPath.isEqual(e._internalPath)
                }
            }
            class Ac {
                constructor(e) {
                    this._methodName = e
                }
            }
            class Nc {
                constructor(e, t) {
                    if (!isFinite(e) || e < -90 || 90 < e) throw new q(B.INVALID_ARGUMENT, "Latitude must be a number between -90 and 90, but was: " + e);
                    if (!isFinite(t) || t < -180 || 180 < t) throw new q(B.INVALID_ARGUMENT, "Longitude must be a number between -180 and 180, but was: " + t);
                    this._lat = e, this._long = t
                }
                get latitude() {
                    return this._lat
                }
                get longitude() {
                    return this._long
                }
                isEqual(e) {
                    return this._lat === e._lat && this._long === e._long
                }
                toJSON() {
                    return {
                        latitude: this._lat,
                        longitude: this._long
                    }
                }
                _compareTo(e) {
                    return X(this._lat, e._lat) || X(this._long, e._long)
                }
            }
            class kc {
                constructor(e) {
                    this._values = (e || []).map(e => e)
                }
                toArray() {
                    return this._values.map(e => e)
                }
                isEqual(e) {
                    return function (e, t) {
                        if (e.length !== t.length) return !1;
                        for (let n = 0; n < e.length; ++n)
                            if (e[n] !== t[n]) return !1;
                        return !0
                    }(this._values, e._values)
                }
            }
            const Rc = /^__.*__$/;
            class Oc {
                constructor(e, t, n) {
                    this.data = e, this.fieldMask = t, this.fieldTransforms = n
                }
                toMutation(e, t) {
                    return null !== this.fieldMask ? new Fr(e, this.data, this.fieldMask, t, this.fieldTransforms) : new Mr(e, this.data, t, this.fieldTransforms)
                }
            }
            class Lc {
                constructor(e, t, n) {
                    this.data = e, this.fieldMask = t, this.fieldTransforms = n
                }
                toMutation(e, t) {
                    return new Fr(e, this.data, this.fieldMask, t, this.fieldTransforms)
                }
            }

            function Mc(e) {
                switch (e) {
                    case 0:
                    case 2:
                    case 1:
                        return 1;
                    case 3:
                    case 4:
                        return;
                    default:
                        throw P()
                }
            }
            class Fc {
                constructor(e, t, n, r, i, s) {
                    this.settings = e, this.databaseId = t, this.serializer = n, this.ignoreUndefinedProperties = r, void 0 === i && this.vu(), this.fieldTransforms = i || [], this.fieldMask = s || []
                }
                get path() {
                    return this.settings.path
                }
                get Cu() {
                    return this.settings.Cu
                }
                Fu(e) {
                    return new Fc(Object.assign(Object.assign({}, this.settings), e), this.databaseId, this.serializer, this.ignoreUndefinedProperties, this.fieldTransforms, this.fieldMask)
                }
                Mu(e) {
                    var t;
                    const n = null === (t = this.path) || void 0 === t ? void 0 : t.child(e),
                        r = this.Fu({
                            path: n,
                            xu: !1
                        });
                    return r.Ou(e), r
                }
                Nu(e) {
                    var t;
                    const n = null === (t = this.path) || void 0 === t ? void 0 : t.child(e),
                        r = this.Fu({
                            path: n,
                            xu: !1
                        });
                    return r.vu(), r
                }
                Lu(e) {
                    return this.Fu({
                        path: void 0,
                        xu: !0
                    })
                }
                Bu(e) {
                    return nh(e, this.settings.methodName, this.settings.ku || !1, this.path, this.settings.qu)
                }
                contains(t) {
                    return void 0 !== this.fieldMask.find(e => t.isPrefixOf(e)) || void 0 !== this.fieldTransforms.find(e => t.isPrefixOf(e.field))
                }
                vu() {
                    if (this.path)
                        for (let e = 0; e < this.path.length; e++) this.Ou(this.path.get(e))
                }
                Ou(e) {
                    if (0 === e.length) throw this.Bu("Document fields must not be empty");
                    if (Mc(this.Cu) && Rc.test(e)) throw this.Bu('Document fields cannot begin and end with "__"')
                }
            }
            class Vc {
                constructor(e, t, n) {
                    this.databaseId = e, this.ignoreUndefinedProperties = t, this.serializer = n || uo(e)
                }
                Qu(e, t, n, r = !1) {
                    return new Fc({
                        Cu: e,
                        methodName: t,
                        qu: n,
                        path: ae.emptyPath(),
                        xu: !1,
                        ku: r
                    }, this.databaseId, this.serializer, this.ignoreUndefinedProperties)
                }
            }

            function Pc(e) {
                var t = e._freezeSettings(),
                    n = uo(e._databaseId);
                return new Vc(e._databaseId, !!t.ignoreUndefinedProperties, n)
            }

            function Uc(e, t, n, r, i, s = {}) {
                const a = e.Qu(s.merge || s.mergeFields ? 2 : 0, t, n, i);
                Xc("Data must be an object, but it was:", a, r);
                var o = Jc(r, a);
                let u, c;
                if (s.merge) u = new It(a.fieldMask), c = a.fieldTransforms;
                else if (s.mergeFields) {
                    const e = [];
                    for (const r of s.mergeFields) {
                        const i = Zc(t, r, n);
                        if (!a.contains(i)) throw new q(B.INVALID_ARGUMENT, `Field '${i}' is specified in your field mask but missing from your input data.`);
                        rh(e, i) || e.push(i)
                    }
                    u = new It(e), c = a.fieldTransforms.filter(e => u.covers(e.field))
                } else u = null, c = a.fieldTransforms;
                return new Oc(new tn(o), u, c)
            }
            class Bc extends Ac {
                _toFieldTransform(e) {
                    if (2 !== e.Cu) throw 1 === e.Cu ? e.Bu(`${this._methodName}() can only appear at the top level of your update data`) : e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);
                    return e.fieldMask.push(e.path), null
                }
                isEqual(e) {
                    return e instanceof Bc
                }
            }

            function qc(e, t, n) {
                return new Fc({
                    Cu: 3,
                    qu: t.settings.qu,
                    methodName: e._methodName,
                    xu: n
                }, t.databaseId, t.serializer, t.ignoreUndefinedProperties)
            }
            class jc extends Ac {
                _toFieldTransform(e) {
                    return new xr(e.path, new vr)
                }
                isEqual(e) {
                    return e instanceof jc
                }
            }
            class Kc extends Ac {
                constructor(e, t) {
                    super(e), this.Ku = t
                }
                _toFieldTransform(e) {
                    const t = qc(this, e, !0),
                        n = this.Ku.map(e => Wc(e, t)),
                        r = new wr(n);
                    return new xr(e.path, r)
                }
                isEqual(e) {
                    return e instanceof Kc && m(this.Ku, e.Ku)
                }
            }
            class Gc extends Ac {
                constructor(e, t) {
                    super(e), this.Ku = t
                }
                _toFieldTransform(e) {
                    const t = qc(this, e, !0),
                        n = this.Ku.map(e => Wc(e, t)),
                        r = new br(n);
                    return new xr(e.path, r)
                }
                isEqual(e) {
                    return e instanceof Gc && m(this.Ku, e.Ku)
                }
            }
            class zc extends Ac {
                constructor(e, t) {
                    super(e), this.$u = t
                }
                _toFieldTransform(e) {
                    var t = new Tr(e.serializer, mr(e.serializer, this.$u));
                    return new xr(e.path, t)
                }
                isEqual(e) {
                    return e instanceof zc && this.$u === e.$u
                }
            }

            function $c(e, i, s, t) {
                const a = e.Qu(1, i, s);
                Xc("Data must be an object, but it was:", a, t);
                const o = [],
                    u = tn.empty();
                gt(t, (e, t) => {
                    var n = th(i, e, s);
                    t = y(t);
                    var r = a.Nu(n);
                    if (t instanceof Bc) o.push(n);
                    else {
                        const e = Wc(t, r);
                        null != e && (o.push(n), u.set(n, e))
                    }
                });
                var n = new It(o);
                return new Lc(u, n, a.fieldTransforms)
            }

            function Qc(e, t, n, r, i, s) {
                const a = e.Qu(1, t, n),
                    o = [Zc(t, r, n)],
                    u = [i];
                if (s.length % 2 != 0) throw new q(B.INVALID_ARGUMENT, `Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);
                for (let f = 0; f < s.length; f += 2) o.push(Zc(t, s[f])), u.push(s[f + 1]);
                const c = [],
                    h = tn.empty();
                for (let g = o.length - 1; 0 <= g; --g)
                    if (!rh(c, o[g])) {
                        const t = o[g];
                        var l = y(l = u[g]);
                        const r = a.Nu(t);
                        if (l instanceof Bc) c.push(t);
                        else {
                            const e = Wc(l, r);
                            null != e && (c.push(t), h.set(t, e))
                        }
                    } var d = new It(c);
                return new Lc(h, d, a.fieldTransforms)
            }

            function Hc(e, t, n, r = !1) {
                return Wc(n, e.Qu(r ? 4 : 3, t))
            }

            function Wc(e, t) {
                if (Yc(e = y(e))) return Xc("Unsupported field value:", t, e), Jc(e, t);
                if (e instanceof Ac) return function (e, t) {
                    if (!Mc(t.Cu)) throw t.Bu(`${e._methodName}() can only be used with update() and set()`);
                    if (!t.path) throw t.Bu(`${e._methodName}() is not currently supported inside arrays`);
                    var n = e._toFieldTransform(t);
                    n && t.fieldTransforms.push(n)
                }(e, t), null;
                if (void 0 === e && t.ignoreUndefinedProperties) return null;
                if (t.path && t.fieldMask.push(t.path), e instanceof Array) {
                    if (t.settings.xu && 4 !== t.Cu) throw t.Bu("Nested arrays are not supported");
                    return function (e, t) {
                        const n = [];
                        let r = 0;
                        for (const i of e) {
                            let e = Wc(i, t.Lu(r));
                            null == e && (e = {
                                nullValue: "NULL_VALUE"
                            }), n.push(e), r++
                        }
                        return {
                            arrayValue: {
                                values: n
                            }
                        }
                    }(e, t)
                }
                return function (e, t) {
                    if (null === (e = y(e))) return {
                        nullValue: "NULL_VALUE"
                    };
                    if ("number" == typeof e) return mr(t.serializer, e);
                    if ("boolean" == typeof e) return {
                        booleanValue: e
                    };
                    if ("string" == typeof e) return {
                        stringValue: e
                    };
                    if (e instanceof Date) {
                        var n = te.fromDate(e);
                        return {
                            timestampValue: gi(t.serializer, n)
                        }
                    }
                    if (e instanceof te) {
                        n = new te(e.seconds, 1e3 * Math.floor(e.nanoseconds / 1e3));
                        return {
                            timestampValue: gi(t.serializer, n)
                        }
                    }
                    if (e instanceof Nc) return {
                        geoPointValue: {
                            latitude: e.latitude,
                            longitude: e.longitude
                        }
                    };
                    if (e instanceof Dc) return {
                        bytesValue: mi(t.serializer, e._byteString)
                    };
                    if (e instanceof sc) {
                        const i = t.databaseId,
                            s = e.firestore._databaseId;
                        if (!s.isEqual(i)) throw t.Bu(`Document reference is for database ${s.projectId}/${s.database} but should be for database ${i.projectId}/${i.database}`);
                        return {
                            referenceValue: yi(e.firestore._databaseId || t.databaseId, e._key.path)
                        }
                    }
                    if (e instanceof kc) return r = t, {
                        mapValue: {
                            fields: {
                                __type__: {
                                    stringValue: "__vector__"
                                },
                                value: {
                                    arrayValue: {
                                        values: e.toArray().map(e => {
                                            if ("number" != typeof e) throw r.Bu("VectorValues must only contain numeric values.");
                                            return fr(r.serializer, e)
                                        })
                                    }
                                }
                            }
                        }
                    };
                    var r;
                    throw t.Bu(`Unsupported field value: ${Xu(e)}`)
                }(e, t)
            }

            function Jc(e, r) {
                const i = {};
                return mt(e) ? r.path && 0 < r.path.length && r.fieldMask.push(r.path) : gt(e, (e, t) => {
                    var n = Wc(t, r.Mu(e));
                    null != n && (i[e] = n)
                }), {
                    mapValue: {
                        fields: i
                    }
                }
            }

            function Yc(e) {
                return !("object" != typeof e || null === e || e instanceof Array || e instanceof Date || e instanceof te || e instanceof Nc || e instanceof Dc || e instanceof sc || e instanceof Ac || e instanceof kc)
            }

            function Xc(e, t, n) {
                if (!Yc(n) || ("object" != typeof (i = n) || null === i || Object.getPrototypeOf(i) !== Object.prototype && null !== Object.getPrototypeOf(i))) {
                    var r = Xu(n);
                    throw "an object" === r ? t.Bu(e + " a custom object") : t.Bu(e + " " + r)
                }
                var i
            }

            function Zc(e, t, n) {
                if ((t = y(t)) instanceof Cc) return t._internalPath;
                if ("string" == typeof t) return th(e, t);
                throw nh("Field path arguments must be of type string or ", e, !1, void 0, n)
            }
            const eh = new RegExp("[~\\*/\\[\\]]");

            function th(t, n, r) {
                if (0 <= n.search(eh)) throw nh(`Invalid field path (${n}). Paths must not contain '~', '*', '/', '[', or ']'`, t, !1, void 0, r);
                try {
                    return new Cc(...n.split("."))._internalPath
                } catch (e) {
                    throw nh(`Invalid field path (${n}). Paths must not be empty, begin with '.', end with '.', or contain '..'`, t, !1, void 0, r)
                }
            }

            function nh(e, t, n, r, i) {
                var s = r && !r.isEmpty(),
                    a = void 0 !== i;
                let o = `Function ${t}() called with invalid data`;
                n && (o += " (via `toFirestore()`)"), o += ". ";
                let u = "";
                return (s || a) && (u += " (found", s && (u += ` in field ${r}`), a && (u += ` in document ${i}`), u += ")"), new q(B.INVALID_ARGUMENT, o + e + u)
            }

            function rh(e, t) {
                return e.some(e => e.isEqual(t))
            }
            class ih {
                constructor(e, t, n, r, i) {
                    this._firestore = e, this._userDataWriter = t, this._key = n, this._document = r, this._converter = i
                }
                get id() {
                    return this._key.path.lastSegment()
                }
                get ref() {
                    return new sc(this._firestore, this._converter, this._key)
                }
                exists() {
                    return null !== this._document
                }
                data() {
                    if (this._document) {
                        if (this._converter) {
                            var e = new sh(this._firestore, this._userDataWriter, this._key, this._document, null);
                            return this._converter.fromFirestore(e)
                        }
                        return this._userDataWriter.convertValue(this._document.data.value)
                    }
                }
                get(e) {
                    if (this._document) {
                        var t = this._document.data.field(ah("DocumentSnapshot.get", e));
                        if (null !== t) return this._userDataWriter.convertValue(t)
                    }
                }
            }
            class sh extends ih {
                data() {
                    return super.data()
                }
            }

            function ah(e, t) {
                return "string" == typeof t ? th(e, t) : (t instanceof Cc ? t : t._delegate)._internalPath
            }

            function oh(e) {
                if ("L" === e.limitType && 0 === e.explicitOrderBy.length) throw new q(B.UNIMPLEMENTED, "limitToLast() queries require specifying at least one orderBy() clause")
            }
            class uh {}
            class ch extends uh {}

            function hh(e, t, ...n) {
                let r = [];
                t instanceof uh && r.push(t), r = r.concat(n),
                    function (e) {
                        var t = e.filter(e => e instanceof dh).length,
                            n = e.filter(e => e instanceof lh).length;
                        if (1 < t || 0 < t && 0 < n) throw new q(B.INVALID_ARGUMENT, "InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")
                    }(r);
                for (const t of r) e = t._apply(e);
                return e
            }
            class lh extends ch {
                constructor(e, t, n) {
                    super(), this._field = e, this._op = t, this._value = n, this.type = "where"
                }
                static _create(e, t, n) {
                    return new lh(e, t, n)
                }
                _apply(e) {
                    var t = this._parse(e);
                    return _h(e._query, t), new ic(e.firestore, e.converter, Wn(e._query, t))
                }
                _parse(e) {
                    var t = Pc(e.firestore);
                    return function (e, t, n, r, i, s, a) {
                        let o;
                        if (i.isKeyField()) {
                            if ("array-contains" === s || "array-contains-any" === s) throw new q(B.INVALID_ARGUMENT, `Invalid Query. You can't perform '${s}' queries on documentId().`);
                            if ("in" === s || "not-in" === s) {
                                wh(a, s);
                                const t = [];
                                for (const n of a) t.push(vh(r, e, n));
                                o = {
                                    arrayValue: {
                                        values: t
                                    }
                                }
                            } else o = vh(r, e, a)
                        } else "in" !== s && "not-in" !== s && "array-contains-any" !== s || wh(a, s), o = Hc(n, t, a, "in" === s || "not-in" === s);
                        return cn.create(i, s, o)
                    }(e._query, "where", t, e.firestore._databaseId, this._field, this._op, this._value)
                }
            }
            class dh extends uh {
                constructor(e, t) {
                    super(), this.type = e, this._queryConstraints = t
                }
                static _create(e, t) {
                    return new dh(e, t)
                }
                _parse(t) {
                    var e = this._queryConstraints.map(e => e._parse(t)).filter(e => 0 < e.getFilters().length);
                    return 1 === e.length ? e[0] : hn.create(e, this._getOperator())
                }
                _apply(e) {
                    const t = this._parse(e);
                    return 0 === t.getFilters().length ? e : (function (e, t) {
                        let n = e;
                        for (const e of t.getFlattenedFilters()) _h(n, e), n = Wn(n, e)
                    }(e._query, t), new ic(e.firestore, e.converter, Wn(e._query, t)))
                }
                _getQueryConstraints() {
                    return this._queryConstraints
                }
                _getOperator() {
                    return "and" === this.type ? "and" : "or"
                }
            }
            class fh extends ch {
                constructor(e, t) {
                    super(), this._field = e, this._direction = t, this.type = "orderBy"
                }
                static _create(e, t) {
                    return new fh(e, t)
                }
                _apply(e) {
                    var t = function (e, t, n) {
                        if (null !== e.startAt) throw new q(B.INVALID_ARGUMENT, "Invalid query. You must not call startAt() or startAfter() before calling orderBy().");
                        if (null !== e.endAt) throw new q(B.INVALID_ARGUMENT, "Invalid query. You must not call endAt() or endBefore() before calling orderBy().");
                        return new on(t, n)
                    }(e._query, this._field, this._direction);
                    return new ic(e.firestore, e.converter, (e = e._query, t = e.explicitOrderBy.concat([t]), new jn(e.path, e.collectionGroup, t, e.filters.slice(), e.limit, e.limitType, e.startAt, e.endAt)))
                }
            }
            class gh extends ch {
                constructor(e, t, n) {
                    super(), this.type = e, this._limit = t, this._limitType = n
                }
                static _create(e, t, n) {
                    return new gh(e, t, n)
                }
                _apply(e) {
                    return new ic(e.firestore, e.converter, Jn(e._query, this._limit, this._limitType))
                }
            }
            class mh extends ch {
                constructor(e, t, n) {
                    super(), this.type = e, this._docOrFields = t, this._inclusive = n
                }
                static _create(e, t, n) {
                    return new mh(e, t, n)
                }
                _apply(e) {
                    var t, n = yh(e, this.type, this._docOrFields, this._inclusive);
                    return new ic(e.firestore, e.converter, (t = e._query, e = n, new jn(t.path, t.collectionGroup, t.explicitOrderBy.slice(), t.filters.slice(), t.limit, t.limitType, e, t.endAt)))
                }
            }
            class ph extends ch {
                constructor(e, t, n) {
                    super(), this.type = e, this._docOrFields = t, this._inclusive = n
                }
                static _create(e, t, n) {
                    return new ph(e, t, n)
                }
                _apply(e) {
                    var t, n = yh(e, this.type, this._docOrFields, this._inclusive);
                    return new ic(e.firestore, e.converter, (t = e._query, e = n, new jn(t.path, t.collectionGroup, t.explicitOrderBy.slice(), t.filters.slice(), t.limit, t.limitType, t.startAt, e)))
                }
            }

            function yh(e, t, n, r) {
                if (n[0] = y(n[0]), n[0] instanceof ih) return function (e, t, n, r, i) {
                    if (!r) throw new q(B.NOT_FOUND, `Can't use a DocumentSnapshot that doesn't exist for ${n}().`);
                    const s = [];
                    for (const n of Qn(e))
                        if (n.field.isKeyField()) s.push(Kt(t, r.key));
                        else {
                            const e = r.data.field(n.field);
                            if (At(e)) throw new q(B.INVALID_ARGUMENT, 'Invalid query. You are trying to start or end a query using a document for which the field "' + n.field + '" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');
                            if (null === e) {
                                const e = n.field.canonicalString();
                                throw new q(B.INVALID_ARGUMENT, `Invalid query. You are trying to start or end a query using a document for which the field '${e}' (used as the orderBy) does not exist.`)
                            }
                            s.push(e)
                        } return new rn(s, i)
                }(e._query, e.firestore._databaseId, t, n[0]._document, r);
                var i = Pc(e.firestore);
                return function (e, t, n, r, i, s) {
                    const a = e.explicitOrderBy;
                    if (i.length > a.length) throw new q(B.INVALID_ARGUMENT, `Too many arguments provided to ${r}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);
                    const o = [];
                    for (let u = 0; u < i.length; u++) {
                        const c = i[u];
                        if (a[u].field.isKeyField()) {
                            if ("string" != typeof c) throw new q(B.INVALID_ARGUMENT, `Invalid query. Expected a string for document ID in ${r}(), but got a ${typeof c}`);
                            if (!$n(e) && -1 !== c.indexOf("/")) throw new q(B.INVALID_ARGUMENT, `Invalid query. When querying a collection and ordering by documentId(), the value passed to ${r}() must be a plain document ID, but '${c}' contains a slash.`);
                            const n = e.path.child(ie.fromString(c));
                            if (!oe.isDocumentKey(n)) throw new q(B.INVALID_ARGUMENT, `Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${r}() must result in a valid document path, but '${n}' is not because it contains an odd number of segments.`);
                            const i = new oe(n);
                            o.push(Kt(t, i))
                        } else {
                            const e = Hc(n, r, c);
                            o.push(e)
                        }
                    }
                    return new rn(o, s)
                }(e._query, e.firestore._databaseId, i, t, n, r)
            }

            function vh(e, t, n) {
                if ("string" == typeof (n = y(n))) {
                    if ("" === n) throw new q(B.INVALID_ARGUMENT, "Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");
                    if (!$n(t) && -1 !== n.indexOf("/")) throw new q(B.INVALID_ARGUMENT, `Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);
                    var r = t.path.child(ie.fromString(n));
                    if (!oe.isDocumentKey(r)) throw new q(B.INVALID_ARGUMENT, `Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);
                    return Kt(e, new oe(r))
                }
                if (n instanceof sc) return Kt(e, n._key);
                throw new q(B.INVALID_ARGUMENT, `Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Xu(n)}.`)
            }

            function wh(e, t) {
                if (!Array.isArray(e) || 0 === e.length) throw new q(B.INVALID_ARGUMENT, `Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)
            }

            function _h(e, t) {
                const n = function (e, t) {
                    for (const n of e)
                        for (const e of n.getFlattenedFilters())
                            if (0 <= t.indexOf(e.op)) return e.op;
                    return null
                }(e.filters, function (e) {
                    switch (e) {
                        case "!=":
                            return ["!=", "not-in"];
                        case "array-contains-any":
                        case "in":
                            return ["not-in"];
                        case "not-in":
                            return ["array-contains-any", "in", "not-in", "!="];
                        default:
                            return []
                    }
                }(t.op));
                if (null !== n) throw n === t.op ? new q(B.INVALID_ARGUMENT, `Invalid query. You cannot use more than one '${t.op.toString()}' filter.`) : new q(B.INVALID_ARGUMENT, `Invalid query. You cannot use '${t.op.toString()}' filters with '${n.toString()}' filters.`)
            }
            class bh {
                convertValue(e, t = "none") {
                    switch (Ft(e)) {
                        case 0:
                            return null;
                        case 1:
                            return e.booleanValue;
                        case 2:
                            return Dt(e.integerValue || e.doubleValue);
                        case 3:
                            return this.convertTimestamp(e.timestampValue);
                        case 4:
                            return this.convertServerTimestamp(e, t);
                        case 5:
                            return e.stringValue;
                        case 6:
                            return this.convertBytes(Ct(e.bytesValue));
                        case 7:
                            return this.convertReference(e.referenceValue);
                        case 8:
                            return this.convertGeoPoint(e.geoPointValue);
                        case 9:
                            return this.convertArray(e.arrayValue, t);
                        case 11:
                            return this.convertObject(e.mapValue, t);
                        case 10:
                            return this.convertVectorValue(e.mapValue);
                        default:
                            throw P()
                    }
                }
                convertObject(e, t) {
                    return this.convertObjectMap(e.fields, t)
                }
                convertObjectMap(e, n = "none") {
                    const r = {};
                    return gt(e, (e, t) => {
                        r[e] = this.convertValue(t, n)
                    }), r
                }
                convertVectorValue(e) {
                    var t = null === (t = null === (t = null === (t = e.fields) || void 0 === t ? void 0 : t.value.arrayValue) || void 0 === t ? void 0 : t.values) || void 0 === t ? void 0 : t.map(e => Dt(e.doubleValue));
                    return new kc(t)
                }
                convertGeoPoint(e) {
                    return new Nc(Dt(e.latitude), Dt(e.longitude))
                }
                convertArray(e, t) {
                    return (e.values || []).map(e => this.convertValue(e, t))
                }
                convertServerTimestamp(e, t) {
                    switch (t) {
                        case "previous":
                            var n = Nt(e);
                            return null == n ? null : this.convertValue(n, t);
                        case "estimate":
                            return this.convertTimestamp(kt(e));
                        default:
                            return null
                    }
                }
                convertTimestamp(e) {
                    var t = xt(e);
                    return new te(t.seconds, t.nanos)
                }
                convertDocumentKey(e, t) {
                    const n = ie.fromString(e);
                    U(Vi(n));
                    const r = new Ot(n.get(1), n.get(3)),
                        i = new oe(n.popFirst(5));
                    return r.isEqual(t) || M(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`), i
                }
            }

            function Ih(e, t, n) {
                return e ? n && (n.merge || n.mergeFields) ? e.toFirestore(t, n) : e.toFirestore(t) : t
            }
            class Th extends bh {
                constructor(e) {
                    super(), this.firestore = e
                }
                convertBytes(e) {
                    return new Dc(e)
                }
                convertReference(e) {
                    var t = this.convertDocumentKey(e, this.firestore._databaseId);
                    return new sc(this.firestore, null, t)
                }
            }
            class Eh {
                constructor(e, t) {
                    this.hasPendingWrites = e, this.fromCache = t
                }
                isEqual(e) {
                    return this.hasPendingWrites === e.hasPendingWrites && this.fromCache === e.fromCache
                }
            }
            class Sh extends ih {
                constructor(e, t, n, r, i, s) {
                    super(e, t, n, r, s), this._firestore = e, this._firestoreImpl = e, this.metadata = i
                }
                exists() {
                    return super.exists()
                }
                data(e = {}) {
                    if (this._document) {
                        if (this._converter) {
                            var t = new xh(this._firestore, this._userDataWriter, this._key, this._document, this.metadata, null);
                            return this._converter.fromFirestore(t, e)
                        }
                        return this._userDataWriter.convertValue(this._document.data.value, e.serverTimestamps)
                    }
                }
                get(e, t = {}) {
                    if (this._document) {
                        var n = this._document.data.field(ah("DocumentSnapshot.get", e));
                        if (null !== n) return this._userDataWriter.convertValue(n, t.serverTimestamps)
                    }
                }
            }
            class xh extends Sh {
                data(e = {}) {
                    return super.data(e)
                }
            }
            class Dh {
                constructor(e, t, n, r) {
                    this._firestore = e, this._userDataWriter = t, this._snapshot = r, this.metadata = new Eh(r.hasPendingWrites, r.fromCache), this.query = n
                }
                get docs() {
                    const t = [];
                    return this.forEach(e => t.push(e)), t
                }
                get size() {
                    return this._snapshot.docs.size
                }
                get empty() {
                    return 0 === this.size
                }
                forEach(t, n) {
                    this._snapshot.docs.forEach(e => {
                        t.call(n, new xh(this._firestore, this._userDataWriter, e.key, e, new Eh(this._snapshot.mutatedKeys.has(e.key), this._snapshot.fromCache), this.query.converter))
                    })
                }
                docChanges(e = {}) {
                    var t = !!e.includeMetadataChanges;
                    if (t && this._snapshot.excludesMetadataChanges) throw new q(B.INVALID_ARGUMENT, "To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");
                    return this._cachedChanges && this._cachedChangesIncludeMetadataChanges === t || (this._cachedChanges = function (s, t) {
                        if (s._snapshot.oldDocs.isEmpty()) {
                            let n = 0;
                            return s._snapshot.docChanges.map(e => {
                                var t = new xh(s._firestore, s._userDataWriter, e.doc.key, e.doc, new Eh(s._snapshot.mutatedKeys.has(e.doc.key), s._snapshot.fromCache), s.query.converter);
                                return e.doc, {
                                    type: "added",
                                    doc: t,
                                    oldIndex: -1,
                                    newIndex: n++
                                }
                            })
                        } {
                            let i = s._snapshot.oldDocs;
                            return s._snapshot.docChanges.filter(e => t || 3 !== e.type).map(e => {
                                var t = new xh(s._firestore, s._userDataWriter, e.doc.key, e.doc, new Eh(s._snapshot.mutatedKeys.has(e.doc.key), s._snapshot.fromCache), s.query.converter);
                                let n = -1,
                                    r = -1;
                                return 0 !== e.type && (n = i.indexOf(e.doc.key), i = i.delete(e.doc.key)), 1 !== e.type && (i = i.add(e.doc), r = i.indexOf(e.doc.key)), {
                                    type: function (e) {
                                        switch (e) {
                                            case 0:
                                                return "added";
                                            case 2:
                                            case 3:
                                                return "modified";
                                            case 1:
                                                return "removed";
                                            default:
                                                return P()
                                        }
                                    }(e.type),
                                    doc: t,
                                    oldIndex: n,
                                    newIndex: r
                                }
                            })
                        }
                    }(this, t), this._cachedChangesIncludeMetadataChanges = t), this._cachedChanges
                }
            }

            function Ch(e, t) {
                return e instanceof Sh && t instanceof Sh ? e._firestore === t._firestore && e._key.isEqual(t._key) && (null === e._document ? null === t._document : e._document.isEqual(t._document)) && e._converter === t._converter : e instanceof Dh && t instanceof Dh && e._firestore === t._firestore && hc(e.query, t.query) && e.metadata.isEqual(t.metadata) && e._snapshot.isEqual(t._snapshot)
            }
            class Ah extends bh {
                constructor(e) {
                    super(), this.firestore = e
                }
                convertBytes(e) {
                    return new Dc(e)
                }
                convertReference(e) {
                    var t = this.convertDocumentKey(e, this.firestore._databaseId);
                    return new sc(this.firestore, null, t)
                }
            }

            function Nh(t) {
                t = Zu(t, sc);
                const n = Zu(t.firestore, wc),
                    e = _c(n),
                    r = new Ah(n);
                return function (e, t) {
                    const n = new j;
                    return e.asyncQueue.enqueueAndForget(async () => async function (e, t, n) {
                        try {
                            const i = await
                            function (e, t) {
                                const n = e;
                                return n.persistence.runTransaction("read document", "readonly", e => n.localDocuments.getDocument(e, t))
                            }(e, t);
                            i.isFoundDocument() ? n.resolve(i) : i.isNoDocument() ? n.resolve(null) : n.reject(new q(B.UNAVAILABLE, "Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))
                        } catch (e) {
                            var r = Po(e, `Failed to get document '${t} from cache`);
                            n.reject(r)
                        }
                    }(await Uu(e), t, n)), n.promise
                }(e, t._key).then(e => new Sh(n, r, t._key, e, new Eh(null !== e && e.hasLocalMutations, !0), t.converter))
            }

            function kh(t) {
                t = Zu(t, ic);
                const n = Zu(t.firestore, wc),
                    e = _c(n),
                    r = new Ah(n);
                return function (e, t) {
                    const n = new j;
                    return e.asyncQueue.enqueueAndForget(async () => async function (e, t, n) {
                        try {
                            const i = await Pa(e, t, !0),
                                s = new tu(t, i.Ts),
                                a = s.ma(i.documents),
                                o = s.applyChanges(a, !1);
                            n.resolve(o.snapshot)
                        } catch (e) {
                            var r = Po(e, `Failed to execute query '${t} against cache`);
                            n.reject(r)
                        }
                    }(await Uu(e), t, n)), n.promise
                }(e, t._query).then(e => new Dh(n, r, t, e))
            }

            function Rh(e, t, n) {
                e = Zu(e, sc);
                var r = Zu(e.firestore, wc),
                    i = Ih(e.converter, t, n);
                return Fh(r, [Uc(Pc(r), "setDoc", e._key, i, null !== e.converter, n).toMutation(e._key, Cr.none())])
            }

            function Oh(e, t, n, ...r) {
                e = Zu(e, sc);
                var i = Zu(e.firestore, wc),
                    s = Pc(i);
                let a;
                return a = "string" == typeof (t = y(t)) || t instanceof Cc ? Qc(s, "updateDoc", e._key, t, n, r) : $c(s, "updateDoc", e._key, t), Fh(i, [a.toMutation(e._key, Cr.exists(!0))])
            }

            function Lh(t, ...n) {
                var e;
                t = y(t);
                let r = {
                        includeMetadataChanges: !1,
                        source: "default"
                    },
                    i = 0;
                "object" != typeof n[i] || dc(n[i]) || (r = n[i], i++);
                var s = {
                    includeMetadataChanges: r.includeMetadataChanges,
                    source: r.source
                };
                if (dc(n[i])) {
                    const t = n[i];
                    n[i] = null === (e = t.next) || void 0 === e ? void 0 : e.bind(t), n[i + 1] = null === (e = t.error) || void 0 === e ? void 0 : e.bind(t), n[i + 2] = null === (e = t.complete) || void 0 === e ? void 0 : e.bind(t)
                }
                let a, o, u;
                if (t instanceof sc) o = Zu(t.firestore, wc), u = Gn(t._key.path), a = {
                    next: e => {
                        n[i] && n[i](Vh(o, t, e))
                    },
                    error: n[i + 1],
                    complete: n[i + 2]
                };
                else {
                    const c = Zu(t, ic);
                    o = Zu(c.firestore, wc), u = c._query;
                    const h = new Ah(o);
                    a = {
                        next: e => {
                            n[i] && n[i](new Dh(o, h, c, e))
                        },
                        error: n[i + 1],
                        complete: n[i + 2]
                    }, oh(t._query)
                }
                return function (e, t, n, r) {
                    const i = new Au(r),
                        s = new Ho(t, i, n);
                    return e.asyncQueue.enqueueAndForget(async () => zo(await ju(e), s)), () => {
                        i.Za(), e.asyncQueue.enqueueAndForget(async () => $o(await ju(e), s))
                    }
                }(_c(o), u, s, a)
            }

            function Mh(e, t) {
                return function (e, t) {
                    const n = new Au(t);
                    return e.asyncQueue.enqueueAndForget(async () => function (e, t) {
                        e.Y_.add(t), t.next()
                    }(await ju(e), n)), () => {
                        n.Za(), e.asyncQueue.enqueueAndForget(async () => function (e, t) {
                            e.Y_.delete(t)
                        }(await ju(e), n))
                    }
                }(_c(e = Zu(e, wc)), dc(t) ? t : {
                    next: t
                })
            }

            function Fh(e, t) {
                return function (e, t) {
                    const n = new j;
                    return e.asyncQueue.enqueueAndForget(async () => ou(await qu(e), t, n)), n.promise
                }(_c(e), t)
            }

            function Vh(e, t, n) {
                var r = n.docs.get(t._key),
                    i = new Ah(e);
                return new Sh(e, i, t._key, r, new Eh(n.hasPendingWrites, n.fromCache), t.converter)
            }
            const Ph = {
                maxAttempts: 5
            };
            class Uh {
                constructor(e, t) {
                    this._firestore = e, this._commitHandler = t, this._mutations = [], this._committed = !1, this._dataReader = Pc(e)
                }
                set(e, t, n) {
                    this._verifyNotCommitted();
                    const r = Bh(e, this._firestore),
                        i = Ih(r.converter, t, n),
                        s = Uc(this._dataReader, "WriteBatch.set", r._key, i, null !== r.converter, n);
                    return this._mutations.push(s.toMutation(r._key, Cr.none())), this
                }
                update(e, t, n, ...r) {
                    this._verifyNotCommitted();
                    var i = Bh(e, this._firestore);
                    let s;
                    return s = "string" == typeof (t = y(t)) || t instanceof Cc ? Qc(this._dataReader, "WriteBatch.update", i._key, t, n, r) : $c(this._dataReader, "WriteBatch.update", i._key, t), this._mutations.push(s.toMutation(i._key, Cr.exists(!0))), this
                }
                delete(e) {
                    this._verifyNotCommitted();
                    var t = Bh(e, this._firestore);
                    return this._mutations = this._mutations.concat(new Br(t._key, Cr.none())), this
                }
                commit() {
                    return this._verifyNotCommitted(), this._committed = !0, 0 < this._mutations.length ? this._commitHandler(this._mutations) : Promise.resolve()
                }
                _verifyNotCommitted() {
                    if (this._committed) throw new q(B.FAILED_PRECONDITION, "A write batch can no longer be used after commit() has been called.")
                }
            }

            function Bh(e, t) {
                if ((e = y(e)).firestore !== t) throw new q(B.INVALID_ARGUMENT, "Provided document reference is from a different Firestore instance.");
                return e
            }
            class qh extends class {
                constructor(e, t) {
                    this._firestore = e, this._transaction = t, this._dataReader = Pc(e)
                }
                get(e) {
                    const n = Bh(e, this._firestore),
                        r = new Th(this._firestore);
                    return this._transaction.lookup([n._key]).then(e => {
                        if (!e || 1 !== e.length) return P();
                        const t = e[0];
                        if (t.isFoundDocument()) return new ih(this._firestore, r, t.key, t, n.converter);
                        if (t.isNoDocument()) return new ih(this._firestore, r, n._key, null, n.converter);
                        throw P()
                    })
                }
                set(e, t, n) {
                    var r = Bh(e, this._firestore),
                        i = Ih(r.converter, t, n),
                        i = Uc(this._dataReader, "Transaction.set", r._key, i, null !== r.converter, n);
                    return this._transaction.set(r._key, i), this
                }
                update(e, t, n, ...r) {
                    var i = Bh(e, this._firestore),
                        s = "string" == typeof (t = y(t)) || t instanceof Cc ? Qc(this._dataReader, "Transaction.update", i._key, t, n, r) : $c(this._dataReader, "Transaction.update", i._key, t);
                    return this._transaction.update(i._key, s), this
                }
                delete(e) {
                    var t = Bh(e, this._firestore);
                    return this._transaction.delete(t._key), this
                }
            } {
                constructor(e, t) {
                    super(e, t), this._firestore = e
                }
                get(e) {
                    const t = Bh(e, this._firestore),
                        n = new Ah(this._firestore);
                    return super.get(e).then(e => new Sh(this._firestore, n, t._key, e._document, new Eh(!1, !1), t.converter))
                }
            }

            function jh(t, n, e) {
                t = Zu(t, wc);
                var r = Object.assign(Object.assign({}, Ph), e);
                return function (e) {
                        if (e.maxAttempts < 1) throw new q(B.INVALID_ARGUMENT, "Max attempts must be at least 1")
                    }(r),
                    function (t, n, r) {
                        const i = new j;
                        return t.asyncQueue.enqueueAndForget(async () => {
                            var e = await Vu(t).then(e => e.datastore);
                            new Ru(t.asyncQueue, e, r, n, i).au()
                        }), i.promise
                    }(_c(t), e => n(new qh(t, e)), r)
            }
            mc = !0, pc = ml.SDK_VERSION, k = pc, ml._registerComponent(new v("firestore", (e, {
                instanceIdentifier: t,
                options: n
            }) => {
                const r = e.getProvider("app").getImmediate(),
                    i = new wc(new $(e.getProvider("auth-internal")), new J(e.getProvider("app-check-internal")), function (e, t) {
                        if (!Object.prototype.hasOwnProperty.apply(e.options, ["projectId"])) throw new q(B.INVALID_ARGUMENT, '"projectId" not provided in firebase.initializeApp.');
                        return new Ot(e.options.projectId, t)
                    }(r, t), r);
                return n = Object.assign({
                    useFetchStreams: mc
                }, n), i._setSettings(n), i
            }, "PUBLIC").setMultipleInstances(!0)), ml.registerVersion(A, "4.7.4", gc), ml.registerVersion(A, "4.7.4", "esm2017");

            function Kh(e, t) {
                if (void 0 === t) return {
                    merge: !1
                };
                if (void 0 !== t.mergeFields && void 0 !== t.merge) throw new q("invalid-argument", `Invalid options passed to function ${e}(): You cannot ` + 'specify both "merge" and "mergeFields".');
                return t
            }

            function Gh() {
                if ("undefined" == typeof Uint8Array) throw new q("unimplemented", "Uint8Arrays are not available in this environment.")
            }

            function zh() {
                if ("undefined" == typeof atob) throw new q("unimplemented", "Blobs are unavailable in Firestore in this environment.")
            }
            class $h {
                constructor(e) {
                    this._delegate = e
                }
                static fromBase64String(e) {
                    return zh(), new $h(Dc.fromBase64String(e))
                }
                static fromUint8Array(e) {
                    return Gh(), new $h(Dc.fromUint8Array(e))
                }
                toBase64() {
                    return zh(), this._delegate.toBase64()
                }
                toUint8Array() {
                    return Gh(), this._delegate.toUint8Array()
                }
                isEqual(e) {
                    return this._delegate.isEqual(e._delegate)
                }
                toString() {
                    return "Blob(base64: " + this.toBase64() + ")"
                }
            }

            function Qh(e) {
                return function (e, t) {
                    if ("object" != typeof e || null === e) return;
                    var n = e;
                    for (const r of t)
                        if (r in n && "function" == typeof n[r]) return 1;
                    return
                }(e, ["next", "error", "complete"])
            }
            class Hh {
                enableIndexedDbPersistence(e, t) {
                    return function (e, t) {
                        F("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");
                        const n = e._freezeSettings();
                        return Ic(e, Du.provider, {
                            build: e => new Su(e, n.cacheSizeBytes, null == t ? void 0 : t.forceOwnership)
                        }), Promise.resolve()
                    }(e._delegate, {
                        forceOwnership: t
                    })
                }
                enableMultiTabIndexedDbPersistence(e) {
                    return async function (e) {
                        F("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");
                        const t = e._freezeSettings();
                        Ic(e, Du.provider, {
                            build: e => new xu(e, t.cacheSizeBytes)
                        })
                    }(e._delegate)
                }
                clearIndexedDbPersistence(e) {
                    return function (e) {
                        if (e._initialized && !e._terminated) throw new q(B.FAILED_PRECONDITION, "Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");
                        const t = new j;
                        return e._queue.enqueueAndForgetEvenWhileRestricted(async () => {
                            try {
                                await async function (e) {
                                    if (!Ie.D()) return Promise.resolve();
                                    var t = e + "main";
                                    await Ie.delete(t)
                                }(xa(e._databaseId, e._persistenceKey)), t.resolve()
                            } catch (e) {
                                t.reject(e)
                            }
                        }), t.promise
                    }(e._delegate)
                }
            }
            class Wh {
                constructor(e, t, n) {
                    this._delegate = t, this._persistenceProvider = n, this.INTERNAL = {
                        delete: () => this.terminate()
                    }, e instanceof Ot || (this._appCompat = e)
                }
                get _databaseId() {
                    return this._delegate._databaseId
                }
                settings(e) {
                    var t = this._delegate._getSettings();
                    e.merge || t.host === e.host || F("You are overriding the original host. If you did not intend to override your settings, use {merge: true}."), e.merge && delete(e = Object.assign(Object.assign({}, t), e)).merge, this._delegate._setSettings(e)
                }
                useEmulator(e, t, n = {}) {
                    rc(this._delegate, e, t, n)
                }
                enableNetwork() {
                    return Ec(this._delegate)
                }
                disableNetwork() {
                    return Sc(this._delegate)
                }
                enablePersistence(e) {
                    let t = !1,
                        n = !1;
                    return e && (t = !!e.synchronizeTabs, n = !!e.experimentalForceOwningTab, Wu("synchronizeTabs", t, "experimentalForceOwningTab", n)), t ? this._persistenceProvider.enableMultiTabIndexedDbPersistence(this) : this._persistenceProvider.enableIndexedDbPersistence(this, n)
                }
                clearPersistence() {
                    return this._persistenceProvider.clearIndexedDbPersistence(this)
                }
                terminate() {
                    return this._appCompat && (this._appCompat._removeServiceInstance("firestore-compat"), this._appCompat._removeServiceInstance("firestore")), this._delegate._delete()
                }
                waitForPendingWrites() {
                    return Tc(this._delegate)
                }
                onSnapshotsInSync(e) {
                    return Mh(this._delegate, e)
                }
                get app() {
                    if (!this._appCompat) throw new q("failed-precondition", "Firestore was not initialized using the Firebase SDK. 'app' is not available");
                    return this._appCompat
                }
                collection(e) {
                    try {
                        return new cl(this, oc(this._delegate, e))
                    } catch (e) {
                        throw tl(e, "collection()", "Firestore.collection()")
                    }
                }
                doc(e) {
                    try {
                        return new el(this, uc(this._delegate, e))
                    } catch (e) {
                        throw tl(e, "doc()", "Firestore.doc()")
                    }
                }
                collectionGroup(e) {
                    try {
                        return new al(this, function (e, t) {
                            if (e = Zu(e, nc), Hu("collectionGroup", "collection id", t), 0 <= t.indexOf("/")) throw new q(B.INVALID_ARGUMENT, `Invalid collection ID '${t}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);
                            return new ic(e, null, (t = t, new jn(ie.emptyPath(), t)))
                        }(this._delegate, e))
                    } catch (e) {
                        throw tl(e, "collectionGroup()", "Firestore.collectionGroup()")
                    }
                }
                runTransaction(t) {
                    return jh(this._delegate, e => t(new Yh(this, e)))
                }
                batch() {
                    return _c(this._delegate), new Xh(new Uh(this._delegate, e => Fh(this._delegate, e)))
                }
                loadBundle(e) {
                    return t = this._delegate, e = e, n = _c(t = Zu(t, wc)), r = new fc, zu(n, t._databaseId, e, r), r;
                    var t, n, r
                }
                namedQuery(e) {
                    return xc(this._delegate, e).then(e => e ? new al(this, e) : null)
                }
            }
            class Jh extends bh {
                constructor(e) {
                    super(), this.firestore = e
                }
                convertBytes(e) {
                    return new $h(new Dc(e))
                }
                convertReference(e) {
                    var t = this.convertDocumentKey(e, this.firestore._databaseId);
                    return el.forKey(t, this.firestore, null)
                }
            }
            class Yh {
                constructor(e, t) {
                    this._firestore = e, this._delegate = t, this._userDataWriter = new Jh(e)
                }
                get(e) {
                    const t = hl(e);
                    return this._delegate.get(t).then(e => new il(this._firestore, new Sh(this._firestore._delegate, this._userDataWriter, e._key, e._document, e.metadata, t.converter)))
                }
                set(e, t, n) {
                    var r = hl(e);
                    return n ? (Kh("Transaction.set", n), this._delegate.set(r, t, n)) : this._delegate.set(r, t), this
                }
                update(e, t, n, ...r) {
                    var i = hl(e);
                    return 2 === arguments.length ? this._delegate.update(i, t) : this._delegate.update(i, t, n, ...r), this
                }
                delete(e) {
                    var t = hl(e);
                    return this._delegate.delete(t), this
                }
            }
            class Xh {
                constructor(e) {
                    this._delegate = e
                }
                set(e, t, n) {
                    var r = hl(e);
                    return n ? (Kh("WriteBatch.set", n), this._delegate.set(r, t, n)) : this._delegate.set(r, t), this
                }
                update(e, t, n, ...r) {
                    var i = hl(e);
                    return 2 === arguments.length ? this._delegate.update(i, t) : this._delegate.update(i, t, n, ...r), this
                }
                delete(e) {
                    var t = hl(e);
                    return this._delegate.delete(t), this
                }
                commit() {
                    return this._delegate.commit()
                }
            }
            class Zh {
                constructor(e, t, n) {
                    this._firestore = e, this._userDataWriter = t, this._delegate = n
                }
                fromFirestore(e, t) {
                    var n = new xh(this._firestore._delegate, this._userDataWriter, e._key, e._document, e.metadata, null);
                    return this._delegate.fromFirestore(new sl(this._firestore, n), null != t ? t : {})
                }
                toFirestore(e, t) {
                    return t ? this._delegate.toFirestore(e, t) : this._delegate.toFirestore(e)
                }
                static getInstance(e, t) {
                    const n = Zh.INSTANCES;
                    let r = n.get(e);
                    r || (r = new WeakMap, n.set(e, r));
                    let i = r.get(t);
                    return i || (i = new Zh(e, new Jh(e), t), r.set(t, i)), i
                }
            }
            Zh.INSTANCES = new WeakMap;
            class el {
                constructor(e, t) {
                    this.firestore = e, this._delegate = t, this._userDataWriter = new Jh(e)
                }
                static forPath(e, t, n) {
                    if (e.length % 2 != 0) throw new q("invalid-argument", "Invalid document reference. Document references must have an even number of segments, but " + `${e.canonicalString()} has ${e.length}`);
                    return new el(t, new sc(t._delegate, n, new oe(e)))
                }
                static forKey(e, t, n) {
                    return new el(t, new sc(t._delegate, n, e))
                }
                get id() {
                    return this._delegate.id
                }
                get parent() {
                    return new cl(this.firestore, this._delegate.parent)
                }
                get path() {
                    return this._delegate.path
                }
                collection(e) {
                    try {
                        return new cl(this.firestore, oc(this._delegate, e))
                    } catch (e) {
                        throw tl(e, "collection()", "DocumentReference.collection()")
                    }
                }
                isEqual(e) {
                    return (e = y(e)) instanceof sc && cc(this._delegate, e)
                }
                set(e, t) {
                    t = Kh("DocumentReference.set", t);
                    try {
                        return t ? Rh(this._delegate, e, t) : Rh(this._delegate, e)
                    } catch (e) {
                        throw tl(e, "setDoc()", "DocumentReference.set()")
                    }
                }
                update(e, t, ...n) {
                    try {
                        return 1 === arguments.length ? Oh(this._delegate, e) : Oh(this._delegate, e, t, ...n)
                    } catch (e) {
                        throw tl(e, "updateDoc()", "DocumentReference.update()")
                    }
                }
                delete() {
                    return Fh(Zu((e = this._delegate).firestore, wc), [new Br(e._key, Cr.none())]);
                    var e
                }
                onSnapshot(...e) {
                    var t = nl(e),
                        n = rl(e, e => new il(this.firestore, new Sh(this.firestore._delegate, this._userDataWriter, e._key, e._document, e.metadata, this._delegate.converter)));
                    return Lh(this._delegate, t, n)
                }
                get(e) {
                    let t;
                    return t = ("cache" === (null == e ? void 0 : e.source) ? Nh : "server" === (null == e ? void 0 : e.source) ? function (t) {
                        t = Zu(t, sc);
                        const n = Zu(t.firestore, wc);
                        return Ku(_c(n), t._key, {
                            source: "server"
                        }).then(e => Vh(n, t, e))
                    } : function (t) {
                        t = Zu(t, sc);
                        const n = Zu(t.firestore, wc);
                        return Ku(_c(n), t._key).then(e => Vh(n, t, e))
                    })(this._delegate), t.then(e => new il(this.firestore, new Sh(this.firestore._delegate, this._userDataWriter, e._key, e._document, e.metadata, this._delegate.converter)))
                }
                withConverter(e) {
                    return new el(this.firestore, e ? this._delegate.withConverter(Zh.getInstance(this.firestore, e)) : this._delegate.withConverter(null))
                }
            }

            function tl(e, t, n) {
                return e.message = e.message.replace(t, n), e
            }

            function nl(e) {
                for (const t of e)
                    if ("object" == typeof t && !Qh(t)) return t;
                return {}
            }

            function rl(e, t) {
                var n;
                let r;
                return r = Qh(e[0]) ? e[0] : Qh(e[1]) ? e[1] : "function" == typeof e[0] ? {
                    next: e[0],
                    error: e[1],
                    complete: e[2]
                } : {
                    next: e[1],
                    error: e[2],
                    complete: e[3]
                }, {
                    next: e => {
                        r.next && r.next(t(e))
                    },
                    error: null === (n = r.error) || void 0 === n ? void 0 : n.bind(r),
                    complete: null === (n = r.complete) || void 0 === n ? void 0 : n.bind(r)
                }
            }
            class il {
                constructor(e, t) {
                    this._firestore = e, this._delegate = t
                }
                get ref() {
                    return new el(this._firestore, this._delegate.ref)
                }
                get id() {
                    return this._delegate.id
                }
                get metadata() {
                    return this._delegate.metadata
                }
                get exists() {
                    return this._delegate.exists()
                }
                data(e) {
                    return this._delegate.data(e)
                }
                get(e, t) {
                    return this._delegate.get(e, t)
                }
                isEqual(e) {
                    return Ch(this._delegate, e._delegate)
                }
            }
            class sl extends il {
                data(e) {
                    var t = this._delegate.data(e);
                    return this._delegate._converter || void 0 !== t || P(), t
                }
            }
            class al {
                constructor(e, t) {
                    this.firestore = e, this._delegate = t, this._userDataWriter = new Jh(e)
                }
                where(e, t, n) {
                    try {
                        return new al(this.firestore, hh(this._delegate, (r = n, i = t, s = ah("where", e), lh._create(s, i, r))))
                    } catch (e) {
                        throw tl(e, /(orderBy|where)\(\)/, "Query.$1()")
                    }
                    var r, i, s
                }
                orderBy(e, t) {
                    try {
                        return new al(this.firestore, hh(this._delegate, ([n, r = "asc"] = [e, t], i = r, s = ah("orderBy", n), fh._create(s, i))))
                    } catch (e) {
                        throw tl(e, /(orderBy|where)\(\)/, "Query.$1()")
                    }
                    var n, r, i, s
                }
                limit(e) {
                    try {
                        return new al(this.firestore, hh(this._delegate, (ec("limit", t = e), gh._create("limit", t, "F"))))
                    } catch (e) {
                        throw tl(e, "limit()", "Query.limit()")
                    }
                    var t
                }
                limitToLast(e) {
                    try {
                        return new al(this.firestore, hh(this._delegate, (ec("limitToLast", t = e), gh._create("limitToLast", t, "L"))))
                    } catch (e) {
                        throw tl(e, "limitToLast()", "Query.limitToLast()")
                    }
                    var t
                }
                startAt(...e) {
                    try {
                        return new al(this.firestore, hh(this._delegate, function (...e) {
                            return mh._create("startAt", e, !0)
                        }(...e)))
                    } catch (e) {
                        throw tl(e, "startAt()", "Query.startAt()")
                    }
                }
                startAfter(...e) {
                    try {
                        return new al(this.firestore, hh(this._delegate, function (...e) {
                            return mh._create("startAfter", e, !1)
                        }(...e)))
                    } catch (e) {
                        throw tl(e, "startAfter()", "Query.startAfter()")
                    }
                }
                endBefore(...e) {
                    try {
                        return new al(this.firestore, hh(this._delegate, function (...e) {
                            return ph._create("endBefore", e, !1)
                        }(...e)))
                    } catch (e) {
                        throw tl(e, "endBefore()", "Query.endBefore()")
                    }
                }
                endAt(...e) {
                    try {
                        return new al(this.firestore, hh(this._delegate, function (...e) {
                            return ph._create("endAt", e, !0)
                        }(...e)))
                    } catch (e) {
                        throw tl(e, "endAt()", "Query.endAt()")
                    }
                }
                isEqual(e) {
                    return hc(this._delegate, e._delegate)
                }
                get(e) {
                    let t;
                    return t = ("cache" === (null == e ? void 0 : e.source) ? kh : "server" === (null == e ? void 0 : e.source) ? function (t) {
                        t = Zu(t, ic);
                        const n = Zu(t.firestore, wc),
                            e = _c(n),
                            r = new Ah(n);
                        return Gu(e, t._query, {
                            source: "server"
                        }).then(e => new Dh(n, r, t, e))
                    } : function (t) {
                        t = Zu(t, ic);
                        const n = Zu(t.firestore, wc),
                            e = _c(n),
                            r = new Ah(n);
                        return oh(t._query), Gu(e, t._query).then(e => new Dh(n, r, t, e))
                    })(this._delegate), t.then(e => new ul(this.firestore, new Dh(this.firestore._delegate, this._userDataWriter, this._delegate, e._snapshot)))
                }
                onSnapshot(...e) {
                    var t = nl(e),
                        n = rl(e, e => new ul(this.firestore, new Dh(this.firestore._delegate, this._userDataWriter, this._delegate, e._snapshot)));
                    return Lh(this._delegate, t, n)
                }
                withConverter(e) {
                    return new al(this.firestore, e ? this._delegate.withConverter(Zh.getInstance(this.firestore, e)) : this._delegate.withConverter(null))
                }
            }
            class ol {
                constructor(e, t) {
                    this._firestore = e, this._delegate = t
                }
                get type() {
                    return this._delegate.type
                }
                get doc() {
                    return new sl(this._firestore, this._delegate.doc)
                }
                get oldIndex() {
                    return this._delegate.oldIndex
                }
                get newIndex() {
                    return this._delegate.newIndex
                }
            }
            class ul {
                constructor(e, t) {
                    this._firestore = e, this._delegate = t
                }
                get query() {
                    return new al(this._firestore, this._delegate.query)
                }
                get metadata() {
                    return this._delegate.metadata
                }
                get size() {
                    return this._delegate.size
                }
                get empty() {
                    return this._delegate.empty
                }
                get docs() {
                    return this._delegate.docs.map(e => new sl(this._firestore, e))
                }
                docChanges(e) {
                    return this._delegate.docChanges(e).map(e => new ol(this._firestore, e))
                }
                forEach(t, n) {
                    this._delegate.forEach(e => {
                        t.call(n, new sl(this._firestore, e))
                    })
                }
                isEqual(e) {
                    return Ch(this._delegate, e._delegate)
                }
            }
            class cl extends al {
                constructor(e, t) {
                    super(e, t), this.firestore = e, this._delegate = t
                }
                get id() {
                    return this._delegate.id
                }
                get path() {
                    return this._delegate.path
                }
                get parent() {
                    var e = this._delegate.parent;
                    return e ? new el(this.firestore, e) : null
                }
                doc(e) {
                    try {
                        return void 0 === e ? new el(this.firestore, uc(this._delegate)) : new el(this.firestore, uc(this._delegate, e))
                    } catch (e) {
                        throw tl(e, "doc()", "CollectionReference.doc()")
                    }
                }
                add(e) {
                    return function (e, t) {
                        const n = Zu(e.firestore, wc),
                            r = uc(e),
                            i = Ih(e.converter, t);
                        return Fh(n, [Uc(Pc(e.firestore), "addDoc", r._key, i, null !== e.converter, {}).toMutation(r._key, Cr.exists(!1))]).then(() => r)
                    }(this._delegate, e).then(e => new el(this.firestore, e))
                }
                isEqual(e) {
                    return cc(this._delegate, e._delegate)
                }
                withConverter(e) {
                    return new cl(this.firestore, e ? this._delegate.withConverter(Zh.getInstance(this.firestore, e)) : this._delegate.withConverter(null))
                }
            }

            function hl(e) {
                return Zu(e, sc)
            }
            const ll = {
                Firestore: Wh,
                GeoPoint: Nc,
                Timestamp: te,
                Blob: $h,
                Transaction: Yh,
                WriteBatch: Xh,
                DocumentReference: el,
                DocumentSnapshot: il,
                Query: al,
                QueryDocumentSnapshot: sl,
                QuerySnapshot: ul,
                CollectionReference: cl,
                FieldPath: class dl {
                    constructor(...e) {
                        this._delegate = new Cc(...e)
                    }
                    static documentId() {
                        return new dl(ae.keyField().canonicalString())
                    }
                    isEqual(e) {
                        return (e = y(e)) instanceof Cc && this._delegate._internalPath.isEqual(e._internalPath)
                    }
                },
                FieldValue: class fl {
                    constructor(e) {
                        this._delegate = e
                    }
                    static serverTimestamp() {
                        const e = new jc("serverTimestamp");
                        return e._methodName = "FieldValue.serverTimestamp", new fl(e)
                    }
                    static delete() {
                        const e = new Bc("deleteField");
                        return e._methodName = "FieldValue.delete", new fl(e)
                    }
                    static arrayUnion(...e) {
                        const t = function (...e) {
                            return new Kc("arrayUnion", e)
                        }(...e);
                        return t._methodName = "FieldValue.arrayUnion", new fl(t)
                    }
                    static arrayRemove(...e) {
                        const t = function (...e) {
                            return new Gc("arrayRemove", e)
                        }(...e);
                        return t._methodName = "FieldValue.arrayRemove", new fl(t)
                    }
                    static increment(e) {
                        const t = new zc("increment", e);
                        return t._methodName = "FieldValue.increment", new fl(t)
                    }
                    isEqual(e) {
                        return this._delegate.isEqual(e._delegate)
                    }
                },
                setLogLevel: function (e) {
                    e = e, R.setLogLevel(e)
                },
                CACHE_SIZE_UNLIMITED: -1
            };
            yc = t.default, vc = (e, t) => new Wh(e, t, new Hh), yc.INTERNAL.registerComponent(new v("firestore-compat", e => {
                var t = e.getProvider("app-compat").getImmediate(),
                    n = e.getProvider("firestore").getImmediate();
                return vc(t, n)
            }, "PUBLIC").setServiceProps(Object.assign({}, ll))), yc.registerVersion("@firebase/firestore-compat", "0.3.39")
        }).apply(this, arguments)
    } catch (e) {
        throw console.error(e), new Error("Cannot instantiate firebase-firestore-compat.js - be sure to load firebase-app.js first.")
    }
});
//# sourceMappingURL=firebase-firestore-compat.js.map