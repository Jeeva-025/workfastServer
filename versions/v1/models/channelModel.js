const { DataTypes }= require( "sequelize");
const {sequelize} =require( "./db.js");

// Step 2: Define the Model
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
  tableName: 'channels', // Specify the table name if different
  timestamps: true,   // Adds createdAt and updatedAt fields
});


module.exports=Channel;