var PROTO_PATH = __dirname + '/helloworld.proto';
// var CALC_PATH = __dirname + '/Calculator.proto';
// var Work = require("./generated/work");
// var OPERATION = require("./generated/operation");

var grpc = require('grpc');
var hello_proto = grpc.load(PROTO_PATH).helloworld;
// var calculator_proto = grpc.load(CALC_PATH).calculator

function main() {
  var client = new hello_proto.Greeter('localhost:12345',
                                       grpc.credentials.createInsecure());

  // var calc_client = new calculator_proto.Calculator('localhost:12346',
  //                                      grpc.credentials.createInsecure());                              
                                       
  var user;
  if (process.argv.length >= 3) {
    user = process.argv[2];
  } else {
    user = 'world';
  }

  //params: HelloRequest, callback
  client.sayHello({name: user}, function(err, response) {
    console.log('Greeting:', response.message);
  });

  //params: Work, callback
  // var workReq = new Work();

  // workReq.logid =54321;
  // workReq.num1 = 4;
  // workReq.num2 = 8;
  // workReq.op = OPERATION.ADD;
  // workReq.comment = 'TEST_COMMENT';


  // calc_client.Calculate(workReq, function(err, response){
  //   if(!err){
  //     console.log('Calculate: ', response.message);
  //   }
  //   else{
  //     console.log(err);
  //   }
    
  // });

}

main();
