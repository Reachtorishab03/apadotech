<!DOCTYPE html>
<html>

<head>
    
    <title> Letter - Chat </title>
    
    <meta charset="UTF-8">
  <meta name="description" content="Letter's official chat app">
  <meta name="keywords" content="Letter, development, chat, free, app">
  <meta name="author" content="Gyan Prakash">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <link rel="stylesheet" href="style.css" type="text/css" />
    
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
    <script type="text/javascript" src="chat.js"></script>
    <script type="text/javascript">
    
        // ask user for name with popup prompt    
        var name = prompt("Enter your chat name:", "Guest");
        var message = document.getElementById("sendie");
        
        // default name is 'Guest'
    	if (!name || name === ' ') {
    	   name = "Guest";	
    	}
    	
    	// strip tags
    	name = name.replace(/(<([^>]+)>)/ig,"");
    	
    	// display name on page
    	$("#name-area").html("You are: <span>" + name + "</span>");
    	
    	// kick off chat
        var chat =  new Chat();
    	$(function() {
    	
    		 chat.getState(); 
    		 
    		 // watch textarea for key presses
             $("#sendie").keydown(function(event) {  
             
                 var key = event.which;  
           
                 //all keys including return.  
                 if (key >= 33) {
                   
                     var maxLength = $(this).attr("maxlength");  
                     var length = this.value.length;  
                     
                     // don't allow new content if length is maxed out
                     if (length >= maxLength) {  
                         event.preventDefault();  
                     }  
                  }  
    		 																																																});
    		 // send mesaage on button press
        $('#send-button').click(function(e) {
          if($("#sendie").val() != "") {
          chat.send($("#sendie").val(), name);
          $("#sendie").val("");
          }
        });
            
    	});
    </script>

</head>

<body onload="setInterval('chat.update()', 1000)">

    <div id="page-wrap">
    
        <h2>Letter - Chat</h2>
        
        <p id="name-area"></p>
        
        <div id="chat-wrap"><div id="chat-area"></div></div>
        
        <form id="send-message-area">
            <textarea id="sendie" maxlength = '512' placeholder="message"></textarea>
            <span id="send-button"><img id="send-button-image" src="./images/send_icon.png"></button>
        </form>
    
    </div>

</body>

</html>