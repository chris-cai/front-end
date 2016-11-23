/**
 * Created by Chris Cai on 2016/11/22.
 */
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var name = $("aqi-city-input").value.trim(),
        val = $("aqi-value-input").value.trim();
    if(!isCnOrEnChar(name)){
        alert('请输入中英文城市名');
        return ;
    }
    if(!/^\d+$/.test(val)){
        alert('空气指数只能为整数');
        return ;
    }
    aqiData[name] = val;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var li = '<tr><th>城市</th><th>空气质量</th><th>操作</th></tr>';
    for(var name in aqiData){
        li += '<tr><td>'+name+'</td><td>'+aqiData[name]+'</td><td><button>删除</button></td></tr>';
    }
    $("aqi-table").innerHTML = name ? li : '';
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(name) {
    //console.log(name);
    // do sth.
    delete aqiData[name];
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    $("add-btn").addEventListener('click',addBtnHandle);
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    $("aqi-table").addEventListener("click", function(event){
        console.log(event.target);
        //if(event.target.nodeName.toLowerCase() === 'button') delBtnHandle.call(null, event.target.parentNode.parentNode.firstChild.innerHTML);
        if(event.target.nodeName.toLowerCase() === 'button') delBtnHandle(event.target.parentNode.parentNode.firstChild.innerHTML);
    });
}

window.onload = init;

function $(id){
    return document.getElementById(id);
}

function extend(target,options){
    for(var name in options){
        target[name] = options[name];
    }
    return target;
}

// http://www.cnblogs.com/ChengDong/articles/3771880.html
//是否含有中文（也包含日文和韩文） 及字母
// RegExp for Chinese or English
function isCnOrEnChar(str) {
    var reg = /^[A-Za-z\u4E00-\u9FA5\uF900-\uFA2D]+$/;
    return reg.test(str);
}