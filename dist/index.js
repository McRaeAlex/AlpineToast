'use strict';

var AlpineToast = (function () {
    function AlpineToast(toastContainer, onShowClasses, onHideClasses, delayRemoval, duration) {
        if (toastContainer === void 0) { toastContainer = document.createElement("div"); }
        if (onShowClasses === void 0) { onShowClasses = ""; }
        if (onHideClasses === void 0) { onHideClasses = ""; }
        if (delayRemoval === void 0) { delayRemoval = 1000; }
        if (duration === void 0) { duration = 5000; }
        this.onShowClasses = onShowClasses;
        this.onHideClasses = onHideClasses;
        this.delayRemoval = delayRemoval;
        this.duration = duration;
        this.container = toastContainer;
        document.body.appendChild(this.container);
    }
    AlpineToast.prototype.getToasts = function () {
        return document.querySelectorAll("[x-toast]");
    };
    AlpineToast.prototype.makeToasts = function () {
        var toasts = this.getToasts();
        toasts.forEach(this.makeToast);
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
                elem.classList.toggle(_this.onHideClasses);
                setTimeout(function () { return elem.remove(); }, _this.delayRemoval);
            }
        }, 100);
        setTimeout(function () {
            elem.classList.toggle(_this.onShowClasses);
        }, 1000);
        this.container.appendChild(elem);
    };
    return AlpineToast;
}());

module.exports = AlpineToast;
