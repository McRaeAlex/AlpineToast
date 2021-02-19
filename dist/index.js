'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var JSON5 = require('json5');

function maybeParseClasses(maybeString) {
    if (typeof maybeString === 'string' && maybeString.length > 0) {
        return maybeString.split(' ');
    }
    return undefined;
}

/**
 * TailWindCSSConfig is a example configuration for TailwindCSS when using the
 * AlpineToast library
 */
var TailWindCSSConfig = {
    containerClasses: "absolute max-w-16 right-5 bottom-5 overflow-x-hidden space-y-2",
    toastClasses: "block p-4 bg-blue-300 text-lg shadow-lg transition-all duration-1000 transform translate-x-full",
    onShowClasses: "translate-x-full",
    onHideClasses: "translate-x-full"
};

var AlpineToast = /** @class */ (function () {
    function AlpineToast(config) {
        this.containerClasses = maybeParseClasses(config.containerClasses) || [];
        this.toastClasses = maybeParseClasses(config.toastClasses) || [];
        this.onShowClasses = maybeParseClasses(config.onShowClasses) || [];
        this.onHideClasses = maybeParseClasses(config.onHideClasses) || [];
        this.delayRemoval = config.delayRemoval || 1000;
        this.duration = config.duration || 5000;
        this.container = config.toastContainer || this.defaultContainer();
        document.body.appendChild(this.container);
    }
    AlpineToast.prototype.defaultContainer = function () {
        var _a;
        var container = document.createElement("div");
        (_a = container.classList).add.apply(_a, this.containerClasses);
        return container;
    };
    /**
     * getToasts retrieves all the elements which become toasts
     */
    AlpineToast.prototype.getToasts = function () {
        return document.querySelectorAll("[x-toast]");
    };
    /**
     * makeToasts converts the elements into toasts
     */
    AlpineToast.prototype.start = function () {
        var _this = this;
        var toasts = this.getToasts();
        toasts.forEach(function (elem) {
            // Get the args passed into the element
            var args = JSON5.parse(elem.getAttribute('x-toast') || '{}');
            _this.makeToast(elem, args);
        });
    };
    /**
     * makeToast turns a signle element into a toast
     * @param elem The element to become the toast
     */
    AlpineToast.prototype.makeToast = function (elem, args) {
        var _a;
        var duration = args.duration || this.duration; // Default or use the passed in duration
        var removeDelay = args.delayRemoval || this.delayRemoval;
        var toastClasses = maybeParseClasses(args.toastClasses) || this.toastClasses;
        var onHideClasses = maybeParseClasses(args.onHideClasses) || this.onHideClasses;
        var onShowClasses = maybeParseClasses(args.onShowClasses) || this.onShowClasses;
        // Stop the toast from being created more than once
        elem.removeAttribute('x-toast');
        // Add the default classes
        (_a = elem.classList).add.apply(_a, toastClasses);
        // Countdown the timer until it should disappear
        var update_timer = setInterval(function () {
            if (!elem.matches(":hover")) {
                duration = duration - 100;
            }
            if (duration <= 0) {
                // Stop updating the timer
                clearInterval(update_timer);
                // Toggle the classes
                if (onHideClasses !== []) {
                    onHideClasses.forEach(function (cls) { return elem.classList.toggle(cls); });
                }
                // Remove the element from the dom
                setTimeout(function () { return elem.remove(); }, removeDelay);
            }
        }, 100);
        // Toggle some class
        setTimeout(function () {
            if (onShowClasses !== []) {
                onShowClasses.forEach(function (cls) { return elem.classList.toggle(cls); });
            }
        }, 500);
        // Add the element to the toast container for styling
        this.container.appendChild(elem);
    };
    AlpineToast.prototype.newToast = function (text, args) {
        if (args === void 0) { args = {}; }
        var div = document.createElement('div');
        div.innerHTML = text;
        this.makeToast(div, args);
    };
    return AlpineToast;
}());

exports.AlpineToast = AlpineToast;
exports.TailWindCSSConfig = TailWindCSSConfig;
//# sourceMappingURL=index.js.map
