/* core/ids.js */
"use strict";

(function registerCoreIds() {
  const app = window.VisualLogic;

  app.ids = app.ids || {};

  app.ids.create = function create(prefix) {
    const safePrefix = prefix || "id";
    return safePrefix + "_" + Math.random().toString(36).slice(2, 10) + "_" + Date.now().toString(36);
  };

  app.ids.diagram = function diagram() {
    return app.ids.create("diagram");
  };

  app.ids.node = function node() {
    return app.ids.create("node");
  };

  app.ids.connection = function connection() {
    return app.ids.create("connection");
  };
})();