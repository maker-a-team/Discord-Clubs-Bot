const { welcomeChannelID, rolesChannelID } = require("../config.json");

module.exports = (client) => {
  client.on("guildMemberAdd", (member) => {
    console.log(member);
    const welcomChannel = member.guild.channels.cache.get(welcomeChannelID);
    const targetChannel = member.guild.channels.cache.get(rolesChannelID).toString();

    const message = `Please welcome <@${member.id}> to the server!! Please Check Out ${targetChannel}`;
    welcomChannel.send(message);
  });
};
