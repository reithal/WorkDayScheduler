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
  dateSet: todayDay,
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
    ],
    constructDay: function () {
      $('tbody').empty();
      for (i = 0; i < this.events.length; i++) {
        var hourRow = $('<tr>');
        hourRow.append('<td style="width: 10%; text-align: center" class="col">' + this.events[i].hour + '</td>');
        hourRow.append('<td class="col"><input id="inputIndex' + i + '" type="text" placeholder="" value="' + this.events[i].description + '"></td>');
        hourRow.append('<td class="col"><button class="save-btn" data-index="' + i + '" type="submit"><i class="far fa-save"></i></button></td>');
        $('tbody').append(hourRow);
      }
    },
    setEventDesc: function (index, eventDesc) {
      console.log("show arguments " + index +"," + eventDesc );
      console.log(this.events[index]);
      
      this.events[index].description = eventDesc;
      console.log(eventDesc + " being passed to set and index " + index + " to event" + this.events[index])
      this.constructDay();
      console.log(this)
    }
  }
 
  workday.constructDay();

  $(document).on("click", ".save-btn", function(){
    var indexToSave = $(this).attr("data-index");
    var inputDesc = ($("#inputIndex"+indexToSave).val());
    workday.setEventDesc(indexToSave, inputDesc);
    localStorage.setItem("DATE-Event", JSON.stringify(workday));
    workday.constructDay();
    
  })

