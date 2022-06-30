// On page load
$(function() {
  // Selectors

    // container selector
    var containerEl = $(".container");
    // current day selector
    var currentDayEl = $("#currentDay");

  // Variables
    // saved events 
    var savedEvents = [
      {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, 
    ];


  // Functions

    // load saved events
    function loadEvents() {
      var rawEvents = localStorage.getItem("workday-events");
      if(rawEvents){
        var parsedEvents = JSON.parse(localStorage.getItem("workday-events"));
        savedEvents = parsedEvents;
      }
    }

    // display rows for each hour in the work day 
      // For hours 9am to 5pm :
        // create a row
        // create hour column with hour of the day
        // create a text area column
          // color background based on current time
          // fill in with saved text if it exists
        // create a save event button
        // append elements

    // display current day

    // save event
    function saveEvent(e) {
      var text = $(this).parent().prev().val();
      // get index of row (saved as a data attribute)
      // set text of savedEvents at that index to text
      // stringify and save
    }


  // Function Calls


  // Event Listeners

    // on container click, filter for save button and save event


});