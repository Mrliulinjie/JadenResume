~function () {
    var slider_content = getDom.getClassName("slider-content")[0];
    var slider_pannel = getDom.getClassName("slider-pannel");
    var slider_nav = getDom.getClassName("slider-nav")[0];
    var sliderliList = getDom.getTagName("li", slider_nav);

    //setTimeout(lazyImg, 1000);
    //function lazyImg() {
    //    for (var i = 0, len = imglist.length; i < len; i++) {
    //        ~function (i) {
    //            var curImg = imglist[i];
    //            var oimg = new Image;
    //            oimg.src = curImg.getAttribute("trueImg");
    //            oimg.onload = function () {
    //                curImg.src = this.src;
    //                utils.css(curImg, "display", "block");
    //                if (i == 0) {
    //                    utils.css(curImg.parentNode, {
    //                        "z-index": "1",
    //                    });
    //                    bannerMove(curImg.parentNode, {opacity: 1}, 200);
    //                }
    //                oimg = null;
    //            }
    //        }(i);
    //    }
    //}

    var Interval = 3000, autoTimer = null, step = 0;
    autoTimer = setInterval(autoMove, Interval);

    function autoMove() {
        if (step == slider_pannel.length - 1) {
            step = -1;
        }
        step++;
        setMove();
    }

    function setMove() {
        for (var i = 0, len = slider_pannel.length; i < len; i++) {
            var curDiv = slider_pannel[i];
            if (i == step) {
                utils.css(curDiv, {
                    "z-index": "1",
                    "display": "block"
                });
                bannerMove(curDiv, {opacity: 1}, 800, function () {
                    var silings = utils.siblings(this);
                    for (var k = 0, len = silings.length; k < len; k++) {
                        utils.css(silings[k], {
                            "z-index": "0",
                            opacity: 0,
                            "display": "none"
                        });
                    }
                });
            }
            i == step ? utils.addClass(sliderliList[i], "selected") : utils.removeClass(sliderliList[i], "selected");
        }
    }

    slider_content.onmousemove = function () {
        clearInterval(autoTimer);
    }
    slider_content.onmouseout = function () {
        autoTimer = setInterval(autoMove, Interval);
    }
    ~function () {
        for (var i = 0, len = sliderliList.length; i < len; i++) {
            var curLi = sliderliList[i];
            curLi.index = i;
            curLi.onclick = function () {
                step = this.index;
                setMove();
            }
        }
    }();
}();