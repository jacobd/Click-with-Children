/*
 * jQuery Click with Children
 * Version 1
 * http://picturelife.com
 *
 * A jQuery plugin that overwrites the click event to work when the mousedown
 * occurs on the element and the mouseup event occurs on a child element
 *
 * Copyright (c) 2012 Picturelife Inc (picturelife.com)
 * Licensed under the MIT license
 * https://raw.github.com/Picturelife/Click-with-Children/master/LICENSE.txt
 *
*/
(function ($) {
  "use strict";
  // A private property.
  var EVENT = 'click',
    EVENT_CLASS = '.click_with_children';

  // Special event definition.
  $.event.special[EVENT] = {
    setup: function (data, namespaces) {
      $(this).bind('mousedown' + EVENT_CLASS, $.event.special[EVENT].down);
    },
    teardown: function (namespaces) {
      $(this).unbind(EVENT_CLASS)
        .children().unbind(EVENT_CLASS);
    },
    down: function (e) {
      var elem = this;
      $(elem).bind('mouseup' + EVENT_CLASS, $.event.special[EVENT].up);
      $(elem).children().bind('mouseup' + EVENT_CLASS, function (e) {
        $.event.special[EVENT].up.apply(elem, arguments);
      });
    },
    up: function (e) {
      e.type = EVENT;
      $.event.handle.apply(this, arguments);
      $(this).unbind('mouseup' + EVENT_CLASS)
        .children().unbind('mouseup' + EVENT_CLASS);
    }
  };
}(jQuery));