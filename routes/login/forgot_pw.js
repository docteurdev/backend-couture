const { MdressMaker } = require("../../bd/sequelize");
module.exports = (app) => {
  app.get("/api/coutre/forgot-pw/:phone", async (req, res) => {
    const { phone } = req.params;
    try {
      const dressMaker = await MdressMaker.findOne({ where: { phone } });
      if (!dressMaker) {
        return res.status(404).json({ message: "Ce compte n'existe pas" });
      } else {
         const user ={
            phone: dressMaker.phone,
         }
        return res.status(200).json({ message: "Entrez votre nouveau mot de passe",data: user });

      }
    } catch (error) {
        return res.status(500).json("error serve please retry")
    }
  });
};

