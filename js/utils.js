var utils = (function () {
    var flag = "getComputedStyle" in window;
    //->listToArray:把类数组集合转换为数组
    function listToArray(classAry) {
        var ary = [];
        if (flag) {
            return ary.slice.call(classAry);
        }
        for (var i = 0, len = classAry.length; i < len; i++) {
            ary.push(classAry[i]);
        }
        return ary;

    }

    //->formatJSON:把JSON格式字符串转换为JSON格式对象
    function formatJSON(jsonStr) {
        return "JSON" in window ? JSON.parse(jsonStr) : eval("(" + jsonStr + ")");
    }

    //->win:操作浏览器的盒子模型信息
    function win(attr, val) {
        if (!val) {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = val;
        document.body[attr] = val;
    }

    //->offset:获取元素距离body的偏移量
    function offset(curEle) {
        var eleLeft = curEle.offsetLeft, eleTop = curEle.offsettop, par = curEle.offsetParent;
        while (par) {
            if (!/MSIE 8/.test(navigator.userAgent)) {
                eleLeft += par.clientLeft;
                eleTop += par.clientTop;
            }
            eleLeft += par.offsetLeft;
            eleTop += par.offsetTop;
            par = par.offsetParent
        }
        return {offsetLeft: eleLeft, offsetTop: eleTop}
    }

    //->children:获取元素下的所有元素节点
    function children(curEle, tagname) {
        var ary = [];
        var isExist = tagname ? true : false;
        if (flag) {
            return ary.slice.call(curEle.children);
        }
        for (var i = 0, len = curEle.childNodes.length; i < len; i++) {
            var curNodes = curEle.childNodes[i];
            if (curNodes.nodeType == 1) {
                if (isExist) {
                    if (curNodes.nodeName.toLocaleLowerCase() == tagname.toLocaleLowerCase()) {
                        ary.push(curNodes);
                    }
                    continue;
                }
                ary.push(curNodes);
            }
        }
        return ary;
    }

    //->prev:获取元素的上一个哥哥节点
    function prev(curEle) {
        if (flag) {
            return curEle.previousElementSibling;
        }
        var pre = curEle.previousSibling;
        while (pre && pre.nodeType != 1) {
            pre = pre.previousSibling;
        }
        return pre;
    }

    //->next:获取元素的下一个节点
    function next(curEle) {
        if (flag) {
            return curEle.nextElementSibling;
        }
        var nex = curEle.nextSibling;
        while (pre && pre.nodeType != 1) {
            nex = pre.nextSibling;
        }
        return nex;
    }

    //->prevAll:获取所有的哥哥节点
    function prevAll(curEle) {
        var ary = [];
        var pre = prev(curEle);
        while (pre) {
            ary.unshift(pre);
            pre = prev(pre);
        }
        return ary;
    }

    //->nextAll:获取所有的弟弟节点
    function nextAll(curEle) {
        var ary = [];
        var nex = next(curEle);
        while (nex) {
            ary.push(nex);
            nex = next(nex);
        }
        return ary;
    }

    //->sibling:获取相邻的两个元素节点
    function sibling(curEle) {
        var ary = [];
        prev(curEle) ? ary.push(prev(curEle)) : null;
        next(curEle) ? ary.push(next(curEle)) : null;
        return ary;
    }

    //->siblings:获取所有的兄弟元素节点
    function siblings(curEle) {
        return prevAll(curEle).concat(nextAll(curEle));
    }

    //->index:获取当前元素的索引
    function index(curEle) {
        return prevAll(curEle).length;
    }

    //->firstChild:获取第一个元素子节点
    function firstChild(curEle) {
        return children(curEle).length > 0 ? children(curEle)[0] : null;
    }

    //->lastChild:获取最后一个元素子节点
    function lastChild(curEle) {
        var chs = children(curEle);
        return chs.length > 0 ? chs[chs.length - 1] : null;
    }

    //->append:向指定容器的末尾追加元素
    function append(newEle, container) {
        return container.appendChild(newEle);
    }

    //->prepend:向指定容器的开头追加元素
    //->把新的元素添加到容器中第一个子元素节点的前面,如果一个元素子节点都没有,就放在末尾即可
    function prepend(newEle, container) {
        var fir = firstChild(newEle);
        if (fir) {
            container.insertBefore(newEle, fir);
            return;
        }
        container.appendChild(newEle);
    }

    //->insertBefore:把新元素(newEle)追加到指定元素(oldEle)的前面
    function insertBefore(newEle, oldEle) {
        oldEle.parentNode.insertBefore(newEle, oldEle);
    }

    //->insertAfter:把新元素(newEle)追加到指定元素(oldEle)的后面
    //->相当于追加到oldEle弟弟元素的前面,如果弟弟不存在,也就是当前元素已经是最后一个了,我们把新的元素放在最末尾即可
    function insertAfter(newEle, oldEle) {
        var curnext = next(oldEle);
        if (curnext) {
            oldEle.parentNode.insertBefore(newEle, curnext);
            return;
        }
        oldEle.parentNode.appendChild(newEle);
    }

    //->hasClass:验证当前元素中是否包含className这个样式类名
    function hasClass(curEle, className) {
        //var reg = new RegExp("/(^| +)" + className + "( +|$)/");
        //return reg.test(curEle.className);

        var reg = new RegExp("(^| +)" + className + "( +|$)");
        return reg.test(curEle.className);
    }

    //->addClass:给元素增加样式类名
    function addClass(curEle, className) {
        var ary = className.replace(/(^ +| +$)/g, "").split(/ +/g);
        for (var i = 0; i < ary.length; i++) {
            var curclass = ary[i];
            if (!hasClass(curEle, curclass)) {
                curEle.className += " " + curclass;
            }
        }
    }

    //->removeClass:给元素移除样式类名
    function removeClass(curEle, className) {
        var ary = className.replace(/(^ +| +$)/g, "").split(/ +/g);
        for (var i = 0, len = ary.length; i < len; i++) {
            var curName = ary[i];
            if (this.hasClass(curEle, curName)) {
                var reg = new RegExp("(^| +)" + curName + "( +|$)", "g");
                curEle.className = curEle.className.replace(reg, " ");
            }
        }
    }

    //->getElementsByClass:通过元素的样式类名获取一组元素集合
    function getElementsByClass(strClass, context) {
        context = context || document;
        if (flag) {
            return listToArray(context.getElementsByClassName(strClass));
        }
        var ary = [], strClassAry = strClass.replace(/(^ +| +$)/g, "").split(/ +/g);
        var nodeList = context.getElementsByTagName("*");
        for (var i = 0, len = nodeList.length; i < len; i++) {
            var node = nodeList[i];
            var isOk = true;
            for (var k = 0; k < strClassAry.length; k++) {
                var reg = new RegExp("/(^| +)" + strClassAry[k] + "( +|$)/", "g");
                if (!reg.test(node.className)) {
                    isOk = false;
                    break;
                }
            }
            if (isOk) {
                ary.push(node);
            }
        }
        return ary;
    }


    //->getCss:获取元素的样式值
    function getCss(attr) {
        var val = null, reg = null;
        if (flag) {
            val = window.getComputedStyle(this, null)[attr];
        } else {
            if (attr === "opacity") {
                val = this.currentStyle["filter"];
                reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
                val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = this.currentStyle[attr];
            }
        }
        reg = /^(-?\d+(\.\d+)?)(px|pt|em|rem)?$/;
        return reg.test(val) ? parseFloat(val) : val;
    }

    //->setCss:给当前元素的某一个样式属性设置值(增加在行内样式上的)
    function setCss(attr, value) {
        if (attr === "float") {
            this["style"]["cssFloat"] = value;
            this["style"]["styleFloat"] = value;
            return;
        }
        if (attr === "opacity") {
            this["style"]["opacity"] = value;
            this["style"]["filter"] = "alpha(opacity=" + value * 100 + ")";
            return;
        }
        var reg = /^(width|height|top|bottom|left|right|((margin|padding)(Top|Bottom|Left|Right)?))$/;
        if (reg.test(attr)) {
            if (!isNaN(value)) {
                value += "px";
            }
        }
        this["style"][attr] = value;
    }

    //->setGroupCss:给当前元素批量的设置样式属性值
    function setGroupCss(options) {
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                setCss.call(this, key, options[key]);
            }
        }
    }

    //->css:此方法实现了获取、单独设置、批量设置元素的样式值
    function css(curEle) {
        var argTwo = arguments[1], ary = Array.prototype.slice.call(arguments, 1);
        if (typeof argTwo === "string") {
            if (typeof arguments[2] === "undefined") {
                return getCss.apply(curEle, ary);
            }
            setCss.apply(curEle, ary);
        }
        argTwo = argTwo || 0;
        if (argTwo.toString() === "[object Object]") {
            setGroupCss.apply(curEle, ary);
        }
    }

    //->show:此方法设置元素显示
    function show(elements) {
        showHide(elements, true);
    }

    //->hide:此方法设置元素的隐藏
    function hide(elements) {
        showHide(elements);
    }

    function showHide(elements, show) {
        var display;
        display = elements.style.display;
        if (show) {
            if (display === "none") {
                elements.style.display = "";
            }
        }
        else {
            if (display && display !== "none" || display == "") {
                elements.style.display = "none";
            }
        }
    }

    //->disposeEvent:此方法处理事件对象e(兼容IE)
    function disposeEvent(e) {
        e = e || window.event;
        e.target = e.target || e.srcElement;
        e.pageX = e.pageX || ((document.documentElement.scrollLeft || document.body.scrollLeft) + e.clientX);
        e.pageY = e.pageY || ((document.documentElement.scrollTop || document.body.scrollTop) + e.clientY);
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
        return e;
    }

    //->parents:此方法获取唯一父元素的元素节点
    function parent(elem) {
        var parent = elem.parentNode;
        return parent && parent.nodeType !== 11 ? parent : null;
    }


    //->parents:此方法获取元素的所有父亲节点
    function parents(elem, className) {
        var parents = parent(elem);
        var ary = [];
        while (parents) {
            if (!parents.tagName) break;
            if (className) {
                hasClass(parents, className) ? ary.push(parents) : null;
                parents = parent(parents);
                continue;
            }
            ary.push(parents);
            parents = parent(parents);
        }
        return ary;
    }

    return {
        listToArray: listToArray,
        formatJSON: formatJSON,
        win: win,
        offset: offset,
        children: children,
        prev: prev,
        next: next,
        prevAll: prevAll,
        nextAll: nextAll,
        parent: parent,
        parents: parents,
        sibling: sibling,
        siblings: siblings,
        index: index,
        firstChild: firstChild,
        lastChild: lastChild,
        append: append,
        prepend: prepend,
        insertBefore: insertBefore,
        insertAfter: insertAfter,
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        getElementsByClass: getElementsByClass,
        css: css,
        show: show,
        hide: hide,
        disposeEvent: disposeEvent
    };
})();

var getDom = (function () {
    return {
        getID: function (ID) {
            if (ID) {
                return document.getElementById(ID);
            }
            return null;
        },
        getTagName: function (tab, context) {
            context = context || document;

            return context.getElementsByTagName(tab);
        },
        getClassName: function (className, context) {
            context = context || document;
            return context.getElementsByClassName(className);
        },
        getName: function (Name) {
            if (Name) {
                return document.getElementsByName(Name);
            }
            return null;
        },
        getWidth: function () {
            return document.documentElement.clientWidth || document.body.clientWidth;
        },
        getHeight: function () {
            return document.documentElement.clientHeight || document.body.clientHeight;
        }
    }
})();

Array.prototype.myForEach = function myForEach(callBack, context) {
    context = context || window;
    //if ("forEach" in Array.prototype) {
    //    this.forEach(callBack, context);
    //    return;
    //}
    //IE6~8下自己编写回调执行的逻辑
    for (var i = 0, len = this.length; i < len; i++) {
        callBack && callBack.call(context, this[i], i, this);
    }
};