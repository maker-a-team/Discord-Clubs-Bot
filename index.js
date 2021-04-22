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

  command(client, "servers", (message) => {
    client.guilds.cache.forEach((guild) => {
      console.log(guild);
      message.channel.send(`${guild.name} has a totoal of ${guild.memberCount} members`);
    });
  });

  command(client, ["cc", "clearchannel"], (message) => {
    if (message.member.hasPermission("ADMINISTRATOR")) {
      message.channel.messages.fetch().then((results) => {
        message.channel.bulkDelete(results);
        // console.log("All Messaged Deleted: \n", results)
      });
    }
  });

  command(client, "status", (message) => {
    const content = message.content.replace("ms!status ", "");

    client.user.setPresence({
      activity: {
        name: content,
        type: "Developing: ",
      },
    });
  });
});

client.login(process.env.BOT_TOKEN);
