
var mbRoute ={

        path:function(url,tile,json){
            tile = tile||0;
            json = json||0;
            G.hash = (G.hash!='')?G.hash:'';
            var path = (G.html5!==false)?'/'+url:'#'+G.hash+'/'+url;
            history.pushState(json,tile,path);
        },

        replace:function(url,tile,json){
            tile = tile||0;
            json = json||0;
            G.hash = (G.hash!='')?G.hash:'';
            var path = (G.html5!==false)?'/'+url:'#'+G.hash+'/'+url;
            history.replaceState(json,tile,path);
        },

        action:function(hash){
            var sp = hash.split('/');
            var actions = new Array();
            if(sp.length>0&&sp[0]!=''){
                actions = sp;
                actions.splice(0,1);

            }else{
                actions.push(G.action);
            }
            return actions;
        },

        hash:function(){
            return '#'+G.hash+'/'+G.action;
        }

}
