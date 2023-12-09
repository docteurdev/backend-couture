const { MdressMaker } = require("../../bd/sequelize");

module.exports = (app) =>{

    app.put('/api/coutre/subscription', async (req, res) => {
        // const { id } = req.params;
        const {id,subscribe} = req.body;
        console.log(req.body);
      
        try {
          // Use Sequelize's update method to update the DressMaker record
          const dressMaker = await MdressMaker.findByPk(id);
          
          if (!dressMaker) {
            return res.status(404).json({ error: 'DressMaker not found' });
          }
          
          const newDressMaker = await MdressMaker.update({subscribe},{where: {id}});

          // Fetch and return the updated DressMaker record
          const user = {
             id: dressMaker.id,
             name: dressMaker.name,
             lastname: dressMaker.lastname,
        }
          return res.status(200).json({user});
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: 'Internal server error' });
        }
      });
}