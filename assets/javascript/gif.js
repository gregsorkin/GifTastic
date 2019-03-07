$(document).ready(function() {

    /* GLOBAL VARIABLES */

        // Sample Topics Array
    let topics = ["the simpsons", "futurama", "family guy", "the office", "parks and recreation", "snl", "bob's burgers", "the good place",
                "supernatural", "veronica mars", "the daily show", "golden girls", "30 rock", "buffy the vampire slayer", "firefly"]
        // Build the URL
    let limit = 10;
    let apiKey = "xjd69KO0eKobr8mz4DQ9LtpVbOEEcjjB";
    let animateImg;
    let stillImg;

    /* CLICK HANDLERS */

    /* AJAX and Processing */
    function gifGrab(value) {
        console.log(value);
        const queryURL = "http://api.giphy.com/v1/gifs/search?q=" + value + "&api_key=" + apiKey + "&limit=" + limit;
        console.log(queryURL);

        $(".gifBox").empty();

        // AJAX Request
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) { // AJAX Promise
            let results = response.data;
            console.log(results);

            for (let i = 0; i < results.length; i++) {
                let gifDiv = $("<div>");

                    // Collects the images (still and animated) and sets their respective attributes
                let newImg = $("<img>");
                newImg.attr("src", results[i].images.original_still.url);
                newImg.attr("data-still", results[i].images.original_still.url);
                newImg.attr("data-animate", results[i].images.downsized_large.url);
                newImg.attr("data-state", "still");
                newImg.attr("class", "gif");
                    // Appends the gif
                gifDiv.append(newImg);

                    // Collects the rating of said images
                let rating = results[i].rating.toUpperCase();
                let p = $("<p id='rate'>").text("Rating: " + rating);
                    // Appends the rating text
                gifDiv.append(p);
                    // Prepends both to the Div
                $(".gifBox").prepend(gifDiv);
            }
        })
    }

    /* Button Creation */
    function buttonCreate() {
        $("#buttonsList").empty();

        for (let j = 0; j < topics.length; j++) {
            let button = $("<button>");
            button.attr("class", "btn btn-info topicButton");
            button.attr("id", "value");
            button.attr("data-topic", topics[j]);
            button.text(topics[j]);
            button.click(function() {
                const value = $(this).attr("data-topic");
                gifGrab(encodeURI(value)); 
            });

            $("#buttonsList").append(button);


        }
    }

    /* Animate or Freeze on click */
    function animateStill() {
        let state = $(this).attr("data-state");
        /*let moveGif = $(this).attr("data-animate");
        let freezeGif = $(this).attr("data-still");*/

        if (state === "still") {
            $(this).attr("src", $(this).data("animate"));
            $(this).attr("data-state", "animate");
        } else if (state === "animate") {
            $(this).attr("src", $(this).data("still"));
            $(this).attr("data-state", "still");
        }
    }

    /* Submit your show title to search */
    $("#add-tvShow").click(function() {
        event.preventDefault();

        let userRequest = $("#showAdd").val().trim();
        topics.push(userRequest);

        buttonCreate();

        $("#showAdd").val("");
    });

    $(".topicButton").click(function() {
        console.log('got here')
        const value = $(this).attr("data-topic");
        gifGrab(value); 
    });

    buttonCreate();

    $(document).on("click", "img", animateStill);

});