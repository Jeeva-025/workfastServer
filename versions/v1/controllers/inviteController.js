// controllers/peopleController.js
const { validateInvitation } = require("../validation/validation");
const invite = require("../models/inviteModel");
const { Op } = require("sequelize");
const People =require("../models/peopleModel");
const moment = require('moment');
const controller={}
controller.invitedPeople = async (req, res) => {
  try {
    const users = await invite.findAll({
      attributes:['id', 'email','status', 'type', 'invitedDate','expiryDate','joinedDate', 'channelId'],
      include: [
        {
          model: People,
          as: "invitedByPerson",  // Alias for the relation
          attributes: ["user_name"],  // Only get the user_name field
        },
      ],
    });

    const responseData = users.map(user => ({
      ...user.get(),  
      invitedByPerson: user.invitedByPerson.user_name 
    }));

    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

controller.insertPeople = async (req, res) => {
    const{email,invitedBy,channelId, type}= req.body;
   
    
  try {
    const now= new Date();
    const invitedDate= now.toISOString().split("T")[0]
    const toDate= new Date()
    toDate.setDate(now.getDate()+5);
    const expiryDate= toDate.toISOString().split("T")[0]
    

    const user = await invite.create({email,invitedBy,invitedDate,expiryDate,channelId, type});  
    res.status(201).json(user);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

controller.delete= async(req,res)=>{
  const {id}= req.query;
try{
  const data= await invite.findOne({where:{id}})
  data.status="inactive"
  data.save()
  res.json({message:"Deleted Successfully"})
}catch(err){
  console.log(err)
  res.status(500).json({ error: "Internal server error" });
}
}

module.exports= controller;