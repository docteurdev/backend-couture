const { MmodelSubscriptionType } = require("../../bd/sequelize")
const { errorServer } = require("../../common/common")

module.exports = (app) =>{
    app.put("/api/coutre/sub-type/update", async(req, res) =>{
    const {id} = req.body;
      
        try {
         const isExistTypeSubscription = await MmodelSubscriptionType.findOne({where:{id}});
         if (!isExistTypeSubscription) {
           
            res.status(401).json({message:`Abonnement n°${id} n'existe pas déjà Impossible de le modifier`})
            
         }else{

             const subscription = await MmodelSubscriptionType.update(req.body,{where:{id}})
             if(subscription){
             res.status(200).json({message:`Vous avez bien modifié l'abonnement n°${id}`})
             }
         }
        } catch (error) {
          res.status(500).json({message: errorServer})
        }
    })
}