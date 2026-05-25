/* modules/exporter/copy-output.js */
"use strict";

(function registerCopyOutput() {
  const app = window.VisualLogic;

  app.exporter = app.exporter || {};

  app.exporter.copyOutput = async function copyOutput(type) {
    const activeId = app.storage.getActiveId();
    const diagram = app.storage.getById(activeId);

    if (!diagram) {
      app.showToast("No hay diagrama activo.", "warning");
      return false;
    }

    const key = type === "javascript" ? "javascript" : "pseudocode";
    const value = String(diagram[key] || "");

    if (!value.trim()) {
      app.showToast("No hay contenido para copiar.", "warning");
      return false;
    }

    await app.helpers.copyToClipboard(value);
    app.showToast((key === "javascript" ? "JavaScript" : "Pseudocódigo") + " copiado.");
    return true;
  };
})();