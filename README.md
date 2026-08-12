# MUSYNC --- Definición y alcance del MVP

## 1. Visión del producto

**MUSYNC** es una plataforma que permite a músicos y artistas crear su
propia página profesional pública para centralizar su identidad,
portafolio y trabajo en un solo lugar.

Cada artista podrá compartir un único enlace de MUSYNC con otras
personas para que puedan conocer su trabajo, escuchar su música, ver sus
videos y trayectoria, comprar productos digitales o música y solicitar
cotizaciones o contrataciones.

### Idea central

> **Un solo link para mostrar quién eres como artista, qué haces y cómo
> trabajar contigo.**

Ejemplo conceptual:

`musync.com/erami`

El objetivo del MVP no es construir una red social ni un marketplace
masivo, sino demostrar que un artista puede **crear, administrar,
mostrar y monetizar su página profesional**.

------------------------------------------------------------------------

# 2. Alcance funcional del MVP

## 2.1 Landing Page

**Ruta:** `/`

Página principal de MUSYNC.

Debe explicar de forma rápida qué es la plataforma y permitir al usuario
registrarse o iniciar sesión.

### Contenido principal

-   Logo y nombre MUSYNC.
-   Propuesta de valor.
-   Botón **Crear mi perfil**.
-   Botón **Iniciar sesión**.
-   Ejemplo visual de una página de artista.
-   Explicación simple del funcionamiento:
    1.  Crea tu perfil.
    2.  Publica tu trabajo.
    3.  Comparte un solo enlace.

------------------------------------------------------------------------

## 2.2 Registro

**Ruta:** `/register`

Permite crear una cuenta.

### Datos iniciales

-   Nombre.
-   Nombre artístico.
-   Email.
-   Contraseña.

Al registrarse, se crea el usuario que posteriormente podrá configurar
su perfil profesional.

------------------------------------------------------------------------

## 2.3 Inicio de sesión

**Ruta:** `/login`

### Campos

-   Email.
-   Contraseña.

Una autenticación correcta permite acceder al área privada del artista.

------------------------------------------------------------------------

## 2.4 Dashboard

**Ruta privada:** `/dashboard`

Será el centro de administración de la página del artista.

Para mantener el proyecto acotado, el dashboard tendrá solamente las
funciones necesarias para el MVP.

### Secciones

-   Mi perfil.
-   Mis publicaciones.
-   Crear publicación.
-   Solicitudes.
-   Pedidos.
-   Cerrar sesión.

También puede mostrar:

-   Nombre del artista.
-   URL pública de su página.
-   Botón **Ver mi página**.
-   Botón **Editar perfil**.
-   Botón **Crear publicación**.

------------------------------------------------------------------------

## 2.5 Editar perfil de artista

**Ruta privada:** `/dashboard/profile`

Desde aquí el músico administra la información principal de su página
pública.

### Información editable

-   Nombre artístico.
-   Foto de perfil.
-   Imagen de portada.
-   Biografía.
-   Ciudad.
-   País.
-   Especialidad.
-   Spotify.
-   YouTube.
-   Instagram.
-   TikTok.
-   Email de contacto.

Ejemplos de especialidad:

-   Productor/a.
-   Compositor/a.
-   Cantante.
-   DJ.
-   Músico/a.

------------------------------------------------------------------------

## 2.6 Perfil público del artista

**Ruta conceptual:** `/artista/:username`

Ejemplo:

`/artista/erami`

Esta es la **vista principal del producto MUSYNC**.

Es la página que el músico podrá compartir como su portafolio
profesional.

### Encabezado

-   Imagen de portada.
-   Foto del artista.
-   Nombre artístico.
-   Especialidades.
-   Ciudad y país.
-   Redes sociales.
-   Botón **Solicitar cotización**.

### Secciones

-   Sobre mí.
-   Portafolio.
-   Música.
-   Videos.
-   Productos digitales.
-   Servicios.
-   Shows próximos.
-   Shows anteriores.

No todas estas secciones necesitan convertirse en sistemas
independientes. Siempre que sea posible se reutilizará la entidad de
publicaciones para reducir la complejidad del proyecto.

------------------------------------------------------------------------

## 2.7 Sistema unificado de publicaciones

Para evitar construir sistemas independientes para música, servicios,
productos y portafolio, MUSYNC utilizará una entidad general:

**`publications`**

Cada publicación tendrá un tipo.

### Tipos iniciales

-   `music`
-   `digital_product`
-   `service`
-   `portfolio`

Ejemplos:

  Publicación             Tipo                         Precio
  ----------------------- ------------------ ----------------
  Kusushiki Remix         Música                      \$1.990
  Cyberpunk Sample Pack   Producto digital            \$8.990
  Producción musical      Servicio             Desde \$80.000
  Video Game Soundtrack   Portafolio               Sin precio

