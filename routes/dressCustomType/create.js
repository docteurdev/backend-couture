const { ValidationError, UniqueConstraintError } = require("sequelize")
const { MdressType, MdressMaker, MCustomdressType } = require("../../bd/sequelize")
const { Port, errorServer } = require("../../common/common")


const multer  = require('multer')
const path= require('path');


const storage= multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "public");
    },
    filename: (req, file, cb) =>{
      cb(null, Date.now() + path.extname(file.originalname))  
    }
})
const upload = multer({storage: storage})


module.exports = (app) => {
    app.post(`/api/coutre/create-custdress`,upload.single("imageDress"), async (req, res) => {

        console.log("fileeeeeeee", req.file?.filename);

        const {DressMakerId, nameDress, measuresDress, typeDress} = req.body;

        const newDress = {
            DressMakerId,
            nameDress,
            imageDress: req.file? `http://www.affairez.com:3000/${req.file?.filename}` : "",
            measuresDress,
            typeDress,
     
        }
        try {
            var dressMaker;
            var dress;

            const dressCreated = await MCustomdressType.create(newDress, { include: [MdressMaker] });
            const currentDressMaker = await MdressMaker.findByPk(req.body.DressMakerId);


            if (dressCreated) {
                dress = dressCreated;
                dressMaker = currentDressMaker;
                dressMaker.addCustomdressType(dress);


                return res.json('Un type de vêtement a été ajouté avec succès');
            }
        } catch (error) {
            console.error('======== Error:', error);

            if (error instanceof ValidationError) {
                return res.status(404).json({ message: error.message, data: error });
            }
            if (error instanceof UniqueConstraintError) {
                return res.status(404).json({ message: error.message, data: error });
            }
            return res.json({ message: errorServer, data: error });
        }
    });
};
