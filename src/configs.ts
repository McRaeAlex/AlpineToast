import { AlpineToastConfig } from "./index";

/**
 * TailWindCSSConfig is a example configuration for TailwindCSS when using the
 * AlpineToast library
 */
export const TailWindCSSConfig: AlpineToastConfig = {
  containerClasses:
    "absolute max-w-16 right-5 bottom-5 overflow-x-hidden space-y-2",
  toastClasses:
    "block p-4 bg-red-300 text-lg shadow-lg transition-transform duration-1000 transform translate-x-full",
  onShowClasses: "translate-x-full",
  onHideClasses: "translate-x-full",
  showProgressBar: true,
  // position absolute is so it sticks to the bottom of the block element and left-0 and right-0 are so its the full width
  progressBarClasses: "h-1 bg-gray-100 bg-opacity-50 transition-all absolute bottom-0 left-0 right-0",
};
