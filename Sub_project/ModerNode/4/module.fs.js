/**
 * Created by shchoi on 2015-06-22.
 */
var fs = require("fs");

try{
    var text = fs.readFileSync("textfile.txt", "utf8");
    console.log(text);

    var data = 'Hello world';
    fs.writeFileSync("textfile.txt", data,"utf8");
    console.log('Write File Sync Complete');
}catch (e){
    console.log(e);
}


fs.readFile("textfile.txt", "utf8", function(error, data){
   if(error){
       console.log(error);
   } else{
       console.log(data);
   }
});