var words = alcStorage.getWordList();

function ListCtrl($scope){
	$scope.wordList = words;
	$scope.$on("Reload", function(){
		$scope.wordList = alcStorage.getWordList();
	});
}

function WordCtrl($scope){
	$scope.clickWord = function(){
		chrome.tabs.create(
			{url: "http://eow.alc.co.jp/search?q=" + $scope.item.word},
		    function(tab) {
		        window.close();
		    }
		);
	};

	$scope.deleteWord = function(){
		if(confirm("削除しますか？")){
			alcStorage.removeWord($scope.item.word);
			$scope.$emit("Reload");
		}
	};
}
