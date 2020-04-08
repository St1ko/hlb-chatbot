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

let CCLink = "https://www.hlb.nl/van-daal/pagina/challenge-control";

let results = [
  { thema: "Informatie", score: 0, indepth: "Informatie uitleg" },
  { thema: "Strategie", score: 0, indepth: "Strategie uitleg" },
  { thema: "Mensen", score: 0, indepth: "Mensen uitleg" },
  { thema: "Persoonlijk", score: 0, indepth: "Persoonlijk uitleg" }
];

const getLowestScore = function() {
  return results.reduce((prev, curr) =>
    prev.score < curr.score ? prev : curr
  );
};

const botui = new BotUI("hello-world");

botui.message
  .add({
    content:
      "Hallo, ik ben Dirk de virtuele assistent van HLB Van Daal! Wat leuk om je te zien."
  })
  .then(function() {
    botui.message
      .add({
        delay: 1000,
        content:
          "Wij hebben binnen HLB Van Daal een Challenge & Control tool ontwikkeld. Deze tool focust op het optimaliseren van uw bedrijf. Heeft u interesse om te zien hoe wij uw bedrijf kunnen helpen te optimaliseren door middel van het afnemen van deze tool?"
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
      delay: 1000,
      content:
        "Ik ga je nu een paar vragen stellen om erachter te komen waar wij je mee kunnen helpen. Er komen in totaal 8 uitspraken.Je kan antwoord geven door op de knoppen te drukken van 1 tot 5, waarbij je met 5 eens bent met de uitspraak en 1 er niet eens mee bent. Succes!"
    })
    .then(function() {
      botui.action
        .button({
          human: true,
          action: [
            {
              text: "Doe de test",
              value: () => rateQuestion(0)
            },
            {
              text: "Meer uitleg",
              value: () => moreInfo()
            }
          ]
        })
        .then(function(res) {
          res.value();
        });
    });
};

const moreInfo = function() {
  botui.message
    .add({
      delay: 1000,
      content:
        "Tijdens deze test wordt er gefocust op het testen van 4 thema's binnen uw bedrijf: Persoonlijk, Mensen, Strategie en Informatie. Op basis van het resultaat krijgt u een korte uitleg hoe wij u daarmee kunnen helpen. Heeft u nog meer vragen? Dan kunt u <a href=" +
        CCLink +
        ">hier</a> klikken om te worden doorgeleid naar de website. U kunt ook contact opnemen met een van onze medewerkers via het telefoonnummer: +315863722"
    })
    .then(function() {
      botui.action
        .button({
          human: true,
          action: [
            {
              text: "Doe de test",
              value: () => rateQuestion(0)
            }
          ]
        })
        .then(function(res) {
          res.value();
        });
    });
};

const rateQuestion = index => {
  botui.message
    .add({
      delay: 1000,
      content: testQuestions[index].question
    })
    .then(function() {
      botui.action
        .button({
          cssClass: "botui-actions-ratings",
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
      content:
        "Bedankt. We zien dat je nog kan verbeteren op " +
        getLowestScore().thema +
        " " +
        getLowestScore().indepth
    })
    .then(function() {
      contact();
    });
};

const contact = function() {
  botui.message
    .add({
      delay: 1000,
      content:
        "Om een beter idee te krijgen van uw resultaat en hoe wij u daarmee kunnen helpen, kunt u hieronder uw mailadres of telefoonnummer achterlaten. Een medewerker zal dan zo snel mogelijk contact met u opnemen.<br>Als u liever direct contact opneemt met een van onze medewerkers, kunt u ons bereiken via ons telefoonnummer: <a href=" +
        ">+318583758</a>"
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
            },
            {
              text: "Zelf contact opnemen",
              value: () => zelfContact()
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
        placeholder: "Vul hier uw mailadress in"
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
    delay: 1000,
    content: "HLB Van Daal zal zo snel mogelijk contact met u opnemen"
  });
};

const zelfContact = function() {
  botui.message.add({
    delay: 1000,
    content:
      "U kunt contact opnemen met een van onze medewerkers via het telefoonnummer: +31583728 of ons mailadres: HLB@Vandaal.nl"
  });
};
