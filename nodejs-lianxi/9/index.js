const BufferList = require('bl');
const https = require('https');
const urls = ["https://www.baidu.com/s?wd=%5Cn%20%E5%9B%9E%E8%BD%A6&rsv_spt=1&rsv_iqid=0xec19352000031600&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&rqlang=cn&tn=baiduhome_pg&rsv_enter=1&oq=js%2520%25E5%259B%259E%25E8%25BD%25A6&rsv_t=d459nOWkAixn2HL3YPNpGnHnZN2Hpkf39aqf9CbbYEQuPZv9HbSDzkXEVYGQRfggD3Bt&rsv_pq=981a4cc10000f302&inputT=8481&rsv_sug3=27&rsv_sug1=24&rsv_sug7=100&rsv_sug2=0&rsv_sug4=8482",
    "https://www.baidu.com/s?wd=%5Cn%20%E5%9B%9E%E8%BD%A6&pn=10&oq=%5Cn%20%E5%9B%9E%E8%BD%A6&tn=baiduhome_pg&ie=utf-8&rsv_idx=2&rsv_pq=fae385490001078c&rsv_t=f4863aG0aBop5Ho%2BSn1fQo0I0Nago1XFl0a%2BbNy%2BsQ0DC2W%2B74nMom4kGAcC6HHyqgqG",
    "https://www.baidu.com/s?wd=%5Cn%20%E5%9B%9E%E8%BD%A6&pn=20&oq=%5Cn%20%E5%9B%9E%E8%BD%A6&tn=baiduhome_pg&ie=utf-8&rsv_idx=2&rsv_pq=ea01ab4e00016190&rsv_t=2df3EXux6CcdJNPDUxBW0N7ID0LK2K98HhxUONtWCOabyDdznuprkamgmPpPLRGZ5ECf"
]
const datas = [];

urls.forEach(url => {
    https.get(url, res => {
        res.pipe(BufferList((err, data) => {
            datas.push(data);
            if (datas.length === urls.length) {
                datas.forEach(item => {
                    console.log(item.toString() + '\n\n\n\n\n\n');
                })
            }
        }))
    })
})