const Invite=require("./inviteModel");
const People=require("./peopleModel");

Invite.belongsTo(People, { foreignKey: "invitedBy", as: "invitedByPerson" });
People.hasMany(Invite, { foreignKey: "invitedBy", as: "invitedPeople" });
