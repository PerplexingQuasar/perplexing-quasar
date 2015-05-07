// var data = require('data-example.json');
// 
// name
// description
// link (vimeo video url)
// created_time
// content_rating
// picture (thumbnail)
// tags
// plays


var filter = function(lib, category) {
	
	// create the new array of data
	var newData = [];
	
	// for each item in lib
	for ( var i = 0; i < lib.data.length; i++) {
		
		// create a new object that will be pushed in the newData array
		var newContent = {};
		
		// grab the name
		newContent.name = lib.data[i].name;
		
		// grab the description
		newContent.description = lib.data[i].description;
		
		// grab the link
		newContent.link = lib.data[i].link;
		
		// grab the created_time
		newContent.createdAt = lib.data[i]['created_time'];
		
		// grab the picture url (width: 295px | height: 166px)
		newContent.thumbnail = lib.data[i].pictures.sizes[2].link;
		
		// iterate over the tags in the lib
		var tagArr = lib.data[i].tags;
		var tags = [];
		for ( var j = 0; j < tagArr.length; j++ ) {
			tags.push(tagArr[j].name);
		}
		
		// assign the tags to newContent.tag
		newContent.tags = tags;
		
		// grab the number of plays
		newContent.plays = lib.data[i].stats.plays;	

		// push the newContent into newData's array
		newData.push(newContent);

	}

	// return the newData's aray
	return newData;
}

module.exports = filter;


