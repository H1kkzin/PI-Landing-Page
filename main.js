document.addEventListener('DOMContentLoaded', () => {
    // Código para a animação das seções
    const sections = document.querySelectorAll('main section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Código para o formulário de feedback e exibição de comentários
    const feedbackForm = document.querySelector('.feedback-form');
    const commentsContainer = document.querySelector('.comments-container');

    // Função para criar e adicionar um comentário à página
    function addCommentToPage(comment) {
        const newComment = document.createElement('div');
        newComment.classList.add('comment-item');
        newComment.innerHTML = `
            <h4>${comment.nome}</h4>
            <p>${comment.feedback}</p>
        `;
        commentsContainer.prepend(newComment);
    }

    // Função para buscar os comentários do banco de dados e exibi-los
    async function fetchComments() {
        try {
            const response = await fetch('buscar_comentarios.php');
            const comentarios = await response.json();

            // Limpa o container antes de adicionar os novos comentários
            commentsContainer.innerHTML = '<h3>Últimos Comentários</h3>';

            comentarios.forEach(comment => {
                addCommentToPage(comment);
            });
        } catch (error) {
            console.error('Erro ao buscar comentários:', error);
        }
    }

    if (feedbackForm && commentsContainer) {
        // Envia os dados do formulário para o PHP
        feedbackForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const formData = new FormData(feedbackForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('salvar_comentarios.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json();

                if (result.success) {
                    // Adiciona o novo comentário à página sem recarregar
                    addCommentToPage({
                        nome: data.nome,
                        feedback: data.feedback
                    });
                    feedbackForm.reset();
                } else {
                    alert('Erro ao salvar o comentário.');
                    console.error(result.message);
                }
            } catch (error) {
                alert('Ocorreu um erro na comunicação com o servidor.');
                console.error('Erro:', error);
            }
        });

        // Chama a função para buscar os comentários quando a página carrega
        fetchComments();
    }
});