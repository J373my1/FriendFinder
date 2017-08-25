/*jslint esversion: 6, browser: true*/
const $quesCont = $('.question-container');
// Form variables
const $surveyForm = $('#survey-form');
const $submitBtn = $('#submit');
const $nameInput = $('#name');
const $linkInput = $('#link');
// Modal variables
const $modal = $('#modal-match');
const $nameModal = $('#modal-name');
const $photoModal = $('#modal-photo');

// Array of survey questions
let questions = [
  'You are social and outgoing.',
  'You really love facts.',
  'You love to pull pranks on other people.',
  'You really want people to love you.',
  'People can rarely upset you.',
  'It is often difficult for you to relate to other people’s feelings.',
  'The paper industry has great meaning to you.',
  'The idea of being able to slack off during work hours is appealing to you.',
  'You sometimes dream about leaving Scranton.',
  'You feel more energetic after spending time with at office parties.'
];

// Function to generate html for survey questions and select inputs
let createQuestions = function () {
  questions.forEach(function (q, i) {
    let html =
    `<h3>Question ${i + 1}</h3>
    <div class="form-group">
      <label for="q${i + 1}">${q}</label>
      <select class="form-control questions" id="q${i + 1}" required>
        <option value="" disabled selected>Select an option</option>
        <option value="1">1 (Strongly disagree)</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5 (Strongly agree)</option>
      </select><br/>
    </div>`;
    $($quesCont).append(html);
  });
};

// Form submit event fires only after HTML5 validation
$surveyForm.submit(function (e) {
  // Prevent page from reloading
  e.preventDefault();
  // Collection of select inputs
  const $quesClass = $('.questions');
  // Loop to populate answers array
  let answers = [];
  $quesClass.each(function(i){
    answers.push($('#q' + (i + 1)).val());
  });
  // Create new friend array
  var newFriend = {
    name: $nameInput.val().trim(),
    photo: $linkInput.val().trim(),
    scores: answers,
  };
  // Set path and route
  let currentURL = window.location.origin;
  let apiPath = '/api/friends';

  // AJAX post request to add new friend to friends array
  $.post(currentURL + apiPath, newFriend, function (data) {
    // Clear form for new entry
  	$surveyForm[0].reset();
    // Add name and photo to modal and show modal
    $nameModal.text(data.name);
    $photoModal.attr('src', data.photo);
    $modal.modal('show');
  });
});
