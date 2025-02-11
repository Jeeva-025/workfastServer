const user = require("../models/userTeamModel");
const team = require("../models/teamModel");
const { where } = require("sequelize");
const People = require("../models/peopleModel");


const controller = {};

controller.getAllTeams = async (req, res) => {
  try {
   
    const teams = await team.findAll();
    res.status(200).json(teams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


controller.createTeam = async (req, res) => {
  try {
    const { team_name, members = [], team_description } = req.body;

    const newTeam = await team.create({
      team_name,
      team_description,
      team_count: members.length,
      createddate: new Date(),
    });

    
    newTeam.team_id = team_name + newTeam.id;
    await newTeam.save(); 

    // Assign members to the team
    for (const userId of members) {
      const people = await People.findOne({ where: { user_id: userId } });  
        await user.create({
        name:people.user_name,
        user_id:userId,
        team_id:newTeam.team_id,
        joineddate: new Date()});
    }

    res.status(200).json(newTeam);

  } catch (error) {
    console.error("Error inserting team:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

controller.Delete = async (req, res) => {
  const { user_ids, team_id } = req.body; 

  try {
    const users = await user.findAll({
      where: { user_id: user_ids, team_id: team_id, status: 1 }
    });

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found in the team" });
    }

    // Update users
    for (const userData of users) {
      userData.leftdate = new Date();
      userData.status = 0;
      await userData.save();
    }

    // Update team count in a single step
    const teamData = await team.findOne({ where: { team_id } });
    if (teamData) {
      teamData.team_count -= users.length; 
      await teamData.save();
    }

    res.send({ message: "Users removed successfully" });

  } catch (err) {
    console.error("Error updating users:", err);
    res.status(500).json({ message: err.message });
  }
};



controller.addMembers= async(req,res)=>{
  const {team_id,members=[]}= req.body;
  const tdata= await team.findOne({where:{team_id}});
  tdata.team_count= tdata.team_count+ members.length;
  tdata.save()
  const teamId= tdata.team_id;
  for(const userId of members){
    const udata= await user.findOne({where:{user_id:userId}})
    udata.team_id= teamId;
    udata.save()
  }
  res.send({message:"Added successfully in our team"})
}

controller.Update = async (req, res) => {
  try {
    const {team_id, team_name, members = [], team_description } = req.body;
    
    
   const data= await team.findOne({where:{team_id}})
   data.team_name= team_name;
   data.team_description= team_description;
   data.team_count= members.length;
   data.createddate= new Date()
   data.save();

    for (const userId of members) {
      const userData = await user.findOne({ where: { user_id: userId } });
      if (userData) {
        userData.team_id=data.team_id;
        userData.joineddate = new Date();
        await userData.save();
      }
    }

    res.status(200).json({ message: "Team Updated!" });

  } catch (error) {
    console.error("Error inserting team:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};



controller.teamDelete= async (req,res)=>{
  
  const {team_id}= req.body;
  try{
  const data= await team.findOne({where:{team_id}});
  data.deactivateddate= new Date();
  await data.save();
  res.status(200).json({message:"Team Deactivated"})
  }catch(err){
    console.log(err);
    res.status(500).json({message:err.message});
  }
}

module.exports = controller;