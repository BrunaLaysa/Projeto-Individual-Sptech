// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    window.location = "../User/PaginaInicial.html";
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../User/PaginaInicial.html";
}

// carregamento (loading)
function aguardar() {
    //var divAguardar = document.getElementById("div_aguardar");
    //divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    //var divAguardar = document.getElementById("div_aguardar");
    //divAguardar.style.display = "none";

    //var divErrosLogin = document.getElementById("div_erros_login");
    //if (texto) {
       // divErrosLogin.style.display = "flex";
       // divErrosLogin.innerHTML = texto;
   // }
}

function cadastrar() {

    var nomeVar = cad_nome.value;
    var emailVar = cad_email.value;
    var senhaVar = cad_senha.value;
    var confirmacaoSenhaVar = conf_senha.value;

    if (nomeVar == "" || emailVar == "" || senhaVar == "" || confirmacaoSenhaVar == "") {
        alert("Preencha todos os campos");

        finalizarAguardar();
    }

    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeServer: nomeVar,
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {

            alert('Cadastro Realizado Com Sucesso!')

            limparFormulario();
            finalizarAguardar();
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        finalizarAguardar();
    });
}
