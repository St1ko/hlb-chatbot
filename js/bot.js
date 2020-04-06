//#4 Initialization
var botui = new BotUI("hello-world");

//#5 API call
botui.message.add({
  content: "Hello World from bot!"
})

.then(function() {
  botui.message.add({
    delay: 1000,
    human: true,
    content: "Hello World from human!"
  })

  .then(function() {
    botui.action.button({
      delay: 1000,
      action: [
        { // show only one button
          text: 'One',
          value: 'one'
        },
        { // show only one button
          text: 'Two',
          value: 'two'
        }
      ]
    })
    .then(function (res, index) { // will be called when a button is clicked.
      console.log(res.value); // will print "one" from 'value'
    })

    .then(function() {
      botui.message.add({
        delay: 1000,
        human: false,
        content: "Hello World from human!"
      })

      .then(function() {
        botui.action.text({
          delay: 1000,
          action: {
            placeholder: 'Enter your text here'
          }
        }).then(function (res) { // will be called when it is submitted.
          console.log(res.value); // will print whatever was typed in the field.
        })

        .then(function() {
          botui.message.add({
            delay: 1000,
            human: false,
            content: "Hello World from human!"
          })
          
          .then(function() {
            botui.action.button({
              cssClass: 'botui-actions-ratings',
              delay: 1000,
              action: [
                { // show only one button
                  text: '1',
                  value: '1'
                },
                { // show only one button
                  text: '2',
                  value: '2'
                },
                { // show only one button
                  text: '3',
                  value: '3'
                },
                { // show only one button
                  text: '4',
                  value: '4'
                },
                { // show only one button
                  text: '5',
                  value: '5'
                }
              ]
            })
            .then(function (res) { // will be called when a button is clicked.
              console.log(res.value); // will print "one" from 'value'
            });
          });
        });
      });
    });
  });
});

