var net = require('net');

var HOST = '127.0.0.1';
var PORT = 1337;
var i = 0;

var client = net.createConnection(PORT,HOST, function() {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    // Write a message to the socket as soon as the client is connected,
    //the server will receive it as message from the client 
    client.write('O');
});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {
    
    console.log(''+data);
    // Close the client socket completely
    if(data+'' == 'OK')
    	client.write('1');
});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('closed');
}); 