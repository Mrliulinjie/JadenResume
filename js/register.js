~function () {
    var frNav = getDom.getID("frnav");
    var menuList = utils.getElementsByClass("menu-bd", frNav);
    [].myForEach.call(menuList, function (item) {
        utils.hide(item);
    });
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
    };

}();