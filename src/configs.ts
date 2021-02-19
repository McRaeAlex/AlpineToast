import { AlpineToastConfig } from './index';

/**
 * TailWindCSSConfig is a example configuration for TailwindCSS when using the 
 * AlpineToast library
 */
export const TailWindCSSConfig: AlpineToastConfig = {
 containerClasses: "absolute max-w-16 right-5 bottom-5 overflow-x-hidden space-y-2",
 toastClasses: "block p-4 bg-blue-300 text-lg shadow-lg transition-all duration-1000 transform translate-x-full",
 onShowClasses: "translate-x-full",
 onHideClasses: "translate-x-full",
};