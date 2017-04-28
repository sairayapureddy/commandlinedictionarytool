# commandlinedictionarytool
This is a command line dictionary created using node js using Wordnik API

To initialise using it run "npm install" in the folder you download these files.

Once packages are installed you can run following commands.

1) node dict def <word>

This is for getting definitions of given word.

2)node dict syn <word>

This is for getting synonyms of given word

3)node dict ant <word>

This is for getting antonyms of given word

4)node dict ex <word>

This is for getting examples of given word

5)node dict <word> or node dict dict <word>

This is for getting all above details(full dict details) for given word

6)node dict

This is for getting full dict details for word of the day

7)node dict play

This is to test your vocabulary. You will be given a definition of a word, you need to guess exact word or its synonyms. If you are correct you are a winner or else you will have three oprtions -1 Try Again(You can keep guessing as many times you want), -2 Hint(Actual word will be printed in jumbled order), -3 Quit (Correct answer and its full dict details will be shown and game will be quitted)


config.js

You can configure own api_key here.
