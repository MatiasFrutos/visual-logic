/* src/modules/nodes/nodes.js */
"use strict";

(function registerNodesModule() {
  const app = window.VisualLogic;

  app.nodes = app.nodes || {};

  app.nodes.getAll = function getAll(diagram) {
    const item = diagram || app.storage.getById(app.storage.getActiveId()) || {};
    return Array.isArray(item.nodes) ? item.nodes : [];
  };

  app.nodes.create = function create(payload) {
    const activeId = app.storage.getActiveId();
    const diagram = app.storage.getById(activeId);

    if (!diagram) return null;

    const typeConfig = app.getNodeType(payload?.type || "process");
    const currentNodes = app.nodes.getAll(diagram);

    const node = {
      id: app.ids.node(),
      type: typeConfig.key,
      label: payload?.label || typeConfig.label,
      x: Number.isFinite(Number(payload?.x)) ? Number(payload.x) : 120 + currentNodes.length * 30,
      y: Number.isFinite(Number(payload?.y)) ? Number(payload.y) : 120 + currentNodes.length * 20,
      width: Number.isFinite(Number(payload?.width)) ? Number(payload.width) : typeConfig.defaultWidth,
      height: Number.isFinite(Number(payload?.height)) ? Number(payload.height) : typeConfig.defaultHeight,
      config: Object.assign({}, payload?.config || {})
    };

    const nodes = currentNodes.concat(node);
    app.storage.updateDiagram(activeId, { nodes: nodes });

    if (app.events && typeof app.events.emit === "function") {
      app.events.emit("nodes:changed", nodes);
    }

    return node;
  };

  app.nodes.update = function update(nodeId, patch) {
    const activeId = app.storage.getActiveId();
    const diagram = app.storage.getById(activeId);

    if (!diagram) return null;

    const nodes = app.nodes.getAll(diagram).map(function (node) {
      if (node.id !== nodeId) return node;
      return Object.assign({}, node, patch || {});
    });

    app.storage.updateDiagram(activeId, { nodes: nodes });

    if (app.events && typeof app.events.emit === "function") {
      app.events.emit("nodes:changed", nodes);
    }

    return nodes.find(function (node) {
      return node.id === nodeId;
    }) || null;
  };

  app.nodes.move = function move(nodeId, x, y) {
    return app.nodes.update(nodeId, {
      x: Number(x) || 0,
      y: Number(y) || 0
    });
  };

  app.nodes.remove = function remove(nodeId) {
    const activeId = app.storage.getActiveId();
    const diagram = app.storage.getById(activeId);

    if (!diagram) return [];

    const nodes = app.nodes.getAll(diagram).filter(function (node) {
      return node.id !== nodeId;
    });

    const connections = (diagram.connections || []).filter(function (connection) {
      return connection.from !== nodeId && connection.to !== nodeId;
    });

    app.storage.updateDiagram(activeId, {
      nodes: nodes,
      connections: connections
    });

    if (app.events && typeof app.events.emit === "function") {
      app.events.emit("nodes:changed", nodes);
      app.events.emit("connections:changed", connections);
    }

    return nodes;
  };
})();