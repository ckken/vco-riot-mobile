/**
 * Created by ken.xu on 14-1-6.
 */

(function(List,G,bouncefix,$route,F){

    List = new List();


    var template = $("[type='html/mainList']").html(),
        contentTemplate = $("[type='html/mainContent']").html(),
        root = $("#mainList"),
        nav = $("nav ul li a");


    nav.click(function() {
        return $.route($(this).attr("href"))
    })

    $('#loadMore').click(function(){
        List.pull();
    })



    $.route(function(hash) {

        if(hash==''){
            hash = $route.hash();
            $route.path(G.action);

        }
        var action = $route.action(hash);
        if('undefined'===typeof action[1])nav.removeClass("on").filter("[href='" + hash + "']").addClass("on");

        if(G.action!==action[0]||'undefined'===typeof List.items[G.action]){
            G.action = action[0];
            $.when(RouteList(hash)).then(function(data){
                RouteContent(action[1]);
            });
        }else{
            RouteContent(action[1]);
        }


    })

    function RouteList(hash){



        var deferred = $.Deferred();
        List.get(function(data){

            //root.empty() && $.each(data,app);
            reflashApp(data);

            if(G.action=='brand')$('#loadMore').hide();
            else $('#loadMore').show();
            finishLoad();
            deferred.resolve(data);
        })

        return deferred.promise();
    }

    function RouteContent($index){

        if($index>=0){
            var item = List.items[G.action][$index];
            if('undefined'===typeof item){
                $route.path(G.action);
                return;
            }
            if('undefined'!==typeof item.update_time &&item.update_time>0)item.time = F.dgmdate(item.update_time);
            //
            var el = $($.render(contentTemplate, item));
            //
            $('#swipe-left').html(el).addClass('on');
            $('#inserContent').html(item.content).find('table').attr('width', '').attr('height', '').attr('style', '');
            $('#inserContent').find('img').attr('width','').attr('height','').attr('style','');
        }else{
            $('#swipe-left').removeClass('on');
        }

    }

    function reflashApp(data){

        root.empty();

        $.each(data,function(key,item){
            item.action = G.action;
            item.key = key;
            var el = $($.render(template, item)).appendTo(root);
            if(item.img=='')el.find('img').eq(0).remove();
        });
    }
/*    function app(key,item) {
        if (this.id) item = this;
        item.action = G.action;
        item.key = key;

        var el = $($.render(template, item)).appendTo(root);
        if(item.img=='')el.find('img').eq(0).remove();
    }*/

    List.on("pull", function(data){
        //root.empty() && $.each(data,app);
        reflashApp(data);
        finishLoad();
    });

    function finishLoad(){
        $('#popwindow').hide();
        $('#popbox').hide();
    }

    G.finishLoad = finishLoad;
    /*FastClick*/
    $(function() {
        FastClick.attach(document.body);
    });
//fixed 黑屏问题
    bouncefix.add('scroll');

})(List,G,bouncefix,mbRoute,mbFilter)