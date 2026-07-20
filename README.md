# Vinyl Vibes — Final Aplicaciones Híbridas

Tienda de vinilos de música electrónica. Proyecto fullstack **MERN** (MongoDB, Express, React, Node.js) con autenticación JWT, panel de administración (BackOffice) y sitio público (FrontOffice).

**Alumno:** Lucas Raboni
**Materia:** Aplicaciones Híbridas — Escuela Da Vinci
**Examen:** Final

---

## 🌐 Sitio en producción

| Servicio | URL |
|---|---|
| **Sitio web (FrontOffice)** | https://final-raboni-vinyl-b243e.web.app |
| **API (Backend)** | https://final-raboni-backend.onrender.com |

> ⚠️ El backend está en el plan gratuito de Render, que se "duerme" tras 15 minutos de inactividad. La **primera** petición después de un rato puede tardar ~50 segundos en responder. Después funciona normal.

---

## 🛠️ Tecnologías

**Backend:** Node.js, Express 5, MongoDB Atlas, JWT (jsonwebtoken), bcryptjs, Yup, CORS, dotenv
**Frontend:** React 19, Vite, React Router v7, Bootstrap 5, React Hook Form

**Hosting:** Frontend en Firebase Hosting · Backend en Render · Base de datos en MongoDB Atlas

---

## 📦 Entidades

- **Usuarios** — registro y login con contraseña encriptada (bcrypt), roles de acceso.
- **Vinilos** — CRUD completo.
- **Artistas** — CRUD completo.

---

## 🔐 Roles de usuario

| Rol | Permisos |
|---|---|
| **normal** | Solo puede ver el catálogo público |
| **admin** | ABM (alta/baja/modificación) de vinilos y artistas |
| **superadmin** | ABM de todo + gestión de usuarios y roles |

El rol se asigna en la base de datos. Al registrarse, un usuario nuevo arranca como `normal`.

---

## 🗂️ Estructura del proyecto

```
Final-Raboni/
├── backend/        API REST (Express)
│   ├── api/            controllers y routes
│   ├── services/       lógica de negocio y acceso a la DB
│   ├── middlewares/    validación de token y de datos
│   ├── schemas/        esquemas de validación (Yup)
│   └── main.js         punto de entrada
└── frontend/       Aplicación React (Vite)
    └── src/
        ├── components/     NavBar, Footer, Layout, AdminLayout, rutas protegidas
        ├── contexts/       Session.context (manejo de estado global)
        ├── hooks/          hooks para consumir la API
        ├── services/       lógica de llamadas a la API (separada de las vistas)
        ├── pages/          vistas públicas (FrontOffice) y admin (BackOffice)
        └── routes/         configuración de React Router
```

---

## ▶️ Cómo levantar el proyecto en local

### Requisitos
- Node.js instalado
- Archivos `.env` (se entregan por separado, no están en el repo)

### 1. Backend

```bash
cd backend
npm install
npm run dev
```

Corre en `http://localhost:3000`

`.env` del backend:
```
MONGO_URI=<string de conexión de MongoDB Atlas>
MONGO_DB=<nombre de la base de datos>
PORT=3000
SECRET_PASSWORD=<secreto para firmar el JWT>
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Corre en `http://localhost:5173`

`.env` del frontend (apunta al backend local):
```
VITE_API_URL=http://localhost:3000
```

---

## 🚀 Deploy

- **Frontend (Firebase Hosting):** `npm run build` genera la carpeta `dist/`, que usa la URL de producción definida en `frontend/.env.production`. Se sube con `firebase deploy`.
- **Backend (Render):** Web Service con Root Directory `backend`, build `npm install`, start `npm start`. Las variables de entorno se cargan desde el panel de Render.

---

## 📡 Endpoints principales

| Método | Ruta | Descripción | Requiere token |
|---|---|---|---|
| POST | `/api/usuarios` | Registro | No |
| POST | `/api/usuarios/login` | Login (devuelve JWT) | No |
| GET | `/api/usuarios` | Listar usuarios | Sí |
| PATCH | `/api/usuarios/:id` | Cambiar rol | Sí |
| GET | `/api/vinilos` | Listar vinilos | No |
| GET | `/api/vinilos/:id` | Ver un vinilo | No |
| POST | `/api/vinilos` | Crear vinilo | Sí |
| PATCH | `/api/vinilos/:id` | Editar vinilo | Sí |
| DELETE | `/api/vinilos/:id` | Borrar vinilo | Sí |
| GET | `/api/artistas` | Listar artistas | No |
| GET | `/api/artistas/:id` | Ver un artista | No |
| POST | `/api/artistas` | Crear artista | Sí |
| PATCH | `/api/artistas/:id` | Editar artista | Sí |
| DELETE | `/api/artistas/:id` | Borrar artista | Sí |
