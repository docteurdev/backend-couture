const { MdressMaker } = require("../../bd/sequelize");
const bcript = require("bcrypt");

module.exports = (app) =>{
  app.put("/api/coutre/new-pw", async (req, res) =>{
    const {pw, phone }= req.body;
    
    try {
       const  user = await MdressMaker.findOne({where: {phone}});

       if(!user){

        return res.status(404).json({message: "dress maker not found"})
       }else{

        bcript.hash(pw, 10).then( async(hash) => {
        const  newPw = {
           ...user,
           password:  hash
        }
        const  dressMaker = await MdressMaker.update(newPw, {where: {phone}});
        return res.status(200).json({message: "votre mot de passe a été modifié"})

        })
       }
       
    } catch (error) {
         return res.status(500).json({mgs: "error server retry please"})
    }
  })
}
