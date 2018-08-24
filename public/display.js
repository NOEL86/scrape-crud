
//can I say prepend new found articles to the same place in my handlebars file?

$("#home").on("click", function (event) {
    event.preventDefault();
    console.log("home button function running");
    window.location("/index.handlebars");
    //go to the main page
});

$("#clearButton").on("click", function (event) {
    event.preventDefault();
    //on the main page clear out your articles none should appear until you hit the scrapeData button 

    $.get("/")
});

$("#deleteSaved").on("click", function (event) {
    event.preventDefault();
    //on the saved page set saved to false
});



$("#scraperButton").on("click", function (event) {
    event.preventDefault();
    $.get("/all")
}).then(function (data) {
    //grab this data and display it in the main page

});


$("#saveButton").on("click", function (event) {
    event.preventDefault();
    var thisId = $(this).attr("data-id");

    $.post("/saved/" + thisId).then(function (saved) {
        console.log(saved);
        //grab this item and remove it 

    });

});


$("#noteButton").on("click", function (event) {
    event.preventDefault();
    var thisId = $(this).attr("data-id");

    $.post("/note/" + thisId).then(function (note) {

        console.log(note);
    });
});

$("#noteButton").on("click", function (event) {
    event.preventDefault();
    //add a note to an article

})