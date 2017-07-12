var express = require('express');
var fs = require('fs');


var app = express();

//read json data of News
console.log("read News json file");
fs.readFile('News.json',function (err,data) {
	if (err) {
		return console.error(err);
	}
	console.log("open file success");
	// console.log(data.toString());
	News = data;
})


//read json data of Article.
console.log("read Article json file");
fs.readFile('Article.json',function (err,data) {
	if (err) {
		return console.error(err);
	}
	console.log("open file success");
	// console.log(data.toString());
	Article = data;
})


//read json data of Video
console.log("read Video json file");
fs.readFile('Video.json',function (err,data) {
	if (err) {
		return console.error(err);
	}
	console.log("open file success");
	// console.log(data.toString());
	Video = data;
})

//read json data of Video Main Directory
console.log("read Video Main Directory json file");
fs.readFile('VideoType.json',function (err,data) {
	if (err) {
		return console.error(err);
	}
	console.log("open file success");
	// console.log(data.toString());
	VideoType = data;
})

//read json data of Video Second Directory.
console.log("read Video Second Directory json file");
fs.readFile('VideoTypeSec.json',function (err,data) {
	if (err) {
		return console.error(err);
	}
	console.log("open file success");
	// console.log(data.toString());
	VideoTypeSec = data;
})


//read json data of Login
console.log("read Login json file");
fs.readFile('Login.json',function (err,data) {
	if (err) {
		return console.error(err);
	}
	console.log("open file success");
	// console.log(data.toString());
	Login = data;
})



//read json data of Words
console.log("read Words json file");
fs.readFile('Words.json',function (err,data) {
	if (err) {
		return console.error(err);
	}
	console.log("open file success");
	// console.log(data.toString());
	Words = data;
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

//route setting

app.get('/News',function (req,res) {
	res.send(News);
});

app.get('/Article',function (req,res) {
	res.send(Article);
})

app.get('/Video',function (req,res) {
	res.send(Video);
})

app.get('/VideoType',function (req,res) {
	res.send(VideoType);
})

app.get('/VideoTypeSec',function (req,res) {
	res.send(VideoTypeSec);
})


app.get('/words',function (req,res) {
	res.send(Words);
})

// login
app.post('/login',function (req,res) {

	res.send('true');
})




app.listen(8888)

console.log("Server running at http://127.0.0.1:8888");

