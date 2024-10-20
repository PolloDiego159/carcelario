document.addEventListener('DOMContentLoaded', function() {
    const reportesList = document.getElementById('lista-reportes');

    // Cargar lista de reportes desde localStorage
    const reportes = JSON.parse(localStorage.getItem('reportes')) || [];

    // Función para cargar la lista de reportes
    function cargarReportes() {
        reportesList.innerHTML = '';
        reportes.forEach(reporte => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${reporte.fecha}</td>
                <td>${reporte.num_visitas}</td>
                <td>${reporte.num_eventos}</td>
                <td>${reporte.num_actividades}</td>
            `;
            reportesList.appendChild(row);
        });
    }

    // Obtener el número de visitas para una fecha específica
    function obtenerNumeroVisitas(fecha) {
        const visitas = JSON.parse(localStorage.getItem('visitas')) || [];
        return visitas.filter(visita => visita.fechaVisita === fecha).length;
    }

    // Manejar el envío del formulario
    document.getElementById('form-reporte').addEventListener('submit', function(event) {
        event.preventDefault();
        const fecha = document.getElementById('fecha').value;
        const num_eventos = parseInt(document.getElementById('num_eventos').value);
        const num_actividades = parseInt(document.getElementById('num_actividades').value);
        const num_visitas = obtenerNumeroVisitas(fecha);

        // Verificar si ya existe un reporte para la fecha
        const reporteExistente = reportes.find(reporte => reporte.fecha === fecha);
        if (reporteExistente) {
            // Actualizar el reporte existente
            reporteExistente.num_visitas = num_visitas; // Actualizar el número de visitas
            reporteExistente.num_eventos += num_eventos; // Sumar los eventos
            reporteExistente.num_actividades += num_actividades; // Sumar las actividades recreativas
        } else {
            // Crear un nuevo reporte
            const nuevoReporte = {
                fecha,
                num_visitas,
                num_eventos,
                num_actividades
            };
            reportes.push(nuevoReporte);
        }

        // Guardar los reportes actualizados en localStorage
        localStorage.setItem('reportes', JSON.stringify(reportes));
        cargarReportes();

        // Limpiar el formulario
        document.getElementById('form-reporte').reset();
    });

    // Cargar la lista de reportes al cargar la página
    cargarReportes();
});