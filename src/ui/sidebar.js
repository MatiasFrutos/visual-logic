/* src/ui/sidebar.js */
"use strict";

(function registerSidebar() {
  const app = window.VisualLogic;

  const SIDEBAR_STYLE_ID = "vl-sidebar-own-styles";

  function injectSidebarStyles() {
    if (document.getElementById(SIDEBAR_STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = SIDEBAR_STYLE_ID;
    style.textContent = `
      .vl-panel {
        width: 100%;
        min-width: 0;
        height: 100%;
        box-sizing: border-box;
      }

      .vl-panel-inner {
        width: 100%;
        height: 100%;
        min-height: 0;
        display: flex;
        flex-direction: column;
        gap: 14px;
        padding: 14px;
        border: 1px solid rgba(15, 23, 42, 0.08);
        border-radius: 18px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.94));
        box-shadow:
          0 18px 40px rgba(15, 23, 42, 0.08),
          inset 0 1px 0 rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        box-sizing: border-box;
        overflow: hidden;
      }

      .vl-split {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
      }

      .vl-section-title {
        margin: 0;
        color: #0f172a;
        font-size: 14px;
        font-weight: 850;
        line-height: 1.2;
        letter-spacing: 0;
      }

      .vl-section-subtitle {
        margin: 5px 0 0;
        max-width: 220px;
        color: #64748b;
        font-size: 12px;
        font-weight: 600;
        line-height: 1.45;
        letter-spacing: 0;
      }

      .vl-badge {
        min-height: 24px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0 9px;
        border: 1px solid rgba(37, 99, 235, 0.16);
        border-radius: 999px;
        background: rgba(37, 99, 235, 0.08);
        color: #1d4ed8;
        font-size: 11px;
        font-weight: 850;
        line-height: 1;
        white-space: nowrap;
      }

      .vl-divider {
        width: 100%;
        height: 1px;
        background: rgba(15, 23, 42, 0.09);
        flex: 0 0 auto;
      }

      .vl-list {
        min-height: 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
        overflow: auto;
        padding-right: 2px;
        scrollbar-width: thin;
        scrollbar-color: rgba(148, 163, 184, 0.6) transparent;
      }

      .vl-list::-webkit-scrollbar {
        width: 8px;
      }

      .vl-list::-webkit-scrollbar-track {
        background: transparent;
      }

      .vl-list::-webkit-scrollbar-thumb {
        border-radius: 999px;
        background: rgba(148, 163, 184, 0.55);
      }

      .vl-node-type {
        width: 100%;
        min-height: 56px;
        display: grid;
        grid-template-columns: 36px minmax(0, 1fr) 26px;
        align-items: center;
        gap: 10px;
        padding: 9px 10px;
        border: 1px solid rgba(15, 23, 42, 0.09);
        border-radius: 14px;
        background: rgba(255, 255, 255, 0.88);
        color: #1e293b;
        cursor: pointer;
        text-align: left;
        user-select: none;
        box-shadow: 0 8px 18px rgba(15, 23, 42, 0.045);
        box-sizing: border-box;
        transition:
          transform 160ms ease,
          box-shadow 160ms ease,
          border-color 160ms ease,
          background 160ms ease,
          color 160ms ease;
      }

      .vl-node-type:hover {
        transform: translateY(-1px);
        border-color: rgba(37, 99, 235, 0.22);
        background: #ffffff;
        box-shadow: 0 14px 26px rgba(15, 23, 42, 0.09);
      }

      .vl-node-type:active {
        transform: translateY(0);
        box-shadow: 0 8px 16px rgba(15, 23, 42, 0.06);
      }

      .vl-node-type:focus-visible {
        outline: 3px solid rgba(37, 99, 235, 0.2);
        outline-offset: 2px;
      }

      .vl-node-type.is-active {
        border-color: rgba(37, 99, 235, 0.28);
        background:
          linear-gradient(180deg, rgba(37, 99, 235, 0.1), rgba(37, 99, 235, 0.05)),
          #ffffff;
        color: #1d4ed8;
        box-shadow: 0 14px 28px rgba(37, 99, 235, 0.13);
      }

      .vl-node-type-icon {
        width: 36px;
        height: 36px;
        min-width: 36px;
        min-height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        align-self: center;
        justify-self: center;
        border: 1px solid rgba(15, 23, 42, 0.08);
        border-radius: 12px;
        background: rgba(248, 250, 252, 0.95);
        color: #334155;
        box-sizing: border-box;
        line-height: 0;
        overflow: hidden;
      }

      .vl-node-type-icon i,
      .vl-node-type-icon svg {
        width: 17px;
        height: 17px;
        min-width: 17px;
        min-height: 17px;
        display: block;
        flex: 0 0 auto;
        stroke-width: 2.25;
      }

      .vl-node-type.is-active .vl-node-type-icon {
        border-color: rgba(37, 99, 235, 0.18);
        background: rgba(37, 99, 235, 0.1);
        color: #2563eb;
      }

      .vl-node-type-copy {
        min-width: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 4px;
        overflow: hidden;
      }

      .vl-node-type-title {
        width: 100%;
        min-width: 0;
        display: block;
        color: inherit;
        font-size: 13px;
        font-weight: 800;
        line-height: 1.15;
        letter-spacing: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .vl-node-type-meta {
        width: 100%;
        min-width: 0;
        display: block;
        color: #64748b;
        font-size: 11px;
        font-weight: 700;
        line-height: 1.15;
        letter-spacing: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .vl-node-type.is-active .vl-node-type-meta {
        color: #2563eb;
      }

      .vl-node-type-action {
        width: 26px;
        height: 26px;
        min-width: 26px;
        min-height: 26px;
        display: flex;
        align-items: center;
        justify-content: center;
        align-self: center;
        justify-self: center;
        border-radius: 999px;
        color: #94a3b8;
        line-height: 0;
        opacity: 0.9;
        box-sizing: border-box;
      }

      .vl-node-type-action i,
      .vl-node-type-action svg {
        width: 15px;
        height: 15px;
        min-width: 15px;
        min-height: 15px;
        display: block;
        flex: 0 0 auto;
        stroke-width: 2.35;
      }

      .vl-node-type.is-active .vl-node-type-action {
        background: rgba(37, 99, 235, 0.1);
        color: #2563eb;
        opacity: 1;
      }

      @media (max-width: 1024px) {
        .vl-panel-inner {
          padding: 12px;
          border-radius: 16px;
        }

        .vl-list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
          overflow: visible;
          padding-right: 0;
        }
      }

      @media (max-width: 680px) {
        .vl-split {
          align-items: center;
        }

        .vl-section-subtitle {
          display: none;
        }

        .vl-list {
          grid-template-columns: 1fr;
        }

        .vl-node-type {
          min-height: 52px;
          border-radius: 13px;
        }
      }

      @media (max-width: 420px) {
        .vl-panel-inner {
          padding: 10px;
          border-radius: 14px;
          gap: 12px;
        }

        .vl-node-type {
          grid-template-columns: 34px minmax(0, 1fr) 24px;
          padding: 8px;
        }

        .vl-node-type-icon {
          width: 34px;
          height: 34px;
          min-width: 34px;
          min-height: 34px;
          border-radius: 11px;
        }

        .vl-node-type-action {
          width: 24px;
          height: 24px;
          min-width: 24px;
          min-height: 24px;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function getTypes() {
    return Array.isArray(app.nodeTypes) ? app.nodeTypes : [];
  }

  function icon(name) {
    return `<i data-lucide="${name}" aria-hidden="true"></i>`;
  }

  function getNodeIcon(type) {
    const key = String(type && type.key ? type.key : "").toLowerCase();
    const label = String(type && type.label ? type.label : "").toLowerCase();
    const value = key + " " + label;

    if (value.includes("start") || value.includes("inicio")) return "play";
    if (value.includes("end") || value.includes("fin")) return "circle-stop";
    if (value.includes("decision") || value.includes("condicion") || value.includes("condición")) return "git-branch";
    if (value.includes("input") || value.includes("entrada")) return "log-in";
    if (value.includes("output") || value.includes("salida")) return "log-out";
    if (value.includes("database") || value.includes("data") || value.includes("dato")) return "database";
    if (value.includes("document") || value.includes("documento") || value.includes("doc")) return "file-text";
    if (value.includes("delay") || value.includes("espera")) return "timer";
    if (value.includes("manual")) return "hand";
    if (value.includes("predefined") || value.includes("subproceso")) return "component";
    if (value.includes("connector") || value.includes("conector")) return "circle-dot";
    if (value.includes("process") || value.includes("proceso")) return "box";

    return "square-dashed";
  }

  function renderLucideIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  app.ui.sidebar = function sidebar() {
    injectSidebarStyles();

    const types = getTypes();

    return `
      <aside class="vl-panel">
        <div class="vl-panel-inner">
          <div class="vl-split">
            <div>
              <h3 class="vl-section-title">Bloques</h3>
              <p class="vl-section-subtitle">Elegí el tipo visual para sumar al flujo.</p>
            </div>
            <span class="vl-badge">Flow</span>
          </div>

          <div class="vl-divider"></div>

          <div class="vl-list">
            ${types.map(function (type) {
              const isActive = app.state.selectedNodeType === type.key;

              return `
                <button
                  class="vl-node-type ${isActive ? "is-active" : ""}"
                  data-node-type="${app.helpers.escapeHtml(type.key)}"
                  type="button"
                  title="${app.helpers.escapeHtml(type.label)}"
                  aria-label="${app.helpers.escapeHtml(type.label)}"
                >
                  <span class="vl-node-type-icon">
                    ${icon(getNodeIcon(type))}
                  </span>

                  <span class="vl-node-type-copy">
                    <span class="vl-node-type-title">${app.helpers.escapeHtml(type.label)}</span>
                    <small class="vl-node-type-meta">${app.helpers.escapeHtml(type.shortLabel || type.key)}</small>
                  </span>

                  <span class="vl-node-type-action">
                    ${icon(isActive ? "check" : "plus")}
                  </span>
                </button>
              `;
            }).join("")}
          </div>
        </div>
      </aside>
    `;
  };

  app.ui.bindSidebar = function bindSidebar() {
    injectSidebarStyles();
    renderLucideIcons();

    document.querySelectorAll("[data-node-type]").forEach(function (button) {
      button.addEventListener("click", function () {
        const nodeType = button.getAttribute("data-node-type");
        if (app.state && typeof app.state.setSelectedNodeType === "function") {
          app.state.setSelectedNodeType(nodeType);
        } else {
          app.state.selectedNodeType = nodeType;
        }

        app.showToast("Bloque activo: " + nodeType);
        app.render();
      });
    });
  };
})();