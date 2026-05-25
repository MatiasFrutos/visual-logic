/* src/app/router.js */
"use strict";

(function registerRouter() {
  const app = window.VisualLogic = window.VisualLogic || {};

  app.router = app.router || {};

  app.router.parseHash = function parseHash() {
    const raw = window.location.hash.replace(/^#\/?/, "").trim();

    if (!raw) {
      return {
        name: app.config.DEFAULT_ROUTE,
        params: {}
      };
    }

    const parts = raw.split("/").filter(Boolean);
    const name = parts[0] || app.config.DEFAULT_ROUTE;
    const params = {
      segments: parts.slice(1)
    };

    if (name === "editor" && parts[1]) {
      params.id = decodeURIComponent(parts[1]);
    }

    if (name === "export" && parts[1]) {
      params.id = decodeURIComponent(parts[1]);
    }

    return {
      name: app.config.ROUTES.includes(name) ? name : app.config.DEFAULT_ROUTE,
      params: params
    };
  };

  app.router.resolve = function resolve() {
    return app.router.parseHash();
  };

  app.router.go = function go(routeName, params) {
    const safeRoute = app.config.ROUTES.includes(routeName)
      ? routeName
      : app.config.DEFAULT_ROUTE;

    let hash = "#/" + safeRoute;

    if (params && params.id) {
      hash += "/" + encodeURIComponent(params.id);
    }

    if (window.location.hash === hash) {
      if (typeof app.render === "function") {
        app.render();
      }
      return;
    }

    window.location.hash = hash;
  };

  app.router.backToHome = function backToHome() {
    app.router.go("home");
  };

  app.resolveRoute = function resolveRoute() {
    return app.router.resolve();
  };

  app.navigate = function navigate(routeName, params) {
    return app.router.go(routeName, params);
  };
})();