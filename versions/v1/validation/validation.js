const Joi = require('joi');

const validateChannel = () => {
  const schema = Joi.object({
    channelName: Joi.string().min(3).max(100).required(),
  });
  return schema
}

const validateInvitation = () => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    invitedBy: Joi.number().integer().required(),
    type:Joi.string().required(),
  });

  return schema; // Return the schema itself, not the result of schema.validate()
};

const validatePeopleInsert=()=>{
  const schema= Joi.object({
    user_name:Joi.string().required(),
    email: Joi.string().email().required(),
    mobile_number: Joi.string().required(),
    designation: Joi.string().required(),
    type:Joi.string().required(),
  });
  return schema;
}

const validateTeam = () => {
  const schema = Joi.object({
    team_name: Joi.string().min(3).max(50).required(),
    members: Joi.array().items(Joi.string()).required(), // Array of member IDs (as strings)
    
  });
  return schema;
};

const validateTeamUpdate = () => {
  const schema = Joi.object({
    team_id: Joi.string().min(3).max(50).required(),
    team_name: Joi.string().min(3).max(50).required(),
    members: Joi.array().items(Joi.string()).required(), // Array of member IDs (as strings)
    
  });
  return schema;
};

// Invitation Validation
const validateUser = () => {
  const schema = Joi.object({
   name:Joi.string().min(3).max(50).required(),
  });
  return schema;
};



module.exports = {
  validateChannel,
  validateInvitation,
  validatePeopleInsert,
  validateTeam,
  validateUser,
  validateTeamUpdate,
};