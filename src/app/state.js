/* src/app/state.js */
"use strict";

(function registerAppState() {
  const app = window.VisualLogic = window.VisualLogic || {};

  const themeKey = (app.config && app.config.THEME_STORAGE_KEY) || "visual_logic_theme_v1";
  const savedTheme = localStorage.getItem(themeKey) || "dark";

  app.state = {
    route: "home",
    params: {},
    theme: savedTheme,
    modalOpen: false,
    selectedNodeType: "process",
    selectedLanguage: "pseudocode",
    selectedDiagramId: "",
    lastGeneratedAt: null,

    currentTool: "select",
    pendingConnectionFrom: null,
    isDragging: false
  };

  app.state.getTheme = function getTheme() {
    return app.state.theme;
  };

  app.state.setTheme = function setTheme(theme) {
    const nextTheme = theme === "light" ? "light" : "dark";
    app.state.theme = nextTheme;
    localStorage.setItem(themeKey, nextTheme);
    document.body.setAttribute("data-theme", nextTheme);

    if (app.events && typeof app.events.emit === "function") {
      app.events.emit("theme:changed", nextTheme);
    }

    return nextTheme;
  };

  app.state.toggleTheme = function toggleTheme() {
    return app.state.setTheme(app.state.theme === "dark" ? "light" : "dark");
  };

  app.state.setSelectedNodeType = function setSelectedNodeType(type) {
    app.state.selectedNodeType = type || "process";

    if (app.events && typeof app.events.emit === "function") {
      app.events.emit("state:selected-node-type", app.state.selectedNodeType);
    }

    return app.state.selectedNodeType;
  };

  app.state.setSelectedLanguage = function setSelectedLanguage(language) {
    app.state.selectedLanguage = language === "javascript" ? "javascript" : "pseudocode";

    if (app.events && typeof app.events.emit === "function") {
      app.events.emit("state:selected-language", app.state.selectedLanguage);
    }

    return app.state.selectedLanguage;
  };

  app.state.setSelectedDiagramId = function setSelectedDiagramId(id) {
    app.state.selectedDiagramId = id || "";

    if (app.events && typeof app.events.emit === "function") {
      app.events.emit("state:selected-diagram", app.state.selectedDiagramId);
    }

    return app.state.selectedDiagramId;
  };

  app.state.markGenerated = function markGenerated() {
    app.state.lastGeneratedAt = new Date().toISOString();

    if (app.events && typeof app.events.emit === "function") {
      app.events.emit("state:generated", app.state.lastGeneratedAt);
    }

    return app.state.lastGeneratedAt;
  };

  app.state.setTool = function setTool(tool) {
    const safeTool = tool === "connect" ? "connect" : "select";
    app.state.currentTool = safeTool;

    if (safeTool !== "connect") {
      app.state.pendingConnectionFrom = null;
    }

    if (app.events && typeof app.events.emit === "function") {
      app.events.emit("state:tool-changed", safeTool);
    }

    return safeTool;
  };

  app.state.setPendingConnectionFrom = function setPendingConnectionFrom(nodeId) {
    app.state.pendingConnectionFrom = nodeId || null;

    if (app.events && typeof app.events.emit === "function") {
      app.events.emit("state:pending-connection", app.state.pendingConnectionFrom);
    }

    return app.state.pendingConnectionFrom;
  };

  app.state.setDragging = function setDragging(value) {
    app.state.isDragging = Boolean(value);

    if (app.events && typeof app.events.emit === "function") {
      app.events.emit("state:dragging", app.state.isDragging);
    }

    return app.state.isDragging;
  };

  document.body.setAttribute("data-theme", savedTheme);
})();