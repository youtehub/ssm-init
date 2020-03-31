/** 完成分页的跳转 */
function page_nav(frm,num) {
	frm.pageIndex.value = num;
	frm.submit();
}

/** 根据用户输入完成页面跳转 */
function jump_to(frm,num) {
    //验证用户的输入
    var reg = /^[1-9]\d*$/;
    var totalPageCount = $("#totalPageCount").val();
    if(!reg.test(num)){
        alert("请输入大于0的正整数！");
        return false;
    }else if((num-totalPageCount) > 0){
        alert("请输入小于总页数的页码!");
        return false;

    }else {
        page_nav(frm,num);
    }
}
