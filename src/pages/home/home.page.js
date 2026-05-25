/* pages/home/home.page.js */
"use strict";

(function registerHomePage() {
  const app = window.VisualLogic;

  const HOME_STYLE_ID = "vl-home-page-own-styles";

  function injectHomeStyles() {
    if (document.getElementById(HOME_STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = HOME_STYLE_ID;
    style.textContent = `
      .vl-home {
        width: 100%;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 14px;
        padding: 12px;
        box-sizing: border-box;
      }

      .vl-home-hero {
        width: 100%;
        display: grid;
        grid-template-columns: minmax(0, 1.35fr) minmax(280px, 0.65fr);
        gap: 14px;
        align-items: stretch;
        box-sizing: border-box;
      }

      .vl-home-hero-copy,
      .vl-home-hero-panel,
      .vl-home-card {
        border: 1px solid rgba(15, 23, 42, 0.08);
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.96);
        box-shadow:
          0 16px 34px rgba(15, 23, 42, 0.08),
          inset 0 1px 0 rgba(255, 255, 255, 0.88);
        box-sizing: border-box;
      }

      .vl-home-hero-copy {
        min-width: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 14px;
        padding: 18px;
      }

      .vl-home-pill {
        width: fit-content;
        max-width: 100%;
        min-height: 30px;
        display: inline-flex;
        align-items: center;
        gap: 7px;
        padding: 0 10px;
        border: 1px solid rgba(37, 99, 235, 0.14);
        border-radius: 999px;
        background: rgba(37, 99, 235, 0.07);
        color: #1d4ed8;
        font-size: 12px;
        font-weight: 850;
        line-height: 1;
        white-space: nowrap;
        box-sizing: border-box;
      }

      .vl-home-pill i,
      .vl-home-pill svg,
      .vl-home-note i,
      .vl-home-note svg,
      .vl-home-btn i,
      .vl-home-btn svg,
      .vl-home-mini-btn i,
      .vl-home-mini-btn svg,
      .vl-home-card-badge i,
      .vl-home-card-badge svg,
      .vl-home-item-copy p i,
      .vl-home-item-copy p svg {
        width: 15px;
        height: 15px;
        display: block;
        flex: 0 0 auto;
        stroke-width: 2.35;
      }

      .vl-home-hero-copy h1 {
        max-width: 760px;
        margin: 0;
        color: #0f172a;
        font-size: clamp(28px, 4vw, 48px);
        font-weight: 950;
        line-height: 1.02;
        letter-spacing: 0;
      }

      .vl-home-hero-copy p {
        max-width: 640px;
        margin: 0;
        color: #64748b;
        font-size: 14px;
        font-weight: 650;
        line-height: 1.55;
        letter-spacing: 0;
      }

      .vl-home-actions {
        display: flex;
        align-items: center;
        gap: 9px;
        flex-wrap: wrap;
      }

      .vl-home-btn,
      .vl-home-mini-btn {
        min-height: 40px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 0 13px;
        border: 1px solid rgba(15, 23, 42, 0.1);
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.9);
        color: #1e293b;
        font-size: 13px;
        font-weight: 850;
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
          color 150ms ease;
      }

      .vl-home-btn:hover,
      .vl-home-mini-btn:hover {
        transform: translateY(-1px);
        border-color: rgba(37, 99, 235, 0.22);
        background: #ffffff;
        color: #2563eb;
        box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
      }

      .vl-home-btn:active,
      .vl-home-mini-btn:active {
        transform: translateY(0);
      }

      .vl-home-btn-primary {
        border-color: rgba(37, 99, 235, 0.24);
        background: #2563eb;
        color: #ffffff;
        box-shadow: 0 12px 24px rgba(37, 99, 235, 0.2);
      }

      .vl-home-btn-primary:hover {
        background: #1d4ed8;
        color: #ffffff;
      }

      .vl-home-btn-secondary {
        background: rgba(248, 250, 252, 0.9);
        color: #334155;
      }

      .vl-home-note {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: #64748b;
        font-size: 12px;
        font-weight: 700;
        line-height: 1.35;
      }

      .vl-home-hero-panel {
        min-width: 0;
        display: grid;
        grid-template-columns: 1fr;
        gap: 10px;
        padding: 14px;
      }

      .vl-home-panel-card {
        min-width: 0;
        display: flex;
        align-items: center;
        gap: 11px;
        padding: 12px;
        border: 1px solid rgba(15, 23, 42, 0.08);
        border-radius: 14px;
        background: rgba(248, 250, 252, 0.82);
        box-sizing: border-box;
      }

      .vl-home-panel-icon,
      .vl-home-item-icon,
      .vl-home-info-icon,
      .vl-home-empty-icon {
        width: 38px;
        height: 38px;
        min-width: 38px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 13px;
        background: rgba(37, 99, 235, 0.08);
        color: #2563eb;
        box-sizing: border-box;
      }

      .vl-home-panel-icon i,
      .vl-home-panel-icon svg,
      .vl-home-item-icon i,
      .vl-home-item-icon svg,
      .vl-home-info-icon i,
      .vl-home-info-icon svg,
      .vl-home-empty-icon i,
      .vl-home-empty-icon svg {
        width: 18px;
        height: 18px;
        display: block;
        stroke-width: 2.35;
      }

      .vl-home-panel-copy {
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 3px;
      }

      .vl-home-panel-copy strong {
        color: #0f172a;
        font-size: 18px;
        font-weight: 950;
        line-height: 1.1;
      }

      .vl-home-panel-copy span {
        color: #64748b;
        font-size: 12px;
        font-weight: 700;
        line-height: 1.2;
      }

      .vl-home-content {
        width: 100%;
        min-width: 0;
        display: grid;
        grid-template-columns: minmax(0, 1.3fr) minmax(280px, 0.7fr);
        gap: 14px;
        align-items: start;
      }

      .vl-home-card {
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 14px;
        padding: 14px;
      }

      .vl-home-card-head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
      }

      .vl-home-card-head h2 {
        margin: 0;
        color: #0f172a;
        font-size: 15px;
        font-weight: 950;
        line-height: 1.15;
        letter-spacing: 0;
      }

      .vl-home-card-head p {
        margin: 5px 0 0;
        color: #64748b;
        font-size: 12px;
        font-weight: 650;
        line-height: 1.35;
      }

      .vl-home-card-badge {
        min-height: 30px;
        display: inline-flex;
        align-items: center;
        gap: 7px;
        padding: 0 10px;
        border: 1px solid rgba(37, 99, 235, 0.14);
        border-radius: 999px;
        background: rgba(37, 99, 235, 0.07);
        color: #1d4ed8;
        font-size: 12px;
        font-weight: 900;
        line-height: 1;
        white-space: nowrap;
      }

      .vl-home-list {
        display: flex;
        flex-direction: column;
        gap: 9px;
      }

      .vl-home-item {
        min-width: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 11px;
        border: 1px solid rgba(15, 23, 42, 0.08);
        border-radius: 14px;
        background: rgba(248, 250, 252, 0.72);
        box-sizing: border-box;
      }

      .vl-home-item.is-active {
        border-color: rgba(37, 99, 235, 0.24);
        background: rgba(37, 99, 235, 0.06);
      }

      .vl-home-item-main {
        min-width: 0;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .vl-home-item-copy {
        min-width: 0;
      }

      .vl-home-item-copy h3 {
        margin: 0;
        color: #0f172a;
        font-size: 13px;
        font-weight: 900;
        line-height: 1.15;
        letter-spacing: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .vl-home-item-copy p {
        min-width: 0;
        display: flex;
        align-items: center;
        gap: 6px;
        margin: 5px 0 0;
        color: #64748b;
        font-size: 11px;
        font-weight: 700;
        line-height: 1.2;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .vl-home-dot {
        width: 4px;
        height: 4px;
        min-width: 4px;
        border-radius: 999px;
        background: rgba(100, 116, 139, 0.55);
      }

      .vl-home-item-actions {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 7px;
        flex: 0 0 auto;
      }

      .vl-home-mini-btn {
        min-height: 34px;
        padding: 0 10px;
        border-radius: 10px;
        font-size: 12px;
      }

      .vl-home-mini-btn-open {
        color: #1d4ed8;
        background: rgba(37, 99, 235, 0.07);
        border-color: rgba(37, 99, 235, 0.14);
      }

      .vl-home-mini-btn-delete {
        color: #b91c1c;
        background: rgba(254, 242, 242, 0.9);
        border-color: rgba(220, 38, 38, 0.16);
      }

      .vl-home-mini-btn-delete:hover {
        color: #ffffff;
        background: #dc2626;
        border-color: rgba(220, 38, 38, 0.28);
      }

      .vl-home-empty {
        min-height: 260px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 11px;
        padding: 20px;
        border: 1px dashed rgba(37, 99, 235, 0.22);
        border-radius: 15px;
        background: rgba(248, 250, 252, 0.72);
        text-align: center;
        box-sizing: border-box;
      }

      .vl-home-empty h3 {
        margin: 0;
        color: #0f172a;
        font-size: 15px;
        font-weight: 950;
        line-height: 1.2;
      }

      .vl-home-empty p {
        max-width: 360px;
        margin: 0;
        color: #64748b;
        font-size: 13px;
        font-weight: 650;
        line-height: 1.45;
      }

      .vl-home-info-list {
        display: flex;
        flex-direction: column;
        gap: 9px;
      }

      .vl-home-info-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 11px;
        border: 1px solid rgba(15, 23, 42, 0.08);
        border-radius: 14px;
        background: rgba(248, 250, 252, 0.72);
        box-sizing: border-box;
      }

      .vl-home-info-item strong {
        display: block;
        color: #0f172a;
        font-size: 13px;
        font-weight: 900;
        line-height: 1.15;
      }

      .vl-home-info-item span {
        display: block;
        margin-top: 4px;
        color: #64748b;
        font-size: 12px;
        font-weight: 650;
        line-height: 1.35;
      }

      @media (max-width: 1024px) {
        .vl-home-hero,
        .vl-home-content {
          grid-template-columns: 1fr;
        }

        .vl-home-hero-panel {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
      }

      @media (max-width: 760px) {
        .vl-home {
          padding: 8px;
          gap: 10px;
        }

        .vl-home-hero-copy,
        .vl-home-hero-panel,
        .vl-home-card {
          border-radius: 14px;
        }

        .vl-home-hero-copy {
          padding: 14px;
        }

        .vl-home-hero-copy h1 {
          font-size: 30px;
        }

        .vl-home-hero-panel {
          grid-template-columns: 1fr;
        }

        .vl-home-actions {
          display: grid;
          grid-template-columns: 1fr;
        }

        .vl-home-btn {
          width: 100%;
          justify-content: flex-start;
        }

        .vl-home-card-head,
        .vl-home-item {
          align-items: stretch;
          flex-direction: column;
        }

        .vl-home-item-actions {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .vl-home-mini-btn {
          width: 100%;
        }
      }

      @media (max-width: 420px) {
        .vl-home-hero-copy h1 {
          font-size: 26px;
        }

        .vl-home-pill {
          white-space: normal;
          line-height: 1.25;
          padding: 7px 10px;
        }

        .vl-home-item-actions {
          grid-template-columns: 1fr;
        }

        .vl-home-item-copy p {
          align-items: flex-start;
          flex-wrap: wrap;
          white-space: normal;
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

  function formatDate(value) {
    try {
      return new Date(value).toLocaleString("es-AR");
    } catch (error) {
      return value || "-";
    }
  }

  function createDiagramFlow() {
    const name = prompt("Nombre del diagrama:", "Nuevo diagrama");
    const item = app.storage.createDiagram(name || "Nuevo diagrama");

    app.showToast("Diagrama creado: " + item.name);
    app.navigate("editor");
  }

  app.pages.home = {
    render: function renderHome() {
      injectHomeStyles();

      const diagrams = app.storage.getAll();
      const totalDiagrams = diagrams.length;
      const activeId = app.storage.getActiveId();
      const activeDiagram = activeId ? app.storage.getById(activeId) : null;

      return `
        <div class="vl-shell">
          ${app.ui.header({ activeRoute: "home" })}

          <main class="vl-home">
            <section class="vl-home-hero">
              <div class="vl-home-hero-copy">
                <div class="vl-home-pill">
                  ${icon("hard-drive")}
                  <span>Trabajo local, rápido y sin backend</span>
                </div>

                <h1>Diagramas de flujo simples para pensar mejor.</h1>

                <p>
                  Creá, editá y exportá diagramas desde el navegador.
                  Visual Logic mantiene el flujo liviano, directo y fácil de iterar.
                </p>

                <div class="vl-home-actions">
                  <button class="vl-home-btn vl-home-btn-primary" id="vl-create-diagram" type="button">
                    ${icon("plus")}
                    <span>Crear diagrama</span>
                  </button>

                  <button class="vl-home-btn vl-home-btn-secondary" id="vl-open-editor-direct" type="button">
                    ${icon("blocks")}
                    <span>Ir al editor</span>
                  </button>
                </div>

                <div class="vl-home-note">
                  ${icon("shield-check")}
                  <span>Los diagramas quedan guardados en este navegador.</span>
                </div>
              </div>

              <div class="vl-home-hero-panel">
                <div class="vl-home-panel-card">
                  <div class="vl-home-panel-icon">
                    ${icon("files")}
                  </div>
                  <div class="vl-home-panel-copy">
                    <strong>${totalDiagrams}</strong>
                    <span>${totalDiagrams === 1 ? "diagrama local" : "diagramas locales"}</span>
                  </div>
                </div>

                <div class="vl-home-panel-card">
                  <div class="vl-home-panel-icon">
                    ${icon("save")}
                  </div>
                  <div class="vl-home-panel-copy">
                    <strong>Auto-save</strong>
                    <span>Persistencia local</span>
                  </div>
                </div>

                <div class="vl-home-panel-card">
                  <div class="vl-home-panel-icon">
                    ${icon("file-output")}
                  </div>
                  <div class="vl-home-panel-copy">
                    <strong>Export</strong>
                    <span>JSON y lógica generada</span>
                  </div>
                </div>
              </div>
            </section>

            <section class="vl-home-content">
              <article class="vl-home-card">
                <div class="vl-home-card-head">
                  <div>
                    <h2>Diagramas recientes</h2>
                    <p>Abrí, continuá o limpiá tus flujos guardados.</p>
                  </div>

                  <div class="vl-home-card-badge">
                    ${icon("database")}
                    <span>${totalDiagrams}</span>
                  </div>
                </div>

                ${
                  diagrams.length
                    ? `
                      <div class="vl-home-list">
                        ${diagrams.map(function (item) {
                          const isActive = activeDiagram && activeDiagram.id === item.id;

                          return `
                            <div class="vl-home-item ${isActive ? "is-active" : ""}">
                              <div class="vl-home-item-main">
                                <div class="vl-home-item-icon">
                                  ${icon(isActive ? "sparkles" : "file-text")}
                                </div>

                                <div class="vl-home-item-copy">
                                  <h3>${app.helpers.escapeHtml(item.name || "Sin nombre")}</h3>
                                  <p>
                                    ${icon("box")}
                                    <span>${item.nodes?.length || 0} nodos</span>
                                    <span class="vl-home-dot"></span>
                                    ${icon("workflow")}
                                    <span>${item.connections?.length || 0} conexiones</span>
                                    <span class="vl-home-dot"></span>
                                    ${icon("clock-3")}
                                    <span>${app.helpers.escapeHtml(formatDate(item.updatedAt))}</span>
                                  </p>
                                </div>
                              </div>

                              <div class="vl-home-item-actions">
                                <button class="vl-home-mini-btn vl-home-mini-btn-open" data-open-diagram="${app.helpers.escapeHtml(item.id)}" type="button">
                                  ${icon("folder-open")}
                                  <span>Abrir</span>
                                </button>

                                <button class="vl-home-mini-btn vl-home-mini-btn-delete" data-delete-diagram="${app.helpers.escapeHtml(item.id)}" type="button">
                                  ${icon("trash-2")}
                                  <span>Eliminar</span>
                                </button>
                              </div>
                            </div>
                          `;
                        }).join("")}
                      </div>
                    `
                    : `
                      <div class="vl-home-empty">
                        <div class="vl-home-empty-icon">
                          ${icon("folder-search")}
                        </div>

                        <h3>No tenés diagramas todavía</h3>
                        <p>Creá el primero y empezá a trabajar el flujo visual en el editor.</p>

                        <button class="vl-home-btn vl-home-btn-primary" id="vl-create-first-diagram" type="button">
                          ${icon("plus")}
                          <span>Crear primer diagrama</span>
                        </button>
                      </div>
                    `
                }
              </article>

              <article class="vl-home-card vl-home-card-info">
                <div class="vl-home-card-head">
                  <div>
                    <h2>Flujo de trabajo</h2>
                    <p>Simple, sin fricción y directo al tablero.</p>
                  </div>
                </div>

                <div class="vl-home-info-list">
                  <div class="vl-home-info-item">
                    <div class="vl-home-info-icon">${icon("plus-circle")}</div>
                    <div>
                      <strong>Creás</strong>
                      <span>Generás un diagrama nuevo en un clic.</span>
                    </div>
                  </div>

                  <div class="vl-home-info-item">
                    <div class="vl-home-info-icon">${icon("blocks")}</div>
                    <div>
                      <strong>Editás</strong>
                      <span>Armás nodos, figuras y conexiones visuales.</span>
                    </div>
                  </div>

                  <div class="vl-home-info-item">
                    <div class="vl-home-info-icon">${icon("workflow")}</div>
                    <div>
                      <strong>Conectás</strong>
                      <span>Relacionás bloques sin complicar la operación.</span>
                    </div>
                  </div>

                  <div class="vl-home-info-item">
                    <div class="vl-home-info-icon">${icon("file-output")}</div>
                    <div>
                      <strong>Exportás</strong>
                      <span>Revisás pseudocódigo, JavaScript y JSON.</span>
                    </div>
                  </div>
                </div>
              </article>
            </section>
          </main>
        </div>
      `;
    },

    bind: function bindHome() {
      injectHomeStyles();

      app.ui.bindHeader();
      renderLucideIcons();

      const createButton = document.getElementById("vl-create-diagram");
      const createFirstButton = document.getElementById("vl-create-first-diagram");
      const openEditorButton = document.getElementById("vl-open-editor-direct");

      if (createButton) {
        createButton.addEventListener("click", createDiagramFlow);
      }

      if (createFirstButton) {
        createFirstButton.addEventListener("click", createDiagramFlow);
      }

      if (openEditorButton) {
        openEditorButton.addEventListener("click", function () {
          const activeId = app.storage.getActiveId();
          const exists = app.storage.getById(activeId);

          if (!exists) {
            const item = app.storage.createDiagram("Nuevo diagrama");
            app.showToast("Se creó un diagrama base: " + item.name);
          }

          app.navigate("editor");
        });
      }

      document.querySelectorAll("[data-open-diagram]").forEach(function (button) {
        button.addEventListener("click", function () {
          const id = button.getAttribute("data-open-diagram");
          app.storage.setActiveId(id);
          app.navigate("editor");
        });
      });

      document.querySelectorAll("[data-delete-diagram]").forEach(function (button) {
        button.addEventListener("click", function () {
          const id = button.getAttribute("data-delete-diagram");
          const confirmed = window.confirm("¿Querés eliminar este diagrama?");

          if (!confirmed) return;

          app.storage.removeDiagram(id);
          app.showToast("Diagrama eliminado.");
          app.render();
        });
      });

      renderLucideIcons();
    }
  };
})();