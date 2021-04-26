const Discord = require("discord.js");
require("dotenv").config();

const command = require("./utils/command");
const rolesMessage = require("./utils/roles-message");

const welcomeMessageListener = require("./listeners/welcome");
const rolesMessageListener = require("./listeners/reactions");
const membersCountListener = require("./listeners/member-count");
const deletedMessageListener = require("./listeners/delete-message");
const privateMessageListener = require("./listeners/private-message");

const { rolesChannelID, rolesMessageID } = require("./config.json");

const client = new Discord.Client({
  partials: ["MESSAGE", "REACTION", "CHANNEL"],
});

client.on("ready", () => {
  console.log("\nMS CLUBS Bot is ready\n\n");

  //   LISTENERS
  welcomeMessageListener(client);
  deletedMessageListener(client);
  rolesMessageListener(client);
  membersCountListener(client);
  privateMessageListener(client, "upcoming dates", "Checkout https://make.sc/academic-calendar");

  rolesPrompt = `React with one of the emojis to get a role
    📣  |  News & Announcements Notifications
    ♟️  |  Chess Club
    🏹  |  Minecraft Club
    🎲  |  DnD Club`;

  rolesMessage(client, rolesChannelID, rolesMessageID, rolesPrompt, ["📣", "♟️", "🏹", "🎲"]);

  //   COMMANDS
  command(client, ["si", "servers", "serverInfo"], (message) => {
    client.guilds.cache.forEach((guild) => {
      //   console.log(guild);
      const { name, region, memberCount, owner, afkTimeout } = guild;
      const icon = guild.iconURL();
      const embed = new Discord.MessageEmbed()
        .setTitle(`"${name}" Server Info`)
        .setThumbnail(icon)
        .setFooter(`Owner: ${owner.user.tag}`)
        .addFields(
          {
            name: "Region",
            value: region,
          },
          {
            name: "Members",
            value: memberCount,
          },
          {
            name: "AFK Timeout",
            value: afkTimeout / 60,
          }
        );

      message.channel.send(embed);
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

  command(client, "embed", (message) => {
    const logo = "";
    const embed = new Discord.MessageEmbed()
      .setTitle("Make School Courses")
      .setURL("https://makeschool.com/")
      .setAuthor(message.author.username)
      .setImage(logo)
      .setThumbnail(logo)
      .setFooter("This is a footer", logo)
      .setColor("#00AAFF")

      .addFields(
        {
          name: "CS",
          value: "https://make.sc/CS1.0",
          inline: true,
        },
        {
          name: "DS",
          value: "https://make.sc/DS1.0",
          inline: true,
        },
        {
          name: "BEW",
          value: "https://make.sc/BEW1.0",
          inline: true,
        },
        {
          name: "SPD",
          value: "https://make.sc/SPD1.0",
          inline: true,
        },
        {
          name: "MOB",
          value: "https://make.sc/MOB1.0",
          inline: true,
        },
        {
          name: "FEW",
          value: "https://make.sc/FEW1.0",
          inline: true,
        }
      );

    message.channel.send(embed);
  });
});

client.login(process.env.BOT_TOKEN);
