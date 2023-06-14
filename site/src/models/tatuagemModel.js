var database = require("../database/config");

function listar() {
    console.log("listarTatuagens");
    var instrucao = `
        SELECT * FROM tatuagem;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    listar
}