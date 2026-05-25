/* modules/exporter/export-image.js */
"use strict";

(function registerExportImage() {
  const app = window.VisualLogic;

  app.exporter = app.exporter || {};

  app.exporter.exportImage = function exportImage() {
    const svg = [
      '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="700" viewBox="0 0 1200 700">',
      '<rect width="1200" height="700" fill="#0b1020"/>',
      '<text x="60" y="90" fill="#eef3ff" font-size="34" font-family="Arial">Visual Logic</text>',
      '<text x="60" y="140" fill="#98a7c7" font-size="18" font-family="Arial">Exportación visual básica del flujo</text>',
      '<rect x="80" y="220" width="180" height="80" rx="18" fill="#1d2940" stroke="#5b8cff"/>',
      '<text x="140" y="268" fill="#eef3ff" font-size="20" font-family="Arial">Inicio</text>',
      '<rect x="360" y="220" width="220" height="80" rx="18" fill="#1d2940" stroke="#5b8cff"/>',
      '<text x="410" y="268" fill="#eef3ff" font-size="20" font-family="Arial">Proceso</text>',
      '<rect x="700" y="220" width="180" height="80" rx="18" fill="#1d2940" stroke="#34d399"/>',
      '<text x="768" y="268" fill="#eef3ff" font-size="20" font-family="Arial">Fin</text>',
      '<line x1="260" y1="260" x2="360" y2="260" stroke="#98a7c7" stroke-width="4"/>',
      '<line x1="580" y1="260" x2="700" y2="260" stroke="#98a7c7" stroke-width="4"/>',
      "</svg>"
    ].join("");

    app.helpers.downloadFile("visual-logic-flow.svg", svg, "image/svg+xml");
    app.showToast("Imagen SVG exportada.");
    return true;
  };
})();