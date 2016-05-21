~function () {
    function lindear(t, b, c, d) {
        return c * t / d + b;
    }

    function move(curEle, target, duration, callback) {
        clearInterval(curEle.timer);
        var begin = {}, change = {};
        for (var key in target) {
            if (target.hasOwnProperty((key))) {
                begin[key] = utils.css(curEle, key);
                change[key] = target[key] - begin[key];
            }
        }
        var temp = null;
        curEle.timer = setInterval(function () {
            temp += 10;
            if (temp >= duration) {
                utils.css(curEle, target);
                clearInterval(curEle.timer);
                callback && callback.call(curEle);
                return;
            }
            for (var key in target) {
                var cur = lindear(temp, begin[key], change[key], duration);
                utils.css(curEle, key, cur);
            }
        }, 10);
    }

    window.bannerMove = move;
}();