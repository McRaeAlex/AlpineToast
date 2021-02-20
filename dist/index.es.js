import { parse } from 'json5';

function maybeParseClasses(maybeString) {
    if (typeof maybeString === "string" && maybeString.length > 0) {
        return maybeString.split(" ").filter(function (x) { return x.length > 0; });
    }
    return undefined;
}

/**
 * TailWindCSSConfig is a example configuration for TailwindCSS when using the
 * AlpineToast library
 */
var TailWindCSSConfig = {
    containerClasses: "absolute max-w-16 right-5 bottom-5 overflow-x-hidden space-y-2",
    toastClasses: "block p-4 bg-red-300 text-lg shadow-lg transition-transform duration-1000 transform translate-x-full",
    onShowClasses: "translate-x-full",
    onHideClasses: "translate-x-full",
    showProgressBar: true,
    // position absolute is so it sticks to the bottom of the block element and left-0 and right-0 are so its the full width
    progressBarClasses: "h-1 bg-gray-100 bg-opacity-50 transition-all absolute bottom-0 left-0 right-0"
};

var AlpineToast = /** @class */ (function () {
    function AlpineToast(config) {
        this.containerClasses = maybeParseClasses(config.containerClasses) || [];
        this.toastClasses = maybeParseClasses(config.toastClasses) || [];
        this.onShowClasses = maybeParseClasses(config.onShowClasses) || [];
        this.onHideClasses = maybeParseClasses(config.onHideClasses) || [];
        this.showProgressBar = config.showProgressBar || false;
        this.progressBarClasses =
            maybeParseClasses(config.progressBarClasses) || [];
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
     * Adds a progress bar to a element
     * @param elem The element to add the progress bar too
     */
    AlpineToast.prototype.addProgressBar = function (elem) {
        var _a;
        var progressBarElem = document.createElement("div");
        var classes = "".split(" ").filter(function (cls) { return cls.length > 0; });
        (_a = progressBarElem.classList).add.apply(_a, classes);
        elem.append(progressBarElem);
        return progressBarElem;
    };
    /**
     * makeToasts converts all the elements with the x-toast attribute into toasts
     */
    AlpineToast.prototype.start = function () {
        var _this = this;
        var toasts = this.getToasts();
        toasts.forEach(function (elem) {
            // Get the args passed into the element
            var args = parse(elem.getAttribute("x-toast") || "{}");
            _this.makeToast(elem, args);
        });
    };
    /**
     * makeToast turns a signle element into a toast
     * @param elem The element to become the toast
     */
    AlpineToast.prototype.makeToast = function (elem, args) {
        var _a, _b;
        var duration = args.duration || this.duration; // Default or use the passed in duration
        var total_duration = duration; // Keeps track of the total duration
        var removeDelay = args.delayRemoval || this.delayRemoval;
        var toastClasses = maybeParseClasses(args.toastClasses) || this.toastClasses;
        var onHideClasses = maybeParseClasses(args.onHideClasses) || this.onHideClasses;
        var onShowClasses = maybeParseClasses(args.onShowClasses) || this.onShowClasses;
        var showProgressBar = args.showProgressBar || this.showProgressBar;
        var progressBarClasses = maybeParseClasses(args.progressBarClasses) || this.progressBarClasses;
        // Stop the toast from being created more than once
        elem.removeAttribute("x-toast");
        // Add the default classes
        (_a = elem.classList).add.apply(_a, toastClasses);
        // Maybe add the progress bar
        var progressBarElem = null;
        if (showProgressBar) {
            progressBarElem = this.addProgressBar(elem);
            (_b = progressBarElem.classList).add.apply(_b, progressBarClasses);
        }
        // Countdown the timer until it should disappear
        var interval_time = 100; // ms
        var update_timer = setInterval(function () {
            if (!elem.matches(":hover")) {
                duration = duration - interval_time;
                // Update the progress bar if there is one
                if (progressBarElem !== null) {
                    progressBarElem.style.width = (100 * duration) / total_duration + "%";
                }
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
        }, interval_time);
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
        var div = document.createElement("div");
        div.innerHTML = text;
        this.makeToast(div, args);
    };
    return AlpineToast;
}());

export { AlpineToast, TailWindCSSConfig };
//# sourceMappingURL=index.es.js.map
