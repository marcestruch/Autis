// URL de la API y tu clave API
        const apiUrl = 'http://localhost:8080/api/v3/projects';
        const apiKey = '4667b6ccad9fbe535fec3b59daf9c7d533c9535faf65b1ee655f6909f0fe5d4d';
        
        // Función para obtener los proyectos
        async function obtenerProyectos() {
            try {
                const respuesta = await fetch(apiUrl, {
                    headers: {
                        'Authorization': 'Basic ' + btoa('apikey:' + apiKey)
                    }
                });
                
                const datos = await respuesta.json();
                mostrarProyectos(datos);
                
            } catch (error) {
                console.error('Error:', error);
                document.getElementById('proyectos').innerHTML = 
                    '<p>Error al cargar los proyectos. Revisa la consola para más detalles.</p>';
            }
        }
        
        // Función para mostrar los proyectos en la página
        function mostrarProyectos(datos) {
            const contenedor = document.getElementById('proyectos');
            
            if (!datos._embedded || !datos._embedded.elements || datos._embedded.elements.length === 0) {
                contenedor.innerHTML = '<p>No hay proyectos disponibles.</p>';
                return;
            }
            
            let html = '';
            
            datos._embedded.elements.forEach(proyecto => {
                html += `
                    <div class="proyecto">
                        <h2 class="nombre-proyecto">${proyecto.name}</h2>
                        <p><strong>Estado:</strong> ${proyecto._links.status.title}</p>
                        <p><strong>Descripción:</strong> ${proyecto.description.raw}</p>
                        <p><strong>Actualizado:</strong> ${new Date(proyecto.updatedAt).toLocaleDateString()}</p>
                        <button class="Tareas" onclick="
                            sessionStorage.setItem('projectId', '${proyecto.id}');
                            window.location.href = 'tareas.html';
                        ">Ver Tareas</button>
                    </div>
                `;
            });
            
            contenedor.innerHTML = html;
        }
        obtenerProyectos();