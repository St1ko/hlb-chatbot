//#4 Initialization
var categories = ["Cash", "Persoonlijk", "Eigendom", "Risico", "Informatie", "Mensen", "Strategie", "Klanten"];
var loop = 0;

var botui = new BotUI("hello-world");

//#5 API call
botui.message
  .add({
    content: "Hallo, ik ben Dirk de Chatbot van HLB Van Daal!"
  })
.then(function() {
    // wait till previous message has been shown.

    return botui.message.add({ // show a message
    
    delay: 500,
    content: 'Heeft u hulp nodig bij uw bedrijf? Zo ja, vul de vragenlijst  in om contact op te nemen met HLB Van Daal en hun te in te briefen over uw probleem?'
    
}).then(function () { // wait till its shown
      return botui.action.button({ // show 'text' action

          human: true,
          action: 
            [{
                text: "ja",
                value: "ja"
            }, {
                text: "nee",
                value: "nee"
            }]
      });
}).then(function (res) {
  if(res.value == 'ja') {
    test();
  }
else if(res.value == 'nee') {
    contact();
  }
});
});


    
var test = function () {
    
        return botui.message.add({
        
        delay: 500,
        content: 'Welke van deze onderwerpen zorgen binnen uw bedrijf voor problemen?'
    }).then(function () { // wait till its shown
      /*botui.action.select({
          action: {
              placeholder : "U kunt meerdere selecteren", 
              multipleselect : true, // Default: false
              options : [{
                        text: "Cash",
                          value: "cash"
                    },{
                        text: "Persoonlijk",
                          value: "persoonlijk"
                    },{
                        text: "Eigendom",
                          value: "eigendom"
                    },{
                        text: "Risico",
                          value: "risico"
                    },{
                        text:  "Informatie",
                          value: "informatie"
                    },{
                        text: "Mensen",
                          value: "mensen"
                    },{
                        text: "Strategie",
                          value: "strategie"
                    },{
                        text:  "Klanten", 
                          value: "Klanten"
                    }],
              button: {
                icon: 'check',
                label: 'OK'
              }
            }
}).then(function (sar) { // get the result
    
        return botui.message.add({
        
        delay: 500,
        content: 'Hoe zou u uw bedrijf beoordelen op: ' + sar.value
    });
}).then(function () { // wait till its shown
  return botui.action.button({ // show 'text' action

          human: true,
          action: 
            [{
                text: "1",
                  value: "rating1"
            },{
                text: "2",
                  value: "rating2"
            },{
                text: "3",
                  value: "rating3"
            },{
                text: "4",
                  value: "rating4"
            },{
                text: "5",
                  value: "rating5"
            }]
      });
})*/
        vragenLoop();
})
};

var vragenLoop = function () {
  if (loop < categories.length)
      {
          console.log(loop);
          vragen();
          
      }
    else {
        uitslag();
    }
};

var vragen = function () {
 // get the result
    
        botui.message.add({
        
        delay: 500,
        content: 'Hoe zou u uw bedrijf beoordelen op: ' + categories[loop]
    }).then(function () { // wait till its shown
  return botui.action.button({ // show 'text' action

          human: true,
          action: 
            [{
                text: "1",
                  value: "rating1"
            },{
                text: "2",
                  value: "rating2"
            },{
                text: "3",
                  value: "rating3"
            },{
                text: "4",
                  value: "rating4"
            },{
                text: "5",
                  value: "rating5"
            }]
      });
}).then(function () { // wait till its shown
   // show 'text' action
    loop++;
    vragenLoop();
    
}) };

var uitslag = function () {
  botui.message.add({
    delay: 1000,
    content: "Gefeliciteerd"
  }).then(function () {
    contact();
});
};

var contact = function () {
  botui.message.add({
    delay: 1000,
    content: "Hoe kan HLB Van Daal contact met u opnemen?"
  }).then(function () { // wait till its shown
      return botui.action.button({ // show 'text' action

          human: true,
          action: 
            [{
                text: "Via mail",
                value: "mail"
            }, {
                text: "Via telefoon",
                value: "telefoon"
            }]
      });
}).then(function (ser) {
  if(ser.value == 'mail') {
    mail();
  }
else if(ser.value == 'telefoon') {
    telefoon();
  }
});
};

var mail = function () {
  botui.action.text({
  action: {
    sub_type: 'email',
    placeholder: 'Enter your text here'
  }
}).then(function () {
    eind();
});
};

var telefoon = function () {
  botui.action.text({
    action: {
        sub_type: 'tel',
        placeholder: 'Vul uw nummer hier in'
      }
}).then(function () {
    eind();
});
};

var eind = function () {
  return botui.message.add({ // show a message
    
    delay: 500,
    content: 'HLB Van Daal zal zo snel mogelijk contact met u opnemen'
  })
};

/*var telefoon = function () {
  botui.action.text({
    action: {
        sub_type: 'datetime-local',
        placeholder: 'Vul uw nummer hier in'
      }
}).then(function () {
    eind();
});
};*/




/* custom ratings buttons
.then(function() {
            botui.action.button({
              delay: 1000,
              action: [
                { // show only one button
                  cssClass: 'botui-actions-ratings-button',
                  text: '1',
                  value: '1'
                },
                { // show only one button
                  cssClass: 'botui-actions-ratings-button',
                  text: '2',
                  value: '2'
                },
                { // show only one button
                  cssClass: 'botui-actions-ratings-button',
                  text: '3',
                  value: '3'
                },
                { // show only one button
                  cssClass: 'botui-actions-ratings-button',
                  text: '4',
                  value: '4'
                },
                { // show only one button
                  cssClass: 'botui-actions-ratings-button',
                  text: '5',
                  value: '5'
                }
              ]
            })
            .then(function (res) { // will be called when a button is clicked.
              console.log(res.value); // will print "one" from 'value'
            });
          });
*/
