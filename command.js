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
        callback(message)
      }
    });
  });
};
