module.exports = (sequelize, DataTypes) => {
    const Login = sequelize.define("Login", {
      userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
      // allowNull defaults to true
    }
  }, {
    // Other model options go here
  });
    return Login;
  };