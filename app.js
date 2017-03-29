 // Make the prompt be focused so it feels more like a real CLI.
 $('.cli-prompt').focus();
 
 var selectedDirectory = '/var/www/html';
 
 $('.cli-prompt').keypress(function(e) {
   // If the Enter key pressed, process the entered value
   // and display the appropriate result.
   if (e.which == 13) {
     // This is the value entered in by the user.
     var enteredValue = $(this).val().toLowerCase();
     
     // Get the components of the command and make it an array
     // so we can manipulate it better.
     var params = enteredValue.split(' ');
     
     // Get the command type (i.e. cd, ls).
     var command = params[0];
     
     // This is basically a div which will contain the output.
     var $cliLog = $('.cli-log');
     
     // Create a mock file directory structure.
     var directories = {
       "var": {
         "www": {
           "html": [
             "index.php",
             "README.txt"
           ]
         }
       }
     }
		 
     // Display the appropriate output message. Defaults to
     // showing that the value the user entered is invalid.
     switch (command) {
       case 'cd':
         if (params[1]) {
           selectedDirectory += '/' + params[1];
         }
         break;
       
       case 'clear':
         $cliLog.html('');
         break;

       case 'easter egg':
         $cliLog.append('<div>Danger, danger, Will Robinson!!!</div>');
         break;
         
       case 'ls':
       	 var directoryList;
         
         // If user has passed any additional parameters,
         // (i.e. "-l"), display each result in a new line. 
         if (params[1] && params[1] == '-l') {
           directoryList = directories.var.www.html.join('<br />');
         }
         else {
           directoryList = directories.var.www.html.join(' ');
         }
         
         $cliLog.append('<div>' + directoryList + '</div>');
         break;
         
       case 'pwd':
         $cliLog.append('<div>' + selectedDirectory + '</div>');
         break;

       default:
         $cliLog.append('<div>The value "' + enteredValue + '" is invalid.</div>');
         break;
     }
     
     // When they enter in a command, clear the prompt.
     $('.cli-prompt').val('');
   }
 });
