document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('main section');
    const options = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
<<<<<<< HEAD
});
=======

    const hamburgerButton = document.getElementById("hamburger-btn");
    const navMenu = document.getElementById("nav-menu");

    hamburgerButton.addEventListener("click", () => {
        // Alterna a classe 'active' tanto no menu quanto no botão
        hamburgerButton.classList.toggle("active");
        navMenu.classList.toggle("active");
    });
});
>>>>>>> b7c8e83 (Responsividade)
