# API REST de Diarios

API REST desarrollada como proyecto de portfolio, enfocada en buenas prácticas de backend, arquitectura modular y seguridad básica, utilizando **Node.js**, **Express** y **TypeScript**, con autenticación mediante **JWT**, validaciones con **Zod**, documentación con **Swagger** y persistencia en **MongoDB** sin utilizar ningún ORM.

---

## Descripción general

La API permite:

- Registro e inicio de sesión de usuarios mediante **email y contraseña**.
- Creación, edición y eliminación de **diarios** (entradas de texto) por parte de usuarios autenticados.
- Visualización de todos los diarios o de un diario específico **sin necesidad de estar autenticado**.

Cada diario contiene:

- Contenido en texto
- Fecha de creación
- Fecha de última edición
- Usuario autor

---

## Tecnologías utilizadas

- **Node.js**
- **Express**
- **TypeScript**
- **MongoDB** (driver nativo, sin ORM)
- **JWT (JSON Web Tokens)** para autenticación
- **Zod** para validación de datos
- **Bruno** para testing de endpoints
- **Swagger** para documentación

---

## Arquitectura del proyecto

El proyecto está organizado utilizando una **arquitectura modular por dominio**, facilitando la escalabilidad y el mantenimiento.

Ejemplo reducido:
```
src/
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.routes.ts
│   │   ├── auth.service.ts
│   │   └── auth.schema.ts
│   │
│   └── diaries/
│       ├── diary.controller.ts
│       ├── diary.routes.ts
│       ├── diary.service.ts
│       ├── diary.repository.ts
│       └── diary.schema.ts
│
├── shared/
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   └── error.middleware.ts
│   └── database/
│       └── mongo.ts
│
├── app.ts
└── server.ts
```

Cada módulo contiene todo lo necesario para su funcionamiento:

- Rutas
- Controller
- Service
- Validaciones
- Acceso a datos

---

## Autenticación

La autenticación se realiza mediante **JWT**.

- Al registrarse o iniciar sesión, el usuario recibe un token.
- El token debe enviarse en el header:

```
Authorization: Bearer <token>
```

Las rutas protegidas validan el token mediante un **middleware personalizado**.

---

## Instalación y ejecución

### 1. Clonar el repositorio

```
git clone https://github.com/leanx22/REST_DIARIOS_TS.git
cd REST_DIARIOS_TS
```

### 2. Instalar dependencias

```
npm install
```

### 3. Variables de entorno

Crear un archivo `.env` en la raíz del proyecto.
El formato del mismo puede verse en el archivo `.env.example` en la raíz del proyecto.



### 4. Ejecutar el proyecto

Modo desarrollo:

```
npm run dev
```

Modo producción:

```
npm run build
npm run start
```

---

##  Endpoints

###  Autenticación

#### Registro

```
POST /ausers/register
```

Body:

```json
{
  "email": "user@mail.com",
  "password": "123456"
}
```

---

#### Login

```
POST /users/login
```

Body:

```json
{
  "email": "user@mail.com",
  "password": "123456"
}
```

Respuesta:

```json
{
  "token": "jwt_token"
}
```

---

###  Diarios

#### Obtener todos los diarios (público)

```
GET /diaries
```

---

#### Obtener un diario por ID (público)

```
GET /diaries/:id
```

---

#### Crear un diario (requiere autenticación)

```
POST /diaries
```

Headers:

```
Authorization: Bearer <token>
```

Body:

```json
{
  "content": "Mi primer diario"
}
```

---

#### Editar un diario (requiere autenticación)

```
PUT /diaries/:id
```

Body:

```json
{
  "content": "Contenido actualizado"
}
```

---

#### Eliminar un diario (requiere autenticación)

```
DELETE /diaries/:id
```

---

##  Documentación con Swagger

La API cuenta con documentación interactiva generada mediante **Swagger (OpenAPI)**.

Esto permite:

- Visualizar todas las rutas disponibles
- Probar endpoints directamente desde el navegador
- Ver los esquemas de request y response
- Entender fácilmente qué rutas requieren autenticación

Una vez levantado el servidor, la documentación puede accederse desde:

```
/api/docs
```

---

##  Testing

Los endpoints fueron probados utilizando **Bruno**, una alternativa liviana y open-source a Postman.

---

##  Manejo de errores

La API cuenta con:

- Middleware global de errores
- Validaciones con Zod
- Respuestas consistentes con códigos HTTP adecuados

---

##  Posibles mejoras futuras

- Paginación de diarios
- Roles de usuario
- Refresh tokens
- Tests automatizados

---

##  Autor

Desarrollado por **Leandro Guia** como proyecto de portfolio backend.

---

 *Este proyecto fue creado con fines educativos y demostrativos, priorizando claridad, buenas prácticas y arquitectura profesional.*

