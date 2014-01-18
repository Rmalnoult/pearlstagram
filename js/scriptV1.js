$(document).ready(function () {      // When page is loaded, start playing the functions

	console.log('hello');        // displays hello in the console to confirm everything's ok
	var choice;

	function search (choice) {    // function search displays an instagram photo + caption + tags related to this photo
		$.ajax({                  // method ajax to do the query (the method we had seen in class didn't seem to work, I found this method on some forums)
			url: 'https://api.instagram.com/v1/tags/' + choice + '/media/recent?access_token=32168991.82908a0.5f31d75438944306a39a0ded8af7204e&count=1', // asks instagram for one picture with the tag the user chooses (choice)
			dataType: 'jsonp'  // asks for json
		})
			.done(function (r) {  // when the query is done, play this function

				console.log(r);  // displays object returned by api
				var result = r.data; // stores it in a variable
				console.log(result)  
				console.log(result[0].images.standard_resolution.url);  //  logs photo's url
				$('#image, #tags ul').empty();  // empties the html spots that will be used to display the photo
				$('#image').append('<img src="' + result[0].images.standard_resolution.url + '" />'); // insert the photo url in the source of an html img element to #image in the html
				$('#image').append('<p>' + result[0].caption.text + '</p>'); // displays caption text of the image

				for (var i in result[0].tags) {
					$('#tags ul').append('<li><a href="http://www.romainmalnoult.com">' + result[0].tags[i] + '</a></li>');
				}; // displays every tags associated with the photo that is being displayed

				$('a').on('click', function ( e ) { // on a click on a link(tag), functions stores what the tag and saves it as a parameter for the search function
				e.preventDefault();
				choice = $(this).text();  // stores the tag in var choice
				console.log(choice);
				search(choice);     // plays the search function
	})

			});
	};

	$('input.go').on('click', function ( e ) { // on a click on the submit button, functions stores what the user typed in the input and saves it as a parameter for the search function
		var choice = $('input.input').val();  // stores the input in var choice
		console.log(choice);
		search(choice);     // plays the search function
	})
	choice="bikini";
	search(choice);
	



});  





