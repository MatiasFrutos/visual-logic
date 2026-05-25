/* ui/modal.js */
"use strict";

(function registerModal() {
  const app = window.VisualLogic;

  app.ui.modal = function modal(config) {
    return `
      <div class="vl-modal-backdrop" id="vl-modal">
        <div class="vl-modal">
          <div class="vl-split">
            <h3 class="vl-section-title">${app.helpers.escapeHtml(config?.title || "Modal")}</h3>
            <button class="vl-btn vl-btn-ghost" id="vl-modal-close">Cerrar</button>
          </div>
          <div class="vl-divider"></div>
          <div>${config?.content || ""}</div>
        </div>
      </div>
    `;
  };

  app.ui.bindModal = function bindModal() {
    const close = document.getElementById("vl-modal-close");
    const backdrop = document.getElementById("vl-modal");

    if (close) {
      close.addEventListener("click", function () {
        backdrop?.remove();
      });
    }

    if (backdrop) {
      backdrop.addEventListener("click", function (event) {
        if (event.target === backdrop) {
          backdrop.remove();
        }
      });
    }
  };
})();