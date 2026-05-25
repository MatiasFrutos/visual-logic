/* pages/home/home.page.js */
"use strict";

(function registerHomePage() {
  const app = window.VisualLogic;

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
