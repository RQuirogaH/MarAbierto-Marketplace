const { DataTypes } = require('sequelize');
/**
 * @author Nicolas Alejandro Suarez
 * @param {} sequelize 
 */
module.exports = (sequelize) => {
  sequelize.define('shopping_car', {
    date:{
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: true, 
      }
    }
  }, {timeStamps: false,
    createdAt: false,
    updatedAt: false});
};