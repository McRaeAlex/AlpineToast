(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.AlpineToast = factory());
}(this, (function () { 'use strict';

    var AlpineToast = (function () {
        function AlpineToast(config) {
            this.onShowClasses = config.onShowClasses || "";
            this.onHideClasses = config.onHideClasses || "";
            this.delayRemoval = config.delayRemoval || 1000;
            this.duration = config.duration || 5000;
            this.container = config.toastContainer || this.defaultContainer();
            document.body.appendChild(this.container);
        }
        AlpineToast.prototype.defaultContainer = function () {
            var container = document.createElement("div");
            container.setAttribute("id", "alpine-toast-container");
            container.style.position = "absolute";
            container.style.right = "10px";
            container.style.bottom = "10px";
            container.style.overflow = "hidden";
            return container;
        };
        AlpineToast.prototype.getToasts = function () {
            return document.querySelectorAll("[x-toast]");
        };
        AlpineToast.prototype.makeToasts = function () {
            var _this = this;
            var toasts = this.getToasts();
            toasts.forEach(function (elem) { return _this.makeToast(elem); });
        };
        AlpineToast.prototype.makeToast = function (elem) {
            var _this = this;
            var duration = this.duration;
            var update_timer = setInterval(function () {
                if (!elem.matches(":hover")) {
                    duration = duration - 100;
                }
                if (duration <= 0) {
                    clearInterval(update_timer);
                    if (_this.onHideClasses !== "") {
                        elem.classList.toggle(_this.onHideClasses);
                    }
                    setTimeout(function () { return elem.remove(); }, _this.delayRemoval);
                }
            }, 100);
            setTimeout(function () {
                if (_this.onShowClasses !== "") {
                    elem.classList.toggle(_this.onShowClasses);
                }
            }, 500);
            this.container.appendChild(elem);
        };
        return AlpineToast;
    }());

    return AlpineToast;

})));
