/* modules/translator/javascript.js */
"use strict";

(function registerTranslatorJavascript() {
  const app = window.VisualLogic;

  app.translator = app.translator || {};

  app.translator.toJavaScript = function toJavaScript(parsed) {
    const model = parsed || app.translator.parse();
    const lines = [
      "function main() {"
    ];

    if (!model.sequence.length) {
      lines.push("  // No hay nodos para procesar");
      lines.push("}");
      lines.push("");
      lines.push("main();");
      return lines.join("\n");
    }

    model.sequence.forEach(function (step) {
      switch (step.type) {
        case "start":
          lines.push("  // Inicio del flujo");
          break;
        case "input":
          lines.push("  const entrada_" + step.step + " = prompt('" + app.translator.utils.escapeSingleQuotes(step.label) + "');");
          break;
        case "process":
          lines.push("  // Proceso: " + step.label);
          break;
        case "decision":
          lines.push("  if (condicion_" + step.step + ") {");
          lines.push("    console.log('" + app.translator.utils.escapeSingleQuotes(step.label) + "');");
          lines.push("  }");
          break;
        case "output":
          lines.push("  console.log('" + app.translator.utils.escapeSingleQuotes(step.label) + "');");
          break;
        case "end":
          lines.push("  // Fin del flujo");
          break;
        default:
          lines.push("  // Nodo: " + step.label);
      }
    });

    lines.push("}");
    lines.push("");
    lines.push("main();");

    return lines.join("\n");
  };

  app.translator.generateJavaScript = function generateJavaScript() {
    const parsed = app.translator.parse();
    const output = app.translator.toJavaScript(parsed);

    const activeId = app.storage.getActiveId();
    if (activeId) {
      app.storage.updateDiagram(activeId, { javascript: output });
    }

    return output;
  };
})();