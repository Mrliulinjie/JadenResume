~function () {
    var wHeight = getDom.getHeight();
    var J_ASTotalContainer = getDom.getID("J_ASTotalContainer"), as_shelter = getDom.getClassName("as-shelter")[0];//顶部搜索框
    var mui_mbar = getDom.getClassName("mui-mbar-status-standard")[0];
    var mui_tabs = getDom.getClassName("mui-mbar-tabs-narrow")[0];
    var mui_mask = getDom.getClassName("mui-mbar-tabs-mask")[0];
    var J_FpLift = getDom.getID("J_FpLift");//左侧滚动条
    var hot_brand = getDom.getClassName("j_newHotBrandBody")[0];

    //utils.hide(J_ASTotalContainer);
    //utils.hide(as_shelter);
    setHeight();
    /*设置右侧导航高度*/
    function setHeight() {
        utils.css(mui_mbar, "height", wHeight);
        utils.css(mui_tabs, "height", wHeight);
        utils.css(mui_mask, "height", wHeight);
    }

    window.onscroll = function () {
        var scrollT = utils.win("scrollTop");
        var offsetBody = utils.offset(hot_brand).offsetTop;
        console.log(scrollT, offsetBody)
        scrollT > offsetBody - 350 ? utils.show(J_FpLift) : utils.hide(J_FpLift);
        if (scrollT > offsetBody) {
            utils.addClass(as_shelter, "show");
            utils.addClass(J_ASTotalContainer, "show");
        }
        else {
            utils.removeClass(as_shelter, "show");
            utils.removeClass(J_ASTotalContainer, "show");
        }
        setHeight();
    }
}();

/*处理顶部导航*/
~function () {
    var frNav = getDom.getID("frnav");
    var menuList = utils.getElementsByClass("menu-bd", frNav);

    var categoryContent = getDom.getID("j_categoryContent");
    var tab_content = getDom.getID("tab_content");

    var tab_lilist = getDom.getTagName("li", tab_content);
    var CategoryPannel = getDom.getClassName("j_CategoryMenuPannel", categoryContent);

    document.body.onmouseover = function (e) {
        e = utils.disposeEvent(e);
        var cureTar = e.target;
        /*处理menu-bd显示隐藏*/
        var parents = utils.parents(cureTar, "sn-menu");
        if (parents.length > 0) {
            var menu_bd = utils.getElementsByClass("menu-bd", parents[0]);
            utils.css(menu_bd[0], {
                "display": "block",
                top: "32px"
            });
            return;
        }
        [].myForEach.call(menuList, function (item) {
            utils.hide(item);
        });
        /*处理子菜单显示隐藏*/
        [].myForEach.call(CategoryPannel, function (item, index) {
            utils.removeClass(tab_lilist[index], "selected");
            utils.hide(item);
        });
        var category = utils.parents(cureTar, "category-loaded");
        var pannelParents = utils.parents(cureTar, "j_CategoryMenuPannel");
        var hasCategory = utils.hasClass(cureTar, "category-loaded") || utils.hasClass(cureTar, "j_CategoryMenuPannel");
        if (category.length > 0 || pannelParents.length > 0 || hasCategory) {
            var index = category.length > 0 ? utils.index(category[0]) : (pannelParents.length > 0 ? utils.index(pannelParents[0]) : (hasCategory ? utils.index(cureTar) : null));
            utils.show(CategoryPannel[index]);
            utils.addClass(tab_lilist[index], "selected");
            return;
        }
    };
    [].myForEach.call(menuList, function (item) {
        utils.hide(item);
    });
    [].myForEach.call(menuList, function (item) {
        utils.hide(item);
    });
    /*处理左侧菜单导航*/
    var str = "";
    [].myForEach.call(tab_lilist, function (item, index) {
        //if (index == 0) return;
        str += " <div class='pannel-con j_CategoryMenuPannel' style='display: none'>";
        str += "<div class='pannel-" + index + "'>";
        str += '<div class="hot-word-con">';

        str += htmlStr();

        str += "</div>";

        str += '<div class="sub-logo-con">';
        str += '<div>';
        str += '<a class="logo" href="#"><img src="img/nav-category/TB1.jpg"></a>';
        str += '<a class="logo" href="#"><img src="img/nav-category/TB2.jpg"></a>';
        str += '<a class="logo" href="#"><img src="img/nav-category/TB3.jpg"></a>';
        str += '<a class="logo" href="#"><img src="img/nav-category/TB4.jpg"></a>';
        str += '<a class="logo" href="#"><img src="img/nav-category/TB5.jpg"></a>';
        str += '<a class="logo" href="#"><img src="img/nav-category/TB6.jpg"></a>';
        str += '<a class="logo" href="#"><img src="img/nav-category/TB7.jpg"></a>';
        str += '<a class="logo" href="#"><img src="img/nav-category/TB8.jpg"></a>';
        str += '<a class="logo" href="#"><img src="img/nav-category/TB9.jpg"></a>';
        str += '<a class="logo" href="#"><img src="img/nav-category/TB10.jpg"></a>';
        str += '<a class="logo" href="#"><img src="img/nav-category/TB11.jpg"></a>';
        str += '<a class="logo" href="#"><img src="img/nav-category/TB12.jpg"></a>';
        str += '<a class="logo" href="#"><img src="img/nav-category/TB13.jpg"></a>';
        str += '<a class="logo" href="#"><img src="img/nav-category/TB14.jpg"></a>';
        str += '<a class="logo" href="#"><img src="img/nav-category/TB15.jpg"></a>';
        str += '<a class="logo" href="#"><img src="img/nav-category/TB16.jpg"></a>';
        str += '</div>';
        str += '<div>';
        str += '<a class="activity clearfix" href="#"><img src="img/nav-category/TB17.jpg">' +
            '<div class="title"></div><div class="sub-title"></div></a>';
        str += "</div>";
        str += "</div>";
        str += "</div>";
        str += "</div>";
    }, tab_lilist);
    categoryContent.innerHTML += str;
}();

