/* modules/translator/translator-utils.js */
"use strict";

(function registerTranslatorUtils() {
  const app = window.VisualLogic;

  app.translator = app.translator || {};
  app.translator.utils = app.translator.utils || {};

  app.translator.utils.escapeSingleQuotes = function escapeSingleQuotes(value) {
    return String(value || "").replace(/'/g, "\\'");
  };

  app.translator.utils.indent = function indent(text, level) {
    const size = Number(level || 1);
    const pad = "  ".repeat(size);

    return String(text || "")
      .split("\n")
      .map(function (line) {
        return line ? pad + line : line;
      })
      .join("\n");
  };

  app.translator.utils.normalizeLabel = function normalizeLabel(value, fallback) {
    const output = String(value || fallback || "valor").trim();
    return output || String(fallback || "valor");
  };
})();