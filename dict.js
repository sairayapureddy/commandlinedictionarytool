var request = require('request');
var async = require('async');
var config = require('./config.js');

function repeat(){
    console.log('-1 Try Again')
    console.log('-2 hint')
    console.log('-3 quit')
    console.log('Please enter your choice: <1,2,3>')
}

function makereq(item, callback){
        if(item !== 'wod' && item!='play'){
            var options = {url : config.host + word + config.path[item][0]}
        } else {
            var options = { url: config.host.slice(0,29) + config.path[item][0]}
        }

        request(options, function(error, response, body){
            if (error){
                callback(error, null);
            }
            callback(null, JSON.parse(body)) })
}

function getdetails(items){
    var local = {}
    async.forEach(items, function(item, callback){
        makereq(item, function(err, result){
            if (err) return callback(err)
            local[item] = result
            callback()
        })
    }, function(err){
        if (err) console.log(err)
        Object.keys(local).forEach(function(type){
            data = local[type]
            abbr = config.path[type][1]
            if(data.length > 0 || Object.keys(data).length > 0){
                console.log('\n' + abbr + ' for the word ' + word + ':' + '\n')
                if(type==='def'){
                    for(var k in data){
                        console.log('\t' + (parseInt(k)+1)+')', data[k].text)
                    }
                } else if(type === 'syn' | type === 'ant'){
                    for(var l=0; l < data[0]['words'].length; l++){
                        console.log('\t' + (l+1)+')', data[0]['words'][l])
                    } 
                }  else if(type === 'ex'){
                    for(var m in data['examples']){
                        console.log(data['examples'][m]['text'])
                        console.log('\t' + (parseInt(m)+1)+')', data['examples'][m]['text'])
                    }
                }
            } else{
                    console.log('\n Wordnik API is unable to get you ' + abbr + ' for the ' + word +'!!! \n')
                }
        })
    })
}


var dict = ['def','syn','ant','ex']
arglen = process.argv.length



if(arglen === 4){
    if(dict.indexOf(process.argv[2]) != -1){
        type = [process.argv[2]]
        word = process.argv[3]
        getdetails(type)       
    } else {
        word = process.argv[3]
        getdetails(dict)
    }
} else if(arglen == 3){
    if(process.argv[2] != 'play'){
        if(process.argv[2] == 'dict'){
            word = process.argv[3]
            getdetails(dict)  
        } else {
            word = process.argv[2]
            getdetails(dict)           
        }
    } else{
            console.log('\n\nThe play is about to begin!!! Take a deep breadth and be ready...!!!\n\n')
            setTimeout(function(){
                console.log('Are you Ready?? Here you go.The game is about to begin...!!!\n')
            }, 300);
            makereq('play', function(err, randomword){
                if(err) throw err
                word = randomword['word']
                definitions = []
                synonyms = []
                randomword['definitions'].forEach(function(def){
                    definitions.push(def['text'])
                })
                makereq('syn', function(err, relations){
                    if(relations.length>0) synonyms = relations[0]['words']
                    console.log('Definition is: ' + definitions[0] + '\n')
                    console.log('Enter the word you guessed: ')
                    process.stdin.resume();
                    process.stdin.setEncoding('utf8');
                    process.stdin.on('data', function (text) {
                        inp = text.toString().trim()
                        if (text === '3\r\n') {
                            console.log('\n Correct Answer is: ' , word)
                            getdetails(dict)
                            setTimeout(function(){
                                process.exit()
                            }, 5000)
                        } else if(text === '2\r\n'){
                            console.log('\nHint is:', word.split('').sort(function(){return 0.5-Math.random()}).join(''))
                        } else if(text === '1\r\n'){
                            console.log('Enter the word you guessed: ')
                        } else{
                            if(inp === word){
                                console.log('\n Wow...You are a winner of this game \n')
                                process.exit()
                            } else{
                                if(synonyms.length>0){
                                    if(synonyms.indexOf(inp)!=-1){
                                    console.log('Wow...You are a winner.........!!!!!!!!')
                                    process.exit()
                                    } else{
                                        console.log('\n Your guess is wrong...!!! \n')
                                        repeat()
                                    }
                                } else{
                                    console.log('\n Your guess is wrong...!!! \n')
                                    repeat()
                                }

                            }
                        }
                    });

                })
            })

    }
} else if(arglen == 2){
    makereq('wod', function(err, wordofday){
        if(err) throw err
        word = wordofday['word']
        
        console.log('The word of the day is: ' + word)
        getdetails(dict)
    })
}