const {  DataTypes } = require("sequelize");
const {sequelize} = require("./db.js"); // Ensure this points to your Sequelize instance

const People = sequelize.define("people", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  user_id:{
    type:DataTypes.STRING,
    allowNull:true,
  },
  imagename:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true,
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  mobile_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true,
  },
  status:{
    type:DataTypes.STRING,
    allowNull:false,
    defaultValue:"accept"
  },
  designation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type:{
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: "peoples", // Name of your database table
  timestamps: true,
});

module.exports = People;