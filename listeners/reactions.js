// https://github.com/discordjs/discord.js/blob/master/docs/topics/partials.md
// https://www.smashingmagazine.com/2021/02/building-discord-bot-discordjs/

const { rolesChannel, newsRole, chessRole, minecraftRole, dndRole } = require("../config.json");

module.exports = (client) => {
  // Adding reaction-role function
  // You can also try to upgrade partials to full instances:
  client.on("messageReactionAdd", async (reaction, user) => {
    // If a message gains a reaction and it is uncached, fetch and cache the message
    // You should account for any errors while fetching, it could return API errors if the resource is missing
    if (reaction.message.partial) await reaction.message.fetch();
    // Now the message has been cached and is fully available:
    // console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
    // Fetches and caches the reaction itself, updating resources that were possibly defunct.
    if (reaction.partial) await reaction.fetch();
    // Now the reaction is fully available and the properties will be reflected accurately:
    // console.log(`${reaction.count} user(s) have given the same reaction to this message!`);

    if (user.bot) return;
    if (!reaction.message.guild) return;

    if (reaction.message.channel.id == rolesChannel) {
      if (reaction.emoji.name === "📣") {
        await reaction.message.guild.members.cache.get(user.id).roles.add(newsRole);
      }
      if (reaction.emoji.name === "♟️") {
        await reaction.message.guild.members.cache.get(user.id).roles.add(chessRole);
      }
      if (reaction.emoji.name === "🏹") {
        await reaction.message.guild.members.cache.get(user.id).roles.add(minecraftRole);
      }
      if (reaction.emoji.name === "🎲") {
        await reaction.message.guild.members.cache.get(user.id).roles.add(dndRole);
      }
    } else return;
  });

  // Removing reaction roles
  client.on("messageReactionRemove", async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    if (reaction.message.channel.id == rolesChannel) {
      if (reaction.emoji.name === "📣") {
        await reaction.message.guild.members.cache.get(user.id).roles.remove(newsRole);
      }
      if (reaction.emoji.name === "♟️") {
        await reaction.message.guild.members.cache.get(user.id).roles.remove(chessRole);
      }
      if (reaction.emoji.name === "🏹") {
        await reaction.message.guild.members.cache.get(user.id).roles.remove(minecraftRole);
      }
      if (reaction.emoji.name === "🎲") {
        await reaction.message.guild.members.cache.get(user.id).roles.remove(dndRole);
      }
    } else return;
  });
};
