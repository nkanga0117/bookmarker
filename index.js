// listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e){
	console.log('it works')
	//get form values:
	let siteName = document.getElementById('siteName').value;
	let siteUrl = document.getElementById('siteUrl').value;

	if(!validateForm(siteName, siteUrl)){
		return false;
	}

	let bookmark = {
		name: siteName,
		url: siteUrl
	}
	
	/*
	// local storage test
	localStorage.setItem('test', 'Hello');
	console.log(localStorage.setItem('test'));
	localStorage.removeItem('test')
	*/

    // test if bookmarks is null
	if(localStorage.getItem('bookmarks') === null){

		// Init array
		let bookmarks = [];
		// Add to array
		bookmarks.push(bookmark);
		// Set to local storage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}else{
		//Get bookmarks from local storage
		let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		//Add bookmark to array
		bookmarks.push(bookmark);
		// Re-set back to local storage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

		// Clear form
		document.getElementById('myForm').reset();
		
	// Refetch bookmarks
	fetchBookmarks();

	// Prevent form from submiting.
	e.preventDefault();
}

// Delete bookmarks
function deleteBookmark(url){
	// Get bookmarks from local storage
	let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	// Loop through bookmarks
	for(let i = 0;i < bookmarks.length; i++){
		if(bookmarks[i].url == url){
			// Remove from array
			bookmarks.splice(i, 1);
		}
	}
	// Re-set back to local storage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

	// Refetch bookmarks
	fetchBookmarks();

}

// Fetch bookmarks

function fetchBookmarks(){

	// Get bookmarks from local storage
	let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	// Get output id
	let bookmarksResults = document.getElementById('bookmarksResults');

	// Build output
	bookmarksResults.innerHTML = '';
	for(let i = 0; i < bookmarks.length; i++){
		let name = bookmarks[i].name;
		let url = bookmarks[i].url;

		bookmarksResults.innerHTML += '<div class="well">'+
									  '<h3>'+name+
									  ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>' +
									  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'
									  '</h3>'+
									  '</div>'
	}
}

// Validate form

function validateForm(siteName, siteUrl){
	if(!siteName || !siteUrl){
		alert('Please fill in the form');
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteUrl.match(regex)){
		alert('Please use a valid url');
		return false;
	}
	return true;
}