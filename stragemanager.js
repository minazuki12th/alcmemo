var storageManager = (function () {

    var my = {};

    my.get = function (key) {
        return localStorage.getItem(key);
    }
    my.put = function (key, value) {
        return localStorage.setItem(key, value);
    }
    my.delete = function (key) {
        return localStorage.removeItem(key);
    }
    
    return my;

}());

var alcStorage = (function (storage) {
    var my = {};
    
    var key = "alcmemolist";
    
    if( !storage.get(key) ){
    	storage.put(key, JSON.stringify([]));
    }
    
    my.getWordList = function(){
    	return JSON.parse(storage.get(key));
    };
    
    my.setWord = function(word){
    	var wordList = JSON.parse(storage.get(key));
        var hit = false;
        for(var i = 0; i < wordList.length; i++){
            if(wordList[i].word === word){
                wordList[i].count += 1;
                hit = true;
                break;
            }
        }
        if(hit === false){
        	wordList.push({word: word, count: 1});
        }
    	storage.put(key, JSON.stringify(wordList));
    };
    
    my.removeWord = function(index){
    	var wordList = JSON.parse(storage.get(key));
    	wordList.splice(index, 1);
    	storage.put(key, JSON.stringify(wordList));
    };

    return my;
}(storageManager));
