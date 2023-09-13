const { ValidationError, UniqueConstraintError } = require("sequelize");
const { MdressMaker, Mclient, Mdress } = require("../../bd/sequelize");
const { errorServer, Port } = require("../../common/common");

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
const pickFile = (files, choice) =>{
 return files.find(t =>{ return t.originalname === choice})
}


module.exports = (app) => {
    app.post("/api/coutre/create-cmd",upload.array('files'),(req, res) => {
        console.log("mes files88888888888888888888", req.files);
         let clentInfo = JSON.parse(req.body.dataCmd)
         const orderFile = req.files
        // const { dressMakerID, clientId,model,tissu } = clentInfo;

        // let clentInfo = req.body
        const { dressMakerID, clientId } = clentInfo;


        // const tissu = pickFile(req.files, 'tissu-jpg.jpg');
        // const model = pickFile(req.files, 'model-jpg.jpg');
        var dressmakerM, clientM, dressM;

        // console.log(req.body);

        const commande ={
            ...clentInfo,
            tissus:orderFile[0]?`http://www.affairez.com:${Port}/api/coutre/${orderFile[0]?.filename}`: null,
            photos:orderFile[1]?`http://www.affairez.com:${Port}/api/coutre/${orderFile[1]?.filename}`: null
            // tissus:tissu ,
            // photos: model
        }

       // console.log(commande);

        MdressMaker.findByPk(dressMakerID).then((dressmaker) => {
            dressmakerM = dressmaker;
             Mclient.findByPk(clientId).then(client => {
                clientM = client;
             Mdress.create(commande).then(cmd =>{
                 dressM =cmd
                  dressmakerM.addCommande(dressM);
                  clientM.addCommande(dressM)
                let message=`la nouvelle commande de ${clientM.name} ${clientM.lastname} est ajoutée avec succès`
                return res.json({message, data: cmd})
             })
            })
        }).catch((err) => {
            if(err instanceof ValidationError){
                return res.json({message: err.message, data: err})
            }
            if(err instanceof UniqueConstraintError){
                return res.json({message: err.message, data: err})

            }else{
                return res.json(errorServer)

            }
        });
    })
}