/**
 * Created by shchoi on 2015-07-21.
 */
var http = require("http");
var option = {
  hostname : "localhost",
    port : "8083",
    path : "/hello.html"
};

function handleResponse(response){
    var serverData = "";
    response.on("data", function(chunk){
        serverData += chunk;
    });

    response.on("end", function(){
       console.log(serverData);
    });
}

http.request(option, function(response){
    handleResponse(response);
}).end();