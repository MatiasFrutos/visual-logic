/* src/core/helpers.js */
"use strict";

(function registerCoreHelpers() {
  const app = window.VisualLogic = window.VisualLogic || {};
  app.helpers = app.helpers || {};

  app.helpers.now = function now() {
    return new Date().toISOString();
  };

  app.helpers.escapeHtml = function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  app.helpers.uid = function uid(prefix) {
    const safePrefix = prefix || "id";
    return safePrefix + "_" + Math.random().toString(36).slice(2, 10) + "_" + Date.now().toString(36);
  };

  app.helpers.clamp = function clamp(value, min, max) {
    const number = Number(value);
    const safeValue = Number.isFinite(number) ? number : 0;
    return Math.min(Math.max(safeValue, min), max);
  };

  app.helpers.deepClone = function deepClone(value) {
    try {
      return JSON.parse(JSON.stringify(value));
    } catch (error) {
      console.error("[VisualLogic.helpers.deepClone]", error);
      return value;
    }
  };

  app.helpers.downloadFile = function downloadFile(filename, content, mimeType) {
    const blob = new Blob([content], {
      type: mimeType || "text/plain;charset=utf-8"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename || "download.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 150);
  };

  app.helpers.readableDate = function readableDate(value) {
    if (!value) return "-";

    try {
      return new Date(value).toLocaleString("es-AR");
    } catch (error) {
      console.error("[VisualLogic.helpers.readableDate]", error);
      return String(value);
    }
  };

  app.helpers.slugify = function slugify(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  app.helpers.copyToClipboard = async function copyToClipboard(text) {
    const value = String(text ?? "");

    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }

    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "readonly");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();

    return true;
  };
})();