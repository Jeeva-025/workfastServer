const user = require("../models/userTeamModel");
const moment = require("moment");
const People=require("../models/peopleModel");
const { Op } = require("sequelize");


const controller = {};

controller.findAll= async(req,res)=>{
    try{
        const users= await user.findAll()
        res.send(users)
    }catch(error){
        res.send({message:"Unable retrieve"})
    }
}

controller.findUsersByTeamName = async (req, res) => {
  const { id } = req.params; 

  try {
    if (!id) {
      return res.status(400).json({ message: "Team ID is required" });
    } 
    const teamMembers = await user.findAll({
      attributes: ["user_id"], 
      where: {
        team_id: id,
        status: 1,
      },
    });

    

    const arr = teamMembers.map((user) => user.user_id);

   
    const usersData = await People.findAll({
      attributes: ["user_id"], 
      where: {
        user_id: { [Op.in]: arr }, 
      },
    });
    const userIds = usersData.map((user) => user.user_id);

    res.status(200).json(userIds);
  } catch (error) {
    console.error("Error fetching users by team ID:", error);
    res.status(500).json({ message: "Error fetching users", error });
  }
};

controller.Insert = async (req, res) => {
  try {
    const { name } = req.params;

    // Function to generate a unique ID
    const generateUniqueID = () => {
      const keys = "1234567890!@#$%^&*abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let result = "";
      for (let i = 0; i < 5; i++) {
        result += keys.charAt(Math.floor(Math.random() * keys.length));
      }
      return result;
    };

    let unique_id;
    let isUnique = false;

    while (!isUnique) {
      unique_id = generateUniqueID();

      const avail = await user.findAll({ where: { user_id:unique_id } });
      if (avail.length === 0) {
        isUnique = true; 
      }
    }

    await user.create({ user_id: unique_id, name });
    res.json({ message: "Successfully Created", user_id: unique_id });

  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = controller;