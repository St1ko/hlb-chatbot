//#4 Initialization
var botui = new BotUI("hello-world");

//#5 API call
botui.message
  .add({
    content: "Hello World from bot!"
  })
  .then(function() {
    // wait till previous message has been shown.

    botui.message.add({
      delay: 1000,
      human: true,
      content: "Hello World from human!"
    });
  });
