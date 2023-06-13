let currentSlide = 0;
const categoriaSelect = document.getElementById("select_categoria");
//
const sessoes = document.querySelectorAll('.section_tattoo')
const slides = document.querySelectorAll('.slide');
const likeButtons = document.querySelectorAll('.like-btn');
console.log(likeButtons);
let categoriaSelecionada = 'todas'
  
  
function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}
setInterval(nextSlide, 7000);


  
categoriaSelect.addEventListener('change', () => {
    categoriaSelecionada = categoriaSelect.value;

    sessoes.forEach((sessao) => {
        let categoriaImagem = sessao.getAttribute("data-categoria");

        if(categoriaSelecionada === 'todas' || categoriaSelecionada === categoriaImagem) {
            sessao.style.display = 'flex';
        }
        else{
            sessao.style.display = 'none';
        }
        
    })
})


likeButtons.forEach(function(button) {

  button.addEventListener('click', function() {
   
    const likesCount = button.nextElementSibling;

   
    let currentLikes = parseInt(likesCount.innerText);

   
    if (button.classList.contains('liked')) {
      
      currentLikes--;
      button.classList.remove('liked');
    } else {
      
      currentLikes++;
      button.classList.add('liked');
    }

    likesCount.innerText = currentLikes;
  });
});
