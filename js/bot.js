const testQuestions = [
  {
    question: "Ik heb voldoende ontspanning (sport, muziek, wandelen)",
    thema: "Persoonlijk"
  },
  {
    question:
      "In mijn werk als ondernemer kan ik me uitstekend persoonlijk ontwikkelen",
    thema: "Persoonlijk"
  },
  {
    question: "We hebben een actuele begroting voor dit jaar",
    thema: "Informatie"
  },
  {
    question:
      "We weten exact de kostprijs per productgroep, en daarmee het rendement per productgroep",
    thema: "Informatie"
  },
  {
    question: "We zouden iedere medewerker opnieuw aannemen",
    thema: "Mensen"
  },
  {
    question:
      "Onze medewerkers zien wekelijks de voor hen cruciale getallen in een dashboard",
    thema: "Mensen"
  },
  {
    question: "We hebben een stip op de horizon vastgesteld",
    thema: "Strategie"
  },
  {
    question:
      "Wij kennen de risico’s waar het bedrijf tegenaan kan lopen en weten hoe wij hier mee om moeten gaan.",
    thema: "Strategie"
  }
];

let results = [
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
      rateQuestion(0);
    });
};

const rateQuestion = index => {
  botui.message
    .add({
      delay: 500,
      content: testQuestions[index].question
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
          addToResults(index, res.value);

          if (testQuestions[index + 1]) {
            rateQuestion(index + 1);
          } else {
            uitslag();
          }
        });
    });
};

const addToResults = (index, value) => {
  for (const result of results) {
    if (result.thema === testQuestions[index].thema) {
      result.score = result.score + value;
    }
  }
};

const uitslag = function() {
  botui.message
    .add({
      delay: 1000,
      content: "Bedankt. We zien dat je nog kan verbeteren op ...."
    })
    .then(function() {
      console.log(results);
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
