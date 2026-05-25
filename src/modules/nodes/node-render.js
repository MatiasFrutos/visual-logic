/* modules/nodes/node-render.js */
"use strict";

(function registerNodeRender() {
  const app = window.VisualLogic;

  app.nodes = app.nodes || {};

  app.nodes.render = function renderNodes(diagram) {
    const item = diagram || app.storage.getById(app.storage.getActiveId());
    if (!item) return "";

    return (item.nodes || []).map(function (node, index) {
      return `
        <div class="vl-flow-node is-${app.helpers.escapeHtml(node.type)}" data-flow-node="${app.helpers.escapeHtml(node.id)}">
          <small>${index + 1}</small>
          <strong>${app.helpers.escapeHtml(node.label || "Nodo")}</strong>
          <span>${app.helpers.escapeHtml(node.type || "process")}</span>
        </div>
      `;
    }).join("");
  };
})();