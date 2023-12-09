const {
    MmodelSubscriptionType,
    MmodelSubscription,
    MdressMaker,
  } = require("../../bd/sequelize");
  const { errorServer } = require("../../common/common");
  
  module.exports = (app) => {
    app.post("/api/coutre/subscriptions/user", async (req, res) => {
        const {DressMakerId,id}  = req.body;
        // console.log(req);
      try {
        const subscriptions = await MmodelSubscription.findOne({where: {DressMakerId, id} ,
          include: [
            { model: MmodelSubscriptionType },
            { model: MdressMaker, attributes:['name', 'lastname', 'phone'] },
          ],
        });
        let message = `Tous vos abonnements sont récupérés`;
      return  res.status(201).json({ message, data: !subscriptions? [] :subscriptions });
      } catch (error) {
        res.status(500).json({ message: errorServer });
      }
    });
  };
  