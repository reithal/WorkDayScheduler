/* 
  script.js  For Workday Scheduler
  Author: Carlos Mazon

  Date: 


*/
//var currentDate = moment().format("dddd MMMM Do, YYYY");
var currentDate = moment();
$('#currentDate').html(currentDate.format("dddd MMMM Do, YYYY"));
var todayDay = currentDate.format("M/DD/YYYY");
var workday = {
  dateSet: "",
  events : [
    {
      hour : "9:00 AM",
      description : ""
    },
    {
      hour : "10:00 AM",
      description : ""
    },
    {
      hour : "11:00 AM",
      description : ""
    },
    {
      hour : "12:00 PM",
      description : "Lunch"
    },
    {
      hour : "1:00 PM",
      description : ""
    },
    {
      hour : "2:00 PM",
      description : ""
    },
    {
      hour : "3:00 PM",
      description : ""
    },
    {
      hour : "4:00 PM",
      description : ""
    },
    {
      hour : "5:00 PM",
      description : ""
    }
    ]

    
  };


  function constructDay () {
    $('tbody').empty();
    
    for (i = 0; i < workday.events.length; i++) {
      var getRowHour = todayDay + " " + workday.events[i].hour;
      var fromNow = moment(getRowHour).fromNow().includes("ago");
      var coloCode;
    


      var tableRow = $('<tr>');
      if (fromNow) {
        colorCode = "table-danger";
      }
      else{
        colorCode = "table-success";
      }
      tableRow.append('<td style="width: 10%; text-align: center" class="col">' + workday.events[i].hour + '</td>');
      tableRow.append('<td class="col '+ colorCode + '"><input id="inputIndex' + i + '" type="text" placeholder="" value="' + workday.events[i].description + '"></td>');
      tableRow.append('<td class="col"><button class="save-btn" data-index="' + i + '" type="submit"><i class="far fa-save"></i></button></td>');
      $('tbody').append(tableRow);
     
    }
  };


  function setEventDesc (index, eventDesc) {     
    workday.events[index].description = eventDesc;
    // DEBUG: console.log(eventDesc + " being passed to set and index " + index + " to event: " + workday.events[index].description + " for hour " + workday.events[index].hour)
    constructDay();
  };

  function checkLocal() {
    var workingDay = JSON.parse(localStorage.getItem("DATE-" + todayDay));
    if (workingDay === null){
      return null;   
    } 
    else {
      return workingDay;
    }
  };


  function writeLocal () {
    localStorage.setItem("DATE-" + todayDay , JSON.stringify(workday));
  };



function loadDay() {
  data = checkLocal();
  if (data === null) {
    workday.dateSet = todayDay;
     for (i=0; i<workday.events.length; i++){
      workday.events[i].description ="";
     };
    constructDay();
  }
  else {
    workday = data;
    constructDay();
  }
;}


// INIT The Page
  var data = checkLocal();
  loadDay();
  

  // Event Handlers for Buttons
  // Dynamic handlers for save buttons as they generate
  $(document).on("click", ".save-btn", function(){
    var indexToSave = $(this).attr("data-index");
    var inputDesc = ($("#inputIndex"+indexToSave).val());
    setEventDesc(indexToSave, inputDesc);
    writeLocal();
  });
  
  // Event Handler to load the next day.
  $("#next-btn").on("click", function(){
    todayDay = currentDate.add(1, "day").format("M/DD/YYYY");
    $('#currentDate').html(moment(todayDay).format("dddd MMMM Do, YYYY"));
    loadDay();
    
  });

   // Event Handler to load the previous day from the current date selected.
  $("#prev-btn").on("click", function(){
    todayDay = currentDate.subtract(1, "day").format("M/DD/YYYY");
    $('#currentDate').html(moment(todayDay).format("dddd MMMM Do, YYYY"));
    data = checkLocal();
    loadDay();
    
  });
