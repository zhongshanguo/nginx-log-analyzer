$(function () {

    $('#refresh_data_button').click(function () {
        $.ajax('/debug/pull/data', function (result) {
            alert('ok');
        });
        // var postData = {
        //     rno: $('.doctype_notes--add').attr('rno'),
        //     rid: $('.doctype_notes--add').attr('rid'),
        //     content: $('#content').val()
        // };
        // if (postData.content.replace(/(^\s*)|(\s*$)/g, "")) {
        //     $('#message')[0].innerHTML = '';
        //     $.ajax({
        //         type: 'POST',
        //         data: JSON.stringify(postData),
        //         url: '/api/study/note/add',
        //         contentType: "application/json; charset=utf-8",
        //         dataType: "json",
        //         success: function (data) {
        //             if (data.success) {
        //                 $('#message')[0].innerHTML = '添加成功，1s后自动退出！';
        //                 setTimeout(function () {
        //                     window.location.reload();
        //                 },1000);
        //             } else {
        //                 $('#message')[0].innerHTML = '添加失败，' + data.message;
        //             }
        //         }
        //     })
        // } else {
        //     $('#message')[0].innerHTML = '添加的笔记不能为空哦！';
        // }
    })
});
