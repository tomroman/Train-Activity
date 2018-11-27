
var config = {
    apiKey: "AIzaSyB7iglQonF8w8jd_V7wVSzeWAZGzXiinw4",
    authDomain: "homeworkfirebase-7d3a3.firebase.com",
    databaseURL: "https://homeworkfirebase-7d3a3.firebaseio.com",
   
    storageBucket: "homeworkfirebase-7d3a3.appspot.com",
   
  };

  firebase.initializeApp(config);



var database = firebase.database();

// var database = firebase.database() always returned an error message, 
// as such I was never able to complete the assignment. Below is the code for the rest of the assignment
// based on the inclass activities. 



// 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var tName = $("#train-name-input").val().trim();
  var tDestination = $("#destination-input").val().trim();
  var tStart = moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X");
  var tRate = $("#rate-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: tName,
    destination: tDestination,
    start: tStart,
    freq: tRate,
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.rate);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var tName = childSnapshot.val().name;
  var tDestination = childSnapshot.val().destination;
  var tStart = childSnapshot.val().start;
  var tRate = childSnapshot.val().rate;

  // Employee Info
  console.log(tName);
  console.log(tDestination);
  console.log(tStart);
  console.log(tRate);

  // Prettify the employee start
  var tStartPretty = moment.unix(tStart).format("MM/DD/YYYY");


  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(tName),
    $("<td>").text(tDestination),
    $("<td>").text(tStartPretty),

    $("<td>").text(tRate),

  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});
