// const Express = require('express');
const Superagent = require('superagent');
const Cheerio = require('cheerio');

// const app = Express();

// app.get('/', (req, res, next) => {
//     Superagent.get('https://cnodejs.org/').end((err, sres) => {
//         if (err) {
//             return next(err);
//         }
//         const $ = Cheerio.load(sres.text);
//         var items = [];
//         $('#topic_list .topic_title').each(function (idx, element) {
//             var $element = $(element);
//             items.push({
//                 title: $element.attr('title'),
//                 href: $element.attr('href')
//             });
//         });

//         res.send(items);
//     })
// })

// app.listen(3000, (req, res) => {
//     console.log('app is running at port 3000');
// });

const items = [];

Superagent.get('https://cnodejs.org/').end((err, sres) => {
    if (err) {
        return next(err);
    }
    const $ = Cheerio.load(sres.text);
    $('#topic_list .cell').each(function (idx, element) {
        var $element = $(element);
        items.push({
            title: $element.find('.topic_title').attr('title'),
            href: $element.find('.topic_title').attr('href'),
            count_of_replies: $element.find('.count_of_replies').text().trim(),
            count_of_visits: $element.find('.count_of_visits').text().trim(),
            last_active_time: $element.find('.last_active_time').text().trim()
        });
    });

    console.log(JSON.stringify(items));
})