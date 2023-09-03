const { MCatalogue } = require("../../bd/sequelize")

module.exports = (app) =>{
    app.delete("/api/coutre/delete-cat", async (req,res) =>{
    const {id, dressMakerId} = req.body;
      try {
        const catToremove = await MCatalogue.findOne({where:{id, dressMakerId}}); 
        if(!catToremove){
            return res.status(401).json({message: "this model is not exist"})
        }else{
          const catRemoved =  await MCatalogue.destroy({where:{id, dressMakerId}});
          return res.status(200).json({message: "the model is deleted", data: catToremove})
        }
      } catch (error) {
        return res.json(error)
      }  
    })
}

// [
//     {
//      id:1,
//      name: "name1",
//      measures:[
//         {id: 1, name: "shoulder", image: "shouler image"},
//         {id: 2, name: "neck", image: "neck image"},
//         {id: 3, name: "chest", image: "chest image"},
//         {id: 4, name: "hips", image: "hips image"},
//     ]
//     }
// ]