/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');

const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetNewFactIntent');
  },
  handle(handlerInput) {
    const factArr = data;
    const factIndex = Math.floor(Math.random() * factArr.length);
    const randomFact = factArr[factIndex];
    const speechOutput = GET_FACT_MESSAGE + randomFact;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, randomFact)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

const SKILL_NAME = 'Civil Services Assistant';
const GET_FACT_MESSAGE = 'Here\'s your training question: ';
const HELP_MESSAGE = 'You can say tell me a training question, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const data = [
  'A chain or set of islands grouped together is called Archipelago.',
  'Island is the geographical term related with the piece of sub-continental land that is surrounded by water.',
  'The name given to the border which separates Pakistan and Afghanistan is	Durand line.',
  'Wular Lake is located in Jammu and Kashmir, India.',
  'The first Prime minister of Bangladesh was Mujibur Rehman.',
  'The country which ranks second in terms of land area is Canada.',
  'The capital city that stands on the river Danube is Belgrade.',
  'The city which is the biggest centre for manufacture of automobiles in the world is Detroit, USA.',
  'Mount Everest was named after Sir George Everest.',
  'The volcano Vesuvius is located in	Italy.',
  'The largest bell in the world is the	Tsar Kolkol at Kremlin, Moscow.',
  'The Red Cross was founded by	Jean Henri Durant.',
  'Niagara Falls was discovered by Louis Hennepin.',
  'The religion of early Vedic Aryans was primarily of worship of nature and Yajnas.'
   'Mt. Thor on Baffin Island, Canada, has Earth’s greatest sheer vertical drop (4,101 feet).'
  'The Dead Sea is currently 429 meters below sea level and sinking about 1 meter a year.'
  'Mount Everest, the world’s tallest mountain, can fit inside the Marianas Trench, the deepest part of the ocean.',
];

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetNewFactHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
