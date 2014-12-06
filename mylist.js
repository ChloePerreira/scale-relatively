$(function (){
  //var myHash = {}; // put in as a param
  //$("ul").sortable();
  var myArray = [];
  var i = 0;
  $("#myButton").click(function(event){ 
    event.preventDefault();
    myArray.push([$("#myIng").val(), $("#myPer").val(), "empty"]);
    var holder = myArray.length-1;
    var $myLine = $(
      "<tr class='line' id = '" + i +"'>" + 
        "<td>" + $("#myPer").val() + "</td>" +
        "<td>" + $("#myIng").val() + "</td>" +
      "</tr>"
    ).click({param1: myArray}, selector); //myArray.length-1 is changing as array gets bigger
    console.log(myArray);
    $("tbody").append($myLine);
    ++i;
  });
 
  function selector(event) {
    $(this).addClass("selected").siblings().removeClass("selected");
    if ($(this).hasClass("selected")) {
      var position = $(this).attr('id'); 
      var newArray = emptier(event.data.param1);
      newArray[position][2]= prompt(
        "Enter the amount of " + newArray[position][0] + " in grams:");
      factor = newArray[position][2]/newArray[position][1];
      newArray = calculate(newArray, factor);
      console.log(newArray);
      printer(newArray, $("tbody"));
    };
  };

  function calculate(array, factor) {
    for (var i= 0; i<array.length; ++i){
      if (array[i][2]=== "empty") {
        array[i][2]=Math.round(factor*array[i][1]);
      };  
    };
    return array;
  };
  
  function emptier(array){
    for (var i= 0; i<array.length; ++i){
      array[i][2] = "empty"
    };
    return array;
  };

  function printer(array, old_tbody){
    var new_tbody = document.createElement('tbody');
    if (!$("#tableHeader").hasClass("header")) {
      $("#tableHeader").append("<th>amount</th>"); 
      $("#tableHeader").addClass("header");
    };
    for (var i= 0; i<array.length; ++i){
      var $myLine = $(
        "<tr class='line' id = '" + i +"'>" + 
          "<td>" + array[i][1] + "</td>" +
          "<td>" + array[i][0] + "</td>" +
          "<td>" + array[i][2] + "</td>" +
        "</tr>").click({param1: array, param2: array.length-1}, selector);
      $(new_tbody).append($myLine);      
    };
    $(old_tbody).replaceWith($(new_tbody));
    //old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
  };
});
