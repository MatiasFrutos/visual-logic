/* core/validators.js */
"use strict";

(function registerCoreValidators() {
  const app = window.VisualLogic;

  app.validators = app.validators || {};

  app.validators.validateDiagram = function validateDiagram(diagram) {
    const errors = [];
    const warnings = [];

    if (!diagram) {
      errors.push("No existe un diagrama activo.");
      return { ok: false, errors: errors, warnings: warnings };
    }

    if (!Array.isArray(diagram.nodes) || !diagram.nodes.length) {
      errors.push("El diagrama no tiene nodos.");
    }

    if (!Array.isArray(diagram.connections)) {
      warnings.push("El diagrama no tiene conexiones inicializadas.");
    }

    const nodes = Array.isArray(diagram.nodes) ? diagram.nodes : [];
    const connections = Array.isArray(diagram.connections) ? diagram.connections : [];

    const startCount = nodes.filter(function (node) {
      return node.type === "start";
    }).length;

    const endCount = nodes.filter(function (node) {
      return node.type === "end";
    }).length;

    if (!startCount) {
      errors.push("Debe existir al menos un nodo de inicio.");
    }

    if (!endCount) {
      errors.push("Debe existir al menos un nodo de fin.");
    }

    nodes.forEach(function (node) {
      if (!node.id) {
        errors.push("Hay un nodo sin ID.");
      }

      if (!node.type) {
        errors.push("Hay un nodo sin tipo.");
      }

      if (!node.label) {
        warnings.push("El nodo " + (node.id || "(sin id)") + " no tiene texto.");
      }
    });

    connections.forEach(function (connection) {
      if (!connection.from || !connection.to) {
        errors.push("Hay una conexión incompleta.");
      }

      if (connection.from === connection.to) {
        warnings.push("Existe una conexión que apunta al mismo nodo.");
      }
    });

    return {
      ok: errors.length === 0,
      errors: errors,
      warnings: warnings
    };
  };

  app.validators.ensureDiagramShape = function ensureDiagramShape(diagram) {
    const base = diagram || {};

    return {
      id: base.id || app.ids.diagram(),
      name: base.name || "Nuevo diagrama",
      createdAt: base.createdAt || app.helpers.now(),
      updatedAt: base.updatedAt || app.helpers.now(),
      viewport: Object.assign({ zoom: 1, x: 0, y: 0 }, base.viewport || {}),
      nodes: Array.isArray(base.nodes) ? base.nodes : [],
      connections: Array.isArray(base.connections) ? base.connections : [],
      pseudocode: typeof base.pseudocode === "string" ? base.pseudocode : "",
      javascript: typeof base.javascript === "string" ? base.javascript : ""
    };
  };
})();