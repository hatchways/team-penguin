const {Translate} = require('@google-cloud/translate').v2;
const GOOGLE_APPLICATION_CREDENTIALS = require('../world-messenger-a751eb6a9d4f.json');

const {project_id} = GOOGLE_APPLICATION_CREDENTIALS;
const keyFilename = '../world-messenger-a751eb6a9d4f.json';

// // Instantiates a client
const translate = new Translate({projectId: project_id, keyFilename});

async function quickStart() {
  // The text to translate
  const text = 'Hello, world!';

  // The target language
  const target = 'ru';

  // Translates some text into Russian
  const [translation] = await translate.translate(text, target);
  console.log(`Text: ${text}`);
  console.log(`Translation: ${translation}`);
}

quickStart();