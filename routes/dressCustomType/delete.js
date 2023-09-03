const { MCustomdressType } = require("../../bd/sequelize");

module.exports = (app) =>{
    app.delete("/api/coutre/delete-cust-dress", async(req, res) =>{
     const {id, dressMakerId} = req.body;

     try {
        
         const dressToRemove = await MCustomdressType.findOne({where:{id, dressMakerId }})
    
         
         if(!dressToRemove){
             return res.status(404).json({message: "the dress does not exist"})
        }else{
             const dressRemoved = await MCustomdressType.destroy({where:{id, dressMakerId }});
            return res.status(200).json({message: "the dress is removed", dressToRemove})

         }
     } catch (error) {
        return res.status(500).json({message: "problem with the serve please retry"})
         
     }

    })
}