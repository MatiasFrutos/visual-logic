/* modules/canvas/canvas.js */
"use strict";

(function registerCanvasModule() {
  const app = window.VisualLogic;

  app.canvas = app.canvas || {};

  app.canvas.getViewport = function getViewport(diagram) {
    const item = diagram || app.storage.getById(app.storage.getActiveId()) || {};
    return Object.assign({ zoom: 1, x: 0, y: 0 }, item.viewport || {});
  };

  app.canvas.updateViewport = function updateViewport(nextViewport) {
    const activeId = app.storage.getActiveId();
    const diagram = app.storage.getById(activeId);

    if (!diagram) return null;

    const viewport = Object.assign({}, app.canvas.getViewport(diagram), nextViewport || {});
    app.storage.updateDiagram(activeId, { viewport: viewport });
    app.events.emit("canvas:viewport-changed", viewport);
    return viewport;
  };

  app.canvas.getElement = function getElement() {
    return document.querySelector(".vl-editor-canvas");
  };

  app.canvas.refresh = function refresh() {
    const canvas = app.canvas.getElement();
    if (!canvas) return;

    const activeId = app.storage.getActiveId();
    const diagram = app.storage.getById(activeId);
    const viewport = app.canvas.getViewport(diagram);

    canvas.style.setProperty("--vl-canvas-zoom", String(viewport.zoom));
    canvas.dataset.zoom = String(viewport.zoom);
  };
})();