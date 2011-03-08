var http = require("http"), url = require("url"), fs = require("fs"), list = [];

function Deal(todo, weekly) {
	if(typeof todo != "string") {
		throw new TypeError("Deal is not a string");
	} else {
		this.todo = todo;
		this.outdated = false;
		var w = weekly || false;
		var d = new Date();
		w ? d.setDate(d.getDate()+7) : d.setMonth(d.getMonth()+1);
		this.date = d;
	}
}

var server = http.createServer(function(request, response) {
	request.setEncoding("utf8");
	var req = url.parse(request.url);
	if(req.pathname == "/" || req.pathname == "/index.html") {
		response.writeHead(200, {
			"Cache-Control": "public; max-age=86400",
			"Content-Type": "text/plain; charset=UTF-8",
			"Date": new Date().toUTCString()
		});
		fs.readFile("index.html", function(err, data) {
			if(err) {
				throw err;
			} else {
				response.end(data);
			}
		});
	} else {
		console.log("Stub! Needed to action!");
		console.log(req);
		response.statusCode = 501;
		response.end();
	}
});
try {
	server.listen(80);
	console.log("Listening on 80 port");
} catch(e) {
	server.listen(9500);
	console.log("Listening on 9500 port");
}