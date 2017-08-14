console.log('Loaded!');

//change the text for testing purpose

//var element = document.getElementById("text-content");
//element.innerHTML = "html content changed from main.js";

//counter code

var button = document.getElementById('counter');
button.onClick = function(){
    //create a request to the counter 
    var request = new XMLHttpRequest();
    
    // capture the response and store it in a 
    
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }
    };
    //render the variable in the correct span
    
    //Make the request
    request.open('GET', 'http://sajeethhussain.imad.hasura-app.io/counter', true);
    request.send(null);

   
};