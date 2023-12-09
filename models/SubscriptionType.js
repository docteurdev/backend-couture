module.exports=(sequelize, DataTypes) =>{
    return sequelize.define('SubscriptionType',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false

        },
        price:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        desc:{
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}