/* src/ui/toolbar.js */
"use strict";

(function registerToolbar() {
  const app = window.VisualLogic;

  const TOOLBAR_STYLE_ID = "vl-toolbar-own-styles";

  function injectToolbarStyles() {
    if (document.getElementById(TOOLBAR_STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = TOOLBAR_STYLE_ID;
    style.textContent = `
      .vl-toolbar {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        padding: 10px;
        border: 1px solid rgba(15, 23, 42, 0.08);
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.96);
        box-shadow:
          0 14px 32px rgba(15, 23, 42, 0.07),
          inset 0 1px 0 rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        box-sizing: border-box;
      }

      .vl-toolbar-left {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 7px;
        flex-wrap: wrap;
      }

      .vl-toolbar .vl-btn {
        min-height: 38px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
        padding: 0 12px;
        border: 1px solid rgba(15, 23, 42, 0.1);
        border-radius: 11px;
        background: rgba(255, 255, 255, 0.88);
        color: #1e293b;
        font-size: 12px;
        font-weight: 800;
        line-height: 1;
        letter-spacing: 0;
        cursor: pointer;
        user-select: none;
        white-space: nowrap;
        box-shadow: 0 8px 18px rgba(15, 23, 42, 0.045);
        transition:
          transform 150ms ease,
          box-shadow 150ms ease,
          border-color 150ms ease,
          background 150ms ease,
          color 150ms ease,
          opacity 150ms ease;
      }

      .vl-toolbar .vl-btn:hover {
        transform: translateY(-1px);
        border-color: rgba(37, 99, 235, 0.22);
        background: #ffffff;
        box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
      }

      .vl-toolbar .vl-btn:active {
        transform: translateY(0);
      }

      .vl-toolbar .vl-btn:focus-visible {
        outline: 3px solid rgba(37, 99, 235, 0.2);
        outline-offset: 2px;
      }

      .vl-toolbar .vl-btn svg,
      .vl-toolbar .vl-btn i {
        width: 15px;
        height: 15px;
        display: block;
        flex: 0 0 auto;
        stroke-width: 2.35;
      }

      .vl-toolbar .vl-btn-primary {
        border-color: rgba(37, 99, 235, 0.24);
        background: #2563eb;
        color: #ffffff;
        box-shadow: 0 12px 24px rgba(37, 99, 235, 0.2);
      }

      .vl-toolbar .vl-btn-primary:hover {
        background: #1d4ed8;
        color: #ffffff;
      }

      .vl-toolbar .vl-btn-ghost {
        background: rgba(248, 250, 252, 0.86);
        color: #334155;
      }

      .vl-toolbar .vl-btn-danger {
        border-color: rgba(220, 38, 38, 0.2);
        background: rgba(254, 242, 242, 0.92);
        color: #b91c1c;
      }

      .vl-toolbar .vl-btn-danger:hover,
      .vl-toolbar .vl-btn-danger.vl-btn-primary {
        border-color: rgba(220, 38, 38, 0.34);
        background: #dc2626;
        color: #ffffff;
        box-shadow: 0 12px 24px rgba(220, 38, 38, 0.2);
      }

      .vl-toolbar .vl-btn:disabled,
      .vl-toolbar .vl-btn[disabled] {
        cursor: not-allowed;
        opacity: 0.46;
        transform: none;
        box-shadow: none;
      }

      .vl-toolbar-divider {
        width: 1px;
        height: 26px;
        margin: 0 2px;
        background: rgba(15, 23, 42, 0.1);
        flex: 0 0 auto;
      }

      @media (max-width: 920px) {
        .vl-toolbar {
          padding: 9px;
          border-radius: 14px;
        }

        .vl-toolbar-left {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 7px;
        }

        .vl-toolbar .vl-btn {
          width: 100%;
          min-width: 0;
          padding: 0 9px;
        }

        .vl-toolbar-divider {
          display: none;
        }
      }

      @media (max-width: 680px) {
        .vl-toolbar-left {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .vl-toolbar .vl-btn {
          min-height: 40px;
          font-size: 12px;
        }
      }

      @media (max-width: 420px) {
        .vl-toolbar-left {
          grid-template-columns: 1fr;
        }

        .vl-toolbar .vl-btn {
          justify-content: flex-start;
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

  app.ui.toolbar = function toolbar() {
    injectToolbarStyles();

    const currentTool = app.state.currentTool || "select";

    return `
      <div class="vl-toolbar">
        <div class="vl-toolbar-left">
          <button class="vl-btn vl-btn-primary" id="vl-save-diagram" type="button" title="Guardar diagrama" aria-label="Guardar diagrama">
            ${icon("save")}
            <span>Guardar</span>
          </button>

          <button class="vl-btn" id="vl-add-node" type="button" title="Agregar nodo" aria-label="Agregar nodo">
            ${icon("plus")}
            <span>Agregar nodo</span>
          </button>

          <span class="vl-toolbar-divider" aria-hidden="true"></span>

          <button class="vl-btn ${currentTool === "select" ? "vl-btn-primary" : ""}" id="vl-tool-select" type="button" title="Seleccionar" aria-label="Seleccionar">
            ${icon("mouse-pointer-2")}
            <span>Seleccionar</span>
          </button>

          <button class="vl-btn ${currentTool === "connect" ? "vl-btn-primary" : ""}" id="vl-tool-connect" type="button" title="Conectar nodos" aria-label="Conectar nodos">
            ${icon("workflow")}
            <span>Conectar</span>
          </button>

          <button class="vl-btn vl-btn-danger ${currentTool === "delete-connection" ? "vl-btn-primary" : ""}" id="vl-tool-delete-connection" type="button" title="Modo borrar conexión" aria-label="Modo borrar conexión">
            ${icon("unlink")}
            <span>Borrar conexión</span>
          </button>

          <span class="vl-toolbar-divider" aria-hidden="true"></span>

          <button class="vl-btn" id="vl-generate-output" type="button" title="Generar lógica" aria-label="Generar lógica">
            ${icon("sparkles")}
            <span>Generar lógica</span>
          </button>

          <button class="vl-btn vl-btn-ghost" id="vl-open-export" type="button" title="Ver exportación" aria-label="Ver exportación">
            ${icon("external-link")}
            <span>Exportación</span>
          </button>

          <span class="vl-toolbar-divider" aria-hidden="true"></span>

          <button class="vl-btn vl-btn-danger" id="vl-clear-board" type="button" title="Limpiar pizarra" aria-label="Limpiar pizarra">
            ${icon("trash-2")}
            <span>Limpiar pizarra</span>
          </button>
        </div>
      </div>
    `;
  };

  app.ui.bindToolbar = function bindToolbar() {
    injectToolbarStyles();
    renderLucideIcons();

    const saveButton = document.getElementById("vl-save-diagram");
    const addNodeButton = document.getElementById("vl-add-node");
    const selectToolButton = document.getElementById("vl-tool-select");
    const connectToolButton = document.getElementById("vl-tool-connect");
    const deleteConnectionToolButton = document.getElementById("vl-tool-delete-connection");
    const generateButton = document.getElementById("vl-generate-output");
    const openExportButton = document.getElementById("vl-open-export");
    const clearBoardButton = document.getElementById("vl-clear-board");

    if (saveButton) {
      saveButton.addEventListener("click", function () {
        const activeId = app.storage.getActiveId();
        const item = app.storage.getById(activeId);

        if (!item) {
          app.showToast("No hay un diagrama activo.", "warning");
          return;
        }

        app.storage.updateDiagram(activeId, {});
        app.showToast("Diagrama guardado.");
      });
    }

    if (addNodeButton) {
      addNodeButton.addEventListener("click", function () {
        const activeId = app.storage.getActiveId();
        const item = app.storage.getById(activeId);

        if (!item) {
          app.showToast("No hay un diagrama activo.", "warning");
          return;
        }

        const nodeType = app.state.selectedNodeType || "process";
        const typeConfig = app.getNodeType(nodeType);

        const node = app.nodes.create({
          type: nodeType,
          label: typeConfig.label,
          x: 140 + Math.floor(Math.random() * 140),
          y: 120 + Math.floor(Math.random() * 160),
          width: typeConfig.defaultWidth,
          height: typeConfig.defaultHeight
        });

        if (!node) {
          app.showToast("No se pudo crear el nodo.", "danger");
          return;
        }

        if (app.selection && typeof app.selection.selectNode === "function") {
          app.selection.selectNode(node.id);
        }

        app.showToast("Nodo agregado.");
        app.render();
      });
    }

    if (selectToolButton) {
      selectToolButton.addEventListener("click", function () {
        app.state.setTool("select");
        app.state.setPendingConnectionFrom(null);
        app.showToast("Modo selección activo.");
        app.render();
      });
    }

    if (connectToolButton) {
      connectToolButton.addEventListener("click", function () {
        app.state.setTool("connect");
        app.state.setPendingConnectionFrom(null);
        app.showToast("Modo conexión activo. Click en origen y destino.");
        app.render();
      });
    }

    if (deleteConnectionToolButton) {
      deleteConnectionToolButton.addEventListener("click", function () {
        app.state.setTool("delete-connection");
        app.state.setPendingConnectionFrom(null);

        if (app.selection && typeof app.selection.clear === "function") {
          app.selection.clear();
        }

        app.showToast("Modo borrar conexión activo. Hacé click en una línea para eliminarla.");
        app.render();
      });
    }

    if (generateButton) {
      generateButton.addEventListener("click", function () {
        const activeId = app.storage.getActiveId();
        const item = app.storage.getById(activeId);

        if (!item) {
          app.showToast("No hay un diagrama activo.", "warning");
          return;
        }

        const parsed = app.translator.parse(item);
        const pseudocode = app.translator.toPseudocode(parsed);
        const javascript = app.translator.toJavaScript(parsed);

        app.storage.updateDiagram(activeId, {
          pseudocode: pseudocode,
          javascript: javascript
        });

        if (app.state && typeof app.state.markGenerated === "function") {
          app.state.markGenerated();
        }

        app.showToast("Lógica generada correctamente.");
      });
    }

    if (openExportButton) {
      openExportButton.addEventListener("click", function () {
        app.navigate("export");
      });
    }

    if (clearBoardButton) {
      clearBoardButton.addEventListener("click", function () {
        const activeId = app.storage.getActiveId();
        const item = app.storage.getById(activeId);

        if (!item) {
          app.showToast("No hay un diagrama activo.", "warning");
          return;
        }

        const confirmed = window.confirm("¿Querés limpiar toda la pizarra? Se eliminarán nodos y conexiones.");
        if (!confirmed) return;

        app.storage.updateDiagram(activeId, {
          nodes: [],
          connections: []
        });

        if (app.selection && typeof app.selection.clear === "function") {
          app.selection.clear();
        }

        if (app.state && typeof app.state.setPendingConnectionFrom === "function") {
          app.state.setPendingConnectionFrom(null);
        }

        if (app.state && typeof app.state.setTool === "function") {
          app.state.setTool("select");
        }

        app.showToast("Pizarra limpiada.");
        app.render();
      });
    }
  };
})();