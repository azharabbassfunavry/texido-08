! function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).firebase = t()
}(this, function () {
    "use strict";
    const r = function (t) {
            const r = [];
            let n = 0;
            for (let i = 0; i < t.length; i++) {
                let e = t.charCodeAt(i);
                e < 128 ? r[n++] = e : (e < 2048 ? r[n++] = e >> 6 | 192 : (55296 == (64512 & e) && i + 1 < t.length && 56320 == (64512 & t.charCodeAt(i + 1)) ? (e = 65536 + ((1023 & e) << 10) + (1023 & t.charCodeAt(++i)), r[n++] = e >> 18 | 240, r[n++] = e >> 12 & 63 | 128) : r[n++] = e >> 12 | 224, r[n++] = e >> 6 & 63 | 128), r[n++] = 63 & e | 128)
            }
            return r
        },
        n = {
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
            encodeByteArray(r, e) {
                if (!Array.isArray(r)) throw Error("encodeByteArray takes an array as a parameter");
                this.init_();
                var n = e ? this.byteToCharMapWebSafe_ : this.byteToCharMap_;
                const i = [];
                for (let h = 0; h < r.length; h += 3) {
                    var a = r[h],
                        s = h + 1 < r.length,
                        o = s ? r[h + 1] : 0,
                        c = h + 2 < r.length,
                        l = c ? r[h + 2] : 0;
                    let e = (15 & o) << 2 | l >> 6,
                        t = 63 & l;
                    c || (t = 64, s || (e = 64)), i.push(n[a >> 2], n[(3 & a) << 4 | o >> 4], n[e], n[t])
                }
                return i.join("")
            },
            encodeString(e, t) {
                return this.HAS_NATIVE_SUPPORT && !t ? btoa(e) : this.encodeByteArray(r(e), t)
            },
            decodeString(e, t) {
                return this.HAS_NATIVE_SUPPORT && !t ? atob(e) : function (e) {
                    const t = [];
                    let r = 0,
                        n = 0;
                    for (; r < e.length;) {
                        var i, a, s = e[r++];
                        s < 128 ? t[n++] = String.fromCharCode(s) : 191 < s && s < 224 ? (i = e[r++], t[n++] = String.fromCharCode((31 & s) << 6 | 63 & i)) : 239 < s && s < 365 ? (a = ((7 & s) << 18 | (63 & e[r++]) << 12 | (63 & e[r++]) << 6 | 63 & e[r++]) - 65536, t[n++] = String.fromCharCode(55296 + (a >> 10)), t[n++] = String.fromCharCode(56320 + (1023 & a))) : (i = e[r++], a = e[r++], t[n++] = String.fromCharCode((15 & s) << 12 | (63 & i) << 6 | 63 & a))
                    }
                    return t.join("")
                }(this.decodeStringToByteArray(e, t))
            },
            decodeStringToByteArray(e, t) {
                this.init_();
                var r = t ? this.charToByteMapWebSafe_ : this.charToByteMap_;
                const n = [];
                for (let c = 0; c < e.length;) {
                    var i = r[e.charAt(c++)],
                        a = c < e.length ? r[e.charAt(c)] : 0;
                    ++c;
                    var s = c < e.length ? r[e.charAt(c)] : 64;
                    ++c;
                    var o = c < e.length ? r[e.charAt(c)] : 64;
                    if (++c, null == i || null == a || null == s || null == o) throw new l;
                    n.push(i << 2 | a >> 4), 64 !== s && (n.push(a << 4 & 240 | s >> 2), 64 !== o && n.push(s << 6 & 192 | o))
                }
                return n
            },
            init_() {
                if (!this.byteToCharMap_) {
                    this.byteToCharMap_ = {}, this.charToByteMap_ = {}, this.byteToCharMapWebSafe_ = {}, this.charToByteMapWebSafe_ = {};
                    for (let e = 0; e < this.ENCODED_VALS.length; e++) this.byteToCharMap_[e] = this.ENCODED_VALS.charAt(e), this.charToByteMap_[this.byteToCharMap_[e]] = e, this.byteToCharMapWebSafe_[e] = this.ENCODED_VALS_WEBSAFE.charAt(e), this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]] = e, e >= this.ENCODED_VALS_BASE.length && (this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)] = e, this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)] = e)
                }
            }
        };
    class l extends Error {
        constructor() {
            super(...arguments), this.name = "DecodeBase64StringError"
        }
    }
    const a = function (e) {
        return e = e, t = r(e), n.encodeByteArray(t, !0).replace(/\./g, "");
        var t
    };

    function c(e, t) {
        if (!(t instanceof Object)) return t;
        switch (t.constructor) {
            case Date:
                const r = t;
                return new Date(r.getTime());
            case Object:
                void 0 === e && (e = {});
                break;
            case Array:
                e = [];
                break;
            default:
                return t
        }
        for (const n in t) t.hasOwnProperty(n) && "__proto__" !== n && (e[n] = c(e[n], t[n]));
        return e
    }

    function e() {
        if ("undefined" != typeof self) return self;
        if ("undefined" != typeof window) return window;
        if ("undefined" != typeof global) return global;
        throw new Error("Unable to locate global object.")
    }
    const t = () => {
            if ("undefined" != typeof document) {
                let e;
                try {
                    e = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)
                } catch (e) {
                    return
                }
                var t = e && function (e) {
                    try {
                        return n.decodeString(e, !0)
                    } catch (e) {
                        console.error("base64Decode failed: ", e)
                    }
                    return null
                }(e[1]);
                return t && JSON.parse(t)
            }
        },
        i = () => {
            try {
                return e().__FIREBASE_DEFAULTS__ || (() => {
                    if ("undefined" != typeof process && void 0 !== process.env) {
                        var e = process.env.__FIREBASE_DEFAULTS__;
                        return e ? JSON.parse(e) : void 0
                    }
                })() || t()
            } catch (e) {
                return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`)
            }
        },
        h = () => {
            var e;
            return null === (e = i()) || void 0 === e ? void 0 : e.config
        };
    class s {
        constructor() {
            this.reject = () => {}, this.resolve = () => {}, this.promise = new Promise((e, t) => {
                this.resolve = e, this.reject = t
            })
        }
        wrapCallback(r) {
            return (e, t) => {
                e ? this.reject(e) : this.resolve(t), "function" == typeof r && (this.promise.catch(() => {}), 1 === r.length ? r(e) : r(e, t))
            }
        }
    }

    function d() {
        return "undefined" != typeof WorkerGlobalScope && "undefined" != typeof self && self instanceof WorkerGlobalScope
    }
    class o extends Error {
        constructor(e, t, r) {
            super(t), this.code = e, this.customData = r, this.name = "FirebaseError", Object.setPrototypeOf(this, o.prototype), Error.captureStackTrace && Error.captureStackTrace(this, u.prototype.create)
        }
    }
    class u {
        constructor(e, t, r) {
            this.service = e, this.serviceName = t, this.errors = r
        }
        create(e, ...t) {
            var n, r = t[0] || {},
                i = `${this.service}/${e}`,
                a = this.errors[e],
                a = a ? (n = r, a.replace(p, (e, t) => {
                    var r = n[t];
                    return null != r ? String(r) : `<${t}?>`
                })) : "Error",
                a = `${this.serviceName}: ${a} (${i}).`;
            return new o(i, a, r)
        }
    }
    const p = /\{\$([^}]+)}/g;

    function f(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }

    function g(e, t) {
        if (e === t) return 1;
        const r = Object.keys(e),
            n = Object.keys(t);
        for (const s of r) {
            if (!n.includes(s)) return;
            var i = e[s],
                a = t[s];
            if (b(i) && b(a)) {
                if (!g(i, a)) return
            } else if (i !== a) return
        }
        for (const o of n)
            if (!r.includes(o)) return;
        return 1
    }

    function b(e) {
        return null !== e && "object" == typeof e
    }

    function m(e, t) {
        const r = new v(e, t);
        return r.subscribe.bind(r)
    }
    class v {
        constructor(e, t) {
            this.observers = [], this.unsubscribes = [], this.observerCount = 0, this.task = Promise.resolve(), this.finalized = !1, this.onNoObservers = t, this.task.then(() => {
                e(this)
            }).catch(e => {
                this.error(e)
            })
        }
        next(t) {
            this.forEachObserver(e => {
                e.next(t)
            })
        }
        error(t) {
            this.forEachObserver(e => {
                e.error(t)
            }), this.close(t)
        }
        complete() {
            this.forEachObserver(e => {
                e.complete()
            }), this.close()
        }
        subscribe(e, t, r) {
            let n;
            if (void 0 === e && void 0 === t && void 0 === r) throw new Error("Missing Observer.");
            n = function (e, t) {
                if ("object" != typeof e || null === e) return !1;
                for (const r of t)
                    if (r in e && "function" == typeof e[r]) return !0;
                return !1
            }(e, ["next", "error", "complete"]) ? e : {
                next: e,
                error: t,
                complete: r
            }, void 0 === n.next && (n.next = _), void 0 === n.error && (n.error = _), void 0 === n.complete && (n.complete = _);
            var i = this.unsubscribeOne.bind(this, this.observers.length);
            return this.finalized && this.task.then(() => {
                try {
                    this.finalError ? n.error(this.finalError) : n.complete()
                } catch (e) {}
            }), this.observers.push(n), i
        }
        unsubscribeOne(e) {
            void 0 !== this.observers && void 0 !== this.observers[e] && (delete this.observers[e], --this.observerCount, 0 === this.observerCount && void 0 !== this.onNoObservers && this.onNoObservers(this))
        }
        forEachObserver(t) {
            if (!this.finalized)
                for (let e = 0; e < this.observers.length; e++) this.sendOne(e, t)
        }
        sendOne(e, t) {
            this.task.then(() => {
                if (void 0 !== this.observers && void 0 !== this.observers[e]) try {
                    t(this.observers[e])
                } catch (e) {
                    "undefined" != typeof console && console.error && console.error(e)
                }
            })
        }
        close(e) {
            this.finalized || (this.finalized = !0, void 0 !== e && (this.finalError = e), this.task.then(() => {
                this.observers = void 0, this.onNoObservers = void 0
            }))
        }
    }

    function _() {}
    class y {
        constructor(e, t, r) {
            this.name = e, this.instanceFactory = t, this.type = r, this.multipleInstances = !1, this.serviceProps = {}, this.instantiationMode = "LAZY", this.onInstanceCreated = null
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
    }
    const E = "[DEFAULT]";
    class w {
        constructor(e, t) {
            this.name = e, this.container = t, this.component = null, this.instances = new Map, this.instancesDeferred = new Map, this.instancesOptions = new Map, this.onInitCallbacks = new Map
        }
        get(e) {
            var t = this.normalizeInstanceIdentifier(e);
            if (!this.instancesDeferred.has(t)) {
                const n = new s;
                if (this.instancesDeferred.set(t, n), this.isInitialized(t) || this.shouldAutoInitialize()) try {
                    var r = this.getOrInitializeService({
                        instanceIdentifier: t
                    });
                    r && n.resolve(r)
                } catch (e) {}
            }
            return this.instancesDeferred.get(t).promise
        }
        getImmediate(e) {
            var t = this.normalizeInstanceIdentifier(null == e ? void 0 : e.identifier),
                r = null !== (r = null == e ? void 0 : e.optional) && void 0 !== r && r;
            if (!this.isInitialized(t) && !this.shouldAutoInitialize()) {
                if (r) return null;
                throw Error(`Service ${this.name} is not available`)
            }
            try {
                return this.getOrInitializeService({
                    instanceIdentifier: t
                })
            } catch (e) {
                if (r) return null;
                throw e
            }
        }
        getComponent() {
            return this.component
        }
        setComponent(e) {
            if (e.name !== this.name) throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);
            if (this.component) throw Error(`Component for ${this.name} has already been provided`);
            if (this.component = e, this.shouldAutoInitialize()) {
                if ("EAGER" === e.instantiationMode) try {
                    this.getOrInitializeService({
                        instanceIdentifier: E
                    })
                } catch (e) {}
                for (var [t, r] of this.instancesDeferred.entries()) {
                    t = this.normalizeInstanceIdentifier(t);
                    try {
                        var n = this.getOrInitializeService({
                            instanceIdentifier: t
                        });
                        r.resolve(n)
                    } catch (e) {}
                }
            }
        }
        clearInstance(e = E) {
            this.instancesDeferred.delete(e), this.instancesOptions.delete(e), this.instances.delete(e)
        }
        async delete() {
            const e = Array.from(this.instances.values());
            await Promise.all([...e.filter(e => "INTERNAL" in e).map(e => e.INTERNAL.delete()), ...e.filter(e => "_delete" in e).map(e => e._delete())])
        }
        isComponentSet() {
            return null != this.component
        }
        isInitialized(e = E) {
            return this.instances.has(e)
        }
        getOptions(e = E) {
            return this.instancesOptions.get(e) || {}
        }
        initialize(e = {}) {
            var {
                options: t = {}
            } = e, r = this.normalizeInstanceIdentifier(e.instanceIdentifier);
            if (this.isInitialized(r)) throw Error(`${this.name}(${r}) has already been initialized`);
            if (!this.isComponentSet()) throw Error(`Component ${this.name} has not been registered yet`);
            var n, i, a = this.getOrInitializeService({
                instanceIdentifier: r,
                options: t
            });
            for ([n, i] of this.instancesDeferred.entries()) r === this.normalizeInstanceIdentifier(n) && i.resolve(a);
            return a
        }
        onInit(e, t) {
            var r = this.normalizeInstanceIdentifier(t);
            const n = null !== (i = this.onInitCallbacks.get(r)) && void 0 !== i ? i : new Set;
            n.add(e), this.onInitCallbacks.set(r, n);
            var i = this.instances.get(r);
            return i && e(i, r), () => {
                n.delete(e)
            }
        }
        invokeOnInitCallbacks(e, t) {
            var r = this.onInitCallbacks.get(t);
            if (r)
                for (const n of r) try {
                    n(e, t)
                } catch (e) {}
        }
        getOrInitializeService({
            instanceIdentifier: e,
            options: t = {}
        }) {
            let r = this.instances.get(e);
            if (!r && this.component && (r = this.component.instanceFactory(this.container, {
                    instanceIdentifier: (n = e) === E ? void 0 : n,
                    options: t
                }), this.instances.set(e, r), this.instancesOptions.set(e, t), this.invokeOnInitCallbacks(r, e), this.component.onInstanceCreated)) try {
                this.component.onInstanceCreated(this.container, e, r)
            } catch (e) {}
            var n;
            return r || null
        }
        normalizeInstanceIdentifier(e = E) {
            return !this.component || this.component.multipleInstances ? e : E
        }
        shouldAutoInitialize() {
            return !!this.component && "EXPLICIT" !== this.component.instantiationMode
        }
    }
    class C {
        constructor(e) {
            this.name = e, this.providers = new Map
        }
        addComponent(e) {
            const t = this.getProvider(e.name);
            if (t.isComponentSet()) throw new Error(`Component ${e.name} has already been registered with ${this.name}`);
            t.setComponent(e)
        }
        addOrOverwriteComponent(e) {
            const t = this.getProvider(e.name);
            t.isComponentSet() && this.providers.delete(e.name), this.addComponent(e)
        }
        getProvider(e) {
            if (this.providers.has(e)) return this.providers.get(e);
            var t = new w(e, this);
            return this.providers.set(e, t), t
        }
        getProviders() {
            return Array.from(this.providers.values())
        }
    }
    const D = [];
    var I, S, O;
    (S = I = I || {})[S.DEBUG = 0] = "DEBUG", S[S.VERBOSE = 1] = "VERBOSE", S[S.INFO = 2] = "INFO", S[S.WARN = 3] = "WARN", S[S.ERROR = 4] = "ERROR", S[S.SILENT = 5] = "SILENT";
    const A = {
            debug: I.DEBUG,
            verbose: I.VERBOSE,
            info: I.INFO,
            warn: I.WARN,
            error: I.ERROR,
            silent: I.SILENT
        },
        L = I.INFO,
        N = {
            [I.DEBUG]: "log",
            [I.VERBOSE]: "log",
            [I.INFO]: "info",
            [I.WARN]: "warn",
            [I.ERROR]: "error"
        },
        B = (e, t, ...r) => {
            if (!(t < e.logLevel)) {
                var n = (new Date).toISOString(),
                    i = N[t];
                if (!i) throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);
                console[i](`[${n}]  ${e.name}:`, ...r)
            }
        };
    class T {
        constructor(e) {
            this.name = e, this._logLevel = L, this._logHandler = B, this._userLogHandler = null, D.push(this)
        }
        get logLevel() {
            return this._logLevel
        }
        set logLevel(e) {
            if (!(e in I)) throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);
            this._logLevel = e
        }
        setLogLevel(e) {
            this._logLevel = "string" == typeof e ? A[e] : e
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
            this._userLogHandler && this._userLogHandler(this, I.DEBUG, ...e), this._logHandler(this, I.DEBUG, ...e)
        }
        log(...e) {
            this._userLogHandler && this._userLogHandler(this, I.VERBOSE, ...e), this._logHandler(this, I.VERBOSE, ...e)
        }
        info(...e) {
            this._userLogHandler && this._userLogHandler(this, I.INFO, ...e), this._logHandler(this, I.INFO, ...e)
        }
        warn(...e) {
            this._userLogHandler && this._userLogHandler(this, I.WARN, ...e), this._logHandler(this, I.WARN, ...e)
        }
        error(...e) {
            this._userLogHandler && this._userLogHandler(this, I.ERROR, ...e), this._logHandler(this, I.ERROR, ...e)
        }
    }
    const R = (t, e) => e.some(e => t instanceof e);
    let P, k;
    const M = new WeakMap,
        F = new WeakMap,
        j = new WeakMap,
        z = new WeakMap,
        $ = new WeakMap;
    let H = {
        get(e, t, r) {
            if (e instanceof IDBTransaction) {
                if ("done" === t) return F.get(e);
                if ("objectStoreNames" === t) return e.objectStoreNames || j.get(e);
                if ("store" === t) return r.objectStoreNames[1] ? void 0 : r.objectStore(r.objectStoreNames[0])
            }
            return W(e[t])
        },
        set(e, t, r) {
            return e[t] = r, !0
        },
        has(e, t) {
            return e instanceof IDBTransaction && ("done" === t || "store" === t) || t in e
        }
    };

    function x(n) {
        return n !== IDBDatabase.prototype.transaction || "objectStoreNames" in IDBTransaction.prototype ? (k = k || [IDBCursor.prototype.advance, IDBCursor.prototype.continue, IDBCursor.prototype.continuePrimaryKey]).includes(n) ? function (...e) {
            return n.apply(U(this), e), W(M.get(this))
        } : function (...e) {
            return W(n.apply(U(this), e))
        } : function (e, ...t) {
            var r = n.call(U(this), e, ...t);
            return j.set(r, e.sort ? e.sort() : [e]), W(r)
        }
    }

    function V(e) {
        return "function" == typeof e ? x(e) : (e instanceof IDBTransaction && (a = e, F.has(a) || (t = new Promise((e, t) => {
            const r = () => {
                    a.removeEventListener("complete", n), a.removeEventListener("error", i), a.removeEventListener("abort", i)
                },
                n = () => {
                    e(), r()
                },
                i = () => {
                    t(a.error || new DOMException("AbortError", "AbortError")), r()
                };
            a.addEventListener("complete", n), a.addEventListener("error", i), a.addEventListener("abort", i)
        }), F.set(a, t))), R(e, P = P || [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]) ? new Proxy(e, H) : e);
        var a, t
    }

    function W(e) {
        if (e instanceof IDBRequest) return function (a) {
            const e = new Promise((e, t) => {
                const r = () => {
                        a.removeEventListener("success", n), a.removeEventListener("error", i)
                    },
                    n = () => {
                        e(W(a.result)), r()
                    },
                    i = () => {
                        t(a.error), r()
                    };
                a.addEventListener("success", n), a.addEventListener("error", i)
            });
            return e.then(e => {
                e instanceof IDBCursor && M.set(e, a)
            }).catch(() => {}), $.set(e, a), e
        }(e);
        if (z.has(e)) return z.get(e);
        var t = V(e);
        return t !== e && (z.set(e, t), $.set(t, e)), t
    }
    const U = e => $.get(e);
    const G = ["get", "getKey", "getAll", "getAllKeys", "count"],
        J = ["put", "add", "delete", "clear"],
        K = new Map;

    function Y(e, t) {
        if (e instanceof IDBDatabase && !(t in e) && "string" == typeof t) {
            if (K.get(t)) return K.get(t);
            const i = t.replace(/FromIndex$/, ""),
                a = t !== i,
                s = J.includes(i);
            if (i in (a ? IDBIndex : IDBObjectStore).prototype && (s || G.includes(i))) {
                var r = async function (e, ...t) {
                    var r = this.transaction(e, s ? "readwrite" : "readonly");
                    let n = r.store;
                    return a && (n = n.index(t.shift())), (await Promise.all([n[i](...t), s && r.done]))[0]
                };
                return K.set(t, r), r
            }
        }
    }
    H = {
        ...O = H,
        get: (e, t, r) => Y(e, t) || O.get(e, t, r),
        has: (e, t) => !!Y(e, t) || O.has(e, t)
    };
    class X {
        constructor(e) {
            this.container = e
        }
        getPlatformInfoString() {
            const e = this.container.getProviders();
            return e.map(e => {
                if ("VERSION" !== (null == (t = e.getComponent()) ? void 0 : t.type)) return null;
                var t, t = e.getImmediate();
                return `${t.library}/${t.version}`
            }).filter(e => e).join(" ")
        }
    }
    const q = "@firebase/app",
        Z = "0.10.15",
        Q = new T("@firebase/app");
    var ee;
    const te = "[DEFAULT]",
        re = {
            "@firebase/app": "fire-core",
            "@firebase/app-compat": "fire-core-compat",
            "@firebase/analytics": "fire-analytics",
            "@firebase/analytics-compat": "fire-analytics-compat",
            "@firebase/app-check": "fire-app-check",
            "@firebase/app-check-compat": "fire-app-check-compat",
            "@firebase/auth": "fire-auth",
            "@firebase/auth-compat": "fire-auth-compat",
            "@firebase/database": "fire-rtdb",
            "@firebase/data-connect": "fire-data-connect",
            "@firebase/database-compat": "fire-rtdb-compat",
            "@firebase/functions": "fire-fn",
            "@firebase/functions-compat": "fire-fn-compat",
            "@firebase/installations": "fire-iid",
            "@firebase/installations-compat": "fire-iid-compat",
            "@firebase/messaging": "fire-fcm",
            "@firebase/messaging-compat": "fire-fcm-compat",
            "@firebase/performance": "fire-perf",
            "@firebase/performance-compat": "fire-perf-compat",
            "@firebase/remote-config": "fire-rc",
            "@firebase/remote-config-compat": "fire-rc-compat",
            "@firebase/storage": "fire-gcs",
            "@firebase/storage-compat": "fire-gcs-compat",
            "@firebase/firestore": "fire-fst",
            "@firebase/firestore-compat": "fire-fst-compat",
            "@firebase/vertexai": "fire-vertex",
            "fire-js": "fire-js",
            firebase: "fire-js-all"
        },
        ne = new Map,
        ie = new Map,
        ae = new Map;

    function se(t, r) {
        try {
            t.container.addComponent(r)
        } catch (e) {
            Q.debug(`Component ${r.name} failed to register with FirebaseApp ${t.name}`, e)
        }
    }

    function oe(e, t) {
        e.container.addOrOverwriteComponent(t)
    }

    function ce(e) {
        var t = e.name;
        if (ae.has(t)) return Q.debug(`There were multiple attempts to register component ${t}.`), !1;
        ae.set(t, e);
        for (const r of ne.values()) se(r, e);
        for (const n of ie.values()) se(n, e);
        return !0
    }

    function le(e, t) {
        const r = e.container.getProvider("heartbeat").getImmediate({
            optional: !0
        });
        return r && r.triggerHeartbeat(), e.container.getProvider(t)
    }

    function he(e) {
        return void 0 !== e.options
    }
    const de = new u("app", "Firebase", {
        "no-app": "No Firebase App '{$appName}' has been created - call initializeApp() first",
        "bad-app-name": "Illegal App name: '{$appName}'",
        "duplicate-app": "Firebase App named '{$appName}' already exists with different options or config",
        "app-deleted": "Firebase App named '{$appName}' already deleted",
        "server-app-deleted": "Firebase Server App has been deleted",
        "no-options": "Need to provide options, when not being deployed to hosting via source.",
        "invalid-app-argument": "firebase.{$appName}() takes either no argument or a Firebase App instance.",
        "invalid-log-argument": "First argument to `onLog` must be null or a function.",
        "idb-open": "Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",
        "idb-get": "Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",
        "idb-set": "Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",
        "idb-delete": "Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.",
        "finalization-registry-not-supported": "FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.",
        "invalid-server-app-environment": "FirebaseServerApp is not for use in browser environments."
    });
    class ue {
        constructor(e, t, r) {
            this._isDeleted = !1, this._options = Object.assign({}, e), this._config = Object.assign({}, t), this._name = t.name, this._automaticDataCollectionEnabled = t.automaticDataCollectionEnabled, this._container = r, this.container.addComponent(new y("app", () => this, "PUBLIC"))
        }
        get automaticDataCollectionEnabled() {
            return this.checkDestroyed(), this._automaticDataCollectionEnabled
        }
        set automaticDataCollectionEnabled(e) {
            this.checkDestroyed(), this._automaticDataCollectionEnabled = e
        }
        get name() {
            return this.checkDestroyed(), this._name
        }
        get options() {
            return this.checkDestroyed(), this._options
        }
        get config() {
            return this.checkDestroyed(), this._config
        }
        get container() {
            return this._container
        }
        get isDeleted() {
            return this._isDeleted
        }
        set isDeleted(e) {
            this._isDeleted = e
        }
        checkDestroyed() {
            if (this.isDeleted) throw de.create("app-deleted", {
                appName: this._name
            })
        }
    }
    class pe extends ue {
        constructor(e, t, r, n) {
            var i = void 0 !== t.automaticDataCollectionEnabled && t.automaticDataCollectionEnabled,
                a = {
                    name: r,
                    automaticDataCollectionEnabled: i
                };
            void 0 !== e.apiKey ? super(e, a, n) : super(e.options, a, n), this._serverConfig = Object.assign({
                automaticDataCollectionEnabled: i
            }, t), this._finalizationRegistry = null, "undefined" != typeof FinalizationRegistry && (this._finalizationRegistry = new FinalizationRegistry(() => {
                this.automaticCleanup()
            })), this._refCount = 0, this.incRefCount(this._serverConfig.releaseOnDeref), this._serverConfig.releaseOnDeref = void 0, t.releaseOnDeref = void 0, me(q, Z, "serverapp")
        }
        toJSON() {}
        get refCount() {
            return this._refCount
        }
        incRefCount(e) {
            this.isDeleted || (this._refCount++, void 0 !== e && null !== this._finalizationRegistry && this._finalizationRegistry.register(e, this))
        }
        decRefCount() {
            return this.isDeleted ? 0 : --this._refCount
        }
        automaticCleanup() {
            be(this)
        }
        get settings() {
            return this.checkDestroyed(), this._serverConfig
        }
        checkDestroyed() {
            if (this.isDeleted) throw de.create("server-app-deleted")
        }
    }
    const fe = "11.0.1";

    function ge(e, t = {}) {
        let r = e;
        if ("object" != typeof t) {
            const i = t;
            t = {
                name: i
            }
        }
        var n = Object.assign({
            name: te,
            automaticDataCollectionEnabled: !1
        }, t);
        const i = n.name;
        if ("string" != typeof i || !i) throw de.create("bad-app-name", {
            appName: String(i)
        });
        if (r = r || h(), !r) throw de.create("no-options");
        var a = ne.get(i);
        if (a) {
            if (g(r, a.options) && g(n, a.config)) return a;
            throw de.create("duplicate-app", {
                appName: i
            })
        }
        const s = new C(i);
        for (const o of ae.values()) s.addComponent(o);
        n = new ue(r, n, s);
        return ne.set(i, n), n
    }
    async function be(e) {
        let t = !1;
        var r = e.name;
        if (ne.has(r)) t = !0, ne.delete(r);
        else if (ie.has(r)) {
            const n = e;
            n.decRefCount() <= 0 && (ie.delete(r), t = !0)
        }
        t && (await Promise.all(e.container.getProviders().map(e => e.delete())), e.isDeleted = !0)
    }

    function me(e, t, r) {
        let n = null !== (a = re[e]) && void 0 !== a ? a : e;
        r && (n += `-${r}`);
        var i = n.match(/\s|\//),
            a = t.match(/\s|\//);
        if (i || a) {
            const s = [`Unable to register library "${n}" with version "${t}":`];
            return i && s.push(`library name "${n}" contains illegal characters (whitespace or "/")`), i && a && s.push("and"), a && s.push(`version name "${t}" contains illegal characters (whitespace or "/")`), void Q.warn(s.join(" "))
        }
        ce(new y(`${n}-version`, () => ({
            library: n,
            version: t
        }), "VERSION"))
    }

    function ve(e, t) {
        if (null !== e && "function" != typeof e) throw de.create("invalid-log-argument");
        ! function (a, e) {
            for (const t of D) {
                let i = null;
                e && e.level && (i = A[e.level]), t.userLogHandler = null === a ? null : (e, t, ...r) => {
                    var n = r.map(e => {
                        if (null == e) return null;
                        if ("string" == typeof e) return e;
                        if ("number" == typeof e || "boolean" == typeof e) return e.toString();
                        if (e instanceof Error) return e.message;
                        try {
                            return JSON.stringify(e)
                        } catch (e) {
                            return null
                        }
                    }).filter(e => e).join(" ");
                    t >= (null !== i && void 0 !== i ? i : e.logLevel) && a({
                        level: I[t].toLowerCase(),
                        message: n,
                        args: r,
                        type: e.name
                    })
                }
            }
        }(e, t)
    }

    function _e(e) {
        var t;
        t = e, D.forEach(e => {
            e.setLogLevel(t)
        })
    }
    const ye = "firebase-heartbeat-database",
        Ee = 1,
        we = "firebase-heartbeat-store";
    let Ce = null;

    function De() {
        return Ce = Ce || function (e, t, {
            blocked: r,
            upgrade: n,
            blocking: i,
            terminated: a
        }) {
            const s = indexedDB.open(e, t),
                o = W(s);
            return n && s.addEventListener("upgradeneeded", e => {
                n(W(s.result), e.oldVersion, e.newVersion, W(s.transaction), e)
            }), r && s.addEventListener("blocked", e => r(e.oldVersion, e.newVersion, e)), o.then(e => {
                a && e.addEventListener("close", () => a()), i && e.addEventListener("versionchange", e => i(e.oldVersion, e.newVersion, e))
            }).catch(() => {}), o
        }(ye, Ee, {
            upgrade: (e, t) => {
                if (0 === t) try {
                    e.createObjectStore(we)
                } catch (e) {
                    console.warn(e)
                }
            }
        }).catch(e => {
            throw de.create("idb-open", {
                originalErrorMessage: e.message
            })
        }), Ce
    }
    async function Ie(e, t) {
        try {
            const n = await De(),
                i = n.transaction(we, "readwrite"),
                a = i.objectStore(we);
            await a.put(t, Se(e)), await i.done
        } catch (e) {
            var r;
            e instanceof o ? Q.warn(e.message) : (r = de.create("idb-set", {
                originalErrorMessage: null == e ? void 0 : e.message
            }), Q.warn(r.message))
        }
    }

    function Se(e) {
        return `${e.name}!${e.options.appId}`
    }
    class Oe {
        constructor(e) {
            this.container = e, this._heartbeatsCache = null;
            var t = this.container.getProvider("app").getImmediate();
            this._storage = new Le(t), this._heartbeatsCachePromise = this._storage.read().then(e => this._heartbeatsCache = e)
        }
        async triggerHeartbeat() {
            var e, t;
            try {
                const n = this.container.getProvider("platform-logger").getImmediate();
                var r = n.getPlatformInfoString();
                const i = Ae();
                return null == (null === (e = this._heartbeatsCache) || void 0 === e ? void 0 : e.heartbeats) && (this._heartbeatsCache = await this._heartbeatsCachePromise, null == (null === (t = this._heartbeatsCache) || void 0 === t ? void 0 : t.heartbeats)) ? void 0 : this._heartbeatsCache.lastSentHeartbeatDate === i || this._heartbeatsCache.heartbeats.some(e => e.date === i) ? void 0 : (this._heartbeatsCache.heartbeats.push({
                    date: i,
                    agent: r
                }), this._heartbeatsCache.heartbeats = this._heartbeatsCache.heartbeats.filter(e => {
                    var t = new Date(e.date).valueOf();
                    return Date.now() - t <= 2592e6
                }), this._storage.overwrite(this._heartbeatsCache))
            } catch (e) {
                Q.warn(e)
            }
        }
        async getHeartbeatsHeader() {
            var e;
            try {
                if (null === this._heartbeatsCache && await this._heartbeatsCachePromise, null == (null === (e = this._heartbeatsCache) || void 0 === e ? void 0 : e.heartbeats) || 0 === this._heartbeatsCache.heartbeats.length) return "";
                var t = Ae(),
                    {
                        heartbeatsToSend: r,
                        unsentEntries: n
                    } = function (e, t = 1024) {
                        const r = [];
                        let n = e.slice();
                        for (const i of e) {
                            const a = r.find(e => e.agent === i.agent);
                            if (a) {
                                if (a.dates.push(i.date), Ne(r) > t) {
                                    a.dates.pop();
                                    break
                                }
                            } else if (r.push({
                                    agent: i.agent,
                                    dates: [i.date]
                                }), Ne(r) > t) {
                                r.pop();
                                break
                            }
                            n = n.slice(1)
                        }
                        return {
                            heartbeatsToSend: r,
                            unsentEntries: n
                        }
                    }(this._heartbeatsCache.heartbeats),
                    i = a(JSON.stringify({
                        version: 2,
                        heartbeats: r
                    }));
                return this._heartbeatsCache.lastSentHeartbeatDate = t, 0 < n.length ? (this._heartbeatsCache.heartbeats = n, await this._storage.overwrite(this._heartbeatsCache)) : (this._heartbeatsCache.heartbeats = [], this._storage.overwrite(this._heartbeatsCache)), i
            } catch (e) {
                return Q.warn(e), ""
            }
        }
    }

    function Ae() {
        const e = new Date;
        return e.toISOString().substring(0, 10)
    }
    class Le {
        constructor(e) {
            this.app = e, this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck()
        }
        async runIndexedDBEnvironmentCheck() {
            return !! function () {
                try {
                    return "object" == typeof indexedDB
                } catch (e) {
                    return
                }
            }() && new Promise((t, r) => {
                try {
                    let e = !0;
                    const n = "validate-browser-context-for-indexeddb-analytics-module",
                        i = self.indexedDB.open(n);
                    i.onsuccess = () => {
                        i.result.close(), e || self.indexedDB.deleteDatabase(n), t(!0)
                    }, i.onupgradeneeded = () => {
                        e = !1
                    }, i.onerror = () => {
                        var e;
                        r((null === (e = i.error) || void 0 === e ? void 0 : e.message) || "")
                    }
                } catch (e) {
                    r(e)
                }
            }).then(() => !0).catch(() => !1)
        }
        async read() {
            if (await this._canUseIndexedDBPromise) {
                var e = await async function (e) {
                    try {
                        const r = await De(),
                            n = r.transaction(we);
                        var t = await n.objectStore(we).get(Se(e));
                        return await n.done, t
                    } catch (e) {
                        e instanceof o ? Q.warn(e.message) : (t = de.create("idb-get", {
                            originalErrorMessage: null == e ? void 0 : e.message
                        }), Q.warn(t.message))
                    }
                }(this.app);
                return null != e && e.heartbeats ? e : {
                    heartbeats: []
                }
            }
            return {
                heartbeats: []
            }
        }
        async overwrite(e) {
            var t;
            if (await this._canUseIndexedDBPromise) {
                var r = await this.read();
                return Ie(this.app, {
                    lastSentHeartbeatDate: null !== (t = e.lastSentHeartbeatDate) && void 0 !== t ? t : r.lastSentHeartbeatDate,
                    heartbeats: e.heartbeats
                })
            }
        }
        async add(e) {
            var t;
            if (await this._canUseIndexedDBPromise) {
                var r = await this.read();
                return Ie(this.app, {
                    lastSentHeartbeatDate: null !== (t = e.lastSentHeartbeatDate) && void 0 !== t ? t : r.lastSentHeartbeatDate,
                    heartbeats: [...r.heartbeats, ...e.heartbeats]
                })
            }
        }
    }

    function Ne(e) {
        return a(JSON.stringify({
            version: 2,
            heartbeats: e
        })).length
    }
    ee = "", ce(new y("platform-logger", e => new X(e), "PRIVATE")), ce(new y("heartbeat", e => new Oe(e), "PRIVATE")), me(q, Z, ee), me(q, Z, "esm2017"), me("fire-js", "");
    var Be = Object.freeze({
        __proto__: null,
        SDK_VERSION: fe,
        _DEFAULT_ENTRY_NAME: te,
        _addComponent: se,
        _addOrOverwriteComponent: oe,
        _apps: ne,
        _clearComponents: function () {
            ae.clear()
        },
        _components: ae,
        _getProvider: le,
        _isFirebaseApp: he,
        _isFirebaseServerApp: function (e) {
            return void 0 !== e.settings
        },
        _registerComponent: ce,
        _removeServiceInstance: function (e, t, r = te) {
            le(e, t).clearInstance(r)
        },
        _serverApps: ie,
        deleteApp: be,
        getApp: function (e = te) {
            var t = ne.get(e);
            if (!t && e === te && h()) return ge();
            if (!t) throw de.create("no-app", {
                appName: e
            });
            return t
        },
        getApps: function () {
            return Array.from(ne.values())
        },
        initializeApp: ge,
        initializeServerApp: function (e, t) {
            if (("undefined" != typeof window || d()) && !d()) throw de.create("invalid-server-app-environment");
            void 0 === t.automaticDataCollectionEnabled && (t.automaticDataCollectionEnabled = !1);
            let r;
            r = he(e) ? e.options : e;
            const n = Object.assign(Object.assign({}, t), r);
            if (void 0 !== n.releaseOnDeref && delete n.releaseOnDeref, void 0 !== t.releaseOnDeref && "undefined" == typeof FinalizationRegistry) throw de.create("finalization-registry-not-supported", {});
            var i = "" + [...JSON.stringify(n)].reduce((e, t) => Math.imul(31, e) + t.charCodeAt(0) | 0, 0);
            const a = ie.get(i);
            if (a) return a.incRefCount(t.releaseOnDeref), a;
            const s = new C(i);
            for (const c of ae.values()) s.addComponent(c);
            var o = new pe(r, t, i, s);
            return ie.set(i, o), o
        },
        onLog: ve,
        registerVersion: me,
        setLogLevel: _e,
        FirebaseError: o
    });
    class Te {
        constructor(e, t) {
            this._delegate = e, this.firebase = t, se(e, new y("app-compat", () => this, "PUBLIC")), this.container = e.container
        }
        get automaticDataCollectionEnabled() {
            return this._delegate.automaticDataCollectionEnabled
        }
        set automaticDataCollectionEnabled(e) {
            this._delegate.automaticDataCollectionEnabled = e
        }
        get name() {
            return this._delegate.name
        }
        get options() {
            return this._delegate.options
        }
        delete() {
            return new Promise(e => {
                this._delegate.checkDestroyed(), e()
            }).then(() => (this.firebase.INTERNAL.removeApp(this.name), be(this._delegate)))
        }
        _getService(e, t = te) {
            var r;
            this._delegate.checkDestroyed();
            const n = this._delegate.container.getProvider(e);
            return n.isInitialized() || "EXPLICIT" !== (null === (r = n.getComponent()) || void 0 === r ? void 0 : r.instantiationMode) || n.initialize(), n.getImmediate({
                identifier: t
            })
        }
        _removeServiceInstance(e, t = te) {
            this._delegate.container.getProvider(e).clearInstance(t)
        }
        _addComponent(e) {
            se(this._delegate, e)
        }
        _addOrOverwriteComponent(e) {
            oe(this._delegate, e)
        }
        toJSON() {
            return {
                name: this.name,
                automaticDataCollectionEnabled: this.automaticDataCollectionEnabled,
                options: this.options
            }
        }
    }
    const Re = new u("app-compat", "Firebase", {
        "no-app": "No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",
        "invalid-app-argument": "firebase.{$appName}() takes either no argument or a Firebase App instance."
    });

    function Pe(i) {
        const a = {},
            s = {
                __esModule: !0,
                initializeApp: function (e, t = {}) {
                    var r = ge(e, t);
                    if (f(a, r.name)) return a[r.name];
                    var n = new i(r, s);
                    return a[r.name] = n
                },
                app: o,
                registerVersion: me,
                setLogLevel: _e,
                onLog: ve,
                apps: null,
                SDK_VERSION: fe,
                INTERNAL: {
                    registerComponent: function (r) {
                        const n = r.name,
                            t = n.replace("-compat", ""); {
                            var e;
                            ce(r) && "PUBLIC" === r.type && (e = (e = o()) => {
                                if ("function" != typeof e[t]) throw Re.create("invalid-app-argument", {
                                    appName: n
                                });
                                return e[t]()
                            }, void 0 !== r.serviceProps && c(e, r.serviceProps), s[t] = e, i.prototype[t] = function (...e) {
                                const t = this._getService.bind(this, n);
                                return t.apply(this, r.multipleInstances ? e : [])
                            })
                        }
                        return "PUBLIC" === r.type ? s[t] : null
                    },
                    removeApp: function (e) {
                        delete a[e]
                    },
                    useAsService: function (e, t) {
                        if ("serverAuth" === t) return null;
                        var r = t;
                        return r
                    },
                    modularAPIs: Be
                }
            };

        function o(e) {
            if (e = e || te, !f(a, e)) throw Re.create("no-app", {
                appName: e
            });
            return a[e]
        }
        return s.default = s, Object.defineProperty(s, "apps", {
            get: function () {
                return Object.keys(a).map(e => a[e])
            }
        }), o.App = i, s
    }
    var ke = function e() {
        const t = Pe(Te);
        return t.INTERNAL = Object.assign(Object.assign({}, t.INTERNAL), {
            createFirebaseNamespace: e,
            extendNamespace: function (e) {
                c(t, e)
            },
            createSubscribe: m,
            ErrorFactory: u,
            deepExtend: c
        }), t
    }();
    const Me = new T("@firebase/app-compat");
    try {
        var Fe = e();
        if (void 0 !== Fe.firebase) {
            Me.warn(`
      Warning: Firebase is already defined in the global scope. Please make sure
      Firebase library is only loaded once.
    `);
            const ze = Fe.firebase.SDK_VERSION;
            ze && 0 <= ze.indexOf("LITE") && Me.warn(`
        Warning: You are trying to load Firebase while using Firebase Performance standalone script.
        You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.
        `)
        }
    } catch (e) {}
    const je = ke;
    me("@firebase/app-compat", "0.2.45", void 0);
    return je.registerVersion("firebase", "11.0.1", "app-compat-cdn"), je
});
//# sourceMappingURL=firebase-app-compat.js.map