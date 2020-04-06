//#4 Initialization
const categories = [
  "Cash",
  "Persoonlijk",
  "Eigendom",
  "Risico",
  "Informatie",
  "Mensen",
  "Strategie",
  "Klanten"
];

const botui = new BotUI("hello-world");

botui.message
  .add({
    content: "Hallo, ik ben Dirk de Chatbot van HLB Van Daal!"
  })
  .then(function() {
    botui.message
      .add({
        delay: 500,
        content:
          "Heeft u hulp nodig bij uw bedrijf? Zo ja, vul de vragenlijst in om contact op te nemen met HLB Van Daal en hun te in te briefen over uw probleem."
      })
      .then(function() {
        botui.action
          .button({
            human: true,
            action: [
              {
                text: "Ja",
                value: () => test()
              },
              {
                text: "Nee",
                value: () => contact()
              }
            ]
          })
          .then(function(res) {
            res.value();
          });
      });
  });

const test = function() {
  botui.message
    .add({
      delay: 500,
      content:
        "Welke van deze onderwerpen zorgen binnen uw bedrijf voor problemen?"
    })
    .then(function() {
      rateCategory(0);
    });
};

const rateCategory = index => {
  botui.message
    .add({
      delay: 500,
      content: "Hoe zou u uw bedrijf beoordelen op: " + categories[index]
    })
    .then(function() {
      botui.action
        .button({
          human: true,
          action: [
            {
              text: "1",
              value: "rating1"
            },
            {
              text: "2",
              value: "rating2"
            },
            {
              text: "3",
              value: "rating3"
            },
            {
              text: "4",
              value: "rating4"
            },
            {
              text: "5",
              value: "rating5"
            }
          ]
        })
        .then(function() {
          if (categories[index + 1]) {
            rateCategory(index + 1);
          } else {
            uitslag();
          }
        });
    });
};

const uitslag = function() {
  botui.message
    .add({
      delay: 1000,
      content: "Gefeliciteerd"
    })
    .then(function() {
      contact();
    });
};

const contact = function() {
  botui.message
    .add({
      delay: 1000,
      content: "Hoe kan HLB Van Daal contact met u opnemen?"
    })
    .then(function() {
      botui.action
        .button({
          human: true,
          action: [
            {
              text: "Via mail",
              value: () => mail()
            },
            {
              text: "Via telefoon",
              value: () => telefoon()
            }
          ]
        })
        .then(function(res) {
          res.value();
        });
    });
};

const mail = function() {
  botui.action
    .text({
      action: {
        sub_type: "email",
        placeholder: "Enter your text here"
      }
    })
    .then(function() {
      eind();
    });
};

const telefoon = function() {
  botui.action
    .text({
      action: {
        sub_type: "tel",
        placeholder: "Vul uw nummer hier in"
      }
    })
    .then(function() {
      eind();
    });
};

const eind = function() {
  botui.message.add({
    delay: 500,
    content: "HLB Van Daal zal zo snel mogelijk contact met u opnemen"
  });
};
