/**
 * Created by ken.xu on 14-1-6.
 */

function List() {


    var self = $.observable(this),
        items = [],
        pages=[];

    self.items = items;

    self.get = function(cb) {
        beginLoad();
        if('undefined'!==typeof items[G.action]){
            cb(items[G.action])
        }else{
            DB().get(function(data){
                pages[G.action]=('undefined'!==typeof pages[G.action])?pages[G.action]++:1;
                items[G.action] = data;
                cb(data);
            })
        }
    }

    self.pull = function(){
        beginLoad();
        DB(pages[G.action]).get(function(data){
            pages[G.action]++;
            //items[G.action] = data;
            $.each(data,function(k,v){
                items[G.action].push(v);
            })
            self.trigger("pull", items[G.action]);
        })
    }

    var beginLoad = function(){
        $('#popwindow').show();
        $('#popbox').show();
    }
}




