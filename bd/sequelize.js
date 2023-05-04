const { Sequelize, DataTypes } = require("sequelize");

const modelCilent = require('../models/Client');
const modelDressMaker = require('../models/DressMaker');
const modelDress = require('../models/Dress');
const modelCatalogue= require('../models/Cataogue')
//  database connexion
const sequelize = new Sequelize(process.env.DB_NAME || 'couture-back', process.env.DB_USER || 'root', process.env.DB_PASSWORD ||'root', {
   host: process.env.DB_HOST ||'localhost',
   port: process.env.NODE_ENV === 'production'? 7963 : 3306 ,
   dialect: 'mysql',
   logging: console.log 
})

// object of Modeles
const MdressMaker = modelDressMaker(sequelize, DataTypes);
const Mclient = modelCilent(sequelize, DataTypes);
const Mdress = modelDress(sequelize, DataTypes);
const MCatalogue= modelCatalogue(sequelize, DataTypes)

// assossiation;
MdressMaker.hasMany(MCatalogue);
MCatalogue.belongsTo(MdressMaker)


MdressMaker.hasMany(Mclient);
Mclient.belongsTo(MdressMaker)

MdressMaker.hasMany(Mdress);
Mdress.belongsTo(MdressMaker);

Mclient.hasMany(Mdress);
Mdress.belongsTo(Mclient);

const connexioDatabse= () =>{
    return sequelize.sync({alter: true}).then(_ =>{
    }).then(data =>{})
}

sequelize.authenticate()
.then(_ => console.log("sequelize is connected to couture database") )
.catch( error => console.log(error));

module.exports={connexioDatabse, Mclient, MdressMaker, Mdress, MCatalogue}