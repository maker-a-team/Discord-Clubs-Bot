const Discord = require("discord.js");
require("dotenv").config();

const command = require("./command");

const client = new Discord.Client({
  partials: ["MESSAGE", "REACTION", "CHANNEL"],
});

client.on("ready", () => {
  console.log("\nMS CLUBS Bot is ready\n\n");

  command(client, "hello", (message) => {
    message.channel.send("Hello");
  });
});

client.login(process.env.BOT_TOKEN);
