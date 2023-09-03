const { ValidationError, UniqueConstraintError } = require("sequelize")
const { MdressType, MdressMaker, MCustomdressType } = require("../../bd/sequelize")
const { baseUrl, errorServer } = require("../../common/common")

module.exports = (app) =>{
    app.post(`/api/coutre/create-custdress`, (req, res) =>{
         
        var dressMaker;
         var dress;
        MCustomdressType.create(req.body,{include: [MdressMaker]}).then(data =>{

        dress = data;
        return MdressMaker.findByPk(req.body.dressMakerId).then(data =>{
         dressMaker = data;
         dressMaker.addCustomdressType(dress)
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
    })
}