Esto permite reutilizar componentes de frontend, endpoints y tablas de
backend.

------------------------------------------------------------------------

## 2.8 Crear publicación

**Ruta privada:** `/dashboard/publications/new`

El artista podrá crear contenido que posteriormente aparecerá en su
página.

### Campos

-   Tipo.
-   Título.
-   Descripción.
-   Precio.
-   Imagen.
-   Link externo.

### Tipos seleccionables

-   Música.
-   Producto digital.
-   Servicio.
-   Portafolio.

------------------------------------------------------------------------

## 2.9 Mis publicaciones

**Ruta privada:** `/dashboard/publications`

Permite administrar las publicaciones creadas.

Cada publicación tendrá acciones para:

-   Ver.
-   Editar.
-   Eliminar.

Esto permite implementar un CRUD:

**CREATE** → Crear publicación.\
**READ** → Consultar publicaciones.\
**UPDATE** → Editar publicación.\
**DELETE** → Eliminar publicación.

------------------------------------------------------------------------

## 2.10 Galería de publicaciones / Tienda del artista

Las publicaciones comerciales se mostrarán dentro de la página pública
del artista.

Ejemplo:

### Música y tienda

-   Kusushiki Remix --- Música --- \$1.990.
-   Cyberpunk Sample Pack --- Producto digital --- \$8.990.
-   Producción musical --- Servicio --- Desde \$80.000.

Para el MVP no es necesario construir un marketplace global complejo de
todos los artistas. La galería puede formar parte de la página
individual del músico.

------------------------------------------------------------------------

## 2.11 Detalle de publicación

**Ruta:** `/publication/:id`

Muestra la información completa de una publicación.

### Contenido

-   Imagen.
-   Título.
-   Tipo.
-   Descripción.
-   Precio.
-   Artista.
-   Enlace al perfil del artista.

Si corresponde a un producto o música:

**Agregar al carrito**

Si corresponde a un servicio:

**Solicitar cotización**

------------------------------------------------------------------------

## 2.12 Carrito de compras

**Ruta:** `/cart`

Permitirá agregar productos digitales o música.

### Información

-   Productos seleccionados.
-   Precio individual.
-   Cantidad, si corresponde.
-   Total.
-   Botón **Finalizar compra**.

Para el MVP no es necesario integrar WebPay, Stripe u otra pasarela de
pago real.

El proceso de compra puede finalizar creando una orden en PostgreSQL y
mostrando una confirmación.

------------------------------------------------------------------------

## 2.13 Servicios y cotizaciones

Las publicaciones de tipo `service` funcionan de manera diferente a los
productos.

En lugar de **Agregar al carrito**, mostrarán:

**Solicitar cotización**

### Formulario

-   Nombre.
-   Email.
-   Presupuesto.
-   Descripción del proyecto.
-   Tipo de solicitud.

Ejemplos:

-   Servicio musical.
-   Evento / Show.
-   Colaboración.
-   Otro.

La solicitud se almacena en PostgreSQL para que el artista pueda
revisarla desde su dashboard.

------------------------------------------------------------------------

## 2.14 Contrataciones

Para el MVP no se desarrollará un sistema de contratación independiente.

Las contrataciones se gestionarán mediante el mismo sistema de
solicitudes/cotizaciones.

Por ejemplo, una persona podrá seleccionar:

**Evento / Show**

y completar:

-   Fecha.
-   Presupuesto.
-   Información del evento.
-   Mensaje.

Esto permite demostrar la posibilidad de contratar al artista sin
desarrollar mensajería, calendario de reservas o contratos automáticos.

------------------------------------------------------------------------

## 2.15 Shows

La página pública podrá mostrar la trayectoria en vivo del artista.

### Próximos shows

-   Nombre del evento.
-   Lugar.
-   Ciudad.
-   Fecha.

### Shows anteriores

Se mostrarán utilizando los mismos datos cuya fecha ya haya pasado, o
mediante una clasificación simple según la implementación elegida.

Para el MVP **no se implementará venta de entradas**.

------------------------------------------------------------------------

# 3. Base de datos del MVP

La base de datos debe permitir almacenar la información necesaria para
que las páginas de los artistas sean dinámicas y administrables.

## `users`

-   `id`
-   `name`
-   `email`
-   `password`

## `artist_profiles`

-   `id`
-   `user_id`
-   `artist_name`
-   `bio`
-   `city`
-   `country`
-   `avatar`
-   `cover`
-   `spotify_url`
-   `youtube_url`
-   `instagram_url`

## `publications`

