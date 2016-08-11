var PROTO_PATH = __dirname + '/helloworld.proto';
var CALC_PATH = __dirname + '/Calculator.proto';

var grpc = require('grpc');
var hello_proto = grpc.load(PROTO_PATH).helloworld; //proto.package
var calculator_proto = grpc.load(CALC_PATH).calculator

/**
 * Implements the SayHello RPC method.
 */
function sayHello(call, callback) {
  callback(null, {message: 'Hello ' + call.request.name});
}

function calculate(call, callback){

  console.log("calculating: " + call.logid);

    // var val = 0;
    // if (work.op == ttypes.Operation.ADD) {
    //   val = work.num1 + work.num2;
    // } else if (work.op === ttypes.Operation.SUBTRACT) {
    //   val = work.num1 - work.num2;
    // } else if (work.op === ttypes.Operation.MULTIPLY) {
    //   val = work.num1 * work.num2;
    // } else if (work.op === ttypes.Operation.DIVIDE) {
    //   if (work.num2 === 0) {
    //     var x = new ttypes.InvalidOperation();
    //     x.whatOp = work.op;
    //     x.why = 'Cannot divide by 0';
    //     result(x);
    //     return;
    //   }
    //   val = work.num1 / work.num2;
    // } else {
    //   var x = new ttypes.InvalidOperation();
    //   x.whatOp = work.op;
    //   x.why = 'Invalid operation';
    //   result(x);
    //   return;
    // }

    // var entry = new SharedStruct();
    // entry.key = logid;
    // entry.value = ""+val;
    // data[logid] = entry;

    // result(null, val);
    
  callback(null, {res: 32});
}


/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  var calc_server = new grpc.Server();
  server.addProtoService(hello_proto.Greeter.service, {sayHello: sayHello});
  calc_server.addProtoService(calculator_proto.Calculator.service, {Calculate: Calculate});
  server.bind('0.0.0.0:12345', grpc.ServerCredentials.createInsecure());
  calc_server.bind('0.0.0.0:12346', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
