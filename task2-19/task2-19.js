/**
 * Created by Chris Cai on 2017/1/18.
 */

window.onload = function(){

    var reg = /^([1-9]|([1-9]\d)|100)$/;

    // var reg = /^(([1-9]\d)|100)$/;

    var Queue = {

        items:[11,65,54,43,32],

        leftIn:function(value){
            if(!this.isFull()){
                this.items.unshift(value);
                this.renderItems();
            }else{
                console.log('full');
            }
        },
        leftOut:function(){
            if(!this.isEmpty()){
                this.items.shift();
                this.renderItems();
            }else{
                console.log('empty items');
            }
        },
        rightIn:function(value){
            if(!this.isFull()){
                this.items.push(value);
                this.renderItems();
            }else{
                console.log('full');
            }

        },
        rightOut:function(){
            if(!this.isEmpty()){
                this.items.pop();
                this.renderItems();
            }else{
                console.log('empty items');
            }
        },
        isFull:function(){
            return this.items.length >= 10;
        },
        isEmpty:function(){
          return this.items.length === 0;
        },
        renderItems:function(){
            $('graph').innerHTML = this.items.map(function(item,i){
                return '<span style="height: '+item+'px;" data-value='+i+'></span>';
            }).join('');
        },
        delItem:function(index){
            this.items.splice(index,1);
        },
        bubbleSort:function(){
            // for(var i=0,len=this.items.length;i<len-1;i++){
            //     for(var j=i+1;j<len;j++){
            //         var old = this.items;
            //         if(this.items[j]<this.items[i]){
            //             var temp = this.items[i];
            //             this.items[i] = this.items[j];
            //             this.items[j] = temp;
            //         }
            //         if(old!=this.items){
            //             this.renderItems();
            //         }
            //         console.log(i+'/'+j);
            //         console.log(this.items);
            //     }
            // }

            var i=0,j=1,data=this.items,len=this.items.length,temp,timer=null;

            timer = setInterval(show.bind(this),100);

            function show(){
                console.log(this.items)
                if(i<len-1){
                    if(j<len){
                        if(data[i]>data[j]){
                            temp = data[i];
                            data[i] = data[j];
                            data[j] = temp;
                            this.renderItems();
                        }
                        j++;
                    }else{
                        i++;
                        j = i+1;
                    }
                }else{
                    clearInterval(timer);
                    return;
                }
            }
        }

    };

    addEvent($('left-in'),'click',function(){
        var value = $('num').value;
        if(reg.test(trim(value))){
            Queue.leftIn(parseInt(value));
        }else{
            console.log('format error');
        }
    });
    addEvent($('right-in'),'click',function(){
        var value = $('num').value;
        if(reg.test(trim(value))){
            Queue.rightIn(parseInt(value));
        }else{
            console.log('format error');
        }
    });
    addEvent($('left-out'),'click',function(){Queue.leftOut()});
    addEvent($('right-out'),'click',function(){Queue.rightOut()});

    addEvent($('bubble'),'click',function(){Queue.bubbleSort()});

    delegateEvent($('graph'),'span','click',function(event){
        var v = event.target.getAttribute('data-value');
        Queue.delItem(v);
        Queue.renderItems();
    });

    Queue.renderItems();


    // var arr = [3,23,45,13,11,44,2,46];
    //
    // for(var i=0; i<arr.length;i++){
    //     for(var j=i;j<arr.length-1;j++){
    //         if(arr[i]>arr[j]){
    //             var temp = arr[i];
    //             arr[i] = arr[j];
    //             arr[j] = temp;
    //         }
    //     }
    // }
    // console.log(arr);
    
}