-   `id`
-   `artist_id`
-   `title`
-   `description`
-   `price`
-   `type`
-   `image_url`
-   `external_url`

## `shows`

-   `id`
-   `artist_id`
-   `name`
-   `venue`
-   `city`
-   `date`

## `quotes`

-   `id`
-   `publication_id`
-   `client_name`
-   `client_email`
-   `budget`
-   `message`
-   `status`

## `orders`

-   `id`
-   `buyer_id`
-   `total`
-   `status`
-   `created_at`

## `order_items`

-   `id`
-   `order_id`
-   `publication_id`
-   `quantity`
-   `price`

> Esta estructura es una propuesta inicial del MVP y podrá ajustarse
> cuando el equipo diseñe formalmente el modelo relacional.

------------------------------------------------------------------------

# 4. Navegación del MVP

## Vistas públicas

-   `/` --- Landing.
-   `/login` --- Inicio de sesión.
-   `/register` --- Registro.
-   `/artista/:username` --- Página pública del artista.
-   `/publication/:id` --- Detalle de publicación.
-   `/cart` --- Carrito.

## Vistas privadas

Requieren inicio de sesión.

-   `/dashboard` --- Panel principal.
-   `/dashboard/profile` --- Editar perfil.
-   `/dashboard/publications` --- Mis publicaciones.
-   `/dashboard/publications/new` --- Crear publicación.
-   `/dashboard/quotes` --- Solicitudes y cotizaciones.
-   `/dashboard/orders` --- Pedidos.

------------------------------------------------------------------------

# 5. Flujo principal de demostración

El MVP debería permitir demostrar el siguiente flujo completo:

1.  Un artista crea una cuenta.
2.  Inicia sesión.
3.  Completa su perfil profesional.
4.  Crea una publicación de tipo **Producto digital**.
5.  Crea una publicación de tipo **Servicio**.
6.  Visita su página pública.
7.  Las publicaciones aparecen automáticamente en su perfil.
8.  Otro usuario o visitante consulta un producto.
9.  Agrega el producto al carrito y finaliza la compra.
10. Se registra la orden.
11. El visitante consulta un servicio.
12. Envía una solicitud de cotización.
13. El artista puede revisar la solicitud desde su área privada.

Este flujo permite demostrar frontend, backend, base de datos,
autenticación, CRUD y lógica de compra manteniendo una experiencia
coherente con la propuesta de MUSYNC.

------------------------------------------------------------------------

# 6. Fuera del alcance del MVP

Para mantener el proyecto realizable dentro del tiempo disponible, las
siguientes funciones **no forman parte de esta primera versión**:

-   Seguidores.
-   Feed social.
-   Likes.
-   Comentarios.
-   Mensajería interna.
-   Chat en tiempo real.
-   Analytics avanzados.
-   Reviews.
-   Favoritos.
-   Notificaciones.
-   Marketplace global complejo.
-   Buscador avanzado de artistas.
-   Venta de entradas.
-   Integración con Spotify API.
-   Integración con YouTube API.
-   WebPay, Stripe u otra pasarela de pago real.
-   Sistema protegido de descarga de archivos.
-   Calendario avanzado de reservas.
-   Contratos automáticos.
-   Dominios personalizados reales como `erami.com`.

Spotify, YouTube y otras plataformas podrán manejarse inicialmente
mediante enlaces o embeds simples.

------------------------------------------------------------------------

# 7. Proyección futura

Una vez validado el MVP, MUSYNC podría incorporar funcionalidades
adicionales como:

-   Dominio personalizado para cada artista.
-   Planes gratuitos y premium.
-   Integración directa con plataformas musicales.
-   Venta y gestión de licencias musicales avanzada.
-   Venta de entradas.
-   Descargas protegidas.
-   Pagos reales.
-   Analytics.
-   Sistema de mensajería.
-   Calendario de disponibilidad.
-   Marketplace y descubrimiento de artistas.
-   Personalización visual de la página del artista.

Estas funcionalidades corresponden a la evolución futura del producto y
no deben interferir con la entrega del MVP.

------------------------------------------------------------------------

# 8. Resumen

**MUSYNC no busca ser una red social para músicos en su MVP.**

El producto central es la **página profesional del artista**.

El artista podrá:

-   Crear y editar su perfil.
-   Mostrar su identidad y portafolio.
-   Mostrar música y trabajos.
-   Publicar productos digitales.
-   Publicar servicios.
-   Vender música/productos mediante un carrito básico.
-   Recibir solicitudes de cotización y contratación.
-   Mostrar próximos shows y trayectoria.

El visitante podrá acceder a toda esta información desde **un único
enlace compartible**.

> **MUSYNC --- Tu música. Tu trabajo. Tu espacio.**
