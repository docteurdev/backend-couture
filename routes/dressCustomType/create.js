const { ValidationError, UniqueConstraintError } = require("sequelize")
const { MdressType, MdressMaker, MCustomdressType } = require("../../bd/sequelize")
const { baseUrl, errorServer } = require("../../common/common")

module.exports = (app) =>{
    app.post(`/api/coutre/create-custdress`,(req, res) =>{

        MCustomdressType.create(req.body,{include: [MdressMaker]}).then(data =>{
            
            return res.json('un type de vêtement a été ajouté avec sucèss')
        }).catch(error =>{
            if (error instanceof ValidationError) {
                return res.status(404).json({ message: error.message, data: error })
            }
            if (error instanceof UniqueConstraintError) {
                return res.status(404).json({ message: error.message, data: error })
            }
            return res.json({ message: errorServer, data: error })

        })
    })
}