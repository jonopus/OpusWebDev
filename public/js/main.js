var opus;
(function (opus) {
    var Logger = (function () {
        function Logger() { }
        Logger.log = function log() {
            var messages = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                messages[_i] = arguments[_i + 0];
            }
            if(window.console && window.console.log) {
                window.console.log((new Date().getTime().toString()) + ", " + messages.join(", "));
            }
        }
        return Logger;
    })();
    opus.Logger = Logger;    
})(opus || (opus = {}));

var opus;
(function (opus) {
    var Constants = (function () {
        function Constants() { }
        Constants.STARTUP = "opus.Constants.STARTUP";
        Constants.SHUTDOWN = "opus.Constants.SHUTDOWN";
        Constants.PAGE_CHANGE = "opus.Constants.PAGE_CHANGE";
        return Constants;
    })();
    opus.Constants = Constants;    
})(opus || (opus = {}));

var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var opus;
(function (opus) {
    var PrepBuisnessCommand = (function (_super) {
        __extends(PrepBuisnessCommand, _super);
        function PrepBuisnessCommand() {
            _super.apply(this, arguments);

        }
        PrepBuisnessCommand.prototype.execute = function (notification) {
            opus.Logger.log("PrepBuisnessCommand.execute");
            $.support.cors = true;
        };
        return PrepBuisnessCommand;
    })(puremvc.SimpleCommand);
    opus.PrepBuisnessCommand = PrepBuisnessCommand;    
})(opus || (opus = {}));

var opus;
(function (opus) {
    var PrepModelCommand = (function (_super) {
        __extends(PrepModelCommand, _super);
        function PrepModelCommand() {
            _super.apply(this, arguments);

        }
        PrepModelCommand.prototype.execute = function (notification) {
            opus.Logger.log("PrepModelCommand.execute");
        };
        return PrepModelCommand;
    })(puremvc.SimpleCommand);
    opus.PrepModelCommand = PrepModelCommand;    
})(opus || (opus = {}));

var opus;
(function (opus) {
    var ApplicationMediator = (function (_super) {
        __extends(ApplicationMediator, _super);
        function ApplicationMediator() {
                _super.call(this, ApplicationMediator.NAME, null);
            opus.Logger.log("ApplicationMediator.constructor", ApplicationMediator.NAME);
        }
        ApplicationMediator.NAME = "opus.ApplicationMediator";
        ApplicationMediator.prototype.listNotificationInterests = function () {
            return [
                opus.Constants.PAGE_CHANGE
            ];
        };
        ApplicationMediator.prototype.handleNotification = function (note) {
            switch(note.getName()) {
                case opus.Constants.PAGE_CHANGE: {
                    this.handlePageChange(note.getBody());
                    break;

                }
            }
        };
        ApplicationMediator.prototype.onRegister = function () {
            var _this = this;
            opus.Logger.log("ApplicationMediator.onRegister");
            $('a[href^=#]').click(function (e) {
                return _this.handleHrefClick(e);
            });
            window["History"].Adapter.bind(window, "statechange", function (e) {
                return _this.handleHashChange(e);
            });
            $(window).trigger('statechange');
        };
        ApplicationMediator.prototype.handleHrefClick = function (e) {
            opus.Logger.log("ApplicationMediator.handleHrefClick");
            window["History"].pushState($(e.target).attr("href"));
        };
        ApplicationMediator.prototype.handleHashChange = function (e) {
            opus.Logger.log("ApplicationMediator.handleHashChange", this.getPage());
            opus.ApplicationFacade.getInstance().sendNotification(opus.Constants.PAGE_CHANGE, this.getPage());
        };
        ApplicationMediator.prototype.getPage = function () {
            var page = window["History"].getState().hash;
            opus.Logger.log("ApplicationMediator.getPage", page);
            while(page.charAt(0) === '/' || page.charAt(0) === '#') {
                page = page.substr(1);
            }
            switch(page) {
                case "./":
                case "/":
                case "": {
                    return "asd.html";
                    break;

                }
            }
            return page;
        };
        ApplicationMediator.prototype.handlePageChange = function (page) {
            var _this = this;
            opus.Logger.log("ApplicationMediator.loadContent", page);
            $('#aside').slideUp(400);
            $("#main-content").fadeOut(400, function (e) {
                return _this.loadContent();
            });
        };
        ApplicationMediator.prototype.loadContent = function () {
            var _this = this;
            opus.Logger.log("ApplicationMediator.loadContent", this.getPage());
            $("#main-content").load(this.getPage(), function (e) {
                return _this.showContent();
            });
        };
        ApplicationMediator.prototype.showContent = function () {
            opus.Logger.log("ApplicationMediator.showContent");
            var html = $('#main-content aside').detach().html();
            $('#aside').html(html || "");
            $('#aside').slideDown(400);
            $("#main-content").fadeIn(400);
        };
        ApplicationMediator.prototype.onRemove = function () {
            opus.Logger.log("ApplicationMediator.onRemove");
        };
        return ApplicationMediator;
    })(puremvc.Mediator);
    opus.ApplicationMediator = ApplicationMediator;    
})(opus || (opus = {}));

var opus;
(function (opus) {
    var PrepControllCommand = (function (_super) {
        __extends(PrepControllCommand, _super);
        function PrepControllCommand() {
            _super.apply(this, arguments);

        }
        PrepControllCommand.prototype.execute = function (notification) {
            opus.Logger.log("PrepControllCommand.execute");
        };
        return PrepControllCommand;
    })(puremvc.SimpleCommand);
    opus.PrepControllCommand = PrepControllCommand;    
})(opus || (opus = {}));

