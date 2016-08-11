var PROTO_CALC_PATH = __dirname + '/proto/Calculator.proto';

console.log(PROTO_CALC_PATH);

var grpc = require('grpc');
var calc_proto = grpc.load(PROTO_CALC_PATH).calculator;

function calculate (call, callback){
    console.log("Calculating: " + call)

    callback(null, {res: 32});
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
