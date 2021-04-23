const Discord = require("discord.js");
require("dotenv").config();

const command = require("./utils/command");
const rolesMessage = require("./utils/roles-message");

const rolesMessageListener = require("./listeners/reactions");
const deletedMessageListener = require("./listeners/delete-message");
const privateMessageListener = require("./listeners/private-message");

const { rolesChannel } = require("./config.json");

const client = new Discord.Client({
  partials: ["MESSAGE", "REACTION", "CHANNEL"],
});

client.on("ready", () => {
  console.log("\nMS CLUBS Bot is ready\n\n");

  //   LISTENERS
  deletedMessageListener(client);
  rolesMessageListener(client);
  privateMessageListener(client, "upcoming dates", "Checkout https://make.sc/academic-calendar");

  rolesPrompt = `React with one of the emojis to get a role
    📣  |  News & Announcements Notifications
    ♟️  |  Chess Club
    🏹  |  Minecraft Club
    🎲  |  DnD Club`;

  rolesMessage(client, rolesChannel, rolesPrompt, ["📣", "♟️", "🏹", "🎲"]);

  //   COMMANDS
  command(client, "servers", (message) => {
    client.guilds.cache.forEach((guild) => {
      //   console.log(guild);
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
        type: 0,
      },
    });
  });
});

client.login(process.env.BOT_TOKEN);
