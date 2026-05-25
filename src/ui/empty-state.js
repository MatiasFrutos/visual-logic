/* ui/empty-state.js */
"use strict";

(function registerEmptyState() {
  const app = window.VisualLogic;

  app.ui.emptyState = function emptyState(config) {
    return `
      <div class="vl-empty-state">
        <div class="vl-empty-icon">${config?.icon || "◇"}</div>
        <h3>${app.helpers.escapeHtml(config?.title || "Sin contenido")}</h3>
        <p>${app.helpers.escapeHtml(config?.description || "Todavía no hay datos para mostrar.")}</p>
        ${config?.actionHtml || ""}
      </div>
    `;
  };
})();