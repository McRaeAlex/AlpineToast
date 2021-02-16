import AlpineToast from '../../dist/index';

const toaster = new AlpineToast({onShowClasses: "show", onHideClasses: "show"});

// Wait until the DOM loads then convert to toasts
document.addEventListener('DOMContentLoaded', () => {
    console.info(toaster);

    toaster.makeToasts();
})


const addToast = () => {
    toaster.newToast("This is a new toast");
}