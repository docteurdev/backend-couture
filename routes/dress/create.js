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
        // let clentInfo = JSON.parse(req.body.dataCmd)
        // const { dressMakerID, clientId,model,tissu } = clentInfo;

        let clentInfo = req.body
        const { dressMakerID, clientId } = clentInfo;


        // const tissu = pickFile(req.files, 'tissu-jpg.jpg');
        // const model = pickFile(req.files, 'model-jpg.jpg');
        var dressmakerM, clientM, dressM;

        console.log("mes files88888888888888888888", clentInfo);
        // console.log(req.body);
    //     const tissuImg = tissu?tissu.filename : null
    //    const  modelImg=  model?model.filename : null

        const commande ={
            ...clentInfo,
            // tissus:tissuImg?`http://localhost:${Port}/${tissuImg}`: null,
            // photos:modelImg?`http://localhost:${Port}/${modelImg}`: null
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