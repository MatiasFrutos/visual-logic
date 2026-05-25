/* src/ui/inspector-panel.js */
"use strict";

(function registerInspectorPanel() {
  const app = window.VisualLogic;

  const INSPECTOR_STYLE_ID = "vl-inspector-own-styles";

  function injectInspectorStyles() {
    if (document.getElementById(INSPECTOR_STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = INSPECTOR_STYLE_ID;
    style.textContent = `
      .vl-inspector-panel {
        width: 100%;
        min-width: 0;
        height: 100%;
        box-sizing: border-box;
      }

      .vl-inspector-inner {
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

      .vl-inspector-head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
      }

      .vl-inspector-title-wrap {
        min-width: 0;
      }

      .vl-inspector-title {
        margin: 0;
        color: #0f172a;
        font-size: 14px;
        font-weight: 850;
        line-height: 1.2;
        letter-spacing: 0;
      }

      .vl-inspector-subtitle {
        margin: 5px 0 0;
        max-width: 240px;
        color: #64748b;
        font-size: 12px;
        font-weight: 600;
        line-height: 1.45;
        letter-spacing: 0;
      }

      .vl-inspector-badge {
        min-height: 24px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
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

      .vl-inspector-badge i,
      .vl-inspector-badge svg {
        width: 13px;
        height: 13px;
        display: block;
        stroke-width: 2.35;
      }

      .vl-inspector-divider {
        width: 100%;
        height: 1px;
        background: rgba(15, 23, 42, 0.09);
        flex: 0 0 auto;
      }

      .vl-inspector-form {
        display: flex;
        flex-direction: column;
        gap: 12px;
        min-width: 0;
      }

      .vl-inspector-field {
        display: flex;
        flex-direction: column;
        gap: 7px;
        min-width: 0;
      }

      .vl-inspector-label-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }

      .vl-inspector-label {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        color: #334155;
        font-size: 12px;
        font-weight: 800;
        line-height: 1;
        letter-spacing: 0;
      }

      .vl-inspector-label i,
      .vl-inspector-label svg {
        width: 14px;
        height: 14px;
        display: block;
        color: #2563eb;
        stroke-width: 2.25;
      }

      .vl-inspector-hint {
        color: #94a3b8;
        font-size: 11px;
        font-weight: 700;
        line-height: 1;
        white-space: nowrap;
      }

      .vl-inspector-input-wrap,
      .vl-inspector-select-wrap {
        position: relative;
        width: 100%;
        min-width: 0;
      }

      .vl-inspector-input,
      .vl-inspector-select {
        width: 100%;
        min-width: 0;
        height: 42px;
        padding: 0 12px;
        border: 1px solid rgba(15, 23, 42, 0.11);
        border-radius: 13px;
        background: rgba(255, 255, 255, 0.92);
        color: #0f172a;
        font-size: 13px;
        font-weight: 750;
        line-height: 1;
        letter-spacing: 0;
        outline: none;
        box-shadow: 0 8px 18px rgba(15, 23, 42, 0.045);
        box-sizing: border-box;
        transition:
          border-color 160ms ease,
          box-shadow 160ms ease,
          background 160ms ease;
      }

      .vl-inspector-select {
        appearance: none;
        -webkit-appearance: none;
        padding-right: 38px;
        cursor: pointer;
      }

      .vl-inspector-input:focus,
      .vl-inspector-select:focus {
        border-color: rgba(37, 99, 235, 0.34);
        background: #ffffff;
        box-shadow:
          0 12px 24px rgba(15, 23, 42, 0.08),
          0 0 0 3px rgba(37, 99, 235, 0.12);
      }

      .vl-inspector-select-icon {
        position: absolute;
        top: 50%;
        right: 12px;
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #64748b;
        line-height: 0;
        pointer-events: none;
        transform: translateY(-50%);
      }

      .vl-inspector-select-icon i,
      .vl-inspector-select-icon svg {
        width: 16px;
        height: 16px;
        display: block;
        stroke-width: 2.3;
      }

      .vl-inspector-card {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        padding: 12px;
        border: 1px solid rgba(15, 23, 42, 0.08);
        border-radius: 15px;
        background: rgba(255, 255, 255, 0.72);
        box-shadow: 0 8px 18px rgba(15, 23, 42, 0.04);
        box-sizing: border-box;
      }

      .vl-inspector-card-icon {
        width: 34px;
        height: 34px;
        min-width: 34px;
        min-height: 34px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(37, 99, 235, 0.15);
        border-radius: 12px;
        background: rgba(37, 99, 235, 0.08);
        color: #2563eb;
        line-height: 0;
        box-sizing: border-box;
      }

      .vl-inspector-card-icon i,
      .vl-inspector-card-icon svg {
        width: 17px;
        height: 17px;
        display: block;
        stroke-width: 2.25;
      }

      .vl-inspector-card-copy {
        min-width: 0;
      }

      .vl-inspector-card-title {
        margin: 0;
        color: #0f172a;
        font-size: 13px;
        font-weight: 850;
        line-height: 1.2;
        letter-spacing: 0;
      }

      .vl-inspector-card-text {
        margin: 4px 0 0;
        color: #64748b;
        font-size: 12px;
        font-weight: 600;
        line-height: 1.45;
        letter-spacing: 0;
      }

      .vl-inspector-actions {
        display: grid;
        grid-template-columns: 1fr;
        gap: 8px;
        margin-top: auto;
      }

      .vl-inspector-btn {
        width: 100%;
        min-height: 42px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 0 12px;
        border: 1px solid rgba(15, 23, 42, 0.1);
        border-radius: 13px;
        background: rgba(255, 255, 255, 0.9);
        color: #1e293b;
        font-size: 13px;
        font-weight: 800;
        line-height: 1;
        letter-spacing: 0;
        cursor: pointer;
        user-select: none;
        white-space: nowrap;
        box-shadow: 0 8px 18px rgba(15, 23, 42, 0.05);
        box-sizing: border-box;
        transition:
          transform 160ms ease,
          box-shadow 160ms ease,
          border-color 160ms ease,
          background 160ms ease,
          color 160ms ease,
          opacity 160ms ease;
      }

      .vl-inspector-btn:hover {
        transform: translateY(-1px);
        border-color: rgba(37, 99, 235, 0.22);
        background: #ffffff;
        box-shadow: 0 14px 26px rgba(15, 23, 42, 0.09);
      }

      .vl-inspector-btn:active {
        transform: translateY(0);
      }

      .vl-inspector-btn:focus-visible {
        outline: 3px solid rgba(37, 99, 235, 0.2);
        outline-offset: 2px;
      }

      .vl-inspector-btn i,
      .vl-inspector-btn svg {
        width: 16px;
        height: 16px;
        display: block;
        stroke-width: 2.25;
      }

      .vl-inspector-btn-primary {
        border-color: rgba(37, 99, 235, 0.22);
        background: #2563eb;
        color: #ffffff;
        box-shadow: 0 14px 26px rgba(37, 99, 235, 0.2);
      }

      .vl-inspector-btn-primary:hover {
        border-color: rgba(37, 99, 235, 0.34);
        background: #1d4ed8;
        color: #ffffff;
      }

      .vl-inspector-btn-danger {
        border-color: rgba(220, 38, 38, 0.18);
        background: rgba(254, 242, 242, 0.9);
        color: #b91c1c;
      }

      .vl-inspector-btn-danger:hover {
        border-color: rgba(220, 38, 38, 0.28);
        background: #dc2626;
        color: #ffffff;
      }

      .vl-inspector-btn:disabled,
      .vl-inspector-btn[disabled] {
        cursor: not-allowed;
        opacity: 0.48;
        transform: none;
        box-shadow: none;
      }

      .vl-inspector-btn:disabled:hover,
      .vl-inspector-btn[disabled]:hover {
        border-color: rgba(15, 23, 42, 0.1);
        background: rgba(255, 255, 255, 0.9);
        color: #1e293b;
      }

      @media (max-width: 1024px) {
        .vl-inspector-inner {
          padding: 12px;
          border-radius: 16px;
        }

        .vl-inspector-actions {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media (max-width: 680px) {
        .vl-inspector-head {
          align-items: center;
        }

        .vl-inspector-subtitle {
          display: none;
        }

        .vl-inspector-card {
          padding: 10px;
          border-radius: 14px;
        }
      }

      @media (max-width: 420px) {
        .vl-inspector-inner {
          padding: 10px;
          border-radius: 14px;
          gap: 12px;
        }

        .vl-inspector-actions {
          grid-template-columns: 1fr;
        }

        .vl-inspector-btn {
          justify-content: flex-start;
          padding: 0 12px;
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

  function getSelectedTypeLabel(typeKey) {
    const types = Array.isArray(app.nodeTypes) ? app.nodeTypes : [];
    const found = types.find(function (type) {
      return type.key === typeKey;
    });

    return found ? found.label : typeKey;
  }

  function buildTypeOptions(currentType) {
    const types = Array.isArray(app.nodeTypes) ? app.nodeTypes : [];

    return types.map(function (type) {
      return `
        <option value="${app.helpers.escapeHtml(type.key)}" ${currentType === type.key ? "selected" : ""}>
          ${app.helpers.escapeHtml(type.label)}
        </option>
      `;
    }).join("");
  }

  app.ui.inspectorPanel = function inspectorPanel() {
    injectInspectorStyles();

    const selected = app.inspector.getSelectedNode() || null;
    const current = selected || { label: "", type: app.state.selectedNodeType || "process" };
    const currentLabel = current.label || "";
    const currentType = current.type || "process";
    const typeLabel = getSelectedTypeLabel(currentType);

    return `
      <aside class="vl-inspector-panel">
        <div class="vl-inspector-inner">
          <div class="vl-inspector-head">
            <div class="vl-inspector-title-wrap">
              <h3 class="vl-inspector-title">Inspector</h3>
              <p class="vl-inspector-subtitle">Propiedades rápidas del nodo seleccionado.</p>
            </div>

            <span class="vl-inspector-badge">
              ${icon(selected ? "scan-line" : "mouse-pointer-2")}
              <span>${selected ? "Activo" : "Sin nodo"}</span>
            </span>
          </div>

          <div class="vl-inspector-divider"></div>

          <div class="vl-inspector-form">
            <label class="vl-inspector-field">
              <span class="vl-inspector-label-row">
                <span class="vl-inspector-label">
                  ${icon("type")}
                  <span>Texto del nodo</span>
                </span>
                <span class="vl-inspector-hint">${selected ? "Editable" : "Pendiente"}</span>
              </span>

              <span class="vl-inspector-input-wrap">
                <input
                  id="vl-node-label"
                  class="vl-inspector-input"
                  value="${app.helpers.escapeHtml(currentLabel)}"
                  placeholder="Nombre del bloque"
                  ${selected ? "" : "disabled"}
                />
              </span>
            </label>

            <label class="vl-inspector-field">
              <span class="vl-inspector-label-row">
                <span class="vl-inspector-label">
                  ${icon("shapes")}
                  <span>Tipo</span>
                </span>
                <span class="vl-inspector-hint">${app.helpers.escapeHtml(typeLabel)}</span>
              </span>

              <span class="vl-inspector-select-wrap">
                <select id="vl-node-kind" class="vl-inspector-select" ${selected ? "" : "disabled"}>
                  ${buildTypeOptions(currentType)}
                </select>

                <span class="vl-inspector-select-icon">
                  ${icon("chevron-down")}
                </span>
              </span>
            </label>
          </div>

          <div class="vl-inspector-divider"></div>

          <div class="vl-inspector-card">
            <span class="vl-inspector-card-icon">
              ${icon(selected ? "box-select" : "info")}
            </span>

            <div class="vl-inspector-card-copy">
              <h4 class="vl-inspector-card-title">Selección actual</h4>
              <p class="vl-inspector-card-text">
                ${
                  selected
                    ? `Nodo activo: ${app.helpers.escapeHtml(selected.label || "Sin texto")}`
                    : "Seleccioná un nodo en la pizarra para editar sus propiedades."
                }
              </p>
            </div>
          </div>

          <div class="vl-inspector-actions">
            <button
              class="vl-inspector-btn vl-inspector-btn-primary"
              id="vl-apply-node"
              type="button"
              ${selected ? "" : "disabled"}
            >
              ${icon("check")}
              <span>Aplicar cambios</span>
            </button>

            <button
              class="vl-inspector-btn vl-inspector-btn-danger"
              id="vl-delete-node"
              type="button"
              ${selected ? "" : "disabled"}
            >
              ${icon("trash-2")}
              <span>Eliminar nodo</span>
            </button>
          </div>
        </div>
      </aside>
    `;
  };

  app.ui.bindInspectorPanel = function bindInspectorPanel() {
    injectInspectorStyles();
    renderLucideIcons();

    const applyButton = document.getElementById("vl-apply-node");
    const deleteButton = document.getElementById("vl-delete-node");

    if (applyButton) {
      applyButton.addEventListener("click", function () {
        const selectedNode = app.inspector.getSelectedNode();

        if (!selectedNode) {
          app.showToast("No hay nodo seleccionado.", "warning");
          return;
        }

        const label = document.getElementById("vl-node-label")?.value?.trim() || "Proceso";
        const type = document.getElementById("vl-node-kind")?.value || "process";
        const typeConfig = app.getNodeType(type);

        const updated = app.nodes.update(selectedNode.id, {
          label: label,
          type: type,
          width: typeConfig.defaultWidth,
          height: typeConfig.defaultHeight
        });

        if (!updated) {
          app.showToast("No se pudo actualizar el nodo.", "danger");
          return;
        }

        app.showToast("Nodo actualizado.");
        app.render();
      });
    }

    if (deleteButton) {
      deleteButton.addEventListener("click", function () {
        const selectedNode = app.inspector.getSelectedNode();

        if (!selectedNode) {
          app.showToast("No hay nodo seleccionado.", "warning");
          return;
        }

        app.nodes.remove(selectedNode.id);
        app.selection.clear();
        app.showToast("Nodo eliminado.");
        app.render();
      });
    }
  };
})();