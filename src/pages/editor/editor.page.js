/* src/pages/editor/editor.page.js */
"use strict";

(function registerEditorPage() {
  const app = window.VisualLogic;

  let editorKeydownBound = false;
  const EDITOR_STYLE_ID = "vl-editor-page-own-styles";

  function injectEditorStyles() {
    if (document.getElementById(EDITOR_STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = EDITOR_STYLE_ID;
    style.textContent = `
      .vl-editor-page {
        width: 100%;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 12px;
        box-sizing: border-box;
      }

      .vl-editor-layout {
        width: 100%;
        min-width: 0;
        display: grid;
        grid-template-columns: minmax(220px, 270px) minmax(0, 1fr) minmax(250px, 310px);
        gap: 12px;
        align-items: stretch;
        box-sizing: border-box;
      }

      .vl-editor-side,
      .vl-editor-main {
        min-width: 0;
        min-height: 0;
      }

      .vl-editor-board-card {
        width: 100%;
        height: calc(100vh - 168px);
        min-height: 540px;
        display: flex;
        flex-direction: column;
        gap: 11px;
        padding: 12px;
        border: 1px solid rgba(15, 23, 42, 0.08);
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.96);
        box-shadow:
          0 16px 34px rgba(15, 23, 42, 0.08),
          inset 0 1px 0 rgba(255, 255, 255, 0.88);
        box-sizing: border-box;
        overflow: hidden;
      }

      .vl-editor-board-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        flex: 0 0 auto;
      }

      .vl-editor-board-head h3 {
        margin: 0;
        color: #0f172a;
        font-size: 14px;
        font-weight: 900;
        line-height: 1.15;
        letter-spacing: 0;
      }

      .vl-editor-board-head p {
        margin: 4px 0 0;
        max-width: 680px;
        color: #64748b;
        font-size: 12px;
        font-weight: 650;
        line-height: 1.35;
        letter-spacing: 0;
      }

      .vl-editor-board-tools {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 8px;
        flex-wrap: wrap;
      }

      .vl-editor-board-status {
        min-height: 32px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
        padding: 0 10px;
        border: 1px solid rgba(37, 99, 235, 0.16);
        border-radius: 999px;
        background: rgba(37, 99, 235, 0.08);
        color: #1d4ed8;
        font-size: 12px;
        font-weight: 850;
        line-height: 1;
        white-space: nowrap;
      }

      .vl-editor-board-status.is-danger {
        border-color: rgba(220, 38, 38, 0.2);
        background: rgba(254, 242, 242, 0.95);
        color: #b91c1c;
      }

      .vl-editor-board-status i,
      .vl-editor-board-status svg {
        width: 14px;
        height: 14px;
        display: block;
        stroke-width: 2.35;
      }

      .vl-editor-zoom {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 4px;
        border: 1px solid rgba(15, 23, 42, 0.09);
        border-radius: 13px;
        background: rgba(248, 250, 252, 0.9);
        box-shadow: 0 8px 18px rgba(15, 23, 42, 0.04);
      }

      .vl-editor-zoom-btn {
        width: 32px;
        height: 32px;
        min-width: 32px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 0;
        border-radius: 9px;
        background: transparent;
        color: #334155;
        font-size: 13px;
        font-weight: 900;
        line-height: 1;
        cursor: pointer;
        transition:
          background 150ms ease,
          color 150ms ease,
          transform 150ms ease;
      }

      .vl-editor-zoom-btn:hover {
        background: rgba(37, 99, 235, 0.08);
        color: #2563eb;
      }

      .vl-editor-zoom-btn:active {
        transform: scale(0.96);
      }

      .vl-editor-zoom-btn.is-value {
        width: 58px;
        color: #0f172a;
        background: #ffffff;
      }

      .vl-editor-zoom-btn i,
      .vl-editor-zoom-btn svg {
        width: 15px;
        height: 15px;
        display: block;
        stroke-width: 2.35;
      }

      .vl-editor-canvas-wrap {
        position: relative;
        min-height: 0;
        flex: 1 1 auto;
        border: 1px solid rgba(15, 23, 42, 0.08);
        border-radius: 14px;
        background: #f8fafc;
        overflow: hidden;
      }

      .vl-editor-canvas {
        width: 100%;
        height: 100%;
        overflow: auto;
        background:
          radial-gradient(circle at 1px 1px, rgba(37, 99, 235, 0.13) 1px, transparent 0),
          linear-gradient(180deg, #f8fafc, #eef2f7);
        background-size: 22px 22px, 100% 100%;
        box-sizing: border-box;
        touch-action: pan-x pan-y;
      }

      .vl-editor-canvas.is-delete-connection {
        cursor: not-allowed;
      }

      .vl-editor-stage {
        position: relative;
        min-width: 1400px;
        min-height: 900px;
        transform-origin: 0 0;
        box-sizing: border-box;
      }

      .vl-canvas-grid {
        position: absolute;
        inset: 0;
        pointer-events: none;
      }

      .vl-connections-layer {
        position: absolute;
        inset: 0;
        z-index: 8;
        pointer-events: none;
        overflow: visible;
      }

      .vl-connection-group {
        pointer-events: auto;
        cursor: pointer;
      }

      .vl-editor-canvas.is-delete-connection .vl-connection-group,
      .vl-editor-canvas.is-delete-connection .vl-connection-hit {
        cursor: crosshair;
      }

      .vl-connection-hit {
        fill: none;
        stroke: transparent;
        stroke-width: 28;
        stroke-linecap: round;
        stroke-linejoin: round;
        pointer-events: stroke;
        cursor: pointer;
      }

      .vl-connection-path-shadow {
        fill: none;
        stroke: rgba(15, 23, 42, 0.12);
        stroke-width: 5;
        stroke-linecap: round;
        stroke-linejoin: round;
        pointer-events: none;
      }

      .vl-connection-path {
        fill: none;
        stroke: #2563eb;
        stroke-width: 2.6;
        stroke-linecap: round;
        stroke-linejoin: round;
        pointer-events: none;
      }

      .vl-connection-group:hover .vl-connection-path {
        stroke: #1d4ed8;
        stroke-width: 3.2;
      }

      .vl-editor-canvas.is-delete-connection .vl-connection-group:hover .vl-connection-path {
        stroke: #dc2626;
        stroke-width: 4;
      }

      .vl-editor-canvas.is-delete-connection .vl-connection-group:hover .vl-connection-path-shadow {
        stroke: rgba(220, 38, 38, 0.2);
        stroke-width: 10;
      }

      .vl-connection-group.is-selected .vl-connection-path {
        stroke: #dc2626;
        stroke-width: 3.7;
      }

      .vl-connection-group.is-selected .vl-connection-path-shadow {
        stroke: rgba(220, 38, 38, 0.18);
        stroke-width: 9;
      }

      .vl-connection-delete {
        pointer-events: auto;
        cursor: pointer;
      }

      .vl-connection-delete-bg {
        fill: #dc2626;
        stroke: rgba(255, 255, 255, 0.96);
        stroke-width: 2;
        filter: drop-shadow(0 8px 16px rgba(220, 38, 38, 0.28));
      }

      .vl-connection-delete-text {
        fill: #ffffff;
        font-size: 11px;
        font-weight: 850;
        dominant-baseline: middle;
        text-anchor: middle;
        pointer-events: none;
        user-select: none;
      }

      .vl-canvas-nodes {
        position: absolute;
        inset: 0;
        z-index: 5;
      }

      .vl-editor-canvas.is-delete-connection .vl-canvas-nodes {
        pointer-events: none;
      }

      .vl-flow-node {
        position: absolute;
        display: flex;
        align-items: stretch;
        justify-content: stretch;
        color: #0f172a;
        cursor: grab;
        user-select: none;
        -webkit-user-select: none;
        touch-action: none;
        box-sizing: border-box;
      }

      .vl-flow-node:active {
        cursor: grabbing;
      }

      .vl-flow-node-inner {
        width: 100%;
        min-height: inherit;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 7px;
        padding: 12px 14px;
        border: 1px solid rgba(15, 23, 42, 0.12);
        background: rgba(255, 255, 255, 0.96);
        box-shadow:
          0 14px 26px rgba(15, 23, 42, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.85);
        box-sizing: border-box;
        overflow: hidden;
        pointer-events: none;
      }

      .vl-flow-node-head,
      .vl-flow-node-foot {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }

      .vl-flow-node-index {
        width: 22px;
        height: 22px;
        min-width: 22px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        background: rgba(37, 99, 235, 0.1);
        color: #2563eb;
        font-size: 11px;
        font-weight: 900;
        line-height: 1;
      }

      .vl-flow-node-kind,
      .vl-flow-node-foot span {
        min-width: 0;
        color: #64748b;
        font-size: 10px;
        font-weight: 850;
        line-height: 1;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .vl-flow-node strong {
        display: block;
        color: #0f172a;
        font-size: 14px;
        font-weight: 900;
        line-height: 1.2;
        letter-spacing: 0;
        text-align: center;
        overflow-wrap: anywhere;
      }

      .vl-flow-node.is-selected .vl-flow-node-inner {
        border-color: rgba(37, 99, 235, 0.46);
        box-shadow:
          0 18px 34px rgba(37, 99, 235, 0.18),
          0 0 0 4px rgba(37, 99, 235, 0.12);
      }

      .vl-flow-node.is-pending .vl-flow-node-inner {
        border-color: rgba(217, 119, 6, 0.5);
        box-shadow:
          0 18px 34px rgba(217, 119, 6, 0.16),
          0 0 0 4px rgba(217, 119, 6, 0.12);
      }

      .vl-flow-node.is-shape-process .vl-flow-node-inner {
        border-radius: 18px;
      }

      .vl-flow-node.is-shape-start .vl-flow-node-inner,
      .vl-flow-node.is-shape-end .vl-flow-node-inner,
      .vl-flow-node.is-shape-terminator .vl-flow-node-inner {
        border-radius: 999px;
      }

      .vl-flow-node.is-shape-decision .vl-flow-node-inner {
        border-radius: 12px;
        clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
        padding: 20px 34px;
      }

      .vl-flow-node.is-shape-input .vl-flow-node-inner,
      .vl-flow-node.is-shape-output .vl-flow-node-inner {
        border-radius: 14px;
        clip-path: polygon(12% 0%, 100% 0%, 88% 100%, 0% 100%);
      }

      .vl-flow-node.is-shape-document .vl-flow-node-inner {
        border-radius: 16px 16px 24px 24px;
      }

      .vl-flow-node.is-shape-database .vl-flow-node-inner {
        border-radius: 50% / 16%;
      }

      .vl-flow-node.is-shape-connector .vl-flow-node-inner {
        border-radius: 999px;
        aspect-ratio: 1 / 1;
        padding: 10px;
      }

      .vl-editor-empty {
        position: absolute;
        top: 50%;
        left: 50%;
        width: min(360px, calc(100% - 32px));
        transform: translate(-50%, -50%);
        padding: 18px;
        border: 1px dashed rgba(37, 99, 235, 0.24);
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.82);
        text-align: center;
        box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
      }

      .vl-editor-empty h3 {
        margin: 0;
        color: #0f172a;
        font-size: 16px;
        font-weight: 900;
        line-height: 1.2;
      }

      .vl-editor-empty p {
        margin: 8px 0 0;
        color: #64748b;
        font-size: 13px;
        font-weight: 650;
        line-height: 1.45;
      }

      @media (max-width: 1180px) {
        .vl-editor-layout {
          grid-template-columns: minmax(210px, 250px) minmax(0, 1fr);
        }

        .vl-editor-side-inspector {
          grid-column: 1 / -1;
        }

        .vl-editor-board-card {
          height: 640px;
          min-height: 520px;
        }
      }

      @media (max-width: 860px) {
        .vl-editor-page {
          padding: 10px;
        }

        .vl-editor-layout {
          grid-template-columns: 1fr;
        }

        .vl-editor-board-head {
          align-items: stretch;
          flex-direction: column;
        }

        .vl-editor-board-tools {
          justify-content: space-between;
        }

        .vl-editor-board-card {
          height: 620px;
          min-height: 520px;
          border-radius: 15px;
        }
      }

      @media (max-width: 520px) {
        .vl-editor-page {
          padding: 8px;
          gap: 10px;
        }

        .vl-editor-board-card {
          padding: 10px;
          height: 580px;
          min-height: 500px;
          border-radius: 14px;
        }

        .vl-editor-board-tools {
          align-items: stretch;
          flex-direction: column;
        }

        .vl-editor-board-status,
        .vl-editor-zoom {
          width: 100%;
        }

        .vl-editor-zoom {
          justify-content: space-between;
        }

        .vl-editor-zoom-btn.is-value {
          flex: 1 1 auto;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function icon(name) {
    return `<i data-lucide="${name}" aria-hidden="true"></i>`;
  }

  function renderLucideIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  function getDiagram() {
    const activeId = app.storage.getActiveId();
    return app.storage.getById(activeId);
  }

  function getNodeTypeConfig(type) {
    return app.getNodeType(type) || {
      key: "process",
      label: "Proceso",
      shape: "process",
      defaultWidth: 190,
      defaultHeight: 86
    };
  }

  function getNodeTypeLabel(type) {
    return getNodeTypeConfig(type).label || "Nodo";
  }

  function getNodeShape(type) {
    return getNodeTypeConfig(type).shape || "process";
  }

  function getZoomValue(diagram) {
    return Number(diagram?.viewport?.zoom || 1);
  }

  function setDiagramZoom(value) {
    const diagram = getDiagram();
    if (!diagram) return 1;

    const min = 0.7;
    const max = 1.5;
    const nextZoom = Math.min(Math.max(Number(value) || 1, min), max);

    app.storage.updateDiagram(diagram.id, {
      viewport: Object.assign({}, diagram.viewport || {}, { zoom: nextZoom })
    });

    return nextZoom;
  }

  function applyZoomToStage(diagram) {
    const stage = document.getElementById("vl-editor-stage");
    const zoomLabel = document.getElementById("vl-zoom-value");
    const zoom = getZoomValue(diagram);

    if (stage) {
      stage.style.transform = "scale(" + zoom + ")";
      stage.style.transformOrigin = "0 0";
    }

    if (zoomLabel) {
      zoomLabel.textContent = Math.round(zoom * 100) + "%";
    }
  }

  function getCanvasLogicalSize() {
    const canvas = document.getElementById("vl-editor-canvas");

    if (!canvas) {
      return { width: 1400, height: 900 };
    }

    const rect = canvas.getBoundingClientRect();

    return {
      width: Math.max(1400, Math.round(rect.width)),
      height: Math.max(900, Math.round(rect.height))
    };
  }

  function normalizeNodesToCanvas() {
    const diagram = getDiagram();
    if (!diagram || !Array.isArray(diagram.nodes) || !diagram.nodes.length) return;

    const logicalSize = getCanvasLogicalSize();
    let changed = false;

    const nodes = diagram.nodes.map(function (node) {
      const width = Number(node.width || 180);
      const height = Number(node.height || 90);

      const clampedX = Math.max(16, Math.min(logicalSize.width - width - 16, Number(node.x || 0)));
      const clampedY = Math.max(16, Math.min(logicalSize.height - height - 16, Number(node.y || 0)));

      if (clampedX !== Number(node.x || 0) || clampedY !== Number(node.y || 0)) {
        changed = true;
      }

      return Object.assign({}, node, {
        x: clampedX,
        y: clampedY
      });
    });

    if (changed) {
      app.storage.updateDiagram(diagram.id, { nodes: nodes });
    }
  }

  function getNodeAnchor(node, side) {
    const x = Number(node.x || 0);
    const y = Number(node.y || 0);
    const width = Number(node.width || 0);
    const height = Number(node.height || 0);
    const shape = getNodeShape(node.type);

    if (shape === "decision") {
      if (side === "left") return { x: x, y: y + height / 2 };
      if (side === "right") return { x: x + width, y: y + height / 2 };
      if (side === "top") return { x: x + width / 2, y: y };
      return { x: x + width / 2, y: y + height };
    }

    if (shape === "database") {
      if (side === "left") return { x: x + 10, y: y + height / 2 };
      if (side === "right") return { x: x + width - 10, y: y + height / 2 };
    }

    if (shape === "connector") {
      if (side === "left") return { x: x + 6, y: y + height / 2 };
      if (side === "right") return { x: x + width - 6, y: y + height / 2 };
    }

    if (side === "left") return { x: x, y: y + height / 2 };
    if (side === "right") return { x: x + width, y: y + height / 2 };
    if (side === "top") return { x: x + width / 2, y: y };
    return { x: x + width / 2, y: y + height };
  }

  function chooseBestConnectionSides(fromNode, toNode) {
    const fromCenterX = Number(fromNode.x || 0) + Number(fromNode.width || 0) / 2;
    const fromCenterY = Number(fromNode.y || 0) + Number(fromNode.height || 0) / 2;
    const toCenterX = Number(toNode.x || 0) + Number(toNode.width || 0) / 2;
    const toCenterY = Number(toNode.y || 0) + Number(toNode.height || 0) / 2;

    const dx = toCenterX - fromCenterX;
    const dy = toCenterY - fromCenterY;

    if (Math.abs(dx) >= Math.abs(dy)) {
      return dx >= 0
        ? { from: "right", to: "left" }
        : { from: "left", to: "right" };
    }

    return dy >= 0
      ? { from: "bottom", to: "top" }
      : { from: "top", to: "bottom" };
  }

  function buildConnectionPath(fromPoint, toPoint, sides) {
    const dx = toPoint.x - fromPoint.x;
    const dy = toPoint.y - fromPoint.y;
    const horizontal = sides.from === "left" || sides.from === "right";
    const vertical = sides.from === "top" || sides.from === "bottom";

    if (horizontal) {
      const bend = Math.max(46, Math.abs(dx) * 0.34);
      const c1x = fromPoint.x + (sides.from === "right" ? bend : -bend);
      const c1y = fromPoint.y;
      const c2x = toPoint.x + (sides.to === "left" ? -bend : bend);
      const c2y = toPoint.y;

      return [
        "M", fromPoint.x, fromPoint.y,
        "C", c1x, c1y, c2x, c2y, toPoint.x, toPoint.y
      ].join(" ");
    }

    if (vertical) {
      const bend = Math.max(46, Math.abs(dy) * 0.34);
      const c1x = fromPoint.x;
      const c1y = fromPoint.y + (sides.from === "bottom" ? bend : -bend);
      const c2x = toPoint.x;
      const c2y = toPoint.y + (sides.to === "top" ? -bend : bend);

      return [
        "M", fromPoint.x, fromPoint.y,
        "C", c1x, c1y, c2x, c2y, toPoint.x, toPoint.y
      ].join(" ");
    }

    return [
      "M", fromPoint.x, fromPoint.y,
      "L", toPoint.x, toPoint.y
    ].join(" ");
  }

  function deleteConnectionById(connectionId) {
    if (!connectionId) return;

    app.connections.remove(connectionId);

    if (app.selection && typeof app.selection.clear === "function") {
      app.selection.clear();
    }

    if (app.state && typeof app.state.setPendingConnectionFrom === "function") {
      app.state.setPendingConnectionFrom(null);
    }

    app.showToast("Conexión eliminada.");
    app.render();
  }

  function buildConnectionsSvg(diagram) {
    const connections = Array.isArray(diagram?.connections) ? diagram.connections : [];
    const nodes = Array.isArray(diagram?.nodes) ? diagram.nodes : [];
    const logicalSize = getCanvasLogicalSize();
    const selection = app.selection && typeof app.selection.get === "function"
      ? app.selection.get()
      : { type: null, id: null };

    const paths = connections.map(function (connection) {
      const fromNode = nodes.find(function (node) {
        return node.id === connection.from;
      });

      const toNode = nodes.find(function (node) {
        return node.id === connection.to;
      });

      if (!fromNode || !toNode) return "";

      const sides = chooseBestConnectionSides(fromNode, toNode);
      const from = getNodeAnchor(fromNode, sides.from);
      const to = getNodeAnchor(toNode, sides.to);
      const path = buildConnectionPath(from, to, sides);
      const isSelected = selection.type === "connection" && selection.id === connection.id;
      const deleteX = Math.round((from.x + to.x) / 2);
      const deleteY = Math.round((from.y + to.y) / 2) - 18;

      return `
        <g class="vl-connection-group ${isSelected ? "is-selected" : ""}" data-connection-id="${app.helpers.escapeHtml(connection.id)}">
          <path class="vl-connection-hit" d="${path}" data-connection-click="${app.helpers.escapeHtml(connection.id)}"></path>
          <path class="vl-connection-path-shadow" d="${path}"></path>
          <path class="vl-connection-path" d="${path}"></path>

          ${
            isSelected
              ? `
                <g
                  class="vl-connection-delete"
                  data-connection-delete="${app.helpers.escapeHtml(connection.id)}"
                  transform="translate(${deleteX}, ${deleteY})"
                >
                  <rect class="vl-connection-delete-bg" x="-34" y="-14" width="68" height="28" rx="14"></rect>
                  <text class="vl-connection-delete-text" x="0" y="1">Eliminar</text>
                </g>
              `
              : ""
          }
        </g>
      `;
    }).join("");

    return `
      <svg
        class="vl-connections-layer"
        xmlns="http://www.w3.org/2000/svg"
        width="${logicalSize.width}"
        height="${logicalSize.height}"
        viewBox="0 0 ${logicalSize.width} ${logicalSize.height}"
        preserveAspectRatio="none"
      >
        ${paths}
      </svg>
    `;
  }

  function buildCanvasNodes(diagram) {
    const nodes = Array.isArray(diagram?.nodes) ? diagram.nodes : [];
    const selected = app.selection.get();
    const pendingConnectionFrom = app.state.pendingConnectionFrom;

    if (!nodes.length) {
      return `
        <div class="vl-editor-empty">
          <h3>Sin nodos todavía</h3>
          <p>Agregá el primero desde la barra superior y empezá a trabajar el flujo.</p>
        </div>
      `;
    }

    return nodes.map(function (node, index) {
      const isSelected = selected.type === "node" && selected.id === node.id;
      const isPending = pendingConnectionFrom === node.id;
      const shape = getNodeShape(node.type);

      return `
        <div
          class="vl-flow-node is-${app.helpers.escapeHtml(node.type)} is-shape-${app.helpers.escapeHtml(shape)} ${isSelected ? "is-selected" : ""} ${isPending ? "is-pending" : ""}"
          data-flow-node="${app.helpers.escapeHtml(node.id)}"
          title="Arrastrar: mover. Click: seleccionar. Doble click: conectar con el nodo seleccionado."
          style="
            left:${Number(node.x || 0)}px;
            top:${Number(node.y || 0)}px;
            width:${Number(node.width || 0)}px;
            min-height:${Number(node.height || 0)}px;
          "
        >
          <div class="vl-flow-node-inner">
            <div class="vl-flow-node-head">
              <span class="vl-flow-node-index">${index + 1}</span>
              <span class="vl-flow-node-kind">${app.helpers.escapeHtml(getNodeTypeLabel(node.type))}</span>
            </div>
            <strong>${app.helpers.escapeHtml(node.label)}</strong>
            <div class="vl-flow-node-foot">
              <span>${app.helpers.escapeHtml(node.type)}</span>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  function refreshCanvasLayers() {
    const refreshed = getDiagram();
    if (!refreshed) return;

    const stage = document.getElementById("vl-editor-stage");
    const nodesLayer = document.getElementById("vl-canvas-nodes");
    const connectionsLayer = document.getElementById("vl-connections-layer-wrap");
    const logicalSize = getCanvasLogicalSize();

    if (stage) {
      stage.style.width = logicalSize.width + "px";
      stage.style.height = logicalSize.height + "px";
    }

    if (connectionsLayer) {
      connectionsLayer.innerHTML = buildConnectionsSvg(refreshed);
    }

    if (nodesLayer) {
      nodesLayer.innerHTML = buildCanvasNodes(refreshed);
    }

    applyZoomToStage(refreshed);
    bindCanvasInteractions(refreshed);
    renderLucideIcons();
  }

  function tryCreateConnection(fromId, toId) {
    if (!fromId || !toId || fromId === toId) {
      return false;
    }

    const created = app.connections.create({
      from: fromId,
      to: toId
    });

    if (!created) {
      app.showToast("No se pudo crear la conexión.", "warning");
      return false;
    }

    app.state.setPendingConnectionFrom(null);
    app.selection.selectNode(toId);
    app.showToast("Conexión creada.");
    app.render();
    return true;
  }

  function bindZoomControls() {
    const zoomInButton = document.getElementById("vl-zoom-in");
    const zoomOutButton = document.getElementById("vl-zoom-out");
    const zoomResetButton = document.getElementById("vl-zoom-reset");

    if (zoomInButton) {
      zoomInButton.addEventListener("click", function () {
        const diagram = getDiagram();
        if (!diagram) return;
        setDiagramZoom(getZoomValue(diagram) + 0.1);
        refreshCanvasLayers();
      });
    }

    if (zoomOutButton) {
      zoomOutButton.addEventListener("click", function () {
        const diagram = getDiagram();
        if (!diagram) return;
        setDiagramZoom(getZoomValue(diagram) - 0.1);
        refreshCanvasLayers();
      });
    }

    if (zoomResetButton) {
      zoomResetButton.addEventListener("click", function () {
        setDiagramZoom(1);
        refreshCanvasLayers();
      });
    }
  }

  function bindConnectionSelection() {
    document.querySelectorAll("[data-connection-click]").forEach(function (path) {
      path.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        const connectionId = path.getAttribute("data-connection-click");
        if (!connectionId) return;

        if (app.state.currentTool === "delete-connection") {
          deleteConnectionById(connectionId);
          return;
        }

        if (app.selection && typeof app.selection.selectConnection === "function") {
          app.selection.selectConnection(connectionId);
        } else if (app.selection && typeof app.selection.set === "function") {
          app.selection.set("connection", connectionId);
        }

        if (app.state && typeof app.state.setPendingConnectionFrom === "function") {
          app.state.setPendingConnectionFrom(null);
        }

        app.showToast("Conexión seleccionada.");
        app.render();
      });

      path.addEventListener("dblclick", function (event) {
        event.preventDefault();
        event.stopPropagation();

        const connectionId = path.getAttribute("data-connection-click");
        deleteConnectionById(connectionId);
      });
    });

    document.querySelectorAll("[data-connection-delete]").forEach(function (button) {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        const connectionId = button.getAttribute("data-connection-delete");
        deleteConnectionById(connectionId);
      });
    });
  }

  function bindCanvasInteractions(diagram) {
    const canvas = document.getElementById("vl-editor-canvas");
    const stage = document.getElementById("vl-editor-stage");
    if (!canvas || !stage || !diagram) return;

    const logicalSize = getCanvasLogicalSize();

    if (app.state.currentTool === "delete-connection") {
      canvas.classList.add("is-delete-connection");
    } else {
      canvas.classList.remove("is-delete-connection");
    }

    bindConnectionSelection();

    document.querySelectorAll("[data-flow-node]").forEach(function (nodeElement) {
      const nodeId = nodeElement.getAttribute("data-flow-node");

      nodeElement.addEventListener("click", function (event) {
        if (nodeElement.dataset.vlWasDragging === "true") {
          event.preventDefault();
          event.stopPropagation();
          nodeElement.dataset.vlWasDragging = "false";
          return;
        }

        event.stopPropagation();

        if (app.state.currentTool === "delete-connection") {
          app.showToast("Tocá una línea para borrar la conexión.");
          return;
        }

        const selection = app.selection.get();
        const selectedId = selection.type === "node" ? selection.id : null;

        if (app.state.currentTool === "connect") {
          const sourceId = app.state.pendingConnectionFrom || selectedId;

          if (!sourceId) {
            app.state.setPendingConnectionFrom(nodeId);
            app.selection.selectNode(nodeId);
            app.showToast("Origen seleccionado. Ahora hacé click en el nodo destino.");
            app.render();
            return;
          }

          if (sourceId === nodeId) {
            app.state.setPendingConnectionFrom(nodeId);
            app.selection.selectNode(nodeId);
            app.showToast("Elegí otro nodo como destino.");
            app.render();
            return;
          }

          tryCreateConnection(sourceId, nodeId);
          return;
        }

        app.state.setPendingConnectionFrom(null);
        app.selection.selectNode(nodeId);
        app.render();
      });

      nodeElement.addEventListener("dblclick", function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (app.state.currentTool === "delete-connection") return;

        const selection = app.selection.get();
        const selectedId = selection.type === "node" ? selection.id : null;

        if (selectedId && selectedId !== nodeId) {
          tryCreateConnection(selectedId, nodeId);
        }
      });

      nodeElement.addEventListener("pointerdown", function (event) {
        if (app.state.currentTool !== "select") return;
        if (event.pointerType === "mouse" && event.button !== 0) return;

        const targetNode = diagram.nodes.find(function (item) {
          return item.id === nodeId;
        });

        if (!targetNode) return;

        event.preventDefault();
        event.stopPropagation();

        if (typeof nodeElement.setPointerCapture === "function") {
          try {
            nodeElement.setPointerCapture(event.pointerId);
          } catch (error) {
            // Algunos navegadores móviles pueden rechazar captura si el nodo se re-renderiza.
          }
        }

        app.selection.selectNode(nodeId);
        app.state.setDragging(true);

        const zoom = getZoomValue(getDiagram());
        const startPointerX = event.clientX;
        const startPointerY = event.clientY;
        const startNodeX = Number(targetNode.x || 0);
        const startNodeY = Number(targetNode.y || 0);
        const nodeWidth = Number(targetNode.width || 180);
        const nodeHeight = Number(targetNode.height || 90);

        let moved = false;
        let latestX = startNodeX;
        let latestY = startNodeY;
        let rafId = null;

        function paintMove() {
          rafId = null;
          app.nodes.move(nodeId, latestX, latestY);
          refreshCanvasLayers();
        }

        function onPointerMove(moveEvent) {
          moveEvent.preventDefault();

          const deltaX = (moveEvent.clientX - startPointerX) / zoom;
          const deltaY = (moveEvent.clientY - startPointerY) / zoom;

          if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
            moved = true;
            nodeElement.dataset.vlWasDragging = "true";
          }

          latestX = Math.max(
            16,
            Math.min(logicalSize.width - nodeWidth - 16, startNodeX + deltaX)
          );

          latestY = Math.max(
            16,
            Math.min(logicalSize.height - nodeHeight - 16, startNodeY + deltaY)
          );

          if (!rafId) {
            rafId = window.requestAnimationFrame(paintMove);
          }
        }

        function onPointerUp(upEvent) {
          upEvent.preventDefault();

          app.state.setDragging(false);

          if (rafId) {
            window.cancelAnimationFrame(rafId);
            rafId = null;
          }

          if (moved) {
            app.nodes.move(nodeId, latestX, latestY);
          }

          document.removeEventListener("pointermove", onPointerMove);
          document.removeEventListener("pointerup", onPointerUp);
          document.removeEventListener("pointercancel", onPointerUp);

          if (typeof nodeElement.releasePointerCapture === "function") {
            try {
              nodeElement.releasePointerCapture(event.pointerId);
            } catch (error) {
              // Sin impacto funcional.
            }
          }

          normalizeNodesToCanvas();

          if (moved) {
            app.render();
          }
        }

        document.addEventListener("pointermove", onPointerMove, { passive: false });
        document.addEventListener("pointerup", onPointerUp, { passive: false });
        document.addEventListener("pointercancel", onPointerUp, { passive: false });
      });
    });

    if (!canvas.dataset.vlCanvasBound) {
      canvas.dataset.vlCanvasBound = "true";

      canvas.addEventListener("click", function () {
        if (app.state.currentTool === "connect") return;
        if (app.state.currentTool === "delete-connection") return;

        if (app.selection && typeof app.selection.clear === "function") {
          app.selection.clear();
        }

        app.state.setPendingConnectionFrom(null);
        app.render();
      });
    }
  }

  function bindEditorKeyboard() {
    if (editorKeydownBound) return;
    editorKeydownBound = true;

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        if (app.state && typeof app.state.setTool === "function") {
          app.state.setTool("select");
        }

        if (app.selection && typeof app.selection.clear === "function") {
          app.selection.clear();
        }

        if (app.state && typeof app.state.setPendingConnectionFrom === "function") {
          app.state.setPendingConnectionFrom(null);
        }

        app.render();
        return;
      }

      if (event.key !== "Delete" && event.key !== "Backspace") return;

      const tag = document.activeElement && document.activeElement.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      const selectionState = app.selection.get();
      if (!selectionState || !selectionState.id) return;

      if (selectionState.type === "connection") {
        event.preventDefault();
        deleteConnectionById(selectionState.id);
        return;
      }

      if (selectionState.type === "node") {
        event.preventDefault();
        app.nodes.remove(selectionState.id);
        app.selection.clear();
        app.showToast("Nodo eliminado.");
        app.render();
      }
    });
  }

  app.pages.editor = {
    render: function renderEditor() {
      injectEditorStyles();

      const activeId = app.storage.getActiveId();
      const diagram = app.storage.getById(activeId);
      const currentTool = app.state.currentTool || "select";
      const logicalSize = getCanvasLogicalSize();

      return `
        <div class="vl-shell">
          ${app.ui.header({ activeRoute: "editor" })}

          <main class="vl-editor-page">
            ${app.ui.toolbar()}

            <section class="vl-editor-layout">
              <aside class="vl-editor-side">${app.ui.sidebar()}</aside>

              <section class="vl-editor-main">
                <div class="vl-editor-board-card">
                  <div class="vl-editor-board-head">
                    <div>
                      <h3>${app.helpers.escapeHtml(diagram?.name || "Sin diagrama activo")}</h3>
                      <p>${
                        currentTool === "delete-connection"
                          ? "Modo borrar conexión activo: tocá una línea para eliminarla directo. Escape vuelve a seleccionar."
                          : "Móvil: mantené y arrastrá un nodo para moverlo. Conectar: click en origen y destino."
                      }</p>
                    </div>

                    <div class="vl-editor-board-tools">
                      <span class="vl-editor-board-status ${currentTool === "delete-connection" ? "is-danger" : ""}">
                        ${icon(
                          currentTool === "delete-connection"
                            ? "unlink"
                            : currentTool === "connect"
                              ? "workflow"
                              : "mouse-pointer-2"
                        )}
                        <span>${
                          currentTool === "delete-connection"
                            ? "Modo borrar"
                            : currentTool === "connect"
                              ? "Modo conectar"
                              : "Modo seleccionar"
                        }</span>
                      </span>

                      <div class="vl-editor-zoom" aria-label="Controles de zoom">
                        <button class="vl-editor-zoom-btn" id="vl-zoom-out" type="button" title="Alejar" aria-label="Alejar">
                          ${icon("minus")}
                        </button>

                        <button class="vl-editor-zoom-btn is-value" id="vl-zoom-reset" type="button" title="Restablecer zoom" aria-label="Restablecer zoom">
                          <span id="vl-zoom-value">${Math.round(getZoomValue(diagram) * 100)}%</span>
                        </button>

                        <button class="vl-editor-zoom-btn" id="vl-zoom-in" type="button" title="Acercar" aria-label="Acercar">
                          ${icon("plus")}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="vl-editor-canvas-wrap">
                    <div class="vl-editor-canvas ${currentTool === "delete-connection" ? "is-delete-connection" : ""}" id="vl-editor-canvas">
                      <div
                        class="vl-editor-stage"
                        id="vl-editor-stage"
                        style="width:${logicalSize.width}px;height:${logicalSize.height}px;"
                      >
                        <div class="vl-canvas-grid"></div>
                        <div id="vl-connections-layer-wrap">
                          ${buildConnectionsSvg(diagram)}
                        </div>
                        <div class="vl-canvas-nodes" id="vl-canvas-nodes">
                          ${buildCanvasNodes(diagram)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <aside class="vl-editor-side vl-editor-side-inspector">
                ${app.ui.inspectorPanel(diagram)}
              </aside>
            </section>
          </main>
        </div>
      `;
    },

    bind: function bindEditor() {
      injectEditorStyles();

      app.ui.bindHeader();
      app.ui.bindSidebar();
      app.ui.bindToolbar();

      const activeId = app.storage.getActiveId();
      let diagram = app.storage.getById(activeId);

      if (!diagram) {
        const item = app.storage.createDiagram("Nuevo diagrama");
        app.storage.setActiveId(item.id);
        diagram = item;
      }

      const selection = app.selection.get();
      if (!selection.id && Array.isArray(diagram.nodes) && diagram.nodes.length) {
        app.selection.selectNode(diagram.nodes[0].id);
      }

      app.ui.bindInspectorPanel();
      normalizeNodesToCanvas();
      bindZoomControls();
      refreshCanvasLayers();
      bindCanvasInteractions(getDiagram());
      bindEditorKeyboard();
      renderLucideIcons();
    }
  };
})();
