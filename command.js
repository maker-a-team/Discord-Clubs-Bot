const { prefix } = require("./config.json");

module.exports = (client, aliases, callback) => {
  if (typeof aliases === "string") {
    aliases = [aliases];
  }

  client.on("message", (message) => {
    const { content } = message;

    aliases.forEach((alias) => {
      const commad = `${prefix}${alias}`;

      if (content.startsWith(`${commad} `) || content === commad) {
        console.log(`Running the commmand: ${commad}`);
        callback(message);
      }
    });
  });

  client.on("messageDelete", (message) => {
    console.log(`${message.id} was deleted!`);
    // Partial messages do not contain any content so skip them
    if (!message.partial) {
      console.log(`It had content: "${message.content}"`);
    }
  });
};
