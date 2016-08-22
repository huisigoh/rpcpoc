var PROTO_PATH = __dirname + '/proto/helloworld.proto';

var grpc = require('grpc');
var hello_proto = grpc.load(PROTO_PATH).helloworld;

var client = new hello_proto.Greeter('localhost:12345', grpc.credentials.createInsecure());      

function runSayHello(){
  client.sayHello({name: 'testname'}, function(err, response) {
    console.log('Client::Greeting:', response.message);
  });
}

function runChattyClient(){
  var call = client.chattyClient(function(err, response){
    console.log('Client::Stream message sent');
  });

  setInterval(function(){
      call.write({name: 'testname' + new Date()});
  },500);
}

function runChattyServer(){
  var call = client.chattyServer();
  call.on('data', function(response){
    console.log('Client::Response from server: ' + response);
  });

  call.on('end', function(){
    call.end();
  });
}

function runChat(){
  var call = client.everyonesChatty();

  call.on('data', function(){
    console.log('Client::Message from server: ' + response);
  })


  setInterval(function(){
        call.write({name: 'testname' + new Date()});
  },500);


  call.end();
}

function main(){
  if(process.argv.length != 3){
    console.error('Client::Op num required');
  }
  else{
    switch(process.argv[2]){
      case '1': runSayHello(); break;
      case '2': runChattyClient(); break;
      case '3': runChattyServer(); break;
      case '4': runSayHello(); break;
    }
  }
}


main();
