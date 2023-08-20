module.exports = (sequelize, DataTypes) =>{
    return sequelize.define("CustomdressType",{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nameDress:{
            type: DataTypes.STRING,
            allowNull: false
        },
        imageDress:{
            type: DataTypes.STRING,
            allowNull: false
        },
        measuresDress:{
            type: DataTypes.STRING(1234),
            allowNull: false
        }
    })
}