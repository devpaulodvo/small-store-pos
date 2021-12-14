module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      productName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
      // allowNull defaults to true
    },
    stat: {
      type: DataTypes.STRING,
      allowNull: false
      // allowNull defaults to true
    }
  }, {
    // Other model options go here
  });
    return Product;
  };