document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todas as seções que queremos animar
    const sections = document.querySelectorAll('main section');

    // Opções para o Intersection Observer
    const observerOptions = {
        root: null, // O viewport é o elemento raiz
        rootMargin: '0px',
        threshold: 0.2 // A seção é considerada visível quando 20% dela está no viewport
    };

    // Cria uma nova instância do Intersection Observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Se a seção estiver visível
            if (entry.isIntersecting) {
                // Adiciona a classe 'visible' para aplicar a animação
                entry.target.classList.add('visible');
                // Para de observar a seção para que a animação não se repita
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observa cada seção
    sections.forEach(section => {
        observer.observe(section);
    });
});