var opus;
(function (opus) {
    function validateListener(listener, fnName) {
        if(typeof listener !== 'function') {
            throw new Error('listener is a required param of {fn}() and should be a Function.'.replace('{fn}', fnName));
        }
    }
    var Signal = (function () {
        function Signal() {
            this._bindings = [];
            this._prevParams = null;
            this.VERSION = '::VERSION_NUMBER::';
            this.memorize = false;
            this._shouldPropagate = true;
            this.active = true;
        }
        Signal.prototype._registerListener = function (listener, isOnce, listenerContext, priority) {
            if (typeof isOnce === "undefined") { isOnce = null; }
            if (typeof listenerContext === "undefined") { listenerContext = null; }
            if (typeof priority === "undefined") { priority = null; }
            var prevIndex = this._indexOfListener(listener, listenerContext);
            var binding;
            if(prevIndex !== -1) {
                binding = this._bindings[prevIndex];
                if(binding.isOnce() !== isOnce) {
                    throw new Error('You cannot add' + (isOnce ? '' : 'Once') + '() then add' + (!isOnce ? '' : 'Once') + '() the same listener without removing the relationship first.');
                }
            } else {
                binding = new SignalBinding(this, listener, isOnce, listenerContext, priority);
                this._addBinding(binding);
            }
            if(this.memorize && this._prevParams) {
                binding.execute(this._prevParams);
            }
            return binding;
        };
        Signal.prototype._addBinding = function (binding) {
            var n = this._bindings.length;
            do {
                --n;
            }while(this._bindings[n] && binding._priority <= this._bindings[n]._priority)
            this._bindings.splice(n + 1, 0, binding);
        };
        Signal.prototype._indexOfListener = function (listener, context) {
            var n = this._bindings.length;
            var cur;

            while(n--) {
                cur = this._bindings[n];
                if(cur._listener === listener && cur.context === context) {
                    return n;
                }
            }
            return -1;
        };
        Signal.prototype.has = function (listener, context) {
            return this._indexOfListener(listener, context) !== -1;
        };
        Signal.prototype.add = function (listener, listenerContext, priority) {
            if (typeof listenerContext === "undefined") { listenerContext = null; }
            if (typeof priority === "undefined") { priority = null; }
            validateListener(listener, 'add');
            return this._registerListener(listener, false, listenerContext, priority);
        };
        Signal.prototype.addOnce = function (listener, listenerContext, priority) {
            if (typeof listenerContext === "undefined") { listenerContext = null; }
            if (typeof priority === "undefined") { priority = null; }
            validateListener(listener, 'addOnce');
            return this._registerListener(listener, true, listenerContext, priority);
        };
        Signal.prototype.remove = function (listener, context) {
            if (typeof context === "undefined") { context = null; }
            validateListener(listener, 'remove');
            var i = this._indexOfListener(listener, context);
            if(i !== -1) {
                this._bindings[i]._destroy();
                this._bindings.splice(i, 1);
            }
            return listener;
        };
        Signal.prototype.removeAll = function () {
            var n = this._bindings.length;
            while(n--) {
                this._bindings[n]._destroy();
            }
            this._bindings.length = 0;
        };
        Signal.prototype.getNumListeners = function () {
            return this._bindings.length;
        };
        Signal.prototype.halt = function () {
            this._shouldPropagate = false;
        };
        Signal.prototype.dispatch = function (params) {
            if (typeof params === "undefined") { params = null; }
            if(!this.active) {
                return;
            }
            var paramsArr = Array.prototype.slice.call(arguments);
            var n = this._bindings.length;
            var bindings;

            if(this.memorize) {
                this._prevParams = paramsArr;
            }
            if(!n) {
                return;
            }
            bindings = this._bindings.slice(0);
            this._shouldPropagate = true;
            do {
                n--;
            }while(bindings[n] && this._shouldPropagate && bindings[n].execute(paramsArr) !== false)
        };
        Signal.prototype.forget = function () {
            this._prevParams = null;
        };
        Signal.prototype.dispose = function () {
            this.removeAll();
            delete this._bindings;
            delete this._prevParams;
        };
        Signal.prototype.toString = function () {
            return '[Signal active:' + this.active + ' numListeners:' + this.getNumListeners() + ']';
        };
        return Signal;
    })();
    opus.Signal = Signal;    
    var SignalBinding = (function () {
        function SignalBinding(signal, listener, isOnce, listenerContext, priority) {
            this.active = true;
            this.params = null;
            this._listener = listener;
            this._isOnce = isOnce;
            this.context = listenerContext;
            this._signal = signal;
            this._priority = priority || 0;
        }
        SignalBinding.prototype.execute = function (paramsArr) {
            var handlerReturn;
            var params;

            if(this.active && !!this._listener) {
                params = this.params ? this.params.concat(paramsArr) : paramsArr;
                handlerReturn = this._listener.apply(this.context, params);
                if(this._isOnce) {
                    this.detach();
                }
            }
            return handlerReturn;
        };
        SignalBinding.prototype.detach = function () {
            return this.isBound() ? this._signal.remove(this._listener, this.context) : null;
        };
        SignalBinding.prototype.isBound = function () {
            return (!!this._signal && !!this._listener);
        };
        SignalBinding.prototype.getListener = function () {
            return this._listener;
        };
        SignalBinding.prototype._destroy = function () {
            delete this._signal;
            delete this._listener;
            delete this.context;
        };
        SignalBinding.prototype.isOnce = function () {
            return this._isOnce;
        };
        SignalBinding.prototype.toString = function () {
            return '[SignalBinding isOnce:' + this._isOnce + ', isBound:' + this.isBound() + ', active:' + this.active + ']';
        };
        return SignalBinding;
    })();
    opus.SignalBinding = SignalBinding;    
})(opus || (opus = {}));

