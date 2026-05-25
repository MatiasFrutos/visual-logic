/* src/app/app.js */
"use strict";

(function bootstrapApp() {
  const app = window.VisualLogic = window.VisualLogic || {};

  function appendGlobalFooter() {
    const shell = document.querySelector(".vl-shell");

    if (!shell || !app.ui || typeof app.ui.footer !== "function") {
      return;
    }

    if (shell.querySelector(".vl-footer")) {
      return;
    }

    shell.insertAdjacentHTML("beforeend", app.ui.footer());

    if (typeof app.ui.bindFooter === "function") {
      app.ui.bindFooter();
    }
  }

  app.init = function init() {
    try {
      app.storage.bootstrap();

      if (!window.location.hash) {
        app.router.go("home");
      } else {
        app.render();
      }

      app.events.emit("app:ready", {
        name: app.config.APP_NAME,
        version: app.config.VERSION
      });
    } catch (error) {
      console.error("[VisualLogic.app.init]", error);
      const root = document.getElementById("app");
      if (root) {
        root.innerHTML = `
          <div style="padding:24px;color:#fff;font-family:Inter,system-ui,sans-serif;">
            Error iniciando Visual Logic.
          </div>
        `;
      }
    }
  };

  app.render = function render() {
    const root = document.getElementById("app");
    if (!root) return;

    const route = app.router.resolve();
    app.state.route = route.name;
    app.state.params = route.params || {};

    const page = app.pages[route.name] || app.pages.home;

    if (!page || typeof page.render !== "function") {
      root.innerHTML = `
        <div class="vl-shell">
          ${app.ui.header({ activeRoute: "home" })}
          <main class="vl-page">
            <div class="vl-card">
              <div class="vl-card-body">
                <h2 class="vl-section-title">Ruta no encontrada</h2>
                <p class="vl-section-subtitle">La vista solicitada no existe.</p>
                <div class="u-space-top">
                  <button class="vl-btn vl-btn-primary" id="vl-go-home-fallback">Volver a inicio</button>
                </div>
              </div>
            </div>
          </main>
        </div>
      `;

      app.ui.bindHeader();
      appendGlobalFooter();

      const fallbackButton = document.getElementById("vl-go-home-fallback");
      if (fallbackButton) {
        fallbackButton.addEventListener("click", function () {
          app.router.go("home");
        });
      }

      return;
    }

    root.innerHTML = page.render(route.params || {});

    if (typeof page.bind === "function") {
      page.bind(route.params || {});
    }

    appendGlobalFooter();

    app.events.emit("app:rendered", {
      route: route.name,
      params: route.params || {}
    });
  };

  window.addEventListener("hashchange", function () {
    app.render();
  });

  window.addEventListener("DOMContentLoaded", function () {
    app.init();
  });
})();