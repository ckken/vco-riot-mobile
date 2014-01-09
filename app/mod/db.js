function DB(pages) {
    var api = function(){
        pages = ('undefined'!==typeof pages)?pages:0;
        //return 'http://www.hongyuecn.net/?g=mobile&m=api&a='+G.action+'&page='+pages;
		return 'data/'+G.action+'.json?page='+pages;
    }
    return {
        get: function(cb) {
            $.getJSON(api(G.action),function(data){
                cb(data);
            })
        },
        put: function(data) {
            window.store[G.action] = data;
        }
    }
}