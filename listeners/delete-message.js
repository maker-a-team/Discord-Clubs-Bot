// https://github.com/discordjs/discord.js/blob/master/docs/topics/partials.md

module.exports = (client) => {
  client.on("messageDelete", (message) => {
    console.log(`${message.id} was deleted!`);
    // Partial messages do not contain any content so skip them
    if (!message.partial) {
      console.log(`It had content: "${message.content}"`);
    }
  });
};
