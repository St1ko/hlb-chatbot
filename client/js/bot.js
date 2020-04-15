const testQuestions = [
  {
    question: 'Ik heb voldoende ontspanning (sport, muziek, wandelen)',
    thema: 'Persoonlijk'
  },
  {
    question:
      'In mijn werk als ondernemer kan ik me uitstekend persoonlijk ontwikkelen',
    thema: 'Persoonlijk'
  },
  {
    question: 'We hebben een actuele begroting voor dit jaar',
    thema: 'Informatie'
  },
  {
    question:
      'We weten exact de kostprijs per productgroep, en daarmee het rendement per productgroep',
    thema: 'Informatie'
  },
  {
    question: 'We zouden iedere medewerker opnieuw aannemen',
    thema: 'Mensen'
  },
  {
    question:
      'Onze medewerkers zien wekelijks de voor hen cruciale getallen in een dashboard',
    thema: 'Mensen'
  },
  {
    question: 'We hebben een plan voor de toekomst',
    thema: 'Strategie'
  },
  {
    question:
      'Wij kennen de risico’s waar het bedrijf tegenaan kan lopen en weten hoe wij hier mee om moeten gaan.',
    thema: 'Strategie'
  }
];

const CCLink = 'https://www.hlb.nl/van-daal/pagina/challenge-control';

let results = [
  {
    thema: 'Informatie',
    score: 0,
    indepth:
      'Het opstellen van de financiële documenten kost veel tijd en expertise om op te zetten.<br>Bij HLB Van Daal hebben wij meerdere specialisten die u daarmee kunnen helpen.'
  },
  {
    thema: 'Strategie',
    score: 0,
    indepth:
      'Het strategisch vastzetten van een doel voor uw bedrijf is het belangrijkste onderdeel. Uit cijfers blijken veel bedrijf failliet te gaan omdat zij geen duidelijke stip hebben op de horizon. <br>Bij HLB Van Daal hebben wij meerdere specialisten die u daarmee kunnen helpen.'
  },
  {
    thema: 'Mensen',
    score: 0,
    indepth:
      'Het tevreden stellen van uw medewerkers is een nauwkeurig vakgebied en iedere medewerker dient de juiste kennis bij zich te dragen.<br>Bij HLB Van Daal hebben wij meerdere specialisten die u daarmee kunnen helpen.'
  },
  {
    thema: 'Persoonlijk',
    score: 0,
    indepth:
      'Als ondernemer wilt u een goede balans vinden tussen werk en privé.<br>Bij HLB Van Daal hebben wij meerdere specialisten die u daarmee kunnen helpen.'
  }
];

const getLowestScore = function() {
  return results.reduce((prev, curr) =>
    prev.score < curr.score ? prev : curr
  );
};

const addToResults = (index, value) => {
  for (const result of results) {
    if (result.thema === testQuestions[index].thema) {
      result.score = result.score + value;
    }
  }
};

const botui = new BotUI('hlbot');

