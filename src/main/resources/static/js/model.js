/*<![CDATA[*/
var username = $.session.get('username');
$('#userLabel').text(username);
var cid = $.session.get('cid');

$('#exist_click').click(function () {
    if (confirm('是否确认退出？')) {
        $.session.remove('username');
        window.location.href = '/login';
    }
});

var modelsJson;

function exportExcel() {
    if ($.session.get('modelsJson') != undefined) {
        var modelsJsonStr = $.session.get('modelsJson');
        $.ajax({

            type: "POST",//方法类型
            // dataType: "json",//预期服务器返回的数据类型
            url: "file/exportExcel",//url
            data: {'modelsJsonStr': modelsJsonStr},
            success: function (response, status, request) {

                var a = document.createElement('a');
                // var url = window.URL.createObjectURL(blob);
                var url = "file/downloadExcel";
                var filename = 'model.xls';
                a.href = url;
                a.download = filename;
                a.click();

            },
            error: function () {
                alert("异常！");
            }
        });
    }
    else {
        alert("没有证据链模型!")
    }


}

$(document).ready(function () {

    // if ($.session.get('modelsJson') != undefined) {
    //     var modelsJson = JSON.parse($.session.get('modelsJson'));
    //     if (modelsJson != null) {
    //         console.log("modelsJson  exist");
    //         console.log(modelsJson);
    //         modelTransfer(modelsJson);
    //     }
    // }
    if (modelsJson != undefined) {
        if (modelsJson != null) {
            console.log("modelsJson  exist");
            console.log(modelsJson);
            modelTransfer(modelsJson);
        }
    }

});
$(function () {
    // $("#list_hide").click(
    //     function () {
    //
    // if ($("#list_div").width() == "0") {
    //     $("#list_div").animate({opacity: "1", width: "32%"}, {duration: 1000});
    //     $("#graph_div").animate({width: "66%"}, {duration: 1000});
    //     $("#list_hide").html("隐藏<<");
    // } else {
    // $("#list_div").animate({opacity: "0", width: "0"}, {duration: 1000});
    // $("#graph_div").animate({width: "98%"}, {duration: 1000});
    //     $("#list_hide").html("显示>>");
    // }
    // });


    // 'use strict';
    // // Change this to the location of your server-side upload handler:
    // var url = 'file/upload',
    //     uploadButton = $('<button/>')
    //         .addClass('btn btn-primary')
    //         .prop('disabled', true)
    //         .text('Processing...')
    //         .on('click', function () {
    //             var $this = $(this),
    //                 data = $this.data();
    //             $this
    //                 .off('click')
    //                 .text('Abort')
    //                 .on('click', function () {
    //                     $this.remove();
    //                     data.abort();
    //                 });
    //             data.submit().always(function () {
    //                 $this.remove();
    //             });
    //         });
    // $('#fileupload').fileupload({
    //     url: url,
    //     type: 'POST',
    //     dataType: 'json',
    //     // acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
    //     maxFileSize: 999000,
    //     limitMultiFileUploads: 1,
    //     // Enable image resizing, except for Android and Opera,
    //     // which actually support image resizing, but fail to
    //     // send Blob objects via XHR requests:
    //     // disableImageResize: /Android(?!.*Chrome)|Opera/
    //     //     .test(window.navigator.userAgent),
    //     // previewMaxWidth: 100,
    //     // previewMaxHeight: 100,
    //     // previewCrop: true
    // }).on('fileuploadadd', function (e, data) {
    //
    //     window.a = data
    //     console.log(a)
    //     // var reader = new FileReader();
    //     // reader.onload = function()
    //     // {
    //     //     console.log(reader)
    //     // };
    //     // reader.readAsText(a.files[0]);
    //
    //     data.context = $('<div/>').appendTo('#files');
    //     $.each(data.files, function (index, file) {
    //         var node = $('<p/>')
    //             .append($('<span/>').text(file.name));
    //         if (!index) {
    //             node
    //                 .append('<br>')
    //                 .append(uploadButton.clone(true).data(data));
    //         }
    //         node.appendTo(data.context);
    //     });
    // }).on('fileuploadprocessalways', function (e, data) {
    //     var index = data.index,
    //         file = data.files[index],
    //         node = $(data.context.children()[index]);
    //     if (file.preview) {
    //         node
    //             .prepend('<br>')
    //             .prepend(file.preview);
    //     }
    //     if (file.error) {
    //         node
    //             .append('<br>')
    //             .append($('<span class="text-danger"/>').text(file.error));
    //     }
    //     if (index + 1 === data.files.length) {
    //         data.context.find('button')
    //             .text('上传文件')
    //             .prop('disabled', !!data.files.error);
    //     }
    // }).on('fileuploadprogress', function (e, data) {
    //
    //     var progress = parseInt(data.loaded / data.total * 100, 10);
    //     $('#progress .progress-bar').css(
    //         'width',
    //         progress + '%'
    //     );
    //
    //
    // }).on('fileuploadsubmit', function (e, data) {
    //
    //
    // }).on('fileuploaddone', function (e, data) {
    //
    //     console.log(data.result);
    //
    //     modelTransfer(data.result.modelsJson);
    //
    //     $.each(data.result.files, function (index, file) {
    //         if (file.url) {
    //             var link = $('<a>')
    //                 .attr('target', '_blank')
    //                 .prop('href', file.url);
    //             $(data.context.children()[index])
    //                 .wrap(link);
    //         } else if (file.error) {
    //             var error = $('<span class="text-danger"/>').text(file.error);
    //             $(data.context.children()[index])
    //                 .append('<br>')
    //                 .append(error);
    //         }
    //     });
    // }).on('fileuploadfail', function (e, data) {
    //     $.each(data.files, function (index) {
    //         var error = $('<span class="text-danger"/>').text('上传失败.');
    //         $(data.context.children()[index])
    //             .append('<br>')
    //             .append(error);
    //     });
    // }).prop('disabled', !$.support.fileInput)
    //     .parent().addClass($.support.fileInput ? undefined : 'disabled');
    //

});

