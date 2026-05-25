/* src/modules/connections/connections.js */
"use strict";

(function registerConnectionsModule() {
  const app = window.VisualLogic;

  app.connections = app.connections || {};

  app.connections.getAll = function getAll(diagram) {
    const item = diagram || app.storage.getById(app.storage.getActiveId()) || {};
    return Array.isArray(item.connections) ? item.connections : [];
  };

  app.connections.exists = function exists(fromId, toId, diagram) {
    return app.connections.getAll(diagram).some(function (connection) {
      return connection.from === fromId && connection.to === toId;
    });
  };

  app.connections.create = function create(payload) {
    const activeId = app.storage.getActiveId();
    const diagram = app.storage.getById(activeId);

    if (!diagram) return null;

    const from = payload?.from || "";
    const to = payload?.to || "";

    if (!from || !to || from === to) {
      return null;
    }

    if (app.connections.exists(from, to, diagram)) {
      return null;
    }

    const connection = {
      id: app.ids.connection(),
      from: from,
      to: to,
      fromAnchor: payload?.fromAnchor || "right",
      toAnchor: payload?.toAnchor || "left",
      label: payload?.label || ""
    };

    const connections = app.connections.getAll(diagram).concat(connection);
    app.storage.updateDiagram(activeId, { connections: connections });

    if (app.events && typeof app.events.emit === "function") {
      app.events.emit("connections:changed", connections);
    }

    return connection;
  };

  app.connections.remove = function remove(connectionId) {
    const activeId = app.storage.getActiveId();
    const diagram = app.storage.getById(activeId);

    if (!diagram) return [];

    const connections = app.connections.getAll(diagram).filter(function (connection) {
      return connection.id !== connectionId;
    });

    app.storage.updateDiagram(activeId, { connections: connections });

    if (app.events && typeof app.events.emit === "function") {
      app.events.emit("connections:changed", connections);
    }

    return connections;
  };

  app.connections.clear = function clear() {
    const activeId = app.storage.getActiveId();
    const diagram = app.storage.getById(activeId);

    if (!diagram) return [];

    app.storage.updateDiagram(activeId, { connections: [] });

    if (app.events && typeof app.events.emit === "function") {
      app.events.emit("connections:changed", []);
    }

    return [];
  };
})();