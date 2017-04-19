/**
 * Created by Chris Cai on 2017/2/25.
 */


/***
 *
 * 参照bootStrap 浮出设计
 *
 *
 * */
var FloatLayer = function(element) {
    this.ele = element;
    this.visible = false;
    this.maskEle = null;
    this.animateTime = 600;

    this.init();
}

FloatLayer.prototype = {
    show: function() {
        this.visible = true;
        this.ele.style.transform = 'translate(-50%, -50%) scale(1,1)';
        this.maskEle.style.visibility = 'visible';
        this.ele.style.left = '50%';
        this.ele.style.top = '50%';
    },

    hide: function() {
        this.visible = false;
        this.ele.style.transform = 'translate(-50%, -50%) scale(0,0)';
        var self = this;
        setTimeout(function() {
            self.maskEle.style.visibility = 'hidden';
        }, this.animateTime - 10)
    },

    init: function() {
        this.maskEle = document.createElement('div');
        this.maskEle.style.width = document.documentElement.scrollWidth + 'px';
        this.maskEle.style.height = document.documentElement.scrollHeight + 'px';
        this.maskEle.style.backgroundColor = 'rgba(108,108,108,0.7)';
        this.maskEle.style.position = 'absolute';

        this.ele.style.position = 'absolute';
        this.ele.style.left = '50%';
        this.ele.style.top = '50%';
        this.ele.style.width = this.ele.offsetWidth + 'px';
        //this.ele.style.transform = 'translate(-50%, -50%) scale(0,0)';
        //this.ele.style.transition = this.animateTime + 'ms transform';

        this.ele.parentNode.removeChild(this.ele);
        this.maskEle.appendChild(this.ele);
        document.body.appendChild(this.maskEle);

        var self = this;
        addEvent(this.maskEle, 'click', function(e) {
            if (self.maskEle === this) {
                self.hide();
            }
        })

        addEvent(this.ele, 'click', function(e) {
            e.stopPropagation();
        })

        this.setDragNode(this.ele.children[0]);
    },

    setDragNode: function(node) {
        var preX, preY;
        var self = this;

        node.style.cursor = 'move';

        addEvent(node, 'mousedown', function(event) {
            var disX = event.clientX - self.ele.offsetLeft,
                disY = event.clientY - self.ele.offsetTop;

            var move = function(event) {
                self.ele.style.left = event.clientX - disX + "px";
                self.ele.style.top = event.clientY - disY + "px";
            };

            // addEvent(document, 'mousemove', move)
            // addEvent(document, 'mouseup', function() {
            //     removeEvent(document, 'mousemove', move);
            // })
            document.onmousemove = move;
            document.onmouseup = function(){
                document.onmousemove = null;
                document.onmouseup = null;
            }
        });
    }
};


function createFloatLayer(ele) {
    return new FloatLayer(ele);
}

// 兼容的事件方法
function addEvent(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent('on' + event, hanlder);
    } else {
        ele['on' + event] = hanlder;
    }
}