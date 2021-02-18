interface AlpineToastConfig {
  toastContainer?: HTMLElement;
  onShowClasses?: string;
  onHideClasses?: string;
  delayRemoval?: number;
  duration?: number;
}

class AlpineToast {
  container: HTMLElement;

  onShowClasses: string;
  onHideClasses: string;

  duration: number;
  delayRemoval: number;

  constructor(config: AlpineToastConfig) {
    this.onShowClasses = config.onShowClasses || "";
    this.onHideClasses = config.onHideClasses || "";

    this.delayRemoval = config.delayRemoval || 1000;
    this.duration = config.duration || 5000;

    this.container = config.toastContainer || this.defaultContainer();
    document.body.appendChild(this.container);
  }

  private defaultContainer() {
    let container = document.createElement("div");
    container.setAttribute("id", "alpine-toast-container");
    container.style.position = "absolute";
    container.style.right = "10px";
    container.style.bottom = "10px";
    container.style.overflow = "hidden";
    return container;
  }

  /**
   * getToasts retrieves all the elements which become toasts
   */
  private getToasts() {
    return document.querySelectorAll("[x-toast]");
  }

  /**
   * makeToasts converts the elements into toasts
   */
  start() {
    const toasts = this.getToasts();

    toasts.forEach((elem) => {
      this.makeToast(elem);
    });
  }

  /**
   * makeToast turns a signle element into a toast
   * @param elem The element to become the toast
   */
  makeToast(elem: Element) {
    let duration = this.duration; // Default or use the passed in duration
    // TODO: Configuration for the toast goes here

    // Stop the toast from being created more than once
    elem.removeAttribute('x-toast');
    // Countdown the timer until it should disappear
    const update_timer = setInterval(() => {
      if (!elem.matches(":hover")) {
        duration = duration - 100;
      }

      if (duration <= 0) {
        // Stop updating the timer
        clearInterval(update_timer);

        // Toogle a class
        if (this.onHideClasses !== "") {
          elem.classList.toggle(this.onHideClasses);
        }
        // Remove the element from the dom
        setTimeout(() => elem.remove(), this.delayRemoval);
      }
    }, 100);

    // Toggle some class
    setTimeout(() => {
    if (this.onShowClasses !== "") {
      elem.classList.toggle(this.onShowClasses);
    }
    }, 500);
    // Add the element to the toast container for styling
    this.container.appendChild(elem);
  }

  new(text: string) {
    const div = document.createElement('div');
    div.innerHTML = text;
    this.makeToast(div);
  }
}

export default AlpineToast;
