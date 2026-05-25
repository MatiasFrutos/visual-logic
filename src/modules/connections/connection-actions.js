/* modules/connections/connection-actions.js */
"use strict";

(function registerConnectionActions() {
  const app = window.VisualLogic;

  app.connections = app.connections || {};

  app.connections.actions = {
    create: function create(fromNodeId, toNodeId, label) {
      return app.connections.create({
        from: fromNodeId,
        to: toNodeId,
        label: label || ""
      });
    },

    remove: function remove(connectionId) {
      return app.connections.remove(connectionId);
    },

    reconnect: function reconnect(connectionId, nextFrom, nextTo) {
      const activeId = app.storage.getActiveId();
      const diagram = app.storage.getById(activeId);

      if (!diagram) return null;

      const connections = (diagram.connections || []).map(function (connection) {
        if (connection.id !== connectionId) return connection;

        return Object.assign({}, connection, {
          from: nextFrom || connection.from,
          to: nextTo || connection.to
        });
      });

      app.storage.updateDiagram(activeId, { connections: connections });
      app.events.emit("connections:changed", connections);
      return connections.find(function (item) {
        return item.id === connectionId;
      }) || null;
    }
  };
})();