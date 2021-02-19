import * as JSON5 from 'json5'; 
import {maybeParseClasses} from './utils';

interface AlpineToastConfig {
  toastContainer?: HTMLElement;
  containerClasses?: string,
  toastClasses?: string,
  onShowClasses?: string;
  onHideClasses?: string;
  delayRemoval?: number;
  duration?: number;
}

class AlpineToast {
  container: HTMLElement;

  containerClasses: string[];
  toastClasses: string[];
  onShowClasses: string[];
  onHideClasses: string[];

  duration: number;
  delayRemoval: number;

  constructor(config: AlpineToastConfig) {
    this.containerClasses = maybeParseClasses(config.containerClasses) || [];
    this.toastClasses = maybeParseClasses(config.toastClasses) || [];
    this.onShowClasses = maybeParseClasses(config.onShowClasses) || [];
    this.onHideClasses = maybeParseClasses(config.onHideClasses) || [];

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
   * makeToasts converts the elements into toasts
   */
  start() {
    const toasts = this.getToasts();

    toasts.forEach((elem) => {
      // Get the args passed into the element
      const args = JSON5.parse(elem.getAttribute('x-toast') || '{}');
      this.makeToast(elem, args);
    });
  }

  /**
   * makeToast turns a signle element into a toast
   * @param elem The element to become the toast
   */
  makeToast(elem: Element, args: AlpineToastConfig) {
    let duration = args.duration || this.duration; // Default or use the passed in duration
    const removeDelay = args.delayRemoval || this.delayRemoval;
    const toastClasses = maybeParseClasses(args.toastClasses) || this.toastClasses;
    const onHideClasses = maybeParseClasses(args.onHideClasses) || this.onHideClasses;
    const onShowClasses = maybeParseClasses(args.onShowClasses) || this.onShowClasses;

    // Stop the toast from being created more than once
    elem.removeAttribute('x-toast');

    // Add the default classes
    elem.classList.add(...toastClasses);

    // Countdown the timer until it should disappear
    const update_timer = setInterval(() => {
      if (!elem.matches(":hover")) {
        duration = duration - 100;
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
    }, 100);

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
    const div = document.createElement('div');
    div.innerHTML = text;
    this.makeToast(div, args);
  }
}

export {AlpineToast, AlpineToastConfig};
export {TailWindCSSConfig} from './configs';