
//can I say prepend new found articles to the same place in my handlebars file?

console.log("yo");


$("#clearButton").on("click", function (event) {
    event.preventDefault();
    //on the main page clear out your articles none should appear until you hit the scrapeData button 
    console.log("this clear function is running");
    $("#headlines").hide();
});

$("#scraperButton").on("click", function (event) {
    event.preventDefault();
    $.get("/all").then(function (err, data) {
        //grab this data and display it in the main page
        if (err) {
            console.log(err);
        }
        $("#headlines").show();
        console.log(data);
    });
});

$("#saveButton").on("click", function (event) {
    event.preventDefault();
    var thisId = $(this).data("id");
    $.post("/save/" + thisId).then(function (saved) {
        console.log(saved);
        //grab this item and remove it 
        $("#" + thisId).hide();

    });
});

$("#saveNote").on("click", function (event) {
    event.preventDefault();
    //add a note to an article
    //this is where we use populate
    var thisId = $(this).attr("data-id");
    var note = $("#noteAdded").val().trim();
    $.post("/headlines/" + thisId).then(function (response) {
        $(".modal").hide();
    })
});

$("#deleteSaved").on("click", function (event) {
    event.preventDefault();
    //on the saved page set saved to false
});

$("#removeButton").on("click", function (event) {
    event.preventDefault();
    var thisId = $(this).data("id");
    $.post("/delete/" + thisId).then(function (removed) {
        console.log(removed);
        //grab this item and remove it 
        $("#" + thisId).hide();

    });
});