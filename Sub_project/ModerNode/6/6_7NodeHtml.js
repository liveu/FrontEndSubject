/**
 * Created by shchoi on 2015-07-23.
 */
var fs = require("fs");
var http = require("http");

http.createServer(function(req, res){
    fs.readFile("6_7NodeHtml.html", function(error, data){
        res.writeHead(200, {"Content-Type" : "text/html"});
        res.end(data);
    });
}).listen(52273, function(){
    console.log("Server running");
});