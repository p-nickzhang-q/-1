// 依你对 作用域 的理解，将下面这段代码插入上述代码里，使得代码的输出为 a: 1,  
// b: 8,c: 6。

//    console.log("a: "+a+", b: "+b+", c: "+c);

var a = 1,
    b = 2,
    c = 3;

(function firstFunction() {
    var b = 5,
        c = 6;

    (function secondFunction() {
        var b = 8;
        console.log("a: " + a + ", b: " + b + ", c: " + c);
        (function thirdFunction() {
            var a = 7,
                c = 9;

            (function fourthFunction() {
                var a = 1,
                    c = 8;

            })();
        })();
    })();
})();