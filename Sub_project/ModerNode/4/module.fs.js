/**
 * Created by shchoi on 2015-06-22.
 */
var fs = require("fs");

try{
    var text = fs.readFileSync("./Sub_project/ModerNode/4/textfile.txt", "utf8");
    console.log(text);

    var data = 'Hello world';
    fs.writeFileSync("./Sub_project/ModerNode/4/textfile.txt", data,"utf8");
    console.log('Write File Sync Complete');
}catch (e){
    console.log(e);
}


fs.readFile("./Sub_project/ModerNode/4/textfile.txt", "utf8", function(error, data){
   if(error){
       console.log(error);
   } else{
       console.log(data);
   }
});