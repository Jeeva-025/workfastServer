const {  DataTypes } = require("sequelize");
const {sequelize} = require("./db.js"); 

const UserTeam = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id:{
    type: DataTypes.STRING,
    allowNull:false,
  },  
  name:{
    type: DataTypes.STRING,
    allowNull:false
  },
  team_id:{
    type:DataTypes.STRING,
    allowNull:true
  },
  joineddate:{
    type:DataTypes.DATE,
    allowNull:true
  },
  leftdate:{
    type:DataTypes.DATE,
    allowNull:true
  }, 
  status:{
   type:DataTypes.INTEGER,
   defaultValue:1,
   allowNull:false, 
  }
}, {
  tableName: "userTeams", // Name of your database table
  timestamps: false,
});


module.exports = UserTeam;