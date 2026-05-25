<div align="center">

# Visual Logic

<img src="https://readme-typing-svg.demolab.com?font=Inter&weight=700&size=24&pause=1000&color=2563EB&center=true&vCenter=true&width=720&lines=Diagramas+de+flujo+simples+y+modernos;Editor+visual+local+sin+backend;Exportaci%C3%B3n+a+pseudoc%C3%B3digo%2C+JavaScript+y+JSON" alt="Visual Logic animated header" />

<br />

![HTML](https://img.shields.io/badge/HTML5-ffffff?style=for-the-badge&logo=html5&logoColor=E34F26)
![CSS](https://img.shields.io/badge/CSS3-ffffff?style=for-the-badge&logo=css3&logoColor=1572B6)
![JavaScript](https://img.shields.io/badge/JavaScript-ffffff?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![LocalStorage](https://img.shields.io/badge/LocalStorage-ffffff?style=for-the-badge&logo=databricks&logoColor=2563EB)

</div>

---

## Descripción

**Visual Logic** es una aplicación web liviana para crear diagramas de flujo de forma visual, rápida y local.

El proyecto está pensado para trabajar sin backend, sin cuentas y sin configuración compleja. Todo se guarda directamente en el navegador mediante **LocalStorage**, permitiendo crear, editar, conectar y exportar diagramas de manera simple.

---

## Características

- Editor visual de diagramas de flujo.
- Nodos con distintos tipos y formas.
- Conexiones entre bloques.
- Modo seleccionar.
- Modo conectar.
- Modo borrar conexión rápido.
- Inspector de propiedades del nodo.
- Toolbar moderna y responsive.
- Sidebar con bloques visuales.
- Exportación de pseudocódigo.
- Exportación de JavaScript.
- Descarga del diagrama en JSON.
- Guardado local automático.
- Interfaz responsive.
- UI moderna con iconos Lucide.

---

## Flujo de uso

```txt
Inicio
  ↓
Crear diagrama
  ↓
Editor visual
  ↓
Agregar nodos y conexiones
  ↓
Generar lógica
  ↓
Exportar pseudocódigo, JavaScript o JSON
```

---

## Vista general

```txt
Visual Logic
│
├─ Inicio
│  ├─ Crear nuevo diagrama
│  ├─ Ver diagramas recientes
│  ├─ Abrir diagrama guardado
│  └─ Eliminar diagrama local
│
├─ Editor
│  ├─ Agregar nodos
│  ├─ Elegir tipo de bloque
│  ├─ Mover elementos en la pizarra
│  ├─ Conectar nodos
│  ├─ Borrar conexiones
│  ├─ Editar texto y tipo desde el inspector
│  ├─ Limpiar pizarra
│  └─ Generar lógica
│
└─ Exportar
   ├─ Ver pseudocódigo
   ├─ Ver JavaScript generado
   ├─ Copiar salidas
   └─ Descargar JSON
```

---

## Tecnologías

- **HTML5**
- **CSS3**
- **JavaScript Vanilla**
- **Lucide Icons**
- **LocalStorage**

Sin frameworks pesados. Sin backend. Sin build obligatorio.

---

## Estructura del proyecto

```txt
visual-logic/
│
├─ index.html
│
└─ src/
   │
   ├─ app/
   │  ├─ app.js
   │  ├─ config.js
   │  ├─ router.js
   │  └─ state.js
   │
   ├─ core/
   │  ├─ events.js
   │  ├─ helpers.js
   │  ├─ ids.js
   │  └─ validators.js
   │
   ├─ modules/
   │  │
   │  ├─ canvas/
   │  │  ├─ canvas.js
   │  │  ├─ grid.js
   │  │  ├─ selection.js
   │  │  └─ zoom.js
   │  │
   │  ├─ connections/
   │  │  ├─ connection-actions.js
   │  │  ├─ connection-path.js
   │  │  ├─ connection-render.js
   │  │  └─ connections.js
   │  │
   │  ├─ exporter/
   │  │  ├─ copy-output.js
   │  │  ├─ export-image.js
   │  │  └─ export-json.js
   │  │
   │  ├─ inspector/
   │  │  └─ inspector.js
   │  │
   │  ├─ nodes/
   │  │  ├─ node-actions.js
   │  │  ├─ node-render.js
   │  │  ├─ node-types.js
   │  │  └─ nodes.js
   │  │
   │  ├─ storage/
   │  │  └─ storage.js
   │  │
   │  └─ translator/
   │     ├─ flow-parser.js
   │     ├─ javascript.js
   │     ├─ pseudocode.js
   │     └─ translator-utils.js
   │
   ├─ pages/
   │  │
   │  ├─ home/
   │  │  ├─ home.page.css
   │  │  └─ home.page.js
   │  │
   │  ├─ editor/
   │  │  ├─ editor.page.css
   │  │  └─ editor.page.js
   │  │
   │  └─ export/
   │     ├─ export.page.css
   │     └─ export.page.js
   │
   ├─ styles/
   │  ├─ base.css
   │  ├─ components.css
   │  ├─ layout.css
   │  ├─ themes.css
   │  └─ utilities.css
   │
   └─ ui/
      ├─ empty-state.js
      ├─ footer.js
      ├─ header.js
      ├─ inspector-panel.js
      ├─ modal.js
      ├─ sidebar.js
      ├─ toast.js
      └─ toolbar.js
```

---

## Cómo ejecutar

Abrí `index.html` directamente en el navegador o usá un servidor local.

```bash
npx serve .
```

También podés usar Live Server desde VS Code.

---

## Exportación

Visual Logic permite exportar el diagrama activo en formato JSON.

También permite copiar la lógica generada como:

- Pseudocódigo.
- JavaScript.

---

## Objetivo del proyecto

Este proyecto busca ofrecer una herramienta simple para pensar procesos visualmente, sin depender de plataformas pesadas.

Ideal para:

- Diagramas rápidos.
- Prototipos de lógica.
- Flujos de decisión.
- Bocetos técnicos.
- Documentación visual simple.
- Ideas iniciales de automatización.

---

## Autor

Creado por **Zernyx Tech Studio - 2026**

---

<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Inter&weight=700&size=18&pause=1000&color=2563EB&center=true&vCenter=true&width=620&lines=Visual+Logic;Pensar+mejor%2C+diagramar+m%C3%A1s+r%C3%A1pido" alt="Visual Logic footer animation" />

</div>
