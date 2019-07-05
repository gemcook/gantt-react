(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('react'), require('react-dom')) :
	typeof define === 'function' && define.amd ? define(['react', 'react-dom'], factory) :
	(global = global || self, factory(global.React, global.ReactDOM));
}(this, function (React, ReactDOM) { 'use strict';

	var React__default = 'default' in React ? React['default'] : React;
	ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var O = 'object';
	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global_1 =
	  // eslint-disable-next-line no-undef
	  check(typeof globalThis == O && globalThis) ||
	  check(typeof window == O && window) ||
	  check(typeof self == O && self) ||
	  check(typeof commonjsGlobal == O && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func
	  Function('return this')();

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var descriptors = !fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
	var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;

	var objectPropertyIsEnumerable = {
		f: f
	};

	var createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString = {}.toString;

	var classofRaw = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var split = ''.split;

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings



	var toIndexedObject = function (it) {
	  return indexedObject(requireObjectCoercible(it));
	};

	var isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	// `ToPrimitive` abstract operation
	// https://tc39.github.io/ecma262/#sec-toprimitive
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var toPrimitive = function (input, PREFERRED_STRING) {
	  if (!isObject(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var hasOwnProperty = {}.hasOwnProperty;

	var has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var document$1 = global_1.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS = isObject(document$1) && isObject(document$1.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS ? document$1.createElement(it) : {};
	};

	// Thank's IE8 for his funny defineProperty
	var ie8DomDefine = !descriptors && !fails(function () {
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
	var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
	  } catch (error) { /* empty */ }
	  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};

	var objectGetOwnPropertyDescriptor = {
		f: f$1
	};

	var replacement = /#|\.prototype\./;

	var isForced = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : typeof detection == 'function' ? fails(detection)
	    : !!detection;
	};

	var normalize = isForced.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced.data = {};
	var NATIVE = isForced.NATIVE = 'N';
	var POLYFILL = isForced.POLYFILL = 'P';

	var isForced_1 = isForced;

	var path = {};

	var aFunction = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  } return it;
	};

	// optional / simple context binding
	var bindContext = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 0: return function () {
	      return fn.call(that);
	    };
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var anObject = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  } return it;
	};

	var nativeDefineProperty = Object.defineProperty;

	// `Object.defineProperty` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperty
	var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (ie8DomDefine) try {
	    return nativeDefineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var objectDefineProperty = {
		f: f$2
	};

	var hide = descriptors ? function (object, key, value) {
	  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






	var wrapConstructor = function (NativeConstructor) {
	  var Wrapper = function (a, b, c) {
	    if (this instanceof NativeConstructor) {
	      switch (arguments.length) {
	        case 0: return new NativeConstructor();
	        case 1: return new NativeConstructor(a);
	        case 2: return new NativeConstructor(a, b);
	      } return new NativeConstructor(a, b, c);
	    } return NativeConstructor.apply(this, arguments);
	  };
	  Wrapper.prototype = NativeConstructor.prototype;
	  return Wrapper;
	};

	/*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var PROTO = options.proto;

	  var nativeSource = GLOBAL ? global_1 : STATIC ? global_1[TARGET] : (global_1[TARGET] || {}).prototype;

	  var target = GLOBAL ? path : path[TARGET] || (path[TARGET] = {});
	  var targetPrototype = target.prototype;

	  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
	  var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

	  for (key in source) {
	    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contains in native
	    USE_NATIVE = !FORCED && nativeSource && has(nativeSource, key);

	    targetProperty = target[key];

	    if (USE_NATIVE) if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$1(nativeSource, key);
	      nativeProperty = descriptor && descriptor.value;
	    } else nativeProperty = nativeSource[key];

	    // export native or implementation
	    sourceProperty = (USE_NATIVE && nativeProperty) ? nativeProperty : source[key];

	    if (USE_NATIVE && typeof targetProperty === typeof sourceProperty) continue;

	    // bind timers to global for call from export context
	    if (options.bind && USE_NATIVE) resultProperty = bindContext(sourceProperty, global_1);
	    // wrap global constructors for prevent changs in this version
	    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty);
	    // make static versions for prototype methods
	    else if (PROTO && typeof sourceProperty == 'function') resultProperty = bindContext(Function.call, sourceProperty);
	    // default case
	    else resultProperty = sourceProperty;

	    // add a flag to not completely full polyfills
	    if (options.sham || (sourceProperty && sourceProperty.sham) || (targetProperty && targetProperty.sham)) {
	      hide(resultProperty, 'sham', true);
	    }

	    target[key] = resultProperty;

	    if (PROTO) {
	      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';
	      if (!has(path, VIRTUAL_PROTOTYPE)) hide(path, VIRTUAL_PROTOTYPE, {});
	      // export virtual prototype methods
	      path[VIRTUAL_PROTOTYPE][key] = sourceProperty;
	      // export real prototype methods
	      if (options.real && targetPrototype && !targetPrototype[key]) hide(targetPrototype, key, sourceProperty);
	    }
	  }
	};

	// `ToObject` abstract operation
	// https://tc39.github.io/ecma262/#sec-toobject
	var toObject = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	var ceil = Math.ceil;
	var floor = Math.floor;

	// `ToInteger` abstract operation
	// https://tc39.github.io/ecma262/#sec-tointeger
	var toInteger = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var min = Math.min;

	// `ToLength` abstract operation
	// https://tc39.github.io/ecma262/#sec-tolength
	var toLength = function (argument) {
	  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	// `IsArray` abstract operation
	// https://tc39.github.io/ecma262/#sec-isarray
	var isArray = Array.isArray || function isArray(arg) {
	  return classofRaw(arg) == 'Array';
	};

	var setGlobal = function (key, value) {
	  try {
	    hide(global_1, key, value);
	  } catch (error) {
	    global_1[key] = value;
	  } return value;
	};

	var isPure = true;

	var shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = global_1[SHARED] || setGlobal(SHARED, {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.1.3',
	  mode:  'pure' ,
	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var postfix = Math.random();

	var uid = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
	  // Chrome 38 Symbol has incorrect toString conversion
	  // eslint-disable-next-line no-undef
	  return !String(Symbol());
	});

	var Symbol$1 = global_1.Symbol;
	var store = shared('wks');

	var wellKnownSymbol = function (name) {
	  return store[name] || (store[name] = nativeSymbol && Symbol$1[name]
	    || (nativeSymbol ? Symbol$1 : uid)('Symbol.' + name));
	};

	var SPECIES = wellKnownSymbol('species');

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate = function (originalArray, length) {
	  var C;
	  if (isArray(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
	    else if (isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	var push = [].push;

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
	var createMethod = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject($this);
	    var self = indexedObject(O);
	    var boundFunction = bindContext(callbackfn, that, 3);
	    var length = toLength(self.length);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	          case 3: return true;              // some
	          case 5: return value;             // find
	          case 6: return index;             // findIndex
	          case 2: push.call(target, value); // filter
	        } else if (IS_EVERY) return false;  // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod(0),
	  // `Array.prototype.map` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.map
	  map: createMethod(1),
	  // `Array.prototype.filter` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
	  filter: createMethod(2),
	  // `Array.prototype.some` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.some
	  some: createMethod(3),
	  // `Array.prototype.every` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.every
	  every: createMethod(4),
	  // `Array.prototype.find` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.find
	  find: createMethod(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod(6)
	};

	var SPECIES$1 = wellKnownSymbol('species');

	var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
	  return !fails(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$1] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var $map = arrayIteration.map;


	// `Array.prototype.map` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.map
	// with adding support of @@species
	_export({ target: 'Array', proto: true, forced: !arrayMethodHasSpeciesSupport('map') }, {
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var entryVirtual = function (CONSTRUCTOR) {
	  return path[CONSTRUCTOR + 'Prototype'];
	};

	var map = entryVirtual('Array').map;

	var ArrayPrototype = Array.prototype;

	var map_1 = function (it) {
	  var own = it.map;
	  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.map) ? map : own;
	};

	var map$1 = map_1;

	var map$2 = map$1;

	var lib = createCommonjsModule(function (module, exports) {
	(function (global, factory) {
	     module.exports = factory() ;
	}(commonjsGlobal, function () {
	    const YEAR = 'year';
	    const MONTH = 'month';
	    const DAY = 'day';
	    const HOUR = 'hour';
	    const MINUTE = 'minute';
	    const SECOND = 'second';
	    const MILLISECOND = 'millisecond';

	    const month_names = {
	        en: [
	            'January',
	            'February',
	            'March',
	            'April',
	            'May',
	            'June',
	            'July',
	            'August',
	            'September',
	            'October',
	            'November',
	            'December'
	        ],
	        es: [
	            'Enero',
	            'Febrero',
	            'Marzo',
	            'Abril',
	            'Mayo',
	            'Junio',
	            'Julio',
	            'Agosto',
	            'Septiembre',
	            'Octubre',
	            'Noviembre',
	            'Diciembre'
	        ],
	        ru: [
	            'Январь',
	            'Февраль',
	            'Март',
	            'Апрель',
	            'Май',
	            'Июнь',
	            'Июль',
	            'Август',
	            'Сентябрь',
	            'Октябрь',
	            'Ноябрь',
	            'Декабрь'
	        ],
	        ptBr: [
	            'Janeiro',
	            'Fevereiro',
	            'Março',
	            'Abril',
	            'Maio',
	            'Junho',
	            'Julho',
	            'Agosto',
	            'Setembro',
	            'Outubro',
	            'Novembro',
	            'Dezembro'
	        ],
	        fr: [
	            'Janvier',
	            'Février',
	            'Mars',
	            'Avril',
	            'Mai',
	            'Juin',
	            'Juillet',
	            'Août',
	            'Septembre',
	            'Octobre',
	            'Novembre',
	            'Décembre'
	        ],
	        ja: [
	            '1月',
	            '2月',
	            '3月',
	            '4月',
	            '5月',
	            '6月',
	            '7月',
	            '8月',
	            '9月',
	            '10月',
	            '11月',
	            '12月'
	        ]
	    };

	    const day_of_week_names = {
	        en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sta'],
	        ja: ['(日)', '(月)', '(火)', '(水)', '(木)', '(金)', '(土)']
	    };

	    var date_utils = {
	        parse(date, date_separator = '-', time_separator = /[.:]/) {
	            if (date instanceof Date) {
	                return date;
	            }
	            if (typeof date === 'string') {
	                let date_parts, time_parts;
	                const parts = date.split(' ');

	                date_parts = parts[0]
	                    .split(date_separator)
	                    .map(val => parseInt(val, 10));
	                time_parts = parts[1] && parts[1].split(time_separator);

	                // month is 0 indexed
	                date_parts[1] = date_parts[1] - 1;

	                let vals = date_parts;

	                if (time_parts && time_parts.length) {
	                    if (time_parts.length == 4) {
	                        time_parts[3] = '0.' + time_parts[3];
	                        time_parts[3] = parseFloat(time_parts[3]) * 1000;
	                    }
	                    vals = vals.concat(time_parts);
	                }

	                return new Date(...vals);
	            }
	        },

	        to_string(date, with_time = false) {
	            if (!(date instanceof Date)) {
	                throw new TypeError('Invalid argument type');
	            }
	            const vals = this.get_date_values(date).map((val, i) => {
	                if (i === 1) {
	                    // add 1 for month
	                    val = val + 1;
	                }

	                if (i === 6) {
	                    return padStart(val + '', 3, '0');
	                }

	                return padStart(val + '', 2, '0');
	            });
	            const date_string = `${vals[0]}-${vals[1]}-${vals[2]}`;
	            const time_string = `${vals[3]}:${vals[4]}:${vals[5]}.${vals[6]}`;

	            return date_string + (with_time ? ' ' + time_string : '');
	        },

	        format(date, format_string = 'YYYY-MM-DD HH:mm:ss.SSS', lang = 'en') {
	            const values = this.get_date_values(date).map(d => padStart(d, 2, 0));
	            const format_map = {
	                YYYY: values[0],
	                MM: padStart(+values[1] + 1, 2, 0),
	                DD: values[2],
	                HH: values[3],
	                mm: values[4],
	                ss: values[5],
	                SSS: values[6],
	                D: values[2],
	                MMMM: month_names[lang][+values[1]],
	                MMM: month_names[lang][+values[1]]
	            };

	            let str = format_string;
	            const formatted_values = [];

	            Object.keys(format_map)
	                .sort((a, b) => b.length - a.length) // big string first
	                .forEach(key => {
	                    if (str.includes(key)) {
	                        str = str.replace(key, `$${formatted_values.length}`);
	                        formatted_values.push(format_map[key]);
	                    }
	                });

	            formatted_values.forEach((value, i) => {
	                str = str.replace(`$${i}`, value);
	            });

	            return str;
	        },

	        diff(date_a, date_b, scale = DAY) {
	            let milliseconds, seconds, hours, minutes, days, months, years;

	            milliseconds = date_a - date_b;
	            seconds = milliseconds / 1000;
	            minutes = seconds / 60;
	            hours = minutes / 60;
	            days = hours / 24;
	            months = days / 30;
	            years = months / 12;

	            if (!scale.endsWith('s')) {
	                scale += 's';
	            }

	            return Math.floor(
	                {
	                    milliseconds,
	                    seconds,
	                    minutes,
	                    hours,
	                    days,
	                    months,
	                    years
	                }[scale]
	            );
	        },

	        today() {
	            const vals = this.get_date_values(new Date()).slice(0, 3);
	            return new Date(...vals);
	        },

	        now() {
	            return new Date();
	        },

	        add(date, qty, scale) {
	            qty = parseInt(qty, 10);
	            const vals = [
	                date.getFullYear() + (scale === YEAR ? qty : 0),
	                date.getMonth() + (scale === MONTH ? qty : 0),
	                date.getDate() + (scale === DAY ? qty : 0),
	                date.getHours() + (scale === HOUR ? qty : 0),
	                date.getMinutes() + (scale === MINUTE ? qty : 0),
	                date.getSeconds() + (scale === SECOND ? qty : 0),
	                date.getMilliseconds() + (scale === MILLISECOND ? qty : 0)
	            ];
	            return new Date(...vals);
	        },

	        start_of(date, scale) {
	            const scores = {
	                [YEAR]: 6,
	                [MONTH]: 5,
	                [DAY]: 4,
	                [HOUR]: 3,
	                [MINUTE]: 2,
	                [SECOND]: 1,
	                [MILLISECOND]: 0
	            };

	            function should_reset(_scale) {
	                const max_score = scores[scale];
	                return scores[_scale] <= max_score;
	            }

	            const vals = [
	                date.getFullYear(),
	                should_reset(YEAR) ? 0 : date.getMonth(),
	                should_reset(MONTH) ? 1 : date.getDate(),
	                should_reset(DAY) ? 0 : date.getHours(),
	                should_reset(HOUR) ? 0 : date.getMinutes(),
	                should_reset(MINUTE) ? 0 : date.getSeconds(),
	                should_reset(SECOND) ? 0 : date.getMilliseconds()
	            ];

	            return new Date(...vals);
	        },

	        clone(date) {
	            return new Date(...this.get_date_values(date));
	        },

	        get_date_values(date) {
	            return [
	                date.getFullYear(),
	                date.getMonth(),
	                date.getDate(),
	                date.getHours(),
	                date.getMinutes(),
	                date.getSeconds(),
	                date.getMilliseconds()
	            ];
	        },

	        get_days_in_month(date) {
	            const no_of_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	            const month = date.getMonth();

	            if (month !== 1) {
	                return no_of_days[month];
	            }

	            // Feb
	            const year = date.getFullYear();
	            if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
	                return 29;
	            }
	            return 28;
	        },

	        // Dateオブジェクトを受け取り曜日の文字を返す関数
	        get_day_of_week(date, lang = 'en') {
	            const dayOfWeek = date.getDay();
	            return day_of_week_names[lang][dayOfWeek];
	        }
	    };

	    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
	    function padStart(str, targetLength, padString) {
	        str = str + '';
	        targetLength = targetLength >> 0;
	        padString = String(typeof padString !== 'undefined' ? padString : ' ');
	        if (str.length > targetLength) {
	            return String(str);
	        } else {
	            targetLength = targetLength - str.length;
	            if (targetLength > padString.length) {
	                padString += padString.repeat(targetLength / padString.length);
	            }
	            return padString.slice(0, targetLength) + String(str);
	        }
	    }

	    function $(expr, con) {
	        return typeof expr === 'string'
	            ? (con || document).querySelector(expr)
	            : expr || null;
	    }

	    function createSVG(tag, attrs) {
	        const elem = document.createElementNS('http://www.w3.org/2000/svg', tag);
	        for (let attr in attrs) {
	            if (attr === 'append_to') {
	                const parent = attrs.append_to;
	                parent.appendChild(elem);
	            } else if (attr === 'innerHTML') {
	                elem.innerHTML = attrs.innerHTML;
	            } else {
	                elem.setAttribute(attr, attrs[attr]);
	            }
	        }
	        return elem;
	    }

	    function animateSVG(svgElement, attr, from, to) {
	        const animatedSvgElement = getAnimationElement(svgElement, attr, from, to);

	        if (animatedSvgElement === svgElement) {
	            // triggered 2nd time programmatically
	            // trigger artificial click event
	            const event = document.createEvent('HTMLEvents');
	            event.initEvent('click', true, true);
	            event.eventName = 'click';
	            animatedSvgElement.dispatchEvent(event);
	        }
	    }

	    function getAnimationElement(
	        svgElement,
	        attr,
	        from,
	        to,
	        dur = '0.4s',
	        begin = '0.1s'
	    ) {
	        const animEl = svgElement.querySelector('animate');
	        if (animEl) {
	            $.attr(animEl, {
	                attributeName: attr,
	                from,
	                to,
	                dur,
	                begin: 'click + ' + begin // artificial click
	            });
	            return svgElement;
	        }

	        const animateElement = createSVG('animate', {
	            attributeName: attr,
	            from,
	            to,
	            dur,
	            begin,
	            calcMode: 'spline',
	            values: from + ';' + to,
	            keyTimes: '0; 1',
	            keySplines: cubic_bezier('ease-out')
	        });
	        svgElement.appendChild(animateElement);

	        return svgElement;
	    }

	    function cubic_bezier(name) {
	        return {
	            ease: '.25 .1 .25 1',
	            linear: '0 0 1 1',
	            'ease-in': '.42 0 1 1',
	            'ease-out': '0 0 .58 1',
	            'ease-in-out': '.42 0 .58 1'
	        }[name];
	    }

	    $.on = (element, event, selector, callback) => {
	        if (!callback) {
	            callback = selector;
	            $.bind(element, event, callback);
	        } else {
	            $.delegate(element, event, selector, callback);
	        }
	    };

	    $.off = (element, event, handler) => {
	        element.removeEventListener(event, handler);
	    };

	    $.bind = (element, event, callback) => {
	        event.split(/\s+/).forEach(function(event) {
	            element.addEventListener(event, callback);
	        });
	    };

	    $.delegate = (element, event, selector, callback) => {
	        element.addEventListener(event, function(e) {
	            const delegatedTarget = e.target.closest(selector);
	            if (delegatedTarget) {
	                e.delegatedTarget = delegatedTarget;
	                callback.call(this, e, delegatedTarget);
	            }
	        });
	    };

	    $.closest = (selector, element) => {
	        if (!element) return null;

	        if (element.matches(selector)) {
	            return element;
	        }

	        return $.closest(selector, element.parentNode);
	    };

	    $.attr = (element, attr, value) => {
	        if (!value && typeof attr === 'string') {
	            return element.getAttribute(attr);
	        }

	        if (typeof attr === 'object') {
	            for (let key in attr) {
	                $.attr(element, key, attr[key]);
	            }
	            return;
	        }

	        element.setAttribute(attr, value);
	    };

	    class Bar {
	        constructor(gantt, task) {
	            this.set_defaults(gantt, task);
	            this.prepare();
	            this.draw();
	            this.bind();
	        }

	        set_defaults(gantt, task) {
	            this.action_completed = false;
	            this.gantt = gantt;
	            this.task = task;
	            // progressが渡されなかった場合初期値は0とする
	            this.task.progress = this.task.progress || 0;
	        }

	        prepare() {
	            this.prepare_values();
	            this.prepare_helpers();
	        }

	        prepare_values() {
	            this.invalid = this.task.invalid;
	            this.height = this.gantt.options.bar_height;
	            this.x = this.compute_x();
	            this.y = this.compute_y();
	            this.corner_radius = this.gantt.options.bar_corner_radius;
	            this.duration =
	                date_utils.diff(this.task._end, this.task._start, 'hour') /
	                this.gantt.options.step;
	            this.width = this.gantt.options.column_width * this.duration;
	            this.progress_width =
	                this.gantt.options.column_width *
	                    this.duration *
	                    (this.task.progress / 100) || 0;
	            this.group = createSVG('g', {
	                class: 'bar-wrapper ' + (this.task.custom_class || ''),
	                'data-id': this.task.id
	            });
	            this.bar_group = createSVG('g', {
	                class: 'bar-group',
	                append_to: this.group
	            });
	            this.handle_group = createSVG('g', {
	                class: 'handle-group',
	                append_to: this.group
	            });
	        }

	        prepare_helpers() {
	            SVGElement.prototype.getX = function() {
	                return +this.getAttribute('x');
	            };
	            SVGElement.prototype.getY = function() {
	                return +this.getAttribute('y');
	            };
	            SVGElement.prototype.getWidth = function() {
	                return +this.getAttribute('width');
	            };
	            SVGElement.prototype.getHeight = function() {
	                return +this.getAttribute('height');
	            };
	            SVGElement.prototype.getEndX = function() {
	                return this.getX() + this.getWidth();
	            };
	        }

	        draw() {
	            this.draw_bar();
	            this.draw_progress_bar();
	            this.draw_label();
	            this.draw_resize_handles();
	        }

	        draw_bar() {
	            this.$bar = createSVG('rect', {
	                x: this.x,
	                y: this.y,
	                width: this.width,
	                height: this.height,
	                rx: this.corner_radius,
	                ry: this.corner_radius,
	                class: 'bar',
	                append_to: this.bar_group
	            });

	            animateSVG(this.$bar, 'width', 0, this.width);

	            if (this.invalid) {
	                this.$bar.classList.add('bar-invalid');
	            }
	        }

	        draw_progress_bar() {
	            if (this.invalid) return;
	            this.$bar_progress = createSVG('rect', {
	                x: this.x,
	                y: this.y,
	                width: this.progress_width,
	                height: this.height,
	                rx: this.corner_radius,
	                ry: this.corner_radius,
	                class: 'bar-progress',
	                append_to: this.bar_group
	            });

	            animateSVG(this.$bar_progress, 'width', 0, this.progress_width);
	        }

	        draw_label() {
	            createSVG('text', {
	                x: this.x + this.width / 2,
	                y: this.y + this.height / 2,
	                innerHTML: this.task.name,
	                class: 'bar-label',
	                append_to: this.bar_group
	            });
	            // labels get BBox in the next tick
	            requestAnimationFrame(() => this.update_label_position());
	        }

	        draw_resize_handles() {
	            if (this.invalid) return;

	            const bar = this.$bar;
	            const handle_width = 8;

	            createSVG('rect', {
	                x: bar.getX() + bar.getWidth() - 9,
	                y: bar.getY() + 1,
	                width: handle_width,
	                height: this.height - 2,
	                rx: this.corner_radius,
	                ry: this.corner_radius,
	                class: 'handle right',
	                append_to: this.handle_group
	            });

	            createSVG('rect', {
	                x: bar.getX() + 1,
	                y: bar.getY() + 1,
	                width: handle_width,
	                height: this.height - 2,
	                rx: this.corner_radius,
	                ry: this.corner_radius,
	                class: 'handle left',
	                append_to: this.handle_group
	            });

	            if (this.task.progress && this.task.progress < 100) {
	                this.$handle_progress = createSVG('polygon', {
	                    points: this.get_progress_polygon_points().join(','),
	                    class: 'handle progress',
	                    append_to: this.handle_group
	                });
	            }
	        }

	        get_progress_polygon_points() {
	            const bar_progress = this.$bar_progress;
	            return [
	                bar_progress.getEndX() - 5,
	                bar_progress.getY() + bar_progress.getHeight(),
	                bar_progress.getEndX() + 5,
	                bar_progress.getY() + bar_progress.getHeight(),
	                bar_progress.getEndX(),
	                bar_progress.getY() + bar_progress.getHeight() - 8.66
	            ];
	        }

	        bind() {
	            if (this.invalid) return;
	            this.setup_click_event();
	        }

	        setup_click_event() {
	            $.on(this.group, 'focus ' + this.gantt.options.popup_trigger, e => {
	                if (this.action_completed) {
	                    // just finished a move action, wait for a few seconds
	                    return;
	                }

	                if (e.type === 'click') {
	                    this.gantt.trigger_event('click', [this.task]);
	                }

	                this.gantt.unselect_all();
	                this.group.classList.toggle('active');

	                this.show_popup();
	            });
	        }

	        show_popup() {
	            if (this.gantt.bar_being_dragged) return;

	            const start_date = date_utils.format(
	                this.task._start,
	                'MMM D',
	                this.gantt.options.language
	            );
	            const end_date = date_utils.format(
	                date_utils.add(this.task._end, -1, 'second'),
	                'MMM D',
	                this.gantt.options.language
	            );
	            const subtitle = start_date + ' - ' + end_date;

	            this.gantt.show_popup({
	                target_element: this.$bar,
	                title: this.task.name,
	                subtitle: subtitle,
	                task: this.task
	            });
	        }

	        update_bar_position({ x = null, width = null }) {
	            const bar = this.$bar;
	            if (x) {
	                // get all x values of parent task
	                const xs = this.task.dependencies.map(dep => {
	                    return this.gantt.get_bar(dep).$bar.getX();
	                });
	                // child task must not go before parent
	                const valid_x = xs.reduce((prev, curr) => {
	                    return x >= curr;
	                }, x);
	                if (!valid_x) {
	                    width = null;
	                    return;
	                }
	                this.update_attr(bar, 'x', x);
	            }
	            if (width && width >= this.gantt.options.column_width) {
	                this.update_attr(bar, 'width', width);
	            }
	            this.update_label_position();
	            this.update_handle_position();
	            this.update_progressbar_position();
	            this.update_arrow_position();
	        }

	        date_changed() {
	            let changed = false;
	            const { new_start_date, new_end_date } = this.compute_start_end_date();

	            if (Number(this.task._start) !== Number(new_start_date)) {
	                changed = true;
	                this.task._start = new_start_date;
	            }

	            if (Number(this.task._end) !== Number(new_end_date)) {
	                changed = true;
	                this.task._end = new_end_date;
	            }

	            if (!changed) return;

	            this.gantt.trigger_event('date_change', [
	                this.task,
	                new_start_date,
	                date_utils.add(new_end_date, -1, 'second')
	            ]);
	        }

	        progress_changed() {
	            const new_progress = this.compute_progress();
	            this.task.progress = new_progress;
	            this.gantt.trigger_event('progress_change', [this.task, new_progress]);
	        }

	        set_action_completed() {
	            this.action_completed = true;
	            setTimeout(() => (this.action_completed = false), 1000);
	        }

	        compute_start_end_date() {
	            const bar = this.$bar;
	            const x_in_units = bar.getX() / this.gantt.options.column_width;
	            const new_start_date = date_utils.add(
	                this.gantt.gantt_start,
	                x_in_units * this.gantt.options.step,
	                'hour'
	            );
	            const width_in_units = bar.getWidth() / this.gantt.options.column_width;
	            const new_end_date = date_utils.add(
	                new_start_date,
	                width_in_units * this.gantt.options.step,
	                'hour'
	            );

	            return { new_start_date, new_end_date };
	        }

	        compute_progress() {
	            const progress =
	                this.$bar_progress.getWidth() / this.$bar.getWidth() * 100;
	            return parseInt(progress, 10);
	        }

	        compute_x() {
	            const { step, column_width } = this.gantt.options;
	            const task_start = this.task._start;
	            const gantt_start = this.gantt.gantt_start;

	            const diff = date_utils.diff(task_start, gantt_start, 'hour');
	            let x = diff / step * column_width;

	            if (this.gantt.view_is('Month')) {
	                const diff = date_utils.diff(task_start, gantt_start, 'day');
	                x = diff * column_width / 30;
	            }
	            return x;
	        }

	        compute_y() {
	            return (
	                this.gantt.options.header_height +
	                this.gantt.options.padding +
	                this.task._index * (this.height + this.gantt.options.padding)
	            );
	        }

	        get_snap_position(dx) {
	            let odx = dx,
	                rem,
	                position;

	            if (this.gantt.view_is('Week')) {
	                rem = dx % (this.gantt.options.column_width / 7);
	                position =
	                    odx -
	                    rem +
	                    (rem < this.gantt.options.column_width / 14
	                        ? 0
	                        : this.gantt.options.column_width / 7);
	            } else if (this.gantt.view_is('Month')) {
	                rem = dx % (this.gantt.options.column_width / 30);
	                position =
	                    odx -
	                    rem +
	                    (rem < this.gantt.options.column_width / 60
	                        ? 0
	                        : this.gantt.options.column_width / 30);
	            } else {
	                rem = dx % this.gantt.options.column_width;
	                position =
	                    odx -
	                    rem +
	                    (rem < this.gantt.options.column_width / 2
	                        ? 0
	                        : this.gantt.options.column_width);
	            }
	            return position;
	        }

	        update_attr(element, attr, value) {
	            value = +value;
	            if (!isNaN(value)) {
	                element.setAttribute(attr, value);
	            }
	            return element;
	        }

	        update_progressbar_position() {
	            this.$bar_progress.setAttribute('x', this.$bar.getX());
	            this.$bar_progress.setAttribute(
	                'width',
	                this.$bar.getWidth() * (this.task.progress / 100)
	            );
	        }

	        update_label_position() {
	            const bar = this.$bar,
	                label = this.group.querySelector('.bar-label');

	            if (label.getBBox().width > bar.getWidth()) {
	                label.classList.add('big');
	                // ガントバーのテキストの位置を先頭に変更
	                label.setAttribute('x', bar.getX());
	            } else {
	                label.classList.remove('big');
	                label.setAttribute('x', bar.getX() + bar.getWidth() / 2);
	            }
	        }

	        update_handle_position() {
	            const bar = this.$bar;
	            this.handle_group
	                .querySelector('.handle.left')
	                .setAttribute('x', bar.getX() + 1);
	            this.handle_group
	                .querySelector('.handle.right')
	                .setAttribute('x', bar.getEndX() - 9);
	            const handle = this.group.querySelector('.handle.progress');
	            handle &&
	                handle.setAttribute('points', this.get_progress_polygon_points());
	        }

	        update_arrow_position() {
	            this.arrows = this.arrows || [];
	            for (let arrow of this.arrows) {
	                arrow.update();
	            }
	        }
	    }

	    class Arrow {
	        constructor(gantt, from_task, to_task) {
	            this.gantt = gantt;
	            this.from_task = from_task;
	            this.to_task = to_task;

	            this.calculate_path();
	            this.draw();
	        }

	        calculate_path() {
	            let start_x =
	                this.from_task.$bar.getX() + this.from_task.$bar.getWidth() / 2;

	            const condition = () =>
	                this.to_task.$bar.getX() < start_x + this.gantt.options.padding &&
	                start_x > this.from_task.$bar.getX() + this.gantt.options.padding;

	            while (condition()) {
	                start_x -= 10;
	            }

	            const start_y =
	                this.gantt.options.header_height +
	                this.gantt.options.bar_height +
	                (this.gantt.options.padding + this.gantt.options.bar_height) *
	                    this.from_task.task._index +
	                this.gantt.options.padding;

	            const end_x = this.to_task.$bar.getX() - this.gantt.options.padding / 2;
	            const end_y =
	                this.gantt.options.header_height +
	                this.gantt.options.bar_height / 2 +
	                (this.gantt.options.padding + this.gantt.options.bar_height) *
	                    this.to_task.task._index +
	                this.gantt.options.padding;

	            const from_is_below_to =
	                this.from_task.task._index > this.to_task.task._index;
	            const curve = this.gantt.options.arrow_curve;
	            const clockwise = from_is_below_to ? 1 : 0;
	            const curve_y = from_is_below_to ? -curve : curve;
	            const offset = from_is_below_to
	                ? end_y + this.gantt.options.arrow_curve
	                : end_y - this.gantt.options.arrow_curve;

	            this.path = `
            M ${start_x} ${start_y}
            V ${offset}
            a ${curve} ${curve} 0 0 ${clockwise} ${curve} ${curve_y}
            L ${end_x} ${end_y}
            m -5 -5
            l 5 5
            l -5 5`;

	            if (
	                this.to_task.$bar.getX() <
	                this.from_task.$bar.getX() + this.gantt.options.padding
	            ) {
	                const down_1 = this.gantt.options.padding / 2 - curve;
	                const down_2 =
	                    this.to_task.$bar.getY() +
	                    this.to_task.$bar.getHeight() / 2 -
	                    curve_y;
	                const left = this.to_task.$bar.getX() - this.gantt.options.padding;

	                this.path = `
                M ${start_x} ${start_y}
                v ${down_1}
                a ${curve} ${curve} 0 0 1 -${curve} ${curve}
                H ${left}
                a ${curve} ${curve} 0 0 ${clockwise} -${curve} ${curve_y}
                V ${down_2}
                a ${curve} ${curve} 0 0 ${clockwise} ${curve} ${curve_y}
                L ${end_x} ${end_y}
                m -5 -5
                l 5 5
                l -5 5`;
	            }
	        }

	        draw() {
	            this.element = createSVG('path', {
	                d: this.path,
	                'data-from': this.from_task.task.id,
	                'data-to': this.to_task.task.id
	            });
	        }

	        update() {
	            this.calculate_path();
	            this.element.setAttribute('d', this.path);
	        }
	    }

	    class Popup {
	        constructor(parent, custom_html) {
	            this.parent = parent;
	            this.custom_html = custom_html;
	            this.make();
	        }

	        make() {
	            this.parent.innerHTML = `
            <div class="title"></div>
            <div class="subtitle"></div>
            <div class="pointer"></div>
        `;

	            this.hide();

	            this.title = this.parent.querySelector('.title');
	            this.subtitle = this.parent.querySelector('.subtitle');
	            this.pointer = this.parent.querySelector('.pointer');
	        }

	        show(options) {
	            if (!options.target_element) {
	                throw new Error('target_element is required to show popup');
	            }
	            if (!options.position) {
	                options.position = 'left';
	            }
	            const target_element = options.target_element;

	            if (this.custom_html) {
	                let html = this.custom_html(options.task);
	                html += '<div class="pointer"></div>';
	                this.parent.innerHTML = html;
	                this.pointer = this.parent.querySelector('.pointer');
	            } else {
	                // set data
	                this.title.innerHTML = options.title;
	                this.subtitle.innerHTML = options.subtitle;
	                this.parent.style.width = this.parent.clientWidth + 'px';
	            }

	            // set position
	            let position_meta;
	            if (target_element instanceof HTMLElement) {
	                position_meta = target_element.getBoundingClientRect();
	            } else if (target_element instanceof SVGElement) {
	                position_meta = options.target_element.getBBox();
	            }

	            if (options.position === 'left') {
	                this.parent.style.left =
	                    position_meta.x + (position_meta.width + 10) + 'px';
	                this.parent.style.top = position_meta.y + 'px';

	                this.pointer.style.transform = 'rotateZ(90deg)';
	                this.pointer.style.left = '-7px';
	                this.pointer.style.top = '2px';
	            }

	            // show
	            this.parent.style.opacity = 1;
	        }

	        hide() {
	            this.parent.style.opacity = 0;
	        }
	    }

	    class Gantt {
	        constructor(wrapper, tasks, options) {
	            this.setup_wrapper(wrapper);
	            this.setup_options(options);
	            this.setup_tasks(tasks);
	            // initialize with default view mode
	            this.change_view_mode();
	            this.bind_events();
	        }

	        setup_wrapper(element) {
	            let svg_element, wrapper_element;

	            // CSS Selector is passed
	            if (typeof element === 'string') {
	                element = document.querySelector(element);
	            }

	            // get the SVGElement
	            if (element instanceof HTMLElement) {
	                wrapper_element = element;
	                svg_element = element.querySelector('svg');
	            } else if (element instanceof SVGElement) {
	                svg_element = element;
	            } else {
	                throw new TypeError(
	                    'Frappé Gantt only supports usage of a string CSS selector,' +
	                        " HTML DOM element or SVG DOM element for the 'element' parameter"
	                );
	            }

	            // svg element
	            if (!svg_element) {
	                // create it
	                this.$svg = createSVG('svg', {
	                    append_to: wrapper_element,
	                    class: 'gantt'
	                });
	            } else {
	                this.$svg = svg_element;
	                this.$svg.classList.add('gantt');
	            }

	            // wrapper element
	            this.$container = document.createElement('div');
	            this.$container.classList.add('gantt-container');

	            const parent_element = this.$svg.parentElement;
	            parent_element.appendChild(this.$container);
	            this.$container.appendChild(this.$svg);

	            // popup wrapper
	            this.popup_wrapper = document.createElement('div');
	            this.popup_wrapper.classList.add('popup-wrapper');
	            this.$container.appendChild(this.popup_wrapper);
	        }

	        setup_options(options) {
	            const default_options = {
	                header_height: 50,
	                column_width: 30,
	                step: 24,
	                view_modes: [
	                    'Quarter Day',
	                    'Half Day',
	                    'Day',
	                    'Week',
	                    'Month',
	                    'Year'
	                ],
	                bar_height: 20,
	                bar_corner_radius: 3,
	                arrow_curve: 5,
	                padding: 18,
	                view_mode: 'Day',
	                date_format: 'YYYY-MM-DD',
	                popup_trigger: 'click',
	                custom_popup_html: null,
	                language: 'en',
	                // header関連のスタイルを修正できるようにオプション用のパラメーターの追加
	                header_padding: 10,
	                header_lower_text_y: 35,
	                header_upper_text_y: 20,
	                header_day_of_week_text_y: 50
	            };
	            this.options = Object.assign({}, default_options, options);
	        }

	        setup_tasks(tasks) {
	            // prepare tasks
	            // 1行に対してtaskを配列で受け取るように変更
	            this.tasks = tasks.map((rowTasks, i) => {
	                const allTask = rowTasks.map(task => {
	                    // convert to Date objects
	                    task._start = date_utils.parse(task.start);
	                    task._end = date_utils.parse(task.end);

	                    // make task invalid if duration too large
	                    if (date_utils.diff(task._end, task._start, 'year') > 10) {
	                        task.end = null;
	                    }

	                    // cache index
	                    task._index = i;

	                    // invalid dates
	                    if (!task.start && !task.end) {
	                        const today = date_utils.today();
	                        task._start = today;
	                        task._end = date_utils.add(today, 2, 'day');
	                    }

	                    if (!task.start && task.end) {
	                        task._start = date_utils.add(task._end, -2, 'day');
	                    }

	                    if (task.start && !task.end) {
	                        task._end = date_utils.add(task._start, 2, 'day');
	                    }

	                    // if hours is not set, assume the last day is full day
	                    // e.g: 2018-09-09 becomes 2018-09-09 23:59:59
	                    const task_end_values = date_utils.get_date_values(task._end);
	                    if (task_end_values.slice(3).every(d => d === 0)) {
	                        task._end = date_utils.add(task._end, 24, 'hour');
	                    }

	                    // invalid flag
	                    if (!task.start || !task.end) {
	                        task.invalid = true;
	                    }

	                    // dependencies
	                    if (
	                        typeof task.dependencies === 'string' ||
	                        !task.dependencies
	                    ) {
	                        let deps = [];
	                        if (task.dependencies) {
	                            deps = task.dependencies
	                                .split(',')
	                                .map(d => d.trim())
	                                .filter(d => d);
	                        }
	                        task.dependencies = deps;
	                    }

	                    // uids
	                    if (!task.id) {
	                        task.id = generate_id(task);
	                    }

	                    return task;
	                });
	                return allTask;
	            });

	            this.setup_dependencies();
	        }

	        setup_dependencies() {
	            // 1行に対してtaskを配列で受け取るように変更
	            this.dependency_map = {};
	            for (let rowTasks of this.tasks) {
	                for (let t of rowTasks) {
	                    for (let d of t.dependencies) {
	                        this.dependency_map[d] = this.dependency_map[d] || [];
	                        this.dependency_map[d].push(t.id);
	                    }
	                }
	            }
	        }

	        refresh(tasks) {
	            this.setup_tasks(tasks);
	            this.change_view_mode();
	        }

	        change_view_mode(mode = this.options.view_mode) {
	            this.update_view_scale(mode);
	            this.setup_dates();
	            this.render();
	            // fire viewmode_change event
	            this.trigger_event('view_change', [mode]);
	        }

	        update_view_scale(view_mode) {
	            this.options.view_mode = view_mode;

	            if (view_mode === 'Day') {
	                // Dayの場合の列の幅の上書きをしない
	                this.options.step = 24;
	            } else if (view_mode === 'Half Day') {
	                this.options.step = 24 / 2;
	                this.options.column_width = 38;
	            } else if (view_mode === 'Quarter Day') {
	                this.options.step = 24 / 4;
	                this.options.column_width = 38;
	            } else if (view_mode === 'Week') {
	                this.options.step = 24 * 7;
	                this.options.column_width = 140;
	            } else if (view_mode === 'Month') {
	                this.options.step = 24 * 30;
	                this.options.column_width = 120;
	            } else if (view_mode === 'Year') {
	                this.options.step = 24 * 365;
	                this.options.column_width = 120;
	            }
	        }

	        setup_dates() {
	            this.setup_gantt_dates();
	            this.setup_date_values();
	        }

	        setup_gantt_dates() {
	            this.gantt_start = this.gantt_end = null;

	            // 1行に対してtaskを配列で受け取るように変更
	            for (let rowTasks of this.tasks) {
	                // set global start and end date
	                for (let task of rowTasks) {
	                    if (!this.gantt_start || task._start < this.gantt_start) {
	                        this.gantt_start = task._start;
	                    }
	                    if (!this.gantt_end || task._end > this.gantt_end) {
	                        this.gantt_end = task._end;
	                    }
	                }
	            }

	            this.gantt_start = date_utils.start_of(this.gantt_start, 'day');
	            this.gantt_end = date_utils.start_of(this.gantt_end, 'day');

	            // add date padding on both sides
	            if (this.view_is(['Quarter Day', 'Half Day'])) {
	                this.gantt_start = date_utils.add(this.gantt_start, -7, 'day');
	                this.gantt_end = date_utils.add(this.gantt_end, 7, 'day');
	            } else if (this.view_is('Month')) {
	                this.gantt_start = date_utils.start_of(this.gantt_start, 'year');
	                this.gantt_end = date_utils.add(this.gantt_end, 1, 'year');
	            } else if (this.view_is('Year')) {
	                this.gantt_start = date_utils.add(this.gantt_start, -2, 'year');
	                this.gantt_end = date_utils.add(this.gantt_end, 2, 'year');
	            } else {
	                this.gantt_start = date_utils.add(this.gantt_start, -1, 'month');
	                this.gantt_end = date_utils.add(this.gantt_end, 1, 'month');
	            }
	        }

	        setup_date_values() {
	            this.dates = [];
	            let cur_date = null;

	            while (cur_date === null || cur_date < this.gantt_end) {
	                if (!cur_date) {
	                    cur_date = date_utils.clone(this.gantt_start);
	                } else {
	                    if (this.view_is('Year')) {
	                        cur_date = date_utils.add(cur_date, 1, 'year');
	                    } else if (this.view_is('Month')) {
	                        cur_date = date_utils.add(cur_date, 1, 'month');
	                    } else {
	                        cur_date = date_utils.add(
	                            cur_date,
	                            this.options.step,
	                            'hour'
	                        );
	                    }
	                }
	                this.dates.push(cur_date);
	            }
	        }

	        bind_events() {
	            this.bind_grid_click();
	            this.bind_bar_events();
	        }

	        render() {
	            this.clear();
	            this.setup_layers();
	            this.make_grid();
	            this.make_dates();
	            this.make_bars();
	            this.make_arrows();
	            this.map_arrows_on_bars();
	            this.set_width();
	            this.set_scroll_position();
	        }

	        setup_layers() {
	            this.layers = {};
	            const layers = ['grid', 'date', 'arrow', 'progress', 'bar', 'details'];
	            // make group layers
	            for (let layer of layers) {
	                this.layers[layer] = createSVG('g', {
	                    class: layer,
	                    append_to: this.$svg
	                });
	            }
	        }

	        make_grid() {
	            this.make_grid_background();
	            this.make_grid_rows();
	            this.make_grid_header();
	            this.make_grid_ticks();
	            this.make_grid_highlights();
	        }

	        make_grid_background() {
	            const grid_width = this.dates.length * this.options.column_width;
	            const grid_height =
	                this.options.header_height +
	                this.options.padding +
	                (this.options.bar_height + this.options.padding) *
	                    this.tasks.length;

	            createSVG('rect', {
	                x: 0,
	                y: 0,
	                width: grid_width,
	                height: grid_height,
	                class: 'grid-background',
	                append_to: this.layers.grid
	            });

	            $.attr(this.$svg, {
	                // 全体が高くなりすぎず、スクロールバーがはみ出ないように
	                height: grid_height,
	                width: '100%'
	            });
	        }

	        make_grid_rows() {
	            const rows_layer = createSVG('g', { append_to: this.layers.grid });
	            const lines_layer = createSVG('g', { append_to: this.layers.grid });

	            const row_width = this.dates.length * this.options.column_width;
	            const row_height = this.options.bar_height + this.options.padding;

	            let row_y = this.options.header_height + this.options.padding / 2;

	            for (let task of this.tasks) {
	                createSVG('rect', {
	                    x: 0,
	                    y: row_y,
	                    width: row_width,
	                    height: row_height,
	                    class: 'grid-row',
	                    append_to: rows_layer
	                });

	                createSVG('line', {
	                    x1: 0,
	                    y1: row_y + row_height,
	                    x2: row_width,
	                    y2: row_y + row_height,
	                    class: 'row-line',
	                    append_to: lines_layer
	                });

	                row_y += this.options.bar_height + this.options.padding;
	            }
	        }

	        make_grid_header() {
	            const header_width = this.dates.length * this.options.column_width;
	            const header_height =
	                this.options.header_height + this.options.header_padding;
	            createSVG('rect', {
	                x: 0,
	                y: 0,
	                width: header_width,
	                height: header_height,
	                class: 'grid-header',
	                append_to: this.layers.grid
	            });
	        }

	        make_grid_ticks() {
	            let tick_x = 0;
	            let tick_y = this.options.header_height + this.options.padding / 2;
	            let tick_height =
	                (this.options.bar_height + this.options.padding) *
	                this.tasks.length;

	            for (let date of this.dates) {
	                let tick_class = 'tick';
	                // thick tick for monday
	                if (this.view_is('Day') && date.getDate() === 1) {
	                    tick_class += ' thick';
	                }
	                // thick tick for first week
	                if (
	                    this.view_is('Week') &&
	                    date.getDate() >= 1 &&
	                    date.getDate() < 8
	                ) {
	                    tick_class += ' thick';
	                }
	                // thick ticks for quarters
	                if (this.view_is('Month') && (date.getMonth() + 1) % 3 === 0) {
	                    tick_class += ' thick';
	                }

	                createSVG('path', {
	                    d: `M ${tick_x} ${tick_y} v ${tick_height}`,
	                    class: tick_class,
	                    append_to: this.layers.grid
	                });

	                if (this.view_is('Month')) {
	                    tick_x +=
	                        date_utils.get_days_in_month(date) *
	                        this.options.column_width /
	                        30;
	                } else {
	                    tick_x += this.options.column_width;
	                }
	            }
	        }

	        make_grid_highlights() {
	            // highlight today's date
	            if (this.view_is('Day')) {
	                const x =
	                    date_utils.diff(date_utils.today(), this.gantt_start, 'hour') /
	                    this.options.step *
	                    this.options.column_width;
	                const y = 0;

	                const width = this.options.column_width;
	                const height =
	                    (this.options.bar_height + this.options.padding) *
	                        this.tasks.length +
	                    this.options.header_height +
	                    this.options.padding / 2;

	                createSVG('rect', {
	                    x,
	                    y,
	                    width,
	                    height,
	                    class: 'today-highlight',
	                    append_to: this.layers.grid
	                });
	            }
	        }

	        make_dates() {
	            for (let date of this.get_dates_to_draw()) {
	                createSVG('text', {
	                    x: date.lower_x,
	                    y: date.lower_y,
	                    innerHTML: date.lower_text,
	                    class: 'lower-text',
	                    append_to: this.layers.date
	                });

	                if (date.upper_text) {
	                    const $upper_text = createSVG('text', {
	                        x: date.upper_x,
	                        y: date.upper_y,
	                        innerHTML: date.upper_text,
	                        class: 'upper-text',
	                        append_to: this.layers.date
	                    });

	                    // remove out-of-bound dates
	                    if (
	                        $upper_text.getBBox().x2 > this.layers.grid.getBBox().width
	                    ) {
	                        $upper_text.remove();
	                    }
	                }

	                // headerに曜日を表示するために追加
	                if (date.day_of_week_text) {
	                    createSVG('text', {
	                        x: date.day_of_week_x,
	                        y: date.day_of_week_y,
	                        innerHTML: date.day_of_week_text,
	                        class: 'day-of-week-text',
	                        append_to: this.layers.date
	                    });
	                }
	            }
	        }

	        get_dates_to_draw() {
	            let last_date = null;
	            const dates = this.dates.map((date, i) => {
	                const d = this.get_date_info(date, last_date, i);
	                last_date = date;
	                return d;
	            });
	            return dates;
	        }

	        get_date_info(date, last_date, i) {
	            if (!last_date) {
	                last_date = date_utils.add(date, 1, 'year');
	            }
	            const date_text = {
	                'Quarter Day_lower': date_utils.format(
	                    date,
	                    'HH',
	                    this.options.language
	                ),
	                'Half Day_lower': date_utils.format(
	                    date,
	                    'HH',
	                    this.options.language
	                ),
	                Day_lower:
	                    date.getDate() !== last_date.getDate()
	                        ? date_utils.format(date, 'D', this.options.language)
	                        : '',
	                Week_lower:
	                    date.getMonth() !== last_date.getMonth()
	                        ? date_utils.format(date, 'D MMM', this.options.language)
	                        : date_utils.format(date, 'D', this.options.language),
	                Month_lower: date_utils.format(date, 'MMMM', this.options.language),
	                Year_lower: date_utils.format(date, 'YYYY', this.options.language),
	                'Quarter Day_upper':
	                    date.getDate() !== last_date.getDate()
	                        ? date_utils.format(date, 'D MMM', this.options.language)
	                        : '',
	                'Half Day_upper':
	                    date.getDate() !== last_date.getDate()
	                        ? date.getMonth() !== last_date.getMonth()
	                          ? date_utils.format(date, 'D MMM', this.options.language)
	                          : date_utils.format(date, 'D', this.options.language)
	                        : '',
	                Day_upper:
	                    date.getMonth() !== last_date.getMonth()
	                        ? date_utils.format(date, 'MMMM', this.options.language)
	                        : '',
	                Week_upper:
	                    date.getMonth() !== last_date.getMonth()
	                        ? date_utils.format(date, 'MMMM', this.options.language)
	                        : '',
	                Month_upper:
	                    date.getFullYear() !== last_date.getFullYear()
	                        ? date_utils.format(date, 'YYYY', this.options.language)
	                        : '',
	                Year_upper:
	                    date.getFullYear() !== last_date.getFullYear()
	                        ? date_utils.format(date, 'YYYY', this.options.language)
	                        : '',
	                // 曜日を表示させるために追加
	                Day_of_week:
	                    date.getDate() !== last_date.getDate()
	                        ? date_utils.get_day_of_week(date, this.options.language)
	                        : ''
	            };

	            const base_pos = {
	                // header関連のスタイルをオプションで指定できるように
	                x: i * this.options.column_width,
	                lower_y: this.options.header_lower_text_y,
	                upper_y: this.options.header_upper_text_y,
	                day_of_week_y: this.options.header_day_of_week_text_y
	            };

	            const x_pos = {
	                'Quarter Day_lower': this.options.column_width * 4 / 2,
	                'Quarter Day_upper': 0,
	                'Half Day_lower': this.options.column_width * 2 / 2,
	                'Half Day_upper': 0,
	                Day_lower: this.options.column_width / 2,
	                // 月のテキストを1日目の上に表示させるように変更（Dayのみ）
	                Day_upper: this.options.column_width / 2,
	                Week_lower: 0,
	                Week_upper: this.options.column_width * 4 / 2,
	                Month_lower: this.options.column_width / 2,
	                Month_upper: this.options.column_width * 12 / 2,
	                Year_lower: this.options.column_width / 2,
	                Year_upper: this.options.column_width * 30 / 2,
	                // headerに曜日を表示させるために追加
	                Day_of_week: this.options.column_width / 2
	            };

	            return {
	                upper_text: date_text[`${this.options.view_mode}_upper`],
	                lower_text: date_text[`${this.options.view_mode}_lower`],
	                day_of_week_text: date_text[`${this.options.view_mode}_of_week`],
	                upper_x: base_pos.x + x_pos[`${this.options.view_mode}_upper`],
	                upper_y: base_pos.upper_y,
	                lower_x: base_pos.x + x_pos[`${this.options.view_mode}_lower`],
	                lower_y: base_pos.lower_y,
	                day_of_week_x:
	                    base_pos.x + x_pos[`${this.options.view_mode}_of_week`],
	                day_of_week_y: base_pos.day_of_week_y
	            };
	        }

	        make_bars() {
	            const bars = [];
	            // 1行に対してtaskを配列で受け取るように変更
	            for (let rowTasks of this.tasks) {
	                for (let task of rowTasks) {
	                    const bar = new Bar(this, task);
	                    this.layers.bar.appendChild(bar.group);
	                    bars.push(bar);
	                }
	            }

	            this.bars = bars;
	        }

	        make_arrows() {
	            this.arrows = [];

	            // 1行に対してtaskを配列で受け取るように変更
	            for (let rowTasks of this.tasks) {
	                for (let task of rowTasks) {
	                    let arrows = [];
	                    arrows = task.dependencies
	                        .map(task_id => {
	                            const dependency = this.get_task(task_id);
	                            if (!dependency) return;
	                            const arrow = new Arrow(
	                                this,
	                                this.bars[dependency._index], // from_task
	                                this.bars[task._index] // to_task
	                            );
	                            this.layers.arrow.appendChild(arrow.element);
	                            return arrow;
	                        })
	                        .filter(Boolean); // filter falsy values
	                    this.arrows = this.arrows.concat(arrows);
	                }
	            }
	        }

	        map_arrows_on_bars() {
	            for (let bar of this.bars) {
	                bar.arrows = this.arrows.filter(arrow => {
	                    return (
	                        arrow.from_task.task.id === bar.task.id ||
	                        arrow.to_task.task.id === bar.task.id
	                    );
	                });
	            }
	        }

	        set_width() {
	            const cur_width = this.$svg.getBoundingClientRect().width;
	            const actual_width = this.$svg
	                .querySelector('.grid .grid-row')
	                .getAttribute('width');
	            if (cur_width < actual_width) {
	                this.$svg.setAttribute('width', actual_width);
	            }
	        }

	        set_scroll_position() {
	            const parent_element = this.$svg.parentElement;
	            if (!parent_element) return;

	            const hours_before_first_task = date_utils.diff(
	                this.get_oldest_starting_date(),
	                this.gantt_start,
	                'hour'
	            );

	            const scroll_pos =
	                hours_before_first_task /
	                    this.options.step *
	                    this.options.column_width -
	                this.options.column_width;

	            parent_element.scrollLeft = scroll_pos;
	        }

	        bind_grid_click() {
	            $.on(
	                this.$svg,
	                this.options.popup_trigger,
	                '.grid-row, .grid-header',
	                () => {
	                    this.unselect_all();
	                    this.hide_popup();
	                }
	            );
	        }

	        bind_bar_events() {
	            let is_dragging = false;
	            let x_on_start = 0;
	            let y_on_start = 0;
	            let is_resizing_left = false;
	            let is_resizing_right = false;
	            let parent_bar_id = null;
	            let bars = []; // instanceof Bar
	            this.bar_being_dragged = null;

	            function action_in_progress() {
	                return is_dragging || is_resizing_left || is_resizing_right;
	            }

	            $.on(this.$svg, 'mousedown', '.bar-wrapper, .handle', (e, element) => {
	                const bar_wrapper = $.closest('.bar-wrapper', element);

	                if (element.classList.contains('left')) {
	                    is_resizing_left = true;
	                } else if (element.classList.contains('right')) {
	                    is_resizing_right = true;
	                } else if (element.classList.contains('bar-wrapper')) {
	                    is_dragging = true;
	                }

	                bar_wrapper.classList.add('active');

	                x_on_start = e.offsetX;
	                y_on_start = e.offsetY;

	                parent_bar_id = bar_wrapper.getAttribute('data-id');
	                const ids = [
	                    parent_bar_id,
	                    ...this.get_all_dependent_tasks(parent_bar_id)
	                ];
	                bars = ids.map(id => this.get_bar(id));

	                this.bar_being_dragged = parent_bar_id;

	                bars.forEach(bar => {
	                    const $bar = bar.$bar;
	                    $bar.ox = $bar.getX();
	                    $bar.oy = $bar.getY();
	                    $bar.owidth = $bar.getWidth();
	                    $bar.finaldx = 0;
	                });
	            });

	            $.on(this.$svg, 'mousemove', e => {
	                if (!action_in_progress()) return;
	                const dx = e.offsetX - x_on_start;
	                const dy = e.offsetY - y_on_start;

	                bars.forEach(bar => {
	                    const $bar = bar.$bar;
	                    $bar.finaldx = this.get_snap_position(dx);

	                    if (is_resizing_left) {
	                        if (parent_bar_id === bar.task.id) {
	                            bar.update_bar_position({
	                                x: $bar.ox + $bar.finaldx,
	                                width: $bar.owidth - $bar.finaldx
	                            });
	                        } else {
	                            bar.update_bar_position({
	                                x: $bar.ox + $bar.finaldx
	                            });
	                        }
	                    } else if (is_resizing_right) {
	                        if (parent_bar_id === bar.task.id) {
	                            bar.update_bar_position({
	                                width: $bar.owidth + $bar.finaldx
	                            });
	                        }
	                    } else if (is_dragging) {
	                        bar.update_bar_position({ x: $bar.ox + $bar.finaldx });
	                    }
	                });
	            });

	            document.addEventListener('mouseup', e => {
	                if (is_dragging || is_resizing_left || is_resizing_right) {
	                    bars.forEach(bar => bar.group.classList.remove('active'));
	                }

	                is_dragging = false;
	                is_resizing_left = false;
	                is_resizing_right = false;
	            });

	            $.on(this.$svg, 'mouseup', e => {
	                this.bar_being_dragged = null;
	                bars.forEach(bar => {
	                    const $bar = bar.$bar;
	                    if (!$bar.finaldx) return;
	                    bar.date_changed();
	                    bar.set_action_completed();
	                });
	            });

	            this.bind_bar_progress();
	        }

	        bind_bar_progress() {
	            let x_on_start = 0;
	            let y_on_start = 0;
	            let is_resizing = null;
	            let bar = null;
	            let $bar_progress = null;
	            let $bar = null;

	            $.on(this.$svg, 'mousedown', '.handle.progress', (e, handle) => {
	                is_resizing = true;
	                x_on_start = e.offsetX;
	                y_on_start = e.offsetY;

	                const $bar_wrapper = $.closest('.bar-wrapper', handle);
	                const id = $bar_wrapper.getAttribute('data-id');
	                bar = this.get_bar(id);

	                $bar_progress = bar.$bar_progress;
	                $bar = bar.$bar;

	                $bar_progress.finaldx = 0;
	                $bar_progress.owidth = $bar_progress.getWidth();
	                $bar_progress.min_dx = -$bar_progress.getWidth();
	                $bar_progress.max_dx = $bar.getWidth() - $bar_progress.getWidth();
	            });

	            $.on(this.$svg, 'mousemove', e => {
	                if (!is_resizing) return;
	                let dx = e.offsetX - x_on_start;
	                let dy = e.offsetY - y_on_start;

	                if (dx > $bar_progress.max_dx) {
	                    dx = $bar_progress.max_dx;
	                }
	                if (dx < $bar_progress.min_dx) {
	                    dx = $bar_progress.min_dx;
	                }

	                const $handle = bar.$handle_progress;
	                $.attr($bar_progress, 'width', $bar_progress.owidth + dx);
	                $.attr($handle, 'points', bar.get_progress_polygon_points());
	                $bar_progress.finaldx = dx;
	            });

	            $.on(this.$svg, 'mouseup', () => {
	                is_resizing = false;
	                if (!($bar_progress && $bar_progress.finaldx)) return;
	                bar.progress_changed();
	                bar.set_action_completed();
	            });
	        }

	        get_all_dependent_tasks(task_id) {
	            let out = [];
	            let to_process = [task_id];
	            while (to_process.length) {
	                const deps = to_process.reduce((acc, curr) => {
	                    acc = acc.concat(this.dependency_map[curr]);
	                    return acc;
	                }, []);

	                out = out.concat(deps);
	                to_process = deps.filter(d => !to_process.includes(d));
	            }

	            return out.filter(Boolean);
	        }

	        get_snap_position(dx) {
	            let odx = dx,
	                rem,
	                position;

	            if (this.view_is('Week')) {
	                rem = dx % (this.options.column_width / 7);
	                position =
	                    odx -
	                    rem +
	                    (rem < this.options.column_width / 14
	                        ? 0
	                        : this.options.column_width / 7);
	            } else if (this.view_is('Month')) {
	                rem = dx % (this.options.column_width / 30);
	                position =
	                    odx -
	                    rem +
	                    (rem < this.options.column_width / 60
	                        ? 0
	                        : this.options.column_width / 30);
	            } else {
	                rem = dx % this.options.column_width;
	                position =
	                    odx -
	                    rem +
	                    (rem < this.options.column_width / 2
	                        ? 0
	                        : this.options.column_width);
	            }
	            return position;
	        }

	        unselect_all() {
	            [...this.$svg.querySelectorAll('.bar-wrapper')].forEach(el => {
	                el.classList.remove('active');
	            });
	        }

	        view_is(modes) {
	            if (typeof modes === 'string') {
	                return this.options.view_mode === modes;
	            }

	            if (Array.isArray(modes)) {
	                return modes.some(mode => this.options.view_mode === mode);
	            }

	            return false;
	        }

	        get_task(id) {
	            return this.tasks.find(task => {
	                return task.id === id;
	            });
	        }

	        get_bar(id) {
	            return this.bars.find(bar => {
	                return bar.task.id === id;
	            });
	        }

	        show_popup(options) {
	            if (!this.popup) {
	                this.popup = new Popup(
	                    this.popup_wrapper,
	                    this.options.custom_popup_html
	                );
	            }
	            this.popup.show(options);
	        }

	        hide_popup() {
	            this.popup && this.popup.hide();
	        }

	        trigger_event(event, args) {
	            if (this.options['on_' + event]) {
	                this.options['on_' + event].apply(null, args);
	            }
	        }

	        /**
	         * Gets the oldest starting date from the list of tasks
	         *
	         * @returns Date
	         * @memberof Gantt
	         */
	        get_oldest_starting_date() {
	            // 全ての task を1つの配列にする
	            const allTask = [];
	            for (let rowTasks of this.tasks) {
	                for (let task of rowTasks) {
	                    allTask.push(task);
	                }
	            }

	            return allTask
	                .map(task => task._start)
	                .reduce(
	                    (prev_date, cur_date) =>
	                        cur_date <= prev_date ? cur_date : prev_date
	                );
	        }

	        /**
	         * Clear all elements from the parent svg element
	         *
	         * @memberof Gantt
	         */
	        clear() {
	            this.$svg.innerHTML = '';
	        }
	    }

	    function generate_id(task) {
	        return (
	            task.name +
	            '_' +
	            Math.random()
	                .toString(36)
	                .slice(2, 12)
	        );
	    }

	    return Gantt;

	}));
	});

	var lib$1 = createCommonjsModule(function (module, exports) {
	function factory$jscomp$inline_224(exports$jscomp$0) {
	  function lib$1(token, options) {
	    if ("string" !== typeof token)
	      throw new InvalidTokenError("Invalid token specified");
	    options = options || {};
	    options = !0 === options.header ? 0 : 1;
	    try {
	      return JSON.parse(base64_url_decode(token.split(".")[options]));
	    } catch (e) {
	      throw new InvalidTokenError("Invalid token specified: " + e.message);
	    }
	  }
	  function base64_url_decode(str) {
	    str = str.replace(/-/g, "+").replace(/_/g, "/");
	    switch (str.length % 4) {
	      case 0:
	        break;
	      case 2:
	        str += "==";
	        break;
	      case 3:
	        str += "=";
	        break;
	      default:
	        throw "Illegal base64url string!";
	    }
	    try {
	      return b64DecodeUnicode(str);
	    } catch (err) {
	      return atob(str);
	    }
	  }
	  function interpretNumericEntities(str) {
	    return str.replace(/&#(\d+);/g, function($0, numberStr) {
	      return String.fromCharCode(parseInt(numberStr, 10));
	    });
	  }
	  function JSCompiler_object_inline_serializeDate_255(date) {
	    return toISO.call(date);
	  }
	  function pushToArray(arr, valueOrArray) {
	    push.apply(arr, isArray$1(valueOrArray) ? valueOrArray : [valueOrArray]);
	  }
	  function arrayToObject(source, options) {
	    options = options && options.plainObjects ? Object.create(null) : {};
	    for (var i = 0; i < source.length; ++i)
	      "undefined" !== typeof source[i] && (options[i] = source[i]);
	    return options;
	  }
	  function isString_1(value) {
	    return (
	      "string" == typeof value ||
	      (!isArray_1(value) &&
	        isObjectLike_1(value) &&
	        "[object String]" == _baseGetTag(value))
	    );
	  }
	  function _createCompounder(callback) {
	    return function(string) {
	      string = toString_1(string);
	      string = (
	        string &&
	        string.replace(reLatin, _deburrLetter).replace(reComboMark, "")
	      ).replace(reApos, "");
	      string = toString_1(string);
	      string = reHasUnicodeWord.test(string)
	        ? string.match(reUnicodeWord) || []
	        : string.match(reAsciiWord) || [];
	      for (
	        var accumulator = "",
	          index = -1,
	          length = null == string ? 0 : string.length;
	        ++index < length;

	      )
	        accumulator = callback(accumulator, string[index], index, string);
	      return accumulator;
	    };
	  }
	  function isPlainObject_1(value) {
	    if (!isObjectLike_1(value) || "[object Object]" != _baseGetTag(value))
	      return !1;
	    value = _getPrototype(value);
	    if (null === value) return !0;
	    value = hasOwnProperty$a.call(value, "constructor") && value.constructor;
	    return (
	      "function" == typeof value &&
	      value instanceof value &&
	      funcToString$2.call(value) == objectCtorString
	    );
	  }
	  function mapKeys_1(object$jscomp$0, iteratee) {
	    var result = {};
	    iteratee = _baseIteratee(iteratee);
	    _baseForOwn(object$jscomp$0, function(value, key, object) {
	      _baseAssignValue(result, iteratee(value, key, object), value);
	    });
	    return result;
	  }
	  function mapValues_1(object$jscomp$0, iteratee) {
	    var result = {};
	    iteratee = _baseIteratee(iteratee);
	    _baseForOwn(object$jscomp$0, function(value, key, object) {
	      _baseAssignValue(result, key, iteratee(value, key, object));
	    });
	    return result;
	  }
	  function _baseForOwn(object, iteratee) {
	    return object && _baseFor(object, iteratee, keys_1);
	  }
	  function _baseAssignValue(object, key, value) {
	    "__proto__" == key && _defineProperty$1
	      ? _defineProperty$1(object, key, {
	          configurable: !0,
	          enumerable: !0,
	          value: value,
	          writable: !0
	        })
	      : (object[key] = value);
	  }
	  function $getOwnPropertySymbols(it) {
	    var IS_OP = it === ObjectProto;
	    it = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
	    for (var result = [], i = 0, key; it.length > i; )
	      _has(AllSymbols, (key = it[i++])) &&
	        (IS_OP ? _has(ObjectProto, key) : 1) &&
	        result.push(AllSymbols[key]);
	    return result;
	  }
	  function $getOwnPropertyNames(it) {
	    it = gOPN$1(_toIobject(it));
	    for (var result = [], i = 0, key; it.length > i; )
	      _has(AllSymbols, (key = it[i++])) ||
	        key == HIDDEN ||
	        key == META ||
	        result.push(key);
	    return result;
	  }
	  function $getOwnPropertyDescriptor$1(it, key) {
	    it = _toIobject(it);
	    key = _toPrimitive(key, !0);
	    if (it !== ObjectProto || !_has(AllSymbols, key) || _has(OPSymbols, key)) {
	      var D = gOPD$1(it, key);
	      !D ||
	        !_has(AllSymbols, key) ||
	        (_has(it, HIDDEN) && it[HIDDEN][key]) ||
	        (D.enumerable = !0);
	      return D;
	    }
	  }
	  function $propertyIsEnumerable(key) {
	    var E = isEnum.call(this, (key = _toPrimitive(key, !0)));
	    return this === ObjectProto &&
	      _has(AllSymbols, key) &&
	      !_has(OPSymbols, key)
	      ? !1
	      : E ||
	        !_has(this, key) ||
	        !_has(AllSymbols, key) ||
	        (_has(this, HIDDEN) && this[HIDDEN][key])
	      ? E
	      : !0;
	  }
	  function $defineProperties(it$jscomp$0, P) {
	    _anObject(it$jscomp$0);
	    var it = (P = _toIobject(P)),
	      result = _objectKeys(it),
	      getSymbols = JSCompiler_object_inline_f_243;
	    if (getSymbols) {
	      getSymbols = getSymbols(it);
	      for (
	        var isEnum = JSCompiler_object_inline_f_241, i = 0, key;
	        getSymbols.length > i;

	      )
	        isEnum.call(it, (key = getSymbols[i++])) && result.push(key);
	    }
	    it = 0;
	    key = result.length;
	    for (var key$jscomp$0; key > it; )
	      $defineProperty(
	        it$jscomp$0,
	        (key$jscomp$0 = result[it++]),
	        P[key$jscomp$0]
	      );
	    return it$jscomp$0;
	  }
	  function $defineProperty(it, key, D) {
	    it === ObjectProto && $defineProperty(OPSymbols, key, D);
	    _anObject(it);
	    key = _toPrimitive(key, !0);
	    _anObject(D);
	    return _has(AllSymbols, key)
	      ? (D.enumerable
	          ? (_has(it, HIDDEN) && it[HIDDEN][key] && (it[HIDDEN][key] = !1),
	            (D = _objectCreate(D, { enumerable: _propertyDesc(0, !1) })))
	          : (_has(it, HIDDEN) || dP$1(it, HIDDEN, _propertyDesc(1, {})),
	            (it[HIDDEN][key] = !0)),
	        setSymbolDesc(it, key, D))
	      : dP$1(it, key, D);
	  }
	  function wrap(tag) {
	    var sym = (AllSymbols[tag] = _objectCreate($Symbol.prototype));
	    sym._k = tag;
	    return sym;
	  }
	  function JSCompiler_object_inline_f_245(it) {
	    if (windowNames && "[object Window]" == toString$3.call(it))
	      try {
	        var JSCompiler_temp = gOPN(it);
	      } catch (e) {
	        JSCompiler_temp = windowNames.slice();
	      }
	    else JSCompiler_temp = gOPN(_toIobject(it));
	    return JSCompiler_temp;
	  }
	  function createDict() {
	    var iframe = is ? document.createElement("iframe") : {},
	      i = _enumBugKeys.length;
	    iframe.style.display = "none";
	    _html.appendChild(iframe);
	    iframe.src = "javascript:";
	    iframe = iframe.contentWindow.document;
	    iframe.open();
	    iframe.write("<script>document.F=Object\x3c/script>");
	    iframe.close();
	    for (createDict = iframe.F; i--; )
	      delete createDict.prototype[_enumBugKeys[i]];
	    return createDict();
	  }
	  function Empty() {}
	  function _objectKeysInternal(object, names) {
	    object = _toIobject(object);
	    var i = 0,
	      result = [],
	      key;
	    for (key in object)
	      key != IE_PROTO && _has(object, key) && result.push(key);
	    for (; names.length > i; )
	      _has(object, (key = names[i++])) &&
	        (~arrayIndexOf(result, key) || result.push(key));
	    return result;
	  }
	  function _sharedKey(key) {
	    return shared[key] || (shared[key] = _uid(key));
	  }
	  function _toInteger(it) {
	    return isNaN((it = +it)) ? 0 : (0 < it ? floor : ceil)(it);
	  }
	  function _wksDefine(name) {
	    var $Symbol = _core.Symbol || (_core.Symbol = {});
	    "_" == name.charAt(0) ||
	      name in $Symbol ||
	      defineProperty($Symbol, name, { value: _wksExt.f(name) });
	  }
	  function _setToStringTag(it, tag, stat) {
	    it &&
	      !_has((it = stat ? it : it.prototype), TAG) &&
	      def(it, TAG, { configurable: !0, value: tag });
	  }
	  function _uid(key) {
	    return "Symbol(".concat(
	      void 0 === key ? "" : key,
	      ")_",
	      (++id + px).toString(36)
	    );
	  }
	  function _objectSap(KEY, exec) {
	    var fn = (_core.Object || {})[KEY] || Object[KEY],
	      exp = {};
	    exp[KEY] = exec(fn);
	    _export(
	      _export.S +
	        _export.F *
	          _fails(function() {
	            fn(1);
	          }),
	      "Object",
	      exp
	    );
	  }
	  function _toIobject(it) {
	    return _iobject(_defined(it));
	  }
	  function JSCompiler_object_inline_result_227(result) {
	    return this.xf["@@transducer/result"](result);
	  }
	  function JSCompiler_object_inline_init_226() {
	    return this.xf["@@transducer/init"]();
	  }
	  function _reduce_1(fn, acc, list) {
	    "function" === typeof fn && (fn = new XWrap(fn));
	    if (_isArrayLike_1(list)) {
	      for (var idx = 0, len = list.length; idx < len; ) {
	        if (
	          (acc = fn["@@transducer/step"](acc, list[idx])) &&
	          acc["@@transducer/reduced"]
	        ) {
	          acc = acc["@@transducer/value"];
	          break;
	        }
	        idx += 1;
	      }
	      return fn["@@transducer/result"](acc);
	    }
	    if ("function" === typeof list["fantasy-land/reduce"])
	      return _methodReduce(fn, acc, list, "fantasy-land/reduce");
	    if (null != list[symIterator])
	      return _iterableReduce(fn, acc, list[symIterator]());
	    if ("function" === typeof list.next) return _iterableReduce(fn, acc, list);
	    if ("function" === typeof list.reduce)
	      return _methodReduce(fn, acc, list, "reduce");
	    throw new TypeError("reduce: list must be array or iterable");
	  }
	  function _map_1(fn, functor) {
	    for (var idx = 0, len = functor.length, result = Array(len); idx < len; )
	      (result[idx] = fn(functor[idx])), (idx += 1);
	    return result;
	  }
	  function _curry2_1(fn) {
	    return function f2(a, b) {
	      switch (arguments.length) {
	        case 0:
	          return f2;
	        case 1:
	          return _isPlaceholder_1(a)
	            ? f2
	            : _curry1_1(function(_b) {
	                return fn(a, _b);
	              });
	        default:
	          return _isPlaceholder_1(a) && _isPlaceholder_1(b)
	            ? f2
	            : _isPlaceholder_1(a)
	            ? _curry1_1(function(_a) {
	                return fn(_a, b);
	              })
	            : _isPlaceholder_1(b)
	            ? _curry1_1(function(_b) {
	                return fn(a, _b);
	              })
	            : fn(a, b);
	      }
	    };
	  }
	  function _arity_1(n, fn) {
	    switch (n) {
	      case 0:
	        return function() {
	          return fn.apply(this, arguments);
	        };
	      case 1:
	        return function(a0) {
	          return fn.apply(this, arguments);
	        };
	      case 2:
	        return function(a0, a1) {
	          return fn.apply(this, arguments);
	        };
	      case 3:
	        return function(a0, a1, a2) {
	          return fn.apply(this, arguments);
	        };
	      case 4:
	        return function(a0, a1, a2, a3) {
	          return fn.apply(this, arguments);
	        };
	      case 5:
	        return function(a0, a1, a2, a3, a4) {
	          return fn.apply(this, arguments);
	        };
	      case 6:
	        return function(a0, a1, a2, a3, a4, a5) {
	          return fn.apply(this, arguments);
	        };
	      case 7:
	        return function(a0, a1, a2, a3, a4, a5, a6) {
	          return fn.apply(this, arguments);
	        };
	      case 8:
	        return function(a0, a1, a2, a3, a4, a5, a6, a7) {
	          return fn.apply(this, arguments);
	        };
	      case 9:
	        return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) {
	          return fn.apply(this, arguments);
	        };
	      case 10:
	        return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
	          return fn.apply(this, arguments);
	        };
	      default:
	        throw Error(
	          "First argument to _arity must be a non-negative integer no greater than ten"
	        );
	    }
	  }
	  function _curry1_1(fn) {
	    return function f1(a) {
	      return 0 === arguments.length || _isPlaceholder_1(a)
	        ? f1
	        : fn.apply(this, arguments);
	    };
	  }
	  function _isPlaceholder_1(a) {
	    return (
	      null != a && "object" === typeof a && !0 === a["@@functional/placeholder"]
	    );
	  }
	  function exporter(KEY, exec, ALIAS) {
	    var exp = {},
	      FORCE = _fails(function() {
	        return (
	          !!"\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff"[
	            KEY
	          ]() || "\u200b\u0085" != "\u200b\u0085"[KEY]()
	        );
	      });
	    exec = exp[KEY] = FORCE
	      ? exec(trim)
	      : "\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff"[
	          KEY
	        ];
	    ALIAS && (exp[ALIAS] = exec);
	    _export(_export.P + _export.F * FORCE, "String", exp);
	  }
	  function _defined(it) {
	    if (void 0 == it) throw TypeError("Can't call method on  " + it);
	    return it;
	  }
	  function $export(type, name, source) {
	    var IS_FORCED = type & $export.F,
	      IS_GLOBAL = type & $export.G,
	      IS_STATIC = type & $export.S,
	      IS_PROTO = type & $export.P,
	      IS_BIND = type & $export.B,
	      IS_WRAP = type & $export.W,
	      exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {}),
	      expProto = exports.prototype;
	    IS_STATIC = IS_GLOBAL
	      ? _global
	      : IS_STATIC
	      ? _global[name]
	      : (_global[name] || {}).prototype;
	    var key;
	    IS_GLOBAL && (source = name);
	    for (key in source)
	      if (
	        ((name = !IS_FORCED && IS_STATIC && void 0 !== IS_STATIC[key]),
	        !name || !_has(exports, key))
	      ) {
	        var out = name ? IS_STATIC[key] : source[key];
	        exports[key] =
	          IS_GLOBAL && "function" != typeof IS_STATIC[key]
	            ? source[key]
	            : IS_BIND && name
	            ? _ctx(out, _global)
	            : IS_WRAP && IS_STATIC[key] == out
	            ? (function(C) {
	                function F(a, b, c) {
	                  if (this instanceof C) {
	                    switch (arguments.length) {
	                      case 0:
	                        return new C();
	                      case 1:
	                        return new C(a);
	                      case 2:
	                        return new C(a, b);
	                    }
	                    return new C(a, b, c);
	                  }
	                  return C.apply(this, arguments);
	                }
	                F.prototype = C.prototype;
	                return F;
	              })(out)
	            : IS_PROTO && "function" == typeof out
	            ? _ctx(Function.call, out)
	            : out;
	        IS_PROTO &&
	          (((exports.virtual || (exports.virtual = {}))[key] = out),
	          type & $export.R &&
	            expProto &&
	            !expProto[key] &&
	            _hide(expProto, key, out));
	      }
	  }
	  function _has(it, key) {
	    return hasOwnProperty$9.call(it, key);
	  }
	  function _propertyDesc(bitmap, value) {
	    return {
	      enumerable: !(bitmap & 1),
	      configurable: !(bitmap & 2),
	      writable: !(bitmap & 4),
	      value: value
	    };
	  }
	  function _toPrimitive(it, S) {
	    if (!_isObject(it)) return it;
	    var fn, val;
	    if (
	      (S &&
	        "function" == typeof (fn = it.toString) &&
	        !_isObject((val = fn.call(it)))) ||
	      ("function" == typeof (fn = it.valueOf) &&
	        !_isObject((val = fn.call(it)))) ||
	      (!S &&
	        "function" == typeof (fn = it.toString) &&
	        !_isObject((val = fn.call(it))))
	    )
	      return val;
	    throw TypeError("Can't convert object to primitive value");
	  }
	  function _fails(exec) {
	    try {
	      return !!exec();
	    } catch (e) {
	      return !0;
	    }
	  }
	  function _anObject(it) {
	    if (!_isObject(it)) throw TypeError(it + " is not an object!");
	    return it;
	  }
	  function _isObject(it) {
	    return "object" === typeof it ? null !== it : "function" === typeof it;
	  }
	  function _ctx(fn, that, length) {
	    _aFunction(fn);
	    if (void 0 === that) return fn;
	    switch (length) {
	      case 1:
	        return function(a) {
	          return fn.call(that, a);
	        };
	      case 2:
	        return function(a, b) {
	          return fn.call(that, a, b);
	        };
	      case 3:
	        return function(a, b, c) {
	          return fn.call(that, a, b, c);
	        };
	    }
	    return function() {
	      return fn.apply(that, arguments);
	    };
	  }
	  function _aFunction(it) {
	    if ("function" != typeof it) throw TypeError(it + " is not a function!");
	    return it;
	  }
	  function T_1() {
	    return !0;
	  }
	  function toNumber_1(value) {
	    if ("number" == typeof value) return value;
	    if (isSymbol_1(value)) return NAN;
	    isObject_1(value) &&
	      ((value = "function" == typeof value.valueOf ? value.valueOf() : value),
	      (value = isObject_1(value) ? value + "" : value));
	    if ("string" != typeof value) return 0 === value ? value : +value;
	    value = value.replace(reTrim, "");
	    var isBinary = reIsBinary.test(value);
	    return isBinary || reIsOctal.test(value)
	      ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	      : reIsBadHex.test(value)
	      ? NAN
	      : +value;
	  }
	  function _baseIteratee(value) {
	    return "function" == typeof value
	      ? value
	      : null == value
	      ? identity_1
	      : "object" == typeof value
	      ? isArray_1(value)
	        ? _baseMatchesProperty(value[0], value[1])
	        : _baseMatches(value)
	      : _isKey(value)
	      ? _baseProperty(_toKey(value))
	      : _basePropertyDeep(value);
	  }
	  function _basePropertyDeep(path) {
	    return function(object) {
	      return _baseGet(object, path);
	    };
	  }
	  function _baseProperty(key) {
	    return function(object) {
	      return null == object ? void 0 : object[key];
	    };
	  }
	  function identity_1(value) {
	    return value;
	  }
	  function _baseMatchesProperty(path, srcValue) {
	    return _isKey(path) && srcValue === srcValue && !isObject_1(srcValue)
	      ? _matchesStrictComparable(_toKey(path), srcValue)
	      : function(object) {
	          var objValue = null == object ? void 0 : _baseGet(object, path);
	          objValue = void 0 === objValue ? void 0 : objValue;
	          if (void 0 === objValue && objValue === srcValue) {
	            if ((objValue = null != object)) {
	              objValue = path;
	              objValue = _castPath(objValue, object);
	              for (
	                var index = -1, length = objValue.length, result = !1;
	                ++index < length;

	              ) {
	                var JSCompiler_temp = _toKey(objValue[index]);
	                if (
	                  !(result =
	                    null != object &&
	                    null != object &&
	                    JSCompiler_temp in Object(object))
	                )
	                  break;
	                object = object[JSCompiler_temp];
	              }
	              result || ++index != length
	                ? (objValue = result)
	                : ((length = null == object ? 0 : object.length),
	                  (objValue =
	                    !!length &&
	                    isLength_1(length) &&
	                    _isIndex(JSCompiler_temp, length) &&
	                    (isArray_1(object) || isArguments_1(object))));
	            }
	            JSCompiler_temp = objValue;
	          } else JSCompiler_temp = baseIsEqual(srcValue, objValue, 3);
	          return JSCompiler_temp;
	        };
	  }
	  function _baseGet(object, path) {
	    path = _castPath(path, object);
	    for (
	      var index = 0, length = path.length;
	      null != object && index < length;

	    )
	      object = object[_toKey(path[index++])];
	    return index && index == length ? object : void 0;
	  }
	  function _toKey(value) {
	    if ("string" == typeof value || isSymbol_1(value)) return value;
	    var result = value + "";
	    return "0" == result && 1 / value == -INFINITY$1 ? "-0" : result;
	  }
	  function _castPath(value, object) {
	    return isArray_1(value)
	      ? value
	      : _isKey(value, object)
	      ? [value]
	      : _stringToPath(toString_1(value));
	  }
	  function toString_1(value) {
	    return null == value ? "" : baseToString(value);
	  }
	  function _isKey(value, object) {
	    if (isArray_1(value)) return !1;
	    var type = typeof value;
	    return "number" == type ||
	      "symbol" == type ||
	      "boolean" == type ||
	      null == value ||
	      isSymbol_1(value)
	      ? !0
	      : reIsPlainProp.test(value) ||
	          !reIsDeepProp.test(value) ||
	          (null != object && value in Object(object));
	  }
	  function isSymbol_1(value) {
	    return (
	      "symbol" == typeof value ||
	      (isObjectLike_1(value) && "[object Symbol]" == _baseGetTag(value))
	    );
	  }
	  function _baseMatches(source) {
	    var matchData = _getMatchData(source);
	    return 1 == matchData.length && matchData[0][2]
	      ? _matchesStrictComparable(matchData[0][0], matchData[0][1])
	      : function(object) {
	          return object === source || _baseIsMatch(object, source, matchData);
	        };
	  }
	  function _matchesStrictComparable(key, srcValue) {
	    return function(object) {
	      return null == object
	        ? !1
	        : object[key] === srcValue &&
	            (void 0 !== srcValue || key in Object(object));
	    };
	  }
	  function _getMatchData(object) {
	    for (var result = keys_1(object), length = result.length; length--; ) {
	      var key = result[length],
	        value = object[key];
	      result[length] = [key, value, value === value && !isObject_1(value)];
	    }
	    return result;
	  }
	  function _baseIsMatch(object, source, matchData, customizer) {
	    var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;
	    if (null == object) return !length;
	    for (object = Object(object); index--; ) {
	      var data = matchData[index];
	      if (
	        noCustomizer && data[2]
	          ? data[1] !== object[data[0]]
	          : !(data[0] in object)
	      )
	        return !1;
	    }
	    for (; ++index < length; ) {
	      data = matchData[index];
	      var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];
	      if (noCustomizer && data[2]) {
	        if (void 0 === objValue && !(key in object)) return !1;
	      } else {
	        data = new _Stack();
	        if (customizer)
	          var result = customizer(
	            objValue,
	            srcValue,
	            key,
	            object,
	            source,
	            data
	          );
	        if (
	          void 0 === result
	            ? !baseIsEqual(srcValue, objValue, 3, customizer, data)
	            : !result
	        )
	          return !1;
	      }
	    }
	    return !0;
	  }
	  function keys_1(object) {
	    if (isArrayLike_1(object)) {
	      var isArr = isArray_1(object),
	        isArg = !isArr && isArguments_1(object),
	        isBuff = !isArr && !isArg && isBuffer_1(object),
	        isType = !isArr && !isArg && !isBuff && isTypedArray_1(object);
	      if ((isArr = isArr || isArg || isBuff || isType)) {
	        isArg = object.length;
	        for (
	          var iteratee = String, index = -1, result = Array(isArg);
	          ++index < isArg;

	        )
	          result[index] = iteratee(index);
	        isArg = result;
	      } else isArg = [];
	      iteratee = isArg.length;
	      for (var key in object)
	        !hasOwnProperty$5.call(object, key) ||
	          (isArr &&
	            ("length" == key ||
	              (isBuff && ("offset" == key || "parent" == key)) ||
	              (isType &&
	                ("buffer" == key ||
	                  "byteLength" == key ||
	                  "byteOffset" == key)) ||
	              _isIndex(key, iteratee))) ||
	          isArg.push(key);
	      object = isArg;
	    } else if (
	      ((key = object && object.constructor),
	      object === (("function" == typeof key && key.prototype) || objectProto$8))
	    ) {
	      key = [];
	      for (isBuff in Object(object))
	        hasOwnProperty$6.call(object, isBuff) &&
	          "constructor" != isBuff &&
	          key.push(isBuff);
	      object = key;
	    } else object = _nativeKeys(object);
	    return object;
	  }
	  function isArrayLike_1(value) {
	    return null != value && isLength_1(value.length) && !isFunction_1(value);
	  }
	  function _overArg(func, transform) {
	    return function(arg) {
	      return func(transform(arg));
	    };
	  }
	  function _baseUnary(func) {
	    return function(value) {
	      return func(value);
	    };
	  }
	  function _baseIsTypedArray(value) {
	    return (
	      isObjectLike_1(value) &&
	      isLength_1(value.length) &&
	      !!typedArrayTags[_baseGetTag(value)]
	    );
	  }
	  function isLength_1(value) {
	    return (
	      "number" == typeof value &&
	      -1 < value &&
	      0 == value % 1 &&
	      9007199254740991 >= value
	    );
	  }
	  function _isIndex(value, length) {
	    var type = typeof value;
	    length = null == length ? 9007199254740991 : length;
	    return (
	      !!length &&
	      ("number" == type || ("symbol" != type && reIsUint.test(value))) &&
	      -1 < value &&
	      0 == value % 1 &&
	      value < length
	    );
	  }
	  function stubFalse_1() {
	    return !1;
	  }
	  function _baseIsArguments(value) {
	    return isObjectLike_1(value) && "[object Arguments]" == _baseGetTag(value);
	  }
	  function isObjectLike_1(value) {
	    return null != value && "object" == typeof value;
	  }
	  function stubArray_1() {
	    return [];
	  }
	  function _arrayFilter(array, predicate) {
	    for (
	      var index = -1,
	        length = null == array ? 0 : array.length,
	        resIndex = 0,
	        result = [];
	      ++index < length;

	    ) {
	      var value = array[index];
	      predicate(value, index, array) && (result[resIndex++] = value);
	    }
	    return result;
	  }
	  function _baseGetAllKeys(object, keysFunc, symbolsFunc) {
	    keysFunc = keysFunc(object);
	    if (!isArray_1(object)) {
	      object = symbolsFunc(object);
	      symbolsFunc = -1;
	      for (
	        var length = object.length, offset = keysFunc.length;
	        ++symbolsFunc < length;

	      )
	        keysFunc[offset + symbolsFunc] = object[symbolsFunc];
	    }
	    return keysFunc;
	  }
	  function _equalByTag(
	    object,
	    other,
	    tag,
	    bitmask,
	    customizer,
	    equalFunc,
	    stack
	  ) {
	    switch (tag) {
	      case "[object DataView]":
	        if (
	          object.byteLength != other.byteLength ||
	          object.byteOffset != other.byteOffset
	        )
	          break;
	        object = object.buffer;
	        other = other.buffer;
	      case "[object ArrayBuffer]":
	        if (
	          object.byteLength != other.byteLength ||
	          !equalFunc(new _Uint8Array(object), new _Uint8Array(other))
	        )
	          break;
	        return !0;
	      case "[object Boolean]":
	      case "[object Date]":
	      case "[object Number]":
	        return eq_1(+object, +other);
	      case "[object Error]":
	        return object.name == other.name && object.message == other.message;
	      case "[object RegExp]":
	      case "[object String]":
	        return object == other + "";
	      case "[object Map]":
	        var convert = _mapToArray;
	      case "[object Set]":
	        convert || (convert = _setToArray);
	        if (object.size != other.size && !(bitmask & 1)) break;
	        if ((tag = stack.get(object))) return tag == other;
	        bitmask |= 2;
	        stack.set(object, other);
	        other = _equalArrays(
	          convert(object),
	          convert(other),
	          bitmask,
	          customizer,
	          equalFunc,
	          stack
	        );
	        stack["delete"](object);
	        return other;
	      case "[object Symbol]":
	        if (symbolValueOf)
	          return symbolValueOf.call(object) == symbolValueOf.call(other);
	    }
	    return !1;
	  }
	  function _setToArray(set) {
	    var index = -1,
	      result = Array(set.size);
	    set.forEach(function(value) {
	      result[++index] = value;
	    });
	    return result;
	  }
	  function _mapToArray(map) {
	    var index = -1,
	      result = Array(map.size);
	    map.forEach(function(value, key) {
	      result[++index] = [key, value];
	    });
	    return result;
	  }
	  function _equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
	    var isPartial = bitmask & 1,
	      arrLength = array.length,
	      othLength = other.length;
	    if (arrLength != othLength && !(isPartial && othLength > arrLength))
	      return !1;
	    if ((othLength = stack.get(array)) && stack.get(other))
	      return othLength == other;
	    othLength = -1;
	    var result = !0,
	      seen = bitmask & 2 ? new SetCache() : void 0;
	    stack.set(array, other);
	    for (stack.set(other, array); ++othLength < arrLength; ) {
	      var arrValue = array[othLength],
	        othValue = other[othLength];
	      if (customizer)
	        var compared = isPartial
	          ? customizer(othValue, arrValue, othLength, other, array, stack)
	          : customizer(arrValue, othValue, othLength, array, other, stack);
	      if (void 0 !== compared) {
	        if (compared) continue;
	        result = !1;
	        break;
	      }
	      if (seen) {
	        if (
	          !_arraySome(other, function(othValue, othIndex) {
	            if (
	              !seen.has(othIndex) &&
	              (arrValue === othValue ||
	                equalFunc(arrValue, othValue, bitmask, customizer, stack))
	            )
	              return seen.push(othIndex);
	          })
	        ) {
	          result = !1;
	          break;
	        }
	      } else if (
	        arrValue !== othValue &&
	        !equalFunc(arrValue, othValue, bitmask, customizer, stack)
	      ) {
	        result = !1;
	        break;
	      }
	    }
	    stack["delete"](array);
	    stack["delete"](other);
	    return result;
	  }
	  function _arraySome(array, predicate) {
	    for (
	      var index = -1, length = null == array ? 0 : array.length;
	      ++index < length;

	    )
	      if (predicate(array[index], index, array)) return !0;
	    return !1;
	  }
	  function _getMapData(map, key) {
	    map = map.__data__;
	    var type = typeof key;
	    return ("string" == type ||
	    "number" == type ||
	    "symbol" == type ||
	    "boolean" == type
	    ? "__proto__" !== key
	    : null === key)
	      ? map["string" == typeof key ? "string" : "hash"]
	      : map.map;
	  }
	  function _getNative(object, key) {
	    object = null == object ? void 0 : object[key];
	    return (!isObject_1(object) || (maskSrcKey && maskSrcKey in object)
	    ? 0
	    : (isFunction_1(object) ? reIsNative : reIsHostCtor).test(
	        _toSource(object)
	      ))
	      ? object
	      : void 0;
	  }
	  function _toSource(func) {
	    if (null != func) {
	      try {
	        return funcToString.call(func);
	      } catch (e) {}
	      return func + "";
	    }
	    return "";
	  }
	  function isFunction_1(value) {
	    if (!isObject_1(value)) return !1;
	    value = _baseGetTag(value);
	    return (
	      "[object Function]" == value ||
	      "[object GeneratorFunction]" == value ||
	      "[object AsyncFunction]" == value ||
	      "[object Proxy]" == value
	    );
	  }
	  function isObject_1(value) {
	    var type = typeof value;
	    return null != value && ("object" == type || "function" == type);
	  }
	  function _baseGetTag(value) {
	    if (null == value)
	      value = void 0 === value ? "[object Undefined]" : "[object Null]";
	    else if (symToStringTag$1 && symToStringTag$1 in Object(value)) {
	      var isOwn = hasOwnProperty.call(value, symToStringTag),
	        tag = value[symToStringTag];
	      try {
	        value[symToStringTag] = void 0;
	      } catch (e) {}
	      var result = nativeObjectToString.call(value);
	      isOwn ? (value[symToStringTag] = tag) : delete value[symToStringTag];
	      value = result;
	    } else value = nativeObjectToString$1.call(value);
	    return value;
	  }
	  function _assocIndexOf(array, key) {
	    for (var length = array.length; length--; )
	      if (eq_1(array[length][0], key)) return length;
	    return -1;
	  }
	  function eq_1(value, other) {
	    return value === other || (value !== value && other !== other);
	  }
	  function ListCache(entries) {
	    var index = -1,
	      length = null == entries ? 0 : entries.length;
	    for (this.clear(); ++index < length; ) {
	      var entry = entries[index];
	      this.set(entry[0], entry[1]);
	    }
	  }
	  function createCommonjsModule(fn, module) {
	    return (
	      (module = { exports: {} }), fn(module, module.exports), module.exports
	    );
	  }
	  function Hash(entries) {
	    var index = -1,
	      length = null == entries ? 0 : entries.length;
	    for (this.clear(); ++index < length; ) {
	      var entry = entries[index];
	      this.set(entry[0], entry[1]);
	    }
	  }
	  function MapCache(entries) {
	    var index = -1,
	      length = null == entries ? 0 : entries.length;
	    for (this.clear(); ++index < length; ) {
	      var entry = entries[index];
	      this.set(entry[0], entry[1]);
	    }
	  }
	  function Stack(entries) {
	    this.size = (this.__data__ = new _ListCache(entries)).size;
	  }
	  function SetCache(values) {
	    var index = -1,
	      length = null == values ? 0 : values.length;
	    for (this.__data__ = new _MapCache(); ++index < length; )
	      this.add(values[index]);
	  }
	  function baseIsEqual(value, other, bitmask, customizer, stack) {
	    if (value === other) other = !0;
	    else if (
	      null == value ||
	      null == other ||
	      (!isObjectLike_1(value) && !isObjectLike_1(other))
	    )
	      other = value !== value && other !== other;
	    else
	      a: {
	        var objIsArr = isArray_1(value),
	          othIsArr = isArray_1(other),
	          objTag = objIsArr ? "[object Array]" : _getTag(value),
	          othTag = othIsArr ? "[object Array]" : _getTag(other);
	        objTag = "[object Arguments]" == objTag ? "[object Object]" : objTag;
	        othTag = "[object Arguments]" == othTag ? "[object Object]" : othTag;
	        var objIsObj = "[object Object]" == objTag;
	        othIsArr = "[object Object]" == othTag;
	        if ((othTag = objTag == othTag) && isBuffer_1(value)) {
	          if (!isBuffer_1(other)) {
	            other = !1;
	            break a;
	          }
	          objIsArr = !0;
	          objIsObj = !1;
	        }
	        if (othTag && !objIsObj)
	          stack || (stack = new _Stack()),
	            (other =
	              objIsArr || isTypedArray_1(value)
	                ? _equalArrays(
	                    value,
	                    other,
	                    bitmask,
	                    customizer,
	                    baseIsEqual,
	                    stack
	                  )
	                : _equalByTag(
	                    value,
	                    other,
	                    objTag,
	                    bitmask,
	                    customizer,
	                    baseIsEqual,
	                    stack
	                  ));
	        else {
	          if (
	            !(bitmask & 1) &&
	            ((objIsArr =
	              objIsObj && hasOwnProperty$8.call(value, "__wrapped__")),
	            (objTag = othIsArr && hasOwnProperty$8.call(other, "__wrapped__")),
	            objIsArr || objTag)
	          ) {
	            value = objIsArr ? value.value() : value;
	            other = objTag ? other.value() : other;
	            stack || (stack = new _Stack());
	            other = baseIsEqual(value, other, bitmask, customizer, stack);
	            break a;
	          }
	          if (othTag)
	            b: if (
	              (stack || (stack = new _Stack()),
	              (objIsArr = bitmask & 1),
	              (objTag = _baseGetAllKeys(value, keys_1, _getSymbols)),
	              (othIsArr = objTag.length),
	              (othTag = _baseGetAllKeys(other, keys_1, _getSymbols).length),
	              othIsArr == othTag || objIsArr)
	            ) {
	              for (objIsObj = othIsArr; objIsObj--; ) {
	                var key = objTag[objIsObj];
	                if (
	                  !(objIsArr ? key in other : hasOwnProperty$7.call(other, key))
	                ) {
	                  other = !1;
	                  break b;
	                }
	              }
	              if ((othTag = stack.get(value)) && stack.get(other))
	                other = othTag == other;
	              else {
	                othTag = !0;
	                stack.set(value, other);
	                stack.set(other, value);
	                for (var skipCtor = objIsArr; ++objIsObj < othIsArr; ) {
	                  key = objTag[objIsObj];
	                  var objValue = value[key],
	                    othValue = other[key];
	                  if (customizer)
	                    var compared = objIsArr
	                      ? customizer(othValue, objValue, key, other, value, stack)
	                      : customizer(
	                          objValue,
	                          othValue,
	                          key,
	                          value,
	                          other,
	                          stack
	                        );
	                  if (
	                    void 0 === compared
	                      ? objValue !== othValue &&
	                        !baseIsEqual(
	                          objValue,
	                          othValue,
	                          bitmask,
	                          customizer,
	                          stack
	                        )
	                      : !compared
	                  ) {
	                    othTag = !1;
	                    break;
	                  }
	                  skipCtor || (skipCtor = "constructor" == key);
	                }
	                othTag &&
	                  !skipCtor &&
	                  ((bitmask = value.constructor),
	                  (customizer = other.constructor),
	                  bitmask != customizer &&
	                    "constructor" in value &&
	                    "constructor" in other &&
	                    !(
	                      "function" == typeof bitmask &&
	                      bitmask instanceof bitmask &&
	                      "function" == typeof customizer &&
	                      customizer instanceof customizer
	                    ) &&
	                    (othTag = !1));
	                stack["delete"](value);
	                stack["delete"](other);
	                other = othTag;
	              }
	            } else other = !1;
	          else other = !1;
	        }
	      }
	    return other;
	  }
	  function memoize(func, resolver) {
	    function memoized() {
	      var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;
	      if (cache.has(key)) return cache.get(key);
	      args = func.apply(this, args);
	      memoized.cache = cache.set(key, args) || cache;
	      return args;
	    }
	    if (
	      "function" != typeof func ||
	      (null != resolver && "function" != typeof resolver)
	    )
	      throw new TypeError("Expected a function");
	    memoized.cache = new (memoize.Cache || _MapCache)();
	    return memoized;
	  }
	  function baseToString(value) {
	    if ("string" == typeof value) return value;
	    if (isArray_1(value)) {
	      for (
	        var index = -1,
	          length = null == value ? 0 : value.length,
	          result = Array(length);
	        ++index < length;

	      )
	        result[index] = baseToString(value[index]);
	      return result + "";
	    }
	    if (isSymbol_1(value))
	      return symbolToString ? symbolToString.call(value) : "";
	    index = value + "";
	    return "0" == index && 1 / value == -INFINITY ? "-0" : index;
	  }
	  function _iterableReduce(xf, acc, iter) {
	    for (var step = iter.next(); !step.done; ) {
	      if (
	        (acc = xf["@@transducer/step"](acc, step.value)) &&
	        acc["@@transducer/reduced"]
	      ) {
	        acc = acc["@@transducer/value"];
	        break;
	      }
	      step = iter.next();
	    }
	    return xf["@@transducer/result"](acc);
	  }
	  function _methodReduce(xf, acc, obj, methodName) {
	    return xf["@@transducer/result"](
	      obj[methodName](bind_1(xf["@@transducer/step"], xf), acc)
	    );
	  }
	  function _curryN(length, received, fn) {
	    return function() {
	      for (
	        var combined = [], argsIdx = 0, left = length, combinedIdx = 0;
	        combinedIdx < received.length || argsIdx < arguments.length;

	      ) {
	        if (
	          combinedIdx < received.length &&
	          (!_isPlaceholder_1(received[combinedIdx]) ||
	            argsIdx >= arguments.length)
	        )
	          var result = received[combinedIdx];
	        else (result = arguments[argsIdx]), (argsIdx += 1);
	        combined[combinedIdx] = result;
	        _isPlaceholder_1(result) || --left;
	        combinedIdx += 1;
	      }
	      return 0 >= left
	        ? fn.apply(this, combined)
	        : _arity_1(left, _curryN(length, combined, fn));
	    };
	  }
	  function toInteger$1(dirtyNumber) {
	    if (null === dirtyNumber || !0 === dirtyNumber || !1 === dirtyNumber)
	      return NaN;
	    dirtyNumber = Number(dirtyNumber);
	    return isNaN(dirtyNumber)
	      ? dirtyNumber
	      : 0 > dirtyNumber
	      ? Math.ceil(dirtyNumber)
	      : Math.floor(dirtyNumber);
	  }
	  function toDate(argument) {
	    if (1 > arguments.length)
	      throw new TypeError(
	        "1 argument required, but only " + arguments.length + " present"
	      );
	    var argStr = Object.prototype.toString.call(argument);
	    if (
	      argument instanceof Date ||
	      ("object" === typeof argument && "[object Date]" === argStr)
	    )
	      return new Date(argument.getTime());
	    if ("number" === typeof argument || "[object Number]" === argStr)
	      return new Date(argument);
	    ("string" !== typeof argument && "[object String]" !== argStr) ||
	      "undefined" === typeof console ||
	      (console.warn(
	        "Starting with v2.0.0-beta.1 date-fns doesn't accept strings as arguments. Please use `parseISO` to parse strings. See: https://git.io/fpAk2"
	      ),
	      console.warn(Error().stack));
	    return new Date(NaN);
	  }
	  function addMilliseconds(dirtyDate, dirtyAmount) {
	    if (2 > arguments.length)
	      throw new TypeError(
	        "2 arguments required, but only " + arguments.length + " present"
	      );
	    var timestamp = toDate(dirtyDate).getTime(),
	      amount = toInteger$1(dirtyAmount);
	    return new Date(timestamp + amount);
	  }
	  function getTimezoneOffsetInMilliseconds(dirtyDate) {
	    var date = new Date(dirtyDate.getTime());
	    dirtyDate = date.getTimezoneOffset();
	    date.setSeconds(0, 0);
	    date = date.getTime() % 6e4;
	    return 6e4 * dirtyDate + date;
	  }
	  function isValid(dirtyDate) {
	    if (1 > arguments.length)
	      throw new TypeError(
	        "1 argument required, but only " + arguments.length + " present"
	      );
	    var date = toDate(dirtyDate);
	    return !isNaN(date);
	  }
	  function buildFormatLongFn(args) {
	    return function(dirtyOptions) {
	      dirtyOptions = dirtyOptions || {};
	      return (
	        args.formats[
	          dirtyOptions.width ? String(dirtyOptions.width) : args.defaultWidth
	        ] || args.formats[args.defaultWidth]
	      );
	    };
	  }
	  function buildLocalizeFn(args) {
	    return function(dirtyIndex, dirtyOptions) {
	      dirtyOptions = dirtyOptions || {};
	      var width = dirtyOptions.width
	        ? String(dirtyOptions.width)
	        : args.defaultWidth;
	      dirtyOptions =
	        "formatting" ===
	          (dirtyOptions.context
	            ? String(dirtyOptions.context)
	            : "standalone") && args.formattingValues
	          ? args.formattingValues[width] ||
	            args.formattingValues[args.defaultFormattingWidth]
	          : args.values[width] || args.values[args.defaultWidth];
	      dirtyIndex = args.argumentCallback
	        ? args.argumentCallback(dirtyIndex)
	        : dirtyIndex;
	      return dirtyOptions[dirtyIndex];
	    };
	  }
	  function buildMatchPatternFn(args) {
	    return function(dirtyString, dirtyOptions) {
	      dirtyString = String(dirtyString);
	      dirtyOptions = dirtyOptions || {};
	      var matchResult = dirtyString.match(args.matchPattern);
	      if (!matchResult) return null;
	      matchResult = matchResult[0];
	      var parseResult = dirtyString.match(args.parsePattern);
	      if (!parseResult) return null;
	      parseResult = args.valueCallback
	        ? args.valueCallback(parseResult[0])
	        : parseResult[0];
	      parseResult = dirtyOptions.valueCallback
	        ? dirtyOptions.valueCallback(parseResult)
	        : parseResult;
	      return {
	        value: parseResult,
	        rest: dirtyString.slice(matchResult.length)
	      };
	    };
	  }
	  function buildMatchFn(args) {
	    return function(dirtyString, dirtyOptions) {
	      var string = String(dirtyString);
	      dirtyString = dirtyOptions || {};
	      var width = dirtyString.width;
	      dirtyOptions = string.match(
	        (width && args.matchPatterns[width]) ||
	          args.matchPatterns[args.defaultMatchWidth]
	      );
	      if (!dirtyOptions) return null;
	      dirtyOptions = dirtyOptions[0];
	      width =
	        (width && args.parsePatterns[width]) ||
	        args.parsePatterns[args.defaultParseWidth];
	      width =
	        "[object Array]" === Object.prototype.toString.call(width)
	          ? width.findIndex(function(pattern) {
	              return pattern.test(string);
	            })
	          : findKey(width, function(pattern) {
	              return pattern.test(string);
	            });
	      width = args.valueCallback ? args.valueCallback(width) : width;
	      width = dirtyString.valueCallback
	        ? dirtyString.valueCallback(width)
	        : width;
	      return { value: width, rest: string.slice(dirtyOptions.length) };
	    };
	  }
	  function findKey(object, predicate) {
	    for (var key in object)
	      if (object.hasOwnProperty(key) && predicate(object[key])) return key;
	  }
	  function addLeadingZeros(number, targetLength) {
	    for (
	      var output = Math.abs(number).toString();
	      output.length < targetLength;

	    )
	      output = "0" + output;
	    return (0 > number ? "-" : "") + output;
	  }
	  function getUTCDayOfYear(dirtyDate) {
	    if (1 > arguments.length)
	      throw new TypeError(
	        "1 argument required, but only " + arguments.length + " present"
	      );
	    var date = toDate(dirtyDate),
	      timestamp = date.getTime();
	    date.setUTCMonth(0, 1);
	    date.setUTCHours(0, 0, 0, 0);
	    date = date.getTime();
	    return Math.floor((timestamp - date) / 864e5) + 1;
	  }
	  function startOfUTCISOWeek(dirtyDate) {
	    if (1 > arguments.length)
	      throw new TypeError(
	        "1 argument required, but only " + arguments.length + " present"
	      );
	    var date = toDate(dirtyDate),
	      day = date.getUTCDay();
	    day = (1 > day ? 7 : 0) + day - 1;
	    date.setUTCDate(date.getUTCDate() - day);
	    date.setUTCHours(0, 0, 0, 0);
	    return date;
	  }
	  function getUTCISOWeekYear(dirtyDate) {
	    if (1 > arguments.length)
	      throw new TypeError(
	        "1 argument required, but only " + arguments.length + " present"
	      );
	    var date = toDate(dirtyDate),
	      year = date.getUTCFullYear(),
	      fourthOfJanuaryOfNextYear = new Date(0);
	    fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
	    fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
	    fourthOfJanuaryOfNextYear = startOfUTCISOWeek(fourthOfJanuaryOfNextYear);
	    var fourthOfJanuaryOfThisYear = new Date(0);
	    fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
	    fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
	    fourthOfJanuaryOfThisYear = startOfUTCISOWeek(fourthOfJanuaryOfThisYear);
	    return date.getTime() >= fourthOfJanuaryOfNextYear.getTime()
	      ? year + 1
	      : date.getTime() >= fourthOfJanuaryOfThisYear.getTime()
	      ? year
	      : year - 1;
	  }
	  function startOfUTCISOWeekYear(dirtyDate) {
	    if (1 > arguments.length)
	      throw new TypeError(
	        "1 argument required, but only " + arguments.length + " present"
	      );
	    var year = getUTCISOWeekYear(dirtyDate),
	      fourthOfJanuary = new Date(0);
	    fourthOfJanuary.setUTCFullYear(year, 0, 4);
	    fourthOfJanuary.setUTCHours(0, 0, 0, 0);
	    return startOfUTCISOWeek(fourthOfJanuary);
	  }
	  function getUTCISOWeek(dirtyDate) {
	    if (1 > arguments.length)
	      throw new TypeError(
	        "1 argument required, but only " + arguments.length + " present"
	      );
	    var date = toDate(dirtyDate);
	    date =
	      startOfUTCISOWeek(date).getTime() - startOfUTCISOWeekYear(date).getTime();
	    return Math.round(date / 6048e5) + 1;
	  }
	  function startOfUTCWeek(dirtyDate, dirtyOptions) {
	    if (1 > arguments.length)
	      throw new TypeError(
	        "1 argument required, but only " + arguments.length + " present"
	      );
	    var options = dirtyOptions || {},
	      locale = options.locale;
	    locale = locale && locale.options && locale.options.weekStartsOn;
	    locale = null == locale ? 0 : toInteger$1(locale);
	    locale =
	      null == options.weekStartsOn ? locale : toInteger$1(options.weekStartsOn);
	    if (!(0 <= locale && 6 >= locale))
	      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
	    options = toDate(dirtyDate);
	    var day = options.getUTCDay();
	    locale = (day < locale ? 7 : 0) + day - locale;
	    options.setUTCDate(options.getUTCDate() - locale);
	    options.setUTCHours(0, 0, 0, 0);
	    return options;
	  }
	  function getUTCWeekYear(dirtyDate, dirtyOptions) {
	    if (1 > arguments.length)
	      throw new TypeError(
	        "1 argument required, but only " + arguments.length + " present"
	      );
	    var date = toDate(dirtyDate, dirtyOptions),
	      year = date.getUTCFullYear(),
	      options = dirtyOptions || {},
	      locale = options.locale;
	    locale = locale && locale.options && locale.options.firstWeekContainsDate;
	    locale = null == locale ? 1 : toInteger$1(locale);
	    options =
	      null == options.firstWeekContainsDate
	        ? locale
	        : toInteger$1(options.firstWeekContainsDate);
	    if (!(1 <= options && 7 >= options))
	      throw new RangeError(
	        "firstWeekContainsDate must be between 1 and 7 inclusively"
	      );
	    locale = new Date(0);
	    locale.setUTCFullYear(year + 1, 0, options);
	    locale.setUTCHours(0, 0, 0, 0);
	    locale = startOfUTCWeek(locale, dirtyOptions);
	    var firstWeekOfThisYear = new Date(0);
	    firstWeekOfThisYear.setUTCFullYear(year, 0, options);
	    firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
	    options = startOfUTCWeek(firstWeekOfThisYear, dirtyOptions);
	    return date.getTime() >= locale.getTime()
	      ? year + 1
	      : date.getTime() >= options.getTime()
	      ? year
	      : year - 1;
	  }
	  function startOfUTCWeekYear(dirtyDate, dirtyOptions) {
	    if (1 > arguments.length)
	      throw new TypeError(
	        "1 argument required, but only " + arguments.length + " present"
	      );
	    var options = dirtyOptions || {},
	      locale = options.locale;
	    locale = locale && locale.options && locale.options.firstWeekContainsDate;
	    locale = null == locale ? 1 : toInteger$1(locale);
	    options =
	      null == options.firstWeekContainsDate
	        ? locale
	        : toInteger$1(options.firstWeekContainsDate);
	    locale = getUTCWeekYear(dirtyDate, dirtyOptions);
	    var firstWeek = new Date(0);
	    firstWeek.setUTCFullYear(locale, 0, options);
	    firstWeek.setUTCHours(0, 0, 0, 0);
	    return startOfUTCWeek(firstWeek, dirtyOptions);
	  }
	  function getUTCWeek(dirtyDate, options) {
	    if (1 > arguments.length)
	      throw new TypeError(
	        "1 argument required, but only " + arguments.length + " present"
	      );
	    var date = toDate(dirtyDate);
	    date =
	      startOfUTCWeek(date, options).getTime() -
	      startOfUTCWeekYear(date, options).getTime();
	    return Math.round(date / 6048e5) + 1;
	  }
	  function formatTimezoneShort(offset, dirtyDelimiter) {
	    var sign = 0 < offset ? "-" : "+",
	      absOffset = Math.abs(offset);
	    offset = Math.floor(absOffset / 60);
	    absOffset %= 60;
	    return 0 === absOffset
	      ? sign + String(offset)
	      : sign +
	          String(offset) +
	          (dirtyDelimiter || "") +
	          addLeadingZeros(absOffset, 2);
	  }
	  function formatTimezoneWithOptionalMinutes(offset, dirtyDelimiter) {
	    return 0 === offset % 60
	      ? (0 < offset ? "-" : "+") + addLeadingZeros(Math.abs(offset) / 60, 2)
	      : formatTimezone(offset, dirtyDelimiter);
	  }
	  function formatTimezone(offset, dirtyDelimiter) {
	    dirtyDelimiter = dirtyDelimiter || "";
	    var sign = 0 < offset ? "-" : "+",
	      absOffset = Math.abs(offset);
	    offset = addLeadingZeros(Math.floor(absOffset / 60), 2);
	    absOffset = addLeadingZeros(absOffset % 60, 2);
	    return sign + offset + dirtyDelimiter + absOffset;
	  }
	  function dateLongFormatter(pattern, formatLong) {
	    switch (pattern) {
	      case "P":
	        return formatLong.date({ width: "short" });
	      case "PP":
	        return formatLong.date({ width: "medium" });
	      case "PPP":
	        return formatLong.date({ width: "long" });
	      default:
	        return formatLong.date({ width: "full" });
	    }
	  }
	  function timeLongFormatter(pattern, formatLong) {
	    switch (pattern) {
	      case "p":
	        return formatLong.time({ width: "short" });
	      case "pp":
	        return formatLong.time({ width: "medium" });
	      case "ppp":
	        return formatLong.time({ width: "long" });
	      default:
	        return formatLong.time({ width: "full" });
	    }
	  }
	  function subMilliseconds(dirtyDate, dirtyAmount) {
	    if (2 > arguments.length)
	      throw new TypeError(
	        "2 arguments required, but only " + arguments.length + " present"
	      );
	    var amount = toInteger$1(dirtyAmount);
	    return addMilliseconds(dirtyDate, -amount);
	  }
	  function throwProtectedError(token) {
	    throw new RangeError(
	      "`options.awareOfUnicodeTokens` must be set to `true` to use `" +
	        token +
	        "` token; see: https://git.io/fxCyr"
	    );
	  }
	  function format(dirtyDate, dirtyFormatStr, dirtyOptions) {
	    if (2 > arguments.length)
	      throw new TypeError(
	        "2 arguments required, but only " + arguments.length + " present"
	      );
	    var formatStr = String(dirtyFormatStr),
	      options = dirtyOptions || {},
	      locale$$1 = options.locale || locale,
	      localeFirstWeekContainsDate =
	        locale$$1.options && locale$$1.options.firstWeekContainsDate;
	    localeFirstWeekContainsDate =
	      null == localeFirstWeekContainsDate
	        ? 1
	        : toInteger$1(localeFirstWeekContainsDate);
	    localeFirstWeekContainsDate =
	      null == options.firstWeekContainsDate
	        ? localeFirstWeekContainsDate
	        : toInteger$1(options.firstWeekContainsDate);
	    if (!(1 <= localeFirstWeekContainsDate && 7 >= localeFirstWeekContainsDate))
	      throw new RangeError(
	        "firstWeekContainsDate must be between 1 and 7 inclusively"
	      );
	    var localeWeekStartsOn =
	      locale$$1.options && locale$$1.options.weekStartsOn;
	    localeWeekStartsOn =
	      null == localeWeekStartsOn ? 0 : toInteger$1(localeWeekStartsOn);
	    localeWeekStartsOn =
	      null == options.weekStartsOn
	        ? localeWeekStartsOn
	        : toInteger$1(options.weekStartsOn);
	    if (!(0 <= localeWeekStartsOn && 6 >= localeWeekStartsOn))
	      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
	    if (!locale$$1.localize)
	      throw new RangeError("locale must contain localize property");
	    if (!locale$$1.formatLong)
	      throw new RangeError("locale must contain formatLong property");
	    var originalDate = toDate(dirtyDate);
	    if (!isValid(originalDate)) throw new RangeError("Invalid time value");
	    var timezoneOffset = getTimezoneOffsetInMilliseconds(originalDate),
	      utcDate = subMilliseconds(originalDate, timezoneOffset),
	      formatterOptions = {
	        firstWeekContainsDate: localeFirstWeekContainsDate,
	        weekStartsOn: localeWeekStartsOn,
	        locale: locale$$1,
	        _originalDate: originalDate
	      };
	    return formatStr
	      .match(longFormattingTokensRegExp)
	      .map(function(substring) {
	        var firstCharacter = substring[0];
	        return "p" === firstCharacter || "P" === firstCharacter
	          ? (0, longFormatters[firstCharacter])(
	              substring,
	              locale$$1.formatLong,
	              formatterOptions
	            )
	          : substring;
	      })
	      .join("")
	      .match(formattingTokensRegExp)
	      .map(function(substring) {
	        if ("''" === substring) return "'";
	        var firstCharacter = substring[0];
	        return "'" === firstCharacter
	          ? substring
	              .match(escapedStringRegExp)[1]
	              .replace(doubleQuoteRegExp, "'")
	          : (firstCharacter = formatters$1[firstCharacter])
	          ? (options.awareOfUnicodeTokens ||
	              -1 === protectedTokens.indexOf(substring) ||
	              throwProtectedError(substring),
	            firstCharacter(
	              utcDate,
	              substring,
	              locale$$1.localize,
	              formatterOptions
	            ))
	          : substring;
	      })
	      .join("");
	  }
	  function assign(target, dirtyObject) {
	    if (null == target)
	      throw new TypeError(
	        "assign requires that input parameter not be null or undefined"
	      );
	    dirtyObject = dirtyObject || {};
	    for (var property in dirtyObject)
	      dirtyObject.hasOwnProperty(property) &&
	        (target[property] = dirtyObject[property]);
	    return target;
	  }
	  function setUTCDay(dirtyDate, dirtyDay, dirtyOptions) {
	    if (2 > arguments.length)
	      throw new TypeError(
	        "2 arguments required, but only " + arguments.length + " present"
	      );
	    var options = dirtyOptions || {},
	      locale = options.locale;
	    locale = locale && locale.options && locale.options.weekStartsOn;
	    locale = null == locale ? 0 : toInteger$1(locale);
	    locale =
	      null == options.weekStartsOn ? locale : toInteger$1(options.weekStartsOn);
	    if (!(0 <= locale && 6 >= locale))
	      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
	    options = toDate(dirtyDate);
	    var day = toInteger$1(dirtyDay),
	      currentDay = options.getUTCDay();
	    locale = (((day % 7) + 7) % 7 < locale ? 7 : 0) + day - currentDay;
	    options.setUTCDate(options.getUTCDate() + locale);
	    return options;
	  }
	  function setUTCWeek(dirtyDate, dirtyWeek, options) {
	    if (2 > arguments.length)
	      throw new TypeError(
	        "2 arguments required, but only " + arguments.length + " present"
	      );
	    var date = toDate(dirtyDate),
	      week = toInteger$1(dirtyWeek);
	    week = getUTCWeek(date, options) - week;
	    date.setUTCDate(date.getUTCDate() - 7 * week);
	    return date;
	  }
	  function setUTCISODay(dirtyDate, dirtyDay) {
	    if (2 > arguments.length)
	      throw new TypeError(
	        "2 arguments required, but only " + arguments.length + " present"
	      );
	    var day = toInteger$1(dirtyDay);
	    0 === day % 7 && (day -= 7);
	    var date = toDate(dirtyDate),
	      currentDay = date.getUTCDay();
	    day = (1 > ((day % 7) + 7) % 7 ? 7 : 0) + day - currentDay;
	    date.setUTCDate(date.getUTCDate() + day);
	    return date;
	  }
	  function setUTCISOWeek(dirtyDate, dirtyISOWeek) {
	    if (2 > arguments.length)
	      throw new TypeError(
	        "2 arguments required, but only " + arguments.length + " present"
	      );
	    var date = toDate(dirtyDate),
	      isoWeek = toInteger$1(dirtyISOWeek);
	    isoWeek = getUTCISOWeek(date) - isoWeek;
	    date.setUTCDate(date.getUTCDate() - 7 * isoWeek);
	    return date;
	  }
	  function parseNumericPattern(pattern, string, valueCallback) {
	    pattern = string.match(pattern);
	    if (!pattern) return null;
	    var value = parseInt(pattern[0], 10);
	    return {
	      value: valueCallback ? valueCallback(value) : value,
	      rest: string.slice(pattern[0].length)
	    };
	  }
	  function parseTimezonePattern(pattern, string) {
	    pattern = string.match(pattern);
	    if (!pattern) return null;
	    if ("Z" === pattern[0]) return { value: 0, rest: string.slice(1) };
	    var sign = "+" === pattern[1] ? 1 : -1,
	      hours = pattern[2] ? parseInt(pattern[2], 10) : 0,
	      minutes = pattern[3] ? parseInt(pattern[3], 10) : 0,
	      seconds = pattern[5] ? parseInt(pattern[5], 10) : 0;
	    return {
	      value: sign * (36e5 * hours + 6e4 * minutes + 1e3 * seconds),
	      rest: string.slice(pattern[0].length)
	    };
	  }
	  function parseNDigits(n, string, valueCallback) {
	    switch (n) {
	      case 1:
	        return parseNumericPattern(
	          numericPatterns.singleDigit,
	          string,
	          valueCallback
	        );
	      case 2:
	        return parseNumericPattern(
	          numericPatterns.twoDigits,
	          string,
	          valueCallback
	        );
	      case 3:
	        return parseNumericPattern(
	          numericPatterns.threeDigits,
	          string,
	          valueCallback
	        );
	      case 4:
	        return parseNumericPattern(
	          numericPatterns.fourDigits,
	          string,
	          valueCallback
	        );
	      default:
	        return parseNumericPattern(
	          new RegExp("^\\d{1," + n + "}"),
	          string,
	          valueCallback
	        );
	    }
	  }
	  function parseNDigitsSigned(n, string, valueCallback) {
	    switch (n) {
	      case 1:
	        return parseNumericPattern(
	          numericPatterns.singleDigitSigned,
	          string,
	          valueCallback
	        );
	      case 2:
	        return parseNumericPattern(
	          numericPatterns.twoDigitsSigned,
	          string,
	          valueCallback
	        );
	      case 3:
	        return parseNumericPattern(
	          numericPatterns.threeDigitsSigned,
	          string,
	          valueCallback
	        );
	      case 4:
	        return parseNumericPattern(
	          numericPatterns.fourDigitsSigned,
	          string,
	          valueCallback
	        );
	      default:
	        return parseNumericPattern(
	          new RegExp("^-?\\d{1," + n + "}"),
	          string,
	          valueCallback
	        );
	    }
	  }
	  function dayPeriodEnumToHours(enumValue) {
	    switch (enumValue) {
	      case "morning":
	        return 4;
	      case "evening":
	        return 17;
	      case "pm":
	      case "noon":
	      case "afternoon":
	        return 12;
	      default:
	        return 0;
	    }
	  }
	  function normalizeTwoDigitYear(twoDigitYear, currentYear) {
	    var isCommonEra = 0 < currentYear;
	    currentYear = isCommonEra ? currentYear : 1 - currentYear;
	    50 >= currentYear
	      ? (twoDigitYear = twoDigitYear || 100)
	      : ((currentYear += 50),
	        (twoDigitYear =
	          twoDigitYear +
	          100 * Math.floor(currentYear / 100) -
	          (twoDigitYear >= currentYear % 100 ? 100 : 0)));
	    return isCommonEra ? twoDigitYear : 1 - twoDigitYear;
	  }
	  function parse(
	    dirtyDateString,
	    dirtyFormatString,
	    dirtyBaseDate,
	    dirtyOptions
	  ) {
	    if (3 > arguments.length)
	      throw new TypeError(
	        "3 arguments required, but only " + arguments.length + " present"
	      );
	    var dateString = String(dirtyDateString),
	      formatString = String(dirtyFormatString),
	      options = dirtyOptions || {},
	      locale$$1 = options.locale || locale;
	    if (!locale$$1.match)
	      throw new RangeError("locale must contain match property");
	    var localeFirstWeekContainsDate =
	      locale$$1.options && locale$$1.options.firstWeekContainsDate;
	    localeFirstWeekContainsDate =
	      null == localeFirstWeekContainsDate
	        ? 1
	        : toInteger$1(localeFirstWeekContainsDate);
	    localeFirstWeekContainsDate =
	      null == options.firstWeekContainsDate
	        ? localeFirstWeekContainsDate
	        : toInteger$1(options.firstWeekContainsDate);
	    if (!(1 <= localeFirstWeekContainsDate && 7 >= localeFirstWeekContainsDate))
	      throw new RangeError(
	        "firstWeekContainsDate must be between 1 and 7 inclusively"
	      );
	    var localeWeekStartsOn =
	      locale$$1.options && locale$$1.options.weekStartsOn;
	    localeWeekStartsOn =
	      null == localeWeekStartsOn ? 0 : toInteger$1(localeWeekStartsOn);
	    localeWeekStartsOn =
	      null == options.weekStartsOn
	        ? localeWeekStartsOn
	        : toInteger$1(options.weekStartsOn);
	    if (!(0 <= localeWeekStartsOn && 6 >= localeWeekStartsOn))
	      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
	    if ("" === formatString)
	      return "" === dateString ? toDate(dirtyBaseDate) : new Date(NaN);
	    localeFirstWeekContainsDate = {
	      firstWeekContainsDate: localeFirstWeekContainsDate,
	      weekStartsOn: localeWeekStartsOn,
	      locale: locale$$1
	    };
	    var setters = [{ priority: 10, set: dateToSystemTimezone, index: 0 }];
	    localeWeekStartsOn = formatString.match(formattingTokensRegExp$2);
	    for (
	      formatString = 0;
	      formatString < localeWeekStartsOn.length;
	      formatString++
	    ) {
	      var token = localeWeekStartsOn[formatString];
	      options.awareOfUnicodeTokens ||
	        -1 === protectedTokens.indexOf(token) ||
	        throwProtectedError(token);
	      var firstCharacter = token[0],
	        parser = parsers[firstCharacter];
	      if (parser) {
	        dateString = parser.parse(
	          dateString,
	          token,
	          locale$$1.match,
	          localeFirstWeekContainsDate
	        );
	        if (!dateString) return new Date(NaN);
	        setters.push({
	          priority: parser.priority,
	          set: parser.set,
	          validate: parser.validate,
	          value: dateString.value,
	          index: setters.length
	        });
	        dateString = dateString.rest;
	      } else if (
	        ("''" === token
	          ? (token = "'")
	          : "'" === firstCharacter &&
	            (token = token
	              .match(escapedStringRegExp$2)[1]
	              .replace(doubleQuoteRegExp$2, "'")),
	        0 === dateString.indexOf(token))
	      )
	        dateString = dateString.slice(token.length);
	      else return new Date(NaN);
	    }
	    if (0 < dateString.length && notWhitespaceRegExp.test(dateString))
	      return new Date(NaN);
	    options = setters
	      .map(function(setter) {
	        return setter.priority;
	      })
	      .sort(function(a, b) {
	        return b - a;
	      })
	      .filter(function(priority, index, array) {
	        return array.indexOf(priority) === index;
	      })
	      .map(function(priority) {
	        return setters
	          .filter(function(setter) {
	            return setter.priority === priority;
	          })
	          .reverse();
	      })
	      .map(function(setterArray) {
	        return setterArray[0];
	      });
	    locale$$1 = toDate(dirtyBaseDate);
	    if (isNaN(locale$$1)) return new Date(NaN);
	    locale$$1 = subMilliseconds(
	      locale$$1,
	      getTimezoneOffsetInMilliseconds(locale$$1)
	    );
	    dateString = {};
	    for (formatString = 0; formatString < options.length; formatString++) {
	      localeWeekStartsOn = options[formatString];
	      if (
	        localeWeekStartsOn.validate &&
	        !localeWeekStartsOn.validate(
	          locale$$1,
	          localeWeekStartsOn.value,
	          localeFirstWeekContainsDate
	        )
	      )
	        return new Date(NaN);
	      localeWeekStartsOn = localeWeekStartsOn.set(
	        locale$$1,
	        dateString,
	        localeWeekStartsOn.value,
	        localeFirstWeekContainsDate
	      );
	      localeWeekStartsOn[0]
	        ? ((locale$$1 = localeWeekStartsOn[0]),
	          assign(dateString, localeWeekStartsOn[1]))
	        : (locale$$1 = localeWeekStartsOn);
	    }
	    return locale$$1;
	  }
	  function dateToSystemTimezone(date, flags) {
	    if (flags.timestampIsSet) return date;
	    flags = new Date(0);
	    flags.setFullYear(
	      date.getUTCFullYear(),
	      date.getUTCMonth(),
	      date.getUTCDate()
	    );
	    flags.setHours(
	      date.getUTCHours(),
	      date.getUTCMinutes(),
	      date.getUTCSeconds(),
	      date.getUTCMilliseconds()
	    );
	    return flags;
	  }
	  function _objectSpread(target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = null != arguments[i] ? arguments[i] : {},
	        ownKeys = keys$3(source);
	      "function" === typeof getOwnPropertySymbols$1 &&
	        (ownKeys = ownKeys.concat(
	          getOwnPropertySymbols$1(source).filter(function(sym) {
	            return $Object.getOwnPropertyDescriptor(source, sym).enumerable;
	          })
	        ));
	      ownKeys.forEach(function(key) {
	        var value = source[key];
	        key in target
	          ? $Object$1.defineProperty(target, key, {
	              value: value,
	              enumerable: !0,
	              configurable: !0,
	              writable: !0
	            })
	          : (target[key] = value);
	      });
	    }
	    return target;
	  }
	  function InvalidCharacterError(message) {
	    this.message = message;
	  }
	  function polyfill(input) {
	    input = String(input).replace(/=+$/, "");
	    if (1 == input.length % 4)
	      throw new InvalidCharacterError(
	        "'atob' failed: The string to be decoded is not correctly encoded."
	      );
	    for (
	      var bc = 0, bs, buffer, idx = 0, output = "";
	      (buffer = input.charAt(idx++));
	      ~buffer && ((bs = bc % 4 ? 64 * bs + buffer : buffer), bc++ % 4)
	        ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
	        : 0
	    )
	      buffer = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(
	        buffer
	      );
	    return output;
	  }
	  function b64DecodeUnicode(str) {
	    return decodeURIComponent(
	      atob(str).replace(/(.)/g, function(m, p) {
	        m = p
	          .charCodeAt(0)
	          .toString(16)
	          .toUpperCase();
	        2 > m.length && (m = "0" + m);
	        return "%" + m;
	      })
	    );
	  }
	  function InvalidTokenError(message) {
	    this.message = message;
	  }
	  var splice = Array.prototype.splice;
	  ListCache.prototype.clear = function() {
	    this.__data__ = [];
	    this.size = 0;
	  };
	  ListCache.prototype["delete"] = function(key) {
	    var data = this.__data__;
	    key = _assocIndexOf(data, key);
	    if (0 > key) return !1;
	    key == data.length - 1 ? data.pop() : splice.call(data, key, 1);
	    --this.size;
	    return !0;
	  };
	  ListCache.prototype.get = function(key) {
	    var data = this.__data__;
	    key = _assocIndexOf(data, key);
	    return 0 > key ? void 0 : data[key][1];
	  };
	  ListCache.prototype.has = function(key) {
	    return -1 < _assocIndexOf(this.__data__, key);
	  };
	  ListCache.prototype.set = function(key, value) {
	    var data = this.__data__,
	      index = _assocIndexOf(data, key);
	    0 > index
	      ? (++this.size, data.push([key, value]))
	      : (data[index][1] = value);
	    return this;
	  };
	  var _ListCache = ListCache,
	    commonjsGlobal$1 =
	      "undefined" !== typeof window
	        ? window
	        : "undefined" !== typeof commonjsGlobal
	        ? commonjsGlobal
	        : "undefined" !== typeof self
	        ? self
	        : {},
	    _freeGlobal =
	      "object" == typeof commonjsGlobal$1 &&
	      commonjsGlobal$1 &&
	      commonjsGlobal$1.Object === Object &&
	      commonjsGlobal$1,
	    freeSelf =
	      "object" == typeof self && self && self.Object === Object && self,
	    _root = _freeGlobal || freeSelf || Function("return this")(),
	    _Symbol = _root.Symbol,
	    objectProto = Object.prototype,
	    hasOwnProperty = objectProto.hasOwnProperty,
	    nativeObjectToString = objectProto.toString,
	    symToStringTag = _Symbol ? _Symbol.toStringTag : void 0,
	    nativeObjectToString$1 = Object.prototype.toString,
	    symToStringTag$1 = _Symbol ? _Symbol.toStringTag : void 0,
	    _coreJsData = _root["__core-js_shared__"],
	    maskSrcKey = (function() {
	      var uid = /[^.]+$/.exec(
	        (_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO) || ""
	      );
	      return uid ? "Symbol(src)_1." + uid : "";
	    })(),
	    funcToString = Function.prototype.toString,
	    reIsHostCtor = /^\[object .+?Constructor\]$/,
	    reIsNative = RegExp(
	      "^" +
	        Function.prototype.toString
	          .call(Object.prototype.hasOwnProperty)
	          .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
	          .replace(
	            /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
	            "$1.*?"
	          ) +
	        "$"
	    ),
	    _Map = _getNative(_root, "Map"),
	    _nativeCreate = _getNative(Object, "create"),
	    hasOwnProperty$2 = Object.prototype.hasOwnProperty,
	    hasOwnProperty$3 = Object.prototype.hasOwnProperty;
	  Hash.prototype.clear = function() {
	    this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
	    this.size = 0;
	  };
	  Hash.prototype["delete"] = function(key) {
	    key = this.has(key) && delete this.__data__[key];
	    this.size -= key ? 1 : 0;
	    return key;
	  };
	  Hash.prototype.get = function(key) {
	    var data = this.__data__;
	    return _nativeCreate
	      ? ((key = data[key]), "__lodash_hash_undefined__" === key ? void 0 : key)
	      : hasOwnProperty$2.call(data, key)
	      ? data[key]
	      : void 0;
	  };
	  Hash.prototype.has = function(key) {
	    var data = this.__data__;
	    return _nativeCreate
	      ? void 0 !== data[key]
	      : hasOwnProperty$3.call(data, key);
	  };
	  Hash.prototype.set = function(key, value) {
	    var data = this.__data__;
	    this.size += this.has(key) ? 0 : 1;
	    data[key] =
	      _nativeCreate && void 0 === value ? "__lodash_hash_undefined__" : value;
	    return this;
	  };
	  MapCache.prototype.clear = function() {
	    this.size = 0;
	    this.__data__ = {
	      hash: new Hash(),
	      map: new (_Map || _ListCache)(),
	      string: new Hash()
	    };
	  };
	  MapCache.prototype["delete"] = function(key) {
	    key = _getMapData(this, key)["delete"](key);
	    this.size -= key ? 1 : 0;
	    return key;
	  };
	  MapCache.prototype.get = function(key) {
	    return _getMapData(this, key).get(key);
	  };
	  MapCache.prototype.has = function(key) {
	    return _getMapData(this, key).has(key);
	  };
	  MapCache.prototype.set = function(key, value) {
	    var data = _getMapData(this, key),
	      size = data.size;
	    data.set(key, value);
	    this.size += data.size == size ? 0 : 1;
	    return this;
	  };
	  var _MapCache = MapCache;
	  Stack.prototype.clear = function() {
	    this.__data__ = new _ListCache();
	    this.size = 0;
	  };
	  Stack.prototype["delete"] = function(key) {
	    var data = this.__data__;
	    key = data["delete"](key);
	    this.size = data.size;
	    return key;
	  };
	  Stack.prototype.get = function(key) {
	    return this.__data__.get(key);
	  };
	  Stack.prototype.has = function(key) {
	    return this.__data__.has(key);
	  };
	  Stack.prototype.set = function(key, value) {
	    var data = this.__data__;
	    if (data instanceof _ListCache) {
	      var pairs = data.__data__;
	      if (!_Map || 199 > pairs.length)
	        return pairs.push([key, value]), (this.size = ++data.size), this;
	      data = this.__data__ = new _MapCache(pairs);
	    }
	    data.set(key, value);
	    this.size = data.size;
	    return this;
	  };
	  var _Stack = Stack;
	  SetCache.prototype.add = SetCache.prototype.push = function(value) {
	    this.__data__.set(value, "__lodash_hash_undefined__");
	    return this;
	  };
	  SetCache.prototype.has = function(value) {
	    return this.__data__.has(value);
	  };
	  var _Uint8Array = _root.Uint8Array,
	    symbolProto = _Symbol ? _Symbol.prototype : void 0,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : void 0,
	    isArray_1 = Array.isArray,
	    propertyIsEnumerable = Object.prototype.propertyIsEnumerable,
	    nativeGetSymbols = Object.getOwnPropertySymbols,
	    _getSymbols = nativeGetSymbols
	      ? function(object) {
	          if (null == object) return [];
	          object = Object(object);
	          return _arrayFilter(nativeGetSymbols(object), function(symbol) {
	            return propertyIsEnumerable.call(object, symbol);
	          });
	        }
	      : stubArray_1,
	    objectProto$6 = Object.prototype,
	    hasOwnProperty$4 = objectProto$6.hasOwnProperty,
	    propertyIsEnumerable$1 = objectProto$6.propertyIsEnumerable,
	    isArguments_1 = _baseIsArguments(
	      (function() {
	        return arguments;
	      })()
	    )
	      ? _baseIsArguments
	      : function(value) {
	          return (
	            isObjectLike_1(value) &&
	            hasOwnProperty$4.call(value, "callee") &&
	            !propertyIsEnumerable$1.call(value, "callee")
	          );
	        },
	    isBuffer_1 = createCommonjsModule(function(module, exports) {
	      var freeModule =
	        (exports = exports && !exports.nodeType && exports) &&
	        module &&
	        !module.nodeType &&
	        module;
	      exports =
	        freeModule && freeModule.exports === exports ? _root.Buffer : void 0;
	      module.exports = (exports ? exports.isBuffer : void 0) || stubFalse_1;
	    }),
	    reIsUint = /^(?:0|[1-9]\d*)$/,
	    typedArrayTags = {};
	  typedArrayTags["[object Float32Array]"] = typedArrayTags[
	    "[object Float64Array]"
	  ] = typedArrayTags["[object Int8Array]"] = typedArrayTags[
	    "[object Int16Array]"
	  ] = typedArrayTags["[object Int32Array]"] = typedArrayTags[
	    "[object Uint8Array]"
	  ] = typedArrayTags["[object Uint8ClampedArray]"] = typedArrayTags[
	    "[object Uint16Array]"
	  ] = typedArrayTags["[object Uint32Array]"] = !0;
	  typedArrayTags["[object Arguments]"] = typedArrayTags[
	    "[object Array]"
	  ] = typedArrayTags["[object ArrayBuffer]"] = typedArrayTags[
	    "[object Boolean]"
	  ] = typedArrayTags["[object DataView]"] = typedArrayTags[
	    "[object Date]"
	  ] = typedArrayTags["[object Error]"] = typedArrayTags[
	    "[object Function]"
	  ] = typedArrayTags["[object Map]"] = typedArrayTags[
	    "[object Number]"
	  ] = typedArrayTags["[object Object]"] = typedArrayTags[
	    "[object RegExp]"
	  ] = typedArrayTags["[object Set]"] = typedArrayTags[
	    "[object String]"
	  ] = typedArrayTags["[object WeakMap]"] = !1;
	  var _nodeUtil = createCommonjsModule(function(module, exports) {
	      var freeExports = exports && !exports.nodeType && exports;
	      freeExports =
	        (exports = freeExports && module && !module.nodeType && module) &&
	        exports.exports === freeExports &&
	        _freeGlobal.process;
	      a: {
	        try {
	          var types =
	            exports && exports.require && exports.require("util").types;
	          if (types) {
	            var nodeUtil = types;
	            break a;
	          }
	          nodeUtil =
	            freeExports && freeExports.binding && freeExports.binding("util");
	          break a;
	        } catch (e) {}
	        nodeUtil = void 0;
	      }
	      module.exports = nodeUtil;
	    }),
	    nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray,
	    isTypedArray_1 = nodeIsTypedArray
	      ? _baseUnary(nodeIsTypedArray)
	      : _baseIsTypedArray,
	    hasOwnProperty$5 = Object.prototype.hasOwnProperty,
	    objectProto$8 = Object.prototype,
	    _nativeKeys = _overArg(Object.keys, Object),
	    hasOwnProperty$6 = Object.prototype.hasOwnProperty,
	    hasOwnProperty$7 = Object.prototype.hasOwnProperty,
	    _DataView = _getNative(_root, "DataView"),
	    _Promise = _getNative(_root, "Promise"),
	    _Set = _getNative(_root, "Set"),
	    _WeakMap = _getNative(_root, "WeakMap"),
	    dataViewCtorString = _toSource(_DataView),
	    mapCtorString = _toSource(_Map),
	    promiseCtorString = _toSource(_Promise),
	    setCtorString = _toSource(_Set),
	    weakMapCtorString = _toSource(_WeakMap),
	    getTag = _baseGetTag;
	  if (
	    (_DataView &&
	      "[object DataView]" != getTag(new _DataView(new ArrayBuffer(1)))) ||
	    (_Map && "[object Map]" != getTag(new _Map())) ||
	    (_Promise && "[object Promise]" != getTag(_Promise.resolve())) ||
	    (_Set && "[object Set]" != getTag(new _Set())) ||
	    (_WeakMap && "[object WeakMap]" != getTag(new _WeakMap()))
	  )
	    getTag = function(value) {
	      var result = _baseGetTag(value);
	      if (
	        (value = (value =
	          "[object Object]" == result ? value.constructor : void 0)
	          ? _toSource(value)
	          : "")
	      )
	        switch (value) {
	          case dataViewCtorString:
	            return "[object DataView]";
	          case mapCtorString:
	            return "[object Map]";
	          case promiseCtorString:
	            return "[object Promise]";
	          case setCtorString:
	            return "[object Set]";
	          case weakMapCtorString:
	            return "[object WeakMap]";
	        }
	      return result;
	    };
	  var _getTag = getTag,
	    hasOwnProperty$8 = Object.prototype.hasOwnProperty,
	    reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;
	  memoize.Cache = _MapCache;
	  var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
	    reEscapeChar = /\\(\\)?/g,
	    _stringToPath = (function(func) {
	      func = memoize(func, function(key) {
	        500 === cache.size && cache.clear();
	        return key;
	      });
	      var cache = func.cache;
	      return func;
	    })(function(string) {
	      var result = [];
	      46 === string.charCodeAt(0) && result.push("");
	      string.replace(rePropName, function(match, number, quote, subString) {
	        result.push(
	          quote ? subString.replace(reEscapeChar, "$1") : number || match
	        );
	      });
	      return result;
	    }),
	    INFINITY = 1 / 0,
	    symbolProto$1 = _Symbol ? _Symbol.prototype : void 0,
	    symbolToString = symbolProto$1 ? symbolProto$1.toString : void 0,
	    INFINITY$1 = 1 / 0,
	    NAN = 0 / 0,
	    reTrim = /^\s+|\s+$/g,
	    reIsBadHex = /^[-+]0x[0-9a-f]+$/i,
	    reIsBinary = /^0b[01]+$/i,
	    reIsOctal = /^0o[0-7]+$/i,
	    freeParseInt = parseInt,
	    INFINITY$2 = 1 / 0,
	    nativeMax = Math.max,
	    find_1 = (function(findIndexFunc) {
	      return function(collection, predicate, fromIndex) {
	        var iterable = Object(collection);
	        if (!isArrayLike_1(collection)) {
	          var iteratee = _baseIteratee(predicate);
	          collection = keys_1(collection);
	          predicate = function(key) {
	            return iteratee(iterable[key], key, iterable);
	          };
	        }
	        predicate = findIndexFunc(collection, predicate, fromIndex);
	        return -1 < predicate
	          ? iterable[iteratee ? collection[predicate] : predicate]
	          : void 0;
	      };
	    })(function(array, predicate, fromIndex) {
	      var length = null == array ? 0 : array.length;
	      if (!length) return -1;
	      if (null == fromIndex) fromIndex = 0;
	      else {
	        fromIndex
	          ? ((fromIndex = toNumber_1(fromIndex)),
	            (fromIndex =
	              fromIndex === INFINITY$2 || fromIndex === -INFINITY$2
	                ? 1.7976931348623157e308 * (0 > fromIndex ? -1 : 1)
	                : fromIndex === fromIndex
	                ? fromIndex
	                : 0))
	          : (fromIndex = 0 === fromIndex ? fromIndex : 0);
	        var remainder = fromIndex % 1;
	        fromIndex =
	          fromIndex === fromIndex
	            ? remainder
	              ? fromIndex - remainder
	              : fromIndex
	            : 0;
	      }
	      0 > fromIndex && (fromIndex = nativeMax(length + fromIndex, 0));
	      a: {
	        predicate = _baseIteratee(predicate);
	        length = array.length;
	        for (fromIndex += -1; ++fromIndex < length; )
	          if (predicate(array[fromIndex], fromIndex, array)) {
	            array = fromIndex;
	            break a;
	          }
	        array = -1;
	      }
	      return array;
	    }),
	    array$jscomp$0 = Object.freeze({
	      getDetailById: function(id, data, idFormat) {
	        var key = idFormat ? idFormat : "id",
	          targetId = Number(id);
	        return find_1(data, function(d) {
	          return targetId === d[key];
	        });
	      },
	      checkKeyInArray: function(key, array) {
	        for (var result, i = 0; i < array.length; i++) {
	          if (array[i] === key) {
	            result = array[i];
	            break;
	          }
	          result = !1;
	        }
	        return result;
	      },
	      checkKeyInOIA: function(key, array) {
	        for (var result, i = 0; i < array.length; i++) {
	          if (key in array[i]) {
	            result = array[i];
	            break;
	          }
	          result = !1;
	        }
	        return result;
	      },
	      checkValueInOIA: function(key, value, array) {
	        for (var result, i = 0; i < array.length; i++) {
	          if (array[i]["".concat(key)] === value) {
	            result = array[i];
	            break;
	          }
	          result = !1;
	        }
	        return result;
	      }
	    }),
	    _global = createCommonjsModule(function(module) {
	      module = module.exports =
	        "undefined" != typeof window && Math == Math
	          ? window
	          : "undefined" != typeof self && self.Math == Math
	          ? self
	          : Function("return this")();
	      "number" == typeof __g && (__g = module);
	    }),
	    _core = createCommonjsModule(function(module) {
	      module = module.exports = { version: "2.6.5" };
	      "number" == typeof __e && (__e = module);
	    }),
	    _descriptors = !_fails(function() {
	      return (
	        7 !=
	        Object.defineProperty({}, "a", {
	          get: function() {
	            return 7;
	          }
	        }).a
	      );
	    }),
	    document = _global.document,
	    is = _isObject(document) && _isObject(document.createElement),
	    _ie8DomDefine =
	      !_descriptors &&
	      !_fails(function() {
	        return (
	          7 !=
	          Object.defineProperty(is ? document.createElement("div") : {}, "a", {
	            get: function() {
	              return 7;
	            }
	          }).a
	        );
	      }),
	    dP = Object.defineProperty,
	    _objectDp = {
	      f: _descriptors
	        ? Object.defineProperty
	        : function(O, P, Attributes) {
	            _anObject(O);
	            P = _toPrimitive(P, !0);
	            _anObject(Attributes);
	            if (_ie8DomDefine)
	              try {
	                return dP(O, P, Attributes);
	              } catch (e) {}
	            if ("get" in Attributes || "set" in Attributes)
	              throw TypeError("Accessors not supported!");
	            "value" in Attributes && (O[P] = Attributes.value);
	            return O;
	          }
	    },
	    _hide = _descriptors
	      ? function(object, key, value) {
	          return _objectDp.f(object, key, _propertyDesc(1, value));
	        }
	      : function(object, key, value) {
	          object[key] = value;
	          return object;
	        },
	    hasOwnProperty$9 = {}.hasOwnProperty;
	  $export.F = 1;
	  $export.G = 2;
	  $export.S = 4;
	  $export.P = 8;
	  $export.B = 16;
	  $export.W = 32;
	  $export.U = 64;
	  $export.R = 128;
	  var _export = $export,
	    ltrim = /^[\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff][\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff]*/,
	    rtrim = /[\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff][\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff]*$/,
	    trim = (exporter.trim = function(string, TYPE) {
	      string = String(_defined(string));
	      TYPE & 1 && (string = string.replace(ltrim, ""));
	      TYPE & 2 && (string = string.replace(rtrim, ""));
	      return string;
	    }),
	    $parseInt = _global.parseInt,
	    $trim = exporter.trim,
	    hex = /^[-+]?0[xX]/,
	    _parseInt =
	      8 !==
	        $parseInt(
	          "\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff08"
	        ) ||
	      22 !==
	        $parseInt(
	          "\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff0x16"
	        )
	        ? function(str, radix) {
	            str = $trim(String(str), 3);
	            return $parseInt(str, radix >>> 0 || (hex.test(str) ? 16 : 10));
	          }
	        : $parseInt;
	  _export(_export.G + _export.F * (parseInt != _parseInt), {
	    parseInt: _parseInt
	  });
	  var _parseInt$2 = _core.parseInt,
	    type_1 = _curry1_1(function(val) {
	      return null === val
	        ? "Null"
	        : void 0 === val
	        ? "Undefined"
	        : Object.prototype.toString.call(val).slice(8, -1);
	    }),
	    _isArray =
	      Array.isArray ||
	      function(val) {
	        return (
	          null != val &&
	          0 <= val.length &&
	          "[object Array]" === Object.prototype.toString.call(val)
	        );
	      },
	    _isArrayLike_1 = _curry1_1(function(x) {
	      return _isArray(x)
	        ? !0
	        : x &&
	          "object" === typeof x &&
	          "[object String]" !== Object.prototype.toString.call(x)
	        ? 1 === x.nodeType
	          ? !!x.length
	          : 0 === x.length
	          ? !0
	          : 0 < x.length
	          ? x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1)
	          : !1
	        : !1;
	    }),
	    XWrap = (function() {
	      function XWrap(fn) {
	        this.f = fn;
	      }
	      XWrap.prototype["@@transducer/init"] = function() {
	        throw Error("init not implemented on XWrap");
	      };
	      XWrap.prototype["@@transducer/result"] = function(acc) {
	        return acc;
	      };
	      XWrap.prototype["@@transducer/step"] = function(acc, x) {
	        return this.f(acc, x);
	      };
	      return XWrap;
	    })(),
	    bind_1 = _curry2_1(function(fn, thisObj) {
	      return _arity_1(fn.length, function() {
	        return fn.apply(thisObj, arguments);
	      });
	    }),
	    symIterator =
	      "undefined" !== typeof Symbol ? Symbol.iterator : "@@iterator",
	    XMap = (function() {
	      function XMap(f, xf) {
	        this.xf = xf;
	        this.f = f;
	      }
	      XMap.prototype["@@transducer/init"] = JSCompiler_object_inline_init_226;
	      XMap.prototype[
	        "@@transducer/result"
	      ] = JSCompiler_object_inline_result_227;
	      XMap.prototype["@@transducer/step"] = function(result, input) {
	        return this.xf["@@transducer/step"](result, this.f(input));
	      };
	      return XMap;
	    })(),
	    _xmap_1 = _curry2_1(function(f, xf) {
	      return new XMap(f, xf);
	    }),
	    curryN_1 = _curry2_1(function(length, fn) {
	      return 1 === length
	        ? _curry1_1(fn)
	        : _arity_1(length, _curryN(length, [], fn));
	    }),
	    toString$1 = Object.prototype.toString,
	    _isArguments_1 = (function() {
	      return "[object Arguments]" === toString$1.call(arguments)
	        ? function(x) {
	            return "[object Arguments]" === toString$1.call(x);
	          }
	        : function(x) {
	            return Object.prototype.hasOwnProperty.call(x, "callee");
	          };
	    })(),
	    hasEnumBug = !{ toString: null }.propertyIsEnumerable("toString"),
	    nonEnumerableProps = "constructor valueOf isPrototypeOf toString propertyIsEnumerable hasOwnProperty toLocaleString".split(
	      " "
	    ),
	    hasArgsEnumBug = (function() {
	      return arguments.propertyIsEnumerable("length");
	    })(),
	    keys_1$1 =
	      "function" !== typeof Object.keys || hasArgsEnumBug
	        ? _curry1_1(function(obj) {
	            if (Object(obj) !== obj) return [];
	            var ks = [];
	            var nIdx = hasArgsEnumBug && _isArguments_1(obj);
	            for (prop in obj)
	              !Object.prototype.hasOwnProperty.call(obj, prop) ||
	                (nIdx && "length" === prop) ||
	                (ks[ks.length] = prop);
	            if (hasEnumBug)
	              for (nIdx = nonEnumerableProps.length - 1; 0 <= nIdx; ) {
	                var prop = nonEnumerableProps[nIdx];
	                var JSCompiler_temp;
	                if (
	                  (JSCompiler_temp = Object.prototype.hasOwnProperty.call(
	                    obj,
	                    prop
	                  ))
	                ) {
	                  a: {
	                    for (JSCompiler_temp = 0; JSCompiler_temp < ks.length; ) {
	                      if (ks[JSCompiler_temp] === prop) {
	                        JSCompiler_temp = !0;
	                        break a;
	                      }
	                      JSCompiler_temp += 1;
	                    }
	                    JSCompiler_temp = !1;
	                  }
	                  JSCompiler_temp = !JSCompiler_temp;
	                }
	                JSCompiler_temp && (ks[ks.length] = prop);
	                --nIdx;
	              }
	            return ks;
	          })
	        : _curry1_1(function(obj) {
	            return Object(obj) !== obj ? [] : Object.keys(obj);
	          }),
	    map_1 = _curry2_1(
	      (function(methodNames, xf, fn) {
	        return function() {
	          if (0 === arguments.length) return fn();
	          var args = Array.prototype.slice.call(arguments, 0),
	            obj = args.pop();
	          if (!_isArray(obj)) {
	            for (var idx = 0; idx < methodNames.length; ) {
	              if ("function" === typeof obj[methodNames[idx]])
	                return obj[methodNames[idx]].apply(obj, args);
	              idx += 1;
	            }
	            if (null != obj && "function" === typeof obj["@@transducer/step"])
	              return xf.apply(null, args)(obj);
	          }
	          return fn.apply(this, arguments);
	        };
	      })(["fantasy-land/map", "map"], _xmap_1, function(fn, functor) {
	        switch (Object.prototype.toString.call(functor)) {
	          case "[object Function]":
	            return curryN_1(functor.length, function() {
	              return fn.call(this, functor.apply(this, arguments));
	            });
	          case "[object Object]":
	            return _reduce_1(
	              function(acc, key) {
	                acc[key] = fn(functor[key]);
	                return acc;
	              },
	              {},
	              keys_1$1(functor)
	            );
	          default:
	            return _map_1(fn, functor);
	        }
	      })
	    ),
	    max_1 = _curry2_1(function(a, b) {
	      return b > a ? b : a;
	    }),
	    reduce_1 = (function(fn) {
	      return function f3(a, b, c) {
	        switch (arguments.length) {
	          case 0:
	            return f3;
	          case 1:
	            return _isPlaceholder_1(a)
	              ? f3
	              : _curry2_1(function(_b, _c) {
	                  return fn(a, _b, _c);
	                });
	          case 2:
	            return _isPlaceholder_1(a) && _isPlaceholder_1(b)
	              ? f3
	              : _isPlaceholder_1(a)
	              ? _curry2_1(function(_a, _c) {
	                  return fn(_a, b, _c);
	                })
	              : _isPlaceholder_1(b)
	              ? _curry2_1(function(_b, _c) {
	                  return fn(a, _b, _c);
	                })
	              : _curry1_1(function(_c) {
	                  return fn(a, b, _c);
	                });
	          default:
	            return _isPlaceholder_1(a) &&
	              _isPlaceholder_1(b) &&
	              _isPlaceholder_1(c)
	              ? f3
	              : _isPlaceholder_1(a) && _isPlaceholder_1(b)
	              ? _curry2_1(function(_a, _b) {
	                  return fn(_a, _b, c);
	                })
	              : _isPlaceholder_1(a) && _isPlaceholder_1(c)
	              ? _curry2_1(function(_a, _c) {
	                  return fn(_a, b, _c);
	                })
	              : _isPlaceholder_1(b) && _isPlaceholder_1(c)
	              ? _curry2_1(function(_b, _c) {
	                  return fn(a, _b, _c);
	                })
	              : _isPlaceholder_1(a)
	              ? _curry1_1(function(_a) {
	                  return fn(_a, b, c);
	                })
	              : _isPlaceholder_1(b)
	              ? _curry1_1(function(_b) {
	                  return fn(a, _b, c);
	                })
	              : _isPlaceholder_1(c)
	              ? _curry1_1(function(_c) {
	                  return fn(a, b, _c);
	                })
	              : fn(a, b, c);
	        }
	      };
	    })(_reduce_1),
	    cond_1 = _curry1_1(function(pairs) {
	      var arity = reduce_1(
	        max_1,
	        0,
	        map_1(function(pair) {
	          return pair[0].length;
	        }, pairs)
	      );
	      return _arity_1(arity, function() {
	        for (var idx = 0; idx < pairs.length; ) {
	          if (pairs[idx][0].apply(this, arguments))
	            return pairs[idx][1].apply(this, arguments);
	          idx += 1;
	        }
	      });
	    }),
	    moment = createCommonjsModule(function(module) {
	      (function(global, factory) {
	        module.exports = factory();
	      })(commonjsGlobal$1, function() {
	        function hooks() {
	          return hookCallback.apply(null, arguments);
	        }
	        function isArray(input) {
	          return (
	            input instanceof Array ||
	            "[object Array]" === Object.prototype.toString.call(input)
	          );
	        }
	        function isObject(input) {
	          return (
	            null != input &&
	            "[object Object]" === Object.prototype.toString.call(input)
	          );
	        }
	        function isUndefined(input) {
	          return void 0 === input;
	        }
	        function isNumber(input) {
	          return (
	            "number" === typeof input ||
	            "[object Number]" === Object.prototype.toString.call(input)
	          );
	        }
	        function isDate(input) {
	          return (
	            input instanceof Date ||
	            "[object Date]" === Object.prototype.toString.call(input)
	          );
	        }
	        function map(arr, fn) {
	          var res = [],
	            i;
	          for (i = 0; i < arr.length; ++i) res.push(fn(arr[i], i));
	          return res;
	        }
	        function hasOwnProp(a, b) {
	          return Object.prototype.hasOwnProperty.call(a, b);
	        }
	        function extend(a, b) {
	          for (var i in b) hasOwnProp(b, i) && (a[i] = b[i]);
	          hasOwnProp(b, "toString") && (a.toString = b.toString);
	          hasOwnProp(b, "valueOf") && (a.valueOf = b.valueOf);
	          return a;
	        }
	        function createUTC(input, format, locale, strict) {
	          return createLocalOrUTC(input, format, locale, strict, !0).utc();
	        }
	        function getParsingFlags(m) {
	          null == m._pf &&
	            (m._pf = {
	              empty: !1,
	              unusedTokens: [],
	              unusedInput: [],
	              overflow: -2,
	              charsLeftOver: 0,
	              nullInput: !1,
	              invalidMonth: null,
	              invalidFormat: !1,
	              userInvalidated: !1,
	              iso: !1,
	              parsedDateParts: [],
	              meridiem: null,
	              rfc2822: !1,
	              weekdayMismatch: !1
	            });
	          return m._pf;
	        }
	        function isValid(m) {
	          if (null == m._isValid) {
	            var flags = getParsingFlags(m),
	              parsedParts = some.call(flags.parsedDateParts, function(i) {
	                return null != i;
	              });
	            parsedParts =
	              !isNaN(m._d.getTime()) &&
	              0 > flags.overflow &&
	              !flags.empty &&
	              !flags.invalidMonth &&
	              !flags.invalidWeekday &&
	              !flags.weekdayMismatch &&
	              !flags.nullInput &&
	              !flags.invalidFormat &&
	              !flags.userInvalidated &&
	              (!flags.meridiem || (flags.meridiem && parsedParts));
	            m._strict &&
	              (parsedParts =
	                parsedParts &&
	                0 === flags.charsLeftOver &&
	                0 === flags.unusedTokens.length &&
	                void 0 === flags.bigHour);
	            if (null != Object.isFrozen && Object.isFrozen(m))
	              return parsedParts;
	            m._isValid = parsedParts;
	          }
	          return m._isValid;
	        }
	        function createInvalid(flags) {
	          var m = createUTC(NaN);
	          null != flags
	            ? extend(getParsingFlags(m), flags)
	            : (getParsingFlags(m).userInvalidated = !0);
	          return m;
	        }
	        function copyConfig(to, from) {
	          var i;
	          isUndefined(from._isAMomentObject) ||
	            (to._isAMomentObject = from._isAMomentObject);
	          isUndefined(from._i) || (to._i = from._i);
	          isUndefined(from._f) || (to._f = from._f);
	          isUndefined(from._l) || (to._l = from._l);
	          isUndefined(from._strict) || (to._strict = from._strict);
	          isUndefined(from._tzm) || (to._tzm = from._tzm);
	          isUndefined(from._isUTC) || (to._isUTC = from._isUTC);
	          isUndefined(from._offset) || (to._offset = from._offset);
	          isUndefined(from._pf) || (to._pf = getParsingFlags(from));
	          isUndefined(from._locale) || (to._locale = from._locale);
	          if (0 < momentProperties.length)
	            for (i = 0; i < momentProperties.length; i++) {
	              var prop = momentProperties[i];
	              var val = from[prop];
	              isUndefined(val) || (to[prop] = val);
	            }
	          return to;
	        }
	        function Moment(config) {
	          copyConfig(this, config);
	          this._d = new Date(null != config._d ? config._d.getTime() : NaN);
	          this.isValid() || (this._d = new Date(NaN));
	          !1 === updateInProgress &&
	            ((updateInProgress = !0),
	            hooks.updateOffset(this),
	            (updateInProgress = !1));
	        }
	        function isMoment(obj) {
	          return (
	            obj instanceof Moment ||
	            (null != obj && null != obj._isAMomentObject)
	          );
	        }
	        function absFloor(number) {
	          return 0 > number ? Math.ceil(number) || 0 : Math.floor(number);
	        }
	        function toInt(argumentForCoercion) {
	          argumentForCoercion = +argumentForCoercion;
	          var value = 0;
	          0 !== argumentForCoercion &&
	            isFinite(argumentForCoercion) &&
	            (value = absFloor(argumentForCoercion));
	          return value;
	        }
	        function compareArrays(array1, array2, dontConvert) {
	          var len = Math.min(array1.length, array2.length),
	            lengthDiff = Math.abs(array1.length - array2.length),
	            diffs = 0,
	            i;
	          for (i = 0; i < len; i++)
	            ((dontConvert && array1[i] !== array2[i]) ||
	              (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) &&
	              diffs++;
	          return diffs + lengthDiff;
	        }
	        function warn(msg) {
	          !1 === hooks.suppressDeprecationWarnings &&
	            "undefined" !== typeof console &&
	            console.warn &&
	            console.warn("Deprecation warning: " + msg);
	        }
	        function deprecate(msg, fn) {
	          var firstTime = !0;
	          return extend(function() {
	            null != hooks.deprecationHandler &&
	              hooks.deprecationHandler(null, msg);
	            if (firstTime) {
	              for (var args = [], arg, i = 0; i < arguments.length; i++) {
	                arg = "";
	                if ("object" === typeof arguments[i]) {
	                  arg += "\n[" + i + "] ";
	                  for (var key in arguments[0])
	                    arg += key + ": " + arguments[0][key] + ", ";
	                  arg = arg.slice(0, -2);
	                } else arg = arguments[i];
	                args.push(arg);
	              }
	              warn(
	                msg +
	                  "\nArguments: " +
	                  Array.prototype.slice.call(args).join("") +
	                  "\n" +
	                  Error().stack
	              );
	              firstTime = !1;
	            }
	            return fn.apply(this, arguments);
	          }, fn);
	        }
	        function deprecateSimple(name, msg) {
	          null != hooks.deprecationHandler &&
	            hooks.deprecationHandler(name, msg);
	          deprecations[name] || (warn(msg), (deprecations[name] = !0));
	        }
	        function isFunction(input) {
	          return (
	            input instanceof Function ||
	            "[object Function]" === Object.prototype.toString.call(input)
	          );
	        }
	        function mergeConfigs(parentConfig, childConfig) {
	          var res = extend({}, parentConfig),
	            prop;
	          for (prop in childConfig)
	            hasOwnProp(childConfig, prop) &&
	              (isObject(parentConfig[prop]) && isObject(childConfig[prop])
	                ? ((res[prop] = {}),
	                  extend(res[prop], parentConfig[prop]),
	                  extend(res[prop], childConfig[prop]))
	                : null != childConfig[prop]
	                ? (res[prop] = childConfig[prop])
	                : delete res[prop]);
	          for (prop in parentConfig)
	            hasOwnProp(parentConfig, prop) &&
	              !hasOwnProp(childConfig, prop) &&
	              isObject(parentConfig[prop]) &&
	              (res[prop] = extend({}, res[prop]));
	          return res;
	        }
	        function Locale(config) {
	          null != config && this.set(config);
	        }
	        function addUnitAlias(unit, shorthand) {
	          var lowerCase = unit.toLowerCase();
	          aliases[lowerCase] = aliases[lowerCase + "s"] = aliases[
	            shorthand
	          ] = unit;
	        }
	        function normalizeUnits(units) {
	          return "string" === typeof units
	            ? aliases[units] || aliases[units.toLowerCase()]
	            : void 0;
	        }
	        function normalizeObjectUnits(inputObject) {
	          var normalizedInput = {},
	            normalizedProp,
	            prop;
	          for (prop in inputObject)
	            hasOwnProp(inputObject, prop) &&
	              (normalizedProp = normalizeUnits(prop)) &&
	              (normalizedInput[normalizedProp] = inputObject[prop]);
	          return normalizedInput;
	        }
	        function getPrioritizedUnits(unitsObj) {
	          var units = [],
	            u;
	          for (u in unitsObj) units.push({ unit: u, priority: priorities[u] });
	          units.sort(function(a, b) {
	            return a.priority - b.priority;
	          });
	          return units;
	        }
	        function zeroFill(number, targetLength, forceSign) {
	          var absNumber = "" + Math.abs(number);
	          return (
	            (0 <= number ? (forceSign ? "+" : "") : "-") +
	            Math.pow(10, Math.max(0, targetLength - absNumber.length))
	              .toString()
	              .substr(1) +
	            absNumber
	          );
	        }
	        function addFormatToken(token, padded, ordinal, callback) {
	          var func = callback;
	          "string" === typeof callback &&
	            (func = function() {
	              return this[callback]();
	            });
	          token && (formatTokenFunctions[token] = func);
	          padded &&
	            (formatTokenFunctions[padded[0]] = function() {
	              return zeroFill(
	                func.apply(this, arguments),
	                padded[1],
	                padded[2]
	              );
	            });
	          ordinal &&
	            (formatTokenFunctions[ordinal] = function() {
	              return this.localeData().ordinal(
	                func.apply(this, arguments),
	                token
	              );
	            });
	        }
	        function removeFormattingTokens(input) {
	          return input.match(/\[[\s\S]/)
	            ? input.replace(/^\[|\]$/g, "")
	            : input.replace(/\\/g, "");
	        }
	        function makeFormatFunction(format) {
	          var array = format.match(formattingTokens),
	            length;
	          var i$jscomp$0 = 0;
	          for (length = array.length; i$jscomp$0 < length; i$jscomp$0++)
	            array[i$jscomp$0] = formatTokenFunctions[array[i$jscomp$0]]
	              ? formatTokenFunctions[array[i$jscomp$0]]
	              : removeFormattingTokens(array[i$jscomp$0]);
	          return function(mom) {
	            var output = "",
	              i;
	            for (i = 0; i < length; i++)
	              output += isFunction(array[i])
	                ? array[i].call(mom, format)
	                : array[i];
	            return output;
	          };
	        }
	        function formatMoment(m, format) {
	          if (!m.isValid()) return m.localeData().invalidDate();
	          format = expandFormat(format, m.localeData());
	          formatFunctions[format] =
	            formatFunctions[format] || makeFormatFunction(format);
	          return formatFunctions[format](m);
	        }
	        function expandFormat(format, locale) {
	          function replaceLongDateFormatTokens(input) {
	            return locale.longDateFormat(input) || input;
	          }
	          var i = 5;
	          for (
	            localFormattingTokens.lastIndex = 0;
	            0 <= i && localFormattingTokens.test(format);

	          )
	            (format = format.replace(
	              localFormattingTokens,
	              replaceLongDateFormatTokens
	            )),
	              (localFormattingTokens.lastIndex = 0),
	              --i;
	          return format;
	        }
	        function addRegexToken(token, regex, strictRegex) {
	          regexes[token] = isFunction(regex)
	            ? regex
	            : function(isStrict) {
	                return isStrict && strictRegex ? strictRegex : regex;
	              };
	        }
	        function getParseRegexForToken(token, config) {
	          return hasOwnProp(regexes, token)
	            ? regexes[token](config._strict, config._locale)
	            : new RegExp(unescapeFormat(token));
	        }
	        function unescapeFormat(s) {
	          return regexEscape(
	            s
	              .replace("\\", "")
	              .replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(
	                matched,
	                p1,
	                p2,
	                p3,
	                p4
	              ) {
	                return p1 || p2 || p3 || p4;
	              })
	          );
	        }
	        function regexEscape(s) {
	          return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
	        }
	        function addParseToken(token, callback) {
	          var i,
	            func = callback;
	          "string" === typeof token && (token = [token]);
	          isNumber(callback) &&
	            (func = function(input, array) {
	              array[callback] = toInt(input);
	            });
	          for (i = 0; i < token.length; i++) tokens$jscomp$0[token[i]] = func;
	        }
	        function addWeekParseToken(token$jscomp$0, callback) {
	          addParseToken(token$jscomp$0, function(input, array, config, token) {
	            config._w = config._w || {};
	            callback(input, config._w, config, token);
	          });
	        }
	        function isLeapYear(year) {
	          return (0 === year % 4 && 0 !== year % 100) || 0 === year % 400;
	        }
	        function makeGetSet(unit, keepTime) {
	          return function(value) {
	            return null != value
	              ? (set$1(this, unit, value),
	                hooks.updateOffset(this, keepTime),
	                this)
	              : get(this, unit);
	          };
	        }
	        function get(mom, unit) {
	          return mom.isValid()
	            ? mom._d["get" + (mom._isUTC ? "UTC" : "") + unit]()
	            : NaN;
	        }
	        function set$1(mom, unit, value) {
	          if (mom.isValid() && !isNaN(value))
	            if (
	              "FullYear" === unit &&
	              isLeapYear(mom.year()) &&
	              1 === mom.month() &&
	              29 === mom.date()
	            )
	              mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](
	                value,
	                mom.month(),
	                daysInMonth(value, mom.month())
	              );
	            else mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value);
	        }
	        function daysInMonth(year, month) {
	          if (isNaN(year) || isNaN(month)) return NaN;
	          var modMonth = ((month % 12) + 12) % 12;
	          return 1 === modMonth
	            ? isLeapYear(year + (month - modMonth) / 12)
	              ? 29
	              : 28
	            : 31 - ((modMonth % 7) % 2);
	        }
	        function setMonth(mom, value) {
	          if (!mom.isValid()) return mom;
	          if ("string" === typeof value)
	            if (/^\d+$/.test(value)) value = toInt(value);
	            else if (
	              ((value = mom.localeData().monthsParse(value)), !isNumber(value))
	            )
	              return mom;
	          var dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
	          mom._d["set" + (mom._isUTC ? "UTC" : "") + "Month"](
	            value,
	            dayOfMonth
	          );
	          return mom;
	        }
	        function getSetMonth(value) {
	          return null != value
	            ? (setMonth(this, value), hooks.updateOffset(this, !0), this)
	            : get(this, "Month");
	        }
	        function computeMonthsParse() {
	          function cmpLenRev(a, b) {
	            return b.length - a.length;
	          }
	          var shortPieces = [],
	            longPieces = [],
	            mixedPieces = [],
	            i;
	          for (i = 0; 12 > i; i++) {
	            var mom = createUTC([2e3, i]);
	            shortPieces.push(this.monthsShort(mom, ""));
	            longPieces.push(this.months(mom, ""));
	            mixedPieces.push(this.months(mom, ""));
	            mixedPieces.push(this.monthsShort(mom, ""));
	          }
	          shortPieces.sort(cmpLenRev);
	          longPieces.sort(cmpLenRev);
	          mixedPieces.sort(cmpLenRev);
	          for (i = 0; 12 > i; i++)
	            (shortPieces[i] = regexEscape(shortPieces[i])),
	              (longPieces[i] = regexEscape(longPieces[i]));
	          for (i = 0; 24 > i; i++) mixedPieces[i] = regexEscape(mixedPieces[i]);
	          this._monthsShortRegex = this._monthsRegex = new RegExp(
	            "^(" + mixedPieces.join("|") + ")",
	            "i"
	          );
	          this._monthsStrictRegex = new RegExp(
	            "^(" + longPieces.join("|") + ")",
	            "i"
	          );
	          this._monthsShortStrictRegex = new RegExp(
	            "^(" + shortPieces.join("|") + ")",
	            "i"
	          );
	        }
	        function createDate(y, m, d, h, M, s, ms) {
	          100 > y && 0 <= y
	            ? ((m = new Date(y + 400, m, d, h, M, s, ms)),
	              isFinite(m.getFullYear()) && m.setFullYear(y))
	            : (m = new Date(y, m, d, h, M, s, ms));
	          return m;
	        }
	        function createUTCDate(y) {
	          if (100 > y && 0 <= y) {
	            var date = Array.prototype.slice.call(arguments);
	            date[0] = y + 400;
	            date = new Date(Date.UTC.apply(null, date));
	            isFinite(date.getUTCFullYear()) && date.setUTCFullYear(y);
	          } else date = new Date(Date.UTC.apply(null, arguments));
	          return date;
	        }
	        function firstWeekOffset(year, dow, doy) {
	          doy = 7 + dow - doy;
	          return (
	            -((7 + createUTCDate(year, 0, doy).getUTCDay() - dow) % 7) + doy - 1
	          );
	        }
	        function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
	          weekday = (7 + weekday - dow) % 7;
	          dow = firstWeekOffset(year, dow, doy);
	          dow = 1 + 7 * (week - 1) + weekday + dow;
	          0 >= dow
	            ? ((week = year - 1), (year = (isLeapYear(week) ? 366 : 365) + dow))
	            : dow > (isLeapYear(year) ? 366 : 365)
	            ? ((week = year + 1), (year = dow - (isLeapYear(year) ? 366 : 365)))
	            : ((week = year), (year = dow));
	          return { year: week, dayOfYear: year };
	        }
	        function weekOfYear(mom, dow, doy) {
	          var weekOffset = firstWeekOffset(mom.year(), dow, doy);
	          weekOffset = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1;
	          1 > weekOffset
	            ? ((mom = mom.year() - 1),
	              (dow = weekOffset + weeksInYear(mom, dow, doy)))
	            : weekOffset > weeksInYear(mom.year(), dow, doy)
	            ? ((dow = weekOffset - weeksInYear(mom.year(), dow, doy)),
	              (mom = mom.year() + 1))
	            : ((mom = mom.year()), (dow = weekOffset));
	          return { week: dow, year: mom };
	        }
	        function weeksInYear(year, dow, doy) {
	          var weekOffset = firstWeekOffset(year, dow, doy);
	          dow = firstWeekOffset(year + 1, dow, doy);
	          return ((isLeapYear(year) ? 366 : 365) - weekOffset + dow) / 7;
	        }
	        function shiftWeekdays(ws, n) {
	          return ws.slice(n, 7).concat(ws.slice(0, n));
	        }
	        function handleStrictParse$1(weekdayName, format, strict) {
	          var i;
	          weekdayName = weekdayName.toLocaleLowerCase();
	          if (!this._weekdaysParse)
	            for (
	              this._weekdaysParse = [],
	                this._shortWeekdaysParse = [],
	                this._minWeekdaysParse = [],
	                i = 0;
	              7 > i;
	              ++i
	            ) {
	              var mom = createUTC([2e3, 1]).day(i);
	              this._minWeekdaysParse[i] = this.weekdaysMin(
	                mom,
	                ""
	              ).toLocaleLowerCase();
	              this._shortWeekdaysParse[i] = this.weekdaysShort(
	                mom,
	                ""
	              ).toLocaleLowerCase();
	              this._weekdaysParse[i] = this.weekdays(
	                mom,
	                ""
	              ).toLocaleLowerCase();
	            }
	          if (strict)
	            format =
	              "dddd" === format
	                ? indexOf.call(this._weekdaysParse, weekdayName)
	                : "ddd" === format
	                ? indexOf.call(this._shortWeekdaysParse, weekdayName)
	                : indexOf.call(this._minWeekdaysParse, weekdayName);
	          else if ("dddd" === format) {
	            format = indexOf.call(this._weekdaysParse, weekdayName);
	            if (-1 !== format) return format;
	            format = indexOf.call(this._shortWeekdaysParse, weekdayName);
	            if (-1 !== format) return format;
	            format = indexOf.call(this._minWeekdaysParse, weekdayName);
	          } else if ("ddd" === format) {
	            format = indexOf.call(this._shortWeekdaysParse, weekdayName);
	            if (-1 !== format) return format;
	            format = indexOf.call(this._weekdaysParse, weekdayName);
	            if (-1 !== format) return format;
	            format = indexOf.call(this._minWeekdaysParse, weekdayName);
	          } else {
	            format = indexOf.call(this._minWeekdaysParse, weekdayName);
	            if (-1 !== format) return format;
	            format = indexOf.call(this._weekdaysParse, weekdayName);
	            if (-1 !== format) return format;
	            format = indexOf.call(this._shortWeekdaysParse, weekdayName);
	          }
	          return -1 !== format ? format : null;
	        }
	        function computeWeekdaysParse() {
	          function cmpLenRev(a, b) {
	            return b.length - a.length;
	          }
	          var minPieces = [],
	            shortPieces = [],
	            longPieces = [],
	            mixedPieces = [],
	            i;
	          for (i = 0; 7 > i; i++) {
	            var mom = createUTC([2e3, 1]).day(i);
	            var minp = this.weekdaysMin(mom, "");
	            var shortp = this.weekdaysShort(mom, "");
	            mom = this.weekdays(mom, "");
	            minPieces.push(minp);
	            shortPieces.push(shortp);
	            longPieces.push(mom);
	            mixedPieces.push(minp);
	            mixedPieces.push(shortp);
	            mixedPieces.push(mom);
	          }
	          minPieces.sort(cmpLenRev);
	          shortPieces.sort(cmpLenRev);
	          longPieces.sort(cmpLenRev);
	          mixedPieces.sort(cmpLenRev);
	          for (i = 0; 7 > i; i++)
	            (shortPieces[i] = regexEscape(shortPieces[i])),
	              (longPieces[i] = regexEscape(longPieces[i])),
	              (mixedPieces[i] = regexEscape(mixedPieces[i]));
	          this._weekdaysMinRegex = this._weekdaysShortRegex = this._weekdaysRegex = new RegExp(
	            "^(" + mixedPieces.join("|") + ")",
	            "i"
	          );
	          this._weekdaysStrictRegex = new RegExp(
	            "^(" + longPieces.join("|") + ")",
	            "i"
	          );
	          this._weekdaysShortStrictRegex = new RegExp(
	            "^(" + shortPieces.join("|") + ")",
	            "i"
	          );
	          this._weekdaysMinStrictRegex = new RegExp(
	            "^(" + minPieces.join("|") + ")",
	            "i"
	          );
	        }
	        function hFormat() {
	          return this.hours() % 12 || 12;
	        }
	        function meridiem(token, lowercase) {
	          addFormatToken(token, 0, 0, function() {
	            return this.localeData().meridiem(
	              this.hours(),
	              this.minutes(),
	              lowercase
	            );
	          });
	        }
	        function matchMeridiem(isStrict, locale) {
	          return locale._meridiemParse;
	        }
	        function normalizeLocale(key) {
	          return key ? key.toLowerCase().replace("_", "-") : key;
	        }
	        function loadLocale(name) {
	          if (!locales[name] && module && module.exports)
	            try {
	              throw Error(
	                "Dynamic requires are not currently supported by rollup-plugin-commonjs"
	              );
	            } catch (e) {}
	          return locales[name];
	        }
	        function getSetGlobalLocale(key, values) {
	          key &&
	            ((values = isUndefined(values)
	              ? getLocale(key)
	              : defineLocale(key, values))
	              ? (globalLocale = values)
	              : "undefined" !== typeof console &&
	                console.warn &&
	                console.warn(
	                  "Locale " + key + " not found. Did you forget to load it?"
	                ));
	          return globalLocale._abbr;
	        }
	        function defineLocale(name, config) {
	          if (null !== config) {
	            var locale = baseConfig;
	            config.abbr = name;
	            if (null != locales[name])
	              deprecateSimple(
	                "defineLocaleOverride",
	                "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
	              ),
	                (locale = locales[name]._config);
	            else if (null != config.parentLocale)
	              if (null != locales[config.parentLocale])
	                locale = locales[config.parentLocale]._config;
	              else if (
	                ((locale = loadLocale(config.parentLocale)), null != locale)
	              )
	                locale = locale._config;
	              else
	                return (
	                  localeFamilies[config.parentLocale] ||
	                    (localeFamilies[config.parentLocale] = []),
	                  localeFamilies[config.parentLocale].push({
	                    name: name,
	                    config: config
	                  }),
	                  null
	                );
	            locales[name] = new Locale(mergeConfigs(locale, config));
	            localeFamilies[name] &&
	              localeFamilies[name].forEach(function(x) {
	                defineLocale(x.name, x.config);
	              });
	            getSetGlobalLocale(name);
	            return locales[name];
	          }
	          delete locales[name];
	          return null;
	        }
	        function getLocale(key) {
	          var locale;
	          key && key._locale && key._locale._abbr && (key = key._locale._abbr);
	          if (!key) return globalLocale;
	          if (!isArray(key)) {
	            if ((locale = loadLocale(key))) return locale;
	            key = [key];
	          }
	          a: {
	            locale = 0;
	            for (var j, next, locale$jscomp$0, split; locale < key.length; ) {
	              split = normalizeLocale(key[locale]).split("-");
	              j = split.length;
	              for (
	                next = (next = normalizeLocale(key[locale + 1]))
	                  ? next.split("-")
	                  : null;
	                0 < j;

	              ) {
	                if (
	                  (locale$jscomp$0 = loadLocale(split.slice(0, j).join("-")))
	                ) {
	                  key = locale$jscomp$0;
	                  break a;
	                }
	                if (
	                  next &&
	                  next.length >= j &&
	                  compareArrays(split, next, !0) >= j - 1
	                )
	                  break;
	                j--;
	              }
	              locale++;
	            }
	            key = globalLocale;
	          }
	          return key;
	        }
	        function checkOverflow(m) {
	          var overflow;
	          (overflow = m._a) &&
	            -2 === getParsingFlags(m).overflow &&
	            ((overflow =
	              0 > overflow[MONTH] || 11 < overflow[MONTH]
	                ? MONTH
	                : 1 > overflow[DATE] ||
	                  overflow[DATE] > daysInMonth(overflow[YEAR], overflow[MONTH])
	                ? DATE
	                : 0 > overflow[HOUR] ||
	                  24 < overflow[HOUR] ||
	                  (24 === overflow[HOUR] &&
	                    (0 !== overflow[MINUTE] ||
	                      0 !== overflow[SECOND] ||
	                      0 !== overflow[MILLISECOND]))
	                ? HOUR
	                : 0 > overflow[MINUTE] || 59 < overflow[MINUTE]
	                ? MINUTE
	                : 0 > overflow[SECOND] || 59 < overflow[SECOND]
	                ? SECOND
	                : 0 > overflow[MILLISECOND] || 999 < overflow[MILLISECOND]
	                ? MILLISECOND
	                : -1),
	            getParsingFlags(m)._overflowDayOfYear &&
	              (overflow < YEAR || overflow > DATE) &&
	              (overflow = DATE),
	            getParsingFlags(m)._overflowWeeks &&
	              -1 === overflow &&
	              (overflow = WEEK),
	            getParsingFlags(m)._overflowWeekday &&
	              -1 === overflow &&
	              (overflow = WEEKDAY),
	            (getParsingFlags(m).overflow = overflow));
	          return m;
	        }
	        function defaults(a, b, c) {
	          return null != a ? a : null != b ? b : c;
	        }
	        function configFromArray(config) {
	          var input = [];
	          if (!config._d) {
	            var currentDate = new Date(hooks.now());
	            currentDate = config._useUTC
	              ? [
	                  currentDate.getUTCFullYear(),
	                  currentDate.getUTCMonth(),
	                  currentDate.getUTCDate()
	                ]
	              : [
	                  currentDate.getFullYear(),
	                  currentDate.getMonth(),
	                  currentDate.getDate()
	                ];
	            if (
	              config._w &&
	              null == config._a[DATE] &&
	              null == config._a[MONTH]
	            ) {
	              var w = config._w;
	              if (null != w.GG || null != w.W || null != w.E) {
	                var dow = 1;
	                var doy = 4;
	                var weekYear = defaults(
	                  w.GG,
	                  config._a[YEAR],
	                  weekOfYear(createLocal(), 1, 4).year
	                );
	                var week = defaults(w.W, 1);
	                var weekday = defaults(w.E, 1);
	                if (1 > weekday || 7 < weekday) var i = !0;
	              } else if (
	                ((dow = config._locale._week.dow),
	                (doy = config._locale._week.doy),
	                (week = weekOfYear(createLocal(), dow, doy)),
	                (weekYear = defaults(w.gg, config._a[YEAR], week.year)),
	                (week = defaults(w.w, week.week)),
	                null != w.d)
	              ) {
	                if (((weekday = w.d), 0 > weekday || 6 < weekday)) i = !0;
	              } else if (null != w.e) {
	                if (((weekday = w.e + dow), 0 > w.e || 6 < w.e)) i = !0;
	              } else weekday = dow;
	              1 > week || week > weeksInYear(weekYear, dow, doy)
	                ? (getParsingFlags(config)._overflowWeeks = !0)
	                : null != i
	                ? (getParsingFlags(config)._overflowWeekday = !0)
	                : ((i = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy)),
	                  (config._a[YEAR] = i.year),
	                  (config._dayOfYear = i.dayOfYear));
	            }
	            if (null != config._dayOfYear) {
	              i = defaults(config._a[YEAR], currentDate[YEAR]);
	              if (
	                config._dayOfYear > (isLeapYear(i) ? 366 : 365) ||
	                0 === config._dayOfYear
	              )
	                getParsingFlags(config)._overflowDayOfYear = !0;
	              i = createUTCDate(i, 0, config._dayOfYear);
	              config._a[MONTH] = i.getUTCMonth();
	              config._a[DATE] = i.getUTCDate();
	            }
	            for (i = 0; 3 > i && null == config._a[i]; ++i)
	              config._a[i] = input[i] = currentDate[i];
	            for (; 7 > i; i++)
	              config._a[i] = input[i] =
	                null == config._a[i] ? (2 === i ? 1 : 0) : config._a[i];
	            24 === config._a[HOUR] &&
	              0 === config._a[MINUTE] &&
	              0 === config._a[SECOND] &&
	              0 === config._a[MILLISECOND] &&
	              ((config._nextDay = !0), (config._a[HOUR] = 0));
	            config._d = (config._useUTC ? createUTCDate : createDate).apply(
	              null,
	              input
	            );
	            input = config._useUTC ? config._d.getUTCDay() : config._d.getDay();
	            null != config._tzm &&
	              config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
	            config._nextDay && (config._a[HOUR] = 24);
	            config._w &&
	              "undefined" !== typeof config._w.d &&
	              config._w.d !== input &&
	              (getParsingFlags(config).weekdayMismatch = !0);
	          }
	        }
	        function configFromISO(config) {
	          var l;
	          var i = config._i;
	          var match = extendedIsoRegex.exec(i) || basicIsoRegex.exec(i);
	          if (match) {
	            getParsingFlags(config).iso = !0;
	            i = 0;
	            for (l = isoDates.length; i < l; i++)
	              if (isoDates[i][1].exec(match[1])) {
	                var dateFormat = isoDates[i][0];
	                var allowTime = !1 !== isoDates[i][2];
	                break;
	              }
	            if (null == dateFormat) config._isValid = !1;
	            else {
	              if (match[3]) {
	                i = 0;
	                for (l = isoTimes.length; i < l; i++)
	                  if (isoTimes[i][1].exec(match[3])) {
	                    var timeFormat = (match[2] || " ") + isoTimes[i][0];
	                    break;
	                  }
	                if (null == timeFormat) {
	                  config._isValid = !1;
	                  return;
	                }
	              }
	              if (allowTime || null == timeFormat) {
	                if (match[4])
	                  if (tzRegex.exec(match[4])) var tzFormat = "Z";
	                  else {
	                    config._isValid = !1;
	                    return;
	                  }
	                config._f = dateFormat + (timeFormat || "") + (tzFormat || "");
	                configFromStringAndFormat(config);
	              } else config._isValid = !1;
	            }
	          } else config._isValid = !1;
	        }
	        function configFromRFC2822(config) {
	          var match = rfc2822.exec(
	            config._i
	              .replace(/\([^)]*\)|[\n\t]/g, " ")
	              .replace(/(\s\s+)/g, " ")
	              .replace(/^\s\s*/, "")
	              .replace(/\s\s*$/, "")
	          );
	          if (match) {
	            var monthStr = match[3],
	              dayStr = match[2],
	              hourStr = match[5],
	              minuteStr = match[6],
	              secondStr = match[7],
	              year = parseInt(match[4], 10);
	            monthStr = [
	              49 >= year ? 2e3 + year : 999 >= year ? 1900 + year : year,
	              defaultLocaleMonthsShort.indexOf(monthStr),
	              parseInt(dayStr, 10),
	              parseInt(hourStr, 10),
	              parseInt(minuteStr, 10)
	            ];
	            secondStr && monthStr.push(parseInt(secondStr, 10));
	            a: {
	              if ((secondStr = match[1]))
	                if (
	                  ((secondStr = defaultLocaleWeekdaysShort.indexOf(secondStr)),
	                  (dayStr = new Date(
	                    monthStr[0],
	                    monthStr[1],
	                    monthStr[2]
	                  ).getDay()),
	                  secondStr !== dayStr)
	                ) {
	                  getParsingFlags(config).weekdayMismatch = !0;
	                  secondStr = config._isValid = !1;
	                  break a;
	                }
	              secondStr = !0;
	            }
	            secondStr &&
	              ((config._a = monthStr),
	              (secondStr = match[8])
	                ? (match = obsOffsets[secondStr])
	                : match[9]
	                ? (match = 0)
	                : ((match = parseInt(match[10], 10)),
	                  (secondStr = match % 100),
	                  (match = ((match - secondStr) / 100) * 60 + secondStr)),
	              (config._tzm = match),
	              (config._d = createUTCDate.apply(null, config._a)),
	              config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm),
	              (getParsingFlags(config).rfc2822 = !0));
	          } else config._isValid = !1;
	        }
	        function configFromString(config) {
	          var matched = aspNetJsonRegex.exec(config._i);
	          null !== matched
	            ? (config._d = new Date(+matched[1]))
	            : (configFromISO(config),
	              !1 === config._isValid &&
	                (delete config._isValid,
	                configFromRFC2822(config),
	                !1 === config._isValid &&
	                  (delete config._isValid,
	                  hooks.createFromInputFallback(config))));
	        }
	        function configFromStringAndFormat(config) {
	          if (config._f === hooks.ISO_8601) configFromISO(config);
	          else if (config._f === hooks.RFC_2822) configFromRFC2822(config);
	          else {
	            config._a = [];
	            getParsingFlags(config).empty = !0;
	            var string = "" + config._i,
	              i,
	              parsedInput,
	              stringLength = string.length,
	              totalParsedInputLength = 0;
	            var tokens =
	              expandFormat(config._f, config._locale).match(formattingTokens) ||
	              [];
	            for (i = 0; i < tokens.length; i++) {
	              var token = tokens[i];
	              if (
	                (parsedInput = (string.match(
	                  getParseRegexForToken(token, config)
	                ) || [])[0])
	              ) {
	                var skipped = string.substr(0, string.indexOf(parsedInput));
	                0 < skipped.length &&
	                  getParsingFlags(config).unusedInput.push(skipped);
	                string = string.slice(
	                  string.indexOf(parsedInput) + parsedInput.length
	                );
	                totalParsedInputLength += parsedInput.length;
	              }
	              if (formatTokenFunctions[token]) {
	                if (
	                  (parsedInput
	                    ? (getParsingFlags(config).empty = !1)
	                    : getParsingFlags(config).unusedTokens.push(token),
	                  (skipped = config),
	                  null != parsedInput && hasOwnProp(tokens$jscomp$0, token))
	                )
	                  tokens$jscomp$0[token](
	                    parsedInput,
	                    skipped._a,
	                    skipped,
	                    token
	                  );
	              } else
	                config._strict &&
	                  !parsedInput &&
	                  getParsingFlags(config).unusedTokens.push(token);
	            }
	            getParsingFlags(config).charsLeftOver =
	              stringLength - totalParsedInputLength;
	            0 < string.length &&
	              getParsingFlags(config).unusedInput.push(string);
	            12 >= config._a[HOUR] &&
	              !0 === getParsingFlags(config).bigHour &&
	              0 < config._a[HOUR] &&
	              (getParsingFlags(config).bigHour = void 0);
	            getParsingFlags(config).parsedDateParts = config._a.slice(0);
	            getParsingFlags(config).meridiem = config._meridiem;
	            string = config._a;
	            i = HOUR;
	            stringLength = config._locale;
	            tokens = config._a[HOUR];
	            totalParsedInputLength = config._meridiem;
	            null != totalParsedInputLength &&
	              (null != stringLength.meridiemHour
	                ? (tokens = stringLength.meridiemHour(
	                    tokens,
	                    totalParsedInputLength
	                  ))
	                : null != stringLength.isPM &&
	                  ((stringLength = stringLength.isPM(totalParsedInputLength)) &&
	                    12 > tokens &&
	                    (tokens += 12),
	                  stringLength || 12 !== tokens || (tokens = 0)));
	            string[i] = tokens;
	            configFromArray(config);
	            checkOverflow(config);
	          }
	        }
	        function configFromObject(config) {
	          if (!config._d) {
	            var i = normalizeObjectUnits(config._i);
	            config._a = map(
	              [
	                i.year,
	                i.month,
	                i.day || i.date,
	                i.hour,
	                i.minute,
	                i.second,
	                i.millisecond
	              ],
	              function(obj) {
	                return obj && parseInt(obj, 10);
	              }
	            );
	            configFromArray(config);
	          }
	        }
	        function prepareConfig(config) {
	          var input = config._i,
	            format = config._f;
	          config._locale = config._locale || getLocale(config._l);
	          if (null === input || (void 0 === format && "" === input))
	            return createInvalid({ nullInput: !0 });
	          "string" === typeof input &&
	            (config._i = input = config._locale.preparse(input));
	          if (isMoment(input)) return new Moment(checkOverflow(input));
	          if (isDate(input)) config._d = input;
	          else if (isArray(format))
	            if (0 === config._f.length)
	              (getParsingFlags(config).invalidFormat = !0),
	                (config._d = new Date(NaN));
	            else {
	              for (input = 0; input < config._f.length; input++) {
	                format = 0;
	                var tempConfig = copyConfig({}, config);
	                null != config._useUTC && (tempConfig._useUTC = config._useUTC);
	                tempConfig._f = config._f[input];
	                configFromStringAndFormat(tempConfig);
	                if (
	                  isValid(tempConfig) &&
	                  ((format += getParsingFlags(tempConfig).charsLeftOver),
	                  (format +=
	                    10 * getParsingFlags(tempConfig).unusedTokens.length),
	                  (getParsingFlags(tempConfig).score = format),
	                  null == scoreToBeat || format < scoreToBeat)
	                ) {
	                  var scoreToBeat = format;
	                  var bestMoment = tempConfig;
	                }
	              }
	              extend(config, bestMoment || tempConfig);
	            }
	          else
	            format
	              ? configFromStringAndFormat(config)
	              : configFromInput(config);
	          isValid(config) || (config._d = null);
	          return config;
	        }
	        function configFromInput(config) {
	          var input = config._i;
	          isUndefined(input)
	            ? (config._d = new Date(hooks.now()))
	            : isDate(input)
	            ? (config._d = new Date(input.valueOf()))
	            : "string" === typeof input
	            ? configFromString(config)
	            : isArray(input)
	            ? ((config._a = map(input.slice(0), function(obj) {
	                return parseInt(obj, 10);
	              })),
	              configFromArray(config))
	            : isObject(input)
	            ? configFromObject(config)
	            : isNumber(input)
	            ? (config._d = new Date(input))
	            : hooks.createFromInputFallback(config);
	        }
	        function createLocalOrUTC(input, format, locale, strict, isUTC) {
	          var c = {};
	          if (!0 === locale || !1 === locale)
	            (strict = locale), (locale = void 0);
	          var JSCompiler_temp;
	          if ((JSCompiler_temp = isObject(input)))
	            a: if (((JSCompiler_temp = input), Object.getOwnPropertyNames))
	              JSCompiler_temp =
	                0 === Object.getOwnPropertyNames(JSCompiler_temp).length;
	            else {
	              for (var k in JSCompiler_temp)
	                if (JSCompiler_temp.hasOwnProperty(k)) {
	                  JSCompiler_temp = !1;
	                  break a;
	                }
	              JSCompiler_temp = !0;
	            }
	          if (JSCompiler_temp || (isArray(input) && 0 === input.length))
	            input = void 0;
	          c._isAMomentObject = !0;
	          c._useUTC = c._isUTC = isUTC;
	          c._l = locale;
	          c._i = input;
	          c._f = format;
	          c._strict = strict;
	          input = new Moment(checkOverflow(prepareConfig(c)));
	          input._nextDay && (input.add(1, "d"), (input._nextDay = void 0));
	          return input;
	        }
	        function createLocal(input, format, locale, strict) {
	          return createLocalOrUTC(input, format, locale, strict, !1);
	        }
	        function pickBy(fn, moments) {
	          var i;
	          1 === moments.length && isArray(moments[0]) && (moments = moments[0]);
	          if (!moments.length) return createLocal();
	          var res = moments[0];
	          for (i = 1; i < moments.length; ++i)
	            if (!moments[i].isValid() || moments[i][fn](res)) res = moments[i];
	          return res;
	        }
	        function Duration(duration) {
	          var normalizedInput = normalizeObjectUnits(duration);
	          duration = normalizedInput.year || 0;
	          var quarters = normalizedInput.quarter || 0,
	            months = normalizedInput.month || 0,
	            weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
	            days = normalizedInput.day || 0,
	            hours = normalizedInput.hour || 0,
	            minutes = normalizedInput.minute || 0,
	            seconds = normalizedInput.second || 0,
	            milliseconds = normalizedInput.millisecond || 0;
	          a: {
	            for (var key in normalizedInput)
	              if (
	                -1 === indexOf.call(ordering, key) ||
	                (null != normalizedInput[key] && isNaN(normalizedInput[key]))
	              ) {
	                normalizedInput = !1;
	                break a;
	              }
	            key = !1;
	            for (var i = 0; i < ordering.length; ++i)
	              if (normalizedInput[ordering[i]]) {
	                if (key) {
	                  normalizedInput = !1;
	                  break a;
	                }
	                parseFloat(normalizedInput[ordering[i]]) !==
	                  toInt(normalizedInput[ordering[i]]) && (key = !0);
	              }
	            normalizedInput = !0;
	          }
	          this._isValid = normalizedInput;
	          this._milliseconds =
	            +milliseconds + 1e3 * seconds + 6e4 * minutes + 36e5 * hours;
	          this._days = +days + 7 * weeks;
	          this._months = +months + 3 * quarters + 12 * duration;
	          this._data = {};
	          this._locale = getLocale();
	          this._bubble();
	        }
	        function isDuration(obj) {
	          return obj instanceof Duration;
	        }
	        function absRound(number) {
	          return 0 > number ? -1 * Math.round(-1 * number) : Math.round(number);
	        }
	        function offset$jscomp$0(token, separator) {
	          addFormatToken(token, 0, 0, function() {
	            var offset = this.utcOffset(),
	              sign = "+";
	            0 > offset && ((offset = -offset), (sign = "-"));
	            return (
	              sign +
	              zeroFill(~~(offset / 60), 2) +
	              separator +
	              zeroFill(~~offset % 60, 2)
	            );
	          });
	        }
	        function offsetFromString(matcher, string) {
	          matcher = (string || "").match(matcher);
	          if (null === matcher) return null;
	          matcher = ((matcher[matcher.length - 1] || []) + "").match(
	            chunkOffset
	          ) || ["-", 0, 0];
	          string = +(60 * matcher[1]) + toInt(matcher[2]);
	          return 0 === string ? 0 : "+" === matcher[0] ? string : -string;
	        }
	        function cloneWithOffset(input, model) {
	          return model._isUTC
	            ? ((model = model.clone()),
	              (input =
	                (isMoment(input) || isDate(input)
	                  ? input.valueOf()
	                  : createLocal(input).valueOf()) - model.valueOf()),
	              model._d.setTime(model._d.valueOf() + input),
	              hooks.updateOffset(model, !1),
	              model)
	            : createLocal(input).local();
	        }
	        function isUtc() {
	          return this.isValid() ? this._isUTC && 0 === this._offset : !1;
	        }
	        function createDuration(input, key) {
	          var duration = input;
	          isDuration(input)
	            ? (duration = {
	                ms: input._milliseconds,
	                d: input._days,
	                M: input._months
	              })
	            : isNumber(input)
	            ? ((duration = {}),
	              key ? (duration[key] = input) : (duration.milliseconds = input))
	            : (key = aspNetRegex.exec(input))
	            ? ((duration = "-" === key[1] ? -1 : 1),
	              (duration = {
	                y: 0,
	                d: toInt(key[DATE]) * duration,
	                h: toInt(key[HOUR]) * duration,
	                m: toInt(key[MINUTE]) * duration,
	                s: toInt(key[SECOND]) * duration,
	                ms: toInt(absRound(1e3 * key[MILLISECOND])) * duration
	              }))
	            : (key = isoRegex.exec(input))
	            ? ((duration = "-" === key[1] ? -1 : 1),
	              (duration = {
	                y: parseIso(key[2], duration),
	                M: parseIso(key[3], duration),
	                w: parseIso(key[4], duration),
	                d: parseIso(key[5], duration),
	                h: parseIso(key[6], duration),
	                m: parseIso(key[7], duration),
	                s: parseIso(key[8], duration)
	              }))
	            : null == duration
	            ? (duration = {})
	            : "object" === typeof duration &&
	              ("from" in duration || "to" in duration) &&
	              ((key = createLocal(duration.from)),
	              (duration = createLocal(duration.to)),
	              key.isValid() && duration.isValid()
	                ? ((duration = cloneWithOffset(duration, key)),
	                  key.isBefore(duration)
	                    ? (duration = positiveMomentsDifference(key, duration))
	                    : ((duration = positiveMomentsDifference(duration, key)),
	                      (duration.milliseconds = -duration.milliseconds),
	                      (duration.months = -duration.months)),
	                  (key = duration))
	                : (key = { milliseconds: 0, months: 0 }),
	              (duration = {}),
	              (duration.ms = key.milliseconds),
	              (duration.M = key.months));
	          duration = new Duration(duration);
	          isDuration(input) &&
	            hasOwnProp(input, "_locale") &&
	            (duration._locale = input._locale);
	          return duration;
	        }
	        function parseIso(inp, sign) {
	          inp = inp && parseFloat(inp.replace(",", "."));
	          return (isNaN(inp) ? 0 : inp) * sign;
	        }
	        function positiveMomentsDifference(base, other) {
	          var res = {};
	          res.months =
	            other.month() - base.month() + 12 * (other.year() - base.year());
	          base
	            .clone()
	            .add(res.months, "M")
	            .isAfter(other) && --res.months;
	          res.milliseconds = +other - +base.clone().add(res.months, "M");
	          return res;
	        }
	        function createAdder(direction, name) {
	          return function(val, period) {
	            if (null !== period && !isNaN(+period)) {
	              deprecateSimple(
	                name,
	                "moment()." +
	                  name +
	                  "(period, number) is deprecated. Please use moment()." +
	                  name +
	                  "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
	              );
	              var tmp = val;
	              val = period;
	              period = tmp;
	            }
	            val = createDuration("string" === typeof val ? +val : val, period);
	            addSubtract(this, val, direction);
	            return this;
	          };
	        }
	        function addSubtract(mom, duration, isAdding, updateOffset) {
	          var milliseconds = duration._milliseconds,
	            days = absRound(duration._days);
	          duration = absRound(duration._months);
	          mom.isValid() &&
	            ((updateOffset = null == updateOffset ? !0 : updateOffset),
	            duration && setMonth(mom, get(mom, "Month") + duration * isAdding),
	            days && set$1(mom, "Date", get(mom, "Date") + days * isAdding),
	            milliseconds &&
	              mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding),
	            updateOffset && hooks.updateOffset(mom, days || duration));
	        }
	        function monthDiff(a, b) {
	          var wholeMonthDiff =
	              12 * (b.year() - a.year()) + (b.month() - a.month()),
	            anchor = a.clone().add(wholeMonthDiff, "months");
	          0 > b - anchor
	            ? ((a = a.clone().add(wholeMonthDiff - 1, "months")),
	              (b = (b - anchor) / (anchor - a)))
	            : ((a = a.clone().add(wholeMonthDiff + 1, "months")),
	              (b = (b - anchor) / (a - anchor)));
	          return -(wholeMonthDiff + b) || 0;
	        }
	        function locale$jscomp$1(key) {
	          if (void 0 === key) return this._locale._abbr;
	          key = getLocale(key);
	          null != key && (this._locale = key);
	          return this;
	        }
	        function localeData() {
	          return this._locale;
	        }
	        function mod$1(dividend, divisor) {
	          return ((dividend % divisor) + divisor) % divisor;
	        }
	        function localStartOfDate(y, m, d) {
	          return 100 > y && 0 <= y
	            ? new Date(y + 400, m, d) - 126227808e5
	            : new Date(y, m, d).valueOf();
	        }
	        function utcStartOfDate(y, m, d) {
	          return 100 > y && 0 <= y
	            ? Date.UTC(y + 400, m, d) - 126227808e5
	            : Date.UTC(y, m, d);
	        }
	        function addWeekYearFormatToken(token, getter) {
	          addFormatToken(0, [token, token.length], 0, getter);
	        }
	        function getSetWeekYearHelper(input, week, weekday, dow, doy) {
	          if (null == input) return weekOfYear(this, dow, doy).year;
	          var weeksTarget = weeksInYear(input, dow, doy);
	          week > weeksTarget && (week = weeksTarget);
	          input = dayOfYearFromWeeks(input, week, weekday, dow, doy);
	          input = createUTCDate(input.year, 0, input.dayOfYear);
	          this.year(input.getUTCFullYear());
	          this.month(input.getUTCMonth());
	          this.date(input.getUTCDate());
	          return this;
	        }
	        function parseMs(input, array) {
	          array[MILLISECOND] = toInt(1e3 * ("0." + input));
	        }
	        function preParsePostFormat(string) {
	          return string;
	        }
	        function get$1(format, index, field, setter) {
	          var locale = getLocale();
	          index = createUTC().set(setter, index);
	          return locale[field](index, format);
	        }
	        function listMonthsImpl(format, index, field) {
	          isNumber(format) && ((index = format), (format = void 0));
	          format = format || "";
	          if (null != index) return get$1(format, index, field, "month");
	          var out = [];
	          for (index = 0; 12 > index; index++)
	            out[index] = get$1(format, index, field, "month");
	          return out;
	        }
	        function listWeekdaysImpl(localeSorted, format, index, field) {
	          "boolean" !== typeof localeSorted &&
	            ((index = format = localeSorted), (localeSorted = !1));
	          isNumber(format) && ((index = format), (format = void 0));
	          format = format || "";
	          var locale = getLocale();
	          localeSorted = localeSorted ? locale._week.dow : 0;
	          if (null != index)
	            return get$1(format, (index + localeSorted) % 7, field, "day");
	          locale = [];
	          for (index = 0; 7 > index; index++)
	            locale[index] = get$1(
	              format,
	              (index + localeSorted) % 7,
	              field,
	              "day"
	            );
	          return locale;
	        }
	        function addSubtract$1(duration, input, value, direction) {
	          input = createDuration(input, value);
	          duration._milliseconds += direction * input._milliseconds;
	          duration._days += direction * input._days;
	          duration._months += direction * input._months;
	          return duration._bubble();
	        }
	        function absCeil(number) {
	          return 0 > number ? Math.floor(number) : Math.ceil(number);
	        }
	        function makeAs(alias) {
	          return function() {
	            return this.as(alias);
	          };
	        }
	        function makeGetter(name) {
	          return function() {
	            return this.isValid() ? this._data[name] : NaN;
	          };
	        }
	        function substituteTimeAgo(
	          string,
	          number,
	          withoutSuffix,
	          isFuture,
	          locale
	        ) {
	          return locale.relativeTime(
	            number || 1,
	            !!withoutSuffix,
	            string,
	            isFuture
	          );
	        }
	        function sign$jscomp$0(x) {
	          return (0 < x) - (0 > x) || +x;
	        }
	        function toISOString$1() {
	          if (!this.isValid()) return this.localeData().invalidDate();
	          var seconds = abs$1(this._milliseconds) / 1e3,
	            days = abs$1(this._days),
	            months = abs$1(this._months);
	          var minutes = absFloor(seconds / 60);
	          var hours = absFloor(minutes / 60);
	          seconds %= 60;
	          minutes %= 60;
	          var Y = absFloor(months / 12);
	          months %= 12;
	          seconds = seconds ? seconds.toFixed(3).replace(/\.?0+$/, "") : "";
	          var total = this.asSeconds();
	          if (!total) return "P0D";
	          var totalSign = 0 > total ? "-" : "",
	            ymSign =
	              sign$jscomp$0(this._months) !== sign$jscomp$0(total) ? "-" : "",
	            daysSign =
	              sign$jscomp$0(this._days) !== sign$jscomp$0(total) ? "-" : "";
	          total =
	            sign$jscomp$0(this._milliseconds) !== sign$jscomp$0(total)
	              ? "-"
	              : "";
	          return (
	            totalSign +
	            "P" +
	            (Y ? ymSign + Y + "Y" : "") +
	            (months ? ymSign + months + "M" : "") +
	            (days ? daysSign + days + "D" : "") +
	            (hours || minutes || seconds ? "T" : "") +
	            (hours ? total + hours + "H" : "") +
	            (minutes ? total + minutes + "M" : "") +
	            (seconds ? total + seconds + "S" : "")
	          );
	        }
	        var some = Array.prototype.some
	          ? Array.prototype.some
	          : function(fun) {
	              for (
	                var t = Object(this), len = t.length >>> 0, i = 0;
	                i < len;
	                i++
	              )
	                if (i in t && fun.call(this, t[i], i, t)) return !0;
	              return !1;
	            };
	        var momentProperties = (hooks.momentProperties = []),
	          updateInProgress = !1,
	          deprecations = {};
	        hooks.suppressDeprecationWarnings = !1;
	        hooks.deprecationHandler = null;
	        var keys = Object.keys
	          ? Object.keys
	          : function(obj) {
	              var i,
	                res = [];
	              for (i in obj) hasOwnProp(obj, i) && res.push(i);
	              return res;
	            };
	        var aliases = {},
	          priorities = {},
	          formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
	          localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
	          formatFunctions = {},
	          formatTokenFunctions = {},
	          match1 = /\d/,
	          match2 = /\d\d/,
	          match3 = /\d{3}/,
	          match4 = /\d{4}/,
	          match6 = /[+-]?\d{6}/,
	          match1to2 = /\d\d?/,
	          match3to4 = /\d\d\d\d?/,
	          match5to6 = /\d\d\d\d\d\d?/,
	          match1to3 = /\d{1,3}/,
	          match1to4 = /\d{1,4}/,
	          match1to6 = /[+-]?\d{1,6}/,
	          matchUnsigned = /\d+/,
	          matchSigned = /[+-]?\d+/,
	          matchOffset = /Z|[+-]\d\d:?\d\d/gi,
	          matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi,
	          matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
	          regexes = {},
	          tokens$jscomp$0 = {},
	          YEAR = 0,
	          MONTH = 1,
	          DATE = 2,
	          HOUR = 3,
	          MINUTE = 4,
	          SECOND = 5,
	          MILLISECOND = 6,
	          WEEK = 7,
	          WEEKDAY = 8;
	        addFormatToken("Y", 0, 0, function() {
	          var y = this.year();
	          return 9999 >= y ? "" + y : "+" + y;
	        });
	        addFormatToken(0, ["YY", 2], 0, function() {
	          return this.year() % 100;
	        });
	        addFormatToken(0, ["YYYY", 4], 0, "year");
	        addFormatToken(0, ["YYYYY", 5], 0, "year");
	        addFormatToken(0, ["YYYYYY", 6, !0], 0, "year");
	        addUnitAlias("year", "y");
	        priorities.year = 1;
	        addRegexToken("Y", matchSigned);
	        addRegexToken("YY", match1to2, match2);
	        addRegexToken("YYYY", match1to4, match4);
	        addRegexToken("YYYYY", match1to6, match6);
	        addRegexToken("YYYYYY", match1to6, match6);
	        addParseToken(["YYYYY", "YYYYYY"], YEAR);
	        addParseToken("YYYY", function(input, array) {
	          array[YEAR] =
	            2 === input.length ? hooks.parseTwoDigitYear(input) : toInt(input);
	        });
	        addParseToken("YY", function(input, array) {
	          array[YEAR] = hooks.parseTwoDigitYear(input);
	        });
	        addParseToken("Y", function(input, array) {
	          array[YEAR] = parseInt(input, 10);
	        });
	        hooks.parseTwoDigitYear = function(input) {
	          return toInt(input) + (68 < toInt(input) ? 1900 : 2e3);
	        };
	        var getSetYear = makeGetSet("FullYear", !0);
	        var indexOf = Array.prototype.indexOf
	          ? Array.prototype.indexOf
	          : function(o) {
	              var i;
	              for (i = 0; i < this.length; ++i) if (this[i] === o) return i;
	              return -1;
	            };
	        addFormatToken("M", ["MM", 2], "Mo", function() {
	          return this.month() + 1;
	        });
	        addFormatToken("MMM", 0, 0, function(format) {
	          return this.localeData().monthsShort(this, format);
	        });
	        addFormatToken("MMMM", 0, 0, function(format) {
	          return this.localeData().months(this, format);
	        });
	        addUnitAlias("month", "M");
	        priorities.month = 8;
	        addRegexToken("M", match1to2);
	        addRegexToken("MM", match1to2, match2);
	        addRegexToken("MMM", function(isStrict, locale) {
	          return locale.monthsShortRegex(isStrict);
	        });
	        addRegexToken("MMMM", function(isStrict, locale) {
	          return locale.monthsRegex(isStrict);
	        });
	        addParseToken(["M", "MM"], function(input, array) {
	          array[MONTH] = toInt(input) - 1;
	        });
	        addParseToken(["MMM", "MMMM"], function(input, array, config, token) {
	          token = config._locale.monthsParse(input, token, config._strict);
	          null != token
	            ? (array[MONTH] = token)
	            : (getParsingFlags(config).invalidMonth = input);
	        });
	        var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
	          defaultLocaleMonthsShort = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(
	            " "
	          );
	        addFormatToken("w", ["ww", 2], "wo", "week");
	        addFormatToken("W", ["WW", 2], "Wo", "isoWeek");
	        addUnitAlias("week", "w");
	        addUnitAlias("isoWeek", "W");
	        priorities.week = 5;
	        priorities.isoWeek = 5;
	        addRegexToken("w", match1to2);
	        addRegexToken("ww", match1to2, match2);
	        addRegexToken("W", match1to2);
	        addRegexToken("WW", match1to2, match2);
	        addWeekParseToken(["w", "ww", "W", "WW"], function(
	          input,
	          week,
	          config,
	          token
	        ) {
	          week[token.substr(0, 1)] = toInt(input);
	        });
	        addFormatToken("d", 0, "do", "day");
	        addFormatToken("dd", 0, 0, function(format) {
	          return this.localeData().weekdaysMin(this, format);
	        });
	        addFormatToken("ddd", 0, 0, function(format) {
	          return this.localeData().weekdaysShort(this, format);
	        });
	        addFormatToken("dddd", 0, 0, function(format) {
	          return this.localeData().weekdays(this, format);
	        });
	        addFormatToken("e", 0, 0, "weekday");
	        addFormatToken("E", 0, 0, "isoWeekday");
	        addUnitAlias("day", "d");
	        addUnitAlias("weekday", "e");
	        addUnitAlias("isoWeekday", "E");
	        priorities.day = 11;
	        priorities.weekday = 11;
	        priorities.isoWeekday = 11;
	        addRegexToken("d", match1to2);
	        addRegexToken("e", match1to2);
	        addRegexToken("E", match1to2);
	        addRegexToken("dd", function(isStrict, locale) {
	          return locale.weekdaysMinRegex(isStrict);
	        });
	        addRegexToken("ddd", function(isStrict, locale) {
	          return locale.weekdaysShortRegex(isStrict);
	        });
	        addRegexToken("dddd", function(isStrict, locale) {
	          return locale.weekdaysRegex(isStrict);
	        });
	        addWeekParseToken(["dd", "ddd", "dddd"], function(
	          input,
	          week,
	          config,
	          token
	        ) {
	          token = config._locale.weekdaysParse(input, token, config._strict);
	          null != token
	            ? (week.d = token)
	            : (getParsingFlags(config).invalidWeekday = input);
	        });
	        addWeekParseToken(["d", "e", "E"], function(
	          input,
	          week,
	          config,
	          token
	        ) {
	          week[token] = toInt(input);
	        });
	        var defaultLocaleWeekdaysShort = "Sun Mon Tue Wed Thu Fri Sat".split(
	          " "
	        );
	        addFormatToken("H", ["HH", 2], 0, "hour");
	        addFormatToken("h", ["hh", 2], 0, hFormat);
	        addFormatToken("k", ["kk", 2], 0, function() {
	          return this.hours() || 24;
	        });
	        addFormatToken("hmm", 0, 0, function() {
	          return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2);
	        });
	        addFormatToken("hmmss", 0, 0, function() {
	          return (
	            "" +
	            hFormat.apply(this) +
	            zeroFill(this.minutes(), 2) +
	            zeroFill(this.seconds(), 2)
	          );
	        });
	        addFormatToken("Hmm", 0, 0, function() {
	          return "" + this.hours() + zeroFill(this.minutes(), 2);
	        });
	        addFormatToken("Hmmss", 0, 0, function() {
	          return (
	            "" +
	            this.hours() +
	            zeroFill(this.minutes(), 2) +
	            zeroFill(this.seconds(), 2)
	          );
	        });
	        meridiem("a", !0);
	        meridiem("A", !1);
	        addUnitAlias("hour", "h");
	        priorities.hour = 13;
	        addRegexToken("a", matchMeridiem);
	        addRegexToken("A", matchMeridiem);
	        addRegexToken("H", match1to2);
	        addRegexToken("h", match1to2);
	        addRegexToken("k", match1to2);
	        addRegexToken("HH", match1to2, match2);
	        addRegexToken("hh", match1to2, match2);
	        addRegexToken("kk", match1to2, match2);
	        addRegexToken("hmm", match3to4);
	        addRegexToken("hmmss", match5to6);
	        addRegexToken("Hmm", match3to4);
	        addRegexToken("Hmmss", match5to6);
	        addParseToken(["H", "HH"], HOUR);
	        addParseToken(["k", "kk"], function(input, array) {
	          input = toInt(input);
	          array[HOUR] = 24 === input ? 0 : input;
	        });
	        addParseToken(["a", "A"], function(input, array, config) {
	          config._isPm = config._locale.isPM(input);
	          config._meridiem = input;
	        });
	        addParseToken(["h", "hh"], function(input, array, config) {
	          array[HOUR] = toInt(input);
	          getParsingFlags(config).bigHour = !0;
	        });
	        addParseToken("hmm", function(input, array, config) {
	          var pos = input.length - 2;
	          array[HOUR] = toInt(input.substr(0, pos));
	          array[MINUTE] = toInt(input.substr(pos));
	          getParsingFlags(config).bigHour = !0;
	        });
	        addParseToken("hmmss", function(input, array, config) {
	          var pos1 = input.length - 4,
	            pos2 = input.length - 2;
	          array[HOUR] = toInt(input.substr(0, pos1));
	          array[MINUTE] = toInt(input.substr(pos1, 2));
	          array[SECOND] = toInt(input.substr(pos2));
	          getParsingFlags(config).bigHour = !0;
	        });
	        addParseToken("Hmm", function(input, array) {
	          var pos = input.length - 2;
	          array[HOUR] = toInt(input.substr(0, pos));
	          array[MINUTE] = toInt(input.substr(pos));
	        });
	        addParseToken("Hmmss", function(input, array) {
	          var pos1 = input.length - 4,
	            pos2 = input.length - 2;
	          array[HOUR] = toInt(input.substr(0, pos1));
	          array[MINUTE] = toInt(input.substr(pos1, 2));
	          array[SECOND] = toInt(input.substr(pos2));
	        });
	        var getSetHour = makeGetSet("Hours", !0),
	          baseConfig = {
	            calendar: {
	              sameDay: "[Today at] LT",
	              nextDay: "[Tomorrow at] LT",
	              nextWeek: "dddd [at] LT",
	              lastDay: "[Yesterday at] LT",
	              lastWeek: "[Last] dddd [at] LT",
	              sameElse: "L"
	            },
	            longDateFormat: {
	              LTS: "h:mm:ss A",
	              LT: "h:mm A",
	              L: "MM/DD/YYYY",
	              LL: "MMMM D, YYYY",
	              LLL: "MMMM D, YYYY h:mm A",
	              LLLL: "dddd, MMMM D, YYYY h:mm A"
	            },
	            invalidDate: "Invalid date",
	            ordinal: "%d",
	            dayOfMonthOrdinalParse: /\d{1,2}/,
	            relativeTime: {
	              future: "in %s",
	              past: "%s ago",
	              s: "a few seconds",
	              ss: "%d seconds",
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
	            months: "January February March April May June July August September October November December".split(
	              " "
	            ),
	            monthsShort: defaultLocaleMonthsShort,
	            week: { dow: 0, doy: 6 },
	            weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(
	              " "
	            ),
	            weekdaysMin: "Su Mo Tu We Th Fr Sa".split(" "),
	            weekdaysShort: defaultLocaleWeekdaysShort,
	            meridiemParse: /[ap]\.?m?\.?/i
	          },
	          locales = {},
	          localeFamilies = {},
	          globalLocale,
	          extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
	          basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
	          tzRegex = /Z|[+-]\d\d(?::?\d\d)?/,
	          isoDates = [
	            ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
	            ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
	            ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
	            ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
	            ["YYYY-DDD", /\d{4}-\d{3}/],
	            ["YYYY-MM", /\d{4}-\d\d/, !1],
	            ["YYYYYYMMDD", /[+-]\d{10}/],
	            ["YYYYMMDD", /\d{8}/],
	            ["GGGG[W]WWE", /\d{4}W\d{3}/],
	            ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
	            ["YYYYDDD", /\d{7}/]
	          ],
	          isoTimes = [
	            ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
	            ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
	            ["HH:mm:ss", /\d\d:\d\d:\d\d/],
	            ["HH:mm", /\d\d:\d\d/],
	            ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
	            ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
	            ["HHmmss", /\d\d\d\d\d\d/],
	            ["HHmm", /\d\d\d\d/],
	            ["HH", /\d\d/]
	          ],
	          aspNetJsonRegex = /^\/?Date\((\-?\d+)/i,
	          rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
	          obsOffsets = {
	            UT: 0,
	            GMT: 0,
	            EDT: -240,
	            EST: -300,
	            CDT: -300,
	            CST: -360,
	            MDT: -360,
	            MST: -420,
	            PDT: -420,
	            PST: -480
	          };
	        hooks.createFromInputFallback = deprecate(
	          "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
	          function(config) {
	            config._d = new Date(config._i + (config._useUTC ? " UTC" : ""));
	          }
	        );
	        hooks.ISO_8601 = function() {};
	        hooks.RFC_2822 = function() {};
	        var prototypeMin = deprecate(
	            "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
	            function() {
	              var other = createLocal.apply(null, arguments);
	              return this.isValid() && other.isValid()
	                ? other < this
	                  ? this
	                  : other
	                : createInvalid();
	            }
	          ),
	          prototypeMax = deprecate(
	            "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
	            function() {
	              var other = createLocal.apply(null, arguments);
	              return this.isValid() && other.isValid()
	                ? other > this
	                  ? this
	                  : other
	                : createInvalid();
	            }
	          ),
	          ordering = "year quarter month week day hour minute second millisecond".split(
	            " "
	          );
	        offset$jscomp$0("Z", ":");
	        offset$jscomp$0("ZZ", "");
	        addRegexToken("Z", matchShortOffset);
	        addRegexToken("ZZ", matchShortOffset);
	        addParseToken(["Z", "ZZ"], function(input, array, config) {
	          config._useUTC = !0;
	          config._tzm = offsetFromString(matchShortOffset, input);
	        });
	        var chunkOffset = /([\+\-]|\d\d)/gi;
	        hooks.updateOffset = function() {};
	        var aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
	          isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
	        createDuration.fn = Duration.prototype;
	        createDuration.invalid = function() {
	          return createDuration(NaN);
	        };
	        var add = createAdder(1, "add"),
	          subtract = createAdder(-1, "subtract");
	        hooks.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
	        hooks.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
	        var lang = deprecate(
	          "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
	          function(key) {
	            return void 0 === key ? this.localeData() : this.locale(key);
	          }
	        );
	        addFormatToken(0, ["gg", 2], 0, function() {
	          return this.weekYear() % 100;
	        });
	        addFormatToken(0, ["GG", 2], 0, function() {
	          return this.isoWeekYear() % 100;
	        });
	        addWeekYearFormatToken("gggg", "weekYear");
	        addWeekYearFormatToken("ggggg", "weekYear");
	        addWeekYearFormatToken("GGGG", "isoWeekYear");
	        addWeekYearFormatToken("GGGGG", "isoWeekYear");
	        addUnitAlias("weekYear", "gg");
	        addUnitAlias("isoWeekYear", "GG");
	        priorities.weekYear = 1;
	        priorities.isoWeekYear = 1;
	        addRegexToken("G", matchSigned);
	        addRegexToken("g", matchSigned);
	        addRegexToken("GG", match1to2, match2);
	        addRegexToken("gg", match1to2, match2);
	        addRegexToken("GGGG", match1to4, match4);
	        addRegexToken("gggg", match1to4, match4);
	        addRegexToken("GGGGG", match1to6, match6);
	        addRegexToken("ggggg", match1to6, match6);
	        addWeekParseToken(["gggg", "ggggg", "GGGG", "GGGGG"], function(
	          input,
	          week,
	          config,
	          token
	        ) {
	          week[token.substr(0, 2)] = toInt(input);
	        });
	        addWeekParseToken(["gg", "GG"], function(input, week, config, token) {
	          week[token] = hooks.parseTwoDigitYear(input);
	        });
	        addFormatToken("Q", 0, "Qo", "quarter");
	        addUnitAlias("quarter", "Q");
	        priorities.quarter = 7;
	        addRegexToken("Q", match1);
	        addParseToken("Q", function(input, array) {
	          array[MONTH] = 3 * (toInt(input) - 1);
	        });
	        addFormatToken("D", ["DD", 2], "Do", "date");
	        addUnitAlias("date", "D");
	        priorities.date = 9;
	        addRegexToken("D", match1to2);
	        addRegexToken("DD", match1to2, match2);
	        addRegexToken("Do", function(isStrict, locale) {
	          return isStrict
	            ? locale._dayOfMonthOrdinalParse || locale._ordinalParse
	            : locale._dayOfMonthOrdinalParseLenient;
	        });
	        addParseToken(["D", "DD"], DATE);
	        addParseToken("Do", function(input, array) {
	          array[DATE] = toInt(input.match(match1to2)[0]);
	        });
	        var getSetDayOfMonth = makeGetSet("Date", !0);
	        addFormatToken("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
	        addUnitAlias("dayOfYear", "DDD");
	        priorities.dayOfYear = 4;
	        addRegexToken("DDD", match1to3);
	        addRegexToken("DDDD", match3);
	        addParseToken(["DDD", "DDDD"], function(input, array, config) {
	          config._dayOfYear = toInt(input);
	        });
	        addFormatToken("m", ["mm", 2], 0, "minute");
	        addUnitAlias("minute", "m");
	        priorities.minute = 14;
	        addRegexToken("m", match1to2);
	        addRegexToken("mm", match1to2, match2);
	        addParseToken(["m", "mm"], MINUTE);
	        var getSetMinute = makeGetSet("Minutes", !1);
	        addFormatToken("s", ["ss", 2], 0, "second");
	        addUnitAlias("second", "s");
	        priorities.second = 15;
	        addRegexToken("s", match1to2);
	        addRegexToken("ss", match1to2, match2);
	        addParseToken(["s", "ss"], SECOND);
	        var getSetSecond = makeGetSet("Seconds", !1);
	        addFormatToken("S", 0, 0, function() {
	          return ~~(this.millisecond() / 100);
	        });
	        addFormatToken(0, ["SS", 2], 0, function() {
	          return ~~(this.millisecond() / 10);
	        });
	        addFormatToken(0, ["SSS", 3], 0, "millisecond");
	        addFormatToken(0, ["SSSS", 4], 0, function() {
	          return 10 * this.millisecond();
	        });
	        addFormatToken(0, ["SSSSS", 5], 0, function() {
	          return 100 * this.millisecond();
	        });
	        addFormatToken(0, ["SSSSSS", 6], 0, function() {
	          return 1e3 * this.millisecond();
	        });
	        addFormatToken(0, ["SSSSSSS", 7], 0, function() {
	          return 1e4 * this.millisecond();
	        });
	        addFormatToken(0, ["SSSSSSSS", 8], 0, function() {
	          return 1e5 * this.millisecond();
	        });
	        addFormatToken(0, ["SSSSSSSSS", 9], 0, function() {
	          return 1e6 * this.millisecond();
	        });
	        addUnitAlias("millisecond", "ms");
	        priorities.millisecond = 16;
	        addRegexToken("S", match1to3, match1);
	        addRegexToken("SS", match1to3, match2);
	        addRegexToken("SSS", match1to3, match3);
	        var token$jscomp$1;
	        for (
	          token$jscomp$1 = "SSSS";
	          9 >= token$jscomp$1.length;
	          token$jscomp$1 += "S"
	        )
	          addRegexToken(token$jscomp$1, matchUnsigned);
	        for (
	          token$jscomp$1 = "S";
	          9 >= token$jscomp$1.length;
	          token$jscomp$1 += "S"
	        )
	          addParseToken(token$jscomp$1, parseMs);
	        var getSetMillisecond = makeGetSet("Milliseconds", !1);
	        addFormatToken("z", 0, 0, "zoneAbbr");
	        addFormatToken("zz", 0, 0, "zoneName");
	        var proto = Moment.prototype;
	        proto.add = add;
	        proto.calendar = function(time, formats) {
	          time = time || createLocal();
	          var sod = cloneWithOffset(time, this).startOf("day");
	          sod = hooks.calendarFormat(this, sod) || "sameElse";
	          formats =
	            formats &&
	            (isFunction(formats[sod])
	              ? formats[sod].call(this, time)
	              : formats[sod]);
	          return this.format(
	            formats || this.localeData().calendar(sod, this, createLocal(time))
	          );
	        };
	        proto.clone = function() {
	          return new Moment(this);
	        };
	        proto.diff = function(input, units, asFloat) {
	          if (!this.isValid()) return NaN;
	          input = cloneWithOffset(input, this);
	          if (!input.isValid()) return NaN;
	          var zoneDelta = 6e4 * (input.utcOffset() - this.utcOffset());
	          units = normalizeUnits(units);
	          switch (units) {
	            case "year":
	              units = monthDiff(this, input) / 12;
	              break;
	            case "month":
	              units = monthDiff(this, input);
	              break;
	            case "quarter":
	              units = monthDiff(this, input) / 3;
	              break;
	            case "second":
	              units = (this - input) / 1e3;
	              break;
	            case "minute":
	              units = (this - input) / 6e4;
	              break;
	            case "hour":
	              units = (this - input) / 36e5;
	              break;
	            case "day":
	              units = (this - input - zoneDelta) / 864e5;
	              break;
	            case "week":
	              units = (this - input - zoneDelta) / 6048e5;
	              break;
	            default:
	              units = this - input;
	          }
	          return asFloat ? units : absFloor(units);
	        };
	        proto.endOf = function(units) {
	          units = normalizeUnits(units);
	          if (void 0 === units || "millisecond" === units || !this.isValid())
	            return this;
	          var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
	          switch (units) {
	            case "year":
	              var time = startOfDate(this.year() + 1, 0, 1) - 1;
	              break;
	            case "quarter":
	              time =
	                startOfDate(
	                  this.year(),
	                  this.month() - (this.month() % 3) + 3,
	                  1
	                ) - 1;
	              break;
	            case "month":
	              time = startOfDate(this.year(), this.month() + 1, 1) - 1;
	              break;
	            case "week":
	              time =
	                startOfDate(
	                  this.year(),
	                  this.month(),
	                  this.date() - this.weekday() + 7
	                ) - 1;
	              break;
	            case "isoWeek":
	              time =
	                startOfDate(
	                  this.year(),
	                  this.month(),
	                  this.date() - (this.isoWeekday() - 1) + 7
	                ) - 1;
	              break;
	            case "day":
	            case "date":
	              time =
	                startOfDate(this.year(), this.month(), this.date() + 1) - 1;
	              break;
	            case "hour":
	              time = this._d.valueOf();
	              time +=
	                36e5 -
	                mod$1(time + (this._isUTC ? 0 : 6e4 * this.utcOffset()), 36e5) -
	                1;
	              break;
	            case "minute":
	              time = this._d.valueOf();
	              time += 6e4 - mod$1(time, 6e4) - 1;
	              break;
	            case "second":
	              (time = this._d.valueOf()), (time += 1e3 - mod$1(time, 1e3) - 1);
	          }
	          this._d.setTime(time);
	          hooks.updateOffset(this, !0);
	          return this;
	        };
	        proto.format = function(inputString) {
	          inputString ||
	            (inputString = this.isUtc()
	              ? hooks.defaultFormatUtc
	              : hooks.defaultFormat);
	          inputString = formatMoment(this, inputString);
	          return this.localeData().postformat(inputString);
	        };
	        proto.from = function(time, withoutSuffix) {
	          return this.isValid() &&
	            ((isMoment(time) && time.isValid()) || createLocal(time).isValid())
	            ? createDuration({ to: this, from: time })
	                .locale(this.locale())
	                .humanize(!withoutSuffix)
	            : this.localeData().invalidDate();
	        };
	        proto.fromNow = function(withoutSuffix) {
	          return this.from(createLocal(), withoutSuffix);
	        };
	        proto.to = function(time, withoutSuffix) {
	          return this.isValid() &&
	            ((isMoment(time) && time.isValid()) || createLocal(time).isValid())
	            ? createDuration({ from: this, to: time })
	                .locale(this.locale())
	                .humanize(!withoutSuffix)
	            : this.localeData().invalidDate();
	        };
	        proto.toNow = function(withoutSuffix) {
	          return this.to(createLocal(), withoutSuffix);
	        };
	        proto.get = function(units) {
	          units = normalizeUnits(units);
	          return isFunction(this[units]) ? this[units]() : this;
	        };
	        proto.invalidAt = function() {
	          return getParsingFlags(this).overflow;
	        };
	        proto.isAfter = function(input, units) {
	          input = isMoment(input) ? input : createLocal(input);
	          if (!this.isValid() || !input.isValid()) return !1;
	          units = normalizeUnits(units) || "millisecond";
	          return "millisecond" === units
	            ? this.valueOf() > input.valueOf()
	            : input.valueOf() <
	                this.clone()
	                  .startOf(units)
	                  .valueOf();
	        };
	        proto.isBefore = function(input, units) {
	          input = isMoment(input) ? input : createLocal(input);
	          if (!this.isValid() || !input.isValid()) return !1;
	          units = normalizeUnits(units) || "millisecond";
	          return "millisecond" === units
	            ? this.valueOf() < input.valueOf()
	            : this.clone()
	                .endOf(units)
	                .valueOf() < input.valueOf();
	        };
	        proto.isBetween = function(from, to, units, inclusivity) {
	          from = isMoment(from) ? from : createLocal(from);
	          to = isMoment(to) ? to : createLocal(to);
	          if (!(this.isValid() && from.isValid() && to.isValid())) return !1;
	          inclusivity = inclusivity || "()";
	          return (
	            ("(" === inclusivity[0]
	              ? this.isAfter(from, units)
	              : !this.isBefore(from, units)) &&
	            (")" === inclusivity[1]
	              ? this.isBefore(to, units)
	              : !this.isAfter(to, units))
	          );
	        };
	        proto.isSame = function(input, units) {
	          input = isMoment(input) ? input : createLocal(input);
	          if (!this.isValid() || !input.isValid()) return !1;
	          units = normalizeUnits(units) || "millisecond";
	          if ("millisecond" === units)
	            return this.valueOf() === input.valueOf();
	          input = input.valueOf();
	          return (
	            this.clone()
	              .startOf(units)
	              .valueOf() <= input &&
	            input <=
	              this.clone()
	                .endOf(units)
	                .valueOf()
	          );
	        };
	        proto.isSameOrAfter = function(input, units) {
	          return this.isSame(input, units) || this.isAfter(input, units);
	        };
	        proto.isSameOrBefore = function(input, units) {
	          return this.isSame(input, units) || this.isBefore(input, units);
	        };
	        proto.isValid = function() {
	          return isValid(this);
	        };
	        proto.lang = lang;
	        proto.locale = locale$jscomp$1;
	        proto.localeData = localeData;
	        proto.max = prototypeMax;
	        proto.min = prototypeMin;
	        proto.parsingFlags = function() {
	          return extend({}, getParsingFlags(this));
	        };
	        proto.set = function(units, value) {
	          if ("object" === typeof units) {
	            units = normalizeObjectUnits(units);
	            value = getPrioritizedUnits(units);
	            for (var i = 0; i < value.length; i++)
	              this[value[i].unit](units[value[i].unit]);
	          } else if (((units = normalizeUnits(units)), isFunction(this[units])))
	            return this[units](value);
	          return this;
	        };
	        proto.startOf = function(units) {
	          units = normalizeUnits(units);
	          if (void 0 === units || "millisecond" === units || !this.isValid())
	            return this;
	          var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
	          switch (units) {
	            case "year":
	              var time = startOfDate(this.year(), 0, 1);
	              break;
	            case "quarter":
	              time = startOfDate(
	                this.year(),
	                this.month() - (this.month() % 3),
	                1
	              );
	              break;
	            case "month":
	              time = startOfDate(this.year(), this.month(), 1);
	              break;
	            case "week":
	              time = startOfDate(
	                this.year(),
	                this.month(),
	                this.date() - this.weekday()
	              );
	              break;
	            case "isoWeek":
	              time = startOfDate(
	                this.year(),
	                this.month(),
	                this.date() - (this.isoWeekday() - 1)
	              );
	              break;
	            case "day":
	            case "date":
	              time = startOfDate(this.year(), this.month(), this.date());
	              break;
	            case "hour":
	              time = this._d.valueOf();
	              time -= mod$1(
	                time + (this._isUTC ? 0 : 6e4 * this.utcOffset()),
	                36e5
	              );
	              break;
	            case "minute":
	              time = this._d.valueOf();
	              time -= mod$1(time, 6e4);
	              break;
	            case "second":
	              (time = this._d.valueOf()), (time -= mod$1(time, 1e3));
	          }
	          this._d.setTime(time);
	          hooks.updateOffset(this, !0);
	          return this;
	        };
	        proto.subtract = subtract;
	        proto.toArray = function() {
	          return [
	            this.year(),
	            this.month(),
	            this.date(),
	            this.hour(),
	            this.minute(),
	            this.second(),
	            this.millisecond()
	          ];
	        };
	        proto.toObject = function() {
	          return {
	            years: this.year(),
	            months: this.month(),
	            date: this.date(),
	            hours: this.hours(),
	            minutes: this.minutes(),
	            seconds: this.seconds(),
	            milliseconds: this.milliseconds()
	          };
	        };
	        proto.toDate = function() {
	          return new Date(this.valueOf());
	        };
	        proto.toISOString = function(keepOffset) {
	          if (!this.isValid()) return null;
	          var m = (keepOffset = !0 !== keepOffset) ? this.clone().utc() : this;
	          return 0 > m.year() || 9999 < m.year()
	            ? formatMoment(
	                m,
	                keepOffset
	                  ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]"
	                  : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
	              )
	            : isFunction(Date.prototype.toISOString)
	            ? keepOffset
	              ? this.toDate().toISOString()
	              : new Date(this.valueOf() + 6e4 * this.utcOffset())
	                  .toISOString()
	                  .replace("Z", formatMoment(m, "Z"))
	            : formatMoment(
	                m,
	                keepOffset
	                  ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"
	                  : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
	              );
	        };
	        proto.inspect = function() {
	          if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
	          var func = "moment",
	            zone = "";
	          this.isLocal() ||
	            ((func =
	              0 === this.utcOffset() ? "moment.utc" : "moment.parseZone"),
	            (zone = "Z"));
	          func = "[" + func + '("]';
	          var year =
	            0 <= this.year() && 9999 >= this.year() ? "YYYY" : "YYYYYY";
	          return this.format(
	            func + year + "-MM-DD[T]HH:mm:ss.SSS" + (zone + '[")]')
	          );
	        };
	        proto.toJSON = function() {
	          return this.isValid() ? this.toISOString() : null;
	        };
	        proto.toString = function() {
	          return this.clone()
	            .locale("en")
	            .format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
	        };
	        proto.unix = function() {
	          return Math.floor(this.valueOf() / 1e3);
	        };
	        proto.valueOf = function() {
	          return this._d.valueOf() - 6e4 * (this._offset || 0);
	        };
	        proto.creationData = function() {
	          return {
	            input: this._i,
	            format: this._f,
	            locale: this._locale,
	            isUTC: this._isUTC,
	            strict: this._strict
	          };
	        };
	        proto.year = getSetYear;
	        proto.isLeapYear = function() {
	          return isLeapYear(this.year());
	        };
	        proto.weekYear = function(input) {
	          return getSetWeekYearHelper.call(
	            this,
	            input,
	            this.week(),
	            this.weekday(),
	            this.localeData()._week.dow,
	            this.localeData()._week.doy
	          );
	        };
	        proto.isoWeekYear = function(input) {
	          return getSetWeekYearHelper.call(
	            this,
	            input,
	            this.isoWeek(),
	            this.isoWeekday(),
	            1,
	            4
	          );
	        };
	        proto.quarter = proto.quarters = function(input) {
	          return null == input
	            ? Math.ceil((this.month() + 1) / 3)
	            : this.month(3 * (input - 1) + (this.month() % 3));
	        };
	        proto.month = getSetMonth;
	        proto.daysInMonth = function() {
	          return daysInMonth(this.year(), this.month());
	        };
	        proto.week = proto.weeks = function(input) {
	          var week = this.localeData().week(this);
	          return null == input ? week : this.add(7 * (input - week), "d");
	        };
	        proto.isoWeek = proto.isoWeeks = function(input) {
	          var week = weekOfYear(this, 1, 4).week;
	          return null == input ? week : this.add(7 * (input - week), "d");
	        };
	        proto.weeksInYear = function() {
	          var weekInfo = this.localeData()._week;
	          return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
	        };
	        proto.isoWeeksInYear = function() {
	          return weeksInYear(this.year(), 1, 4);
	        };
	        proto.date = getSetDayOfMonth;
	        proto.day = proto.days = function(input) {
	          if (!this.isValid()) return null != input ? this : NaN;
	          var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
	          if (null != input) {
	            var locale = this.localeData();
	            "string" === typeof input &&
	              (isNaN(input)
	                ? ((input = locale.weekdaysParse(input)),
	                  (input = "number" === typeof input ? input : null))
	                : (input = parseInt(input, 10)));
	            return this.add(input - day, "d");
	          }
	          return day;
	        };
	        proto.weekday = function(input) {
	          if (!this.isValid()) return null != input ? this : NaN;
	          var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
	          return null == input ? weekday : this.add(input - weekday, "d");
	        };
	        proto.isoWeekday = function(input) {
	          if (!this.isValid()) return null != input ? this : NaN;
	          if (null != input) {
	            var locale = this.localeData();
	            input =
	              "string" === typeof input
	                ? locale.weekdaysParse(input) % 7 || 7
	                : isNaN(input)
	                ? null
	                : input;
	            return this.day(this.day() % 7 ? input : input - 7);
	          }
	          return this.day() || 7;
	        };
	        proto.dayOfYear = function(input) {
	          var dayOfYear =
	            Math.round(
	              (this.clone().startOf("day") - this.clone().startOf("year")) /
	                864e5
	            ) + 1;
	          return null == input ? dayOfYear : this.add(input - dayOfYear, "d");
	        };
	        proto.hour = proto.hours = getSetHour;
	        proto.minute = proto.minutes = getSetMinute;
	        proto.second = proto.seconds = getSetSecond;
	        proto.millisecond = proto.milliseconds = getSetMillisecond;
	        proto.utcOffset = function(input, keepLocalTime, keepMinutes) {
	          var offset = this._offset || 0,
	            localAdjust;
	          if (!this.isValid()) return null != input ? this : NaN;
	          if (null != input) {
	            if ("string" === typeof input) {
	              if (
	                ((input = offsetFromString(matchShortOffset, input)),
	                null === input)
	              )
	                return this;
	            } else 16 > Math.abs(input) && !keepMinutes && (input *= 60);
	            !this._isUTC &&
	              keepLocalTime &&
	              (localAdjust =
	                15 * -Math.round(this._d.getTimezoneOffset() / 15));
	            this._offset = input;
	            this._isUTC = !0;
	            null != localAdjust && this.add(localAdjust, "m");
	            offset !== input &&
	              (!keepLocalTime || this._changeInProgress
	                ? addSubtract(this, createDuration(input - offset, "m"), 1, !1)
	                : this._changeInProgress ||
	                  ((this._changeInProgress = !0),
	                  hooks.updateOffset(this, !0),
	                  (this._changeInProgress = null)));
	            return this;
	          }
	          return this._isUTC
	            ? offset
	            : 15 * -Math.round(this._d.getTimezoneOffset() / 15);
	        };
	        proto.utc = function(keepLocalTime) {
	          return this.utcOffset(0, keepLocalTime);
	        };
	        proto.local = function(keepLocalTime) {
	          this._isUTC &&
	            (this.utcOffset(0, keepLocalTime),
	            (this._isUTC = !1),
	            keepLocalTime &&
	              this.subtract(
	                15 * -Math.round(this._d.getTimezoneOffset() / 15),
	                "m"
	              ));
	          return this;
	        };
	        proto.parseZone = function() {
	          if (null != this._tzm) this.utcOffset(this._tzm, !1, !0);
	          else if ("string" === typeof this._i) {
	            var tZone = offsetFromString(matchOffset, this._i);
	            null != tZone ? this.utcOffset(tZone) : this.utcOffset(0, !0);
	          }
	          return this;
	        };
	        proto.hasAlignedHourOffset = function(input) {
	          if (!this.isValid()) return !1;
	          input = input ? createLocal(input).utcOffset() : 0;
	          return 0 === (this.utcOffset() - input) % 60;
	        };
	        proto.isDST = function() {
	          return (
	            this.utcOffset() >
	              this.clone()
	                .month(0)
	                .utcOffset() ||
	            this.utcOffset() >
	              this.clone()
	                .month(5)
	                .utcOffset()
	          );
	        };
	        proto.isLocal = function() {
	          return this.isValid() ? !this._isUTC : !1;
	        };
	        proto.isUtcOffset = function() {
	          return this.isValid() ? this._isUTC : !1;
	        };
	        proto.isUtc = isUtc;
	        proto.isUTC = isUtc;
	        proto.zoneAbbr = function() {
	          return this._isUTC ? "UTC" : "";
	        };
	        proto.zoneName = function() {
	          return this._isUTC ? "Coordinated Universal Time" : "";
	        };
	        proto.dates = deprecate(
	          "dates accessor is deprecated. Use date instead.",
	          getSetDayOfMonth
	        );
	        proto.months = deprecate(
	          "months accessor is deprecated. Use month instead",
	          getSetMonth
	        );
	        proto.years = deprecate(
	          "years accessor is deprecated. Use year instead",
	          getSetYear
	        );
	        proto.zone = deprecate(
	          "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
	          function(input, keepLocalTime) {
	            return null != input
	              ? ("string" !== typeof input && (input = -input),
	                this.utcOffset(input, keepLocalTime),
	                this)
	              : -this.utcOffset();
	          }
	        );
	        proto.isDSTShifted = deprecate(
	          "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
	          function() {
	            if (!isUndefined(this._isDSTShifted)) return this._isDSTShifted;
	            var c = {};
	            copyConfig(c, this);
	            c = prepareConfig(c);
	            if (c._a) {
	              var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
	              this._isDSTShifted =
	                this.isValid() && 0 < compareArrays(c._a, other.toArray());
	            } else this._isDSTShifted = !1;
	            return this._isDSTShifted;
	          }
	        );
	        var proto$1 = Locale.prototype;
	        proto$1.calendar = function(key, mom, now) {
	          key = this._calendar[key] || this._calendar.sameElse;
	          return isFunction(key) ? key.call(mom, now) : key;
	        };
	        proto$1.longDateFormat = function(key) {
	          var format = this._longDateFormat[key],
	            formatUpper = this._longDateFormat[key.toUpperCase()];
	          if (format || !formatUpper) return format;
	          this._longDateFormat[key] = formatUpper.replace(
	            /MMMM|MM|DD|dddd/g,
	            function(val) {
	              return val.slice(1);
	            }
	          );
	          return this._longDateFormat[key];
	        };
	        proto$1.invalidDate = function() {
	          return this._invalidDate;
	        };
	        proto$1.ordinal = function(number) {
	          return this._ordinal.replace("%d", number);
	        };
	        proto$1.preparse = preParsePostFormat;
	        proto$1.postformat = preParsePostFormat;
	        proto$1.relativeTime = function(
	          number,
	          withoutSuffix,
	          string,
	          isFuture
	        ) {
	          var output = this._relativeTime[string];
	          return isFunction(output)
	            ? output(number, withoutSuffix, string, isFuture)
	            : output.replace(/%d/i, number);
	        };
	        proto$1.pastFuture = function(diff, output) {
	          diff = this._relativeTime[0 < diff ? "future" : "past"];
	          return isFunction(diff) ? diff(output) : diff.replace(/%s/i, output);
	        };
	        proto$1.set = function(config) {
	          var i;
	          for (i in config) {
	            var prop = config[i];
	            isFunction(prop) ? (this[i] = prop) : (this["_" + i] = prop);
	          }
	          this._config = config;
	          this._dayOfMonthOrdinalParseLenient = new RegExp(
	            (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
	              "|" +
	              /\d{1,2}/.source
	          );
	        };
	        proto$1.months = function(m, format) {
	          return m
	            ? isArray(this._months)
	              ? this._months[m.month()]
	              : this._months[
	                  (this._months.isFormat || MONTHS_IN_FORMAT).test(format)
	                    ? "format"
	                    : "standalone"
	                ][m.month()]
	            : isArray(this._months)
	            ? this._months
	            : this._months.standalone;
	        };
	        proto$1.monthsShort = function(m, format) {
	          return m
	            ? isArray(this._monthsShort)
	              ? this._monthsShort[m.month()]
	              : this._monthsShort[
	                  MONTHS_IN_FORMAT.test(format) ? "format" : "standalone"
	                ][m.month()]
	            : isArray(this._monthsShort)
	            ? this._monthsShort
	            : this._monthsShort.standalone;
	        };
	        proto$1.monthsParse = function(monthName, format, strict) {
	          var i;
	          if (this._monthsParseExact) {
	            a: {
	              monthName = monthName.toLocaleLowerCase();
	              if (!this._monthsParse)
	                for (
	                  this._monthsParse = [],
	                    this._longMonthsParse = [],
	                    this._shortMonthsParse = [],
	                    i = 0;
	                  12 > i;
	                  ++i
	                ) {
	                  var mom = createUTC([2e3, i]);
	                  this._shortMonthsParse[i] = this.monthsShort(
	                    mom,
	                    ""
	                  ).toLocaleLowerCase();
	                  this._longMonthsParse[i] = this.months(
	                    mom,
	                    ""
	                  ).toLocaleLowerCase();
	                }
	              if (strict)
	                format =
	                  "MMM" === format
	                    ? indexOf.call(this._shortMonthsParse, monthName)
	                    : indexOf.call(this._longMonthsParse, monthName);
	              else if ("MMM" === format) {
	                format = indexOf.call(this._shortMonthsParse, monthName);
	                if (-1 !== format) break a;
	                format = indexOf.call(this._longMonthsParse, monthName);
	              } else {
	                format = indexOf.call(this._longMonthsParse, monthName);
	                if (-1 !== format) break a;
	                format = indexOf.call(this._shortMonthsParse, monthName);
	              }
	              format = -1 !== format ? format : null;
	            }
	            return format;
	          }
	          this._monthsParse ||
	            ((this._monthsParse = []),
	            (this._longMonthsParse = []),
	            (this._shortMonthsParse = []));
	          for (i = 0; 12 > i; i++)
	            if (
	              ((mom = createUTC([2e3, i])),
	              strict &&
	                !this._longMonthsParse[i] &&
	                ((this._longMonthsParse[i] = new RegExp(
	                  "^" + this.months(mom, "").replace(".", "") + "$",
	                  "i"
	                )),
	                (this._shortMonthsParse[i] = new RegExp(
	                  "^" + this.monthsShort(mom, "").replace(".", "") + "$",
	                  "i"
	                ))),
	              strict ||
	                this._monthsParse[i] ||
	                ((mom =
	                  "^" +
	                  this.months(mom, "") +
	                  "|^" +
	                  this.monthsShort(mom, "")),
	                (this._monthsParse[i] = new RegExp(mom.replace(".", ""), "i"))),
	              (strict &&
	                "MMMM" === format &&
	                this._longMonthsParse[i].test(monthName)) ||
	                (strict &&
	                  "MMM" === format &&
	                  this._shortMonthsParse[i].test(monthName)) ||
	                (!strict && this._monthsParse[i].test(monthName)))
	            )
	              return i;
	        };
	        proto$1.monthsRegex = function(isStrict) {
	          if (this._monthsParseExact)
	            return (
	              hasOwnProp(this, "_monthsRegex") || computeMonthsParse.call(this),
	              isStrict ? this._monthsStrictRegex : this._monthsRegex
	            );
	          hasOwnProp(this, "_monthsRegex") || (this._monthsRegex = matchWord);
	          return this._monthsStrictRegex && isStrict
	            ? this._monthsStrictRegex
	            : this._monthsRegex;
	        };
	        proto$1.monthsShortRegex = function(isStrict) {
	          if (this._monthsParseExact)
	            return (
	              hasOwnProp(this, "_monthsRegex") || computeMonthsParse.call(this),
	              isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex
	            );
	          hasOwnProp(this, "_monthsShortRegex") ||
	            (this._monthsShortRegex = matchWord);
	          return this._monthsShortStrictRegex && isStrict
	            ? this._monthsShortStrictRegex
	            : this._monthsShortRegex;
	        };
	        proto$1.week = function(mom) {
	          return weekOfYear(mom, this._week.dow, this._week.doy).week;
	        };
	        proto$1.firstDayOfYear = function() {
	          return this._week.doy;
	        };
	        proto$1.firstDayOfWeek = function() {
	          return this._week.dow;
	        };
	        proto$1.weekdays = function(m, format) {
	          format = isArray(this._weekdays)
	            ? this._weekdays
	            : this._weekdays[
	                m && !0 !== m && this._weekdays.isFormat.test(format)
	                  ? "format"
	                  : "standalone"
	              ];
	          return !0 === m
	            ? shiftWeekdays(format, this._week.dow)
	            : m
	            ? format[m.day()]
	            : format;
	        };
	        proto$1.weekdaysMin = function(m) {
	          return !0 === m
	            ? shiftWeekdays(this._weekdaysMin, this._week.dow)
	            : m
	            ? this._weekdaysMin[m.day()]
	            : this._weekdaysMin;
	        };
	        proto$1.weekdaysShort = function(m) {
	          return !0 === m
	            ? shiftWeekdays(this._weekdaysShort, this._week.dow)
	            : m
	            ? this._weekdaysShort[m.day()]
	            : this._weekdaysShort;
	        };
	        proto$1.weekdaysParse = function(weekdayName, format, strict) {
	          var i;
	          if (this._weekdaysParseExact)
	            return handleStrictParse$1.call(this, weekdayName, format, strict);
	          this._weekdaysParse ||
	            ((this._weekdaysParse = []),
	            (this._minWeekdaysParse = []),
	            (this._shortWeekdaysParse = []),
	            (this._fullWeekdaysParse = []));
	          for (i = 0; 7 > i; i++) {
	            var mom = createUTC([2e3, 1]).day(i);
	            strict &&
	              !this._fullWeekdaysParse[i] &&
	              ((this._fullWeekdaysParse[i] = new RegExp(
	                "^" + this.weekdays(mom, "").replace(".", "\\.?") + "$",
	                "i"
	              )),
	              (this._shortWeekdaysParse[i] = new RegExp(
	                "^" + this.weekdaysShort(mom, "").replace(".", "\\.?") + "$",
	                "i"
	              )),
	              (this._minWeekdaysParse[i] = new RegExp(
	                "^" + this.weekdaysMin(mom, "").replace(".", "\\.?") + "$",
	                "i"
	              )));
	            this._weekdaysParse[i] ||
	              ((mom =
	                "^" +
	                this.weekdays(mom, "") +
	                "|^" +
	                this.weekdaysShort(mom, "") +
	                "|^" +
	                this.weekdaysMin(mom, "")),
	              (this._weekdaysParse[i] = new RegExp(mom.replace(".", ""), "i")));
	            if (
	              (strict &&
	                "dddd" === format &&
	                this._fullWeekdaysParse[i].test(weekdayName)) ||
	              (strict &&
	                "ddd" === format &&
	                this._shortWeekdaysParse[i].test(weekdayName)) ||
	              (strict &&
	                "dd" === format &&
	                this._minWeekdaysParse[i].test(weekdayName)) ||
	              (!strict && this._weekdaysParse[i].test(weekdayName))
	            )
	              return i;
	          }
	        };
	        proto$1.weekdaysRegex = function(isStrict) {
	          if (this._weekdaysParseExact)
	            return (
	              hasOwnProp(this, "_weekdaysRegex") ||
	                computeWeekdaysParse.call(this),
	              isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex
	            );
	          hasOwnProp(this, "_weekdaysRegex") ||
	            (this._weekdaysRegex = matchWord);
	          return this._weekdaysStrictRegex && isStrict
	            ? this._weekdaysStrictRegex
	            : this._weekdaysRegex;
	        };
	        proto$1.weekdaysShortRegex = function(isStrict) {
	          if (this._weekdaysParseExact)
	            return (
	              hasOwnProp(this, "_weekdaysRegex") ||
	                computeWeekdaysParse.call(this),
	              isStrict
	                ? this._weekdaysShortStrictRegex
	                : this._weekdaysShortRegex
	            );
	          hasOwnProp(this, "_weekdaysShortRegex") ||
	            (this._weekdaysShortRegex = matchWord);
	          return this._weekdaysShortStrictRegex && isStrict
	            ? this._weekdaysShortStrictRegex
	            : this._weekdaysShortRegex;
	        };
	        proto$1.weekdaysMinRegex = function(isStrict) {
	          if (this._weekdaysParseExact)
	            return (
	              hasOwnProp(this, "_weekdaysRegex") ||
	                computeWeekdaysParse.call(this),
	              isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex
	            );
	          hasOwnProp(this, "_weekdaysMinRegex") ||
	            (this._weekdaysMinRegex = matchWord);
	          return this._weekdaysMinStrictRegex && isStrict
	            ? this._weekdaysMinStrictRegex
	            : this._weekdaysMinRegex;
	        };
	        proto$1.isPM = function(input) {
	          return "p" === (input + "").toLowerCase().charAt(0);
	        };
	        proto$1.meridiem = function(hours, minutes, isLower) {
	          return 11 < hours ? (isLower ? "pm" : "PM") : isLower ? "am" : "AM";
	        };
	        getSetGlobalLocale("en", {
	          dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
	          ordinal: function(number) {
	            var b = number % 10;
	            b =
	              1 === toInt((number % 100) / 10)
	                ? "th"
	                : 1 === b
	                ? "st"
	                : 2 === b
	                ? "nd"
	                : 3 === b
	                ? "rd"
	                : "th";
	            return number + b;
	          }
	        });
	        hooks.lang = deprecate(
	          "moment.lang is deprecated. Use moment.locale instead.",
	          getSetGlobalLocale
	        );
	        hooks.langData = deprecate(
	          "moment.langData is deprecated. Use moment.localeData instead.",
	          getLocale
	        );
	        var mathAbs = Math.abs,
	          asMilliseconds = makeAs("ms"),
	          asSeconds = makeAs("s"),
	          asMinutes = makeAs("m"),
	          asHours = makeAs("h"),
	          asDays = makeAs("d"),
	          asWeeks = makeAs("w"),
	          asMonths = makeAs("M"),
	          asQuarters = makeAs("Q"),
	          asYears = makeAs("y"),
	          milliseconds = makeGetter("milliseconds"),
	          seconds$jscomp$0 = makeGetter("seconds"),
	          minutes$jscomp$0 = makeGetter("minutes"),
	          hours$jscomp$0 = makeGetter("hours"),
	          days = makeGetter("days"),
	          months = makeGetter("months"),
	          years = makeGetter("years"),
	          round = Math.round,
	          thresholds = { ss: 44, s: 45, m: 45, h: 22, d: 26, M: 11 },
	          abs$1 = Math.abs,
	          proto$2 = Duration.prototype;
	        proto$2.isValid = function() {
	          return this._isValid;
	        };
	        proto$2.abs = function() {
	          var data = this._data;
	          this._milliseconds = mathAbs(this._milliseconds);
	          this._days = mathAbs(this._days);
	          this._months = mathAbs(this._months);
	          data.milliseconds = mathAbs(data.milliseconds);
	          data.seconds = mathAbs(data.seconds);
	          data.minutes = mathAbs(data.minutes);
	          data.hours = mathAbs(data.hours);
	          data.months = mathAbs(data.months);
	          data.years = mathAbs(data.years);
	          return this;
	        };
	        proto$2.add = function(input, value) {
	          return addSubtract$1(this, input, value, 1);
	        };
	        proto$2.subtract = function(input, value) {
	          return addSubtract$1(this, input, value, -1);
	        };
	        proto$2.as = function(units) {
	          if (!this.isValid()) return NaN;
	          var milliseconds = this._milliseconds;
	          units = normalizeUnits(units);
	          if ("month" === units || "quarter" === units || "year" === units) {
	            var days = this._days + milliseconds / 864e5;
	            days = this._months + (4800 * days) / 146097;
	            switch (units) {
	              case "month":
	                return days;
	              case "quarter":
	                return days / 3;
	              case "year":
	                return days / 12;
	            }
	          } else
	            switch (
	              ((days = this._days + Math.round((146097 * this._months) / 4800)),
	              units)
	            ) {
	              case "week":
	                return days / 7 + milliseconds / 6048e5;
	              case "day":
	                return days + milliseconds / 864e5;
	              case "hour":
	                return 24 * days + milliseconds / 36e5;
	              case "minute":
	                return 1440 * days + milliseconds / 6e4;
	              case "second":
	                return 86400 * days + milliseconds / 1e3;
	              case "millisecond":
	                return Math.floor(864e5 * days) + milliseconds;
	              default:
	                throw Error("Unknown unit " + units);
	            }
	        };
	        proto$2.asMilliseconds = asMilliseconds;
	        proto$2.asSeconds = asSeconds;
	        proto$2.asMinutes = asMinutes;
	        proto$2.asHours = asHours;
	        proto$2.asDays = asDays;
	        proto$2.asWeeks = asWeeks;
	        proto$2.asMonths = asMonths;
	        proto$2.asQuarters = asQuarters;
	        proto$2.asYears = asYears;
	        proto$2.valueOf = function() {
	          return this.isValid()
	            ? this._milliseconds +
	                864e5 * this._days +
	                (this._months % 12) * 2592e6 +
	                31536e6 * toInt(this._months / 12)
	            : NaN;
	        };
	        proto$2._bubble = function() {
	          var milliseconds = this._milliseconds,
	            days = this._days,
	            months = this._months,
	            data = this._data;
	          (0 <= milliseconds && 0 <= days && 0 <= months) ||
	            (0 >= milliseconds && 0 >= days && 0 >= months) ||
	            ((milliseconds += 864e5 * absCeil((146097 * months) / 4800 + days)),
	            (months = days = 0));
	          data.milliseconds = milliseconds % 1e3;
	          milliseconds = absFloor(milliseconds / 1e3);
	          data.seconds = milliseconds % 60;
	          milliseconds = absFloor(milliseconds / 60);
	          data.minutes = milliseconds % 60;
	          milliseconds = absFloor(milliseconds / 60);
	          data.hours = milliseconds % 24;
	          days += absFloor(milliseconds / 24);
	          milliseconds = absFloor((4800 * days) / 146097);
	          months += milliseconds;
	          days -= absCeil((146097 * milliseconds) / 4800);
	          milliseconds = absFloor(months / 12);
	          data.days = days;
	          data.months = months % 12;
	          data.years = milliseconds;
	          return this;
	        };
	        proto$2.clone = function() {
	          return createDuration(this);
	        };
	        proto$2.get = function(units) {
	          units = normalizeUnits(units);
	          return this.isValid() ? this[units + "s"]() : NaN;
	        };
	        proto$2.milliseconds = milliseconds;
	        proto$2.seconds = seconds$jscomp$0;
	        proto$2.minutes = minutes$jscomp$0;
	        proto$2.hours = hours$jscomp$0;
	        proto$2.days = days;
	        proto$2.weeks = function() {
	          return absFloor(this.days() / 7);
	        };
	        proto$2.months = months;
	        proto$2.years = years;
	        proto$2.humanize = function(withSuffix) {
	          if (!this.isValid()) return this.localeData().invalidDate();
	          var locale = this.localeData();
	          var output = !withSuffix;
	          var duration = createDuration(this).abs(),
	            seconds = round(duration.as("s")),
	            minutes = round(duration.as("m")),
	            hours = round(duration.as("h")),
	            days = round(duration.as("d")),
	            months = round(duration.as("M"));
	          duration = round(duration.as("y"));
	          seconds = (seconds <= thresholds.ss && ["s", seconds]) ||
	            (seconds < thresholds.s && ["ss", seconds]) ||
	            (1 >= minutes && ["m"]) ||
	            (minutes < thresholds.m && ["mm", minutes]) ||
	            (1 >= hours && ["h"]) ||
	            (hours < thresholds.h && ["hh", hours]) ||
	            (1 >= days && ["d"]) ||
	            (days < thresholds.d && ["dd", days]) ||
	            (1 >= months && ["M"]) ||
	            (months < thresholds.M && ["MM", months]) ||
	            (1 >= duration && ["y"]) || ["yy", duration];
	          seconds[2] = output;
	          seconds[3] = 0 < +this;
	          seconds[4] = locale;
	          output = substituteTimeAgo.apply(null, seconds);
	          withSuffix && (output = locale.pastFuture(+this, output));
	          return locale.postformat(output);
	        };
	        proto$2.toISOString = toISOString$1;
	        proto$2.toString = toISOString$1;
	        proto$2.toJSON = toISOString$1;
	        proto$2.locale = locale$jscomp$1;
	        proto$2.localeData = localeData;
	        proto$2.toIsoString = deprecate(
	          "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
	          toISOString$1
	        );
	        proto$2.lang = lang;
	        addFormatToken("X", 0, 0, "unix");
	        addFormatToken("x", 0, 0, "valueOf");
	        addRegexToken("x", matchSigned);
	        addRegexToken("X", /[+-]?\d+(\.\d{1,3})?/);
	        addParseToken("X", function(input, array, config) {
	          config._d = new Date(1e3 * parseFloat(input, 10));
	        });
	        addParseToken("x", function(input, array, config) {
	          config._d = new Date(toInt(input));
	        });
	        hooks.version = "2.24.0";
	        var hookCallback = createLocal;
	        hooks.fn = proto;
	        hooks.min = function() {
	          var args = [].slice.call(arguments, 0);
	          return pickBy("isBefore", args);
	        };
	        hooks.max = function() {
	          var args = [].slice.call(arguments, 0);
	          return pickBy("isAfter", args);
	        };
	        hooks.now = function() {
	          return Date.now ? Date.now() : +new Date();
	        };
	        hooks.utc = createUTC;
	        hooks.unix = function(input) {
	          return createLocal(1e3 * input);
	        };
	        hooks.months = function(format, index) {
	          return listMonthsImpl(format, index, "months");
	        };
	        hooks.isDate = isDate;
	        hooks.locale = getSetGlobalLocale;
	        hooks.invalid = createInvalid;
	        hooks.duration = createDuration;
	        hooks.isMoment = isMoment;
	        hooks.weekdays = function(localeSorted, format, index) {
	          return listWeekdaysImpl(localeSorted, format, index, "weekdays");
	        };
	        hooks.parseZone = function() {
	          return createLocal.apply(null, arguments).parseZone();
	        };
	        hooks.localeData = getLocale;
	        hooks.isDuration = isDuration;
	        hooks.monthsShort = function(format, index) {
	          return listMonthsImpl(format, index, "monthsShort");
	        };
	        hooks.weekdaysMin = function(localeSorted, format, index) {
	          return listWeekdaysImpl(localeSorted, format, index, "weekdaysMin");
	        };
	        hooks.defineLocale = defineLocale;
	        hooks.updateLocale = function(name, config) {
	          if (null != config) {
	            var parentConfig = baseConfig;
	            var tmpLocale = loadLocale(name);
	            null != tmpLocale && (parentConfig = tmpLocale._config);
	            config = mergeConfigs(parentConfig, config);
	            config = new Locale(config);
	            config.parentLocale = locales[name];
	            locales[name] = config;
	            getSetGlobalLocale(name);
	          } else
	            null != locales[name] &&
	              (null != locales[name].parentLocale
	                ? (locales[name] = locales[name].parentLocale)
	                : null != locales[name] && delete locales[name]);
	          return locales[name];
	        };
	        hooks.locales = function() {
	          return keys(locales);
	        };
	        hooks.weekdaysShort = function(localeSorted, format, index) {
	          return listWeekdaysImpl(localeSorted, format, index, "weekdaysShort");
	        };
	        hooks.normalizeUnits = normalizeUnits;
	        hooks.relativeTimeRounding = function(roundingFunction) {
	          return void 0 === roundingFunction
	            ? round
	            : "function" === typeof roundingFunction
	            ? ((round = roundingFunction), !0)
	            : !1;
	        };
	        hooks.relativeTimeThreshold = function(threshold, limit) {
	          if (void 0 === thresholds[threshold]) return !1;
	          if (void 0 === limit) return thresholds[threshold];
	          thresholds[threshold] = limit;
	          "s" === threshold && (thresholds.ss = limit - 1);
	          return !0;
	        };
	        hooks.calendarFormat = function(myMoment, now) {
	          myMoment = myMoment.diff(now, "days", !0);
	          return -6 > myMoment
	            ? "sameElse"
	            : -1 > myMoment
	            ? "lastWeek"
	            : 0 > myMoment
	            ? "lastDay"
	            : 1 > myMoment
	            ? "sameDay"
	            : 2 > myMoment
	            ? "nextDay"
	            : 7 > myMoment
	            ? "nextWeek"
	            : "sameElse";
	        };
	        hooks.prototype = proto;
	        hooks.HTML5_FMT = {
	          DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
	          DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
	          DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
	          DATE: "YYYY-MM-DD",
	          TIME: "HH:mm",
	          TIME_SECONDS: "HH:mm:ss",
	          TIME_MS: "HH:mm:ss.SSS",
	          WEEK: "GGGG-[W]WW",
	          MONTH: "YYYY-MM"
	        };
	        return hooks;
	      });
	    }),
	    formatDistanceLocale = {
	      lessThanXSeconds: {
	        one: "less than a second",
	        other: "less than {{count}} seconds"
	      },
	      xSeconds: { one: "1 second", other: "{{count}} seconds" },
	      halfAMinute: "half a minute",
	      lessThanXMinutes: {
	        one: "less than a minute",
	        other: "less than {{count}} minutes"
	      },
	      xMinutes: { one: "1 minute", other: "{{count}} minutes" },
	      aboutXHours: { one: "about 1 hour", other: "about {{count}} hours" },
	      xHours: { one: "1 hour", other: "{{count}} hours" },
	      xDays: { one: "1 day", other: "{{count}} days" },
	      aboutXMonths: { one: "about 1 month", other: "about {{count}} months" },
	      xMonths: { one: "1 month", other: "{{count}} months" },
	      aboutXYears: { one: "about 1 year", other: "about {{count}} years" },
	      xYears: { one: "1 year", other: "{{count}} years" },
	      overXYears: { one: "over 1 year", other: "over {{count}} years" },
	      almostXYears: { one: "almost 1 year", other: "almost {{count}} years" }
	    },
	    formatLong = {
	      date: buildFormatLongFn({
	        formats: {
	          full: "EEEE, MMMM do, y",
	          long: "MMMM do, y",
	          medium: "MMM d, y",
	          short: "MM/dd/yyyy"
	        },
	        defaultWidth: "full"
	      }),
	      time: buildFormatLongFn({
	        formats: {
	          full: "h:mm:ss a zzzz",
	          long: "h:mm:ss a z",
	          medium: "h:mm:ss a",
	          short: "h:mm a"
	        },
	        defaultWidth: "full"
	      }),
	      dateTime: buildFormatLongFn({
	        formats: {
	          full: "{{date}} 'at' {{time}}",
	          long: "{{date}} 'at' {{time}}",
	          medium: "{{date}}, {{time}}",
	          short: "{{date}}, {{time}}"
	        },
	        defaultWidth: "full"
	      })
	    },
	    formatRelativeLocale = {
	      lastWeek: "'last' eeee 'at' p",
	      yesterday: "'yesterday at' p",
	      today: "'today at' p",
	      tomorrow: "'tomorrow at' p",
	      nextWeek: "eeee 'at' p",
	      other: "P"
	    },
	    localize = {
	      ordinalNumber: function(dirtyNumber) {
	        dirtyNumber = Number(dirtyNumber);
	        var rem100 = dirtyNumber % 100;
	        if (20 < rem100 || 10 > rem100)
	          switch (rem100 % 10) {
	            case 1:
	              return dirtyNumber + "st";
	            case 2:
	              return dirtyNumber + "nd";
	            case 3:
	              return dirtyNumber + "rd";
	          }
	        return dirtyNumber + "th";
	      },
	      era: buildLocalizeFn({
	        values: {
	          narrow: ["B", "A"],
	          abbreviated: ["BC", "AD"],
	          wide: ["Before Christ", "Anno Domini"]
	        },
	        defaultWidth: "wide"
	      }),
	      quarter: buildLocalizeFn({
	        values: {
	          narrow: ["1", "2", "3", "4"],
	          abbreviated: ["Q1", "Q2", "Q3", "Q4"],
	          wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
	        },
	        defaultWidth: "wide",
	        argumentCallback: function(quarter) {
	          return Number(quarter) - 1;
	        }
	      }),
	      month: buildLocalizeFn({
	        values: {
	          narrow: "JFMAMJJASOND".split(""),
	          abbreviated: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(
	            " "
	          ),
	          wide: "January February March April May June July August September October November December".split(
	            " "
	          )
	        },
	        defaultWidth: "wide"
	      }),
	      day: buildLocalizeFn({
	        values: {
	          narrow: "SMTWTFS".split(""),
	          short: "Su Mo Tu We Th Fr Sa".split(" "),
	          abbreviated: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
	          wide: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(
	            " "
	          )
	        },
	        defaultWidth: "wide"
	      }),
	      dayPeriod: buildLocalizeFn({
	        values: {
	          narrow: {
	            am: "a",
	            pm: "p",
	            midnight: "mi",
	            noon: "n",
	            morning: "morning",
	            afternoon: "afternoon",
	            evening: "evening",
	            night: "night"
	          },
	          abbreviated: {
	            am: "AM",
	            pm: "PM",
	            midnight: "midnight",
	            noon: "noon",
	            morning: "morning",
	            afternoon: "afternoon",
	            evening: "evening",
	            night: "night"
	          },
	          wide: {
	            am: "a.m.",
	            pm: "p.m.",
	            midnight: "midnight",
	            noon: "noon",
	            morning: "morning",
	            afternoon: "afternoon",
	            evening: "evening",
	            night: "night"
	          }
	        },
	        defaultWidth: "wide",
	        formattingValues: {
	          narrow: {
	            am: "a",
	            pm: "p",
	            midnight: "mi",
	            noon: "n",
	            morning: "in the morning",
	            afternoon: "in the afternoon",
	            evening: "in the evening",
	            night: "at night"
	          },
	          abbreviated: {
	            am: "AM",
	            pm: "PM",
	            midnight: "midnight",
	            noon: "noon",
	            morning: "in the morning",
	            afternoon: "in the afternoon",
	            evening: "in the evening",
	            night: "at night"
	          },
	          wide: {
	            am: "a.m.",
	            pm: "p.m.",
	            midnight: "midnight",
	            noon: "noon",
	            morning: "in the morning",
	            afternoon: "in the afternoon",
	            evening: "in the evening",
	            night: "at night"
	          }
	        },
	        defaultFormattingWidth: "wide"
	      })
	    },
	    match = {
	      ordinalNumber: buildMatchPatternFn({
	        matchPattern: /^(\d+)(th|st|nd|rd)?/i,
	        parsePattern: /\d+/i,
	        valueCallback: function(value) {
	          return parseInt(value, 10);
	        }
	      }),
	      era: buildMatchFn({
	        matchPatterns: {
	          narrow: /^(b|a)/i,
	          abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
	          wide: /^(before christ|before common era|anno domini|common era)/i
	        },
	        defaultMatchWidth: "wide",
	        parsePatterns: { any: [/^b/i, /^(a|c)/i] },
	        defaultParseWidth: "any"
	      }),
	      quarter: buildMatchFn({
	        matchPatterns: {
	          narrow: /^[1234]/i,
	          abbreviated: /^q[1234]/i,
	          wide: /^[1234](th|st|nd|rd)? quarter/i
	        },
	        defaultMatchWidth: "wide",
	        parsePatterns: { any: [/1/i, /2/i, /3/i, /4/i] },
	        defaultParseWidth: "any",
	        valueCallback: function(index) {
	          return index + 1;
	        }
	      }),
	      month: buildMatchFn({
	        matchPatterns: {
	          narrow: /^[jfmasond]/i,
	          abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
	          wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
	        },
	        defaultMatchWidth: "wide",
	        parsePatterns: {
	          narrow: [
	            /^j/i,
	            /^f/i,
	            /^m/i,
	            /^a/i,
	            /^m/i,
	            /^j/i,
	            /^j/i,
	            /^a/i,
	            /^s/i,
	            /^o/i,
	            /^n/i,
	            /^d/i
	          ],
	          any: [
	            /^ja/i,
	            /^f/i,
	            /^mar/i,
	            /^ap/i,
	            /^may/i,
	            /^jun/i,
	            /^jul/i,
	            /^au/i,
	            /^s/i,
	            /^o/i,
	            /^n/i,
	            /^d/i
	          ]
	        },
	        defaultParseWidth: "any"
	      }),
	      day: buildMatchFn({
	        matchPatterns: {
	          narrow: /^[smtwf]/i,
	          short: /^(su|mo|tu|we|th|fr|sa)/i,
	          abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
	          wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
	        },
	        defaultMatchWidth: "wide",
	        parsePatterns: {
	          narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
	          any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
	        },
	        defaultParseWidth: "any"
	      }),
	      dayPeriod: buildMatchFn({
	        matchPatterns: {
	          narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
	          any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
	        },
	        defaultMatchWidth: "any",
	        parsePatterns: {
	          any: {
	            am: /^a/i,
	            pm: /^p/i,
	            midnight: /^mi/i,
	            noon: /^no/i,
	            morning: /morning/i,
	            afternoon: /afternoon/i,
	            evening: /evening/i,
	            night: /night/i
	          }
	        },
	        defaultParseWidth: "any"
	      })
	    },
	    locale = {
	      formatDistance: function(token, count, options) {
	        options = options || {};
	        token =
	          "string" === typeof formatDistanceLocale[token]
	            ? formatDistanceLocale[token]
	            : 1 === count
	            ? formatDistanceLocale[token].one
	            : formatDistanceLocale[token].other.replace("{{count}}", count);
	        return options.addSuffix
	          ? 0 < options.comparison
	            ? "in " + token
	            : token + " ago"
	          : token;
	      },
	      formatLong: formatLong,
	      formatRelative: function(token) {
	        return formatRelativeLocale[token];
	      },
	      localize: localize,
	      match: match,
	      options: { weekStartsOn: 0, firstWeekContainsDate: 1 }
	    },
	    formatters = {
	      y: function(date, token) {
	        date = date.getUTCFullYear();
	        date = 0 < date ? date : 1 - date;
	        return addLeadingZeros(
	          "yy" === token ? date % 100 : date,
	          token.length
	        );
	      },
	      M: function(date, token) {
	        date = date.getUTCMonth();
	        return "M" === token ? String(date + 1) : addLeadingZeros(date + 1, 2);
	      },
	      d: function(date, token) {
	        return addLeadingZeros(date.getUTCDate(), token.length);
	      },
	      a: function(date, token) {
	        date = 1 <= date.getUTCHours() / 12 ? "pm" : "am";
	        switch (token) {
	          case "a":
	          case "aa":
	          case "aaa":
	            return date.toUpperCase();
	          case "aaaaa":
	            return date[0];
	          default:
	            return "am" === date ? "a.m." : "p.m.";
	        }
	      },
	      h: function(date, token) {
	        return addLeadingZeros(date.getUTCHours() % 12 || 12, token.length);
	      },
	      H: function(date, token) {
	        return addLeadingZeros(date.getUTCHours(), token.length);
	      },
	      m: function(date, token) {
	        return addLeadingZeros(date.getUTCMinutes(), token.length);
	      },
	      s: function(date, token) {
	        return addLeadingZeros(date.getUTCSeconds(), token.length);
	      }
	    },
	    formatters$1 = {
	      G: function(date, token, localize) {
	        date = 0 < date.getUTCFullYear() ? 1 : 0;
	        switch (token) {
	          case "G":
	          case "GG":
	          case "GGG":
	            return localize.era(date, { width: "abbreviated" });
	          case "GGGGG":
	            return localize.era(date, { width: "narrow" });
	          default:
	            return localize.era(date, { width: "wide" });
	        }
	      },
	      y: function(date, token, localize) {
	        return "yo" === token
	          ? ((date = date.getUTCFullYear()),
	            localize.ordinalNumber(0 < date ? date : 1 - date, {
	              unit: "year"
	            }))
	          : formatters.y(date, token);
	      },
	      Y: function(date, token, localize, options) {
	        date = getUTCWeekYear(date, options);
	        date = 0 < date ? date : 1 - date;
	        return "YY" === token
	          ? addLeadingZeros(date % 100, 2)
	          : "Yo" === token
	          ? localize.ordinalNumber(date, { unit: "year" })
	          : addLeadingZeros(date, token.length);
	      },
	      R: function(date, token) {
	        date = getUTCISOWeekYear(date);
	        return addLeadingZeros(date, token.length);
	      },
	      u: function(date, token) {
	        date = date.getUTCFullYear();
	        return addLeadingZeros(date, token.length);
	      },
	      Q: function(date, token, localize) {
	        date = Math.ceil((date.getUTCMonth() + 1) / 3);
	        switch (token) {
	          case "Q":
	            return String(date);
	          case "QQ":
	            return addLeadingZeros(date, 2);
	          case "Qo":
	            return localize.ordinalNumber(date, { unit: "quarter" });
	          case "QQQ":
	            return localize.quarter(date, {
	              width: "abbreviated",
	              context: "formatting"
	            });
	          case "QQQQQ":
	            return localize.quarter(date, {
	              width: "narrow",
	              context: "formatting"
	            });
	          default:
	            return localize.quarter(date, {
	              width: "wide",
	              context: "formatting"
	            });
	        }
	      },
	      q: function(date, token, localize) {
	        date = Math.ceil((date.getUTCMonth() + 1) / 3);
	        switch (token) {
	          case "q":
	            return String(date);
	          case "qq":
	            return addLeadingZeros(date, 2);
	          case "qo":
	            return localize.ordinalNumber(date, { unit: "quarter" });
	          case "qqq":
	            return localize.quarter(date, {
	              width: "abbreviated",
	              context: "standalone"
	            });
	          case "qqqqq":
	            return localize.quarter(date, {
	              width: "narrow",
	              context: "standalone"
	            });
	          default:
	            return localize.quarter(date, {
	              width: "wide",
	              context: "standalone"
	            });
	        }
	      },
	      M: function(date, token, localize) {
	        var month = date.getUTCMonth();
	        switch (token) {
	          case "M":
	          case "MM":
	            return formatters.M(date, token);
	          case "Mo":
	            return localize.ordinalNumber(month + 1, { unit: "month" });
	          case "MMM":
	            return localize.month(month, {
	              width: "abbreviated",
	              context: "formatting"
	            });
	          case "MMMMM":
	            return localize.month(month, {
	              width: "narrow",
	              context: "formatting"
	            });
	          default:
	            return localize.month(month, {
	              width: "wide",
	              context: "formatting"
	            });
	        }
	      },
	      L: function(date, token, localize) {
	        date = date.getUTCMonth();
	        switch (token) {
	          case "L":
	            return String(date + 1);
	          case "LL":
	            return addLeadingZeros(date + 1, 2);
	          case "Lo":
	            return localize.ordinalNumber(date + 1, { unit: "month" });
	          case "LLL":
	            return localize.month(date, {
	              width: "abbreviated",
	              context: "standalone"
	            });
	          case "LLLLL":
	            return localize.month(date, {
	              width: "narrow",
	              context: "standalone"
	            });
	          default:
	            return localize.month(date, {
	              width: "wide",
	              context: "standalone"
	            });
	        }
	      },
	      w: function(date, token, localize, options) {
	        date = getUTCWeek(date, options);
	        return "wo" === token
	          ? localize.ordinalNumber(date, { unit: "week" })
	          : addLeadingZeros(date, token.length);
	      },
	      I: function(date, token, localize) {
	        date = getUTCISOWeek(date);
	        return "Io" === token
	          ? localize.ordinalNumber(date, { unit: "week" })
	          : addLeadingZeros(date, token.length);
	      },
	      d: function(date, token, localize) {
	        return "do" === token
	          ? localize.ordinalNumber(date.getUTCDate(), { unit: "date" })
	          : formatters.d(date, token);
	      },
	      D: function(date, token, localize) {
	        date = getUTCDayOfYear(date);
	        return "Do" === token
	          ? localize.ordinalNumber(date, { unit: "dayOfYear" })
	          : addLeadingZeros(date, token.length);
	      },
	      E: function(date, token, localize) {
	        date = date.getUTCDay();
	        switch (token) {
	          case "E":
	          case "EE":
	          case "EEE":
	            return localize.day(date, {
	              width: "abbreviated",
	              context: "formatting"
	            });
	          case "EEEEE":
	            return localize.day(date, {
	              width: "narrow",
	              context: "formatting"
	            });
	          case "EEEEEE":
	            return localize.day(date, {
	              width: "short",
	              context: "formatting"
	            });
	          default:
	            return localize.day(date, { width: "wide", context: "formatting" });
	        }
	      },
	      e: function(date, token, localize, options) {
	        date = date.getUTCDay();
	        options = (date - options.weekStartsOn + 8) % 7 || 7;
	        switch (token) {
	          case "e":
	            return String(options);
	          case "ee":
	            return addLeadingZeros(options, 2);
	          case "eo":
	            return localize.ordinalNumber(options, { unit: "day" });
	          case "eee":
	            return localize.day(date, {
	              width: "abbreviated",
	              context: "formatting"
	            });
	          case "eeeee":
	            return localize.day(date, {
	              width: "narrow",
	              context: "formatting"
	            });
	          case "eeeeee":
	            return localize.day(date, {
	              width: "short",
	              context: "formatting"
	            });
	          default:
	            return localize.day(date, { width: "wide", context: "formatting" });
	        }
	      },
	      c: function(date, token, localize, options) {
	        date = date.getUTCDay();
	        options = (date - options.weekStartsOn + 8) % 7 || 7;
	        switch (token) {
	          case "c":
	            return String(options);
	          case "cc":
	            return addLeadingZeros(options, token.length);
	          case "co":
	            return localize.ordinalNumber(options, { unit: "day" });
	          case "ccc":
	            return localize.day(date, {
	              width: "abbreviated",
	              context: "standalone"
	            });
	          case "ccccc":
	            return localize.day(date, {
	              width: "narrow",
	              context: "standalone"
	            });
	          case "cccccc":
	            return localize.day(date, {
	              width: "short",
	              context: "standalone"
	            });
	          default:
	            return localize.day(date, { width: "wide", context: "standalone" });
	        }
	      },
	      i: function(date, token, localize) {
	        date = date.getUTCDay();
	        var isoDayOfWeek = 0 === date ? 7 : date;
	        switch (token) {
	          case "i":
	            return String(isoDayOfWeek);
	          case "ii":
	            return addLeadingZeros(isoDayOfWeek, token.length);
	          case "io":
	            return localize.ordinalNumber(isoDayOfWeek, { unit: "day" });
	          case "iii":
	            return localize.day(date, {
	              width: "abbreviated",
	              context: "formatting"
	            });
	          case "iiiii":
	            return localize.day(date, {
	              width: "narrow",
	              context: "formatting"
	            });
	          case "iiiiii":
	            return localize.day(date, {
	              width: "short",
	              context: "formatting"
	            });
	          default:
	            return localize.day(date, { width: "wide", context: "formatting" });
	        }
	      },
	      a: function(date, token, localize) {
	        date = 1 <= date.getUTCHours() / 12 ? "pm" : "am";
	        switch (token) {
	          case "a":
	          case "aa":
	          case "aaa":
	            return localize.dayPeriod(date, {
	              width: "abbreviated",
	              context: "formatting"
	            });
	          case "aaaaa":
	            return localize.dayPeriod(date, {
	              width: "narrow",
	              context: "formatting"
	            });
	          default:
	            return localize.dayPeriod(date, {
	              width: "wide",
	              context: "formatting"
	            });
	        }
	      },
	      b: function(date, token, localize) {
	        date = date.getUTCHours();
	        date =
	          12 === date
	            ? "noon"
	            : 0 === date
	            ? "midnight"
	            : 1 <= date / 12
	            ? "pm"
	            : "am";
	        switch (token) {
	          case "b":
	          case "bb":
	          case "bbb":
	            return localize.dayPeriod(date, {
	              width: "abbreviated",
	              context: "formatting"
	            });
	          case "bbbbb":
	            return localize.dayPeriod(date, {
	              width: "narrow",
	              context: "formatting"
	            });
	          default:
	            return localize.dayPeriod(date, {
	              width: "wide",
	              context: "formatting"
	            });
	        }
	      },
	      B: function(date, token, localize) {
	        date = date.getUTCHours();
	        date =
	          17 <= date
	            ? "evening"
	            : 12 <= date
	            ? "afternoon"
	            : 4 <= date
	            ? "morning"
	            : "night";
	        switch (token) {
	          case "B":
	          case "BB":
	          case "BBB":
	            return localize.dayPeriod(date, {
	              width: "abbreviated",
	              context: "formatting"
	            });
	          case "BBBBB":
	            return localize.dayPeriod(date, {
	              width: "narrow",
	              context: "formatting"
	            });
	          default:
	            return localize.dayPeriod(date, {
	              width: "wide",
	              context: "formatting"
	            });
	        }
	      },
	      h: function(date, token, localize) {
	        return "ho" === token
	          ? ((date = date.getUTCHours() % 12),
	            0 === date && (date = 12),
	            localize.ordinalNumber(date, { unit: "hour" }))
	          : formatters.h(date, token);
	      },
	      H: function(date, token, localize) {
	        return "Ho" === token
	          ? localize.ordinalNumber(date.getUTCHours(), { unit: "hour" })
	          : formatters.H(date, token);
	      },
	      K: function(date, token, localize) {
	        date = date.getUTCHours() % 12;
	        return "Ko" === token
	          ? localize.ordinalNumber(date, { unit: "hour" })
	          : addLeadingZeros(date, token.length);
	      },
	      k: function(date, token, localize) {
	        date = date.getUTCHours();
	        0 === date && (date = 24);
	        return "ko" === token
	          ? localize.ordinalNumber(date, { unit: "hour" })
	          : addLeadingZeros(date, token.length);
	      },
	      m: function(date, token, localize) {
	        return "mo" === token
	          ? localize.ordinalNumber(date.getUTCMinutes(), { unit: "minute" })
	          : formatters.m(date, token);
	      },
	      s: function(date, token, localize) {
	        return "so" === token
	          ? localize.ordinalNumber(date.getUTCSeconds(), { unit: "second" })
	          : formatters.s(date, token);
	      },
	      S: function(date, token) {
	        token = token.length;
	        date = date.getUTCMilliseconds();
	        return addLeadingZeros(
	          Math.floor(date * Math.pow(10, token - 3)),
	          token
	        );
	      },
	      X: function(date, token, _localize, options) {
	        date = (options._originalDate || date).getTimezoneOffset();
	        if (0 === date) return "Z";
	        switch (token) {
	          case "X":
	            return formatTimezoneWithOptionalMinutes(date);
	          case "XXXX":
	          case "XX":
	            return formatTimezone(date);
	          default:
	            return formatTimezone(date, ":");
	        }
	      },
	      x: function(date, token, _localize, options) {
	        date = (options._originalDate || date).getTimezoneOffset();
	        switch (token) {
	          case "x":
	            return formatTimezoneWithOptionalMinutes(date);
	          case "xxxx":
	          case "xx":
	            return formatTimezone(date);
	          default:
	            return formatTimezone(date, ":");
	        }
	      },
	      O: function(date, token, _localize, options) {
	        date = (options._originalDate || date).getTimezoneOffset();
	        switch (token) {
	          case "O":
	          case "OO":
	          case "OOO":
	            return "GMT" + formatTimezoneShort(date, ":");
	          default:
	            return "GMT" + formatTimezone(date, ":");
	        }
	      },
	      z: function(date, token, _localize, options) {
	        date = (options._originalDate || date).getTimezoneOffset();
	        switch (token) {
	          case "z":
	          case "zz":
	          case "zzz":
	            return "GMT" + formatTimezoneShort(date, ":");
	          default:
	            return "GMT" + formatTimezone(date, ":");
	        }
	      },
	      t: function(date, token, _localize, options) {
	        date = Math.floor((options._originalDate || date).getTime() / 1e3);
	        return addLeadingZeros(date, token.length);
	      },
	      T: function(date, token, _localize, options) {
	        date = (options._originalDate || date).getTime();
	        return addLeadingZeros(date, token.length);
	      }
	    },
	    longFormatters = {
	      p: timeLongFormatter,
	      P: function(pattern, formatLong) {
	        var matchResult = pattern.match(/(P+)(p+)?/),
	          datePattern = matchResult[1];
	        matchResult = matchResult[2];
	        if (!matchResult) return dateLongFormatter(pattern, formatLong);
	        switch (datePattern) {
	          case "P":
	            pattern = formatLong.dateTime({ width: "short" });
	            break;
	          case "PP":
	            pattern = formatLong.dateTime({ width: "medium" });
	            break;
	          case "PPP":
	            pattern = formatLong.dateTime({ width: "long" });
	            break;
	          default:
	            pattern = formatLong.dateTime({ width: "full" });
	        }
	        return pattern
	          .replace("{{date}}", dateLongFormatter(datePattern, formatLong))
	          .replace("{{time}}", timeLongFormatter(matchResult, formatLong));
	      }
	    },
	    protectedTokens = ["D", "DD", "YY", "YYYY"],
	    formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
	    longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
	    escapedStringRegExp = /^'(.*?)'?$/,
	    doubleQuoteRegExp = /''/g,
	    numericPatterns = {
	      month: /^(1[0-2]|0?\d)/,
	      date: /^(3[0-1]|[0-2]?\d)/,
	      dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
	      week: /^(5[0-3]|[0-4]?\d)/,
	      hour23h: /^(2[0-3]|[0-1]?\d)/,
	      hour24h: /^(2[0-4]|[0-1]?\d)/,
	      hour11h: /^(1[0-1]|0?\d)/,
	      hour12h: /^(1[0-2]|0?\d)/,
	      minute: /^[0-5]?\d/,
	      second: /^[0-5]?\d/,
	      singleDigit: /^\d/,
	      twoDigits: /^\d{1,2}/,
	      threeDigits: /^\d{1,3}/,
	      fourDigits: /^\d{1,4}/,
	      anyDigitsSigned: /^-?\d+/,
	      singleDigitSigned: /^-?\d/,
	      twoDigitsSigned: /^-?\d{1,2}/,
	      threeDigitsSigned: /^-?\d{1,3}/,
	      fourDigitsSigned: /^-?\d{1,4}/
	    },
	    JSCompiler_object_inline_basicOptionalMinutes_236 = /^([+-])(\d{2})(\d{2})?|Z/,
	    JSCompiler_object_inline_basic_237 = /^([+-])(\d{2})(\d{2})|Z/,
	    JSCompiler_object_inline_basicOptionalSeconds_238 = /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
	    JSCompiler_object_inline_extended_239 = /^([+-])(\d{2}):(\d{2})|Z/,
	    JSCompiler_object_inline_extendedOptionalSeconds_240 = /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/,
	    DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
	    DAYS_IN_MONTH_LEAP_YEAR = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
	    parsers = {
	      G: {
	        priority: 140,
	        parse: function(string, token, match) {
	          switch (token) {
	            case "G":
	            case "GG":
	            case "GGG":
	              return (
	                match.era(string, { width: "abbreviated" }) ||
	                match.era(string, { width: "narrow" })
	              );
	            case "GGGGG":
	              return match.era(string, { width: "narrow" });
	            default:
	              return (
	                match.era(string, { width: "wide" }) ||
	                match.era(string, { width: "abbreviated" }) ||
	                match.era(string, { width: "narrow" })
	              );
	          }
	        },
	        set: function(date, flags, value) {
	          date.setUTCFullYear(1 === value ? 10 : -9, 0, 1);
	          date.setUTCHours(0, 0, 0, 0);
	          return date;
	        }
	      },
	      y: {
	        priority: 130,
	        parse: function(string, token, match) {
	          function valueCallback(year) {
	            return { year: year, isTwoDigitYear: "yy" === token };
	          }
	          switch (token) {
	            case "y":
	              return parseNDigits(4, string, valueCallback);
	            case "yo":
	              return match.ordinalNumber(string, {
	                unit: "year",
	                valueCallback: valueCallback
	              });
	            default:
	              return parseNDigits(token.length, string, valueCallback);
	          }
	        },
	        validate: function(date, value) {
	          return value.isTwoDigitYear || 0 < value.year;
	        },
	        set: function(date, flags, value, options) {
	          flags = getUTCWeekYear(date, options);
	          if (value.isTwoDigitYear)
	            return (
	              (value = normalizeTwoDigitYear(value.year, flags)),
	              date.setUTCFullYear(value, 0, 1),
	              date.setUTCHours(0, 0, 0, 0),
	              date
	            );
	          date.setUTCFullYear(0 < flags ? value.year : 1 - value.year, 0, 1);
	          date.setUTCHours(0, 0, 0, 0);
	          return date;
	        }
	      },
	      Y: {
	        priority: 130,
	        parse: function(string, token, match) {
	          function valueCallback(year) {
	            return { year: year, isTwoDigitYear: "YY" === token };
	          }
	          switch (token) {
	            case "Y":
	              return parseNDigits(4, string, valueCallback);
	            case "Yo":
	              return match.ordinalNumber(string, {
	                unit: "year",
	                valueCallback: valueCallback
	              });
	            default:
	              return parseNDigits(token.length, string, valueCallback);
	          }
	        },
	        validate: function(date, value) {
	          return value.isTwoDigitYear || 0 < value.year;
	        },
	        set: function(date, flags, value, options) {
	          flags = date.getUTCFullYear();
	          if (value.isTwoDigitYear)
	            return (
	              (value = normalizeTwoDigitYear(value.year, flags)),
	              date.setUTCFullYear(value, 0, options.firstWeekContainsDate),
	              date.setUTCHours(0, 0, 0, 0),
	              startOfUTCWeek(date, options)
	            );
	          date.setUTCFullYear(
	            0 < flags ? value.year : 1 - value.year,
	            0,
	            options.firstWeekContainsDate
	          );
	          date.setUTCHours(0, 0, 0, 0);
	          return startOfUTCWeek(date, options);
	        }
	      },
	      R: {
	        priority: 130,
	        parse: function(string, token) {
	          return "R" === token
	            ? parseNDigitsSigned(4, string)
	            : parseNDigitsSigned(token.length, string);
	        },
	        set: function(date, flags, value) {
	          date = new Date(0);
	          date.setUTCFullYear(value, 0, 4);
	          date.setUTCHours(0, 0, 0, 0);
	          return startOfUTCISOWeek(date);
	        }
	      },
	      u: {
	        priority: 130,
	        parse: function(string, token) {
	          return "u" === token
	            ? parseNDigitsSigned(4, string)
	            : parseNDigitsSigned(token.length, string);
	        },
	        set: function(date, flags, value) {
	          date.setUTCFullYear(value, 0, 1);
	          date.setUTCHours(0, 0, 0, 0);
	          return date;
	        }
	      },
	      Q: {
	        priority: 120,
	        parse: function(string, token, match) {
	          switch (token) {
	            case "Q":
	            case "QQ":
	              return parseNDigits(token.length, string);
	            case "Qo":
	              return match.ordinalNumber(string, { unit: "quarter" });
	            case "QQQ":
	              return (
	                match.quarter(string, {
	                  width: "abbreviated",
	                  context: "formatting"
	                }) ||
	                match.quarter(string, {
	                  width: "narrow",
	                  context: "formatting"
	                })
	              );
	            case "QQQQQ":
	              return match.quarter(string, {
	                width: "narrow",
	                context: "formatting"
	              });
	            default:
	              return (
	                match.quarter(string, {
	                  width: "wide",
	                  context: "formatting"
	                }) ||
	                match.quarter(string, {
	                  width: "abbreviated",
	                  context: "formatting"
	                }) ||
	                match.quarter(string, {
	                  width: "narrow",
	                  context: "formatting"
	                })
	              );
	          }
	        },
	        validate: function(date, value) {
	          return 1 <= value && 4 >= value;
	        },
	        set: function(date, flags, value) {
	          date.setUTCMonth(3 * (value - 1), 1);
	          date.setUTCHours(0, 0, 0, 0);
	          return date;
	        }
	      },
	      q: {
	        priority: 120,
	        parse: function(string, token, match) {
	          switch (token) {
	            case "q":
	            case "qq":
	              return parseNDigits(token.length, string);
	            case "qo":
	              return match.ordinalNumber(string, { unit: "quarter" });
	            case "qqq":
	              return (
	                match.quarter(string, {
	                  width: "abbreviated",
	                  context: "standalone"
	                }) ||
	                match.quarter(string, {
	                  width: "narrow",
	                  context: "standalone"
	                })
	              );
	            case "qqqqq":
	              return match.quarter(string, {
	                width: "narrow",
	                context: "standalone"
	              });
	            default:
	              return (
	                match.quarter(string, {
	                  width: "wide",
	                  context: "standalone"
	                }) ||
	                match.quarter(string, {
	                  width: "abbreviated",
	                  context: "standalone"
	                }) ||
	                match.quarter(string, {
	                  width: "narrow",
	                  context: "standalone"
	                })
	              );
	          }
	        },
	        validate: function(date, value) {
	          return 1 <= value && 4 >= value;
	        },
	        set: function(date, flags, value) {
	          date.setUTCMonth(3 * (value - 1), 1);
	          date.setUTCHours(0, 0, 0, 0);
	          return date;
	        }
	      },
	      M: {
	        priority: 110,
	        parse: function(string, token, match) {
	          function valueCallback(value) {
	            return value - 1;
	          }
	          switch (token) {
	            case "M":
	              return parseNumericPattern(
	                numericPatterns.month,
	                string,
	                valueCallback
	              );
	            case "MM":
	              return parseNDigits(2, string, valueCallback);
	            case "Mo":
	              return match.ordinalNumber(string, {
	                unit: "month",
	                valueCallback: valueCallback
	              });
	            case "MMM":
	              return (
	                match.month(string, {
	                  width: "abbreviated",
	                  context: "formatting"
	                }) ||
	                match.month(string, { width: "narrow", context: "formatting" })
	              );
	            case "MMMMM":
	              return match.month(string, {
	                width: "narrow",
	                context: "formatting"
	              });
	            default:
	              return (
	                match.month(string, { width: "wide", context: "formatting" }) ||
	                match.month(string, {
	                  width: "abbreviated",
	                  context: "formatting"
	                }) ||
	                match.month(string, { width: "narrow", context: "formatting" })
	              );
	          }
	        },
	        validate: function(date, value) {
	          return 0 <= value && 11 >= value;
	        },
	        set: function(date, flags, value) {
	          date.setUTCMonth(value, 1);
	          date.setUTCHours(0, 0, 0, 0);
	          return date;
	        }
	      },
	      L: {
	        priority: 110,
	        parse: function(string, token, match) {
	          function valueCallback(value) {
	            return value - 1;
	          }
	          switch (token) {
	            case "L":
	              return parseNumericPattern(
	                numericPatterns.month,
	                string,
	                valueCallback
	              );
	            case "LL":
	              return parseNDigits(2, string, valueCallback);
	            case "Lo":
	              return match.ordinalNumber(string, {
	                unit: "month",
	                valueCallback: valueCallback
	              });
	            case "LLL":
	              return (
	                match.month(string, {
	                  width: "abbreviated",
	                  context: "standalone"
	                }) ||
	                match.month(string, { width: "narrow", context: "standalone" })
	              );
	            case "LLLLL":
	              return match.month(string, {
	                width: "narrow",
	                context: "standalone"
	              });
	            default:
	              return (
	                match.month(string, { width: "wide", context: "standalone" }) ||
	                match.month(string, {
	                  width: "abbreviated",
	                  context: "standalone"
	                }) ||
	                match.month(string, { width: "narrow", context: "standalone" })
	              );
	          }
	        },
	        validate: function(date, value) {
	          return 0 <= value && 11 >= value;
	        },
	        set: function(date, flags, value) {
	          date.setUTCMonth(value, 1);
	          date.setUTCHours(0, 0, 0, 0);
	          return date;
	        }
	      },
	      w: {
	        priority: 100,
	        parse: function(string, token, match) {
	          switch (token) {
	            case "w":
	              return parseNumericPattern(numericPatterns.week, string);
	            case "wo":
	              return match.ordinalNumber(string, { unit: "week" });
	            default:
	              return parseNDigits(token.length, string);
	          }
	        },
	        validate: function(date, value) {
	          return 1 <= value && 53 >= value;
	        },
	        set: function(date, flags, value, options) {
	          return startOfUTCWeek(setUTCWeek(date, value, options), options);
	        }
	      },
	      I: {
	        priority: 100,
	        parse: function(string, token, match) {
	          switch (token) {
	            case "I":
	              return parseNumericPattern(numericPatterns.week, string);
	            case "Io":
	              return match.ordinalNumber(string, { unit: "week" });
	            default:
	              return parseNDigits(token.length, string);
	          }
	        },
	        validate: function(date, value) {
	          return 1 <= value && 53 >= value;
	        },
	        set: function(date, flags, value, options) {
	          return startOfUTCISOWeek(
	            setUTCISOWeek(date, value, options),
	            options
	          );
	        }
	      },
	      d: {
	        priority: 90,
	        parse: function(string, token, match) {
	          switch (token) {
	            case "d":
	              return parseNumericPattern(numericPatterns.date, string);
	            case "do":
	              return match.ordinalNumber(string, { unit: "date" });
	            default:
	              return parseNDigits(token.length, string);
	          }
	        },
	        validate: function(date, value) {
	          var year = date.getUTCFullYear();
	          year = 0 === year % 400 || (0 === year % 4 && 0 !== year % 100);
	          date = date.getUTCMonth();
	          return year
	            ? 1 <= value && value <= DAYS_IN_MONTH_LEAP_YEAR[date]
	            : 1 <= value && value <= DAYS_IN_MONTH[date];
	        },
	        set: function(date, flags, value) {
	          date.setUTCDate(value);
	          date.setUTCHours(0, 0, 0, 0);
	          return date;
	        }
	      },
	      D: {
	        priority: 90,
	        parse: function(string, token, match) {
	          switch (token) {
	            case "D":
	            case "DD":
	              return parseNumericPattern(numericPatterns.dayOfYear, string);
	            case "Do":
	              return match.ordinalNumber(string, { unit: "date" });
	            default:
	              return parseNDigits(token.length, string);
	          }
	        },
	        validate: function(date, value) {
	          date = date.getUTCFullYear();
	          return 0 === date % 400 || (0 === date % 4 && 0 !== date % 100)
	            ? 1 <= value && 366 >= value
	            : 1 <= value && 365 >= value;
	        },
	        set: function(date, flags, value) {
	          date.setUTCMonth(0, value);
	          date.setUTCHours(0, 0, 0, 0);
	          return date;
	        }
	      },
	      E: {
	        priority: 90,
	        parse: function(string, token, match) {
	          switch (token) {
	            case "E":
	            case "EE":
	            case "EEE":
	              return (
	                match.day(string, {
	                  width: "abbreviated",
	                  context: "formatting"
	                }) ||
	                match.day(string, { width: "short", context: "formatting" }) ||
	                match.day(string, { width: "narrow", context: "formatting" })
	              );
	            case "EEEEE":
	              return match.day(string, {
	                width: "narrow",
	                context: "formatting"
	              });
	            case "EEEEEE":
	              return (
	                match.day(string, { width: "short", context: "formatting" }) ||
	                match.day(string, { width: "narrow", context: "formatting" })
	              );
	            default:
	              return (
	                match.day(string, { width: "wide", context: "formatting" }) ||
	                match.day(string, {
	                  width: "abbreviated",
	                  context: "formatting"
	                }) ||
	                match.day(string, { width: "short", context: "formatting" }) ||
	                match.day(string, { width: "narrow", context: "formatting" })
	              );
	          }
	        },
	        validate: function(date, value) {
	          return 0 <= value && 6 >= value;
	        },
	        set: function(date, flags, value, options) {
	          date = setUTCDay(date, value, options);
	          date.setUTCHours(0, 0, 0, 0);
	          return date;
	        }
	      },
	      e: {
	        priority: 90,
	        parse: function(string, token, match, options) {
	          function valueCallback(value) {
	            return (
	              ((value + options.weekStartsOn + 6) % 7) +
	              7 * Math.floor((value - 1) / 7)
	            );
	          }
	          switch (token) {
	            case "e":
	            case "ee":
	              return parseNDigits(token.length, string, valueCallback);
	            case "eo":
	              return match.ordinalNumber(string, {
	                unit: "day",
	                valueCallback: valueCallback
	              });
	            case "eee":
	              return (
	                match.day(string, {
	                  width: "abbreviated",
	                  context: "formatting"
	                }) ||
	                match.day(string, { width: "short", context: "formatting" }) ||
	                match.day(string, { width: "narrow", context: "formatting" })
	              );
	            case "eeeee":
	              return match.day(string, {
	                width: "narrow",
	                context: "formatting"
	              });
	            case "eeeeee":
	              return (
	                match.day(string, { width: "short", context: "formatting" }) ||
	                match.day(string, { width: "narrow", context: "formatting" })
	              );
	            default:
	              return (
	                match.day(string, { width: "wide", context: "formatting" }) ||
	                match.day(string, {
	                  width: "abbreviated",
	                  context: "formatting"
	                }) ||
	                match.day(string, { width: "short", context: "formatting" }) ||
	                match.day(string, { width: "narrow", context: "formatting" })
	              );
	          }
	        },
	        validate: function(date, value) {
	          return 0 <= value && 6 >= value;
	        },
	        set: function(date, flags, value, options) {
	          date = setUTCDay(date, value, options);
	          date.setUTCHours(0, 0, 0, 0);
	          return date;
	        }
	      },
	      c: {
	        priority: 90,
	        parse: function(string, token, match, options) {
	          function valueCallback(value) {
	            return (
	              ((value + options.weekStartsOn + 6) % 7) +
	              7 * Math.floor((value - 1) / 7)
	            );
	          }
	          switch (token) {
	            case "c":
	            case "cc":
	              return parseNDigits(token.length, string, valueCallback);
	            case "co":
	              return match.ordinalNumber(string, {
	                unit: "day",
	                valueCallback: valueCallback
	              });
	            case "ccc":
	              return (
	                match.day(string, {
	                  width: "abbreviated",
	                  context: "standalone"
	                }) ||
	                match.day(string, { width: "short", context: "standalone" }) ||
	                match.day(string, { width: "narrow", context: "standalone" })
	              );
	            case "ccccc":
	              return match.day(string, {
	                width: "narrow",
	                context: "standalone"
	              });
	            case "cccccc":
	              return (
	                match.day(string, { width: "short", context: "standalone" }) ||
	                match.day(string, { width: "narrow", context: "standalone" })
	              );
	            default:
	              return (
	                match.day(string, { width: "wide", context: "standalone" }) ||
	                match.day(string, {
	                  width: "abbreviated",
	                  context: "standalone"
	                }) ||
	                match.day(string, { width: "short", context: "standalone" }) ||
	                match.day(string, { width: "narrow", context: "standalone" })
	              );
	          }
	        },
	        validate: function(date, value) {
	          return 0 <= value && 6 >= value;
	        },
	        set: function(date, flags, value, options) {
	          date = setUTCDay(date, value, options);
	          date.setUTCHours(0, 0, 0, 0);
	          return date;
	        }
	      },
	      i: {
	        priority: 90,
	        parse: function(string, token, match) {
	          function valueCallback(value) {
	            return 0 === value ? 7 : value;
	          }
	          switch (token) {
	            case "i":
	            case "ii":
	              return parseNDigits(token.length, string);
	            case "io":
	              return match.ordinalNumber(string, { unit: "day" });
	            case "iii":
	              return (
	                match.day(string, {
	                  width: "abbreviated",
	                  context: "formatting",
	                  valueCallback: valueCallback
	                }) ||
	                match.day(string, {
	                  width: "short",
	                  context: "formatting",
	                  valueCallback: valueCallback
	                }) ||
	                match.day(string, {
	                  width: "narrow",
	                  context: "formatting",
	                  valueCallback: valueCallback
	                })
	              );
	            case "iiiii":
	              return match.day(string, {
	                width: "narrow",
	                context: "formatting",
	                valueCallback: valueCallback
	              });
	            case "iiiiii":
	              return (
	                match.day(string, {
	                  width: "short",
	                  context: "formatting",
	                  valueCallback: valueCallback
	                }) ||
	                match.day(string, {
	                  width: "narrow",
	                  context: "formatting",
	                  valueCallback: valueCallback
	                })
	              );
	            default:
	              return (
	                match.day(string, {
	                  width: "wide",
	                  context: "formatting",
	                  valueCallback: valueCallback
	                }) ||
	                match.day(string, {
	                  width: "abbreviated",
	                  context: "formatting",
	                  valueCallback: valueCallback
	                }) ||
	                match.day(string, {
	                  width: "short",
	                  context: "formatting",
	                  valueCallback: valueCallback
	                }) ||
	                match.day(string, {
	                  width: "narrow",
	                  context: "formatting",
	                  valueCallback: valueCallback
	                })
	              );
	          }
	        },
	        validate: function(date, value) {
	          return 1 <= value && 7 >= value;
	        },
	        set: function(date, flags, value, options) {
	          date = setUTCISODay(date, value, options);
	          date.setUTCHours(0, 0, 0, 0);
	          return date;
	        }
	      },
	      a: {
	        priority: 80,
	        parse: function(string, token, match) {
	          switch (token) {
	            case "a":
	            case "aa":
	            case "aaa":
	              return (
	                match.dayPeriod(string, {
	                  width: "abbreviated",
	                  context: "formatting"
	                }) ||
	                match.dayPeriod(string, {
	                  width: "narrow",
	                  context: "formatting"
	                })
	              );
	            case "aaaaa":
	              return match.dayPeriod(string, {
	                width: "narrow",
	                context: "formatting"
	              });
	            default:
	              return (
	                match.dayPeriod(string, {
	                  width: "wide",
	                  context: "formatting"
	                }) ||
	                match.dayPeriod(string, {
	                  width: "abbreviated",
	                  context: "formatting"
	                }) ||
	                match.dayPeriod(string, {
	                  width: "narrow",
	                  context: "formatting"
	                })
	              );
	          }
	        },
	        set: function(date, flags, value) {
	          date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
	          return date;
	        }
	      },
	      b: {
	        priority: 80,
	        parse: function(string, token, match) {
	          switch (token) {
	            case "b":
	            case "bb":
	            case "bbb":
	              return (
	                match.dayPeriod(string, {
	                  width: "abbreviated",
	                  context: "formatting"
	                }) ||
	                match.dayPeriod(string, {
	                  width: "narrow",
	                  context: "formatting"
	                })
	              );
	            case "bbbbb":
	              return match.dayPeriod(string, {
	                width: "narrow",
	                context: "formatting"
	              });
	            default:
	              return (
	                match.dayPeriod(string, {
	                  width: "wide",
	                  context: "formatting"
	                }) ||
	                match.dayPeriod(string, {
	                  width: "abbreviated",
	                  context: "formatting"
	                }) ||
	                match.dayPeriod(string, {
	                  width: "narrow",
	                  context: "formatting"
	                })
	              );
	          }
	        },
	        set: function(date, flags, value) {
	          date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
	          return date;
	        }
	      },
	      B: {
	        priority: 80,
	        parse: function(string, token, match) {
	          switch (token) {
	            case "B":
	            case "BB":
	            case "BBB":
	              return (
	                match.dayPeriod(string, {
	                  width: "abbreviated",
	                  context: "formatting"
	                }) ||
	                match.dayPeriod(string, {
	                  width: "narrow",
	                  context: "formatting"
	                })
	              );
	            case "BBBBB":
	              return match.dayPeriod(string, {
	                width: "narrow",
	                context: "formatting"
	              });
	            default:
	              return (
	                match.dayPeriod(string, {
	                  width: "wide",
	                  context: "formatting"
	                }) ||
	                match.dayPeriod(string, {
	                  width: "abbreviated",
	                  context: "formatting"
	                }) ||
	                match.dayPeriod(string, {
	                  width: "narrow",
	                  context: "formatting"
	                })
	              );
	          }
	        },
	        set: function(date, flags, value) {
	          date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
	          return date;
	        }
	      },
	      h: {
	        priority: 70,
	        parse: function(string, token, match) {
	          switch (token) {
	            case "h":
	              return parseNumericPattern(numericPatterns.hour12h, string);
	            case "ho":
	              return match.ordinalNumber(string, { unit: "hour" });
	            default:
	              return parseNDigits(token.length, string);
	          }
	        },
	        validate: function(date, value) {
	          return 1 <= value && 12 >= value;
	        },
	        set: function(date, flags, value) {
	          (flags = 12 <= date.getUTCHours()) && 12 > value
	            ? date.setUTCHours(value + 12, 0, 0, 0)
	            : flags || 12 !== value
	            ? date.setUTCHours(value, 0, 0, 0)
	            : date.setUTCHours(0, 0, 0, 0);
	          return date;
	        }
	      },
	      H: {
	        priority: 70,
	        parse: function(string, token, match) {
	          switch (token) {
	            case "H":
	              return parseNumericPattern(numericPatterns.hour23h, string);
	            case "Ho":
	              return match.ordinalNumber(string, { unit: "hour" });
	            default:
	              return parseNDigits(token.length, string);
	          }
	        },
	        validate: function(date, value) {
	          return 0 <= value && 23 >= value;
	        },
	        set: function(date, flags, value) {
	          date.setUTCHours(value, 0, 0, 0);
	          return date;
	        }
	      },
	      K: {
	        priority: 70,
	        parse: function(string, token, match) {
	          switch (token) {
	            case "K":
	              return parseNumericPattern(numericPatterns.hour11h, string);
	            case "Ko":
	              return match.ordinalNumber(string, { unit: "hour" });
	            default:
	              return parseNDigits(token.length, string);
	          }
	        },
	        validate: function(date, value) {
	          return 0 <= value && 11 >= value;
	        },
	        set: function(date, flags, value) {
	          12 <= date.getUTCHours() && 12 > value
	            ? date.setUTCHours(value + 12, 0, 0, 0)
	            : date.setUTCHours(value, 0, 0, 0);
	          return date;
	        }
	      },
	      k: {
	        priority: 70,
	        parse: function(string, token, match) {
	          switch (token) {
	            case "k":
	              return parseNumericPattern(numericPatterns.hour24h, string);
	            case "ko":
	              return match.ordinalNumber(string, { unit: "hour" });
	            default:
	              return parseNDigits(token.length, string);
	          }
	        },
	        validate: function(date, value) {
	          return 1 <= value && 24 >= value;
	        },
	        set: function(date, flags, value) {
	          date.setUTCHours(24 >= value ? value % 24 : value, 0, 0, 0);
	          return date;
	        }
	      },
	      m: {
	        priority: 60,
	        parse: function(string, token, match) {
	          switch (token) {
	            case "m":
	              return parseNumericPattern(numericPatterns.minute, string);
	            case "mo":
	              return match.ordinalNumber(string, { unit: "minute" });
	            default:
	              return parseNDigits(token.length, string);
	          }
	        },
	        validate: function(date, value) {
	          return 0 <= value && 59 >= value;
	        },
	        set: function(date, flags, value) {
	          date.setUTCMinutes(value, 0, 0);
	          return date;
	        }
	      },
	      s: {
	        priority: 50,
	        parse: function(string, token, match) {
	          switch (token) {
	            case "s":
	              return parseNumericPattern(numericPatterns.second, string);
	            case "so":
	              return match.ordinalNumber(string, { unit: "second" });
	            default:
	              return parseNDigits(token.length, string);
	          }
	        },
	        validate: function(date, value) {
	          return 0 <= value && 59 >= value;
	        },
	        set: function(date, flags, value) {
	          date.setUTCSeconds(value, 0);
	          return date;
	        }
	      },
	      S: {
	        priority: 30,
	        parse: function(string, token) {
	          return parseNDigits(token.length, string, function(value) {
	            return Math.floor(value * Math.pow(10, -token.length + 3));
	          });
	        },
	        set: function(date, flags, value) {
	          date.setUTCMilliseconds(value);
	          return date;
	        }
	      },
	      X: {
	        priority: 10,
	        parse: function(string, token) {
	          switch (token) {
	            case "X":
	              return parseTimezonePattern(
	                JSCompiler_object_inline_basicOptionalMinutes_236,
	                string
	              );
	            case "XX":
	              return parseTimezonePattern(
	                JSCompiler_object_inline_basic_237,
	                string
	              );
	            case "XXXX":
	              return parseTimezonePattern(
	                JSCompiler_object_inline_basicOptionalSeconds_238,
	                string
	              );
	            case "XXXXX":
	              return parseTimezonePattern(
	                JSCompiler_object_inline_extendedOptionalSeconds_240,
	                string
	              );
	            default:
	              return parseTimezonePattern(
	                JSCompiler_object_inline_extended_239,
	                string
	              );
	          }
	        },
	        set: function(date, flags, value) {
	          return flags.timestampIsSet ? date : new Date(date.getTime() - value);
	        }
	      },
	      x: {
	        priority: 10,
	        parse: function(string, token) {
	          switch (token) {
	            case "x":
	              return parseTimezonePattern(
	                JSCompiler_object_inline_basicOptionalMinutes_236,
	                string
	              );
	            case "xx":
	              return parseTimezonePattern(
	                JSCompiler_object_inline_basic_237,
	                string
	              );
	            case "xxxx":
	              return parseTimezonePattern(
	                JSCompiler_object_inline_basicOptionalSeconds_238,
	                string
	              );
	            case "xxxxx":
	              return parseTimezonePattern(
	                JSCompiler_object_inline_extendedOptionalSeconds_240,
	                string
	              );
	            default:
	              return parseTimezonePattern(
	                JSCompiler_object_inline_extended_239,
	                string
	              );
	          }
	        },
	        set: function(date, flags, value) {
	          return flags.timestampIsSet ? date : new Date(date.getTime() - value);
	        }
	      },
	      t: {
	        priority: 40,
	        parse: function(string) {
	          return parseNumericPattern(
	            numericPatterns.anyDigitsSigned,
	            string,
	            void 0
	          );
	        },
	        set: function(date, flags, value) {
	          return [new Date(1e3 * value), { timestampIsSet: !0 }];
	        }
	      },
	      T: {
	        priority: 20,
	        parse: function(string) {
	          return parseNumericPattern(
	            numericPatterns.anyDigitsSigned,
	            string,
	            void 0
	          );
	        },
	        set: function(date, flags, value) {
	          return [new Date(value), { timestampIsSet: !0 }];
	        }
	      }
	    },
	    formattingTokensRegExp$2 = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
	    escapedStringRegExp$2 = /^'(.*?)'?$/,
	    doubleQuoteRegExp$2 = /''/g,
	    notWhitespaceRegExp = /\S/,
	    formatDistanceLocale$e = {
	      lessThanXSeconds: {
	        one: "1\u79d2\u672a\u6e80",
	        other: "{{count}}\u79d2\u672a\u6e80"
	      },
	      xSeconds: { one: "1\u79d2", other: "{{count}}\u79d2" },
	      halfAMinute: "30\u79d2",
	      lessThanXMinutes: {
	        one: "1\u5206\u672a\u6e80",
	        other: "{{count}}\u5206\u672a\u6e80"
	      },
	      xMinutes: { one: "1\u5206", other: "{{count}}\u5206" },
	      aboutXHours: {
	        one: "\u7d041\u6642\u9593",
	        other: "\u7d04{{count}}\u6642\u9593"
	      },
	      xHours: { one: "1\u6642\u9593", other: "{{count}}\u6642\u9593" },
	      xDays: { one: "1\u65e5", other: "{{count}}\u65e5" },
	      aboutXMonths: {
	        one: "\u7d041\u304b\u6708",
	        other: "\u7d04{{count}}\u304b\u6708"
	      },
	      xMonths: { one: "1\u304b\u6708", other: "{{count}}\u304b\u6708" },
	      aboutXYears: { one: "\u7d041\u5e74", other: "\u7d04{{count}}\u5e74" },
	      xYears: { one: "1\u5e74", other: "{{count}}\u5e74" },
	      overXYears: {
	        one: "1\u5e74\u4ee5\u4e0a",
	        other: "{{count}}\u5e74\u4ee5\u4e0a"
	      },
	      almostXYears: {
	        one: "1\u5e74\u8fd1\u304f",
	        other: "{{count}}\u5e74\u8fd1\u304f"
	      }
	    },
	    formatLong$g = {
	      date: buildFormatLongFn({
	        formats: {
	          full: "y\u5e74M\u6708d\u65e5EEEE",
	          long: "y\u5e74M\u6708d\u65e5",
	          medium: "y/MM/dd",
	          short: "y/MM/dd"
	        },
	        defaultWidth: "full"
	      }),
	      time: buildFormatLongFn({
	        formats: {
	          full: "H\u6642mm\u5206ss\u79d2 zzzz",
	          long: "H:mm:ss z",
	          medium: "H:mm:ss",
	          short: "H:mm"
	        },
	        defaultWidth: "full"
	      }),
	      dateTime: buildFormatLongFn({
	        formats: {
	          full: "{{date}} {{time}}",
	          long: "{{date}} {{time}}",
	          medium: "{{date}} {{time}}",
	          short: "{{date}} {{time}}"
	        },
	        defaultWidth: "full"
	      })
	    },
	    formatRelativeLocale$e = {
	      lastWeek: "\u524d\u306eeeee\u306ep",
	      yesterday: "\u6628\u65e5\u306ep",
	      today: "\u4eca\u65e5\u306ep",
	      tomorrow: "\u660e\u65e5\u306ep",
	      nextWeek: "\u6b21\u306eeeee\u306ep",
	      other: "P"
	    },
	    localize$e = {
	      ordinalNumber: function(dirtyNumber) {
	        return Number(dirtyNumber);
	      },
	      era: buildLocalizeFn({
	        values: {
	          narrow: ["BC", "AC"],
	          abbreviated: ["\u7d00\u5143\u524d", "\u897f\u66a6"],
	          wide: ["\u7d00\u5143\u524d", "\u897f\u66a6"]
	        },
	        defaultWidth: "wide"
	      }),
	      quarter: buildLocalizeFn({
	        values: {
	          narrow: ["1", "2", "3", "4"],
	          abbreviated: ["Q1", "Q2", "Q3", "Q4"],
	          wide: [
	            "\u7b2c1\u56db\u534a\u671f",
	            "\u7b2c2\u56db\u534a\u671f",
	            "\u7b2c3\u56db\u534a\u671f",
	            "\u7b2c4\u56db\u534a\u671f"
	          ]
	        },
	        defaultWidth: "wide",
	        argumentCallback: function(quarter) {
	          return Number(quarter) - 1;
	        }
	      }),
	      month: buildLocalizeFn({
	        values: {
	          narrow: "1 2 3 4 5 6 7 8 9 10 11 12".split(" "),
	          abbreviated: "1\u6708 2\u6708 3\u6708 4\u6708 5\u6708 6\u6708 7\u6708 8\u6708 9\u6708 10\u6708 11\u6708 12\u6708".split(
	            " "
	          ),
	          wide: "1\u6708 2\u6708 3\u6708 4\u6708 5\u6708 6\u6708 7\u6708 8\u6708 9\u6708 10\u6708 11\u6708 12\u6708".split(
	            " "
	          )
	        },
	        defaultWidth: "wide"
	      }),
	      day: buildLocalizeFn({
	        values: {
	          narrow: "\u65e5\u6708\u706b\u6c34\u6728\u91d1\u571f".split(""),
	          short: "\u65e5\u6708\u706b\u6c34\u6728\u91d1\u571f".split(""),
	          abbreviated: "\u65e5\u6708\u706b\u6c34\u6728\u91d1\u571f".split(""),
	          wide: "\u65e5\u66dc\u65e5 \u6708\u66dc\u65e5 \u706b\u66dc\u65e5 \u6c34\u66dc\u65e5 \u6728\u66dc\u65e5 \u91d1\u66dc\u65e5 \u571f\u66dc\u65e5".split(
	            " "
	          )
	        },
	        defaultWidth: "wide"
	      }),
	      dayPeriod: buildLocalizeFn({
	        values: {
	          narrow: {
	            am: "\u5348\u524d",
	            pm: "\u5348\u5f8c",
	            midnight: "\u6df1\u591c",
	            noon: "\u6b63\u5348",
	            morning: "\u671d",
	            afternoon: "\u5348\u5f8c",
	            evening: "\u591c",
	            night: "\u6df1\u591c"
	          },
	          abbreviated: {
	            am: "\u5348\u524d",
	            pm: "\u5348\u5f8c",
	            midnight: "\u6df1\u591c",
	            noon: "\u6b63\u5348",
	            morning: "\u671d",
	            afternoon: "\u5348\u5f8c",
	            evening: "\u591c",
	            night: "\u6df1\u591c"
	          },
	          wide: {
	            am: "\u5348\u524d",
	            pm: "\u5348\u5f8c",
	            midnight: "\u6df1\u591c",
	            noon: "\u6b63\u5348",
	            morning: "\u671d",
	            afternoon: "\u5348\u5f8c",
	            evening: "\u591c",
	            night: "\u6df1\u591c"
	          }
	        },
	        defaultWidth: "wide",
	        formattingValues: {
	          narrow: {
	            am: "\u5348\u524d",
	            pm: "\u5348\u5f8c",
	            midnight: "\u6df1\u591c",
	            noon: "\u6b63\u5348",
	            morning: "\u671d",
	            afternoon: "\u5348\u5f8c",
	            evening: "\u591c",
	            night: "\u6df1\u591c"
	          },
	          abbreviated: {
	            am: "\u5348\u524d",
	            pm: "\u5348\u5f8c",
	            midnight: "\u6df1\u591c",
	            noon: "\u6b63\u5348",
	            morning: "\u671d",
	            afternoon: "\u5348\u5f8c",
	            evening: "\u591c",
	            night: "\u6df1\u591c"
	          },
	          wide: {
	            am: "\u5348\u524d",
	            pm: "\u5348\u5f8c",
	            midnight: "\u6df1\u591c",
	            noon: "\u6b63\u5348",
	            morning: "\u671d",
	            afternoon: "\u5348\u5f8c",
	            evening: "\u591c",
	            night: "\u6df1\u591c"
	          }
	        },
	        defaultFormattingWidth: "wide"
	      })
	    },
	    match$e = {
	      ordinalNumber: buildMatchPatternFn({
	        matchPattern: /^\u7b2c?\d+/i,
	        parsePattern: /\d+/i,
	        valueCallback: function(value) {
	          return parseInt(value, 10);
	        }
	      }),
	      era: buildMatchFn({
	        matchPatterns: {
	          narrow: /^(B\.?C\.?|A\.?D\.?)/i,
	          abbreviated: /^(\u7d00\u5143[\u524d\u5f8c]|\u897f\u66a6)/i,
	          wide: /^(\u7d00\u5143[\u524d\u5f8c]|\u897f\u66a6)/i
	        },
	        defaultMatchWidth: "wide",
	        parsePatterns: {
	          narrow: [/^B/i, /^A/i],
	          any: [/^(\u7d00\u5143\u524d)/i, /^(\u897f\u66a6|\u7d00\u5143\u5f8c)/i]
	        },
	        defaultParseWidth: "any"
	      }),
	      quarter: buildMatchFn({
	        matchPatterns: {
	          narrow: /^[1234]/i,
	          abbreviated: /^Q[1234]/i,
	          wide: /^\u7b2c[1234\u4e00\u4e8c\u4e09\u56db\uff11\uff12\uff13\uff14]\u56db\u534a\u671f/i
	        },
	        defaultMatchWidth: "wide",
	        parsePatterns: {
	          any: [
	            /(1|\u4e00|\uff11)/i,
	            /(2|\u4e8c|\uff12)/i,
	            /(3|\u4e09|\uff13)/i,
	            /(4|\u56db|\uff14)/i
	          ]
	        },
	        defaultParseWidth: "any",
	        valueCallback: function(index) {
	          return index + 1;
	        }
	      }),
	      month: buildMatchFn({
	        matchPatterns: {
	          narrow: /^([123456789]|1[012])/,
	          abbreviated: /^([123456789]|1[012])\u6708/i,
	          wide: /^([123456789]|1[012])\u6708/i
	        },
	        defaultMatchWidth: "wide",
	        parsePatterns: {
	          any: [
	            /^1/,
	            /^2/,
	            /^3/,
	            /^4/,
	            /^5/,
	            /^6/,
	            /^7/,
	            /^8/,
	            /^9/,
	            /^10/,
	            /^11/,
	            /^12/
	          ]
	        },
	        defaultParseWidth: "any"
	      }),
	      day: buildMatchFn({
	        matchPatterns: {
	          narrow: /^[\u65e5\u6708\u706b\u6c34\u6728\u91d1\u571f]/,
	          short: /^[\u65e5\u6708\u706b\u6c34\u6728\u91d1\u571f]/,
	          abbreviated: /^[\u65e5\u6708\u706b\u6c34\u6728\u91d1\u571f]/,
	          wide: /^[\u65e5\u6708\u706b\u6c34\u6728\u91d1\u571f]\u66dc\u65e5/
	        },
	        defaultMatchWidth: "wide",
	        parsePatterns: {
	          any: [
	            /^\u65e5/,
	            /^\u6708/,
	            /^\u706b/,
	            /^\u6c34/,
	            /^\u6728/,
	            /^\u91d1/,
	            /^\u571f/
	          ]
	        },
	        defaultParseWidth: "any"
	      }),
	      dayPeriod: buildMatchFn({
	        matchPatterns: {
	          any: /^(AM|PM|\u5348\u524d|\u5348\u5f8c|\u6b63\u5348|\u6df1\u591c|\u771f\u591c\u4e2d|\u591c|\u671d)/i
	        },
	        defaultMatchWidth: "any",
	        parsePatterns: {
	          any: {
	            am: /^(A|\u5348\u524d)/i,
	            pm: /^(P|\u5348\u5f8c)/i,
	            midnight: /^\u6df1\u591c|\u771f\u591c\u4e2d/i,
	            noon: /^\u6b63\u5348/i,
	            morning: /^\u671d/i,
	            afternoon: /^\u5348\u5f8c/i,
	            evening: /^\u591c/i,
	            night: /^\u6df1\u591c/i
	          }
	        },
	        defaultParseWidth: "any"
	      })
	    },
	    locale$g = {
	      formatDistance: function(token, count, options) {
	        options = options || {};
	        token =
	          "string" === typeof formatDistanceLocale$e[token]
	            ? formatDistanceLocale$e[token]
	            : 1 === count
	            ? formatDistanceLocale$e[token].one
	            : formatDistanceLocale$e[token].other.replace("{{count}}", count);
	        return options.addSuffix
	          ? 0 < options.comparison
	            ? token + "\u5f8c"
	            : token + "\u524d"
	          : token;
	      },
	      formatLong: formatLong$g,
	      formatRelative: function(token) {
	        return formatRelativeLocale$e[token];
	      },
	      localize: localize$e,
	      match: match$e,
	      options: { weekStartsOn: 1, firstWeekContainsDate: 1 }
	    },
	    date$jscomp$2 = Object.freeze({
	      checkDate: function(dateString) {
	        if (isValid(dateString)) return dateString;
	        throw Error("".concat(dateString, ' is "Invalid Date".'));
	      },
	      compareTimestamp: function(targetDate) {
	        var now = moment()
	          .locale("ja")
	          .format("x");
	        targetDate = moment(targetDate)
	          .locale("ja")
	          .format("x");
	        return now > targetDate ? !1 : !0;
	      },
	      convertTime: function(date$jscomp$0, formatToken, formatString$jscomp$0) {
	        var LocaleOption = { locale: locale$g };
	        date$jscomp$0 = cond_1([
	          [
	            function(date) {
	              return "Object" === type_1(date);
	            },
	            function(_ref) {
	              var month = _ref.month,
	                date = _ref.date;
	              return new Date(
	                _parseInt$2(_ref.year, 10),
	                _parseInt$2(month, 10) - 1,
	                _parseInt$2(date, 10)
	              );
	            }
	          ],
	          [
	            function(date) {
	              return "String" === type_1(date);
	            },
	            function(date, formatString) {
	              if (formatString) return parse(date, formatString, new Date());
	              console.error('date string parse need "formatString".');
	              return new Date();
	            }
	          ],
	          [
	            T_1,
	            function(date) {
	              console.error("".concat(date, " is mean Date?"));
	              return new Date();
	            }
	          ]
	        ])(date$jscomp$0, formatString$jscomp$0);
	        return format(date$jscomp$0, formatToken, LocaleOption);
	      },
	      getCurrentDatetime: function() {
	        return format(
	          new Date(),
	          0 < arguments.length && void 0 !== arguments[0]
	            ? arguments[0]
	            : "yyyy-MM-dd HH:mm:ss",
	          { locale: locale$g }
	        );
	      },
	      getCurrentTimestamp: function() {
	        return format(new Date(), "x", { locale: locale$g });
	      },
	      getDatetime: function(timestamp) {
	        var format$$1 =
	          2 < arguments.length && void 0 !== arguments[2]
	            ? arguments[2]
	            : "YYYY-MM-DD HH:mm:ss";
	        return (1 < arguments.length && void 0 !== arguments[1]
	        ? arguments[1]
	        : 1)
	          ? moment(1e3 * timestamp)
	              .locale("ja")
	              .format(format$$1)
	          : moment(timestamp)
	              .locale("ja")
	              .format(format$$1);
	      },
	      default: function(dateString, formatString) {
	        var formatToken =
	            2 < arguments.length && void 0 !== arguments[2]
	              ? arguments[2]
	              : "d",
	          LocaleOption = { locale: locale$g },
	          shapeDate = parse(dateString, formatString, new Date());
	        formatToken = format(shapeDate, formatToken, LocaleOption);
	        return "Invalid Date" === formatToken ? null : formatToken;
	      },
	      parseYear: function(dateString, formatString) {
	        var formatToken =
	            2 < arguments.length && void 0 !== arguments[2]
	              ? arguments[2]
	              : "d",
	          LocaleOption = { locale: locale$g },
	          shapeDate = parse(dateString, formatString, new Date());
	        formatToken = format(shapeDate, formatToken, LocaleOption);
	        return "Invalid Date" === formatToken ? null : formatToken;
	      },
	      parseMonth: function(dateString, formatString) {
	        var formatToken =
	            2 < arguments.length && void 0 !== arguments[2]
	              ? arguments[2]
	              : "M",
	          LocaleOption = { locale: locale$g },
	          shapeDate = parse(dateString, formatString, new Date());
	        formatToken = format(shapeDate, formatToken, LocaleOption);
	        return "Invalid Date" === formatToken ? null : formatToken;
	      }
	    }),
	    image = Object.freeze({
	      getCreditBrand: function(brandName) {
	        switch (brandName) {
	          case "Visa":
	            var result =
	              "https://s3-ap-northeast-1.amazonaws.com/assets.gemcook.com/icons/cards/visa.svg";
	            break;
	          case "MasterCard":
	            result =
	              "https://s3-ap-northeast-1.amazonaws.com/assets.gemcook.com/icons/cards/master.svg";
	            break;
	          case "JCB":
	            result =
	              "https://s3-ap-northeast-1.amazonaws.com/assets.gemcook.com/icons/cards/jcb.svg";
	            break;
	          case "American Express":
	            result =
	              "https://s3-ap-northeast-1.amazonaws.com/assets.gemcook.com/icons/cards/amex.svg";
	            break;
	          case "Diners Club":
	            result =
	              "https://s3-ap-northeast-1.amazonaws.com/assets.gemcook.com/icons/cards/diners.svg";
	            break;
	          case "Discover":
	            result =
	              "https://s3-ap-northeast-1.amazonaws.com/assets.gemcook.com/icons/cards/discover.svg";
	            break;
	          case "UnionPay":
	            result =
	              "https://s3-ap-northeast-1.amazonaws.com/assets.gemcook.com/icons/cards/normal.svg";
	            break;
	          case "Unknown":
	            result =
	              "https://s3-ap-northeast-1.amazonaws.com/assets.gemcook.com/icons/cards/normal.svg";
	        }
	        return result;
	      }
	    }),
	    http = Object.freeze({
	      isSuccess: function(response) {
	        if (200 <= response.status && 300 > response.status) return response;
	        throw response;
	      },
	      isRedirect: function(response) {
	        if (300 <= response.status && 400 > response.status) return response;
	        throw response;
	      },
	      isClientError: function(response) {
	        if (400 <= response.status && 500 > response.status) return response;
	        throw response;
	      },
	      isServerError: function(response) {
	        if (500 <= response.status && 600 > response.status) return response;
	        throw response;
	      }
	    }),
	    toString$2 = {}.toString,
	    _iobject = Object("z").propertyIsEnumerable(0)
	      ? Object
	      : function(it) {
	          return "String" == toString$2.call(it).slice(8, -1)
	            ? it.split("")
	            : Object(it);
	        },
	    JSCompiler_object_inline_f_241 = {}.propertyIsEnumerable,
	    gOPD = Object.getOwnPropertyDescriptor,
	    JSCompiler_object_inline_f_242 = _descriptors
	      ? gOPD
	      : function(O, P) {
	          O = _toIobject(O);
	          P = _toPrimitive(P, !0);
	          if (_ie8DomDefine)
	            try {
	              return gOPD(O, P);
	            } catch (e) {}
	          if (_has(O, P))
	            return _propertyDesc(
	              !JSCompiler_object_inline_f_241.call(O, P),
	              O[P]
	            );
	        },
	    $getOwnPropertyDescriptor = JSCompiler_object_inline_f_242;
	  _objectSap("getOwnPropertyDescriptor", function() {
	    return function(it, key) {
	      return $getOwnPropertyDescriptor(_toIobject(it), key);
	    };
	  });
	  var $Object = _core.Object,
	    id = 0,
	    px = Math.random(),
	    _meta = createCommonjsModule(function(module) {
	      function setMeta(it) {
	        setDesc(it, META, { value: { i: "O" + ++id, w: {} } });
	      }
	      var META = _uid("meta"),
	        setDesc = _objectDp.f,
	        id = 0,
	        isExtensible =
	          Object.isExtensible ||
	          function() {
	            return !0;
	          },
	        FREEZE = !_fails(function() {
	          return isExtensible(Object.preventExtensions({}));
	        }),
	        meta = (module.exports = {
	          KEY: META,
	          NEED: !1,
	          fastKey: function(it, create) {
	            if (!_isObject(it))
	              return "symbol" == typeof it
	                ? it
	                : ("string" == typeof it ? "S" : "P") + it;
	            if (!_has(it, META)) {
	              if (!isExtensible(it)) return "F";
	              if (!create) return "E";
	              setMeta(it);
	            }
	            return it[META].i;
	          },
	          getWeak: function(it, create) {
	            if (!_has(it, META)) {
	              if (!isExtensible(it)) return !0;
	              if (!create) return !1;
	              setMeta(it);
	            }
	            return it[META].w;
	          },
	          onFreeze: function(it) {
	            FREEZE &&
	              meta.NEED &&
	              isExtensible(it) &&
	              !_has(it, META) &&
	              setMeta(it);
	            return it;
	          }
	        });
	    }),
	    _shared = createCommonjsModule(function(module) {
	      var store =
	        _global["__core-js_shared__"] || (_global["__core-js_shared__"] = {});
	      (module.exports = function(key, value) {
	        return store[key] || (store[key] = void 0 !== value ? value : {});
	      })("versions", []).push({
	        version: _core.version,
	        mode: "pure",
	        copyright: "\u00a9 2019 Denis Pushkarev (zloirock.ru)"
	      });
	    }),
	    _wks = createCommonjsModule(function(module) {
	      var store = _shared("wks"),
	        Symbol = _global.Symbol,
	        USE_SYMBOL = "function" == typeof Symbol;
	      (module.exports = function(name) {
	        return (
	          store[name] ||
	          (store[name] =
	            (USE_SYMBOL && Symbol[name]) ||
	            (USE_SYMBOL ? Symbol : _uid)("Symbol." + name))
	        );
	      }).store = store;
	    }),
	    def = _objectDp.f,
	    TAG = _wks("toStringTag"),
	    _wksExt = { f: _wks },
	    defineProperty = _objectDp.f,
	    ceil = Math.ceil,
	    floor = Math.floor,
	    min$1 = Math.min,
	    max$2 = Math.max,
	    min$2 = Math.min,
	    shared = _shared("keys"),
	    arrayIndexOf = (function(IS_INCLUDES) {
	      return function($this, el, fromIndex) {
	        $this = _toIobject($this);
	        var length = $this.length;
	        length = 0 < length ? min$1(_toInteger(length), 9007199254740991) : 0;
	        fromIndex = _toInteger(fromIndex);
	        fromIndex =
	          0 > fromIndex
	            ? max$2(fromIndex + length, 0)
	            : min$2(fromIndex, length);
	        if (IS_INCLUDES && el != el)
	          for (; length > fromIndex; ) {
	            if (((el = $this[fromIndex++]), el != el)) return !0;
	          }
	        else
	          for (; length > fromIndex; fromIndex++)
	            if ((IS_INCLUDES || fromIndex in $this) && $this[fromIndex] === el)
	              return IS_INCLUDES || fromIndex || 0;
	        return !IS_INCLUDES && -1;
	      };
	    })(!1),
	    IE_PROTO = _sharedKey("IE_PROTO"),
	    _enumBugKeys = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(
	      " "
	    ),
	    _objectKeys =
	      Object.keys ||
	      function(O) {
	        return _objectKeysInternal(O, _enumBugKeys);
	      },
	    JSCompiler_object_inline_f_243 = Object.getOwnPropertySymbols,
	    _isArray$1 =
	      Array.isArray ||
	      function(arg) {
	        return "Array" == toString$2.call(arg).slice(8, -1);
	      },
	    _objectDps = _descriptors
	      ? Object.defineProperties
	      : function(O, Properties) {
	          _anObject(O);
	          for (
	            var keys = _objectKeys(Properties), length = keys.length, i = 0, P;
	            length > i;

	          )
	            _objectDp.f(O, (P = keys[i++]), Properties[P]);
	          return O;
	        },
	    document$1 = _global.document,
	    _html = document$1 && document$1.documentElement,
	    IE_PROTO$1 = _sharedKey("IE_PROTO"),
	    _objectCreate =
	      Object.create ||
	      function(O, Properties) {
	        if (null !== O) {
	          Empty.prototype = _anObject(O);
	          var result = new Empty();
	          Empty.prototype = null;
	          result[IE_PROTO$1] = O;
	        } else result = createDict();
	        return void 0 === Properties ? result : _objectDps(result, Properties);
	      },
	    hiddenKeys = _enumBugKeys.concat("length", "prototype"),
	    JSCompiler_object_inline_f_244 =
	      Object.getOwnPropertyNames ||
	      function(O) {
	        return _objectKeysInternal(O, hiddenKeys);
	      },
	    gOPN = JSCompiler_object_inline_f_244,
	    toString$3 = {}.toString,
	    windowNames =
	      "object" == typeof window && window && Object.getOwnPropertyNames
	        ? Object.getOwnPropertyNames(window)
	        : [],
	    META = _meta.KEY,
	    gOPD$1 = JSCompiler_object_inline_f_242,
	    dP$1 = _objectDp.f,
	    gOPN$1 = JSCompiler_object_inline_f_245,
	    $Symbol = _global.Symbol,
	    $JSON = _global.JSON,
	    _stringify = $JSON && $JSON.stringify,
	    HIDDEN = _wks("_hidden"),
	    TO_PRIMITIVE = _wks("toPrimitive"),
	    isEnum = {}.propertyIsEnumerable,
	    SymbolRegistry = _shared("symbol-registry"),
	    AllSymbols = _shared("symbols"),
	    OPSymbols = _shared("op-symbols"),
	    ObjectProto = Object.prototype,
	    USE_NATIVE = "function" == typeof $Symbol,
	    QObject = _global.QObject,
	    setter = !QObject || !QObject.prototype || !QObject.prototype.findChild,
	    setSymbolDesc =
	      _descriptors &&
	      _fails(function() {
	        return (
	          7 !=
	          _objectCreate(
	            dP$1({}, "a", {
	              get: function() {
	                return dP$1(this, "a", { value: 7 }).a;
	              }
	            })
	          ).a
	        );
	      })
	        ? function(it, key, D) {
	            var protoDesc = gOPD$1(ObjectProto, key);
	            protoDesc && delete ObjectProto[key];
	            dP$1(it, key, D);
	            protoDesc &&
	              it !== ObjectProto &&
	              dP$1(ObjectProto, key, protoDesc);
	          }
	        : dP$1,
	    isSymbol$1 =
	      USE_NATIVE && "symbol" == typeof $Symbol.iterator
	        ? function(it) {
	            return "symbol" == typeof it;
	          }
	        : function(it) {
	            return it instanceof $Symbol;
	          };
	  USE_NATIVE ||
	    (($Symbol = function() {
	      function $set(value) {
	        this === ObjectProto && $set.call(OPSymbols, value);
	        _has(this, HIDDEN) &&
	          _has(this[HIDDEN], tag) &&
	          (this[HIDDEN][tag] = !1);
	        setSymbolDesc(this, tag, _propertyDesc(1, value));
	      }
	      if (this instanceof $Symbol)
	        throw TypeError("Symbol is not a constructor!");
	      var tag = _uid(0 < arguments.length ? arguments[0] : void 0);
	      _descriptors &&
	        setter &&
	        setSymbolDesc(ObjectProto, tag, { configurable: !0, set: $set });
	      return wrap(tag);
	    }),
	    _hide($Symbol.prototype, "toString", function() {
	      return this._k;
	    }),
	    (JSCompiler_object_inline_f_242 = $getOwnPropertyDescriptor$1),
	    (_objectDp.f = $defineProperty),
	    (JSCompiler_object_inline_f_244 = JSCompiler_object_inline_f_245 = $getOwnPropertyNames),
	    (JSCompiler_object_inline_f_241 = $propertyIsEnumerable),
	    (JSCompiler_object_inline_f_243 = $getOwnPropertySymbols),
	    (_wksExt.f = function(name) {
	      return wrap(_wks(name));
	    }));
	  _export(_export.G + _export.W + _export.F * !USE_NATIVE, { Symbol: $Symbol });
	  for (
	    var es6Symbols = "hasInstance isConcatSpreadable iterator match replace search species split toPrimitive toStringTag unscopables".split(
	        " "
	      ),
	      j = 0;
	    es6Symbols.length > j;

	  )
	    _wks(es6Symbols[j++]);
	  for (
	    var wellKnownSymbols = _objectKeys(_wks.store), k = 0;
	    wellKnownSymbols.length > k;

	  )
	    _wksDefine(wellKnownSymbols[k++]);
	  _export(_export.S + _export.F * !USE_NATIVE, "Symbol", {
	    for: function(key) {
	      return _has(SymbolRegistry, (key += ""))
	        ? SymbolRegistry[key]
	        : (SymbolRegistry[key] = $Symbol(key));
	    },
	    keyFor: function(sym) {
	      if (!isSymbol$1(sym)) throw TypeError(sym + " is not a symbol!");
	      for (var key in SymbolRegistry)
	        if (SymbolRegistry[key] === sym) return key;
	    },
	    useSetter: function() {
	      setter = !0;
	    },
	    useSimple: function() {
	      setter = !1;
	    }
	  });
	  _export(_export.S + _export.F * !USE_NATIVE, "Object", {
	    create: function(it, P) {
	      return void 0 === P
	        ? _objectCreate(it)
	        : $defineProperties(_objectCreate(it), P);
	    },
	    defineProperty: $defineProperty,
	    defineProperties: $defineProperties,
	    getOwnPropertyDescriptor: $getOwnPropertyDescriptor$1,
	    getOwnPropertyNames: $getOwnPropertyNames,
	    getOwnPropertySymbols: $getOwnPropertySymbols
	  });
	  $JSON &&
	    _export(
	      _export.S +
	        _export.F *
	          (!USE_NATIVE ||
	            _fails(function() {
	              var S = $Symbol();
	              return (
	                "[null]" != _stringify([S]) ||
	                "{}" != _stringify({ a: S }) ||
	                "{}" != _stringify(Object(S))
	              );
	            })),
	      "JSON",
	      {
	        stringify: function(it) {
	          for (var args = [it], i = 1, $replacer; arguments.length > i; )
	            args.push(arguments[i++]);
	          $replacer = i = args[1];
	          if ((_isObject(i) || void 0 !== it) && !isSymbol$1(it))
	            return (
	              _isArray$1(i) ||
	                (i = function(key, value) {
	                  "function" == typeof $replacer &&
	                    (value = $replacer.call(this, key, value));
	                  if (!isSymbol$1(value)) return value;
	                }),
	              (args[1] = i),
	              _stringify.apply($JSON, args)
	            );
	        }
	      }
	    );
	  $Symbol.prototype[TO_PRIMITIVE] ||
	    _hide($Symbol.prototype, TO_PRIMITIVE, $Symbol.prototype.valueOf);
	  _setToStringTag($Symbol, "Symbol");
	  _setToStringTag(Math, "Math", !0);
	  _setToStringTag(_global.JSON, "JSON", !0);
	  var getOwnPropertySymbols$1 = _core.Object.getOwnPropertySymbols;
	  _objectSap("keys", function() {
	    return function(it) {
	      return _objectKeys(Object(_defined(it)));
	    };
	  });
	  var keys$3 = _core.Object.keys;
	  _export(_export.S + _export.F * !_descriptors, "Object", {
	    defineProperty: _objectDp.f
	  });
	  var $Object$1 = _core.Object,
	    _defineProperty$1 = (function() {
	      try {
	        var func = _getNative(Object, "defineProperty");
	        func({}, "", {});
	        return func;
	      } catch (e) {}
	    })(),
	    _baseFor = (function(fromRight) {
	      return function(object, iteratee, keysFunc) {
	        var index = -1,
	          iterable = Object(object);
	        keysFunc = keysFunc(object);
	        for (var length = keysFunc.length; length--; ) {
	          var key = keysFunc[fromRight ? length : ++index];
	          if (!1 === iteratee(iterable[key], key, iterable)) break;
	        }
	        return object;
	      };
	    })(),
	    _getPrototype = _overArg(Object.getPrototypeOf, Object),
	    funcToString$2 = Function.prototype.toString,
	    hasOwnProperty$a = Object.prototype.hasOwnProperty,
	    objectCtorString = funcToString$2.call(Object),
	    _deburrLetter = (function(object) {
	      return function(key) {
	        return null == object ? void 0 : object[key];
	      };
	    })({
	      À: "A",
	      Á: "A",
	      Â: "A",
	      Ã: "A",
	      Ä: "A",
	      Å: "A",
	      à: "a",
	      á: "a",
	      â: "a",
	      ã: "a",
	      ä: "a",
	      å: "a",
	      Ç: "C",
	      ç: "c",
	      Ð: "D",
	      ð: "d",
	      È: "E",
	      É: "E",
	      Ê: "E",
	      Ë: "E",
	      è: "e",
	      é: "e",
	      ê: "e",
	      ë: "e",
	      Ì: "I",
	      Í: "I",
	      Î: "I",
	      Ï: "I",
	      ì: "i",
	      í: "i",
	      î: "i",
	      ï: "i",
	      Ñ: "N",
	      ñ: "n",
	      Ò: "O",
	      Ó: "O",
	      Ô: "O",
	      Õ: "O",
	      Ö: "O",
	      Ø: "O",
	      ò: "o",
	      ó: "o",
	      ô: "o",
	      õ: "o",
	      ö: "o",
	      ø: "o",
	      Ù: "U",
	      Ú: "U",
	      Û: "U",
	      Ü: "U",
	      ù: "u",
	      ú: "u",
	      û: "u",
	      ü: "u",
	      Ý: "Y",
	      ý: "y",
	      ÿ: "y",
	      Æ: "Ae",
	      æ: "ae",
	      Þ: "Th",
	      þ: "th",
	      ß: "ss",
	      Ā: "A",
	      Ă: "A",
	      Ą: "A",
	      ā: "a",
	      ă: "a",
	      ą: "a",
	      Ć: "C",
	      Ĉ: "C",
	      Ċ: "C",
	      Č: "C",
	      ć: "c",
	      ĉ: "c",
	      ċ: "c",
	      č: "c",
	      Ď: "D",
	      Đ: "D",
	      ď: "d",
	      đ: "d",
	      Ē: "E",
	      Ĕ: "E",
	      Ė: "E",
	      Ę: "E",
	      Ě: "E",
	      ē: "e",
	      ĕ: "e",
	      ė: "e",
	      ę: "e",
	      ě: "e",
	      Ĝ: "G",
	      Ğ: "G",
	      Ġ: "G",
	      Ģ: "G",
	      ĝ: "g",
	      ğ: "g",
	      ġ: "g",
	      ģ: "g",
	      Ĥ: "H",
	      Ħ: "H",
	      ĥ: "h",
	      ħ: "h",
	      Ĩ: "I",
	      Ī: "I",
	      Ĭ: "I",
	      Į: "I",
	      İ: "I",
	      ĩ: "i",
	      ī: "i",
	      ĭ: "i",
	      į: "i",
	      ı: "i",
	      Ĵ: "J",
	      ĵ: "j",
	      Ķ: "K",
	      ķ: "k",
	      ĸ: "k",
	      Ĺ: "L",
	      Ļ: "L",
	      Ľ: "L",
	      Ŀ: "L",
	      Ł: "L",
	      ĺ: "l",
	      ļ: "l",
	      ľ: "l",
	      ŀ: "l",
	      ł: "l",
	      Ń: "N",
	      Ņ: "N",
	      Ň: "N",
	      Ŋ: "N",
	      ń: "n",
	      ņ: "n",
	      ň: "n",
	      ŋ: "n",
	      Ō: "O",
	      Ŏ: "O",
	      Ő: "O",
	      ō: "o",
	      ŏ: "o",
	      ő: "o",
	      Ŕ: "R",
	      Ŗ: "R",
	      Ř: "R",
	      ŕ: "r",
	      ŗ: "r",
	      ř: "r",
	      Ś: "S",
	      Ŝ: "S",
	      Ş: "S",
	      Š: "S",
	      ś: "s",
	      ŝ: "s",
	      ş: "s",
	      š: "s",
	      Ţ: "T",
	      Ť: "T",
	      Ŧ: "T",
	      ţ: "t",
	      ť: "t",
	      ŧ: "t",
	      Ũ: "U",
	      Ū: "U",
	      Ŭ: "U",
	      Ů: "U",
	      Ű: "U",
	      Ų: "U",
	      ũ: "u",
	      ū: "u",
	      ŭ: "u",
	      ů: "u",
	      ű: "u",
	      ų: "u",
	      Ŵ: "W",
	      ŵ: "w",
	      Ŷ: "Y",
	      ŷ: "y",
	      Ÿ: "Y",
	      Ź: "Z",
	      Ż: "Z",
	      Ž: "Z",
	      ź: "z",
	      ż: "z",
	      ž: "z",
	      Ĳ: "IJ",
	      ĳ: "ij",
	      Œ: "Oe",
	      œ: "oe",
	      ŉ: "'n",
	      ſ: "s"
	    }),
	    reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
	    reComboMark = /[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]/g,
	    reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,
	    reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,
	    reUnicodeWord = /[A-Z\xc0-\xd6\xd8-\xde]?[a-z\xdf-\xf6\xf8-\xff]+(?:['\u2019](?:d|ll|m|re|s|t|ve))?(?=[\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000]|[A-Z\xc0-\xd6\xd8-\xde]|$)|(?:[A-Z\xc0-\xd6\xd8-\xde]|[^\ud800-\udfff\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\d+\u2700-\u27bfa-z\xdf-\xf6\xf8-\xffA-Z\xc0-\xd6\xd8-\xde])+(?:['\u2019](?:D|LL|M|RE|S|T|VE))?(?=[\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000]|[A-Z\xc0-\xd6\xd8-\xde](?:[a-z\xdf-\xf6\xf8-\xff]|[^\ud800-\udfff\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\d+\u2700-\u27bfa-z\xdf-\xf6\xf8-\xffA-Z\xc0-\xd6\xd8-\xde])|$)|[A-Z\xc0-\xd6\xd8-\xde]?(?:[a-z\xdf-\xf6\xf8-\xff]|[^\ud800-\udfff\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\d+\u2700-\u27bfa-z\xdf-\xf6\xf8-\xffA-Z\xc0-\xd6\xd8-\xde])+(?:['\u2019](?:d|ll|m|re|s|t|ve))?|[A-Z\xc0-\xd6\xd8-\xde]+(?:['\u2019](?:D|LL|M|RE|S|T|VE))?|\d*(?:1ST|2ND|3RD|(?![123])\dTH)(?=\b|[a-z_])|\d*(?:1st|2nd|3rd|(?![123])\dth)(?=\b|[A-Z_])|\d+|(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|\ud83c[\udffb-\udfff])?)*/g,
	    reApos = /['\u2019]/g,
	    snakeCase_1 = _createCompounder(function(result, word, index) {
	      return result + (index ? "_" : "") + word.toLowerCase();
	    }),
	    reHasUnicode = /[\u200d\ud800-\udfff\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff\ufe0e\ufe0f]/,
	    reUnicode = /\ud83c[\udffb-\udfff](?=\ud83c[\udffb-\udfff])|(?:[^\ud800-\udfff][\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]?|[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|\ud83c[\udffb-\udfff])?)*/g,
	    upperFirst_1 = (function(methodName) {
	      return function(string) {
	        string = toString_1(string);
	        if (reHasUnicode.test(string)) {
	          var JSCompiler_temp = string;
	          JSCompiler_temp = reHasUnicode.test(JSCompiler_temp)
	            ? JSCompiler_temp.match(reUnicode) || []
	            : JSCompiler_temp.split("");
	        } else JSCompiler_temp = void 0;
	        var strSymbols = JSCompiler_temp;
	        JSCompiler_temp = strSymbols ? strSymbols[0] : string.charAt(0);
	        if (strSymbols) {
	          var end = void 0,
	            length = strSymbols.length;
	          string = 1;
	          var end$jscomp$0 = void 0 === end ? length : end;
	          end = -1;
	          length = strSymbols.length;
	          0 > string && (string = -string > length ? 0 : length + string);
	          end$jscomp$0 = end$jscomp$0 > length ? length : end$jscomp$0;
	          0 > end$jscomp$0 && (end$jscomp$0 += length);
	          length = string > end$jscomp$0 ? 0 : (end$jscomp$0 - string) >>> 0;
	          string >>>= 0;
	          for (end$jscomp$0 = Array(length); ++end < length; )
	            end$jscomp$0[end] = strSymbols[end + string];
	          strSymbols = end$jscomp$0.join("");
	        } else strSymbols = string.slice(1);
	        return JSCompiler_temp[methodName]() + strSymbols;
	      };
	    })("toUpperCase"),
	    camelCase_1 = _createCompounder(function(result, word, index) {
	      word = word.toLowerCase();
	      return (
	        result + (index ? upperFirst_1(toString_1(word).toLowerCase()) : word)
	      );
	    }),
	    Case = createCommonjsModule(function(module) {
	      (function() {
	        function regexps(symbols, lowers, uppers, impropers) {
	          symbols = symbols || basicSymbols;
	          lowers = lowers || baseLowerCase;
	          uppers = uppers || baseUpperCase;
	          return {
	            capitalize: new RegExp(
	              "(^|[" + symbols + "])([" + lowers + "])",
	              "g"
	            ),
	            pascal: new RegExp(
	              "(^|[" + symbols + "])+([" + lowers + uppers + "])",
	              "g"
	            ),
	            fill: new RegExp("[" + symbols + "]+(.|$)", "g"),
	            sentence: new RegExp(
	              '(^\\s*|[\\?\\!\\.]+"?\\s+"?|,\\s+")([' + lowers + "])",
	              "g"
	            ),
	            improper: new RegExp(
	              "\\b(" +
	                (impropers ||
	                  "A|An|And|As|At|But|By|En|For|If|In|Of|On|Or|The|To|Vs?\\.?|Via") +
	                ")\\b",
	              "g"
	            ),
	            relax: new RegExp(
	              "([^" +
	                uppers +
	                "])([" +
	                uppers +
	                "]*)([" +
	                uppers +
	                "])(?=[^" +
	                uppers +
	                "]|$)",
	              "g"
	            ),
	            upper: new RegExp("^[^" + lowers + "]+$"),
	            hole: /[^\s]\s[^\s]/,
	            apostrophe: /'/g,
	            room: new RegExp("[" + symbols + "]")
	          };
	        }
	        function unicodes(s, prefix) {
	          prefix = prefix || "";
	          return s
	            .replace(/(^|-)/g, "$1\\u" + prefix)
	            .replace(/,/g, "\\u" + prefix);
	        }
	        var basicSymbols = unicodes(
	            "20-26,28-2F,3A-40,5B-60,7B-7E,A0-BF,D7,F7",
	            "00"
	          ),
	          baseLowerCase = "a-z" + unicodes("DF-F6,F8-FF", "00"),
	          baseUpperCase = "A-Z" + unicodes("C0-D6,D8-DE", "00"),
	          re = regexps(),
	          _ = {
	            re: re,
	            unicodes: unicodes,
	            regexps: regexps,
	            types: [],
	            up: String.prototype.toUpperCase,
	            low: String.prototype.toLowerCase,
	            cap: function(s) {
	              return _.up.call(s.charAt(0)) + s.slice(1);
	            },
	            decap: function(s) {
	              return _.low.call(s.charAt(0)) + s.slice(1);
	            },
	            deapostrophe: function(s) {
	              return s.replace(re.apostrophe, "");
	            },
	            fill: function(s, fill, deapostrophe) {
	              null != fill &&
	                (s = s.replace(re.fill, function(m, next) {
	                  return next ? fill + next : "";
	                }));
	              deapostrophe && (s = _.deapostrophe(s));
	              return s;
	            },
	            prep: function(s, fill, pascal, upper) {
	              s = null == s ? "" : s + "";
	              !upper && re.upper.test(s) && (s = _.low.call(s));
	              fill ||
	                re.hole.test(s) ||
	                ((fill = _.fill(s, " ")), re.hole.test(fill) && (s = fill));
	              pascal || re.room.test(s) || (s = s.replace(re.relax, _.relax));
	              return s;
	            },
	            relax: function(m, before, acronym, caps) {
	              return before + " " + (acronym ? acronym + " " : "") + caps;
	            }
	          },
	          Case = {
	            _: _,
	            of: function(s) {
	              for (var i = 0, m = _.types.length; i < m; i++)
	                if (Case[_.types[i]].apply(Case, arguments) === s)
	                  return _.types[i];
	            },
	            flip: function(s) {
	              return s.replace(/\w/g, function(l) {
	                return (l == _.up.call(l) ? _.low : _.up).call(l);
	              });
	            },
	            random: function(s) {
	              return s.replace(/\w/g, function(l) {
	                return (Math.round(Math.random()) ? _.up : _.low).call(l);
	              });
	            },
	            type: function(type, fn) {
	              Case[type] = fn;
	              _.types.push(type);
	            }
	          },
	          types = {
	            lower: function(s, fill, deapostrophe) {
	              return _.fill(_.low.call(_.prep(s, fill)), fill, deapostrophe);
	            },
	            snake: function(s) {
	              return Case.lower(s, "_", !0);
	            },
	            constant: function(s) {
	              return Case.upper(s, "_", !0);
	            },
	            camel: function(s) {
	              return _.decap(Case.pascal(s));
	            },
	            kebab: function(s) {
	              return Case.lower(s, "-", !0);
	            },
	            upper: function(s, fill, deapostrophe) {
	              return _.fill(
	                _.up.call(_.prep(s, fill, !1, !0)),
	                fill,
	                deapostrophe
	              );
	            },
	            capital: function(s, fill, deapostrophe) {
	              return _.fill(
	                _.prep(s).replace(re.capitalize, function(m, border, letter) {
	                  return border + _.up.call(letter);
	                }),
	                fill,
	                deapostrophe
	              );
	            },
	            header: function(s) {
	              return Case.capital(s, "-", !0);
	            },
	            pascal: function(s) {
	              return _.fill(
	                _.prep(s, !1, !0).replace(re.pascal, function(
	                  m,
	                  border,
	                  letter
	                ) {
	                  return _.up.call(letter);
	                }),
	                "",
	                !0
	              );
	            },
	            title: function(s$jscomp$0) {
	              return Case.capital(s$jscomp$0).replace(re.improper, function(
	                small,
	                p,
	                i,
	                s
	              ) {
	                return 0 < i && i < s.lastIndexOf(" ")
	                  ? _.low.call(small)
	                  : small;
	              });
	            },
	            sentence: function(s, names, abbreviations) {
	              s = Case.lower(s).replace(re.sentence, function(
	                m,
	                prelude,
	                letter
	              ) {
	                return prelude + _.up.call(letter);
	              });
	              names &&
	                names.forEach(function(name) {
	                  s = s.replace(
	                    new RegExp("\\b" + Case.lower(name) + "\\b", "g"),
	                    _.cap
	                  );
	                });
	              abbreviations &&
	                abbreviations.forEach(function(abbr) {
	                  s = s.replace(
	                    new RegExp("(\\b" + Case.lower(abbr) + "\\. +)(\\w)"),
	                    function(m, abbrAndSpace, letter) {
	                      return abbrAndSpace + _.low.call(letter);
	                    }
	                  );
	                });
	              return s;
	            }
	          };
	        types.squish = types.pascal;
	        for (var type$jscomp$0 in types)
	          Case.type(type$jscomp$0, types[type$jscomp$0]);
	        (function() {})(
	          module.exports ? (module.exports = Case) : (this.Case = Case)
	        );
	      }.call(commonjsGlobal$1));
	    }),
	    __changeCases = function __changeCases(collection, caseName) {
	      if (isArray_1(collection))
	        return collection.map(function(value) {
	          return __changeCases(value, caseName);
	        });
	      isPlainObject_1(collection) &&
	        ((collection = _objectSpread({}, collection)),
	        (collection = mapKeys_1(collection, function(v, k) {
	          return Case[caseName](k);
	        })),
	        (collection = mapValues_1(collection, function(v) {
	          return __changeCases(v, caseName);
	        })));
	      return collection;
	    },
	    collection = Object.freeze({
	      toCamelKeys: function(collection) {
	        return isString_1(collection)
	          ? camelCase_1(collection)
	          : __changeCases(collection, "camel");
	      },
	      toSnakeKeys: function(collection) {
	        return isString_1(collection)
	          ? snakeCase_1(collection)
	          : __changeCases(collection, "snake");
	      }
	    }),
	    has = Object.prototype.hasOwnProperty,
	    hexTable = (function() {
	      for (var array = [], i = 0; 256 > i; ++i)
	        array.push("%" + ((16 > i ? "0" : "") + i.toString(16)).toUpperCase());
	      return array;
	    })(),
	    utils = {
	      arrayToObject: arrayToObject,
	      assign: function(target, source) {
	        return Object.keys(source).reduce(function(acc, key) {
	          acc[key] = source[key];
	          return acc;
	        }, target);
	      },
	      combine: function(a, b) {
	        return [].concat(a, b);
	      },
	      compact: function(value) {
	        for (
	          var queue = [{ obj: { o: value }, prop: "o" }], refs = [], i = 0;
	          i < queue.length;
	          ++i
	        ) {
	          var item = queue[i];
	          item = item.obj[item.prop];
	          for (var keys = Object.keys(item), j = 0; j < keys.length; ++j) {
	            var key = keys[j],
	              val = item[key];
	            "object" === typeof val &&
	              null !== val &&
	              -1 === refs.indexOf(val) &&
	              (queue.push({ obj: item, prop: key }), refs.push(val));
	          }
	        }
	        for (; 1 < queue.length; )
	          if (
	            ((refs = queue.pop()), (i = refs.obj[refs.prop]), Array.isArray(i))
	          ) {
	            item = [];
	            for (keys = 0; keys < i.length; ++keys)
	              "undefined" !== typeof i[keys] && item.push(i[keys]);
	            refs.obj[refs.prop] = item;
	          }
	        return value;
	      },
	      decode: function(str, decoder, charset) {
	        str = str.replace(/\+/g, " ");
	        if ("iso-8859-1" === charset)
	          return str.replace(/%[0-9a-f]{2}/gi, unescape);
	        try {
	          return decodeURIComponent(str);
	        } catch (e) {
	          return str;
	        }
	      },
	      encode: function(str, defaultEncoder, charset) {
	        if (0 === str.length) return str;
	        str = "string" === typeof str ? str : String(str);
	        if ("iso-8859-1" === charset)
	          return escape(str).replace(/%u[0-9a-f]{4}/gi, function($0) {
	            return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
	          });
	        charset = "";
	        for (
	          defaultEncoder = 0;
	          defaultEncoder < str.length;
	          ++defaultEncoder
	        ) {
	          var c = str.charCodeAt(defaultEncoder);
	          45 === c ||
	          46 === c ||
	          95 === c ||
	          126 === c ||
	          (48 <= c && 57 >= c) ||
	          (65 <= c && 90 >= c) ||
	          (97 <= c && 122 >= c)
	            ? (charset += str.charAt(defaultEncoder))
	            : 128 > c
	            ? (charset += hexTable[c])
	            : 2048 > c
	            ? (charset += hexTable[192 | (c >> 6)] + hexTable[128 | (c & 63)])
	            : 55296 > c || 57344 <= c
	            ? (charset +=
	                hexTable[224 | (c >> 12)] +
	                hexTable[128 | ((c >> 6) & 63)] +
	                hexTable[128 | (c & 63)])
	            : ((defaultEncoder += 1),
	              (c =
	                65536 +
	                (((c & 1023) << 10) | (str.charCodeAt(defaultEncoder) & 1023))),
	              (charset +=
	                hexTable[240 | (c >> 18)] +
	                hexTable[128 | ((c >> 12) & 63)] +
	                hexTable[128 | ((c >> 6) & 63)] +
	                hexTable[128 | (c & 63)]));
	        }
	        return charset;
	      },
	      isBuffer: function(obj) {
	        return null === obj || "undefined" === typeof obj
	          ? !1
	          : !!(
	              obj.constructor &&
	              obj.constructor.isBuffer &&
	              obj.constructor.isBuffer(obj)
	            );
	      },
	      isRegExp: function(obj) {
	        return "[object RegExp]" === Object.prototype.toString.call(obj);
	      },
	      merge: function merge(target, source, options) {
	        if (!source) return target;
	        if ("object" !== typeof source) {
	          if (Array.isArray(target)) target.push(source);
	          else if ("object" === typeof target) {
	            if (
	              (options && (options.plainObjects || options.allowPrototypes)) ||
	              !has.call(Object.prototype, source)
	            )
	              target[source] = !0;
	          } else return [target, source];
	          return target;
	        }
	        if ("object" !== typeof target) return [target].concat(source);
	        var mergeTarget = target;
	        Array.isArray(target) &&
	          !Array.isArray(source) &&
	          (mergeTarget = arrayToObject(target, options));
	        return Array.isArray(target) && Array.isArray(source)
	          ? (source.forEach(function(item, i) {
	              has.call(target, i)
	                ? target[i] && "object" === typeof target[i]
	                  ? (target[i] = merge(target[i], item, options))
	                  : target.push(item)
	                : (target[i] = item);
	            }),
	            target)
	          : Object.keys(source).reduce(function(acc, key) {
	              var value = source[key];
	              has.call(acc, key)
	                ? (acc[key] = merge(acc[key], value, options))
	                : (acc[key] = value);
	              return acc;
	            }, mergeTarget);
	      }
	    },
	    replace = String.prototype.replace,
	    percentTwenties = /%20/g,
	    formats = {
	      default: "RFC3986",
	      formatters: {
	        RFC1738: function(value) {
	          return replace.call(value, percentTwenties, "+");
	        },
	        RFC3986: function(value) {
	          return value;
	        }
	      },
	      RFC1738: "RFC1738",
	      RFC3986: "RFC3986"
	    },
	    arrayPrefixGenerators = {
	      brackets: function(prefix) {
	        return prefix + "[]";
	      },
	      indices: function(prefix, key) {
	        return prefix + "[" + key + "]";
	      },
	      repeat: function(prefix) {
	        return prefix;
	      }
	    },
	    isArray$1 = Array.isArray,
	    push = Array.prototype.push,
	    toISO = Date.prototype.toISOString,
	    JSCompiler_object_inline_encoder_252 = utils.encode,
	    stringify = function stringify(
	      object,
	      prefix,
	      generateArrayPrefix,
	      strictNullHandling,
	      skipNulls,
	      encoder,
	      filter,
	      sort,
	      allowDots,
	      serializeDate,
	      formatter,
	      encodeValuesOnly,
	      charset
	    ) {
	      "function" === typeof filter
	        ? (object = filter(prefix, object))
	        : object instanceof Date && (object = serializeDate(object));
	      if (null === object) {
	        if (strictNullHandling)
	          return encoder && !encodeValuesOnly
	            ? encoder(prefix, JSCompiler_object_inline_encoder_252, charset)
	            : prefix;
	        object = "";
	      }
	      if (
	        "string" === typeof object ||
	        "number" === typeof object ||
	        "boolean" === typeof object ||
	        utils.isBuffer(object)
	      )
	        return encoder
	          ? ((prefix = encodeValuesOnly
	              ? prefix
	              : encoder(prefix, JSCompiler_object_inline_encoder_252, charset)),
	            [
	              formatter(prefix) +
	                "=" +
	                formatter(
	                  encoder(object, JSCompiler_object_inline_encoder_252, charset)
	                )
	            ])
	          : [formatter(prefix) + "=" + formatter(String(object))];
	      var values = [];
	      if ("undefined" === typeof object) return values;
	      if (Array.isArray(filter)) var objKeys = filter;
	      else
	        (objKeys = Object.keys(object)),
	          (objKeys = sort ? objKeys.sort(sort) : objKeys);
	      for (var i = 0; i < objKeys.length; ++i) {
	        var key = objKeys[i];
	        (skipNulls && null === object[key]) ||
	          (Array.isArray(object)
	            ? pushToArray(
	                values,
	                stringify(
	                  object[key],
	                  generateArrayPrefix(prefix, key),
	                  generateArrayPrefix,
	                  strictNullHandling,
	                  skipNulls,
	                  encoder,
	                  filter,
	                  sort,
	                  allowDots,
	                  serializeDate,
	                  formatter,
	                  encodeValuesOnly,
	                  charset
	                )
	              )
	            : pushToArray(
	                values,
	                stringify(
	                  object[key],
	                  prefix + (allowDots ? "." + key : "[" + key + "]"),
	                  generateArrayPrefix,
	                  strictNullHandling,
	                  skipNulls,
	                  encoder,
	                  filter,
	                  sort,
	                  allowDots,
	                  serializeDate,
	                  formatter,
	                  encodeValuesOnly,
	                  charset
	                )
	              ));
	      }
	      return values;
	    },
	    has$1 = Object.prototype.hasOwnProperty,
	    JSCompiler_object_inline_decoder_263 = utils.decode,
	    lib = {
	      formats: formats,
	      parse: function(str, opts) {
	        opts = opts ? utils.assign({}, opts) : {};
	        if (
	          null !== opts.decoder &&
	          void 0 !== opts.decoder &&
	          "function" !== typeof opts.decoder
	        )
	          throw new TypeError("Decoder has to be a function.");
	        opts.ignoreQueryPrefix = !0 === opts.ignoreQueryPrefix;
	        opts.delimiter =
	          "string" === typeof opts.delimiter || utils.isRegExp(opts.delimiter)
	            ? opts.delimiter
	            : "&";
	        opts.depth = "number" === typeof opts.depth ? opts.depth : 5;
	        opts.arrayLimit =
	          "number" === typeof opts.arrayLimit ? opts.arrayLimit : 20;
	        opts.parseArrays = !1 !== opts.parseArrays;
	        opts.decoder =
	          "function" === typeof opts.decoder
	            ? opts.decoder
	            : JSCompiler_object_inline_decoder_263;
	        opts.allowDots =
	          "undefined" === typeof opts.allowDots ? !1 : !!opts.allowDots;
	        opts.plainObjects =
	          "boolean" === typeof opts.plainObjects ? opts.plainObjects : !1;
	        opts.allowPrototypes =
	          "boolean" === typeof opts.allowPrototypes ? opts.allowPrototypes : !1;
	        opts.parameterLimit =
	          "number" === typeof opts.parameterLimit ? opts.parameterLimit : 1e3;
	        opts.strictNullHandling =
	          "boolean" === typeof opts.strictNullHandling
	            ? opts.strictNullHandling
	            : !1;
	        if (
	          "undefined" !== typeof opts.charset &&
	          "utf-8" !== opts.charset &&
	          "iso-8859-1" !== opts.charset
	        )
	          throw Error(
	            "The charset option must be either utf-8, iso-8859-1, or undefined"
	          );
	        "undefined" === typeof opts.charset && (opts.charset = "utf-8");
	        if ("" === str || null === str || "undefined" === typeof str)
	          return opts.plainObjects ? Object.create(null) : {};
	        if ("string" === typeof str) {
	          var JSCompiler_temp = {};
	          str = (opts.ignoreQueryPrefix ? str.replace(/^\?/, "") : str).split(
	            opts.delimiter,
	            Infinity === opts.parameterLimit ? void 0 : opts.parameterLimit
	          );
	          var skipIndex = -1,
	            i,
	            charset = opts.charset;
	          if (opts.charsetSentinel)
	            for (i = 0; i < str.length; ++i)
	              0 === str[i].indexOf("utf8=") &&
	                ("utf8=%E2%9C%93" === str[i]
	                  ? (charset = "utf-8")
	                  : "utf8=%26%2310003%3B" === str[i] &&
	                    (charset = "iso-8859-1"),
	                (skipIndex = i),
	                (i = str.length));
	          for (i = 0; i < str.length; ++i)
	            if (i !== skipIndex) {
	              var part = str[i],
	                bracketEqualsPos = part.indexOf("]="),
	                pos =
	                  -1 === bracketEqualsPos
	                    ? part.indexOf("=")
	                    : bracketEqualsPos + 1;
	              -1 === pos
	                ? ((bracketEqualsPos = opts.decoder(
	                    part,
	                    JSCompiler_object_inline_decoder_263,
	                    charset
	                  )),
	                  (part = opts.strictNullHandling ? null : ""))
	                : ((bracketEqualsPos = opts.decoder(
	                    part.slice(0, pos),
	                    JSCompiler_object_inline_decoder_263,
	                    charset
	                  )),
	                  (part = opts.decoder(
	                    part.slice(pos + 1),
	                    JSCompiler_object_inline_decoder_263,
	                    charset
	                  )));
	              part &&
	                opts.interpretNumericEntities &&
	                "iso-8859-1" === charset &&
	                (part = interpretNumericEntities(part));
	              has$1.call(JSCompiler_temp, bracketEqualsPos)
	                ? (JSCompiler_temp[bracketEqualsPos] = utils.combine(
	                    JSCompiler_temp[bracketEqualsPos],
	                    part
	                  ))
	                : (JSCompiler_temp[bracketEqualsPos] = part);
	            }
	        } else JSCompiler_temp = str;
	        str = opts.plainObjects ? Object.create(null) : {};
	        skipIndex = Object.keys(JSCompiler_temp);
	        for (i = 0; i < skipIndex.length; ++i) {
	          charset = skipIndex[i];
	          a: if (
	            ((bracketEqualsPos = charset),
	            (charset = JSCompiler_temp[charset]),
	            (part = opts),
	            bracketEqualsPos)
	          ) {
	            bracketEqualsPos = part.allowDots
	              ? bracketEqualsPos.replace(/\.([^.[]+)/g, "[$1]")
	              : bracketEqualsPos;
	            pos = /(\[[^[\]]*])/g;
	            var segment = /(\[[^[\]]*])/.exec(bracketEqualsPos);
	            segment = segment
	              ? bracketEqualsPos.slice(0, segment.index)
	              : bracketEqualsPos;
	            var keys = [];
	            if (segment) {
	              if (
	                !part.plainObjects &&
	                has$1.call(Object.prototype, segment) &&
	                !part.allowPrototypes
	              ) {
	                charset = void 0;
	                break a;
	              }
	              keys.push(segment);
	            }
	            for (
	              var i$jscomp$0 = 0;
	              null !== (segment = pos.exec(bracketEqualsPos)) &&
	              i$jscomp$0 < part.depth;

	            ) {
	              i$jscomp$0 += 1;
	              if (
	                !part.plainObjects &&
	                has$1.call(Object.prototype, segment[1].slice(1, -1)) &&
	                !part.allowPrototypes
	              ) {
	                charset = void 0;
	                break a;
	              }
	              keys.push(segment[1]);
	            }
	            segment &&
	              keys.push("[" + bracketEqualsPos.slice(segment.index) + "]");
	            bracketEqualsPos = keys;
	            for (pos = bracketEqualsPos.length - 1; 0 <= pos; --pos) {
	              segment = bracketEqualsPos[pos];
	              if ("[]" === segment && part.parseArrays)
	                keys = [].concat(charset);
	              else {
	                keys = part.plainObjects ? Object.create(null) : {};
	                i$jscomp$0 =
	                  "[" === segment.charAt(0) &&
	                  "]" === segment.charAt(segment.length - 1)
	                    ? segment.slice(1, -1)
	                    : segment;
	                var index = parseInt(i$jscomp$0, 10);
	                part.parseArrays || "" !== i$jscomp$0
	                  ? !isNaN(index) &&
	                    segment !== i$jscomp$0 &&
	                    String(index) === i$jscomp$0 &&
	                    0 <= index &&
	                    part.parseArrays &&
	                    index <= part.arrayLimit
	                    ? ((keys = []), (keys[index] = charset))
	                    : (keys[i$jscomp$0] = charset)
	                  : (keys = { 0: charset });
	              }
	              charset = keys;
	            }
	          } else charset = void 0;
	          str = utils.merge(str, charset, opts);
	        }
	        return utils.compact(str);
	      },
	      stringify: function(object, opts) {
	        var obj = object;
	        opts = opts ? utils.assign({}, opts) : {};
	        if (
	          null !== opts.encoder &&
	          void 0 !== opts.encoder &&
	          "function" !== typeof opts.encoder
	        )
	          throw new TypeError("Encoder has to be a function.");
	        var delimiter =
	            "undefined" === typeof opts.delimiter ? "&" : opts.delimiter,
	          strictNullHandling =
	            "boolean" === typeof opts.strictNullHandling
	              ? opts.strictNullHandling
	              : !1,
	          skipNulls = "boolean" === typeof opts.skipNulls ? opts.skipNulls : !1,
	          encode = "boolean" === typeof opts.encode ? opts.encode : !0,
	          encoder =
	            "function" === typeof opts.encoder
	              ? opts.encoder
	              : JSCompiler_object_inline_encoder_252,
	          sort = "function" === typeof opts.sort ? opts.sort : null,
	          allowDots =
	            "undefined" === typeof opts.allowDots ? !1 : !!opts.allowDots,
	          serializeDate =
	            "function" === typeof opts.serializeDate
	              ? opts.serializeDate
	              : JSCompiler_object_inline_serializeDate_255,
	          encodeValuesOnly =
	            "boolean" === typeof opts.encodeValuesOnly
	              ? opts.encodeValuesOnly
	              : !1;
	        object = opts.charset || "utf-8";
	        if (
	          "undefined" !== typeof opts.charset &&
	          "utf-8" !== opts.charset &&
	          "iso-8859-1" !== opts.charset
	        )
	          throw Error(
	            "The charset option must be either utf-8, iso-8859-1, or undefined"
	          );
	        if ("undefined" === typeof opts.format)
	          opts.format = formats["default"];
	        else if (
	          !Object.prototype.hasOwnProperty.call(formats.formatters, opts.format)
	        )
	          throw new TypeError("Unknown format option provided.");
	        var formatter = formats.formatters[opts.format];
	        if ("function" === typeof opts.filter) {
	          var filter = opts.filter;
	          obj = filter("", obj);
	        } else if (Array.isArray(opts.filter))
	          var objKeys = (filter = opts.filter);
	        var keys = [];
	        if ("object" !== typeof obj || null === obj) return "";
	        var generateArrayPrefix =
	          arrayPrefixGenerators[
	            opts.arrayFormat in arrayPrefixGenerators
	              ? opts.arrayFormat
	              : "indices" in opts
	              ? opts.indices
	                ? "indices"
	                : "repeat"
	              : "indices"
	          ];
	        objKeys || (objKeys = Object.keys(obj));
	        sort && objKeys.sort(sort);
	        for (var i = 0; i < objKeys.length; ++i) {
	          var key = objKeys[i];
	          (skipNulls && null === obj[key]) ||
	            pushToArray(
	              keys,
	              stringify(
	                obj[key],
	                key,
	                generateArrayPrefix,
	                strictNullHandling,
	                skipNulls,
	                encode ? encoder : null,
	                filter,
	                sort,
	                allowDots,
	                serializeDate,
	                formatter,
	                encodeValuesOnly,
	                object
	              )
	            );
	        }
	        objKeys = keys.join(delimiter);
	        filter = !0 === opts.addQueryPrefix ? "?" : "";
	        opts.charsetSentinel &&
	          (filter =
	            "iso-8859-1" === object
	              ? filter + "utf8=%26%2310003%3B&"
	              : filter + "utf8=%E2%9C%93&");
	        return 0 < objKeys.length ? filter + objKeys : "";
	      }
	    },
	    qs = Object.freeze({
	      parse: function(str) {
	        str = str.slice(1);
	        return lib.parse(str);
	      }
	    }),
	    base64_1 = createCommonjsModule(function(module) {
	      (function(global, factory) {
	        module.exports = factory(global);
	      })(
	        "undefined" !== typeof self
	          ? self
	          : "undefined" !== typeof window
	          ? window
	          : commonjsGlobal$1,
	        function(global) {
	          function decode(a) {
	            return _decode(
	              String(a)
	                .replace(/[-_]/g, function(m0) {
	                  return "-" == m0 ? "+" : "/";
	                })
	                .replace(/[^A-Za-z0-9\+\/]/g, "")
	            );
	          }
	          function cb_decode(cccc) {
	            var len = cccc.length,
	              padlen = len % 4;
	            cccc =
	              (0 < len ? b64tab[cccc.charAt(0)] << 18 : 0) |
	              (1 < len ? b64tab[cccc.charAt(1)] << 12 : 0) |
	              (2 < len ? b64tab[cccc.charAt(2)] << 6 : 0) |
	              (3 < len ? b64tab[cccc.charAt(3)] : 0);
	            cccc = [
	              fromCharCode(cccc >>> 16),
	              fromCharCode((cccc >>> 8) & 255),
	              fromCharCode(cccc & 255)
	            ];
	            cccc.length -= [0, 0, 2, 1][padlen];
	            return cccc.join("");
	          }
	          function btou(b) {
	            return b.replace(re_btou, cb_btou);
	          }
	          function cb_btou(cccc) {
	            switch (cccc.length) {
	              case 4:
	                return (
	                  (cccc =
	                    (((7 & cccc.charCodeAt(0)) << 18) |
	                      ((63 & cccc.charCodeAt(1)) << 12) |
	                      ((63 & cccc.charCodeAt(2)) << 6) |
	                      (63 & cccc.charCodeAt(3))) -
	                    65536),
	                  fromCharCode((cccc >>> 10) + 55296) +
	                    fromCharCode((cccc & 1023) + 56320)
	                );
	              case 3:
	                return fromCharCode(
	                  ((15 & cccc.charCodeAt(0)) << 12) |
	                    ((63 & cccc.charCodeAt(1)) << 6) |
	                    (63 & cccc.charCodeAt(2))
	                );
	              default:
	                return fromCharCode(
	                  ((31 & cccc.charCodeAt(0)) << 6) | (63 & cccc.charCodeAt(1))
	                );
	            }
	          }
	          function encode(u, urisafe) {
	            return urisafe
	              ? _encode(String(u))
	                  .replace(/[+\/]/g, function(m0) {
	                    return "+" == m0 ? "-" : "_";
	                  })
	                  .replace(/=/g, "")
	              : _encode(String(u));
	          }
	          function cb_encode(ccc) {
	            var padlen = [0, 2, 1][ccc.length % 3];
	            ccc =
	              (ccc.charCodeAt(0) << 16) |
	              ((1 < ccc.length ? ccc.charCodeAt(1) : 0) << 8) |
	              (2 < ccc.length ? ccc.charCodeAt(2) : 0);
	            return [
	              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(
	                ccc >>> 18
	              ),
	              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(
	                (ccc >>> 12) & 63
	              ),
	              2 <= padlen
	                ? "="
	                : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(
	                    (ccc >>> 6) & 63
	                  ),
	              1 <= padlen
	                ? "="
	                : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(
	                    ccc & 63
	                  )
	            ].join("");
	          }
	          function utob(u) {
	            return u.replace(re_utob, cb_utob);
	          }
	          function cb_utob(c) {
	            if (2 > c.length) {
	              var cc = c.charCodeAt(0);
	              return 128 > cc
	                ? c
	                : 2048 > cc
	                ? fromCharCode(192 | (cc >>> 6)) + fromCharCode(128 | (cc & 63))
	                : fromCharCode(224 | ((cc >>> 12) & 15)) +
	                  fromCharCode(128 | ((cc >>> 6) & 63)) +
	                  fromCharCode(128 | (cc & 63));
	            }
	            cc =
	              65536 +
	              1024 * (c.charCodeAt(0) - 55296) +
	              (c.charCodeAt(1) - 56320);
	            return (
	              fromCharCode(240 | ((cc >>> 18) & 7)) +
	              fromCharCode(128 | ((cc >>> 12) & 63)) +
	              fromCharCode(128 | ((cc >>> 6) & 63)) +
	              fromCharCode(128 | (cc & 63))
	            );
	          }
	          global = global || {};
	          var _Base64 = global.Base64;
	          if (module.exports)
	            try {
	              var buffer = eval("require('buffer').Buffer");
	            } catch (err) {
	              buffer = void 0;
	            }
	          var b64tab = (function(bin) {
	              for (var t = {}, i = 0, l = bin.length; i < l; i++)
	                t[bin.charAt(i)] = i;
	              return t;
	            })(
	              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
	            ),
	            fromCharCode = String.fromCharCode,
	            re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,
	            btoa = global.btoa
	              ? function(b) {
	                  return global.btoa(b);
	                }
	              : function(b) {
	                  return b.replace(/[\s\S]{1,3}/g, cb_encode);
	                },
	            _encode = buffer
	              ? buffer.from && Uint8Array && buffer.from !== Uint8Array.from
	                ? function(u) {
	                    return (u.constructor === buffer.constructor
	                      ? u
	                      : buffer.from(u)
	                    ).toString("base64");
	                  }
	                : function(u) {
	                    return (u.constructor === buffer.constructor
	                      ? u
	                      : new buffer(u)
	                    ).toString("base64");
	                  }
	              : function(u) {
	                  return btoa(utob(u));
	                },
	            re_btou = /[\u00c0-\u00df][\u0080-\u00bf]|[\u00e0-\u00ef][\u0080-\u00bf]{2}|[\u00f0-\u00f7][\u0080-\u00bf]{3}/g,
	            _atob = global.atob
	              ? function(a) {
	                  return global.atob(a);
	                }
	              : function(a) {
	                  return a.replace(/\S{1,4}/g, cb_decode);
	                },
	            _decode = buffer
	              ? buffer.from && Uint8Array && buffer.from !== Uint8Array.from
	                ? function(a) {
	                    return (a.constructor === buffer.constructor
	                      ? a
	                      : buffer.from(a, "base64")
	                    ).toString();
	                  }
	                : function(a) {
	                    return (a.constructor === buffer.constructor
	                      ? a
	                      : new buffer(a, "base64")
	                    ).toString();
	                  }
	              : function(a) {
	                  return btou(_atob(a));
	                };
	          global.Base64 = {
	            VERSION: "2.5.1",
	            atob: function(a) {
	              return _atob(String(a).replace(/[^A-Za-z0-9\+\/]/g, ""));
	            },
	            btoa: btoa,
	            fromBase64: decode,
	            toBase64: encode,
	            utob: utob,
	            encode: encode,
	            encodeURI: function(u) {
	              return encode(u, !0);
	            },
	            btou: btou,
	            decode: decode,
	            noConflict: function() {
	              var Base64 = global.Base64;
	              global.Base64 = _Base64;
	              return Base64;
	            },
	            __buffer__: buffer
	          };
	          if ("function" === typeof Object.defineProperty) {
	            var noEnum = function(v) {
	              return {
	                value: v,
	                enumerable: !1,
	                writable: !0,
	                configurable: !0
	              };
	            };
	            global.Base64.extendString = function() {
	              Object.defineProperty(
	                String.prototype,
	                "fromBase64",
	                noEnum(function() {
	                  return decode(this);
	                })
	              );
	              Object.defineProperty(
	                String.prototype,
	                "toBase64",
	                noEnum(function(urisafe) {
	                  return encode(this, urisafe);
	                })
	              );
	              Object.defineProperty(
	                String.prototype,
	                "toBase64URI",
	                noEnum(function() {
	                  return encode(this, !0);
	                })
	              );
	            };
	          }
	          global.Meteor && (Base64 = global.Base64);
	          module.exports && (module.exports.Base64 = global.Base64);
	          return { Base64: global.Base64 };
	        }
	      );
	    }).Base64,
	    base64$1 = Object.freeze({
	      decode: function(str) {
	        return base64_1.decode(str);
	      }
	    });
	  InvalidCharacterError.prototype = Error();
	  InvalidCharacterError.prototype.name = "InvalidCharacterError";
	  var atob =
	    ("undefined" !== typeof window &&
	      window.atob &&
	      window.atob.bind(window)) ||
	    polyfill;
	  InvalidTokenError.prototype = Error();
	  InvalidTokenError.prototype.name = "InvalidTokenError";
	  lib$1.InvalidTokenError = InvalidTokenError;
	  var jwt = Object.freeze({
	      parse: function(jwt) {
	        return jwt ? lib$1(jwt) : null;
	      }
	    }),
	    screen = Object.freeze({
	      toTop: function() {
	        window.scrollTo(0, 0);
	      }
	    }),
	    platform = createCommonjsModule(function(module, exports) {
	      (function() {
	        function capitalize(string) {
	          string = String(string);
	          return string.charAt(0).toUpperCase() + string.slice(1);
	        }
	        function each(object, callback) {
	          var index = -1,
	            length = object ? object.length : 0;
	          if (
	            "number" == typeof length &&
	            -1 < length &&
	            length <= maxSafeInteger
	          )
	            for (; ++index < length; ) callback(object[index], index, object);
	          else forOwn(object, callback);
	        }
	        function format(string) {
	          string = String(string).replace(/^ +| +$/g, "");
	          return /^(?:webOS|i(?:OS|P))/.test(string)
	            ? string
	            : capitalize(string);
	        }
	        function forOwn(object, callback) {
	          for (var key in object)
	            hasOwnProperty.call(object, key) &&
	              callback(object[key], key, object);
	        }
	        function getClassOf(value) {
	          return null == value
	            ? capitalize(value)
	            : toString.call(value).slice(8, -1);
	        }
	        function isHostType(object, property) {
	          var type = null != object ? typeof object[property] : "number";
	          return (
	            !/^(?:boolean|number|string|undefined)$/.test(type) &&
	            ("object" == type ? !!object[property] : !0)
	          );
	        }
	        function qualify(string) {
	          return String(string).replace(/([ -])(?!$)/g, "$1?");
	        }
	        function reduce(array, callback) {
	          var accumulator = null;
	          each(array, function(value, index) {
	            accumulator = callback(accumulator, value, index, array);
	          });
	          return accumulator;
	        }
	        function parse(ua) {
	          function getProduct(guesses) {
	            return reduce(guesses, function(result, guess) {
	              var pattern = guess.pattern || qualify(guess);
	              !result &&
	                (result =
	                  RegExp("\\b" + pattern + " *\\d+[.\\w_]*", "i").exec(ua) ||
	                  RegExp("\\b" + pattern + " *\\w+-[\\w]*", "i").exec(ua) ||
	                  RegExp(
	                    "\\b" +
	                      pattern +
	                      "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)",
	                    "i"
	                  ).exec(ua)) &&
	                ((result = String(
	                  guess.label && !RegExp(pattern, "i").test(guess.label)
	                    ? guess.label
	                    : result
	                ).split("/"))[1] &&
	                  !/[\d.]+/.test(result[0]) &&
	                  (result[0] += " " + result[1]),
	                (guess = guess.label || guess),
	                (result = format(
	                  result[0]
	                    .replace(RegExp(pattern, "i"), guess)
	                    .replace(RegExp("; *(?:" + guess + "[_-])?", "i"), " ")
	                    .replace(RegExp("(" + guess + ")[-_.]?(\\w)", "i"), "$1 $2")
	                )));
	              return result;
	            });
	          }
	          function getVersion(patterns) {
	            return reduce(patterns, function(result, pattern) {
	              return (
	                result ||
	                (RegExp(
	                  pattern +
	                    "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)",
	                  "i"
	                ).exec(ua) || 0)[1] ||
	                null
	              );
	            });
	          }
	          var context = root,
	            isCustomContext =
	              ua && "object" == typeof ua && "String" != getClassOf(ua);
	          isCustomContext && ((context = ua), (ua = null));
	          var nav = context.navigator || {},
	            userAgent = nav.userAgent || "";
	          ua || (ua = userAgent);
	          var likeChrome = isCustomContext
	              ? !!nav.likeChrome
	              : /\bChrome\b/.test(ua) &&
	                !/internal|\n/i.test(toString.toString()),
	            airRuntimeClass = isCustomContext
	              ? "Object"
	              : "ScriptBridgingProxyObject",
	            enviroClass = isCustomContext ? "Object" : "Environment",
	            javaClass =
	              isCustomContext && context.java
	                ? "JavaPackage"
	                : getClassOf(context.java),
	            phantomClass = isCustomContext ? "Object" : "RuntimeObject";
	          enviroClass =
	            (javaClass = /\bJava/.test(javaClass) && context.java) &&
	            getClassOf(context.environment) == enviroClass;
	          var alpha = javaClass ? "a" : "\u03b1",
	            beta = javaClass ? "b" : "\u03b2",
	            doc = context.document || {},
	            opera = context.operamini || context.opera,
	            operaClass = reOpera.test(
	              (operaClass =
	                isCustomContext && opera
	                  ? opera["[[Class]]"]
	                  : getClassOf(opera))
	            )
	              ? operaClass
	              : (opera = null),
	            data$jscomp$0,
	            arch = ua;
	          isCustomContext = [];
	          var prerelease = null,
	            useFeatures = ua == userAgent;
	          userAgent =
	            useFeatures &&
	            opera &&
	            "function" == typeof opera.version &&
	            opera.version();
	          var layout = (function(guesses) {
	              return reduce(guesses, function(result, guess) {
	                return (
	                  result ||
	                  (RegExp(
	                    "\\b" + (guess.pattern || qualify(guess)) + "\\b",
	                    "i"
	                  ).exec(ua) &&
	                    (guess.label || guess))
	                );
	              });
	            })([
	              { label: "EdgeHTML", pattern: "Edge" },
	              "Trident",
	              { label: "WebKit", pattern: "AppleWebKit" },
	              "iCab",
	              "Presto",
	              "NetFront",
	              "Tasman",
	              "KHTML",
	              "Gecko"
	            ]),
	            name = (function(guesses) {
	              return reduce(guesses, function(result, guess) {
	                return (
	                  result ||
	                  (RegExp(
	                    "\\b" + (guess.pattern || qualify(guess)) + "\\b",
	                    "i"
	                  ).exec(ua) &&
	                    (guess.label || guess))
	                );
	              });
	            })([
	              "Adobe AIR",
	              "Arora",
	              "Avant Browser",
	              "Breach",
	              "Camino",
	              "Electron",
	              "Epiphany",
	              "Fennec",
	              "Flock",
	              "Galeon",
	              "GreenBrowser",
	              "iCab",
	              "Iceweasel",
	              "K-Meleon",
	              "Konqueror",
	              "Lunascape",
	              "Maxthon",
	              { label: "Microsoft Edge", pattern: "Edge" },
	              "Midori",
	              "Nook Browser",
	              "PaleMoon",
	              "PhantomJS",
	              "Raven",
	              "Rekonq",
	              "RockMelt",
	              { label: "Samsung Internet", pattern: "SamsungBrowser" },
	              "SeaMonkey",
	              { label: "Silk", pattern: "(?:Cloud9|Silk-Accelerated)" },
	              "Sleipnir",
	              "SlimBrowser",
	              { label: "SRWare Iron", pattern: "Iron" },
	              "Sunrise",
	              "Swiftfox",
	              "Waterfox",
	              "WebPositive",
	              "Opera Mini",
	              { label: "Opera Mini", pattern: "OPiOS" },
	              "Opera",
	              { label: "Opera", pattern: "OPR" },
	              "Chrome",
	              { label: "Chrome Mobile", pattern: "(?:CriOS|CrMo)" },
	              { label: "Firefox", pattern: "(?:Firefox|Minefield)" },
	              { label: "Firefox for iOS", pattern: "FxiOS" },
	              { label: "IE", pattern: "IEMobile" },
	              { label: "IE", pattern: "MSIE" },
	              "Safari"
	            ]),
	            product = getProduct([
	              { label: "BlackBerry", pattern: "BB10" },
	              "BlackBerry",
	              { label: "Galaxy S", pattern: "GT-I9000" },
	              { label: "Galaxy S2", pattern: "GT-I9100" },
	              { label: "Galaxy S3", pattern: "GT-I9300" },
	              { label: "Galaxy S4", pattern: "GT-I9500" },
	              { label: "Galaxy S5", pattern: "SM-G900" },
	              { label: "Galaxy S6", pattern: "SM-G920" },
	              { label: "Galaxy S6 Edge", pattern: "SM-G925" },
	              { label: "Galaxy S7", pattern: "SM-G930" },
	              { label: "Galaxy S7 Edge", pattern: "SM-G935" },
	              "Google TV",
	              "Lumia",
	              "iPad",
	              "iPod",
	              "iPhone",
	              "Kindle",
	              { label: "Kindle Fire", pattern: "(?:Cloud9|Silk-Accelerated)" },
	              "Nexus",
	              "Nook",
	              "PlayBook",
	              "PlayStation Vita",
	              "PlayStation",
	              "TouchPad",
	              "Transformer",
	              { label: "Wii U", pattern: "WiiU" },
	              "Wii",
	              "Xbox One",
	              { label: "Xbox 360", pattern: "Xbox" },
	              "Xoom"
	            ]),
	            manufacturer = (function(guesses) {
	              return reduce(guesses, function(result, value, key) {
	                return (
	                  result ||
	                  ((value[product] ||
	                    value[/^[a-z]+(?: +[a-z]+\b)*/i.exec(product)] ||
	                    RegExp("\\b" + qualify(key) + "(?:\\b|\\w*\\d)", "i").exec(
	                      ua
	                    )) &&
	                    key)
	                );
	              });
	            })({
	              Apple: { iPad: 1, iPhone: 1, iPod: 1 },
	              Archos: {},
	              Amazon: { Kindle: 1, "Kindle Fire": 1 },
	              Asus: { Transformer: 1 },
	              "Barnes & Noble": { Nook: 1 },
	              BlackBerry: { PlayBook: 1 },
	              Google: { "Google TV": 1, Nexus: 1 },
	              HP: { TouchPad: 1 },
	              HTC: {},
	              LG: {},
	              Microsoft: { Xbox: 1, "Xbox One": 1 },
	              Motorola: { Xoom: 1 },
	              Nintendo: { "Wii U": 1, Wii: 1 },
	              Nokia: { Lumia: 1 },
	              Samsung: {
	                "Galaxy S": 1,
	                "Galaxy S2": 1,
	                "Galaxy S3": 1,
	                "Galaxy S4": 1
	              },
	              Sony: { PlayStation: 1, "PlayStation Vita": 1 }
	            }),
	            os = (function(guesses) {
	              return reduce(guesses, function(result, guess) {
	                var pattern = guess.pattern || qualify(guess);
	                if (
	                  !result &&
	                  (result = RegExp(
	                    "\\b" + pattern + "(?:/[\\d.]+|[ \\w.]*)",
	                    "i"
	                  ).exec(ua))
	                ) {
	                  guess = guess.label || guess;
	                  var data = {
	                    "10.0": "10",
	                    "6.4": "10 Technical Preview",
	                    "6.3": "8.1",
	                    "6.2": "8",
	                    "6.1": "Server 2008 R2 / 7",
	                    "6.0": "Server 2008 / Vista",
	                    "5.2": "Server 2003 / XP 64-bit",
	                    "5.1": "XP",
	                    "5.01": "2000 SP1",
	                    "5.0": "2000",
	                    "4.0": "NT",
	                    "4.90": "ME"
	                  };
	                  pattern &&
	                    guess &&
	                    /^Win/i.test(result) &&
	                    !/^Windows Phone /i.test(result) &&
	                    (data = data[/[\d.]+$/.exec(result)]) &&
	                    (result = "Windows " + data);
	                  result = String(result);
	                  pattern &&
	                    guess &&
	                    (result = result.replace(RegExp(pattern, "i"), guess));
	                  result = format(
	                    result
	                      .replace(/ ce$/i, " CE")
	                      .replace(/\bhpw/i, "web")
	                      .replace(/\bMacintosh\b/, "Mac OS")
	                      .replace(/_PowerPC\b/i, " OS")
	                      .replace(/\b(OS X) [^ \d]+/i, "$1")
	                      .replace(/\bMac (OS X)\b/, "$1")
	                      .replace(/\/(\d)/, " $1")
	                      .replace(/_/g, ".")
	                      .replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "")
	                      .replace(/\bx86\.64\b/gi, "x86_64")
	                      .replace(/\b(Windows Phone) OS\b/, "$1")
	                      .replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1")
	                      .split(" on ")[0]
	                  );
	                }
	                return result;
	              });
	            })([
	              "Windows Phone",
	              "Android",
	              "CentOS",
	              { label: "Chrome OS", pattern: "CrOS" },
	              "Debian",
	              "Fedora",
	              "FreeBSD",
	              "Gentoo",
	              "Haiku",
	              "Kubuntu",
	              "Linux Mint",
	              "OpenBSD",
	              "Red Hat",
	              "SuSE",
	              "Ubuntu",
	              "Xubuntu",
	              "Cygwin",
	              "Symbian OS",
	              "hpwOS",
	              "webOS ",
	              "webOS",
	              "Tablet OS",
	              "Tizen",
	              "Linux",
	              "Mac OS X",
	              "Macintosh",
	              "Mac",
	              "Windows 98;",
	              "Windows "
	            ]);
	          layout && (layout = [layout]);
	          manufacturer && !product && (product = getProduct([manufacturer]));
	          if ((data$jscomp$0 = /\bGoogle TV\b/.exec(product)))
	            product = data$jscomp$0[0];
	          /\bSimulator\b/i.test(ua) &&
	            (product = (product ? product + " " : "") + "Simulator");
	          "Opera Mini" == name &&
	            /\bOPiOS\b/.test(ua) &&
	            isCustomContext.push("running in Turbo/Uncompressed mode");
	          "IE" == name && /\blike iPhone OS\b/.test(ua)
	            ? ((data$jscomp$0 = parse(ua.replace(/like iPhone OS/, ""))),
	              (manufacturer = data$jscomp$0.manufacturer),
	              (product = data$jscomp$0.product))
	            : /^iP/.test(product)
	            ? (name || (name = "Safari"),
	              (os =
	                "iOS" +
	                ((data$jscomp$0 = / OS ([\d_]+)/i.exec(ua))
	                  ? " " + data$jscomp$0[1].replace(/_/g, ".")
	                  : "")))
	            : "Konqueror" != name || /buntu/i.test(os)
	            ? (manufacturer &&
	                "Google" != manufacturer &&
	                ((/Chrome/.test(name) && !/\bMobile Safari\b/i.test(ua)) ||
	                  /\bVita\b/.test(product))) ||
	              (/\bAndroid\b/.test(os) &&
	                /^Chrome/.test(name) &&
	                /\bVersion\//i.test(ua))
	              ? ((name = "Android Browser"),
	                (os = /\bAndroid\b/.test(os) ? os : "Android"))
	              : "Silk" == name
	              ? (/\bMobi/i.test(ua) ||
	                  ((os = "Android"), isCustomContext.unshift("desktop mode")),
	                /Accelerated *= *true/i.test(ua) &&
	                  isCustomContext.unshift("accelerated"))
	              : "PaleMoon" == name &&
	                (data$jscomp$0 = /\bFirefox\/([\d.]+)\b/.exec(ua))
	              ? isCustomContext.push(
	                  "identifying as Firefox " + data$jscomp$0[1]
	                )
	              : "Firefox" == name &&
	                (data$jscomp$0 = /\b(Mobile|Tablet|TV)\b/i.exec(ua))
	              ? (os || (os = "Firefox OS"),
	                product || (product = data$jscomp$0[1]))
	              : !name ||
	                (data$jscomp$0 =
	                  !/\bMinefield\b/i.test(ua) &&
	                  /\b(?:Firefox|Safari)\b/.exec(name))
	              ? (name &&
	                  !product &&
	                  /[\/,]|^[^(]+?\)/.test(
	                    ua.slice(ua.indexOf(data$jscomp$0 + "/") + 8)
	                  ) &&
	                  (name = null),
	                (data$jscomp$0 = product || manufacturer || os) &&
	                  (product ||
	                    manufacturer ||
	                    /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(os)) &&
	                  (name =
	                    /[a-z]+(?: Hat)?/i.exec(
	                      /\bAndroid\b/.test(os) ? os : data$jscomp$0
	                    ) + " Browser"))
	              : "Electron" == name &&
	                (data$jscomp$0 = (/\bChrome\/([\d.]+)\b/.exec(ua) || 0)[1]) &&
	                isCustomContext.push("Chromium " + data$jscomp$0)
	            : (os = "Kubuntu");
	          userAgent ||
	            (userAgent = getVersion([
	              "(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))",
	              "Version",
	              qualify(name),
	              "(?:Firefox|Minefield|NetFront)"
	            ]));
	          if (
	            (data$jscomp$0 =
	              ("iCab" == layout && 3 < parseFloat(userAgent) && "WebKit") ||
	              (/\bOpera\b/.test(name) &&
	                (/\bOPR\b/.test(ua) ? "Blink" : "Presto")) ||
	              (/\b(?:Midori|Nook|Safari)\b/i.test(ua) &&
	                !/^(?:Trident|EdgeHTML)$/.test(layout) &&
	                "WebKit") ||
	              (!layout &&
	                /\bMSIE\b/i.test(ua) &&
	                ("Mac OS" == os ? "Tasman" : "Trident")) ||
	              ("WebKit" == layout &&
	                /\bPlayStation\b(?! Vita\b)/i.test(name) &&
	                "NetFront"))
	          )
	            layout = [data$jscomp$0];
	          "IE" == name &&
	          (data$jscomp$0 = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(ua) || 0)[1])
	            ? ((name += " Mobile"),
	              (os =
	                "Windows Phone " +
	                (/\+$/.test(data$jscomp$0)
	                  ? data$jscomp$0
	                  : data$jscomp$0 + ".x")),
	              isCustomContext.unshift("desktop mode"))
	            : /\bWPDesktop\b/i.test(ua)
	            ? ((name = "IE Mobile"),
	              (os = "Windows Phone 8.x"),
	              isCustomContext.unshift("desktop mode"),
	              userAgent || (userAgent = (/\brv:([\d.]+)/.exec(ua) || 0)[1]))
	            : "IE" != name &&
	              "Trident" == layout &&
	              (data$jscomp$0 = /\brv:([\d.]+)/.exec(ua)) &&
	              (name &&
	                isCustomContext.push(
	                  "identifying as " + name + (userAgent ? " " + userAgent : "")
	                ),
	              (name = "IE"),
	              (userAgent = data$jscomp$0[1]));
	          if (useFeatures) {
	            if (isHostType(context, "global"))
	              if (
	                (javaClass &&
	                  ((data$jscomp$0 = javaClass.lang.System),
	                  (arch = data$jscomp$0.getProperty("os.arch")),
	                  (os =
	                    os ||
	                    data$jscomp$0.getProperty("os.name") +
	                      " " +
	                      data$jscomp$0.getProperty("os.version"))),
	                enviroClass)
	              ) {
	                try {
	                  (userAgent = context
	                    .require("ringo/engine")
	                    .version.join(".")),
	                    (name = "RingoJS");
	                } catch (e) {
	                  (data$jscomp$0 = context.system) &&
	                    data$jscomp$0.global.system == context.system &&
	                    ((name = "Narwhal"),
	                    os || (os = data$jscomp$0[0].os || null));
	                }
	                name || (name = "Rhino");
	              } else
	                "object" == typeof context.process &&
	                  !context.process.browser &&
	                  (data$jscomp$0 = context.process) &&
	                  ("object" == typeof data$jscomp$0.versions &&
	                    ("string" == typeof data$jscomp$0.versions.electron
	                      ? (isCustomContext.push(
	                          "Node " + data$jscomp$0.versions.node
	                        ),
	                        (name = "Electron"),
	                        (userAgent = data$jscomp$0.versions.electron))
	                      : "string" == typeof data$jscomp$0.versions.nw &&
	                        (isCustomContext.push(
	                          "Chromium " + userAgent,
	                          "Node " + data$jscomp$0.versions.node
	                        ),
	                        (name = "NW.js"),
	                        (userAgent = data$jscomp$0.versions.nw))),
	                  name ||
	                    ((name = "Node.js"),
	                    (arch = data$jscomp$0.arch),
	                    (os = data$jscomp$0.platform),
	                    (userAgent = (userAgent = /[\d.]+/.exec(
	                      data$jscomp$0.version
	                    ))
	                      ? userAgent[0]
	                      : null)));
	            else
	              getClassOf((data$jscomp$0 = context.runtime)) == airRuntimeClass
	                ? ((name = "Adobe AIR"),
	                  (os = data$jscomp$0.flash.system.Capabilities.os))
	                : getClassOf((data$jscomp$0 = context.phantom)) == phantomClass
	                ? ((name = "PhantomJS"),
	                  (userAgent =
	                    (data$jscomp$0 = data$jscomp$0.version || null) &&
	                    data$jscomp$0.major +
	                      "." +
	                      data$jscomp$0.minor +
	                      "." +
	                      data$jscomp$0.patch))
	                : "number" == typeof doc.documentMode &&
	                  (data$jscomp$0 = /\bTrident\/(\d+)/i.exec(ua))
	                ? ((userAgent = [userAgent, doc.documentMode]),
	                  (data$jscomp$0 = +data$jscomp$0[1] + 4) != userAgent[1] &&
	                    (isCustomContext.push("IE " + userAgent[1] + " mode"),
	                    layout && (layout[1] = ""),
	                    (userAgent[1] = data$jscomp$0)),
	                  (userAgent =
	                    "IE" == name
	                      ? String(userAgent[1].toFixed(1))
	                      : userAgent[0]))
	                : "number" == typeof doc.documentMode &&
	                  /^(?:Chrome|Firefox)\b/.test(name) &&
	                  (isCustomContext.push("masking as " + name + " " + userAgent),
	                  (name = "IE"),
	                  (userAgent = "11.0"),
	                  (layout = ["Trident"]),
	                  (os = "Windows"));
	            os = os && format(os);
	          }
	          userAgent &&
	            (data$jscomp$0 =
	              /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(userAgent) ||
	              /(?:alpha|beta)(?: ?\d)?/i.exec(
	                ua + ";" + (useFeatures && nav.appMinorVersion)
	              ) ||
	              (/\bMinefield\b/i.test(ua) && "a")) &&
	            ((prerelease = /b/i.test(data$jscomp$0) ? "beta" : "alpha"),
	            (userAgent =
	              userAgent.replace(RegExp(data$jscomp$0 + "\\+?$"), "") +
	              ("beta" == prerelease ? beta : alpha) +
	              (/\d+\+?/.exec(data$jscomp$0) || "")));
	          if (
	            "Fennec" == name ||
	            ("Firefox" == name && /\b(?:Android|Firefox OS)\b/.test(os))
	          )
	            name = "Firefox Mobile";
	          else if ("Maxthon" == name && userAgent)
	            userAgent = userAgent.replace(/\.[\d.]+/, ".x");
	          else if (/\bXbox\b/i.test(product))
	            "Xbox 360" == product && (os = null),
	              "Xbox 360" == product &&
	                /\bIEMobile\b/.test(ua) &&
	                isCustomContext.unshift("mobile mode");
	          else if (
	            (!/^(?:Chrome|IE|Opera)$/.test(name) &&
	              (!name || product || /Browser|Mobi/.test(name))) ||
	            ("Windows CE" != os && !/Mobi/i.test(ua))
	          )
	            if ("IE" == name && useFeatures)
	              try {
	                null === context.external &&
	                  isCustomContext.unshift("platform preview");
	              } catch (e) {
	                isCustomContext.unshift("embedded");
	              }
	            else
	              (/\bBlackBerry\b/.test(product) || /\bBB10\b/.test(ua)) &&
	              (data$jscomp$0 =
	                (RegExp(product.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(
	                  ua
	                ) || 0)[1] || userAgent)
	                ? ((data$jscomp$0 = [data$jscomp$0, /BB10/.test(ua)]),
	                  (os =
	                    (data$jscomp$0[1]
	                      ? ((product = null), (manufacturer = "BlackBerry"))
	                      : "Device Software") +
	                    " " +
	                    data$jscomp$0[0]),
	                  (userAgent = null))
	                : this != forOwn &&
	                  "Wii" != product &&
	                  ((useFeatures && opera) ||
	                    (/Opera/.test(name) && /\b(?:MSIE|Firefox)\b/i.test(ua)) ||
	                    ("Firefox" == name && /\bOS X (?:\d+\.){2,}/.test(os)) ||
	                    ("IE" == name &&
	                      ((os && !/^Win/.test(os) && 5.5 < userAgent) ||
	                        (/\bWindows XP\b/.test(os) && 8 < userAgent) ||
	                        (8 == userAgent && !/\bTrident\b/.test(ua))))) &&
	                  !reOpera.test(
	                    (data$jscomp$0 = parse.call(
	                      forOwn,
	                      ua.replace(reOpera, "") + ";"
	                    ))
	                  ) &&
	                  data$jscomp$0.name &&
	                  ((data$jscomp$0 =
	                    "ing as " +
	                    data$jscomp$0.name +
	                    ((data$jscomp$0 = data$jscomp$0.version)
	                      ? " " + data$jscomp$0
	                      : "")),
	                  reOpera.test(name)
	                    ? (/\bIE\b/.test(data$jscomp$0) &&
	                        "Mac OS" == os &&
	                        (os = null),
	                      (data$jscomp$0 = "identify" + data$jscomp$0))
	                    : ((data$jscomp$0 = "mask" + data$jscomp$0),
	                      (name = operaClass
	                        ? format(operaClass.replace(/([a-z])([A-Z])/g, "$1 $2"))
	                        : "Opera"),
	                      /\bIE\b/.test(data$jscomp$0) && (os = null),
	                      useFeatures || (userAgent = null)),
	                  (layout = ["Presto"]),
	                  isCustomContext.push(data$jscomp$0));
	          else name += " Mobile";
	          if (
	            (data$jscomp$0 = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(ua) || 0)[1])
	          ) {
	            data$jscomp$0 = [
	              parseFloat(data$jscomp$0.replace(/\.(\d)$/, ".0$1")),
	              data$jscomp$0
	            ];
	            if ("Safari" == name && "+" == data$jscomp$0[1].slice(-1))
	              (name = "WebKit Nightly"),
	                (prerelease = "alpha"),
	                (userAgent = data$jscomp$0[1].slice(0, -1));
	            else if (
	              userAgent == data$jscomp$0[1] ||
	              userAgent ==
	                (data$jscomp$0[2] = (/\bSafari\/([\d.]+\+?)/i.exec(ua) || 0)[1])
	            )
	              userAgent = null;
	            data$jscomp$0[1] = (/\bChrome\/([\d.]+)/i.exec(ua) || 0)[1];
	            537.36 == data$jscomp$0[0] &&
	              537.36 == data$jscomp$0[2] &&
	              28 <= parseFloat(data$jscomp$0[1]) &&
	              "WebKit" == layout &&
	              (layout = ["Blink"]);
	            useFeatures && (likeChrome || data$jscomp$0[1])
	              ? (layout && (layout[1] = "like Chrome"),
	                (data$jscomp$0 =
	                  data$jscomp$0[1] ||
	                  ((data$jscomp$0 = data$jscomp$0[0]),
	                  530 > data$jscomp$0
	                    ? 1
	                    : 532 > data$jscomp$0
	                    ? 2
	                    : 532.05 > data$jscomp$0
	                    ? 3
	                    : 533 > data$jscomp$0
	                    ? 4
	                    : 534.03 > data$jscomp$0
	                    ? 5
	                    : 534.07 > data$jscomp$0
	                    ? 6
	                    : 534.1 > data$jscomp$0
	                    ? 7
	                    : 534.13 > data$jscomp$0
	                    ? 8
	                    : 534.16 > data$jscomp$0
	                    ? 9
	                    : 534.24 > data$jscomp$0
	                    ? 10
	                    : 534.3 > data$jscomp$0
	                    ? 11
	                    : 535.01 > data$jscomp$0
	                    ? 12
	                    : 535.02 > data$jscomp$0
	                    ? "13+"
	                    : 535.07 > data$jscomp$0
	                    ? 15
	                    : 535.11 > data$jscomp$0
	                    ? 16
	                    : 535.19 > data$jscomp$0
	                    ? 17
	                    : 536.05 > data$jscomp$0
	                    ? 18
	                    : 536.1 > data$jscomp$0
	                    ? 19
	                    : 537.01 > data$jscomp$0
	                    ? 20
	                    : 537.11 > data$jscomp$0
	                    ? "21+"
	                    : 537.13 > data$jscomp$0
	                    ? 23
	                    : 537.18 > data$jscomp$0
	                    ? 24
	                    : 537.24 > data$jscomp$0
	                    ? 25
	                    : 537.36 > data$jscomp$0
	                    ? 26
	                    : "Blink" != layout
	                    ? "27"
	                    : "28")))
	              : (layout && (layout[1] = "like Safari"),
	                (data$jscomp$0 = ((data$jscomp$0 = data$jscomp$0[0]),
	                400 > data$jscomp$0
	                  ? 1
	                  : 500 > data$jscomp$0
	                  ? 2
	                  : 526 > data$jscomp$0
	                  ? 3
	                  : 533 > data$jscomp$0
	                  ? 4
	                  : 534 > data$jscomp$0
	                  ? "4+"
	                  : 535 > data$jscomp$0
	                  ? 5
	                  : 537 > data$jscomp$0
	                  ? 6
	                  : 538 > data$jscomp$0
	                  ? 7
	                  : 601 > data$jscomp$0
	                  ? 8
	                  : "8")));
	            layout &&
	              (layout[1] +=
	                " " +
	                (data$jscomp$0 +=
	                  "number" == typeof data$jscomp$0
	                    ? ".x"
	                    : /[.+]/.test(data$jscomp$0)
	                    ? ""
	                    : "+"));
	            "Safari" == name &&
	              (!userAgent || 45 < parseInt(userAgent)) &&
	              (userAgent = data$jscomp$0);
	          }
	          "Opera" == name && (data$jscomp$0 = /\bzbov|zvav$/.exec(os))
	            ? ((name += " "),
	              isCustomContext.unshift("desktop mode"),
	              "zvav" == data$jscomp$0
	                ? ((name += "Mini"), (userAgent = null))
	                : (name += "Mobile"),
	              (os = os.replace(RegExp(" *" + data$jscomp$0 + "$"), "")))
	            : "Safari" == name &&
	              /\bChrome\b/.exec(layout && layout[1]) &&
	              (isCustomContext.unshift("desktop mode"),
	              (name = "Chrome Mobile"),
	              (userAgent = null),
	              /\bOS X\b/.test(os)
	                ? ((manufacturer = "Apple"), (os = "iOS 4.3+"))
	                : (os = null));
	          userAgent &&
	            0 == userAgent.indexOf((data$jscomp$0 = /[\d.]+$/.exec(os))) &&
	            -1 < ua.indexOf("/" + data$jscomp$0 + "-") &&
	            (os = String(os.replace(data$jscomp$0, "")).replace(
	              /^ +| +$/g,
	              ""
	            ));
	          layout &&
	            !/\b(?:Avant|Nook)\b/.test(name) &&
	            (/Browser|Lunascape|Maxthon/.test(name) ||
	              ("Safari" != name &&
	                /^iOS/.test(os) &&
	                /\bSafari\b/.test(layout[1])) ||
	              (/^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(
	                name
	              ) &&
	                layout[1])) &&
	            (data$jscomp$0 = layout[layout.length - 1]) &&
	            isCustomContext.push(data$jscomp$0);
	          isCustomContext.length &&
	            (isCustomContext = ["(" + isCustomContext.join("; ") + ")"]);
	          manufacturer &&
	            product &&
	            0 > product.indexOf(manufacturer) &&
	            isCustomContext.push("on " + manufacturer);
	          product &&
	            isCustomContext.push(
	              (/^on /.test(isCustomContext[isCustomContext.length - 1])
	                ? ""
	                : "on ") + product
	            );
	          if (os) {
	            var isSpecialCasedOS =
	              (data$jscomp$0 = / ([\d.+]+)$/.exec(os)) &&
	              "/" == os.charAt(os.length - data$jscomp$0[0].length - 1);
	            os = {
	              architecture: 32,
	              family:
	                data$jscomp$0 && !isSpecialCasedOS
	                  ? os.replace(data$jscomp$0[0], "")
	                  : os,
	              version: data$jscomp$0 ? data$jscomp$0[1] : null,
	              toString: function() {
	                var version = this.version;
	                return (
	                  this.family +
	                  (version && !isSpecialCasedOS ? " " + version : "") +
	                  (64 == this.architecture ? " 64-bit" : "")
	                );
	              }
	            };
	          }
	          (data$jscomp$0 = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(arch)) &&
	          !/\bi686\b/i.test(arch)
	            ? (os &&
	                ((os.architecture = 64),
	                (os.family = os.family.replace(
	                  RegExp(" *" + data$jscomp$0),
	                  ""
	                ))),
	              name &&
	                (/\bWOW64\b/i.test(ua) ||
	                  (useFeatures &&
	                    /\w(?:86|32)$/.test(nav.cpuClass || nav.platform) &&
	                    !/\bWin64; x64\b/i.test(ua))) &&
	                isCustomContext.unshift("32-bit"))
	            : os &&
	              /^OS X/.test(os.family) &&
	              "Chrome" == name &&
	              39 <= parseFloat(userAgent) &&
	              (os.architecture = 64);
	          ua || (ua = null);
	          context = {};
	          context.description = ua;
	          context.layout = layout && layout[0];
	          context.manufacturer = manufacturer;
	          context.name = name;
	          context.prerelease = prerelease;
	          context.product = product;
	          context.ua = ua;
	          context.version = name && userAgent;
	          context.os = os || {
	            architecture: null,
	            family: null,
	            version: null,
	            toString: function() {
	              return "null";
	            }
	          };
	          context.parse = parse;
	          context.toString = function() {
	            return this.description || "";
	          };
	          context.version && isCustomContext.unshift(userAgent);
	          context.name && isCustomContext.unshift(name);
	          os &&
	            name &&
	            (os != String(os).split(" ")[0] ||
	              (os != name.split(" ")[0] && !product)) &&
	            isCustomContext.push(product ? "(" + os + ")" : "on " + os);
	          isCustomContext.length &&
	            (context.description = isCustomContext.join(" "));
	          return context;
	        }
	        var root =
	            ({ function: !0, object: !0 }[typeof window] && window) || this,
	          freeModule = module && !module.nodeType && module,
	          freeGlobal =
	            exports &&
	            freeModule &&
	            "object" == typeof commonjsGlobal$1 &&
	            commonjsGlobal$1;
	        !freeGlobal ||
	          (freeGlobal.global !== freeGlobal &&
	            freeGlobal.window !== freeGlobal &&
	            freeGlobal.self !== freeGlobal) ||
	          (root = freeGlobal);
	        var maxSafeInteger = Math.pow(2, 53) - 1,
	          reOpera = /\bOpera/;
	        freeGlobal = Object.prototype;
	        var hasOwnProperty = freeGlobal.hasOwnProperty,
	          toString = freeGlobal.toString;
	        freeGlobal = parse();
	        exports && freeModule
	          ? forOwn(freeGlobal, function(value, key) {
	              exports[key] = value;
	            })
	          : (root.platform = freeGlobal);
	      }.call(commonjsGlobal$1));
	    }),
	    ua = Object.freeze({
	      isSp: function() {
	        var os = platform.os.family;
	        return "Android" === os || "iOS" === os || "Windows Phone" === os;
	      },
	      isAndroid: function() {
	        return "Android" === platform.os.family;
	      },
	      isIOS: function() {
	        return "iOS" === platform.os.family;
	      },
	      get: function() {
	        return platform;
	      }
	    });
	  exports$jscomp$0.array = array$jscomp$0;
	  exports$jscomp$0.date = date$jscomp$2;
	  exports$jscomp$0.image = image;
	  exports$jscomp$0.http = http;
	  exports$jscomp$0.collection = collection;
	  exports$jscomp$0.qs = qs;
	  exports$jscomp$0.base64 = base64$1;
	  exports$jscomp$0.jwt = jwt;
	  exports$jscomp$0.ua = ua;
	  exports$jscomp$0.screen = screen;
	  Object.defineProperty(exports$jscomp$0, "__esModule", { value: !0 });
	}
	 factory$jscomp$inline_224(exports)
	  ;
	});

	unwrapExports(lib$1);
	var lib_1 = lib$1.collection;

	const ReactGantt = props => {
	  const ganttRef = React.useRef(null);
	  const [gantt, setGantt] = React.useState();
	  React.useEffect(() => {
	    var _context;

	    // tasksが空配列なら処理を中断する
	    if (props.tasks.length === 0) {
	      return;
	    } // キャメルケースで受け取った値をスネークケースにする。


	    const options = lib_1.toSnakeKeys(props.options);

	    const tasks = map$2(_context = props.tasks).call(_context, rowTasks => lib_1.toSnakeKeys(rowTasks)); // もしガントが表示済みなら更新する・存在しなければ新しく作成する


	    if (gantt) {
	      gantt.refresh(tasks);
	    } else {
	      const ganttInstance = new lib(ganttRef.current, tasks, options); // Ganttインスタンスを保持する

	      setGantt(ganttInstance);
	    }
	  }, [props.tasks, props.options, gantt]);
	  return React__default.createElement("div", {
	    className: "gc__frappe-gantt-react"
	  }, React__default.createElement("svg", {
	    ref: ganttRef,
	    xmlns: "http://www.w3.org/2000/svg",
	    xmlnsXlink: "http://www.w3.org/1999/xlink"
	  }));
	};

	const GanttDemo = () => {
	  const [tasks, setTasks] = React.useState([]);
	  const dummyTasks = [[{
	    id: '1-1',
	    name: 'テスト',
	    start: '2019-7-18',
	    end: '2019-7-19'
	  }, {
	    id: '1-2',
	    name: '2行目',
	    start: '2019-7-21',
	    end: '2019-7-22'
	  }], [{
	    id: '2-1',
	    name: 'a',
	    start: '2019-7-18',
	    end: '2019-7-20',
	    customClass: 'aa'
	  }, {
	    id: '2-2',
	    name: '表示確認',
	    start: '2019-7-22',
	    end: '2019-7-23',
	    customClass: 'aa',
	    custom_class: 'a'
	  }], [{
	    id: '3-1',
	    name: 'a',
	    start: '2019-7-29',
	    end: '2019-7-40',
	    customClass: 'aa'
	  }, {
	    id: '3-2',
	    name: '表示確認',
	    start: '2019-7-29',
	    end: '2019-7-30',
	    customClass: 'aa',
	    custom_class: 'a'
	  }]];
	  const options = {
	    onDateChange: task => {
	      console.log(task);
	    },
	    headerHeight: 50,
	    barHeight: 30,
	    viewMode: 'Day',
	    language: 'ja'
	  };
	  return React__default.createElement("div", null, React__default.createElement(ReactGantt, {
	    tasks: tasks,
	    options: options
	  }), React__default.createElement("button", {
	    onClick: () => setTasks(dummyTasks)
	  }, "\u30AC\u30F3\u30C8\u8868\u793A\u30DC\u30BF\u30F3"));
	};

	var max = Math.max;
	var min$1 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).
	var toAbsoluteIndex = function (index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
	};

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod$1 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
	  includes: createMethod$1(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod$1(false)
	};

	var sloppyArrayMethod = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !method || !fails(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal
	    method.call(null, argument || function () { throw 1; }, 1);
	  });
	};

	var $indexOf = arrayIncludes.indexOf;


	var nativeIndexOf = [].indexOf;

	var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
	var SLOPPY_METHOD = sloppyArrayMethod('indexOf');

	// `Array.prototype.indexOf` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	_export({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || SLOPPY_METHOD }, {
	  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
	    return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? nativeIndexOf.apply(this, arguments) || 0
	      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var indexOf = entryVirtual('Array').indexOf;

	// `String.prototype.{ codePointAt, at }` methods implementation
	var createMethod$2 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = String(requireObjectCoercible($this));
	    var position = toInteger(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = S.charCodeAt(position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING ? S.charAt(position) : first
	        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod$2(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$2(true)
	};

	var functionToString = shared('native-function-to-string', Function.toString);

	var WeakMap = global_1.WeakMap;

	var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(functionToString.call(WeakMap));

	var keys = shared('keys');

	var sharedKey = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var hiddenKeys = {};

	var WeakMap$1 = global_1.WeakMap;
	var set, get, has$1;

	var enforce = function (it) {
	  return has$1(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (nativeWeakMap) {
	  var store$1 = new WeakMap$1();
	  var wmget = store$1.get;
	  var wmhas = store$1.has;
	  var wmset = store$1.set;
	  set = function (it, metadata) {
	    wmset.call(store$1, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget.call(store$1, it) || {};
	  };
	  has$1 = function (it) {
	    return wmhas.call(store$1, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys[STATE] = true;
	  set = function (it, metadata) {
	    hide(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return has(it, STATE) ? it[STATE] : {};
	  };
	  has$1 = function (it) {
	    return has(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has$1,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var correctPrototypeGetter = !fails(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var IE_PROTO = sharedKey('IE_PROTO');
	var ObjectPrototype = Object.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.getprototypeof
	var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectPrototype : null;
	};

	var ITERATOR = wellKnownSymbol('iterator');
	var BUGGY_SAFARI_ITERATORS = false;

	// `%IteratorPrototype%` object
	// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

	if ([].keys) {
	  arrayIterator = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
	  }
	}

	if (IteratorPrototype == undefined) IteratorPrototype = {};

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
	};

	var indexOf$1 = arrayIncludes.indexOf;


	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~indexOf$1(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	// `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys
	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	// `Object.defineProperties` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperties
	var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
	  return O;
	};

	var aFunction$1 = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction$1(path[namespace]) || aFunction$1(global_1[namespace])
	    : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
	};

	var html = getBuiltIn('document', 'documentElement');

	var IE_PROTO$1 = sharedKey('IE_PROTO');

	var PROTOTYPE = 'prototype';
	var Empty = function () { /* empty */ };

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var length = enumBugKeys.length;
	  var lt = '<';
	  var script = 'script';
	  var gt = '>';
	  var js = 'java' + script + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  iframe.src = String(js);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + script + gt + 'document.F=Object' + lt + '/' + script + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (length--) delete createDict[PROTOTYPE][enumBugKeys[length]];
	  return createDict();
	};

	// `Object.create` method
	// https://tc39.github.io/ecma262/#sec-object.create
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : objectDefineProperties(result, Properties);
	};

	hiddenKeys[IE_PROTO$1] = true;

	var TO_STRING_TAG = wellKnownSymbol('toStringTag');
	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof = function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
	};

	var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
	var test = {};

	test[TO_STRING_TAG$1] = 'z';

	// `Object.prototype.toString` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
	var objectToString = String(test) !== '[object z]' ? function toString() {
	  return '[object ' + classof(this) + ']';
	} : test.toString;

	var defineProperty = objectDefineProperty.f;





	var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
	var METHOD_REQUIRED = objectToString !== ({}).toString;

	var setToStringTag = function (it, TAG, STATIC, SET_METHOD) {
	  if (it) {
	    var target = STATIC ? it : it.prototype;
	    if (!has(target, TO_STRING_TAG$2)) {
	      defineProperty(target, TO_STRING_TAG$2, { configurable: true, value: TAG });
	    }
	    if (SET_METHOD && METHOD_REQUIRED) hide(target, 'toString', objectToString);
	  }
	};

	var iterators = {};

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





	var returnThis = function () { return this; };

	var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
	  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
	  iterators[TO_STRING_TAG] = returnThis;
	  return IteratorConstructor;
	};

	var aPossiblePrototype = function (it) {
	  if (!isObject(it) && it !== null) {
	    throw TypeError("Can't set " + String(it) + ' as a prototype');
	  } return it;
	};

	// `Object.setPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
	    setter.call(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    anObject(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter.call(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var redefine = function (target, key, value, options) {
	  if (options && options.enumerable) target[key] = value;
	  else hide(target, key, value);
	};

	var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$1 = wellKnownSymbol('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis$1 = function () { return this; };

	var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor(IteratorConstructor, NAME, next);

	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
	    switch (KIND) {
	      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
	      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
	      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
	    } return function () { return new IteratorConstructor(this); };
	  };

	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR$1]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
	    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
	      iterators[TO_STRING_TAG] = returnThis$1;
	    }
	  }

	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    INCORRECT_VALUES_NAME = true;
	    defaultIterator = function values() { return nativeIterator.call(this); };
	  }

	  // define iterator
	  if (( FORCED) && IterablePrototype[ITERATOR$1] !== defaultIterator) {
	    hide(IterablePrototype, ITERATOR$1, defaultIterator);
	  }
	  iterators[NAME] = defaultIterator;

	  // export additional methods
	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        redefine(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
	  }

	  return methods;
	};

	var charAt = stringMultibyte.charAt;



	var STRING_ITERATOR = 'String Iterator';
	var setInternalState = internalState.set;
	var getInternalState = internalState.getterFor(STRING_ITERATOR);

	// `String.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
	defineIterator(String, 'String', function (iterated) {
	  setInternalState(this, {
	    type: STRING_ITERATOR,
	    string: String(iterated),
	    index: 0
	  });
	// `%StringIteratorPrototype%.next` method
	// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState(this);
	  var string = state.string;
	  var index = state.index;
	  var point;
	  if (index >= string.length) return { value: undefined, done: true };
	  point = charAt(string, index);
	  state.index += point.length;
	  return { value: point, done: false };
	});

	var ITERATOR$2 = wellKnownSymbol('iterator');

	var nativeUrl = !fails(function () {
	  var url = new URL('b?e=1', 'http://a');
	  var searchParams = url.searchParams;
	  url.pathname = 'c%20d';
	  return (isPure && !url.toJSON)
	    || !searchParams.sort
	    || url.href !== 'http://a/c%20d?e=1'
	    || searchParams.get('e') !== '1'
	    || String(new URLSearchParams('?a=1')) !== 'a=1'
	    || !searchParams[ITERATOR$2]
	    // throws in Edge
	    || new URL('https://a@b').username !== 'a'
	    || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b'
	    // not punycoded in Edge
	    || new URL('http://тест').host !== 'xn--e1aybc'
	    // not escaped in Chrome 62-
	    || new URL('http://a#б').hash !== '#%D0%B1';
	});

	var anInstance = function (it, Constructor, name) {
	  if (!(it instanceof Constructor)) {
	    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
	  } return it;
	};

	var f$3 = Object.getOwnPropertySymbols;

	var objectGetOwnPropertySymbols = {
		f: f$3
	};

	var nativeAssign = Object.assign;

	// `Object.assign` method
	// https://tc39.github.io/ecma262/#sec-object.assign
	// should work with symbols and should have deterministic property order (V8 bug)
	var objectAssign = !nativeAssign || fails(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var symbol = Symbol();
	  var alphabet = 'abcdefghijklmnopqrst';
	  A[symbol] = 7;
	  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
	  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = toObject(target);
	  var argumentsLength = arguments.length;
	  var index = 1;
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  var propertyIsEnumerable = objectPropertyIsEnumerable.f;
	  while (argumentsLength > index) {
	    var S = indexedObject(arguments[index++]);
	    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
	    }
	  } return T;
	} : nativeAssign;

	// call something on iterator step with safe closing on error
	var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
	  try {
	    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (error) {
	    var returnMethod = iterator['return'];
	    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
	    throw error;
	  }
	};

	var ITERATOR$3 = wellKnownSymbol('iterator');
	var ArrayPrototype$1 = Array.prototype;

	// check on default Array iterator
	var isArrayIteratorMethod = function (it) {
	  return it !== undefined && (iterators.Array === it || ArrayPrototype$1[ITERATOR$3] === it);
	};

	var createProperty = function (object, key, value) {
	  var propertyKey = toPrimitive(key);
	  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
	  else object[propertyKey] = value;
	};

	var ITERATOR$4 = wellKnownSymbol('iterator');

	var getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$4]
	    || it['@@iterator']
	    || iterators[classof(it)];
	};

	// `Array.from` method implementation
	// https://tc39.github.io/ecma262/#sec-array.from
	var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	  var O = toObject(arrayLike);
	  var C = typeof this == 'function' ? this : Array;
	  var argumentsLength = arguments.length;
	  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
	  var mapping = mapfn !== undefined;
	  var index = 0;
	  var iteratorMethod = getIteratorMethod(O);
	  var length, result, step, iterator;
	  if (mapping) mapfn = bindContext(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
	  // if the target is not iterable or it's an array with the default iterator - use a simple case
	  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
	    iterator = iteratorMethod.call(O);
	    result = new C();
	    for (;!(step = iterator.next()).done; index++) {
	      createProperty(result, index, mapping
	        ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true)
	        : step.value
	      );
	    }
	  } else {
	    length = toLength(O.length);
	    result = new C(length);
	    for (;length > index; index++) {
	      createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	    }
	  }
	  result.length = index;
	  return result;
	};

	// based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js
	var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
	var base = 36;
	var tMin = 1;
	var tMax = 26;
	var skew = 38;
	var damp = 700;
	var initialBias = 72;
	var initialN = 128; // 0x80
	var delimiter = '-'; // '\x2D'
	var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars
	var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
	var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
	var baseMinusTMin = base - tMin;
	var floor$1 = Math.floor;
	var stringFromCharCode = String.fromCharCode;

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 */
	var ucs2decode = function (string) {
	  var output = [];
	  var counter = 0;
	  var length = string.length;
	  while (counter < length) {
	    var value = string.charCodeAt(counter++);
	    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
	      // It's a high surrogate, and there is a next character.
	      var extra = string.charCodeAt(counter++);
	      if ((extra & 0xFC00) == 0xDC00) { // Low surrogate.
	        output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
	      } else {
	        // It's an unmatched surrogate; only append this code unit, in case the
	        // next code unit is the high surrogate of a surrogate pair.
	        output.push(value);
	        counter--;
	      }
	    } else {
	      output.push(value);
	    }
	  }
	  return output;
	};

	/**
	 * Converts a digit/integer into a basic code point.
	 */
	var digitToBasic = function (digit) {
	  //  0..25 map to ASCII a..z or A..Z
	  // 26..35 map to ASCII 0..9
	  return digit + 22 + 75 * (digit < 26);
	};

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 */
	var adapt = function (delta, numPoints, firstTime) {
	  var k = 0;
	  delta = firstTime ? floor$1(delta / damp) : delta >> 1;
	  delta += floor$1(delta / numPoints);
	  for (; delta > baseMinusTMin * tMax >> 1; k += base) {
	    delta = floor$1(delta / baseMinusTMin);
	  }
	  return floor$1(k + (baseMinusTMin + 1) * delta / (delta + skew));
	};

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 */
	// eslint-disable-next-line  max-statements
	var encode = function (input) {
	  var output = [];

	  // Convert the input in UCS-2 to an array of Unicode code points.
	  input = ucs2decode(input);

	  // Cache the length.
	  var inputLength = input.length;

	  // Initialize the state.
	  var n = initialN;
	  var delta = 0;
	  var bias = initialBias;
	  var i, currentValue;

	  // Handle the basic code points.
	  for (i = 0; i < input.length; i++) {
	    currentValue = input[i];
	    if (currentValue < 0x80) {
	      output.push(stringFromCharCode(currentValue));
	    }
	  }

	  var basicLength = output.length; // number of basic code points.
	  var handledCPCount = basicLength; // number of code points that have been handled;

	  // Finish the basic string with a delimiter unless it's empty.
	  if (basicLength) {
	    output.push(delimiter);
	  }

	  // Main encoding loop:
	  while (handledCPCount < inputLength) {
	    // All non-basic code points < n have been handled already. Find the next larger one:
	    var m = maxInt;
	    for (i = 0; i < input.length; i++) {
	      currentValue = input[i];
	      if (currentValue >= n && currentValue < m) {
	        m = currentValue;
	      }
	    }

	    // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.
	    var handledCPCountPlusOne = handledCPCount + 1;
	    if (m - n > floor$1((maxInt - delta) / handledCPCountPlusOne)) {
	      throw RangeError(OVERFLOW_ERROR);
	    }

	    delta += (m - n) * handledCPCountPlusOne;
	    n = m;

	    for (i = 0; i < input.length; i++) {
	      currentValue = input[i];
	      if (currentValue < n && ++delta > maxInt) {
	        throw RangeError(OVERFLOW_ERROR);
	      }
	      if (currentValue == n) {
	        // Represent delta as a generalized variable-length integer.
	        var q = delta;
	        for (var k = base; /* no condition */; k += base) {
	          var t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
	          if (q < t) break;
	          var qMinusT = q - t;
	          var baseMinusT = base - t;
	          output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
	          q = floor$1(qMinusT / baseMinusT);
	        }

	        output.push(stringFromCharCode(digitToBasic(q)));
	        bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
	        delta = 0;
	        ++handledCPCount;
	      }
	    }

	    ++delta;
	    ++n;
	  }
	  return output.join('');
	};

	var punycodeToAscii = function (input) {
	  var encoded = [];
	  var labels = input.toLowerCase().replace(regexSeparators, '\u002E').split('.');
	  var i, label;
	  for (i = 0; i < labels.length; i++) {
	    label = labels[i];
	    encoded.push(regexNonASCII.test(label) ? 'xn--' + encode(label) : label);
	  }
	  return encoded.join('.');
	};

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState$1 = internalState.set;
	var getInternalState$1 = internalState.getterFor(ARRAY_ITERATOR);

	// `Array.prototype.entries` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.entries
	// `Array.prototype.keys` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.keys
	// `Array.prototype.values` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.values
	// `Array.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
	// `CreateArrayIterator` internal method
	// https://tc39.github.io/ecma262/#sec-createarrayiterator
	var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
	  setInternalState$1(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject(iterated), // target
	    index: 0,                          // next index
	    kind: kind                         // kind
	  });
	// `%ArrayIteratorPrototype%.next` method
	// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState$1(this);
	  var target = state.target;
	  var kind = state.kind;
	  var index = state.index++;
	  if (!target || index >= target.length) {
	    state.target = undefined;
	    return { value: undefined, done: true };
	  }
	  if (kind == 'keys') return { value: index, done: false };
	  if (kind == 'values') return { value: target[index], done: false };
	  return { value: [index, target[index]], done: false };
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values%
	// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
	// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
	iterators.Arguments = iterators.Array;

	var redefineAll = function (target, src, options) {
	  for (var key in src) {
	    if (options && options.unsafe && target[key]) target[key] = src[key];
	    else redefine(target, key, src[key], options);
	  } return target;
	};

	var getIterator = function (it) {
	  var iteratorMethod = getIteratorMethod(it);
	  if (typeof iteratorMethod != 'function') {
	    throw TypeError(String(it) + ' is not iterable');
	  } return anObject(iteratorMethod.call(it));
	};

	// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`

















	var ITERATOR$5 = wellKnownSymbol('iterator');
	var URL_SEARCH_PARAMS = 'URLSearchParams';
	var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
	var setInternalState$2 = internalState.set;
	var getInternalParamsState = internalState.getterFor(URL_SEARCH_PARAMS);
	var getInternalIteratorState = internalState.getterFor(URL_SEARCH_PARAMS_ITERATOR);

	var plus = /\+/g;
	var sequences = Array(4);

	var percentSequence = function (bytes) {
	  return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp('((?:%[\\da-f]{2}){' + bytes + '})', 'gi'));
	};

	var percentDecode = function (sequence) {
	  try {
	    return decodeURIComponent(sequence);
	  } catch (error) {
	    return sequence;
	  }
	};

	var deserialize = function (it) {
	  var result = it.replace(plus, ' ');
	  var bytes = 4;
	  try {
	    return decodeURIComponent(result);
	  } catch (error) {
	    while (bytes) {
	      result = result.replace(percentSequence(bytes--), percentDecode);
	    }
	    return result;
	  }
	};

	var find = /[!'()~]|%20/g;

	var replace = {
	  '!': '%21',
	  "'": '%27',
	  '(': '%28',
	  ')': '%29',
	  '~': '%7E',
	  '%20': '+'
	};

	var replacer = function (match) {
	  return replace[match];
	};

	var serialize = function (it) {
	  return encodeURIComponent(it).replace(find, replacer);
	};

	var parseSearchParams = function (result, query) {
	  if (query) {
	    var attributes = query.split('&');
	    var index = 0;
	    var attribute, entry;
	    while (index < attributes.length) {
	      attribute = attributes[index++];
	      if (attribute.length) {
	        entry = attribute.split('=');
	        result.push({
	          key: deserialize(entry.shift()),
	          value: deserialize(entry.join('='))
	        });
	      }
	    }
	  }
	};

	var updateSearchParams = function (query) {
	  this.entries.length = 0;
	  parseSearchParams(this.entries, query);
	};

	var validateArgumentsLength = function (passed, required) {
	  if (passed < required) throw TypeError('Not enough arguments');
	};

	var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
	  setInternalState$2(this, {
	    type: URL_SEARCH_PARAMS_ITERATOR,
	    iterator: getIterator(getInternalParamsState(params).entries),
	    kind: kind
	  });
	}, 'Iterator', function next() {
	  var state = getInternalIteratorState(this);
	  var kind = state.kind;
	  var step = state.iterator.next();
	  var entry = step.value;
	  if (!step.done) {
	    step.value = kind === 'keys' ? entry.key : kind === 'values' ? entry.value : [entry.key, entry.value];
	  } return step;
	});

	// `URLSearchParams` constructor
	// https://url.spec.whatwg.org/#interface-urlsearchparams
	var URLSearchParamsConstructor = function URLSearchParams(/* init */) {
	  anInstance(this, URLSearchParamsConstructor, URL_SEARCH_PARAMS);
	  var init = arguments.length > 0 ? arguments[0] : undefined;
	  var that = this;
	  var entries = [];
	  var iteratorMethod, iterator, step, entryIterator, first, second, key;

	  setInternalState$2(that, {
	    type: URL_SEARCH_PARAMS,
	    entries: entries,
	    updateURL: function () { /* empty */ },
	    updateSearchParams: updateSearchParams
	  });

	  if (init !== undefined) {
	    if (isObject(init)) {
	      iteratorMethod = getIteratorMethod(init);
	      if (typeof iteratorMethod === 'function') {
	        iterator = iteratorMethod.call(init);
	        while (!(step = iterator.next()).done) {
	          entryIterator = getIterator(anObject(step.value));
	          if (
	            (first = entryIterator.next()).done ||
	            (second = entryIterator.next()).done ||
	            !entryIterator.next().done
	          ) throw TypeError('Expected sequence with length 2');
	          entries.push({ key: first.value + '', value: second.value + '' });
	        }
	      } else for (key in init) if (has(init, key)) entries.push({ key: key, value: init[key] + '' });
	    } else {
	      parseSearchParams(entries, typeof init === 'string' ? init.charAt(0) === '?' ? init.slice(1) : init : init + '');
	    }
	  }
	};

	var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;

	redefineAll(URLSearchParamsPrototype, {
	  // `URLSearchParams.prototype.appent` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
	  append: function append(name, value) {
	    validateArgumentsLength(arguments.length, 2);
	    var state = getInternalParamsState(this);
	    state.entries.push({ key: name + '', value: value + '' });
	    state.updateURL();
	  },
	  // `URLSearchParams.prototype.delete` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
	  'delete': function (name) {
	    validateArgumentsLength(arguments.length, 1);
	    var state = getInternalParamsState(this);
	    var entries = state.entries;
	    var key = name + '';
	    var index = 0;
	    while (index < entries.length) {
	      if (entries[index].key === key) entries.splice(index, 1);
	      else index++;
	    }
	    state.updateURL();
	  },
	  // `URLSearchParams.prototype.get` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
	  get: function get(name) {
	    validateArgumentsLength(arguments.length, 1);
	    var entries = getInternalParamsState(this).entries;
	    var key = name + '';
	    var index = 0;
	    for (; index < entries.length; index++) {
	      if (entries[index].key === key) return entries[index].value;
	    }
	    return null;
	  },
	  // `URLSearchParams.prototype.getAll` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
	  getAll: function getAll(name) {
	    validateArgumentsLength(arguments.length, 1);
	    var entries = getInternalParamsState(this).entries;
	    var key = name + '';
	    var result = [];
	    var index = 0;
	    for (; index < entries.length; index++) {
	      if (entries[index].key === key) result.push(entries[index].value);
	    }
	    return result;
	  },
	  // `URLSearchParams.prototype.has` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
	  has: function has(name) {
	    validateArgumentsLength(arguments.length, 1);
	    var entries = getInternalParamsState(this).entries;
	    var key = name + '';
	    var index = 0;
	    while (index < entries.length) {
	      if (entries[index++].key === key) return true;
	    }
	    return false;
	  },
	  // `URLSearchParams.prototype.set` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-set
	  set: function set(name, value) {
	    validateArgumentsLength(arguments.length, 1);
	    var state = getInternalParamsState(this);
	    var entries = state.entries;
	    var found = false;
	    var key = name + '';
	    var val = value + '';
	    var index = 0;
	    var entry;
	    for (; index < entries.length; index++) {
	      entry = entries[index];
	      if (entry.key === key) {
	        if (found) entries.splice(index--, 1);
	        else {
	          found = true;
	          entry.value = val;
	        }
	      }
	    }
	    if (!found) entries.push({ key: key, value: val });
	    state.updateURL();
	  },
	  // `URLSearchParams.prototype.sort` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
	  sort: function sort() {
	    var state = getInternalParamsState(this);
	    var entries = state.entries;
	    // Array#sort is not stable in some engines
	    var slice = entries.slice();
	    var entry, entriesIndex, sliceIndex;
	    entries.length = 0;
	    for (sliceIndex = 0; sliceIndex < slice.length; sliceIndex++) {
	      entry = slice[sliceIndex];
	      for (entriesIndex = 0; entriesIndex < sliceIndex; entriesIndex++) {
	        if (entries[entriesIndex].key > entry.key) {
	          entries.splice(entriesIndex, 0, entry);
	          break;
	        }
	      }
	      if (entriesIndex === sliceIndex) entries.push(entry);
	    }
	    state.updateURL();
	  },
	  // `URLSearchParams.prototype.forEach` method
	  forEach: function forEach(callback /* , thisArg */) {
	    var entries = getInternalParamsState(this).entries;
	    var boundFunction = bindContext(callback, arguments.length > 1 ? arguments[1] : undefined, 3);
	    var index = 0;
	    var entry;
	    while (index < entries.length) {
	      entry = entries[index++];
	      boundFunction(entry.value, entry.key, this);
	    }
	  },
	  // `URLSearchParams.prototype.keys` method
	  keys: function keys() {
	    return new URLSearchParamsIterator(this, 'keys');
	  },
	  // `URLSearchParams.prototype.values` method
	  values: function values() {
	    return new URLSearchParamsIterator(this, 'values');
	  },
	  // `URLSearchParams.prototype.entries` method
	  entries: function entries() {
	    return new URLSearchParamsIterator(this, 'entries');
	  }
	}, { enumerable: true });

	// `URLSearchParams.prototype[@@iterator]` method
	redefine(URLSearchParamsPrototype, ITERATOR$5, URLSearchParamsPrototype.entries);

	// `URLSearchParams.prototype.toString` method
	// https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
	redefine(URLSearchParamsPrototype, 'toString', function toString() {
	  var entries = getInternalParamsState(this).entries;
	  var result = [];
	  var index = 0;
	  var entry;
	  while (index < entries.length) {
	    entry = entries[index++];
	    result.push(serialize(entry.key) + '=' + serialize(entry.value));
	  } return result.join('&');
	}, { enumerable: true });

	setToStringTag(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

	_export({ global: true, forced: !nativeUrl }, {
	  URLSearchParams: URLSearchParamsConstructor
	});

	var web_urlSearchParams = {
	  URLSearchParams: URLSearchParamsConstructor,
	  getState: getInternalParamsState
	};

	// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`











	var codeAt = stringMultibyte.codeAt;





	var NativeURL = global_1.URL;
	var URLSearchParams$1 = web_urlSearchParams.URLSearchParams;
	var getInternalSearchParamsState = web_urlSearchParams.getState;
	var setInternalState$3 = internalState.set;
	var getInternalURLState = internalState.getterFor('URL');
	var floor$2 = Math.floor;
	var pow = Math.pow;

	var INVALID_AUTHORITY = 'Invalid authority';
	var INVALID_SCHEME = 'Invalid scheme';
	var INVALID_HOST = 'Invalid host';
	var INVALID_PORT = 'Invalid port';

	var ALPHA = /[A-Za-z]/;
	var ALPHANUMERIC = /[\d+\-.A-Za-z]/;
	var DIGIT = /\d/;
	var HEX_START = /^(0x|0X)/;
	var OCT = /^[0-7]+$/;
	var DEC = /^\d+$/;
	var HEX = /^[\dA-Fa-f]+$/;
	// eslint-disable-next-line no-control-regex
	var FORBIDDEN_HOST_CODE_POINT = /[\u0000\u0009\u000A\u000D #%/:?@[\\]]/;
	// eslint-disable-next-line no-control-regex
	var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\u0000\u0009\u000A\u000D #/:?@[\\]]/;
	// eslint-disable-next-line no-control-regex
	var LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE = /^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g;
	// eslint-disable-next-line no-control-regex
	var TAB_AND_NEW_LINE = /[\u0009\u000A\u000D]/g;
	var EOF;

	var parseHost = function (url, input) {
	  var result, codePoints, index;
	  if (input.charAt(0) == '[') {
	    if (input.charAt(input.length - 1) != ']') return INVALID_HOST;
	    result = parseIPv6(input.slice(1, -1));
	    if (!result) return INVALID_HOST;
	    url.host = result;
	  // opaque host
	  } else if (!isSpecial(url)) {
	    if (FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT.test(input)) return INVALID_HOST;
	    result = '';
	    codePoints = arrayFrom(input);
	    for (index = 0; index < codePoints.length; index++) {
	      result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
	    }
	    url.host = result;
	  } else {
	    input = punycodeToAscii(input);
	    if (FORBIDDEN_HOST_CODE_POINT.test(input)) return INVALID_HOST;
	    result = parseIPv4(input);
	    if (result === null) return INVALID_HOST;
	    url.host = result;
	  }
	};

	var parseIPv4 = function (input) {
	  var parts = input.split('.');
	  var partsLength, numbers, index, part, radix, number, ipv4;
	  if (parts.length && parts[parts.length - 1] == '') {
	    parts.pop();
	  }
	  partsLength = parts.length;
	  if (partsLength > 4) return input;
	  numbers = [];
	  for (index = 0; index < partsLength; index++) {
	    part = parts[index];
	    if (part == '') return input;
	    radix = 10;
	    if (part.length > 1 && part.charAt(0) == '0') {
	      radix = HEX_START.test(part) ? 16 : 8;
	      part = part.slice(radix == 8 ? 1 : 2);
	    }
	    if (part === '') {
	      number = 0;
	    } else {
	      if (!(radix == 10 ? DEC : radix == 8 ? OCT : HEX).test(part)) return input;
	      number = parseInt(part, radix);
	    }
	    numbers.push(number);
	  }
	  for (index = 0; index < partsLength; index++) {
	    number = numbers[index];
	    if (index == partsLength - 1) {
	      if (number >= pow(256, 5 - partsLength)) return null;
	    } else if (number > 255) return null;
	  }
	  ipv4 = numbers.pop();
	  for (index = 0; index < numbers.length; index++) {
	    ipv4 += numbers[index] * pow(256, 3 - index);
	  }
	  return ipv4;
	};

	// eslint-disable-next-line max-statements
	var parseIPv6 = function (input) {
	  var address = [0, 0, 0, 0, 0, 0, 0, 0];
	  var pieceIndex = 0;
	  var compress = null;
	  var pointer = 0;
	  var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

	  var char = function () {
	    return input.charAt(pointer);
	  };

	  if (char() == ':') {
	    if (input.charAt(1) != ':') return;
	    pointer += 2;
	    pieceIndex++;
	    compress = pieceIndex;
	  }
	  while (char()) {
	    if (pieceIndex == 8) return;
	    if (char() == ':') {
	      if (compress !== null) return;
	      pointer++;
	      pieceIndex++;
	      compress = pieceIndex;
	      continue;
	    }
	    value = length = 0;
	    while (length < 4 && HEX.test(char())) {
	      value = value * 16 + parseInt(char(), 16);
	      pointer++;
	      length++;
	    }
	    if (char() == '.') {
	      if (length == 0) return;
	      pointer -= length;
	      if (pieceIndex > 6) return;
	      numbersSeen = 0;
	      while (char()) {
	        ipv4Piece = null;
	        if (numbersSeen > 0) {
	          if (char() == '.' && numbersSeen < 4) pointer++;
	          else return;
	        }
	        if (!DIGIT.test(char())) return;
	        while (DIGIT.test(char())) {
	          number = parseInt(char(), 10);
	          if (ipv4Piece === null) ipv4Piece = number;
	          else if (ipv4Piece == 0) return;
	          else ipv4Piece = ipv4Piece * 10 + number;
	          if (ipv4Piece > 255) return;
	          pointer++;
	        }
	        address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
	        numbersSeen++;
	        if (numbersSeen == 2 || numbersSeen == 4) pieceIndex++;
	      }
	      if (numbersSeen != 4) return;
	      break;
	    } else if (char() == ':') {
	      pointer++;
	      if (!char()) return;
	    } else if (char()) return;
	    address[pieceIndex++] = value;
	  }
	  if (compress !== null) {
	    swaps = pieceIndex - compress;
	    pieceIndex = 7;
	    while (pieceIndex != 0 && swaps > 0) {
	      swap = address[pieceIndex];
	      address[pieceIndex--] = address[compress + swaps - 1];
	      address[compress + --swaps] = swap;
	    }
	  } else if (pieceIndex != 8) return;
	  return address;
	};

	var findLongestZeroSequence = function (ipv6) {
	  var maxIndex = null;
	  var maxLength = 1;
	  var currStart = null;
	  var currLength = 0;
	  var index = 0;
	  for (; index < 8; index++) {
	    if (ipv6[index] !== 0) {
	      if (currLength > maxLength) {
	        maxIndex = currStart;
	        maxLength = currLength;
	      }
	      currStart = null;
	      currLength = 0;
	    } else {
	      if (currStart === null) currStart = index;
	      ++currLength;
	    }
	  }
	  if (currLength > maxLength) {
	    maxIndex = currStart;
	    maxLength = currLength;
	  }
	  return maxIndex;
	};

	var serializeHost = function (host) {
	  var result, index, compress, ignore0;
	  // ipv4
	  if (typeof host == 'number') {
	    result = [];
	    for (index = 0; index < 4; index++) {
	      result.unshift(host % 256);
	      host = floor$2(host / 256);
	    } return result.join('.');
	  // ipv6
	  } else if (typeof host == 'object') {
	    result = '';
	    compress = findLongestZeroSequence(host);
	    for (index = 0; index < 8; index++) {
	      if (ignore0 && host[index] === 0) continue;
	      if (ignore0) ignore0 = false;
	      if (compress === index) {
	        result += index ? ':' : '::';
	        ignore0 = true;
	      } else {
	        result += host[index].toString(16);
	        if (index < 7) result += ':';
	      }
	    }
	    return '[' + result + ']';
	  } return host;
	};

	var C0ControlPercentEncodeSet = {};
	var fragmentPercentEncodeSet = objectAssign({}, C0ControlPercentEncodeSet, {
	  ' ': 1, '"': 1, '<': 1, '>': 1, '`': 1
	});
	var pathPercentEncodeSet = objectAssign({}, fragmentPercentEncodeSet, {
	  '#': 1, '?': 1, '{': 1, '}': 1
	});
	var userinfoPercentEncodeSet = objectAssign({}, pathPercentEncodeSet, {
	  '/': 1, ':': 1, ';': 1, '=': 1, '@': 1, '[': 1, '\\': 1, ']': 1, '^': 1, '|': 1
	});

	var percentEncode = function (char, set) {
	  var code = codeAt(char, 0);
	  return code > 0x20 && code < 0x7F && !has(set, char) ? char : encodeURIComponent(char);
	};

	var specialSchemes = {
	  ftp: 21,
	  file: null,
	  gopher: 70,
	  http: 80,
	  https: 443,
	  ws: 80,
	  wss: 443
	};

	var isSpecial = function (url) {
	  return has(specialSchemes, url.scheme);
	};

	var includesCredentials = function (url) {
	  return url.username != '' || url.password != '';
	};

	var cannotHaveUsernamePasswordPort = function (url) {
	  return !url.host || url.cannotBeABaseURL || url.scheme == 'file';
	};

	var isWindowsDriveLetter = function (string, normalized) {
	  var second;
	  return string.length == 2 && ALPHA.test(string.charAt(0))
	    && ((second = string.charAt(1)) == ':' || (!normalized && second == '|'));
	};

	var startsWithWindowsDriveLetter = function (string) {
	  var third;
	  return string.length > 1 && isWindowsDriveLetter(string.slice(0, 2)) && (
	    string.length == 2 ||
	    ((third = string.charAt(2)) === '/' || third === '\\' || third === '?' || third === '#')
	  );
	};

	var shortenURLsPath = function (url) {
	  var path = url.path;
	  var pathSize = path.length;
	  if (pathSize && (url.scheme != 'file' || pathSize != 1 || !isWindowsDriveLetter(path[0], true))) {
	    path.pop();
	  }
	};

	var isSingleDot = function (segment) {
	  return segment === '.' || segment.toLowerCase() === '%2e';
	};

	var isDoubleDot = function (segment) {
	  segment = segment.toLowerCase();
	  return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
	};

	// States:
	var SCHEME_START = {};
	var SCHEME = {};
	var NO_SCHEME = {};
	var SPECIAL_RELATIVE_OR_AUTHORITY = {};
	var PATH_OR_AUTHORITY = {};
	var RELATIVE = {};
	var RELATIVE_SLASH = {};
	var SPECIAL_AUTHORITY_SLASHES = {};
	var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
	var AUTHORITY = {};
	var HOST = {};
	var HOSTNAME = {};
	var PORT = {};
	var FILE = {};
	var FILE_SLASH = {};
	var FILE_HOST = {};
	var PATH_START = {};
	var PATH = {};
	var CANNOT_BE_A_BASE_URL_PATH = {};
	var QUERY = {};
	var FRAGMENT = {};

	// eslint-disable-next-line max-statements
	var parseURL = function (url, input, stateOverride, base) {
	  var state = stateOverride || SCHEME_START;
	  var pointer = 0;
	  var buffer = '';
	  var seenAt = false;
	  var seenBracket = false;
	  var seenPasswordToken = false;
	  var codePoints, char, bufferCodePoints, failure;

	  if (!stateOverride) {
	    url.scheme = '';
	    url.username = '';
	    url.password = '';
	    url.host = null;
	    url.port = null;
	    url.path = [];
	    url.query = null;
	    url.fragment = null;
	    url.cannotBeABaseURL = false;
	    input = input.replace(LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE, '');
	  }

	  input = input.replace(TAB_AND_NEW_LINE, '');

	  codePoints = arrayFrom(input);

	  while (pointer <= codePoints.length) {
	    char = codePoints[pointer];
	    switch (state) {
	      case SCHEME_START:
	        if (char && ALPHA.test(char)) {
	          buffer += char.toLowerCase();
	          state = SCHEME;
	        } else if (!stateOverride) {
	          state = NO_SCHEME;
	          continue;
	        } else return INVALID_SCHEME;
	        break;

	      case SCHEME:
	        if (char && (ALPHANUMERIC.test(char) || char == '+' || char == '-' || char == '.')) {
	          buffer += char.toLowerCase();
	        } else if (char == ':') {
	          if (stateOverride && (
	            (isSpecial(url) != has(specialSchemes, buffer)) ||
	            (buffer == 'file' && (includesCredentials(url) || url.port !== null)) ||
	            (url.scheme == 'file' && !url.host)
	          )) return;
	          url.scheme = buffer;
	          if (stateOverride) {
	            if (isSpecial(url) && specialSchemes[url.scheme] == url.port) url.port = null;
	            return;
	          }
	          buffer = '';
	          if (url.scheme == 'file') {
	            state = FILE;
	          } else if (isSpecial(url) && base && base.scheme == url.scheme) {
	            state = SPECIAL_RELATIVE_OR_AUTHORITY;
	          } else if (isSpecial(url)) {
	            state = SPECIAL_AUTHORITY_SLASHES;
	          } else if (codePoints[pointer + 1] == '/') {
	            state = PATH_OR_AUTHORITY;
	            pointer++;
	          } else {
	            url.cannotBeABaseURL = true;
	            url.path.push('');
	            state = CANNOT_BE_A_BASE_URL_PATH;
	          }
	        } else if (!stateOverride) {
	          buffer = '';
	          state = NO_SCHEME;
	          pointer = 0;
	          continue;
	        } else return INVALID_SCHEME;
	        break;

	      case NO_SCHEME:
	        if (!base || (base.cannotBeABaseURL && char != '#')) return INVALID_SCHEME;
	        if (base.cannotBeABaseURL && char == '#') {
	          url.scheme = base.scheme;
	          url.path = base.path.slice();
	          url.query = base.query;
	          url.fragment = '';
	          url.cannotBeABaseURL = true;
	          state = FRAGMENT;
	          break;
	        }
	        state = base.scheme == 'file' ? FILE : RELATIVE;
	        continue;

	      case SPECIAL_RELATIVE_OR_AUTHORITY:
	        if (char == '/' && codePoints[pointer + 1] == '/') {
	          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
	          pointer++;
	        } else {
	          state = RELATIVE;
	          continue;
	        } break;

	      case PATH_OR_AUTHORITY:
	        if (char == '/') {
	          state = AUTHORITY;
	          break;
	        } else {
	          state = PATH;
	          continue;
	        }

	      case RELATIVE:
	        url.scheme = base.scheme;
	        if (char == EOF) {
	          url.username = base.username;
	          url.password = base.password;
	          url.host = base.host;
	          url.port = base.port;
	          url.path = base.path.slice();
	          url.query = base.query;
	        } else if (char == '/' || (char == '\\' && isSpecial(url))) {
	          state = RELATIVE_SLASH;
	        } else if (char == '?') {
	          url.username = base.username;
	          url.password = base.password;
	          url.host = base.host;
	          url.port = base.port;
	          url.path = base.path.slice();
	          url.query = '';
	          state = QUERY;
	        } else if (char == '#') {
	          url.username = base.username;
	          url.password = base.password;
	          url.host = base.host;
	          url.port = base.port;
	          url.path = base.path.slice();
	          url.query = base.query;
	          url.fragment = '';
	          state = FRAGMENT;
	        } else {
	          url.username = base.username;
	          url.password = base.password;
	          url.host = base.host;
	          url.port = base.port;
	          url.path = base.path.slice();
	          url.path.pop();
	          state = PATH;
	          continue;
	        } break;

	      case RELATIVE_SLASH:
	        if (isSpecial(url) && (char == '/' || char == '\\')) {
	          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
	        } else if (char == '/') {
	          state = AUTHORITY;
	        } else {
	          url.username = base.username;
	          url.password = base.password;
	          url.host = base.host;
	          url.port = base.port;
	          state = PATH;
	          continue;
	        } break;

	      case SPECIAL_AUTHORITY_SLASHES:
	        state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
	        if (char != '/' || buffer.charAt(pointer + 1) != '/') continue;
	        pointer++;
	        break;

	      case SPECIAL_AUTHORITY_IGNORE_SLASHES:
	        if (char != '/' && char != '\\') {
	          state = AUTHORITY;
	          continue;
	        } break;

	      case AUTHORITY:
	        if (char == '@') {
	          if (seenAt) buffer = '%40' + buffer;
	          seenAt = true;
	          bufferCodePoints = arrayFrom(buffer);
	          for (var i = 0; i < bufferCodePoints.length; i++) {
	            var codePoint = bufferCodePoints[i];
	            if (codePoint == ':' && !seenPasswordToken) {
	              seenPasswordToken = true;
	              continue;
	            }
	            var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
	            if (seenPasswordToken) url.password += encodedCodePoints;
	            else url.username += encodedCodePoints;
	          }
	          buffer = '';
	        } else if (
	          char == EOF || char == '/' || char == '?' || char == '#' ||
	          (char == '\\' && isSpecial(url))
	        ) {
	          if (seenAt && buffer == '') return INVALID_AUTHORITY;
	          pointer -= arrayFrom(buffer).length + 1;
	          buffer = '';
	          state = HOST;
	        } else buffer += char;
	        break;

	      case HOST:
	      case HOSTNAME:
	        if (stateOverride && url.scheme == 'file') {
	          state = FILE_HOST;
	          continue;
	        } else if (char == ':' && !seenBracket) {
	          if (buffer == '') return INVALID_HOST;
	          failure = parseHost(url, buffer);
	          if (failure) return failure;
	          buffer = '';
	          state = PORT;
	          if (stateOverride == HOSTNAME) return;
	        } else if (
	          char == EOF || char == '/' || char == '?' || char == '#' ||
	          (char == '\\' && isSpecial(url))
	        ) {
	          if (isSpecial(url) && buffer == '') return INVALID_HOST;
	          if (stateOverride && buffer == '' && (includesCredentials(url) || url.port !== null)) return;
	          failure = parseHost(url, buffer);
	          if (failure) return failure;
	          buffer = '';
	          state = PATH_START;
	          if (stateOverride) return;
	          continue;
	        } else {
	          if (char == '[') seenBracket = true;
	          else if (char == ']') seenBracket = false;
	          buffer += char;
	        } break;

	      case PORT:
	        if (DIGIT.test(char)) {
	          buffer += char;
	        } else if (
	          char == EOF || char == '/' || char == '?' || char == '#' ||
	          (char == '\\' && isSpecial(url)) ||
	          stateOverride
	        ) {
	          if (buffer != '') {
	            var port = parseInt(buffer, 10);
	            if (port > 0xFFFF) return INVALID_PORT;
	            url.port = (isSpecial(url) && port === specialSchemes[url.scheme]) ? null : port;
	            buffer = '';
	          }
	          if (stateOverride) return;
	          state = PATH_START;
	          continue;
	        } else return INVALID_PORT;
	        break;

	      case FILE:
	        url.scheme = 'file';
	        if (char == '/' || char == '\\') state = FILE_SLASH;
	        else if (base && base.scheme == 'file') {
	          if (char == EOF) {
	            url.host = base.host;
	            url.path = base.path.slice();
	            url.query = base.query;
	          } else if (char == '?') {
	            url.host = base.host;
	            url.path = base.path.slice();
	            url.query = '';
	            state = QUERY;
	          } else if (char == '#') {
	            url.host = base.host;
	            url.path = base.path.slice();
	            url.query = base.query;
	            url.fragment = '';
	            state = FRAGMENT;
	          } else {
	            if (!startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
	              url.host = base.host;
	              url.path = base.path.slice();
	              shortenURLsPath(url);
	            }
	            state = PATH;
	            continue;
	          }
	        } else {
	          state = PATH;
	          continue;
	        } break;

	      case FILE_SLASH:
	        if (char == '/' || char == '\\') {
	          state = FILE_HOST;
	          break;
	        }
	        if (base && base.scheme == 'file' && !startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
	          if (isWindowsDriveLetter(base.path[0], true)) url.path.push(base.path[0]);
	          else url.host = base.host;
	        }
	        state = PATH;
	        continue;

	      case FILE_HOST:
	        if (char == EOF || char == '/' || char == '\\' || char == '?' || char == '#') {
	          if (!stateOverride && isWindowsDriveLetter(buffer)) {
	            state = PATH;
	          } else if (buffer == '') {
	            url.host = '';
	            if (stateOverride) return;
	            state = PATH_START;
	          } else {
	            failure = parseHost(url, buffer);
	            if (failure) return failure;
	            if (url.host == 'localhost') url.host = '';
	            if (stateOverride) return;
	            buffer = '';
	            state = PATH_START;
	          } continue;
	        } else buffer += char;
	        break;

	      case PATH_START:
	        if (isSpecial(url)) {
	          state = PATH;
	          if (char != '/' && char != '\\') continue;
	        } else if (!stateOverride && char == '?') {
	          url.query = '';
	          state = QUERY;
	        } else if (!stateOverride && char == '#') {
	          url.fragment = '';
	          state = FRAGMENT;
	        } else if (char != EOF) {
	          state = PATH;
	          if (char != '/') continue;
	        } break;

	      case PATH:
	        if (
	          char == EOF || char == '/' ||
	          (char == '\\' && isSpecial(url)) ||
	          (!stateOverride && (char == '?' || char == '#'))
	        ) {
	          if (isDoubleDot(buffer)) {
	            shortenURLsPath(url);
	            if (char != '/' && !(char == '\\' && isSpecial(url))) {
	              url.path.push('');
	            }
	          } else if (isSingleDot(buffer)) {
	            if (char != '/' && !(char == '\\' && isSpecial(url))) {
	              url.path.push('');
	            }
	          } else {
	            if (url.scheme == 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
	              if (url.host) url.host = '';
	              buffer = buffer.charAt(0) + ':'; // normalize windows drive letter
	            }
	            url.path.push(buffer);
	          }
	          buffer = '';
	          if (url.scheme == 'file' && (char == EOF || char == '?' || char == '#')) {
	            while (url.path.length > 1 && url.path[0] === '') {
	              url.path.shift();
	            }
	          }
	          if (char == '?') {
	            url.query = '';
	            state = QUERY;
	          } else if (char == '#') {
	            url.fragment = '';
	            state = FRAGMENT;
	          }
	        } else {
	          buffer += percentEncode(char, pathPercentEncodeSet);
	        } break;

	      case CANNOT_BE_A_BASE_URL_PATH:
	        if (char == '?') {
	          url.query = '';
	          state = QUERY;
	        } else if (char == '#') {
	          url.fragment = '';
	          state = FRAGMENT;
	        } else if (char != EOF) {
	          url.path[0] += percentEncode(char, C0ControlPercentEncodeSet);
	        } break;

	      case QUERY:
	        if (!stateOverride && char == '#') {
	          url.fragment = '';
	          state = FRAGMENT;
	        } else if (char != EOF) {
	          if (char == "'" && isSpecial(url)) url.query += '%27';
	          else if (char == '#') url.query += '%23';
	          else url.query += percentEncode(char, C0ControlPercentEncodeSet);
	        } break;

	      case FRAGMENT:
	        if (char != EOF) url.fragment += percentEncode(char, fragmentPercentEncodeSet);
	        break;
	    }

	    pointer++;
	  }
	};

	// `URL` constructor
	// https://url.spec.whatwg.org/#url-class
	var URLConstructor = function URL(url /* , base */) {
	  var that = anInstance(this, URLConstructor, 'URL');
	  var base = arguments.length > 1 ? arguments[1] : undefined;
	  var urlString = String(url);
	  var state = setInternalState$3(that, { type: 'URL' });
	  var baseState, failure;
	  if (base !== undefined) {
	    if (base instanceof URLConstructor) baseState = getInternalURLState(base);
	    else {
	      failure = parseURL(baseState = {}, String(base));
	      if (failure) throw TypeError(failure);
	    }
	  }
	  failure = parseURL(state, urlString, null, baseState);
	  if (failure) throw TypeError(failure);
	  var searchParams = state.searchParams = new URLSearchParams$1();
	  var searchParamsState = getInternalSearchParamsState(searchParams);
	  searchParamsState.updateSearchParams(state.query);
	  searchParamsState.updateURL = function () {
	    state.query = String(searchParams) || null;
	  };
	  if (!descriptors) {
	    that.href = serializeURL.call(that);
	    that.origin = getOrigin.call(that);
	    that.protocol = getProtocol.call(that);
	    that.username = getUsername.call(that);
	    that.password = getPassword.call(that);
	    that.host = getHost.call(that);
	    that.hostname = getHostname.call(that);
	    that.port = getPort.call(that);
	    that.pathname = getPathname.call(that);
	    that.search = getSearch.call(that);
	    that.searchParams = getSearchParams.call(that);
	    that.hash = getHash.call(that);
	  }
	};

	var URLPrototype = URLConstructor.prototype;

	var serializeURL = function () {
	  var url = getInternalURLState(this);
	  var scheme = url.scheme;
	  var username = url.username;
	  var password = url.password;
	  var host = url.host;
	  var port = url.port;
	  var path = url.path;
	  var query = url.query;
	  var fragment = url.fragment;
	  var output = scheme + ':';
	  if (host !== null) {
	    output += '//';
	    if (includesCredentials(url)) {
	      output += username + (password ? ':' + password : '') + '@';
	    }
	    output += serializeHost(host);
	    if (port !== null) output += ':' + port;
	  } else if (scheme == 'file') output += '//';
	  output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
	  if (query !== null) output += '?' + query;
	  if (fragment !== null) output += '#' + fragment;
	  return output;
	};

	var getOrigin = function () {
	  var url = getInternalURLState(this);
	  var scheme = url.scheme;
	  var port = url.port;
	  if (scheme == 'blob') try {
	    return new URL(scheme.path[0]).origin;
	  } catch (error) {
	    return 'null';
	  }
	  if (scheme == 'file' || !isSpecial(url)) return 'null';
	  return scheme + '://' + serializeHost(url.host) + (port !== null ? ':' + port : '');
	};

	var getProtocol = function () {
	  return getInternalURLState(this).scheme + ':';
	};

	var getUsername = function () {
	  return getInternalURLState(this).username;
	};

	var getPassword = function () {
	  return getInternalURLState(this).password;
	};

	var getHost = function () {
	  var url = getInternalURLState(this);
	  var host = url.host;
	  var port = url.port;
	  return host === null ? ''
	    : port === null ? serializeHost(host)
	    : serializeHost(host) + ':' + port;
	};

	var getHostname = function () {
	  var host = getInternalURLState(this).host;
	  return host === null ? '' : serializeHost(host);
	};

	var getPort = function () {
	  var port = getInternalURLState(this).port;
	  return port === null ? '' : String(port);
	};

	var getPathname = function () {
	  var url = getInternalURLState(this);
	  var path = url.path;
	  return url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
	};

	var getSearch = function () {
	  var query = getInternalURLState(this).query;
	  return query ? '?' + query : '';
	};

	var getSearchParams = function () {
	  return getInternalURLState(this).searchParams;
	};

	var getHash = function () {
	  var fragment = getInternalURLState(this).fragment;
	  return fragment ? '#' + fragment : '';
	};

	var accessorDescriptor = function (getter, setter) {
	  return { get: getter, set: setter, configurable: true, enumerable: true };
	};

	if (descriptors) {
	  objectDefineProperties(URLPrototype, {
	    // `URL.prototype.href` accessors pair
	    // https://url.spec.whatwg.org/#dom-url-href
	    href: accessorDescriptor(serializeURL, function (href) {
	      var url = getInternalURLState(this);
	      var urlString = String(href);
	      var failure = parseURL(url, urlString);
	      if (failure) throw TypeError(failure);
	      getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
	    }),
	    // `URL.prototype.origin` getter
	    // https://url.spec.whatwg.org/#dom-url-origin
	    origin: accessorDescriptor(getOrigin),
	    // `URL.prototype.protocol` accessors pair
	    // https://url.spec.whatwg.org/#dom-url-protocol
	    protocol: accessorDescriptor(getProtocol, function (protocol) {
	      var url = getInternalURLState(this);
	      parseURL(url, String(protocol) + ':', SCHEME_START);
	    }),
	    // `URL.prototype.username` accessors pair
	    // https://url.spec.whatwg.org/#dom-url-username
	    username: accessorDescriptor(getUsername, function (username) {
	      var url = getInternalURLState(this);
	      var codePoints = arrayFrom(String(username));
	      if (cannotHaveUsernamePasswordPort(url)) return;
	      url.username = '';
	      for (var i = 0; i < codePoints.length; i++) {
	        url.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
	      }
	    }),
	    // `URL.prototype.password` accessors pair
	    // https://url.spec.whatwg.org/#dom-url-password
	    password: accessorDescriptor(getPassword, function (password) {
	      var url = getInternalURLState(this);
	      var codePoints = arrayFrom(String(password));
	      if (cannotHaveUsernamePasswordPort(url)) return;
	      url.password = '';
	      for (var i = 0; i < codePoints.length; i++) {
	        url.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
	      }
	    }),
	    // `URL.prototype.host` accessors pair
	    // https://url.spec.whatwg.org/#dom-url-host
	    host: accessorDescriptor(getHost, function (host) {
	      var url = getInternalURLState(this);
	      if (url.cannotBeABaseURL) return;
	      parseURL(url, String(host), HOST);
	    }),
	    // `URL.prototype.hostname` accessors pair
	    // https://url.spec.whatwg.org/#dom-url-hostname
	    hostname: accessorDescriptor(getHostname, function (hostname) {
	      var url = getInternalURLState(this);
	      if (url.cannotBeABaseURL) return;
	      parseURL(url, String(hostname), HOSTNAME);
	    }),
	    // `URL.prototype.port` accessors pair
	    // https://url.spec.whatwg.org/#dom-url-port
	    port: accessorDescriptor(getPort, function (port) {
	      var url = getInternalURLState(this);
	      if (cannotHaveUsernamePasswordPort(url)) return;
	      port = String(port);
	      if (port == '') url.port = null;
	      else parseURL(url, port, PORT);
	    }),
	    // `URL.prototype.pathname` accessors pair
	    // https://url.spec.whatwg.org/#dom-url-pathname
	    pathname: accessorDescriptor(getPathname, function (pathname) {
	      var url = getInternalURLState(this);
	      if (url.cannotBeABaseURL) return;
	      url.path = [];
	      parseURL(url, pathname + '', PATH_START);
	    }),
	    // `URL.prototype.search` accessors pair
	    // https://url.spec.whatwg.org/#dom-url-search
	    search: accessorDescriptor(getSearch, function (search) {
	      var url = getInternalURLState(this);
	      search = String(search);
	      if (search == '') {
	        url.query = null;
	      } else {
	        if ('?' == search.charAt(0)) search = search.slice(1);
	        url.query = '';
	        parseURL(url, search, QUERY);
	      }
	      getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
	    }),
	    // `URL.prototype.searchParams` getter
	    // https://url.spec.whatwg.org/#dom-url-searchparams
	    searchParams: accessorDescriptor(getSearchParams),
	    // `URL.prototype.hash` accessors pair
	    // https://url.spec.whatwg.org/#dom-url-hash
	    hash: accessorDescriptor(getHash, function (hash) {
	      var url = getInternalURLState(this);
	      hash = String(hash);
	      if (hash == '') {
	        url.fragment = null;
	        return;
	      }
	      if ('#' == hash.charAt(0)) hash = hash.slice(1);
	      url.fragment = '';
	      parseURL(url, hash, FRAGMENT);
	    })
	  });
	}

	// `URL.prototype.toJSON` method
	// https://url.spec.whatwg.org/#dom-url-tojson
	redefine(URLPrototype, 'toJSON', function toJSON() {
	  return serializeURL.call(this);
	}, { enumerable: true });

	// `URL.prototype.toString` method
	// https://url.spec.whatwg.org/#URL-stringification-behavior
	redefine(URLPrototype, 'toString', function toString() {
	  return serializeURL.call(this);
	}, { enumerable: true });

	if (NativeURL) {
	  var nativeCreateObjectURL = NativeURL.createObjectURL;
	  var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
	  // `URL.createObjectURL` method
	  // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
	  // eslint-disable-next-line no-unused-vars
	  if (nativeCreateObjectURL) redefine(URLConstructor, 'createObjectURL', function createObjectURL(blob) {
	    return nativeCreateObjectURL.apply(NativeURL, arguments);
	  });
	  // `URL.revokeObjectURL` method
	  // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
	  // eslint-disable-next-line no-unused-vars
	  if (nativeRevokeObjectURL) redefine(URLConstructor, 'revokeObjectURL', function revokeObjectURL(url) {
	    return nativeRevokeObjectURL.apply(NativeURL, arguments);
	  });
	}

	setToStringTag(URLConstructor, 'URL');

	_export({ global: true, forced: !nativeUrl, sham: !descriptors }, {
	  URL: URLConstructor
	});

	// This optional code is used to register a service worker.
	// register() is not called by default.
	// This lets the app load faster on subsequent visits in production, and gives
	// it offline capabilities. However, it also means that developers (and users)
	// will only see deployed updates on subsequent visits to a page, after all the
	// existing tabs open on the page have been closed, since previously cached
	// resources are updated in the background.
	// To learn more about the benefits of this model and instructions on how to
	// opt-in, read https://bit.ly/CRA-PWA
	const isLocalhost = Boolean(window.location.hostname === 'localhost' || // [::1] is the IPv6 localhost address.
	window.location.hostname === '[::1]' || // 127.0.0.1/8 is considered localhost for IPv4.
	window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));

	function unregister() {
	  if ('serviceWorker' in navigator) {
	    navigator.serviceWorker.ready.then(registration => {
	      registration.unregister();
	    });
	  }
	}

	ReactDOM.render(React__default.createElement(GanttDemo, null), document.getElementById('root')); // If you want your app to work offline and load faster, you can change
	// unregister() to register() below. Note this comes with some pitfalls.
	// Learn more about service workers: https://bit.ly/CRA-PWA

	unregister();

}));
