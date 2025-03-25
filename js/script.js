// script.js

// Fonction pour ajuster le menu en fonction de la taille de l'écran
function adjustMenu() {
    const menu = document.querySelector('.navbar');
    const burgerIcon = document.querySelector('.menu-toggle');
    const subMenus = document.querySelectorAll('.submenu'); 
    const navItems = document.querySelectorAll('.nav-item');

    if (!menu || !burgerIcon) return; // Vérifie si le menu et l'icône burger existent

    if (window.innerWidth <= 768) {
        // Sur petits écrans : cacher le menu et afficher l'icône burger
        menu.style.display = 'none';
        burgerIcon.style.display = 'block';

        // Cacher tous les sous-menus
        subMenus.forEach(subMenu => subMenu.style.display = 'none');

        // Supprimer les anciens écouteurs pour éviter la duplication
        navItems.forEach(navItem => {
            navItem.replaceWith(navItem.cloneNode(true)); 
        });

        // Ajouter un seul écouteur sur le menu pour gérer les sous-menus
        menu.addEventListener('click', function(event) {
            const navItem = event.target.closest('.nav-item');
            if (!navItem) return; // Éviter les clics en dehors des éléments concernés

            const submenu = navItem.querySelector('.submenu');
            if (submenu) {
                // Fermer tous les autres sous-menus avant d'ouvrir celui-ci
                subMenus.forEach(sub => {
                    if (sub !== submenu) sub.style.display = 'none';
                });

                // Basculer l'affichage du sous-menu cliqué
                submenu.style.display = (submenu.style.display === 'block') ? 'none' : 'block';
            }
        });

    } else {
        // Sur grands écrans : afficher le menu et masquer l'icône burger
        menu.style.display = 'flex';
        burgerIcon.style.display = 'none';

        // Cacher les sous-menus par défaut
        subMenus.forEach(subMenu => subMenu.style.display = 'none');

        // Gérer l'affichage des sous-menus au survol
        navItems.forEach(navItem => {
            navItem.addEventListener('mouseenter', function() {
                const submenu = this.querySelector('.submenu');
                if (submenu) submenu.style.display = 'block';
            });
            navItem.addEventListener('mouseleave', function() {
                const submenu = this.querySelector('.submenu');
                if (submenu) submenu.style.display = 'none';
            });
        });
    }
}

// Fonction pour ouvrir/fermer le menu burger
function toggleMenu() {
    const menu = document.querySelector('.navbar');
    if (!menu) return; // Vérifie si le menu existe avant de le manipuler
    menu.style.display = (menu.style.display === 'none' || menu.style.display === '') ? 'block' : 'none';
}

// Événements
document.addEventListener("DOMContentLoaded", function() {
    // Charger la navbar
    fetch('../Accueil/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
            adjustMenu(); // Appeler adjustMenu après que la navbar soit chargée

            // Gestion du menu burger
            document.querySelector('.menu-toggle').addEventListener('click', toggleMenu);
        })
        .catch(error => console.error('Erreur de chargement du header:', error));

    // Charger le footer
    fetch('../accueil/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        })
        .catch(error => console.error('Erreur de chargement du footer:', error));
});

// Ajuster le menu lors du redimensionnement
window.addEventListener('resize', adjustMenu);



