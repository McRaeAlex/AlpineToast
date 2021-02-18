import AlpineToast from 'alpine-toast';

const toaster = new AlpineToast({ onShowClasses: "show", onHideClasses: "show" });

// Wait until the DOM loads then convert to toasts
document.addEventListener('DOMContentLoaded', () => {
    console.info(toaster);

    toaster.start();
})

document.getElementById('newToastButton').onclick = () => toaster.new("This is a new toast");
