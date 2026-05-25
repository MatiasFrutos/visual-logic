/* ui/toast.js */
"use strict";

(function registerToast() {
  const app = window.VisualLogic;

  app.showToast = function showToast(message, type) {
    const id = "vl-toast-root";
    let root = document.getElementById(id);

    if (!root) {
      root = document.createElement("div");
      root.id = id;
      root.className = "vl-toast-root";
      document.body.appendChild(root);
    }

    const item = document.createElement("div");
    item.className = "vl-toast " + (type ? "is-" + type : "is-default");
    item.textContent = message;

    root.appendChild(item);

    requestAnimationFrame(function () {
      item.classList.add("is-visible");
    });

    setTimeout(function () {
      item.classList.remove("is-visible");
      setTimeout(function () {
        item.remove();
      }, 220);
    }, 2200);
  };
})();