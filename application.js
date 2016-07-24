// Firebase practice
// Initialize Firebase
var config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  storageBucket: "",
};

// Initialize my Firebase app
firebase.initializeApp(config);

// Reference to my entire Firebase database
var myFirebase = firebase.database().ref();

// Reference to the recommendations object in my Firebase database
var recommendations = firebase.database().ref("recommendations");

// Save a new recommendation to the database, using the input in the form
var submitRecommendation = function () {

  // Get input values from each of the form elements
  var name = $("#Name").val();
  var author = $("#Author").val();

  // Push a new recommendation to the database using those values
  recommendations.push({
    "name": name,
    "author": author
  });
};

// Get the single most recent recommendation from the database and
// update the table with its values.
recommendations.limitToLast(1).on('child_added', function(childSnapshot) {
  // Get the recommendation data from the most recent snapshot of data
  // added to the recommendations list in Firebase
  recommendation = childSnapshot.val();

  // Update the HTML to display the recommendation text
  $("#name").html(recommendation.name)
  $("#author").html(recommendation.author)
});

// When the window is fully loaded, call this function.
$(window).load(function () {

  // Find the HTML element with the id recommendationForm, and when the submit
  // event is triggered on that element, call submitRecommendation.
  $("#recommendationForm").submit(submitRecommendation);

});
