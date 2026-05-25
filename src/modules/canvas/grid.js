/* modules/canvas/grid.js */
"use strict";

(function registerCanvasGrid() {
  const app = window.VisualLogic;

  app.canvas = app.canvas || {};

  app.canvas.grid = {
    size: 24,

    setSize: function setSize(value) {
      const safe = Number(value) > 4 ? Number(value) : 24;
      this.size = safe;

      const canvas = app.canvas.getElement && app.canvas.getElement();
      if (canvas) {
        canvas.style.backgroundSize = safe + "px " + safe + "px, " + safe + "px " + safe + "px, auto, auto";
      }

      return safe;
    },

    getSize: function getSize() {
      return this.size;
    }
  };
})();