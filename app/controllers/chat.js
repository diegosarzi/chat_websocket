const { validationResult } = require("express-validator/check");

module.exports.iniciarChat = function(application, req, res) {

    var dadosForm = req.body;

    req.assert('apelido', 'Nome ou apelido é obrigatório.').notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.render('index', {validacao: erros});
        return;
    }

    application.get('io').emit('msgParaCliente', {
        apelido: dadosForm.apelido,
        mensagem: ' acabou de entrar no chat.'
    });

    res.render('chat', {dadosForm: dadosForm});
}