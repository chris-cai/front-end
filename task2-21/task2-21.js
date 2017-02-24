
window.onload = function(){

    var Queue = {
        data:[],

        pushData:function(item){
            item = this.handleDataItem(item);
            if(item.length===0){
                return false;
            }

            this.data.push(item);
            this.unique();
            this.renderData();
        },
        handleDataItem:function(item){
            var itemArray = item.split(/[,\n\s]+/);
            return itemArray.length>0 ? itemArray[0] : '';
        },
        unique:function(){
            this.data = this.data.filter(function(item,index){
                return this.data.indexOf(item)===index;
            }.bind(this));
            if(this.data.length>5){
                this.data.shift();
            }
        },
        renderData:function(){
            $('list').innerHTML = this.data.map(function(item){
                return '<li data-item='+item+'>'+item+'</li>';
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

    delegateEvent($('list'),'li','mouseover',function(e){
        e.target.innerHTML = '点击删除'+e.target.getAttribute('data-item');
        // e.target.style.backgroundColor = '#f00';
        // e.target.style.color = '#fff';
        e.target.className = 'btn-danger';
    });

    delegateEvent($('list'),'li','mouseout',function(e){
        e.target.innerHTML = e.target.getAttribute('data-item');
        e.target.className = '';
    });

    delegateEvent($('list'),'li','click',function(e){
        $('list').removeChild(e.target);
    });


}