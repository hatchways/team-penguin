/*
  use this store as kind of memoization; when the user initiates a conversation, if the languages data is not stored yet, add it here bc want to avoid having to make a query on each message in the conversation and the user-language data is not getting passed in the contacts list currently
*/
//indexed by conversation_id
let languages = {
  '5ede9f01091edb1b37240a33': ['english', 'spanish'],
  '5edeb8a0b4ff34257970e4d3':  ['english', 'spanish']
  //{
    //'test90@t.com': 'english',
    //'test180@t.com': 'spanish'
  //}
}

//counting mandarin as simplified chinese
const language_codes = {
  'english': 'en',
  'spanish': 'es',
  'mandarin': 'zh-CN',
  'french': 'fr',
  'hindi': 'hi'
}

const code_to_language = {
  'en': 'english',
  'es': 'spanish',
  'zh-CN': 'mandarin',
  'fr': 'french',
  'hi': 'hindi'
}

const getFriendLanguageCodes = (chatLanguages, originalLanguage) => {
  let translationLanguages = chatLanguages.filter(lang => lang !== originalLanguage);
  return translationLanguages.map(lang => language_codes[lang]);
}

module.exports = {languages, language_codes, code_to_language, getFriendLanguageCodes};