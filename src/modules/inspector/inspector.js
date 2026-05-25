/* modules/inspector/inspector.js */
"use strict";

(function registerInspectorModule() {
  const app = window.VisualLogic;

  app.inspector = app.inspector || {};

  app.inspector.getSelectedNode = function getSelectedNode() {
    const selection = app.selection.get();
    if (selection.type !== "node" || !selection.id) return null;

    const diagram = app.storage.getById(app.storage.getActiveId());
    if (!diagram) return null;

    return (diagram.nodes || []).find(function (node) {
      return node.id === selection.id;
    }) || null;
  };

  app.inspector.updateSelectedNode = function updateSelectedNode(patch) {
    const selectedNode = app.inspector.getSelectedNode();
    if (!selectedNode) return null;

    return app.nodes.update(selectedNode.id, patch || {});
  };

  app.inspector.selectFirstEditableNode = function selectFirstEditableNode() {
    const diagram = app.storage.getById(app.storage.getActiveId());
    if (!diagram || !Array.isArray(diagram.nodes) || !diagram.nodes.length) return null;

    const target = diagram.nodes[1] || diagram.nodes[0];
    app.selection.selectNode(target.id);
    return target;
  };
})();