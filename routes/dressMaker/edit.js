const { MdressMaker } = require("../../bd/sequelize");

module.exports = (app) =>{

    app.put('/api/coutre/update-dressMaker', async (req, res) => {
        // const { id } = req.params;
        const {id, name, lastname, phone, photo } = req.body;
      
        try {
          // Use Sequelize's update method to update the DressMaker record
          const [updatedRowCount] = await MdressMaker.update({name,lastname,phone,photo,},{where: {id},});
      
          if (updatedRowCount === 0) {
            return res.status(404).json({ error: 'DressMaker not found' });
          }
      
          // Fetch and return the updated DressMaker record
          const updatedDressmaker = await MdressMaker.findByPk(id);
          const user = {
             id: updatedDressmaker.id,
             name: updatedDressmaker.name,
             lastname: updatedDressmaker.lastname,
             phone: updatedDressmaker.phone,
             photo: updatedDressmaker.photo
        }
          return res.status(200).json(user);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: 'Internal server error' });
        }
      });
}