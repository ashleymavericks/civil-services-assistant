/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');
const APP_NAME = "Civil Services Assistant";
const messages = {
  NOTIFY_MISSING_PERMISSIONS: 'Please enable profile permissions in the Amazon Alexa app. It is required to access your Name and Email info',
  ERROR: 'Uh Oh. Looks like something went wrong.'
};

const FULL_NAME_PERMISSION = "alexa::profile:name:read";
const EMAIL_PERMISSION = "alexa::profile:email:read";
const MOBILE_PERMISSION = "alexa::profile:mobile_number:read";

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest';
  },
  async handle(handlerInput) {
    const { serviceClientFactory, responseBuilder } = handlerInput;
    try {
      const upsServiceClient = serviceClientFactory.getUpsServiceClient();
      const profileName = await upsServiceClient.getProfileName();
      const speechResponse = `Hello, ${profileName} , Welcome to Civil Services Assistant. How are you doing today?`;
      const speechText= "How are you doing today"
      return responseBuilder
                      .speak(speechResponse)
                      .reprompt(speechText)
                      .withSimpleCard(APP_NAME, speechResponse)
                      .getResponse();
    } catch (error) {
      console.log(JSON.stringify(error));
      if (error.statusCode === 403) {
        return responseBuilder
        .speak(messages.NOTIFY_MISSING_PERMISSIONS)
        .withAskForPermissionsConsentCard([FULL_NAME_PERMISSION])
        .getResponse();
      }
      console.log(JSON.stringify(error));
      
      const response = responseBuilder.speak(messages.ERROR).getResponse();
      return response;
    }
  },
}

const GreetMeIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'GreetMeIntent';
  },
  handle(handlerInput) {
    const slots = handlerInput.requestEnvelope.request.intent.slots;
    const speechText = `Glad to hear about it. Please tell me about your topic of interest?`

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt ('Please tell me about your topic of interest.')
      .withSimpleCard('APP_NAME', speechText)
      .getResponse();
  },
};

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
      .speak('Sorry, an error has been occurred.')
      .reprompt('Sorry, an error has been occurred.')
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
  'The religion of early Vedic Aryans was primarily of worship of nature and Yajnas.',
   'Mt. Thor on Baffin Island, Canada, has Earth’s greatest sheer vertical drop (4,101 feet).',
  'The Dead Sea is currently 429 meters below sea level and sinking about 1 meter a year.',
  'Mount Everest, the world’s tallest mountain, can fit inside the Marianas Trench, the deepest part of the ocean.',
   'Continents shift at about the same rate as your fingernails grow.',
  'It is the seventh-largest country in the world, with a total area of 3,287,263 square kilometres (1,269,219 sq mi).',
  'Brahmaputra River, flowing over an area of 2, 900 km is the countrys longest river.',
  'Alaska is both the westernmost and easternmost state in America.',
  'Antarctica is the largest desert in the world.'
];

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    GreetMeIntentHandler,
    GetNewFactHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
