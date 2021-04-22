const addReactions = (message, reactions) => {
  message.react(reactions[0]);
  reactions.shift();
  if (reactions.length > 0) {
    setTimeout(() => addReactions(message, reactions), 750);
  }
};

module.exports = async (client, id, text, reactions = []) => {
  const channel = await client.channels.fetch(id);

  channel.messages.fetch().then((messages) => {
    if (messages.size === 0) {
      //send a new message
      channel.send(text).then((message) => {
        addReactions(message, reactions);
      });
    } else {
      // Edit the existing message
      for (const messaage of messages) {
          messaage[1].edit(text)
          addReactions(messaage[1], reactions)
      }
    }
  });
};
