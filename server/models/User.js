module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});
  return User;
};
// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true