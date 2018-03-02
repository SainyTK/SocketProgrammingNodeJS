var net = require('net');

var HOST = '127.0.0.1';
var PORT = 1337;

var name = [];
var val = [];
var sym;

var justConnect;

var cs = net.createServer(function(sock){

	// console.log('Client ' + cntClient + 'connected..');
	console.log('Connected');
	justConnect = true;
	sock.on('data',function(data)
	{
		if(justConnect)
		{
			sym = data+'';
			sock.write('OK');
			justConnect = false;
		}
		else
		{
			var i = name.indexOf(data+'');
			if(sym=='+')
			{
				if(i==-1)
				{
					name.push(data+'');
					val.push(1);
				}
				else
					val[i]++;
			}
			else
			{
				if(i!=-1)
				{
					val[i]--;
					if(val[i]==0)
					{
						name.splice(i,i+1);
						val.splice(i,i+1);
					}
				}
			}
			for(var i=0;i<name.length;i++)
				console.log('{' + name[i] + ':' + val[i] + '}');
			sock.destroy();
		}
	});

	sock.on('close',function(data)
	{
		console.log('Disconnected');
	});

}).listen(PORT,HOST);

console.log('Server listening on ' + HOST + ': ' + PORT);