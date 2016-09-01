var express = require('express');
var fs = require('fs');


var app = express();

//read json data
console.log("read json file");
fs.readFile('News.json',function (err,data) {
	if (err) {
		return console.error(err);
	}
	console.log("open file success");
	// console.log(data.toString());
	News = data;
})

app.all('*',function (req,res,next) {
	 // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.header('Access-Control-Allow-Credentials', true);

    res.header("Content-Type", "application/json;charset=utf-8");
	
	next()
	
});


app.get('/News',function (req,res) {
	res.send(News);
});

app.listen(8888)

console.log("Server running at http://127.0.0.1:8888");

