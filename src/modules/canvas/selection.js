/* modules/canvas/selection.js */
"use strict";

(function registerCanvasSelection() {
  const app = window.VisualLogic;

  app.selection = app.selection || {
    type: null,
    id: null
  };

  app.selection.selectNode = function selectNode(nodeId) {
    app.selection.type = "node";
    app.selection.id = nodeId || null;
    app.events.emit("selection:changed", app.helpers.deepClone(app.selection));
    return app.selection;
  };

  app.selection.selectConnection = function selectConnection(connectionId) {
    app.selection.type = "connection";
    app.selection.id = connectionId || null;
    app.events.emit("selection:changed", app.helpers.deepClone(app.selection));
    return app.selection;
  };

  app.selection.clear = function clear() {
    app.selection.type = null;
    app.selection.id = null;
    app.events.emit("selection:changed", app.helpers.deepClone(app.selection));
    return app.selection;
  };

  app.selection.get = function get() {
    return app.helpers.deepClone(app.selection);
  };
})();