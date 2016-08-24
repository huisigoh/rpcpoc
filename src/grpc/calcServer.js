var PROTO_CALC_PATH = __dirname + '/proto/Calculator.proto';

console.log(PROTO_CALC_PATH);

var grpc = require('grpc');
var calc_proto = grpc.load(PROTO_CALC_PATH).calculator;

function calculate (call, callback){
    console.log("Calculating: " + JSON.stringify(call.request))

    var result;
    
    switch(call.request.op){
      case "ADD": 
        result = call.request.num1 + call.request.num2;
        break;
      case "SUBTRACT": 
        result = call.request.num1 - call.request.num2;
        break;
      case "MULTIPLY": 
        result = call.request.num1 * call.request.num2;
        break;
      case "DIVIDE": 
        result = call.request.num1 / call.request.num2;
        break;
      default:
        result = -1;
    }

    callback(null, {res: result});
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  server.addProtoService(calc_proto.Calculator.service, {calculate: calculate});
  server.bind('0.0.0.0:12346', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
