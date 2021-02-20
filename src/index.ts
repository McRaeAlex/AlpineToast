import * as JSON5 from "json5";
import { maybeParseClasses } from "./utils";

interface AlpineToastConfig {
  toastContainer?: HTMLElement;
  containerClasses?: string;
  toastClasses?: string;
  onShowClasses?: string;
  onHideClasses?: string;
  delayRemoval?: number;
  duration?: number;
  showProgressBar?: boolean;
  progressBarClasses?: string;
}

class AlpineToast {
  container: HTMLElement;

  containerClasses: string[];
  toastClasses: string[];
  onShowClasses: string[];
  onHideClasses: string[];

  showProgressBar: boolean;
  progressBarClasses: string[];

  duration: number;
  delayRemoval: number;

  constructor(config: AlpineToastConfig) {
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

  private defaultContainer() {
    let container = document.createElement("div");
    container.classList.add(...this.containerClasses);
    return container;
  }

  /**
   * getToasts retrieves all the elements which become toasts
   */
  private getToasts() {
    return document.querySelectorAll("[x-toast]");
  }

  /**
   * Adds a progress bar to a element
   * @param elem The element to add the progress bar too
   */
  private addProgressBar(elem: Element) {
    const progressBarElem = document.createElement("div");
    const classes = "".split(" ").filter((cls) => cls.length > 0);
    progressBarElem.classList.add(...classes);
    elem.append(progressBarElem);
    return progressBarElem;
  }

  /**
   * makeToasts converts all the elements with the x-toast attribute into toasts
   */
  start() {
    const toasts = this.getToasts();

    toasts.forEach((elem) => {
      // Get the args passed into the element
      const args = JSON5.parse(elem.getAttribute("x-toast") || "{}");
      this.makeToast(elem, args);
    });
  }

  /**
   * makeToast turns a signle element into a toast
   * @param elem The element to become the toast
   */
  makeToast(elem: Element, args: AlpineToastConfig) {
    let duration = args.duration || this.duration; // Default or use the passed in duration
    const total_duration = duration; // Keeps track of the total duration
    const removeDelay = args.delayRemoval || this.delayRemoval;
    const toastClasses =
      maybeParseClasses(args.toastClasses) || this.toastClasses;
    const onHideClasses =
      maybeParseClasses(args.onHideClasses) || this.onHideClasses;
    const onShowClasses =
      maybeParseClasses(args.onShowClasses) || this.onShowClasses;
    const showProgressBar = args.showProgressBar || this.showProgressBar;
    const progressBarClasses =
      maybeParseClasses(args.progressBarClasses) || this.progressBarClasses;

    // Stop the toast from being created more than once
    elem.removeAttribute("x-toast");

    // Add the default classes
    elem.classList.add(...toastClasses);

    // Maybe add the progress bar
    let progressBarElem: HTMLDivElement | null = null;
    if (showProgressBar) {
      progressBarElem = this.addProgressBar(elem);
      progressBarElem.classList.add(...progressBarClasses);
    }

    // Countdown the timer until it should disappear
    const interval_time = 100; // ms
    const update_timer = setInterval(() => {
      if (!elem.matches(":hover")) {
        duration = duration - interval_time;

        // Update the progress bar if there is one
        if (progressBarElem !== null) {
          progressBarElem.style.width = `${(100 * duration) / total_duration}%`;
        }
      }

      if (duration <= 0) {
        // Stop updating the timer
        clearInterval(update_timer);

        // Toggle the classes
        if (onHideClasses !== []) {
          onHideClasses.forEach((cls) => elem.classList.toggle(cls));
        }
        // Remove the element from the dom
        setTimeout(() => elem.remove(), removeDelay);
      }
    }, interval_time);

    // Toggle some class
    setTimeout(() => {
      if (onShowClasses !== []) {
        onShowClasses.forEach((cls) => elem.classList.toggle(cls));
      }
    }, 500);
    // Add the element to the toast container for styling
    this.container.appendChild(elem);
  }

  newToast(text: string, args: AlpineToastConfig = {}) {
    const div = document.createElement("div");
    div.innerHTML = text;
    this.makeToast(div, args);
  }
}

export { AlpineToast, AlpineToastConfig };
export { TailWindCSSConfig } from "./configs";
