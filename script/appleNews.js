var request = require("request"),
		cheerio = require("cheerio"),
		fs = require("fs");

var page = 1;
var newsUrl = [];

function sendReq() {
	request({
		url: "http://www.appledaily.com.tw/column/index/41/" + page,
		method: "GET"
	}, function(err, req, data) {
		if(err || !data) {
			return;
		}
		
		var $ = cheerio.load(data);
		
		var titles = $(".list.blue .aht_title a");
		
		var firstUrl = $(titles[0]).attr('href');


		if (firstUrl != undefined) {
			console.log(page);
			for(var i = 0 ; i < titles.length ; i++) {
				newsUrl.push($(titles[i]).attr('href'));
			}
		}
		else {
			return;
		}
		sendReq(page++);
		fs.writeFileSync("result.txt", newsUrl);
	});
}
sendReq();
