// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append(
      "<div class='card' data-id='" + data[i]._id + "'>" 
      + "<div class='card-header text-light bg-danger'>" +
           data[i].title +
        "</div>" +
        "<div class='card-body'>" +
          "<p class='card-text'>" + "Full Article: " + "<a href='" + data[i].link + "' target='_blank'>" + data[i].link + "</p>" +
          "<button type='button' class='btn btn-primary'>"+ "Save" + "</button>" +
        "</div>" +
      "</div><br><br><br><br>");
  }
});



// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
