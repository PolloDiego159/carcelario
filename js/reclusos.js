$(document).ready(function() {
    window.reclusos = JSON.parse(localStorage.getItem('reclusos')) || []; // Cargar la lista de reclusos desde localStorage

    // Función para agregar un recluso
    $('#form-recluso').on('submit', function(e) {
        e.preventDefault();
        const recluso = {
            id: Date.now(),
            nombre: $('#nombre').val(),
            tipo_identificacion: $('#tipo_identificacion').val(),
            identificacion: $('#identificacion').val(),
            delitos: $('#delitos').val(),
            condena: $('#condena').val(),
            fecha_ingreso: $('#fecha_ingreso').val()
        };
        window.reclusos.push(recluso);
        cargarReclusos();
        $('#form-recluso')[0].reset();
    });

    // Función para cargar los reclusos
    function cargarReclusos() {
        let template = '';
        window.reclusos.forEach(recluso => {
            template += `
                <tr>
                    <td>${recluso.nombre}</td>
                    <td>${recluso.tipo_identificacion}</td>
                    <td>${recluso.identificacion}</td>
                    <td>${recluso.delitos}</td>
                    <td>${recluso.condena}</td>
                    <td>${recluso.fecha_ingreso}</td>
                    <td>
                        <button class="btn btn-warning btn-sm editar" data-id="${recluso.id}">Editar</button>
                        <button class="btn btn-danger btn-sm eliminar" data-id="${recluso.id}">Eliminar</button>
                    </td>
                </tr>
            `;
        });
        $('#lista-reclusos').html(template);
        // Enviar la lista de reclusos a visitas.html
        localStorage.setItem('reclusos', JSON.stringify(window.reclusos));
    }

    // Función para eliminar un recluso
    $(document).on('click', '.eliminar', function() {
        if (confirm('¿Estás seguro de que deseas eliminar este recluso?')) {
            const id = $(this).data('id');
            window.reclusos = window.reclusos.filter(recluso => recluso.id !== id);
            cargarReclusos();
        }
    });

    // Función para editar un recluso
    $(document).on('click', '.editar', function() {
        const id = $(this).data('id');
        const recluso = window.reclusos.find(recluso => recluso.id === id);
        if (recluso) {
            $('#nombre').val(recluso.nombre);
            $('#tipo_identificacion').val(recluso.tipo_identificacion);
            $('#identificacion').val(recluso.identificacion);
            $('#delitos').val(recluso.delitos);
            $('#condena').val(recluso.condena);
            $('#fecha_ingreso').val(recluso.fecha_ingreso);
            window.reclusos = window.reclusos.filter(recluso => recluso.id !== id);
        }
    });

    // Cargar los reclusos al cargar la página
    cargarReclusos();
});