var org;
(function (org) {
    (function (casalib) {
        
    })(org.casalib || (org.casalib = {}));
    var casalib = org.casalib;

})(org || (org = {}));

var org;
(function (org) {
    (function (casalib) {
        
    })(org.casalib || (org.casalib = {}));
    var casalib = org.casalib;

})(org || (org = {}));

var org;
(function (org) {
    (function (casalib) {
        (function (time) {
            var Timer = (function () {
                function Timer(delay, repeatCount) {
                    if (typeof delay === "undefined") { delay = 0; }
                    if (typeof repeatCount === "undefined") { repeatCount = 0; }
                    this.timer = new opus.Signal();
                    this.timerComplete = new opus.Signal();
                    this.delay = delay;
                    this.repeatCount = repeatCount;
                    this.reset();
                }
                Timer.prototype.reset = function () {
                    this._currentCount = 0;
                    if(this._running == true) {
                        this.stop();
                    }
                };
                Timer.prototype.start = function () {
                    var _this = this;
                    if(this._running != true) {
                        this._running = true;
                        this.timerToken = setInterval(function () {
                            return _this.exe();
                        }, this.delay);
                    }
                };
                Timer.prototype.stop = function () {
                    clearInterval(this.timerToken);
                    this._running = false;
                };
                Object.defineProperty(Timer.prototype, "currentCount", {
                    get: function () {
                        return this._currentCount;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Timer.prototype, "running", {
                    get: function () {
                        return this._running;
                    },
                    enumerable: true,
                    configurable: true
                });
                Timer.prototype.exe = function () {
                    this._currentCount += 1;
                    this.timer.dispatch();
                    if(this._currentCount >= this.repeatCount) {
                        this.stop();
                        this.timerComplete.dispatch();
                    }
                };
                return Timer;
            })();
            time.Timer = Timer;            
        })(casalib.time || (casalib.time = {}));
        var time = casalib.time;

    })(org.casalib || (org.casalib = {}));
    var casalib = org.casalib;

})(org || (org = {}));

var org;
(function (org) {
    (function (casalib) {
        (function (time) {
            var Interval = (function (_super) {
                __extends(Interval, _super);
                function Interval(delay, repeatCount, callBack, args) {
                    var _this = this;
                                _super.call(this, delay, repeatCount);
                    this.callBack = callBack;
                    this.args = args;
                    this.timer.add(function (x) {
                        return (_this._timerHandler());
                    });
                }
                Interval.setInterval = function setInterval(callBack, delay) {
                    var args = [];
                    for (var _i = 0; _i < (arguments.length - 2); _i++) {
                        args[_i] = arguments[_i + 2];
                    }
                    return new org.casalib.time.Interval(delay, 0, callBack, args);
                }
                Interval.setTimeout = function setTimeout(callBack, delay) {
                    var args = [];
                    for (var _i = 0; _i < (arguments.length - 2); _i++) {
                        args[_i] = arguments[_i + 2];
                    }
                    return new org.casalib.time.Interval(delay, 1, callBack, args);
                }
                Object.defineProperty(Interval.prototype, "callBack", {
                    get: function () {
                        return this._callBack;
                    },
                    set: function (cb) {
                        this._callBack = cb;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Interval.prototype, "args", {
                    get: function () {
                        return this._arguments;
                    },
                    set: function (args) {
                        this._arguments = args;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Interval.prototype, "destroyed", {
                    get: function () {
                        return this._isDestroyed;
                    },
                    enumerable: true,
                    configurable: true
                });
                Interval.prototype.destroy = function () {
                    this.reset();
                };
                Interval.prototype._timerHandler = function () {
                    this._callBack.apply(null, [
                        this._arguments
                    ]);
                };
                return Interval;
            })(org.casalib.time.Timer);
            time.Interval = Interval;            
        })(casalib.time || (casalib.time = {}));
        var time = casalib.time;

    })(org.casalib || (org.casalib = {}));
    var casalib = org.casalib;

})(org || (org = {}));

var org;
(function (org) {
    (function (casalib) {
        (function (process) {
            var Process = (function () {
                function Process() {
                    this.started = new opus.Signal();
                    this.stopped = new opus.Signal();
                    this.completed = new opus.Signal();
                    this.priority = Process.NORM_PRIORITY;
                }
                Process.NORM_PRIORITY = 0;
                Process.prototype.start = function () {
                    this.running = true;
                    this._hasCompleted = false;
                    this.started.dispatch();
                };
                Process.prototype.stop = function () {
                    this.running = false;
                    this.stopped.dispatch();
                };
                Object.defineProperty(Process.prototype, "hasCompleted", {
                    get: function () {
                        return this._hasCompleted;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Process.prototype, "priority", {
                    get: function () {
                        return this._priority;
                    },
                    set: function (priority) {
                        this._priority = priority;
                    },
                    enumerable: true,
                    configurable: true
                });
                Process.prototype.destroy = function () {
                    if(this.running) {
                        this.stop();
                    }
                };
                Process.prototype.complete = function () {
                    this.running = false;
                    this._hasCompleted = true;
                    this.completed.dispatch();
                };
                return Process;
            })();
            process.Process = Process;            
        })(casalib.process || (casalib.process = {}));
        var process = casalib.process;

    })(org.casalib || (org.casalib = {}));
    var casalib = org.casalib;

})(org || (org = {}));

var org;
(function (org) {
    (function (casalib) {
        (function (time) {
            var Sequence = (function (_super) {
                __extends(Sequence, _super);
                function Sequence(isLooping) {
                    if (typeof isLooping === "undefined") { isLooping = false; }
                    var _this = this;
                                _super.call(this);
                    this.looped = new opus.Signal();
                    this.resumed = new opus.Signal();
                    this.name = "Sequence1";
                    this.looping = isLooping;
                    this._sequence = [];
                    this._interval = org.casalib.time.Interval.setTimeout(function () {
                        return (_this._delayComplete());
                    }, 1);
                }
                Sequence.prototype.addTask = function (closure, delay, signal, position) {
                    if (typeof delay === "undefined") { delay = 0; }
                    if (typeof signal === "undefined") { signal = null; }
                    if (typeof position === "undefined") { position = -1; }
                    this._sequence.splice((position == -1) ? this._sequence.length : position, 0, new org.casalib.time.Task(closure, delay, signal));
                };
                Sequence.prototype.removeTask = function (closure) {
                    var l = this._sequence.length;
                    while(l--) {
                        if(this._sequence[l].closure == closure) {
                            this._sequence[l] = null;
                            this._sequence.splice(l, 1);
                        }
                    }
                };
                Sequence.prototype.start = function () {
                    _super.prototype.start.call(this);
                    this._removeCurrentListener();
                    this._currentTaskId = -1;
                    this._loops = 0;
                    this._interval.reset();
                    this._startDelay();
                    this.started.dispatch();
                };
                Sequence.prototype.stop = function () {
                    if(!this.running) {
                        return;
                    }
                    _super.prototype.stop.call(this);
                    this._interval.reset();
                    this.stopped.dispatch();
                };
                Sequence.prototype.resume = function () {
                    if(this.running) {
                        return;
                    }
                    if(this._currentTaskId == -1) {
                        this.start();
                        return;
                    }
                    _super.prototype.running = true;
                    if(this._hasDelayCompleted) {
                        this._startDelay();
                    } else {
                        this._interval.start();
                    }
                    this.resumed.dispatch();
                };
                Object.defineProperty(Sequence.prototype, "looping", {
                    get: function () {
                        return this._isLooping;
                    },
                    set: function (isLooping) {
                        this._isLooping = isLooping;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Sequence.prototype, "loops", {
                    get: function () {
                        return this._loops;
                    },
                    enumerable: true,
                    configurable: true
                });
                Sequence.prototype.destroy = function () {
                    this._removeCurrentListener();
                    this._interval.destroy();
                    this._sequence.splice(0);
                    _super.prototype.destroy.call(this);
                };
                Sequence.prototype._startDelay = function (e) {
                    if (typeof e === "undefined") { e = null; }
                    if(this._currentTaskId != -1) {
                        this._removeCurrentListener();
                    }
                    if(!this.running) {
                        return;
                    }
                    this._hasDelayCompleted = false;
                    if(++this._currentTaskId >= this._sequence.length) {
                        this._currentTaskId--;
                        this._removeCurrentListener();
                        this._currentTaskId = -1;
                        this._loops++;
                        if(this.looping) {
                            this._startDelay();
                            this.looped.dispatch();
                        } else {
                            this.complete();
                        }
                        return;
                    }
                    if(this._current.delay <= 0) {
                        this._delayComplete();
                    } else {
                        this._interval.reset();
                        this._interval.delay = this._current.delay;
                        this._interval.start();
                    }
                };
                Sequence.prototype._delayComplete = function () {
                    var _this = this;
                    this._hasDelayCompleted = true;
                    if(this._current.signal == null) {
                        this._current.closure();
                        this._startDelay();
                    } else {
                        this._current.signal.add(function () {
                            return (_this._startDelay());
                        });
                        this._current.closure();
                    }
                };
                Sequence.prototype._removeCurrentListener = function () {
                    if(this._currentTaskId == -1 || this._current == null) {
                        return;
                    }
                    if(this._current.signal != null) {
                        this._current.signal.remove(this._startDelay);
                    }
                };
                Object.defineProperty(Sequence.prototype, "_current", {
                    get: function () {
                        return this._sequence[this._currentTaskId];
                    },
                    enumerable: true,
                    configurable: true
                });
                return Sequence;
            })(org.casalib.process.Process);
            time.Sequence = Sequence;            
        })(casalib.time || (casalib.time = {}));
        var time = casalib.time;

    })(org.casalib || (org.casalib = {}));
    var casalib = org.casalib;

})(org || (org = {}));

var org;
(function (org) {
    (function (casalib) {
        (function (time) {
            var Task = (function () {
                function Task(closure, delay, signal) {
                    if (typeof delay === "undefined") { delay = 0; }
                    if (typeof signal === "undefined") { signal = null; }
                    this.closure = closure;
                    this.delay = delay;
                    this.signal = signal;
                }
                return Task;
            })();
            time.Task = Task;            
        })(casalib.time || (casalib.time = {}));
        var time = casalib.time;

    })(org.casalib || (org.casalib = {}));
    var casalib = org.casalib;

})(org || (org = {}));

var opus;
(function (opus) {
    var BubbleUpLogo = (function (_super) {
        __extends(BubbleUpLogo, _super);
        function BubbleUpLogo() {
                _super.call(this);
            var shape = new createjs.Shape();
            shape.setTransform(136.1, 46.9);
            shape.graphics.beginLinearGradientFill([
                "#1a3957", 
                "#174771", 
                "#266281", 
                "#387d99", 
                "#7ba8b5", 
                "#7ba8b5", 
                "#47889f", 
                "#28607f", 
                "#174972", 
                "#193957"
            ], [
                0, 
                0.098, 
                0.2, 
                0.298, 
                0.408, 
                0.6, 
                0.698, 
                0.8, 
                0.898, 
                1
            ], -97.7, -19.8, 103.5, 2.2).decodePath("ASggVQAbAbAAAmQAAAmgbAbQgbAbgmAAQgVAAgOAPQgOAOAAAVQAAAUAOAPQAOAPAVAAQBPAAA4g4QA4g4AAhPQAAhOg4g4Qg4g4hPAAQg4AAguAeQgGgNgMgIQgMgIgPAAQgUAAgPAPQgOAOAAAVIAACOQAAAmgbAbQgbAbgmAAQgmAAgbgbQgbgbAAgmIAAk/IArApQAcAcAdgdQAdgdgdgcIh6h0QgNgLgQgBQgRAAgMAMIh1BzQgcAcAdAdQAdAdAcgcIAngmIAAE9QAABPA4A4QA4A4BOAAQA0AAAugbIAACeQAAAUAOAPQAPAPAUAAQAVAAAOgPQAPgPAAgUIAAlEQAAgmAbgbQAbgbAmAAQAmAAAbAb").beginLinearGradientFill([
                "#1e405f", 
                "#184672", 
                "#226591", 
                "#387d99", 
                "#8ec1ce", 
                "#8ec1ce", 
                "#47889f", 
                "#397ea2", 
                "#174972", 
                "#193957"
            ], [
                0, 
                0.098, 
                0.2, 
                0.298, 
                0.408, 
                0.6, 
                0.698, 
                0.8, 
                0.898, 
                1
            ], -99.6, -4.5, 101.7, 17.6).decodePath("AEMhaQg4A4AABPQAAAxAXArIgDAAQgmAAgbgbQgbgbAAgmIAAjZQAAgVgOgOQgOgOgVAAQgVAAgOAOQgOAOAAAVIAACpQgQg+gzgoQg0gphCAAQgUAAgPAPQgPAPAAAUQAAAUAPAPQAPAOAUAAQAmAAAbAbQAbAbAAAmQAAAmgbAbQgbAbgmAAQgmAAgbgbQgbgbAAgmIAAjZQAAgUgPgPQgPgOgUAAQgUAAgPAOQgPAOAAAVIAABTQgbgbgigPQgkgPgnAAQgVAAgOAPQgPAPAAAUQAAAUAPAPQAOAOAVAAQAmAAAbAbQAbAbAAAmQAAAmgbAbQgbAbgmAAQgmAAgagbQgbgbAAgmIAAjZQAAgUgPgPQgPgOgUAAQgUAAgPAOQgPAOAAAVIAABFIgAAFIAACOQAAAmgbAbQgbAbgmAAQgmAAgagbQgbgbAAgmIAAiOQAAgUgPgPQgPgOgUAAQgUAAgPAOQgPAPAAAUIAABFQgWg1gwggQgwghg7AAQgUAAgPAPQgPAPAAAUQAAAUAPAPQAOAOAVAAQAmAAAbAbQAbAbAAAmQAAAmgbAbQgbAbgmAAQgmAAgagbQgbgbAAgmIAAjZQAAgVgPgOQgPgOgUAAQgUAAgOAOQgPAOAAAVIAADZQAABPA4A4QA4A4BPAAQBBAAAzgoQAygnARg8QASA8AyAnQAzAoBAAAQAqAAAmgRQAjgRAbgdQAbAdAkARQAmARApAAQAzAAAsgZQArgZAZgrQAZArArAZQAsAZAzAAQBGAAA1gtQA1gtAMhEQAMBEA1AtQA1AtBGAAIE6AAQAUAAAPgPQAOgPAAgUQAAgUgOgPQgPgPgUAAIiQAAQgmAAgbgbQgbgbAAgmQAAgmAbgbQAbgbAmAAQAYAAAVALQAUAMANATIhHAAQgUAAgPAPQgOAOAAAVQAAAUAOAPQAPAOAUAAICHAAQAUAAAPgOQAOgPAAgUQAAhPg4g4Qg4g4hPAAQhOAAg4A4");
            var shape_1 = new createjs.Shape();
            shape_1.setTransform(135.9, 46.5);
            shape_1.graphics.beginLinearGradientFill([
                "#3987a1", 
                "#f7fbfc", 
                "#43a0b6"
            ], [
                0.18, 
                0.565, 
                1
            ], -135.8, 0, 135.9, 0).decodePath("ARfjEQgwAAgrASQgZgQgeAAQgpAAgdAdQgdAdAAApIAACOQAAASgNANQgNANgSAAQgSAAgMgNQgNgNAAgSIAAjcQAKADALAAQAcAAAYgQQAYgRAKgaQAKgZgFgaQgGgagUgTIh6h0QgbgaglAAQgmAAgaAaIh1B0QgTATgGAaQgFAaAKAZQALAaAXAQQAXAQAcAAQAJAAAIgCIAABFQgIgKgJgJQhHhHhjAAQhEAAg6AkQg4AjgfA6IAAhpQAAgpgdgdQgdgdgpAAQgpAAgdAdQgdAdAAApIAAASQg9gqhKAAQgXAAgUAKQgFgkgcgYQgcgZgmAAQgnAAgdAbQgcAagDAnQgqgQgtAAQgXAAgUAKQgFgkgcgYQgcgZglAAQgpAAgdAdQgdAdAAApIgADZQAAASgNANQgNANgSAAQgSAAgMgNQgNgNAAgSIAAiOQAAgpgdgdQgdgdgpAAQgaAAgXANQgWANgNAWIgHgEQg8gqhLAAQgXAAgUAKQgFgkgcgYQgcgZgmAAQgpAAgdAdQgdAdAAApIAADZQAABjBHBHQBGBGBjAAQBSAABAgyQAVgPARgUQASAUATAPQBCAyBQAAQBOAAA/gvQBAAvBOAAQA/AAA5ghQAYgOATgSQASARAaAPQA4AhA/AAQBYAABDg5QASgPAPgTQANASAUAQQAhAcAoAPQAoAPArAAIE6AAQApAAAdgdQAZgZADghQAHAIAIAIQBGBHBjAAQAWAAAagFIAABWQAAApAdAdQAdAdApAAQApAAAdgdQAdgdAAgpIAAhdQATAJAXAAQBjAABGhGQBHhGAAhjQAAhkhHhGQhGhGhjAA").decodePath("ARfABQASAAANANQANANAAASQAAASgNANQgNANgSAAQgWAAgVAJIAAg0QAAgSANgNQANgNASAA").decodePath("ALflCQgJABgGADQgOAGgIANQgIANAAAPQgAgOgIgMQgIgNgOgFQgJgEgHgAIAugtIAtAr").decodePath("AQThLQgeATgRAfQgSAgAAAkIABFEIgBAAIAAieQAAgNgHgMQgHgLgMgHQgMgHgNAAQgMAAgMAHQAggTASgfQATghAAgmIAAiOQAKAVAVAFQAUAGATgL").decodePath("AITgDQAAgMgGgLQAVAiAAAnIg/AAQANgBALgGQAMgHAHgLQAHgLgBgO").decodePath("AGQC9IihAAQAbgBAOgYQAGgLABgNQAAgNgGgLQATAhAgAUQAgATAlAB").decodePath("AhwASQANANAAASQAAASgNANQgNANgSAAQgSAAgMgNQgNgNAAgSIAAg0QASAKAYAAQASAAANAN").decodePath("AnUAFQASAAANANQANANAAASQAAASgNANQgNANgSAAQgSAAgMgNQgNgNAAgSIAAg0QATAKAXAA").decodePath("Ak6gpQAOgFAJgNQAIgMAAgPIAACFQAAAnAUAhQgPgXgbAAQgNAAgLAGQgLAGgHAKQAUgiAAgmQAAg5gogpQAKAKAPADQAOADAOgG").decodePath("ABJAnQATgOAAgYIAAAuQAAANACAMQgEgUgSgM").decodePath("AgAAwQAAgRgDgOQAGAQAOAJQgPAMgDATQACgMAAgN").decodePath("AphhkIAACUQAAA1AjAoQgPgPgVAAQgUAAgPAPQAjgoAAg1IAAiOIABgF").decodePath("AuIAGQAKgNAAgRIAABIQAAASAEAQQgFgNgMgJQgNgKgRAAQgQAAgNAKQgMAJgFAOQAEgRAAgSQAAgdgKgYQAHAPAPAIQAQAIARgEQASgEAMgO").decodePath("AxBASQANANAAASQAAASgNANQgNANgSAAQgSAAgMgNQgNgNAAgSIAAg0QATAKAXAAQASAAANAN");
            var shape_2 = new createjs.Shape();
            shape_2.setTransform(137.5, 49.7);
            shape_2.graphics.beginFill("rgba(0,0,0,0.498)").decodePath("ARfjEQgxAAgrASQgYgQgeAAQgpAAgdAdQgdAdAAApIAACOQAAASgNANQgNANgSAAQgSAAgMgNQgNgNAAgSIAAjcQAKADAKAAQAcAAAYgRQAYgRALgaQAKgZgGgaQgGgagUgTIh6h0QgbgagkAAQgmAAgaAaIh1B0QgTATgGAaQgGAaALAZQALAaAXAQQAYAQAcAAQAJAAAIgCIAABEQgIgJgJgJQhGhHhkAAQhEAAg6AkQg5AjgfA6IAAhpQAAgpgdgdQgdgdgpAAQgpAAgdAdQgdAdAAApIAAASQg9gqhKAAQgXAAgUAKQgFgkgcgYQgcgZgmAAQgnAAgcAbQgdAagDAmQgqgQgtAAQgXAAgUAKQgFgkgcgYQgcgZglAAQgpAAgdAdQgdAdAAApIgADZQAAASgNANQgNANgSAAQgSAAgMgNQgNgNAAgSIAAiOQAAgpgdgdQgdgdgpAAQgaAAgXANQgWANgOAVIgHgEQg8gqhLAAQgXAAgUAKQgFgkgcgYQgcgZgmAAQgpAAgdAdQgdAdAAApIAADZQAABkBHBGQBGBGBjAAQBSAABBgyQAUgPARgUQASAUAUAPQBBAyBQAAQBPAAA/gvQA/AvBOAAQBAAAA4ghQAYgOAUgSQASARAaAPQA5AhA/AAQBYAABDg5QASgPAQgTQANASAUAQQAhAcAoAPQAoAPArAAIE6AAQApAAAdgdQAZgZADghQAHAIAIAIQBGBHBjAAQAWAAAagFIAABWQAAApAdAdQAdAdApAAQApAAAdgdQAdgdAAgpIAAhdQATAJAYAAQBjAABGhGQBHhGAAhjQAAhkhHhGQhGhGhjAA").decodePath("ARfBWQgWAAgUAJIAAg0QAAgSANgNQANgNASAAQASAAANANQANANAAASQAAASgNANQgNANgSAA").decodePath("ALQk+QgOAGgIANQgIANAAAPQgBgOgIgMQgIgNgOgFQgIgEgHgAIAtgtIAtArQgJABgFAD").decodePath("APrhGQAUAGATgLQgeATgRAfQgSAgAAAkIAAFEIgAAAIAAieQAAgNgHgMQgHgLgMgHQgMgHgNAAQgMAAgMAHQAfgTASgfQATghAAgmIAAiOQAJAVAWAF").decodePath("AINgaQAVAiAAAnIg/AAQANgBALgGQAMgHAHgLQAHgLgAgOQAAgMgGgL").decodePath("AEZB0QASAhAgATQAgATAlABIihAAQAbgBAOgXQAHgLAAgNQAAgNgFgL").decodePath("AkbhWIAACFQAAAnATAhQgPgXgaAAQgNAAgMAGQgLAGgHAKQAUgiAAgmQAAg5gogpQAKAKAPADQAOADANgGQAOgFAIgNQAIgMABgP").decodePath("Ai4AwIAAg0QATAKAXAAQASAAANANQANANAAASQAAASgNANQgNANgSAAQgSAAgMgNQgNgNAAgS").decodePath("Am2ASQANANAAASQAAASgNANQgNANgSAAQgSAAgMgNQgNgNAAgSIAAg0QASAKAXAAQASAAANAN").decodePath("ABJAnQATgOAAgYIAAAuQAAANACAMQgEgUgSgM").decodePath("AgCBIQACgMAAgNQAAgRgDgOQAGAQAOAJQgPAMgDAT").decodePath("AphhkIAACUQAAA1AjAoQgPgPgVAAQgUAAgPAPQAjgoAAg1IAAiOIAAgF").decodePath("AyIAwIAAg0QASAKAXAAQASAAANANQANANAAASQAAASgNANQgNANgSAAQgSAAgMgNQgNgNAAgS").decodePath("AvRAwQAAgdgKgYQAHAPAPAIQAPAIARgEQASgEALgOQALgNAAgRIAABIQAAASAEAQQgFgNgLgJQgNgKgRAAQgRAAgNAKQgMAJgFAOQAEgRAAgS");
            this.addChild(shape_2, shape_1, shape);
        }
        return BubbleUpLogo;
    })(createjs.Container);
    opus.BubbleUpLogo = BubbleUpLogo;    
})(opus || (opus = {}));

var opus;
(function (opus) {
    var AnimationMediator = (function (_super) {
        __extends(AnimationMediator, _super);
        function AnimationMediator() {
                _super.call(this, AnimationMediator.NAME, null);
            this.startedup = new opus.Signal();
            this.preloadComplete = new opus.Signal();
            this.text = new createjs.Text("Drag and drop the shapes", "24px Cinzel, serif", "#000000");
            this.text.alpha = 0;
            this.ball = new createjs.Shape();
            this.ball.name = "ball";
            this.ball.graphics.setStrokeStyle(5, 'round', 'round');
            this.ball.graphics.beginStroke(('#000000'));
            this.ball.graphics.beginFill("#FF0000").drawCircle(0, 0, 50);
            this.ball.graphics.endStroke();
            this.ball.graphics.endFill();
            this.ball.graphics.setStrokeStyle(1, 'round', 'round');
            this.ball.graphics.beginStroke(('#000000'));
            this.ball.graphics.moveTo(0, 0);
            this.ball.graphics.lineTo(0, 50);
            this.ball.graphics.endStroke();
            this.ball.x = 200;
            this.ball.y = 50;
            this.ball.alpha = 0;
            this.logo = new opus.BubbleUpLogo();
            this.logo.alpha = 0;
            this.ballTween = createjs.Tween.get(this.ball);
            this.logoTween = createjs.Tween.get(this.logo);
        }
        AnimationMediator.NAME = "opus.AnimationMediator";
        AnimationMediator.prototype.listNotificationInterests = function () {
            return [
                opus.Constants.PAGE_CHANGE
            ];
        };
        AnimationMediator.prototype.handleNotification = function (note) {
            switch(note.getName()) {
                case opus.Constants.PAGE_CHANGE: {
                    this.handlePageChange(note.getBody());
                    break;

                }
            }
        };
        AnimationMediator.prototype.handlePageChange = function (page) {
            opus.Logger.log("ApplicationMediator.loadContent", page);
            switch(page) {
                case "qwe.html": {
                    this.qwe();
                    break;

                }
                case "asd.html": {
                    this.asd();
                    break;

                }
                case "zxc.html": {
                    this.zxc();
                    break;

                }
            }
            createjs.Tween.get(this.text).to({
                alpha: 0
            }, 1000, createjs["Ease"]["sineIn"]).call(this.updateText, [
                page
            ], this).to({
                alpha: 1
            }, 1000, createjs["Ease"]["sineIn"]);
        };
        AnimationMediator.prototype.updateText = function (page) {
            opus.Logger.log("AnimationMediator.updateText", this.text.text, page);
            this.text.text = page;
        };
        AnimationMediator.prototype.onRegister = function () {
            var _this = this;
            opus.Logger.log("AnimationMediator.onRegister");
            this.sequence = new org.casalib.time.Sequence();
            this.sequence.addTask(function () {
                return (_this.createStage());
            });
            this.sequence.addTask(function () {
                return (_this.addItemsToStage());
            });
            this.sequence.addTask(function () {
                return (_this.show());
            });
            this.sequence.start();
            this.startedup.dispatch();
        };
        AnimationMediator.prototype.onRemove = function () {
            opus.Logger.log("AnimationMediator.onRemove");
        };
        AnimationMediator.prototype.createStage = function () {
            var _this = this;
            opus.Logger.log("AnimationMediator.createStage");
            this.canvas = $("<canvas id='canvas' width='1000' height='1000'><p>Your browser is sooooo old ! Download a modern one now !</p></canvas>").get(0);
            $("#animation").append(this.canvas);
            this.stage = new createjs.Stage(this.canvas);
            this.stage.autoClear = true;
            createjs.Ticker.setFPS(64);
            createjs.Ticker.addListener(function (x) {
                return (_this.update());
            });
        };
        AnimationMediator.prototype.update = function () {
            this.stage.update();
        };
        AnimationMediator.prototype.addItemsToStage = function () {
            opus.Logger.log("AnimationMediator.addItemsToStage");
            this.stage.addChild(this.ball, this.logo, this.text);
        };
        AnimationMediator.prototype.show = function () {
            this.ballTween.to({
                alpha: 1
            }, 1000, createjs["Ease"]["sineIn"]);
            this.logoTween.to({
                alpha: 1
            }, 2000, createjs["Ease"]["sineIn"]);
        };
        AnimationMediator.prototype.qwe = function () {
            this.ballTween.to({
                x: 5,
                y: 10,
                rotation: 0
            }, 1000, createjs["Ease"]["sineInOut"]);
            this.logoTween.to({
                x: 10,
                y: -20,
                rotation: 5
            }, 2000, createjs["Ease"]["sineInOut"]);
        };
        AnimationMediator.prototype.asd = function () {
            this.ballTween.to({
                x: 10,
                y: 20,
                rotation: 90
            }, 1000, createjs["Ease"]["sineInOut"]);
            this.logoTween.to({
                x: 20,
                y: -15,
                rotation: 3
            }, 2000, createjs["Ease"]["sineInOut"]);
        };
        AnimationMediator.prototype.zxc = function () {
            this.ballTween.to({
                x: 0,
                y: 30,
                rotation: 180
            }, 1000, createjs["Ease"]["sineInOut"]);
            this.logoTween.to({
                x: 30,
                y: -10,
                rotation: 1
            }, 2000, createjs["Ease"]["sineInOut"]);
        };
        return AnimationMediator;
    })(puremvc.Mediator);
    opus.AnimationMediator = AnimationMediator;    
})(opus || (opus = {}));

var opus;
(function (opus) {
    var PrepViewCommand = (function (_super) {
        __extends(PrepViewCommand, _super);
        function PrepViewCommand() {
            _super.apply(this, arguments);

        }
        PrepViewCommand.prototype.execute = function (notification) {
            opus.Logger.log("PrepViewCommand.execute");
            opus.ApplicationFacade.getInstance().registerMediator(new opus.AnimationMediator());
            opus.ApplicationFacade.getInstance().registerMediator(new opus.ApplicationMediator());
        };
        return PrepViewCommand;
    })(puremvc.SimpleCommand);
    opus.PrepViewCommand = PrepViewCommand;    
})(opus || (opus = {}));

var opus;
(function (opus) {
    var StartupCommand = (function (_super) {
        __extends(StartupCommand, _super);
        function StartupCommand() {
            _super.apply(this, arguments);

        }
        StartupCommand.prototype.initializeMacroCommand = function () {
            opus.Logger.log("StartupCommand.initializeMacroCommand");
            this.addSubCommand(opus.PrepModelCommand);
            this.addSubCommand(opus.PrepViewCommand);
            this.addSubCommand(opus.PrepControllCommand);
            this.addSubCommand(opus.PrepBuisnessCommand);
        };
        return StartupCommand;
    })(puremvc.MacroCommand);
    opus.StartupCommand = StartupCommand;    
})(opus || (opus = {}));

var opus;
(function (opus) {
    var ApplicationFacade = (function (_super) {
        __extends(ApplicationFacade, _super);
        function ApplicationFacade() {
                _super.call(this);
        }
        ApplicationFacade.getInstance = function getInstance() {
            if(this.instance == null) {
                this.instance = new ApplicationFacade();
            }
            return this.instance;
        }
        ApplicationFacade.prototype.startup = function () {
            if(!this.initialized) {
                this.initialized = true;
                this.registerCommand(opus.Constants.STARTUP, opus.StartupCommand);
                this.sendNotification(opus.Constants.STARTUP);
            }
        };
        ApplicationFacade.prototype.shutdown = function () {
            this.sendNotification(opus.Constants.SHUTDOWN);
        };
        return ApplicationFacade;
    })(puremvc.Facade);
    opus.ApplicationFacade = ApplicationFacade;    
})(opus || (opus = {}));

var opus;
(function (opus) {
    var Main = (function () {
        function Main() { }
        Main.prototype.init = function () {
            opus.ApplicationFacade.getInstance().startup();
        };
        Main.prototype.destroy = function () {
            opus.ApplicationFacade.getInstance().shutdown();
        };
        return Main;
    })();
    opus.Main = Main;    
})(opus || (opus = {}));

new opus.Main().init();
