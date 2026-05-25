/* modules/translator/pseudocode.js */
"use strict";

(function registerTranslatorPseudocode() {
  const app = window.VisualLogic;

  app.translator = app.translator || {};

  app.translator.toPseudocode = function toPseudocode(parsed) {
    const model = parsed || app.translator.parse();
    const lines = [];

    if (!model.sequence.length) {
      return "SIN NODOS";
    }

    model.sequence.forEach(function (step) {
      switch (step.type) {
        case "start":
          lines.push("INICIO");
          break;
        case "input":
          lines.push("LEER " + step.label.toUpperCase());
          break;
        case "process":
          lines.push("PROCESAR " + step.label.toUpperCase());
          break;
        case "decision":
          lines.push("SI " + step.label.toUpperCase() + " ENTONCES");
          lines.push("  MOSTRAR RESULTADO");
          lines.push("FIN SI");
          break;
        case "output":
          lines.push("MOSTRAR " + step.label.toUpperCase());
          break;
        case "end":
          lines.push("FIN");
          break;
        default:
          lines.push(step.label.toUpperCase());
      }
    });

    return lines.join("\n");
  };

  app.translator.generatePseudocode = function generatePseudocode() {
    const parsed = app.translator.parse();
    const output = app.translator.toPseudocode(parsed);

    const activeId = app.storage.getActiveId();
    if (activeId) {
      app.storage.updateDiagram(activeId, { pseudocode: output });
    }

    return output;
  };
})();