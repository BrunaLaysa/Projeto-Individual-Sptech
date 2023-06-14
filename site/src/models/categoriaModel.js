var database = require("../database/config");

function listar() {
    console.log("listarCategorias");
    var instrucao = `
        SELECT * FROM categoria;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function contarCurtidas() {
    console.log("contar curtidas");

    var instrucao = `
        SELECT idCategoria, 
        nomeCategoria, 
        COUNT(*) as quantidadeCurtidas from curtida 
        LEFT JOIN tatuagem ON fkTatuagem = idTatuagem
        INNER JOIN CATEGORIA ON idCategoria = fkCategoria 
        GROUP BY idCategoria;
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar, contarCurtidas
}