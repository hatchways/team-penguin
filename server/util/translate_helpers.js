const {Translate} = require('@google-cloud/translate').v2;
const GOOGLE_APPLICATION_CREDENTIALS = require('../world-messenger-a751eb6a9d4f.json');

const {project_id} = GOOGLE_APPLICATION_CREDENTIALS;
const keyFilename = '../server/world-messenger-a751eb6a9d4f.json';

const translate = new Translate({projectId: project_id, keyFilename});

async function getTranslation(text, target) {
  return await translate.translate(text, target);
}

module.exports = {getTranslation};