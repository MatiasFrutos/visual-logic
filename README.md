<div align="center">

# ⚡ Visual Logic

<img src="https://readme-typing-svg.demolab.com?font=Inter&weight=700&size=24&pause=1000&color=2563EB&center=true&vCenter=true&width=700&lines=Diagramas+de+flujo+simples+y+modernos;Editor+visual+local+sin+backend;Exportaci%C3%B3n+a+pseudoc%C3%B3digo%2C+JavaScript+y+JSON" alt="Typing SVG" />

<br />

![HTML](https://img.shields.io/badge/HTML5-ffffff?style=for-the-badge&logo=html5&logoColor=E34F26)
![CSS](https://img.shields.io/badge/CSS3-ffffff?style=for-the-badge&logo=css3&logoColor=1572B6)
![JavaScript](https://img.shields.io/badge/JavaScript-ffffff?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![LocalStorage](https://img.shields.io/badge/LocalStorage-ffffff?style=for-the-badge&logo=databricks&logoColor=2563EB)

</div>

---

## ✨ Descripción

**Visual Logic** es una aplicación web liviana para crear diagramas de flujo de forma visual, rápida y local.

El proyecto está pensado para trabajar sin backend, sin cuentas y sin configuración compleja. Todo se guarda directamente en el navegador mediante **LocalStorage**, permitiendo crear, editar, conectar y exportar diagramas de manera simple.

---

## 🚀 Características

- Editor visual de diagramas de flujo.
- Nodos con distintos tipos y formas.
- Conexiones entre bloques.
- Modo seleccionar.
- Modo conectar.
- Modo borrar conexión rápido.
- Inspector de propiedades del nodo.
- Toolbar moderna y responsive.
- Sidebar con bloques visuales.
- Exportación de:
  - Pseudocódigo.
  - JavaScript.
  - JSON.
- Guardado local automático.
- Interfaz responsive.
- UI moderna con iconos Lucide.

---

## 🧠 Flujo de uso

Inicio → Crear diagrama → Editor visual → Generar lógica → Exportar

---

## 🖼️ Vista general

Visual Logic
├── Home
│   ├── Crear diagrama
│   ├── Abrir recientes
│   └── Eliminar diagramas locales
│
├── Editor
│   ├── Agregar nodos
│   ├── Conectar bloques
│   ├── Borrar conexiones
│   ├── Editar propiedades
│   └── Generar lógica
│
└── Exportar
    ├── Copiar pseudocódigo
    ├── Copiar JavaScript
    └── Descargar JSON

---

## 🛠️ Tecnologías

- **HTML5**
- **CSS3**
- **JavaScript Vanilla**
- **Lucide Icons**
- **LocalStorage**

Sin frameworks pesados. Sin backend. Sin build obligatorio.

---

## 📁 Estructura del proyecto

visual-logic/
├── index.html
├── src/
│   ├── app/
│   │   ├── app.js
│   │   ├── config.js
│   │   ├── router.js
│   │   └── state.js
│   │
│   ├── core/
│   │   ├── events.js
│   │   ├── helpers.js
│   │   ├── ids.js
│   │   └── validators.js
│   │
│   ├── modules/
│   │   ├── canvas/
│   │   ├── connections/
│   │   ├── exporter/
│   │   ├── inspector/
│   │   ├── nodes/
│   │   ├── storage/
│   │   └── translator/
│   │
│   ├── pages/
│   │   ├── home/
│   │   ├── editor/
│   │   └── export/
│   │
│   ├── styles/
│   │   ├── base.css
│   │   ├── components.css
│   │   ├── layout.css
│   │   ├── themes.css
│   │   └── utilities.css
│   │
│   └── ui/
│       ├── empty-state.js
│       ├── footer.js
│       ├── header.js
│       ├── inspector-panel.js
│       ├── modal.js
│       ├── sidebar.js
│       ├── toast.js
│       └── toolbar.js

---

## ▶️ Cómo ejecutar

Cloná el repositorio:

git clone https://github.com/MatiasFrutos/visual-logic.git

Entrá al proyecto:

cd visual-logic

Abrí index.html en el navegador o usá un servidor local:

npx serve .

También podés usar Live Server desde VS Code.

---

## 📦 Exportación

Visual Logic permite exportar el diagrama activo en formato JSON.

También permite copiar la lógica generada como:

- Pseudocódigo
- JavaScript

---

## 💡 Objetivo del proyecto

Este proyecto busca ofrecer una herramienta simple para pensar procesos visualmente, sin depender de plataformas pesadas.

Ideal para:

- Diagramas rápidos.
- Prototipos de lógica.
- Flujos de decisión.
- Bocetos técnicos.
- Documentación visual simple.
- Ideas iniciales de automatización.

---

## 🧩 Estado

Versión: MVP funcional
Modo: Frontend local
Persistencia: LocalStorage
Backend: No requerido

---

## 👨‍💻 Autor

Creado por **Zernyx Tech Studio - 2026**

GitHub: [@MatiasFrutos](https://github.com/MatiasFrutos)

---

<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Inter&weight=700&size=18&pause=1000&color=2563EB&center=true&vCenter=true&width=600&lines=Visual+Logic;Pensar+mejor%2C+diagramar+m%C3%A1s+r%C3%A1pido" alt="Footer Typing SVG" />

</div>
