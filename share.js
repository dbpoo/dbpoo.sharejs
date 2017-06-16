// Main
function Share(options) {
    Share.init(options)
}

// Function
Share.init = function(options) {
    var s = $.extend({}, Share.defaults, options);
        this.shareID = s.shareID,
        this.shareOffset = s.shareOffset,
        this.shareSize = s.shareSize,
        this.shareMargin = s.shareMargin,
        this.showTitle = s.showTitle,

        this.shareTitle = s.shareTitle,
        this.shareContent = s.shareContent,
        this.sharePic = s.sharePic,
        this.shareUrl = s.shareUrl,
        this.shareAt = s.shareAt,
        this.shareTo = s.shareTo;

        this.creatHtml();
        this.bindClick();
};

Share.oauth = {
    share_weibo  : { bgPos: "-48px", name: "新浪微博"},
    share_qweibo  : { bgPos: "-168px", name: "腾讯微博"},
    share_qzone  : { bgPos: "-8px", name: "QQ空间"},
    share_renren  : { bgPos: "-168px", name: "腾讯微博"},
    share_tieba  : { bgPos: "-528px", name: "百度贴吧"}
};

Share.creatHtml = function(){
    var that = this,
        oauth = this.oauth,
        width,
        height,
        font,
        bgimg,
        $elem = $("#"+that.shareID),
        html = "";

    if(that.shareSize == "small"){
        width = "20px",
        height = "16px",
        font = "12px",
        bgimg = "http://www.tapzh.com/public/share/share_16.png";
    } else if(that.shareSize == "big"){
        width = "36px",
        height = "36px",
        font = "14px",
        bgimg = "http://www.tapzh.com/public/share/share_32.png";
    } else {
        that.shareSize = false;
    }

    $elem.css({
        "position" : "absolute",
        "top"  : that.shareOffset[0],
        "left" : that.shareOffset[1]
    });

    if(that.showTitle && that.shareSize) {
        html += "<span style='height:"+ height +";line-height:"+ height +";font-size:"+ font +";display:inline-block;*display:inline;*zoom:1;float:left'>分享：</span>";
    } else {
        html += "";
    }

    for (key in oauth) {

        if(that.shareTo[key]  && that.shareSize){
            html += "<a class="+ key +" style='width:"+ width +";height:"+ height +";line-height:"+ height +";background:url("+ bgimg +") no-repeat;background-position:0 "+ oauth[key].bgPos +";text-indent:-9999em;cursor:pointer;display:inline-block;float:left;margin-right:"+ that.shareMargin +"px'>"+ oauth[key].name +"</a>";
        }

        if (that.shareTo[key]  && !that.shareSize){
            html += "<a class='"+ key +"'>"+ oauth[key].name +"</a>";
        }

    }

    $elem.html(html);

};

Share.bindClick = function(){
    var that = this,
        $elem = that.shareID ? $("#"+that.shareID) : document.body;

        $elem.find("a").on("click", function(){
            var shareName = $(this).attr('class');
            Share.shareFun(shareName);
        })
};

Share.shareFun = function(name){
    var that = this,
        shareName = name,
        shareTitle = encodeURIComponent(that.shareTitle),
        shareContent = encodeURIComponent(that.shareContent),
        sharePic = that.sharePic,
        shareUrl = encodeURIComponent(that.shareUrl),
        // shareAt = that.shareAt ? encodeURIComponent(" @" + that.shareAt) : "",
        shareAt = that.shareAt ? that.shareAt : "",
        url = "";

    if(shareName == "share_weibo") {
        var atweibo = "";

        if(shareAt !="" && !!shareAt.share_weibo){
            atweibo = encodeURIComponent(" @" + shareAt.share_weibo);
        }
        url = "http://v.t.sina.com.cn/share/share.php?c=&url=" + shareUrl + "&title=" + shareContent + atweibo + "&pic=" + sharePic;
    }

    if(shareName == "share_qweibo") {
        var atqweibo = "";
        if(shareAt !="" && !!shareAt.share_qweibo){
            atqweibo = encodeURIComponent(" @" + shareAt.share_weibo);
        }
        url = "http://share.v.t.qq.com/index.php?c=share&a=index&url=" + shareUrl + "&title=" + shareContent + atqweibo + "&pic=" + sharePic;
    }

    if(shareName == "share_qzone") {
        url = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + shareUrl + "&title=" + shareTitle + "&desc=&site=&summary=" + shareContent + "&pics=" + sharePic;
    }

    if(shareName == "share_renren") {
        url = "http://widget.renren.com/dialog/share?resourceUrl=" + shareUrl + "&srcUrl=" + shareUrl + "&title=" + shareTitle + "&description=" + shareContent + "&pic=" + sharePic;
    }

    if(shareName == "share_tieba") {
        url = "http://tieba.baidu.com/f/commit/share/openShareApi?url=" + shareUrl + "&title=" + shareTitle + "&comment=" + shareContent;
    }


    window.open(url);
};

Share.defaults = {
    shareID: false,
    shareSize: false,
    shareMargin: 0,
    shareOffset: [0,0],
    showTitle: false,
    shareTitle: (document.title ? document.title : '我觉得这个内容很精彩，赶紧分享吧！'),
    shareContent: "我觉得这个内容很精彩，赶紧分享吧！",
    sharePic: "",
    shareUrl: window.location.href,
    shareAt: false,
    shareTo: {"share_weibo" : 1,"share_qweibo" : 1,"share_qzone" : 1,"share_renren" : 1,"share_tieba": 1}
};
