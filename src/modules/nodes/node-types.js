"use strict";

(function registerNodeTypes() {
  const app = window.VisualLogic;

  app.nodeTypes = [
    {
      key: "start",
      label: "Inicio",
      shortLabel: "START",
      shape: "terminator",
      defaultWidth: 170,
      defaultHeight: 74
    },
    {
      key: "end",
      label: "Fin",
      shortLabel: "END",
      shape: "terminator",
      defaultWidth: 170,
      defaultHeight: 74
    },
    {
      key: "process",
      label: "Proceso",
      shortLabel: "PROCESS",
      shape: "process",
      defaultWidth: 190,
      defaultHeight: 86
    },
    {
      key: "decision",
      label: "Decisión",
      shortLabel: "DECISION",
      shape: "decision",
      defaultWidth: 170,
      defaultHeight: 170
    },
    {
      key: "input",
      label: "Entrada",
      shortLabel: "INPUT",
      shape: "input",
      defaultWidth: 200,
      defaultHeight: 84
    },
    {
      key: "output",
      label: "Salida",
      shortLabel: "OUTPUT",
      shape: "output",
      defaultWidth: 200,
      defaultHeight: 84
    },
    {
      key: "document",
      label: "Documento",
      shortLabel: "DOC",
      shape: "document",
      defaultWidth: 200,
      defaultHeight: 96
    },
    {
      key: "database",
      label: "Base de datos",
      shortLabel: "DB",
      shape: "database",
      defaultWidth: 190,
      defaultHeight: 110
    },
    {
      key: "subprocess",
      label: "Subproceso",
      shortLabel: "SUB",
      shape: "subprocess",
      defaultWidth: 210,
      defaultHeight: 86
    },
    {
      key: "manual-input",
      label: "Ingreso manual",
      shortLabel: "MANUAL",
      shape: "manual-input",
      defaultWidth: 200,
      defaultHeight: 90
    },
    {
      key: "connector",
      label: "Conector",
      shortLabel: "LINK",
      shape: "connector",
      defaultWidth: 94,
      defaultHeight: 94
    }
  ];

  app.getNodeType = function getNodeType(type) {
    return app.nodeTypes.find(function (item) {
      return item.key === type;
    }) || app.nodeTypes.find(function (item) {
      return item.key === "process";
    });
  };
})();