function uploadExcel() {

    // $('#excelForm').submit({      //ajax方式提交表单
    //
    //     url: 'file/upload',
    //     type: 'post',
    //     beforeSubmit: function () {
    //     },
    //     success: function (data) {
    //         console.log(data.result);
    //         modelTransfer(data.result.modelsJson);
    //
    //     }
    // });
    // return false;
    if ($.session.get('modelsJson') != undefined) {
        // $.session.removeAttr('modelsJson');
        // sessionStorage.removeItem("modelsJson");
        $.session.remove('modelsJson');
    }
    var data = new FormData($('#excelForm')[0]);
    $.ajax({

        type: "POST",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "file/upload",//url
        data: data,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            console.log(data);
            // $('#graph_div').reload();
            $.session.set("modelsJson", JSON.stringify(data.modelsJson));
            modelsJson = JSON.stringify(data.modelsJson);
            modelTransfer(data.modelsJson);
        },
        // error : function() {
        //     alert("异常！");
        // }
    });
}


//transfer modelJson
//and then call mytopo.js: initGraph() to display
function modelTransfer(modelJson) {
    var gap_x = 150;
    var gap_y = 100;
    var pre_bx = 0;
    var pre_by = 100;
    var pre_hx = 0;
    var pre_hy = 100;
    var pre_jx = 0;
    var pre_jy = 100;
    var pre_fx = 0;
    var pre_fy = 100;


    var allfacts = modelJson['factList'];
    var facts = new Array();
    var headers = new Array();
    var joints = new Array();
    var evidences = new Array();
    var arrows = new Array();


    if (allfacts.length > 0) {
        evidences = allfacts[0]['evidenceList'];
    } else {
        evidences = [];
    }


    var by_times = 1;
    var hy_times = 1;
    var header_id = 1;
    var link_id = 1;
    var arrow_id = 1;


    var body_show_list = new Array();
    var header_show_lists = new Array();

    //解析并画证据
    for (var i = 0; i < evidences.length; i++) {
        var tempHeadList = evidences[i]['headList'];
        var body = evidences[i];
        var head_count = tempHeadList.length;


        var evidence_show = drawBody(true, pre_bx + gap_x * 0.5, pre_by + (gap_y * head_count) / 2, body['id'], body['name'], body['content'], body['type'], body['submitter'],
            body['reason'], body['result'], body['documentid'], body['isDefendant'], body['trust']);

        body_show_list.push(evidence_show);

        by_times++;


        var header_show_list = new Array();
        if (tempHeadList.length > 0) {

            for (var j = 0; j < tempHeadList.length; j++) {
                var header = tempHeadList[j];
                var header_show = drawHeader(true, pre_hx + gap_x * 2.5, pre_hy + gap_y * hy_times, header_id, header, header);

                hy_times++;
                header_id++;
                addLink(evidence_show, header_show, link_id);
                link_id++;

                header_show_list.push(header_show);
                headers.push(header);

            }
        }
        else {
            hy_times++;
        }
        header_show_lists.push(header_show_list);


        pre_by = pre_hy + gap_y * (hy_times - 0.5);
    }


    //解析并画事实
    pre_jy = pre_by / 2.5;
    pre_fy = pre_by / 2.5;
    var fy_times = 1;
    var jy_times = 1;


    for (var i = 0; i < allfacts.length; i++) {
        var tempFact = allfacts[i];
        var tempJoints = tempFact['linkPointList'];


        var joint_show_list = new Array();
        var joint_name_list = new Array();
        var joint_entry_list = new Array();
        for (var m = 0; m < tempJoints.length; m++) {
            var entry = tempJoints[j];
            if (joint_entry_list.indexOf(entry) == -1)
                joint_entry_list.push(entry);
        }
        var joint_count = joint_entry_list.length;
        //draw facts
        var fact_show = drawFact(true, pre_fx + gap_x * 6, pre_fy + (gap_y * joint_count) / 2, tempFact["id"], tempFact["name"], tempFact["content"], tempFact["type"]);

        fy_times++;


        if (tempJoints.length > 0) {


            for (var j = 0; j < tempJoints.length; j++) {
                var entry = tempJoints[j];
                // console.log(entry);
                if (joint_name_list.indexOf(entry['value']) == -1) {

                    var joint_show;
                    joint_show = drawJoint(true, pre_jx + gap_x * 4.5, pre_jy + gap_y * jy_times, "", entry['value'], entry['value'], "");
                    jy_times++;

                    joint_name_list.push(entry['value']);
                    joint_show_list.push(joint_show);

                    addLink(joint_show, fact_show, link_id);
                    link_id++;
                }

                var index = joint_name_list.indexOf(entry['value']);
                var joint_show2 = joint_show_list[index]
                var header_show_list2 = header_show_lists[entry['index']];
                // console.log(header_show_list2);
                for (var k = 0; k < header_show_list2.length; k++) {
                    var tempHeader = header_show_list2[k];
                    // console.log(tempHeader);
                    if (tempHeader['content'] == joint_show2['content']) {
                        addArrow(tempHeader, joint_show2, arrow_id, "", "");
                        arrow_id++;
                    }
                }


            }
        }
        else {
            jy_times++;
        }
        pre_fy = pre_jy + gap_y * (jy_times - 0.5);

    }


}

