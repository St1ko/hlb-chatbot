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

let result = [
  { thema: "Informatie", score: 0 },
  { thema: "Strategie", score: 0 },
  { thema: "Mensen", score: 0 },
  { thema: "Persoonlijk", score: 0 }
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
      content: "Hoe zou u uw bedrijf beoordelen op: " + result[index].thema
    })
    .then(function() {
      botui.action
        .button({
          human: true,
          action: [
            {
              text: "1",
              value: 1
            },
            {
              text: "2",
              value: 2
            },
            {
              text: "3",
              value: 3
            },
            {
              text: "4",
              value: 4
            },
            {
              text: "5",
              value: 5
            }
          ]
        })
        .then(function(res) {
          addToResult(index, res.value);

          if (result[index + 1]) {
            rateCategory(index + 1);
          } else {
            uitslag();
          }
        });
    });
};

const addToResult = (index, value) => {
  result[index].score = result[index].score + value;
};

const uitslag = function() {
  botui.message
    .add({
      delay: 1000,
      content: "Bedankt. We zien dat je nog kan verbetern op ...."
    })
    .then(function() {
      console.log(result);
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
