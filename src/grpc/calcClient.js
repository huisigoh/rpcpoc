var PROTO_CALC_PATH = __dirname + '/proto/Calculator.proto';
var Work = require('./generated/work');
var OPERATION = require('./generated/operation');

var grpc = require('grpc');
var calc_proto = grpc.load(PROTO_CALC_PATH).calculator;

function main() {
  var client = new calc_proto.Calculator('localhost:12346',
                                       grpc.credentials.createInsecure());
//   var user;
//   if (process.argv.length >= 3) {
//     user = process.argv[2];
//   } else {
//     user = 'world';
//   }

  var workReq = new Work();
  workReq.logid=123456;
  workReq.num1=4;
  workReq.num2=8;
  workReq.op=OPERATION.ADD; 
  workReq.comment='TEST_COMMENT';

  client.calculate(workReq, function(err, response) {
    console.log('Calculated:', response.res);
  });



}

main();
