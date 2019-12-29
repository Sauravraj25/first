var fs = require('fs');
var http=require("http");
http.createServer(function(req,res)
{

res.writeHead(200, {'Content-Type': 'text/html'});
var readStream = fs.createReadStream('youtubevideo.html','utf8');
readStream.pipe(res);
}).listen(3000);

console.log(" my server is running")
