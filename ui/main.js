console.log('Loaded!');

//change the text for testing purpose

//var element = document.getElementById("text-content");
//element.innerHTML = "html content changed from main.js";

//counter code

var button = document.getElementById('counter');
button.onclick = function(){
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

//submit name


var submit = document.getElementById('submit_btn');
submit.onclick = function(){
  
  //create a request to the counter 
    var request = new XMLHttpRequest();
     // capture the response and store it in a 
    
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
                var names = request.responseText;
                console.log("main.js - names - "+names);
                names = JSON.parse(names);
                var list = '';
                for(var i=0; i<names.length;i++){
                    list += '<li>' + names[i] + '</li>';
                    
                }
                var ul = document.getElementById('namelist');
                ul.innerHTML = list;

            }
        }
    };
    
    //extracting name on click
    var nameInput = document.getElementById('name');
    var name = nameInput.value;
    //Make the request
    request.open('GET', 'http://sajeethhussain.imad.hasura-app.io/submit-name?name=' + name, true);
    request.send(null);
  
};
