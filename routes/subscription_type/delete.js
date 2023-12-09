const { MmodelSubscriptionType } = require("../../bd/sequelize");
const { errorServer } = require("../../common/common");

module.exports = (app) =>{
    app.delete('/api/coutre/sub-type/delete/:id', async(req, res) =>{

        try {
            const id = req.params.id;
            const isExistTypeSubscription = await MmodelSubscriptionType.findOne({where:{id}});
            if (!isExistTypeSubscription) {
              
               res.status(401).json({message:`Abonnement n°${id} n'existe pas, Impossible de le supprimer`})
               
            }else{
   
                const subscription = await MmodelSubscriptionType.destroy({where:{id}})
                if(subscription){
                res.status(200).json({message:`Vous avez bien supprimer l'abonnement n°${id}`})
                }
            }
           } catch (error) {
             res.status(500).json({message: errorServer})
           }
   
    })
}