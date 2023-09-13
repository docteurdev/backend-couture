module.exports = (sequelize, DataTypes) => {
  return sequelize.define("CustomdressType", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nameDress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageDress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    measuresDress: {
      type: DataTypes.STRING(1234),
      allowNull: false,
      get() {
        // Parse the string into an array when retrieving it
        const rawValue = this.getDataValue("measuresDress");
        return rawValue ? rawValue.split(",") : []; // Assuming measures are comma-separated
      },
      set(value) {
        // Convert the array to a string when setting it
        if (Array.isArray(value)) {
          this.setDataValue("measuresDress", value.join(","));
        } else {
          this.setDataValue("measuresDress", value);
        }
      },
    },
    typeDress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
