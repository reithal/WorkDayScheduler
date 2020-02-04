/* 
  script.js  
  Author: Carlos Mazon
  TODO: Update Date and description
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

    
  }
  function constructDay () {
    $('tbody').empty();

    for (i = 0; i < workday.events.length; i++) {
      var hourRow = $('<tr>');
      hourRow.append('<td style="width: 10%; text-align: center" class="col">' + workday.events[i].hour + '</td>');
      hourRow.append('<td class="col"><input id="inputIndex' + i + '" type="text" placeholder="" value="' + workday.events[i].description + '"></td>');
      hourRow.append('<td class="col"><button class="save-btn" data-index="' + i + '" type="submit"><i class="far fa-save"></i></button></td>');
      $('tbody').append(hourRow);
    }
  }


  function setEventDesc (index, eventDesc) {     
    workday.events[index].description = eventDesc;
    // DEBUG: console.log(eventDesc + " being passed to set and index " + index + " to event: " + workday.events[index].description + " for hour " + workday.events[index].hour)
    constructDay();
  }

  function checkLocal() {
    var workingDay = JSON.parse(localStorage.getItem("DATE-" + todayDay));
    if (workingDay === null){
      console.log("true for checkLocal")
      return null;   
    } 
    else {
      console.log("false for checklocal")
      return workingDay;
    }
  }

  function writeLocal () {
    localStorage.setItem("DATE-" + todayDay , JSON.stringify(workday));
  };


  var data = checkLocal();
  if (data === null) {
    workday.dateSet = todayDay;
    constructDay();
  }
  else {
    workday = data;
    console.log(workday);
    constructDay();
   
  }
  
  $(document).on("click", ".save-btn", function(){
    var indexToSave = $(this).attr("data-index");
    var inputDesc = ($("#inputIndex"+indexToSave).val());
    setEventDesc(indexToSave, inputDesc);
    writeLocal();
  });
  
  $(document).on("click", ".next-btn", function(){
    currentDate.add(1, "day")
  });
