/**
 * Created by shchoi on 2015-07-23.
 */
var server = require("http").createServer(
    function(request, response){
        response.writeHead(200, {"Content-Type" : "text/html"});
        response.end("<h1>Hello World..!</h1> <Table>" +
        "<tr>" +
        " <td>sdfsdf</td>" +
        "</tr>" +
        "</Table>");
    }

).listen(52274);

server.on("request", function(){
   console.log("Request on");
});

server.on("connect", function(){
   console.log("Connection on");
});

server.on("close", function(){
   console.log("Close on");
});