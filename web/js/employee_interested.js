$(document).ready(function() {



    //获取职业信息
    var jobs;
    $.ajax({
        // url: "http://39.102.38.113:3000/mock/11/user/queryAllInterestedByUid",
        url: "user/queryAllInterestedByUid",
        type: "post",
        data: JSON.stringify({ "uid": uid }),
        headers:  { 'Content-Type':   'application/json' },
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function(result) {
            console.log(result);
            jobs = result.interested;
            //遍历jobs列表
            $.grep(jobs, function(job) {
                console.log(job);
                // "iid": -17375581,
                // "jname": "eiusmod cillum ut",
                // "jsalary": "tempor in dolore proident",
                // "jmethod": "magna",
                // "jrtime": "eiusmod"

                var code = "<div class=\"offer\"><a class=\"offer_name\">" + job.jname + "</a><span class=\"person_number small-text\">" + job.jsalary + "/" + job.jmethod + "</span><div class=\"small-text\">发布于:" + job.jrtime + "</div><button class=\"delet_button\" id=\"" + job.iid + "\">不再感兴趣</button></div>"
                $(".right-part").append(code);
            });
        }
    });

    //删除
    $(".right-part").on('click', '.delet_button', function() {
        var iid = this.id;
        //console.log(jid)
        data = { iid: iid }
        $.ajax({
            // url: "http://39.102.38.113:3000/mock/11/user/delinterested",
            url: "user/delinterested",
            type: "post",
            headers:  { 'Content-Type':'application/json' },
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify(data),
            dataType: "json",
            success: function(result) {
                msg = result.status;
                console.log(msg)
                if (msg == 1) {
                    alert("删除成功！");
                } else {
                    alert("删除失败！")
                }
                window.location.reload();
            },
            error: function(msg) {
                alert("删除失败");
            }
        });
    });
});