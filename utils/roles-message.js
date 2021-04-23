const addReactions = (message, reactions) => {
  reaction = reactions[0];
  //   console.log(`Adding Reaction: ${reaction} to message ${message.id}`);
  message.react(reaction);
  reactions.shift();
  if (reactions.length > 0) {
    setTimeout(() => addReactions(message, reactions), 750);
  }
};

module.exports = async (client, id, text, reactions = []) => {
  const channel = await client.channels.fetch(id);

  channel.messages.fetch().then((messages) => {
    if (messages.size === 0) {
      //   console.log("Channel Empty creating a new message");
      // send a new message
      channel.send(text).then((message) => {
        addReactions(message, reactions);
      });
    } else {
      //   console.log("Channel Not Empty editing message");
      // Edit the existing message
      for (const message of messages) {
        message[1].edit(text);
        addReactions(message[1], reactions);
      }
    }
  });
};
