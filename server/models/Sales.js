module.exports = (sequelize, DataTypes) => {
    const Sales = sequelize.define("Sales", {
        userid:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        datepurchased: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        
    });
    return Sales;
}