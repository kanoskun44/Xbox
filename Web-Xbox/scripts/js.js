document.addEventListener("DOMContentLoaded", function() {
    const loader = document.getElementById('loader');
    const mainContent = document.getElementById('main-content');
    const audio = document.getElementById('loaderAudio');

    // Reproduce el audio
    audio.play();

    // Oculta el loader y muestra el contenido principal después de 5 segundos
    setTimeout(function() {
        loader.style.opacity = '0'; // Hace el loader transparente
        setTimeout(function() {
            loader.classList.add('hidden'); // Oculta el loader completamente
            mainContent.classList.remove('hidden'); // Muestra el contenido principal
        }, 500); // Espera 0.5 segundos para que termine la transición
    }, 5000); // 5000 milisegundos = 5 segundos
});

document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll(".nav-link, .submenu a");
    const clickSound = document.getElementById("clickSound");

    links.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault(); // Evita la navegación (solo para ejemplo)
            clickSound.play(); // Reproduce el sonido de clic
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const blurOverlay = document.querySelector('.blur-overlay');
    const navItems = document.querySelectorAll('.nav-item');
    const hoverSound = document.getElementById('hoverSound');
    const clickSound = document.getElementById('clickSound');
    let isMobileMenuOpen = false;

    // Efectos de sonido
    document.querySelectorAll('.nav-link, .submenu-link').forEach(link => {
        link.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.play();
        });

        link.addEventListener('click', (e) => {
            e.preventDefault();
            clickSound.currentTime = 0;
            clickSound.play();
        });
    });

    // Menú móvil
    mobileToggle.addEventListener('click', () => {
        isMobileMenuOpen = !isMobileMenuOpen;
        navLinks.classList.toggle('active');
        blurOverlay.classList.toggle('active');
        mobileToggle.innerHTML = isMobileMenuOpen ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        
        clickSound.currentTime = 0;
        clickSound.play();
    });

    // Submenús en móvil
    if (window.innerWidth <= 992) {
        navItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navItems.forEach(i => {
                    if (i !== item) i.classList.remove('active');
                });
                item.classList.toggle('active');
            });
        });
    }

    // Cerrar menú al hacer clic fuera
    blurOverlay.addEventListener('click', () => {
        if (isMobileMenuOpen) {
            navLinks.classList.remove('active');
            blurOverlay.classList.remove('active');
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            isMobileMenuOpen = false;
        }
    });

    // Ajustar en redimensionamiento
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992 && isMobileMenuOpen) {
            navLinks.classList.remove('active');
            blurOverlay.classList.remove('active');
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            isMobileMenuOpen = false;
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.nav-dot');
    const arrows = document.querySelectorAll('.slider-arrow');
    const muteButtons = document.querySelectorAll('.mute-btn');
    const infoButtons = document.querySelectorAll('.info-btn');
    const modals = document.querySelectorAll('.info-modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideInterval;
    const intervalTime = 5000;

    // Iniciar autoplay
    function startAutoPlay() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    // Detener autoplay
    function stopAutoPlay() {
        clearInterval(slideInterval);
    }

    // Ir a slide específico
    function goToSlide(slideIndex) {
        sliderContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
        currentSlide = slideIndex;
        updateDots();
        stopAutoPlay();
        startAutoPlay();
    }

    // Slide siguiente
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }

    // Slide anterior
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(currentSlide);
    }

    // Actualizar puntos de navegación
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Mute/Unmute video
    function toggleMute(button) {
        const slide = button.closest('.slide');
        const video = slide.querySelector('video');
        if (video) {
            video.muted = !video.muted;
            button.innerHTML = video.muted ? 
                '<i class="fas fa-volume-mute"></i>' : 
                '<i class="fas fa-volume-up"></i>';
        }
    }

    // Mostrar modal
    function showModal(modalId) {
        document.getElementById(modalId).classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Ocultar modal
    function hideModal() {
        modals.forEach(modal => modal.classList.remove('active'));
        document.body.style.overflow = 'auto';
    }

    // Event listeners
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goToSlide(parseInt(dot.dataset.slide));
        });
    });

    arrows[0].addEventListener('click', prevSlide);
    arrows[1].addEventListener('click', nextSlide);

    muteButtons.forEach(button => {
        button.addEventListener('click', () => toggleMute(button));
    });

    infoButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            showModal(button.dataset.modal);
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', hideModal);
    });

    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal();
            }
        });
    });

    // Pausar autoplay al interactuar
    sliderContainer.addEventListener('mouseenter', stopAutoPlay);
    sliderContainer.addEventListener('mouseleave', startAutoPlay);

    // Iniciar
    startAutoPlay();

    // RGB border effect
    const slider = document.querySelector('.xbox-slider');
    let rgbInterval = setInterval(() => {
        const hue = (parseInt(getComputedStyle(slider).getPropertyValue('--hue') || 0) + 1) % 360;
        slider.style.setProperty('--hue', hue);
    }, 50);
});

