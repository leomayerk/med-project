const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const moment = require('moment');
const Doctors = require("./models/Doctors");
const Patients = require("./models/Patients");
const Agendamentos = require("./models/Agendamentos");
const Consultas = require("./models/Consultas");
var c;
var np;
var cp;

app.engine('handlebars', handlebars({
    defaultLayout: 'main',

    //caso queira utilizar e separar data createdAt, por exemplo
    //utilizar no html:
    //Cadastrado:{{#formatDate createdAt}}{{/formatDate}}<br>
    helpers: {
        formatDateTime: (datetime) => {
            return moment(datetime).format('DD/MM/YYYY HH:mm')
        }
    }
}))
app.set('view engine', 'handlebars')

app.use('/public', express.static('public')); 

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

///// --------------------------------------------- ROTAS --------------------------------------------- \\\\\
///// --------------------------------------------- begin --------------------------------------------- \\\\\

////// PRÉ-LOGIN \\\\\\
app.get('/', function(req, res){
    res.render('pre-login');
});

////// CADASTRO MÉDICO \\\\\\
app.get('/cad-doctor', function(req, res){
    res.render('cad-doctor');
});
app.post('/add-med', function(req, res){
    Doctors.create({
        nome: req.body.nome,
        sobrenome:req.body.sobrenome,
        datNasc: req.body.datNasc,
        email: req.body.email,
        senha: req.body.senha,
        cpf: req.body.cpf,
        rg: req.body.rg,
        crm: req.body.crm,
        endereco: req.body.endereco,
        contato: req.body.contato,
        atuacao: req.body.atuacao,
        convenio: req.body.convenio
    }).then(function(){
        res.redirect('/search-p')
    }).catch(function(erro){
        res.send("Erro ao cadastrar novo médico. Verifique novamente os campos!" + erro)
    })
})

////// CADASTRO PACIENTE \\\\\\
app.get('/cad-patient', function(req, res){
    res.render('cad-patient');
});
app.post('/add-pac', function(req, res){
    Patients.create({
        nome: req.body.nome,
        sobrenome:req.body.sobrenome,
        datNasc: req.body.datNasc,
        email: req.body.email,
        senha: req.body.senha,
        cpf: req.body.cpf,
        rg: req.body.rg,
        contato: req.body.contato,
        info: req.body.info
    }).then(function(){
        res.redirect('/search')
        //res.send("Paciente cadastrado com sucesso. Bem vindo!")
    }).catch(function(erro){
        res.send("Erro ao cadastrar novo usuário. Verifique novamente os campos!" + erro)
    })
    //apenas imprime: res.send("Nome: " + req.body.nome + "<br>Data de Nasc.: " + req.body.datNasc + "<br>")
})

////// BUSCA MÉDICO \\\\\\
app.get('/search', function(req, res){
   Doctors.findAll({order: [['nome', 'DESC']]}).then(function(doctors){
        res.render('search', {doctors: doctors});
    })
});

app.get('/get-agend/:id', function(req, res){
    Doctors.findAll({
        where: {'id': req.params.id}
    }).then(function(doctors){
        res.render('agendamentos', {doctors: doctors});
    }).catch(function(erro){
        res.send("Página não encontrada!");
    })
});

////// CADASTRO AGENDAMENTO \\\\\\
app.post('/add-agend', function(req, res){
    Patients.max('id').then(max => {
        c = max;
        console.log(c);
        Patients.findOne({
            where: {'id': c}
        }).then(patients => {
            np = patients.nome + ' ' + patients.sobrenome ;
            console.log(np);
            cp = patients.contato;
            console.log(cp);

            Agendamentos.create({
                nome: req.body.nome,
                crm: req.body.crm,
                endereco: req.body.endereco,
                atuacao: req.body.atuacao,
                convenio: req.body.convenio,
                contato: req.body.contato,
                datHor: req.body.datHor,
                info: req.body.info,
                idPaciente: c,
                nomePac: np,
                contatoPac: cp
            }).then(function(){
                res.send("Agendamento cadastrado com sucesso. Boa consulta!" + "<br>" + 
                "Dr. " + req.body.nome + "<br>Área: " + req.body.atuacao
                + "<br>CRM: " + req.body.crm
                + "<br>Contato: " + req.body.contato
                + "<br>Data e Horário: " + req.body.datHor
                + "<br>Endereço: " + req.body.endereco
                + "<br>Convênio: " + req.body.convenio
                + "<br>Observações: " + req.body.info
                + "<br>IDPaciente: " + c
                + "<br>nomePac: " + np
                + "<br>contatoPac: " + cp)
            }).catch(function(erro){
                res.send("Erro ao cadastrar novo agendamento. Verifique novamente os campos!" + erro)
            })
        })
    })
    //apenas imprime: res.send("Nome: " + req.body.nome + "<br>Data de Nasc.: " + req.body.datNasc + "<br>")
})

////// BUSCA PACIENTE \\\\\\
app.get('/search-p', function(req, res){
    Agendamentos.findAll({order: [['nome', 'DESC']]}).then(function(agendamentos){
         res.render('search-p', {agendamentos: agendamentos});
     })
 });
 
 app.get('/get-cons/:id', function(req, res){
    Agendamentos.findAll({
         where: {'id': req.params.id}
     }).then(function(agendamentos){
         res.render('consultas', {agendamentos: agendamentos});
     }).catch(function(erro){
         res.send("Página não encontrada!");
     })
 });
////// Cadastro Consulta \\\\\\
app.post('/add-cons', function(req, res){
    Consultas.create({
        nome: req.body.nome,
        nascPac: req.body.nascPac,
        infoAgendPac: req.body.infoAgendPac,
        datHor: req.body.datHor,
        convenio: req.body.convenio,
        contato: req.body.contato,
        atuacao: req.body.atuacao,
        infoConsulta: req.body.infoConsulta
    }).then(function(){
        res.redirect('/lista-consulta')
    }).catch(function(erro){
        res.send("Erro ao cadastrar nova notação. Verifique novamente os campos!" + erro)
    })
})

////// LISTAR CONSULTA \\\\\\
app.get('/lista-consulta', function(req, res){
    Consultas.findAll({order: [['nome', 'DESC']]}).then(function(consultas){
         res.render('lista-consulta', {consultas: consultas});
     }).catch(function(erro){
        res.send("Erro ao cadastrar nova consulta. Verifique novamente os campos!" + erro)
    })
 });
 //Excluir um item passado por parâmetro ID (NÃO UTILIZADO)
app.get('/del-cons/:id', function(req, res){
    Consultas.destroy({
        where: {'id': req.params.id}
    }).then(function(){
        res.redirect('/lista-consulta');
    }).catch(function(erro){
        res.send("Pagamento não apagado!");
    })
});


///// --------------------------------------------- ROTAS --------------------------------------------- \\\\\
///// ---------------------------------------------- end ---------------------------------------------- \\\\\
app.listen(3000);
