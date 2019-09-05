var fs = require('fs');
var WordPOS = require('wordpos'),
wordpos = new WordPOS({stopwords: ['will', 'have', 'be']});
var file = 'obama.txt';
let nouns;
let verbs;
const nextFunc = () => {
	var wordsArray = nouns;
	mainFunc(wordsArray);
}

const mainFunc = (wordsArray) => {
	var wordsMap = createWordMap(wordsArray);
	var finalWordsArray = sortByCount(wordsMap);
	
	console.log('var myWords =', finalWordsArray.slice(0, 20), ';');
}

fs.readFile(file, 'utf8', function (err, data) {
	if (err) throw err;
	
	wordpos.getVerbs(splitByWords(data), function(result){
     nouns = result;
    nextFunc()
});	
});

function splitByWords (text) {
  // split string by spaces (including spaces, tabs, and newlines)
  text = text.toLowerCase();
  var wordsArray = text.split(/\s+/);
  return wordsArray;
}

function createWordMap (wordsArray) {

  // create map for word counts
  var wordsMap = {};
  /*
    wordsMap = {
      'Oh': 2,
      'Feelin': 1,
      ...
    }
  */
  wordsArray.forEach(function (key) {
    if (wordsMap.hasOwnProperty(key)) {
      wordsMap[key]++;
    } else {
      wordsMap[key] = 1;
    }
  });

  return wordsMap;

}

function sortByCount (wordsMap) {

  // sort by count in descending order
  var finalWordsArray = [];
  finalWordsArray = Object.keys(wordsMap).map(function(key) {
    return {
      word: key,
      size: wordsMap[key]
    };
  });

  finalWordsArray.sort(function(a, b) {
    return b.size - a.size;
  });

  return finalWordsArray;

}