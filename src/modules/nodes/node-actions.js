/* modules/nodes/node-actions.js */
"use strict";

(function registerNodeActions() {
  const app = window.VisualLogic;

  app.nodes = app.nodes || {};

  app.nodes.actions = {
    create: function create(type, label) {
      return app.nodes.create({
        type: type || "process",
        label: label || "Nuevo nodo"
      });
    },

    duplicate: function duplicate(nodeId) {
      const diagram = app.storage.getById(app.storage.getActiveId());
      if (!diagram) return null;

      const node = (diagram.nodes || []).find(function (item) {
        return item.id === nodeId;
      });

      if (!node) return null;

      return app.nodes.create({
        type: node.type,
        label: node.label + " copia",
        x: Number(node.x || 120) + 30,
        y: Number(node.y || 120) + 30,
        width: node.width,
        height: node.height,
        config: app.helpers.deepClone(node.config || {})
      });
    },

    remove: function remove(nodeId) {
      return app.nodes.remove(nodeId);
    }
  };
})();