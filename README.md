[![npm](https://img.shields.io/npm/v/nativescript-keyboardshowing.svg)](https://www.npmjs.com/package/nativescript-keyboardshowing)
[![npm](https://img.shields.io/npm/l/nativescript-keyboardshowing.svg)](https://www.npmjs.com/package/nativescript-keyboardshowing)
[![npm](https://img.shields.io/npm/dt/nativescript-keyboardshowing.svg?label=npm%20d%2fls)](https://www.npmjs.com/package/nativescript-keyboardshowing)

# nativescript-keyboardShowing
A NativeScript plugin to deal knowing if the keyboard is showing or hiding.

## License

This is released under the MIT License, meaning you are free to include this in any type of program -- However for entities that need a support contract, changes, enhancements and/or a commercial license please contact me at [http://nativescript.tools](http://nativescript.tools).

## Usage

To use the module you just `require()` it:

 
```js
var keyboard = require( "nativescript-keyboardshowing" );
console.log("keyboard is", keyboard.isShowing() ? "showing" : "hidden");

exports.onKeyboard = function (evt) {
    console.log("Keyboard is now", evt.showing ? 'showing' : 'hidden');
};
```



## You ask, how exactly does this help?
Have you ever needed to know if the Soft-keyboard is showing?   This plugin gives you that information via a event or a function call.


### You can add to any page you need it the following Function:
#### exports.onKeyboard = function(args) { } 
##### args.showing = true | false
##### args.object = the current page


### Additional Helper Method

```js 
var keyboard = require('nativescript-keyboardshowing');
``` 

#### keyboard.isShowing()
##### returns: true or false 
```js
var keyboard = require( "nativescript-keyboardshowing" );
console.log("keyboard is", keyboard.isShowing() ? "showing" : "hidden");
```
 
