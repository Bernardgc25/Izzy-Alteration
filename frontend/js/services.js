//Header and Navigation Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const menuOverlay = document.createElement('div');
    
    // Create overlay element
    menuOverlay.className = 'menu-overlay';
    document.body.appendChild(menuOverlay);
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking overlay
    menuOverlay.addEventListener('click', function() {
        navMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Dropdown functionality for mobile
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 600) {
                e.preventDefault();
                const dropdown = this.parentElement;
                const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                
                // Close other open dropdowns
                document.querySelectorAll('.dropdown.active').forEach(activeDropdown => {
                    if (activeDropdown !== dropdown) {
                        activeDropdown.classList.remove('active');
                        activeDropdown.querySelector('.dropdown-menu').classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('active');
                dropdownMenu.classList.toggle('active');
            }
        });
    });
    
    // Close dropdowns when clicking outside (desktop)
    document.addEventListener('click', function(e) {
        if (window.innerWidth > 600) {
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 600) {
            // Reset mobile menu state on desktop
            navMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
            
            // Reset dropdown states
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('active');
                menu.style.maxHeight = '';
            });
        }
    });
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu on ESC
            if (window.innerWidth <= 600 && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
                menuToggle.focus();
            }
            
            // Close dropdowns on ESC
            document.querySelectorAll('.dropdown.active').forEach(dropdown => {
                dropdown.classList.remove('active');
                if (window.innerWidth <= 600) {
                    dropdown.querySelector('.dropdown-menu').classList.remove('active');
                }
            });
        }
    });
});
