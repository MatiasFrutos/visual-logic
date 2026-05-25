/* pages/export/export.page.js */
"use strict";

(function registerExportPage() {
  const app = window.VisualLogic;

  const EXPORT_STYLE_ID = "vl-export-page-own-styles";

  function injectExportStyles() {
    if (document.getElementById(EXPORT_STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = EXPORT_STYLE_ID;
    style.textContent = `
      .vl-export-page {
        width: 100%;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 14px;
        padding: 12px;
        box-sizing: border-box;
      }

      .vl-export-hero {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
        padding: 14px;
        border: 1px solid rgba(15, 23, 42, 0.08);
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.96);
        box-shadow:
          0 16px 34px rgba(15, 23, 42, 0.08),
          inset 0 1px 0 rgba(255, 255, 255, 0.88);
        box-sizing: border-box;
      }

      .vl-export-title-wrap {
        min-width: 0;
        display: flex;
        align-items: center;
        gap: 11px;
      }

      .vl-export-icon-box {
        width: 38px;
        height: 38px;
        min-width: 38px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 13px;
        background: #2563eb;
        color: #ffffff;
        box-shadow: 0 12px 24px rgba(37, 99, 235, 0.2);
      }

      .vl-export-icon-box i,
      .vl-export-icon-box svg {
        width: 19px;
        height: 19px;
        display: block;
        stroke-width: 2.35;
      }

      .vl-export-title-copy {
        min-width: 0;
      }

      .vl-export-title {
        margin: 0;
        color: #0f172a;
        font-size: 16px;
        font-weight: 900;
        line-height: 1.15;
        letter-spacing: 0;
      }

      .vl-export-subtitle {
        margin: 4px 0 0;
        color: #64748b;
        font-size: 12px;
        font-weight: 650;
        line-height: 1.35;
        letter-spacing: 0;
      }

      .vl-export-actions {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 8px;
        flex-wrap: wrap;
      }

      .vl-export-btn {
        min-height: 38px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
        padding: 0 12px;
        border: 1px solid rgba(15, 23, 42, 0.1);
        border-radius: 11px;
        background: rgba(255, 255, 255, 0.9);
        color: #1e293b;
        font-size: 12px;
        font-weight: 800;
        line-height: 1;
        letter-spacing: 0;
        cursor: pointer;
        user-select: none;
        white-space: nowrap;
        box-shadow: 0 8px 18px rgba(15, 23, 42, 0.045);
        box-sizing: border-box;
        transition:
          transform 150ms ease,
          box-shadow 150ms ease,
          border-color 150ms ease,
          background 150ms ease,
          color 150ms ease,
          opacity 150ms ease;
      }

      .vl-export-btn:hover {
        transform: translateY(-1px);
        border-color: rgba(37, 99, 235, 0.22);
        background: #ffffff;
        color: #2563eb;
        box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
      }

      .vl-export-btn:active {
        transform: translateY(0);
      }

      .vl-export-btn:focus-visible {
        outline: 3px solid rgba(37, 99, 235, 0.2);
        outline-offset: 2px;
      }

      .vl-export-btn i,
      .vl-export-btn svg {
        width: 15px;
        height: 15px;
        display: block;
        flex: 0 0 auto;
        stroke-width: 2.35;
      }

      .vl-export-btn-primary {
        border-color: rgba(37, 99, 235, 0.24);
        background: #2563eb;
        color: #ffffff;
        box-shadow: 0 12px 24px rgba(37, 99, 235, 0.2);
      }

      .vl-export-btn-primary:hover {
        background: #1d4ed8;
        color: #ffffff;
      }

      .vl-export-btn-ghost {
        background: rgba(248, 250, 252, 0.9);
        color: #334155;
      }

      .vl-export-empty {
        min-height: 340px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 22px;
        border: 1px dashed rgba(37, 99, 235, 0.22);
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.72);
        box-shadow: 0 16px 34px rgba(15, 23, 42, 0.06);
        text-align: center;
        box-sizing: border-box;
      }

      .vl-export-empty-card {
        width: min(420px, 100%);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
      }

      .vl-export-empty-icon {
        width: 46px;
        height: 46px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 15px;
        background: rgba(37, 99, 235, 0.08);
        color: #2563eb;
      }

      .vl-export-empty-icon i,
      .vl-export-empty-icon svg {
        width: 22px;
        height: 22px;
        display: block;
        stroke-width: 2.35;
      }

      .vl-export-empty h2 {
        margin: 0;
        color: #0f172a;
        font-size: 17px;
        font-weight: 900;
        line-height: 1.2;
      }

      .vl-export-empty p {
        margin: 0;
        color: #64748b;
        font-size: 13px;
        font-weight: 650;
        line-height: 1.45;
      }

      .vl-export-grid {
        width: 100%;
        min-width: 0;
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 14px;
      }

      .vl-export-code-card {
        min-width: 0;
        min-height: 420px;
        display: flex;
        flex-direction: column;
        border: 1px solid rgba(15, 23, 42, 0.08);
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.96);
        box-shadow:
          0 16px 34px rgba(15, 23, 42, 0.08),
          inset 0 1px 0 rgba(255, 255, 255, 0.88);
        overflow: hidden;
        box-sizing: border-box;
      }

      .vl-export-code-head {
        min-height: 48px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        padding: 10px 12px;
        border-bottom: 1px solid rgba(15, 23, 42, 0.08);
        background: rgba(248, 250, 252, 0.86);
        box-sizing: border-box;
      }

      .vl-export-code-title {
        min-width: 0;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: #0f172a;
        font-size: 13px;
        font-weight: 900;
        line-height: 1;
        letter-spacing: 0;
      }

      .vl-export-code-title i,
      .vl-export-code-title svg {
        width: 16px;
        height: 16px;
        display: block;
        color: #2563eb;
        stroke-width: 2.35;
      }

      .vl-export-tag {
        min-height: 24px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0 9px;
        border: 1px solid rgba(37, 99, 235, 0.14);
        border-radius: 999px;
        background: rgba(37, 99, 235, 0.07);
        color: #1d4ed8;
        font-size: 11px;
        font-weight: 850;
        line-height: 1;
        white-space: nowrap;
      }

      .vl-export-code-content {
        width: 100%;
        min-width: 0;
        flex: 1 1 auto;
        margin: 0;
        padding: 14px;
        background:
          linear-gradient(180deg, rgba(248, 250, 252, 0.96), rgba(241, 245, 249, 0.92));
        color: #0f172a;
        font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
        font-size: 12px;
        font-weight: 650;
        line-height: 1.65;
        letter-spacing: 0;
        white-space: pre-wrap;
        overflow: auto;
        box-sizing: border-box;
      }

      .vl-export-summary {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 14px;
        border: 1px solid rgba(15, 23, 42, 0.08);
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.96);
        box-shadow:
          0 16px 34px rgba(15, 23, 42, 0.08),
          inset 0 1px 0 rgba(255, 255, 255, 0.88);
        box-sizing: border-box;
      }

      .vl-export-summary-head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
      }

      .vl-export-summary-title {
        margin: 0;
        color: #0f172a;
        font-size: 14px;
        font-weight: 900;
        line-height: 1.15;
      }

      .vl-export-summary-subtitle {
        margin: 4px 0 0;
        color: #64748b;
        font-size: 12px;
        font-weight: 650;
        line-height: 1.35;
      }

      .vl-export-divider {
        width: 100%;
        height: 1px;
        background: rgba(15, 23, 42, 0.08);
      }

      .vl-export-stats {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 10px;
      }

      .vl-export-stat {
        min-width: 0;
        display: flex;
        align-items: center;
        gap: 9px;
        padding: 10px;
        border: 1px solid rgba(15, 23, 42, 0.08);
        border-radius: 13px;
        background: rgba(248, 250, 252, 0.82);
        box-sizing: border-box;
      }

      .vl-export-stat-icon {
        width: 32px;
        height: 32px;
        min-width: 32px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 11px;
        background: rgba(37, 99, 235, 0.08);
        color: #2563eb;
      }

      .vl-export-stat-icon i,
      .vl-export-stat-icon svg {
        width: 16px;
        height: 16px;
        display: block;
        stroke-width: 2.35;
      }

      .vl-export-stat-copy {
        min-width: 0;
      }

      .vl-export-stat-label {
        display: block;
        color: #64748b;
        font-size: 11px;
        font-weight: 750;
        line-height: 1.1;
      }

      .vl-export-stat-value {
        display: block;
        margin-top: 3px;
        color: #0f172a;
        font-size: 12px;
        font-weight: 900;
        line-height: 1.15;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      @media (max-width: 1024px) {
        .vl-export-hero {
          align-items: flex-start;
          flex-direction: column;
        }

        .vl-export-actions {
          width: 100%;
          justify-content: flex-start;
        }

        .vl-export-grid {
          grid-template-columns: 1fr;
        }

        .vl-export-code-card {
          min-height: 340px;
        }

        .vl-export-stats {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media (max-width: 620px) {
        .vl-export-page {
          padding: 8px;
          gap: 10px;
        }

        .vl-export-hero,
        .vl-export-summary,
        .vl-export-code-card {
          border-radius: 14px;
        }

        .vl-export-actions {
          display: grid;
          grid-template-columns: 1fr;
        }

        .vl-export-btn {
          width: 100%;
          justify-content: flex-start;
          min-height: 40px;
        }

        .vl-export-title {
          font-size: 15px;
        }

        .vl-export-subtitle {
          font-size: 12px;
        }

        .vl-export-summary-head {
          flex-direction: column;
          align-items: stretch;
        }

        .vl-export-stats {
          grid-template-columns: 1fr;
        }

        .vl-export-code-content {
          font-size: 11px;
          line-height: 1.6;
        }
      }

      @media (max-width: 420px) {
        .vl-export-title-wrap {
          align-items: flex-start;
        }

        .vl-export-icon-box {
          width: 34px;
          height: 34px;
          min-width: 34px;
          border-radius: 12px;
        }

        .vl-export-icon-box i,
        .vl-export-icon-box svg {
          width: 17px;
          height: 17px;
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

  function getCurrentDiagram() {
    const activeId = app.storage.getActiveId();
    return app.storage.getById(activeId);
  }

  function getSafeOutput(value, fallback) {
    return app.helpers.escapeHtml(value || fallback);
  }

  function getUpdatedAt(diagram) {
    if (!diagram || !diagram.updatedAt) return "Sin fecha";

    try {
      return new Date(diagram.updatedAt).toLocaleString("es-AR");
    } catch (error) {
      return "Sin fecha";
    }
  }

  function getDiagramJson(diagram) {
    return JSON.stringify(diagram, null, 2);
  }

  async function copyText(value, successMessage) {
    try {
      await navigator.clipboard.writeText(value);
      app.showToast(successMessage);
    } catch (error) {
      app.showToast("No se pudo copiar al portapapeles.", "warning");
    }
  }

  app.pages.export = {
    render: function renderExport() {
      injectExportStyles();

      const diagram = getCurrentDiagram();
      const nodesCount = diagram?.nodes?.length || 0;
      const connectionsCount = diagram?.connections?.length || 0;

      return `
        <div class="vl-shell">
          ${app.ui.header({ activeRoute: "export" })}

          <main class="vl-export-page">
            <section class="vl-export-hero">
              <div class="vl-export-title-wrap">
                <span class="vl-export-icon-box">
                  ${icon("file-output")}
                </span>

                <div class="vl-export-title-copy">
                  <h2 class="vl-export-title">Exportación</h2>
                  <p class="vl-export-subtitle">Copiá la lógica generada o descargá el diagrama activo en JSON.</p>
                </div>
              </div>

              <div class="vl-export-actions">
                <button class="vl-export-btn vl-export-btn-primary" id="vl-copy-pseudo" type="button" ${diagram ? "" : "disabled"}>
                  ${icon("copy")}
                  <span>Copiar pseudocódigo</span>
                </button>

                <button class="vl-export-btn" id="vl-copy-js" type="button" ${diagram ? "" : "disabled"}>
                  ${icon("braces")}
                  <span>Copiar JavaScript</span>
                </button>

                <button class="vl-export-btn vl-export-btn-ghost" id="vl-download-json" type="button" ${diagram ? "" : "disabled"}>
                  ${icon("download")}
                  <span>Descargar JSON</span>
                </button>
              </div>
            </section>

            ${
              !diagram
                ? `
                  <section class="vl-export-empty">
                    <div class="vl-export-empty-card">
                      <span class="vl-export-empty-icon">
                        ${icon("file-question")}
                      </span>

                      <h2>No hay diagrama activo</h2>
                      <p>Volvé al inicio o al editor para crear un diagrama antes de exportar.</p>

                      <button class="vl-export-btn vl-export-btn-primary" id="vl-go-home" type="button">
                        ${icon("home")}
                        <span>Ir a Inicio</span>
                      </button>
                    </div>
                  </section>
                `
                : `
                  <section class="vl-export-grid">
                    <article class="vl-export-code-card">
                      <div class="vl-export-code-head">
                        <strong class="vl-export-code-title">
                          ${icon("list-tree")}
                          <span>Pseudocódigo</span>
                        </strong>

                        <span class="vl-export-tag">Vista lógica</span>
                      </div>

                      <pre class="vl-export-code-content" id="vl-pseudocode-output">${getSafeOutput(diagram.pseudocode, "Todavía no hay salida generada.")}</pre>
                    </article>

                    <article class="vl-export-code-card">
                      <div class="vl-export-code-head">
                        <strong class="vl-export-code-title">
                          ${icon("braces")}
                          <span>JavaScript</span>
                        </strong>

                        <span class="vl-export-tag">Salida técnica</span>
                      </div>

                      <pre class="vl-export-code-content" id="vl-javascript-output">${getSafeOutput(diagram.javascript, "Todavía no hay salida generada.")}</pre>
                    </article>
                  </section>

                  <section class="vl-export-summary">
                    <div class="vl-export-summary-head">
                      <div>
                        <h3 class="vl-export-summary-title">Resumen del diagrama</h3>
                        <p class="vl-export-summary-subtitle">Activo actual: ${app.helpers.escapeHtml(diagram.name || "Sin nombre")}</p>
                      </div>

                      <span class="vl-export-tag">Listo para exportar</span>
                    </div>

                    <div class="vl-export-divider"></div>

                    <div class="vl-export-stats">
                      <div class="vl-export-stat">
                        <span class="vl-export-stat-icon">
                          ${icon("fingerprint")}
                        </span>

                        <span class="vl-export-stat-copy">
                          <span class="vl-export-stat-label">ID</span>
                          <strong class="vl-export-stat-value">${app.helpers.escapeHtml(diagram.id || "Sin ID")}</strong>
                        </span>
                      </div>

                      <div class="vl-export-stat">
                        <span class="vl-export-stat-icon">
                          ${icon("box")}
                        </span>

                        <span class="vl-export-stat-copy">
                          <span class="vl-export-stat-label">Nodos</span>
                          <strong class="vl-export-stat-value">${nodesCount}</strong>
                        </span>
                      </div>

                      <div class="vl-export-stat">
                        <span class="vl-export-stat-icon">
                          ${icon("workflow")}
                        </span>

                        <span class="vl-export-stat-copy">
                          <span class="vl-export-stat-label">Conexiones</span>
                          <strong class="vl-export-stat-value">${connectionsCount}</strong>
                        </span>
                      </div>

                      <div class="vl-export-stat">
                        <span class="vl-export-stat-icon">
                          ${icon("clock-3")}
                        </span>

                        <span class="vl-export-stat-copy">
                          <span class="vl-export-stat-label">Actualizado</span>
                          <strong class="vl-export-stat-value">${app.helpers.escapeHtml(getUpdatedAt(diagram))}</strong>
                        </span>
                      </div>
                    </div>
                  </section>
                `
            }
          </main>
        </div>
      `;
    },

    bind: function bindExport() {
      injectExportStyles();

      app.ui.bindHeader();
      renderLucideIcons();

      const copyPseudo = document.getElementById("vl-copy-pseudo");
      const copyJs = document.getElementById("vl-copy-js");
      const downloadJson = document.getElementById("vl-download-json");
      const goHome = document.getElementById("vl-go-home");

      if (goHome) {
        goHome.addEventListener("click", function () {
          app.navigate("home");
        });
      }

      if (copyPseudo) {
        copyPseudo.addEventListener("click", function () {
          const value = document.getElementById("vl-pseudocode-output")?.textContent || "";
          copyText(value, "Pseudocódigo copiado.");
        });
      }

      if (copyJs) {
        copyJs.addEventListener("click", function () {
          const value = document.getElementById("vl-javascript-output")?.textContent || "";
          copyText(value, "JavaScript copiado.");
        });
      }

      if (downloadJson) {
        downloadJson.addEventListener("click", function () {
          const item = app.storage.getById(app.storage.getActiveId());

          if (!item) {
            app.showToast("No hay diagrama para exportar.", "warning");
            return;
          }

          const blob = new Blob([getDiagramJson(item)], { type: "application/json" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");

          link.href = url;
          link.download = (item.name || "visual-logic") + ".json";
          document.body.appendChild(link);
          link.click();
          link.remove();

          setTimeout(function () {
            URL.revokeObjectURL(url);
          }, 200);

          app.showToast("JSON exportado.");
        });
      }
    }
  };
})();