document.addEventListener('DOMContentLoaded', function() {
    const socialIcons = document.querySelectorAll('.social-icon');
    const blurEffect = document.querySelector('.blur-effect');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            blurEffect.style.opacity = '1';
        });
        
        icon.addEventListener('mouseleave', () => {
            blurEffect.style.opacity = '0';
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const controller = document.getElementById('controller');
    const menuButton = document.getElementById('menuButton');
    const menuOverlay = document.getElementById('menuOverlay');
    const closeMenu = document.getElementById('closeMenu');
    
    // Variables para el efecto 3D
    let isHovering = false;
    let rotateX = 0;
    let rotateY = 0;
    
    // Efecto 3D al mover el mouse
    controller.addEventListener('mousemove', (e) => {
        if (!isHovering) return;
        
        const rect = controller.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        rotateX = (y - centerY) / 20;
        rotateY = -(x - centerX) / 20;
        
        controller.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    controller.addEventListener('mouseenter', () => {
        isHovering = true;
    });
    
    controller.addEventListener('mouseleave', () => {
        isHovering = false;
        controller.style.transform = 'rotateX(0) rotateY(0)';
    });
    
    // Efecto táctil para móviles
    let touchStartX = 0;
    let touchStartY = 0;
    
    controller.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        isHovering = true;
    });
    
    controller.addEventListener('touchmove', (e) => {
        if (!isHovering) return;
        
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        
        rotateX = (touchY - touchStartY) / 5;
        rotateY = -(touchX - touchStartX) / 5;
        
        controller.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    controller.addEventListener('touchend', () => {
        isHovering = false;
        controller.style.transform = 'rotateX(0) rotateY(0)';
    });
    
    // Abrir menú
    menuButton.addEventListener('click', () => {
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Cerrar menú
    closeMenu.addEventListener('click', () => {
        menuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Cerrar menú al hacer clic fuera
    menuOverlay.addEventListener('click', (e) => {
        if (e.target === menuOverlay) {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Animación de los items del menú
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const tiles = document.querySelectorAll('.tile');
    let currentTile = 0;
    
    // Navegación con teclado
    document.addEventListener('keydown', function(e) {
        const columns = Math.floor(document.getElementById('dashboard').offsetWidth / 250) || 1;
        
        switch(e.key) {
            case 'ArrowUp':
                e.preventDefault();
                if (currentTile - columns >= 0) {
                    currentTile -= columns;
                    tiles[currentTile].focus();
                }
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (currentTile + columns < tiles.length) {
                    currentTile += columns;
                    tiles[currentTile].focus();
                }
                break;
            case 'ArrowLeft':
                e.preventDefault();
                if (currentTile > 0) {
                    currentTile--;
                    tiles[currentTile].focus();
                }
                break;
            case 'ArrowRight':
                e.preventDefault();
                if (currentTile < tiles.length - 1) {
                    currentTile++;
                    tiles[currentTile].focus();
                }
                break;
            case 'Enter':
                if (document.activeElement.classList.contains('tile')) {
                    document.activeElement.click();
                }
                break;
        }
    });
    
    // Efecto hover/focus
    tiles.forEach(tile => {
        tile.addEventListener('focus', function() {
            tiles.forEach(t => t.classList.remove('focused'));
            this.classList.add('focused');
            currentTile = Array.from(tiles).indexOf(this);
        });
        
        tile.addEventListener('mouseover', function() {
            this.focus();
        });
    });
    
    // Hacer que el primer tile sea enfocable al cargar
    tiles[0].setAttribute('tabindex', '0');
});

document.addEventListener('DOMContentLoaded', function() {
    const xboxIcon = document.getElementById('xboxIcon');
    const infoPanel = document.getElementById('infoPanel');
    const closePanel = document.getElementById('closePanel');
    const panelOverlay = document.getElementById('panelOverlay');
    const xboxSound = document.getElementById('xboxSound');
    
    // Abrir panel
    xboxIcon.addEventListener('click', function() {
        xboxSound.currentTime = 0;
        xboxSound.play();
        infoPanel.classList.add('active');
        panelOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Cerrar panel
    closePanel.addEventListener('click', function() {
        infoPanel.classList.remove('active');
        panelOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Cerrar al hacer clic fuera
    panelOverlay.addEventListener('click', function() {
        infoPanel.classList.remove('active');
        panelOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Cerrar con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && infoPanel.classList.contains('active')) {
            infoPanel.classList.remove('active');
            panelOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Mute/Unmute videos al hacer hover
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.addEventListener('mouseenter', () => {
            video.muted = false;
        });
        
        video.addEventListener('mouseleave', () => {
            video.muted = true;
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const gameCards = document.querySelectorAll('.game-card');
    const blurOverlay = document.querySelector('.blur-overlay');
    
    // Efecto blur al pasar el mouse sobre las tarjetas
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            blurOverlay.style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', () => {
            blurOverlay.style.opacity = '0';
        });
    });
    
    // Animación de los enlaces del footer
    const footerLinks = document.querySelectorAll('.footer-link');
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateX(5px)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateX(0)';
        });
    });
});