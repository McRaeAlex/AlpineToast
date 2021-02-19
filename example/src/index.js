import {AlpineToast, TailWindCSSConfig} from 'alpine-toast';

const toaster = new AlpineToast(TailWindCSSConfig);

// Wait until the DOM loads then convert to toasts
document.addEventListener('DOMContentLoaded', () => {
    toaster.start();
})

document.getElementById('new_post').onsubmit = (e) => {
    e.preventDefault();
    document.getElementById('post_area').value = '';
    toaster.newToast("Your post has been submitted! :)")
};
