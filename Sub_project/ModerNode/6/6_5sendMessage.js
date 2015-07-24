/**
 * Created by shchoi on 2015-07-23.
 */
require("http").createServer(function(req,res){
    res.writeHead(200, {"CtonentType" : "test/html"});
    res.end("<h1>Hello Web Server with Node.js</h1>");
}).listen(52274, function(){
    console.log("server running");
});