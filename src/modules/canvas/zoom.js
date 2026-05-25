/* modules/canvas/zoom.js */
"use strict";

(function registerCanvasZoom() {
  const app = window.VisualLogic;

  app.canvas = app.canvas || {};

  app.canvas.zoom = {
    min: 0.5,
    max: 1.8,
    step: 0.1,

    get: function get() {
      const activeId = app.storage.getActiveId();
      const diagram = app.storage.getById(activeId);
      const viewport = app.canvas.getViewport(diagram);
      return Number(viewport.zoom || 1);
    },

    set: function set(value) {
      const zoom = app.helpers.clamp(Number(value) || 1, this.min, this.max);
      app.canvas.updateViewport({ zoom: zoom });
      app.canvas.refresh();
      return zoom;
    },

    in: function zoomIn() {
      return this.set(this.get() + this.step);
    },

    out: function zoomOut() {
      return this.set(this.get() - this.step);
    },

    reset: function reset() {
      return this.set(1);
    }
  };
})();