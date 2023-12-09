const {
    MmodelSubscriptionType,
    MmodelSubscription,
    MdressMaker,
  } = require("../../bd/sequelize");
  const { errorServer } = require("../../common/common");
  
  module.exports = (app) => {
    app.get("/api/coutre/subscriptions/:id", async (req, res) => {
      try {
        const id  = req.params.id;
        const subscriptions = await MmodelSubscription.findAll({where: {DressMakerId:id} ,
          include: [
            { model: MmodelSubscriptionType },
            { model: MdressMaker, attributes:['name', 'lastname', 'phone'] },
          ],
        });
        let message = `Tous vos abonnements sont récupérés`;
        res.status(201).json({ message, data: subscriptions });
      } catch (error) {
        res.status(500).json({ message: errorServer });
      }
    });
  };
  