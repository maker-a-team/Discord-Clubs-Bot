const { memberCountChannelID, serverID } = require("../config.json");

module.exports = (client) => {
  const updateMembers = (guild) => {
    const channel = guild.channels.cache.get(memberCountChannelID);
    channel.setName(`Members: ${guild.memberCount.toLocaleString()}`);
  };

  client.on("guildMemberAdd", (member) => updateMembers(member.guild));
  client.on("guildMemberRemove", (member) => updateMembers(member.guild));

  const guild = client.guilds.cache.get(serverID);
  updateMembers(guild);
};
