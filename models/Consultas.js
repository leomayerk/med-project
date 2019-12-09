const db = require('./db')

const Consultas = db.sequelize.define('consultas', {
    nome: {
        type: db.Sequelize.STRING
    },
    nascPac: {
        type: db.Sequelize.DATE
    },
    convenio: {
        type: db.Sequelize.STRING
    },
    atuacao: {
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
    infoAgendPac: {
        type: db.Sequelize.TEXT
    },
    infoConsulta: {
        type: db.Sequelize.TEXT,
        validate: {
            max:{
                msg: "Campo Restrição não pode exceder 5000 caracteres!"
            }
        }
    }
})
//criando tabela
//Consultas.sync({force: true})

module.exports = Consultas