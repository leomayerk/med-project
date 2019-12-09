const db = require('./db')

const Patients = db.sequelize.define('patients', {
    nome: {
        type: db.Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Nome necessita ser diferente de vazio!"
            },
            len:{
                args: [1,45],
                msg: "Nome necessita conter entre 1 a 45 caracteres"
            }
        }
    },
    sobrenome: {
        type: db.Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Sobrenome necessita ser diferente de vazio!"
            },
            len:{
                args: [1,250],
                msg: "Sobrenome necessita conter entre 1 a 250 caracteres"
            }
        }
    },
    datNasc: {
        type: db.Sequelize.DATE,
        allowNull: false,
        validate: {
            isDate: {
                msg: "Esse campo deve seguir os padrões de data (dd/mm/yyyy)"
            },
        }
    },
    email: {
        type: db.Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                msg: "Esse campo deve ser um e-mail!"
            },
        }
    },
    senha: {
        type: db.Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Senha necessita ser diferente de vazio!"
            },
            len:{
                args: [6,45],
                msg: "Senha deve conter entre 6 a 45 caracteres"
            }
        }
    },
    cpf: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "CPF necessita ser diferente de vazio!"
            },
            len:{
                args: [11,11],
                msg: "CPF deve conter 11 caracteres"
            }
        }
    },
    rg: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "RG necessita ser diferente de vazio!"
            },
            len:{
                args: [1,11],
                msg: "RG necessita conter entre 1 a 11 caracteres"
            }
        }
    },
    contato: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Número de telefone necessita ser diferente de vazio!"
            },
            len:{
                args: [1,12],
                msg: "Contato necessita conter entre 1 a 12 caracteres. (Ex.: 47912345678)"
            }
        }
    },
    info: {
        type: db.Sequelize.STRING,
        validate: {
            max:{
                msg: "Campo Restrição não pode exceder 5000 caracteres!"
            }
        }
    }
})
//criando tabela
//Patients.sync({force: true})

module.exports = Patients