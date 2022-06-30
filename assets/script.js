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
    function displayEvents() {
      var currHour = moment("1pm","ha").format("H");
      console.log(currHour);
      for(var i = 9; i <= 17; i++){
        var rowEl = $("<div>");
        rowEl.addClass("row time-block");

        var hourEl = $("<div>");
        hourEl.addClass("hour col-md-1 col-2 text-right");
        hourEl.text(moment().hour(i).format("hA"));

        var textEl = $("<textarea>");
        textEl.addClass("col-md-10 col-9");
        textEl.data("index", (i-9));
        if(i < currHour){
          textEl.addClass("past");
        } else if(i == currHour){
          textEl.addClass("present");
        } else {
          textEl.addClass("future");
        }
        
        var btnEl = $("<button>");
        btnEl.addClass("saveBtn col-1");
        var iconEl = $("<i>");
        iconEl.addClass("fa-solid fa-floppy-disk");
        btnEl.append(iconEl);


        rowEl.append(hourEl);
        rowEl.append(textEl);
        rowEl.append(btnEl);

        containerEl.append(rowEl);
      }
    }
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
  displayEvents();


  // Event Listeners

    // on container click, filter for save button and save event


});