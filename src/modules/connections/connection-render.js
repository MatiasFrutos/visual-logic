/* modules/connections/connection-render.js */
"use strict";

(function registerConnectionRender() {
  const app = window.VisualLogic;

  app.connections = app.connections || {};

  app.connections.render = function renderConnections(diagram) {
    const item = diagram || app.storage.getById(app.storage.getActiveId());
    if (!item) return "";

    const nodes = Array.isArray(item.nodes) ? item.nodes : [];
    const connections = Array.isArray(item.connections) ? item.connections : [];

    return connections.map(function (connection) {
      const fromNode = nodes.find(function (node) {
        return node.id === connection.from;
      });

      const toNode = nodes.find(function (node) {
        return node.id === connection.to;
      });

      const path = app.connections.path.build(fromNode, toNode);

      return {
        id: connection.id,
        label: connection.label || "",
        path: path
      };
    });
  };
})();