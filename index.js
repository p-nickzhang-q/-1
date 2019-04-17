// var https = require('https')
var fs = require('fs')
var cheerio = require('cheerio')
var request = require('request')
var excelPort = require('excel-export');
const Superagent = require('superagent');


var rows = [];
function getPageUrl(index) {
    return `https://www.zhihu.com/people/hao-zhang-53-4/followers?page=${index}`;
}

function fetch(url, curPage) {
    Superagent.get(url).end((err, sres) => {
        if (err) {
            return nextPage(err);
        }

        var $ = cheerio.load(sres.text);
        var list = $('#Profile-following .List-item');

        list.each((i, item) => {
            item = $(item);
            var username = item.find('a').text();
            var des = item.find('.ContentItem-meta').eq(0).find('.ztext').text();
            var arr = item.find('.ContentItem-meta').eq(0).find('.ContentItem-status').eq(0).children('span');
            var status = '';
            if (arr.length !== 0) {
                status = arr.toArray().map(t => {
                    return t.children[0].data;
                }).join(';');
            }
            rows.push([username, des, status]);
        });
        if ($('.Pagination').eq(0).find('.PaginationButton-next').length !== 0) {
            var nextPage = curPage + 1;
            fetch(getPageUrl(nextPage++), nextPage);
        } else {
            console.log(JSON.stringify(rows));
            console.log("---------------");
            console.log(rows.length);
        }
    });
}
fetch(getPageUrl(1), 1);