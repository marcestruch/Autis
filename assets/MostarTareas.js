// URL de la API y tu clave API
const apiUrl = `http://localhost:8080/api/v3/projects/${sessionStorage.getItem('projectId')}/work_packages`;
const apiKey = '4667b6ccad9fbe535fec3b59daf9c7d533c9535faf65b1ee655f6909f0fe5d4d';

// Función para obtener las tareas (work packages)
async function obtenerTareas() {
    try {
        const respuesta = await fetch(apiUrl, {
            headers: {
                'Authorization': 'Basic ' + btoa('apikey:' + apiKey)
            }
        });

        const datos = await respuesta.json();
        mostrarTareas(datos);

    } catch (error) {
        console.error('Error:', error);
        document.getElementById('tareas').innerHTML =
            '<p>Error al cargar las tareas. Revisa la consola para más detalles.</p>';
    }
}

// Función para mostrar las tareas en una tabla
function mostrarTareas(datos) {
    const contenedor = document.getElementById('tareas');

    if (!datos._embedded || !datos._embedded.elements || datos._embedded.elements.length === 0) {
        contenedor.innerHTML = '<p>No hay tareas disponibles.</p>';
        return;
    }

    let html = `
        <table border="1" cellpadding="5" cellspacing="0">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Asunto</th>
                    <th>Estado</th>
                    <th>Asignado a</th>
                    <th>Proyecto</th>
                    <th>Fecha inicio</th>
                    <th>Fecha fin</th>
                </tr>
            </thead>
            <tbody>
    `;

    datos._embedded.elements.forEach(tarea => {
        html += `
            <tr>
                <td>${tarea.id}</td>
                <td>${tarea.subject}</td>
                <td>${tarea._links.status?.title || 'Sin estado'}</td>
                <td>${tarea._links.assignee?.title || 'Sin asignar'}</td>
                <td>${tarea._links.project?.title || 'Sin proyecto'}</td>
                <td>${tarea.startDate ? new Date(tarea.startDate).toLocaleDateString() : '-'}</td>
                <td>${tarea.dueDate ? new Date(tarea.dueDate).toLocaleDateString() : '-'}</td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    contenedor.innerHTML = html;
}

obtenerTareas();