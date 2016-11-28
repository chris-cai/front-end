/**
 * Created by Chris Cai on 2016/11/24.
 */
/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
};

//时间粒度对应的柱状图宽度
var width = {
    day:10,
    week:40,
    month:200
};

/**
 * 渲染图表
 */
function renderChart() {
    var divs = '',
        nowHeight = 0;
    for(var i in chartData){
        divs += '<div style="background-color: \#'+randomColor()+';width:'+width[pageState.nowGraTime]+'px;height: '+chartData[i]+'px;float: left;margin: 1px;" title="'+'日期：'+i+' 值：'+chartData[i]+'"></div>';
        if(chartData[i] > nowHeight){
            nowHeight = chartData[i];
        }
    }
    var wrap = document.getElementsByClassName('aqi-chart-wrap')[0];
    //设置外层高度
    wrap.style.height = (nowHeight + 20) + 'px';
    wrap.innerHTML = divs;
    //console.log(document.getElementsByClassName('aqi-chart-wrap')[0].childNodes.length);
    chartData = {};
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    // 确定是否选项发生了变化
    var radios = document.getElementsByName("gra-time");
    for(var i=0,len=radios.length; i<len; i++){
        if(radios[i].checked){
            if(radios[i].value === pageState.nowGraTime){
                alert('没有切换radio');
                return ;
            }
            pageState.nowGraTime = radios[i].value;
            break;
        }
    }
    // 设置对应数据
    handleData();
    // 调用图表渲染函数
    renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化
    var options = $("city-select").options;
    for(var i=0,len=options.length; i<len; i++ ){
        if(options[i].selected){
            if(options[i].value === pageState.nowSelectCity){
                alert('没有切换select');
                return ;
            }
            pageState.nowSelectCity = i-1;//兼容北京index -1开始计数
            break;
        }
    }
    // 设置对应数据
    handleData();
    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    $("form-gra-time").addEventListener('click',function(event){
        if(event.target.nodeName.toLowerCase() === 'input'){
            graTimeChange();
        }
    });
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var options = '';
    for(var i in aqiSourceData){
        options += '<option>' + i + '</option>';
    }
    $("city-select").innerHTML = options;
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    $("city-select").addEventListener('change',function(){
        citySelectChange();
    });
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    handleData();
    renderChart();
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();//注册事件
    initCitySelector();//注册事件
    initAqiChartData();//处理数据并显示初始数据
}

window.onload = init();

function $(id){
    return document.getElementById(id);
}

function handleData(){
    var options = $("city-select").options;
    switch (pageState.nowGraTime){
        case 'day':
            chartData = aqiSourceData[options[pageState.nowSelectCity+1].value];
            break;
        case 'week':
            chartData = generateWeekData(aqiSourceData[options[pageState.nowSelectCity+1].value]);
            break;
        case 'month':
            chartData = generateMonthData(aqiSourceData[options[pageState.nowSelectCity+1].value]);
            break;
        default :
            chartData = {};
            break;

    }
}

function generateWeekData(cityData){
    var data={},
        count = 0,
        sum = 0,
        week = 0;
    for(var i in cityData){
        sum += cityData[i];
        count++;
        if(count===7){
            week++;
            var avg = Math.floor(sum/count);
            data['week'+week] = avg;
            sum = 0;
            count = 0;
        }
    }
    return data;
}

function generateMonthData(cityData){
    var data={},
        count = 0,
        sum = 0,
        now = 0,
        month = 0;
    for(var i in cityData){
        sum += cityData[i];
        count++;
        var date = new Date(i);
        //当前月份与上个日期月份是否相等
        if(date.getMonth()!==now || count===31){//hack 31
            var avg = Math.floor(sum/count);
            month++;
            data['month'+month] = avg;
            count = 0;
            sum = 0;
        }
        now = date.getMonth();
    }
    return data;
}

/**
 * 随机生成16进制颜色
 */
function randomColor() {
    var color = Math.floor(Math.random() * 0xFFFFFF).toString(16);
    return ((color.length === 6) ? color : arguments.callee());
}