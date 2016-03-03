var restify = require("restify");
var fs = require("fs")


//setup cors

var server = restify.createServer();
server.use(restify.acceptParser(server.acceptable));
server.use(restify.authorizationParser());
server.use(restify.dateParser());
server.use(restify.queryParser());
server.use(restify.jsonp());
server.use(restify.gzipResponse());
server.use(restify.bodyParser());
server.use(restify.CORS());
server.use(restify.fullResponse());
server.opts(/.*/, function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", req.header("Access-Control-Request-Method"));
    res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"));
    res.send(200);
    return next();
});

server.get(/(.+)\.js$/,restify.serveStatic({
  directory: './public',
  default: 'mock.js'
}));
server.get(/(.+)\.css$/,restify.serveStatic({
  directory: './public',
  default: 'mock.css'
}));
server.get(/(.+)\.html/,restify.serveStatic({
  directory: './public',
  default: 'mock.html'
}));
server.get(/\/iframe/,restify.serveStatic({
  directory: './public',
  default: 'iframe.html'
}));
server.get(/\/inline/,restify.serveStatic({
  directory: './public',
  default: 'inline.html'
}));
server.get(/(.*)/,restify.serveStatic({
  directory: './public',
  default: 'index.html'
}));




var port = process.env.PORT || 8080;
server.listen(port,function(){
	console.log("Server Started. Press Ctrl+c to quit server")
})
