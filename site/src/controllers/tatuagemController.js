var tatuagemModel = require("../models/tatuagemModel");

function listar(req, res) {
    tatuagemModel.listar().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function funcionar(req, res){

    console.log("funcionando")
}

module.exports = {
    listar, funcionar
}