document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. LÓGICA DEL MENÚ HAMBURGUESA
    // ==========================================
    // Buscamos por cualquiera de los dos IDs que pudimos haber usado
    const menuToggle = document.getElementById('mobile-menu') || document.getElementById('menu-toggle'); 
    const navLinks = document.getElementById('nav-links');
    
    if (menuToggle && navLinks) {
        const links = document.querySelectorAll('.nav-links a');

        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // ==========================================
    // 2. PREGUNTAS FRECUENTES Y TÉRMINOS (Acordeón)
    // ==========================================
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    if (accordionHeaders.length > 0) {
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const item = header.parentElement;
                
                // Cierra los demás acordeones abiertos
                document.querySelectorAll('.accordion-item').forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });

                // Abre o cierra el que acabas de hacer clic
                item.classList.toggle('active');
            });
        });
    }

    // ==========================================
    // 3. LÓGICA DE PESTAÑAS (TABS DE PLANES)
    // ==========================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Quitar active de todos
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));

                // Poner active al clickeado
                btn.classList.add('active');
                const targetId = btn.getAttribute('data-target');
                const targetPane = document.getElementById(targetId);
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    }

    // ==========================================
    // 4. LÓGICA DEL SLIDER DEL HERO (Fondo)
    // ==========================================
    const slides = document.querySelectorAll('.slider-bg');
    let slideActual = 0;

    if (slides.length > 0) {
        setInterval(() => {
            slides[slideActual].classList.remove('active');
            slideActual = (slideActual + 1) % slides.length;
            slides[slideActual].classList.add('active');
        }, 4000);
    }

    // ==========================================
    // 5. FILTROS DE HORARIOS (Lógica protegida)
    // ==========================================
    const tablaContainer = document.getElementById('tabla-horarios-container');
    
    // Si usas tu HTML avanzado de horarios, entra aquí:
    if (tablaContainer) {
        const botonesDia = document.querySelectorAll('.filtros-dias .btn-filtro');
        const botonesDisciplina = document.querySelectorAll('.filtros-disciplinas .btn-filtro');
        const gruposDia = document.querySelectorAll('.dia-grupo');
        const mensajeVacio = document.getElementById('mensaje-vacio');

        let diaActivo = new Date().getDay(); 
        let disciplinaActiva = 'todos';

        function aplicarFiltros() {
            if (diaActivo === 0) {
                tablaContainer.style.display = 'none';
                if(mensajeVacio) mensajeVacio.style.display = 'block';
                botonesDia.forEach(b => b.classList.remove('active'));
                return;
            }

            tablaContainer.style.display = 'block';
            let clasesVisiblesEnTotal = 0;

            gruposDia.forEach(grupo => {
                const diaDelGrupo = parseInt(grupo.getAttribute('data-dia'));
                
                if (diaDelGrupo === diaActivo) {
                    grupo.style.display = 'block'; 
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

                    const header = grupo.querySelector('.dia-header');
                    if (header) {
                        header.style.display = clasesVisiblesEsteDia > 0 ? 'block' : 'none';
                    }
                } else {
                    grupo.style.display = 'none'; 
                }
            });

            if (clasesVisiblesEnTotal === 0 && mensajeVacio) {
                mensajeVacio.style.display = 'block';
                mensajeVacio.textContent = 'No hay clases de esta disciplina para el día seleccionado.';
            } else if (mensajeVacio) {
                mensajeVacio.style.display = 'none';
            }
        }

        if (diaActivo >= 1 && diaActivo <= 6) {
            const botonHoy = document.querySelector(`.filtros-dias .btn-filtro[data-dia="${diaActivo}"]`);
            if (botonHoy) botonHoy.classList.add('active');
        }

        botonesDia.forEach(boton => {
            boton.addEventListener('click', () => {
                document.querySelector('.filtros-dias .btn-filtro.active')?.classList.remove('active');
                boton.classList.add('active');
                diaActivo = parseInt(boton.getAttribute('data-dia'));
                aplicarFiltros();
            });
        });

        botonesDisciplina.forEach(boton => {
            boton.addEventListener('click', () => {
                document.querySelector('.filtros-disciplinas .btn-filtro.active')?.classList.remove('active');
                boton.classList.add('active');
                disciplinaActiva = boton.getAttribute('data-disciplina');
                aplicarFiltros();
            });
        });

        aplicarFiltros();
        
    } else {
        // Lógica de respaldo si usas el HTML básico de horarios
        const btnFiltrosBasico = document.querySelectorAll('.filtros .btn-filtro');
        const claseRows = document.querySelectorAll('.clase-row');
        const msjVacioBasico = document.getElementById('mensaje-vacio');

        if (btnFiltrosBasico.length > 0 && claseRows.length > 0) {
            function filtrarBasico(dia) {
                let hay = false;
                claseRows.forEach(row => {
                    if(row.classList.contains(dia)){
                        row.style.display = 'grid';
                        hay = true;
                    } else {
                        row.style.display = 'none';
                    }
                });
                if(msjVacioBasico) msjVacioBasico.style.display = hay ? 'none' : 'block';
            }

            btnFiltrosBasico.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    btnFiltrosBasico.forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    filtrarBasico(e.target.getAttribute('data-dia'));
                });
            });
        }
    }

});