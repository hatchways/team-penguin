//indexed by conversation_id
let languages = {
  '5ede5f05e00aa60562b1d9c5': {
    'test90@t.com': 'english',
    'test170@t.com': 'spanish'
  }
}

//counting mandarin as simplified chinese
const language_codes = {
  'english': 'en',
  'spanish': 'sp',
  'mandarin': 'zh-CN',
  'french': 'fr',
  'hindi': 'hi'
}

module.exports = {languages, language_codes};