/* src/modules/storage/storage.js */
"use strict";

(function registerStorageModule() {
  const app = window.VisualLogic = window.VisualLogic || {};
  app.storage = app.storage || {};

  function getStorageKey() {
    return (app.config && app.config.STORAGE_KEY) || "visual_logic_diagrams_v1";
  }

  function getActiveKey() {
    return (app.config && app.config.ACTIVE_KEY) || "visual_logic_active_diagram_v1";
  }

  function now() {
    if (app.helpers && typeof app.helpers.now === "function") {
      return app.helpers.now();
    }
    return new Date().toISOString();
  }

  function safeParse(value, fallback) {
    try {
      return JSON.parse(value);
    } catch (error) {
      return fallback;
    }
  }

  app.storage.getAll = function getAll() {
    const raw = localStorage.getItem(getStorageKey());
    const data = safeParse(raw, []);
    return Array.isArray(data) ? data : [];
  };

  app.storage.saveAll = function saveAll(diagrams) {
    const safe = Array.isArray(diagrams) ? diagrams : [];
    localStorage.setItem(getStorageKey(), JSON.stringify(safe));
    return safe;
  };

  app.storage.getActiveId = function getActiveId() {
    return localStorage.getItem(getActiveKey()) || "";
  };

  app.storage.setActiveId = function setActiveId(id) {
    const safeId = String(id || "");
    localStorage.setItem(getActiveKey(), safeId);

    if (app.state && typeof app.state.setSelectedDiagramId === "function") {
      app.state.setSelectedDiagramId(safeId);
    }

    return safeId;
  };

  app.storage.getById = function getById(id) {
    if (!id) return null;

    return app.storage.getAll().find(function (item) {
      return item.id === id;
    }) || null;
  };

  app.storage.getActive = function getActive() {
    const activeId = app.storage.getActiveId();
    return app.storage.getById(activeId);
  };

  app.storage.createDiagram = function createDiagram(name) {
    const diagrams = app.storage.getAll();

    const startNodeId = app.ids && typeof app.ids.node === "function"
      ? app.ids.node()
      : "node_start_" + Date.now();

    const processNodeId = app.ids && typeof app.ids.node === "function"
      ? app.ids.node()
      : "node_process_" + Date.now();

    const endNodeId = app.ids && typeof app.ids.node === "function"
      ? app.ids.node()
      : "node_end_" + Date.now();

    const diagramId = app.ids && typeof app.ids.diagram === "function"
      ? app.ids.diagram()
      : "diagram_" + Date.now();

    const item = {
      id: diagramId,
      name: String(name || (app.config && app.config.DEFAULT_DIAGRAM_NAME) || "Nuevo diagrama"),
      createdAt: now(),
      updatedAt: now(),
      viewport: { zoom: 1, x: 0, y: 0 },
      nodes: [
        { id: startNodeId, type: "start", label: "Inicio", x: 120, y: 120, width: 170, height: 72, config: {} },
        { id: processNodeId, type: "process", label: "Proceso", x: 380, y: 120, width: 220, height: 82, config: {} },
        { id: endNodeId, type: "end", label: "Fin", x: 700, y: 120, width: 170, height: 72, config: {} }
      ],
      connections: [
        {
          id: app.ids && typeof app.ids.connection === "function" ? app.ids.connection() : "connection_1_" + Date.now(),
          from: startNodeId,
          to: processNodeId,
          fromAnchor: "right",
          toAnchor: "left",
          label: ""
        },
        {
          id: app.ids && typeof app.ids.connection === "function" ? app.ids.connection() : "connection_2_" + Date.now(),
          from: processNodeId,
          to: endNodeId,
          fromAnchor: "right",
          toAnchor: "left",
          label: ""
        }
      ],
      pseudocode: "INICIO\nPROCESAR PROCESO\nFIN",
      javascript: "function main() {\n  // Proceso\n}\n\nmain();"
    };

    diagrams.unshift(item);
    app.storage.saveAll(diagrams);
    app.storage.setActiveId(item.id);

    return item;
  };

  app.storage.updateDiagram = function updateDiagram(id, patch) {
    if (!id) return null;

    const diagrams = app.storage.getAll();
    let updatedItem = null;

    const next = diagrams.map(function (item) {
      if (item.id !== id) return item;

      updatedItem = Object.assign({}, item, patch || {}, {
        updatedAt: now()
      });

      return updatedItem;
    });

    app.storage.saveAll(next);
    return updatedItem;
  };

  app.storage.removeDiagram = function removeDiagram(id) {
    if (!id) return [];

    const next = app.storage.getAll().filter(function (item) {
      return item.id !== id;
    });

    app.storage.saveAll(next);

    if (app.storage.getActiveId() === id) {
      app.storage.setActiveId(next[0] ? next[0].id : "");
    }

    return next;
  };

  app.storage.bootstrap = function bootstrap() {
    const items = app.storage.getAll();

    if (!items.length) {
      const initial = app.storage.createDiagram("Primer diagrama");
      return initial;
    }

    const normalized = items.map(function (item) {
      if (app.validators && typeof app.validators.ensureDiagramShape === "function") {
        return app.validators.ensureDiagramShape(item);
      }

      return item;
    });

    app.storage.saveAll(normalized);

    const activeId = app.storage.getActiveId();
    const activeExists = normalized.some(function (item) {
      return item.id === activeId;
    });

    if (!activeExists) {
      app.storage.setActiveId(normalized[0].id);
    }

    return app.storage.getActive();
  };
})();