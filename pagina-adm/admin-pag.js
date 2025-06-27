// Espera o carregamento completo da página para executar o script
document.addEventListener('DOMContentLoaded', () => {
    // Pega os botões e elementos do formulário pelo ID
    const addBtn = document.getElementById('add-event-btn');
    const cancelBtn = document.getElementById('cancel-add-event-btn');
    const formContainer = document.getElementById('event-form-container');
    const form = document.getElementById('event-form');

    // Quando o botão "Adicionar Evento" for clicado, mostra o formulário
    addBtn.addEventListener('click', () => {
        formContainer.style.display = 'block';
    });

    // Quando o botão "Cancelar" for clicado, esconde o formulário
    cancelBtn.addEventListener('click', () => {
        formContainer.style.display = 'none';
    });

    // Quando o formulário for enviado
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Impede o recarregamento da página

        // Coleta os valores digitados nos campos
        const titulo = document.getElementById('event-title').value.trim();
        const data = document.getElementById('event-date').value.trim();
        const local = document.getElementById('event-local').value.trim();
        const tema = document.getElementById('event-theme').value.trim();
        const imagem = document.getElementById('event-image').value.trim();

        // Verifica se todos os campos estão preenchidos
        if (!titulo || !data || !local || !tema || !imagem) {
            alert("Preencha todos os campos corretamente.");
            return;
        }

        // Cria o card visual do evento
        criarCardEvento(titulo, data, local, tema, imagem);

        // Limpa os campos do formulário e o esconde
        form.reset();
        formContainer.style.display = 'none';

        // Alerta de sucesso
        alert("Evento salvo com sucesso nesta página!\n\n⚠️ Atenção: como este site ainda não usa banco de dados, o evento não aparecerá na página pública de eventos.");
    });

    // Adiciona botão de excluir nos cards fixos (que já estavam na tela)
    adicionarBotaoExcluirEmTodosOsCards();
});


// Cria visualmente o card do evento na tela
function criarCardEvento(titulo, data, local, tema, imagemURL) {
    const card = document.createElement('div');
    card.classList.add('card-evento');

    const img = document.createElement('img');
    img.src = imagemURL;
    img.alt = titulo;

    // Caso a imagem não carregue, exibe alerta e remove o <img>
    img.onerror = () => {
        alert("Não foi possível carregar a imagem. Verifique a URL.");
        img.remove();
    };

    const h3 = document.createElement('h3');
    h3.textContent = titulo;

    const pData = document.createElement('p');
    pData.innerHTML = `<strong>Data:</strong> ${data}`;

    const pLocal = document.createElement('p');
    pLocal.innerHTML = `<strong>Local:</strong> ${local}`;

    const pTema = document.createElement('p');
    pTema.innerHTML = `<strong>Tema:</strong> ${tema}`;

    // Botão de excluir evento
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Excluir';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
        const confirmar = confirm("Deseja realmente excluir este evento?");
        if (confirmar) {
            card.remove();
        }
    });

    // Junta os elementos e adiciona à página
    card.append(img, h3, pData, pLocal, pTema, deleteBtn);
    document.querySelector('.container-cards-eventos').appendChild(card);
}


// Adiciona botão de excluir nos cards que já estavam no HTML
function adicionarBotaoExcluirEmTodosOsCards() {
    const cards = document.querySelectorAll('.card-evento');
    cards.forEach(card => {
        // Só adiciona o botão se ele ainda não existir
        if (!card.querySelector('.delete-btn')) {
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Excluir';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', () => {
                const confirmar = confirm("Deseja realmente excluir este evento?");
                if (confirmar) {
                    card.remove();
                }
            });
            card.appendChild(deleteBtn);
        }
    });
}
