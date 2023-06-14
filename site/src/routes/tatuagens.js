var express = require("express");
var router = express.Router();

var tatuagemController = require("../controllers/tatuagemController");

router.get("/listar", function (req, res) {
    tatuagemController.listar(req, res);
});

router.get("/teste", function (req, res) {
    tatuagemController.funcionar(req, res);
});

module.exports = router;