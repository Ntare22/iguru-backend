const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Vehicles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Vehicles.init(
    {
      Brand: DataTypes.STRING,
      PlateNumber: DataTypes.STRING,
      Year: DataTypes.STRING,
      VehicleType: DataTypes.STRING,
      Version: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Vehicles',
    }
  );
  return Vehicles;
};
