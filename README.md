# Apline Toast

Alpine toast is a toast library which allows users to label an element
with x-toast and will make it a toast.

The library aims to be configurable for the 99% use case an forkable for the
last 1%.

AlpineToast does not use the [Alpine](https://github.com/alpinejs/alpine) library but follows the simplicity
of the project.

## Demo

[mcraealex.github.io/AlpineToast/dist/index.html](https://mcraealex.github.io/AlpineToast/example/dist/index.html)

## Install

If using node just npm i alpine-toast then start using the lib.

```bash
npm i alpine-toast
```

If you need a cdn link create an issue and I will make it avaiable through a cdn.

## Usage

First we have to create the instance of the AlpineToast library

```js
import {AlpineToast, TailWindCSSConfig} from 'alpine-toast';

// Good defaults if your using tailwindcss
const toaster = AlpineToast(TailWindCSSConfig);

// Then we convert all the elements with x-toast into toasts
document.addEventListener('DOMContentLoaded', () => {
    toaster.start();
})
```

Then we can add toasts by adding it to attributes. But we must remember that
start must be called to convert these so if you doing this using flashes like
in phoenix then you will need to call toaster.start again.

**Important: AlpineToast does not create a new element. It transforms the elemen given into a toast by adding the classes passed into the config and adding it to
the toast container. All attributes but the x-toast attribute are maintained**

```html
<div x-toast="{ duration: 1000, showProgressBar: true }">
```

Alternatively if its easier for you to use JS

```js
toaster.newToast('content', optionalConfig);
```

This will create a new toast with text `content`

Lastly if you already have a element which you are building in js to add as a
toast.

```js
toaster.makeToast(elem, optionalConfig);
```

This will covert the element into a toast.

## Contributing

The easiest way to get started editing the codebase is by running

```
npm install
```

Then start the dev server

```
npm run dev
```

To see the changes do the same thing in the example dir which will allow you
to modify both the example code and the library code an see you changes right
away.

## To do:

* Add the ability to have types of toasts passed in as a config field which changes the config.
    * Not sure if this type would map to another config or just add classes to the config being used.
* Early cancellation with button
* Add usage for using with Phoenix LiveView
* TailWindCSS config
* Add generated API documentation
* Create another page in the demo application which shows all the different configuration options turning different ones on and off still using the tailwindcss classes
* VanillaCSS config for non tailwind users
    * This just means copying the tailwindcss styles to another css class and putting them under a single class name instead of adding a bunch of different ones. (May be possible to just automate this)
* Write hooks which make sure before the package it uploaded to github it passes test cases and it builds so people have access to the compiled code

