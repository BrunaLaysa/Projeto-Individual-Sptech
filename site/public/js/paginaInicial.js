let currentSlide = 0;
const categoriaSelect = document.getElementById("select_categoria");

const sessoes = document.querySelectorAll('.section_tattoo')
const slides = document.querySelectorAll('.slide');
const likeButtons = document.querySelectorAll('.like-btn');
console.log(likeButtons);
let categoriaSelecionada = 'todas'
let categorias = [];
let tatuagens = [];
let tatuagensCurtidasUsuario = [];

document.addEventListener('DOMContentLoaded', async () => {
  await carregarDadosIniciais();
});

async function carregarDadosIniciais() {
  this.categorias = await carregarCategorias();
  this.tatuagensCurtidasUsuario = await carregarCurtidas();
  if (!this.tatuagensCurtidasUsuario) {
    this.tatuagensCurtidasUsuario = []; // Define como um array vazio se não houver curtidas
  }
  await carregarTatuagens();
  atualizarTatuagens();
}


const carregarCategorias = async () => {
  try {
    const resposta = await fetch("/categorias/listar", {
      method: "GET"
    });

    if (resposta.ok) {
      const json = await resposta.json();
      for (let i = 0; i < json.length; i++) {
        console.log("aaa123");
        console.log(json[i].idCategoria);
        categoriaSelect.innerHTML = categoriaSelect.innerHTML +
          '<option value="' + json[i].idCategoria + '">' + json[i].nomeCategoria + '</option>';
      }
      return json;
    } else {
      console.log("Houve um erro ao listar as categorias");
      return [];
    }
  } catch (erro) {
    console.log(erro);
    return [];
  }
}

const carregarCurtidas = async () => {
  try {
    const resposta = await fetch(`/curtidas/usuario/${sessionStorage.getItem('ID_USUARIO')}`, {
      method: "GET"
    });

    if (resposta.ok) {
      const json = await resposta.json();
      return json;
    } else {
      console.log("Houve um erro ao trazer as curtidas do usuário");
      return []; // Retorna um array vazio em caso de erro
    }
  } catch (erro) {
    console.log(erro);
    return []; // Retorna um array vazio em caso de erro
  }
};

const carregarTatuagens = async () => {
  try {
    const resposta = await fetch("/tatuagens/listar", {
      method: "GET"
    });

    if (resposta.ok) {
      const json = await resposta.json();
      this.tatuagens = json;
    } else {
      console.log("Houve um erro ao listar as tatuagens");
    }
  } catch (erro) {
    console.log(erro);
  }
};

function curtir(idTatuagem) {
  const fkTatuagem = idTatuagem;
  const fkUsuario = sessionStorage.getItem('ID_USUARIO');
  const urlCurtidas = `/curtidas/usuario/${fkUsuario}`;
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
    if (res.ok) {
      // Atualizar a lista de curtidas localmente
      const novaCurtida = {
        fkTatuagem: fkTatuagem
      };
      this.tatuagensCurtidasUsuario.push(novaCurtida);

      // Chamar a função para atualizar as tatuagens na página
      atualizarTatuagens(this.tatuagensCurtidasUsuario);
    } else {
      console.log("Houve um erro ao curtir a tatuagem");
    }
  });
}

function atualizarTatuagens(curtidas) {
  sessoes.forEach((sessao) => {
    const categoriaImagem = sessao.getAttribute("data-categoria");

    sessao.innerHTML = '';

    if (categoriaSelecionada === 'todas' || categoriaSelecionada === categoriaImagem) {
      this.tatuagens.forEach((tattoo) => {
        if (tattoo.fkCategoria === Number(categoriaImagem)) {
          const curtidasTattoo = curtidas || this.tatuagensCurtidasUsuario;
          const classLiked = curtidasTattoo && curtidasTattoo.length > 0 && curtidasTattoo.some((curtida) => curtida.fkTatuagem === tattoo.idTatuagem) ? 'liked' : '';
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