var topics; //initial array to hold values for types of gifs
var choice; //hold value of which button clicked to search that value in API
var gifButton; //button element used to pull gif from api
var key; //API key
var queryURL; //URL used to query GIPHY API
var gifDiv; //div element to hold each gif img tag
var gifImage; //image tag to hold each gif returned from the API
var state; //state of the gif image (still or animated)
var userInput; //store user input for new button
var gifRating; //store gif rating info

window.onload = init; //call init on page load

function init() {
	//initialize variables
	topics = ['cat','dog','horse','fish','bird','snake','cow','shark','parrot','ostrich'];
	generateButtons(topics);
}

function animateGif() {
	//when a gif is clicked make it animate
	$('.gif-img').on('click', function() {
		state = $(this).attr('state');
		if (state == 'still') {
			$(this).attr('src', $(this).attr('animated-url'));
			$(this).attr('state', 'animated');
		} else if (state != 'still') {
			$(this).attr('src', $(this).attr('still-url'));
			$(this).attr('state', 'still');
		}
	});
}

function generateButtons(topics) {
	//generate inital buttons for display
	$('#gif-buttons').empty();
	if (topics && topics.length > 0) {
		for (var i = 0; i < topics.length; i++) {
			//take topics array and create initial list of buttons
			gifButton = $('<button>').html(topics[i]);
			gifButton.attr('class', 'btn btn-info giphy');
			gifButton.attr('value', topics[i]);
			$('#gif-buttons').append(gifButton);
		}
	}
	$('.giphy').on('click', function(){
		//when gif button is clicked clear current gifs and pass value from button to build next API call
		$('#gif-display').html('');
		displayGifs(this.value);
	});
}

function createNewButton() {
	//when user clicks submit - grab input area value and create a button and append it to the list
	event.preventDefault(); //keep from the submit from trying to "submit" the form and refreshing the page
	userInput = $('#user-input').val().trim();
	topics.push(userInput);
	generateButtons(topics);
	$('#user-input').val('');
}

function displayGifs(choice) {
	//use AJAX call to grab gif images from API and display on the page
	key = 'dc6zaTOxFJmzC';
	queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + choice + '&limit=10&fmt=json&api_key=' + key;
	$.ajax({
		// ajax call to giphy api to grab gif images to be displayed
		url: queryURL,
		query: 'GET'
	}).done(function(response) {
		console.log(response);
		if (response.data && response.data.length > 0) {
			for (var i = 0; i < response.data.length; i++) {
				//for each entry API return create a div and append them to display on page
				gifDiv = $('<div>');
				gifDiv.addClass('gif-response');

				gifRating = $('<span>');
				gifRating.attr('class', 'gif-rating');
				gifRating.html('Rating: ' + response.data[i].rating);

				gifImage = $('<img>');
				gifImage.addClass('gif-img');
				gifImage.attr('still-url', response.data[i].images.fixed_height_still.url); //grab still image url
				gifImage.attr('animated-url', response.data[i].images.fixed_height.url); //grab animated image url
				gifImage.attr('state', 'still'); //set state attribute
				gifImage.attr('src', response.data[i].images.fixed_height_still.url); //initial img will be still

				gifDiv.append(gifRating);
				gifDiv.append(gifImage);
				// append all gifs to div element to display on page
				$('#gif-display').append(gifDiv);
			}
		}
		animateGif(); //call animate gif to toggle animated version of still version
	});
}
