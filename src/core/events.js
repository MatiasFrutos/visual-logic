/* core/events.js */
"use strict";

(function registerCoreEvents() {
  const app = window.VisualLogic;

  const listeners = {};

  app.events = app.events || {};

  app.events.on = function on(eventName, handler) {
    if (!eventName || typeof handler !== "function") return function noop() {};

    listeners[eventName] = listeners[eventName] || [];
    listeners[eventName].push(handler);

    return function unsubscribe() {
      app.events.off(eventName, handler);
    };
  };

  app.events.off = function off(eventName, handler) {
    if (!listeners[eventName]) return;

    listeners[eventName] = listeners[eventName].filter(function (item) {
      return item !== handler;
    });
  };

  app.events.emit = function emit(eventName, payload) {
    if (!listeners[eventName] || !listeners[eventName].length) return;

    listeners[eventName].forEach(function (handler) {
      try {
        handler(payload);
      } catch (error) {
        console.error("[VisualLogic.events.emit]", eventName, error);
      }
    });
  };

  app.events.once = function once(eventName, handler) {
    if (!eventName || typeof handler !== "function") return function noop() {};

    function onceHandler(payload) {
      try {
        handler(payload);
      } finally {
        app.events.off(eventName, onceHandler);
      }
    }

    return app.events.on(eventName, onceHandler);
  };

  app.events.clear = function clear(eventName) {
    if (!eventName) return;

    delete listeners[eventName];
  };
})();