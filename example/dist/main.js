/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../dist/index.js":
/*!************************!*\
  !*** ../dist/index.js ***!
  \************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n(function (global, factory) {\n  ( false ? 0 : _typeof(exports)) === 'object' && \"object\" !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :\n\t\t__WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : (0);\n})(this, function () {\n  'use strict';\n\n  var AlpineToast = function () {\n    function AlpineToast(toastContainer, onShowClasses, onHideClasses, delayRemoval, duration) {\n      if (toastContainer === void 0) {\n        toastContainer = document.createElement(\"div\");\n      }\n\n      if (onShowClasses === void 0) {\n        onShowClasses = \"\";\n      }\n\n      if (onHideClasses === void 0) {\n        onHideClasses = \"\";\n      }\n\n      if (delayRemoval === void 0) {\n        delayRemoval = 1000;\n      }\n\n      if (duration === void 0) {\n        duration = 5000;\n      }\n\n      this.onShowClasses = onShowClasses;\n      this.onHideClasses = onHideClasses;\n      this.delayRemoval = delayRemoval;\n      this.duration = duration;\n      this.container = toastContainer;\n      document.body.appendChild(this.container);\n    }\n\n    AlpineToast.prototype.getToasts = function () {\n      return document.querySelectorAll(\"[x-toast]\");\n    };\n\n    AlpineToast.prototype.makeToasts = function () {\n      var toasts = this.getToasts();\n      toasts.forEach(this.makeToast);\n    };\n\n    AlpineToast.prototype.makeToast = function (elem) {\n      var _this = this;\n\n      var duration = this.duration;\n      var update_timer = setInterval(function () {\n        if (!elem.matches(\":hover\")) {\n          duration = duration - 100;\n        }\n\n        if (duration <= 0) {\n          clearInterval(update_timer);\n          elem.classList.toggle(_this.onHideClasses);\n          setTimeout(function () {\n            return elem.remove();\n          }, _this.delayRemoval);\n        }\n      }, 100);\n      setTimeout(function () {\n        elem.classList.toggle(_this.onShowClasses);\n      }, 1000);\n      this.container.appendChild(elem);\n    };\n\n    return AlpineToast;\n  }();\n\n  return AlpineToast;\n});\n\n//# sourceURL=webpack://alpine-toast-example/../dist/index.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dist_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dist/index */ \"../dist/index.js\");\n/* harmony import */ var _dist_index__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_dist_index__WEBPACK_IMPORTED_MODULE_0__);\n\nvar toaster = new (_dist_index__WEBPACK_IMPORTED_MODULE_0___default())();\nconsole.info(toaster); // Wait until the DOM loads then convert to toasts\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  toaster.makeToasts();\n});\n\n//# sourceURL=webpack://alpine-toast-example/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;