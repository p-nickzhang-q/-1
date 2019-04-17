const Eventproxy = require('eventproxy');
const Superagent = require('superagent');
const Cheerio = require('cheerio');
const Url = require('url');

const cnodeUrl = 'https://cnodejs.org/';
const ep = new Eventproxy();


Superagent.get(cnodeUrl).end((err, res) => {
    if (err) {
        return console.error(err);
    }
    var topicUrls = [];
    var result = [];
    var comment1Arrs = [];
    var $ = Cheerio.load(res.text);

    $('#topic_list .topic_title').each((idx, element) => {
        var $element = $(element);
        var href = Url.resolve(cnodeUrl, $element.attr('href'));
        topicUrls.push(href);
    });

    topicUrls.forEach(topicUrl => {
        Superagent.get(topicUrl).end((err, res) => {
            console.log('fetch ' + topicUrl + ' successful');
            ep.emit('topic_html', [topicUrl, res.text]);
        })
    });

    ep.after('topic_html', topicUrls.length, topics => {
        result = topics.map(topicPair => {
            var topicUrl = topicPair[0];
            var topicHtml = topicPair[1];
            var $ = Cheerio.load(topicHtml);
            return {
                title: $('.topic_full_title').text().trim(),
                href: topicUrl,
                comment1: $('.reply_content').eq(0).text().trim(),
                author1: $('.reply_author').eq(0).text(),
                author1Href: $('.reply_author').eq(0).attr('href')
            }
        })

        comment1Arrs = result.filter(item => {
            return item.author1Href;
        })

        comment1Arrs.forEach(comment1 => {
            var comment1UserUrl = Url.resolve(cnodeUrl, comment1.author1Href);
            Superagent.get(comment1UserUrl).end((err, res) => {
                console.log('fetch ' + comment1UserUrl + ' successful');
                ep.emit('comment1_author', [comment1.author1Href, res.text]);
            })
        })

        ep.after('comment1_author', comment1Arrs.length, arr => {
            arr.forEach(arrPair => {
                var author1Href = arrPair[0];
                var html = arrPair[1];
                var $ = Cheerio.load(html);
                // return {
                //     author1Href: url,
                //     score: $('#sidebar .big').text().trim()
                // }
                var idx = result.findIndex(item => {
                    return item.author1Href === author1Href
                });
                result[idx].score = $('#sidebar .big').text().trim();
            });
            console.log(JSON.stringify(result));
        })
    })

})
