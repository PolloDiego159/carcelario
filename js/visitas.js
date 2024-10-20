document.addEventListener('DOMContentLoaded', function() {
    const reclusoSelect = document.getElementById('recluso');
    const historialVisitas = document.getElementById('historial-visitas');

    // Cargar opciones de reclusos en el select desde localStorage
    const reclusos = JSON.parse(localStorage.getItem('reclusos')) || [];
    if (reclusos.length > 0) {
        reclusos.forEach(recluso => {
            const option = document.createElement('option');
            option.value = recluso.id;
            option.textContent = recluso.nombre;
            reclusoSelect.appendChild(option);
        });
    } else {
        console.error('No hay reclusos disponibles.');
    }

    // Cargar historial de visitas desde localStorage
    const visitas = JSON.parse(localStorage.getItem('visitas')) || [];
    if (visitas.length > 0) {
        visitas.forEach(visita => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${visita.visitante}</td>
                <td>${visita.fechaVisita}</td>
                <td>${visita.reclusoVisitado}</td>
            `;
            historialVisitas.appendChild(row);
        });
    }

    // Manejar el envío del formulario
    document.getElementById('form-visita').addEventListener('submit', function(event) {
        event.preventDefault();
        const visitante = document.getElementById('visitante').value;
        const fechaVisita = document.getElementById('fecha_visita').value;
        const reclusoVisitado = reclusoSelect.options[reclusoSelect.selectedIndex].text;

        // Agregar nueva visita al historial
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${visitante}</td>
            <td>${fechaVisita}</td>
            <td>${reclusoVisitado}</td>
        `;
        historialVisitas.appendChild(row);

        // Guardar la nueva visita en localStorage
        visitas.push({ visitante, fechaVisita, reclusoVisitado });
        localStorage.setItem('visitas', JSON.stringify(visitas));

        // Limpiar el formulario
        document.getElementById('form-visita').reset();
    });
});