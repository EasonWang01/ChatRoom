var app = require('express')();
var express = require('express')
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var path = require("path");
var favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname,'images','favicon.ico')));

app.get('/', function(req, res){
  res.sendFile(__dirname+'/index.html');
});

var user= [];
var peer;
io.on('connection', function(socket){



if(user.length>0){//如果裡面有人，即可跟他配對
	var peer = user.pop()
	var room = socket.id+peer.id;
	 socket.join(room,function(){
	 
	 });
	 peer.join(room,function(){
	
	 });

	 peer.on('chat message',function(msg){
	 	
			io.to(room).emit('serverSend',msg);
			
	  });
}else{
	user.push(socket)//如果現在沒人，則進入等待
}

socket.on('chat message',function(msg){
 	
	io.to(room).emit('serverSend',msg);
	console.log(user)
});



//讀取有多少人在等待配對
socket.on("queryUser",function(){
  //socket.emit("queryUser1",user)
  console.log(user.length)
})


});




http.listen(process.env.port || 8080, function(){
  console.log('listening on *:8080');
});