var AlpineToast = /** @class */ (function () {
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
            _this.makeToast(elem);
        });
    };
    /**
     * makeToast turns a signle element into a toast
     * @param elem The element to become the toast
     */
    AlpineToast.prototype.makeToast = function (elem) {
        var _this = this;
        var duration = this.duration; // Default or use the passed in duration
        // TODO: Configuration for the toast goes here
        // Stop the toast from being created more than once
        elem.removeAttribute('x-toast');
        // Countdown the timer until it should disappear
        var update_timer = setInterval(function () {
            if (!elem.matches(":hover")) {
                duration = duration - 100;
            }
            if (duration <= 0) {
                // Stop updating the timer
                clearInterval(update_timer);
                // Toogle a class
                if (_this.onHideClasses !== "") {
                    elem.classList.toggle(_this.onHideClasses);
                }
                // Remove the element from the dom
                setTimeout(function () { return elem.remove(); }, _this.delayRemoval);
            }
        }, 100);
        // Toggle some class
        setTimeout(function () {
            if (_this.onShowClasses !== "") {
                elem.classList.toggle(_this.onShowClasses);
            }
        }, 500);
        // Add the element to the toast container for styling
        this.container.appendChild(elem);
    };
    AlpineToast.prototype["new"] = function (text) {
        var div = document.createElement('div');
        div.innerHTML = text;
        this.makeToast(div);
    };
    return AlpineToast;
}());

export default AlpineToast;
//# sourceMappingURL=index.es.js.map
