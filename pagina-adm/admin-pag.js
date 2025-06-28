// Espera o carregamento completo da página para executar o script
document.addEventListener('DOMContentLoaded', () => {
    // Pega os botões e elementos do formulário pelo ID
    const addBtn = document.getElementById('add-event-btn');
    const cancelBtn = document.getElementById('cancel-add-event-btn');
    const formContainer = document.getElementById('event-form-container');
    const form = document.getElementById('event-form');

    // quando clicar no botao adicionar evento o formulario aparece
    addBtn.addEventListener('click', () => {
        formContainer.style.display = 'block';
    });

    // se clicar em cancelar do formulario ele esconde
    cancelBtn.addEventListener('click', () => {
        formContainer.style.display = 'none';
    });

    // Quando o formulário for enviado
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Impede o recarregamento da página

        // pega os valores que estao sendo digitados
        const titulo = document.getElementById('event-title').value.trim();
        const data = document.getElementById('event-date').value.trim();
        const local = document.getElementById('event-local').value.trim();
        const tema = document.getElementById('event-theme').value.trim();

        const imagemInput = document.getElementById('event-image');
        const imagemFile = imagemInput.files[0]; // pega o arquivo local selecionado

        // Verifica se todos os campos estão preenchidos
        if (!titulo || !data || !local || !tema || !imagemFile) {
            alert("Preencha todos os campos corretamente.");
            return;
        }

        // Cria o card visual do evento
        criarCardEvento(titulo, data, local, tema, imagemFile);

        // Limpa os campos do formulário e o esconde
        form.reset();
        formContainer.style.display = 'none';
        alert("Evento salvo com imagem local! ⚠️ como não possui banco de dados no momento, ao recarregar a pagina o evento sera excluido automaticamente e não aparecerá no eventos (usuario comum) nem mesmo para o administrador");
    });

    // Adiciona botão de excluir nos cards fixos (que já estavam na tela)
    adicionarBotaoExcluirEmTodosOsCards();
});

// Cria o card do evento na tela
function criarCardEvento(titulo, data, local, tema, imagemFile) {
    const card = document.createElement('div');
    card.classList.add('card-evento');

    const img = document.createElement('img');
    img.src = URL.createObjectURL(imagemFile); // cria URL temporária da imagem local
    img.alt = titulo;

    // se a imagem não carregar aparece um alerta
    img.onerror = () => {
        alert("Não foi possível carregar a imagem.");
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
        if (confirm("Deseja realmente excluir este evento?")) {
            card.remove();
        }
    });

    // Junta os elementos e adiciona à página
    card.append(img, h3, pData, pLocal, pTema, deleteBtn);
    document.querySelector('.container-cards-eventos').appendChild(card);
}

// Adiciona botão de excluir nos cards que ja existem
function adicionarBotaoExcluirEmTodosOsCards() {
    const cards = document.querySelectorAll('.card-evento');
    cards.forEach(card => {
        // Só adiciona o botão se ele ainda não existir
        if (!card.querySelector('.delete-btn')) {
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Excluir';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', () => {
                if (confirm("Deseja realmente excluir este evento?")) {
                    alert('Este evento foi removido da tela apenas como simulação. Ao recarregar a página, ele aparecerá novamente porque os eventos estão fixos no HTML e acontece o mesmo para os que foram acabados de serem criados .')
                    card.remove();
                }
            });
            card.appendChild(deleteBtn);
        }
    });
}
