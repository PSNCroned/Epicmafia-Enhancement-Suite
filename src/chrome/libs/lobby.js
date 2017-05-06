console.log("NEW LOBBY.JS");
(function UMDish(name, context, definition) {
    context[name] = definition.call(context);
    if (typeof module !== "undefined" && module.exports) {
        module.exports = context[name]
    } else if (typeof define === "function" && define.amd) {
        define(function reference() {
            return context[name]
        })
    }
})("Primus", this, function wrapper() {
    var define, module, exports, Primus = function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;
                    if (!u && a)
                        return a(o, !0);
                    if (i)
                        return i(o, !0);
                    var f = new Error("Cannot find module '" + o + "'");
                    throw f.code = "MODULE_NOT_FOUND",
                    f
                }
                var l = n[o] = {
                    exports: {}
                };
                t[o][0].call(l.exports, function(e) {
                    var n = t[o][1][e];
                    return s(n ? n : e)
                }, l, l.exports, e, t, n, r)
            }
            return n[o].exports
        }
        var i = typeof require == "function" && require;
        for (var o = 0; o < r.length; o++)
            s(r[o]);
        return s
    }({
        1: [function(_dereq_, module, exports) {
            "use strict";
            module.exports = function demolish(keys, options) {
                var split = /[, ]+/;
                options = options || {};
                keys = keys || [];
                if ("string" === typeof keys)
                    keys = keys.split(split);
                function run(key, selfie) {
                    if (!options[key])
                        return;
                    if ("string" === typeof options[key])
                        options[key] = options[key].split(split);
                    if ("function" === typeof options[key])
                        return options[key].call(selfie);
                    for (var i = 0, type, what; i < options[key].length; i++) {
                        what = options[key][i];
                        type = typeof what;
                        if ("function" === type) {
                            what.call(selfie)
                        } else if ("string" === type && "function" === typeof selfie[what]) {
                            selfie[what]()
                        }
                    }
                }
                return function destroy() {
                    var selfie = this, i = 0, prop;
                    if (selfie[keys[0]] === null)
                        return false;
                    run("before", selfie);
                    for (; i < keys.length; i++) {
                        prop = keys[i];
                        if (selfie[prop]) {
                            if ("function" === typeof selfie[prop].destroy)
                                selfie[prop].destroy();
                            selfie[prop] = null
                        }
                    }
                    if (selfie.emit)
                        selfie.emit("destroy");
                    run("after", selfie);
                    return true
                }
            }
        }
        , {}],
        2: [function(_dereq_, module, exports) {
            "use strict";
            module.exports = function emits() {
                var self = this, parser;
                for (var i = 0, l = arguments.length, args = new Array(l); i < l; i++) {
                    args[i] = arguments[i]
                }
                if ("function" !== typeof args[args.length - 1])
                    return function emitter() {
                        for (var i = 0, l = arguments.length, arg = new Array(l); i < l; i++) {
                            arg[i] = arguments[i]
                        }
                        return self.emit.apply(self, args.concat(arg))
                    }
                    ;
                parser = args.pop();
                return function emitter() {
                    for (var i = 0, l = arguments.length, arg = new Array(l + 1); i < l; i++) {
                        arg[i + 1] = arguments[i]
                    }
                    arg[0] = function next(err, returned) {
                        if (err)
                            return self.emit("error", err);
                        arg = returned === undefined ? arg.slice(1) : returned === null ? [] : returned;
                        self.emit.apply(self, args.concat(arg))
                    }
                    ;
                    parser.apply(self, arg);
                    return true
                }
            }
        }
        , {}],
        3: [function(_dereq_, module, exports) {
            "use strict";
            var prefix = typeof Object.create !== "function" ? "~" : false;
            function EE(fn, context, once) {
                this.fn = fn;
                this.context = context;
                this.once = once || false
            }
            function EventEmitter() {}
            EventEmitter.prototype._events = undefined;
            EventEmitter.prototype.listeners = function listeners(event, exists) {
                var evt = prefix ? prefix + event : event
                  , available = this._events && this._events[evt];
                if (exists)
                    return !!available;
                if (!available)
                    return [];
                if (available.fn)
                    return [available.fn];
                for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
                    ee[i] = available[i].fn
                }
                return ee
            }
            ;
            EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
                var evt = prefix ? prefix + event : event;
                if (!this._events || !this._events[evt])
                    return false;
                var listeners = this._events[evt], len = arguments.length, args, i;
                if ("function" === typeof listeners.fn) {
                    if (listeners.once)
                        this.removeListener(event, listeners.fn, undefined, true);
                    switch (len) {
                    case 1:
                        return listeners.fn.call(listeners.context),
                        true;
                    case 2:
                        return listeners.fn.call(listeners.context, a1),
                        true;
                    case 3:
                        return listeners.fn.call(listeners.context, a1, a2),
                        true;
                    case 4:
                        return listeners.fn.call(listeners.context, a1, a2, a3),
                        true;
                    case 5:
                        return listeners.fn.call(listeners.context, a1, a2, a3, a4),
                        true;
                    case 6:
                        return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5),
                        true
                    }
                    for (i = 1,
                    args = new Array(len - 1); i < len; i++) {
                        args[i - 1] = arguments[i]
                    }
                    listeners.fn.apply(listeners.context, args)
                } else {
                    var length = listeners.length, j;
                    for (i = 0; i < length; i++) {
                        if (listeners[i].once)
                            this.removeListener(event, listeners[i].fn, undefined, true);
                        switch (len) {
                        case 1:
                            listeners[i].fn.call(listeners[i].context);
                            break;
                        case 2:
                            listeners[i].fn.call(listeners[i].context, a1);
                            break;
                        case 3:
                            listeners[i].fn.call(listeners[i].context, a1, a2);
                            break;
                        default:
                            if (!args)
                                for (j = 1,
                                args = new Array(len - 1); j < len; j++) {
                                    args[j - 1] = arguments[j]
                                }
                            listeners[i].fn.apply(listeners[i].context, args)
                        }
                    }
                }
                return true
            }
            ;
            EventEmitter.prototype.on = function on(event, fn, context) {
                var listener = new EE(fn,context || this)
                  , evt = prefix ? prefix + event : event;
                if (!this._events)
                    this._events = prefix ? {} : Object.create(null);
                if (!this._events[evt])
                    this._events[evt] = listener;
                else {
                    if (!this._events[evt].fn)
                        this._events[evt].push(listener);
                    else
                        this._events[evt] = [this._events[evt], listener]
                }
                return this
            }
            ;
            EventEmitter.prototype.once = function once(event, fn, context) {
                var listener = new EE(fn,context || this,true)
                  , evt = prefix ? prefix + event : event;
                if (!this._events)
                    this._events = prefix ? {} : Object.create(null);
                if (!this._events[evt])
                    this._events[evt] = listener;
                else {
                    if (!this._events[evt].fn)
                        this._events[evt].push(listener);
                    else
                        this._events[evt] = [this._events[evt], listener]
                }
                return this
            }
            ;
            EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
                var evt = prefix ? prefix + event : event;
                if (!this._events || !this._events[evt])
                    return this;
                var listeners = this._events[evt]
                  , events = [];
                if (fn) {
                    if (listeners.fn) {
                        if (listeners.fn !== fn || once && !listeners.once || context && listeners.context !== context) {
                            events.push(listeners)
                        }
                    } else {
                        for (var i = 0, length = listeners.length; i < length; i++) {
                            if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
                                events.push(listeners[i])
                            }
                        }
                    }
                }
                if (events.length) {
                    this._events[evt] = events.length === 1 ? events[0] : events
                } else {
                    delete this._events[evt]
                }
                return this
            }
            ;
            EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
                if (!this._events)
                    return this;
                if (event)
                    delete this._events[prefix ? prefix + event : event];
                else
                    this._events = prefix ? {} : Object.create(null);
                return this
            }
            ;
            EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
            EventEmitter.prototype.addListener = EventEmitter.prototype.on;
            EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
                return this
            }
            ;
            EventEmitter.prefixed = prefix;
            if ("undefined" !== typeof module) {
                module.exports = EventEmitter
            }
        }
        , {}],
        4: [function(_dereq_, module, exports) {
            "use strict";
            var regex = new RegExp("^((?:\\d+)?\\.?\\d+) *(" + ["milliseconds?", "msecs?", "ms", "seconds?", "secs?", "s", "minutes?", "mins?", "m", "hours?", "hrs?", "h", "days?", "d", "weeks?", "wks?", "w", "years?", "yrs?", "y"].join("|") + ")?$","i");
            var second = 1e3
              , minute = second * 60
              , hour = minute * 60
              , day = hour * 24
              , week = day * 7
              , year = day * 365;
            module.exports = function millisecond(ms) {
                var type = typeof ms, amount, match;
                if ("number" === type)
                    return ms;
                else if ("string" !== type || "0" === ms || !ms)
                    return 0;
                else if (+ms)
                    return +ms;
                if (ms.length > 1e4 || !(match = regex.exec(ms)))
                    return 0;
                amount = parseFloat(match[1]);
                switch (match[2].toLowerCase()) {
                case "years":
                case "year":
                case "yrs":
                case "yr":
                case "y":
                    return amount * year;
                case "weeks":
                case "week":
                case "wks":
                case "wk":
                case "w":
                    return amount * week;
                case "days":
                case "day":
                case "d":
                    return amount * day;
                case "hours":
                case "hour":
                case "hrs":
                case "hr":
                case "h":
                    return amount * hour;
                case "minutes":
                case "minute":
                case "mins":
                case "min":
                case "m":
                    return amount * minute;
                case "seconds":
                case "second":
                case "secs":
                case "sec":
                case "s":
                    return amount * second;
                default:
                    return amount
                }
            }
        }
        , {}],
        5: [function(_dereq_, module, exports) {
            "use strict";
            module.exports = function one(fn) {
                var called = 0, value;
                function onetime() {
                    if (called)
                        return value;
                    called = 1;
                    value = fn.apply(this, arguments);
                    fn = null;
                    return value
                }
                onetime.displayName = fn.displayName || fn.name || onetime.displayName || onetime.name;
                return onetime
            }
        }
        , {}],
        6: [function(_dereq_, module, exports) {
            "use strict";
            var has = Object.prototype.hasOwnProperty;
            function querystring(query) {
                var parser = /([^=?&]+)=([^&]*)/g, result = {}, part;
                for (; part = parser.exec(query); result[decodeURIComponent(part[1])] = decodeURIComponent(part[2]))
                    ;
                return result
            }
            function querystringify(obj, prefix) {
                prefix = prefix || "";
                var pairs = [];
                if ("string" !== typeof prefix)
                    prefix = "?";
                for (var key in obj) {
                    if (has.call(obj, key)) {
                        pairs.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]))
                    }
                }
                return pairs.length ? prefix + pairs.join("&") : ""
            }
            exports.stringify = querystringify;
            exports.parse = querystring
        }
        , {}],
        7: [function(_dereq_, module, exports) {
            "use strict";
            var EventEmitter = _dereq_("eventemitter3")
              , millisecond = _dereq_("millisecond")
              , destroy = _dereq_("demolish")
              , Tick = _dereq_("tick-tock")
              , one = _dereq_("one-time");
            function defaults(name, selfie, opts) {
                return millisecond(name in opts ? opts[name] : name in selfie ? selfie[name] : Recovery[name])
            }
            function Recovery(options) {
                var recovery = this;
                if (!(recovery instanceof Recovery))
                    return new Recovery(options);
                options = options || {};
                recovery.attempt = null;
                recovery._fn = null;
                recovery["reconnect timeout"] = defaults("reconnect timeout", recovery, options);
                recovery.retries = defaults("retries", recovery, options);
                recovery.factor = defaults("factor", recovery, options);
                recovery.max = defaults("max", recovery, options);
                recovery.min = defaults("min", recovery, options);
                recovery.timers = new Tick(recovery)
            }
            Recovery.prototype = new EventEmitter;
            Recovery.prototype.constructor = Recovery;
            Recovery["reconnect timeout"] = "30 seconds";
            Recovery.max = Infinity;
            Recovery.min = "500 ms";
            Recovery.retries = 10;
            Recovery.factor = 2;
            Recovery.prototype.reconnect = function reconnect() {
                var recovery = this;
                return recovery.backoff(function backedoff(err, opts) {
                    opts.duration = +new Date - opts.start;
                    if (err)
                        return recovery.emit("reconnect failed", err, opts);
                    recovery.emit("reconnected", opts)
                }, recovery.attempt)
            }
            ;
            Recovery.prototype.backoff = function backoff(fn, opts) {
                var recovery = this;
                opts = opts || recovery.attempt || {};
                if (opts.backoff)
                    return recovery;
                opts["reconnect timeout"] = defaults("reconnect timeout", recovery, opts);
                opts.retries = defaults("retries", recovery, opts);
                opts.factor = defaults("factor", recovery, opts);
                opts.max = defaults("max", recovery, opts);
                opts.min = defaults("min", recovery, opts);
                opts.start = +opts.start || +new Date;
                opts.duration = +opts.duration || 0;
                opts.attempt = +opts.attempt || 0;
                if (opts.attempt === opts.retries) {
                    fn.call(recovery, new Error("Unable to recover"), opts);
                    return recovery
                }
                opts.backoff = true;
                opts.attempt++;
                recovery.attempt = opts;
                opts.scheduled = opts.attempt !== 1 ? Math.min(Math.round((Math.random() + 1) * opts.min * Math.pow(opts.factor, opts.attempt - 1)), opts.max) : opts.min;
                recovery.timers.setTimeout("reconnect", function delay() {
                    opts.duration = +new Date - opts.start;
                    opts.backoff = false;
                    recovery.timers.clear("reconnect, timeout");
                    var connect = recovery._fn = one(function connect(err) {
                        recovery.reset();
                        if (err)
                            return recovery.backoff(fn, opts);
                        fn.call(recovery, undefined, opts)
                    });
                    recovery.emit("reconnect", opts, connect);
                    recovery.timers.setTimeout("timeout", function timeout() {
                        var err = new Error("Failed to reconnect in a timely manner");
                        opts.duration = +new Date - opts.start;
                        recovery.emit("reconnect timeout", err, opts);
                        connect(err)
                    }, opts["reconnect timeout"])
                }, opts.scheduled);
                recovery.emit("reconnect scheduled", opts);
                return recovery
            }
            ;
            Recovery.prototype.reconnecting = function reconnecting() {
                return !!this.attempt
            }
            ;
            Recovery.prototype.reconnected = function reconnected(err) {
                if (this._fn)
                    this._fn(err);
                return this
            }
            ;
            Recovery.prototype.reset = function reset() {
                this._fn = this.attempt = null;
                this.timers.clear("reconnect, timeout");
                return this
            }
            ;
            Recovery.prototype.destroy = destroy("timers attempt _fn");
            module.exports = Recovery
        }
        , {
            demolish: 1,
            eventemitter3: 3,
            millisecond: 4,
            "one-time": 5,
            "tick-tock": 9
        }],
        8: [function(_dereq_, module, exports) {
            "use strict";
            module.exports = function required(port, protocol) {
                protocol = protocol.split(":")[0];
                port = +port;
                if (!port)
                    return false;
                switch (protocol) {
                case "http":
                case "ws":
                    return port !== 80;
                case "https":
                case "wss":
                    return port !== 443;
                case "ftp":
                    return port !== 21;
                case "gopher":
                    return port !== 70;
                case "file":
                    return false
                }
                return port !== 0
            }
        }
        , {}],
        9: [function(_dereq_, module, exports) {
            "use strict";
            var has = Object.prototype.hasOwnProperty
              , ms = _dereq_("millisecond");
            function Timer(timer, clear, duration, fn) {
                this.start = +new Date;
                this.duration = duration;
                this.clear = clear;
                this.timer = timer;
                this.fns = [fn]
            }
            Timer.prototype.remaining = function remaining() {
                return this.duration - this.taken()
            }
            ;
            Timer.prototype.taken = function taken() {
                return +new Date - this.start
            }
            ;
            function unsetTimeout(id) {
                clearTimeout(id)
            }
            function unsetInterval(id) {
                clearInterval(id)
            }
            function unsetImmediate(id) {
                clearImmediate(id)
            }
            function Tick(context) {
                if (!(this instanceof Tick))
                    return new Tick(context);
                this.timers = {};
                this.context = context || this
            }
            Tick.prototype.tock = function ticktock(name, clear) {
                var tock = this;
                return function tickedtock() {
                    if (!(name in tock.timers))
                        return;
                    var timer = tock.timers[name]
                      , fns = timer.fns.slice()
                      , l = fns.length
                      , i = 0;
                    if (clear)
                        tock.clear(name);
                    else
                        tock.start = +new Date;
                    for (; i < l; i++) {
                        fns[i].call(tock.context)
                    }
                }
            }
            ;
            Tick.prototype.setTimeout = function timeout(name, fn, time) {
                var tick = this, tock;
                if (tick.timers[name]) {
                    tick.timers[name].fns.push(fn);
                    return tick
                }
                tock = ms(time);
                tick.timers[name] = new Timer(setTimeout(tick.tock(name, true), ms(time)),unsetTimeout,tock,fn);
                return tick
            }
            ;
            Tick.prototype.setInterval = function interval(name, fn, time) {
                var tick = this, tock;
                if (tick.timers[name]) {
                    tick.timers[name].fns.push(fn);
                    return tick
                }
                tock = ms(time);
                tick.timers[name] = new Timer(setInterval(tick.tock(name), ms(time)),unsetInterval,tock,fn);
                return tick
            }
            ;
            Tick.prototype.setImmediate = function immediate(name, fn) {
                var tick = this;
                if ("function" !== typeof setImmediate)
                    return tick.setTimeout(name, fn, 0);
                if (tick.timers[name]) {
                    tick.timers[name].fns.push(fn);
                    return tick
                }
                tick.timers[name] = new Timer(setImmediate(tick.tock(name, true)),unsetImmediate,0,fn);
                return tick
            }
            ;
            Tick.prototype.active = function active(name) {
                return name in this.timers
            }
            ;
            Tick.prototype.clear = function clear() {
                var args = arguments.length ? arguments : [], tick = this, timer, i, l;
                if (args.length === 1 && "string" === typeof args[0]) {
                    args = args[0].split(/[, ]+/)
                }
                if (!args.length) {
                    for (timer in tick.timers) {
                        if (has.call(tick.timers, timer))
                            args.push(timer)
                    }
                }
                for (i = 0,
                l = args.length; i < l; i++) {
                    timer = tick.timers[args[i]];
                    if (!timer)
                        continue;
                    timer.clear(timer.timer);
                    timer.fns = timer.timer = timer.clear = null;
                    delete tick.timers[args[i]]
                }
                return tick
            }
            ;
            Tick.prototype.adjust = function adjust(name, time) {
                var interval, tick = this, tock = ms(time), timer = tick.timers[name];
                if (!timer)
                    return tick;
                interval = timer.clear === unsetInterval;
                timer.clear(timer.timer);
                timer.start = +new Date;
                timer.duration = tock;
                timer.timer = (interval ? setInterval : setTimeout)(tick.tock(name, !interval), tock);
                return tick
            }
            ;
            Tick.prototype.end = Tick.prototype.destroy = function end() {
                if (!this.context)
                    return false;
                this.clear();
                this.context = this.timers = null;
                return true
            }
            ;
            Tick.Timer = Timer;
            module.exports = Tick
        }
        , {
            millisecond: 4
        }],
        10: [function(_dereq_, module, exports) {
            "use strict";
            var required = _dereq_("requires-port")
              , lolcation = _dereq_("./lolcation")
              , qs = _dereq_("querystringify")
              , relativere = /^\/(?!\/)/;
            var instructions = [["#", "hash"], ["?", "query"], ["//", "protocol", 2, 1, 1], ["/", "pathname"], ["@", "auth", 1], [NaN, "host", undefined, 1, 1], [/\:(\d+)$/, "port"], [NaN, "hostname", undefined, 1, 1]];
            function URL(address, location, parser) {
                if (!(this instanceof URL)) {
                    return new URL(address,location,parser)
                }
                var relative = relativere.test(address), parse, instruction, index, key, type = typeof location, url = this, i = 0;
                if ("object" !== type && "string" !== type) {
                    parser = location;
                    location = null
                }
                if (parser && "function" !== typeof parser) {
                    parser = qs.parse
                }
                location = lolcation(location);
                for (; i < instructions.length; i++) {
                    instruction = instructions[i];
                    parse = instruction[0];
                    key = instruction[1];
                    if (parse !== parse) {
                        url[key] = address
                    } else if ("string" === typeof parse) {
                        if (~(index = address.indexOf(parse))) {
                            if ("number" === typeof instruction[2]) {
                                url[key] = address.slice(0, index);
                                address = address.slice(index + instruction[2])
                            } else {
                                url[key] = address.slice(index);
                                address = address.slice(0, index)
                            }
                        }
                    } else if (index = parse.exec(address)) {
                        url[key] = index[1];
                        address = address.slice(0, address.length - index[0].length)
                    }
                    url[key] = url[key] || (instruction[3] || "port" === key && relative ? location[key] || "" : "");
                    if (instruction[4]) {
                        url[key] = url[key].toLowerCase()
                    }
                }
                if (parser)
                    url.query = parser(url.query);
                if (!required(url.port, url.protocol)) {
                    url.host = url.hostname;
                    url.port = ""
                }
                url.username = url.password = "";
                if (url.auth) {
                    instruction = url.auth.split(":");
                    url.username = instruction[0] || "";
                    url.password = instruction[1] || ""
                }
                url.href = url.toString()
            }
            URL.prototype.set = function set(part, value, fn) {
                var url = this;
                if ("query" === part) {
                    if ("string" === typeof value && value.length) {
                        value = (fn || qs.parse)(value)
                    }
                    url[part] = value
                } else if ("port" === part) {
                    url[part] = value;
                    if (!required(value, url.protocol)) {
                        url.host = url.hostname;
                        url[part] = ""
                    } else if (value) {
                        url.host = url.hostname + ":" + value
                    }
                } else if ("hostname" === part) {
                    url[part] = value;
                    if (url.port)
                        value += ":" + url.port;
                    url.host = value
                } else if ("host" === part) {
                    url[part] = value;
                    if (/\:\d+/.test(value)) {
                        value = value.split(":");
                        url.hostname = value[0];
                        url.port = value[1]
                    }
                } else {
                    url[part] = value
                }
                url.href = url.toString();
                return url
            }
            ;
            URL.prototype.toString = function toString(stringify) {
                if (!stringify || "function" !== typeof stringify)
                    stringify = qs.stringify;
                var query, url = this, result = url.protocol + "//";
                if (url.username) {
                    result += url.username;
                    if (url.password)
                        result += ":" + url.password;
                    result += "@"
                }
                result += url.hostname;
                if (url.port)
                    result += ":" + url.port;
                result += url.pathname;
                query = "object" === typeof url.query ? stringify(url.query) : url.query;
                if (query)
                    result += "?" !== query.charAt(0) ? "?" + query : query;
                if (url.hash)
                    result += url.hash;
                return result
            }
            ;
            URL.qs = qs;
            URL.location = lolcation;
            module.exports = URL
        }
        , {
            "./lolcation": 11,
            querystringify: 6,
            "requires-port": 8
        }],
        11: [function(_dereq_, module, exports) {
            (function(global) {
                "use strict";
                var ignore = {
                    hash: 1,
                    query: 1
                }, URL;
                module.exports = function lolcation(loc) {
                    loc = loc || global.location || {};
                    URL = URL || _dereq_("./");
                    var finaldestination = {}, type = typeof loc, key;
                    if ("blob:" === loc.protocol) {
                        finaldestination = new URL(unescape(loc.pathname),{})
                    } else if ("string" === type) {
                        finaldestination = new URL(loc,{});
                        for (key in ignore)
                            delete finaldestination[key]
                    } else if ("object" === type)
                        for (key in loc) {
                            if (key in ignore)
                                continue;
                            finaldestination[key] = loc[key]
                        }
                    return finaldestination
                }
            }
            ).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
        }
        , {
            "./": 10
        }],
        12: [function(_dereq_, module, exports) {
            "use strict";
            var alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), length = 64, map = {}, seed = 0, i = 0, prev;
            function encode(num) {
                var encoded = "";
                do {
                    encoded = alphabet[num % length] + encoded;
                    num = Math.floor(num / length)
                } while (num > 0);return encoded
            }
            function decode(str) {
                var decoded = 0;
                for (i = 0; i < str.length; i++) {
                    decoded = decoded * length + map[str.charAt(i)]
                }
                return decoded
            }
            function yeast() {
                var now = encode(+new Date);
                if (now !== prev)
                    return seed = 0,
                    prev = now;
                return now + "." + encode(seed++)
            }
            for (; i < length; i++)
                map[alphabet[i]] = i;
            yeast.encode = encode;
            yeast.decode = decode;
            module.exports = yeast
        }
        , {}],
        13: [function(_dereq_, module, exports) {
            "use strict";
            var EventEmitter = _dereq_("eventemitter3")
              , TickTock = _dereq_("tick-tock")
              , Recovery = _dereq_("recovery")
              , qs = _dereq_("querystringify")
              , destroy = _dereq_("demolish")
              , yeast = _dereq_("yeast")
              , u2028 = /\u2028/g
              , u2029 = /\u2029/g;
            function context(self, method) {
                if (self instanceof Primus)
                    return;
                var failure = new Error("Primus#" + method + "'s context should called with a Primus instance");
                if ("function" !== typeof self.listeners || !self.listeners("error").length) {
                    throw failure
                }
                self.emit("error", failure)
            }
            var defaultUrl;
            try {
                if (location.origin) {
                    defaultUrl = location.origin
                } else {
                    defaultUrl = location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "")
                }
            } catch (e) {
                defaultUrl = "http://127.0.0.1"
            }
            function Primus(url, options) {
                if (!(this instanceof Primus))
                    return new Primus(url,options);
                if ("function" !== typeof this.client) {
                    var message = "The client library has not been compiled correctly, " + "see https://github.com/primus/primus#client-library for more details";
                    return this.critical(new Error(message))
                }
                if ("object" === typeof url) {
                    options = url;
                    url = options.url || options.uri || defaultUrl
                } else {
                    options = options || {}
                }
                var primus = this;
                options.queueSize = "queueSize"in options ? options.queueSize : Infinity;
                options.timeout = "timeout"in options ? options.timeout : 1e4;
                options.reconnect = "reconnect"in options ? options.reconnect : {};
                options.ping = "ping"in options ? options.ping : 5e3;
                options.pong = "pong"in options ? options.pong : 1e4;
                options.strategy = "strategy"in options ? options.strategy : [];
                options.transport = "transport"in options ? options.transport : {};
                primus.buffer = [];
                primus.writable = true;
                primus.readable = true;
                primus.url = primus.parse(url || defaultUrl);
                primus.readyState = Primus.CLOSED;
                primus.options = options;
                primus.timers = new TickTock(this);
                primus.socket = null;
                primus.latency = 0;
                primus.disconnect = false;
                primus.transport = options.transport;
                primus.transformers = {
                    outgoing: [],
                    incoming: []
                };
                primus.recovery = new Recovery(options.reconnect);
                if ("string" === typeof options.strategy) {
                    options.strategy = options.strategy.split(/\s?\,\s?/g)
                }
                if (false === options.strategy) {
                    options.strategy = []
                } else if (!options.strategy.length) {
                    options.strategy.push("disconnect", "online");
                    if (!this.authorization)
                        options.strategy.push("timeout")
                }
                options.strategy = options.strategy.join(",").toLowerCase();
                if ("websockets"in options) {
                    primus.AVOID_WEBSOCKETS = !options.websockets
                }
                if ("network"in options) {
                    primus.NETWORK_EVENTS = options.network
                }
                if (!options.manual)
                    primus.timers.setTimeout("open", function open() {
                        primus.timers.clear("open");
                        primus.open()
                    }, 0);
                primus.initialise(options)
            }
            Primus.require = function requires(name) {
                if ("function" !== typeof _dereq_)
                    return undefined;
                return !("function" === typeof define && define.amd) ? _dereq_(name) : undefined
            }
            ;
            var Stream;
            try {
                Primus.Stream = Stream = Primus.require("stream");
                Primus.require("util").inherits(Primus, Stream)
            } catch (e) {
                Primus.Stream = EventEmitter;
                Primus.prototype = new EventEmitter
            }
            Primus.OPENING = 1;
            Primus.CLOSED = 2;
            Primus.OPEN = 3;
            Primus.prototype.AVOID_WEBSOCKETS = false;
            Primus.prototype.NETWORK_EVENTS = false;
            Primus.prototype.online = true;
            try {
                if (Primus.prototype.NETWORK_EVENTS = "onLine"in navigator && (window.addEventListener || document.body.attachEvent)) {
                    if (!navigator.onLine) {
                        Primus.prototype.online = false
                    }
                }
            } catch (e) {}
            Primus.prototype.ark = {};
            Primus.prototype.emits = _dereq_("emits");
            Primus.prototype.trigger = function trigger() {
                for (var i = 0, l = arguments.length, args = new Array(l); i < l; i++) {
                    args[i] = arguments[i]
                }
                if ("function" !== typeof args[l - 1])
                    args.push(function defer(next) {
                        setTimeout(next, 0)
                    });
                return this.emits.apply(this, args)
            }
            ;
            Primus.prototype.plugin = function plugin(name) {
                context(this, "plugin");
                if (name)
                    return this.ark[name];
                var plugins = {};
                for (name in this.ark) {
                    plugins[name] = this.ark[name]
                }
                return plugins
            }
            ;
            Primus.prototype.reserved = function reserved(evt) {
                return /^(incoming|outgoing)::/.test(evt) || evt in this.reserved.events
            }
            ;
            Primus.prototype.reserved.events = {
                "reconnect scheduled": 1,
                "reconnect timeout": 1,
                readyStateChange: 1,
                "reconnect failed": 1,
                reconnected: 1,
                reconnect: 1,
                offline: 1,
                timeout: 1,
                online: 1,
                error: 1,
                close: 1,
                open: 1,
                data: 1,
                end: 1
            };
            Primus.prototype.initialise = function initialise(options) {
                var primus = this, start;
                primus.recovery.on("reconnected", primus.emits("reconnected")).on("reconnect failed", primus.emits("reconnect failed", function failed(next) {
                    primus.emit("end");
                    next()
                })).on("reconnect timeout", primus.emits("reconnect timeout")).on("reconnect scheduled", primus.emits("reconnect scheduled")).on("reconnect", primus.emits("reconnect", function reconnect(next) {
                    primus.emit("outgoing::reconnect");
                    next()
                }));
                primus.on("outgoing::open", function opening() {
                    var readyState = primus.readyState;
                    primus.readyState = Primus.OPENING;
                    if (readyState !== primus.readyState) {
                        primus.emit("readyStateChange", "opening")
                    }
                    start = +new Date
                });
                primus.on("incoming::open", function opened() {
                    var readyState = primus.readyState;
                    if (primus.recovery.reconnecting()) {
                        primus.recovery.reconnected()
                    }
                    primus.writable = true;
                    primus.readable = true;
                    if (!primus.online) {
                        primus.online = true;
                        primus.emit("online")
                    }
                    primus.readyState = Primus.OPEN;
                    if (readyState !== primus.readyState) {
                        primus.emit("readyStateChange", "open")
                    }
                    primus.latency = +new Date - start;
                    primus.timers.clear("ping", "pong");
                    primus.heartbeat();
                    if (primus.buffer.length) {
                        var data = primus.buffer.slice()
                          , length = data.length
                          , i = 0;
                        primus.buffer.length = 0;
                        for (; i < length; i++) {
                            primus._write(data[i])
                        }
                    }
                    primus.emit("open")
                });
                primus.on("incoming::pong", function pong(time) {
                    primus.online = true;
                    primus.timers.clear("pong");
                    primus.heartbeat();
                    primus.latency = +new Date - time
                });
                primus.on("incoming::error", function error(e) {
                    var connect = primus.timers.active("connect")
                      , err = e;
                    if ("string" === typeof e) {
                        err = new Error(e)
                    } else if (!(e instanceof Error) && "object" === typeof e) {
                        err = new Error(e.message || e.reason);
                        for (var key in e) {
                            if (Object.prototype.hasOwnProperty.call(e, key))
                                err[key] = e[key]
                        }
                    }
                    if (primus.recovery.reconnecting())
                        return primus.recovery.reconnected(err);
                    if (primus.listeners("error").length)
                        primus.emit("error", err);
                    if (connect) {
                        if (~primus.options.strategy.indexOf("timeout")) {
                            primus.recovery.reconnect()
                        } else {
                            primus.end()
                        }
                    }
                });
                primus.on("incoming::data", function message(raw) {
                    primus.decoder(raw, function decoding(err, data) {
                        if (err)
                            return primus.listeners("error").length && primus.emit("error", err);
                        if (primus.protocol(data))
                            return;
                        primus.transforms(primus, primus, "incoming", data, raw)
                    })
                });
                primus.on("incoming::end", function end() {
                    var readyState = primus.readyState;
                    if (primus.disconnect) {
                        primus.disconnect = false;
                        return primus.end()
                    }
                    primus.readyState = Primus.CLOSED;
                    if (readyState !== primus.readyState) {
                        primus.emit("readyStateChange", "end")
                    }
                    if (primus.timers.active("connect"))
                        primus.end();
                    if (readyState !== Primus.OPEN) {
                        return primus.recovery.reconnecting() ? primus.recovery.reconnect() : false
                    }
                    this.writable = false;
                    this.readable = false;
                    this.timers.clear();
                    primus.emit("close");
                    if (~primus.options.strategy.indexOf("disconnect")) {
                        return primus.recovery.reconnect()
                    }
                    primus.emit("outgoing::end");
                    primus.emit("end")
                });
                primus.client();
                for (var plugin in primus.ark) {
                    primus.ark[plugin].call(primus, primus, options)
                }
                if (!primus.NETWORK_EVENTS)
                    return primus;
                primus.offlineHandler = function offline() {
                    if (!primus.online)
                        return;
                    primus.online = false;
                    primus.emit("offline");
                    primus.end();
                    primus.recovery.reset()
                }
                ;
                primus.onlineHandler = function online() {
                    if (primus.online)
                        return;
                    primus.online = true;
                    primus.emit("online");
                    if (~primus.options.strategy.indexOf("online")) {
                        primus.recovery.reconnect()
                    }
                }
                ;
                if (window.addEventListener) {
                    window.addEventListener("offline", primus.offlineHandler, false);
                    window.addEventListener("online", primus.onlineHandler, false)
                } else if (document.body.attachEvent) {
                    document.body.attachEvent("onoffline", primus.offlineHandler);
                    document.body.attachEvent("ononline", primus.onlineHandler)
                }
                return primus
            }
            ;
            Primus.prototype.protocol = function protocol(msg) {
                if ("string" !== typeof msg || msg.indexOf("primus::") !== 0)
                    return false;
                var last = msg.indexOf(":", 8)
                  , value = msg.slice(last + 2);
                switch (msg.slice(8, last)) {
                case "pong":
                    this.emit("incoming::pong", +value);
                    break;
                case "server":
                    if ("close" === value) {
                        this.disconnect = true
                    }
                    break;
                case "id":
                    this.emit("incoming::id", value);
                    break;
                default:
                    return false
                }
                return true
            }
            ;
            Primus.prototype.transforms = function transforms(primus, connection, type, data, raw) {
                var packet = {
                    data: data
                }
                  , fns = primus.transformers[type];
                (function transform(index, done) {
                    var transformer = fns[index++];
                    if (!transformer)
                        return done();
                    if (1 === transformer.length) {
                        if (false === transformer.call(connection, packet)) {
                            return
                        }
                        return transform(index, done)
                    }
                    transformer.call(connection, packet, function finished(err, arg) {
                        if (err)
                            return connection.emit("error", err);
                        if (false === arg)
                            return;
                        transform(index, done)
                    })
                })(0, function done() {
                    if ("incoming" === type)
                        return connection.emit("data", packet.data, raw);
                    connection._write(packet.data)
                });
                return this
            }
            ;
            Primus.prototype.id = function id(fn) {
                if (this.socket && this.socket.id)
                    return fn(this.socket.id);
                this._write("primus::id::");
                return this.once("incoming::id", fn)
            }
            ;
            Primus.prototype.open = function open() {
                context(this, "open");
                if (!this.recovery.reconnecting() && this.options.timeout)
                    this.timeout();
                this.emit("outgoing::open");
                return this
            }
            ;
            Primus.prototype.write = function write(data) {
                context(this, "write");
                this.transforms(this, this, "outgoing", data);
                return true
            }
            ;
            Primus.prototype._write = function write(data) {
                var primus = this;
                if (Primus.OPEN !== primus.readyState) {
                    if (this.buffer.length === this.options.queueSize) {
                        this.buffer.splice(0, 1)
                    }
                    this.buffer.push(data);
                    return false
                }
                primus.encoder(data, function encoded(err, packet) {
                    if (err)
                        return primus.listeners("error").length && primus.emit("error", err);
                    if ("string" === typeof packet) {
                        if (~packet.indexOf("\u2028"))
                            packet = packet.replace(u2028, "\\u2028");
                        if (~packet.indexOf("\u2029"))
                            packet = packet.replace(u2029, "\\u2029")
                    }
                    primus.emit("outgoing::data", packet)
                });
                return true
            }
            ;
            Primus.prototype.heartbeat = function heartbeat() {
                var primus = this;
                if (!primus.options.ping)
                    return primus;
                function pong() {
                    primus.timers.clear("pong");
                    if (!primus.online)
                        return;
                    primus.online = false;
                    primus.emit("offline");
                    primus.emit("incoming::end")
                }
                function ping() {
                    var value = +new Date;
                    primus.timers.clear("ping");
                    primus._write("primus::ping::" + value);
                    primus.emit("outgoing::ping", value);
                    primus.timers.setTimeout("pong", pong, primus.options.pong)
                }
                primus.timers.setTimeout("ping", ping, primus.options.ping);
                return this
            }
            ;
            Primus.prototype.timeout = function timeout() {
                var primus = this;
                function remove() {
                    primus.removeListener("error", remove).removeListener("open", remove).removeListener("end", remove).timers.clear("connect")
                }
                primus.timers.setTimeout("connect", function expired() {
                    remove();
                    if (primus.readyState === Primus.OPEN || primus.recovery.reconnecting()) {
                        return
                    }
                    primus.emit("timeout");
                    if (~primus.options.strategy.indexOf("timeout")) {
                        primus.recovery.reconnect()
                    } else {
                        primus.end()
                    }
                }, primus.options.timeout);
                return primus.on("error", remove).on("open", remove).on("end", remove)
            }
            ;
            Primus.prototype.end = function end(data) {
                context(this, "end");
                if (this.readyState === Primus.CLOSED && !this.timers.active("connect") && !this.timers.active("open")) {
                    if (this.recovery.reconnecting()) {
                        this.recovery.reset();
                        this.emit("end")
                    }
                    return this
                }
                if (data !== undefined)
                    this.write(data);
                this.writable = false;
                this.readable = false;
                var readyState = this.readyState;
                this.readyState = Primus.CLOSED;
                if (readyState !== this.readyState) {
                    this.emit("readyStateChange", "end")
                }
                this.timers.clear();
                this.emit("outgoing::end");
                this.emit("close");
                this.emit("end");
                return this
            }
            ;
            Primus.prototype.destroy = destroy("url timers options recovery socket transport transformers", {
                before: "end",
                after: ["removeAllListeners", function detach() {
                    if (!this.NETWORK_EVENTS)
                        return;
                    if (window.addEventListener) {
                        window.removeEventListener("offline", this.offlineHandler);
                        window.removeEventListener("online", this.onlineHandler)
                    } else if (document.body.attachEvent) {
                        document.body.detachEvent("onoffline", this.offlineHandler);
                        document.body.detachEvent("ononline", this.onlineHandler)
                    }
                }
                ]
            });
            Primus.prototype.clone = function clone(obj) {
                return this.merge({}, obj)
            }
            ;
            Primus.prototype.merge = function merge(target) {
                var args = Array.prototype.slice.call(arguments, 1);
                for (var i = 0, l = args.length, key, obj; i < l; i++) {
                    obj = args[i];
                    for (key in obj) {
                        if (obj.hasOwnProperty(key))
                            target[key] = obj[key]
                    }
                }
                return target
            }
            ;
            Primus.prototype.parse = _dereq_("url-parse");
            Primus.prototype.querystring = qs.parse;
            Primus.prototype.querystringify = qs.stringify;
            Primus.prototype.uri = function uri(options) {
                var url = this.url
                  , server = []
                  , qsa = false;
                if (options.query)
                    qsa = true;
                options = options || {};
                options.protocol = "protocol"in options ? options.protocol : "http:";
                options.query = url.query && qsa ? url.query.slice(1) : false;
                options.secure = "secure"in options ? options.secure : url.protocol === "https:" || url.protocol === "wss:";
                options.auth = "auth"in options ? options.auth : url.auth;
                options.pathname = "pathname"in options ? options.pathname : this.pathname;
                options.port = "port"in options ? +options.port : +url.port || (options.secure ? 443 : 80);
                this.emit("outgoing::url", options);
                var querystring = this.querystring(options.query || "");
                querystring._primuscb = yeast();
                options.query = this.querystringify(querystring);
                server.push(options.secure ? options.protocol.replace(":", "s:") : options.protocol, "");
                server.push(options.auth ? options.auth + "@" + url.host : url.host);
                if (options.pathname)
                    server.push(options.pathname.slice(1));
                if (qsa)
                    server.push("?" + options.query);
                else
                    delete options.query;
                if (options.object)
                    return options;
                return server.join("/")
            }
            ;
            Primus.prototype.transform = function transform(type, fn) {
                context(this, "transform");
                if (!(type in this.transformers)) {
                    return this.critical(new Error("Invalid transformer type"))
                }
                this.transformers[type].push(fn);
                return this
            }
            ;
            Primus.prototype.critical = function critical(err) {
                if (this.listeners("error").length) {
                    this.emit("error", err);
                    return this
                }
                throw err
            }
            ;
            Primus.connect = function connect(url, options) {
                return new Primus(url,options)
            }
            ;
            Primus.EventEmitter = EventEmitter;
            Primus.prototype.client = function client() {
                var primus = this, socket;
                var Factory = function factory() {
                    if ("undefined" !== typeof WebSocket)
                        return WebSocket;
                    if ("undefined" !== typeof MozWebSocket)
                        return MozWebSocket;
                    try {
                        return Primus.require("ws")
                    } catch (e) {}
                    return undefined
                }();
                if (!Factory)
                    return primus.critical(new Error("Missing required `ws` module. Please run `npm install --save ws`"));
                primus.on("outgoing::open", function opening() {
                    primus.emit("outgoing::end");
                    try {
                        var prot = primus.url.protocol === "ws+unix:" ? "ws+unix:" : "ws:"
                          , qsa = prot === "ws:";
                        if (Factory.length === 3) {
                            primus.socket = socket = new Factory(primus.uri({
                                protocol: prot,
                                query: qsa
                            }),[],primus.transport)
                        } else {
                            primus.socket = socket = new Factory(primus.uri({
                                protocol: prot,
                                query: qsa
                            }))
                        }
                    } catch (e) {
                        return primus.emit("error", e)
                    }
                    socket.binaryType = "arraybuffer";
                    socket.onopen = primus.trigger("incoming::open");
                    socket.onerror = primus.trigger("incoming::error");
                    socket.onclose = primus.trigger("incoming::end");
                    socket.onmessage = primus.trigger("incoming::data", function parse(next, evt) {
                        setTimeout(function defer() {
                            next(undefined, evt.data)
                        }, 0)
                    })
                });
                primus.on("outgoing::data", function write(message) {
                    if (!socket || socket.readyState !== Factory.OPEN)
                        return;
                    try {
                        socket.send(message)
                    } catch (e) {
                        primus.emit("incoming::error", e)
                    }
                });
                primus.on("outgoing::reconnect", function reconnect() {
                    primus.emit("outgoing::open")
                });
                primus.on("outgoing::end", function close() {
                    if (!socket)
                        return;
                    socket.onerror = socket.onopen = socket.onclose = socket.onmessage = function() {}
                    ;
                    socket.close();
                    socket = null
                })
            }
            ;
            Primus.prototype.authorization = false;
            Primus.prototype.pathname = "/lobbychat.io";
            Primus.prototype.encoder = function(data, fn) {
                return fn(null, data)
            }
            ;
            Primus.prototype.decoder = function(data, fn) {
                return fn(null, data)
            }
            ;
            Primus.prototype.version = "4.0.4";
            if ("undefined" !== typeof document && "undefined" !== typeof navigator) {
                if (document.addEventListener) {
                    document.addEventListener("keydown", function keydown(e) {
                        if (e.keyCode !== 27 || !e.preventDefault)
                            return;
                        e.preventDefault()
                    }, false)
                }
                var ua = (navigator.userAgent || "").toLowerCase()
                  , parsed = ua.match(/.+(?:rv|it|ra|ie)[\/: ](\d+)\.(\d+)(?:\.(\d+))?/) || []
                  , version = +[parsed[1], parsed[2]].join(".");
                if (!~ua.indexOf("chrome") && ~ua.indexOf("safari") && version < 534.54) {
                    Primus.prototype.AVOID_WEBSOCKETS = true
                }
            }
            module.exports = Primus
        }
        , {
            demolish: 1,
            emits: 2,
            eventemitter3: 3,
            querystringify: 6,
            recovery: 7,
            "tick-tock": 9,
            "url-parse": 10,
            yeast: 12
        }]
    }, {}, [13])(13);
    return Primus
});
var PeerConnection = window.PeerConnection || window.webkitPeerConnection00 || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
var URL = window.URL || window.webkitURL || window.msURL || window.oURL;
var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
var nativeRTCIceCandidate = window.mozRTCIceCandidate || window.RTCIceCandidate;
var nativeRTCSessionDescription = window.mozRTCSessionDescription || window.RTCSessionDescription;
var sdpConstraints = {
    mandatory: {
        OfferToReceiveAudio: true,
        OfferToReceiveVideo: true
    }
};
if (navigator.webkitGetUserMedia) {
    if (!webkitMediaStream.prototype.getVideoTracks) {
        webkitMediaStream.prototype.getVideoTracks = function() {
            return this.videoTracks
        }
        ;
        webkitMediaStream.prototype.getAudioTracks = function() {
            return this.audioTracks
        }
    }
    if (!webkitRTCPeerConnection.prototype.getLocalStreams) {
        webkitRTCPeerConnection.prototype.getLocalStreams = function() {
            return this.localStreams
        }
        ;
        webkitRTCPeerConnection.prototype.getRemoteStreams = function() {
            return this.remoteStreams
        }
    }
}
(function() {
    var rtc;
    if ("undefined" === typeof module) {
        rtc = this.rtc = {}
    } else {
        rtc = module.exports = {}
    }
    var noop = function() {};
    rtc.debug = false;
    rtc._socket = null;
    rtc._me = null;
    rtc._events = {};
    rtc.on = function(eventName, callback) {
        rtc._events[eventName] = rtc._events[eventName] || [];
        rtc._events[eventName].push(callback)
    }
    ;
    rtc.fire = function(eventName, _) {
        var events = rtc._events[eventName];
        var args = Array.prototype.slice.call(arguments, 1);
        if (!events) {
            return
        }
        for (var i = 0, len = events.length; i < len; i++) {
            events[i].apply(null, args)
        }
    }
    ;
    rtc.SERVER = function() {
        return {
            iceServers: [{
                url: "stun:23.21.150.121",
                urls: "stun:23.21.150.121"
            }]
        }
    }
    ;
    rtc.peerConnections = {};
    rtc.connections = [];
    rtc.streams = [];
    rtc.numStreams = 0;
    rtc.initializedStreams = 0;
    rtc.dataChannels = {};
    rtc.dataChannelConfig = {
        optional: [{
            RtpDataChannels: true
        }, {
            DtlsSrtpKeyAgreement: true
        }]
    };
    rtc.pc_constraints = {
        optional: [{
            DtlsSrtpKeyAgreement: true
        }]
    };
    rtc.checkDataChannelSupport = function() {
        try {
            var pc = new PeerConnection(rtc.SERVER(),rtc.dataChannelConfig);
            var channel = pc.createDataChannel("supportCheck", {
                reliable: false
            });
            channel.close();
            return true
        } catch (e) {
            return false
        }
    }
    ;
    rtc.dataChannelSupport = false;
    rtc.disconnect = function() {
        var id = rtc._socket.id;
        rtc.fire("disconnect stream", id);
        if (typeof rtc.peerConnections[id] !== "undefined")
            rtc.peerConnections[id].close();
        delete rtc.peerConnections[id];
        delete rtc.dataChannels[id];
        delete rtc.connections[id]
    }
    ;
    rtc.disconnect_all = function() {
        for (var i = 0; i < rtc.streams.length; i++) {
            var tracks = rtc.streams[i].getVideoTracks();
            for (var j = 0; j < tracks.length; j++) {
                tracks[j].stop()
            }
        }
        for (var connection in rtc.peerConnections) {
            rtc.peerConnections[connection].close()
        }
        rtc.peerConnections = [];
        rtc.dataChannels = [];
        rtc.connections = []
    }
    ;
    rtc.connect = function(socket) {
        rtc._socket = socket;
        rtc._socket.sendcmd("join_video");
        socket.add_cmd("get_peers", function(data) {
            rtc.connections = data.connections;
            rtc._me = data.you;
            if (rtc.offerSent) {
                rtc.createPeerConnections();
                rtc.addStreams();
                rtc.addDataChannels();
                rtc.sendOffers()
            }
            rtc.fire("connections", rtc.connections)
        });
        socket.add_cmd("receive_ice", function(data) {
            var candidate = new nativeRTCIceCandidate(data);
            rtc.peerConnections[data.socketId].addIceCandidate(candidate);
            rtc.fire("receive ice candidate", candidate)
        });
        socket.add_cmd("add_video", function(data) {
            var id = data;
            rtc.connections.push(id);
            delete rtc.offerSent;
            var pc = rtc.createPeerConnection(id);
            for (var i = 0; i < rtc.streams.length; i++) {
                var stream = rtc.streams[i];
                pc.addStream(stream)
            }
        });
        socket.add_cmd("remove_video", function(data) {
            var id = data;
            rtc.fire("disconnect stream", id);
            if (typeof rtc.peerConnections[id] !== "undefined")
                rtc.peerConnections[id].close();
            delete rtc.peerConnections[id];
            delete rtc.dataChannels[id];
            delete rtc.connections[id];
            var html_id = id.toString().replace(":", "-");
            $("#remote_video_" + html_id).remove()
        });
        socket.add_cmd("receive_offer", function(data) {
            rtc.receiveOffer(data.socketId, data.sdp);
            rtc.fire("receive offer", data)
        });
        socket.add_cmd("receive_answer", function(data) {
            rtc.receiveAnswer(data.socketId, data.sdp);
            rtc.fire("receive answer", data)
        })
    }
    ;
    rtc.sendOffers = function() {
        for (var i = 0, len = rtc.connections.length; i < len; i++) {
            var socketId = rtc.connections[i];
            if (rtc._me != socketId) {
                rtc.sendOffer(socketId)
            }
        }
    }
    ;
    rtc.onClose = function(data) {
        rtc.on("close_stream", function() {
            rtc.fire("close_stream", data)
        })
    }
    ;
    rtc.createPeerConnections = function() {
        for (var i = 0; i < rtc.connections.length; i++) {
            rtc.createPeerConnection(rtc.connections[i])
        }
    }
    ;
    rtc.createPeerConnection = function(id) {
        var config = rtc.pc_constraints;
        if (rtc.dataChannelSupport)
            config = rtc.dataChannelConfig;
        var pc = rtc.peerConnections[id] = new PeerConnection(rtc.SERVER(),config);
        pc.onicecandidate = function(event) {
            if (event.candidate) {
                rtc._socket.sendcmd("send_ice", [event.candidate.sdpMLineIndex, event.candidate.candidate, id])
            }
            rtc.fire("ice candidate", event.candidate)
        }
        ;
        pc.onopen = function() {
            rtc.fire("peer connection opened")
        }
        ;
        pc.onaddstream = function(event) {
            rtc.fire("add remote stream", event.stream, id)
        }
        ;
        if (rtc.dataChannelSupport) {
            pc.ondatachannel = function(evt) {
                if (rtc.debug)
                    console.log("data channel connecting " + id);
                rtc.addDataChannel(id, evt.channel)
            }
        }
        return pc
    }
    ;
    rtc.sendOffer = function(socketId) {
        var pc = rtc.peerConnections[socketId];
        var constraints = {
            optional: [],
            mandatory: {
                MozDontOfferDataChannel: true
            }
        };
        if (navigator.webkitGetUserMedia) {
            for (var prop in constraints.mandatory) {
                if (prop.indexOf("Moz") != -1) {
                    delete constraints.mandatory[prop]
                }
            }
        }
        constraints = mergeConstraints(constraints, sdpConstraints);
        pc.createOffer(function(session_description) {
            pc.setLocalDescription(session_description);
            rtc._socket.sendcmd("send_offer", [socketId, session_description])
        }, function(err) {}, sdpConstraints)
    }
    ;
    rtc.receiveOffer = function(socketId, sdp) {
        var pc = rtc.peerConnections[socketId];
        rtc.sendAnswer(socketId, sdp)
    }
    ;
    rtc.sendAnswer = function(socketId, sdp) {
        var pc = rtc.peerConnections[socketId];
        pc.setRemoteDescription(new nativeRTCSessionDescription(sdp));
        pc.createAnswer(function(session_description) {
            pc.setLocalDescription(session_description);
            rtc._socket.sendcmd("send_answer", [socketId, session_description]);
            var offer = pc.remoteDescription
        }, function(err) {}, sdpConstraints)
    }
    ;
    rtc.receiveAnswer = function(socketId, sdp) {
        var pc = rtc.peerConnections[socketId];
        pc.setRemoteDescription(new nativeRTCSessionDescription(sdp), function() {
            console.log("success receive answer")
        }, function(e) {
            console.log(e)
        })
    }
    ;
    rtc.createStream = function(opt, onSuccess, onFail) {
        var options;
        onSuccess = onSuccess || noop;
        onFail = onFail || noop;
        options = {
            video: !!opt.video,
            audio: !!opt.audio
        };
        if (getUserMedia) {
            rtc.numStreams++;
            getUserMedia.call(navigator, options, function(stream) {
                rtc.streams.push(stream);
                rtc.initializedStreams++;
                onSuccess(stream);
                if (rtc.initializedStreams === rtc.numStreams) {
                    rtc.fire("ready")
                }
            }, function(error) {
                alert("could not connect stream.");
                onFail(error)
            })
        } else {
            console.log("webRTC is not yet supported in this browser.")
        }
    }
    ;
    rtc.addStreams = function() {
        for (var i = 0; i < rtc.streams.length; i++) {
            var stream = rtc.streams[i];
            for (var connection in rtc.peerConnections) {
                rtc.peerConnections[connection].addStream(stream)
            }
        }
    }
    ;
    rtc.play = function(element) {
        var WAIT_TIME = 150;
        setTimeout(function() {
            if (element.paused) {
                element.play()
            }
        }, WAIT_TIME)
    }
    ;
    rtc.attachStream = function(stream, element) {
        if (typeof element === "string")
            element = document.getElementById(element);
        if (navigator.mozGetUserMedia) {
            if (rtc.debug)
                console.log("Attaching media stream");
            element.mozSrcObject = stream;
            rtc.play(element)
        } else {
            element.src = window.URL.createObjectURL(stream);
            rtc.play(element)
        }
    }
    ;
    rtc.createDataChannel = function(pcOrId, label) {
        if (!rtc.dataChannelSupport) {
            alert("webRTC data channel is not yet supported in this browser," + " or you must turn on experimental flags");
            return
        }
        var id, pc;
        if (typeof pcOrId === "string") {
            id = pcOrId;
            pc = rtc.peerConnections[pcOrId]
        } else {
            pc = pcOrId;
            id = undefined;
            for (var key in rtc.peerConnections) {
                if (rtc.peerConnections[key] === pc)
                    id = key
            }
        }
        if (!id)
            throw new Error("attempt to createDataChannel with unknown id");
        if (!pc || !(pc instanceof PeerConnection))
            throw new Error("attempt to createDataChannel without peerConnection");
        label = label || "fileTransfer" || String(id);
        var options = {
            reliable: false
        };
        var channel;
        try {
            if (rtc.debug)
                console.log("createDataChannel " + id);
            channel = pc.createDataChannel(label, options)
        } catch (error) {
            if (rtc.debug)
                console.log("seems that DataChannel is NOT actually supported!");
            throw error
        }
        return rtc.addDataChannel(id, channel)
    }
    ;
    rtc.addDataChannel = function(id, channel) {
        channel.onopen = function() {
            if (rtc.debug)
                console.log("data stream open " + id);
            rtc.fire("data stream open", channel)
        }
        ;
        channel.onclose = function(event) {
            delete rtc.dataChannels[id];
            delete rtc.peerConnections[id];
            delete rtc.connections[id];
            if (rtc.debug)
                console.log("data stream close " + id);
            rtc.fire("data stream close", channel)
        }
        ;
        channel.onmessage = function(message) {
            if (rtc.debug)
                console.log("data stream message " + id);
            rtc.fire("data stream data", channel, message.data)
        }
        ;
        channel.onerror = function(err) {
            if (rtc.debug)
                console.log("data stream error " + id + ": " + err);
            rtc.fire("data stream error", channel, err)
        }
        ;
        rtc.dataChannels[id] = channel;
        return channel
    }
    ;
    rtc.addDataChannels = function() {
        if (!rtc.dataChannelSupport)
            return;
        for (var connection in rtc.peerConnections)
            rtc.createDataChannel(connection)
    }
    ;
    rtc.on("ready", function() {
        rtc.createPeerConnections();
        rtc.addStreams();
        rtc.addDataChannels();
        rtc.sendOffers();
        rtc.offerSent = true
    })
}
).call(this);
function preferOpus(sdp) {
    var sdpLines = sdp.split("\r\n");
    var mLineIndex = null;
    for (var i = 0; i < sdpLines.length; i++) {
        if (sdpLines[i].search("m=audio") !== -1) {
            mLineIndex = i;
            break
        }
    }
    if (mLineIndex === null)
        return sdp;
    for (var j = 0; j < sdpLines.length; j++) {
        if (sdpLines[j].search("opus/48000") !== -1) {
            var opusPayload = extractSdp(sdpLines[j], /:(\d+) opus\/48000/i);
            if (opusPayload)
                sdpLines[mLineIndex] = setDefaultCodec(sdpLines[mLineIndex], opusPayload);
            break
        }
    }
    sdpLines = removeCN(sdpLines, mLineIndex);
    sdp = sdpLines.join("\r\n");
    return sdp
}
function extractSdp(sdpLine, pattern) {
    var result = sdpLine.match(pattern);
    return result && result.length == 2 ? result[1] : null
}
function setDefaultCodec(mLine, payload) {
    var elements = mLine.split(" ");
    var newLine = [];
    var index = 0;
    for (var i = 0; i < elements.length; i++) {
        if (index === 3)
            newLine[index++] = payload;
        if (elements[i] !== payload)
            newLine[index++] = elements[i]
    }
    return newLine.join(" ")
}
function removeCN(sdpLines, mLineIndex) {
    var mLineElements = sdpLines[mLineIndex].split(" ");
    for (var i = sdpLines.length - 1; i >= 0; i--) {
        var payload = extractSdp(sdpLines[i], /a=rtpmap:(\d+) CN\/\d+/i);
        if (payload) {
            var cnPos = mLineElements.indexOf(payload);
            if (cnPos !== -1) {
                mLineElements.splice(cnPos, 1)
            }
            sdpLines.splice(i, 1)
        }
    }
    sdpLines[mLineIndex] = mLineElements.join(" ");
    return sdpLines
}
function mergeConstraints(cons1, cons2) {
    var merged = cons1;
    for (var name in cons2.mandatory) {
        merged.mandatory[name] = cons2.mandatory[name]
    }
    merged.optional.concat(cons2.optional);
    return merged
}
(function(n, h, p) {
    "use strict";
    function E(a) {
        var f = [];
        r(f, h.noop).chars(a);
        return f.join("")
    }
    function g(a, f) {
        var d = {}, c = a.split(","), b;
        for (b = 0; b < c.length; b++)
            d[f ? h.lowercase(c[b]) : c[b]] = !0;
        return d
    }
    function F(a, f) {
        function d(a, b, d, l) {
            b = h.lowercase(b);
            if (s[b])
                for (; e.last() && t[e.last()]; )
                    c("", e.last());
            u[b] && e.last() == b && c("", b);
            (l = v[b] || !!l) || e.push(b);
            var m = {};
            d.replace(G, function(b, a, f, c, d) {
                m[a] = q(f || c || d || "")
            });
            f.start && f.start(b, m, l)
        }
        function c(b, a) {
            var c = 0, d;
            if (a = h.lowercase(a))
                for (c = e.length - 1; 0 <= c && e[c] != a; c--)
                    ;
            if (0 <= c) {
                for (d = e.length - 1; d >= c; d--)
                    f.end && f.end(e[d]);
                e.length = c
            }
        }
        "string" !== typeof a && (a = null === a || "undefined" === typeof a ? "" : "" + a);
        var b, k, e = [], m = a, l;
        for (e.last = function() {
            return e[e.length - 1]
        }
        ; a; ) {
            l = "";
            k = !0;
            if (e.last() && w[e.last()])
                a = a.replace(new RegExp("([\\W\\w]*)<\\s*\\/\\s*" + e.last() + "[^>]*>","i"), function(a, b) {
                    b = b.replace(H, "$1").replace(I, "$1");
                    f.chars && f.chars(q(b));
                    return ""
                }),
                c("", e.last());
            else {
                if (0 === a.indexOf("<!--"))
                    b = a.indexOf("--", 4),
                    0 <= b && a.lastIndexOf("-->", b) === b && (f.comment && f.comment(a.substring(4, b)),
                    a = a.substring(b + 3),
                    k = !1);
                else if (x.test(a)) {
                    if (b = a.match(x))
                        a = a.replace(b[0], ""),
                        k = !1
                } else if (J.test(a)) {
                    if (b = a.match(y))
                        a = a.substring(b[0].length),
                        b[0].replace(y, c),
                        k = !1
                } else
                    K.test(a) && ((b = a.match(z)) ? (b[4] && (a = a.substring(b[0].length),
                    b[0].replace(z, d)),
                    k = !1) : (l += "<",
                    a = a.substring(1)));
                k && (b = a.indexOf("<"),
                l += 0 > b ? a : a.substring(0, b),
                a = 0 > b ? "" : a.substring(b),
                f.chars && f.chars(q(l)))
            }
            if (a == m)
                throw L("badparse", a);
            m = a
        }
        c()
    }
    function q(a) {
        if (!a)
            return "";
        A.innerHTML = a.replace(/</g, "&lt;");
        return A.textContent
    }
    function B(a) {
        return a.replace(/&/g, "&amp;").replace(M, function(a) {
            var d = a.charCodeAt(0);
            a = a.charCodeAt(1);
            return "&#" + (1024 * (d - 55296) + (a - 56320) + 65536) + ";"
        }).replace(N, function(a) {
            return "&#" + a.charCodeAt(0) + ";"
        }).replace(/</g, "&lt;").replace(/>/g, "&gt;")
    }
    function r(a, f) {
        var d = !1
          , c = h.bind(a, a.push);
        return {
            start: function(a, k, e) {
                a = h.lowercase(a);
                !d && w[a] && (d = a);
                d || !0 !== C[a] || (c("<"),
                c(a),
                h.forEach(k, function(d, e) {
                    var k = h.lowercase(e)
                      , g = "img" === a && "src" === k || "background" === k;
                    !0 !== O[k] || !0 === D[k] && !f(d, g) || (c(" "),
                    c(e),
                    c('="'),
                    c(B(d)),
                    c('"'))
                }),
                c(e ? "/>" : ">"))
            },
            end: function(a) {
                a = h.lowercase(a);
                d || !0 !== C[a] || (c("</"),
                c(a),
                c(">"));
                a == d && (d = !1)
            },
            chars: function(a) {
                d || c(B(a))
            }
        }
    }
    var L = h.$$minErr("$sanitize")
      , z = /^<((?:[a-zA-Z])[\w:-]*)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*(>?)/
      , y = /^<\/\s*([\w:-]+)[^>]*>/
      , G = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g
      , K = /^</
      , J = /^<\//
      , H = /\x3c!--(.*?)--\x3e/g
      , x = /<!DOCTYPE([^>]*?)>/i
      , I = /<!\[CDATA\[(.*?)]]\x3e/g
      , M = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g
      , N = /([^\#-~| |!])/g
      , v = g("area,br,col,hr,img,wbr");
    n = g("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr");
    p = g("rp,rt");
    var u = h.extend({}, p, n)
      , s = h.extend({}, n, g("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul"))
      , t = h.extend({}, p, g("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var"));
    n = g("circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,stop,svg,switch,text,title,tspan,use");
    var w = g("script,style")
      , C = h.extend({}, v, s, t, u, n)
      , D = g("background,cite,href,longdesc,src,usemap,xlink:href");
    n = g("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,tabindex,target,title,type,valign,value,vspace,width");
    p = g("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan", !0);
    var O = h.extend({}, D, p, n)
      , A = document.createElement("pre");
    h.module("ngSanitize", []).provider("$sanitize", function() {
        this.$get = ["$$sanitizeUri", function(a) {
            return function(f) {
                var d = [];
                F(f, r(d, function(c, b) {
                    return !/^unsafe/.test(a(c, b))
                }));
                return d.join("")
            }
        }
        ]
    });
    h.module("ngSanitize").filter("linky", ["$sanitize", function(a) {
        var f = /((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"\u201d\u2019]/i
          , d = /^mailto:/i;
        return function(c, b) {
            function k(a) {
                a && g.push(E(a))
            }
            function e(a, c) {
                g.push("<a ");
                h.isDefined(b) && g.push('target="', b, '" ');
                g.push('href="', a.replace(/"/g, "&quot;"), '">');
                k(c);
                g.push("</a>")
            }
            if (!c)
                return c;
            for (var m, l = c, g = [], n, p; m = l.match(f); )
                n = m[0],
                m[2] || m[4] || (n = (m[3] ? "http://" : "mailto:") + n),
                p = m.index,
                k(l.substr(0, p)),
                e(n, m[0].replace(d, "")),
                l = l.substring(p + m[0].length);
            k(l);
            return a(g.join(""))
        }
    }
    ])
})(window, window.angular);
(function(a) {
    function b() {
        return {
            empty: !1,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: !1,
            invalidMonth: null,
            invalidFormat: !1,
            userInvalidated: !1,
            iso: !1
        }
    }
    function c(a, b) {
        return function(c) {
            return k(a.call(this, c), b)
        }
    }
    function d(a, b) {
        return function(c) {
            return this.lang().ordinal(a.call(this, c), b)
        }
    }
    function e() {}
    function f(a) {
        w(a),
        h(this, a)
    }
    function g(a) {
        var b = q(a)
          , c = b.year || 0
          , d = b.month || 0
          , e = b.week || 0
          , f = b.day || 0
          , g = b.hour || 0
          , h = b.minute || 0
          , i = b.second || 0
          , j = b.millisecond || 0;
        this._milliseconds = +j + 1e3 * i + 6e4 * h + 36e5 * g,
        this._days = +f + 7 * e,
        this._months = +d + 12 * c,
        this._data = {},
        this._bubble()
    }
    function h(a, b) {
        for (var c in b)
            b.hasOwnProperty(c) && (a[c] = b[c]);
        return b.hasOwnProperty("toString") && (a.toString = b.toString),
        b.hasOwnProperty("valueOf") && (a.valueOf = b.valueOf),
        a
    }
    function i(a) {
        var b, c = {};
        for (b in a)
            a.hasOwnProperty(b) && qb.hasOwnProperty(b) && (c[b] = a[b]);
        return c
    }
    function j(a) {
        return 0 > a ? Math.ceil(a) : Math.floor(a)
    }
    function k(a, b, c) {
        for (var d = "" + Math.abs(a), e = a >= 0; d.length < b; )
            d = "0" + d;
        return (e ? c ? "+" : "" : "-") + d
    }
    function l(a, b, c, d) {
        var e, f, g = b._milliseconds, h = b._days, i = b._months;
        g && a._d.setTime(+a._d + g * c),
        (h || i) && (e = a.minute(),
        f = a.hour()),
        h && a.date(a.date() + h * c),
        i && a.month(a.month() + i * c),
        g && !d && db.updateOffset(a),
        (h || i) && (a.minute(e),
        a.hour(f))
    }
    function m(a) {
        return "[object Array]" === Object.prototype.toString.call(a)
    }
    function n(a) {
        return "[object Date]" === Object.prototype.toString.call(a) || a instanceof Date
    }
    function o(a, b, c) {
        var d, e = Math.min(a.length, b.length), f = Math.abs(a.length - b.length), g = 0;
        for (d = 0; e > d; d++)
            (c && a[d] !== b[d] || !c && s(a[d]) !== s(b[d])) && g++;
        return g + f
    }
    function p(a) {
        if (a) {
            var b = a.toLowerCase().replace(/(.)s$/, "$1");
            a = Tb[a] || Ub[b] || b
        }
        return a
    }
    function q(a) {
        var b, c, d = {};
        for (c in a)
            a.hasOwnProperty(c) && (b = p(c),
            b && (d[b] = a[c]));
        return d
    }
    function r(b) {
        var c, d;
        if (0 === b.indexOf("week"))
            c = 7,
            d = "day";
        else {
            if (0 !== b.indexOf("month"))
                return;
            c = 12,
            d = "month"
        }
        db[b] = function(e, f) {
            var g, h, i = db.fn._lang[b], j = [];
            if ("number" == typeof e && (f = e,
            e = a),
            h = function(a) {
                var b = db().utc().set(d, a);
                return i.call(db.fn._lang, b, e || "")
            }
            ,
            null != f)
                return h(f);
            for (g = 0; c > g; g++)
                j.push(h(g));
            return j
        }
    }
    function s(a) {
        var b = +a
          , c = 0;
        return 0 !== b && isFinite(b) && (c = b >= 0 ? Math.floor(b) : Math.ceil(b)),
        c
    }
    function t(a, b) {
        return new Date(Date.UTC(a, b + 1, 0)).getUTCDate()
    }
    function u(a) {
        return v(a) ? 366 : 365
    }
    function v(a) {
        return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0
    }
    function w(a) {
        var b;
        a._a && -2 === a._pf.overflow && (b = a._a[jb] < 0 || a._a[jb] > 11 ? jb : a._a[kb] < 1 || a._a[kb] > t(a._a[ib], a._a[jb]) ? kb : a._a[lb] < 0 || a._a[lb] > 23 ? lb : a._a[mb] < 0 || a._a[mb] > 59 ? mb : a._a[nb] < 0 || a._a[nb] > 59 ? nb : a._a[ob] < 0 || a._a[ob] > 999 ? ob : -1,
        a._pf._overflowDayOfYear && (ib > b || b > kb) && (b = kb),
        a._pf.overflow = b)
    }
    function x(a) {
        return null == a._isValid && (a._isValid = !isNaN(a._d.getTime()) && a._pf.overflow < 0 && !a._pf.empty && !a._pf.invalidMonth && !a._pf.nullInput && !a._pf.invalidFormat && !a._pf.userInvalidated,
        a._strict && (a._isValid = a._isValid && 0 === a._pf.charsLeftOver && 0 === a._pf.unusedTokens.length)),
        a._isValid
    }
    function y(a) {
        return a ? a.toLowerCase().replace("_", "-") : a
    }
    function z(a, b) {
        return b._isUTC ? db(a).zone(b._offset || 0) : db(a).local()
    }
    function A(a, b) {
        return b.abbr = a,
        pb[a] || (pb[a] = new e),
        pb[a].set(b),
        pb[a]
    }
    function B(a) {
        delete pb[a]
    }
    function C(a) {
        var b, c, d, e, f = 0, g = function(a) {
            if (!pb[a] && rb)
                try {
                    require("./lang/" + a)
                } catch (b) {}
            return pb[a]
        };
        if (!a)
            return db.fn._lang;
        if (!m(a)) {
            if (c = g(a))
                return c;
            a = [a]
        }
        for (; f < a.length; ) {
            for (e = y(a[f]).split("-"),
            b = e.length,
            d = y(a[f + 1]),
            d = d ? d.split("-") : null; b > 0; ) {
                if (c = g(e.slice(0, b).join("-")))
                    return c;
                if (d && d.length >= b && o(e, d, !0) >= b - 1)
                    break;
                b--
            }
            f++
        }
        return db.fn._lang
    }
    function D(a) {
        return a.match(/\[[\s\S]/) ? a.replace(/^\[|\]$/g, "") : a.replace(/\\/g, "")
    }
    function E(a) {
        var b, c, d = a.match(vb);
        for (b = 0,
        c = d.length; c > b; b++)
            d[b] = Yb[d[b]] ? Yb[d[b]] : D(d[b]);
        return function(e) {
            var f = "";
            for (b = 0; c > b; b++)
                f += d[b]instanceof Function ? d[b].call(e, a) : d[b];
            return f
        }
    }
    function F(a, b) {
        return a.isValid() ? (b = G(b, a.lang()),
        Vb[b] || (Vb[b] = E(b)),
        Vb[b](a)) : a.lang().invalidDate()
    }
    function G(a, b) {
        function c(a) {
            return b.longDateFormat(a) || a
        }
        var d = 5;
        for (wb.lastIndex = 0; d >= 0 && wb.test(a); )
            a = a.replace(wb, c),
            wb.lastIndex = 0,
            d -= 1;
        return a
    }
    function H(a, b) {
        var c, d = b._strict;
        switch (a) {
        case "DDDD":
            return Ib;
        case "YYYY":
        case "GGGG":
        case "gggg":
            return d ? Jb : zb;
        case "Y":
        case "G":
        case "g":
            return Lb;
        case "YYYYYY":
        case "YYYYY":
        case "GGGGG":
        case "ggggg":
            return d ? Kb : Ab;
        case "S":
            if (d)
                return Gb;
        case "SS":
            if (d)
                return Hb;
        case "SSS":
            if (d)
                return Ib;
        case "DDD":
            return yb;
        case "MMM":
        case "MMMM":
        case "dd":
        case "ddd":
        case "dddd":
            return Cb;
        case "a":
        case "A":
            return C(b._l)._meridiemParse;
        case "X":
            return Fb;
        case "Z":
        case "ZZ":
            return Db;
        case "T":
            return Eb;
        case "SSSS":
            return Bb;
        case "MM":
        case "DD":
        case "YY":
        case "GG":
        case "gg":
        case "HH":
        case "hh":
        case "mm":
        case "ss":
        case "ww":
        case "WW":
            return d ? Hb : xb;
        case "M":
        case "D":
        case "d":
        case "H":
        case "h":
        case "m":
        case "s":
        case "w":
        case "W":
        case "e":
        case "E":
            return xb;
        default:
            return c = new RegExp(P(O(a.replace("\\", "")), "i"))
        }
    }
    function I(a) {
        a = a || "";
        var b = a.match(Db) || []
          , c = b[b.length - 1] || []
          , d = (c + "").match(Qb) || ["-", 0, 0]
          , e = +(60 * d[1]) + s(d[2]);
        return "+" === d[0] ? -e : e
    }
    function J(a, b, c) {
        var d, e = c._a;
        switch (a) {
        case "M":
        case "MM":
            null != b && (e[jb] = s(b) - 1);
            break;
        case "MMM":
        case "MMMM":
            d = C(c._l).monthsParse(b),
            null != d ? e[jb] = d : c._pf.invalidMonth = b;
            break;
        case "D":
        case "DD":
            null != b && (e[kb] = s(b));
            break;
        case "DDD":
        case "DDDD":
            null != b && (c._dayOfYear = s(b));
            break;
        case "YY":
            e[ib] = s(b) + (s(b) > 68 ? 1900 : 2e3);
            break;
        case "YYYY":
        case "YYYYY":
        case "YYYYYY":
            e[ib] = s(b);
            break;
        case "a":
        case "A":
            c._isPm = C(c._l).isPM(b);
            break;
        case "H":
        case "HH":
        case "h":
        case "hh":
            e[lb] = s(b);
            break;
        case "m":
        case "mm":
            e[mb] = s(b);
            break;
        case "s":
        case "ss":
            e[nb] = s(b);
            break;
        case "S":
        case "SS":
        case "SSS":
        case "SSSS":
            e[ob] = s(1e3 * ("0." + b));
            break;
        case "X":
            c._d = new Date(1e3 * parseFloat(b));
            break;
        case "Z":
        case "ZZ":
            c._useUTC = !0,
            c._tzm = I(b);
            break;
        case "w":
        case "ww":
        case "W":
        case "WW":
        case "d":
        case "dd":
        case "ddd":
        case "dddd":
        case "e":
        case "E":
            a = a.substr(0, 1);
        case "gg":
        case "gggg":
        case "GG":
        case "GGGG":
        case "GGGGG":
            a = a.substr(0, 2),
            b && (c._w = c._w || {},
            c._w[a] = b)
        }
    }
    function K(a) {
        var b, c, d, e, f, g, h, i, j, k, l = [];
        if (!a._d) {
            for (d = M(a),
            a._w && null == a._a[kb] && null == a._a[jb] && (f = function(b) {
                var c = parseInt(b, 10);
                return b ? b.length < 3 ? c > 68 ? 1900 + c : 2e3 + c : c : null == a._a[ib] ? db().weekYear() : a._a[ib]
            }
            ,
            g = a._w,
            null != g.GG || null != g.W || null != g.E ? h = Z(f(g.GG), g.W || 1, g.E, 4, 1) : (i = C(a._l),
            j = null != g.d ? V(g.d, i) : null != g.e ? parseInt(g.e, 10) + i._week.dow : 0,
            k = parseInt(g.w, 10) || 1,
            null != g.d && j < i._week.dow && k++,
            h = Z(f(g.gg), k, j, i._week.doy, i._week.dow)),
            a._a[ib] = h.year,
            a._dayOfYear = h.dayOfYear),
            a._dayOfYear && (e = null == a._a[ib] ? d[ib] : a._a[ib],
            a._dayOfYear > u(e) && (a._pf._overflowDayOfYear = !0),
            c = U(e, 0, a._dayOfYear),
            a._a[jb] = c.getUTCMonth(),
            a._a[kb] = c.getUTCDate()),
            b = 0; 3 > b && null == a._a[b]; ++b)
                a._a[b] = l[b] = d[b];
            for (; 7 > b; b++)
                a._a[b] = l[b] = null == a._a[b] ? 2 === b ? 1 : 0 : a._a[b];
            l[lb] += s((a._tzm || 0) / 60),
            l[mb] += s((a._tzm || 0) % 60),
            a._d = (a._useUTC ? U : T).apply(null, l)
        }
    }
    function L(a) {
        var b;
        a._d || (b = q(a._i),
        a._a = [b.year, b.month, b.day, b.hour, b.minute, b.second, b.millisecond],
        K(a))
    }
    function M(a) {
        var b = new Date;
        return a._useUTC ? [b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate()] : [b.getFullYear(), b.getMonth(), b.getDate()]
    }
    function N(a) {
        a._a = [],
        a._pf.empty = !0;
        var b, c, d, e, f, g = C(a._l), h = "" + a._i, i = h.length, j = 0;
        for (d = G(a._f, g).match(vb) || [],
        b = 0; b < d.length; b++)
            e = d[b],
            c = (h.match(H(e, a)) || [])[0],
            c && (f = h.substr(0, h.indexOf(c)),
            f.length > 0 && a._pf.unusedInput.push(f),
            h = h.slice(h.indexOf(c) + c.length),
            j += c.length),
            Yb[e] ? (c ? a._pf.empty = !1 : a._pf.unusedTokens.push(e),
            J(e, c, a)) : a._strict && !c && a._pf.unusedTokens.push(e);
        a._pf.charsLeftOver = i - j,
        h.length > 0 && a._pf.unusedInput.push(h),
        a._isPm && a._a[lb] < 12 && (a._a[lb] += 12),
        a._isPm === !1 && 12 === a._a[lb] && (a._a[lb] = 0),
        K(a),
        w(a)
    }
    function O(a) {
        return a.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(a, b, c, d, e) {
            return b || c || d || e
        })
    }
    function P(a) {
        return a.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
    }
    function Q(a) {
        var c, d, e, f, g;
        if (0 === a._f.length)
            return a._pf.invalidFormat = !0,
            a._d = new Date(0 / 0),
            void 0;
        for (f = 0; f < a._f.length; f++)
            g = 0,
            c = h({}, a),
            c._pf = b(),
            c._f = a._f[f],
            N(c),
            x(c) && (g += c._pf.charsLeftOver,
            g += 10 * c._pf.unusedTokens.length,
            c._pf.score = g,
            (null == e || e > g) && (e = g,
            d = c));
        h(a, d || c)
    }
    function R(a) {
        var b, c, d = a._i, e = Mb.exec(d);
        if (e) {
            for (a._pf.iso = !0,
            b = 0,
            c = Ob.length; c > b; b++)
                if (Ob[b][1].exec(d)) {
                    a._f = Ob[b][0] + (e[6] || " ");
                    break
                }
            for (b = 0,
            c = Pb.length; c > b; b++)
                if (Pb[b][1].exec(d)) {
                    a._f += Pb[b][0];
                    break
                }
            d.match(Db) && (a._f += "Z"),
            N(a)
        } else
            a._d = new Date(d)
    }
    function S(b) {
        var c = b._i
          , d = sb.exec(c);
        c === a ? b._d = new Date : d ? b._d = new Date(+d[1]) : "string" == typeof c ? R(b) : m(c) ? (b._a = c.slice(0),
        K(b)) : n(c) ? b._d = new Date(+c) : "object" == typeof c ? L(b) : b._d = new Date(c)
    }
    function T(a, b, c, d, e, f, g) {
        var h = new Date(a,b,c,d,e,f,g);
        return 1970 > a && h.setFullYear(a),
        h
    }
    function U(a) {
        var b = new Date(Date.UTC.apply(null, arguments));
        return 1970 > a && b.setUTCFullYear(a),
        b
    }
    function V(a, b) {
        if ("string" == typeof a)
            if (isNaN(a)) {
                if (a = b.weekdaysParse(a),
                "number" != typeof a)
                    return null
            } else
                a = parseInt(a, 10);
        return a
    }
    function W(a, b, c, d, e) {
        return e.relativeTime(b || 1, !!c, a, d)
    }
    function X(a, b, c) {
        var d = hb(Math.abs(a) / 1e3)
          , e = hb(d / 60)
          , f = hb(e / 60)
          , g = hb(f / 24)
          , h = hb(g / 365)
          , i = 45 > d && ["s", d] || 1 === e && ["m"] || 45 > e && ["mm", e] || 1 === f && ["h"] || 22 > f && ["hh", f] || 1 === g && ["d"] || 25 >= g && ["dd", g] || 45 >= g && ["M"] || 345 > g && ["MM", hb(g / 30)] || 1 === h && ["y"] || ["yy", h];
        return i[2] = b,
        i[3] = a > 0,
        i[4] = c,
        W.apply({}, i)
    }
    function Y(a, b, c) {
        var d, e = c - b, f = c - a.day();
        return f > e && (f -= 7),
        e - 7 > f && (f += 7),
        d = db(a).add("d", f),
        {
            week: Math.ceil(d.dayOfYear() / 7),
            year: d.year()
        }
    }
    function Z(a, b, c, d, e) {
        var f, g, h = U(a, 0, 1).getUTCDay();
        return c = null != c ? c : e,
        f = e - h + (h > d ? 7 : 0) - (e > h ? 7 : 0),
        g = 7 * (b - 1) + (c - e) + f + 1,
        {
            year: g > 0 ? a : a - 1,
            dayOfYear: g > 0 ? g : u(a - 1) + g
        }
    }
    function $(a) {
        var b = a._i
          , c = a._f;
        return null === b ? db.invalid({
            nullInput: !0
        }) : ("string" == typeof b && (a._i = b = C().preparse(b)),
        db.isMoment(b) ? (a = i(b),
        a._d = new Date(+b._d)) : c ? m(c) ? Q(a) : N(a) : S(a),
        new f(a))
    }
    function _(a, b) {
        db.fn[a] = db.fn[a + "s"] = function(a) {
            var c = this._isUTC ? "UTC" : "";
            return null != a ? (this._d["set" + c + b](a),
            db.updateOffset(this),
            this) : this._d["get" + c + b]()
        }
    }
    function ab(a) {
        db.duration.fn[a] = function() {
            return this._data[a]
        }
    }
    function bb(a, b) {
        db.duration.fn["as" + a] = function() {
            return +this / b
        }
    }
    function cb(a) {
        var b = !1
          , c = db;
        "undefined" == typeof ender && (a ? (gb.moment = function() {
            return !b && console && console.warn && (b = !0,
            console.warn("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.")),
            c.apply(null, arguments)
        }
        ,
        h(gb.moment, c)) : gb.moment = db)
    }
    for (var db, eb, fb = "2.5.1", gb = this, hb = Math.round, ib = 0, jb = 1, kb = 2, lb = 3, mb = 4, nb = 5, ob = 6, pb = {}, qb = {
        _isAMomentObject: null,
        _i: null,
        _f: null,
        _l: null,
        _strict: null,
        _isUTC: null,
        _offset: null,
        _pf: null,
        _lang: null
    }, rb = "undefined" != typeof module && module.exports && "undefined" != typeof require, sb = /^\/?Date\((\-?\d+)/i, tb = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, ub = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/, vb = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g, wb = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, xb = /\d\d?/, yb = /\d{1,3}/, zb = /\d{1,4}/, Ab = /[+\-]?\d{1,6}/, Bb = /\d+/, Cb = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, Db = /Z|[\+\-]\d\d:?\d\d/gi, Eb = /T/i, Fb = /[\+\-]?\d+(\.\d{1,3})?/, Gb = /\d/, Hb = /\d\d/, Ib = /\d{3}/, Jb = /\d{4}/, Kb = /[+-]?\d{6}/, Lb = /[+-]?\d+/, Mb = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Nb = "YYYY-MM-DDTHH:mm:ssZ", Ob = [["YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/], ["YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/], ["GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/], ["GGGG-[W]WW", /\d{4}-W\d{2}/], ["YYYY-DDD", /\d{4}-\d{3}/]], Pb = [["HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d{1,3}/], ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/], ["HH:mm", /(T| )\d\d:\d\d/], ["HH", /(T| )\d\d/]], Qb = /([\+\-]|\d\d)/gi, Rb = "Date|Hours|Minutes|Seconds|Milliseconds".split("|"), Sb = {
        Milliseconds: 1,
        Seconds: 1e3,
        Minutes: 6e4,
        Hours: 36e5,
        Days: 864e5,
        Months: 2592e6,
        Years: 31536e6
    }, Tb = {
        ms: "millisecond",
        s: "second",
        m: "minute",
        h: "hour",
        d: "day",
        D: "date",
        w: "week",
        W: "isoWeek",
        M: "month",
        y: "year",
        DDD: "dayOfYear",
        e: "weekday",
        E: "isoWeekday",
        gg: "weekYear",
        GG: "isoWeekYear"
    }, Ub = {
        dayofyear: "dayOfYear",
        isoweekday: "isoWeekday",
        isoweek: "isoWeek",
        weekyear: "weekYear",
        isoweekyear: "isoWeekYear"
    }, Vb = {}, Wb = "DDD w W M D d".split(" "), Xb = "M D H h m s w W".split(" "), Yb = {
        M: function() {
            return this.month() + 1
        },
        MMM: function(a) {
            return this.lang().monthsShort(this, a)
        },
        MMMM: function(a) {
            return this.lang().months(this, a)
        },
        D: function() {
            return this.date()
        },
        DDD: function() {
            return this.dayOfYear()
        },
        d: function() {
            return this.day()
        },
        dd: function(a) {
            return this.lang().weekdaysMin(this, a)
        },
        ddd: function(a) {
            return this.lang().weekdaysShort(this, a)
        },
        dddd: function(a) {
            return this.lang().weekdays(this, a)
        },
        w: function() {
            return this.week()
        },
        W: function() {
            return this.isoWeek()
        },
        YY: function() {
            return k(this.year() % 100, 2)
        },
        YYYY: function() {
            return k(this.year(), 4)
        },
        YYYYY: function() {
            return k(this.year(), 5)
        },
        YYYYYY: function() {
            var a = this.year()
              , b = a >= 0 ? "+" : "-";
            return b + k(Math.abs(a), 6)
        },
        gg: function() {
            return k(this.weekYear() % 100, 2)
        },
        gggg: function() {
            return k(this.weekYear(), 4)
        },
        ggggg: function() {
            return k(this.weekYear(), 5)
        },
        GG: function() {
            return k(this.isoWeekYear() % 100, 2)
        },
        GGGG: function() {
            return k(this.isoWeekYear(), 4)
        },
        GGGGG: function() {
            return k(this.isoWeekYear(), 5)
        },
        e: function() {
            return this.weekday()
        },
        E: function() {
            return this.isoWeekday()
        },
        a: function() {
            return this.lang().meridiem(this.hours(), this.minutes(), !0)
        },
        A: function() {
            return this.lang().meridiem(this.hours(), this.minutes(), !1)
        },
        H: function() {
            return this.hours()
        },
        h: function() {
            return this.hours() % 12 || 12
        },
        m: function() {
            return this.minutes()
        },
        s: function() {
            return this.seconds()
        },
        S: function() {
            return s(this.milliseconds() / 100)
        },
        SS: function() {
            return k(s(this.milliseconds() / 10), 2)
        },
        SSS: function() {
            return k(this.milliseconds(), 3)
        },
        SSSS: function() {
            return k(this.milliseconds(), 3)
        },
        Z: function() {
            var a = -this.zone()
              , b = "+";
            return 0 > a && (a = -a,
            b = "-"),
            b + k(s(a / 60), 2) + ":" + k(s(a) % 60, 2)
        },
        ZZ: function() {
            var a = -this.zone()
              , b = "+";
            return 0 > a && (a = -a,
            b = "-"),
            b + k(s(a / 60), 2) + k(s(a) % 60, 2)
        },
        z: function() {
            return this.zoneAbbr()
        },
        zz: function() {
            return this.zoneName()
        },
        X: function() {
            return this.unix()
        },
        Q: function() {
            return this.quarter()
        }
    }, Zb = ["months", "monthsShort", "weekdays", "weekdaysShort", "weekdaysMin"]; Wb.length; )
        eb = Wb.pop(),
        Yb[eb + "o"] = d(Yb[eb], eb);
    for (; Xb.length; )
        eb = Xb.pop(),
        Yb[eb + eb] = c(Yb[eb], 2);
    for (Yb.DDDD = c(Yb.DDD, 3),
    h(e.prototype, {
        set: function(a) {
            var b, c;
            for (c in a)
                b = a[c],
                "function" == typeof b ? this[c] = b : this["_" + c] = b
        },
        _months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        months: function(a) {
            return this._months[a.month()]
        },
        _monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        monthsShort: function(a) {
            return this._monthsShort[a.month()]
        },
        monthsParse: function(a) {
            var b, c, d;
            for (this._monthsParse || (this._monthsParse = []),
            b = 0; 12 > b; b++)
                if (this._monthsParse[b] || (c = db.utc([2e3, b]),
                d = "^" + this.months(c, "") + "|^" + this.monthsShort(c, ""),
                this._monthsParse[b] = new RegExp(d.replace(".", ""),"i")),
                this._monthsParse[b].test(a))
                    return b
        },
        _weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdays: function(a) {
            return this._weekdays[a.day()]
        },
        _weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysShort: function(a) {
            return this._weekdaysShort[a.day()]
        },
        _weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        weekdaysMin: function(a) {
            return this._weekdaysMin[a.day()]
        },
        weekdaysParse: function(a) {
            var b, c, d;
            for (this._weekdaysParse || (this._weekdaysParse = []),
            b = 0; 7 > b; b++)
                if (this._weekdaysParse[b] || (c = db([2e3, 1]).day(b),
                d = "^" + this.weekdays(c, "") + "|^" + this.weekdaysShort(c, "") + "|^" + this.weekdaysMin(c, ""),
                this._weekdaysParse[b] = new RegExp(d.replace(".", ""),"i")),
                this._weekdaysParse[b].test(a))
                    return b
        },
        _longDateFormat: {
            LT: "h:mm A",
            L: "MM/DD/YYYY",
            LL: "MMMM D YYYY",
            LLL: "MMMM D YYYY LT",
            LLLL: "dddd, MMMM D YYYY LT"
        },
        longDateFormat: function(a) {
            var b = this._longDateFormat[a];
            return !b && this._longDateFormat[a.toUpperCase()] && (b = this._longDateFormat[a.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(a) {
                return a.slice(1)
            }),
            this._longDateFormat[a] = b),
            b
        },
        isPM: function(a) {
            return "p" === (a + "").toLowerCase().charAt(0)
        },
        _meridiemParse: /[ap]\.?m?\.?/i,
        meridiem: function(a, b, c) {
            return a > 11 ? c ? "pm" : "PM" : c ? "am" : "AM"
        },
        _calendar: {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        },
        calendar: function(a, b) {
            var c = this._calendar[a];
            return "function" == typeof c ? c.apply(b) : c
        },
        _relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        },
        relativeTime: function(a, b, c, d) {
            var e = this._relativeTime[c];
            return "function" == typeof e ? e(a, b, c, d) : e.replace(/%d/i, a)
        },
        pastFuture: function(a, b) {
            var c = this._relativeTime[a > 0 ? "future" : "past"];
            return "function" == typeof c ? c(b) : c.replace(/%s/i, b)
        },
        ordinal: function(a) {
            return this._ordinal.replace("%d", a)
        },
        _ordinal: "%d",
        preparse: function(a) {
            return a
        },
        postformat: function(a) {
            return a
        },
        week: function(a) {
            return Y(a, this._week.dow, this._week.doy).week
        },
        _week: {
            dow: 0,
            doy: 6
        },
        _invalidDate: "Invalid date",
        invalidDate: function() {
            return this._invalidDate
        }
    }),
    db = function(c, d, e, f) {
        var g;
        return "boolean" == typeof e && (f = e,
        e = a),
        g = {},
        g._isAMomentObject = !0,
        g._i = c,
        g._f = d,
        g._l = e,
        g._strict = f,
        g._isUTC = !1,
        g._pf = b(),
        $(g)
    }
    ,
    db.utc = function(c, d, e, f) {
        var g;
        return "boolean" == typeof e && (f = e,
        e = a),
        g = {},
        g._isAMomentObject = !0,
        g._useUTC = !0,
        g._isUTC = !0,
        g._l = e,
        g._i = c,
        g._f = d,
        g._strict = f,
        g._pf = b(),
        $(g).utc()
    }
    ,
    db.unix = function(a) {
        return db(1e3 * a)
    }
    ,
    db.duration = function(a, b) {
        var c, d, e, f = a, h = null;
        return db.isDuration(a) ? f = {
            ms: a._milliseconds,
            d: a._days,
            M: a._months
        } : "number" == typeof a ? (f = {},
        b ? f[b] = a : f.milliseconds = a) : (h = tb.exec(a)) ? (c = "-" === h[1] ? -1 : 1,
        f = {
            y: 0,
            d: s(h[kb]) * c,
            h: s(h[lb]) * c,
            m: s(h[mb]) * c,
            s: s(h[nb]) * c,
            ms: s(h[ob]) * c
        }) : (h = ub.exec(a)) && (c = "-" === h[1] ? -1 : 1,
        e = function(a) {
            var b = a && parseFloat(a.replace(",", "."));
            return (isNaN(b) ? 0 : b) * c
        }
        ,
        f = {
            y: e(h[2]),
            M: e(h[3]),
            d: e(h[4]),
            h: e(h[5]),
            m: e(h[6]),
            s: e(h[7]),
            w: e(h[8])
        }),
        d = new g(f),
        db.isDuration(a) && a.hasOwnProperty("_lang") && (d._lang = a._lang),
        d
    }
    ,
    db.version = fb,
    db.defaultFormat = Nb,
    db.updateOffset = function() {}
    ,
    db.lang = function(a, b) {
        var c;
        return a ? (b ? A(y(a), b) : null === b ? (B(a),
        a = "en") : pb[a] || C(a),
        c = db.duration.fn._lang = db.fn._lang = C(a),
        c._abbr) : db.fn._lang._abbr
    }
    ,
    db.langData = function(a) {
        return a && a._lang && a._lang._abbr && (a = a._lang._abbr),
        C(a)
    }
    ,
    db.isMoment = function(a) {
        return a instanceof f || null != a && a.hasOwnProperty("_isAMomentObject")
    }
    ,
    db.isDuration = function(a) {
        return a instanceof g
    }
    ,
    eb = Zb.length - 1; eb >= 0; --eb)
        r(Zb[eb]);
    for (db.normalizeUnits = function(a) {
        return p(a)
    }
    ,
    db.invalid = function(a) {
        var b = db.utc(0 / 0);
        return null != a ? h(b._pf, a) : b._pf.userInvalidated = !0,
        b
    }
    ,
    db.parseZone = function(a) {
        return db(a).parseZone()
    }
    ,
    h(db.fn = f.prototype, {
        clone: function() {
            return db(this)
        },
        valueOf: function() {
            return +this._d + 6e4 * (this._offset || 0)
        },
        unix: function() {
            return Math.floor(+this / 1e3)
        },
        toString: function() {
            return this.clone().lang("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
        },
        toDate: function() {
            return this._offset ? new Date(+this) : this._d
        },
        toISOString: function() {
            var a = db(this).utc();
            return 0 < a.year() && a.year() <= 9999 ? F(a, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : F(a, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
        },
        toArray: function() {
            var a = this;
            return [a.year(), a.month(), a.date(), a.hours(), a.minutes(), a.seconds(), a.milliseconds()]
        },
        isValid: function() {
            return x(this)
        },
        isDSTShifted: function() {
            return this._a ? this.isValid() && o(this._a, (this._isUTC ? db.utc(this._a) : db(this._a)).toArray()) > 0 : !1
        },
        parsingFlags: function() {
            return h({}, this._pf)
        },
        invalidAt: function() {
            return this._pf.overflow
        },
        utc: function() {
            return this.zone(0)
        },
        local: function() {
            return this.zone(0),
            this._isUTC = !1,
            this
        },
        format: function(a) {
            var b = F(this, a || db.defaultFormat);
            return this.lang().postformat(b)
        },
        add: function(a, b) {
            var c;
            return c = "string" == typeof a ? db.duration(+b, a) : db.duration(a, b),
            l(this, c, 1),
            this
        },
        subtract: function(a, b) {
            var c;
            return c = "string" == typeof a ? db.duration(+b, a) : db.duration(a, b),
            l(this, c, -1),
            this
        },
        diff: function(a, b, c) {
            var d, e, f = z(a, this), g = 6e4 * (this.zone() - f.zone());
            return b = p(b),
            "year" === b || "month" === b ? (d = 432e5 * (this.daysInMonth() + f.daysInMonth()),
            e = 12 * (this.year() - f.year()) + (this.month() - f.month()),
            e += (this - db(this).startOf("month") - (f - db(f).startOf("month"))) / d,
            e -= 6e4 * (this.zone() - db(this).startOf("month").zone() - (f.zone() - db(f).startOf("month").zone())) / d,
            "year" === b && (e /= 12)) : (d = this - f,
            e = "second" === b ? d / 1e3 : "minute" === b ? d / 6e4 : "hour" === b ? d / 36e5 : "day" === b ? (d - g) / 864e5 : "week" === b ? (d - g) / 6048e5 : d),
            c ? e : j(e)
        },
        from: function(a, b) {
            return db.duration(this.diff(a)).lang(this.lang()._abbr).humanize(!b)
        },
        fromNow: function(a) {
            return this.from(db(), a)
        },
        calendar: function() {
            var a = z(db(), this).startOf("day")
              , b = this.diff(a, "days", !0)
              , c = -6 > b ? "sameElse" : -1 > b ? "lastWeek" : 0 > b ? "lastDay" : 1 > b ? "sameDay" : 2 > b ? "nextDay" : 7 > b ? "nextWeek" : "sameElse";
            return this.format(this.lang().calendar(c, this))
        },
        isLeapYear: function() {
            return v(this.year())
        },
        isDST: function() {
            return this.zone() < this.clone().month(0).zone() || this.zone() < this.clone().month(5).zone()
        },
        day: function(a) {
            var b = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            return null != a ? (a = V(a, this.lang()),
            this.add({
                d: a - b
            })) : b
        },
        month: function(a) {
            var b, c = this._isUTC ? "UTC" : "";
            return null != a ? "string" == typeof a && (a = this.lang().monthsParse(a),
            "number" != typeof a) ? this : (b = this.date(),
            this.date(1),
            this._d["set" + c + "Month"](a),
            this.date(Math.min(b, this.daysInMonth())),
            db.updateOffset(this),
            this) : this._d["get" + c + "Month"]()
        },
        startOf: function(a) {
            switch (a = p(a)) {
            case "year":
                this.month(0);
            case "month":
                this.date(1);
            case "week":
            case "isoWeek":
            case "day":
                this.hours(0);
            case "hour":
                this.minutes(0);
            case "minute":
                this.seconds(0);
            case "second":
                this.milliseconds(0)
            }
            return "week" === a ? this.weekday(0) : "isoWeek" === a && this.isoWeekday(1),
            this
        },
        endOf: function(a) {
            return a = p(a),
            this.startOf(a).add("isoWeek" === a ? "week" : a, 1).subtract("ms", 1)
        },
        isAfter: function(a, b) {
            return b = "undefined" != typeof b ? b : "millisecond",
            +this.clone().startOf(b) > +db(a).startOf(b)
        },
        isBefore: function(a, b) {
            return b = "undefined" != typeof b ? b : "millisecond",
            +this.clone().startOf(b) < +db(a).startOf(b)
        },
        isSame: function(a, b) {
            return b = b || "ms",
            +this.clone().startOf(b) === +z(a, this).startOf(b)
        },
        min: function(a) {
            return a = db.apply(null, arguments),
            this > a ? this : a
        },
        max: function(a) {
            return a = db.apply(null, arguments),
            a > this ? this : a
        },
        zone: function(a) {
            var b = this._offset || 0;
            return null == a ? this._isUTC ? b : this._d.getTimezoneOffset() : ("string" == typeof a && (a = I(a)),
            Math.abs(a) < 16 && (a = 60 * a),
            this._offset = a,
            this._isUTC = !0,
            b !== a && l(this, db.duration(b - a, "m"), 1, !0),
            this)
        },
        zoneAbbr: function() {
            return this._isUTC ? "UTC" : ""
        },
        zoneName: function() {
            return this._isUTC ? "Coordinated Universal Time" : ""
        },
        parseZone: function() {
            return this._tzm ? this.zone(this._tzm) : "string" == typeof this._i && this.zone(this._i),
            this
        },
        hasAlignedHourOffset: function(a) {
            return a = a ? db(a).zone() : 0,
            (this.zone() - a) % 60 === 0
        },
        daysInMonth: function() {
            return t(this.year(), this.month())
        },
        dayOfYear: function(a) {
            var b = hb((db(this).startOf("day") - db(this).startOf("year")) / 864e5) + 1;
            return null == a ? b : this.add("d", a - b)
        },
        quarter: function() {
            return Math.ceil((this.month() + 1) / 3)
        },
        weekYear: function(a) {
            var b = Y(this, this.lang()._week.dow, this.lang()._week.doy).year;
            return null == a ? b : this.add("y", a - b)
        },
        isoWeekYear: function(a) {
            var b = Y(this, 1, 4).year;
            return null == a ? b : this.add("y", a - b)
        },
        week: function(a) {
            var b = this.lang().week(this);
            return null == a ? b : this.add("d", 7 * (a - b))
        },
        isoWeek: function(a) {
            var b = Y(this, 1, 4).week;
            return null == a ? b : this.add("d", 7 * (a - b))
        },
        weekday: function(a) {
            var b = (this.day() + 7 - this.lang()._week.dow) % 7;
            return null == a ? b : this.add("d", a - b)
        },
        isoWeekday: function(a) {
            return null == a ? this.day() || 7 : this.day(this.day() % 7 ? a : a - 7)
        },
        get: function(a) {
            return a = p(a),
            this[a]()
        },
        set: function(a, b) {
            return a = p(a),
            "function" == typeof this[a] && this[a](b),
            this
        },
        lang: function(b) {
            return b === a ? this._lang : (this._lang = C(b),
            this)
        }
    }),
    eb = 0; eb < Rb.length; eb++)
        _(Rb[eb].toLowerCase().replace(/s$/, ""), Rb[eb]);
    _("year", "FullYear"),
    db.fn.days = db.fn.day,
    db.fn.months = db.fn.month,
    db.fn.weeks = db.fn.week,
    db.fn.isoWeeks = db.fn.isoWeek,
    db.fn.toJSON = db.fn.toISOString,
    h(db.duration.fn = g.prototype, {
        _bubble: function() {
            var a, b, c, d, e = this._milliseconds, f = this._days, g = this._months, h = this._data;
            h.milliseconds = e % 1e3,
            a = j(e / 1e3),
            h.seconds = a % 60,
            b = j(a / 60),
            h.minutes = b % 60,
            c = j(b / 60),
            h.hours = c % 24,
            f += j(c / 24),
            h.days = f % 30,
            g += j(f / 30),
            h.months = g % 12,
            d = j(g / 12),
            h.years = d
        },
        weeks: function() {
            return j(this.days() / 7)
        },
        valueOf: function() {
            return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * s(this._months / 12)
        },
        humanize: function(a) {
            var b = +this
              , c = X(b, !a, this.lang());
            return a && (c = this.lang().pastFuture(b, c)),
            this.lang().postformat(c)
        },
        add: function(a, b) {
            var c = db.duration(a, b);
            return this._milliseconds += c._milliseconds,
            this._days += c._days,
            this._months += c._months,
            this._bubble(),
            this
        },
        subtract: function(a, b) {
            var c = db.duration(a, b);
            return this._milliseconds -= c._milliseconds,
            this._days -= c._days,
            this._months -= c._months,
            this._bubble(),
            this
        },
        get: function(a) {
            return a = p(a),
            this[a.toLowerCase() + "s"]()
        },
        as: function(a) {
            return a = p(a),
            this["as" + a.charAt(0).toUpperCase() + a.slice(1) + "s"]()
        },
        lang: db.fn.lang,
        toIsoString: function() {
            var a = Math.abs(this.years())
              , b = Math.abs(this.months())
              , c = Math.abs(this.days())
              , d = Math.abs(this.hours())
              , e = Math.abs(this.minutes())
              , f = Math.abs(this.seconds() + this.milliseconds() / 1e3);
            return this.asSeconds() ? (this.asSeconds() < 0 ? "-" : "") + "P" + (a ? a + "Y" : "") + (b ? b + "M" : "") + (c ? c + "D" : "") + (d || e || f ? "T" : "") + (d ? d + "H" : "") + (e ? e + "M" : "") + (f ? f + "S" : "") : "P0D"
        }
    });
    for (eb in Sb)
        Sb.hasOwnProperty(eb) && (bb(eb, Sb[eb]),
        ab(eb.toLowerCase()));
    bb("Weeks", 6048e5),
    db.duration.fn.asMonths = function() {
        return (+this - 31536e6 * this.years()) / 2592e6 + 12 * this.years()
    }
    ,
    db.lang("en", {
        ordinal: function(a) {
            var b = a % 10
              , c = 1 === s(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
            return a + c
        }
    }),
    rb ? (module.exports = db,
    cb(!0)) : "function" == typeof define && define.amd ? define("moment", function(b, c, d) {
        return d.config && d.config() && d.config().noGlobal !== !0 && cb(d.config().noGlobal === a),
        db
    }) : cb()
}
).call(this);
var setup_creator;
$(function() {
    var MAX_ROLES, p_one_setup, p_setuppage, sc, sid, type;
    $(".tab").click(function() {
        var id;
        id = $(this).data("i");
        $(".tab-body > *").hide();
        $(".tab-header > *").removeClass("sel");
        $("#setupstats_" + id).show();
        $(this).addClass("sel");
        return false
    });
    $("#add_strategy").click(function() {
        window.load_markdown();
        $("#create_strategy").slideDown();
        $(this).remove();
        return false
    });
    Handlebars.registerHelper("equal_zero", function(param, options) {
        if (param === 0) {
            return options.fn(this)
        } else {
            if (options.inverse) {
                return options.inverse(this)
            }
        }
    });
    Handlebars.registerHelper("greater_one", function(param, options) {
        if (param > 1) {
            return options.fn(this)
        } else {
            if (options.inverse) {
                return options.inverse(this)
            }
        }
    });
    Handlebars.registerHelper("equals", function(param, param2, options) {
        if (param === param2) {
            return options.fn(this)
        } else {
            if (options.inverse) {
                return options.inverse(this)
            }
        }
    });
    Handlebars.registerHelper("equal", function(obj1, obj2, options) {
        if (obj1 === obj2) {
            return options.fn(this)
        }
    });
    Handlebars.registerHelper("clip", function(str, num) {
        var modified_str;
        modified_str = str.length > num ? Handlebars.Utils.escapeExpression(str.slice(0, +num + 1 || 9e9)) + "&#8230;" : Handlebars.Utils.escapeExpression(str);
        return modified_str
    });
    $(document).on("click", "#gamepage a.redbutton", function(e) {
        return e.stopPropagation()
    });
    $(document).on("click", ".gamerow", function() {
        var gid;
        gid = $(this).data("gid");
        $("#gameinfo").show();
        $(".gamerow").removeClass("sel");
        $("#gameinfo > *").hide();
        $(this).closest(".gamerow").addClass("sel");
        return $.getJSON("/game/" + gid + "/info", function(o) {
            var data, status;
            status = o[0],
            data = o[1];
            if (status) {
                $("#gameinfo_inner").html(data.data);
                $("#gameinfo > *").fadeIn("fast");
                window.hide_all_but_first();
                return $("#gameinfo .loading").hide()
            } else {
                $("#gameinfo").slideUp("fast");
                return window.errordisplay(".error", data)
            }
        })
    });
    $(document).on("click", ".add_anonymous_deck", function() {
        var id;
        id = $(this).data("id");
        sc.set_anonymous(id);
        $(".add_anonymous_deck").removeClass("sel");
        $(this).addClass("sel");
        return false
    });
    if (window.location.pathname.match("/game/new")) {
        sc = new setup_creator;
        sc.register()
    }
    regfavorite();
    sid = $("#setup_id").val();
    if (window.location.pathname.match(/\/setup\/[0-9]+/)) {
        window.fetch_template("strategies.html", "strategies", function(tmpl) {
            return loadstrategypage(1, sid)
        })
    }
    $("#lobby_first_time .close").click(function() {
        return $.get("/user/close_first_time", function() {
            $("#lobby_first_time").slideUp("fast", function() {
                return $("#lobby_first_time").remove()
            });
            return false
        })
    });
    $(document).on("click", "[id^=play_password_]", function() {
        sid = $(this).attr("id").split("_")[2];
        return popload("/lobby/html/play_password", function() {
            poptog("#pop_data");
            $("#newgame_password").focus();
            return $("#play_password").submit(function() {
                var pass;
                pass = $("#newgame_password").val();
                if (pass === "") {
                    poptog("#pop_data");
                    return false
                }
                poptog("#pop_data");
                ranked(sid, 0, pass);
                return false
            })
        })
    });
    $("#strategy_textarea").keypress(function() {
        return limittext(this, 2e3)
    });
    $(document).on("click", "[id^=strategy_select_]", function() {
        var strategy_id;
        strategy_id = $(this).attr("id").split("_")[2];
        $.getJSON("/strategy/" + strategy_id, function(o) {
            var data, status;
            status = o[0],
            data = o[1];
            if (status) {
                $("#strategy_title").html(data.title);
                $("#strategy_person").html(data.user ? "<a class='user user_teeny'><img src='" + data.user_avatar + "'> " + data.user + "</a>" : "deleted");
                $("#strategy_time").html(data.time);
                $("#view_strategy").html(data.msg);
                window.loadvote("#strategy_votebox", "strategy", strategy_id);
                window.loadcommentpage(".commentbox_strategy", 1, "strategy", strategy_id);
                return $("#strategy_votecomment").show()
            }
        });
        return false
    });
    $("#select_roles").one("click", function() {
        var self;
        self = this;
        $.getJSON("/role/load_setup_search", function(o) {
            return window.fetch_template("find_role.html", "find_role", function(tmpl) {
                $(".choose_roles").html(tmpl(o));
                $(".choose_roles").slideDown();
                return $("#refine_search").show()
            })
        });
        return $(this).remove()
    });
    $(document).on("click", ".find_role", function() {
        var roleid;
        $("#setupconds").show();
        roleid = $(this).data("roleid");
        if ($.inArray(roleid, window.selected_roles) === -1) {
            window.selected_roles.push(roleid);
            $(this).clone().attr("id", "selected_role_" + roleid).appendTo("#cond_roles");
            return window.wait_and_search()
        }
    });
    $(document).on("click", "#cond_roles .roleimg", function() {
        var i, len, ref, remove_role, role, roleid, selected_roles;
        roleid = $(this).data("roleid");
        remove_role = [];
        ref = window.selected_roles;
        for (i = 0,
        len = ref.length; i < len; i++) {
            role = ref[i];
            if (role !== roleid) {
                remove_role.push(role)
            }
        }
        selected_roles = remove_role;
        $(this).remove();
        return window.wait_and_search()
    });
    $(document).on("click", ".find_option", function() {
        var option;
        $("#setupconds").show();
        option = $(this).attr("id").split("_")[2];
        $(this).toggleClass("sel");
        $("#" + option).toggle();
        $("#refine_search").show();
        return window.wait_and_search()
    });
    $("#filter_title").keyup(function() {
        if ($(this).val() !== "") {
            return window.wait_and_search()
        }
    });
    if ($("#findorder a").size()) {
        type = $("#findorder a.sel").data("type")
    }
    if (window.location.pathname.match("/setup")) {
        p_one_setup = window.fetch_template("one_setup.html", "one_setup", function() {}, true);
        p_setuppage = window.fetch_template("setuppage.html", "setuppage");
        $.when(p_setuppage, p_one_setup).then(function() {
            return window.loadpage("#setuppage", "/setup/find", 1, {
                type: type
            }, function(o) {
                var tmpl;
                o = o[1];
                tmpl = window.get_template("setuppage");
                return tmpl(o)
            }, function(o) {
                o = o[1];
                hide_all_but_first();
                $("#setupnav").html(o.pagenav + ("<div id='findgame_total'>" + o.total + " setups found</div>"));
                return $("#setuppage").fadeIn()
            })
        })
    }
    $("#findorder_controls a").click(function() {
        $("#findorder_controls a").removeClass("sel");
        $(this).addClass("sel");
        window.wait_and_search();
        return false
    });
    $(".editsetup").click(function() {
        var self;
        self = this;
        $("div", self).hide();
        $(".editable", self).show().focus();
        return $(".editable", self).one("blur", function() {
            var parsed;
            $(this).hide();
            $("div", self).show();
            parsed = $("div", self).attr("id").split("_");
            return $.get("/setup/" + parsed[1] + "/update", {
                field: parsed[2],
                content: $(this).val()
            }, function(o) {
                return $("div", self).html(o)
            })
        })
    });
    if ($("#slider-range").length) {
        MAX_ROLES = parseInt($("#MAX_ROLES").val());
        $("#slider-range").slider({
            range: true,
            min: 4,
            max: MAX_ROLES,
            values: [4, MAX_ROLES],
            slide: function(event, ui) {
                $("#total-range").text(ui.values[0] + " - " + ui.values[1] + " players");
                return window.wait_and_search()
            }
        })
    }
    $("#create_strategy_form").submit(function() {
        var self;
        self = this;
        $.ajax({
            url: $(this).attr("action"),
            type: "post",
            dataType: "json",
            data: $(this).serialize(),
            success: function(o) {
                var msg, status;
                status = o[0],
                msg = o[1];
                if (status) {
                    window.errordisplay(".error", msg);
                    $(self)[0].reset();
                    return $("#wmd-preview").html("")
                } else {
                    return window.errordisplay(".error", msg)
                }
            }
        });
        return false
    });
    $(document).on("click", "#anonymous_deck_picker .cancel", function() {
        return window.toggle_anonymous()
    });
    $(document).on("keypress", "#anonymous_deck_picker_search", function(e) {
        if (e.keyCode === 13) {
            return window.search_anonymous_picker()
        }
    });
    $(document).on("click", ".add_anonymous_deck_to_picker", function() {
        var id;
        id = $(this).data("id");
        $("#anonymous_deck_picker .anonymous_deck_id").val(id);
        $(".add_anonymous_deck_to_picker").removeClass("sel");
        return $(this).addClass("sel")
    });
    return $(document).on("click", "#anonymous_deck_picker .create", function() {
        var deck_id, setup_id;
        deck_id = $("#anonymous_deck_picker .anonymous_deck_id").val();
        setup_id = $("#anonymous_deck_picker .setup_id").val();
        if (!deck_id) {
            alert("You need to select an anonymous deck first");
            return
        }
        window.toggle_anonymous();
        return ranked(setup_id, 0, null, false, deck_id)
    })
});
window.wait_and_search_timeout = null;
window.wait_and_search = function() {
    clearTimeout(window.wait_and_search_timeout);
    return window.wait_and_search_timeout = setTimeout(function() {
        return window.reload_setup_search()
    }, 300)
}
;
window.reload_setup_search = function() {
    var data, options, roles, type;
    type = $("#findorder a.sel").data("type");
    data = {};
    data.type = type;
    roles = $("[id^=selected_role_]").map(function() {
        return $(this).attr("id").split("_")[2]
    });
    if (roles.size() > 0) {
        data["roles"] = $.makeArray(roles)
    }
    options = $(".find_option.sel").map(function() {
        return $(this).attr("id").split("_")[2]
    });
    if (options.size() > 0) {
        data["options"] = $.makeArray(options)
    }
    data["total_range"] = [$("#slider-range").slider("values", 0), $("#slider-range").slider("values", 1)];
    data["title"] = $("#filter_title").val();
    loadpage("#setuppage", "/setup/find", 1, data, function(o) {
        var tmpl;
        o = o[1];
        tmpl = window.get_template("setuppage");
        return tmpl(o) + o.pagenav
    }, function(o) {
        o = o[1];
        window.hide_all_but_first();
        return $("#setuppage").fadeIn()
    });
    return false
}
;
window.loadpage_anonymous = function(page, params) {
    return window.fetch_template("anonymous_deck.html", "anonymous", function() {
        return loadpage("#anonymoustable", "/anonymousdeck", page, params, function(o) {
            var tmpl;
            tmpl = window.get_template("anonymous");
            return tmpl(o)
        })
    })
}
;
window.mafia_status = function(num) {
    var time, time_n;
    if (num === 0) {
        return "Waiting"
    }
    if (num === -1) {
        return "Game Over"
    }
    time = num % 2 === 0 ? "Day" : "Night";
    time_n = (num - num % 2) / 2;
    return time + " " + time_n
}
;
window.loadstrategypage = function(page, sid) {
    return loadpage("#strategies_page_inner", "/strategy/page", page, {
        setup: sid
    }, function(o) {
        var tmpl;
        tmpl = window.get_template("strategies");
        return o.pagenav + tmpl(o)
    })
}
;
window.hide_all_but_first = function() {
    return $(".setups > .roles:first-child").show()
}
;
setup_creator = function() {
    function setup_creator() {
        this.option_closedroles = false;
        this.alignments = {};
        this.align_players = {};
        this.totalplayers = 4;
        this.MAX_ROLES = parseInt($("#max_roles").val());
        this.MAX_CLOSED_SETUPS = parseInt($("#max_closed_setups").val())
    }
    setup_creator.prototype.register = function() {
        var self;
        self = this;
        $("#addgroup").click(function() {
            return self.add_group()
        });
        $(document).on("click", ".removegroup", function() {
            return self.remove_group(this)
        });
        $(document).on("click", ".createsetup", function() {
            return self.select_group(this)
        });
        $(document).on("click", ".inc", function() {
            return self.add_role(this)
        });
        $(document).on("click", ".dec", function() {
            return self.remove_role(this)
        });
        $(document).on("click", ".create", function() {
            return self.send(this)
        });
        $("[id^=add_]").click(function() {
            var type;
            type = $(this).attr("id").split("_")[1];
            if (type === "password" || type === "cam") {
                return
            }
            $("#img_" + type).toggle();
            switch (type) {
            case "closedroles":
                if ($("#closedoptions").is(":visible")) {
                    self.turnoff_closedroles()
                } else {
                    self.turnon_closedroles()
                }
                break;
            case "multiple":
                if ($("#img_" + type).is(":visible")) {
                    $(".multiple").css("display", "inline-block")
                } else {
                    $(".multiple").hide()
                }
            }
            return $(this).toggleClass("sel")
        });
        $("#add_whisper").click();
        $("#add_whisper").prop("checked", "true");
        $("#add_password").click(function() {
            $(this).toggleClass("sel");
            $("#password,#passwordbox").toggle();
            if ($("#password").is(":visible")) {
                return $("#passwordtext").focus()
            }
        });
        $("#add_anonymous").click(function() {
            $("#anonymousbox").toggle();
            if ($("#anonymousbox").is(":visible")) {
                window.loadpage_anonymous(1)
            }
            return false
        });
        $("#add_title").click(function() {
            $("#titlebox").toggle();
            if ($("#titletext").is(":visible")) {
                $("#titletext").focus()
            }
            return false
        });
        $("#add_cam").click(function() {
            $("#cam-img").toggle();
            return $(this).toggleClass("sel")
        });
        $("#probabilities [id^=prob_slider_]").slider({
            min: 1,
            max: 20,
            orientation: "vertical",
            slide: function(e, ui) {
                return self.compute_probs()
            }
        });
        return $("#totalplayers .slider").slider({
            min: 4,
            max: 25,
            slide: function(e, ui) {
                var v;
                v = ui.value;
                self.totalplayers = v;
                $("#totalplayers .v").html(v + " players");
                return self.compute_probs()
            }
        })
    }
    ;
    setup_creator.prototype.compute_prob_display = function() {
        if (!this.alignments["third"]) {
            $("#prob_third").hide();
            return $("#prob_slider_third").hide()
        } else {
            $("#prob_third").show();
            return $("#prob_slider_third").show()
        }
    }
    ;
    setup_creator.prototype.compute_probs = function() {
        var align, alignments, ref, results, temp, total, v;
        alignments = {};
        this.align_players = {};
        $("[id^=prob_slider_]:visible").each(function() {
            var __, align, ref;
            ref = $(this).attr("id").split("_"),
            __ = ref[0],
            __ = ref[1],
            align = ref[2];
            return alignments[align] = $(this).slider("value")
        });
        total = 0;
        temp = 0;
        for (align in alignments) {
            v = alignments[align];
            total += v
        }
        for (align in alignments) {
            v = alignments[align];
            this.align_players[align] = Math.round(v * this.totalplayers / total);
            temp += this.align_players[align]
        }
        if (this.totalplayers !== temp) {
            this.align_players["mafia"] += this.totalplayers - temp
        }
        ref = this.align_players;
        results = [];
        for (align in ref) {
            v = ref[align];
            results.push($("#prob_" + align + " .prob").html(v + " player"))
        }
        return results
    }
    ;
    setup_creator.prototype.compute_align = function() {
        var self;
        this.alignments = {};
        self = this;
        return $("[id^=exist_]").has("li").each(function() {
            var __, align, base, ref, roleid;
            ref = $(this).attr("id").split("_"),
            __ = ref[0],
            roleid = ref[1];
            align = $("#" + roleid + "_entity").data("align");
            if ((base = self.alignments)[align] == null) {
                base[align] = []
            }
            return self.alignments[align].push(roleid)
        })
    }
    ;
    setup_creator.prototype.turnon_closedroles = function() {
        this.option_closedroles = true;
        $("#addgroup").hide();
        $(".createsetup:not(:first)").remove();
        $(".createsetup:first").addClass("sel");
        $(".createsetup.sel [id^=exist_]").each(function() {
            return $(this).find("li:not(:first)").remove()
        });
        $("#closedoptions").show();
        this.compute_align();
        this.compute_prob_display();
        return this.compute_probs()
    }
    ;
    setup_creator.prototype.turnoff_closedroles = function() {
        this.option_closedroles = false;
        $("#addgroup").show();
        $("#closedoptions").hide();
        return $(".createsetup.sel ul li").remove()
    }
    ;
    setup_creator.prototype.set_anonymous = function(id) {
        return this.anonymousdeck_id = id
    }
    ;
    setup_creator.prototype.add_role = function(el) {
        var custom, entity_el, is_red_mafia, name, role, sel, total;
        if ($(".createsetup.sel").size() === 0) {
            return
        }
        entity_el = $(el).parents(".entity");
        role = entity_el.data("dbid");
        custom = entity_el.data("custom");
        role = role.toString();
        total = $(".createsetup.sel ul li").size();
        if (this.option_closedroles) {
            if ($(".createsetup.sel [id^=exist_" + role + "_] li").size() >= 1) {
                return
            }
        }
        if (total < this.MAX_ROLES || this.option_closedroles) {
            sel = $(".createsetup.sel [id^=exist_" + role + "_]");
            name = sel.attr("id").split("_")[2];
            is_red_mafia = role.charAt(role.length - 1) === "-";
            sel.append("<li " + (custom ? "style='background-image:url(/uploads/roles/" + role + ".png)'" : "") + " class='" + (custom ? "custom" : "") + " roleimg role-" + name + " " + (is_red_mafia ? "mafia_red" : "") + "'></li>")
        }
        if (this.option_closedroles) {
            this.compute_align();
            this.compute_prob_display();
            return this.compute_probs()
        }
    }
    ;
    setup_creator.prototype.remove_role = function(el) {
        var entity_el, role;
        if ($(".createsetup.sel").size() === 0) {
            return
        }
        entity_el = $(el).parents(".entity");
        role = entity_el.data("dbid");
        role = role.toString();
        $(".createsetup.sel [id^=exist_" + role + "] li:first").remove();
        if (this.option_closedroles) {
            this.compute_align();
            this.compute_prob_display();
            return this.compute_probs()
        }
    }
    ;
    setup_creator.prototype.add_group = function() {
        if ($(".createsetup").size() >= this.MAX_CLOSED_SETUPS) {
            return
        }
        $(".createsetup:last").after($(".createsetup:last").clone().removeClass("sel"));
        if ($(".createsetup").size() === this.MAX_CLOSED_SETUPS) {
            return $("#addgroup").hide()
        }
    }
    ;
    setup_creator.prototype.remove_group = function(el) {
        if ($(".createsetup").size() <= 1) {
            return
        }
        $(el).parent().remove();
        if ($(".createsetup").size() < this.MAX_CLOSED_SETUPS) {
            return $("#addgroup").show()
        }
    }
    ;
    setup_creator.prototype.select_group = function(el) {
        $(".createsetup").removeClass("sel");
        return $(el).addClass("sel")
    }
    ;
    setup_creator.prototype.validate = function() {
        var arr, uniq;
        arr = [];
        $(".createsetup").each(function() {
            return arr.push($(this).find("li").size())
        });
        uniq = $.unique(arr);
        return uniq.length === 1
    }
    ;
    setup_creator.prototype.send = function(el) {
        var gamedata, id, msg, ref, setup, uniq, url;
        if (!this.validate()) {
            alert("All your setups must be of the same length!");
            return
        }
        id = $(el).attr("id");
        ref = id === "addsetup" ? ["Adding setup...", "/setup/add"] : ["Setting up quick game...", "/game/add/mafia"],
        msg = ref[0],
        url = ref[1];
        pophtml(msg);
        gamedata = {};
        $("#extra").find(".add_option").each(function() {
            return gamedata[$(this).attr("id")] = $(this).hasClass("sel") & 1
        });
        if (gamedata["add_password"]) {
            gamedata["password"] = $("#passwordtext").val()
        }
        if (gamedata["add_title"]) {
            gamedata["game_title"] = $("#titletext").val()
        }
        if (gamedata["add_anonymous"]) {
            gamedata["anonymousdeck_id"] = this.anonymousdeck_id
        }
        setup = [];
        $(".createsetup").each(function() {
            var temp;
            temp = {};
            $(this).find("[id^=exist_]:has(li)").each(function() {
                var roleid;
                roleid = $(this).attr("id").split("_")[1];
                return temp[roleid] = $(this).find("li").size()
            });
            return setup.push(temp)
        });
        gamedata["setup"] = setup;
        if (gamedata["add_closedroles"]) {
            uniq = [];
            $("[id^=add_unique_]").each(function() {
                var __, ref1;
                if ($(this).is(":checked")) {
                    ref1 = $(this).attr("id").split("_"),
                    __ = ref1[0],
                    __ = ref1[1],
                    id = ref1[2];
                    return uniq.push(id)
                }
            });
            gamedata["closedroles_info"] = {
                totalplayers: this.totalplayers,
                align_players: this.align_players,
                unique_aligns: uniq
            }
        }
        return $.getJSON(url, $.param(gamedata), creategame_update)
    }
    ;
    return setup_creator
}();
window.selected_roles = [];
window.regfavorite = function() {
    return $("[id^=setupfavorite_]").unbind("click").click(function() {
        var id, self, val;
        self = this;
        id = $(this).attr("id").split("_")[1];
        val = $(this).attr("id").split("_")[2];
        return $.getJSON("/setup/" + id + "/favorite", {
            val: val
        }, function(o) {
            if (o.status) {
                $(self).attr("id", "setupfavorite_" + id + "_" + (+val ? 0 : 1));
                $(self).toggleClass("fav_on");
                $(self).toggleClass("icon-star-empty");
                $(self).toggleClass("icon-star");
                window.regfavorite()
            } else {
                errordisplay(".naverror", o.msg)
            }
            return false
        })
    })
}
;
window.ranked = function(id, rank, pass, webcam, deck_id) {
    var data;
    if (pass == null) {
        pass = null
    }
    if (webcam == null) {
        webcam = false
    }
    pophtml("Creating game...");
    data = {
        setupid: id,
        ranked: rank
    };
    if (deck_id) {
        data.deck_id = deck_id
    }
    if (pass) {
        data.add_password = 1;
        data.password = pass
    }
    if (webcam) {
        data.add_cam = 1
    }
    return $.getJSON("/game/add/mafia", data, window.creategame_update)
}
;
window.creategame_update = function(data) {
    var button, o, status, str;
    status = data[0],
    o = data[1];
    if (o.redirect) {
        window.location.reload(true)
    }
    if (!status) {
        if (o.redirect) {
            window.location.href = o.redirect
        }
        poptog("#pop_warn");
        errordisplay(".error", o.msg);
        if (o.code) {
            button = $("<a href='/lobby/setup/" + o.id + "' class='button create'>Setup " + o.id + "</a>");
            $("#createbuttons").append(button)
        }
        return $("#setupsubmit").attr("disabled", false)
    } else {
        str = "/game/" + o.table;
        if (o.password) {
            str += "?password=" + o.password
        }
        return window.location = str
    }
}
;
window.toggle_anonymous = function() {
    $("#pop").toggleClass("hide");
    return $("#anonymous_deck_picker").toggleClass("hide")
}
;
window.search_anonymous_picker = function() {
    var query;
    query = $("#anonymous_deck_picker_search").val();
    return window.fetch_template("anonymous_deck.html?1", "anonymous", function() {
        return loadpage("#anonymoustable", "/anonymousdeck", 1, {
            query: query
        }, function(o) {
            var tmpl;
            o.set_anonymous_picker = true;
            console.log(o);
            tmpl = window.get_template("anonymous");
            return tmpl(o)
        })
    })
}
;
window.play_anonymous = function(id) {
    window.toggle_anonymous();
    $("#anonymous_deck_picker .setup_id").val(id);
    $("#anonymous_deck_picker .anonymous_deck_id").val("");
    $("#anonymous_deck_picker .title").text("Pick a deck for setup " + id);
    return window.search_anonymous_picker()
}
;
var app;
window._emotes = {
    ":)": "happy",
    ":(": "sad",
    "&gt;:(": "mad",
    ":o": "surprised",
    ":|": "meh",
    ":p": "tongue",
    ":@": "cthulhu",
    "o.o": "eyes",
    o_o: "eyes",
    zzz: "dreamer",
    "-@": "jack",
    ":3": "candy",
    ";)": "wink",
    ":bats:": "bats",
    ":boar:": "boar",
    ":rip:": "rip",
    "&lt;3": "heart",
    ":wolf:": "wolf",
    ":bunny:": "bunny",
    ":ghost:": "ghost",
    ":snake:": "snake",
    ":knife:": "knife",
    ":doge:": "doge",
    ":star:": "star",
    ":rainbow:": "rainbow",
    ":horse:": "horse",
    ":mermaid:": "mermaid",
    ":rose:": "rose",
    ":bump:": "bump",
    ":clock:": "clock",
    ";-;": "cry",
    ";_;": "cry",
    ":cookie:": "cookie",
    ":hammer:": "hammer",
    ":panda:": "panda",
    ":penguin:": "penguin",
    ":pizza:": "pizza",
    ":sheep:": "sheep",
    ":shotgun:": "shotgun",
    ":tiger:": "tiger",
    ":unicorn:": "unicorn",
    ":wolf:": "wolf",
    ":cupcake:": "cupcake",
    ":cat:": "cat",
    ":fox:": "fox",
    ":turkey:": "turkey",
    ":santa:": "santa",
    ":christmas:": "christmas",
    ":snowman:": "snowman",
    ":candycane:": "candycane",
    ":lion:": "lion",
    ":cake:": "cake"
};
window._user_emotes = {};
app = angular.module("emoteFilter", []);
app.config(["$compileProvider", function(_this) {
    return function($compileProvider) {
        return $compileProvider.debugInfoEnabled(true)
    }
}(this)]);
app.filter("emotify", ["$sce", function($sce) {
    return function(text, user) {
        var custom_obj, custom_user_obj, i, len, obj, r, replace_fnc, rgx, user_obj;
        if (user == null) {
            user = null
        }
        obj = window._emotes || {};
        user_obj = window._user_emotes || {};
        custom_obj = window._custom_emotes || {};
        custom_user_obj = user && user_obj[user];
        rgx = [/(\s|^)(?::\)|:\(|:\||:o|:p|:@|:3|;\))(?!\S)/gi, /(\s|^)(o[\.|_]o|zzz)(?!\S)/gi, /(\s|^)(;[\-_];)(?!\S)/gi, /(\s|^)(-@)(?!\S)/gi, /:([a-zA-Z]*):/gi, /&lt;3/g, /&gt;:\(/g];
        replace_fnc = function(substring, match, nextMatch) {
            var e, m;
            m = substring.trim().toLowerCase();
            if (custom_user_obj && (e = custom_user_obj[m])) {
                return " <img class='custom-user-emote' src='" + e + "'/>"
            } else if (e = custom_obj[m]) {
                return " <img class='custom-emote' src='" + e + "'/>"
            } else if (e = obj[m]) {
                return " <span class='emote emote-" + e + "'></span> "
            } else {
                return substring
            }
        }
        ;
        for (i = 0,
        len = rgx.length; i < len; i++) {
            r = rgx[i];
            text = text.replace(r, replace_fnc)
        }
        text = $sce.trustAsHtml(text);
        return text
    }
}
]);
var app;
app = angular.module("timeFilter", []);
app.filter("timestamp", function() {
    return function(text) {
        var format;
        format = +new Date(text) - 60 * 60 * 1e3 * 24 < 0 ? "MMM D H-mm" : "HH:mm";
        return moment(text).format(format)
    }
});
app.filter("timeago", function() {
    return function(milliseconds) {
        return moment(milliseconds).fromNow(true)
    }
});
var acceptedImageTypes, app, indexOf = [].indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
        if (i in this && this[i] === item)
            return i
    }
    return -1
}
;
app = angular.module("choosefile", []);
acceptedImageTypes = ["image/png", "image/jpeg", "image/gif"];
app.directive("fileread", function() {
    return {
        link: function(scope, element, attributes) {
            return element.bind("change", function(changeEvent) {
                var reader;
                reader = new FileReader;
                reader.onload = function(loadEvent) {
                    return scope.$apply(function() {
                        return scope.$parent.file_preview = loadEvent.target.result
                    })
                }
                ;
                return scope.$apply(function() {
                    console.log(changeEvent.target.files[0]);
                    scope.$parent.new_file = changeEvent.target.files[0];
                    return reader.readAsDataURL(scope.$parent.new_file)
                })
            })
        }
    }
});
app.directive("choosefile", function() {
    return {
        restrict: "A",
        scope: {
            callback: "&",
            upload: "@"
        },
        link: function(scope, el, attr) {
            return el.bind("change", function(event) {
                var file, files, formData, k, reader, ref, ref1, v, xhr;
                files = this.files;
                file = files[0];
                if (ref = file.type,
                indexOf.call(acceptedImageTypes, ref) < 0) {
                    return
                }
                formData = new FormData;
                formData.append("file", file);
                ref1 = scope.file_data || {};
                for (k in ref1) {
                    v = ref1[k];
                    formData.append(k, v)
                }
                reader = new FileReader;
                if (attr.preview) {
                    reader.onload = function(event) {
                        var image;
                        image = new Image;
                        image.src = event.target.result;
                        image.width = 50;
                        return el.siblings(".image_preview").append(image)
                    }
                }
                reader.readAsDataURL(file);
                xhr = new XMLHttpRequest;
                xhr.open("POST", scope.upload);
                xhr.onload = function() {
                    var data, ref2, status;
                    if (xhr.status === 200) {
                        ref2 = $.parseJSON(xhr.response),
                        status = ref2[0],
                        data = ref2[1];
                        if (status) {
                            return scope.callback({
                                data: data
                            })
                        } else {
                            return window.errordisplay(".error", data)
                        }
                    }
                }
                ;
                return xhr.send(formData)
            })
        }
    }
});
var app, fetch_index, fetch_index_and_splice, fetch_object, get_avatar, modules;
modules = ["ngSanitize", "emoteFilter", "timeFilter", "choosefile"];
if (window.extra_modules) {
    modules = modules.concat(window.extra_modules)
}
app = angular.module("myApp", modules);
app.config(["$compileProvider", function(_this) {
    return function($compileProvider) {
        return $compileProvider.debugInfoEnabled(true)
    }
}(this)]);
fetch_index = function(arr, cb) {
    var index, j, len, user;
    for (index = j = 0,
    len = arr.length; j < len; index = ++j) {
        user = arr[index];
        if (cb(user)) {
            return index;
            break
        }
    }
    return -1
}
;
fetch_index_and_splice = function(arr, cb) {
    var ind;
    ind = fetch_index(arr, cb);
    if (ind !== -1) {
        return arr.splice(ind, 1)
    }
}
;
fetch_object = function(arr, cb) {
    var index, j, len, user;
    for (index = j = 0,
    len = arr.length; j < len; index = ++j) {
        user = arr[index];
        if (cb(user)) {
            return user
        }
    }
}
;
get_avatar = function(id, avatar, style) {
    var bucket;
    if (style == null) {
        style = "original"
    }
    if (avatar) {
        bucket = window.development ? "em-dev-uploads" : "em-uploads";
        return "https://s3.amazonaws.com/" + bucket + "/avatars/" + id + "_" + style + ".jpg"
    } else {
        return "/images/avatar_" + style + ".jpg"
    }
}
;
app.directive("stopEvent", function() {
    return {
        restrict: "A",
        link: function(scope, element, attr) {
            return element.bind(attr.stopEvent, function(e) {
                return e.stopPropagation()
            })
        }
    }
});
app.filter("avatarify", function() {
    return function(text, users) {
        text = text.replace(/[%]([a-z0-9]+)/gi, function(substring, match, nextMatch) {
            var k, subtext, target, v;
            subtext = substring;
            target = substring.substr(1);
            for (k in users) {
                v = users[k];
                if (v.username.toLowerCase() === target.toLowerCase()) {
                    subtext = "<img class='msg-avatar' src='" + v.avatar + "'/>";
                    break
                }
            }
            return subtext
        });
        return text
    }
});
app.filter("commify", function() {
    return function(text) {
        var rgx, x, x1, x2;
        text += "";
        x = text.split(".");
        x1 = x[0];
        x2 = x.length > 1 ? "." + x[1] : "";
        rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, "$1" + "," + "$2")
        }
        return x1 + x2
    }
});
app.directive("ngBindHtmlUnsafe", [function() {
    return function(scope, element, attr) {
        element.addClass("ng-binding").data("$binding", attr.ngBindHtmlUnsafe);
        return scope.$watch(attr.ngBindHtmlUnsafe, function(value) {
            return element.html(value || "")
        })
    }
}
]);
app.factory("socket", ["$rootScope", "$window", function($rootScope, $window) {
    return {
        cmds: {},
        add_cmd: function(cmd, fnc) {
            return this.cmds[cmd] = fnc
        },
        remove_cmd: function(cmd) {
            return delete this.cmds[cmd]
        },
        connect: function() {
            var list;
            list = ["websocket", "xhr-streaming", "xhr-polling"];
            this.sock = new Primus($window.jsvars.lobbychat_url);
            return this.on("data", function(_this) {
                return function(data) {
                    var base, cmd, ref;
                    ref = JSON.parse(data),
                    cmd = ref[0],
                    data = ref[1];
                    if ($window.development) {
                        console.log("Receiving:", cmd, data)
                    }
                    return typeof (base = _this.cmds)[cmd] === "function" ? base[cmd](data) : void 0
                }
            }(this))
        },
        disconnect: function() {
            var ref;
            return (ref = this.sock) != null ? ref.end() : void 0
        },
        on: function(event_name, callback) {
            var socket;
            socket = this.sock;
				if (this.sock) {
				return this.sock.on(event_name, function() {
					var args;
					args = arguments;
					if (event_name !== "end") {
						return $rootScope.$apply(function() {
							return callback.apply(socket, args)
						})
					} else {
						return callback.apply(socket, args)
					}
				})
			}
        },
        sendcmd: function(cmd, data) {
            var pkg;
            if ($window.development) {
                console.log("sending:", cmd, data)
            }
            pkg = [cmd];
            if (data != null) {
                pkg.push(data)
            }
            return this.sock.write(JSON.stringify(pkg))
        }
    }
}
]);
app.controller("LobbyCtrl", ["$scope", "$timeout", "socket", "$http", "$sce", "$window", "$location", function($scope, $timeout, socket, $http, $sce, $window, $location) {
    var ajax, id, num_enters, register_socket, set_color;
    $scope.trophy_list = [null, "gold_trophy", "silver_trophy", "bronze_trophy"];
    $scope.pagetype = "list";
    $scope.load_game_list = false;
    $scope.load_chat = false;
    $scope.chat_view = "chat";
    $scope.load_video = false;
    $scope.happyhour = window.happyhour;
    $scope.adm = window.adm;
    $scope.m = window.m;
    $scope.mobile = window.mobile_layout;
    $scope.announcements = [];
    $scope.lobby = window.lobby_id;
    $scope.user = window.user_id;
    $scope.lobby_owner = window.lobby_owner;
    $scope.game_id = window.game_id;
    $scope.in_game = !!window.game_id;
    $scope.connected = false;
    $scope.refreshing = false;
    $scope.lobby_loaded = false;
    $scope.lobbies_type = "all";
    $scope.edit_lobby_loaded = false;
    $scope.fame_lobby_loaded = false;
    $scope.fame_lobbyinfo = {};
    $scope.need_approval_loaded = false;
    $scope.edit_lobbyinfo = {};
    $scope.editing = {};
    $scope.new_lobby_values = {};
    $scope.check_can_add_lobby = false;
    $scope.load_edit_src = "";
    $scope.lobbies = [];
    set_color = function() {
        var selecting;
        selecting = $scope.mobile ? "#content, #lobbypage" : "#content, #subnav .sel, #lobbypage";
        return $(selecting).css("background", "#" + ($scope.lobbyinfo.bgcolor || "fff"))
    }
    ;
    $scope.$watch("lobbyinfo", function() {
        $scope.new_poll = {
            choices: [{}, {}]
        };
        return set_color()
    });
    $scope.$watch("lobbyinfo.bgcolor", function() {
        return set_color()
    });
    $scope.can_webcam = !!getUserMedia;
    $scope.join_competition = function() {
        ajax("/rounduser/create/round/" + $scope.lobbyinfo.round_id, {}, function(status, data) {
            if (status) {
                $scope.lobbyinfo.enrolled = true
            }
            return window.errordisplay(".error", data)
        });
        return false
    }
    ;
    $scope.process_poll_data = function() {
        var c, j, l, len, len1, ref, ref1, results, sum;
        if ($scope.lobbyinfo.poll) {
            sum = 0;
            ref = $scope.lobbyinfo.poll.choices;
            for (j = 0,
            len = ref.length; j < len; j++) {
                c = ref[j];
                sum += c.num
            }
            ref1 = $scope.lobbyinfo.poll.choices;
            results = [];
            for (l = 0,
            len1 = ref1.length; l < len1; l++) {
                c = ref1[l];
                results.push(c.style = {
                    width: Math.floor(c.num * 100 / sum) + "%"
                })
            }
            return results
        }
    }
    ;
    $scope.lobbyinfo = window.lobbyinfo;
    $scope.lobbyinfo.announce = $sce.trustAsHtml(window.lobbyinfo.announce);
    $scope.process_poll_data();
    $scope.webrtc = null;
    $scope.users = [];
    $scope.user_hash = {};
    $scope.messages = [];
    $scope.game_info = {};
    $scope.games = [];
    $scope.sortby = null;
    $scope.hidepass = false;
    $scope.new_emoteid = "";
    $scope.emotes = null;
    $window._custom_emotes = $window.lobbyinfo.emotes;
    $(document).on("click", ".enter_lobby", function() {
        var lid;
        lid = parseInt($(this).data("lid"));
        return $scope.$apply(function() {
            return $scope.goto_lobby(lid)
        })
    });
    $scope.toggle_chat_timestamps = function() {
        $scope.show_chat_timestamps = !$scope.show_chat_timestamps;
        return $scope.scroll_bottom("window_i")
    }
    ;
    $scope.toggle_chat_userlist = function() {
        if ($scope.chat_view === "chat") {
            return $scope.chat_view = "userlist"
        } else {
            return $scope.chat_view = "chat"
        }
    }
    ;
    $scope.reset_round = function() {
        if (confirm("Are you sure you want to reset this round?")) {
            ajax("/lobby/" + $scope.lobby + "/reset_round", {
                method: "put"
            }, function(status, data) {
                var base;
                if (status) {
                    (base = $scope.edit_lobbyinfo).round || (base.round = {});
                    return $scope.edit_lobbyinfo.round.reset_on = data
                }
            });
            return false
        }
    }
    ;
    $scope.sort_forums = function(_this) {
        return function() {
            var serialized;
            serialized = $("#forums_i").sortable("serialize");
            return ajax("/lobby/" + $scope.lobby + "/sort_forums?" + serialized, {}, function(status, data) {})
        }
    }(this);
    $scope.add_forum = function() {
        var descr, title;
        title = $("#new_forum_title").val();
        descr = $("#new_forum_descr").val();
        return ajax("/forum", {
            method: "post",
            data: {
                title: title,
                descr: descr,
                lobby_id: $scope.lobby
            }
        }, function(status, data) {
            if (status) {
                $("#new_forum_title").val("");
                $("#new_forum-descr").text("");
                return $scope.load_forums()
            } else {
                return window.errordisplay(".error", data)
            }
        })
    }
    ;
    $scope.delete_forum = function(index) {
        var name;
        name = $scope.edit_lobbyinfo.forums[index].title;
        if (name && confirm("Are you sure you want to delete " + name + "?")) {
            return ajax("/forum/" + $scope.edit_lobbyinfo.forums[index].id, {
                method: "delete"
            }, function(status, data) {
                if (status) {
                    return $scope.edit_lobbyinfo.forums.splice(index, 1)
                } else {
                    return window.errordisplay(".error", data)
                }
            })
        }
    }
    ;
    $scope.load_forums = function() {
        return ajax("/lobby/" + $scope.lobby + "/forums", {}, function(status, data) {
            if (status) {
                $scope.forum_loaded = true;
                return $scope.edit_lobbyinfo.forums = data
            }
        })
    }
    ;
    $scope.toggle_poll_lock = function() {
        return ajax("/poll/" + $scope.lobbyinfo.poll.id + "/toggle/lock", {
            method: "put"
        }, function(status, data) {
            if (status) {
                return $scope.lobbyinfo.poll.lock = data
            }
        })
    }
    ;
    $scope.delete_game = function(id) {
        if (confirm("Are you sure you want to delete game " + id)) {
            return ajax("/game/" + id, {
                method: "delete"
            }, function(status, data) {
                if (status) {
                    return fetch_index_and_splice($scope.games, function(o) {
                        return o.id === id
                    })
                }
            })
        }
    }
    ;
    $scope.delete_poll = function() {
        if (!$scope.lobbyinfo.poll) {
            return
        }
        return ajax("/poll/" + $scope.lobbyinfo.poll.id, {
            method: "delete"
        }, function(status, data) {
            if (status) {
                return $scope.lobbyinfo.poll = null
            }
        })
    }
    ;
    $scope.send_poll = function() {
        return ajax("/poll", {
            method: "post",
            data: angular.copy($scope.new_poll)
        }, function(status, data) {
            if (status) {
                $scope.lobbyinfo.poll = data;
                return $scope.process_poll_data()
            } else {
                return window.errordisplay(".error", data)
            }
        })
    }
    ;
    $scope.make_choice = function(choice_id) {
        return ajax("/choice/" + choice_id + "/vote", {
            method: "post"
        }, function(status, data) {
            $scope.lobbyinfo.poll = data;
            return $scope.process_poll_data()
        })
    }
    ;
    $scope.add_choice = function() {
        if ($scope.new_poll.choices.length >= 10) {
            return
        }
        return $scope.new_poll.choices.push({})
    }
    ;
    $scope.remove_choice = function(ind) {
        if ($scope.new_poll.choices.length <= 2) {
            return
        }
        return $scope.new_poll.choices.splice(ind, 1)
    }
    ;
    ajax = function(url, arg, cb) {
        var data, info, method;
        method = arg.method,
        data = arg.data;
        info = {
            url: url,
            method: method || "get"
        };
        info.headers = {
            "X-REQUESTED-WITH": "XMLHttpRequest"
        };
        if (data) {
            if (info.method === "get") {
                info.params = data
            } else {
                info.data = $.param(data);
                info.headers["Content-Type"] = "application/x-www-form-urlencoded"
            }
        }
        return $http(info).success(function(o) {
            var status;
            status = o[0],
            data = o[1];
            return cb(status, data)
        })
    }
    ;
    $scope.blacklist = function(sid) {
        return ajax("/setup/" + sid + "/blacklist", {}, function(status, data) {
            if (status) {
                $scope.load_blacklisted_setups();
                return $scope.setup_search_results = []
            }
        })
    }
    ;
    $scope.search_setup = function($event) {
        var cb;
        $timeout.cancel($scope.timeout_search);
        cb = function(status, data) {
            if (status) {
                return $scope.setup_search_results = data.data
            }
        }
        ;
        return $scope.timeout_search = $timeout(function() {
            var search_text;
            search_text = $scope.search_setup_text;
            if (parseInt(search_text).toString() === search_text) {
                return ajax("/setup/" + search_text + "/info", {}, cb)
            } else {
                return ajax("/setup/find", {
                    data: {
                        q: $scope.search_setup_text
                    }
                }, cb)
            }
        }, 1e3)
    }
    ;
    $scope.delete_announcement = function(ind) {
        return ajax("/announce/" + $scope.announcements[ind].id, {
            method: "delete"
        }, function(status, data) {
            if (status) {
                $scope.announcements.splice(ind, 1);
                if (!$scope.announcements.length) {
                    return $scope.load_announcements(1)
                }
            }
        })
    }
    ;
    $scope.load_announcements = function(page) {
        if (page == null) {
            page = 1
        }
        return ajax("/announce", {
            data: {
                page: page
            }
        }, function(status, data) {
            if (status) {
                $scope.announcements = data.data;
                $scope.can_edit_announcements = data.can_edit;
                $scope.announcement_page_data = data.page_data;
                return $timeout(window.lazy_load_images, 0)
            }
        })
    }
    ;
    $scope.add_announcement = function() {
        return ajax("/announce", {
            method: "post",
            data: {
                msg: $scope.new_announcement
            }
        }, function(status, data) {
            if (status) {
                $scope.new_announcement = "";
                return $scope.load_announcements()
            } else {
                return window.errordisplay(".error", data)
            }
        })
    }
    ;
    $scope.reset_chat = function() {
        if (confirm("Are you sure you want to reset chat?")) {
            return ajax("/lobby/" + $scope.lobby + "/reset_chat", {
                method: "put"
            }, function(status, data) {})
        }
    }
    ;
    $scope.leave_game = function(gid) {
        return ajax("/game/" + gid + "/leave", {}, function(status, data) {
            if (status) {
                $scope.left_game = true;
                $scope.connect_chat();
                return window.errordisplay(".error", "You left your current game, go join another one!")
            } else {
                return window.errordisplay(".error", data)
            }
        })
    }
    ;
    $scope.load_blacklisted_setups = function() {
        return ajax("/lobby/" + $scope.lobby + "/blacklisted_setups", {}, function(status, data) {
            return $scope.edit_lobbyinfo.setups = data
        })
    }
    ;
    $scope.select_edit = function(type) {
        switch (type) {
        case "forum":
            if (!$scope.forum_loaded) {
                $scope.load_forums()
            }
            break;
        case "setups":
            $scope.load_blacklisted_setups();
            break;
        case "emotes":
            if (!$scope.emotes) {
                $http({
                    url: "/lobby/" + $scope.lobby + "/emotes",
                    method: "get"
                }).success(function(o) {
                    var data, status;
                    status = o[0],
                    data = o[1];
                    if (status) {
                        return $scope.emotes = data
                    }
                })
            }
            break;
        case "players":
            if (!$scope.need_approval_loaded) {
                $http({
                    url: "/lobby/" + $scope.lobby + "/need_approval",
                    method: "get"
                }).success(function(o) {
                    var data, status;
                    status = o[0],
                    data = o[1];
                    if (status) {
                        $scope.need_approval_loaded = true;
                        return $scope.need_approvals = data
                    }
                })
            }
        }
        return $scope.pagetypeedit = type
    }
    ;
    $scope.edit = function(field) {
        $scope.editing[field] = !$scope.editing[field];
        if ($scope.editing[field]) {
            return $scope.new_lobby_values[field] = angular.copy($scope.edit_lobbyinfo[field])
        }
    }
    ;
    $scope.send_edit = function(field) {
        return ajax("/lobby/" + $scope.lobby + "/edit/" + field, {
            method: "put",
            data: {
                value: $scope.new_lobby_values[field]
            }
        }, function(status, data) {
            if (status) {
                $scope.edit_lobbyinfo[field] = data;
                return $scope.editing[field] = false
            } else {
                return window.errordisplay(".error", data)
            }
        })
    }
    ;
    $scope.iconCallback = function(data) {
        return $scope.$apply(function() {
            $scope.edit_lobbyinfo.icon = data + "?" + +new Date;
            return $scope.lobbyinfo.icon = data + "?" + +new Date
        })
    }
    ;
    $scope.backgroundCallback = function(data) {
        return $scope.$apply(function() {
            $scope.lobbyinfo.background = data + "?" + +new Date;
            $scope.edit_lobbyinfo.background = data + "?" + +new Date;
            return $scope.applybackground()
        })
    }
    ;
    $scope.removeBackground = function() {
        return $http({
            url: "/lobby/" + $scope.lobby + "/background",
            method: "post"
        }).success(function(o) {
            $scope.edit_lobbyinfo.background = null;
            $scope.lobbyinfo.background = null;
            return $scope.applybackground()
        })
    }
    ;
    $scope.removeIcon = function() {
        return $http({
            url: "/lobby/" + $scope.lobby + "/icon",
            method: "post"
        }).success(function(o) {
            $scope.edit_lobbyinfo.icon = null;
            return $scope.lobbyinfo.icon = null
        })
    }
    ;
    $scope.set_bgcolor = function(color) {
        return ajax("/lobby/" + $scope.lobby + "/bgcolor", {
            method: "put",
            data: {
                color: color
            }
        }, function(status, data) {
            var j, len, ref;
            if (status) {
                ref = $scope.edit_lobbyinfo.colors;
                for (j = 0,
                len = ref.length; j < len; j++) {
                    color = ref[j];
                    color.selected = data === color.value
                }
                $scope.edit_lobbyinfo.bgcolor = data;
                return $scope.lobbyinfo.bgcolor = data
            }
        })
    }
    ;
    $scope.applybackground = function() {
        if ($scope.lobbyinfo.background) {
            $("body").css("background", "url(" + $scope.lobbyinfo.background + ")");
            $("body").addClass("has_lobby_background");
            if ($scope.lobbyinfo.bg_fixed) {
                return $("body").css("background-attachment", "fixed")
            }
        } else {
            $("body").css("background", "url(/images/scatter.png)");
            $("body").css("background-attachment", "scroll");
            return $("body").removeClass("has_lobby_background")
        }
    }
    ;
    $scope.ranked = function(id, type) {
        return window.ranked(id, type)
    }
    ;
    $scope.refresh = function() {
        $scope.refreshing = true;
        $scope.loadgamepage(null, function() {
            $scope.load_game_list = true;
            $scope.refreshing = false;
            return $scope.pagetype = "list"
        });
        return false
    }
    ;
    $scope.scroll_top = function() {
        return $($window.mobile_layout ? "#right" : "html, body").animate({
            scrollTop: 0
        }, 300)
    }
    ;
    num_enters = 0;
    $scope.load_lobby = function(lid, cb) {
        $scope.loading_lobby = true;
        $scope.scroll_top();
        $http({
            url: "/lobby/" + lid + "/enter",
            method: "post"
        }).success(function(o) {
            var data, status;
            status = o[0],
            data = o[1];
            if (status) {
                $scope.lobbyinfo = data;
                $scope.lobbyinfo.announce = $sce.trustAsHtml(data.announce);
                $scope.emotes = null;
                $window._custom_emotes = data.emotes;
                $scope.process_poll_data();
                window.token = data.token;
                $scope.edit_lobby_loaded = false;
                $scope.fame_lobby_loaded = false;
                $scope.process_gamepage_data(data.gamepage);
                window.loadcommentpage(".commentbox", 1, "lobby", lid);
                $scope.loading_lobby = false;
                return cb()
            } else {
                errordisplay(".error", data);
                return $scope.loading_lobby = false
            }
        });
        return false
    }
    ;
    $scope.goto_lobby = function(lid) {
        if (lid === $scope.lobby) {
            return
        }
        $scope.view = "games";
        $scope.select_page("list");
        $("#gameinfo").slideUp("fast");
        $scope.load_game_lobby = false;
        return $scope.load_lobby(lid, function() {
            $location.search("id", lid).replace();
            $scope.lobby = lid;
            $scope.need_approval_loaded = false;
            $scope.no_entry = false;
            $scope.load_game_lobby = true;
			socket.disconnect();
			socket.on("end", function(_this) {
				return function() {
					console.log("ending?");
					$scope.reset_chat_params();
					$scope.connected = false;
					return $scope.onclose_disconnected = false
				}
			}(this));
            $scope.connect_chat();
            rtc.disconnect_all();
            $scope.webrtc = false;
            $scope.reports_loaded = false;
            $("#remote_videos").html("");
            return $scope.applybackground()
        })
    }
    ;
    $scope.send_msg = function() {
        if ($scope.message === "") {
            return
        }
        socket.sendcmd("<", $scope.message);
        return $scope.message = ""
    }
    ;
    $scope.keypress = function($event) {
        var keycode;
        keycode = $event.keyCode;
        if (keycode === 13) {
            return $scope.send_msg()
        }
    }
    ;
    $scope.active_scroll = function(id) {
        var b, scrollDiv;
        scrollDiv = document.getElementById(id);
        b = 0;
        if (scrollDiv.scrollHeight > 0) {
            b = scrollDiv.scrollHeight
        }
        if (b - scrollDiv.scrollTop - (scrollDiv.style.pixelHeight ? scrollDiv.style.pixelHeight : scrollDiv.offsetHeight) < 80) {
            return scrollDiv.scrollTop = b
        }
    }
    ;
    $scope.scroll_bottom = function(id) {
        return $timeout(function() {
            var scrollDiv;
            scrollDiv = document.getElementById(id);
            return scrollDiv.scrollTop += scrollDiv.scrollHeight
        }, 0)
    }
    ;
    $scope.reset_chat_params = function() {
        $scope.users = [];
        $scope.user_hash = {};
        $scope.messages = [];
        return $scope.connected = false
    }
    ;
    $scope.goto_user = function(user_id) {
        return $window.location.href = "/user/" + user_id
    }
    ;
    $scope.remove_and_mute = function($event, message) {
        var ind, j, m, ref;
        ref = $scope.messages;
        for (ind = j = ref.length - 1; j >= 0; ind = j += -1) {
            m = ref[ind];
            if (m.username === message.username) {
                $scope.messages.splice(ind, 1)
            }
        }
        $scope.toggle_mute(message.id);
        return true
    }
    ;
    $scope.toggle_mute = function(id) {
        var cmd, s;
        if (s = $scope.user_hash[id]) {
            cmd = s.muted ? "unmute" : "mute";
            return socket.sendcmd(cmd, s.id)
        }
    }
    ;
    $scope.toggle_game = function(game) {
        return $http({
            url: "/lobby/" + $scope.lobby + "/toggle_game",
            method: "put",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: $.param({
                game: game
            })
        }).success(function(o) {
            var data, obj, status;
            status = o[0],
            data = o[1];
            if (status) {
                obj = fetch_object($scope.edit_lobbyinfo.games, function(oo) {
                    return oo.id === game
                });
                return obj.sel = data
            }
        })
    }
    ;
    $scope.toggle_option = function(option) {
        return $http({
            url: "/lobby/" + $scope.lobby + "/toggle_option",
            method: "put",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: $.param({
                option: option
            })
        }).success(function(o) {
            var data, obj, status;
            status = o[0],
            data = o[1];
            if (status) {
                obj = fetch_object($scope.edit_lobbyinfo.options, function(oo) {
                    return oo.id === option
                });
                return obj.sel = data
            }
        })
    }
    ;
    $scope.toggle_role = function(role) {
        return $http({
            url: "/lobby/" + $scope.lobby + "/toggle_role",
            method: "put",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: $.param({
                role_id: role
            })
        }).success(function(o) {
            var data, obj, status;
            status = o[0],
            data = o[1];
            if (status) {
                obj = fetch_object($scope.edit_lobbyinfo.roles, function(oo) {
                    return oo.id === role
                });
                return obj.sel = data
            }
        })
    }
    ;
    $scope.toggle_lobby = function(field) {
        return $http({
            url: "/lobby/" + $scope.lobby + "/toggle",
            method: "put",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: $.param({
                field: field
            })
        }).success(function(o) {
            var data, status;
            status = o[0],
            data = o[1];
            if (status) {
                return $scope.edit_lobbyinfo[field] = data
            }
        })
    }
    ;
    $scope.init_user = function(data) {
        var obj;
        obj = {};
        obj.id = data[0],
        obj.username = data[1],
        obj.avatar = data[2],
        obj.textcolor = data[3],
        obj.usernamecolor = data[4],
        obj.is_mobile = data[5],
        obj.emotes_cache = data[6];
        if (obj.emotes_cache) {
            try {
                obj.emotes_cache = JSON.parse(obj.emotes_cache);
                window._user_emotes[obj.username] = obj.emotes_cache
            } catch (error) {}
        }
        obj.muted = false;
        obj.avatar = get_avatar(obj.id, obj.avatar, "teeny");
        $scope.user_hash[obj.id] = obj;
        return $scope.users.push(obj)
    }
    ;
    register_socket = function(s) {
        var reconnect_handler;
        s.on("open", function(_this) {
            return function() {
                $scope.connected = true;
                $scope.onclose_disconnected = false;
                return socket.sendcmd("join", {
                    lobby_id: $scope.lobby,
                    token: window.token
                })
            }
        }(this));
        reconnect_handler = function(_this) {
            return function() {
                $scope.reset_chat_params();
                $scope.connected = false;
                return $scope.onclose_disconnected = true
            }
        }(this);
        s.on("reconnect", reconnect_handler);
        return s.on("end", reconnect_handler)
    }
    ;
    $scope.reconnect = function() {
        socket.connect();
        return register_socket(socket)
    }
    ;
    $scope.disconnect_chat = function() {
        return socket.disconnect()
    }
    ;
    $scope.load_socket = function() {
        socket.connect();
        register_socket(socket);
        return socket.cmds = {
            self: function(_this) {
                return function(data) {
                    var obj;
                    obj = $scope.init_user(data);
                    return obj.self = true
                }
            }(this),
            users: function(_this) {
                return function(data) {
                    var j, len, results, user;
                    results = [];
                    for (j = 0,
                    len = data.length; j < len; j++) {
                        user = data[j];
                        results.push($scope.init_user(user))
                    }
                    return results
                }
            }(this),
            join: function(_this) {
                return function(data) {
                    return $scope.init_user(data)
                }
            }(this),
            leave: function(_this) {
                return function(data) {
                    var ind;
                    ind = fetch_index($scope.users, function(o) {
                        return o.id === data
                    });
                    if (ind !== -1) {
                        return $scope.users.splice(ind, 1)
                    }
                }
            }(this),
            mute: function(_this) {
                return function(data) {
                    return $scope.user_hash[data].muted = true
                }
            }(this),
            unmute: function(_this) {
                return function(data) {
                    return $scope.user_hash[data].muted = false
                }
            }(this),
            dc: function(_this) {
                return function(data) {
                    return $scope.connected = false
                }
            }(this),
            no_entry: function(_this) {
                return function(data) {
                    $scope.no_entry = true;
                    return $scope.no_entry_msg = data
                }
            }(this),
            m: function(_this) {
                return function(data) {
                    $scope.messages.push({
                        system: true,
                        msg: data.msg
                    });
                    return $timeout(function() {
                        return $scope.active_scroll("window_i")
                    }, 10)
                }
            }(this),
            "<<": function(_this) {
                return function(data) {
                    var a, d, j, len, messages;
                    messages = [];
                    for (j = 0,
                    len = data.length; j < len; j++) {
                        d = data[j];
                        a = {};
                        a.id = d[0],
                        a.msg = d[1],
                        a.ts = d[2],
                        a.username = d[3],
                        a.avatar = d[4],
                        a.textcolor = d[5],
                        a.usernamecolor = d[6];
                        a.style = {
                            color: "#" + a.textcolor
                        };
                        a.username_style = {
                            color: "#" + a.usernamecolor
                        };
                        a.avatar = get_avatar(a.id, a.avatar, "teeny");
                        messages.push(a)
                    }
                    $scope.messages = messages;
                    return $scope.scroll_bottom("window_i")
                }
            }(this),
            "<": function(_this) {
                return function(data) {
                    var a, uinfo;
                    a = {};
                    if (uinfo = $scope.user_hash[data[0]]) {
                        a.id = uinfo.id;
                        a.msg = data[1];
                        a.ts = data[2];
                        a.username = uinfo.username;
                        a.avatar = uinfo.avatar;
                        a.style = {
                            color: "#" + uinfo.textcolor
                        };
                        a.username_style = {
                            color: "#" + uinfo.usernamecolor
                        }
                    }
                    if (a.id && a.username) {
                        $scope.messages.push(a);
                        if ($scope.messages.length > 30) {
                            $scope.messages = $scope.messages.slice($scope.messages.length - 30)
                        }
                    }
                    return $timeout(function() {
                        return $scope.active_scroll("window_i")
                    }, 0)
                }
            }(this)
        }
    }
    ;
    $scope.connect_chat = function() {
        if (!(!$scope.in_game || $scope.left_game)) {
            return
        }
        $scope.load_chat = true;
        $scope.chat_view = "chat";
        $scope.reset_chat_params();
        $scope.load_socket();
        return $scope.scroll_bottom("window_i")
    }
    ;
    $scope.check_add_lobby = function() {
        if ($scope.check_can_add_lobby) {
            return
        }
        return $http({
            url: "/user/can_add_lobby",
            method: "get"
        }).success(function(o) {
            var msg, status;
            status = o[0],
            msg = o[1];
            $scope.can_add_lobby = status;
            $scope.check_can_add_lobby = true;
            if (!status) {
                return window.errordisplay(".error", msg)
            }
        })
    }
    ;
    $scope.edit_announcement = function() {
        return $http({
            url: "/lobby/" + $scope.lobby + "/announcement",
            method: "put",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: $.param({
                announcement: $scope.new_announcement.replace(/\n/g, "\r\n")
            })
        }).success(function(o) {
            var data, status;
            status = o[0],
            data = o[1];
            if (status) {
                $scope.lobbyinfo.announce = data;
                return $scope.editing_announcement = false
            } else {
                return window.errordisplay(".error", data)
            }
        })
    }
    ;
    $scope.add_lobby = function() {
        return $http({
            url: "/lobby",
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: $.param({
                name: $scope.add_lobby_name
            })
        }).success(function(o) {
            var data, status;
            status = o[0],
            data = o[1];
            if (status) {
                $scope.lobby_created = true;
                return $scope.load_lobbies("yours")
            } else {
                return window.errordisplay(".error", data)
            }
        })
    }
    ;
    $scope.delete_emote = function(id) {
        return $http({
            url: "/emote/" + id,
            method: "delete",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).success(function(o) {
            var data, status;
            status = o[0],
            data = o[1];
            if (status) {
                return fetch_index_and_splice($scope.emotes, function(emote) {
                    return emote.id === id
                })
            }
        })
    }
    ;
    $scope.add_emote = function() {
        var form_data, xhr;
        form_data = new FormData;
        form_data.append("file", $scope.new_file);
        form_data.append("emoteid", $scope.new_emoteid);
        xhr = new XMLHttpRequest;
        xhr.open("POST", "/lobby/" + $scope.lobby + "/emote");
        xhr.onload = function() {
            var data, ref, status;
            if (xhr.status === 200) {
                ref = $.parseJSON(xhr.response),
                status = ref[0],
                data = ref[1];
                return $scope.$apply(function() {
                    $scope.processing_emote = false;
                    if (status) {
                        $scope.emotes.push(data);
                        $scope.new_emoteid = "";
                        $scope.new_file = null;
                        return $scope.file_preview = null
                    } else {
                        return window.errordisplay(".naverror", data)
                    }
                })
            }
        }
        ;
        xhr.send(form_data);
        return $scope.processing_emote = true
    }
    ;
    $scope.update_banner = function() {
        var v;
        v = $("#banner_url").val();
        return ajax("/lobby/" + $scope.lobby + "/banner", {
            method: "put",
            data: {
                banner: v
            }
        }, function(status, data) {
            if (status) {
                return $scope.edit_lobbyinfo.banner_url = data
            } else {
                alert(data);
                return window.errordisplay(".error", data)
            }
        })
    }
    ;
    $scope.update_blurb = function() {
        var v;
        v = $("#blurb").val();
        return ajax("/lobby/" + $scope.lobby + "/blurb", {
            method: "put",
            data: {
                blurb: v
            }
        }, function(status, data) {
            if (status) {
                $("#blurb").val("");
                $scope.edit_lobbyinfo.blurb = data;
                return fetch_object($scope.lobbies, function(oo) {
                    return oo.id === $scope.lobby
                }).blurb = data
            } else {
                return window.errordisplay(".error", data)
            }
        })
    }
    ;
    $scope.unfavorite = function($event, lid, obj) {
        $event.stopPropagation();
        return ajax("/favorite/lobby/" + lid, {
            method: "delete"
        }, function(status, data) {
            if (status) {
                return obj.favorited = false
            }
        })
    }
    ;
    $scope.favorite = function($event, lid, obj) {
        $event.stopPropagation();
        return ajax("/favorite/lobby/" + lid, {
            method: "post"
        }, function(status, data) {
            if (status) {
                return obj.favorited = true
            }
        })
    }
    ;
    $scope.ban = function(lu_id) {
        return ajax("/lobbyuser/" + lu_id + "/ban", {
            method: "put"
        }, function(status, data) {
            var obj;
            if (status) {
                obj = fetch_object($scope.need_approvals, function(oo) {
                    return oo.lobbyuser = lu_id
                });
                return obj.banned = true
            }
        })
    }
    ;
    $scope.approve = function(lu_id) {
        return $http({
            url: "/lobbyuser/" + lu_id + "/approve",
            method: "put",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).success(function(o) {
            var obj, status;
            status = o[0];
            if (status) {
                obj = fetch_object($scope.need_approvals, function(oo) {
                    return oo.lobbyuser === lu_id
                });
                return obj.approved = true
            }
        })
    }
    ;
    $scope.load_lobbies = function(type) {
        if (type == null) {
            type = null
        }
        $scope.lobby_loaded = false;
        $scope.lobby_search_q = "";
        return ajax("/lobby/all", {
            data: {
                type: type
            }
        }, function(status, data) {
            if (status) {
                $scope.lobby_loaded = true;
                $scope.lobbies = data;
                $scope.lobbies_type = type;
                return setTimeout(function() {
                    return window.lazy_load_images()
                }, 0)
            }
        })
    }
    ;
    $scope.create_report = function() {
        $scope.add_report.lobby_id = $scope.lobby;
        return ajax("/report", {
            method: "post",
            data: $scope.add_report
        }, function(status, data) {
            if (status) {
                alert("You submitted a report!");
                $scope.add_report = {};
                return $scope.load_reports(1)
            } else {
                return alert(data)
            }
        })
    }
    ;
    $scope.load_reports_by_type = function(type) {
        if (type == null) {
            type = null
        }
        $scope.report_type = type;
        $scope.report_pages = [];
        return $scope.ajax_reports()
    }
    ;
    $scope.load_reports = function(page, cb) {
        if (page == null) {
            page = 1
        }
        $scope.report_page = page;
        $scope.report_pages = [];
        return $scope.ajax_reports(cb)
    }
    ;
    $scope.ajax_reports = function(cb) {
        $scope.report_loading = true;
        return ajax("/lobby/" + $scope.lobby + "/reports", {
            data: {
                page: $scope.report_page,
                status: $scope.report_type
            }
        }, function(status, data) {
            var i, j, page, ref, ref1;
            $scope.report_loading = false;
            if (status) {
                $scope.reports = data;
                page = $scope.report_page;
                if (data.total_pages > 1) {
                    for (i = j = ref = page - 3,
                    ref1 = page + 3; ref <= ref1 ? j < ref1 : j > ref1; i = ref <= ref1 ? ++j : --j) {
                        if (i > 0 && i <= data.total_pages) {
                            $scope.report_pages.push({
                                val: i,
                                sel: i === page,
                                name: i
                            })
                        }
                    }
                    if ($scope.report_pages[0].val !== 1) {
                        $scope.report_pages.unshift({
                            val: 1,
                            name: "&laquo;"
                        })
                    }
                    if ($scope.report_pages[$scope.report_pages.length - 1].val !== data.total_pages) {
                        $scope.report_pages.push({
                            val: data.total_pages,
                            name: "&raquo;"
                        })
                    }
                }
                return typeof cb === "function" ? cb() : void 0
            }
        })
    }
    ;
    $scope.select_page = function(type) {
        $scope.pagetype = type;
        if (type !== "video" && $scope.webrtc) {
            rtc.disconnect_all();
            $scope.webrtc = false
        }
        switch (type) {
        case "reports":
            if (!$scope.reports_loaded) {
                $scope.load_reports(1, function() {});
                return $scope.reports_loaded = true
            }
            break;
        case "video":
            if (!$scope.webrtc) {
                $scope.webrtc = true;
                if (window.development) {
                    rtc.debug = true
                }
                rtc.connect(socket);
                rtc.createStream({
                    video: true,
                    audio: true
                }, function(stream) {
                    return rtc.attachStream(stream, "local_video")
                });
                return rtc.on("add remote stream", function(stream, id) {
                    $("#remote_video_" + id).remove();
                    $("#remote_videos").append("<video id='remote_video_" + id + "' class='tt' data-type='userinfo' data-uid='" + id + "' style='height:80x'></video>");
                    return rtc.attachStream(stream, "remote_video_" + id)
                })
            }
            break;
        case "fame":
            if (!$scope.fame_lobby_loaded) {
                return $http({
                    url: "/lobby/" + $scope.lobby + "/fame",
                    method: "get"
                }).success(function(o) {
                    var data, status;
                    status = o[0],
                    data = o[1];
                    if (status) {
                        $scope.fame_lobby_loaded = true;
                        return $scope.fame_lobbyinfo = data
                    }
                })
            }
            break;
        case "edit":
            $scope.load_edit_src = "/lobby/edit";
            if (!$scope.edit_lobby_loaded) {
                return $http({
                    url: "/lobby/" + $scope.lobby + "/info" + ($window.development ? "?" + new Date : ""),
                    method: "get"
                }).success(function(o) {
                    var data, status;
                    status = o[0],
                    data = o[1];
                    if (status) {
                        $scope.pagetypeedit = "options";
                        $scope.edit_lobbyinfo = data;
                        return $scope.edit_lobby_loaded = true
                    }
                })
            }
            break;
        case "lobbylist":
            $scope.view = "games";
            if (!$scope.lobby_loaded) {
                return $scope.load_lobbies("all")
            }
        }
    }
    ;
    $scope.transform_game_data = function(o) {
        var _, data, i, j, l, len, n, needed, option, player_str, ref, ref1, ref2;
        ref = o.data;
        for (i = j = 0,
        len = ref.length; j < len; i = ++j) {
            data = ref[i];
            if (data.status_id > 0) {
                o.data[i].gamestatus = "progress";
                o.data[i].status_num = (data.status_id - data.status_id % 2) / 2;
                switch (data.status_id % 2) {
                case 0:
                    o.data[i].status_class = "gameimg game-sun shrink";
                    break;
                case 1:
                    o.data[i].status_class = "gameimg game-moon shrink"
                }
            } else if (data.status_id === -1) {
                o.data[i].gamestatus = "gameover";
                o.data[i].status_class = "gameimg game-graveyard shrink"
            } else {
                o.data[i].gamestatus = "join";
                o.data[i].status_class = "gameimg game-village shrink"
            }
            o.data[i].status = window.mafia_status(data.status_id);
            needed = data.target - data.numplayers;
            player_str = "";
            for (_ = l = 0,
            ref1 = data.numplayers; 0 <= ref1 ? l < ref1 : l > ref1; _ = 0 <= ref1 ? ++l : --l) {
                player_str += "<div class='player'></div>"
            }
            for (_ = n = 0,
            ref2 = needed; 0 <= ref2 ? n < ref2 : n > ref2; _ = 0 <= ref2 ? ++n : --n) {
                player_str += "<div class='noplayer'></div>"
            }
            o.data[i].player_str = player_str
        }
        o.sortby.options = function() {
            var len1, p, ref3, results;
            ref3 = o.sortby.options;
            results = [];
            for (p = 0,
            len1 = ref3.length; p < len1; p++) {
                option = ref3[p];
                results.push({
                    id: option,
                    name: "",
                    sel: option === o.sortby.sel
                })
            }
            return results
        }();
        return o
    }
    ;
    $scope.game_sortby = function(type) {
        $scope.sortby = $scope.sortby === type ? null : type;
        return $scope.loadgamepage()
    }
    ;
    $scope.toggle_hidepass = function() {
        $scope.hidepass = !$scope.hidepass;
        return $scope.loadgamepage()
    }
    ;
    $scope.enter_game = function(game) {
        if (game.password) {
            popload("/lobby/html/password", function() {
                poptog("#pop_data");
                $("#password").focus();
                $("#passwordtable").val(game.id);
                return $("#enterpassword").submit(function() {
                    var id;
                    poptog("#pop_data");
                    id = $("#passwordtable").val();
                    $.getJSON("/game/" + id + "/password", {
                        password: $("#password").val()
                    }, function(o) {
                        var data, status;
                        status = o[0],
                        data = o[1];
                        if (status) {
                            window.location.href = "/game/" + data.id + "?password=" + data.password
                        } else {
                            window.errordisplay(".naverror", "Wrong password!")
                        }
                        return $("#password").val("")
                    });
                    return false
                })
            })
        } else {
            window.location.href = "/game/" + game.id
        }
        return false
    }
    ;
    $scope.loadgamepage = function(page_info, callback) {
        if (page_info == null) {
            page_info = {
                page: 1
            }
        }
        if (callback == null) {
            callback = null
        }
        if ($scope.sortby) {
            page_info.sortby = $scope.sortby
        }
        if ($scope.hidepass) {
            page_info.hidepass = true
        }
        return ajax("/game/find", {
            data: page_info
        }, function(status, data) {
            if (status) {
                if ($scope.mobile) {
                    $scope.scroll_top()
                }
                $scope.process_gamepage_data(data);
                return typeof callback === "function" ? callback() : void 0
            }
        })
    }
    ;
    $scope.process_gamepage_data = function(data) {
        data = JSON.parse(data);
        data = $scope.transform_game_data(data);
        $scope.games = data.data;
        delete data.data;
        return $scope.game_info = data
    }
    ;
    $scope.play_anonymous = function(id) {
        window.play_anonymous(id);
        return false
    }
    ;
    id = $location.search().id;
    if (id && id !== window.lobby_id.toString()) {
        $scope.goto_lobby(id)
    } else {
        $scope.process_gamepage_data(window.gamepage);
        $scope.connect_chat();
        $scope.applybackground()
    }
    return $scope.load_announcements()
}
]);
