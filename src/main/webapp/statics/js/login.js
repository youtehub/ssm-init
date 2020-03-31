jQuery.noConflict();
(function ($) {
    function doLogin() {
        var userCode = $("#userCode").val();
        var $info = $(".info");
        var userPassword = $("#userPassword").val();
        if(userCode == null || userCode == ""){
            $info.html("用户名不能为空");
            return false;
        }
        if(userPassword == null || userPassword == ""){
            $info.text("密码不能为空");
            return false;
        }
        $info.html("");
        $.post("login.html",{"userCode":userCode,"userPassword":userPassword},loginBack,"json");
        function loginBack(data) {
            if(data.status == "success"){
                window.location.href="./main.html";
            }
            if(data.status == "failure"){
                $info.text(data.message);
            }

        }
    }
  $("#loginBtn").click(doLogin);
    $(window).keydown(function (event,funName) {
        if (event.keyCode == 13) {
            doLogin();
        }
    });
})(jQuery);