document.domain = "mychebao.com"
var basePath="/realreport/loaddata"
var errorPage="/realreport/error.html"

function refreshSession() {
    window.setInterval(refreshCount, 5000);
    function refreshCount() {
        $.ajax({
            type: "GET",
            url: basePath + "session",
            dataType: "json",
            success: function(data){
                console.log(data)
            },
            error:function () {
                window.wxc.xcConfirm("登陆超时！！请重新登陆", window.wxc.xcConfirm.typeEnum.error);
            }
        });
    }
    //去掉定时器的方法
    // window.clearInterval(t1);
}