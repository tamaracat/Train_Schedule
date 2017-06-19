
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAMUlJeEWRM48m5kvo_0tzutgT9lBsWVz0",
    authDomain: "employee-data-7e3a7.firebaseapp.com",
    databaseURL: "https://employee-data-7e3a7.firebaseio.com",
    projectId: "employee-data-7e3a7",
    storageBucket: "",
    messagingSenderId: "221768053406"
  };
  firebase.initializeApp(config);


var database = firebase.database();

var name = "";
var destination = "";
var first_train_time = 0;
var frequency = "";

var buttonMarkup = "<div class='btn-group-xs' role='group' ><button type='button' class='btn btn-default'>Update</button><button type='button' class='btn btn-default' id='remove_id'>Remove</button></div></button>"

$(document).ready(function() { /* code here */ 
 database.ref().on("child_added", function(childSnapshot){

    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().first_train_time);
    console.log(childSnapshot.val().frequency);

     var firstTimeConverted = moment(childSnapshot.val().first_train_time, 'HH:mm');
    console.log(firstTimeConverted.toDate());
    console.log(firstTimeConverted.format('YYYY-MM-DD HH:mm'))


    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var remainder = diffTime % childSnapshot.val().frequency;
    console.log(remainder);

    // Minute Until Train
    var minutesTillTrain = childSnapshot.val().frequency - remainder;
    console.log("MINUTES TILL TRAIN: " + minutesTillTrain);

    // Next Train
    var nextTrain = moment().add(minutesTillTrain, "minutes");
    var nextTrainDisplay = moment(nextTrain).format("hh:mm")
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
     $("#table_id").append("<thead><tr><th>" + childSnapshot.val().name + "</th><th>" + childSnapshot.val().destination + "</th><th>" + childSnapshot.val().frequency +  "</th><th>" + nextTrainDisplay + "</th><th>" +  minutesTillTrain + "</th><th>" + buttonMarkup + "</th></tr></thead>");
  
  });
  
});


$("#submit").click(function(){
 
 event.preventDefault();

  

  name = $("#train_name_id").val().trim();
  destination = $("#destination_id").val().trim();
  first_train_time = $("#train_time_id").val().trim();
  frequency = $("#frequency_id").val().trim();

if(name != ""){

  //code for handling the push
  database.ref().push({
    name: name,
    destination: destination,
    first_train_time: first_train_time,
    frequency: frequency
  });
  

    var firstTimeConverted = moment(first_train_time, 'HH:mm');
    console.log(firstTimeConverted.toDate());
    console.log(firstTimeConverted.format('YYYY-MM-DD HH:mm'))


    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var remainder = diffTime % frequency;
    console.log(remainder);

    // Minute Until Train
    var minutesTillTrain = frequency - remainder;
    console.log("MINUTES TILL TRAIN: " + minutesTillTrain);

    // Next Train
    var nextTrain = moment().add(minutesTillTrain, "minutes");
    var nextTrainDisplay = moment(nextTrain).format("hh:mm")
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


  database.ref().on("child_added", function(childSnapshot){

    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().first_train_time);
    console.log(childSnapshot.val().frequency);
  });
 
   $("#table_id").append("<thead><tr><th>" + name + "</th><th>" + destination + "</th><th>" + frequency +  "</th><th>" + nextTrainDisplay + "</th><th>" +  minutesTillTrain + "</th><th>" + buttonMarkup + "</th></tr></thead>");
  

  database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(lastEmpSnapshot){



$("name-display").html(lastEmpSnapshot).val();
$("destination-display").html(lastEmpSnapshot).val();
$("first-train-display").html(lastEmpSnapshot).val();
$("frequency-display").html(lastEmpSnapshot).val();

});
  // END OF $("#submit").click(function(){
}
else{
// do nothing
}
$("#remove_id").click(function(){
    $(this).parents("tr").remove();
  });

});