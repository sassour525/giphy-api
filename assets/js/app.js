var topics;
var choice;
var userEntry;
var gifButton;
var key;
var queryURL;
var gifDiv;
var gifImage;

// have an array with words that will be buttons used to search giphy
// have input box and submit button to grab user input to create a button and submit it
// pull 10 static images from API and display them
// if user clicks a gif it will start to animate

window.onload = init;

function init() {
	//initialize variables
	topics = ['tacos','pizza','popcorn','hamburger','salad','waffles'];

	console.log(topics);

	generateButtons(topics);

	// $(document).on("click", ".giphy", displayGifs());

	$(".giphy").on("click", function(){
		$("#gif-display").html('');
		displayGifs(this.value);
	});

}

function animateGif() {
	//when a gif is clicked make it animate
}

function generateButtons(topics) {
	//generate inital buttons for display

	for (var i = 0; i < topics.length; i++) {
		//take topics array and create initial list of buttons
		gifButton = $('<button>').html(topics[i]);
		gifButton.attr('class', 'btn btn-primary giphy');
		gifButton.attr('value', topics[i]);
		$('#gif-buttons').append(gifButton);
	}
}

function createNewButton() {
	//when user clicks submit - grab input area value and create a button and append it to the list
}

function displayGifs(choice) {
	//use AJAX call to grab gif images from API and display on the page
	key = 'dc6zaTOxFJmzC';
	queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + choice + '&limit=2&fmt=json' + '&api_key=' + key;

	$.ajax({
		url: queryURL,
		query: 'GET'
	}).done(function(response) {
		console.log(response);
		for (var i = 0; i < response.data.length; i++) {
			gifDiv = $('<div>');
			gifDiv.addClass('gif-response');
			gifDiv.attr('still-url', response.data[i].images.fixed_height_still.url); //grab still image url
			gifDiv.attr('animated-url', response.data[i].images.fixed_height.url); //grab animated image url
			gifDiv.attr('state', 'still');

			gifImage = $('<img>');
			gifImage.attr('src', response.data[i].images.fixed_height_still.url); //initial img will be still

			gifDiv.append(gifImage);

			$("#gif-display").append(gifDiv);
		}

	});
}