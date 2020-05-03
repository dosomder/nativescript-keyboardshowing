/**********************************************************************************
 * (c) 2016, Nathanael Anderson.
 * Licensed under the MIT license.
 *
 * Version 1.0.0                                        nathan@master-technology.com
 **********************************************************************************/
"use strict";

/* global android, UIKeyboardDidShowNotification, UIKeyboardDidHideNotification */

const Frame = require("ui/frame").Frame;
var previousListener = null;

function trackAndroidKeyboard() {
  if (!Frame.topmost()) {
    setTimeout(trackAndroidKeyboard, 100);
    return;
  }
  if (!Frame.topmost().currentPage) {
    setTimeout(trackAndroidKeyboard, 100);
    return;
  }

  if (previousListener !== null) {
    global.cv
      .getViewTreeObserver()
      .removeOnGlobalLayoutListener(previousListener);
    previousListener = null;
  }

  global.cv = Frame.topmost().currentPage.android;

  const listener = new android.view.ViewTreeObserver.OnGlobalLayoutListener({
    onGlobalLayout: function () {
      // Grab the Current Screen Height
      var rect = new android.graphics.Rect();
      global.cv.getWindowVisibleDisplayFrame(rect);
      var screenHeight = global.cv.getRootView().getHeight();
      var missingSize = screenHeight - rect.bottom;

      if (missingSize > screenHeight * 0.15) {
        notifyKeyboard(true);
      } else {
        notifyKeyboard(false);
      }
    },
  });

  global.cv.getViewTreeObserver().addOnGlobalLayoutListener(listener);
  previousListener = listener;
}

function trackiOSKeyboard() {
  var application = require("application");
  application.ios.addNotificationObserver(
    UIKeyboardDidShowNotification,
    function () {
      notifyKeyboard(true);
    }
  );
  application.ios.addNotificationObserver(
    UIKeyboardDidHideNotification,
    function () {
      notifyKeyboard(false);
    }
  );
}

function startTracking() {
  if (global.android) {
    trackAndroidKeyboard();
  } else {
    trackiOSKeyboard();
  }
}
startTracking();

var lastNotification = false;
function notifyKeyboard(isShown) {
  if (isShown === lastNotification) {
    return;
  }
  // For a notification to occur, the frame, topmost() and currentPage has to exist; so we won't bother checking again...
  var currentPage = Frame.topmost().currentPage;
  lastNotification = isShown;

  if (
    currentPage.exports &&
    typeof currentPage.exports.onKeyboard === "function"
  ) {
    currentPage.exports.onKeyboard({ showing: isShown, object: currentPage });
  }

  for (let cb of notifyKeyboardActions) {
    cb({ showing: isShown, object: currentPage });
  }
}

var notifyKeyboardActions = [];

export default {
  isShowing: function () {
    return lastNotification;
  },
  addNotifyKeyboardAction: function (callback) {
    notifyKeyboardActions.push(callback);
  },
  removeNotifyKeyboardAction: function (callback) {
    const index = notifyKeyboardActions.indexOf(callback);
    if (index >= 0) {
      notifyKeyboardActions.splice(index, 1);
    }
  },
  refreshListener: function () {
    startTracking();
  },
};
