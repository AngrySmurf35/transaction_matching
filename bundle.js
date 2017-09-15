/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind,
    nativeCreate       = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (true) {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.8.3';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };
  _.iteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = property('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  function createReduce(dir) {
    // Optimized iterator function as using arguments.length
    // in the main function will deoptimize the, see #1991.
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }

    return function(obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // Determine the initial value if none is provided.
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var key;
    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, startIndex) {
    var output = [], idx = 0;
    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        //flatten current level of array or arguments object
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0, len = value.length;
        output.length += len;
        while (j < len) {
          output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    return _.unzip(arguments);
  };

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a predicate test
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions
  function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
            i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  }

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var args = slice.call(arguments, 2);
    var bound = function() {
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object
  // In contrast to _.map it returns an object
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys =  _.keys(obj),
          length = keys.length,
          results = {},
          currentKey;
      for (var index = 0; index < length; index++) {
        currentKey = keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(object, oiteratee, context) {
    var result = {}, obj = object, iteratee, keys;
    if (obj == null) return result;
    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      keys = flatten(arguments, false, false, 1);
      iteratee = function(value, key, obj) { return key in obj; };
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), and in Safari 8 (#1929).
  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = property;

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    return obj == null ? function(){} : function(key) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return '' + this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
      return _;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
}.call(this));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Backbone.js 1.3.3

//     (c) 2010-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(factory) {

  // Establish the root object, `window` (`self`) in the browser, or `global` on the server.
  // We use `self` instead of `window` for `WebWorker` support.
  var root = (typeof self == 'object' && self.self === self && self) ||
            (typeof global == 'object' && global.global === global && global);

  // Set up Backbone appropriately for the environment. Start with AMD.
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(3), exports], __WEBPACK_AMD_DEFINE_RESULT__ = function(_, $, exports) {
      // Export global even in AMD case in case this script is loaded with
      // others that may still expect a global Backbone.
      root.Backbone = factory(root, exports, _, $);
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

  // Next for Node.js or CommonJS. jQuery may not be needed as a module.
  } else if (typeof exports !== 'undefined') {
    var _ = require('underscore'), $;
    try { $ = require('jquery'); } catch (e) {}
    factory(root, exports, _, $);

  // Finally, as a browser global.
  } else {
    root.Backbone = factory(root, {}, root._, (root.jQuery || root.Zepto || root.ender || root.$));
  }

})(function(root, Backbone, _, $) {

  // Initial Setup
  // -------------

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  // Create a local reference to a common array method we'll want to use later.
  var slice = Array.prototype.slice;

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '1.3.3';

  // For Backbone's purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
  // the `$` variable.
  Backbone.$ = $;

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PATCH"`, `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... this will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Proxy Backbone class methods to Underscore functions, wrapping the model's
  // `attributes` object or collection's `models` array behind the scenes.
  //
  // collection.filter(function(model) { return model.get('age') > 10 });
  // collection.each(this.addView);
  //
  // `Function#apply` can be slow so we use the method's arg count, if we know it.
  var addMethod = function(length, method, attribute) {
    switch (length) {
      case 1: return function() {
        return _[method](this[attribute]);
      };
      case 2: return function(value) {
        return _[method](this[attribute], value);
      };
      case 3: return function(iteratee, context) {
        return _[method](this[attribute], cb(iteratee, this), context);
      };
      case 4: return function(iteratee, defaultVal, context) {
        return _[method](this[attribute], cb(iteratee, this), defaultVal, context);
      };
      default: return function() {
        var args = slice.call(arguments);
        args.unshift(this[attribute]);
        return _[method].apply(_, args);
      };
    }
  };
  var addUnderscoreMethods = function(Class, methods, attribute) {
    _.each(methods, function(length, method) {
      if (_[method]) Class.prototype[method] = addMethod(length, method, attribute);
    });
  };

  // Support `collection.sortBy('attr')` and `collection.findWhere({id: 1})`.
  var cb = function(iteratee, instance) {
    if (_.isFunction(iteratee)) return iteratee;
    if (_.isObject(iteratee) && !instance._isModel(iteratee)) return modelMatcher(iteratee);
    if (_.isString(iteratee)) return function(model) { return model.get(iteratee); };
    return iteratee;
  };
  var modelMatcher = function(attrs) {
    var matcher = _.matches(attrs);
    return function(model) {
      return matcher(model.attributes);
    };
  };

  // Backbone.Events
  // ---------------

  // A module that can be mixed in to *any object* in order to provide it with
  // a custom event channel. You may bind a callback to an event with `on` or
  // remove with `off`; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  var Events = Backbone.Events = {};

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Iterates over the standard `event, callback` (as well as the fancy multiple
  // space-separated events `"change blur", callback` and jQuery-style event
  // maps `{event: callback}`).
  var eventsApi = function(iteratee, events, name, callback, opts) {
    var i = 0, names;
    if (name && typeof name === 'object') {
      // Handle event maps.
      if (callback !== void 0 && 'context' in opts && opts.context === void 0) opts.context = callback;
      for (names = _.keys(name); i < names.length ; i++) {
        events = eventsApi(iteratee, events, names[i], name[names[i]], opts);
      }
    } else if (name && eventSplitter.test(name)) {
      // Handle space-separated event names by delegating them individually.
      for (names = name.split(eventSplitter); i < names.length; i++) {
        events = iteratee(events, names[i], callback, opts);
      }
    } else {
      // Finally, standard events.
      events = iteratee(events, name, callback, opts);
    }
    return events;
  };

  // Bind an event to a `callback` function. Passing `"all"` will bind
  // the callback to all events fired.
  Events.on = function(name, callback, context) {
    return internalOn(this, name, callback, context);
  };

  // Guard the `listening` argument from the public API.
  var internalOn = function(obj, name, callback, context, listening) {
    obj._events = eventsApi(onApi, obj._events || {}, name, callback, {
      context: context,
      ctx: obj,
      listening: listening
    });

    if (listening) {
      var listeners = obj._listeners || (obj._listeners = {});
      listeners[listening.id] = listening;
    }

    return obj;
  };

  // Inversion-of-control versions of `on`. Tell *this* object to listen to
  // an event in another object... keeping track of what it's listening to
  // for easier unbinding later.
  Events.listenTo = function(obj, name, callback) {
    if (!obj) return this;
    var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
    var listeningTo = this._listeningTo || (this._listeningTo = {});
    var listening = listeningTo[id];

    // This object is not listening to any other events on `obj` yet.
    // Setup the necessary references to track the listening callbacks.
    if (!listening) {
      var thisId = this._listenId || (this._listenId = _.uniqueId('l'));
      listening = listeningTo[id] = {obj: obj, objId: id, id: thisId, listeningTo: listeningTo, count: 0};
    }

    // Bind callbacks on obj, and keep track of them on listening.
    internalOn(obj, name, callback, this, listening);
    return this;
  };

  // The reducing API that adds a callback to the `events` object.
  var onApi = function(events, name, callback, options) {
    if (callback) {
      var handlers = events[name] || (events[name] = []);
      var context = options.context, ctx = options.ctx, listening = options.listening;
      if (listening) listening.count++;

      handlers.push({callback: callback, context: context, ctx: context || ctx, listening: listening});
    }
    return events;
  };

  // Remove one or many callbacks. If `context` is null, removes all
  // callbacks with that function. If `callback` is null, removes all
  // callbacks for the event. If `name` is null, removes all bound
  // callbacks for all events.
  Events.off = function(name, callback, context) {
    if (!this._events) return this;
    this._events = eventsApi(offApi, this._events, name, callback, {
      context: context,
      listeners: this._listeners
    });
    return this;
  };

  // Tell this object to stop listening to either specific events ... or
  // to every object it's currently listening to.
  Events.stopListening = function(obj, name, callback) {
    var listeningTo = this._listeningTo;
    if (!listeningTo) return this;

    var ids = obj ? [obj._listenId] : _.keys(listeningTo);

    for (var i = 0; i < ids.length; i++) {
      var listening = listeningTo[ids[i]];

      // If listening doesn't exist, this object is not currently
      // listening to obj. Break out early.
      if (!listening) break;

      listening.obj.off(name, callback, this);
    }

    return this;
  };

  // The reducing API that removes a callback from the `events` object.
  var offApi = function(events, name, callback, options) {
    if (!events) return;

    var i = 0, listening;
    var context = options.context, listeners = options.listeners;

    // Delete all events listeners and "drop" events.
    if (!name && !callback && !context) {
      var ids = _.keys(listeners);
      for (; i < ids.length; i++) {
        listening = listeners[ids[i]];
        delete listeners[listening.id];
        delete listening.listeningTo[listening.objId];
      }
      return;
    }

    var names = name ? [name] : _.keys(events);
    for (; i < names.length; i++) {
      name = names[i];
      var handlers = events[name];

      // Bail out if there are no events stored.
      if (!handlers) break;

      // Replace events if there are any remaining.  Otherwise, clean up.
      var remaining = [];
      for (var j = 0; j < handlers.length; j++) {
        var handler = handlers[j];
        if (
          callback && callback !== handler.callback &&
            callback !== handler.callback._callback ||
              context && context !== handler.context
        ) {
          remaining.push(handler);
        } else {
          listening = handler.listening;
          if (listening && --listening.count === 0) {
            delete listeners[listening.id];
            delete listening.listeningTo[listening.objId];
          }
        }
      }

      // Update tail event if the list has any events.  Otherwise, clean up.
      if (remaining.length) {
        events[name] = remaining;
      } else {
        delete events[name];
      }
    }
    return events;
  };

  // Bind an event to only be triggered a single time. After the first time
  // the callback is invoked, its listener will be removed. If multiple events
  // are passed in using the space-separated syntax, the handler will fire
  // once for each event, not once for a combination of all events.
  Events.once = function(name, callback, context) {
    // Map the event into a `{event: once}` object.
    var events = eventsApi(onceMap, {}, name, callback, _.bind(this.off, this));
    if (typeof name === 'string' && context == null) callback = void 0;
    return this.on(events, callback, context);
  };

  // Inversion-of-control versions of `once`.
  Events.listenToOnce = function(obj, name, callback) {
    // Map the event into a `{event: once}` object.
    var events = eventsApi(onceMap, {}, name, callback, _.bind(this.stopListening, this, obj));
    return this.listenTo(obj, events);
  };

  // Reduces the event callbacks into a map of `{event: onceWrapper}`.
  // `offer` unbinds the `onceWrapper` after it has been called.
  var onceMap = function(map, name, callback, offer) {
    if (callback) {
      var once = map[name] = _.once(function() {
        offer(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
    }
    return map;
  };

  // Trigger one or many events, firing all bound callbacks. Callbacks are
  // passed the same arguments as `trigger` is, apart from the event name
  // (unless you're listening on `"all"`, which will cause your callback to
  // receive the true name of the event as the first argument).
  Events.trigger = function(name) {
    if (!this._events) return this;

    var length = Math.max(0, arguments.length - 1);
    var args = Array(length);
    for (var i = 0; i < length; i++) args[i] = arguments[i + 1];

    eventsApi(triggerApi, this._events, name, void 0, args);
    return this;
  };

  // Handles triggering the appropriate event callbacks.
  var triggerApi = function(objEvents, name, callback, args) {
    if (objEvents) {
      var events = objEvents[name];
      var allEvents = objEvents.all;
      if (events && allEvents) allEvents = allEvents.slice();
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, [name].concat(args));
    }
    return objEvents;
  };

  // A difficult-to-believe, but optimized internal dispatch function for
  // triggering events. Tries to keep the usual cases speedy (most internal
  // Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args); return;
    }
  };

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Allow the `Backbone` object to serve as a global event bus, for folks who
  // want global "pubsub" in a convenient place.
  _.extend(Backbone, Events);

  // Backbone.Model
  // --------------

  // Backbone **Models** are the basic data object in the framework --
  // frequently representing a row in a table in a database on your server.
  // A discrete chunk of data and a bunch of useful, related methods for
  // performing computations and transformations on that data.

  // Create a new model with the specified attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  var Model = Backbone.Model = function(attributes, options) {
    var attrs = attributes || {};
    options || (options = {});
    this.cid = _.uniqueId(this.cidPrefix);
    this.attributes = {};
    if (options.collection) this.collection = options.collection;
    if (options.parse) attrs = this.parse(attrs, options) || {};
    var defaults = _.result(this, 'defaults');
    attrs = _.defaults(_.extend({}, defaults, attrs), defaults);
    this.set(attrs, options);
    this.changed = {};
    this.initialize.apply(this, arguments);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Model.prototype, Events, {

    // A hash of attributes whose current and previous value differ.
    changed: null,

    // The value returned during the last failed validation.
    validationError: null,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // The prefix is used to create the client id which is used to identify models locally.
    // You may want to override this if you're experiencing name clashes with model ids.
    cidPrefix: 'c',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function(options) {
      return _.clone(this.attributes);
    },

    // Proxy `Backbone.sync` by default -- but override this if you need
    // custom syncing semantics for *this* particular model.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      return _.escape(this.get(attr));
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.get(attr) != null;
    },

    // Special-cased proxy to underscore's `_.matches` method.
    matches: function(attrs) {
      return !!_.iteratee(attrs, this)(this.attributes);
    },

    // Set a hash of model attributes on the object, firing `"change"`. This is
    // the core primitive operation of a model, updating the data and notifying
    // anyone who needs to know about the change in state. The heart of the beast.
    set: function(key, val, options) {
      if (key == null) return this;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      var attrs;
      if (typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options || (options = {});

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Extract attributes and options.
      var unset      = options.unset;
      var silent     = options.silent;
      var changes    = [];
      var changing   = this._changing;
      this._changing = true;

      if (!changing) {
        this._previousAttributes = _.clone(this.attributes);
        this.changed = {};
      }

      var current = this.attributes;
      var changed = this.changed;
      var prev    = this._previousAttributes;

      // For each `set` attribute, update or delete the current value.
      for (var attr in attrs) {
        val = attrs[attr];
        if (!_.isEqual(current[attr], val)) changes.push(attr);
        if (!_.isEqual(prev[attr], val)) {
          changed[attr] = val;
        } else {
          delete changed[attr];
        }
        unset ? delete current[attr] : current[attr] = val;
      }

      // Update the `id`.
      if (this.idAttribute in attrs) this.id = this.get(this.idAttribute);

      // Trigger all relevant attribute changes.
      if (!silent) {
        if (changes.length) this._pending = options;
        for (var i = 0; i < changes.length; i++) {
          this.trigger('change:' + changes[i], this, current[changes[i]], options);
        }
      }

      // You might be wondering why there's a `while` loop here. Changes can
      // be recursively nested within `"change"` events.
      if (changing) return this;
      if (!silent) {
        while (this._pending) {
          options = this._pending;
          this._pending = false;
          this.trigger('change', this, options);
        }
      }
      this._pending = false;
      this._changing = false;
      return this;
    },

    // Remove an attribute from the model, firing `"change"`. `unset` is a noop
    // if the attribute doesn't exist.
    unset: function(attr, options) {
      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
    },

    // Clear all attributes on the model, firing `"change"`.
    clear: function(options) {
      var attrs = {};
      for (var key in this.attributes) attrs[key] = void 0;
      return this.set(attrs, _.extend({}, options, {unset: true}));
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (attr == null) return !_.isEmpty(this.changed);
      return _.has(this.changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
      var old = this._changing ? this._previousAttributes : this.attributes;
      var changed = {};
      for (var attr in diff) {
        var val = diff[attr];
        if (_.isEqual(old[attr], val)) continue;
        changed[attr] = val;
      }
      return _.size(changed) ? changed : false;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (attr == null || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // Fetch the model from the server, merging the response with the model's
    // local attributes. Any changed attributes will trigger a "change" event.
    fetch: function(options) {
      options = _.extend({parse: true}, options);
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        var serverAttrs = options.parse ? model.parse(resp, options) : resp;
        if (!model.set(serverAttrs, options)) return false;
        if (success) success.call(options.context, model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, val, options) {
      // Handle both `"key", value` and `{key: value}` -style arguments.
      var attrs;
      if (key == null || typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options = _.extend({validate: true, parse: true}, options);
      var wait = options.wait;

      // If we're not waiting and attributes exist, save acts as
      // `set(attr).save(null, opts)` with validation. Otherwise, check if
      // the model will be valid when the attributes, if any, are set.
      if (attrs && !wait) {
        if (!this.set(attrs, options)) return false;
      } else if (!this._validate(attrs, options)) {
        return false;
      }

      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.
      var model = this;
      var success = options.success;
      var attributes = this.attributes;
      options.success = function(resp) {
        // Ensure attributes are restored during synchronous saves.
        model.attributes = attributes;
        var serverAttrs = options.parse ? model.parse(resp, options) : resp;
        if (wait) serverAttrs = _.extend({}, attrs, serverAttrs);
        if (serverAttrs && !model.set(serverAttrs, options)) return false;
        if (success) success.call(options.context, model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);

      // Set temporary attributes if `{wait: true}` to properly find new ids.
      if (attrs && wait) this.attributes = _.extend({}, attributes, attrs);

      var method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
      if (method === 'patch' && !options.attrs) options.attrs = attrs;
      var xhr = this.sync(method, this, options);

      // Restore attributes.
      this.attributes = attributes;

      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;
      var wait = options.wait;

      var destroy = function() {
        model.stopListening();
        model.trigger('destroy', model, model.collection, options);
      };

      options.success = function(resp) {
        if (wait) destroy();
        if (success) success.call(options.context, model, resp, options);
        if (!model.isNew()) model.trigger('sync', model, resp, options);
      };

      var xhr = false;
      if (this.isNew()) {
        _.defer(options.success);
      } else {
        wrapError(this, options);
        xhr = this.sync('delete', this, options);
      }
      if (!wait) destroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base =
        _.result(this, 'urlRoot') ||
        _.result(this.collection, 'url') ||
        urlError();
      if (this.isNew()) return base;
      var id = this.get(this.idAttribute);
      return base.replace(/[^\/]$/, '$&/') + encodeURIComponent(id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return !this.has(this.idAttribute);
    },

    // Check if the model is currently in a valid state.
    isValid: function(options) {
      return this._validate({}, _.extend({}, options, {validate: true}));
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
    _validate: function(attrs, options) {
      if (!options.validate || !this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validationError = this.validate(attrs, options) || null;
      if (!error) return true;
      this.trigger('invalid', this, error, _.extend(options, {validationError: error}));
      return false;
    }

  });

  // Underscore methods that we want to implement on the Model, mapped to the
  // number of arguments they take.
  var modelMethods = {keys: 1, values: 1, pairs: 1, invert: 1, pick: 0,
      omit: 0, chain: 1, isEmpty: 1};

  // Mix in each Underscore method as a proxy to `Model#attributes`.
  addUnderscoreMethods(Model, modelMethods, 'attributes');

  // Backbone.Collection
  // -------------------

  // If models tend to represent a single row of data, a Backbone Collection is
  // more analogous to a table full of data ... or a small slice or page of that
  // table, or a collection of rows that belong together for a particular reason
  // -- all of the messages in this particular folder, all of the documents
  // belonging to this particular author, and so on. Collections maintain
  // indexes of their models, both in order, and for lookup by `id`.

  // Create a new **Collection**, perhaps to contain a specific type of `model`.
  // If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  var Collection = Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator !== void 0) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, _.extend({silent: true}, options));
  };

  // Default options for `Collection#set`.
  var setOptions = {add: true, remove: true, merge: true};
  var addOptions = {add: true, remove: false};

  // Splices `insert` into `array` at index `at`.
  var splice = function(array, insert, at) {
    at = Math.min(Math.max(at, 0), array.length);
    var tail = Array(array.length - at);
    var length = insert.length;
    var i;
    for (i = 0; i < tail.length; i++) tail[i] = array[i + at];
    for (i = 0; i < length; i++) array[i + at] = insert[i];
    for (i = 0; i < tail.length; i++) array[i + length + at] = tail[i];
  };

  // Define the Collection's inheritable methods.
  _.extend(Collection.prototype, Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function(options) {
      return this.map(function(model) { return model.toJSON(options); });
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Add a model, or list of models to the set. `models` may be Backbone
    // Models or raw JavaScript objects to be converted to Models, or any
    // combination of the two.
    add: function(models, options) {
      return this.set(models, _.extend({merge: false}, options, addOptions));
    },

    // Remove a model, or a list of models from the set.
    remove: function(models, options) {
      options = _.extend({}, options);
      var singular = !_.isArray(models);
      models = singular ? [models] : models.slice();
      var removed = this._removeModels(models, options);
      if (!options.silent && removed.length) {
        options.changes = {added: [], merged: [], removed: removed};
        this.trigger('update', this, options);
      }
      return singular ? removed[0] : removed;
    },

    // Update a collection by `set`-ing a new list of models, adding new ones,
    // removing models that are no longer present, and merging models that
    // already exist in the collection, as necessary. Similar to **Model#set**,
    // the core operation for updating the data contained by the collection.
    set: function(models, options) {
      if (models == null) return;

      options = _.extend({}, setOptions, options);
      if (options.parse && !this._isModel(models)) {
        models = this.parse(models, options) || [];
      }

      var singular = !_.isArray(models);
      models = singular ? [models] : models.slice();

      var at = options.at;
      if (at != null) at = +at;
      if (at > this.length) at = this.length;
      if (at < 0) at += this.length + 1;

      var set = [];
      var toAdd = [];
      var toMerge = [];
      var toRemove = [];
      var modelMap = {};

      var add = options.add;
      var merge = options.merge;
      var remove = options.remove;

      var sort = false;
      var sortable = this.comparator && at == null && options.sort !== false;
      var sortAttr = _.isString(this.comparator) ? this.comparator : null;

      // Turn bare objects into model references, and prevent invalid models
      // from being added.
      var model, i;
      for (i = 0; i < models.length; i++) {
        model = models[i];

        // If a duplicate is found, prevent it from being added and
        // optionally merge it into the existing model.
        var existing = this.get(model);
        if (existing) {
          if (merge && model !== existing) {
            var attrs = this._isModel(model) ? model.attributes : model;
            if (options.parse) attrs = existing.parse(attrs, options);
            existing.set(attrs, options);
            toMerge.push(existing);
            if (sortable && !sort) sort = existing.hasChanged(sortAttr);
          }
          if (!modelMap[existing.cid]) {
            modelMap[existing.cid] = true;
            set.push(existing);
          }
          models[i] = existing;

        // If this is a new, valid model, push it to the `toAdd` list.
        } else if (add) {
          model = models[i] = this._prepareModel(model, options);
          if (model) {
            toAdd.push(model);
            this._addReference(model, options);
            modelMap[model.cid] = true;
            set.push(model);
          }
        }
      }

      // Remove stale models.
      if (remove) {
        for (i = 0; i < this.length; i++) {
          model = this.models[i];
          if (!modelMap[model.cid]) toRemove.push(model);
        }
        if (toRemove.length) this._removeModels(toRemove, options);
      }

      // See if sorting is needed, update `length` and splice in new models.
      var orderChanged = false;
      var replace = !sortable && add && remove;
      if (set.length && replace) {
        orderChanged = this.length !== set.length || _.some(this.models, function(m, index) {
          return m !== set[index];
        });
        this.models.length = 0;
        splice(this.models, set, 0);
        this.length = this.models.length;
      } else if (toAdd.length) {
        if (sortable) sort = true;
        splice(this.models, toAdd, at == null ? this.length : at);
        this.length = this.models.length;
      }

      // Silently sort the collection if appropriate.
      if (sort) this.sort({silent: true});

      // Unless silenced, it's time to fire all appropriate add/sort/update events.
      if (!options.silent) {
        for (i = 0; i < toAdd.length; i++) {
          if (at != null) options.index = at + i;
          model = toAdd[i];
          model.trigger('add', model, this, options);
        }
        if (sort || orderChanged) this.trigger('sort', this, options);
        if (toAdd.length || toRemove.length || toMerge.length) {
          options.changes = {
            added: toAdd,
            removed: toRemove,
            merged: toMerge
          };
          this.trigger('update', this, options);
        }
      }

      // Return the added (or merged) model (or models).
      return singular ? models[0] : models;
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any granular `add` or `remove` events. Fires `reset` when finished.
    // Useful for bulk operations and optimizations.
    reset: function(models, options) {
      options = options ? _.clone(options) : {};
      for (var i = 0; i < this.models.length; i++) {
        this._removeReference(this.models[i], options);
      }
      options.previousModels = this.models;
      this._reset();
      models = this.add(models, _.extend({silent: true}, options));
      if (!options.silent) this.trigger('reset', this, options);
      return models;
    },

    // Add a model to the end of the collection.
    push: function(model, options) {
      return this.add(model, _.extend({at: this.length}, options));
    },

    // Remove a model from the end of the collection.
    pop: function(options) {
      var model = this.at(this.length - 1);
      return this.remove(model, options);
    },

    // Add a model to the beginning of the collection.
    unshift: function(model, options) {
      return this.add(model, _.extend({at: 0}, options));
    },

    // Remove a model from the beginning of the collection.
    shift: function(options) {
      var model = this.at(0);
      return this.remove(model, options);
    },

    // Slice out a sub-array of models from the collection.
    slice: function() {
      return slice.apply(this.models, arguments);
    },

    // Get a model from the set by id, cid, model object with id or cid
    // properties, or an attributes object that is transformed through modelId.
    get: function(obj) {
      if (obj == null) return void 0;
      return this._byId[obj] ||
        this._byId[this.modelId(obj.attributes || obj)] ||
        obj.cid && this._byId[obj.cid];
    },

    // Returns `true` if the model is in the collection.
    has: function(obj) {
      return this.get(obj) != null;
    },

    // Get the model at the given index.
    at: function(index) {
      if (index < 0) index += this.length;
      return this.models[index];
    },

    // Return models with matching attributes. Useful for simple cases of
    // `filter`.
    where: function(attrs, first) {
      return this[first ? 'find' : 'filter'](attrs);
    },

    // Return the first model with matching attributes. Useful for simple cases
    // of `find`.
    findWhere: function(attrs) {
      return this.where(attrs, true);
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      var comparator = this.comparator;
      if (!comparator) throw new Error('Cannot sort a set without a comparator');
      options || (options = {});

      var length = comparator.length;
      if (_.isFunction(comparator)) comparator = _.bind(comparator, this);

      // Run sort based on type of `comparator`.
      if (length === 1 || _.isString(comparator)) {
        this.models = this.sortBy(comparator);
      } else {
        this.models.sort(comparator);
      }
      if (!options.silent) this.trigger('sort', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return this.map(attr + '');
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `reset: true` is passed, the response
    // data will be passed through the `reset` method instead of `set`.
    fetch: function(options) {
      options = _.extend({parse: true}, options);
      var success = options.success;
      var collection = this;
      options.success = function(resp) {
        var method = options.reset ? 'reset' : 'set';
        collection[method](resp, options);
        if (success) success.call(options.context, collection, resp, options);
        collection.trigger('sync', collection, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      options = options ? _.clone(options) : {};
      var wait = options.wait;
      model = this._prepareModel(model, options);
      if (!model) return false;
      if (!wait) this.add(model, options);
      var collection = this;
      var success = options.success;
      options.success = function(m, resp, callbackOpts) {
        if (wait) collection.add(m, callbackOpts);
        if (success) success.call(callbackOpts.context, m, resp, callbackOpts);
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new collection with an identical list of models as this one.
    clone: function() {
      return new this.constructor(this.models, {
        model: this.model,
        comparator: this.comparator
      });
    },

    // Define how to uniquely identify models in the collection.
    modelId: function(attrs) {
      return attrs[this.model.prototype.idAttribute || 'id'];
    },

    // Private method to reset all internal state. Called when the collection
    // is first initialized or reset.
    _reset: function() {
      this.length = 0;
      this.models = [];
      this._byId  = {};
    },

    // Prepare a hash of attributes (or other model) to be added to this
    // collection.
    _prepareModel: function(attrs, options) {
      if (this._isModel(attrs)) {
        if (!attrs.collection) attrs.collection = this;
        return attrs;
      }
      options = options ? _.clone(options) : {};
      options.collection = this;
      var model = new this.model(attrs, options);
      if (!model.validationError) return model;
      this.trigger('invalid', this, model.validationError, options);
      return false;
    },

    // Internal method called by both remove and set.
    _removeModels: function(models, options) {
      var removed = [];
      for (var i = 0; i < models.length; i++) {
        var model = this.get(models[i]);
        if (!model) continue;

        var index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;

        // Remove references before triggering 'remove' event to prevent an
        // infinite loop. #3693
        delete this._byId[model.cid];
        var id = this.modelId(model.attributes);
        if (id != null) delete this._byId[id];

        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }

        removed.push(model);
        this._removeReference(model, options);
      }
      return removed;
    },

    // Method for checking whether an object should be considered a model for
    // the purposes of adding to the collection.
    _isModel: function(model) {
      return model instanceof Model;
    },

    // Internal method to create a model's ties to a collection.
    _addReference: function(model, options) {
      this._byId[model.cid] = model;
      var id = this.modelId(model.attributes);
      if (id != null) this._byId[id] = model;
      model.on('all', this._onModelEvent, this);
    },

    // Internal method to sever a model's ties to a collection.
    _removeReference: function(model, options) {
      delete this._byId[model.cid];
      var id = this.modelId(model.attributes);
      if (id != null) delete this._byId[id];
      if (this === model.collection) delete model.collection;
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(event, model, collection, options) {
      if (model) {
        if ((event === 'add' || event === 'remove') && collection !== this) return;
        if (event === 'destroy') this.remove(model, options);
        if (event === 'change') {
          var prevId = this.modelId(model.previousAttributes());
          var id = this.modelId(model.attributes);
          if (prevId !== id) {
            if (prevId != null) delete this._byId[prevId];
            if (id != null) this._byId[id] = model;
          }
        }
      }
      this.trigger.apply(this, arguments);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  // 90% of the core usefulness of Backbone Collections is actually implemented
  // right here:
  var collectionMethods = {forEach: 3, each: 3, map: 3, collect: 3, reduce: 0,
      foldl: 0, inject: 0, reduceRight: 0, foldr: 0, find: 3, detect: 3, filter: 3,
      select: 3, reject: 3, every: 3, all: 3, some: 3, any: 3, include: 3, includes: 3,
      contains: 3, invoke: 0, max: 3, min: 3, toArray: 1, size: 1, first: 3,
      head: 3, take: 3, initial: 3, rest: 3, tail: 3, drop: 3, last: 3,
      without: 0, difference: 0, indexOf: 3, shuffle: 1, lastIndexOf: 3,
      isEmpty: 1, chain: 1, sample: 3, partition: 3, groupBy: 3, countBy: 3,
      sortBy: 3, indexBy: 3, findIndex: 3, findLastIndex: 3};

  // Mix in each Underscore method as a proxy to `Collection#models`.
  addUnderscoreMethods(Collection, collectionMethods, 'models');

  // Backbone.View
  // -------------

  // Backbone Views are almost more convention than they are actual code. A View
  // is simply a JavaScript object that represents a logical chunk of UI in the
  // DOM. This might be a single item, an entire list, a sidebar or panel, or
  // even the surrounding frame which wraps your whole app. Defining a chunk of
  // UI as a **View** allows you to define your DOM events declaratively, without
  // having to worry about render order ... and makes it easy for the view to
  // react to specific changes in the state of your models.

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  var View = Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    _.extend(this, _.pick(options, viewOptions));
    this._ensureElement();
    this.initialize.apply(this, arguments);
  };

  // Cached regex to split keys for `delegate`.
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be set as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(View.prototype, Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName: 'div',

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be preferred to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render: function() {
      return this;
    },

    // Remove this view by taking the element out of the DOM, and removing any
    // applicable Backbone.Events listeners.
    remove: function() {
      this._removeElement();
      this.stopListening();
      return this;
    },

    // Remove this view's element from the document and all event listeners
    // attached to it. Exposed for subclasses using an alternative DOM
    // manipulation API.
    _removeElement: function() {
      this.$el.remove();
    },

    // Change the view's element (`this.el` property) and re-delegate the
    // view's events on the new element.
    setElement: function(element) {
      this.undelegateEvents();
      this._setElement(element);
      this.delegateEvents();
      return this;
    },

    // Creates the `this.el` and `this.$el` references for this view using the
    // given `el`. `el` can be a CSS selector or an HTML string, a jQuery
    // context or an element. Subclasses can override this to utilize an
    // alternative DOM manipulation API and are only required to set the
    // `this.el` property.
    _setElement: function(el) {
      this.$el = el instanceof Backbone.$ ? el : Backbone.$(el);
      this.el = this.$el[0];
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save',
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    delegateEvents: function(events) {
      events || (events = _.result(this, 'events'));
      if (!events) return this;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[method];
        if (!method) continue;
        var match = key.match(delegateEventSplitter);
        this.delegate(match[1], match[2], _.bind(method, this));
      }
      return this;
    },

    // Add a single event listener to the view's element (or a child element
    // using `selector`). This only works for delegate-able events: not `focus`,
    // `blur`, and not `change`, `submit`, and `reset` in Internet Explorer.
    delegate: function(eventName, selector, listener) {
      this.$el.on(eventName + '.delegateEvents' + this.cid, selector, listener);
      return this;
    },

    // Clears all callbacks previously bound to the view by `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function() {
      if (this.$el) this.$el.off('.delegateEvents' + this.cid);
      return this;
    },

    // A finer-grained `undelegateEvents` for removing a single delegated event.
    // `selector` and `listener` are both optional.
    undelegate: function(eventName, selector, listener) {
      this.$el.off(eventName + '.delegateEvents' + this.cid, selector, listener);
      return this;
    },

    // Produces a DOM element to be assigned to your view. Exposed for
    // subclasses using an alternative DOM manipulation API.
    _createElement: function(tagName) {
      return document.createElement(tagName);
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = _.extend({}, _.result(this, 'attributes'));
        if (this.id) attrs.id = _.result(this, 'id');
        if (this.className) attrs['class'] = _.result(this, 'className');
        this.setElement(this._createElement(_.result(this, 'tagName')));
        this._setAttributes(attrs);
      } else {
        this.setElement(_.result(this, 'el'));
      }
    },

    // Set attributes from a hash on this view's element.  Exposed for
    // subclasses using an alternative DOM manipulation API.
    _setAttributes: function(attributes) {
      this.$el.attr(attributes);
    }

  });

  // Backbone.sync
  // -------------

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default options, unless specified.
    _.defaults(options || (options = {}), {
      emulateHTTP: Backbone.emulateHTTP,
      emulateJSON: Backbone.emulateJSON
    });

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = _.result(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(options.attrs || model.toJSON(options));
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (options.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
      params.type = 'POST';
      if (options.emulateJSON) params.data._method = type;
      var beforeSend = options.beforeSend;
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', type);
        if (beforeSend) return beforeSend.apply(this, arguments);
      };
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !options.emulateJSON) {
      params.processData = false;
    }

    // Pass along `textStatus` and `errorThrown` from jQuery.
    var error = options.error;
    options.error = function(xhr, textStatus, errorThrown) {
      options.textStatus = textStatus;
      options.errorThrown = errorThrown;
      if (error) error.call(options.context, xhr, textStatus, errorThrown);
    };

    // Make the request, allowing the user to override any Ajax options.
    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
    model.trigger('request', model, xhr, options);
    return xhr;
  };

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch': 'PATCH',
    'delete': 'DELETE',
    'read': 'GET'
  };

  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
  // Override this if you'd like to use a different library.
  Backbone.ajax = function() {
    return Backbone.$.ajax.apply(Backbone.$, arguments);
  };

  // Backbone.Router
  // ---------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  var Router = Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var optionalParam = /\((.*?)\)/g;
  var namedParam    = /(\(\?)?:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Router.prototype, Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (_.isFunction(name)) {
        callback = name;
        name = '';
      }
      if (!callback) callback = this[name];
      var router = this;
      Backbone.history.route(route, function(fragment) {
        var args = router._extractParameters(route, fragment);
        if (router.execute(callback, args, name) !== false) {
          router.trigger.apply(router, ['route:' + name].concat(args));
          router.trigger('route', name, args);
          Backbone.history.trigger('route', router, name, args);
        }
      });
      return this;
    },

    // Execute a route handler with the provided parameters.  This is an
    // excellent place to do pre-route setup or post-route cleanup.
    execute: function(callback, args, name) {
      if (callback) callback.apply(this, args);
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
      return this;
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      this.routes = _.result(this, 'routes');
      var route, routes = _.keys(this.routes);
      while ((route = routes.pop()) != null) {
        this.route(route, this.routes[route]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(optionalParam, '(?:$1)?')
                   .replace(namedParam, function(match, optional) {
                     return optional ? match : '([^/?]+)';
                   })
                   .replace(splatParam, '([^?]*?)');
      return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted decoded parameters. Empty or unmatched parameters will be
    // treated as `null` to normalize cross-browser behavior.
    _extractParameters: function(route, fragment) {
      var params = route.exec(fragment).slice(1);
      return _.map(params, function(param, i) {
        // Don't decode the search params.
        if (i === params.length - 1) return param || null;
        return param ? decodeURIComponent(param) : null;
      });
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on either
  // [pushState](http://diveintohtml5.info/history.html) and real URLs, or
  // [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
  // and URL fragments. If the browser supports neither (old IE, natch),
  // falls back to polling.
  var History = Backbone.History = function() {
    this.handlers = [];
    this.checkUrl = _.bind(this.checkUrl, this);

    // Ensure that `History` can be used outside of the browser.
    if (typeof window !== 'undefined') {
      this.location = window.location;
      this.history = window.history;
    }
  };

  // Cached regex for stripping a leading hash/slash and trailing space.
  var routeStripper = /^[#\/]|\s+$/g;

  // Cached regex for stripping leading and trailing slashes.
  var rootStripper = /^\/+|\/+$/g;

  // Cached regex for stripping urls of hash.
  var pathStripper = /#.*$/;

  // Has the history handling already been started?
  History.started = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(History.prototype, Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Are we at the app root?
    atRoot: function() {
      var path = this.location.pathname.replace(/[^\/]$/, '$&/');
      return path === this.root && !this.getSearch();
    },

    // Does the pathname match the root?
    matchRoot: function() {
      var path = this.decodeFragment(this.location.pathname);
      var rootPath = path.slice(0, this.root.length - 1) + '/';
      return rootPath === this.root;
    },

    // Unicode characters in `location.pathname` are percent encoded so they're
    // decoded for comparison. `%25` should not be decoded since it may be part
    // of an encoded parameter.
    decodeFragment: function(fragment) {
      return decodeURI(fragment.replace(/%25/g, '%2525'));
    },

    // In IE6, the hash fragment and search params are incorrect if the
    // fragment contains `?`.
    getSearch: function() {
      var match = this.location.href.replace(/#.*/, '').match(/\?.+/);
      return match ? match[0] : '';
    },

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash: function(window) {
      var match = (window || this).location.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },

    // Get the pathname and search params, without the root.
    getPath: function() {
      var path = this.decodeFragment(
        this.location.pathname + this.getSearch()
      ).slice(this.root.length - 1);
      return path.charAt(0) === '/' ? path.slice(1) : path;
    },

    // Get the cross-browser normalized URL fragment from the path or hash.
    getFragment: function(fragment) {
      if (fragment == null) {
        if (this._usePushState || !this._wantsHashChange) {
          fragment = this.getPath();
        } else {
          fragment = this.getHash();
        }
      }
      return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {
      if (History.started) throw new Error('Backbone.history has already been started');
      History.started = true;

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      this.options          = _.extend({root: '/'}, this.options, options);
      this.root             = this.options.root;
      this._wantsHashChange = this.options.hashChange !== false;
      this._hasHashChange   = 'onhashchange' in window && (document.documentMode === void 0 || document.documentMode > 7);
      this._useHashChange   = this._wantsHashChange && this._hasHashChange;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.history && this.history.pushState);
      this._usePushState    = this._wantsPushState && this._hasPushState;
      this.fragment         = this.getFragment();

      // Normalize root to always include a leading and trailing slash.
      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

      // Transition from hashChange to pushState or vice versa if both are
      // requested.
      if (this._wantsHashChange && this._wantsPushState) {

        // If we've started off with a route from a `pushState`-enabled
        // browser, but we're currently in a browser that doesn't support it...
        if (!this._hasPushState && !this.atRoot()) {
          var rootPath = this.root.slice(0, -1) || '/';
          this.location.replace(rootPath + '#' + this.getPath());
          // Return immediately as browser will do redirect to new url
          return true;

        // Or if we've started out with a hash-based route, but we're currently
        // in a browser where it could be `pushState`-based instead...
        } else if (this._hasPushState && this.atRoot()) {
          this.navigate(this.getHash(), {replace: true});
        }

      }

      // Proxy an iframe to handle location events if the browser doesn't
      // support the `hashchange` event, HTML5 history, or the user wants
      // `hashChange` but not `pushState`.
      if (!this._hasHashChange && this._wantsHashChange && !this._usePushState) {
        this.iframe = document.createElement('iframe');
        this.iframe.src = 'javascript:0';
        this.iframe.style.display = 'none';
        this.iframe.tabIndex = -1;
        var body = document.body;
        // Using `appendChild` will throw on IE < 9 if the document is not ready.
        var iWindow = body.insertBefore(this.iframe, body.firstChild).contentWindow;
        iWindow.document.open();
        iWindow.document.close();
        iWindow.location.hash = '#' + this.fragment;
      }

      // Add a cross-platform `addEventListener` shim for older browsers.
      var addEventListener = window.addEventListener || function(eventName, listener) {
        return attachEvent('on' + eventName, listener);
      };

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._usePushState) {
        addEventListener('popstate', this.checkUrl, false);
      } else if (this._useHashChange && !this.iframe) {
        addEventListener('hashchange', this.checkUrl, false);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      if (!this.options.silent) return this.loadUrl();
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      // Add a cross-platform `removeEventListener` shim for older browsers.
      var removeEventListener = window.removeEventListener || function(eventName, listener) {
        return detachEvent('on' + eventName, listener);
      };

      // Remove window listeners.
      if (this._usePushState) {
        removeEventListener('popstate', this.checkUrl, false);
      } else if (this._useHashChange && !this.iframe) {
        removeEventListener('hashchange', this.checkUrl, false);
      }

      // Clean up the iframe if necessary.
      if (this.iframe) {
        document.body.removeChild(this.iframe);
        this.iframe = null;
      }

      // Some environments will throw when clearing an undefined interval.
      if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
      History.started = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function(e) {
      var current = this.getFragment();

      // If the user pressed the back button, the iframe's hash will have
      // changed and we should use that for comparison.
      if (current === this.fragment && this.iframe) {
        current = this.getHash(this.iframe.contentWindow);
      }

      if (current === this.fragment) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl();
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragment) {
      // If the root doesn't match, no routes can match either.
      if (!this.matchRoot()) return false;
      fragment = this.fragment = this.getFragment(fragment);
      return _.some(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!History.started) return false;
      if (!options || options === true) options = {trigger: !!options};

      // Normalize the fragment.
      fragment = this.getFragment(fragment || '');

      // Don't include a trailing slash on the root.
      var rootPath = this.root;
      if (fragment === '' || fragment.charAt(0) === '?') {
        rootPath = rootPath.slice(0, -1) || '/';
      }
      var url = rootPath + fragment;

      // Strip the hash and decode for matching.
      fragment = this.decodeFragment(fragment.replace(pathStripper, ''));

      if (this.fragment === fragment) return;
      this.fragment = fragment;

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._usePushState) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.
      } else if (this._wantsHashChange) {
        this._updateHash(this.location, fragment, options.replace);
        if (this.iframe && fragment !== this.getHash(this.iframe.contentWindow)) {
          var iWindow = this.iframe.contentWindow;

          // Opening and closing the iframe tricks IE7 and earlier to push a
          // history entry on hash-tag change.  When replace is true, we don't
          // want this.
          if (!options.replace) {
            iWindow.document.open();
            iWindow.document.close();
          }

          this._updateHash(iWindow.location, fragment, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.
      } else {
        return this.location.assign(url);
      }
      if (options.trigger) return this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        var href = location.href.replace(/(javascript:|#).*$/, '');
        location.replace(href + '#' + fragment);
      } else {
        // Some browsers require that `hash` contains a leading #.
        location.hash = '#' + fragment;
      }
    }

  });

  // Create the default Backbone.history.
  Backbone.history = new History;

  // Helpers
  // -------

  // Helper function to correctly set up the prototype chain for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function and add the prototype properties.
    child.prototype = _.create(parent.prototype, protoProps);
    child.prototype.constructor = child;

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Set up inheritance for the model, collection, router, view and history.
  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

  // Wrap an optional error callback with a fallback error event.
  var wrapError = function(model, options) {
    var error = options.error;
    options.error = function(resp) {
      if (error) error.call(options.context, model, resp, options);
      model.trigger('error', model, resp, options);
    };
  };

  return Backbone;
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(14);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./bootstrap.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./bootstrap.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery JavaScript Library v3.2.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-03-20T18:59Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};



	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.2.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 13
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}

	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( jQuery.isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( ">tbody", elem )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i,
		val = 0;

	// If we already have the right measurement, avoid augmentation
	if ( extra === ( isBorderBox ? "border" : "content" ) ) {
		i = 4;

	// Otherwise initialize for horizontal or vertical properties
	} else {
		i = name === "width" ? 1 : 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with computed style
	var valueIsBorderBox,
		styles = getStyles( elem ),
		val = curCSS( elem, name, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Computed unit is not pixels. Stop here and return.
	if ( rnumnonpx.test( val ) ) {
		return val;
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = isBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ name ] );

	// Fall back to offsetWidth/Height when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	if ( val === "auto" ) {
		val = elem[ "offset" + name[ 0 ].toUpperCase() + name.slice( 1 ) ];
	}

	// Normalize "", auto, and prepare for extra
	val = parseFloat( val ) || 0;

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 13
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 13
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( jQuery.isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var doc, docElem, rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		rect = elem.getBoundingClientRect();

		doc = elem.ownerDocument;
		docElem = doc.documentElement;
		win = doc.defaultView;

		return {
			top: rect.top + win.pageYOffset - docElem.clientTop,
			left: rect.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset = {
				top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
				left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
			};
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( jQuery.isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( true ) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
		return jQuery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Papa Parse
	v4.3.2
	https://github.com/mholt/PapaParse
*/
!function(a,b){ true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (b),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"object"==typeof module&&module.exports?module.exports=b():a.Papa=b()}(this,function(){"use strict";function a(a,b){b=b||{};var c=b.dynamicTyping||!1;if(r(c)&&(b.dynamicTypingFunction=c,c={}),b.dynamicTyping=c,b.worker&&z.WORKERS_SUPPORTED){var h=k();return h.userStep=b.step,h.userChunk=b.chunk,h.userComplete=b.complete,h.userError=b.error,b.step=r(b.step),b.chunk=r(b.chunk),b.complete=r(b.complete),b.error=r(b.error),delete b.worker,void h.postMessage({input:a,config:b,workerId:h.id})}var i=null;return"string"==typeof a?i=b.download?new d(b):new f(b):a.readable===!0&&r(a.read)&&r(a.on)?i=new g(b):(t.File&&a instanceof File||a instanceof Object)&&(i=new e(b)),i.stream(a)}function b(a,b){function c(){"object"==typeof b&&("string"==typeof b.delimiter&&1===b.delimiter.length&&z.BAD_DELIMITERS.indexOf(b.delimiter)===-1&&(j=b.delimiter),("boolean"==typeof b.quotes||b.quotes instanceof Array)&&(h=b.quotes),"string"==typeof b.newline&&(k=b.newline),"string"==typeof b.quoteChar&&(l=b.quoteChar),"boolean"==typeof b.header&&(i=b.header))}function d(a){if("object"!=typeof a)return[];var b=[];for(var c in a)b.push(c);return b}function e(a,b){var c="";"string"==typeof a&&(a=JSON.parse(a)),"string"==typeof b&&(b=JSON.parse(b));var d=a instanceof Array&&a.length>0,e=!(b[0]instanceof Array);if(d&&i){for(var g=0;g<a.length;g++)g>0&&(c+=j),c+=f(a[g],g);b.length>0&&(c+=k)}for(var h=0;h<b.length;h++){for(var l=d?a.length:b[h].length,m=0;m<l;m++){m>0&&(c+=j);var n=d&&e?a[m]:m;c+=f(b[h][n],m)}h<b.length-1&&(c+=k)}return c}function f(a,b){if("undefined"==typeof a||null===a)return"";a=a.toString().replace(m,l+l);var c="boolean"==typeof h&&h||h instanceof Array&&h[b]||g(a,z.BAD_DELIMITERS)||a.indexOf(j)>-1||" "===a.charAt(0)||" "===a.charAt(a.length-1);return c?l+a+l:a}function g(a,b){for(var c=0;c<b.length;c++)if(a.indexOf(b[c])>-1)return!0;return!1}var h=!1,i=!0,j=",",k="\r\n",l='"';c();var m=new RegExp(l,"g");if("string"==typeof a&&(a=JSON.parse(a)),a instanceof Array){if(!a.length||a[0]instanceof Array)return e(null,a);if("object"==typeof a[0])return e(d(a[0]),a)}else if("object"==typeof a)return"string"==typeof a.data&&(a.data=JSON.parse(a.data)),a.data instanceof Array&&(a.fields||(a.fields=a.meta&&a.meta.fields),a.fields||(a.fields=a.data[0]instanceof Array?a.fields:d(a.data[0])),a.data[0]instanceof Array||"object"==typeof a.data[0]||(a.data=[a.data])),e(a.fields||[],a.data||[]);throw"exception: Unable to serialize unrecognized input"}function c(a){function b(a){var b=p(a);b.chunkSize=parseInt(b.chunkSize),a.step||a.chunk||(b.chunkSize=null),this._handle=new h(b),this._handle.streamer=this,this._config=b}this._handle=null,this._paused=!1,this._finished=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},b.call(this,a),this.parseChunk=function(a){if(this.isFirstChunk&&r(this._config.beforeFirstChunk)){var b=this._config.beforeFirstChunk(a);void 0!==b&&(a=b)}this.isFirstChunk=!1;var c=this._partialLine+a;this._partialLine="";var d=this._handle.parse(c,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var e=d.meta.cursor;this._finished||(this._partialLine=c.substring(e-this._baseIndex),this._baseIndex=e),d&&d.data&&(this._rowCount+=d.data.length);var f=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(v)t.postMessage({results:d,workerId:z.WORKER_ID,finished:f});else if(r(this._config.chunk)){if(this._config.chunk(d,this._handle),this._paused)return;d=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(d.data),this._completeResults.errors=this._completeResults.errors.concat(d.errors),this._completeResults.meta=d.meta),!f||!r(this._config.complete)||d&&d.meta.aborted||this._config.complete(this._completeResults,this._input),f||d&&d.meta.paused||this._nextChunk(),d}},this._sendError=function(a){r(this._config.error)?this._config.error(a):v&&this._config.error&&t.postMessage({workerId:z.WORKER_ID,error:a,finished:!1})}}function d(a){function b(a){var b=a.getResponseHeader("Content-Range");return null===b?-1:parseInt(b.substr(b.lastIndexOf("/")+1))}a=a||{},a.chunkSize||(a.chunkSize=z.RemoteChunkSize),c.call(this,a);var d;u?this._nextChunk=function(){this._readChunk(),this._chunkLoaded()}:this._nextChunk=function(){this._readChunk()},this.stream=function(a){this._input=a,this._nextChunk()},this._readChunk=function(){if(this._finished)return void this._chunkLoaded();if(d=new XMLHttpRequest,this._config.withCredentials&&(d.withCredentials=this._config.withCredentials),u||(d.onload=q(this._chunkLoaded,this),d.onerror=q(this._chunkError,this)),d.open("GET",this._input,!u),this._config.downloadRequestHeaders){var a=this._config.downloadRequestHeaders;for(var b in a)d.setRequestHeader(b,a[b])}if(this._config.chunkSize){var c=this._start+this._config.chunkSize-1;d.setRequestHeader("Range","bytes="+this._start+"-"+c),d.setRequestHeader("If-None-Match","webkit-no-cache")}try{d.send()}catch(a){this._chunkError(a.message)}u&&0===d.status?this._chunkError():this._start+=this._config.chunkSize},this._chunkLoaded=function(){if(4==d.readyState){if(d.status<200||d.status>=400)return void this._chunkError();this._finished=!this._config.chunkSize||this._start>b(d),this.parseChunk(d.responseText)}},this._chunkError=function(a){var b=d.statusText||a;this._sendError(b)}}function e(a){a=a||{},a.chunkSize||(a.chunkSize=z.LocalChunkSize),c.call(this,a);var b,d,e="undefined"!=typeof FileReader;this.stream=function(a){this._input=a,d=a.slice||a.webkitSlice||a.mozSlice,e?(b=new FileReader,b.onload=q(this._chunkLoaded,this),b.onerror=q(this._chunkError,this)):b=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var a=this._input;if(this._config.chunkSize){var c=Math.min(this._start+this._config.chunkSize,this._input.size);a=d.call(a,this._start,c)}var f=b.readAsText(a,this._config.encoding);e||this._chunkLoaded({target:{result:f}})},this._chunkLoaded=function(a){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(a.target.result)},this._chunkError=function(){this._sendError(b.error)}}function f(a){a=a||{},c.call(this,a);var b,d;this.stream=function(a){return b=a,d=a,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var a=this._config.chunkSize,b=a?d.substr(0,a):d;return d=a?d.substr(a):"",this._finished=!d,this.parseChunk(b)}}}function g(a){a=a||{},c.call(this,a);var b=[],d=!0;this.stream=function(a){this._input=a,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._nextChunk=function(){b.length?this.parseChunk(b.shift()):d=!0},this._streamData=q(function(a){try{b.push("string"==typeof a?a:a.toString(this._config.encoding)),d&&(d=!1,this.parseChunk(b.shift()))}catch(a){this._streamError(a)}},this),this._streamError=q(function(a){this._streamCleanUp(),this._sendError(a.message)},this),this._streamEnd=q(function(){this._streamCleanUp(),this._finished=!0,this._streamData("")},this),this._streamCleanUp=q(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function h(a){function b(){if(x&&o&&(l("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+z.DefaultDelimiter+"'"),o=!1),a.skipEmptyLines)for(var b=0;b<x.data.length;b++)1===x.data[b].length&&""===x.data[b][0]&&x.data.splice(b--,1);return c()&&d(),g()}function c(){return a.header&&0===w.length}function d(){if(x){for(var a=0;c()&&a<x.data.length;a++)for(var b=0;b<x.data[a].length;b++)w.push(x.data[a][b]);x.data.splice(0,1)}}function e(b){return a.dynamicTypingFunction&&void 0===a.dynamicTyping[b]&&(a.dynamicTyping[b]=a.dynamicTypingFunction(b)),(a.dynamicTyping[b]||a.dynamicTyping)===!0}function f(a,b){return e(a)?"true"===b||"TRUE"===b||"false"!==b&&"FALSE"!==b&&k(b):b}function g(){if(!x||!a.header&&!a.dynamicTyping)return x;for(var b=0;b<x.data.length;b++){for(var c=a.header?{}:[],d=0;d<x.data[b].length;d++){var e=d,g=x.data[b][d];a.header&&(e=d>=w.length?"__parsed_extra":w[d]),g=f(e,g),"__parsed_extra"===e?(c[e]=c[e]||[],c[e].push(g)):c[e]=g}x.data[b]=c,a.header&&(d>w.length?l("FieldMismatch","TooManyFields","Too many fields: expected "+w.length+" fields but parsed "+d,b):d<w.length&&l("FieldMismatch","TooFewFields","Too few fields: expected "+w.length+" fields but parsed "+d,b))}return a.header&&x.meta&&(x.meta.fields=w),x}function h(b,c){for(var d,e,f,g=[",","\t","|",";",z.RECORD_SEP,z.UNIT_SEP],h=0;h<g.length;h++){var j=g[h],k=0,l=0;f=void 0;for(var m=new i({delimiter:j,newline:c,preview:10}).parse(b),n=0;n<m.data.length;n++){var o=m.data[n].length;l+=o,"undefined"!=typeof f?o>1&&(k+=Math.abs(o-f),f=o):f=o}m.data.length>0&&(l/=m.data.length),("undefined"==typeof e||k<e)&&l>1.99&&(e=k,d=j)}return a.delimiter=d,{successful:!!d,bestDelimiter:d}}function j(a){a=a.substr(0,1048576);var b=a.split("\r"),c=a.split("\n"),d=c.length>1&&c[0].length<b[0].length;if(1===b.length||d)return"\n";for(var e=0,f=0;f<b.length;f++)"\n"===b[f][0]&&e++;return e>=b.length/2?"\r\n":"\r"}function k(a){var b=q.test(a);return b?parseFloat(a):a}function l(a,b,c,d){x.errors.push({type:a,code:b,message:c,row:d})}var m,n,o,q=/^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i,s=this,t=0,u=!1,v=!1,w=[],x={data:[],errors:[],meta:{}};if(r(a.step)){var y=a.step;a.step=function(d){if(x=d,c())b();else{if(b(),0===x.data.length)return;t+=d.data.length,a.preview&&t>a.preview?n.abort():y(x,s)}}}this.parse=function(c,d,e){if(a.newline||(a.newline=j(c)),o=!1,a.delimiter)r(a.delimiter)&&(a.delimiter=a.delimiter(c),x.meta.delimiter=a.delimiter);else{var f=h(c,a.newline);f.successful?a.delimiter=f.bestDelimiter:(o=!0,a.delimiter=z.DefaultDelimiter),x.meta.delimiter=a.delimiter}var g=p(a);return a.preview&&a.header&&g.preview++,m=c,n=new i(g),x=n.parse(m,d,e),b(),u?{meta:{paused:!0}}:x||{meta:{paused:!1}}},this.paused=function(){return u},this.pause=function(){u=!0,n.abort(),m=m.substr(n.getCharIndex())},this.resume=function(){u=!1,s.streamer.parseChunk(m)},this.aborted=function(){return v},this.abort=function(){v=!0,n.abort(),x.meta.aborted=!0,r(a.complete)&&a.complete(x),m=""}}function i(a){a=a||{};var b=a.delimiter,c=a.newline,d=a.comments,e=a.step,f=a.preview,g=a.fastMode,h=a.quoteChar||'"';if(("string"!=typeof b||z.BAD_DELIMITERS.indexOf(b)>-1)&&(b=","),d===b)throw"Comment character same as delimiter";d===!0?d="#":("string"!=typeof d||z.BAD_DELIMITERS.indexOf(d)>-1)&&(d=!1),"\n"!=c&&"\r"!=c&&"\r\n"!=c&&(c="\n");var i=0,j=!1;this.parse=function(a,k,l){function m(a){x.push(a),A=i}function n(b){return l?p():("undefined"==typeof b&&(b=a.substr(i)),z.push(b),i=s,m(z),w&&q(),p())}function o(b){i=b,m(z),z=[],E=a.indexOf(c,i)}function p(a){return{data:x,errors:y,meta:{delimiter:b,linebreak:c,aborted:j,truncated:!!a,cursor:A+(k||0)}}}function q(){e(p()),x=[],y=[]}if("string"!=typeof a)throw"Input must be a string";var s=a.length,t=b.length,u=c.length,v=d.length,w=r(e);i=0;var x=[],y=[],z=[],A=0;if(!a)return p();if(g||g!==!1&&a.indexOf(h)===-1){for(var B=a.split(c),C=0;C<B.length;C++){var z=B[C];if(i+=z.length,C!==B.length-1)i+=c.length;else if(l)return p();if(!d||z.substr(0,v)!==d){if(w){if(x=[],m(z.split(b)),q(),j)return p()}else m(z.split(b));if(f&&C>=f)return x=x.slice(0,f),p(!0)}}return p()}for(var D=a.indexOf(b,i),E=a.indexOf(c,i),F=new RegExp(h+h,"g");;)if(a[i]!==h)if(d&&0===z.length&&a.substr(i,v)===d){if(E===-1)return p();i=E+u,E=a.indexOf(c,i),D=a.indexOf(b,i)}else if(D!==-1&&(D<E||E===-1))z.push(a.substring(i,D)),i=D+t,D=a.indexOf(b,i);else{if(E===-1)break;if(z.push(a.substring(i,E)),o(E+u),w&&(q(),j))return p();if(f&&x.length>=f)return p(!0)}else{var G=i;for(i++;;){var G=a.indexOf(h,G+1);if(G===-1)return l||y.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:x.length,index:i}),n();if(G===s-1){var H=a.substring(i,G).replace(F,h);return n(H)}if(a[G+1]!==h){if(a[G+1]===b){z.push(a.substring(i,G).replace(F,h)),i=G+1+t,D=a.indexOf(b,i),E=a.indexOf(c,i);break}if(a.substr(G+1,u)===c){if(z.push(a.substring(i,G).replace(F,h)),o(G+1+u),D=a.indexOf(b,i),w&&(q(),j))return p();if(f&&x.length>=f)return p(!0);break}}else G++}}return n()},this.abort=function(){j=!0},this.getCharIndex=function(){return i}}function j(){var a=document.getElementsByTagName("script");return a.length?a[a.length-1].src:""}function k(){if(!z.WORKERS_SUPPORTED)return!1;if(!w&&null===z.SCRIPT_PATH)throw new Error("Script path cannot be determined automatically when Papa Parse is loaded asynchronously. You need to set Papa.SCRIPT_PATH manually.");var a=z.SCRIPT_PATH||s;a+=(a.indexOf("?")!==-1?"&":"?")+"papaworker";var b=new t.Worker(a);return b.onmessage=l,b.id=y++,x[b.id]=b,b}function l(a){var b=a.data,c=x[b.workerId],d=!1;if(b.error)c.userError(b.error,b.file);else if(b.results&&b.results.data){var e=function(){d=!0,m(b.workerId,{data:[],errors:[],meta:{aborted:!0}})},f={abort:e,pause:n,resume:n};if(r(c.userStep)){for(var g=0;g<b.results.data.length&&(c.userStep({data:[b.results.data[g]],errors:b.results.errors,meta:b.results.meta},f),!d);g++);delete b.results}else r(c.userChunk)&&(c.userChunk(b.results,f,b.file),delete b.results)}b.finished&&!d&&m(b.workerId,b.results)}function m(a,b){var c=x[a];r(c.userComplete)&&c.userComplete(b),c.terminate(),delete x[a]}function n(){throw"Not implemented."}function o(a){var b=a.data;if("undefined"==typeof z.WORKER_ID&&b&&(z.WORKER_ID=b.workerId),"string"==typeof b.input)t.postMessage({workerId:z.WORKER_ID,results:z.parse(b.input,b.config),finished:!0});else if(t.File&&b.input instanceof File||b.input instanceof Object){var c=z.parse(b.input,b.config);c&&t.postMessage({workerId:z.WORKER_ID,results:c,finished:!0})}}function p(a){if("object"!=typeof a)return a;var b=a instanceof Array?[]:{};for(var c in a)b[c]=p(a[c]);return b}function q(a,b){return function(){a.apply(b,arguments)}}function r(a){return"function"==typeof a}var s,t=function(){return"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof t?t:{}}(),u=!t.document&&!!t.postMessage,v=u&&/(\?|&)papaworker(=|&|$)/.test(t.location.search),w=!1,x={},y=0,z={};if(z.parse=a,z.unparse=b,z.RECORD_SEP=String.fromCharCode(30),z.UNIT_SEP=String.fromCharCode(31),z.BYTE_ORDER_MARK="\ufeff",z.BAD_DELIMITERS=["\r","\n",'"',z.BYTE_ORDER_MARK],z.WORKERS_SUPPORTED=!u&&!!t.Worker,z.SCRIPT_PATH=null,z.LocalChunkSize=10485760,z.RemoteChunkSize=5242880,z.DefaultDelimiter=",",z.Parser=i,z.ParserHandle=h,z.NetworkStreamer=d,z.FileStreamer=e,z.StringStreamer=f,z.ReadableStreamStreamer=g,t.jQuery){var A=t.jQuery;A.fn.parse=function(a){function b(){if(0===f.length)return void(r(a.complete)&&a.complete());var b=f[0];if(r(a.before)){var e=a.before(b.file,b.inputElem);if("object"==typeof e){if("abort"===e.action)return void c("AbortError",b.file,b.inputElem,e.reason);if("skip"===e.action)return void d();"object"==typeof e.config&&(b.instanceConfig=A.extend(b.instanceConfig,e.config))}else if("skip"===e)return void d()}var g=b.instanceConfig.complete;b.instanceConfig.complete=function(a){r(g)&&g(a,b.file,b.inputElem),d()},z.parse(b.file,b.instanceConfig)}function c(b,c,d,e){r(a.error)&&a.error({name:b},c,d,e)}function d(){f.splice(0,1),b()}var e=a.config||{},f=[];return this.each(function(a){var b="INPUT"===A(this).prop("tagName").toUpperCase()&&"file"===A(this).attr("type").toLowerCase()&&t.FileReader;if(!b||!this.files||0===this.files.length)return!0;for(var c=0;c<this.files.length;c++)f.push({file:this.files[c],inputElem:this,instanceConfig:A.extend({},e)})}),b(),this}}return v?t.onmessage=o:z.WORKERS_SUPPORTED&&(s=j(),document.body?document.addEventListener("DOMContentLoaded",function(){w=!0},!0):w=!0),d.prototype=Object.create(c.prototype),d.prototype.constructor=d,e.prototype=Object.create(c.prototype),e.prototype.constructor=e,f.prototype=Object.create(f.prototype),f.prototype.constructor=f,g.prototype=Object.create(c.prototype),g.prototype.constructor=g,z});

/***/ }),
/* 5 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(15);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(0),
    __webpack_require__(1),
    __webpack_require__(9),
    __webpack_require__(10),
    __webpack_require__(16),
    __webpack_require__(2),
    __webpack_require__(20)
], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, Backbone, MainTemplate, MainFileUploadView, MainFileCompareView) {

var MainView = Backbone.View.extend({
    el: '<div>',
    template: _.template(MainTemplate),

    initialize: function() {
      this.mainFileUploadView = new MainFileUploadView();

      Backbone.on("triggerCompare", this.triggerCompare);
    },

    render: function() {
      this.$el.html(this.template({}));

      this.$("#fileUploadView").append(this.mainFileUploadView.render().$el);

      return this;
    },

    triggerCompare: function(fileObj) {
      var Model = new Backbone.Model();
      this.mainFileCompareView = new MainFileCompareView({model: Model});
      
      this.$("#fileCompareView").empty();
      this.mainFileCompareView.destroy();
      
      this.$("#fileCompareView").append(this.mainFileCompareView.render().$el);
      Backbone.trigger('triggerCompareView', fileObj);
    }

  });

  var mainView = new MainView();
  $("#app").html(mainView.render().$el);

}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));



/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 8 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = "<div id=fileUploadView></div>\r\n<div id=fileCompareView></div>";

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(0),
    __webpack_require__(1),
    __webpack_require__(11),
    __webpack_require__(12),
    __webpack_require__(2),
], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, Backbone, MainTemplate, FileUploadView) {

return Backbone.View.extend({
    className: "bs-callout bs-callout-primary flexBlock flexWrap",
    template: _.template(MainTemplate),

    events: {
      'click #compare': 'compareResults'
    },

    initialize: function() {
      this.fileUploadView1 = new FileUploadView("file1");
      this.fileUploadView2 = new FileUploadView("file2");
    },

    render: function() {
      this.$el.html(this.template({}));

      this.$("#loadFileViews").append(this.fileUploadView1.render().$el);
      this.$("#loadFileViews").append(this.fileUploadView2.render().$el);
      
      return this;
    },

    compareResults: function() {
      Backbone.trigger('triggerCompare', this);
    }

  });

}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));




/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = "<h1 class=col-md-12>Specify files to compare</h1>\r\n<div class=col-md-6 id=loadFileViews></div>\r\n<div class=\"col-md-6 form-group flexAlignEnd\">\r\n    <button class=\"btn btn-default\" id=compare>Compare</button>\r\n</div>\r\n\r\n";

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(0),
    __webpack_require__(1),
    __webpack_require__(13),
    __webpack_require__(4)
], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, Backbone, fileUploadTemplate, Papa) {

  return Backbone.View.extend({
    className: "form-group",
    template: _.template(fileUploadTemplate),
    events: {
      'change .file': function() {
        this.parseData();
        this.displayFileName();
      }

    },
    initialize: function(id) {
        this.id = id;
        this.data = [];
        this.file = [];   
    },

    render: function() {
      this.$el.html(this.template({
        fileId: this.id
      }));

      return this;
    },

    parseData: function() {
      var that = this;
      Papa.parse(event.target.files[0], {
        header: true,
        complete: function(results, file) {
         that.data = results.data;
         that.file = file;
        }
      });
    },

    displayFileName: function() {
      this.$(".showFileName").val(event.target.files[0].name);
    }
    
  });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = "<div class=input-group>\r\n    <span class=input-group-btn>\r\n        <span class=\"btn btn-primary btn-file\">\r\n            Select File... <input id=\"<%= fileId %>\" class=file type=file single>\r\n        </span>\r\n    </span>\r\n    <input type=text class=\"form-control showFileName\" readonly=\"\">\r\n</div>";

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(undefined);
// imports


// module
exports.push([module.i, "/*!\r\n * Bootstrap v3.3.7 (http://getbootstrap.com)\r\n * Copyright 2011-2016 Twitter, Inc.\r\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\r\n */\r\n\r\n/*!\r\n * Generated using the Bootstrap Customizer (http://getbootstrap.com/customize/?id=7d31464893bae4b76d3f54eaf8869018)\r\n * Config saved to config.json and https://gist.github.com/7d31464893bae4b76d3f54eaf8869018\r\n */\r\n/*!\r\n * Bootstrap v3.3.7 (http://getbootstrap.com)\r\n * Copyright 2011-2016 Twitter, Inc.\r\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\r\n */\r\n/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */\r\nhtml {\r\n  font-family: sans-serif;\r\n  -ms-text-size-adjust: 100%;\r\n  -webkit-text-size-adjust: 100%;\r\n}\r\nbody {\r\n  margin: 0;\r\n}\r\narticle,\r\naside,\r\ndetails,\r\nfigcaption,\r\nfigure,\r\nfooter,\r\nheader,\r\nhgroup,\r\nmain,\r\nmenu,\r\nnav,\r\nsection,\r\nsummary {\r\n  display: block;\r\n}\r\naudio,\r\ncanvas,\r\nprogress,\r\nvideo {\r\n  display: inline-block;\r\n  vertical-align: baseline;\r\n}\r\naudio:not([controls]) {\r\n  display: none;\r\n  height: 0;\r\n}\r\n[hidden],\r\ntemplate {\r\n  display: none;\r\n}\r\na {\r\n  background-color: transparent;\r\n}\r\na:active,\r\na:hover {\r\n  outline: 0;\r\n}\r\nabbr[title] {\r\n  border-bottom: 1px dotted;\r\n}\r\nb,\r\nstrong {\r\n  font-weight: bold;\r\n}\r\ndfn {\r\n  font-style: italic;\r\n}\r\nh1 {\r\n  font-size: 2em;\r\n  margin: 0.67em 0;\r\n}\r\nmark {\r\n  background: #ff0;\r\n  color: #000;\r\n}\r\nsmall {\r\n  font-size: 80%;\r\n}\r\nsub,\r\nsup {\r\n  font-size: 75%;\r\n  line-height: 0;\r\n  position: relative;\r\n  vertical-align: baseline;\r\n}\r\nsup {\r\n  top: -0.5em;\r\n}\r\nsub {\r\n  bottom: -0.25em;\r\n}\r\nimg {\r\n  border: 0;\r\n}\r\nsvg:not(:root) {\r\n  overflow: hidden;\r\n}\r\nfigure {\r\n  margin: 1em 40px;\r\n}\r\nhr {\r\n  -webkit-box-sizing: content-box;\r\n     -moz-box-sizing: content-box;\r\n          box-sizing: content-box;\r\n  height: 0;\r\n}\r\npre {\r\n  overflow: auto;\r\n}\r\ncode,\r\nkbd,\r\npre,\r\nsamp {\r\n  font-family: monospace, monospace;\r\n  font-size: 1em;\r\n}\r\nbutton,\r\ninput,\r\noptgroup,\r\nselect,\r\ntextarea {\r\n  color: inherit;\r\n  font: inherit;\r\n  margin: 0;\r\n}\r\nbutton {\r\n  overflow: visible;\r\n}\r\nbutton,\r\nselect {\r\n  text-transform: none;\r\n}\r\nbutton,\r\nhtml input[type=\"button\"],\r\ninput[type=\"reset\"],\r\ninput[type=\"submit\"] {\r\n  -webkit-appearance: button;\r\n  cursor: pointer;\r\n}\r\nbutton[disabled],\r\nhtml input[disabled] {\r\n  cursor: default;\r\n}\r\nbutton::-moz-focus-inner,\r\ninput::-moz-focus-inner {\r\n  border: 0;\r\n  padding: 0;\r\n}\r\ninput {\r\n  line-height: normal;\r\n}\r\ninput[type=\"checkbox\"],\r\ninput[type=\"radio\"] {\r\n  -webkit-box-sizing: border-box;\r\n     -moz-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  padding: 0;\r\n}\r\ninput[type=\"number\"]::-webkit-inner-spin-button,\r\ninput[type=\"number\"]::-webkit-outer-spin-button {\r\n  height: auto;\r\n}\r\ninput[type=\"search\"] {\r\n  -webkit-appearance: textfield;\r\n  -webkit-box-sizing: content-box;\r\n     -moz-box-sizing: content-box;\r\n          box-sizing: content-box;\r\n}\r\ninput[type=\"search\"]::-webkit-search-cancel-button,\r\ninput[type=\"search\"]::-webkit-search-decoration {\r\n  -webkit-appearance: none;\r\n}\r\nfieldset {\r\n  border: 1px solid #c0c0c0;\r\n  margin: 0 2px;\r\n  padding: 0.35em 0.625em 0.75em;\r\n}\r\nlegend {\r\n  border: 0;\r\n  padding: 0;\r\n}\r\ntextarea {\r\n  overflow: auto;\r\n}\r\noptgroup {\r\n  font-weight: bold;\r\n}\r\ntable {\r\n  border-collapse: collapse;\r\n  border-spacing: 0;\r\n}\r\ntd,\r\nth {\r\n  padding: 0;\r\n}\r\n/*! Source: https://github.com/h5bp/html5-boilerplate/blob/master/src/css/main.css */\r\n@media print {\r\n  *,\r\n  *:before,\r\n  *:after {\r\n    background: transparent !important;\r\n    color: #000 !important;\r\n    -webkit-box-shadow: none !important;\r\n            box-shadow: none !important;\r\n    text-shadow: none !important;\r\n  }\r\n  a,\r\n  a:visited {\r\n    text-decoration: underline;\r\n  }\r\n  a[href]:after {\r\n    content: \" (\" attr(href) \")\";\r\n  }\r\n  abbr[title]:after {\r\n    content: \" (\" attr(title) \")\";\r\n  }\r\n  a[href^=\"#\"]:after,\r\n  a[href^=\"javascript:\"]:after {\r\n    content: \"\";\r\n  }\r\n  pre,\r\n  blockquote {\r\n    border: 1px solid #999;\r\n    page-break-inside: avoid;\r\n  }\r\n  thead {\r\n    display: table-header-group;\r\n  }\r\n  tr,\r\n  img {\r\n    page-break-inside: avoid;\r\n  }\r\n  img {\r\n    max-width: 100% !important;\r\n  }\r\n  p,\r\n  h2,\r\n  h3 {\r\n    orphans: 3;\r\n    widows: 3;\r\n  }\r\n  h2,\r\n  h3 {\r\n    page-break-after: avoid;\r\n  }\r\n  .navbar {\r\n    display: none;\r\n  }\r\n  .btn > .caret,\r\n  .dropup > .btn > .caret {\r\n    border-top-color: #000 !important;\r\n  }\r\n  .label {\r\n    border: 1px solid #000;\r\n  }\r\n  .table {\r\n    border-collapse: collapse !important;\r\n  }\r\n  .table td,\r\n  .table th {\r\n    background-color: #fff !important;\r\n  }\r\n  .table-bordered th,\r\n  .table-bordered td {\r\n    border: 1px solid #ddd !important;\r\n  }\r\n}\r\n* {\r\n  -webkit-box-sizing: border-box;\r\n  -moz-box-sizing: border-box;\r\n  box-sizing: border-box;\r\n}\r\n*:before,\r\n*:after {\r\n  -webkit-box-sizing: border-box;\r\n  -moz-box-sizing: border-box;\r\n  box-sizing: border-box;\r\n}\r\nhtml {\r\n  font-size: 10px;\r\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\r\n}\r\nbody {\r\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\r\n  font-size: 14px;\r\n  line-height: 1.42857143;\r\n  color: #333333;\r\n  background-color: #ffffff;\r\n}\r\ninput,\r\nbutton,\r\nselect,\r\ntextarea {\r\n  font-family: inherit;\r\n  font-size: inherit;\r\n  line-height: inherit;\r\n}\r\na {\r\n  color: #337ab7;\r\n  text-decoration: none;\r\n}\r\na:hover,\r\na:focus {\r\n  color: #23527c;\r\n  text-decoration: underline;\r\n}\r\na:focus {\r\n  outline: 5px auto -webkit-focus-ring-color;\r\n  outline-offset: -2px;\r\n}\r\nfigure {\r\n  margin: 0;\r\n}\r\nimg {\r\n  vertical-align: middle;\r\n}\r\n.img-responsive,\r\n.thumbnail > img,\r\n.thumbnail a > img,\r\n.carousel-inner > .item > img,\r\n.carousel-inner > .item > a > img {\r\n  display: block;\r\n  max-width: 100%;\r\n  height: auto;\r\n}\r\n.img-rounded {\r\n  border-radius: 6px;\r\n}\r\n.img-thumbnail {\r\n  padding: 4px;\r\n  line-height: 1.42857143;\r\n  background-color: #ffffff;\r\n  border: 1px solid #dddddd;\r\n  border-radius: 4px;\r\n  -webkit-transition: all 0.2s ease-in-out;\r\n  -o-transition: all 0.2s ease-in-out;\r\n  transition: all 0.2s ease-in-out;\r\n  display: inline-block;\r\n  max-width: 100%;\r\n  height: auto;\r\n}\r\n.img-circle {\r\n  border-radius: 50%;\r\n}\r\nhr {\r\n  margin-top: 20px;\r\n  margin-bottom: 20px;\r\n  border: 0;\r\n  border-top: 1px solid #eeeeee;\r\n}\r\n.sr-only {\r\n  position: absolute;\r\n  width: 1px;\r\n  height: 1px;\r\n  margin: -1px;\r\n  padding: 0;\r\n  overflow: hidden;\r\n  clip: rect(0, 0, 0, 0);\r\n  border: 0;\r\n}\r\n.sr-only-focusable:active,\r\n.sr-only-focusable:focus {\r\n  position: static;\r\n  width: auto;\r\n  height: auto;\r\n  margin: 0;\r\n  overflow: visible;\r\n  clip: auto;\r\n}\r\n[role=\"button\"] {\r\n  cursor: pointer;\r\n}\r\nh1,\r\nh2,\r\nh3,\r\nh4,\r\nh5,\r\nh6,\r\n.h1,\r\n.h2,\r\n.h3,\r\n.h4,\r\n.h5,\r\n.h6 {\r\n  font-family: inherit;\r\n  font-weight: 500;\r\n  line-height: 1.1;\r\n  color: inherit;\r\n}\r\nh1 small,\r\nh2 small,\r\nh3 small,\r\nh4 small,\r\nh5 small,\r\nh6 small,\r\n.h1 small,\r\n.h2 small,\r\n.h3 small,\r\n.h4 small,\r\n.h5 small,\r\n.h6 small,\r\nh1 .small,\r\nh2 .small,\r\nh3 .small,\r\nh4 .small,\r\nh5 .small,\r\nh6 .small,\r\n.h1 .small,\r\n.h2 .small,\r\n.h3 .small,\r\n.h4 .small,\r\n.h5 .small,\r\n.h6 .small {\r\n  font-weight: normal;\r\n  line-height: 1;\r\n  color: #777777;\r\n}\r\nh1,\r\n.h1,\r\nh2,\r\n.h2,\r\nh3,\r\n.h3 {\r\n  margin-top: 20px;\r\n  margin-bottom: 10px;\r\n}\r\nh1 small,\r\n.h1 small,\r\nh2 small,\r\n.h2 small,\r\nh3 small,\r\n.h3 small,\r\nh1 .small,\r\n.h1 .small,\r\nh2 .small,\r\n.h2 .small,\r\nh3 .small,\r\n.h3 .small {\r\n  font-size: 65%;\r\n}\r\nh4,\r\n.h4,\r\nh5,\r\n.h5,\r\nh6,\r\n.h6 {\r\n  margin-top: 10px;\r\n  margin-bottom: 10px;\r\n}\r\nh4 small,\r\n.h4 small,\r\nh5 small,\r\n.h5 small,\r\nh6 small,\r\n.h6 small,\r\nh4 .small,\r\n.h4 .small,\r\nh5 .small,\r\n.h5 .small,\r\nh6 .small,\r\n.h6 .small {\r\n  font-size: 75%;\r\n}\r\nh1,\r\n.h1 {\r\n  font-size: 36px;\r\n}\r\nh2,\r\n.h2 {\r\n  font-size: 30px;\r\n}\r\nh3,\r\n.h3 {\r\n  font-size: 24px;\r\n}\r\nh4,\r\n.h4 {\r\n  font-size: 18px;\r\n}\r\nh5,\r\n.h5 {\r\n  font-size: 14px;\r\n}\r\nh6,\r\n.h6 {\r\n  font-size: 12px;\r\n}\r\np {\r\n  margin: 0 0 10px;\r\n}\r\n.lead {\r\n  margin-bottom: 20px;\r\n  font-size: 16px;\r\n  font-weight: 300;\r\n  line-height: 1.4;\r\n}\r\n@media (min-width: 768px) {\r\n  .lead {\r\n    font-size: 21px;\r\n  }\r\n}\r\nsmall,\r\n.small {\r\n  font-size: 85%;\r\n}\r\nmark,\r\n.mark {\r\n  background-color: #fcf8e3;\r\n  padding: .2em;\r\n}\r\n.text-left {\r\n  text-align: left;\r\n}\r\n.text-right {\r\n  text-align: right;\r\n}\r\n.text-center {\r\n  text-align: center;\r\n}\r\n.text-justify {\r\n  text-align: justify;\r\n}\r\n.text-nowrap {\r\n  white-space: nowrap;\r\n}\r\n.text-lowercase {\r\n  text-transform: lowercase;\r\n}\r\n.text-uppercase {\r\n  text-transform: uppercase;\r\n}\r\n.text-capitalize {\r\n  text-transform: capitalize;\r\n}\r\n.text-muted {\r\n  color: #777777;\r\n}\r\n.text-primary {\r\n  color: #337ab7;\r\n}\r\na.text-primary:hover,\r\na.text-primary:focus {\r\n  color: #286090;\r\n}\r\n.text-success {\r\n  color: #3c763d;\r\n}\r\na.text-success:hover,\r\na.text-success:focus {\r\n  color: #2b542c;\r\n}\r\n.text-info {\r\n  color: #31708f;\r\n}\r\na.text-info:hover,\r\na.text-info:focus {\r\n  color: #245269;\r\n}\r\n.text-warning {\r\n  color: #8a6d3b;\r\n}\r\na.text-warning:hover,\r\na.text-warning:focus {\r\n  color: #66512c;\r\n}\r\n.text-danger {\r\n  color: #a94442;\r\n}\r\na.text-danger:hover,\r\na.text-danger:focus {\r\n  color: #843534;\r\n}\r\n.bg-primary {\r\n  color: #fff;\r\n  background-color: #337ab7;\r\n}\r\na.bg-primary:hover,\r\na.bg-primary:focus {\r\n  background-color: #286090;\r\n}\r\n.bg-success {\r\n  background-color: #dff0d8;\r\n}\r\na.bg-success:hover,\r\na.bg-success:focus {\r\n  background-color: #c1e2b3;\r\n}\r\n.bg-info {\r\n  background-color: #d9edf7;\r\n}\r\na.bg-info:hover,\r\na.bg-info:focus {\r\n  background-color: #afd9ee;\r\n}\r\n.bg-warning {\r\n  background-color: #fcf8e3;\r\n}\r\na.bg-warning:hover,\r\na.bg-warning:focus {\r\n  background-color: #f7ecb5;\r\n}\r\n.bg-danger {\r\n  background-color: #f2dede;\r\n}\r\na.bg-danger:hover,\r\na.bg-danger:focus {\r\n  background-color: #e4b9b9;\r\n}\r\n.page-header {\r\n  padding-bottom: 9px;\r\n  margin: 40px 0 20px;\r\n  border-bottom: 1px solid #eeeeee;\r\n}\r\nul,\r\nol {\r\n  margin-top: 0;\r\n  margin-bottom: 10px;\r\n}\r\nul ul,\r\nol ul,\r\nul ol,\r\nol ol {\r\n  margin-bottom: 0;\r\n}\r\n.list-unstyled {\r\n  padding-left: 0;\r\n  list-style: none;\r\n}\r\n.list-inline {\r\n  padding-left: 0;\r\n  list-style: none;\r\n  margin-left: -5px;\r\n}\r\n.list-inline > li {\r\n  display: inline-block;\r\n  padding-left: 5px;\r\n  padding-right: 5px;\r\n}\r\ndl {\r\n  margin-top: 0;\r\n  margin-bottom: 20px;\r\n}\r\ndt,\r\ndd {\r\n  line-height: 1.42857143;\r\n}\r\ndt {\r\n  font-weight: bold;\r\n}\r\ndd {\r\n  margin-left: 0;\r\n}\r\n@media (min-width: 768px) {\r\n  .dl-horizontal dt {\r\n    float: left;\r\n    width: 160px;\r\n    clear: left;\r\n    text-align: right;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n    white-space: nowrap;\r\n  }\r\n  .dl-horizontal dd {\r\n    margin-left: 180px;\r\n  }\r\n}\r\nabbr[title],\r\nabbr[data-original-title] {\r\n  cursor: help;\r\n  border-bottom: 1px dotted #777777;\r\n}\r\n.initialism {\r\n  font-size: 90%;\r\n  text-transform: uppercase;\r\n}\r\nblockquote {\r\n  padding: 10px 20px;\r\n  margin: 0 0 20px;\r\n  font-size: 17.5px;\r\n  border-left: 5px solid #eeeeee;\r\n}\r\nblockquote p:last-child,\r\nblockquote ul:last-child,\r\nblockquote ol:last-child {\r\n  margin-bottom: 0;\r\n}\r\nblockquote footer,\r\nblockquote small,\r\nblockquote .small {\r\n  display: block;\r\n  font-size: 80%;\r\n  line-height: 1.42857143;\r\n  color: #777777;\r\n}\r\nblockquote footer:before,\r\nblockquote small:before,\r\nblockquote .small:before {\r\n  content: '\\2014   \\A0';\r\n}\r\n.blockquote-reverse,\r\nblockquote.pull-right {\r\n  padding-right: 15px;\r\n  padding-left: 0;\r\n  border-right: 5px solid #eeeeee;\r\n  border-left: 0;\r\n  text-align: right;\r\n}\r\n.blockquote-reverse footer:before,\r\nblockquote.pull-right footer:before,\r\n.blockquote-reverse small:before,\r\nblockquote.pull-right small:before,\r\n.blockquote-reverse .small:before,\r\nblockquote.pull-right .small:before {\r\n  content: '';\r\n}\r\n.blockquote-reverse footer:after,\r\nblockquote.pull-right footer:after,\r\n.blockquote-reverse small:after,\r\nblockquote.pull-right small:after,\r\n.blockquote-reverse .small:after,\r\nblockquote.pull-right .small:after {\r\n  content: '\\A0   \\2014';\r\n}\r\naddress {\r\n  margin-bottom: 20px;\r\n  font-style: normal;\r\n  line-height: 1.42857143;\r\n}\r\ncode,\r\nkbd,\r\npre,\r\nsamp {\r\n  font-family: Menlo, Monaco, Consolas, \"Courier New\", monospace;\r\n}\r\ncode {\r\n  padding: 2px 4px;\r\n  font-size: 90%;\r\n  color: #c7254e;\r\n  background-color: #f9f2f4;\r\n  border-radius: 4px;\r\n}\r\nkbd {\r\n  padding: 2px 4px;\r\n  font-size: 90%;\r\n  color: #ffffff;\r\n  background-color: #333333;\r\n  border-radius: 3px;\r\n  -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.25);\r\n          box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.25);\r\n}\r\nkbd kbd {\r\n  padding: 0;\r\n  font-size: 100%;\r\n  font-weight: bold;\r\n  -webkit-box-shadow: none;\r\n          box-shadow: none;\r\n}\r\npre {\r\n  display: block;\r\n  padding: 9.5px;\r\n  margin: 0 0 10px;\r\n  font-size: 13px;\r\n  line-height: 1.42857143;\r\n  word-break: break-all;\r\n  word-wrap: break-word;\r\n  color: #333333;\r\n  background-color: #f5f5f5;\r\n  border: 1px solid #cccccc;\r\n  border-radius: 4px;\r\n}\r\npre code {\r\n  padding: 0;\r\n  font-size: inherit;\r\n  color: inherit;\r\n  white-space: pre-wrap;\r\n  background-color: transparent;\r\n  border-radius: 0;\r\n}\r\n.pre-scrollable {\r\n  max-height: 340px;\r\n  overflow-y: scroll;\r\n}\r\n.container {\r\n  margin-right: auto;\r\n  margin-left: auto;\r\n  padding-left: 15px;\r\n  padding-right: 15px;\r\n}\r\n@media (min-width: 768px) {\r\n  .container {\r\n    width: 750px;\r\n  }\r\n}\r\n@media (min-width: 992px) {\r\n  .container {\r\n    width: 970px;\r\n  }\r\n}\r\n@media (min-width: 1200px) {\r\n  .container {\r\n    width: 1170px;\r\n  }\r\n}\r\n.container-fluid {\r\n  margin-right: auto;\r\n  margin-left: auto;\r\n  padding-left: 15px;\r\n  padding-right: 15px;\r\n}\r\n.row {\r\n  margin-left: -15px;\r\n  margin-right: -15px;\r\n}\r\n.col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12 {\r\n  position: relative;\r\n  min-height: 1px;\r\n  padding-left: 15px;\r\n  padding-right: 15px;\r\n}\r\n.col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12 {\r\n  float: left;\r\n}\r\n.col-xs-12 {\r\n  width: 100%;\r\n}\r\n.col-xs-11 {\r\n  width: 91.66666667%;\r\n}\r\n.col-xs-10 {\r\n  width: 83.33333333%;\r\n}\r\n.col-xs-9 {\r\n  width: 75%;\r\n}\r\n.col-xs-8 {\r\n  width: 66.66666667%;\r\n}\r\n.col-xs-7 {\r\n  width: 58.33333333%;\r\n}\r\n.col-xs-6 {\r\n  width: 50%;\r\n}\r\n.col-xs-5 {\r\n  width: 41.66666667%;\r\n}\r\n.col-xs-4 {\r\n  width: 33.33333333%;\r\n}\r\n.col-xs-3 {\r\n  width: 25%;\r\n}\r\n.col-xs-2 {\r\n  width: 16.66666667%;\r\n}\r\n.col-xs-1 {\r\n  width: 8.33333333%;\r\n}\r\n.col-xs-pull-12 {\r\n  right: 100%;\r\n}\r\n.col-xs-pull-11 {\r\n  right: 91.66666667%;\r\n}\r\n.col-xs-pull-10 {\r\n  right: 83.33333333%;\r\n}\r\n.col-xs-pull-9 {\r\n  right: 75%;\r\n}\r\n.col-xs-pull-8 {\r\n  right: 66.66666667%;\r\n}\r\n.col-xs-pull-7 {\r\n  right: 58.33333333%;\r\n}\r\n.col-xs-pull-6 {\r\n  right: 50%;\r\n}\r\n.col-xs-pull-5 {\r\n  right: 41.66666667%;\r\n}\r\n.col-xs-pull-4 {\r\n  right: 33.33333333%;\r\n}\r\n.col-xs-pull-3 {\r\n  right: 25%;\r\n}\r\n.col-xs-pull-2 {\r\n  right: 16.66666667%;\r\n}\r\n.col-xs-pull-1 {\r\n  right: 8.33333333%;\r\n}\r\n.col-xs-pull-0 {\r\n  right: auto;\r\n}\r\n.col-xs-push-12 {\r\n  left: 100%;\r\n}\r\n.col-xs-push-11 {\r\n  left: 91.66666667%;\r\n}\r\n.col-xs-push-10 {\r\n  left: 83.33333333%;\r\n}\r\n.col-xs-push-9 {\r\n  left: 75%;\r\n}\r\n.col-xs-push-8 {\r\n  left: 66.66666667%;\r\n}\r\n.col-xs-push-7 {\r\n  left: 58.33333333%;\r\n}\r\n.col-xs-push-6 {\r\n  left: 50%;\r\n}\r\n.col-xs-push-5 {\r\n  left: 41.66666667%;\r\n}\r\n.col-xs-push-4 {\r\n  left: 33.33333333%;\r\n}\r\n.col-xs-push-3 {\r\n  left: 25%;\r\n}\r\n.col-xs-push-2 {\r\n  left: 16.66666667%;\r\n}\r\n.col-xs-push-1 {\r\n  left: 8.33333333%;\r\n}\r\n.col-xs-push-0 {\r\n  left: auto;\r\n}\r\n.col-xs-offset-12 {\r\n  margin-left: 100%;\r\n}\r\n.col-xs-offset-11 {\r\n  margin-left: 91.66666667%;\r\n}\r\n.col-xs-offset-10 {\r\n  margin-left: 83.33333333%;\r\n}\r\n.col-xs-offset-9 {\r\n  margin-left: 75%;\r\n}\r\n.col-xs-offset-8 {\r\n  margin-left: 66.66666667%;\r\n}\r\n.col-xs-offset-7 {\r\n  margin-left: 58.33333333%;\r\n}\r\n.col-xs-offset-6 {\r\n  margin-left: 50%;\r\n}\r\n.col-xs-offset-5 {\r\n  margin-left: 41.66666667%;\r\n}\r\n.col-xs-offset-4 {\r\n  margin-left: 33.33333333%;\r\n}\r\n.col-xs-offset-3 {\r\n  margin-left: 25%;\r\n}\r\n.col-xs-offset-2 {\r\n  margin-left: 16.66666667%;\r\n}\r\n.col-xs-offset-1 {\r\n  margin-left: 8.33333333%;\r\n}\r\n.col-xs-offset-0 {\r\n  margin-left: 0%;\r\n}\r\n@media (min-width: 768px) {\r\n  .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12 {\r\n    float: left;\r\n  }\r\n  .col-sm-12 {\r\n    width: 100%;\r\n  }\r\n  .col-sm-11 {\r\n    width: 91.66666667%;\r\n  }\r\n  .col-sm-10 {\r\n    width: 83.33333333%;\r\n  }\r\n  .col-sm-9 {\r\n    width: 75%;\r\n  }\r\n  .col-sm-8 {\r\n    width: 66.66666667%;\r\n  }\r\n  .col-sm-7 {\r\n    width: 58.33333333%;\r\n  }\r\n  .col-sm-6 {\r\n    width: 50%;\r\n  }\r\n  .col-sm-5 {\r\n    width: 41.66666667%;\r\n  }\r\n  .col-sm-4 {\r\n    width: 33.33333333%;\r\n  }\r\n  .col-sm-3 {\r\n    width: 25%;\r\n  }\r\n  .col-sm-2 {\r\n    width: 16.66666667%;\r\n  }\r\n  .col-sm-1 {\r\n    width: 8.33333333%;\r\n  }\r\n  .col-sm-pull-12 {\r\n    right: 100%;\r\n  }\r\n  .col-sm-pull-11 {\r\n    right: 91.66666667%;\r\n  }\r\n  .col-sm-pull-10 {\r\n    right: 83.33333333%;\r\n  }\r\n  .col-sm-pull-9 {\r\n    right: 75%;\r\n  }\r\n  .col-sm-pull-8 {\r\n    right: 66.66666667%;\r\n  }\r\n  .col-sm-pull-7 {\r\n    right: 58.33333333%;\r\n  }\r\n  .col-sm-pull-6 {\r\n    right: 50%;\r\n  }\r\n  .col-sm-pull-5 {\r\n    right: 41.66666667%;\r\n  }\r\n  .col-sm-pull-4 {\r\n    right: 33.33333333%;\r\n  }\r\n  .col-sm-pull-3 {\r\n    right: 25%;\r\n  }\r\n  .col-sm-pull-2 {\r\n    right: 16.66666667%;\r\n  }\r\n  .col-sm-pull-1 {\r\n    right: 8.33333333%;\r\n  }\r\n  .col-sm-pull-0 {\r\n    right: auto;\r\n  }\r\n  .col-sm-push-12 {\r\n    left: 100%;\r\n  }\r\n  .col-sm-push-11 {\r\n    left: 91.66666667%;\r\n  }\r\n  .col-sm-push-10 {\r\n    left: 83.33333333%;\r\n  }\r\n  .col-sm-push-9 {\r\n    left: 75%;\r\n  }\r\n  .col-sm-push-8 {\r\n    left: 66.66666667%;\r\n  }\r\n  .col-sm-push-7 {\r\n    left: 58.33333333%;\r\n  }\r\n  .col-sm-push-6 {\r\n    left: 50%;\r\n  }\r\n  .col-sm-push-5 {\r\n    left: 41.66666667%;\r\n  }\r\n  .col-sm-push-4 {\r\n    left: 33.33333333%;\r\n  }\r\n  .col-sm-push-3 {\r\n    left: 25%;\r\n  }\r\n  .col-sm-push-2 {\r\n    left: 16.66666667%;\r\n  }\r\n  .col-sm-push-1 {\r\n    left: 8.33333333%;\r\n  }\r\n  .col-sm-push-0 {\r\n    left: auto;\r\n  }\r\n  .col-sm-offset-12 {\r\n    margin-left: 100%;\r\n  }\r\n  .col-sm-offset-11 {\r\n    margin-left: 91.66666667%;\r\n  }\r\n  .col-sm-offset-10 {\r\n    margin-left: 83.33333333%;\r\n  }\r\n  .col-sm-offset-9 {\r\n    margin-left: 75%;\r\n  }\r\n  .col-sm-offset-8 {\r\n    margin-left: 66.66666667%;\r\n  }\r\n  .col-sm-offset-7 {\r\n    margin-left: 58.33333333%;\r\n  }\r\n  .col-sm-offset-6 {\r\n    margin-left: 50%;\r\n  }\r\n  .col-sm-offset-5 {\r\n    margin-left: 41.66666667%;\r\n  }\r\n  .col-sm-offset-4 {\r\n    margin-left: 33.33333333%;\r\n  }\r\n  .col-sm-offset-3 {\r\n    margin-left: 25%;\r\n  }\r\n  .col-sm-offset-2 {\r\n    margin-left: 16.66666667%;\r\n  }\r\n  .col-sm-offset-1 {\r\n    margin-left: 8.33333333%;\r\n  }\r\n  .col-sm-offset-0 {\r\n    margin-left: 0%;\r\n  }\r\n}\r\n@media (min-width: 992px) {\r\n  .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12 {\r\n    float: left;\r\n  }\r\n  .col-md-12 {\r\n    width: 100%;\r\n  }\r\n  .col-md-11 {\r\n    width: 91.66666667%;\r\n  }\r\n  .col-md-10 {\r\n    width: 83.33333333%;\r\n  }\r\n  .col-md-9 {\r\n    width: 75%;\r\n  }\r\n  .col-md-8 {\r\n    width: 66.66666667%;\r\n  }\r\n  .col-md-7 {\r\n    width: 58.33333333%;\r\n  }\r\n  .col-md-6 {\r\n    width: 50%;\r\n  }\r\n  .col-md-5 {\r\n    width: 41.66666667%;\r\n  }\r\n  .col-md-4 {\r\n    width: 33.33333333%;\r\n  }\r\n  .col-md-3 {\r\n    width: 25%;\r\n  }\r\n  .col-md-2 {\r\n    width: 16.66666667%;\r\n  }\r\n  .col-md-1 {\r\n    width: 8.33333333%;\r\n  }\r\n  .col-md-pull-12 {\r\n    right: 100%;\r\n  }\r\n  .col-md-pull-11 {\r\n    right: 91.66666667%;\r\n  }\r\n  .col-md-pull-10 {\r\n    right: 83.33333333%;\r\n  }\r\n  .col-md-pull-9 {\r\n    right: 75%;\r\n  }\r\n  .col-md-pull-8 {\r\n    right: 66.66666667%;\r\n  }\r\n  .col-md-pull-7 {\r\n    right: 58.33333333%;\r\n  }\r\n  .col-md-pull-6 {\r\n    right: 50%;\r\n  }\r\n  .col-md-pull-5 {\r\n    right: 41.66666667%;\r\n  }\r\n  .col-md-pull-4 {\r\n    right: 33.33333333%;\r\n  }\r\n  .col-md-pull-3 {\r\n    right: 25%;\r\n  }\r\n  .col-md-pull-2 {\r\n    right: 16.66666667%;\r\n  }\r\n  .col-md-pull-1 {\r\n    right: 8.33333333%;\r\n  }\r\n  .col-md-pull-0 {\r\n    right: auto;\r\n  }\r\n  .col-md-push-12 {\r\n    left: 100%;\r\n  }\r\n  .col-md-push-11 {\r\n    left: 91.66666667%;\r\n  }\r\n  .col-md-push-10 {\r\n    left: 83.33333333%;\r\n  }\r\n  .col-md-push-9 {\r\n    left: 75%;\r\n  }\r\n  .col-md-push-8 {\r\n    left: 66.66666667%;\r\n  }\r\n  .col-md-push-7 {\r\n    left: 58.33333333%;\r\n  }\r\n  .col-md-push-6 {\r\n    left: 50%;\r\n  }\r\n  .col-md-push-5 {\r\n    left: 41.66666667%;\r\n  }\r\n  .col-md-push-4 {\r\n    left: 33.33333333%;\r\n  }\r\n  .col-md-push-3 {\r\n    left: 25%;\r\n  }\r\n  .col-md-push-2 {\r\n    left: 16.66666667%;\r\n  }\r\n  .col-md-push-1 {\r\n    left: 8.33333333%;\r\n  }\r\n  .col-md-push-0 {\r\n    left: auto;\r\n  }\r\n  .col-md-offset-12 {\r\n    margin-left: 100%;\r\n  }\r\n  .col-md-offset-11 {\r\n    margin-left: 91.66666667%;\r\n  }\r\n  .col-md-offset-10 {\r\n    margin-left: 83.33333333%;\r\n  }\r\n  .col-md-offset-9 {\r\n    margin-left: 75%;\r\n  }\r\n  .col-md-offset-8 {\r\n    margin-left: 66.66666667%;\r\n  }\r\n  .col-md-offset-7 {\r\n    margin-left: 58.33333333%;\r\n  }\r\n  .col-md-offset-6 {\r\n    margin-left: 50%;\r\n  }\r\n  .col-md-offset-5 {\r\n    margin-left: 41.66666667%;\r\n  }\r\n  .col-md-offset-4 {\r\n    margin-left: 33.33333333%;\r\n  }\r\n  .col-md-offset-3 {\r\n    margin-left: 25%;\r\n  }\r\n  .col-md-offset-2 {\r\n    margin-left: 16.66666667%;\r\n  }\r\n  .col-md-offset-1 {\r\n    margin-left: 8.33333333%;\r\n  }\r\n  .col-md-offset-0 {\r\n    margin-left: 0%;\r\n  }\r\n}\r\n@media (min-width: 1200px) {\r\n  .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12 {\r\n    float: left;\r\n  }\r\n  .col-lg-12 {\r\n    width: 100%;\r\n  }\r\n  .col-lg-11 {\r\n    width: 91.66666667%;\r\n  }\r\n  .col-lg-10 {\r\n    width: 83.33333333%;\r\n  }\r\n  .col-lg-9 {\r\n    width: 75%;\r\n  }\r\n  .col-lg-8 {\r\n    width: 66.66666667%;\r\n  }\r\n  .col-lg-7 {\r\n    width: 58.33333333%;\r\n  }\r\n  .col-lg-6 {\r\n    width: 50%;\r\n  }\r\n  .col-lg-5 {\r\n    width: 41.66666667%;\r\n  }\r\n  .col-lg-4 {\r\n    width: 33.33333333%;\r\n  }\r\n  .col-lg-3 {\r\n    width: 25%;\r\n  }\r\n  .col-lg-2 {\r\n    width: 16.66666667%;\r\n  }\r\n  .col-lg-1 {\r\n    width: 8.33333333%;\r\n  }\r\n  .col-lg-pull-12 {\r\n    right: 100%;\r\n  }\r\n  .col-lg-pull-11 {\r\n    right: 91.66666667%;\r\n  }\r\n  .col-lg-pull-10 {\r\n    right: 83.33333333%;\r\n  }\r\n  .col-lg-pull-9 {\r\n    right: 75%;\r\n  }\r\n  .col-lg-pull-8 {\r\n    right: 66.66666667%;\r\n  }\r\n  .col-lg-pull-7 {\r\n    right: 58.33333333%;\r\n  }\r\n  .col-lg-pull-6 {\r\n    right: 50%;\r\n  }\r\n  .col-lg-pull-5 {\r\n    right: 41.66666667%;\r\n  }\r\n  .col-lg-pull-4 {\r\n    right: 33.33333333%;\r\n  }\r\n  .col-lg-pull-3 {\r\n    right: 25%;\r\n  }\r\n  .col-lg-pull-2 {\r\n    right: 16.66666667%;\r\n  }\r\n  .col-lg-pull-1 {\r\n    right: 8.33333333%;\r\n  }\r\n  .col-lg-pull-0 {\r\n    right: auto;\r\n  }\r\n  .col-lg-push-12 {\r\n    left: 100%;\r\n  }\r\n  .col-lg-push-11 {\r\n    left: 91.66666667%;\r\n  }\r\n  .col-lg-push-10 {\r\n    left: 83.33333333%;\r\n  }\r\n  .col-lg-push-9 {\r\n    left: 75%;\r\n  }\r\n  .col-lg-push-8 {\r\n    left: 66.66666667%;\r\n  }\r\n  .col-lg-push-7 {\r\n    left: 58.33333333%;\r\n  }\r\n  .col-lg-push-6 {\r\n    left: 50%;\r\n  }\r\n  .col-lg-push-5 {\r\n    left: 41.66666667%;\r\n  }\r\n  .col-lg-push-4 {\r\n    left: 33.33333333%;\r\n  }\r\n  .col-lg-push-3 {\r\n    left: 25%;\r\n  }\r\n  .col-lg-push-2 {\r\n    left: 16.66666667%;\r\n  }\r\n  .col-lg-push-1 {\r\n    left: 8.33333333%;\r\n  }\r\n  .col-lg-push-0 {\r\n    left: auto;\r\n  }\r\n  .col-lg-offset-12 {\r\n    margin-left: 100%;\r\n  }\r\n  .col-lg-offset-11 {\r\n    margin-left: 91.66666667%;\r\n  }\r\n  .col-lg-offset-10 {\r\n    margin-left: 83.33333333%;\r\n  }\r\n  .col-lg-offset-9 {\r\n    margin-left: 75%;\r\n  }\r\n  .col-lg-offset-8 {\r\n    margin-left: 66.66666667%;\r\n  }\r\n  .col-lg-offset-7 {\r\n    margin-left: 58.33333333%;\r\n  }\r\n  .col-lg-offset-6 {\r\n    margin-left: 50%;\r\n  }\r\n  .col-lg-offset-5 {\r\n    margin-left: 41.66666667%;\r\n  }\r\n  .col-lg-offset-4 {\r\n    margin-left: 33.33333333%;\r\n  }\r\n  .col-lg-offset-3 {\r\n    margin-left: 25%;\r\n  }\r\n  .col-lg-offset-2 {\r\n    margin-left: 16.66666667%;\r\n  }\r\n  .col-lg-offset-1 {\r\n    margin-left: 8.33333333%;\r\n  }\r\n  .col-lg-offset-0 {\r\n    margin-left: 0%;\r\n  }\r\n}\r\ntable {\r\n  background-color: transparent;\r\n}\r\ncaption {\r\n  padding-top: 8px;\r\n  padding-bottom: 8px;\r\n  color: #777777;\r\n  text-align: left;\r\n}\r\nth {\r\n  text-align: left;\r\n}\r\n.table {\r\n  width: 100%;\r\n  max-width: 100%;\r\n  margin-bottom: 20px;\r\n}\r\n.table > thead > tr > th,\r\n.table > tbody > tr > th,\r\n.table > tfoot > tr > th,\r\n.table > thead > tr > td,\r\n.table > tbody > tr > td,\r\n.table > tfoot > tr > td {\r\n  padding: 8px;\r\n  line-height: 1.42857143;\r\n  vertical-align: top;\r\n  border-top: 1px solid #dddddd;\r\n}\r\n.table > thead > tr > th {\r\n  vertical-align: bottom;\r\n  border-bottom: 2px solid #dddddd;\r\n}\r\n.table > caption + thead > tr:first-child > th,\r\n.table > colgroup + thead > tr:first-child > th,\r\n.table > thead:first-child > tr:first-child > th,\r\n.table > caption + thead > tr:first-child > td,\r\n.table > colgroup + thead > tr:first-child > td,\r\n.table > thead:first-child > tr:first-child > td {\r\n  border-top: 0;\r\n}\r\n.table > tbody + tbody {\r\n  border-top: 2px solid #dddddd;\r\n}\r\n.table .table {\r\n  background-color: #ffffff;\r\n}\r\n.table-condensed > thead > tr > th,\r\n.table-condensed > tbody > tr > th,\r\n.table-condensed > tfoot > tr > th,\r\n.table-condensed > thead > tr > td,\r\n.table-condensed > tbody > tr > td,\r\n.table-condensed > tfoot > tr > td {\r\n  padding: 5px;\r\n}\r\n.table-bordered {\r\n  border: 1px solid #dddddd;\r\n}\r\n.table-bordered > thead > tr > th,\r\n.table-bordered > tbody > tr > th,\r\n.table-bordered > tfoot > tr > th,\r\n.table-bordered > thead > tr > td,\r\n.table-bordered > tbody > tr > td,\r\n.table-bordered > tfoot > tr > td {\r\n  border: 1px solid #dddddd;\r\n}\r\n.table-bordered > thead > tr > th,\r\n.table-bordered > thead > tr > td {\r\n  border-bottom-width: 2px;\r\n}\r\n.table-striped > tbody > tr:nth-of-type(odd) {\r\n  background-color: #f9f9f9;\r\n}\r\n.table-hover > tbody > tr:hover {\r\n  background-color: #f5f5f5;\r\n}\r\ntable col[class*=\"col-\"] {\r\n  position: static;\r\n  float: none;\r\n  display: table-column;\r\n}\r\ntable td[class*=\"col-\"],\r\ntable th[class*=\"col-\"] {\r\n  position: static;\r\n  float: none;\r\n  display: table-cell;\r\n}\r\n.table > thead > tr > td.active,\r\n.table > tbody > tr > td.active,\r\n.table > tfoot > tr > td.active,\r\n.table > thead > tr > th.active,\r\n.table > tbody > tr > th.active,\r\n.table > tfoot > tr > th.active,\r\n.table > thead > tr.active > td,\r\n.table > tbody > tr.active > td,\r\n.table > tfoot > tr.active > td,\r\n.table > thead > tr.active > th,\r\n.table > tbody > tr.active > th,\r\n.table > tfoot > tr.active > th {\r\n  background-color: #f5f5f5;\r\n}\r\n.table-hover > tbody > tr > td.active:hover,\r\n.table-hover > tbody > tr > th.active:hover,\r\n.table-hover > tbody > tr.active:hover > td,\r\n.table-hover > tbody > tr:hover > .active,\r\n.table-hover > tbody > tr.active:hover > th {\r\n  background-color: #e8e8e8;\r\n}\r\n.table > thead > tr > td.success,\r\n.table > tbody > tr > td.success,\r\n.table > tfoot > tr > td.success,\r\n.table > thead > tr > th.success,\r\n.table > tbody > tr > th.success,\r\n.table > tfoot > tr > th.success,\r\n.table > thead > tr.success > td,\r\n.table > tbody > tr.success > td,\r\n.table > tfoot > tr.success > td,\r\n.table > thead > tr.success > th,\r\n.table > tbody > tr.success > th,\r\n.table > tfoot > tr.success > th {\r\n  background-color: #dff0d8;\r\n}\r\n.table-hover > tbody > tr > td.success:hover,\r\n.table-hover > tbody > tr > th.success:hover,\r\n.table-hover > tbody > tr.success:hover > td,\r\n.table-hover > tbody > tr:hover > .success,\r\n.table-hover > tbody > tr.success:hover > th {\r\n  background-color: #d0e9c6;\r\n}\r\n.table > thead > tr > td.info,\r\n.table > tbody > tr > td.info,\r\n.table > tfoot > tr > td.info,\r\n.table > thead > tr > th.info,\r\n.table > tbody > tr > th.info,\r\n.table > tfoot > tr > th.info,\r\n.table > thead > tr.info > td,\r\n.table > tbody > tr.info > td,\r\n.table > tfoot > tr.info > td,\r\n.table > thead > tr.info > th,\r\n.table > tbody > tr.info > th,\r\n.table > tfoot > tr.info > th {\r\n  background-color: #d9edf7;\r\n}\r\n.table-hover > tbody > tr > td.info:hover,\r\n.table-hover > tbody > tr > th.info:hover,\r\n.table-hover > tbody > tr.info:hover > td,\r\n.table-hover > tbody > tr:hover > .info,\r\n.table-hover > tbody > tr.info:hover > th {\r\n  background-color: #c4e3f3;\r\n}\r\n.table > thead > tr > td.warning,\r\n.table > tbody > tr > td.warning,\r\n.table > tfoot > tr > td.warning,\r\n.table > thead > tr > th.warning,\r\n.table > tbody > tr > th.warning,\r\n.table > tfoot > tr > th.warning,\r\n.table > thead > tr.warning > td,\r\n.table > tbody > tr.warning > td,\r\n.table > tfoot > tr.warning > td,\r\n.table > thead > tr.warning > th,\r\n.table > tbody > tr.warning > th,\r\n.table > tfoot > tr.warning > th {\r\n  background-color: #fcf8e3;\r\n}\r\n.table-hover > tbody > tr > td.warning:hover,\r\n.table-hover > tbody > tr > th.warning:hover,\r\n.table-hover > tbody > tr.warning:hover > td,\r\n.table-hover > tbody > tr:hover > .warning,\r\n.table-hover > tbody > tr.warning:hover > th {\r\n  background-color: #faf2cc;\r\n}\r\n.table > thead > tr > td.danger,\r\n.table > tbody > tr > td.danger,\r\n.table > tfoot > tr > td.danger,\r\n.table > thead > tr > th.danger,\r\n.table > tbody > tr > th.danger,\r\n.table > tfoot > tr > th.danger,\r\n.table > thead > tr.danger > td,\r\n.table > tbody > tr.danger > td,\r\n.table > tfoot > tr.danger > td,\r\n.table > thead > tr.danger > th,\r\n.table > tbody > tr.danger > th,\r\n.table > tfoot > tr.danger > th {\r\n  background-color: #f2dede;\r\n}\r\n.table-hover > tbody > tr > td.danger:hover,\r\n.table-hover > tbody > tr > th.danger:hover,\r\n.table-hover > tbody > tr.danger:hover > td,\r\n.table-hover > tbody > tr:hover > .danger,\r\n.table-hover > tbody > tr.danger:hover > th {\r\n  background-color: #ebcccc;\r\n}\r\n.table-responsive {\r\n  overflow-x: auto;\r\n  min-height: 0.01%;\r\n}\r\n@media screen and (max-width: 767px) {\r\n  .table-responsive {\r\n    width: 100%;\r\n    margin-bottom: 15px;\r\n    overflow-y: hidden;\r\n    -ms-overflow-style: -ms-autohiding-scrollbar;\r\n    border: 1px solid #dddddd;\r\n  }\r\n  .table-responsive > .table {\r\n    margin-bottom: 0;\r\n  }\r\n  .table-responsive > .table > thead > tr > th,\r\n  .table-responsive > .table > tbody > tr > th,\r\n  .table-responsive > .table > tfoot > tr > th,\r\n  .table-responsive > .table > thead > tr > td,\r\n  .table-responsive > .table > tbody > tr > td,\r\n  .table-responsive > .table > tfoot > tr > td {\r\n    white-space: nowrap;\r\n  }\r\n  .table-responsive > .table-bordered {\r\n    border: 0;\r\n  }\r\n  .table-responsive > .table-bordered > thead > tr > th:first-child,\r\n  .table-responsive > .table-bordered > tbody > tr > th:first-child,\r\n  .table-responsive > .table-bordered > tfoot > tr > th:first-child,\r\n  .table-responsive > .table-bordered > thead > tr > td:first-child,\r\n  .table-responsive > .table-bordered > tbody > tr > td:first-child,\r\n  .table-responsive > .table-bordered > tfoot > tr > td:first-child {\r\n    border-left: 0;\r\n  }\r\n  .table-responsive > .table-bordered > thead > tr > th:last-child,\r\n  .table-responsive > .table-bordered > tbody > tr > th:last-child,\r\n  .table-responsive > .table-bordered > tfoot > tr > th:last-child,\r\n  .table-responsive > .table-bordered > thead > tr > td:last-child,\r\n  .table-responsive > .table-bordered > tbody > tr > td:last-child,\r\n  .table-responsive > .table-bordered > tfoot > tr > td:last-child {\r\n    border-right: 0;\r\n  }\r\n  .table-responsive > .table-bordered > tbody > tr:last-child > th,\r\n  .table-responsive > .table-bordered > tfoot > tr:last-child > th,\r\n  .table-responsive > .table-bordered > tbody > tr:last-child > td,\r\n  .table-responsive > .table-bordered > tfoot > tr:last-child > td {\r\n    border-bottom: 0;\r\n  }\r\n}\r\nfieldset {\r\n  padding: 0;\r\n  margin: 0;\r\n  border: 0;\r\n  min-width: 0;\r\n}\r\nlegend {\r\n  display: block;\r\n  width: 100%;\r\n  padding: 0;\r\n  margin-bottom: 20px;\r\n  font-size: 21px;\r\n  line-height: inherit;\r\n  color: #333333;\r\n  border: 0;\r\n  border-bottom: 1px solid #e5e5e5;\r\n}\r\nlabel {\r\n  display: inline-block;\r\n  max-width: 100%;\r\n  margin-bottom: 5px;\r\n  font-weight: bold;\r\n}\r\ninput[type=\"search\"] {\r\n  -webkit-box-sizing: border-box;\r\n  -moz-box-sizing: border-box;\r\n  box-sizing: border-box;\r\n}\r\ninput[type=\"radio\"],\r\ninput[type=\"checkbox\"] {\r\n  margin: 4px 0 0;\r\n  margin-top: 1px \\9;\r\n  line-height: normal;\r\n}\r\ninput[type=\"file\"] {\r\n  display: block;\r\n}\r\ninput[type=\"range\"] {\r\n  display: block;\r\n  width: 100%;\r\n}\r\nselect[multiple],\r\nselect[size] {\r\n  height: auto;\r\n}\r\ninput[type=\"file\"]:focus,\r\ninput[type=\"radio\"]:focus,\r\ninput[type=\"checkbox\"]:focus {\r\n  outline: 5px auto -webkit-focus-ring-color;\r\n  outline-offset: -2px;\r\n}\r\noutput {\r\n  display: block;\r\n  padding-top: 7px;\r\n  font-size: 14px;\r\n  line-height: 1.42857143;\r\n  color: #555555;\r\n}\r\n.form-control {\r\n  display: block;\r\n  width: 100%;\r\n  height: 34px;\r\n  padding: 6px 12px;\r\n  font-size: 14px;\r\n  line-height: 1.42857143;\r\n  color: #555555;\r\n  background-color: #ffffff;\r\n  background-image: none;\r\n  border: 1px solid #cccccc;\r\n  border-radius: 4px;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;\r\n  -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;\r\n  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;\r\n}\r\n.form-control:focus {\r\n  border-color: #66afe9;\r\n  outline: 0;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6);\r\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6);\r\n}\r\n.form-control::-moz-placeholder {\r\n  color: #999999;\r\n  opacity: 1;\r\n}\r\n.form-control:-ms-input-placeholder {\r\n  color: #999999;\r\n}\r\n.form-control::-webkit-input-placeholder {\r\n  color: #999999;\r\n}\r\n.form-control::-ms-expand {\r\n  border: 0;\r\n  background-color: transparent;\r\n}\r\n.form-control[disabled],\r\n.form-control[readonly],\r\nfieldset[disabled] .form-control {\r\n  background-color: #eeeeee;\r\n  opacity: 1;\r\n}\r\n.form-control[disabled],\r\nfieldset[disabled] .form-control {\r\n  cursor: not-allowed;\r\n}\r\ntextarea.form-control {\r\n  height: auto;\r\n}\r\ninput[type=\"search\"] {\r\n  -webkit-appearance: none;\r\n}\r\n@media screen and (-webkit-min-device-pixel-ratio: 0) {\r\n  input[type=\"date\"].form-control,\r\n  input[type=\"time\"].form-control,\r\n  input[type=\"datetime-local\"].form-control,\r\n  input[type=\"month\"].form-control {\r\n    line-height: 34px;\r\n  }\r\n  input[type=\"date\"].input-sm,\r\n  input[type=\"time\"].input-sm,\r\n  input[type=\"datetime-local\"].input-sm,\r\n  input[type=\"month\"].input-sm,\r\n  .input-group-sm input[type=\"date\"],\r\n  .input-group-sm input[type=\"time\"],\r\n  .input-group-sm input[type=\"datetime-local\"],\r\n  .input-group-sm input[type=\"month\"] {\r\n    line-height: 30px;\r\n  }\r\n  input[type=\"date\"].input-lg,\r\n  input[type=\"time\"].input-lg,\r\n  input[type=\"datetime-local\"].input-lg,\r\n  input[type=\"month\"].input-lg,\r\n  .input-group-lg input[type=\"date\"],\r\n  .input-group-lg input[type=\"time\"],\r\n  .input-group-lg input[type=\"datetime-local\"],\r\n  .input-group-lg input[type=\"month\"] {\r\n    line-height: 46px;\r\n  }\r\n}\r\n.form-group {\r\n  margin-bottom: 15px;\r\n}\r\n.radio,\r\n.checkbox {\r\n  position: relative;\r\n  display: block;\r\n  margin-top: 10px;\r\n  margin-bottom: 10px;\r\n}\r\n.radio label,\r\n.checkbox label {\r\n  min-height: 20px;\r\n  padding-left: 20px;\r\n  margin-bottom: 0;\r\n  font-weight: normal;\r\n  cursor: pointer;\r\n}\r\n.radio input[type=\"radio\"],\r\n.radio-inline input[type=\"radio\"],\r\n.checkbox input[type=\"checkbox\"],\r\n.checkbox-inline input[type=\"checkbox\"] {\r\n  position: absolute;\r\n  margin-left: -20px;\r\n  margin-top: 4px \\9;\r\n}\r\n.radio + .radio,\r\n.checkbox + .checkbox {\r\n  margin-top: -5px;\r\n}\r\n.radio-inline,\r\n.checkbox-inline {\r\n  position: relative;\r\n  display: inline-block;\r\n  padding-left: 20px;\r\n  margin-bottom: 0;\r\n  vertical-align: middle;\r\n  font-weight: normal;\r\n  cursor: pointer;\r\n}\r\n.radio-inline + .radio-inline,\r\n.checkbox-inline + .checkbox-inline {\r\n  margin-top: 0;\r\n  margin-left: 10px;\r\n}\r\ninput[type=\"radio\"][disabled],\r\ninput[type=\"checkbox\"][disabled],\r\ninput[type=\"radio\"].disabled,\r\ninput[type=\"checkbox\"].disabled,\r\nfieldset[disabled] input[type=\"radio\"],\r\nfieldset[disabled] input[type=\"checkbox\"] {\r\n  cursor: not-allowed;\r\n}\r\n.radio-inline.disabled,\r\n.checkbox-inline.disabled,\r\nfieldset[disabled] .radio-inline,\r\nfieldset[disabled] .checkbox-inline {\r\n  cursor: not-allowed;\r\n}\r\n.radio.disabled label,\r\n.checkbox.disabled label,\r\nfieldset[disabled] .radio label,\r\nfieldset[disabled] .checkbox label {\r\n  cursor: not-allowed;\r\n}\r\n.form-control-static {\r\n  padding-top: 7px;\r\n  padding-bottom: 7px;\r\n  margin-bottom: 0;\r\n  min-height: 34px;\r\n}\r\n.form-control-static.input-lg,\r\n.form-control-static.input-sm {\r\n  padding-left: 0;\r\n  padding-right: 0;\r\n}\r\n.input-sm {\r\n  height: 30px;\r\n  padding: 5px 10px;\r\n  font-size: 12px;\r\n  line-height: 1.5;\r\n  border-radius: 3px;\r\n}\r\nselect.input-sm {\r\n  height: 30px;\r\n  line-height: 30px;\r\n}\r\ntextarea.input-sm,\r\nselect[multiple].input-sm {\r\n  height: auto;\r\n}\r\n.form-group-sm .form-control {\r\n  height: 30px;\r\n  padding: 5px 10px;\r\n  font-size: 12px;\r\n  line-height: 1.5;\r\n  border-radius: 3px;\r\n}\r\n.form-group-sm select.form-control {\r\n  height: 30px;\r\n  line-height: 30px;\r\n}\r\n.form-group-sm textarea.form-control,\r\n.form-group-sm select[multiple].form-control {\r\n  height: auto;\r\n}\r\n.form-group-sm .form-control-static {\r\n  height: 30px;\r\n  min-height: 32px;\r\n  padding: 6px 10px;\r\n  font-size: 12px;\r\n  line-height: 1.5;\r\n}\r\n.input-lg {\r\n  height: 46px;\r\n  padding: 10px 16px;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  border-radius: 6px;\r\n}\r\nselect.input-lg {\r\n  height: 46px;\r\n  line-height: 46px;\r\n}\r\ntextarea.input-lg,\r\nselect[multiple].input-lg {\r\n  height: auto;\r\n}\r\n.form-group-lg .form-control {\r\n  height: 46px;\r\n  padding: 10px 16px;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  border-radius: 6px;\r\n}\r\n.form-group-lg select.form-control {\r\n  height: 46px;\r\n  line-height: 46px;\r\n}\r\n.form-group-lg textarea.form-control,\r\n.form-group-lg select[multiple].form-control {\r\n  height: auto;\r\n}\r\n.form-group-lg .form-control-static {\r\n  height: 46px;\r\n  min-height: 38px;\r\n  padding: 11px 16px;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n}\r\n.has-feedback {\r\n  position: relative;\r\n}\r\n.has-feedback .form-control {\r\n  padding-right: 42.5px;\r\n}\r\n.form-control-feedback {\r\n  position: absolute;\r\n  top: 0;\r\n  right: 0;\r\n  z-index: 2;\r\n  display: block;\r\n  width: 34px;\r\n  height: 34px;\r\n  line-height: 34px;\r\n  text-align: center;\r\n  pointer-events: none;\r\n}\r\n.input-lg + .form-control-feedback,\r\n.input-group-lg + .form-control-feedback,\r\n.form-group-lg .form-control + .form-control-feedback {\r\n  width: 46px;\r\n  height: 46px;\r\n  line-height: 46px;\r\n}\r\n.input-sm + .form-control-feedback,\r\n.input-group-sm + .form-control-feedback,\r\n.form-group-sm .form-control + .form-control-feedback {\r\n  width: 30px;\r\n  height: 30px;\r\n  line-height: 30px;\r\n}\r\n.has-success .help-block,\r\n.has-success .control-label,\r\n.has-success .radio,\r\n.has-success .checkbox,\r\n.has-success .radio-inline,\r\n.has-success .checkbox-inline,\r\n.has-success.radio label,\r\n.has-success.checkbox label,\r\n.has-success.radio-inline label,\r\n.has-success.checkbox-inline label {\r\n  color: #3c763d;\r\n}\r\n.has-success .form-control {\r\n  border-color: #3c763d;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n}\r\n.has-success .form-control:focus {\r\n  border-color: #2b542c;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #67b168;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #67b168;\r\n}\r\n.has-success .input-group-addon {\r\n  color: #3c763d;\r\n  border-color: #3c763d;\r\n  background-color: #dff0d8;\r\n}\r\n.has-success .form-control-feedback {\r\n  color: #3c763d;\r\n}\r\n.has-warning .help-block,\r\n.has-warning .control-label,\r\n.has-warning .radio,\r\n.has-warning .checkbox,\r\n.has-warning .radio-inline,\r\n.has-warning .checkbox-inline,\r\n.has-warning.radio label,\r\n.has-warning.checkbox label,\r\n.has-warning.radio-inline label,\r\n.has-warning.checkbox-inline label {\r\n  color: #8a6d3b;\r\n}\r\n.has-warning .form-control {\r\n  border-color: #8a6d3b;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n}\r\n.has-warning .form-control:focus {\r\n  border-color: #66512c;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #c0a16b;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #c0a16b;\r\n}\r\n.has-warning .input-group-addon {\r\n  color: #8a6d3b;\r\n  border-color: #8a6d3b;\r\n  background-color: #fcf8e3;\r\n}\r\n.has-warning .form-control-feedback {\r\n  color: #8a6d3b;\r\n}\r\n.has-error .help-block,\r\n.has-error .control-label,\r\n.has-error .radio,\r\n.has-error .checkbox,\r\n.has-error .radio-inline,\r\n.has-error .checkbox-inline,\r\n.has-error.radio label,\r\n.has-error.checkbox label,\r\n.has-error.radio-inline label,\r\n.has-error.checkbox-inline label {\r\n  color: #a94442;\r\n}\r\n.has-error .form-control {\r\n  border-color: #a94442;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n}\r\n.has-error .form-control:focus {\r\n  border-color: #843534;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483;\r\n}\r\n.has-error .input-group-addon {\r\n  color: #a94442;\r\n  border-color: #a94442;\r\n  background-color: #f2dede;\r\n}\r\n.has-error .form-control-feedback {\r\n  color: #a94442;\r\n}\r\n.has-feedback label ~ .form-control-feedback {\r\n  top: 25px;\r\n}\r\n.has-feedback label.sr-only ~ .form-control-feedback {\r\n  top: 0;\r\n}\r\n.help-block {\r\n  display: block;\r\n  margin-top: 5px;\r\n  margin-bottom: 10px;\r\n  color: #737373;\r\n}\r\n@media (min-width: 768px) {\r\n  .form-inline .form-group {\r\n    display: inline-block;\r\n    margin-bottom: 0;\r\n    vertical-align: middle;\r\n  }\r\n  .form-inline .form-control {\r\n    display: inline-block;\r\n    width: auto;\r\n    vertical-align: middle;\r\n  }\r\n  .form-inline .form-control-static {\r\n    display: inline-block;\r\n  }\r\n  .form-inline .input-group {\r\n    display: inline-table;\r\n    vertical-align: middle;\r\n  }\r\n  .form-inline .input-group .input-group-addon,\r\n  .form-inline .input-group .input-group-btn,\r\n  .form-inline .input-group .form-control {\r\n    width: auto;\r\n  }\r\n  .form-inline .input-group > .form-control {\r\n    width: 100%;\r\n  }\r\n  .form-inline .control-label {\r\n    margin-bottom: 0;\r\n    vertical-align: middle;\r\n  }\r\n  .form-inline .radio,\r\n  .form-inline .checkbox {\r\n    display: inline-block;\r\n    margin-top: 0;\r\n    margin-bottom: 0;\r\n    vertical-align: middle;\r\n  }\r\n  .form-inline .radio label,\r\n  .form-inline .checkbox label {\r\n    padding-left: 0;\r\n  }\r\n  .form-inline .radio input[type=\"radio\"],\r\n  .form-inline .checkbox input[type=\"checkbox\"] {\r\n    position: relative;\r\n    margin-left: 0;\r\n  }\r\n  .form-inline .has-feedback .form-control-feedback {\r\n    top: 0;\r\n  }\r\n}\r\n.form-horizontal .radio,\r\n.form-horizontal .checkbox,\r\n.form-horizontal .radio-inline,\r\n.form-horizontal .checkbox-inline {\r\n  margin-top: 0;\r\n  margin-bottom: 0;\r\n  padding-top: 7px;\r\n}\r\n.form-horizontal .radio,\r\n.form-horizontal .checkbox {\r\n  min-height: 27px;\r\n}\r\n.form-horizontal .form-group {\r\n  margin-left: -15px;\r\n  margin-right: -15px;\r\n}\r\n@media (min-width: 768px) {\r\n  .form-horizontal .control-label {\r\n    text-align: right;\r\n    margin-bottom: 0;\r\n    padding-top: 7px;\r\n  }\r\n}\r\n.form-horizontal .has-feedback .form-control-feedback {\r\n  right: 15px;\r\n}\r\n@media (min-width: 768px) {\r\n  .form-horizontal .form-group-lg .control-label {\r\n    padding-top: 11px;\r\n    font-size: 18px;\r\n  }\r\n}\r\n@media (min-width: 768px) {\r\n  .form-horizontal .form-group-sm .control-label {\r\n    padding-top: 6px;\r\n    font-size: 12px;\r\n  }\r\n}\r\n.btn {\r\n  display: inline-block;\r\n  margin-bottom: 0;\r\n  font-weight: normal;\r\n  text-align: center;\r\n  vertical-align: middle;\r\n  -ms-touch-action: manipulation;\r\n      touch-action: manipulation;\r\n  cursor: pointer;\r\n  background-image: none;\r\n  border: 1px solid transparent;\r\n  white-space: nowrap;\r\n  padding: 6px 12px;\r\n  font-size: 14px;\r\n  line-height: 1.42857143;\r\n  border-radius: 4px;\r\n  -webkit-user-select: none;\r\n  -moz-user-select: none;\r\n  -ms-user-select: none;\r\n  user-select: none;\r\n}\r\n.btn:focus,\r\n.btn:active:focus,\r\n.btn.active:focus,\r\n.btn.focus,\r\n.btn:active.focus,\r\n.btn.active.focus {\r\n  outline: 5px auto -webkit-focus-ring-color;\r\n  outline-offset: -2px;\r\n}\r\n.btn:hover,\r\n.btn:focus,\r\n.btn.focus {\r\n  color: #333333;\r\n  text-decoration: none;\r\n}\r\n.btn:active,\r\n.btn.active {\r\n  outline: 0;\r\n  background-image: none;\r\n  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\r\n  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\r\n}\r\n.btn.disabled,\r\n.btn[disabled],\r\nfieldset[disabled] .btn {\r\n  cursor: not-allowed;\r\n  opacity: 0.65;\r\n  filter: alpha(opacity=65);\r\n  -webkit-box-shadow: none;\r\n  box-shadow: none;\r\n}\r\na.btn.disabled,\r\nfieldset[disabled] a.btn {\r\n  pointer-events: none;\r\n}\r\n.btn-default {\r\n  color: #333333;\r\n  background-color: #ffffff;\r\n  border-color: #cccccc;\r\n}\r\n.btn-default:focus,\r\n.btn-default.focus {\r\n  color: #333333;\r\n  background-color: #e6e6e6;\r\n  border-color: #8c8c8c;\r\n}\r\n.btn-default:hover {\r\n  color: #333333;\r\n  background-color: #e6e6e6;\r\n  border-color: #adadad;\r\n}\r\n.btn-default:active,\r\n.btn-default.active,\r\n.open > .dropdown-toggle.btn-default {\r\n  color: #333333;\r\n  background-color: #e6e6e6;\r\n  border-color: #adadad;\r\n}\r\n.btn-default:active:hover,\r\n.btn-default.active:hover,\r\n.open > .dropdown-toggle.btn-default:hover,\r\n.btn-default:active:focus,\r\n.btn-default.active:focus,\r\n.open > .dropdown-toggle.btn-default:focus,\r\n.btn-default:active.focus,\r\n.btn-default.active.focus,\r\n.open > .dropdown-toggle.btn-default.focus {\r\n  color: #333333;\r\n  background-color: #d4d4d4;\r\n  border-color: #8c8c8c;\r\n}\r\n.btn-default:active,\r\n.btn-default.active,\r\n.open > .dropdown-toggle.btn-default {\r\n  background-image: none;\r\n}\r\n.btn-default.disabled:hover,\r\n.btn-default[disabled]:hover,\r\nfieldset[disabled] .btn-default:hover,\r\n.btn-default.disabled:focus,\r\n.btn-default[disabled]:focus,\r\nfieldset[disabled] .btn-default:focus,\r\n.btn-default.disabled.focus,\r\n.btn-default[disabled].focus,\r\nfieldset[disabled] .btn-default.focus {\r\n  background-color: #ffffff;\r\n  border-color: #cccccc;\r\n}\r\n.btn-default .badge {\r\n  color: #ffffff;\r\n  background-color: #333333;\r\n}\r\n.btn-file {\r\n  position: relative;\r\n  overflow: hidden;\r\n}\r\n.btn-file input[type=file] {\r\n  position: absolute;\r\n  top: 0;\r\n  right: 0;\r\n  min-width: 100%;\r\n  min-height: 100%;\r\n  font-size: 100px;\r\n  text-align: right;\r\n  filter: alpha(opacity=0);\r\n  opacity: 0;\r\n  background: red;\r\n  cursor: inherit;\r\n  display: block;\r\n}\r\ninput[readonly] {\r\n  background-color: white !important;\r\n  cursor: text !important;\r\n}\r\n.btn-primary {\r\n  color: #ffffff;\r\n  background-color: #337ab7;\r\n  border-color: #2e6da4;\r\n}\r\n.btn-primary:focus,\r\n.btn-primary.focus {\r\n  color: #ffffff;\r\n  background-color: #286090;\r\n  border-color: #122b40;\r\n}\r\n.btn-primary:hover {\r\n  color: #ffffff;\r\n  background-color: #286090;\r\n  border-color: #204d74;\r\n}\r\n.btn-primary:active,\r\n.btn-primary.active,\r\n.open > .dropdown-toggle.btn-primary {\r\n  color: #ffffff;\r\n  background-color: #286090;\r\n  border-color: #204d74;\r\n}\r\n.btn-primary:active:hover,\r\n.btn-primary.active:hover,\r\n.open > .dropdown-toggle.btn-primary:hover,\r\n.btn-primary:active:focus,\r\n.btn-primary.active:focus,\r\n.open > .dropdown-toggle.btn-primary:focus,\r\n.btn-primary:active.focus,\r\n.btn-primary.active.focus,\r\n.open > .dropdown-toggle.btn-primary.focus {\r\n  color: #ffffff;\r\n  background-color: #204d74;\r\n  border-color: #122b40;\r\n}\r\n.btn-primary:active,\r\n.btn-primary.active,\r\n.open > .dropdown-toggle.btn-primary {\r\n  background-image: none;\r\n}\r\n.btn-primary.disabled:hover,\r\n.btn-primary[disabled]:hover,\r\nfieldset[disabled] .btn-primary:hover,\r\n.btn-primary.disabled:focus,\r\n.btn-primary[disabled]:focus,\r\nfieldset[disabled] .btn-primary:focus,\r\n.btn-primary.disabled.focus,\r\n.btn-primary[disabled].focus,\r\nfieldset[disabled] .btn-primary.focus {\r\n  background-color: #337ab7;\r\n  border-color: #2e6da4;\r\n}\r\n.btn-primary .badge {\r\n  color: #337ab7;\r\n  background-color: #ffffff;\r\n}\r\n.btn-success {\r\n  color: #ffffff;\r\n  background-color: #5cb85c;\r\n  border-color: #4cae4c;\r\n}\r\n.btn-success:focus,\r\n.btn-success.focus {\r\n  color: #ffffff;\r\n  background-color: #449d44;\r\n  border-color: #255625;\r\n}\r\n.btn-success:hover {\r\n  color: #ffffff;\r\n  background-color: #449d44;\r\n  border-color: #398439;\r\n}\r\n.btn-success:active,\r\n.btn-success.active,\r\n.open > .dropdown-toggle.btn-success {\r\n  color: #ffffff;\r\n  background-color: #449d44;\r\n  border-color: #398439;\r\n}\r\n.btn-success:active:hover,\r\n.btn-success.active:hover,\r\n.open > .dropdown-toggle.btn-success:hover,\r\n.btn-success:active:focus,\r\n.btn-success.active:focus,\r\n.open > .dropdown-toggle.btn-success:focus,\r\n.btn-success:active.focus,\r\n.btn-success.active.focus,\r\n.open > .dropdown-toggle.btn-success.focus {\r\n  color: #ffffff;\r\n  background-color: #398439;\r\n  border-color: #255625;\r\n}\r\n.btn-success:active,\r\n.btn-success.active,\r\n.open > .dropdown-toggle.btn-success {\r\n  background-image: none;\r\n}\r\n.btn-success.disabled:hover,\r\n.btn-success[disabled]:hover,\r\nfieldset[disabled] .btn-success:hover,\r\n.btn-success.disabled:focus,\r\n.btn-success[disabled]:focus,\r\nfieldset[disabled] .btn-success:focus,\r\n.btn-success.disabled.focus,\r\n.btn-success[disabled].focus,\r\nfieldset[disabled] .btn-success.focus {\r\n  background-color: #5cb85c;\r\n  border-color: #4cae4c;\r\n}\r\n.btn-success .badge {\r\n  color: #5cb85c;\r\n  background-color: #ffffff;\r\n}\r\n.btn-info {\r\n  color: #ffffff;\r\n  background-color: #5bc0de;\r\n  border-color: #46b8da;\r\n}\r\n.btn-info:focus,\r\n.btn-info.focus {\r\n  color: #ffffff;\r\n  background-color: #31b0d5;\r\n  border-color: #1b6d85;\r\n}\r\n.btn-info:hover {\r\n  color: #ffffff;\r\n  background-color: #31b0d5;\r\n  border-color: #269abc;\r\n}\r\n.btn-info:active,\r\n.btn-info.active,\r\n.open > .dropdown-toggle.btn-info {\r\n  color: #ffffff;\r\n  background-color: #31b0d5;\r\n  border-color: #269abc;\r\n}\r\n.btn-info:active:hover,\r\n.btn-info.active:hover,\r\n.open > .dropdown-toggle.btn-info:hover,\r\n.btn-info:active:focus,\r\n.btn-info.active:focus,\r\n.open > .dropdown-toggle.btn-info:focus,\r\n.btn-info:active.focus,\r\n.btn-info.active.focus,\r\n.open > .dropdown-toggle.btn-info.focus {\r\n  color: #ffffff;\r\n  background-color: #269abc;\r\n  border-color: #1b6d85;\r\n}\r\n.btn-info:active,\r\n.btn-info.active,\r\n.open > .dropdown-toggle.btn-info {\r\n  background-image: none;\r\n}\r\n.btn-info.disabled:hover,\r\n.btn-info[disabled]:hover,\r\nfieldset[disabled] .btn-info:hover,\r\n.btn-info.disabled:focus,\r\n.btn-info[disabled]:focus,\r\nfieldset[disabled] .btn-info:focus,\r\n.btn-info.disabled.focus,\r\n.btn-info[disabled].focus,\r\nfieldset[disabled] .btn-info.focus {\r\n  background-color: #5bc0de;\r\n  border-color: #46b8da;\r\n}\r\n.btn-info .badge {\r\n  color: #5bc0de;\r\n  background-color: #ffffff;\r\n}\r\n.btn-warning {\r\n  color: #ffffff;\r\n  background-color: #f0ad4e;\r\n  border-color: #eea236;\r\n}\r\n.btn-warning:focus,\r\n.btn-warning.focus {\r\n  color: #ffffff;\r\n  background-color: #ec971f;\r\n  border-color: #985f0d;\r\n}\r\n.btn-warning:hover {\r\n  color: #ffffff;\r\n  background-color: #ec971f;\r\n  border-color: #d58512;\r\n}\r\n.btn-warning:active,\r\n.btn-warning.active,\r\n.open > .dropdown-toggle.btn-warning {\r\n  color: #ffffff;\r\n  background-color: #ec971f;\r\n  border-color: #d58512;\r\n}\r\n.btn-warning:active:hover,\r\n.btn-warning.active:hover,\r\n.open > .dropdown-toggle.btn-warning:hover,\r\n.btn-warning:active:focus,\r\n.btn-warning.active:focus,\r\n.open > .dropdown-toggle.btn-warning:focus,\r\n.btn-warning:active.focus,\r\n.btn-warning.active.focus,\r\n.open > .dropdown-toggle.btn-warning.focus {\r\n  color: #ffffff;\r\n  background-color: #d58512;\r\n  border-color: #985f0d;\r\n}\r\n.btn-warning:active,\r\n.btn-warning.active,\r\n.open > .dropdown-toggle.btn-warning {\r\n  background-image: none;\r\n}\r\n.btn-warning.disabled:hover,\r\n.btn-warning[disabled]:hover,\r\nfieldset[disabled] .btn-warning:hover,\r\n.btn-warning.disabled:focus,\r\n.btn-warning[disabled]:focus,\r\nfieldset[disabled] .btn-warning:focus,\r\n.btn-warning.disabled.focus,\r\n.btn-warning[disabled].focus,\r\nfieldset[disabled] .btn-warning.focus {\r\n  background-color: #f0ad4e;\r\n  border-color: #eea236;\r\n}\r\n.btn-warning .badge {\r\n  color: #f0ad4e;\r\n  background-color: #ffffff;\r\n}\r\n.btn-danger {\r\n  color: #ffffff;\r\n  background-color: #d9534f;\r\n  border-color: #d43f3a;\r\n}\r\n.btn-danger:focus,\r\n.btn-danger.focus {\r\n  color: #ffffff;\r\n  background-color: #c9302c;\r\n  border-color: #761c19;\r\n}\r\n.btn-danger:hover {\r\n  color: #ffffff;\r\n  background-color: #c9302c;\r\n  border-color: #ac2925;\r\n}\r\n.btn-danger:active,\r\n.btn-danger.active,\r\n.open > .dropdown-toggle.btn-danger {\r\n  color: #ffffff;\r\n  background-color: #c9302c;\r\n  border-color: #ac2925;\r\n}\r\n.btn-danger:active:hover,\r\n.btn-danger.active:hover,\r\n.open > .dropdown-toggle.btn-danger:hover,\r\n.btn-danger:active:focus,\r\n.btn-danger.active:focus,\r\n.open > .dropdown-toggle.btn-danger:focus,\r\n.btn-danger:active.focus,\r\n.btn-danger.active.focus,\r\n.open > .dropdown-toggle.btn-danger.focus {\r\n  color: #ffffff;\r\n  background-color: #ac2925;\r\n  border-color: #761c19;\r\n}\r\n.btn-danger:active,\r\n.btn-danger.active,\r\n.open > .dropdown-toggle.btn-danger {\r\n  background-image: none;\r\n}\r\n.btn-danger.disabled:hover,\r\n.btn-danger[disabled]:hover,\r\nfieldset[disabled] .btn-danger:hover,\r\n.btn-danger.disabled:focus,\r\n.btn-danger[disabled]:focus,\r\nfieldset[disabled] .btn-danger:focus,\r\n.btn-danger.disabled.focus,\r\n.btn-danger[disabled].focus,\r\nfieldset[disabled] .btn-danger.focus {\r\n  background-color: #d9534f;\r\n  border-color: #d43f3a;\r\n}\r\n.btn-danger .badge {\r\n  color: #d9534f;\r\n  background-color: #ffffff;\r\n}\r\n.btn-link {\r\n  color: #337ab7;\r\n  font-weight: normal;\r\n  border-radius: 0;\r\n}\r\n.btn-link,\r\n.btn-link:active,\r\n.btn-link.active,\r\n.btn-link[disabled],\r\nfieldset[disabled] .btn-link {\r\n  background-color: transparent;\r\n  -webkit-box-shadow: none;\r\n  box-shadow: none;\r\n}\r\n.btn-link,\r\n.btn-link:hover,\r\n.btn-link:focus,\r\n.btn-link:active {\r\n  border-color: transparent;\r\n}\r\n.btn-link:hover,\r\n.btn-link:focus {\r\n  color: #23527c;\r\n  text-decoration: underline;\r\n  background-color: transparent;\r\n}\r\n.btn-link[disabled]:hover,\r\nfieldset[disabled] .btn-link:hover,\r\n.btn-link[disabled]:focus,\r\nfieldset[disabled] .btn-link:focus {\r\n  color: #777777;\r\n  text-decoration: none;\r\n}\r\n.btn-lg,\r\n.btn-group-lg > .btn {\r\n  padding: 10px 16px;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  border-radius: 6px;\r\n}\r\n.btn-sm,\r\n.btn-group-sm > .btn {\r\n  padding: 5px 10px;\r\n  font-size: 12px;\r\n  line-height: 1.5;\r\n  border-radius: 3px;\r\n}\r\n.btn-xs,\r\n.btn-group-xs > .btn {\r\n  padding: 1px 5px;\r\n  font-size: 12px;\r\n  line-height: 1.5;\r\n  border-radius: 3px;\r\n}\r\n.btn-block {\r\n  display: block;\r\n  width: 100%;\r\n}\r\n.btn-block + .btn-block {\r\n  margin-top: 5px;\r\n}\r\ninput[type=\"submit\"].btn-block,\r\ninput[type=\"reset\"].btn-block,\r\ninput[type=\"button\"].btn-block {\r\n  width: 100%;\r\n}\r\n.fade {\r\n  opacity: 0;\r\n  -webkit-transition: opacity 0.15s linear;\r\n  -o-transition: opacity 0.15s linear;\r\n  transition: opacity 0.15s linear;\r\n}\r\n.fade.in {\r\n  opacity: 1;\r\n}\r\n.collapse {\r\n  display: none;\r\n}\r\n.collapse.in {\r\n  display: block;\r\n}\r\ntr.collapse.in {\r\n  display: table-row;\r\n}\r\ntbody.collapse.in {\r\n  display: table-row-group;\r\n}\r\n.collapsing {\r\n  position: relative;\r\n  height: 0;\r\n  overflow: hidden;\r\n  -webkit-transition-property: height, visibility;\r\n  -o-transition-property: height, visibility;\r\n     transition-property: height, visibility;\r\n  -webkit-transition-duration: 0.35s;\r\n  -o-transition-duration: 0.35s;\r\n     transition-duration: 0.35s;\r\n  -webkit-transition-timing-function: ease;\r\n  -o-transition-timing-function: ease;\r\n     transition-timing-function: ease;\r\n}\r\n.caret {\r\n  display: inline-block;\r\n  width: 0;\r\n  height: 0;\r\n  margin-left: 2px;\r\n  vertical-align: middle;\r\n  border-top: 4px dashed;\r\n  border-top: 4px solid \\9;\r\n  border-right: 4px solid transparent;\r\n  border-left: 4px solid transparent;\r\n}\r\n.dropup,\r\n.dropdown {\r\n  position: relative;\r\n}\r\n.dropdown-toggle:focus {\r\n  outline: 0;\r\n}\r\n.dropdown-menu {\r\n  position: absolute;\r\n  top: 100%;\r\n  left: 0;\r\n  z-index: 1000;\r\n  display: none;\r\n  float: left;\r\n  min-width: 160px;\r\n  padding: 5px 0;\r\n  margin: 2px 0 0;\r\n  list-style: none;\r\n  font-size: 14px;\r\n  text-align: left;\r\n  background-color: #ffffff;\r\n  border: 1px solid #cccccc;\r\n  border: 1px solid rgba(0, 0, 0, 0.15);\r\n  border-radius: 4px;\r\n  -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);\r\n  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);\r\n  -webkit-background-clip: padding-box;\r\n          background-clip: padding-box;\r\n}\r\n.dropdown-menu.pull-right {\r\n  right: 0;\r\n  left: auto;\r\n}\r\n.dropdown-menu .divider {\r\n  height: 1px;\r\n  margin: 9px 0;\r\n  overflow: hidden;\r\n  background-color: #e5e5e5;\r\n}\r\n.dropdown-menu > li > a {\r\n  display: block;\r\n  padding: 3px 20px;\r\n  clear: both;\r\n  font-weight: normal;\r\n  line-height: 1.42857143;\r\n  color: #333333;\r\n  white-space: nowrap;\r\n}\r\n.dropdown-menu > li > a:hover,\r\n.dropdown-menu > li > a:focus {\r\n  text-decoration: none;\r\n  color: #262626;\r\n  background-color: #f5f5f5;\r\n}\r\n.dropdown-menu > .active > a,\r\n.dropdown-menu > .active > a:hover,\r\n.dropdown-menu > .active > a:focus {\r\n  color: #ffffff;\r\n  text-decoration: none;\r\n  outline: 0;\r\n  background-color: #337ab7;\r\n}\r\n.dropdown-menu > .disabled > a,\r\n.dropdown-menu > .disabled > a:hover,\r\n.dropdown-menu > .disabled > a:focus {\r\n  color: #777777;\r\n}\r\n.dropdown-menu > .disabled > a:hover,\r\n.dropdown-menu > .disabled > a:focus {\r\n  text-decoration: none;\r\n  background-color: transparent;\r\n  background-image: none;\r\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);\r\n  cursor: not-allowed;\r\n}\r\n.open > .dropdown-menu {\r\n  display: block;\r\n}\r\n.open > a {\r\n  outline: 0;\r\n}\r\n.dropdown-menu-right {\r\n  left: auto;\r\n  right: 0;\r\n}\r\n.dropdown-menu-left {\r\n  left: 0;\r\n  right: auto;\r\n}\r\n.dropdown-header {\r\n  display: block;\r\n  padding: 3px 20px;\r\n  font-size: 12px;\r\n  line-height: 1.42857143;\r\n  color: #777777;\r\n  white-space: nowrap;\r\n}\r\n.dropdown-backdrop {\r\n  position: fixed;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  top: 0;\r\n  z-index: 990;\r\n}\r\n.pull-right > .dropdown-menu {\r\n  right: 0;\r\n  left: auto;\r\n}\r\n.dropup .caret,\r\n.navbar-fixed-bottom .dropdown .caret {\r\n  border-top: 0;\r\n  border-bottom: 4px dashed;\r\n  border-bottom: 4px solid \\9;\r\n  content: \"\";\r\n}\r\n.dropup .dropdown-menu,\r\n.navbar-fixed-bottom .dropdown .dropdown-menu {\r\n  top: auto;\r\n  bottom: 100%;\r\n  margin-bottom: 2px;\r\n}\r\n@media (min-width: 768px) {\r\n  .navbar-right .dropdown-menu {\r\n    left: auto;\r\n    right: 0;\r\n  }\r\n  .navbar-right .dropdown-menu-left {\r\n    left: 0;\r\n    right: auto;\r\n  }\r\n}\r\n.btn-group,\r\n.btn-group-vertical {\r\n  position: relative;\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n}\r\n.btn-group > .btn,\r\n.btn-group-vertical > .btn {\r\n  position: relative;\r\n  float: left;\r\n}\r\n.btn-group > .btn:hover,\r\n.btn-group-vertical > .btn:hover,\r\n.btn-group > .btn:focus,\r\n.btn-group-vertical > .btn:focus,\r\n.btn-group > .btn:active,\r\n.btn-group-vertical > .btn:active,\r\n.btn-group > .btn.active,\r\n.btn-group-vertical > .btn.active {\r\n  z-index: 2;\r\n}\r\n.btn-group .btn + .btn,\r\n.btn-group .btn + .btn-group,\r\n.btn-group .btn-group + .btn,\r\n.btn-group .btn-group + .btn-group {\r\n  margin-left: -1px;\r\n}\r\n.btn-toolbar {\r\n  margin-left: -5px;\r\n}\r\n.btn-toolbar .btn,\r\n.btn-toolbar .btn-group,\r\n.btn-toolbar .input-group {\r\n  float: left;\r\n}\r\n.btn-toolbar > .btn,\r\n.btn-toolbar > .btn-group,\r\n.btn-toolbar > .input-group {\r\n  margin-left: 5px;\r\n}\r\n.btn-group > .btn:not(:first-child):not(:last-child):not(.dropdown-toggle) {\r\n  border-radius: 0;\r\n}\r\n.btn-group > .btn:first-child {\r\n  margin-left: 0;\r\n}\r\n.btn-group > .btn:first-child:not(:last-child):not(.dropdown-toggle) {\r\n  border-bottom-right-radius: 0;\r\n  border-top-right-radius: 0;\r\n}\r\n.btn-group > .btn:last-child:not(:first-child),\r\n.btn-group > .dropdown-toggle:not(:first-child) {\r\n  border-bottom-left-radius: 0;\r\n  border-top-left-radius: 0;\r\n}\r\n.btn-group > .btn-group {\r\n  float: left;\r\n}\r\n.btn-group > .btn-group:not(:first-child):not(:last-child) > .btn {\r\n  border-radius: 0;\r\n}\r\n.btn-group > .btn-group:first-child:not(:last-child) > .btn:last-child,\r\n.btn-group > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\r\n  border-bottom-right-radius: 0;\r\n  border-top-right-radius: 0;\r\n}\r\n.btn-group > .btn-group:last-child:not(:first-child) > .btn:first-child {\r\n  border-bottom-left-radius: 0;\r\n  border-top-left-radius: 0;\r\n}\r\n.btn-group .dropdown-toggle:active,\r\n.btn-group.open .dropdown-toggle {\r\n  outline: 0;\r\n}\r\n.btn-group > .btn + .dropdown-toggle {\r\n  padding-left: 8px;\r\n  padding-right: 8px;\r\n}\r\n.btn-group > .btn-lg + .dropdown-toggle {\r\n  padding-left: 12px;\r\n  padding-right: 12px;\r\n}\r\n.btn-group.open .dropdown-toggle {\r\n  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\r\n  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\r\n}\r\n.btn-group.open .dropdown-toggle.btn-link {\r\n  -webkit-box-shadow: none;\r\n  box-shadow: none;\r\n}\r\n.btn .caret {\r\n  margin-left: 0;\r\n}\r\n.btn-lg .caret {\r\n  border-width: 5px 5px 0;\r\n  border-bottom-width: 0;\r\n}\r\n.dropup .btn-lg .caret {\r\n  border-width: 0 5px 5px;\r\n}\r\n.btn-group-vertical > .btn,\r\n.btn-group-vertical > .btn-group,\r\n.btn-group-vertical > .btn-group > .btn {\r\n  display: block;\r\n  float: none;\r\n  width: 100%;\r\n  max-width: 100%;\r\n}\r\n.btn-group-vertical > .btn-group > .btn {\r\n  float: none;\r\n}\r\n.btn-group-vertical > .btn + .btn,\r\n.btn-group-vertical > .btn + .btn-group,\r\n.btn-group-vertical > .btn-group + .btn,\r\n.btn-group-vertical > .btn-group + .btn-group {\r\n  margin-top: -1px;\r\n  margin-left: 0;\r\n}\r\n.btn-group-vertical > .btn:not(:first-child):not(:last-child) {\r\n  border-radius: 0;\r\n}\r\n.btn-group-vertical > .btn:first-child:not(:last-child) {\r\n  border-top-right-radius: 4px;\r\n  border-top-left-radius: 4px;\r\n  border-bottom-right-radius: 0;\r\n  border-bottom-left-radius: 0;\r\n}\r\n.btn-group-vertical > .btn:last-child:not(:first-child) {\r\n  border-top-right-radius: 0;\r\n  border-top-left-radius: 0;\r\n  border-bottom-right-radius: 4px;\r\n  border-bottom-left-radius: 4px;\r\n}\r\n.btn-group-vertical > .btn-group:not(:first-child):not(:last-child) > .btn {\r\n  border-radius: 0;\r\n}\r\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .btn:last-child,\r\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\r\n  border-bottom-right-radius: 0;\r\n  border-bottom-left-radius: 0;\r\n}\r\n.btn-group-vertical > .btn-group:last-child:not(:first-child) > .btn:first-child {\r\n  border-top-right-radius: 0;\r\n  border-top-left-radius: 0;\r\n}\r\n.btn-group-justified {\r\n  display: table;\r\n  width: 100%;\r\n  table-layout: fixed;\r\n  border-collapse: separate;\r\n}\r\n.btn-group-justified > .btn,\r\n.btn-group-justified > .btn-group {\r\n  float: none;\r\n  display: table-cell;\r\n  width: 1%;\r\n}\r\n.btn-group-justified > .btn-group .btn {\r\n  width: 100%;\r\n}\r\n.btn-group-justified > .btn-group .dropdown-menu {\r\n  left: auto;\r\n}\r\n[data-toggle=\"buttons\"] > .btn input[type=\"radio\"],\r\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"radio\"],\r\n[data-toggle=\"buttons\"] > .btn input[type=\"checkbox\"],\r\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"checkbox\"] {\r\n  position: absolute;\r\n  clip: rect(0, 0, 0, 0);\r\n  pointer-events: none;\r\n}\r\n.input-group {\r\n  position: relative;\r\n  display: table;\r\n  border-collapse: separate;\r\n}\r\n.input-group[class*=\"col-\"] {\r\n  float: none;\r\n  padding-left: 0;\r\n  padding-right: 0;\r\n}\r\n.input-group .form-control {\r\n  position: relative;\r\n  z-index: 2;\r\n  float: left;\r\n  width: 100%;\r\n  margin-bottom: 0;\r\n}\r\n.input-group .form-control:focus {\r\n  z-index: 3;\r\n}\r\n.input-group-lg > .form-control,\r\n.input-group-lg > .input-group-addon,\r\n.input-group-lg > .input-group-btn > .btn {\r\n  height: 46px;\r\n  padding: 10px 16px;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  border-radius: 6px;\r\n}\r\nselect.input-group-lg > .form-control,\r\nselect.input-group-lg > .input-group-addon,\r\nselect.input-group-lg > .input-group-btn > .btn {\r\n  height: 46px;\r\n  line-height: 46px;\r\n}\r\ntextarea.input-group-lg > .form-control,\r\ntextarea.input-group-lg > .input-group-addon,\r\ntextarea.input-group-lg > .input-group-btn > .btn,\r\nselect[multiple].input-group-lg > .form-control,\r\nselect[multiple].input-group-lg > .input-group-addon,\r\nselect[multiple].input-group-lg > .input-group-btn > .btn {\r\n  height: auto;\r\n}\r\n.input-group-sm > .form-control,\r\n.input-group-sm > .input-group-addon,\r\n.input-group-sm > .input-group-btn > .btn {\r\n  height: 30px;\r\n  padding: 5px 10px;\r\n  font-size: 12px;\r\n  line-height: 1.5;\r\n  border-radius: 3px;\r\n}\r\nselect.input-group-sm > .form-control,\r\nselect.input-group-sm > .input-group-addon,\r\nselect.input-group-sm > .input-group-btn > .btn {\r\n  height: 30px;\r\n  line-height: 30px;\r\n}\r\ntextarea.input-group-sm > .form-control,\r\ntextarea.input-group-sm > .input-group-addon,\r\ntextarea.input-group-sm > .input-group-btn > .btn,\r\nselect[multiple].input-group-sm > .form-control,\r\nselect[multiple].input-group-sm > .input-group-addon,\r\nselect[multiple].input-group-sm > .input-group-btn > .btn {\r\n  height: auto;\r\n}\r\n.input-group-addon,\r\n.input-group-btn,\r\n.input-group .form-control {\r\n  display: table-cell;\r\n}\r\n.input-group-addon:not(:first-child):not(:last-child),\r\n.input-group-btn:not(:first-child):not(:last-child),\r\n.input-group .form-control:not(:first-child):not(:last-child) {\r\n  border-radius: 0;\r\n}\r\n.input-group-addon,\r\n.input-group-btn {\r\n  width: 1%;\r\n  white-space: nowrap;\r\n  vertical-align: middle;\r\n}\r\n.input-group-addon {\r\n  padding: 6px 12px;\r\n  font-size: 14px;\r\n  font-weight: normal;\r\n  line-height: 1;\r\n  color: #555555;\r\n  text-align: center;\r\n  background-color: #eeeeee;\r\n  border: 1px solid #cccccc;\r\n  border-radius: 4px;\r\n}\r\n.input-group-addon.input-sm {\r\n  padding: 5px 10px;\r\n  font-size: 12px;\r\n  border-radius: 3px;\r\n}\r\n.input-group-addon.input-lg {\r\n  padding: 10px 16px;\r\n  font-size: 18px;\r\n  border-radius: 6px;\r\n}\r\n.input-group-addon input[type=\"radio\"],\r\n.input-group-addon input[type=\"checkbox\"] {\r\n  margin-top: 0;\r\n}\r\n.input-group .form-control:first-child,\r\n.input-group-addon:first-child,\r\n.input-group-btn:first-child > .btn,\r\n.input-group-btn:first-child > .btn-group > .btn,\r\n.input-group-btn:first-child > .dropdown-toggle,\r\n.input-group-btn:last-child > .btn:not(:last-child):not(.dropdown-toggle),\r\n.input-group-btn:last-child > .btn-group:not(:last-child) > .btn {\r\n  border-bottom-right-radius: 0;\r\n  border-top-right-radius: 0;\r\n}\r\n.input-group-addon:first-child {\r\n  border-right: 0;\r\n}\r\n.input-group .form-control:last-child,\r\n.input-group-addon:last-child,\r\n.input-group-btn:last-child > .btn,\r\n.input-group-btn:last-child > .btn-group > .btn,\r\n.input-group-btn:last-child > .dropdown-toggle,\r\n.input-group-btn:first-child > .btn:not(:first-child),\r\n.input-group-btn:first-child > .btn-group:not(:first-child) > .btn {\r\n  border-bottom-left-radius: 0;\r\n  border-top-left-radius: 0;\r\n}\r\n.input-group-addon:last-child {\r\n  border-left: 0;\r\n}\r\n.input-group-btn {\r\n  position: relative;\r\n  font-size: 0;\r\n  white-space: nowrap;\r\n}\r\n.input-group-btn > .btn {\r\n  position: relative;\r\n}\r\n.input-group-btn > .btn + .btn {\r\n  margin-left: -1px;\r\n}\r\n.input-group-btn > .btn:hover,\r\n.input-group-btn > .btn:focus,\r\n.input-group-btn > .btn:active {\r\n  z-index: 2;\r\n}\r\n.input-group-btn:first-child > .btn,\r\n.input-group-btn:first-child > .btn-group {\r\n  margin-right: -1px;\r\n}\r\n.input-group-btn:last-child > .btn,\r\n.input-group-btn:last-child > .btn-group {\r\n  z-index: 2;\r\n  margin-left: -1px;\r\n}\r\n.nav {\r\n  margin-bottom: 0;\r\n  padding-left: 0;\r\n  list-style: none;\r\n}\r\n.nav > li {\r\n  position: relative;\r\n  display: block;\r\n}\r\n.nav > li > a {\r\n  position: relative;\r\n  display: block;\r\n  padding: 10px 15px;\r\n}\r\n.nav > li > a:hover,\r\n.nav > li > a:focus {\r\n  text-decoration: none;\r\n  background-color: #eeeeee;\r\n}\r\n.nav > li.disabled > a {\r\n  color: #777777;\r\n}\r\n.nav > li.disabled > a:hover,\r\n.nav > li.disabled > a:focus {\r\n  color: #777777;\r\n  text-decoration: none;\r\n  background-color: transparent;\r\n  cursor: not-allowed;\r\n}\r\n.nav .open > a,\r\n.nav .open > a:hover,\r\n.nav .open > a:focus {\r\n  background-color: #eeeeee;\r\n  border-color: #337ab7;\r\n}\r\n.nav .nav-divider {\r\n  height: 1px;\r\n  margin: 9px 0;\r\n  overflow: hidden;\r\n  background-color: #e5e5e5;\r\n}\r\n.nav > li > a > img {\r\n  max-width: none;\r\n}\r\n.nav-tabs {\r\n  border-bottom: 1px solid #dddddd;\r\n}\r\n.nav-tabs > li {\r\n  float: left;\r\n  margin-bottom: -1px;\r\n}\r\n.nav-tabs > li > a {\r\n  margin-right: 2px;\r\n  line-height: 1.42857143;\r\n  border: 1px solid transparent;\r\n  border-radius: 4px 4px 0 0;\r\n}\r\n.nav-tabs > li > a:hover {\r\n  border-color: #eeeeee #eeeeee #dddddd;\r\n}\r\n.nav-tabs > li.active > a,\r\n.nav-tabs > li.active > a:hover,\r\n.nav-tabs > li.active > a:focus {\r\n  color: #555555;\r\n  background-color: #ffffff;\r\n  border: 1px solid #dddddd;\r\n  border-bottom-color: transparent;\r\n  cursor: default;\r\n}\r\n.nav-tabs.nav-justified {\r\n  width: 100%;\r\n  border-bottom: 0;\r\n}\r\n.nav-tabs.nav-justified > li {\r\n  float: none;\r\n}\r\n.nav-tabs.nav-justified > li > a {\r\n  text-align: center;\r\n  margin-bottom: 5px;\r\n}\r\n.nav-tabs.nav-justified > .dropdown .dropdown-menu {\r\n  top: auto;\r\n  left: auto;\r\n}\r\n@media (min-width: 768px) {\r\n  .nav-tabs.nav-justified > li {\r\n    display: table-cell;\r\n    width: 1%;\r\n  }\r\n  .nav-tabs.nav-justified > li > a {\r\n    margin-bottom: 0;\r\n  }\r\n}\r\n.nav-tabs.nav-justified > li > a {\r\n  margin-right: 0;\r\n  border-radius: 4px;\r\n}\r\n.nav-tabs.nav-justified > .active > a,\r\n.nav-tabs.nav-justified > .active > a:hover,\r\n.nav-tabs.nav-justified > .active > a:focus {\r\n  border: 1px solid #dddddd;\r\n}\r\n@media (min-width: 768px) {\r\n  .nav-tabs.nav-justified > li > a {\r\n    border-bottom: 1px solid #dddddd;\r\n    border-radius: 4px 4px 0 0;\r\n  }\r\n  .nav-tabs.nav-justified > .active > a,\r\n  .nav-tabs.nav-justified > .active > a:hover,\r\n  .nav-tabs.nav-justified > .active > a:focus {\r\n    border-bottom-color: #ffffff;\r\n  }\r\n}\r\n.nav-pills > li {\r\n  float: left;\r\n}\r\n.nav-pills > li > a {\r\n  border-radius: 4px;\r\n}\r\n.nav-pills > li + li {\r\n  margin-left: 2px;\r\n}\r\n.nav-pills > li.active > a,\r\n.nav-pills > li.active > a:hover,\r\n.nav-pills > li.active > a:focus {\r\n  color: #ffffff;\r\n  background-color: #337ab7;\r\n}\r\n.nav-stacked > li {\r\n  float: none;\r\n}\r\n.nav-stacked > li + li {\r\n  margin-top: 2px;\r\n  margin-left: 0;\r\n}\r\n.nav-justified {\r\n  width: 100%;\r\n}\r\n.nav-justified > li {\r\n  float: none;\r\n}\r\n.nav-justified > li > a {\r\n  text-align: center;\r\n  margin-bottom: 5px;\r\n}\r\n.nav-justified > .dropdown .dropdown-menu {\r\n  top: auto;\r\n  left: auto;\r\n}\r\n@media (min-width: 768px) {\r\n  .nav-justified > li {\r\n    display: table-cell;\r\n    width: 1%;\r\n  }\r\n  .nav-justified > li > a {\r\n    margin-bottom: 0;\r\n  }\r\n}\r\n.nav-tabs-justified {\r\n  border-bottom: 0;\r\n}\r\n.nav-tabs-justified > li > a {\r\n  margin-right: 0;\r\n  border-radius: 4px;\r\n}\r\n.nav-tabs-justified > .active > a,\r\n.nav-tabs-justified > .active > a:hover,\r\n.nav-tabs-justified > .active > a:focus {\r\n  border: 1px solid #dddddd;\r\n}\r\n@media (min-width: 768px) {\r\n  .nav-tabs-justified > li > a {\r\n    border-bottom: 1px solid #dddddd;\r\n    border-radius: 4px 4px 0 0;\r\n  }\r\n  .nav-tabs-justified > .active > a,\r\n  .nav-tabs-justified > .active > a:hover,\r\n  .nav-tabs-justified > .active > a:focus {\r\n    border-bottom-color: #ffffff;\r\n  }\r\n}\r\n.tab-content > .tab-pane {\r\n  display: none;\r\n}\r\n.tab-content > .active {\r\n  display: block;\r\n}\r\n.nav-tabs .dropdown-menu {\r\n  margin-top: -1px;\r\n  border-top-right-radius: 0;\r\n  border-top-left-radius: 0;\r\n}\r\n.navbar {\r\n  position: relative;\r\n  min-height: 50px;\r\n  margin-bottom: 20px;\r\n  border: 1px solid transparent;\r\n}\r\n@media (min-width: 768px) {\r\n  .navbar {\r\n    border-radius: 4px;\r\n  }\r\n}\r\n@media (min-width: 768px) {\r\n  .navbar-header {\r\n    float: left;\r\n  }\r\n}\r\n.navbar-collapse {\r\n  overflow-x: visible;\r\n  padding-right: 15px;\r\n  padding-left: 15px;\r\n  border-top: 1px solid transparent;\r\n  -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);\r\n          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);\r\n  -webkit-overflow-scrolling: touch;\r\n}\r\n.navbar-collapse.in {\r\n  overflow-y: auto;\r\n}\r\n@media (min-width: 768px) {\r\n  .navbar-collapse {\r\n    width: auto;\r\n    border-top: 0;\r\n    -webkit-box-shadow: none;\r\n            box-shadow: none;\r\n  }\r\n  .navbar-collapse.collapse {\r\n    display: block !important;\r\n    height: auto !important;\r\n    padding-bottom: 0;\r\n    overflow: visible !important;\r\n  }\r\n  .navbar-collapse.in {\r\n    overflow-y: visible;\r\n  }\r\n  .navbar-fixed-top .navbar-collapse,\r\n  .navbar-static-top .navbar-collapse,\r\n  .navbar-fixed-bottom .navbar-collapse {\r\n    padding-left: 0;\r\n    padding-right: 0;\r\n  }\r\n}\r\n.navbar-fixed-top .navbar-collapse,\r\n.navbar-fixed-bottom .navbar-collapse {\r\n  max-height: 340px;\r\n}\r\n@media (max-device-width: 480px) and (orientation: landscape) {\r\n  .navbar-fixed-top .navbar-collapse,\r\n  .navbar-fixed-bottom .navbar-collapse {\r\n    max-height: 200px;\r\n  }\r\n}\r\n.container > .navbar-header,\r\n.container-fluid > .navbar-header,\r\n.container > .navbar-collapse,\r\n.container-fluid > .navbar-collapse {\r\n  margin-right: -15px;\r\n  margin-left: -15px;\r\n}\r\n@media (min-width: 768px) {\r\n  .container > .navbar-header,\r\n  .container-fluid > .navbar-header,\r\n  .container > .navbar-collapse,\r\n  .container-fluid > .navbar-collapse {\r\n    margin-right: 0;\r\n    margin-left: 0;\r\n  }\r\n}\r\n.navbar-static-top {\r\n  z-index: 1000;\r\n  border-width: 0 0 1px;\r\n}\r\n@media (min-width: 768px) {\r\n  .navbar-static-top {\r\n    border-radius: 0;\r\n  }\r\n}\r\n.navbar-fixed-top,\r\n.navbar-fixed-bottom {\r\n  position: fixed;\r\n  right: 0;\r\n  left: 0;\r\n  z-index: 1030;\r\n}\r\n@media (min-width: 768px) {\r\n  .navbar-fixed-top,\r\n  .navbar-fixed-bottom {\r\n    border-radius: 0;\r\n  }\r\n}\r\n.navbar-fixed-top {\r\n  top: 0;\r\n  border-width: 0 0 1px;\r\n}\r\n.navbar-fixed-bottom {\r\n  bottom: 0;\r\n  margin-bottom: 0;\r\n  border-width: 1px 0 0;\r\n}\r\n.navbar-brand {\r\n  float: left;\r\n  padding: 15px 15px;\r\n  font-size: 18px;\r\n  line-height: 20px;\r\n  height: 50px;\r\n}\r\n.navbar-brand:hover,\r\n.navbar-brand:focus {\r\n  text-decoration: none;\r\n}\r\n.navbar-brand > img {\r\n  display: block;\r\n}\r\n@media (min-width: 768px) {\r\n  .navbar > .container .navbar-brand,\r\n  .navbar > .container-fluid .navbar-brand {\r\n    margin-left: -15px;\r\n  }\r\n}\r\n.navbar-toggle {\r\n  position: relative;\r\n  float: right;\r\n  margin-right: 15px;\r\n  padding: 9px 10px;\r\n  margin-top: 8px;\r\n  margin-bottom: 8px;\r\n  background-color: transparent;\r\n  background-image: none;\r\n  border: 1px solid transparent;\r\n  border-radius: 4px;\r\n}\r\n.navbar-toggle:focus {\r\n  outline: 0;\r\n}\r\n.navbar-toggle .icon-bar {\r\n  display: block;\r\n  width: 22px;\r\n  height: 2px;\r\n  border-radius: 1px;\r\n}\r\n.navbar-toggle .icon-bar + .icon-bar {\r\n  margin-top: 4px;\r\n}\r\n@media (min-width: 768px) {\r\n  .navbar-toggle {\r\n    display: none;\r\n  }\r\n}\r\n.navbar-nav {\r\n  margin: 7.5px -15px;\r\n}\r\n.navbar-nav > li > a {\r\n  padding-top: 10px;\r\n  padding-bottom: 10px;\r\n  line-height: 20px;\r\n}\r\n@media (max-width: 767px) {\r\n  .navbar-nav .open .dropdown-menu {\r\n    position: static;\r\n    float: none;\r\n    width: auto;\r\n    margin-top: 0;\r\n    background-color: transparent;\r\n    border: 0;\r\n    -webkit-box-shadow: none;\r\n            box-shadow: none;\r\n  }\r\n  .navbar-nav .open .dropdown-menu > li > a,\r\n  .navbar-nav .open .dropdown-menu .dropdown-header {\r\n    padding: 5px 15px 5px 25px;\r\n  }\r\n  .navbar-nav .open .dropdown-menu > li > a {\r\n    line-height: 20px;\r\n  }\r\n  .navbar-nav .open .dropdown-menu > li > a:hover,\r\n  .navbar-nav .open .dropdown-menu > li > a:focus {\r\n    background-image: none;\r\n  }\r\n}\r\n@media (min-width: 768px) {\r\n  .navbar-nav {\r\n    float: left;\r\n    margin: 0;\r\n  }\r\n  .navbar-nav > li {\r\n    float: left;\r\n  }\r\n  .navbar-nav > li > a {\r\n    padding-top: 15px;\r\n    padding-bottom: 15px;\r\n  }\r\n}\r\n.navbar-form {\r\n  margin-left: -15px;\r\n  margin-right: -15px;\r\n  padding: 10px 15px;\r\n  border-top: 1px solid transparent;\r\n  border-bottom: 1px solid transparent;\r\n  -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1);\r\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1);\r\n  margin-top: 8px;\r\n  margin-bottom: 8px;\r\n}\r\n@media (min-width: 768px) {\r\n  .navbar-form .form-group {\r\n    display: inline-block;\r\n    margin-bottom: 0;\r\n    vertical-align: middle;\r\n  }\r\n  .navbar-form .form-control {\r\n    display: inline-block;\r\n    width: auto;\r\n    vertical-align: middle;\r\n  }\r\n  .navbar-form .form-control-static {\r\n    display: inline-block;\r\n  }\r\n  .navbar-form .input-group {\r\n    display: inline-table;\r\n    vertical-align: middle;\r\n  }\r\n  .navbar-form .input-group .input-group-addon,\r\n  .navbar-form .input-group .input-group-btn,\r\n  .navbar-form .input-group .form-control {\r\n    width: auto;\r\n  }\r\n  .navbar-form .input-group > .form-control {\r\n    width: 100%;\r\n  }\r\n  .navbar-form .control-label {\r\n    margin-bottom: 0;\r\n    vertical-align: middle;\r\n  }\r\n  .navbar-form .radio,\r\n  .navbar-form .checkbox {\r\n    display: inline-block;\r\n    margin-top: 0;\r\n    margin-bottom: 0;\r\n    vertical-align: middle;\r\n  }\r\n  .navbar-form .radio label,\r\n  .navbar-form .checkbox label {\r\n    padding-left: 0;\r\n  }\r\n  .navbar-form .radio input[type=\"radio\"],\r\n  .navbar-form .checkbox input[type=\"checkbox\"] {\r\n    position: relative;\r\n    margin-left: 0;\r\n  }\r\n  .navbar-form .has-feedback .form-control-feedback {\r\n    top: 0;\r\n  }\r\n}\r\n@media (max-width: 767px) {\r\n  .navbar-form .form-group {\r\n    margin-bottom: 5px;\r\n  }\r\n  .navbar-form .form-group:last-child {\r\n    margin-bottom: 0;\r\n  }\r\n}\r\n@media (min-width: 768px) {\r\n  .navbar-form {\r\n    width: auto;\r\n    border: 0;\r\n    margin-left: 0;\r\n    margin-right: 0;\r\n    padding-top: 0;\r\n    padding-bottom: 0;\r\n    -webkit-box-shadow: none;\r\n    box-shadow: none;\r\n  }\r\n}\r\n.navbar-nav > li > .dropdown-menu {\r\n  margin-top: 0;\r\n  border-top-right-radius: 0;\r\n  border-top-left-radius: 0;\r\n}\r\n.navbar-fixed-bottom .navbar-nav > li > .dropdown-menu {\r\n  margin-bottom: 0;\r\n  border-top-right-radius: 4px;\r\n  border-top-left-radius: 4px;\r\n  border-bottom-right-radius: 0;\r\n  border-bottom-left-radius: 0;\r\n}\r\n.navbar-btn {\r\n  margin-top: 8px;\r\n  margin-bottom: 8px;\r\n}\r\n.navbar-btn.btn-sm {\r\n  margin-top: 10px;\r\n  margin-bottom: 10px;\r\n}\r\n.navbar-btn.btn-xs {\r\n  margin-top: 14px;\r\n  margin-bottom: 14px;\r\n}\r\n.navbar-text {\r\n  margin-top: 15px;\r\n  margin-bottom: 15px;\r\n}\r\n@media (min-width: 768px) {\r\n  .navbar-text {\r\n    float: left;\r\n    margin-left: 15px;\r\n    margin-right: 15px;\r\n  }\r\n}\r\n@media (min-width: 768px) {\r\n  .navbar-left {\r\n    float: left !important;\r\n  }\r\n  .navbar-right {\r\n    float: right !important;\r\n    margin-right: -15px;\r\n  }\r\n  .navbar-right ~ .navbar-right {\r\n    margin-right: 0;\r\n  }\r\n}\r\n.navbar-default {\r\n  background-color: #f8f8f8;\r\n  border-color: #e7e7e7;\r\n}\r\n.navbar-default .navbar-brand {\r\n  color: #777777;\r\n}\r\n.navbar-default .navbar-brand:hover,\r\n.navbar-default .navbar-brand:focus {\r\n  color: #5e5e5e;\r\n  background-color: transparent;\r\n}\r\n.navbar-default .navbar-text {\r\n  color: #777777;\r\n}\r\n.navbar-default .navbar-nav > li > a {\r\n  color: #777777;\r\n}\r\n.navbar-default .navbar-nav > li > a:hover,\r\n.navbar-default .navbar-nav > li > a:focus {\r\n  color: #333333;\r\n  background-color: transparent;\r\n}\r\n.navbar-default .navbar-nav > .active > a,\r\n.navbar-default .navbar-nav > .active > a:hover,\r\n.navbar-default .navbar-nav > .active > a:focus {\r\n  color: #555555;\r\n  background-color: #e7e7e7;\r\n}\r\n.navbar-default .navbar-nav > .disabled > a,\r\n.navbar-default .navbar-nav > .disabled > a:hover,\r\n.navbar-default .navbar-nav > .disabled > a:focus {\r\n  color: #cccccc;\r\n  background-color: transparent;\r\n}\r\n.navbar-default .navbar-toggle {\r\n  border-color: #dddddd;\r\n}\r\n.navbar-default .navbar-toggle:hover,\r\n.navbar-default .navbar-toggle:focus {\r\n  background-color: #dddddd;\r\n}\r\n.navbar-default .navbar-toggle .icon-bar {\r\n  background-color: #888888;\r\n}\r\n.navbar-default .navbar-collapse,\r\n.navbar-default .navbar-form {\r\n  border-color: #e7e7e7;\r\n}\r\n.navbar-default .navbar-nav > .open > a,\r\n.navbar-default .navbar-nav > .open > a:hover,\r\n.navbar-default .navbar-nav > .open > a:focus {\r\n  background-color: #e7e7e7;\r\n  color: #555555;\r\n}\r\n@media (max-width: 767px) {\r\n  .navbar-default .navbar-nav .open .dropdown-menu > li > a {\r\n    color: #777777;\r\n  }\r\n  .navbar-default .navbar-nav .open .dropdown-menu > li > a:hover,\r\n  .navbar-default .navbar-nav .open .dropdown-menu > li > a:focus {\r\n    color: #333333;\r\n    background-color: transparent;\r\n  }\r\n  .navbar-default .navbar-nav .open .dropdown-menu > .active > a,\r\n  .navbar-default .navbar-nav .open .dropdown-menu > .active > a:hover,\r\n  .navbar-default .navbar-nav .open .dropdown-menu > .active > a:focus {\r\n    color: #555555;\r\n    background-color: #e7e7e7;\r\n  }\r\n  .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a,\r\n  .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a:hover,\r\n  .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a:focus {\r\n    color: #cccccc;\r\n    background-color: transparent;\r\n  }\r\n}\r\n.navbar-default .navbar-link {\r\n  color: #777777;\r\n}\r\n.navbar-default .navbar-link:hover {\r\n  color: #333333;\r\n}\r\n.navbar-default .btn-link {\r\n  color: #777777;\r\n}\r\n.navbar-default .btn-link:hover,\r\n.navbar-default .btn-link:focus {\r\n  color: #333333;\r\n}\r\n.navbar-default .btn-link[disabled]:hover,\r\nfieldset[disabled] .navbar-default .btn-link:hover,\r\n.navbar-default .btn-link[disabled]:focus,\r\nfieldset[disabled] .navbar-default .btn-link:focus {\r\n  color: #cccccc;\r\n}\r\n.navbar-inverse {\r\n  background-color: #222222;\r\n  border-color: #080808;\r\n}\r\n.navbar-inverse .navbar-brand {\r\n  color: #9d9d9d;\r\n}\r\n.navbar-inverse .navbar-brand:hover,\r\n.navbar-inverse .navbar-brand:focus {\r\n  color: #ffffff;\r\n  background-color: transparent;\r\n}\r\n.navbar-inverse .navbar-text {\r\n  color: #9d9d9d;\r\n}\r\n.navbar-inverse .navbar-nav > li > a {\r\n  color: #9d9d9d;\r\n}\r\n.navbar-inverse .navbar-nav > li > a:hover,\r\n.navbar-inverse .navbar-nav > li > a:focus {\r\n  color: #ffffff;\r\n  background-color: transparent;\r\n}\r\n.navbar-inverse .navbar-nav > .active > a,\r\n.navbar-inverse .navbar-nav > .active > a:hover,\r\n.navbar-inverse .navbar-nav > .active > a:focus {\r\n  color: #ffffff;\r\n  background-color: #080808;\r\n}\r\n.navbar-inverse .navbar-nav > .disabled > a,\r\n.navbar-inverse .navbar-nav > .disabled > a:hover,\r\n.navbar-inverse .navbar-nav > .disabled > a:focus {\r\n  color: #444444;\r\n  background-color: transparent;\r\n}\r\n.navbar-inverse .navbar-toggle {\r\n  border-color: #333333;\r\n}\r\n.navbar-inverse .navbar-toggle:hover,\r\n.navbar-inverse .navbar-toggle:focus {\r\n  background-color: #333333;\r\n}\r\n.navbar-inverse .navbar-toggle .icon-bar {\r\n  background-color: #ffffff;\r\n}\r\n.navbar-inverse .navbar-collapse,\r\n.navbar-inverse .navbar-form {\r\n  border-color: #101010;\r\n}\r\n.navbar-inverse .navbar-nav > .open > a,\r\n.navbar-inverse .navbar-nav > .open > a:hover,\r\n.navbar-inverse .navbar-nav > .open > a:focus {\r\n  background-color: #080808;\r\n  color: #ffffff;\r\n}\r\n@media (max-width: 767px) {\r\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .dropdown-header {\r\n    border-color: #080808;\r\n  }\r\n  .navbar-inverse .navbar-nav .open .dropdown-menu .divider {\r\n    background-color: #080808;\r\n  }\r\n  .navbar-inverse .navbar-nav .open .dropdown-menu > li > a {\r\n    color: #9d9d9d;\r\n  }\r\n  .navbar-inverse .navbar-nav .open .dropdown-menu > li > a:hover,\r\n  .navbar-inverse .navbar-nav .open .dropdown-menu > li > a:focus {\r\n    color: #ffffff;\r\n    background-color: transparent;\r\n  }\r\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a,\r\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a:hover,\r\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a:focus {\r\n    color: #ffffff;\r\n    background-color: #080808;\r\n  }\r\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a,\r\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a:hover,\r\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a:focus {\r\n    color: #444444;\r\n    background-color: transparent;\r\n  }\r\n}\r\n.navbar-inverse .navbar-link {\r\n  color: #9d9d9d;\r\n}\r\n.navbar-inverse .navbar-link:hover {\r\n  color: #ffffff;\r\n}\r\n.navbar-inverse .btn-link {\r\n  color: #9d9d9d;\r\n}\r\n.navbar-inverse .btn-link:hover,\r\n.navbar-inverse .btn-link:focus {\r\n  color: #ffffff;\r\n}\r\n.navbar-inverse .btn-link[disabled]:hover,\r\nfieldset[disabled] .navbar-inverse .btn-link:hover,\r\n.navbar-inverse .btn-link[disabled]:focus,\r\nfieldset[disabled] .navbar-inverse .btn-link:focus {\r\n  color: #444444;\r\n}\r\n.breadcrumb {\r\n  padding: 8px 15px;\r\n  margin-bottom: 20px;\r\n  list-style: none;\r\n  background-color: #f5f5f5;\r\n  border-radius: 4px;\r\n}\r\n.breadcrumb > li {\r\n  display: inline-block;\r\n}\r\n.breadcrumb > li + li:before {\r\n  content: \"/\\A0\";\r\n  padding: 0 5px;\r\n  color: #cccccc;\r\n}\r\n.breadcrumb > .active {\r\n  color: #777777;\r\n}\r\n.pagination {\r\n  display: inline-block;\r\n  padding-left: 0;\r\n  margin: 20px 0;\r\n  border-radius: 4px;\r\n}\r\n.pagination > li {\r\n  display: inline;\r\n}\r\n.pagination > li > a,\r\n.pagination > li > span {\r\n  position: relative;\r\n  float: left;\r\n  padding: 6px 12px;\r\n  line-height: 1.42857143;\r\n  text-decoration: none;\r\n  color: #337ab7;\r\n  background-color: #ffffff;\r\n  border: 1px solid #dddddd;\r\n  margin-left: -1px;\r\n}\r\n.pagination > li:first-child > a,\r\n.pagination > li:first-child > span {\r\n  margin-left: 0;\r\n  border-bottom-left-radius: 4px;\r\n  border-top-left-radius: 4px;\r\n}\r\n.pagination > li:last-child > a,\r\n.pagination > li:last-child > span {\r\n  border-bottom-right-radius: 4px;\r\n  border-top-right-radius: 4px;\r\n}\r\n.pagination > li > a:hover,\r\n.pagination > li > span:hover,\r\n.pagination > li > a:focus,\r\n.pagination > li > span:focus {\r\n  z-index: 2;\r\n  color: #23527c;\r\n  background-color: #eeeeee;\r\n  border-color: #dddddd;\r\n}\r\n.pagination > .active > a,\r\n.pagination > .active > span,\r\n.pagination > .active > a:hover,\r\n.pagination > .active > span:hover,\r\n.pagination > .active > a:focus,\r\n.pagination > .active > span:focus {\r\n  z-index: 3;\r\n  color: #ffffff;\r\n  background-color: #337ab7;\r\n  border-color: #337ab7;\r\n  cursor: default;\r\n}\r\n.pagination > .disabled > span,\r\n.pagination > .disabled > span:hover,\r\n.pagination > .disabled > span:focus,\r\n.pagination > .disabled > a,\r\n.pagination > .disabled > a:hover,\r\n.pagination > .disabled > a:focus {\r\n  color: #777777;\r\n  background-color: #ffffff;\r\n  border-color: #dddddd;\r\n  cursor: not-allowed;\r\n}\r\n.pagination-lg > li > a,\r\n.pagination-lg > li > span {\r\n  padding: 10px 16px;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n}\r\n.pagination-lg > li:first-child > a,\r\n.pagination-lg > li:first-child > span {\r\n  border-bottom-left-radius: 6px;\r\n  border-top-left-radius: 6px;\r\n}\r\n.pagination-lg > li:last-child > a,\r\n.pagination-lg > li:last-child > span {\r\n  border-bottom-right-radius: 6px;\r\n  border-top-right-radius: 6px;\r\n}\r\n.pagination-sm > li > a,\r\n.pagination-sm > li > span {\r\n  padding: 5px 10px;\r\n  font-size: 12px;\r\n  line-height: 1.5;\r\n}\r\n.pagination-sm > li:first-child > a,\r\n.pagination-sm > li:first-child > span {\r\n  border-bottom-left-radius: 3px;\r\n  border-top-left-radius: 3px;\r\n}\r\n.pagination-sm > li:last-child > a,\r\n.pagination-sm > li:last-child > span {\r\n  border-bottom-right-radius: 3px;\r\n  border-top-right-radius: 3px;\r\n}\r\n.pager {\r\n  padding-left: 0;\r\n  margin: 20px 0;\r\n  list-style: none;\r\n  text-align: center;\r\n}\r\n.pager li {\r\n  display: inline;\r\n}\r\n.pager li > a,\r\n.pager li > span {\r\n  display: inline-block;\r\n  padding: 5px 14px;\r\n  background-color: #ffffff;\r\n  border: 1px solid #dddddd;\r\n  border-radius: 15px;\r\n}\r\n.pager li > a:hover,\r\n.pager li > a:focus {\r\n  text-decoration: none;\r\n  background-color: #eeeeee;\r\n}\r\n.pager .next > a,\r\n.pager .next > span {\r\n  float: right;\r\n}\r\n.pager .previous > a,\r\n.pager .previous > span {\r\n  float: left;\r\n}\r\n.pager .disabled > a,\r\n.pager .disabled > a:hover,\r\n.pager .disabled > a:focus,\r\n.pager .disabled > span {\r\n  color: #777777;\r\n  background-color: #ffffff;\r\n  cursor: not-allowed;\r\n}\r\n.label {\r\n  display: inline;\r\n  padding: .2em .6em .3em;\r\n  font-size: 75%;\r\n  font-weight: bold;\r\n  line-height: 1;\r\n  color: #ffffff;\r\n  text-align: center;\r\n  white-space: nowrap;\r\n  vertical-align: baseline;\r\n  border-radius: .25em;\r\n}\r\na.label:hover,\r\na.label:focus {\r\n  color: #ffffff;\r\n  text-decoration: none;\r\n  cursor: pointer;\r\n}\r\n.label:empty {\r\n  display: none;\r\n}\r\n.btn .label {\r\n  position: relative;\r\n  top: -1px;\r\n}\r\n.label-default {\r\n  background-color: #777777;\r\n}\r\n.label-default[href]:hover,\r\n.label-default[href]:focus {\r\n  background-color: #5e5e5e;\r\n}\r\n.label-primary {\r\n  background-color: #337ab7;\r\n}\r\n.label-primary[href]:hover,\r\n.label-primary[href]:focus {\r\n  background-color: #286090;\r\n}\r\n.label-success {\r\n  background-color: #5cb85c;\r\n}\r\n.label-success[href]:hover,\r\n.label-success[href]:focus {\r\n  background-color: #449d44;\r\n}\r\n.label-info {\r\n  background-color: #5bc0de;\r\n}\r\n.label-info[href]:hover,\r\n.label-info[href]:focus {\r\n  background-color: #31b0d5;\r\n}\r\n.label-warning {\r\n  background-color: #f0ad4e;\r\n}\r\n.label-warning[href]:hover,\r\n.label-warning[href]:focus {\r\n  background-color: #ec971f;\r\n}\r\n.label-danger {\r\n  background-color: #d9534f;\r\n}\r\n.label-danger[href]:hover,\r\n.label-danger[href]:focus {\r\n  background-color: #c9302c;\r\n}\r\n.bs-callout {\r\n  padding: 20px;\r\n  margin: 20px 0;\r\n  border: 1px solid #eee;\r\n  border-left-width: 5px;\r\n  border-radius: 3px;\r\n  overflow: auto;\r\n}\r\n.bs-callout h4 {\r\n  margin-top: 0;\r\n  margin-bottom: 5px;\r\n}\r\n.bs-callout p:last-child {\r\n  margin-bottom: 0;\r\n}\r\n.bs-callout code {\r\n  border-radius: 3px;\r\n}\r\n.bs-callout+.bs-callout {\r\n  margin-top: -5px;\r\n}\r\n.bs-callout-default {\r\n  border-left-color: #777;\r\n}\r\n.bs-callout-default h4 {\r\n  color: #777;\r\n}\r\n.bs-callout-primary {\r\n  border-left-color: #428bca;\r\n}\r\n.bs-callout-primary h4 {\r\n  color: #428bca;\r\n}\r\n.bs-callout-success {\r\n  border-left-color: #5cb85c;\r\n}\r\n.bs-callout-success h4 {\r\n  color: #5cb85c;\r\n}\r\n.bs-callout-danger {\r\n  border-left-color: #d9534f;\r\n}\r\n.bs-callout-danger h4 {\r\n  color: #d9534f;\r\n}\r\n.bs-callout-warning {\r\n  border-left-color: #f0ad4e;\r\n}\r\n.bs-callout-warning h4 {\r\n  color: #f0ad4e;\r\n}\r\n.bs-callout-info {\r\n  border-left-color: #5bc0de;\r\n}\r\n.bs-callout-info h4 {\r\n  color: #5bc0de;\r\n}\r\n.badge {\r\n  display: inline-block;\r\n  min-width: 10px;\r\n  padding: 3px 7px;\r\n  font-size: 12px;\r\n  font-weight: bold;\r\n  color: #ffffff;\r\n  line-height: 1;\r\n  vertical-align: middle;\r\n  white-space: nowrap;\r\n  text-align: center;\r\n  background-color: #777777;\r\n  border-radius: 10px;\r\n}\r\n.badge:empty {\r\n  display: none;\r\n}\r\n.btn .badge {\r\n  position: relative;\r\n  top: -1px;\r\n}\r\n.btn-xs .badge,\r\n.btn-group-xs > .btn .badge {\r\n  top: 0;\r\n  padding: 1px 5px;\r\n}\r\na.badge:hover,\r\na.badge:focus {\r\n  color: #ffffff;\r\n  text-decoration: none;\r\n  cursor: pointer;\r\n}\r\n.list-group-item.active > .badge,\r\n.nav-pills > .active > a > .badge {\r\n  color: #337ab7;\r\n  background-color: #ffffff;\r\n}\r\n.list-group-item > .badge {\r\n  float: right;\r\n}\r\n.list-group-item > .badge + .badge {\r\n  margin-right: 5px;\r\n}\r\n.nav-pills > li > a > .badge {\r\n  margin-left: 3px;\r\n}\r\n.jumbotron {\r\n  padding-top: 30px;\r\n  padding-bottom: 30px;\r\n  margin-bottom: 30px;\r\n  color: inherit;\r\n  background-color: #eeeeee;\r\n}\r\n.jumbotron h1,\r\n.jumbotron .h1 {\r\n  color: inherit;\r\n}\r\n.jumbotron p {\r\n  margin-bottom: 15px;\r\n  font-size: 21px;\r\n  font-weight: 200;\r\n}\r\n.jumbotron > hr {\r\n  border-top-color: #d5d5d5;\r\n}\r\n.container .jumbotron,\r\n.container-fluid .jumbotron {\r\n  border-radius: 6px;\r\n  padding-left: 15px;\r\n  padding-right: 15px;\r\n}\r\n.jumbotron .container {\r\n  max-width: 100%;\r\n}\r\n@media screen and (min-width: 768px) {\r\n  .jumbotron {\r\n    padding-top: 48px;\r\n    padding-bottom: 48px;\r\n  }\r\n  .container .jumbotron,\r\n  .container-fluid .jumbotron {\r\n    padding-left: 60px;\r\n    padding-right: 60px;\r\n  }\r\n  .jumbotron h1,\r\n  .jumbotron .h1 {\r\n    font-size: 63px;\r\n  }\r\n}\r\n.thumbnail {\r\n  display: block;\r\n  padding: 4px;\r\n  margin-bottom: 20px;\r\n  line-height: 1.42857143;\r\n  background-color: #ffffff;\r\n  border: 1px solid #dddddd;\r\n  border-radius: 4px;\r\n  -webkit-transition: border 0.2s ease-in-out;\r\n  -o-transition: border 0.2s ease-in-out;\r\n  transition: border 0.2s ease-in-out;\r\n}\r\n.thumbnail > img,\r\n.thumbnail a > img {\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n}\r\na.thumbnail:hover,\r\na.thumbnail:focus,\r\na.thumbnail.active {\r\n  border-color: #337ab7;\r\n}\r\n.thumbnail .caption {\r\n  padding: 9px;\r\n  color: #333333;\r\n}\r\n.alert {\r\n  padding: 15px;\r\n  margin-bottom: 20px;\r\n  border: 1px solid transparent;\r\n  border-radius: 4px;\r\n}\r\n.alert h4 {\r\n  margin-top: 0;\r\n  color: inherit;\r\n}\r\n.alert .alert-link {\r\n  font-weight: bold;\r\n}\r\n.alert > p,\r\n.alert > ul {\r\n  margin-bottom: 0;\r\n}\r\n.alert > p + p {\r\n  margin-top: 5px;\r\n}\r\n.alert-dismissable,\r\n.alert-dismissible {\r\n  padding-right: 35px;\r\n}\r\n.alert-dismissable .close,\r\n.alert-dismissible .close {\r\n  position: relative;\r\n  top: -2px;\r\n  right: -21px;\r\n  color: inherit;\r\n}\r\n.alert-success {\r\n  background-color: #dff0d8;\r\n  border-color: #d6e9c6;\r\n  color: #3c763d;\r\n}\r\n.alert-success hr {\r\n  border-top-color: #c9e2b3;\r\n}\r\n.alert-success .alert-link {\r\n  color: #2b542c;\r\n}\r\n.alert-info {\r\n  background-color: #d9edf7;\r\n  border-color: #bce8f1;\r\n  color: #31708f;\r\n}\r\n.alert-info hr {\r\n  border-top-color: #a6e1ec;\r\n}\r\n.alert-info .alert-link {\r\n  color: #245269;\r\n}\r\n.alert-warning {\r\n  background-color: #fcf8e3;\r\n  border-color: #faebcc;\r\n  color: #8a6d3b;\r\n}\r\n.alert-warning hr {\r\n  border-top-color: #f7e1b5;\r\n}\r\n.alert-warning .alert-link {\r\n  color: #66512c;\r\n}\r\n.alert-danger {\r\n  background-color: #f2dede;\r\n  border-color: #ebccd1;\r\n  color: #a94442;\r\n}\r\n.alert-danger hr {\r\n  border-top-color: #e4b9c0;\r\n}\r\n.alert-danger .alert-link {\r\n  color: #843534;\r\n}\r\n@-webkit-keyframes progress-bar-stripes {\r\n  from {\r\n    background-position: 40px 0;\r\n  }\r\n  to {\r\n    background-position: 0 0;\r\n  }\r\n}\r\n@-o-keyframes progress-bar-stripes {\r\n  from {\r\n    background-position: 40px 0;\r\n  }\r\n  to {\r\n    background-position: 0 0;\r\n  }\r\n}\r\n@keyframes progress-bar-stripes {\r\n  from {\r\n    background-position: 40px 0;\r\n  }\r\n  to {\r\n    background-position: 0 0;\r\n  }\r\n}\r\n.progress {\r\n  overflow: hidden;\r\n  height: 20px;\r\n  margin-bottom: 20px;\r\n  background-color: #f5f5f5;\r\n  border-radius: 4px;\r\n  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);\r\n  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);\r\n}\r\n.progress-bar {\r\n  float: left;\r\n  width: 0%;\r\n  height: 100%;\r\n  font-size: 12px;\r\n  line-height: 20px;\r\n  color: #ffffff;\r\n  text-align: center;\r\n  background-color: #337ab7;\r\n  -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);\r\n  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);\r\n  -webkit-transition: width 0.6s ease;\r\n  -o-transition: width 0.6s ease;\r\n  transition: width 0.6s ease;\r\n}\r\n.progress-striped .progress-bar,\r\n.progress-bar-striped {\r\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\r\n  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\r\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\r\n  -webkit-background-size: 40px 40px;\r\n          background-size: 40px 40px;\r\n}\r\n.progress.active .progress-bar,\r\n.progress-bar.active {\r\n  -webkit-animation: progress-bar-stripes 2s linear infinite;\r\n  -o-animation: progress-bar-stripes 2s linear infinite;\r\n  animation: progress-bar-stripes 2s linear infinite;\r\n}\r\n.progress-bar-success {\r\n  background-color: #5cb85c;\r\n}\r\n.progress-striped .progress-bar-success {\r\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\r\n  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\r\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\r\n}\r\n.progress-bar-info {\r\n  background-color: #5bc0de;\r\n}\r\n.progress-striped .progress-bar-info {\r\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\r\n  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\r\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\r\n}\r\n.progress-bar-warning {\r\n  background-color: #f0ad4e;\r\n}\r\n.progress-striped .progress-bar-warning {\r\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\r\n  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\r\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\r\n}\r\n.progress-bar-danger {\r\n  background-color: #d9534f;\r\n}\r\n.progress-striped .progress-bar-danger {\r\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\r\n  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\r\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\r\n}\r\n.media {\r\n  margin-top: 15px;\r\n}\r\n.media:first-child {\r\n  margin-top: 0;\r\n}\r\n.media,\r\n.media-body {\r\n  zoom: 1;\r\n  overflow: hidden;\r\n}\r\n.media-body {\r\n  width: 10000px;\r\n}\r\n.media-object {\r\n  display: block;\r\n}\r\n.media-object.img-thumbnail {\r\n  max-width: none;\r\n}\r\n.media-right,\r\n.media > .pull-right {\r\n  padding-left: 10px;\r\n}\r\n.media-left,\r\n.media > .pull-left {\r\n  padding-right: 10px;\r\n}\r\n.media-left,\r\n.media-right,\r\n.media-body {\r\n  display: table-cell;\r\n  vertical-align: top;\r\n}\r\n.media-middle {\r\n  vertical-align: middle;\r\n}\r\n.media-bottom {\r\n  vertical-align: bottom;\r\n}\r\n.media-heading {\r\n  margin-top: 0;\r\n  margin-bottom: 5px;\r\n}\r\n.media-list {\r\n  padding-left: 0;\r\n  list-style: none;\r\n}\r\n.list-group {\r\n  margin-bottom: 20px;\r\n  padding-left: 0;\r\n}\r\n.list-group-item {\r\n  position: relative;\r\n  display: block;\r\n  padding: 10px 15px;\r\n  margin-bottom: -1px;\r\n  background-color: #ffffff;\r\n  border: 1px solid #dddddd;\r\n}\r\n.list-group-item:first-child {\r\n  border-top-right-radius: 4px;\r\n  border-top-left-radius: 4px;\r\n}\r\n.list-group-item:last-child {\r\n  margin-bottom: 0;\r\n  border-bottom-right-radius: 4px;\r\n  border-bottom-left-radius: 4px;\r\n}\r\na.list-group-item,\r\nbutton.list-group-item {\r\n  color: #555555;\r\n}\r\na.list-group-item .list-group-item-heading,\r\nbutton.list-group-item .list-group-item-heading {\r\n  color: #333333;\r\n}\r\na.list-group-item:hover,\r\nbutton.list-group-item:hover,\r\na.list-group-item:focus,\r\nbutton.list-group-item:focus {\r\n  text-decoration: none;\r\n  color: #555555;\r\n  background-color: #f5f5f5;\r\n}\r\nbutton.list-group-item {\r\n  width: 100%;\r\n  text-align: left;\r\n}\r\n.list-group-item.disabled,\r\n.list-group-item.disabled:hover,\r\n.list-group-item.disabled:focus {\r\n  background-color: #eeeeee;\r\n  color: #777777;\r\n  cursor: not-allowed;\r\n}\r\n.list-group-item.disabled .list-group-item-heading,\r\n.list-group-item.disabled:hover .list-group-item-heading,\r\n.list-group-item.disabled:focus .list-group-item-heading {\r\n  color: inherit;\r\n}\r\n.list-group-item.disabled .list-group-item-text,\r\n.list-group-item.disabled:hover .list-group-item-text,\r\n.list-group-item.disabled:focus .list-group-item-text {\r\n  color: #777777;\r\n}\r\n.list-group-item.active,\r\n.list-group-item.active:hover,\r\n.list-group-item.active:focus {\r\n  z-index: 2;\r\n  color: #ffffff;\r\n  background-color: #337ab7;\r\n  border-color: #337ab7;\r\n}\r\n.list-group-item.active .list-group-item-heading,\r\n.list-group-item.active:hover .list-group-item-heading,\r\n.list-group-item.active:focus .list-group-item-heading,\r\n.list-group-item.active .list-group-item-heading > small,\r\n.list-group-item.active:hover .list-group-item-heading > small,\r\n.list-group-item.active:focus .list-group-item-heading > small,\r\n.list-group-item.active .list-group-item-heading > .small,\r\n.list-group-item.active:hover .list-group-item-heading > .small,\r\n.list-group-item.active:focus .list-group-item-heading > .small {\r\n  color: inherit;\r\n}\r\n.list-group-item.active .list-group-item-text,\r\n.list-group-item.active:hover .list-group-item-text,\r\n.list-group-item.active:focus .list-group-item-text {\r\n  color: #c7ddef;\r\n}\r\n.list-group-item-success {\r\n  color: #3c763d;\r\n  background-color: #dff0d8;\r\n}\r\na.list-group-item-success,\r\nbutton.list-group-item-success {\r\n  color: #3c763d;\r\n}\r\na.list-group-item-success .list-group-item-heading,\r\nbutton.list-group-item-success .list-group-item-heading {\r\n  color: inherit;\r\n}\r\na.list-group-item-success:hover,\r\nbutton.list-group-item-success:hover,\r\na.list-group-item-success:focus,\r\nbutton.list-group-item-success:focus {\r\n  color: #3c763d;\r\n  background-color: #d0e9c6;\r\n}\r\na.list-group-item-success.active,\r\nbutton.list-group-item-success.active,\r\na.list-group-item-success.active:hover,\r\nbutton.list-group-item-success.active:hover,\r\na.list-group-item-success.active:focus,\r\nbutton.list-group-item-success.active:focus {\r\n  color: #fff;\r\n  background-color: #3c763d;\r\n  border-color: #3c763d;\r\n}\r\n.list-group-item-info {\r\n  color: #31708f;\r\n  background-color: #d9edf7;\r\n}\r\na.list-group-item-info,\r\nbutton.list-group-item-info {\r\n  color: #31708f;\r\n}\r\na.list-group-item-info .list-group-item-heading,\r\nbutton.list-group-item-info .list-group-item-heading {\r\n  color: inherit;\r\n}\r\na.list-group-item-info:hover,\r\nbutton.list-group-item-info:hover,\r\na.list-group-item-info:focus,\r\nbutton.list-group-item-info:focus {\r\n  color: #31708f;\r\n  background-color: #c4e3f3;\r\n}\r\na.list-group-item-info.active,\r\nbutton.list-group-item-info.active,\r\na.list-group-item-info.active:hover,\r\nbutton.list-group-item-info.active:hover,\r\na.list-group-item-info.active:focus,\r\nbutton.list-group-item-info.active:focus {\r\n  color: #fff;\r\n  background-color: #31708f;\r\n  border-color: #31708f;\r\n}\r\n.list-group-item-warning {\r\n  color: #8a6d3b;\r\n  background-color: #fcf8e3;\r\n}\r\na.list-group-item-warning,\r\nbutton.list-group-item-warning {\r\n  color: #8a6d3b;\r\n}\r\na.list-group-item-warning .list-group-item-heading,\r\nbutton.list-group-item-warning .list-group-item-heading {\r\n  color: inherit;\r\n}\r\na.list-group-item-warning:hover,\r\nbutton.list-group-item-warning:hover,\r\na.list-group-item-warning:focus,\r\nbutton.list-group-item-warning:focus {\r\n  color: #8a6d3b;\r\n  background-color: #faf2cc;\r\n}\r\na.list-group-item-warning.active,\r\nbutton.list-group-item-warning.active,\r\na.list-group-item-warning.active:hover,\r\nbutton.list-group-item-warning.active:hover,\r\na.list-group-item-warning.active:focus,\r\nbutton.list-group-item-warning.active:focus {\r\n  color: #fff;\r\n  background-color: #8a6d3b;\r\n  border-color: #8a6d3b;\r\n}\r\n.list-group-item-danger {\r\n  color: #a94442;\r\n  background-color: #f2dede;\r\n}\r\na.list-group-item-danger,\r\nbutton.list-group-item-danger {\r\n  color: #a94442;\r\n}\r\na.list-group-item-danger .list-group-item-heading,\r\nbutton.list-group-item-danger .list-group-item-heading {\r\n  color: inherit;\r\n}\r\na.list-group-item-danger:hover,\r\nbutton.list-group-item-danger:hover,\r\na.list-group-item-danger:focus,\r\nbutton.list-group-item-danger:focus {\r\n  color: #a94442;\r\n  background-color: #ebcccc;\r\n}\r\na.list-group-item-danger.active,\r\nbutton.list-group-item-danger.active,\r\na.list-group-item-danger.active:hover,\r\nbutton.list-group-item-danger.active:hover,\r\na.list-group-item-danger.active:focus,\r\nbutton.list-group-item-danger.active:focus {\r\n  color: #fff;\r\n  background-color: #a94442;\r\n  border-color: #a94442;\r\n}\r\n.list-group-item-heading {\r\n  margin-top: 0;\r\n  margin-bottom: 5px;\r\n}\r\n.list-group-item-text {\r\n  margin-bottom: 0;\r\n  line-height: 1.3;\r\n}\r\n.panel {\r\n  margin-bottom: 20px;\r\n  background-color: #ffffff;\r\n  border: 1px solid transparent;\r\n  border-radius: 4px;\r\n  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);\r\n  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);\r\n}\r\n.panel-body {\r\n  padding: 15px;\r\n}\r\n.panel-heading {\r\n  padding: 10px 15px;\r\n  border-bottom: 1px solid transparent;\r\n  border-top-right-radius: 3px;\r\n  border-top-left-radius: 3px;\r\n}\r\n.panel-heading > .dropdown .dropdown-toggle {\r\n  color: inherit;\r\n}\r\n.panel-title {\r\n  margin-top: 0;\r\n  margin-bottom: 0;\r\n  font-size: 16px;\r\n  color: inherit;\r\n}\r\n.panel-title > a,\r\n.panel-title > small,\r\n.panel-title > .small,\r\n.panel-title > small > a,\r\n.panel-title > .small > a {\r\n  color: inherit;\r\n}\r\n.panel-footer {\r\n  padding: 10px 15px;\r\n  background-color: #f5f5f5;\r\n  border-top: 1px solid #dddddd;\r\n  border-bottom-right-radius: 3px;\r\n  border-bottom-left-radius: 3px;\r\n}\r\n.panel > .list-group,\r\n.panel > .panel-collapse > .list-group {\r\n  margin-bottom: 0;\r\n}\r\n.panel > .list-group .list-group-item,\r\n.panel > .panel-collapse > .list-group .list-group-item {\r\n  border-width: 1px 0;\r\n  border-radius: 0;\r\n}\r\n.panel > .list-group:first-child .list-group-item:first-child,\r\n.panel > .panel-collapse > .list-group:first-child .list-group-item:first-child {\r\n  border-top: 0;\r\n  border-top-right-radius: 3px;\r\n  border-top-left-radius: 3px;\r\n}\r\n.panel > .list-group:last-child .list-group-item:last-child,\r\n.panel > .panel-collapse > .list-group:last-child .list-group-item:last-child {\r\n  border-bottom: 0;\r\n  border-bottom-right-radius: 3px;\r\n  border-bottom-left-radius: 3px;\r\n}\r\n.panel > .panel-heading + .panel-collapse > .list-group .list-group-item:first-child {\r\n  border-top-right-radius: 0;\r\n  border-top-left-radius: 0;\r\n}\r\n.panel-heading + .list-group .list-group-item:first-child {\r\n  border-top-width: 0;\r\n}\r\n.list-group + .panel-footer {\r\n  border-top-width: 0;\r\n}\r\n.panel > .table,\r\n.panel > .table-responsive > .table,\r\n.panel > .panel-collapse > .table {\r\n  margin-bottom: 0;\r\n}\r\n.panel > .table caption,\r\n.panel > .table-responsive > .table caption,\r\n.panel > .panel-collapse > .table caption {\r\n  padding-left: 15px;\r\n  padding-right: 15px;\r\n}\r\n.panel > .table:first-child,\r\n.panel > .table-responsive:first-child > .table:first-child {\r\n  border-top-right-radius: 3px;\r\n  border-top-left-radius: 3px;\r\n}\r\n.panel > .table:first-child > thead:first-child > tr:first-child,\r\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child,\r\n.panel > .table:first-child > tbody:first-child > tr:first-child,\r\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child {\r\n  border-top-left-radius: 3px;\r\n  border-top-right-radius: 3px;\r\n}\r\n.panel > .table:first-child > thead:first-child > tr:first-child td:first-child,\r\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child td:first-child,\r\n.panel > .table:first-child > tbody:first-child > tr:first-child td:first-child,\r\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child td:first-child,\r\n.panel > .table:first-child > thead:first-child > tr:first-child th:first-child,\r\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child th:first-child,\r\n.panel > .table:first-child > tbody:first-child > tr:first-child th:first-child,\r\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child th:first-child {\r\n  border-top-left-radius: 3px;\r\n}\r\n.panel > .table:first-child > thead:first-child > tr:first-child td:last-child,\r\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child td:last-child,\r\n.panel > .table:first-child > tbody:first-child > tr:first-child td:last-child,\r\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child td:last-child,\r\n.panel > .table:first-child > thead:first-child > tr:first-child th:last-child,\r\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child th:last-child,\r\n.panel > .table:first-child > tbody:first-child > tr:first-child th:last-child,\r\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child th:last-child {\r\n  border-top-right-radius: 3px;\r\n}\r\n.panel > .table:last-child,\r\n.panel > .table-responsive:last-child > .table:last-child {\r\n  border-bottom-right-radius: 3px;\r\n  border-bottom-left-radius: 3px;\r\n}\r\n.panel > .table:last-child > tbody:last-child > tr:last-child,\r\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child,\r\n.panel > .table:last-child > tfoot:last-child > tr:last-child,\r\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child {\r\n  border-bottom-left-radius: 3px;\r\n  border-bottom-right-radius: 3px;\r\n}\r\n.panel > .table:last-child > tbody:last-child > tr:last-child td:first-child,\r\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child td:first-child,\r\n.panel > .table:last-child > tfoot:last-child > tr:last-child td:first-child,\r\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child td:first-child,\r\n.panel > .table:last-child > tbody:last-child > tr:last-child th:first-child,\r\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child th:first-child,\r\n.panel > .table:last-child > tfoot:last-child > tr:last-child th:first-child,\r\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child th:first-child {\r\n  border-bottom-left-radius: 3px;\r\n}\r\n.panel > .table:last-child > tbody:last-child > tr:last-child td:last-child,\r\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child td:last-child,\r\n.panel > .table:last-child > tfoot:last-child > tr:last-child td:last-child,\r\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child td:last-child,\r\n.panel > .table:last-child > tbody:last-child > tr:last-child th:last-child,\r\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child th:last-child,\r\n.panel > .table:last-child > tfoot:last-child > tr:last-child th:last-child,\r\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child th:last-child {\r\n  border-bottom-right-radius: 3px;\r\n}\r\n.panel > .panel-body + .table,\r\n.panel > .panel-body + .table-responsive,\r\n.panel > .table + .panel-body,\r\n.panel > .table-responsive + .panel-body {\r\n  border-top: 1px solid #dddddd;\r\n}\r\n.panel > .table > tbody:first-child > tr:first-child th,\r\n.panel > .table > tbody:first-child > tr:first-child td {\r\n  border-top: 0;\r\n}\r\n.panel > .table-bordered,\r\n.panel > .table-responsive > .table-bordered {\r\n  border: 0;\r\n}\r\n.panel > .table-bordered > thead > tr > th:first-child,\r\n.panel > .table-responsive > .table-bordered > thead > tr > th:first-child,\r\n.panel > .table-bordered > tbody > tr > th:first-child,\r\n.panel > .table-responsive > .table-bordered > tbody > tr > th:first-child,\r\n.panel > .table-bordered > tfoot > tr > th:first-child,\r\n.panel > .table-responsive > .table-bordered > tfoot > tr > th:first-child,\r\n.panel > .table-bordered > thead > tr > td:first-child,\r\n.panel > .table-responsive > .table-bordered > thead > tr > td:first-child,\r\n.panel > .table-bordered > tbody > tr > td:first-child,\r\n.panel > .table-responsive > .table-bordered > tbody > tr > td:first-child,\r\n.panel > .table-bordered > tfoot > tr > td:first-child,\r\n.panel > .table-responsive > .table-bordered > tfoot > tr > td:first-child {\r\n  border-left: 0;\r\n}\r\n.panel > .table-bordered > thead > tr > th:last-child,\r\n.panel > .table-responsive > .table-bordered > thead > tr > th:last-child,\r\n.panel > .table-bordered > tbody > tr > th:last-child,\r\n.panel > .table-responsive > .table-bordered > tbody > tr > th:last-child,\r\n.panel > .table-bordered > tfoot > tr > th:last-child,\r\n.panel > .table-responsive > .table-bordered > tfoot > tr > th:last-child,\r\n.panel > .table-bordered > thead > tr > td:last-child,\r\n.panel > .table-responsive > .table-bordered > thead > tr > td:last-child,\r\n.panel > .table-bordered > tbody > tr > td:last-child,\r\n.panel > .table-responsive > .table-bordered > tbody > tr > td:last-child,\r\n.panel > .table-bordered > tfoot > tr > td:last-child,\r\n.panel > .table-responsive > .table-bordered > tfoot > tr > td:last-child {\r\n  border-right: 0;\r\n}\r\n.panel > .table-bordered > thead > tr:first-child > td,\r\n.panel > .table-responsive > .table-bordered > thead > tr:first-child > td,\r\n.panel > .table-bordered > tbody > tr:first-child > td,\r\n.panel > .table-responsive > .table-bordered > tbody > tr:first-child > td,\r\n.panel > .table-bordered > thead > tr:first-child > th,\r\n.panel > .table-responsive > .table-bordered > thead > tr:first-child > th,\r\n.panel > .table-bordered > tbody > tr:first-child > th,\r\n.panel > .table-responsive > .table-bordered > tbody > tr:first-child > th {\r\n  border-bottom: 0;\r\n}\r\n.panel > .table-bordered > tbody > tr:last-child > td,\r\n.panel > .table-responsive > .table-bordered > tbody > tr:last-child > td,\r\n.panel > .table-bordered > tfoot > tr:last-child > td,\r\n.panel > .table-responsive > .table-bordered > tfoot > tr:last-child > td,\r\n.panel > .table-bordered > tbody > tr:last-child > th,\r\n.panel > .table-responsive > .table-bordered > tbody > tr:last-child > th,\r\n.panel > .table-bordered > tfoot > tr:last-child > th,\r\n.panel > .table-responsive > .table-bordered > tfoot > tr:last-child > th {\r\n  border-bottom: 0;\r\n}\r\n.panel > .table-responsive {\r\n  border: 0;\r\n  margin-bottom: 0;\r\n}\r\n.panel-group {\r\n  margin-bottom: 20px;\r\n}\r\n.panel-group .panel {\r\n  margin-bottom: 0;\r\n  border-radius: 4px;\r\n}\r\n.panel-group .panel + .panel {\r\n  margin-top: 5px;\r\n}\r\n.panel-group .panel-heading {\r\n  border-bottom: 0;\r\n}\r\n.panel-group .panel-heading + .panel-collapse > .panel-body,\r\n.panel-group .panel-heading + .panel-collapse > .list-group {\r\n  border-top: 1px solid #dddddd;\r\n}\r\n.panel-group .panel-footer {\r\n  border-top: 0;\r\n}\r\n.panel-group .panel-footer + .panel-collapse .panel-body {\r\n  border-bottom: 1px solid #dddddd;\r\n}\r\n.panel-default {\r\n  border-color: #dddddd;\r\n}\r\n.panel-default > .panel-heading {\r\n  color: #333333;\r\n  background-color: #f5f5f5;\r\n  border-color: #dddddd;\r\n}\r\n.panel-default > .panel-heading + .panel-collapse > .panel-body {\r\n  border-top-color: #dddddd;\r\n}\r\n.panel-default > .panel-heading .badge {\r\n  color: #f5f5f5;\r\n  background-color: #333333;\r\n}\r\n.panel-default > .panel-footer + .panel-collapse > .panel-body {\r\n  border-bottom-color: #dddddd;\r\n}\r\n.panel-primary {\r\n  border-color: #337ab7;\r\n}\r\n.panel-primary > .panel-heading {\r\n  color: #ffffff;\r\n  background-color: #337ab7;\r\n  border-color: #337ab7;\r\n}\r\n.panel-primary > .panel-heading + .panel-collapse > .panel-body {\r\n  border-top-color: #337ab7;\r\n}\r\n.panel-primary > .panel-heading .badge {\r\n  color: #337ab7;\r\n  background-color: #ffffff;\r\n}\r\n.panel-primary > .panel-footer + .panel-collapse > .panel-body {\r\n  border-bottom-color: #337ab7;\r\n}\r\n.panel-success {\r\n  border-color: #d6e9c6;\r\n}\r\n.panel-success > .panel-heading {\r\n  color: #3c763d;\r\n  background-color: #dff0d8;\r\n  border-color: #d6e9c6;\r\n}\r\n.panel-success > .panel-heading + .panel-collapse > .panel-body {\r\n  border-top-color: #d6e9c6;\r\n}\r\n.panel-success > .panel-heading .badge {\r\n  color: #dff0d8;\r\n  background-color: #3c763d;\r\n}\r\n.panel-success > .panel-footer + .panel-collapse > .panel-body {\r\n  border-bottom-color: #d6e9c6;\r\n}\r\n.panel-info {\r\n  border-color: #bce8f1;\r\n}\r\n.panel-info > .panel-heading {\r\n  color: #31708f;\r\n  background-color: #d9edf7;\r\n  border-color: #bce8f1;\r\n}\r\n.panel-info > .panel-heading + .panel-collapse > .panel-body {\r\n  border-top-color: #bce8f1;\r\n}\r\n.panel-info > .panel-heading .badge {\r\n  color: #d9edf7;\r\n  background-color: #31708f;\r\n}\r\n.panel-info > .panel-footer + .panel-collapse > .panel-body {\r\n  border-bottom-color: #bce8f1;\r\n}\r\n.panel-warning {\r\n  border-color: #faebcc;\r\n}\r\n.panel-warning > .panel-heading {\r\n  color: #8a6d3b;\r\n  background-color: #fcf8e3;\r\n  border-color: #faebcc;\r\n}\r\n.panel-warning > .panel-heading + .panel-collapse > .panel-body {\r\n  border-top-color: #faebcc;\r\n}\r\n.panel-warning > .panel-heading .badge {\r\n  color: #fcf8e3;\r\n  background-color: #8a6d3b;\r\n}\r\n.panel-warning > .panel-footer + .panel-collapse > .panel-body {\r\n  border-bottom-color: #faebcc;\r\n}\r\n.panel-danger {\r\n  border-color: #ebccd1;\r\n}\r\n.panel-danger > .panel-heading {\r\n  color: #a94442;\r\n  background-color: #f2dede;\r\n  border-color: #ebccd1;\r\n}\r\n.panel-danger > .panel-heading + .panel-collapse > .panel-body {\r\n  border-top-color: #ebccd1;\r\n}\r\n.panel-danger > .panel-heading .badge {\r\n  color: #f2dede;\r\n  background-color: #a94442;\r\n}\r\n.panel-danger > .panel-footer + .panel-collapse > .panel-body {\r\n  border-bottom-color: #ebccd1;\r\n}\r\n.embed-responsive {\r\n  position: relative;\r\n  display: block;\r\n  height: 0;\r\n  padding: 0;\r\n  overflow: hidden;\r\n}\r\n.embed-responsive .embed-responsive-item,\r\n.embed-responsive iframe,\r\n.embed-responsive embed,\r\n.embed-responsive object,\r\n.embed-responsive video {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  bottom: 0;\r\n  height: 100%;\r\n  width: 100%;\r\n  border: 0;\r\n}\r\n.embed-responsive-16by9 {\r\n  padding-bottom: 56.25%;\r\n}\r\n.embed-responsive-4by3 {\r\n  padding-bottom: 75%;\r\n}\r\n.well {\r\n  min-height: 20px;\r\n  padding: 19px;\r\n  margin-bottom: 20px;\r\n  background-color: #f5f5f5;\r\n  border: 1px solid #e3e3e3;\r\n  border-radius: 4px;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);\r\n}\r\n.well blockquote {\r\n  border-color: #ddd;\r\n  border-color: rgba(0, 0, 0, 0.15);\r\n}\r\n.well-lg {\r\n  padding: 24px;\r\n  border-radius: 6px;\r\n}\r\n.well-sm {\r\n  padding: 9px;\r\n  border-radius: 3px;\r\n}\r\n.close {\r\n  float: right;\r\n  font-size: 21px;\r\n  font-weight: bold;\r\n  line-height: 1;\r\n  color: #000000;\r\n  text-shadow: 0 1px 0 #ffffff;\r\n  opacity: 0.2;\r\n  filter: alpha(opacity=20);\r\n}\r\n.close:hover,\r\n.close:focus {\r\n  color: #000000;\r\n  text-decoration: none;\r\n  cursor: pointer;\r\n  opacity: 0.5;\r\n  filter: alpha(opacity=50);\r\n}\r\nbutton.close {\r\n  padding: 0;\r\n  cursor: pointer;\r\n  background: transparent;\r\n  border: 0;\r\n  -webkit-appearance: none;\r\n}\r\n.modal-open {\r\n  overflow: hidden;\r\n}\r\n.modal {\r\n  display: none;\r\n  overflow: hidden;\r\n  position: fixed;\r\n  top: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  z-index: 1050;\r\n  -webkit-overflow-scrolling: touch;\r\n  outline: 0;\r\n}\r\n.modal.fade .modal-dialog {\r\n  -webkit-transform: translate(0, -25%);\r\n  -ms-transform: translate(0, -25%);\r\n  -o-transform: translate(0, -25%);\r\n  transform: translate(0, -25%);\r\n  -webkit-transition: -webkit-transform 0.3s ease-out;\r\n  -o-transition: -o-transform 0.3s ease-out;\r\n  transition: transform 0.3s ease-out;\r\n}\r\n.modal.in .modal-dialog {\r\n  -webkit-transform: translate(0, 0);\r\n  -ms-transform: translate(0, 0);\r\n  -o-transform: translate(0, 0);\r\n  transform: translate(0, 0);\r\n}\r\n.modal-open .modal {\r\n  overflow-x: hidden;\r\n  overflow-y: auto;\r\n}\r\n.modal-dialog {\r\n  position: relative;\r\n  width: auto;\r\n  margin: 10px;\r\n}\r\n.modal-content {\r\n  position: relative;\r\n  background-color: #ffffff;\r\n  border: 1px solid #999999;\r\n  border: 1px solid rgba(0, 0, 0, 0.2);\r\n  border-radius: 6px;\r\n  -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);\r\n  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);\r\n  -webkit-background-clip: padding-box;\r\n          background-clip: padding-box;\r\n  outline: 0;\r\n}\r\n.modal-backdrop {\r\n  position: fixed;\r\n  top: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  z-index: 1040;\r\n  background-color: #000000;\r\n}\r\n.modal-backdrop.fade {\r\n  opacity: 0;\r\n  filter: alpha(opacity=0);\r\n}\r\n.modal-backdrop.in {\r\n  opacity: 0.5;\r\n  filter: alpha(opacity=50);\r\n}\r\n.modal-header {\r\n  padding: 15px;\r\n  border-bottom: 1px solid #e5e5e5;\r\n}\r\n.modal-header .close {\r\n  margin-top: -2px;\r\n}\r\n.modal-title {\r\n  margin: 0;\r\n  line-height: 1.42857143;\r\n}\r\n.modal-body {\r\n  position: relative;\r\n  padding: 15px;\r\n}\r\n.modal-footer {\r\n  padding: 15px;\r\n  text-align: right;\r\n  border-top: 1px solid #e5e5e5;\r\n}\r\n.modal-footer .btn + .btn {\r\n  margin-left: 5px;\r\n  margin-bottom: 0;\r\n}\r\n.modal-footer .btn-group .btn + .btn {\r\n  margin-left: -1px;\r\n}\r\n.modal-footer .btn-block + .btn-block {\r\n  margin-left: 0;\r\n}\r\n.modal-scrollbar-measure {\r\n  position: absolute;\r\n  top: -9999px;\r\n  width: 50px;\r\n  height: 50px;\r\n  overflow: scroll;\r\n}\r\n@media (min-width: 768px) {\r\n  .modal-dialog {\r\n    width: 600px;\r\n    margin: 30px auto;\r\n  }\r\n  .modal-content {\r\n    -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);\r\n    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);\r\n  }\r\n  .modal-sm {\r\n    width: 300px;\r\n  }\r\n}\r\n@media (min-width: 992px) {\r\n  .modal-lg {\r\n    width: 900px;\r\n  }\r\n}\r\n.tooltip {\r\n  position: absolute;\r\n  z-index: 1070;\r\n  display: block;\r\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\r\n  font-style: normal;\r\n  font-weight: normal;\r\n  letter-spacing: normal;\r\n  line-break: auto;\r\n  line-height: 1.42857143;\r\n  text-align: left;\r\n  text-align: start;\r\n  text-decoration: none;\r\n  text-shadow: none;\r\n  text-transform: none;\r\n  white-space: normal;\r\n  word-break: normal;\r\n  word-spacing: normal;\r\n  word-wrap: normal;\r\n  font-size: 12px;\r\n  opacity: 0;\r\n  filter: alpha(opacity=0);\r\n}\r\n.tooltip.in {\r\n  opacity: 0.9;\r\n  filter: alpha(opacity=90);\r\n}\r\n.tooltip.top {\r\n  margin-top: -3px;\r\n  padding: 5px 0;\r\n}\r\n.tooltip.right {\r\n  margin-left: 3px;\r\n  padding: 0 5px;\r\n}\r\n.tooltip.bottom {\r\n  margin-top: 3px;\r\n  padding: 5px 0;\r\n}\r\n.tooltip.left {\r\n  margin-left: -3px;\r\n  padding: 0 5px;\r\n}\r\n.tooltip-inner {\r\n  max-width: 200px;\r\n  padding: 3px 8px;\r\n  color: #ffffff;\r\n  text-align: center;\r\n  background-color: #000000;\r\n  border-radius: 4px;\r\n}\r\n.tooltip-arrow {\r\n  position: absolute;\r\n  width: 0;\r\n  height: 0;\r\n  border-color: transparent;\r\n  border-style: solid;\r\n}\r\n.tooltip.top .tooltip-arrow {\r\n  bottom: 0;\r\n  left: 50%;\r\n  margin-left: -5px;\r\n  border-width: 5px 5px 0;\r\n  border-top-color: #000000;\r\n}\r\n.tooltip.top-left .tooltip-arrow {\r\n  bottom: 0;\r\n  right: 5px;\r\n  margin-bottom: -5px;\r\n  border-width: 5px 5px 0;\r\n  border-top-color: #000000;\r\n}\r\n.tooltip.top-right .tooltip-arrow {\r\n  bottom: 0;\r\n  left: 5px;\r\n  margin-bottom: -5px;\r\n  border-width: 5px 5px 0;\r\n  border-top-color: #000000;\r\n}\r\n.tooltip.right .tooltip-arrow {\r\n  top: 50%;\r\n  left: 0;\r\n  margin-top: -5px;\r\n  border-width: 5px 5px 5px 0;\r\n  border-right-color: #000000;\r\n}\r\n.tooltip.left .tooltip-arrow {\r\n  top: 50%;\r\n  right: 0;\r\n  margin-top: -5px;\r\n  border-width: 5px 0 5px 5px;\r\n  border-left-color: #000000;\r\n}\r\n.tooltip.bottom .tooltip-arrow {\r\n  top: 0;\r\n  left: 50%;\r\n  margin-left: -5px;\r\n  border-width: 0 5px 5px;\r\n  border-bottom-color: #000000;\r\n}\r\n.tooltip.bottom-left .tooltip-arrow {\r\n  top: 0;\r\n  right: 5px;\r\n  margin-top: -5px;\r\n  border-width: 0 5px 5px;\r\n  border-bottom-color: #000000;\r\n}\r\n.tooltip.bottom-right .tooltip-arrow {\r\n  top: 0;\r\n  left: 5px;\r\n  margin-top: -5px;\r\n  border-width: 0 5px 5px;\r\n  border-bottom-color: #000000;\r\n}\r\n.popover {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  z-index: 1060;\r\n  display: none;\r\n  max-width: 276px;\r\n  padding: 1px;\r\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\r\n  font-style: normal;\r\n  font-weight: normal;\r\n  letter-spacing: normal;\r\n  line-break: auto;\r\n  line-height: 1.42857143;\r\n  text-align: left;\r\n  text-align: start;\r\n  text-decoration: none;\r\n  text-shadow: none;\r\n  text-transform: none;\r\n  white-space: normal;\r\n  word-break: normal;\r\n  word-spacing: normal;\r\n  word-wrap: normal;\r\n  font-size: 14px;\r\n  background-color: #ffffff;\r\n  -webkit-background-clip: padding-box;\r\n          background-clip: padding-box;\r\n  border: 1px solid #cccccc;\r\n  border: 1px solid rgba(0, 0, 0, 0.2);\r\n  border-radius: 6px;\r\n  -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);\r\n  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);\r\n}\r\n.popover.top {\r\n  margin-top: -10px;\r\n}\r\n.popover.right {\r\n  margin-left: 10px;\r\n}\r\n.popover.bottom {\r\n  margin-top: 10px;\r\n}\r\n.popover.left {\r\n  margin-left: -10px;\r\n}\r\n.popover-title {\r\n  margin: 0;\r\n  padding: 8px 14px;\r\n  font-size: 14px;\r\n  background-color: #f7f7f7;\r\n  border-bottom: 1px solid #ebebeb;\r\n  border-radius: 5px 5px 0 0;\r\n}\r\n.popover-content {\r\n  padding: 9px 14px;\r\n}\r\n.popover > .arrow,\r\n.popover > .arrow:after {\r\n  position: absolute;\r\n  display: block;\r\n  width: 0;\r\n  height: 0;\r\n  border-color: transparent;\r\n  border-style: solid;\r\n}\r\n.popover > .arrow {\r\n  border-width: 11px;\r\n}\r\n.popover > .arrow:after {\r\n  border-width: 10px;\r\n  content: \"\";\r\n}\r\n.popover.top > .arrow {\r\n  left: 50%;\r\n  margin-left: -11px;\r\n  border-bottom-width: 0;\r\n  border-top-color: #999999;\r\n  border-top-color: rgba(0, 0, 0, 0.25);\r\n  bottom: -11px;\r\n}\r\n.popover.top > .arrow:after {\r\n  content: \" \";\r\n  bottom: 1px;\r\n  margin-left: -10px;\r\n  border-bottom-width: 0;\r\n  border-top-color: #ffffff;\r\n}\r\n.popover.right > .arrow {\r\n  top: 50%;\r\n  left: -11px;\r\n  margin-top: -11px;\r\n  border-left-width: 0;\r\n  border-right-color: #999999;\r\n  border-right-color: rgba(0, 0, 0, 0.25);\r\n}\r\n.popover.right > .arrow:after {\r\n  content: \" \";\r\n  left: 1px;\r\n  bottom: -10px;\r\n  border-left-width: 0;\r\n  border-right-color: #ffffff;\r\n}\r\n.popover.bottom > .arrow {\r\n  left: 50%;\r\n  margin-left: -11px;\r\n  border-top-width: 0;\r\n  border-bottom-color: #999999;\r\n  border-bottom-color: rgba(0, 0, 0, 0.25);\r\n  top: -11px;\r\n}\r\n.popover.bottom > .arrow:after {\r\n  content: \" \";\r\n  top: 1px;\r\n  margin-left: -10px;\r\n  border-top-width: 0;\r\n  border-bottom-color: #ffffff;\r\n}\r\n.popover.left > .arrow {\r\n  top: 50%;\r\n  right: -11px;\r\n  margin-top: -11px;\r\n  border-right-width: 0;\r\n  border-left-color: #999999;\r\n  border-left-color: rgba(0, 0, 0, 0.25);\r\n}\r\n.popover.left > .arrow:after {\r\n  content: \" \";\r\n  right: 1px;\r\n  border-right-width: 0;\r\n  border-left-color: #ffffff;\r\n  bottom: -10px;\r\n}\r\n.carousel {\r\n  position: relative;\r\n}\r\n.carousel-inner {\r\n  position: relative;\r\n  overflow: hidden;\r\n  width: 100%;\r\n}\r\n.carousel-inner > .item {\r\n  display: none;\r\n  position: relative;\r\n  -webkit-transition: 0.6s ease-in-out left;\r\n  -o-transition: 0.6s ease-in-out left;\r\n  transition: 0.6s ease-in-out left;\r\n}\r\n.carousel-inner > .item > img,\r\n.carousel-inner > .item > a > img {\r\n  line-height: 1;\r\n}\r\n@media all and (transform-3d), (-webkit-transform-3d) {\r\n  .carousel-inner > .item {\r\n    -webkit-transition: -webkit-transform 0.6s ease-in-out;\r\n    -o-transition: -o-transform 0.6s ease-in-out;\r\n    transition: transform 0.6s ease-in-out;\r\n    -webkit-backface-visibility: hidden;\r\n    backface-visibility: hidden;\r\n    -webkit-perspective: 1000px;\r\n    perspective: 1000px;\r\n  }\r\n  .carousel-inner > .item.next,\r\n  .carousel-inner > .item.active.right {\r\n    -webkit-transform: translate3d(100%, 0, 0);\r\n    transform: translate3d(100%, 0, 0);\r\n    left: 0;\r\n  }\r\n  .carousel-inner > .item.prev,\r\n  .carousel-inner > .item.active.left {\r\n    -webkit-transform: translate3d(-100%, 0, 0);\r\n    transform: translate3d(-100%, 0, 0);\r\n    left: 0;\r\n  }\r\n  .carousel-inner > .item.next.left,\r\n  .carousel-inner > .item.prev.right,\r\n  .carousel-inner > .item.active {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n    left: 0;\r\n  }\r\n}\r\n.carousel-inner > .active,\r\n.carousel-inner > .next,\r\n.carousel-inner > .prev {\r\n  display: block;\r\n}\r\n.carousel-inner > .active {\r\n  left: 0;\r\n}\r\n.carousel-inner > .next,\r\n.carousel-inner > .prev {\r\n  position: absolute;\r\n  top: 0;\r\n  width: 100%;\r\n}\r\n.carousel-inner > .next {\r\n  left: 100%;\r\n}\r\n.carousel-inner > .prev {\r\n  left: -100%;\r\n}\r\n.carousel-inner > .next.left,\r\n.carousel-inner > .prev.right {\r\n  left: 0;\r\n}\r\n.carousel-inner > .active.left {\r\n  left: -100%;\r\n}\r\n.carousel-inner > .active.right {\r\n  left: 100%;\r\n}\r\n.carousel-control {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  bottom: 0;\r\n  width: 15%;\r\n  opacity: 0.5;\r\n  filter: alpha(opacity=50);\r\n  font-size: 20px;\r\n  color: #ffffff;\r\n  text-align: center;\r\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);\r\n  background-color: rgba(0, 0, 0, 0);\r\n}\r\n.carousel-control.left {\r\n  background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);\r\n  background-image: -o-linear-gradient(left, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);\r\n  background-image: -webkit-gradient(linear, left top, right top, from(rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0.0001)));\r\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);\r\n  background-repeat: repeat-x;\r\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#80000000', endColorstr='#00000000', GradientType=1);\r\n}\r\n.carousel-control.right {\r\n  left: auto;\r\n  right: 0;\r\n  background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);\r\n  background-image: -o-linear-gradient(left, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);\r\n  background-image: -webkit-gradient(linear, left top, right top, from(rgba(0, 0, 0, 0.0001)), to(rgba(0, 0, 0, 0.5)));\r\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);\r\n  background-repeat: repeat-x;\r\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#80000000', GradientType=1);\r\n}\r\n.carousel-control:hover,\r\n.carousel-control:focus {\r\n  outline: 0;\r\n  color: #ffffff;\r\n  text-decoration: none;\r\n  opacity: 0.9;\r\n  filter: alpha(opacity=90);\r\n}\r\n.carousel-control .icon-prev,\r\n.carousel-control .icon-next,\r\n.carousel-control .glyphicon-chevron-left,\r\n.carousel-control .glyphicon-chevron-right {\r\n  position: absolute;\r\n  top: 50%;\r\n  margin-top: -10px;\r\n  z-index: 5;\r\n  display: inline-block;\r\n}\r\n.carousel-control .icon-prev,\r\n.carousel-control .glyphicon-chevron-left {\r\n  left: 50%;\r\n  margin-left: -10px;\r\n}\r\n.carousel-control .icon-next,\r\n.carousel-control .glyphicon-chevron-right {\r\n  right: 50%;\r\n  margin-right: -10px;\r\n}\r\n.carousel-control .icon-prev,\r\n.carousel-control .icon-next {\r\n  width: 20px;\r\n  height: 20px;\r\n  line-height: 1;\r\n  font-family: serif;\r\n}\r\n.carousel-control .icon-prev:before {\r\n  content: '\\2039';\r\n}\r\n.carousel-control .icon-next:before {\r\n  content: '\\203A';\r\n}\r\n.carousel-indicators {\r\n  position: absolute;\r\n  bottom: 10px;\r\n  left: 50%;\r\n  z-index: 15;\r\n  width: 60%;\r\n  margin-left: -30%;\r\n  padding-left: 0;\r\n  list-style: none;\r\n  text-align: center;\r\n}\r\n.carousel-indicators li {\r\n  display: inline-block;\r\n  width: 10px;\r\n  height: 10px;\r\n  margin: 1px;\r\n  text-indent: -999px;\r\n  border: 1px solid #ffffff;\r\n  border-radius: 10px;\r\n  cursor: pointer;\r\n  background-color: #000 \\9;\r\n  background-color: rgba(0, 0, 0, 0);\r\n}\r\n.carousel-indicators .active {\r\n  margin: 0;\r\n  width: 12px;\r\n  height: 12px;\r\n  background-color: #ffffff;\r\n}\r\n.carousel-caption {\r\n  position: absolute;\r\n  left: 15%;\r\n  right: 15%;\r\n  bottom: 20px;\r\n  z-index: 10;\r\n  padding-top: 20px;\r\n  padding-bottom: 20px;\r\n  color: #ffffff;\r\n  text-align: center;\r\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);\r\n}\r\n.carousel-caption .btn {\r\n  text-shadow: none;\r\n}\r\n@media screen and (min-width: 768px) {\r\n  .carousel-control .glyphicon-chevron-left,\r\n  .carousel-control .glyphicon-chevron-right,\r\n  .carousel-control .icon-prev,\r\n  .carousel-control .icon-next {\r\n    width: 30px;\r\n    height: 30px;\r\n    margin-top: -10px;\r\n    font-size: 30px;\r\n  }\r\n  .carousel-control .glyphicon-chevron-left,\r\n  .carousel-control .icon-prev {\r\n    margin-left: -10px;\r\n  }\r\n  .carousel-control .glyphicon-chevron-right,\r\n  .carousel-control .icon-next {\r\n    margin-right: -10px;\r\n  }\r\n  .carousel-caption {\r\n    left: 20%;\r\n    right: 20%;\r\n    padding-bottom: 30px;\r\n  }\r\n  .carousel-indicators {\r\n    bottom: 20px;\r\n  }\r\n}\r\n.clearfix:before,\r\n.clearfix:after,\r\n.dl-horizontal dd:before,\r\n.dl-horizontal dd:after,\r\n.container:before,\r\n.container:after,\r\n.container-fluid:before,\r\n.container-fluid:after,\r\n.row:before,\r\n.row:after,\r\n.form-horizontal .form-group:before,\r\n.form-horizontal .form-group:after,\r\n.btn-toolbar:before,\r\n.btn-toolbar:after,\r\n.btn-group-vertical > .btn-group:before,\r\n.btn-group-vertical > .btn-group:after,\r\n.nav:before,\r\n.nav:after,\r\n.navbar:before,\r\n.navbar:after,\r\n.navbar-header:before,\r\n.navbar-header:after,\r\n.navbar-collapse:before,\r\n.navbar-collapse:after,\r\n.pager:before,\r\n.pager:after,\r\n.panel-body:before,\r\n.panel-body:after,\r\n.modal-header:before,\r\n.modal-header:after,\r\n.modal-footer:before,\r\n.modal-footer:after {\r\n  content: \" \";\r\n  display: table;\r\n}\r\n.clearfix:after,\r\n.dl-horizontal dd:after,\r\n.container:after,\r\n.container-fluid:after,\r\n.row:after,\r\n.form-horizontal .form-group:after,\r\n.btn-toolbar:after,\r\n.btn-group-vertical > .btn-group:after,\r\n.nav:after,\r\n.navbar:after,\r\n.navbar-header:after,\r\n.navbar-collapse:after,\r\n.pager:after,\r\n.panel-body:after,\r\n.modal-header:after,\r\n.modal-footer:after {\r\n  clear: both;\r\n}\r\n.center-block {\r\n  display: block;\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n}\r\n.pull-right {\r\n  float: right !important;\r\n}\r\n.pull-left {\r\n  float: left !important;\r\n}\r\n.hide {\r\n  display: none !important;\r\n}\r\n.show {\r\n  display: block !important;\r\n}\r\n.invisible {\r\n  visibility: hidden;\r\n}\r\n.text-hide {\r\n  font: 0/0 a;\r\n  color: transparent;\r\n  text-shadow: none;\r\n  background-color: transparent;\r\n  border: 0;\r\n}\r\n.hidden {\r\n  display: none !important;\r\n}\r\n.affix {\r\n  position: fixed;\r\n}\r\n@-ms-viewport {\r\n  width: device-width;\r\n}\r\n.visible-xs,\r\n.visible-sm,\r\n.visible-md,\r\n.visible-lg {\r\n  display: none !important;\r\n}\r\n.visible-xs-block,\r\n.visible-xs-inline,\r\n.visible-xs-inline-block,\r\n.visible-sm-block,\r\n.visible-sm-inline,\r\n.visible-sm-inline-block,\r\n.visible-md-block,\r\n.visible-md-inline,\r\n.visible-md-inline-block,\r\n.visible-lg-block,\r\n.visible-lg-inline,\r\n.visible-lg-inline-block {\r\n  display: none !important;\r\n}\r\n@media (max-width: 767px) {\r\n  .visible-xs {\r\n    display: block !important;\r\n  }\r\n  table.visible-xs {\r\n    display: table !important;\r\n  }\r\n  tr.visible-xs {\r\n    display: table-row !important;\r\n  }\r\n  th.visible-xs,\r\n  td.visible-xs {\r\n    display: table-cell !important;\r\n  }\r\n}\r\n@media (max-width: 767px) {\r\n  .visible-xs-block {\r\n    display: block !important;\r\n  }\r\n}\r\n@media (max-width: 767px) {\r\n  .visible-xs-inline {\r\n    display: inline !important;\r\n  }\r\n}\r\n@media (max-width: 767px) {\r\n  .visible-xs-inline-block {\r\n    display: inline-block !important;\r\n  }\r\n}\r\n@media (min-width: 768px) and (max-width: 991px) {\r\n  .visible-sm {\r\n    display: block !important;\r\n  }\r\n  table.visible-sm {\r\n    display: table !important;\r\n  }\r\n  tr.visible-sm {\r\n    display: table-row !important;\r\n  }\r\n  th.visible-sm,\r\n  td.visible-sm {\r\n    display: table-cell !important;\r\n  }\r\n}\r\n@media (min-width: 768px) and (max-width: 991px) {\r\n  .visible-sm-block {\r\n    display: block !important;\r\n  }\r\n}\r\n@media (min-width: 768px) and (max-width: 991px) {\r\n  .visible-sm-inline {\r\n    display: inline !important;\r\n  }\r\n}\r\n@media (min-width: 768px) and (max-width: 991px) {\r\n  .visible-sm-inline-block {\r\n    display: inline-block !important;\r\n  }\r\n}\r\n@media (min-width: 992px) and (max-width: 1199px) {\r\n  .visible-md {\r\n    display: block !important;\r\n  }\r\n  table.visible-md {\r\n    display: table !important;\r\n  }\r\n  tr.visible-md {\r\n    display: table-row !important;\r\n  }\r\n  th.visible-md,\r\n  td.visible-md {\r\n    display: table-cell !important;\r\n  }\r\n}\r\n@media (min-width: 992px) and (max-width: 1199px) {\r\n  .visible-md-block {\r\n    display: block !important;\r\n  }\r\n}\r\n@media (min-width: 992px) and (max-width: 1199px) {\r\n  .visible-md-inline {\r\n    display: inline !important;\r\n  }\r\n}\r\n@media (min-width: 992px) and (max-width: 1199px) {\r\n  .visible-md-inline-block {\r\n    display: inline-block !important;\r\n  }\r\n}\r\n@media (min-width: 1200px) {\r\n  .visible-lg {\r\n    display: block !important;\r\n  }\r\n  table.visible-lg {\r\n    display: table !important;\r\n  }\r\n  tr.visible-lg {\r\n    display: table-row !important;\r\n  }\r\n  th.visible-lg,\r\n  td.visible-lg {\r\n    display: table-cell !important;\r\n  }\r\n}\r\n@media (min-width: 1200px) {\r\n  .visible-lg-block {\r\n    display: block !important;\r\n  }\r\n}\r\n@media (min-width: 1200px) {\r\n  .visible-lg-inline {\r\n    display: inline !important;\r\n  }\r\n}\r\n@media (min-width: 1200px) {\r\n  .visible-lg-inline-block {\r\n    display: inline-block !important;\r\n  }\r\n}\r\n@media (max-width: 767px) {\r\n  .hidden-xs {\r\n    display: none !important;\r\n  }\r\n}\r\n@media (min-width: 768px) and (max-width: 991px) {\r\n  .hidden-sm {\r\n    display: none !important;\r\n  }\r\n}\r\n@media (min-width: 992px) and (max-width: 1199px) {\r\n  .hidden-md {\r\n    display: none !important;\r\n  }\r\n}\r\n@media (min-width: 1200px) {\r\n  .hidden-lg {\r\n    display: none !important;\r\n  }\r\n}\r\n.visible-print {\r\n  display: none !important;\r\n}\r\n@media print {\r\n  .visible-print {\r\n    display: block !important;\r\n  }\r\n  table.visible-print {\r\n    display: table !important;\r\n  }\r\n  tr.visible-print {\r\n    display: table-row !important;\r\n  }\r\n  th.visible-print,\r\n  td.visible-print {\r\n    display: table-cell !important;\r\n  }\r\n}\r\n.visible-print-block {\r\n  display: none !important;\r\n}\r\n@media print {\r\n  .visible-print-block {\r\n    display: block !important;\r\n  }\r\n}\r\n.visible-print-inline {\r\n  display: none !important;\r\n}\r\n@media print {\r\n  .visible-print-inline {\r\n    display: inline !important;\r\n  }\r\n}\r\n.visible-print-inline-block {\r\n  display: none !important;\r\n}\r\n@media print {\r\n  .visible-print-inline-block {\r\n    display: inline-block !important;\r\n  }\r\n}\r\n@media print {\r\n  .hidden-print {\r\n    display: none !important;\r\n  }\r\n}\r\n", ""]);

// exports


/***/ }),
/* 15 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(0),
    __webpack_require__(1),
    __webpack_require__(17),
    __webpack_require__(18),
    __webpack_require__(2),
], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, Backbone, MainTemplate, FileCompareView) {

return Backbone.View.extend({
    className: "bs-callout bs-callout-primary flexBlock flexWrap",
    template: _.template(MainTemplate),

    initialize: function() {
        Backbone.on("triggerCompareView", this.triggerCompare, this);
    },

    render: function() {
        this.$el.html(this.template({}));

        this.setModels();

        return this;
    },

    setModels: function() {
        this.model1 = this.model;
        this.model2 = this.model;

        this.fileCompareView1 = new FileCompareView({model: this.model1});
        this.fileCompareView2 = new FileCompareView({model: this.model2});
    },

    destroy: function () {
        this.undelegateEvents();
        this.$el.removeData().unbind();
    },
    
    triggerCompare: function(fileObj) {
      this.model1.set('name', fileObj.fileUploadView1.file.name);
      this.$("#loadCompareViews").append(this.fileCompareView1.render().$el);

      this.model2.set('name', fileObj.fileUploadView2.file.name);
      this.$("#loadCompareViews").append(this.fileCompareView2.render().$el);

      console.log(fileObj);
    }

  });

}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = "<h1 class=col-md-12>Comparision result</h1>\r\n<div class=col-md-12 id=loadCompareViews></div>\r\n<div class=col-md-12>\r\n    <button class=\"btn btn-default blockCenter\" id=report>Unmatched report</button>\r\n</div>";

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(0),
    __webpack_require__(1),
    __webpack_require__(19),
    __webpack_require__(4)
], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, Backbone, fileCompareTemplate, Papa) {

  return Backbone.View.extend({
    className: "col-md-6",
    template: _.template(fileCompareTemplate),

    initialize: function() {},

    render: function() {
      this.$el.html(this.template({
        'name': this.model.get("name") ? this.model.get("name") : ''
      }));

      return this;
    }

  });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = "<p>Total Records: <%= name %></p>\r\n<p>Maching Records: </p>\r\n<p>Unmached Records </p>";

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(21);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./styles.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./styles.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(undefined);
// imports


// module
exports.push([module.i, "body {\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n\tline-height: 1.5em;\r\n\tfont-size: 12px;\r\n}\r\n\t\t\r\na:link, a:visited { color: #FF9900; text-decoration: none; font-weight: normal; } \r\na:active, a:hover { color: #FFFF66; text-decoration: underline; }\r\n\r\np { margin: 0px; padding: 0px; }\r\n\r\nimg { margin: 0px; padding: 0px; border: none; }\r\n\r\n.cleaner { clear: both; width: 100%; height: 0px; font-size: 0px;  }\r\n\r\n.cleaner_h10 { clear: both; width:100%; height: 10px; }\r\n.cleaner_h20 { clear: both; width:100%; height: 20px; }\r\n.cleaner_h30 { clear: both; width:100%; height: 30px; }\r\n\r\n.m_right { margin-right: 30px; }\r\n\r\nh1 {\r\n\tmargin: 0px;\r\n\tpadding: 21px 0;\r\n\tfont-size: 30px;\r\n\tfont-weight: bold;\r\n}\r\n\r\nh2 {\r\n\tmargin: 0 0 20px 0;\r\n\tpadding: 2px 0 20px 0;\r\n\tfont-size: 26px;\r\n\tfont-weight: normal;\r\n}\r\n\r\nh3 {\r\n\tmargin: 0px;\r\n\tpadding: 0px;\r\n\tfont-size: 18px;\r\n}\r\n\r\nh4 {\r\n\tdisplay: block;\r\n\tmargin: 0;\r\n\tpadding: 10px 0px;\r\n\twidth: 280px;\r\n\theight: 21px;\r\n\tfont-size: 18px;\r\n\tfont-weight: normal;\r\n\ttext-align: center;\r\n\tletter-spacing: 2px;\r\n}\r\n\r\n.flexBlock {\r\n    display: flex;\r\n}\r\n\r\n.flexAlignEnd {\r\n    align-self: flex-end;\r\n}\r\n\r\n.flexWrap {\r\n    flex-wrap: wrap;\r\n}\r\n\r\n.blockCenter {\r\n\tdisplay: block;\r\n\tmargin: 0 auto;\r\n}", ""]);

// exports


/***/ })
/******/ ]);