function htmlStr() {
    var str = "";
    str += '<div class="hot-word-line">';
    str += '<div class="line-title"><div class="title-text">当季流行</div><i class="iconfont"></i></div>';
    str += '<div class="line-con"><a class="hot-word highlight" href="#">女士新品</a>' +
        '<a class="hot-word" href="#">短袖T恤</a>' +
        '<a class="hot-word highlight" href="#">时尚套装</a>' +
        '<a class="hot-word" href="#">女装商场同款</a>' +
        '<a class="hot-word" href="#">内衣春季新品</a>' +
        '<a class="hot-word highlight" href="#">内衣商场同款</a>' +
        '<a class="hot-word" href="#">睡衣套装</a>' +
        '<a class="hot-word highlight" href="#">情侣家居服</a>' +
        '<a class="hot-word" href="#">丝袜</a>' +
        '<div class="seprate"></div>' +
        ' </div>';
    str += "</div>";

    str += '<div class="hot-word-line">';
    str += '<div class="line-title"><div class="title-text">精选上装</div><i class="iconfont"></i></div>';
    str += '<div class="line-con"><a class="hot-word highlight" href="#">T恤</a>' +
        '<a class="hot-word" href="#">衬衫</a>' +
        '<a class="hot-word highlight" href="#">雪纺衫</a>' +
        '<a class="hot-word" href="#">针织衫</a>' +
        '<a class="hot-word" href="#">短外套</a>' +
        '<a class="hot-word highlight" href="#">吊带背心</a>' +
        ' <a class="hot-word" href="#">卫衣</a>' +
        '<a class="hot-word highlight" href="#">小西装</a>' +
        '<a class="hot-word" href="#">风衣</a>' +
        '<div class="seprate"></div>' +
        ' </div>';
    str += "</div>";

    str += '<div class="hot-word-line">';
    str += '<div class="line-title"><div class="title-text">浪漫裙装</div><i class="iconfont"></i></div>';
    str += '<div class="line-con"><a class="hot-word highlight" href="#">连衣裙</a>' +
        '<a class="hot-word" href="#">蕾丝连衣裙</a>' +
        '<a class="hot-word highlight" href="#">印花连衣裙</a>' +
        '<a class="hot-word" href="#">真丝连衣裙</a>' +
        '<a class="hot-word" href="#">半身裙</a>' +
        '<a class="hot-word highlight" href="#">百褶裙</a>' +
        '<a class="hot-word" href="#">牛仔裙</a>' +
        '<a class="hot-word highlight" href="#">背心裙</a>' +
        '<a class="hot-word" href="#">a字裙</a>' +
        '<a class="hot-word" href="#">棉麻连衣裙</a>' +
        '<a class="hot-word" href="#">包臀裙</a>' +

        '<div class="seprate"></div>' +
        ' </div>';
    str += "</div>";

    str += '<div class="hot-word-line">';
    str += '<div class="line-title"><div class="title-text">女士下装</div><i class="iconfont"></i></div>';
    str += '<div class="line-con"><a class="hot-word highlight" href="#">休闲裤</a>' +
        '<a class="hot-word" href="#">牛仔裤</a>' +
        '<a class="hot-word highlight" href="#">打底裤</a>' +
        '<a class="hot-word" href="#">短裤</a>' +
        '<a class="hot-word" href="#">哈伦裤</a>' +
        '<a class="hot-word highlight" href="#">背带裤</a>' +
        '<a class="hot-word" href="#">小脚裤</a>' +
        '<a class="hot-word highlight" href="#">西装裤</a>' +
        '<a class="hot-word" href="#">阔腿裤</a>' +
        '<div class="seprate"></div>' +
        ' </div>';
    str += "</div>";

    str += '<div class="hot-word-line">';
    str += '<div class="line-title"><div class="title-text">特色女装</div><i class="iconfont"></i></div>';
    str += '<div class="line-con"><a class="hot-word highlight" href="#">时尚气质套装</a>' +
        '<a class="hot-word" href="#">休闲运动套装</a>' +
        '<a class="hot-word highlight" href="#">妈妈装</a>' +
        '<a class="hot-word" href="#">大码女装</a>' +
        '<a class="hot-word" href="#">职业套装</a>' +
        '<a class="hot-word highlight" href="#">旗袍</a>' +
        '<a class="hot-word" href="#">礼服</a>' +
        '<a class="hot-word highlight" href="#">婚纱</a>' +
        '<a class="hot-word" href="#">唐装</a>' +
        '<div class="seprate"></div>' +
        ' </div>';
    str += "</div>";

    str += '<div class="hot-word-line">';
    str += '<div class="line-title"><div class="title-text">文胸塑身</div><i class="iconfont"></i></div>';
    str += '<div class="line-con"><a class="hot-word highlight" href="#">聚拢文胸</a>' +
        '<a class="hot-word" href="#">运动文胸</a>' +
        '<a class="hot-word highlight" href="#">性感蕾丝</a>' +
        '<a class="hot-word" href="#">无钢圈</a>' +
        '<a class="hot-word" href="#">塑身上衣</a>' +
        '<a class="hot-word highlight" href="#">塑身连体衣</a>' +
        '<div class="seprate"></div>' +
        ' </div>';
    str += "</div>";

    str += '<div class="hot-word-line">';
    str += '<div class="line-title"><div class="title-text">家居服</div><i class="iconfont"></i></div>';
    str += '<div class="line-con"><a class="hot-word highlight" href="#">睡衣</a>' +
        '<a class="hot-word" href="#">少女家居服</a>' +
        '<a class="hot-word highlight" href="#">睡袍</a>' +
        '<a class="hot-word" href="#">居家套装</a>' +
        '<a class="hot-word" href="#">全棉睡衣</a>' +
        '<a class="hot-word highlight" href="#">情侣家居服</a>' +
        '<a class="hot-word" href="#">真丝家居服</a>' +
        '<div class="seprate"></div>' +
        ' </div>';
    str += "</div>";

    str += '<div class="hot-word-line">';
    str += '<div class="line-title"><div class="title-text">内裤背心</div><i class="iconfont"></i></div>';
    str += '<div class="line-con"><a class="hot-word highlight" href="#">男士内裤</a>' +
        '<a class="hot-word" href="#">女士内裤</a>' +
        '<a class="hot-word highlight" href="#">莫代尔内裤</a>' +
        '<a class="hot-word" href="#">无痕短裤</a>' +
        '<a class="hot-word" href="#">蕾丝内裤</a>' +
        '<a class="hot-word highlight" href="#">吊带背心</a>' +
        '<a class="hot-word" href="#">男士背心</a>' +
        '<div class="seprate"></div>' +
        ' </div>';
    str += "</div>";

    str += '<div class="hot-word-line">';
    str += '<div class="line-title"><div class="title-text">袜类</div><i class="iconfont"></i></div>';
    str += '<div class="line-con"><a class="hot-word highlight" href="#">棉袜</a>' +
        '<a class="hot-word" href="#">丝袜</a>' +
        '<a class="hot-word highlight" href="#">男士短袜</a>' +
        '<a class="hot-word" href="#">日式袜子</a>' +
        '<a class="hot-word" href="#">隐形船袜</a>' +
        '<a class="hot-word highlight" href="#">连裤袜</a>' +
        '<a class="hot-word" href="#">瘦身袜</a>' +
        '<div class="seprate"></div>' +
        ' </div>';
    str += "</div>";

    return str;
}
