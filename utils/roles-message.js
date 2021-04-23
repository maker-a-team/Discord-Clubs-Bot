const addReactions = (message, reactions) => {
  reaction = reactions[0];
  // console.log(`Adding Reaction: ${reaction} to message ${message.id}`);
  message.react(reaction);
  reactions.shift();
  if (reactions.length > 0) {
    setTimeout(() => addReactions(message, reactions), 750);
  }
};

module.exports = async (client, channelID, messageID, text, reactions = []) => {
  const channel = await client.channels.fetch(channelID);
  const roleMessage = await channel.messages.fetch(messageID);

  channel.messages.fetch().then((messages) => {
    if (messages.size === 0) {
      // send a new message
      channel.send(text).then((message) => {
        addReactions(message, reactions);
      });
    } else {
      // Edit the existing message
      roleMessage.edit(text);
      addReactions(roleMessage, reactions);
    }
  });
};
