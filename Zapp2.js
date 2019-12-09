const express = require("express");

const app = express();

/********* Conexão com o DB MySQL BEGIN *********/

const mysql = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'leonardo',
    password : '123456',
    database : 'med'
  });

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
console.log('connected as id ' + connection.threadId);
});

/*connection.query('SELECT * FROM med.doctor', function(err, rows, fields){
    if(!err){
        console.log("Resultado: ", rows);
    }else{
        console.log("Erro ao realizar a consulta");
    }
})

connection.query("INSERT INTO doctor(nome, email) VALUES('Teste da Silva', 'teste_silva@med.com.br')", function(err, result){
    if (!err){
        console.log('Usuario cadastrado com sucesso!');
    }else{
        console.log('Erro ao cadastrar o usuário');
    }
})

connection.query("UPDATE doctor SET nome = 'Testesson' WHERE id = 2", function(err, result){
    if (!err){
        console.log('Usuário alterado com sucesso!');
    }else{
        console.log('Erro ao alterar o usuário');
    }
})
connection.query("DELETE FROM doctor WHERE id = 2", function(err, result){
    if (!err){
        console.log('Usuário apagado com sucesso!');
    }else{
        console.log('Erro ao apagar o usuário');
    }
})*/

/********* Conexão com o DB MySQL END *********/   




//serviço para identificar css e images utilizaddos no html
app.use('/public', express.static('public')); 

app.get("/", function(req, res){
    res.sendFile(__dirname + "/src/index.html");
});

app.get("/registre-se-med", function(req, res){
    res.sendFile(__dirname + "/src/cadastro.html");
});

app.get("/registre-se-pac", function(req, res){
    res.send("Cadastro do Paciente");
});

app.get("/home", function(req, res){
    res.send("Home");
});

app.get("/consulta", function(req, res){
    res.send("Confirma consulta!?");
});

app.listen(3000);