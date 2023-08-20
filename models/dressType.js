module.exports = (sequelize, DataTypes) =>{
    return sequelize.define("dressType",{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        image:{
            type: DataTypes.STRING,
            allowNull: false
        },
        measures:{
            type: DataTypes.STRING(1234),
            allowNull: false
        }
    })
}