const { MdressType, MCustomdressType } = require("../../bd/sequelize")

module.exports = (app) =>{
    app.put("/api/coutre/update-custDressType", async(req, res) =>{

        try {
            const [dressUpdated] = await MCustomdressType.update(req.body,{where: {id: req.body.id}});
            if(dressUpdated === 0){
                return res.status(404).json({error: "The dress does not exist"})
            }else{
                const  dressU = await  MCustomdressType.findByPk(req.body.id)
                console.log(dressU);
                return res.status(200).json(dressU)
            }
            
        } catch (error) {

            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
  
            
        }
     
    })
}