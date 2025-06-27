// Espera o carregamento completo da página antes de rodar o script
document.addEventListener('DOMContentLoaded', () => {
// Pega os elementos do carrossel pelo ID
    const carrosselImagem = document.getElementById('carrossel-imagem');
    const voltarBotao = document.getElementById('voltar-botao');
    const proximoBotao = document.getElementById('proximo-botao');
    const imageCaption = document.getElementById('image-caption'); 
// Aqui é a lista de imagens que aparecem  no carrossel com a legenda em baixo
  const images = [
    { src: 'Fotos-do-parque/parque-serra-dos-orgaos02.jpg', caption: 'Parque Nacional da Serra dos Órgãos' },
    { src: 'Fotos-do-parque/parque-tres-picos-02.jpg', caption: 'Parque Estadual dos Três Picos' },
    { src: 'Fotos-do-parque/parque-montanha02.jpg', caption: 'Parque Natural Municipal Montanhas de Teresópolis' }
];

    let currentImageIndex = 0;
// Função para atualizar a imagem e a legenda no carrossel
    function updateCarousel() {
        carrosselImagem.src = images[currentImageIndex].src;
        imageCaption.textContent = images[currentImageIndex].caption;
    }

// Função para mostrar a próxima imagem
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateCarousel();
    }
// Função para mostrar a imagem anterior
    function showPrevImage() {
         // Volta uma imagem. Se estiver na primeira, vai para a última
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateCarousel();
    }
 //adiciona os eventos aos botoes para navegar pelas imagens    
    voltarBotao.addEventListener('click', showPrevImage);
    proximoBotao.addEventListener('click', showNextImage);
// Inicializa o carrossel mostrando a primeira imagem
    updateCarousel();
});
