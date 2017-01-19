/**
 * Created by Chris Cai on 2017/1/18.
 */

var $ = function (id) {
    return document.getElementById(id);
}

function addEvent(element,event,handle){
    if(element.addEventListener){
        element.addEventListener(event,handle,false);
    }
    else if(element.attachEvent){
        element.attachEvent('on'+event,handle);
    }
    else{
        element['on'+event] = handle;
    }
}

function trim(s){
    return s.replace(/^\s+|\s+$/g,'');
}

function delegateEvent(element,tag,eventName,listener){
    element.addEventListener(eventName,function(e){
        var e = e || window.event;
        var target = e.target || e.srcElement;
        if(target && target.tagName === tag.toUpperCase()){
            listener.call(target,e);
        }

    })
}