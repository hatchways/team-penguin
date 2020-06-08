const {Translate} = require('@google-cloud/translate').v2;
const GOOGLE_APPLICATION_CREDENTIALS = require('../world-messenger-a751eb6a9d4f.json');

const {project_id} = GOOGLE_APPLICATION_CREDENTIALS;
const keyFilename = '../world-messenger-a751eb6a9d4f.json';

const translate = new Translate({projectId: project_id, keyFilename});

async function getTranslation({language_code, message}) {
  const [translation] = await translate.translate(message, language_code);
  console.log(`Text: ${text}`);
  console.log(`Translation: ${translation}`);
  return translation;
}

module.exports = {getTranslation};