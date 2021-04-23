// https://github.com/discordjs/discord.js/blob/master/docs/topics/partials.md
// https://www.smashingmagazine.com/2021/02/building-discord-bot-discordjs/

const { rolesChannelID, newsRole, chessRole, minecraftRole, dndRole } = require("../config.json");

module.exports = (client) => {
  // Adding reaction-role function
  // You can also try to upgrade partials to full instances:
  client.on("messageReactionAdd", async (reaction, user) => {
    // If a message gains a reaction and it is uncached, fetch and cache the message
    // You should account for any errors while fetching, it could return API errors if the resource is missing
    if (reaction.message.partial) await reaction.message.fetch();
    // Now the message has been cached and is fully available:
    // console.log(`${reaction.message.author.username}'s message gained a reaction! \n"${reaction.message.content}"`);
    // Fetches and caches the reaction itself, updating resources that were possibly defunct.
    if (reaction.partial) await reaction.fetch();
    // Now the reaction is fully available and the properties will be reflected accurately:
    // console.log(`${reaction.count} user(s) have given the same reaction to this message!`);

    if (user.bot) return;
    if (!reaction.message.guild) return;

    if (reaction.message.channel.id == rolesChannelID) {
      const userReaction = reaction.message.guild.members.cache.get(user.id);
      switch (reaction.emoji.name) {
        case "📣":
          await userReaction.roles.add(newsRole);
        case "♟️":
          await userReaction.roles.add(chessRole);
        case "🏹":
          await userReaction.roles.add(minecraftRole);
        case "🎲":
          await userReaction.roles.add(dndRole);
        default:
          return;
      }
    }
  });

  // Removing reaction roles
  client.on("messageReactionRemove", async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    const userReaction = reaction.message.guild.members.cache.get(user.id);
    switch (reaction.emoji.name) {
      case "📣":
        await userReaction.roles.remove(newsRole);
      case "♟️":
        await userReaction.roles.remove(chessRole);
      case "🏹":
        await userReaction.roles.remove(minecraftRole);
      case "🎲":
        await userReaction.roles.remove(dndRole);
      default:
        return;
    }
  });
};
