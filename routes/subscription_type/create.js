const { MmodelSubscriptionType } = require("../../bd/sequelize")
const { errorServer } = require("../../common/common")

module.exports = (app) =>{
    app.post("/api/coutre/sub-type/create", async(req, res) =>{
    const {name} = req.body;
      
        try {
         const isExistTypeSubscription = await MmodelSubscriptionType.findAll({where:{name}});
         if (isExistTypeSubscription.length >0) {
           
            res.status(401).json({message:`Abonnement ${name} existe déjà Impossible de le créer`})
            
         }else{

             const subscription = await MmodelSubscriptionType.create(req.body)
             if(subscription){
            res.status(200).json({message:'Vous avez ajouté un abonnement'})
             }
         }
        } catch (error) {
          res.status(500).json({message: errorServer})
        }
    })
}