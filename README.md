# nativescript-keyboardShowing
A NativeScript plugin to deal knowing if the keyboard is showing or hiding.

This is an updated fork to work with NativeScript 6.

## License

This is released under the MIT License, meaning you are free to include this in any type of program -- However for entities that need a support contract, changes, enhancements and/or a commercial license please contact the original author at [http://nativescript.tools](http://nativescript.tools).

## Installation

```
npm install dosomder/nativescript-keyboardshowing#master
```

## Usage

```ts
import keyboard from "nativescript-keyboardshowing";
```

Register a handler when keyboard showing changes:

```ts
keyboard.addNotifyKeyboardAction(showing => {
  console.log("keyboardshowing: ", showing.showing);
});
```

## Known issues
Sometimes if the page changes (e.g. component is removed), keyboard tracking might get lost on Android. To fix this you can call:
```ts
keyboard.refreshListener();
```

If you keep losing tracking, you can put it in an interval:
```ts
setInterval(keyboard.refreshListener, 1000);
```


## You ask, how exactly does this help?
Have you ever needed to know if the Soft-keyboard is showing?   This plugin gives you that information via a event or a function call.


### You can add to any page you need it the following Function:
#### exports.onKeyboard = function(args) { } 
##### args.showing = true | false
##### args.object = the current page


### Additional Helper Method

```ts
import keyboard from "nativescript-keyboardshowing";
``` 

#### keyboard.isShowing()
##### returns: true or false 
```ts
import keyboard from "nativescript-keyboardshowing";
console.log("keyboard is", keyboard.isShowing() ? "showing" : "hidden");
```
 
