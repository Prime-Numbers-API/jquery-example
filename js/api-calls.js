$(document).ready(function () {
    // hide everything except logo on page load
    $('.show-error').hide();
    $('.display-results').hide();


    //step 1 get the input from the user
    $(".is-this-number-prime").submit(function (event) {

        //force JavaScript to handle the submission
        event.preventDefault();

        //get the value from the input box
        let is_this_number_prime_apiKey = $("#is-this-number-prime-apiKey").val();
        let is_this_number_prime_check_number = $("#is-this-number-prime-number-check-number").val();
        let is_this_number_prime_include_explanations = $("#is-this-number-prime-include-explanations").val();
        let is_this_number_prime_include_prime_types_list = $("#is-this-number-prime-include-prime-types-list").val();
        let is_this_number_prime_language = $("#is-this-number-prime-language").val();

        // console.log(is_this_number_prime_apiKey, is_this_number_prime_check_number, is_this_number_prime_include_explanations, is_this_number_prime_include_prime_types_list, is_this_number_prime_language)

        //use the value to call the getResults function defined below
        is_this_number_prime_api_call(is_this_number_prime_apiKey, is_this_number_prime_check_number, is_this_number_prime_include_explanations, is_this_number_prime_include_prime_types_list, is_this_number_prime_language);
    });

    //step2 using the input from the user make the API call to get the JSON response

    function is_this_number_prime_api_call(is_this_number_prime_apiKey, is_this_number_prime_check_number, is_this_number_prime_include_explanations, is_this_number_prime_include_prime_types_list, is_this_number_prime_language) {
        let is_this_number_prime_api_url = `http://api.prime-numbers.io/is-this-number-prime.php?key=${is_this_number_prime_apiKey}&number=${is_this_number_prime_check_number}&include_explanations=${is_this_number_prime_include_explanations}&include_prime_types_list=${is_this_number_prime_include_prime_types_list}&language=${is_this_number_prime_language}`

        console.log(is_this_number_prime_api_url)

        $.ajax({
            url: is_this_number_prime_api_url,
            type: 'get',
            cache: false,
            success: function (dataReceived) {
                console.log('success!');
                console.log(dataReceived);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log("Status: ", textStatus); 
                console.log("Error: ", errorThrown);
                console.log("XMLHttpRequest: ", XMLHttpRequest.responseJSON.error);
                displayError(XMLHttpRequest.responseJSON.error, "error-is-this-number-prime")
            }
        });
    };
})

//step3 using the JSON response, populate the relevant part of your HTML with the variable inside the JSON

function is_this_number_prime_api_results(dataReceived) {

    console.log(dataReceived);

    //create an empty variable to store a new list item for each result
    let buildHtmlResults = "";

    $.each(dataReceived, function (dataReceivedKey, dataReceivedValue) {
        buildHtmlResults += "<li>";
        buildHtmlResults += "<div class='event-display-details'>";
        buildHtmlResults += "<div class='event-display-name' >" + dataReceivedValue.displayName + "</div>"
        buildHtmlResults += "<div class='event-details-start-date' >" + dataReceivedValue.start.date + "</div>";

        buildHtmlResults += "<div class='event-details-city' >" + dataReceivedValue.location.city + "</div><br>";

        buildHtmlResults += "<a href='" + dataReceivedValue.uri + "' class='event-details-button' target='_blank'>More Info</a>";
        buildHtmlResults += "</div>";
        buildHtmlResults += "</div>";
        buildHtmlResults += "<div class='event-details-venue' >";

        if (dataReceivedValue.venue.displayName != null || dataReceivedValue.location.city != null) {
            buildHtmlResults += "<iframe width='100%' height='150px'frameborder='0' style='border:0; clear: both; margin:10px;' src='https://www.google.com/maps/embed/v1/place?key=AIzaSyBdNRsY4zEYnRfcQ0_ZVVd370D7yuApzhI&q=" + dataReceivedValue.venue.displayName + "," + dataReceivedValue.location.city + "&maptype=roadmap' allowfullscreen></iframe>";
        }
        buildHtmlResults += "</div>";
        buildHtmlResults += "<div class='event-display-required-image' >";
        buildHtmlResults += "<img class='song-kick' src='images/poweredBySongKick.png'/>";
        buildHtmlResults += "</div>";

        buildHtmlResults += "</li>";
    });

    //use the html output to show it in the index.html
    $('#search-results ul').html(buildHtmlResults);
};

function displayError(errorText, containerClass) {

    console.log(errorText);

    let buildHtmlError = `<button type="button" class="close" data-dismiss="alert" aria-label="Close">`;
    buildHtmlError += `<span aria-hidden="true">×</span>`;
    buildHtmlError += `</button>`;
    buildHtmlError += `<strong>${errorText}</strong>`;

    $(`.${containerClass}`).html(buildHtmlError);
    $(`.${containerClass}`).show();
};
