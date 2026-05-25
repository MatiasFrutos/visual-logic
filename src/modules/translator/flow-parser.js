/* modules/translator/flow-parser.js */
"use strict";

(function registerFlowParser() {
  const app = window.VisualLogic;

  app.translator = app.translator || {};

  app.translator.parse = function parse(diagram) {
    const item = diagram || app.storage.getById(app.storage.getActiveId());

    if (!item) {
      return {
        ok: false,
        errors: ["No existe un diagrama activo."],
        nodes: [],
        connections: [],
        sequence: []
      };
    }

    const validation = app.validators.validateDiagram(item);
    const nodes = Array.isArray(item.nodes) ? item.nodes : [];
    const connections = Array.isArray(item.connections) ? item.connections : [];

    const sequence = nodes.map(function (node, index) {
      return {
        step: index + 1,
        id: node.id,
        type: node.type,
        label: node.label || app.getNodeType(node.type).label
      };
    });

    return {
      ok: validation.ok,
      errors: validation.errors,
      warnings: validation.warnings,
      nodes: nodes,
      connections: connections,
      sequence: sequence
    };
  };
})();