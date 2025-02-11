const {  DataTypes } = require("sequelize");
const {sequelize} = require("./db.js"); // Ensure this points to your Sequelize instance

const team = sequelize.define("teams", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  team_id:{
    type: DataTypes.STRING,
    unique:true,
    allowNull:true
  },
  team_name:{
    type: DataTypes.STRING,
    unique:true,
    allowNull:false
  },
  team_description:{
    type: DataTypes.STRING,
    allowNull:true
  },
  team_count:{
    type:DataTypes.INTEGER
  },
  createddate:{
    type:DataTypes.DATE,
    allowNull:true
  },
  deactivateddate:{
    type:DataTypes.DATE,
    allowNull:true
  }
}, {
  tableName: "teams", // Name of your database table
  timestamps: false,
});

module.exports = team;