botui.message
  .add({
    content:
      'Hallo, ik ben Dirk, de virtuele assistent van HLB Van Daal. Wat leuk om u te zien.'
  })
  .then(function() {
    botui.message
      .add({
        delay: 1200,
        content:
          'Wij hebben binnen HLB Van Daal een Challenge & Control tool ontwikkeld. Deze tool focust op het optimaliseren van de operationele en financiële processen van uw bedrijf. Zodat het rendement verbetert en u uw doelen kunt realiseren. Heeft u interesse in het afnemen van deze korte test? Na het beantwoorden van 8 vragen kunnen wij u een indicatie geven wat er verbeterd kan worden in uw bedrijf. Heeft u liever gelijk contact met ons? Klik dan op Nee.'
      })
      .then(function() {
        botui.action
          .button({
            human: true,
            action: [
              {
                text: 'Ja',
                value: () => test()
              },
              {
                text: 'Nee',
                value: () => immediateContact()
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
      delay: 1200,
      content:
        'Ik ga u nu een paar vragen stellen om erachter te komen waar wij u mee kunnen helpen. Er komen in totaal 8 uitspraken over de 4 volgende thema’s: Persoonlijk, Strategie, Informatie en Mensen. U kunt antwoord geven door op de knoppen te drukken van 1 tot 5, waarbij u bij 5 eens bent met de uitspraak en 1 niet eens mee bent. Wilt u meer uitleg? Klik dan op "Meer uitleg". Succes!'
    })
    .then(function() {
      botui.action
        .button({
          human: true,
          action: [
            {
              text: 'Doe de test',
              value: () => {
                progressbar.ProgressInit();
                progressbar.ProgressVisible(true);
                rateQuestion(0);
              }
            },
            {
              text: 'Meer uitleg',
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
      delay: 1200,
      content:
        "Tijdens deze test wordt er gefocust op het testen van 4 thema's binnen uw bedrijf: Persoonlijk, Mensen, Strategie en Informatie. Op basis van het resultaat krijgt u een korte uitleg hoe wij u daarmee kunnen helpen. Heeft u nog meer vragen? Dan kunt u <a href=" +
        CCLink +
        '>hier</a> klikken om te worden doorgeleid naar de website. U kunt ook contact opnemen met een van onze medewerkers via het telefoonnummer: +315863722'
    })
    .then(function() {
      botui.action
        .button({
          human: true,
          action: [
            {
              text: 'Doe de test',
              value: () => {
                progressbar.ProgressInit();
                progressbar.ProgressVisible(true);
                rateQuestion(0);
              }
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
          cssClass: 'botui-actions-ratings',
          human: true,
          action: [
            {
              text: '1',
              value: 1
            },
            {
              text: '2',
              value: 2
            },
            {
              text: '3',
              value: 3
            },
            {
              text: '4',
              value: 4
            },
            {
              text: '5',
              value: 5
            }
          ]
        })
        .then(function(res) {
          addToResults(index, res.value);
          progressbar.UpdateProgress(index);

          if (testQuestions[index + 1]) {
            rateQuestion(index + 1);
          } else {
            progressbar.ProgressVisible(false);
            uitslag();
          }
        });
    });
};

const uitslag = function() {
  botui.message
    .add({
      delay: 1200,
      content:
        'Bedankt. We zien dat u nog kan verbeteren op het gebied van ' +
        getLowestScore().thema +
        '. ' +
        getLowestScore().indepth
    })
    .then(function() {
      contact();
    });
};

const contact = function() {
  botui.message
    .add({
      delay: 6000,
      content:
        'Om een beter idee te krijgen van uw resultaat en hoe wij u daarmee kunnen helpen, kunt u hieronder uw mailadres of telefoonnummer achterlaten. Een medewerker zal dan zo snel mogelijk contact met u opnemen.<br> U kunt ook zelf contact opnemen met een van onze medewerkers.'
    })
    .then(function() {
      botui.action
        .button({
          human: true,
          action: [
            {
              text: 'Mail mij',
              value: () => mail()
            },
            {
              text: 'Bel mij',
              value: () => telefoon()
            },
            {
              text: 'Ik wil zelf contact opnemen',
              value: () => zelfContact()
            }
          ]
        })
        .then(function(res) {
          res.value();
        });
    });
};

const immediateContact = function() {
  botui.message
    .add({
      delay: 1200,
      content:
        'U kunt hieronder uw mailadres of telefoonnummer achterlaten. Een medewerker zal dan zo snel mogelijk contact met u opnemen.<br> U kunt ook zelf contact opnemen met een van onze medewerkers.'
    })
    .then(function() {
      botui.action
        .button({
          human: true,
          action: [
            {
              text: 'Mail mij',
              value: () => mail()
            },
            {
              text: 'Bel mij',
              value: () => telefoon()
            },
            {
              text: 'Ik wil zelf contact opnemen',
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
        sub_type: 'email',
        placeholder: 'Vul hier uw e-mailadres in.'
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
        sub_type: 'tel',
        placeholder: 'Vul uw telefoonnummer hier in.'
      }
    })
    .then(function() {
      eind();
    });
};

const eind = function() {
  botui.message.add({
    delay: 1200,
    content:
      'Een medewerker van HLB Van Daal zal zo snel mogelijk contact met u opnemen. Bedankt en nog een fijne dag verder!'
  });
};

const zelfContact = function() {
  botui.message.add({
    delay: 1200,
    content:
      'U kunt contact opnemen met een van onze medewerkers via het telefoonnummer: +31583728 of ons mailadres: HLB@Vandaal.nl'
  });
};
