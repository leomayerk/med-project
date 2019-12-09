const db = require('./db')

const Agendamentos = db.sequelize.define('agendamentos', {
    nome: {
        type: db.Sequelize.STRING
    },
    crm: {
        type: db.Sequelize.INTEGER
    },
    endereco: {
        type: db.Sequelize.STRING
    },
    atuacao: {
        type: db.Sequelize.STRING
    },
    convenio: {
        type: db.Sequelize.STRING
    },
    contato: {
        type: db.Sequelize.INTEGER,
    },
    datHor: {
        type: db.Sequelize.DATE,
        allowNull: false,
        validate: {
            isDate: {
                msg: "Esse campo deve seguir os padrões de data e horário!"
            },
        }
    },
    info: {
        type: db.Sequelize.TEXT,
        validate: {
            max:{
                msg: "Campo Restrição não pode exceder 5000 caracteres!"
            }
        }
    },
    idPaciente: {
        type: db.Sequelize.INTEGER
    },
    nomePac: {
        type: db.Sequelize.STRING
    },
    contatoPac: {
        type: db.Sequelize.INTEGER
    }
})
//criando tabela
//Agendamentos.sync({force: true})

module.exports = Agendamentos