/* 
  navbar.js file used for the NavBar used on multiple pages. 
  Author: Carlos Mazon
 
  Date: Feb 2020
*/

var searchInput = $('#searchInput');

$('#searchBtn').on("click",function(event){
  event.preventDefault();  // Don't refresh the page.
  googleSearch();
});

/**
 * Opens a new tab to perform google search based value in Search input.
 */
function googleSearch (){
  event.preventDefault();
 
  if (searchInput.val())
  {
  window.open("https://www.google.com/search?q=" + searchInput.val());
  }
}