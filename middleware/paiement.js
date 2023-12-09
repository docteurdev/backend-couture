const { MdressMaker } = require("../bd/sequelize");


async function paiement(req, res, next) {
   try {
      let clentInfo = req.body
     //  return console.log(req.body);
      const { dressMakerId, clientId } = clentInfo;
       const dressMaker = await MdressMaker.findByPk(dressMakerId);
       if(!dressMaker.subscribe){
          res.status(403).json({message: "Veillez souscrire à un forfait"})
       }else{
          next()
       }
  
      
   } catch (error) {
      
   }
  }

  module.exports = paiement;
