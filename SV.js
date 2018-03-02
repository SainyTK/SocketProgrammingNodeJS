var net = require('net');

var names = [];
var vals = [];
var cnt = 0;
var cntClient = 0;

var HOST = '127.0.0.1';
var PORT = 1337;

var name;
var res='';

var cs = net.createServer(function(sock){

	// console.log('Client ' + cntClient + 'connected..');
	console.log('Connected');
	cnt = 0;

	sock.on('data',function(data)
	{
		if(cnt == 0)
		{
			name = data+'';
			if(names.indexOf(name)==-1)
			{
				names.push(name);
				vals.push(0);
				cntClient++;
			}
			sock.write('OK');
			cnt++;
		}
		else
		{
			console.log('Clients List : ');
			for(var i = 0;i<cntClient;i++)
			{
				console.log(names[i]);
				if(name == names[i])
					break;
			}
			console.log('Num of User : ' + cntClient);
			vals[i] += parseInt(data);
			sock.write('Name : ' + name + ', Value = ' + vals[i]);
			cnt++;
			sock.destroy();
		}
	});

	sock.on('close',function(data)
	{
		console.log('Disconnected');
	});

}).listen(PORT,HOST);

console.log('Server listening on ' + HOST + ': ' + PORT);