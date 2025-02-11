const fs = require('fs');
const path = require('path');
const People = require("../models/peopleModel");
const invite= require("../models/inviteModel")
const { where } = require("sequelize");
const upload = require('../utils/storageUtils');
const userChannel=require("../models/userChannel");

const controller = {};

controller.getAllPeople = async (req, res) => {
  try {
    const {user_name,order,designation,type } = req.query; // Extract query parameters
    const whereClause = {};
    const sortOrder = [];

    if (user_name) {
      whereClause.user_name = user_name; // Filter by name
    }

    if (designation) {
      whereClause.designation = designation; // Filter by designation
    }
    if (type) {
      whereClause.type = type; // Filter by designation
    }
    if (order === "A-Z" || order === "a-z") {
      sortOrder.push(["user_name", "ASC"]); // Sort ascending by name
    } else if (order === "Z-A" || order === "z-a") {
      sortOrder.push(["user_name", "DESC"]); // Sort descending by name
    }

    const users = await People.findAll({
      where: Object.keys(whereClause).length ? whereClause : undefined,
      order: sortOrder.length ? sortOrder : undefined,
    });

    if (users.length > 0) {
      const usersWithImages = users.map(user => {
        // Assuming the imagename field has the correct filename and is stored in the 'uploads' directory
         user.imagename = `http://localhost:8080/uploads/${user.imagename}`;
        return {
          ...user.dataValues, // keep all user data
        };
      });

      res.json(usersWithImages);
    } else {
      res.json({ message: "No data found matching the criteria." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


controller.insertPeople = async (req, res) => {
  try {
    const { user_name, email, mobile_number, designation, type } = req.body;
    const data = await invite.findOne({ where: { email } });
  
    if (!data) {
      return res.status(404).json({ message: "Invitation is not found"});
    }
    if(data.status==='inactive'){
      return res.status(404).json({message:"Status is inactive"});
    }

    const now = new Date();
    
    const expirydate = new Date(data.expireDate);
    const jDate = now.toISOString().split("T")[0];

    // Update invite status
    

    // Check if invitation is still valid
    if ( now > expirydate) {
      return res.status(400).json({ message: "Invitation has expired" });
    }

   

    if (!user_name || !email || !mobile_number  || !designation || !type) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    data.joinedDate = jDate;
    data.status = "accept";
    await data.save();

    //Create new user in 'people' table
    const people=await People.create({
      imagename: req.file.filename,
      user_name,
      email,
      mobile_number,
      designation,
      type,
      
    });

    people.user_id=user_name+people.id;
    await people.save();

    //Fetch invitedBy and channelId from invite table
    const invitedById = data.invitedBy;
    const channelId = data.channelId;

    // Insert into userChannel table
    await userChannel.create({
      invitedById,
      userId: people.user_id, 
      channelId, 
     
    });

    res.status(200).json({ message: "User created and added to user channel successfully!" });

  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};




module.exports = controller;