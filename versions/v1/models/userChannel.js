const { DataTypes }= require( "sequelize");
const {sequelize} =require( "./db.js");


const UserChannel = sequelize.define('userChannel', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  invitedById:{
    type: DataTypes.INTEGER,
    allowNull:false,
  },
  userId:{
    type: DataTypes.STRING,
    allowNull:false,
  },
  channelId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status:{
    type:DataTypes.STRING,
    allowNull:false,
    defaultValue:"accept",
  },
}, 
{
  tableName: 'userchannels',
  timestamps: true,
});


module.exports = UserChannel;