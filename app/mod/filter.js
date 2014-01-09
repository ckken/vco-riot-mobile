
    var mbFilter = {

    dateFormat:function(date,format)
    {
        date = new Date(date);
        var o = {
            "M+" : date.getMonth()+1, //month
            "d+" : date.getDate(), //day
            "h+" : date.getHours(), //hour
            "m+" : date.getMinutes(), //minute
            "s+" : date.getSeconds(), //second
            "q+" : Math.floor((date.getMonth()+3)/3), //quarter
            "S" : date.getMilliseconds() //millisecond
        }
        if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
            (date.getFullYear()+"").substr(4- RegExp.$1.length));
        for(var k in o)if(new RegExp("("+ k +")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length==1? o[k] :
                    ("00"+ o[k]).substr((""+ o[k]).length));
        return format;
    },

    dgmdate:function (date) {
        date = date*1000;
        var o = Date.now() - date;
        if (o > 259200000) {
            return this.dateFormat(date,'yyyy-MM-dd hh:mm');
        } else if (o > 86400000) {
            return Math.floor(o / 86400000) + '天前';
        } else if (o > 3600000) {
            return Math.floor(o / 3600000) + '小时前';
        } else if (o > 60000) {
            return Math.floor(o / 60000) + '分钟前';
        } else {
            return "刚刚";
        }
    }
    }


