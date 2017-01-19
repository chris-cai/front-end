
window.onload = function(){

    var Queue = {
        data:[],

        pushData:function(item){
            item = this.handleDataItem(item);
            if(item.length===0){
                return false;
            }

            this.data.push(item);
            console.log(item);
            console.log(this.data);
            this.renderData();

        },
        handleDataItem:function(item){
            var itemArray = item.split(/[,\n\s]+/);
            return itemArray.length>0 ? itemArray[0] : '';
        },
        renderData:function(){
            $('list').innerHTML = this.data.map(function(item){
                return '<li>'+item+'</li>';
            }).join('');
        }

    };

    $('form').onsubmit = function(e){
        e.preventDefault();
    }

    addEvent($('tag'),'keyup',function(e){
        if(e.keyCode===13||e.keyCode===32||e.keyCode===188){
            var value = trim($('tag').value);
            if(value==''){
                return false;
            }
            Queue.pushData(value);
        }
    });

}