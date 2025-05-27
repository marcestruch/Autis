## 4.3. Etapa 3: Visualización básica de datos mediante una web sencilla (HTML + JS)

En la tercera etapa, el reto es tomar datos de **OpenProject** (vía API) y mostrarlos de forma simple en una página web creada por el alumno. Se trata de construir una primera integración: una pequeña aplicación web que consuma la API y presente información legible.

### Planteamiento

Lo más sencillo es crear un archivo HTML estático con un poco de JavaScript embebido, o una página web ligera (puede ser mediante un framework minimalista o simplemente usando `fetch` en el navegador). Por ejemplo, podrían usar un archivo `index.html` que al abrirlo ejecute un script para pedir los datos a OpenProject y mostrarlos en el DOM.

---

### Pasos sugeridos para esta etapa

1. **Diseñar la información a mostrar**
   - Decidir qué datos de OpenProject se van a visualizar inicialmente.
   - Por ejemplo, se puede empezar listando los proyectos con su descripción, o listar las tareas de un proyecto determinado en una tabla.
   - Para simplicidad, supongamos que mostramos todos los proyectos y, debajo, todas las tareas (luego se puede filtrar por proyecto si se quiere).

2. **Realizar la petición desde JS**
   - Utilizar la API Fetch de JS o una librería como Axios.
   - Ejemplo con fetch:

     ```js
     fetch('http://localhost:8080/api/v3/projects', {
       headers: {
         'Authorization': 'Basic ' + btoa('apikey:SU_TOKEN_AQUI')
       }
     })
     .then(response => response.json())
     .then(data => {
       // procesar los datos de proyectos
       console.log(data);
     });
     ```

   - Aquí usamos Basic Auth pasando el token codificado en base64 (lo que hace `btoa('apikey:token')`).
   - En un entorno educativo, está bien hardcodear el token para pruebas, pero recuérdales que es sensible y no debe subirse a ningún repositorio público.
   - Alternativamente, se podría pedir al usuario que ingrese su token en un campo de texto y luego usarlo.

3. **CORS y soluciones**
   - Es probable que el navegador bloquee la petición (error de CORS).
   - Para resolverlo, el instructor puede habilitar temporalmente CORS en la instancia de OpenProject, añadiendo en la configuración un encabezado `Access-Control-Allow-Origin: *` o especificando el origen exacto.
   - Si la página se sirve local ([](http://_vscodecontentref_/0) o `localhost:port` distinto), hay que permitirlo.
   - Suponiendo que se resuelve (quizá montando la página en un pequeño server Node en el mismo puerto 8080, por ejemplo), entonces la petición funcionará.

4. **Procesar y visualizar**
   - Una vez obtenidos los datos en la variable `data`, que probablemente contenga algo como `{_embedded: { projects: [ ... ] } }` según el formato HAL, recorrer la lista de proyectos y generar elementos HTML para mostrarlos.
   - Por ejemplo, crear una lista `<ul>` con `<li>Nombre - Descripción</li>` por cada proyecto.
   - Lo mismo para tareas: podrían hacer otra petición a `/work_packages` y listarlas en una tabla con columnas de ID, Asunto, Proyecto (aquí podríamos usar el `project.title` que viene en `_links`).

5. **Interactividad mínima**
   - Se puede agregar algo de interacción básica, como botones para refrescar los datos, o un select para elegir proyecto y filtrar tareas de ese proyecto mediante la API (usando el endpoint de project work_packages en lugar del global).
   - Esto ya les hace pensar en cómo re-utilizar código para distintas llamadas.

6. **Prueba y verificación**
   - Abrir la página en el navegador y comprobar que efectivamente muestra la información.
   - Depurar errores de consola, asegurarse de que los datos coinciden con los de OpenProject.

---

### Objetivo de la etapa

El foco de esta etapa es **integración front-end**. Los estudiantes aplicarán conocimientos de HTML/JS/CSS junto con el consumo de la API. Aunque la página puede ser muy sencilla estéticamente, lograrán un resultado tangible: ver datos de OpenProject fuera de la interfaz oficial.

---

#### Ejemplo de salida esperada

- **Lista de proyectos:**
  - Proyecto "Web App de Gestión de Tareas" – Descripción: Sistema para gestionar tareas y tiempos – Fecha de creación, etc.
  - Proyecto "Dashboard Administrativo" – Descripción...

- **Lista de tareas (todas o del proyecto seleccionado):**
  - #42 Diseño de la interfaz – Estado: En curso – Asignado a: Ana – Proyecto: Web App de Gestión de Tareas.
  - #43 Desarrollo del backend – Estado: Nuevo – Asignado a: (sin asignar) – Proyecto: Web App de Gestión de Tareas.
  - ... etc, mostrando varias tareas.

---

Este es un primer dashboard rudimentario pero funcional, construido con HTML estático y llamadas a la API.

**Criterio de éxito:**  
Al finalizar la etapa 3, cada alumno debería tener una página HTML en la que, tras configurar su token, se muestren datos reales de su instancia OpenProject.  
Se considera superada la etapa si se ven en la página al menos proyectos y tareas provenientes de la API, demostrando que saben realizar peticiones desde código y manejar la respuesta JSON.