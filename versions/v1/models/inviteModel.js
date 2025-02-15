const {DataTypes} = require( "sequelize");
const {sequelize} = require( "./db.js");

const Invite = sequelize.define('Invite', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
    validate: {
      isEmail: true, 
    },
  },
  invitedBy:{
    type: DataTypes.INTEGER,
    allowNull:false,
   
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:"notaccept"
  },
  type:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  invitedDate:{
    type:DataTypes.STRING,
    allowNull:false,
    defaultValue:DataTypes.NOW(),
  },
  expiryDate:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  joinedDate:{
    type:DataTypes.STRING,
    allowNull: true,
  },
  channelId:{
    type:DataTypes.TEXT,
    allowNull:true,
  }
}, {
  tableName: 'invites',
  timestamps: true,
});


module.exports=Invite;