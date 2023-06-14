var curtidaModel = require("../models/curtidaModel");


function buscarCurtidasPorUsuario(req, res) {
    var idUsuario = req.params.idUsuario;
  
    curtidaModel.buscarCurtidasPorUsuario(idUsuario).then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).json([]);
      }
    }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os aquarios: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
  }

  function curtir(req, res) {
    var fkUsuario = req.params.idUsuario;
    var fkTatuagem = req.body.fkTatuagem;

    curtidaModel.curtirPublicacao(fkUsuario, fkTatuagem).then(function (resultado) {
    res.status(200).json([]);
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });

  }

  module.exports = {
    buscarCurtidasPorUsuario,
    curtir
  }