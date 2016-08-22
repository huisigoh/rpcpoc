var PROTO_PATH = __dirname + '/proto/helloworld.proto';

var grpc = require('grpc');
var hello_proto = grpc.load(PROTO_PATH).helloworld; //proto.package

/**
 * Implements the SayHello RPC method.
 */
function sayHello(call, callback) {
  callback(null, {message: 'Hello ' + call.request.name});
}

function chattyClient(call, callback){
  var requests;
  call.on('data', function(req){
    console.log('Reading from Chatty Client: ' + req.name)
    requests+=req.name + ', '
  });

  call.on('end', function(){
    callback(null, {message: 'Results read: ' + requests});
  });
}

function chattyServer(call){
  for(var i = 0; i < 10; i++){
    setTimeout(function(){
          call.write({message: 'StreamingServer: ' + call.request.name + ' : ' + i});
    },500);
  }
  call.end();
}

function everyonesChatty(){
  call.on('data', function(req){
    for(var i = 0; i < 10; i++){
      setTimeout(function(){
        call.write({message: 'Server - Bi-Directional : ' + call.request.name + ' : ' + i});
      },500);
    }
  });

  call.on('end', function(){
    call.end();
  });
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  server.addProtoService(hello_proto.Greeter.service, {
    sayHello: sayHello,
    chattyClient: chattyClient,
    chattyServer: chattyServer,
    everyonesChatty: everyonesChatty
  });
  server.bind('0.0.0.0:12345', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
