console.log('Loaded!');

//change the text for testing purpose

//var element = document.getElementById("text-content");
//element.innerHTML = "html content changed from main.js";

//counter code

var button = document.getElementById('counter');
var counter = 0;
button.onClick = function(){
    //create a request to the counter 
    var request = new XMLHttpRequest();
    
    // capture the response and store it in a variable
    //render the variable in the correct span
    
    counter = counter + 1;
    var span = document.getElementById('count"');
    span.innerHTML = counter.toString();
}