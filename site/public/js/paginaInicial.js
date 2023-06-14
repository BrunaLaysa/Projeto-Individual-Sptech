let currentSlide = 0;
const categoriaSelect = document.getElementById("select_categoria");
//
const sessoes = document.querySelectorAll('.section_tattoo')
const slides = document.querySelectorAll('.slide');
const likeButtons = document.querySelectorAll('.like-btn');
console.log(likeButtons);
let categoriaSelecionada = 'todas'
let categorias = [];
let tatuagens = [];
let tatuagensCurtidasUsuario;

document.addEventListener('DOMContentLoaded', async () => {
  await carregarDadosIniciais();
});

async function carregarDadosIniciais() {
  this.categorias = await carregarCategorias();
  this.tatuagensCurtidasUsuario = await carregarCurtidas();
  await carregarTatuagens();
  atualizarTatuagens();
}
const carregarCategorias = async () => {
  fetch("/categorias/listar", {
    method: "GET"
  }).then(function (resposta) {
    if (resposta.ok) {
        resposta.json().then(json => {
          this.categorias = json;
          for(let i = 0; i < json.length; i++) {
            console.log("aaa123");
            console.log(json[i].idCategoria);
            categoriaSelect.innerHTML = categoriaSelect.innerHTML +
                '<option value="' + json[i].idCategoria + '">' + json[i].nomeCategoria + '</option>';
          }
          return json;
        });
    } else {
        console.log("Houve um erro ao listar as categorias");
    }

}).catch(function (erro) {
    console.log(erro);
});


}

const carregarCurtidas = async () => {
  const resposta = await fetch(`/curtidas/usuario/${sessionStorage.getItem('ID_USUARIO')}`, {
    method: "GET"
  });

  if (resposta.ok) {
    const json = await resposta.json();
    return json;
  } else {
    console.log("Houve um erro ao trazer as curtidas do usuário");
  }
};

const carregarTatuagens = async () => {
  fetch("/tatuagens/listar", {
    method: "GET"
}).then(function (resposta) {
    if(resposta.ok) {
      resposta.json().then(json => {
          json.forEach((tattoo) => {
            let sessoes = document.querySelectorAll('.section_tattoo');
            let sessaoTattoo;
            for(let i = 0; i < sessoes.length; i++) {
                if(tattoo.fkCategoria === Number(sessoes[i].getAttribute('data-categoria'))) {
                    sessaoTattoo =  sessoes[i];
                } 
            }
            
            let curtidas = this.tatuagensCurtidasUsuario;
            let classLiked = curtidas.some((curtida) => curtida.fkTatuagem === tattoo.idTatuagem) ? 'liked' : '';
            sessaoTattoo.innerHTML = sessaoTattoo.innerHTML +  `
              <div class="card_tattoo">
                <img src="${tattoo.caminhoImagem}">
                <div class="div_reacao">
                  <button class="like-btn ${classLiked}" onClick="curtir(${tattoo.idTatuagem})"><i class="fas fa-heart like_icon"></i></button>
                <span>0</span>
                <button><i class="far fa-comment coment_icon"></i></button>
                </div>
              </div>
            `
          });
      });
    } else {
      console.log("Houve um erro ao listar as tatuagens");
  }
});

}

function curtir(idTatuagem){
  var fkTatuagem = idTatuagem;
  var fkUsuario = sessionStorage.getItem('ID_USUARIO');
  let urlCurtidas = `/curtidas/usuario/${fkUsuario}`
  console.log(idTatuagem);

  fetch(urlCurtidas, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        fkTatuagem: fkTatuagem
    })
  }).then((res) => {
  });

  carregarCurtidas();
}


  
  
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

function atualizarTatuagens() {
  sessoes.forEach((sessao) => {
    const categoriaImagem = sessao.getAttribute("data-categoria");

    sessao.innerHTML = '';

    if (categoriaSelecionada === 'todas' || categoriaSelecionada === categoriaImagem) {
      tatuagens.forEach((tattoo) => {
        if (tattoo.fkCategoria === Number(categoriaImagem)) {
          const curtidas = this.tatuagensCurtidasUsuario;
          const classLiked = curtidas.some((curtida) => curtida.fkTatuagem === tattoo.idTatuagem) ? 'liked' : '';
          sessao.innerHTML += `
            <div class="card_tattoo">
              <img src="${tattoo.caminhoImagem}">
              <div class="div_reacao">
                <button class="like-btn ${classLiked}" onClick="curtir(${tattoo.idTatuagem})"><i class="fas fa-heart like_icon"></i></button>
                <span>0</span>
                <button><i class="far fa-comment coment_icon"></i></button>
              </div>
            </div>
          `;
        }
      });
      sessao.style.display = 'flex';
    } else {
      sessao.style.display = 'none';
    }
  });
}


likeButtons.forEach(function(button) {

  button.addEventListener('click', function() {

   
    // let currentLikes = parseInt(likesCount.innerText);

   
     if (button.classList.contains('liked')) {
        return;
     }
      
    //   currentLikes--;
    //   button.classList.remove('liked');
    // } else {
      
    //   currentLikes++;
    //   button.classList.add('liked');
    // }

    // likesCount.innerText = currentLikes;
  });
});