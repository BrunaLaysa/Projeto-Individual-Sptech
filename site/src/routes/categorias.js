var express = require("express");
var router = express.Router();

var categoriaController = require("../controllers/categoriaController");

router.get("/listar", function (req, res) {
    categoriaController.listar(req, res);
});

router.get("/teste", function (req, res) {
    categoriaController.funcionar(req, res);
});


router.get("/contarCurtidas", function (req, res) {
    categoriaController.contarCurtidas(req, res);
});

module.exports = router;