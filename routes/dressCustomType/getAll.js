const { MCustomdressType } = require("../../bd/sequelize")

module.exports = (app) =>{
    app.get("/api/coutre/get-customDress/:id", async (req, res) =>{

        const {id} = req.params;

        try {
            const dress = await MCustomdressType.findAll({where:{DressMakerId: id}});
            console.log(dress);
            return res.status(200).json(dress)
            
        } catch (error) {
            console.log(error);
            
        }
    

    })
}