var regAlcUrl = new RegExp("^http://eow\.alc\.co\.jp/search\?(.+)$", "i");

var setSearchWord = function(url){
    var matchUrl = regAlcUrl.exec(url);
    if (matchUrl != null) {
        console.log(matchUrl[0]);
        console.log(matchUrl[1]);
        var params = matchUrl[1].substring(1).split('&');
        for(var i = 0; i < params.length; i++){
            var param = params[i].split('=');
            if(param.length > 1 && param[0] === 'q'){
                alcStorage.setWord(decodeURI(param[1]));
            }
        }
    }
};

chrome.tabs.onUpdated.addListener(function(tabId, changedInfo, tab) {
    if(changedInfo.status === "complete"){
        setSearchWord(tab.url)
    }
});
