
class AlpineToast {
    container: HTMLElement;

    onShowClasses: string;
    onHideClasses: string;

    duration: number;
    delayRemoval: number;

    constructor(toastContainer: HTMLElement = document.createElement("div"), onShowClasses: string = "", onHideClasses: string = "", delayRemoval: number = 1000, duration: number = 5000) {
        this.onShowClasses = onShowClasses;
        this.onHideClasses = onHideClasses;
        this.delayRemoval = delayRemoval;
        this.duration = duration;

        this.container = toastContainer;
        document.body.appendChild(this.container);
    }

    /**
     * getToasts retrieves all the elements which become toasts
     */
    getToasts() {
        return document.querySelectorAll("[x-toast]");
    }

    /**
     * makeToasts converts the elements into toasts
     */
    makeToasts() {
        const toasts = this.getToasts();

        toasts.forEach(this.makeToast);
    }

    /**
     * makeToast turns a signle element into a toast
     * @param elem The element to become the toast
     */
    makeToast(elem) {
        let duration = this.duration; // Default or use the passed in duration

        // Countdown the timer until it should disappear
        const update_timer = setInterval(() => {
            if (!elem.matches(":hover")) {
                duration = duration - 100;
            }

            if (duration <= 0) {
                // Stop updating the timer
                clearInterval(update_timer);

                // Toogle a class
                elem.classList.toggle(this.onHideClasses);

                // Remove the element from the dom
                setTimeout(() => elem.remove(), this.delayRemoval);
            }
        }, 100);

        setTimeout(() => {
            // Toggle some class
            elem.classList.toggle(this.onShowClasses);
        }, 1000);

        // Add the element to the toast container for styling
        this.container.appendChild(elem);
    }
}

export default AlpineToast;