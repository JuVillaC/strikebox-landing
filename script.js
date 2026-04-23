document.addEventListener('DOMContentLoaded', () => {
    
    const botonesDia = document.querySelectorAll('.filtros-dias .btn-filtro');
    const botonesDisciplina = document.querySelectorAll('.filtros-disciplinas .btn-filtro');
    const gruposDia = document.querySelectorAll('.dia-grupo');
    const mensajeVacio = document.getElementById('mensaje-vacio');
    const tablaContainer = document.getElementById('tabla-horarios-container');

    // getDay() devuelve 0 para Domingo, 1 para Lunes, etc.
    let diaActivo = new Date().getDay(); 
    let disciplinaActiva = 'todos';

    function aplicarFiltros() {
        // 1. Caso Domingo (0) o si seleccionan un día sin clases
        if (diaActivo === 0) {
            tablaContainer.style.display = 'none';
            mensajeVacio.style.display = 'block';
            botonesDia.forEach(b => b.classList.remove('active'));
            return;
        }

        tablaContainer.style.display = 'block';
        let clasesVisiblesEnTotal = 0;

        // 2. Filtrar Días y Disciplinas
        gruposDia.forEach(grupo => {
            const diaDelGrupo = parseInt(grupo.getAttribute('data-dia'));
            
            if (diaDelGrupo === diaActivo) {
                grupo.style.display = 'block'; // Mostramos el contenedor del día
                
                const filas = grupo.querySelectorAll('.clase-row');
                let clasesVisiblesEsteDia = 0;

                filas.forEach(fila => {
                    const disciplinaFila = fila.getAttribute('data-disciplina');
                    
                    if (disciplinaActiva === 'todos' || disciplinaActiva === disciplinaFila) {
                        fila.style.display = 'grid';
                        clasesVisiblesEsteDia++;
                        clasesVisiblesEnTotal++;
                    } else {
                        fila.style.display = 'none';
                    }
                });

                // Si seleccionas MMA y hoy no hay MMA, ocultamos el título del día
                const header = grupo.querySelector('.dia-header');
                if (header) {
                    header.style.display = clasesVisiblesEsteDia > 0 ? 'block' : 'none';
                }

            } else {
                grupo.style.display = 'none'; // Ocultamos los otros días
            }
        });

        // 3. Mostrar mensaje si la combinación no tiene clases (ej: Taekwondo un Lunes)
        if (clasesVisiblesEnTotal === 0) {
            mensajeVacio.style.display = 'block';
            mensajeVacio.textContent = 'No hay clases de esta disciplina para el día seleccionado.';
        } else {
            mensajeVacio.style.display = 'none';
        }
    }

    // Inicializar visualmente el botón del día actual
    if (diaActivo >= 1 && diaActivo <= 6) {
        const botonHoy = document.querySelector(`.filtros-dias .btn-filtro[data-dia="${diaActivo}"]`);
        if (botonHoy) botonHoy.classList.add('active');
    }

    // Eventos para Botones de Días
    botonesDia.forEach(boton => {
        boton.addEventListener('click', () => {
            document.querySelector('.filtros-dias .btn-filtro.active')?.classList.remove('active');
            boton.classList.add('active');
            diaActivo = parseInt(boton.getAttribute('data-dia'));
            aplicarFiltros();
        });
    });

    // Eventos para Botones de Disciplina
    botonesDisciplina.forEach(boton => {
        boton.addEventListener('click', () => {
            document.querySelector('.filtros-disciplinas .btn-filtro.active')?.classList.remove('active');
            boton.classList.add('active');
            disciplinaActiva = boton.getAttribute('data-disciplina');
            aplicarFiltros();
        });
    });

    // Ejecutar filtro al cargar la página
    aplicarFiltros();
});

// ==========================================
// LÓGICA DEL SLIDER DEL HERO (Fondo dinámico)
// ==========================================
const slides = document.querySelectorAll('.slider-bg');
let slideActual = 0;

if(slides.length > 0) {
    setInterval(() => {
        slides[slideActual].classList.remove('active'); // Oculta la actual
        slideActual = (slideActual + 1) % slides.length; // Pasa a la siguiente
        slides[slideActual].classList.add('active'); // Muestra la nueva
    }, 4000); // Cambia cada 4 segundos (4000 milisegundos)
}

// --- Lógica del Menú Hamburguesa ---
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const links = document.querySelectorAll('.nav-links a');

// Abrir/Cerrar menú
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Cerrar menú automáticamente al hacer clic en un link (para ir a una sección)
links.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});