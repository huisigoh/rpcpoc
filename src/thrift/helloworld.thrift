struct HelloRequest {
    1: string name
}

struct HelloReply {
    1: string message
}

service Greeter {
    HelloReply SayHello (1: HelloRequest req)
}
