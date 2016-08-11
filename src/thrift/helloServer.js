var thrift = require("thrift");
var Greeter = require("./gen-nodejs/Greeter");
var types = require("./gen-nodejs/helloworld_types");

//createServer - params: processor, handler, options

var server = thrift.createServer(Greeter, {
    SayHello: function(req, callback){
        
    }
});