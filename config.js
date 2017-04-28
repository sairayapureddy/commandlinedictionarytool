var api_key = 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';


function randomDate(a){
    var d = new Date()
    var s = d.toISOString()
    if(a===1){
        return s.slice(0, s.indexOf('T'))
    } else{
        d.setDate(d.getDate() - parseInt(Date.now().toString().slice(-3)))
        s = d.toISOString()
        return s.slice(0, s.indexOf('T'))
    }

}

module.exports = {
    host: 'http://api.wordnik.com:80/v4/word.json/',
    path: {
        def: ['/definitions?limit=10&api_key=' + api_key, 'definitions'],
        syn: ['/relatedWords?relationshipTypes=synonym&api_key=' + api_key, 'synonyms'],
        ant: ['/relatedWords?relationshipTypes=antonym&api_key=' + api_key, 'antonyms'],
        ex: ['/examples?api_key=' + api_key, 'examples'],
        wod: ['words.json/wordOfTheDay?date=' +  randomDate(1) + '&api_key=' + api_key],
        //row: ['words.json/randomWord?includePartOfSpeech=adjective,noun&api_key=' + api_key],
        play: ['words.json/wordOfTheDay?date=' +  randomDate(2) + '&api_key=' + api_key],
        rel: ['/relatedWords?api_key=' + api_key]
    }
}