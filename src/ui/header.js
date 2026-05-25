/* ui/header.js */
"use strict";

(function registerHeader() {
  const app = window.VisualLogic;

  const HEADER_STYLE_ID = "vl-header-own-styles";

  function injectHeaderStyles() {
    if (document.getElementById(HEADER_STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = HEADER_STYLE_ID;
    style.textContent = `
      .vl-header {
        width: 100%;
        min-height: 58px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 9px 14px;
        border-bottom: 1px solid rgba(15, 23, 42, 0.08);
        background: rgba(255, 255, 255, 0.94);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        box-sizing: border-box;
        position: sticky;
        top: 0;
        z-index: 40;
      }

      .vl-header-inner {
        width: 100%;
        max-width: 1440px;
        min-height: 40px;
        display: grid;
        grid-template-columns: minmax(190px, 1fr) auto minmax(90px, 1fr);
        align-items: center;
        gap: 12px;
        padding: 0;
        box-sizing: border-box;
      }

      .vl-brand {
        min-width: 0;
        display: inline-flex;
        align-items: center;
        justify-self: start;
        gap: 10px;
        cursor: pointer;
        user-select: none;
      }

      .vl-brand-mark {
        width: 38px;
        height: 38px;
        min-width: 38px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(37, 99, 235, 0.18);
        border-radius: 12px;
        background: #2563eb;
        color: #ffffff;
        font-size: 12px;
        font-weight: 950;
        line-height: 1;
        letter-spacing: 0;
        box-shadow: 0 12px 22px rgba(37, 99, 235, 0.22);
        box-sizing: border-box;
      }

      .vl-brand-copy {
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 3px;
      }

      .vl-brand-copy strong {
        color: #0f172a;
        font-size: 14px;
        font-weight: 950;
        line-height: 1.1;
        letter-spacing: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .vl-brand-copy span {
        color: #64748b;
        font-size: 11px;
        font-weight: 700;
        line-height: 1.15;
        letter-spacing: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .vl-header-nav {
        width: fit-content;
        max-width: 100%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 5px;
        border: 1px solid rgba(15, 23, 42, 0.08);
        border-radius: 15px;
        background: rgba(248, 250, 252, 0.94);
        box-shadow: 0 8px 18px rgba(15, 23, 42, 0.04);
        box-sizing: border-box;
        justify-self: center;
      }

      .vl-nav-link {
        min-height: 36px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 0 12px;
        border: 0;
        border-radius: 12px;
        background: transparent;
        color: #475569;
        font-size: 13px;
        font-weight: 850;
        line-height: 1;
        letter-spacing: 0;
        cursor: pointer;
        white-space: nowrap;
        transition:
          background 160ms ease,
          color 160ms ease,
          box-shadow 160ms ease,
          transform 160ms ease;
      }

      .vl-nav-link:hover {
        background: rgba(37, 99, 235, 0.08);
        color: #2563eb;
      }

      .vl-nav-link:active {
        transform: scale(0.97);
      }

      .vl-nav-link.is-active {
        background: #ffffff;
        color: #2563eb;
        box-shadow: 0 9px 18px rgba(15, 23, 42, 0.08);
      }

      .vl-nav-link i,
      .vl-nav-link svg {
        width: 18px;
        height: 18px;
        display: block;
        flex: 0 0 auto;
        stroke-width: 2.35;
      }

      .vl-header-actions {
        min-width: 0;
        display: inline-flex;
        align-items: center;
        justify-content: flex-end;
        gap: 8px;
        justify-self: end;
      }

      .vl-header-chip {
        min-height: 34px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 0 12px;
        border: 1px solid rgba(37, 99, 235, 0.14);
        border-radius: 999px;
        background: rgba(37, 99, 235, 0.07);
        color: #1d4ed8;
        font-size: 12px;
        font-weight: 900;
        line-height: 1;
        white-space: nowrap;
        box-sizing: border-box;
      }

      .vl-header-chip i,
      .vl-header-chip svg {
        width: 17px;
        height: 17px;
        display: block;
        flex: 0 0 auto;
        stroke-width: 2.35;
      }

      @media (max-width: 900px) {
        .vl-header {
          min-height: auto;
          padding: 9px 10px;
        }

        .vl-header-inner {
          grid-template-columns: minmax(0, 1fr) auto;
          grid-template-areas:
            "brand chip"
            "nav nav";
          gap: 9px;
        }

        .vl-brand {
          grid-area: brand;
        }

        .vl-header-nav {
          grid-area: nav;
          width: 100%;
          justify-self: stretch;
          justify-content: space-between;
        }

        .vl-header-actions {
          grid-area: chip;
        }

        .vl-nav-link {
          flex: 1 1 0;
          min-width: 0;
        }
      }

      @media (max-width: 620px) {
        .vl-header {
          padding: 8px;
        }

        .vl-header-inner {
          grid-template-columns: 1fr;
          grid-template-areas:
            "brand"
            "nav";
        }

        .vl-brand {
          width: 100%;
        }

        .vl-brand-mark {
          width: 36px;
          height: 36px;
          min-width: 36px;
          border-radius: 11px;
        }

        .vl-header-actions {
          display: none;
        }

        .vl-header-nav {
          gap: 5px;
          padding: 5px;
          overflow-x: auto;
          scrollbar-width: none;
        }

        .vl-header-nav::-webkit-scrollbar {
          display: none;
        }

        .vl-nav-link {
          min-height: 36px;
          padding: 0 10px;
          font-size: 12px;
        }

        .vl-nav-link i,
        .vl-nav-link svg {
          width: 17px;
          height: 17px;
        }
      }

      @media (max-width: 420px) {
        .vl-brand-copy span {
          display: none;
        }

        .vl-header-nav {
          justify-content: flex-start;
        }

        .vl-nav-link {
          flex: 1 0 auto;
          min-width: 92px;
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

  app.ui.header = function header(options) {
    injectHeaderStyles();

    const activeRoute = options?.activeRoute || "home";

    return `
      <header class="vl-header">
        <div class="vl-page vl-header-inner">
          <div class="vl-brand" data-route-home>
            <div class="vl-brand-mark">VL</div>
            <div class="vl-brand-copy">
              <strong>Visual Logic</strong>
              <span>Diagramas de flujo + lógica visual</span>
            </div>
          </div>

          <nav class="vl-header-nav" aria-label="Navegación principal">
            <button class="vl-nav-link ${activeRoute === "home" ? "is-active" : ""}" data-route="home" type="button">
              ${icon("home")}
              <span>Inicio</span>
            </button>

            <button class="vl-nav-link ${activeRoute === "editor" ? "is-active" : ""}" data-route="editor" type="button">
              ${icon("workflow")}
              <span>Editor</span>
            </button>

            <button class="vl-nav-link ${activeRoute === "export" ? "is-active" : ""}" data-route="export" type="button">
              ${icon("file-down")}
              <span>Exportar</span>
            </button>
          </nav>

          <div class="vl-header-actions">
            <span class="vl-header-chip">
              ${icon("sparkles")}
              <span>Flow</span>
            </span>
          </div>
        </div>
      </header>
    `;
  };

  app.ui.bindHeader = function bindHeader() {
    injectHeaderStyles();

    document.querySelectorAll("[data-route]").forEach(function (button) {
      button.addEventListener("click", function () {
        const route = button.getAttribute("data-route");
        app.navigate(route);
      });
    });

    const goHome = document.querySelector("[data-route-home]");
    if (goHome) {
      goHome.addEventListener("click", function () {
        app.navigate("home");
      });
    }

    renderLucideIcons();
  };
})();