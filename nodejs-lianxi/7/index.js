const https = require('https');

https.get("https://detail.tmall.com/item.htm?id=552453937539&price=305-1984&price=305-1984&sourceType=item&sourceType=item&sourceType=item&sourceType=item&suid=d9534d82-cb84-4679-8abc-b0d7bb1e10d8&suid=d9534d82-cb84-4679-8abc-b0d7bb1e10d8&ut_sk=1.V3WygSG0szoDAAAYdzmkzDcv_21646297_1557212916177.TaoPassword-WeiXin.1&ut_sk=1.V3WygSG0szoDAAAYdzmkzDcv_21646297_1557212916177.TaoPassword-WeiXin.1&un=b50ac00b17762ff52040bd82ddc2e1ea&un=b50ac00b17762ff52040bd82ddc2e1ea&share_crt_v=1&share_crt_v=1&sp_tk=77%20lQ0ZINlkxbU91Vljvv6U=&sp_tk=77%20lQ0ZINlkxbU91Vljvv6U=&cpp=1&cpp=1&shareurl=true&shareurl=true&spm=a313p.22.1tn.1031293121803&spm=a313p.22.1tn.1031293121803&short_name=h.eXWmlhO&short_name=h.eXWmlhO&app=chrome&app=chrome&skuId=3550111774258", res => {
    var result = '';
    res.on("data", data => {
        result += data;
    })

    res.on("end", () => {
        console.log(result);
    })
})