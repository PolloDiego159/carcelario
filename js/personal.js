document.addEventListener('DOMContentLoaded', function() {
    const personalList = document.getElementById('lista-personal');

    // Cargar lista de personal desde localStorage
    const personal = JSON.parse(localStorage.getItem('personal')) || [
        { id: 1, nombre: 'Juan Pérez', profesion: 'Guardia', permisos: 'Acceso a salas' },
        { id: 2, nombre: 'Ana Gómez', profesion: 'Médico', permisos: 'Acceso a consultas' },
        { id: 3, nombre: 'Carlos Ruiz', profesion: 'Psicólogo', permisos: 'Acceso a consultas psicologicas' }
    ];

    // Función para cargar la lista de personal
    function cargarPersonal() {
        personalList.innerHTML = '';
        personal.forEach(trabajador => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${trabajador.nombre}</td>
                <td>${trabajador.profesion}</td>
                <td>${trabajador.permisos}</td>
            `;
            personalList.appendChild(row);
        });
    }

    // Manejar el envío del formulario
    document.getElementById('form-personal').addEventListener('submit', function(event) {
        event.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const profesion = document.getElementById('profesion').value;
        const permisos = document.getElementById('permisos').value;

        const nuevoTrabajador = {
            id: Date.now(),
            nombre,
            profesion,
            permisos
        };

        personal.push(nuevoTrabajador);
        localStorage.setItem('personal', JSON.stringify(personal));
        cargarPersonal();

        // Limpiar el formulario
        document.getElementById('form-personal').reset();
    });

    // Cargar la lista de personal al cargar la página
    cargarPersonal();
});