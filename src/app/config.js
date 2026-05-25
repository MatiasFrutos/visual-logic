/* src/app/config.js */
"use strict";

(function registerAppConfig() {
  const app = window.VisualLogic = window.VisualLogic || {};

  app.config = {
    APP_NAME: "Visual Logic",
    VERSION: "1.0.0",
    THEME_STORAGE_KEY: "visual_logic_theme_v1",
    STORAGE_KEY: "visual_logic_diagrams_v1",
    ACTIVE_KEY: "visual_logic_active_diagram_v1",
    DEFAULT_ROUTE: "home",
    ROUTES: ["home", "editor", "export"],
    CANVAS: {
      ZOOM_MIN: 0.5,
      ZOOM_MAX: 1.8,
      ZOOM_STEP: 0.1,
      GRID_SIZE: 24
    },
    DEFAULT_DIAGRAM_NAME: "Nuevo diagrama",
    DEFAULT_THEME: "dark"
  };

  app.APP_NAME = app.config.APP_NAME;
  app.STORAGE_KEY = app.config.STORAGE_KEY;
  app.ACTIVE_KEY = app.config.ACTIVE_KEY;

  if (!document.body.getAttribute("data-theme")) {
    const savedTheme = localStorage.getItem(app.config.THEME_STORAGE_KEY) || app.config.DEFAULT_THEME;
    document.body.setAttribute("data-theme", savedTheme);
  }
})();