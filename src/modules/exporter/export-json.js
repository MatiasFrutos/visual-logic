/* modules/exporter/export-json.js */
"use strict";

(function registerExportJson() {
  const app = window.VisualLogic;

  app.exporter = app.exporter || {};

  app.exporter.exportJSON = function exportJSON() {
    const activeId = app.storage.getActiveId();
    const diagram = app.storage.getById(activeId);

    if (!diagram) {
      app.showToast("No hay diagrama para exportar.", "warning");
      return false;
    }

    const name = app.helpers.slugify(diagram.name || "visual-logic") || "visual-logic";
    const content = JSON.stringify(diagram, null, 2);

    app.helpers.downloadFile(name + ".json", content, "application/json;charset=utf-8");
    app.showToast("JSON exportado.");
    return true;
  };
})();