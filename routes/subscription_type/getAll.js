const { MmodelSubscriptionType } = require("../../bd/sequelize");
const { errorServer } = require("../../common/common");

module.exports = (app) =>{
    app.get('/api/coutre/sub-type', async(req, res) =>{

        try {
            const subscriptions = await MmodelSubscriptionType.findAll();
            let message = `Tous vos abonnements sont récupérés`
            res.status(201).json({message, data: subscriptions})
            
           } catch (error) {
             res.status(500).json({message: errorServer})
           }
   
    })
}