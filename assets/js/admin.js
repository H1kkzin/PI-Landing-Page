document.addEventListener('DOMContentLoaded', () => {
    const addVideoForm = document.getElementById('add-video-form');
    const videosList = document.getElementById('videos-list');
    const editModal = document.getElementById('edit-modal');
    const closeButton = document.querySelector('.close-button');
    const editVideoForm = document.getElementById('edit-video-form');

    function addVideoToPage(video) {
        const videoItem = document.createElement('div');
        videoItem.classList.add('video-admin-item');

        const videoId = video.url_vimeo.split('/').pop();
        const embedUrl = `https://player.vimeo.com/video/${videoId}`;

        videoItem.innerHTML = `
            <div class="video-preview-container">
                <div class="video-responsive">
                    <iframe src="${embedUrl}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
            <div class="video-info">
                <h4>${video.titulo}</h4>
                <p>${video.descricao}</p>
            </div>
            <div class="video-actions">
                <button class="edit-btn" data-id="${video.id}" data-title="${video.titulo}" data-url="${video.url_vimeo}" data-description="${video.descricao}">Editar</button>
                <button class="delete-btn" data-id="${video.id}">Excluir</button>
            </div>
        `;
        videosList.appendChild(videoItem);
    }

    async function fetchVideos() {
        try {
            const response = await fetch('assets/php/buscar_videos.php');
            const videos = await response.json();

            videosList.innerHTML = '';

            if (videos.length > 0) {
                videos.forEach(video => {
                    addVideoToPage(video);
                });
            } else {
                videosList.innerHTML = '<p>Nenhum vídeo cadastrado.</p>';
            }
            addEventListenersToButtons();
        } catch (error) {
            console.error('Erro ao buscar os vídeos:', error);
            videosList.innerHTML = '<p>Erro ao carregar os vídeos.</p>';
        }
    }

    function addEventListenersToButtons() {
        // Lógica para o botão de exclusão (já funcional)
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', async (event) => {
                const videoId = event.target.dataset.id;

                if (confirm('Tem certeza que deseja excluir este vídeo?')) {
                    try {
                        const response = await fetch('assets/php/delete_video.php', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ id: videoId }),
                        });

                        const result = await response.json();

                        if (result.success) {
                            alert(result.message);
                            fetchVideos();
                        } else {
                            alert(result.message);
                        }
                    } catch (error) {
                        console.error('Erro ao excluir o vídeo:', error);
                        alert('Erro de comunicação com o servidor.');
                    }
                }
            });
        });

        // Lógica para o botão de edição (NOVO)
        const editButtons = document.querySelectorAll('.edit-btn');
        editButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const videoId = event.target.dataset.id;
                const videoTitle = event.target.dataset.title;
                const videoUrl = event.target.dataset.url;
                const videoDescription = event.target.dataset.description;

                // Preenche o formulário com os dados do vídeo
                document.getElementById('edit-video-id').value = videoId;
                document.getElementById('edit-video-title').value = videoTitle;
                document.getElementById('edit-video-url').value = videoUrl;
                document.getElementById('edit-video-description').value = videoDescription;

                editModal.style.display = 'block';
            });
        });
    }

    // Lógica para fechar o modal
    closeButton.addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    // Lógica para enviar o formulário de edição
    if (editVideoForm) {
        editVideoForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const videoId = document.getElementById('edit-video-id').value;
            const titulo = document.getElementById('edit-video-title').value;
            const url_vimeo = document.getElementById('edit-video-url').value;
            const descricao = document.getElementById('edit-video-description').value;

            const data = {
                id: videoId,
                titulo: titulo,
                url_vimeo: url_vimeo,
                descricao: descricao
            };

            try {
                const response = await fetch('assets/php/update_video.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json();

                if (result.success) {
                    alert(result.message);
                    editModal.style.display = 'none';
                    fetchVideos();
                } else {
                    alert('Erro ao atualizar o vídeo.');
                    console.error(result.message);
                }
            } catch (error) {
                alert('Ocorreu um erro na comunicação com o servidor.');
                console.error('Erro:', error);
            }
        });
    }

    if (addVideoForm) {
        addVideoForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const titulo = document.getElementById('video-title').value;
            const url_vimeo = document.getElementById('video-url').value;
            const descricao = document.getElementById('video-description').value;

            const data = {
                titulo: titulo,
                url_vimeo: url_vimeo,
                descricao: descricao
            };

            try {
                const response = await fetch('assets/php/salvar_videos.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json();

                if (result.success) {
                    alert('Vídeo adicionado com sucesso!');
                    addVideoForm.reset();
                    fetchVideos();
                } else {
                    alert('Erro ao adicionar o vídeo.');
                    console.error(result.message);
                }
            } catch (error) {
                alert('Ocorreu um erro na comunicação com o servidor.');
                console.error('Erro:', error);
            }
        });
    }

    fetchVideos();
});