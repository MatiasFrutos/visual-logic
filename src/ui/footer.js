/* src/ui/footer.js */
"use strict";

(function registerFooter() {
  const app = window.VisualLogic;

  const FOOTER_STYLE_ID = "vl-footer-own-styles";

  function injectFooterStyles() {
    if (document.getElementById(FOOTER_STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = FOOTER_STYLE_ID;
    style.textContent = `
      .vl-footer {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 10px 14px 14px;
        box-sizing: border-box;
      }

      .vl-footer-inner {
        width: 100%;
        max-width: 1440px;
        min-height: 42px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 9px 12px;
        border: 1px solid rgba(15, 23, 42, 0.08);
        border-radius: 15px;
        background: rgba(255, 255, 255, 0.92);
        box-shadow:
          0 12px 26px rgba(15, 23, 42, 0.06),
          inset 0 1px 0 rgba(255, 255, 255, 0.88);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        box-sizing: border-box;
      }

      .vl-footer-brand {
        min-width: 0;
        display: inline-flex;
        align-items: center;
        gap: 9px;
        color: #475569;
        font-size: 12px;
        font-weight: 750;
        line-height: 1.2;
      }

      .vl-footer-brand i,
      .vl-footer-brand svg,
      .vl-footer-link i,
      .vl-footer-link svg {
        width: 16px;
        height: 16px;
        display: block;
        flex: 0 0 auto;
        stroke-width: 2.35;
      }

      .vl-footer-brand strong {
        color: #0f172a;
        font-weight: 900;
      }

      .vl-footer-link {
        min-height: 30px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
        padding: 0 10px;
        border: 1px solid rgba(15, 23, 42, 0.08);
        border-radius: 10px;
        background: rgba(248, 250, 252, 0.9);
        color: #334155;
        font-size: 11px;
        font-weight: 850;
        line-height: 1;
        text-decoration: none;
        white-space: nowrap;
        transition:
          background 150ms ease,
          border-color 150ms ease,
          color 150ms ease,
          transform 150ms ease;
      }

      .vl-footer-link:hover {
        transform: translateY(-1px);
        border-color: rgba(37, 99, 235, 0.2);
        background: #ffffff;
        color: #2563eb;
      }

      @media (max-width: 760px) {
        .vl-footer {
          padding: 8px;
        }

        .vl-footer-inner {
          align-items: stretch;
          flex-direction: column;
          gap: 9px;
          border-radius: 14px;
        }

        .vl-footer-brand {
          width: 100%;
          justify-content: flex-start;
        }

        .vl-footer-link {
          width: 100%;
        }
      }

      @media (max-width: 420px) {
        .vl-footer-brand {
          align-items: flex-start;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function icon(name) {
    return `<i data-lucide="${name}" aria-hidden="true"></i>`;
  }

  function renderLucideIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  app.ui.footer = function footer() {
    injectFooterStyles();

    return `
      <footer class="vl-footer">
        <div class="vl-footer-inner">
          <div class="vl-footer-brand">
            ${icon("sparkles")}
            <span>Creado por <strong>Zernyx Tech Studio</strong> - 2026</span>
          </div>

          <a
            class="vl-footer-link"
            href="https://github.com/MatiasFrutos"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir GitHub de Matias Frutos"
          >
            ${icon("github")}
            <span>GitHub</span>
          </a>
        </div>
      </footer>
    `;
  };

  app.ui.bindFooter = function bindFooter() {
    injectFooterStyles();
    renderLucideIcons();
  };
})();