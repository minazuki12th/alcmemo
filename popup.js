$(function() {
  	drawList(alcStorage.getWordList());
  	
	function drawList(list){
		$('#list').empty();
		
		var i;
		for(i = list.length - 1; i >= 0; i--){
			listitem = CreateListItem(list[i], i);
			$('#list').append(listitem)
		}
	}
	
	function CreateListItem(item, itemIndex){
		var listitem = $('<li>');
		var linkelm = $('<a>');
		linkelm.attr('href', item.word);
		linkelm.text(item.word + " : " + item.count);
		linkelm.click(function(){
			chrome.tabs.create(
				{url: "http://eow.alc.co.jp/search?q=" + item.word},
			    function(tab) {
			        window.close(); 
			    }
			);
		});
		
		var delelm = $('<a>');
		delelm.attr('href', "#");
		delelm.text("x");
		delelm.click(function(){
			if(confirm("削除しますか？")){
				alcStorage.removeWord(itemIndex);
				drawList(alcStorage.getWordList());
			}
		});
		
		listitem.append(linkelm);
		listitem.append(" [");
		listitem.append(delelm);
		listitem.append("]");
		
		return listitem;
	}
});


