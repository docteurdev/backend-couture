const { MmodelSubscriptionType, MdressMaker, MmodelSubscription } = require("../../bd/sequelize");
const { errorServer } = require("../../common/common");

module.exports = (app) => {
    app.post("/api/coutre/subscription/create", async (req, res) => {
        const { DressMakerId, SubscriptionTypeId } = req.body;

        try {
            const dressMaker = await MdressMaker.findOne({ where: { id: DressMakerId } });
            const typeSubscription = await MmodelSubscriptionType.findOne({ where: { id: SubscriptionTypeId } });

            if (!dressMaker) {
                return res.status(401).json({ message: `Ce utilisateur n'existe pas dans la base de donnée` });
            }

            if (!typeSubscription) {
                return res.status(401).json({ message: `Ce type abonnement n'existe pas dans la base de donnée` });
            }

            const subscription = await MmodelSubscription.create(req.body);
            // console.log(subscription);
           if(subscription){

               const newDressMaker = await MdressMaker.update({subscribe: true},{where: {id:DressMakerId}});
               const dressMakerPaid = await MdressMaker.findOne({ where: { id: DressMakerId } });

               const dressMakerSubScription = await MmodelSubscription.findOne({where:{id: subscription.id, DressMakerId}, include:[{model: MmodelSubscriptionType}]})
               const dressMakerJSON = dressMakerPaid.toJSON()
               const DM = {
                ...dressMakerJSON,
                password: "**************"
               }
               try {
                   await dressMaker.addSubscription(subscription);
                   await subscription.update({ MmodelSubscriptionTypeId: typeSubscription.id });
   
                   return res.status(200).json({ data: {dressMakerSubScription,dresseMaker: DM}, message: 'Vous avez un abonnement' });
               } catch (associationError) {
                   console.error("Association Error:", associationError);
                   // Handle association errors, you might want to remove the created subscription in this case
                   return res.status(500).json({ message: errorServer });
               }
            };
        } catch (findError) {
            console.error("Find Error:", findError);
            res.status(500).json({ message: errorServer });
        }
    });
};
