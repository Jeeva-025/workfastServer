const { DataTypes }= require( "sequelize");
const {sequelize} =require( "./db.js");


const Channel = sequelize.define('channel', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  channelName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status:{
    type:DataTypes.STRING,
    allowNull:false,
    defaultValue:"active"
  }
}, {
  tableName: 'channels', 
  timestamps: true,   
});


module.exports=Channel;