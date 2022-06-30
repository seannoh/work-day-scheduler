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
      {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, {timeModified: null}
    ];


  // Functions

    // load saved events
    function loadEvents() {
      var rawEvents = localStorage.getItem("workday-events");
      if(rawEvents){
        var parsedEvents = JSON.parse(localStorage.getItem("workday-events"));
        // check if the events was saved the previous day and reset events if that's the case
        if(moment(parsedEvents[9].timeModified).format("DDD") < moment().format("DDD")){
          for(var i = 0; i < savedEvents.length - 1; i++){
            parsedEvents[i].text = "";
          }
          localStorage.setItem("workday-events",JSON.stringify(parsedEvents));
        }
        savedEvents = parsedEvents;
      }
    }

    // display rows for each hour in the work day. each row has the hour, 
    // a colored text box based on current time, and a save button.
    function displayEvents() {
      //var currHour = moment("1pm","ha").format("H");
      var currHour = moment().format("H");
      console.log(currHour);
      for(var i = 9; i <= 17; i++){
        // create row element
        var rowEl = $("<div>");
        rowEl.addClass("row time-block");
        rowEl.data("index", (i-9));

        // create hour column
        var hourEl = $("<div>");
        hourEl.addClass("hour col-md-1 col-2 text-right");
        hourEl.text(moment().hour(i).format("hA"));

        // create text box column with dynamic color and load saved text
        var textEl = $("<textarea>");
        textEl.addClass("col-md-10 col-9");
        if(i < currHour){
          textEl.addClass("past");
        } else if(i == currHour){
          textEl.addClass("present");
        } else {
          textEl.addClass("future");
        }
        if(savedEvents[i-9].text) {
          textEl.val(savedEvents[i-9].text);
        }
        
        // create button with icon
        var btnEl = $("<button>");
        btnEl.addClass("btn saveBtn col-1 ");
        var iconEl = $("<i>");
        iconEl.addClass("fa-solid fa-floppy-disk");
        btnEl.append(iconEl);
        
        // append all elements
        rowEl.append(hourEl);
        rowEl.append(textEl);
        rowEl.append(btnEl);
        containerEl.append(rowEl);
      }
    }

    // display current day

    function displayDay() {
      currentDayEl.text(moment().format("dddd, MMMM Do"));
    }

    // save event
    function saveEvent() {
      var text = $(this).prev().val();
      // get index of row (saved as a data attribute)
      var rowIndex = $(this).parent().data("index");
      // set text of savedEvents at that index to text
      savedEvents[rowIndex].text = text;

      // update timestamp
      savedEvents[9].timeModified = moment().unix();

      // stringify and save
      console.log(JSON.stringify(savedEvents));
      localStorage.setItem("workday-events", JSON.stringify(savedEvents));
    }


  // Function Calls
  loadEvents();
  displayEvents();
  displayDay();
  

  // Event Listeners

    // on container click, filter for save button and save event
    containerEl.on("click","button",saveEvent);

    // add popover functionality to save buttons
    $('button').popover({
      content: "Saved",
      delay: {"show":100, "hide":100}
    })
    $('button').on("click", function () {
    
      setTimeout(function () {
          $('button').popover("hide");
      }, 1000);
    
    });

});