var PROTO_CALC_PATH = __dirname + '/proto/Calculator.proto';

var grpc = require('grpc');
var calc_proto = grpc.load(PROTO_CALC_PATH).calculator;

function main() {
  var client = new calc_proto.Calculator('localhost:12346',
                                       grpc.credentials.createInsecure());

  var workReq = new calc_proto.Work();
  workReq.logid=123456;
  workReq.num1=4;
  workReq.num2=8;
  workReq.op= calc_proto.Operation.ADD; 
  workReq.comment='TEST_COMMENT';

  client.calculate(workReq, function(err, response) {
    console.log('Calculated:', response.res);
  });
}

main();
