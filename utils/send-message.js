module.exports = (channel, text, duration = 10) => {
  channel.send(text).then((message) => {
    if (duration == -1) {
      return;
    }
    setTimeout(() => {
      message.delete;
    }, 1000 * duration);
  });
};
