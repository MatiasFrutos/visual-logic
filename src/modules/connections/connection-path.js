/* modules/connections/connection-path.js */
"use strict";

(function registerConnectionPath() {
  const app = window.VisualLogic;

  app.connections = app.connections || {};

  app.connections.path = {
    build: function build(fromNode, toNode) {
      const startX = Number(fromNode?.x || 120);
      const startY = Number(fromNode?.y || 120);
      const endX = Number(toNode?.x || 320);
      const endY = Number(toNode?.y || 220);

      const midX = (startX + endX) / 2;

      return [
        "M", startX, startY,
        "C", midX, startY, midX, endY, endX, endY
      ].join(" ");
    }
  };
})();