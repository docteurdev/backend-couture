module.exports=(sequelize, DataTypes) =>{
    return sequelize.define('Subscription',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        startDate:{
            type: DataTypes.STRING,
            allowNull: false

        },
        endDate:{
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}