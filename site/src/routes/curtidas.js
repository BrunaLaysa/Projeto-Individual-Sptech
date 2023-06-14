var express = require("express");
var router = express.Router();

var curtidaController = require("../controllers/curtidaController");

router.get("/usuario/:idUsuario", function (req, res) {
    curtidaController.buscarCurtidasPorUsuario(req, res);
});

router.post("/usuario/:idUsuario", function (req, res) {
    curtidaController.curtir(req, res);
});

module.exports = router;