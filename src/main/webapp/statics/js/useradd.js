var userCode = null;
var userName = null;
var userPassword = null;
var ruserPassword = null;
var phone = null;
var birthday = null;
var userRole = null;
var addBtn = null;
var backBtn = null;


$(function(){
	userCode = $("#userCode");
	userName = $("#userName");
	userPassword = $("#userPassword");
	ruserPassword = $("#ruserPassword");
	phone = $("#phone");
	birthday = $("#birthday");
	userRole = $("#userRole");
	addBtn = $("#add");
	backBtn = $("#back");
	//初始化的时候，要把所有的提示信息变为：* 以提示必填项，更灵活，不要写在页面上
	userCode.next().html("*");
	userName.next().html("*");
	userPassword.next().html("*");
	ruserPassword.next().html("*");
	phone.next().html("*");
	birthday.next().html("*");
	userRole.next().html("*");

	/** 进入页面是加载用户角色 */
	$.ajax({
		type:"GET",//请求类型
		url:path+"/user/getRoles.html",//请求URL
		dataType:"JSON",//Ajax 接口返回的数据类型
		success:loadRoles,//成功响应的方法
		error:showError//失败响应的方法
	});
	function loadRoles(data) {
		if(data != null){
			userRole.html("");
			var options = "<option value='0'>请选择</option>";
            for (var i = 0; i < data.length; i++) {
                options += "<option value='"+data[i].id+"'>"+data[i].roleName+"</option>";
            }
            userRole.html(options);
		}
	}
	function showError(data) {//当访问时候，404，500 等非200的错误状态码
		validateTip(userRole.next(),{"color":"red"},
			imgNo+"获取用户角色列表error",false);
	}

    /**
	 * 失去焦点验证userCode是否存在
     */
	userCode.bind("blur",function () {
		var ucVal = userCode.val();
		if(ucVal == ""){
            validateTip(userCode.next(),{"color":"red"},"*用户编码不能为空",false);
            return false;
		}
		$.get(path+"/user/verfyUserCode.html",
			{userCode:userCode.val()},ucCallBack,"JSON").error(verfyErr);
    }).bind("focus",function () {
		validateTip(userCode.next(),{"color":"#666"},"*用户编码是您登录系统的账号",false);
    }).focus();
	function ucCallBack(data) {
		if(data.userCode == "exist"){
			validateTip(userCode.next(),
				{"color":"red"},imgNo+"该账号已存在",false);
		}else {
            validateTip(userCode.next(),
                {"color":"green"},imgYes+"该账号可以使用",true);
		}
    }
    function verfyErr(data) {//当访问时候，404，500 等非200的错误状态码
        validateTip(userCode.next(),
            {"color":"red"},imgNo+"您访问的页面不存在",false);
    }

   userName.bind("focus",function () {
        validateTip(userName.next(),{"color":"#666"},"* 用户名长度必须是大于1小于10的字符",false);
   }).bind("blur",function () {
       if(userName.val() != null && userName.val().length >1 && userName.val().length <10){
           validateTip(userName.next(),{"color":"green"},imgYes,true);
       }else{
           validateTip(userName.next(),{"color":"red"},imgNo+" 用户名输入的不符合规范，请重新输入",false);
       }
   });

    userPassword.bind("focus",function(){
        validateTip(userPassword.next(),{"color":"#666666"},"* 密码长度必须是大于6小于20",false);
    }).bind("blur",function(){
        if(userPassword.val() != null && userPassword.val().length > 6
            && userPassword.val().length < 20 ){
            validateTip(userPassword.next(),{"color":"green"},imgYes,true);
        }else{
            validateTip(userPassword.next(),{"color":"red"},imgNo + " 密码输入不符合规范，请重新输入",false);
        }
    });

    ruserPassword.bind("focus",function(){
        validateTip(ruserPassword.next(),{"color":"#666666"},"* 请输入与上面一只的密码",false);
    }).bind("blur",function(){
        if(ruserPassword.val() != null && ruserPassword.val().length > 6
            && ruserPassword.val().length < 20 && userPassword.val() == ruserPassword.val()){
            validateTip(ruserPassword.next(),{"color":"green"},imgYes,true);
        }else{
            validateTip(ruserPassword.next(),{"color":"red"},imgNo + " 两次密码输入不一致，请重新输入",false);
        }
    });


    birthday.bind("focus",function(){
        validateTip(birthday.next(),{"color":"#666666"},"* 点击输入框，选择日期",false);
    }).bind("blur",function(){
        if(birthday.val() != null && birthday.val() != ""){
            validateTip(birthday.next(),{"color":"green"},imgYes,true);
        }else{
            validateTip(birthday.next(),{"color":"red"},imgNo + " 选择的日期不正确,请重新输入",false);
        }
    });

    phone.bind("focus",function(){
        validateTip(phone.next(),{"color":"#666666"},"* 请输入手机号",false);
    }).bind("blur",function(){
        var patrn=/^(13[0-9]|15[0-9]|18[0-9])\d{8}$/;
        if(phone.val().match(patrn)){
            validateTip(phone.next(),{"color":"green"},imgYes,true);
        }else{
            validateTip(phone.next(),{"color":"red"},imgNo + " 您输入的手机号格式不正确",false);
        }
    });

    userRole.bind("focus",function(){
        validateTip(userRole.next(),{"color":"#666666"},"* 请选择用户角色",false);
    }).bind("blur",function(){
        if(userRole.val() != null && userRole.val() > 0){
            validateTip(userRole.next(),{"color":"green"},imgYes,true);
        }else{
            validateTip(userRole.next(),{"color":"red"},imgNo + " 请重新选择用户角色",false);
        }
    });

    addBtn.bind("click",function(){
        /*if(userCode.attr("validateStatus") != "true"){
            userCode.blur();
        }else */if(userName.attr("validateStatus") != "true"){
            userName.blur();
        }else if(userPassword.attr("validateStatus") != "true"){
            userPassword.blur();
        }else if(ruserPassword.attr("validateStatus") != "true"){
            ruserPassword.blur();
        }else if(birthday.attr("validateStatus") != "true"){
            birthday.blur();
        }else if(phone.attr("validateStatus") != "true"){
            phone.blur();
        }/*else if(userRole.attr("validateStatus") != "true"){
			userRole.blur();
		}*/else{
            if(confirm("是否确认提交数据")){
                $("#userForm").submit();
            }
        }
    });

    backBtn.on("click",function(){
        if(referer != undefined
            && null != referer
            && "" != referer
            && "null" != referer
            && referer.length > 4){
            window.location.href = referer;
        }else{
            history.back(-1);
        }
    });
});