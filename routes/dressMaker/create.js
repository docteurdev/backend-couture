const { MdressMaker } = require("../../bd/sequelize")
const bcript = require('bcrypt');
const { ValidationError, UniqueConstraintError } = require("sequelize");
module.exports = (app) => {
    app.post('/api/coutre/create-dressMaker', (req, res) => {
        console.log(req.body);
        let password = req.body.password;
       MdressMaker.findAll({where:{phone: req.body.phone}}).then(isPhoneExist =>{

        if(isPhoneExist.length > 0){
             let message = "Ce numéro est déjà utilisé"
             return  res.status(404).json({message}) ;
        }else{

            bcript.hash(password, 10)
            .then(hash => {
                let newUser = {
                    ...req.body,
                    password: hash
                }
                return MdressMaker.create(newUser)
                    .then(dressMaker => {

                        let message = `Votre compte est créé avec succès`;
                        return res.json({ message})
                    }).catch(error => {

                        if (error instanceof ValidationError) {
                            return res.status(404).json({ message: error.message, data: error })
                        }
                        if (error instanceof UniqueConstraintError) {
                            return res.status(404).json({ message: error.message, data: error })

                        }

                        let message = 'reéssayer plutart un problème a survenu';
                        return res.status(500).json({ message: error.message, data: error })
                    })
            })

        }

       })

        //MdressMaker.
    })
}