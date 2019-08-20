// 1. Initialize Firebase
var config = {

    apiKey: "AIzaSyCbrqCIQ5a12r0kDKPhgcQECwfptivYkZo",
    authDomain: "trainscheduler-38b3c.firebaseapp.com",
    databaseURL: "https://trainscheduler-38b3c.firebaseio.com",
    projectId: "trainscheduler-38b3c",
    storageBucket: "",
    messagingSenderId: "969089455794",
    appId: "1:969089455794:web:538acbd130e88afb"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding Trains
  $("#submit-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainTime = moment($("#firstTrainTime-input").val().trim(), "MM/DD/YYYY").format("X");
    var trainFreq = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      role: trainDest,
      start: trainTime,
      rate: trainFreq
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.role);
    console.log(newTrain.start);
    console.log(newTrain.rate);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#firstTrainTime-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().role;
    var trainStart = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().rate;
  
    // Train Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainStart);
    console.log(trainFreq);
  
    // Prettify the train start
    var trainStartPretty = moment.unix(trainStart).format("MM/DD/YYYY");

  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(trainStartPretty),
      $("<td>").text(trainFreq),
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case