
var headerIndex = 0;//当前链头id
var headerList = {};//存储链头，{id:node}
var bodyIndex = 0;//当前链体id
var bodyList = {};//存储链体，{id:{'node':node,'type':'XXX','committer':'XXX','reason':'XXXXXX',
// 'conclusion':'XXXXXX','documentID':-1,'isDefendant':1,'trust':1}}
var jointIndex = 0;//当前连接点（事实）id
var jointList = {};//存储连接点（事实），{id:{'node':node,'type':'XXX'}}
var arrowIndex = 0;//当前箭头id
var arrowList = {};//存储箭头，{id:node}
var linkIndex = 0;//当前连线id
// var linkList = {};//存储连线，{id:node}
var operationList = [];//存储每一步操作，[{'type':'add/copy','nodes':[]},
// {'type':'move','nodes':[],'position_origin':[x,y]},{'type':'delete','nodes':[{'node':node,'content':{'',''}}]}]
var header_delete = [];//删除的链头id
var body_delete = [];//删除的链体id
var joint_delete = [];//删除的连接点id

var isNodeClicked_right = false;//节点（链头、链体、连接点、连线、箭头）右键点击
var isNodeClicked_left = false;//节点（链头、链体、连接点、连线、箭头）左键点击
// var nodeList_selected = [];//已选中的节点（链头、链体、连接点、连线、箭头），[node]
// var isCtrlPressed = false;//ctrl键是否按下
var nodeFroms = [];//连线or箭头链头节点（允许同时创建多个连线或箭头），存储在nodeList_selected中的index
var nodeTo;//连线链体节点or箭头连接点节点
var header_radius = 20;//链头节点半径
var body_width = 80;//链体节点长
var body_height = 30;//链体节点宽
var joint_width = 30;//连接点边长
var header_color = 'rgba(127,185,136,0.8)';//链头边框颜色
var header_color_num = '127,185,136';
var body_color = 'rgba(97,158,255,0.8)';//链体边框颜色
var body_color_num = '97,158,255';
var joint_color = 'rgba(101,43,105,0.8)';//连接点边框颜色
var joint_color_num = '101,43,105';
var continuous_header = false;//是否连续绘制链头
var continuous_body = false;//是否连续绘制链体
var continuous_joint = false;//是否连续绘制连接点
var isCopied = false;//是否点击复制图元
var nodeList_copied = [];//已选中复制的节点
var x_origin,y_origin = 0;//拖拽节点的初始位置
var tranX_scene,tranY_scene = 0;//拖拽场景的初始位置
// var x_now,y_now = 0;
var sourceNode;//拖拽节点（当选中多个节点进行拖拽时，鼠标拖拽的节点即参照节点）
var mouseX,mouseY;//鼠标位置
var hasDragged = false;//是否已拖拽图标（为了处理点击效果）

$(document).ready(function(){

    canvas = document.getElementById('canvas');
    stage = new JTopo.Stage(canvas); // 创建一个舞台对象
    scene = new JTopo.Scene(stage); // 创建一个场景对象
    stage.mode = "normal";
    oContext = canvas.getContext("2d");

    stage.addEventListener("mouseover", function(event){
        console.log("鼠标进入");
    });

    stage.addEventListener("mousedrag", function(event){
        console.log("拖拽");

    });

    stage.addEventListener("mousedown", function(event){
        console.log("mouse down");

        tranX_scene = scene.translateX;
        tranY_scene = scene.translateY;
        // console.log(tranX_scene+'@@'+tranY_scene);
    });

    stage.addEventListener("mouseup", function(event){
        console.log("mouse up");

        if(event.button == 2){
            console.log ('松开右键');

            if(!isNodeClicked_right){
                $("#nodeMenu").hide();
                $("#nodeMenu2").hide();
                $("#nodeMenu3").hide();
                $("#linkMenu").hide();
                $("#arrowMenu").hide();

                $('.evidence').css('background-color', 'white');
                $('.evidence_plaintiff').css('background-color', '#5ed7e5');
                $('.evidence').find('.head_chain').css('background-color', 'white');
                $('.evidence_plaintiff').find('.head_chain').css('background-color', '#5ed7e5');

                $("#stageMenu").css({
                    top: getMousePosition_rdiv(event).y,
                    left: getMousePosition_rdiv(event).x
                }).show();
            }
        }

        if(event.button == 0){
            console.log ( '松开左键');

            // 关闭弹出菜单
            $("#stageMenu").hide();
            $("#nodeMenu").hide();
            $("#nodeMenu2").hide();
            $("#nodeMenu3").hide();
            $("#linkMenu").hide();
            $("#arrowMenu").hide();

            if(!isNodeClicked_right){
                $('.evidence').css('background-color', 'white');
                $('.evidence_plaintiff').css('background-color', '#5ed7e5');
                $('.evidence').find('.head_chain').css('background-color', 'white');
                $('.evidence_plaintiff').find('.head_chain').css('background-color', '#5ed7e5');
            }
            isNodeClicked_right = false;
            isNodeClicked_left = false;

            if(continuous_header){
                drawHeader(true,event.pageX-$("#canvas").offset().left,event.pageY-$("#canvas").offset().top);

            }else if(continuous_body){
                drawBody(true,event.pageX-$("#canvas").offset().left,event.pageY-$("#canvas").offset().top);

            }else if(continuous_joint){
                drawJoint(true,event.pageX-$("#canvas").offset().left,event.pageY-$("#canvas").offset().top);
            }
        }

        addMoveOperations();
    });

    stage.addEventListener("mousemove", function(event){
        var mousePos = getMousePosition_Canvas(event);
        mouseX = mousePos.x;
        mouseY = mousePos.y;
    },false);

    this.addEventListener("keydown", function(event){
        if(event.ctrlKey == true){

            if(event.keyCode == 67){
                nodeList_copied = scene.selectedElements.concat();
            }
            if(event.keyCode == 86){
                paste(mouseX-scene.translateX,mouseY-scene.translateY);
            }
        }
    });
    this.addEventListener("keyup", function(event){
    });

    $("#boxSelection").change(function() {

        if($(this).is(':checked')==true){
            stage.mode = "select";
        }else{
            stage.mode = "normal";
        }
    });

    dragHeader();
    dragBody();
    dragJoint();
    dragHandle();

    quickDraw();
    bindMenuClick();
    bindRightPanel();


    $('#save-btn').click(function () {
        saveBodies();
        saveHeaders();
        saveJoints();
        saveArrows();
        alert('保存成功！')
    });
    $('#saveImg-btn').click(function () {
        stage.saveImageInfo(undefined, undefined, "证据链模型图");;
    });
    $('#revoke-btn').click(function () {
        undo();
    });
    $('#layout-btn').click(function () {
        typeSetting();
    });

});

//存储链头
function saveHeaders() {
    var hList = [];
    for(var hid in headerList){
        var node = headerList[hid];

        if(node!=null){
            var documentID = -1;
            var bodyID = -1;

            if(node.inLinks!=null){
                bodyID = node.inLinks[0].nodeA.id;
                documentID = bodyList[bodyID]['documentID'];
            }

            var h = {"id":hid,"caseID":cid,"documentid":documentID,"bodyid":bodyID,
                "name":node.text,"head":node.content,"x":node.x,"y":node.y};
            hList.push(h);
        }
    }

    $.ajax({
        type: "post",
        url: "/model/deleteHeaders",
        data: JSON.stringify(header_delete),
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {

        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("1!");
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        }
    });

    $.ajax({
        type: "post",
        url: "/model/saveHeaders",
        data: JSON.stringify(hList),
        // dataType:"json",
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {

        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("1*");
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        }
    });
}

//存储链体
function saveBodies() {
    var bList = [];
    for(var bid in bodyList){
        var body = bodyList[bid];

        if(body!=null){
            var node = body['node'];
            var b = {"id":bid,"caseID":cid,"documentid":body['documentID'],"name":node.text,"body":node.content,"x":node.x,"y":node.y,
                "type":body['type'],"committer":body['committer'],"reason":body['reason'],"conclusion":body['conclusion'],"isDefendant":body['isDefendant']};
            bList.push(b);
        }
    }

    $.ajax({
        type: "post",
        url: "/model/deleteBodies",
        data: JSON.stringify(body_delete),
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {

        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("2!");
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        }
    });

    $.ajax({
        type: "post",
        url: "/model/saveBodies",
        data: JSON.stringify(bList),
        // dataType:"json",
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {

        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("2*");
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        }
    });
}

//存储连接点
function saveJoints() {
    var jList = [];
    for(var jid in jointList){
        var joint = jointList[jid];

        if(joint!=null){
            var node = joint['node'];
            var j = {"id":jid,"caseID":cid,"name":node.text,"content":node.content,"x":node.x,"y":node.y,"type":joint['type']};
            jList.push(j);
        }
    }

    $.ajax({
        type: "post",
        url: "/model/deleteJoints",
        data: JSON.stringify(joint_delete),
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {

        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("3!");
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        }
    });

    $.ajax({
        type: "post",
        url: "/model/saveJoints",
        data: JSON.stringify(jList),
        // dataType:"json",
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {

        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("3*");
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        }
    });
}

//存储连接点
function saveArrows() {
    var aList = [];
    for(var aid in arrowList){
        var node = arrowList[aid];

        if(node!=null){
            var a = {"id":aid,"caseID":cid,"nodeFrom_hid":node.nodeA.id,"nodeTo_jid":node.nodeZ.id,
                "name":node.text,"content":node.content};
            aList.push(a);
        }
    }

    $.ajax({
        type: "post",
        url: "/model/deleteArrows",
        data:{"cid":cid},
        async: false,
        success: function (data) {

        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("4!");
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        }
    });

    $.ajax({
        type: "post",
        url: "/model/saveArrows",
        data: JSON.stringify(aList),
        // dataType:"json",
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {

        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("4*");
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        }
    });
}

//将移动操作加入operationList
function addMoveOperations() {
    var x_now,y_now;
    var nodeList_selected = scene.selectedElements;

    if(nodeList_selected.length==0){
        x_now = scene.translateX;
        y_now = scene.translateY;
        if(x_now!=tranX_scene||y_now!=tranY_scene)
            operationList.push({'type':'move','nodes':null,'position_origin':[tranX_scene,tranY_scene]});

    }else{
        if(sourceNode!=null){
            x_now = sourceNode.x;
            y_now = sourceNode.y;
            if(x_now!=x_origin||y_now!=y_origin)
                operationList.push({'type':'move','nodes':nodeList_selected,'position_origin':[x_origin,y_origin],'source':sourceNode});
        }
    }
}

//撤销
function undo() {
    if(operationList.length<=0)
        return -1;

    var operation = operationList.pop();

    if(operation['type']=='add'||operation['type']=='copy'){

        for(var i = 0;i<operation['nodes'].length;i++){
            var node = operation['nodes'][i];

            if(node.node_type=='header'){
                deleteHeader(node.id);

            }else if(node.node_type=='body'){
                deleteBody(node.id);

            }else if(node.node_type=='joint'){
                deleteJoint(node.id);

            }else if(node.node_type=='arrow'){
                deleteArrow(node);

            }else if(node.node_type=='link'){
                deleteLink(node);
            }
        }

    }else if(operation['type']=='delete'){

        for(var i = 0;i<operation['nodes'].length;i++){
            var n = operation['nodes'][i];
            var node = n['node'];

            if(node.node_type=='header'){
                drawHeader(false,node.x,node.y,node.id,node.text,node.content);

            }else if(node.node_type=='body'){
                drawBody(false,node.x,node.y,node.id,node.text,node.content,n['content']['type'],
                    n['content']['committer'],n['content']['reason'],n['content']['conclusion'],
                    n['content']['documentID'],n['content']['isDefendant'],n['content']['trust']);

            }else if(node.node_type=='joint'){
                drawJoint(false,node.x,node.y,node.id,node.text,node.content,n['content']['type']);

            }else if(node.node_type=='arrow'){
                addArrow(node.nodeA,node.nodeZ,node.id,node.text,node.content);

            }else if(node.node_type=='link'){
                addLink(node.nodeA,node.nodeZ);
            }
        }

    }else if(operation['type']=='move'){
        if(operation['nodes']==null){
            scene.translateX = operation['position_origin'][0];
            scene.translateY = operation['position_origin'][1];
        }else{
            var x_offset = operation['position_origin'][0]-operation['source'].x;
            var y_offset = operation['position_origin'][1]-operation['source'].y;

            for(var i = 0;i<operation['nodes'].length;i++){
                var node_temp = operation['nodes'][i];
                node_temp.x+=x_offset;
                node_temp.y+=y_offset;
            }
        }
    }
}

//连续画图
function quickDraw() {
    $('#add-header-btn-toggle').click(function () {
        if(continuous_header){
            continuous_header = false;
            $(this).css({'background-color':'white'});
        }else{
            continuous_header = true;
            continuous_body = false;
            continuous_joint = false;
            $(this).css({'background-color':'grey'});
            $('#add-body-btn-toggle').css({'background-color':'white'});
            $('#add-joint-btn-toggle').css({'background-color':'white'});
        }
    });

    $('#add-body-btn-toggle').click(function () {

        if(continuous_body){
            continuous_body = false;
            $(this).css({'background-color':'white'});
        }else{
            continuous_body = true;
            continuous_header = false;
            continuous_joint = false;
            $(this).css({'background-color':'grey'});
            $('#add-header-btn-toggle').css({'background-color':'white'});
            $('#add-joint-btn-toggle').css({'background-color':'white'});
        }
    });

    $('#add-joint-btn-toggle').click(function () {

        if(continuous_joint){
            continuous_joint = false;
            $(this).css({'background-color':'white'});
        }else{
            continuous_joint = true;
            continuous_header = false;
            continuous_body = false;
            $(this).css({'background-color':'grey'});
            $('#add-header-btn-toggle').css({'background-color':'white'});
            $('#add-body-btn-toggle').css({'background-color':'white'});
        }
    });
}

//button拖拽方法
function dragHandle() {

    $("#draggableDiv").mouseup(function (event) {
        // console.log('drag mouse up');
        if(!hasDragged){
            $("#draggableDiv").html("");
            $(this).css({ "height": "0" });
        }
    });

    $("#draggableDiv").draggable({
        // containment: "parent",
        drag: function (event) {
            hasDragged = true;
            // console.log('drag');
        },
        stop: function () {
            //拖拽结束，将拖拽容器内容清空
            // console.log('drag stop');
            hasDragged = false;
            $("#draggableDiv").html("");
            $("#draggableDiv").css({
                "height": "0",
                "width": "0",
                "border": '0px',
                "background-color":'transparent'});
        }
    });

    //“放”的操作代码
    $("#canvas").droppable({
        drop: function (event) {

            if(event.pageX-$("#canvas").offset().left>=0&&event.pageY-$("#canvas").offset().top>=0){
                var nodePosition = getNodePosition(event);
                if($("#draggableDiv").find('i').attr('class')!=null){
                    var className = $("#draggableDiv").find('i').attr('class');

                    if(className.indexOf('circle')>-1){
                        drawHeader(true,nodePosition.x,nodePosition.y);

                    }else if(className.indexOf('square')>-1) {
                        drawJoint(true,nodePosition.x, nodePosition.y);
                    }
                }else{
                    drawBody(true,nodePosition.x, nodePosition.y);
                }
            }
        }
    });
}

//add-header-btn与拖拽方法绑定
function dragHeader() {
    $( "#add-header-btn" ).bind("mousedown", function (event) {

        if(event.button == 0){
            var draggableDiv = $("#draggableDiv");
            $(draggableDiv).css({
                "display": "block",
                "width": (header_radius*2)+"px",
                "height": (header_radius*2)+"px",
                "top": event.pageY-$(this).parent().parent().offset().top-header_radius,
                "left": event.pageX-$(this).parent().parent().offset().left-header_radius,
                "font-size": (header_radius*1.8)+"px",
                "color": header_color,
                "border":'0px'});

            var clickElement = "<i class=\"fa fa-circle-thin\" aria-hidden=\"true\"></i>";
            $("#draggableDiv").html(clickElement);
            draggableDiv.trigger(event);
        }
        //取消默认行为
        return false;
    });
}

//add-body-btn与拖拽方法绑定
function dragBody() {
    $( "#add-body-btn" ).bind("mousedown", function (event) {

        if(event.button == 0){
            var draggableDiv = $("#draggableDiv");
            // console.log('x:'+event.pageX+';y:'+event.pageY+';left:'+$(this).parent().offset().left+';top:'+$(this).parent().offset().top);
            $(draggableDiv).css({
                "display": "block",
                "width": body_width/1.2+"px",
                "height": body_height/1.2+"px",
                "top": event.pageY-$(this).parent().parent().offset().top,
                "left": event.pageX-$(this).parent().parent().offset().left-(body_width/2),
                "border":'2px solid '+body_color});

            draggableDiv.trigger(event);
        }
        //取消默认行为
        return false;
    });
}

//add-joint-btn与拖拽方法绑定
function dragJoint() {
    $( "#add-joint-btn" ).bind("mousedown", function (event) {

        if(event.button == 0){
            var draggableDiv = $("#draggableDiv");
            // console.log('x:'+event.pageX+';y:'+event.pageY+';left:'+$(this).parent().offset().left+';top:'+$(this).parent().offset().top);
            $(draggableDiv).css({
                "display": "block",
                "width": joint_width+"px",
                "height": joint_width+"px",
                "top": event.pageY-$(this).parent().parent().offset().top-(joint_width/2),
                "left": event.pageX-$(this).parent().parent().offset().left-(joint_width/2),
                "font-size": joint_width*1.2+"px",
                "color": joint_color,
                "border":'0px'});

            var clickElement = "<i class=\"fa fa-square-o\" aria-hidden=\"true\"></i>";
            $("#draggableDiv").html(clickElement);
            draggableDiv.trigger(event);
        }
        //取消默认行为
        return false;
    });
}

//获取鼠标指针坐标
function getMousePosition_Canvas (evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

//获取鼠标相对右侧div位置
function getMousePosition_rdiv(event) {
    var p = $('#canvas').parent().parent();
    // console.log('px:'+p.offset().left+';py:'+p.offset().top);
    // console.log('x:'+event.pageX+';y:'+event.pageY);

    return {
        x: event.pageX - p.offset().left,
        y: event.pageY - p.offset().top
    };
}

//获取新增节点的位置
function getNodePosition(event) {
    return {
        x: event.pageX-$("#canvas").offset().left-scene.translateX,
        y: event.pageY-$("#canvas").offset().top-scene.translateY
    };
}

//处理节点多选不同右键菜单显示
function handleMultipleSelected(event) {
    var nodeList_selected = scene.selectedElements;

    if(nodeList_selected.length<=1)
        return -1;

    var header_num = 0;
    var body_num = 0;
    var link_num = 0;
    var arrow_num = 0;
    var joint_num = 0;

    var header_index = [];
    var body_index = [];
    var joint_index = [];

    for(var i = 0;i<nodeList_selected.length;i++){

        if(nodeList_selected[i].node_type=='header'){
            header_index.push(i);
            header_num++;

        }else if(nodeList_selected[i].node_type=='body'){
            body_index.push(i);
            body_num++;

        }else if(nodeList_selected[i].node_type=='link'){
            link_num++;

        }else if(nodeList_selected[i].node_type=='arrow'){
            arrow_num++;

        }else if(nodeList_selected[i].node_type=='joint'){
            joint_index.push(i);
            joint_num++;
        }
    }
    // console.log("header_num:"+header_num+";body_num:"+body_num+";link_num:"+link_num+";arrow_num:"+arrow_num+";joint_num:"+joint_num);

    if(header_num>=1&&body_num==1&&link_num==0&&arrow_num==0&&joint_num==0){//多个链头一个链体可以创建连线
        $("#nodeMenu2").css({
            top: getMousePosition_rdiv(event).y,
            left: getMousePosition_rdiv(event).x
        }).show();

        nodeFroms = header_index;
        nodeTo = nodeList_selected[body_index[0]];
        return 1;

    }else if(header_num>=1&&body_num==0&&link_num==0&&arrow_num==0&&joint_num==1){//多个链头一个连接点可以创建箭头
        $("#nodeMenu3").css({
            top: getMousePosition_rdiv(event).y,
            left: getMousePosition_rdiv(event).x
        }).show();

        nodeFroms = header_index;
        nodeTo = nodeList_selected[joint_index[0]];
        return 2;

    }else{
        $("#nodeMenu").css({
            top: getMousePosition_rdiv(event).y,
            left: getMousePosition_rdiv(event).x
        }).show();
        return 0;
    }
}

//处理节点右键菜单显示
function handleNodeMenu(event,type,node){

    if(event.button == 0) {// 左键
        isNodeClicked_left = true;
    }

    if(event.button == 2){// 右键

        $("#stageMenu").hide();
        $("#nodeMenu").hide();
        $("#nodeMenu2").hide();
        $("#nodeMenu3").hide();
        $("#linkMenu").hide();
        $("#arrowMenu").hide();

        if(handleMultipleSelected(event)<0){

            if(type=='arrow'){
                $("#arrowMenu").css({
                    top: getMousePosition_rdiv(event).y,
                    left: getMousePosition_rdiv(event).x
                }).show();

            }else if(type=='link'){
                $("#linkMenu").css({
                    top: getMousePosition_rdiv(event).y,
                    left: getMousePosition_rdiv(event).x
                }).show();

            }else{
                $("#nodeMenu").css({
                    top: getMousePosition_rdiv(event).y,
                    left: getMousePosition_rdiv(event).x
                }).show();
            }
        }

        isNodeClicked_right = true;

    }
}

//右键菜单方法调用
function bindMenuClick() {
    //新增图元-链头
    $('#add-header-li').click(function (event) {
        $('#stageMenu').hide();
        var nodePosition = getNodePosition(event);
        drawHeader(true,nodePosition.x,nodePosition.y);
    });

    //新增图元-链体
    $('#add-body-li').click(function (event) {
        $('#stageMenu').hide();
        var nodePosition = getNodePosition(event);
        drawBody(true,nodePosition.x,nodePosition.y);
    });

    //新增图元-连接点
    $('#add-joint-li').click(function (event) {
        $('#stageMenu').hide();
        var nodePosition = getNodePosition(event);
        drawJoint(true,nodePosition.x,nodePosition.y);
    });

    //创建连线
    $('#add-link-li').click(function () {
        $(this).parent().hide();

        var nodes = [];
        for(var i = 0;i<nodeFroms.length;i++){
            var node = addLink(nodeTo,scene.selectedElements[nodeFroms[i]]);
            if(node!=-1){
                nodes.push(node);
            }
        }

        //添加操作至operationList
        operationList.push({'type':'add','nodes':nodes});
    });

    //创建箭头
    $('#add-arrow-li').click(function () {
        $(this).parent().hide();

        var nodes = [];
        for(var i = 0;i<nodeFroms.length;i++){

            var node = addArrow(scene.selectedElements[nodeFroms[i]],nodeTo);
            if(node!=-1){
                nodes.push(node);
            }
        }

        //添加操作至operationList
        operationList.push({'type':'add','nodes':nodes});
    });

    //复制图元
    $('.copy-element-li').click(function () {
        $(this).parent().hide();

        isCopied = true;
        nodeList_copied = scene.selectedElements.concat();
    });

    //粘贴图元
    $('#paste-element-li').click(function (event) {
        $(this).parent().hide();
        var nodePosition = getNodePosition(event);
        paste(nodePosition.x,nodePosition.y);
    });

    //删除连线
    $('#delete-link-li').click(function () {
        $(this).parent().hide();

        deleteLink(scene.selectedElements[0]);

        //添加操作至operationList
        operationList.push({'type':'delete','nodes':[scene.selectedElements[0]]});
    });

    //删除箭头
    $('#delete-arrow-li').click(function () {
        $(this).parent().hide();

        deleteArrow(scene.selectedElements[0]);

        //添加操作至operationList
        operationList.push({'type':'delete','nodes':[scene.selectedElements[0]]});
    });

    //删除图元
    $('.delete-element-li').click(function () {
        $(this).parent().hide();
        var nodeList_selected = scene.selectedElements;
        var nodes = [];

        for(var i = 0;i<nodeList_selected.length;i++){
            var node = nodeList_selected[i];
            var n = {};
            n['node'] = node;

            if(node.node_type=='header'){
                deleteHeader(node.id);

            }else if(node.node_type=='body'){
                var body = bodyList[node.id];
                n['content'] = {'type':body['type'],'committer':body['committer'],'reason':body['reason'],
                    'conclusion':body['conclusion'], 'documentID':body['documentID'],'isDefendant':body['isDefendant'],'trust':body['trust']};
                deleteBody(node.id);

            }else if(node.node_type=='joint'){
                n['content'] = {'type':jointList[node.id]['type']};
                deleteJoint(node.id);

            }else if(node.node_type=='arrow'){
                deleteArrow(node);

            }else if(node.node_type=='link'){
                deleteLink(node);
            }

            nodes.push(n);
        }

        //添加操作至operationList
        operationList.push({'type':'delete','nodes':nodes});
    });
}

//粘贴图元
function paste(mouse_x,mouse_y) {

    var toPasted = nodeList_copied.concat();
    var middleX,middleY = 0;//中心点坐标
    var minX = 10000000;
    var minY = 10000000;
    var maxX = -1;
    var maxY = -1;
    var nodes = [];
    var hs = {};//{old_id:new_id};
    var bs = {};
    var js = {};
    // console.log("len:"+toPasted.length);

    for(var i = 0;i<nodeList_copied.length;i++){
        var node = nodeList_copied[i];

        if(node.node_type=='link'){

            var snode = node.nodeA;
            var enode = node.nodeZ;
            var si = $.inArray(snode,toPasted);
            var ei = $.inArray(enode,toPasted);

            if(si>=0&&ei>=0){
                hs[enode.id] = -1;
                bs[snode.id] = -1;
                toPasted.splice(si,1);
                toPasted.splice($.inArray(enode,toPasted),1);
            }else{
                if(hs[enode.id]!=null){
                    if(si>=0){
                        bs[snode.id] = -1;
                        toPasted.splice(si,1);
                    }else{
                        if(bs[snode.id]==null||bs[snode.id]==undefined)
                            toPasted.splice($.inArray(node,toPasted),1);
                    }
                }else{
                    if(ei==-1){
                        toPasted.splice($.inArray(node,toPasted),1);
                    }else{
                        if(bs[snode.id]!=null){
                            hs[enode.id] = -1;
                            toPasted.splice(ei,1);
                        }else{
                            toPasted.splice($.inArray(node,toPasted),1);
                        }
                    }
                }
            }
        }else if(node.node_type=='arrow'){

            var snode = node.nodeA;
            var enode = node.nodeZ;
            var si = $.inArray(snode,toPasted);
            var ei = $.inArray(enode,toPasted);

            if(si>=0&&ei>=0){
                hs[snode.id] = -1;
                js[enode.id] = -1;
                toPasted.splice(si,1);
                toPasted.splice($.inArray(enode,toPasted),1);
            }else{
                if(hs[snode.id]!=null){
                    if(ei>=0){
                        js[enode.id] = -1;
                        toPasted.splice(ei,1);
                    }else{
                        if(js[enode.id]==null||js[enode.id]==undefined)
                            toPasted.splice($.inArray(node,toPasted),1);
                    }
                }else{
                    if(si==-1){
                        toPasted.splice($.inArray(node,toPasted),1);
                    }else{
                        if(js[enode.id]!=null){
                            hs[snode.id] = -1;
                            toPasted.splice(si,1);
                        }else{
                            toPasted.splice($.inArray(node,toPasted),1);
                        }
                    }
                }
            }
        }else if(node.node_type=='header'||node.node_type=='body'||node.node_type=='joint'){

            if(node.x>maxX){
                maxX = node.x;
            }
            if(node.x<minX){
                minX = node.x;
            }
            if(node.y>maxY){
                maxY = node.y;
            }
            if(node.y<minY){
                minY = node.y;
            }
        }
    }

    middleX = (minX+maxX)/2;
    middleY = (minY+maxY)/2;
    // console.log("len:"+toPasted.length);
    // console.log(middleX+";"+middleY);

    for(var i = 0;i<toPasted.length;i++){
        var node = toPasted[i];

        if(node.node_type=='link'){
            var snode = node.nodeA;
            var enode = node.nodeZ;
            var body = bodyList[snode.id];
            var enew;

            var snew = drawBody(false,snode.x+mouse_x-middleX,snode.y+mouse_y-middleY,null,snode.text,snode.content,body['type'],
                body['committer'],body['reason'], body['conclusion'], body['documentID'],body['isDefendant'],body['trust']);

            if(hs[enode.id]!=null&&hs[enode.id]!=-1){
                enew = headerList[hs[enode.id]];
            }else{
                enew = drawHeader(false,enode.x+mouse_x-middleX,enode.y+mouse_y-middleY,null,enode.text,enode.content);
                nodes.push(enew);
                hs[enode.id] = enew.id;
            }
            var nl = addLink(snew,enew);

            nodes.push(snew);
            nodes.push(nl);

        }else if(node.node_type=='arrow'){
            var snode = node.nodeA;
            var enode = node.nodeZ
            var snew;

            var enew = drawJoint(false,enode.x+mouse_x-middleX,enode.y+mouse_y-middleY,null,enode.text,enode.content,jointList[enode.id]['type']);

            if(hs[snode.id]!=null&&hs[snode.id]!=-1){
                snew = headerList[hs[snode.id]];
            }else{
                snew = drawHeader(false,snode.x+mouse_x-middleX,snode.y+mouse_y-middleY,null,snode.text,snode.content);
                nodes.push(snew);
                hs[snode.id] = snew.id;
            }

            var na = addArrow(snew,enew,null,node.text,node.content);
            nodes.push(enew);
            nodes.push(na);

        }else if(node.node_type=='header'){

            var node_new = drawHeader(false,node.x+mouse_x-middleX,node.y+mouse_y-middleY,null,node.text,node.content);
            nodes.push(node_new);

        }else if(node.node_type=='body'){

            var body = bodyList[node.id];
            var node_new = drawBody(false,node.x+mouse_x-middleX,node.y+mouse_y-middleY,null,node.text,node.content,body['type'],
                body['committer'],body['reason'], body['conclusion'], body['documentID'],body['isDefendant'],body['trust']);
            nodes.push(node_new);

        }else if(node.node_type=='joint'){

            var node_new = drawJoint(false,node.x+mouse_x-middleX,node.y+mouse_y-middleY,null,node.text,node.content,jointList[node.id]['type']);
            nodes.push(node_new);
        }
    }

    //添加操作至operationList
    operationList.push({'type':'copy','nodes':nodes});
}

//右侧链体、链头、箭头、连接点button绑定
function bindRightPanel() {
    //链体
    $('#body-save-btn').click(function () {
        var bid = $('#body-panel').attr('data-bid');
        bodyList[bid]['node'].text = $('#body-name').val();
        bodyList[bid]['type'] = $('#body-evidenceType').val();
        bodyList[bid]['committer'] = $('#body-committer').val();
        bodyList[bid]['reason'] = $('#body-evidenceReason').val();
        bodyList[bid]['conclusion'] = $('#body-evidenceConclusion').val();
        var con = $('#body-content').val();
        bodyList[bid]['node'].content = con;
        var name = $('#body-name').val();
        if(name==null||name.length==0){
            bodyList[bid]['node'].text = con;
        }

        var filter_content = '.evidence[data-id='+bid+']';
        var p_div = $(filter_content);

        if(p_div!=null&&p_div.length>0){
            if(con==null||con.length==0)
                con = $('#body-name').val();
            p_div.find('.evidence_a').html(con);
        }
    });

    $('#body-reset-btn').click(function () {
        var bid = $('#body-panel').attr('data-bid');
        $('#body-name').val(bodyList[bid]['node'].text);
        $('#body-evidenceType').val(bodyList[bid]['type']);
        $('#body-committer').val(bodyList[bid]['committer']);
        $('#body-evidenceReason').val(bodyList[bid]['reason']);
        $('#body-evidenceConclusion').val(bodyList[bid]['conclusion']);
        $('#body-content').val(bodyList[bid]['node'].content);
    });

    $('#body-del-btn').click(function () {
        var bid = $('#body-panel').attr('data-bid');
        if(bodyList[bid]!=null){
            var body = bodyList[bid];
            var cont = {'type':body['type'],'committer':body['committer'],'reason':body['reason'],
                'conclusion':body['conclusion'], 'documentID':body['documentID'],'isDefendant':body['isDefendant'],'trust':body['trust']};
            //添加操作至operationList
            operationList.push({'type':'delete','nodes':[{'node':body['node'],'content':cont}]});
            deleteBody(bid);
        }
    });

    //链头
    $('#head-save-btn').click(function () {
        var hid = $('#head-panel').attr('data-hid');
        headerList[hid].text = $('#head-name').val();
        var con = $('#head-content').val();
        headerList[hid].content = con;

        var name = $('#head-name').val();
        if(name==null||name.length==0){
            headerList[hid].text = con;
        }

        var filter_content = '.head_chain[data-id='+hid+']';
        var p_div = $(filter_content);

        if(p_div!=null&&p_div.length>0){
            if(con==null||con.length==0)
                con = $('#head-name').val();
            p_div.html(con);
        }
    });

    $('#head-reset-btn').click(function () {
        var hid = $('#head-panel').attr('data-hid');
        $('#head-name').val(headerList[hid].text);
        $('#head-content').val(headerList[hid].content);
    });

    $('#head-del-btn').click(function () {
        var hid = $('#head-panel').attr('data-hid');
        if(headerList[hid]!=null){
            //添加操作至operationList
            operationList.push({'type':'delete','nodes':[{'node':headerList[hid]}]});
            deleteHeader(hid);
        }
    });

    //箭头
    $('#arrow-save-btn').click(function () {
        var aid = $('#arrow-panel').attr('data-aid');
        arrowList[aid].text = $('#arrow-name').val();
        arrowList[aid].content = $('#arrow-content').val();
    });

    $('#arrow-reset-btn').click(function () {
        var aid = $('#arrow-panel').attr('data-aid');
        $('#arrow-name').val(arrowList[aid].text);
        $('#arrow-content').val(arrowList[aid].content);
    });

    $('#arrow-del-btn').click(function () {
        var aid = $('#arrow-panel').attr('data-aid');
        //添加操作至operationList
        operationList.push({'type':'delete','nodes':[{'node':arrowList[aid]}]});
        deleteArrow(arrowList[aid]);
    });

    //连接点
    $('#joint-save-btn').click(function () {
        var jid = $('#joint-panel').attr('data-jid');
        jointList[jid]['node'].text = $('#joint-name').val();
        jointList[jid]['type'] = $('#joint-type').val();
        jointList[jid]['node'].content = $('#joint-content').val();
    });

    $('#joint-reset-btn').click(function () {
        var jid = $('#joint-panel').attr('data-jid');
        $('#joint-name').val(jointList[jid]['node'].text);
        $('#joint-type').val(jointList[jid]['type']);
        $('#joint-content').val(jointList[jid]['node'].content);
    });

    $('#joint-del-btn').click(function () {
        var jid = $('#joint-panel').attr('data-jid');
        //添加操作至operationList
        operationList.push({'type':'delete','nodes':[{'node':jointList[jid]['node'],
                'content':{'type':jointList[jid]['type']}}]});
        deleteJoint(jid);
    });
}

//添加连线(链体，链头，id)
function addLink(nodeFrom,nodeTo,id){
    // var hasLink = false;
    //
    // //判断是否已存在连线
    // if(nodeFrom.outLinks!=null)
    //     for(var i = 0;i<nodeFrom.outLinks.length;i++){
    //         if(nodeFrom.outLinks[i].nodeZ.node_type=='body'){
    //             hasLink = true;
    //             break;
    //         }
    //     }

    if(nodeTo.inLinks==null||nodeTo.inLinks.length==0){
        if(id==null)
            id = linkIndex++;

        var link = new JTopo.Link(nodeFrom, nodeTo);
        link.id = id;
        link.lineWidth = 2; // 线宽
        // link.dashedPattern = dashedPattern; // 虚线
        link.bundleOffset = 60; // 折线拐角处的长度
        link.bundleGap = 20; // 线条之间的间隔
        // link.textOffsetY = 3; // 文本偏移量（向下3个像素）
        link.strokeColor = 'black';
        link.node_type = 'link';

        link.addEventListener('mouseup', function(event){
            handleNodeMenu(event,'link',this);
        });

        link.addEventListener('mouseout', function(){
            isNodeClicked_right = false;
            isNodeClicked_left = false;
        });

        // linkList[link.id] = link;
        scene.add(link);

        addHeaderofChain(nodeTo.text,nodeTo.id,nodeFrom.id);

        return link;
    }

    return -1;
}

//删除连线
function deleteLink(link) {
    // linkList[link.id] = null;
    scene.remove(link);
}

//添加箭头(链头，连接点)，返回箭头节点，未创建返回-1
function addArrow(nodeFrom,nodeTo,id,name,content) {

    var hasArrow = false;

    //判断是否已存在箭头
    if(nodeFrom.outLinks!=null)
        for(var i = 0;i<nodeFrom.outLinks.length;i++){
            if(nodeFrom.outLinks[i].nodeZ==nodeTo){
                hasArrow = true;
                break;
            }
        }

    if(!hasArrow){

        if(name==null)
            name = '新箭头'+(arrowIndex+1);
        if(id==null)
            id = arrowIndex++;

        var arrow = new JTopo.Link(nodeFrom, nodeTo, name);
        arrow.id = id;
        arrow.content = content;
        arrow.lineWidth = 2; // 线宽
        // arrow.dashedPattern = dashedPattern; // 虚线
        arrow.bundleOffset = 60; // 折线拐角处的长度
        arrow.bundleGap = 20; // 线条之间的间隔
        // arrow.textOffsetY = 3; // 文本偏移量（向下3个像素）
        arrow.strokeColor = 'black';
        arrow.fontColor = 'black';
        arrow.arrowsRadius = 10;
        arrow.node_type = 'arrow';

        arrowList[arrow.id] = arrow;
        scene.add(arrow);

        arrow.click(function () {
            $('#body-panel').attr('hidden', 'hidden');
            $('#head-panel').attr('hidden', 'hidden');
            $('#joint-panel').attr('hidden', 'hidden');

            $('#arrow-name').val(arrow.text);
            $('#arrow-content').val(arrow.content);
            $('#arrow-panel').removeAttr("hidden");
            $('#arrow-panel').attr('data-aid',arrow.id);
        });

        arrow.addEventListener('mouseup', function(event){
            handleNodeMenu(event,'arrow',this);
        });

        arrow.addEventListener('mouseout', function(event){
            isNodeClicked_right = false;
            isNodeClicked_left = false;
        });

        return arrow;
    }

    return -1;
}

//删除箭头
function deleteArrow(arrow) {
    arrowList[arrow.id] = null;
    scene.remove(arrow);
    $('#arrow-panel').attr('hidden', 'hidden');
}

//绘制链头，返回链头节点
function drawHeader(isNew,x,y,id,name,content){

    if(id==null)
        id = headerIndex++;

    if(name==null||name.length==0){
        if(content==null||content.length==0||content.length>10)
            name = '链头'+(id+1);
        else
            name = content;
    }
    if(content==null||content.length==0){
        content = name;
    }

    var circleNode = new JTopo.CircleNode(name);
    circleNode.id = id;
    circleNode.content = content;
    circleNode.radius = header_radius; // 半径
    // circleNode.alpha = 0.7;
    // circleNode.shadow = "true";
    circleNode.fillColor = '255, 255, 255'; // 填充颜色
    circleNode.borderColor = header_color_num;
    circleNode.borderWidth = 2;
    circleNode.borderRadius = header_radius+3;
    circleNode.setLocation(x-header_radius, y-header_radius);
    circleNode.textPosition = 'Bottom_Center'; // 文本位置
    circleNode.node_type = 'header';

    headerList[circleNode.id] = circleNode;
    scene.add(circleNode);
    //添加操作至operationList
    if(isNew==true){
        operationList.push({'type':'add','nodes':[circleNode]});
    }

    circleNode.click(function () {
        $('#body-panel').attr('hidden', 'hidden');
        $('#arrow-panel').attr('hidden', 'hidden');
        $('#joint-panel').attr('hidden', 'hidden');

        $('#head-name').val(circleNode.text);
        $('#head-content').val(circleNode.content);
        $('#head-panel').removeAttr("hidden");
        $('#head-panel').attr('data-hid',circleNode.id);

        highlightEvidence();
    });

    circleNode.addEventListener('mouseup', function(event){
        handleNodeMenu(event,'header',this);
    });
    circleNode.addEventListener('mousedown', function(event){
        // console.log(this.x+"&&"+this.y);
        x_origin = this.x;
        y_origin = this.y;
        sourceNode = this;
    });

    circleNode.addEventListener('mouseout', function(event){
        isNodeClicked_right = false;
        isNodeClicked_left = false;
    });

    return circleNode;
}

//删除链头
function deleteHeader(headerID) {
    header_delete.push(headerID);
    var header = headerList[headerID];

    if(header.outLinks!=null){
        var outl = header.outLinks;
        for(var i = 0;i<outl.length;i++){
            deleteArrow(outl[i]);
        }
    }
    scene.remove(header);
    headerList[headerID] = null;
    $('#head-panel').attr('hidden', 'hidden');

    var filter_content = '.head_chain[data-id='+headerID+']';
    var p_div = $(filter_content);

    if(p_div!=null&&p_div.length>0){
        p_div.remove();
    }
}

//绘制链体，返回链体节点
function drawBody(isNew,x,y,id,name,content,type,committer,reason,conclusion,documentID,isDefendant,trust){

    if(id==null)
        id = bodyIndex++;

    if(name==null||name.length==0){
        if(content==null||content.length==0||content.length>10)
            name = '链体'+(id+1);
        else
            name = content;
    }
    if(content==null||content.length==0){
        content = name;
    }

    if(documentID==null)
        documentID = -1;
    if(isDefendant==null)
        isDefendant = 1;
    if(trust==null)
        trust = 1;

    var node = new JTopo.Node(name);
    node.id = id;
    node.content = content;
    // node.alpha = 0.7;
    node.fillColor = '255, 255, 255'; // 填充颜色
    node.borderColor = body_color_num;
    node.borderWidth = 2;
    node.setSize(body_width,body_height);
    node.setLocation(x-(body_width/2),y-(body_height/2));
    // node.shadow = "true";
    node.textPosition = 'Bottom_Center'; // 文本位置
    node.node_type = 'body';

    bodyList[node.id] = {'node':node,'type':type,'committer':committer,'reason':reason,'conclusion':conclusion,
    'documentID':documentID,'isDefendant':isDefendant,'trust':trust};
    scene.add(node);
    //添加操作至operationList
    if(isNew==true)
        operationList.push({'type':'add','nodes':[node]});

    node.click(function () {
        $('#head-panel').attr('hidden', 'hidden');
        $('#arrow-panel').attr('hidden', 'hidden');
        $('#joint-panel').attr('hidden', 'hidden');

        var bid = node.id;
        $('#body-name').val(node.text);
        $('#body-evidenceType').val(bodyList[bid]['type']);
        $('#body-committer').val(bodyList[bid]['committer']);
        $('#body-evidenceReason').val(bodyList[bid]['reason']);
        $('#body-evidenceConclusion').val(bodyList[bid]['conclusion']);
        $('#body-content').val(bodyList[bid]['node'].content);
        $('#body-panel').removeAttr("hidden");
        $('#body-panel').attr('data-bid',node.id);

        highlightEvidence();
    });
    node.addEventListener('mouseup', function(event){
        handleNodeMenu(event,'body',this);
    });
    node.addEventListener('mousedown', function(event){
        // console.log(this.x+";"+this.y);
        x_origin = this.x;
        y_origin = this.y;
        sourceNode = this;
    });

    node.addEventListener('mouseout', function(event){
        isNodeClicked_right = false;
        isNodeClicked_left = false;
    });

    if(content==null)
        content = name;
    addEvidence(node.id,content);

    return node;
}

//删除链体
function deleteBody(bodyID) {
    body_delete.push(bodyID);
    scene.remove(bodyList[bodyID]['node']);
    bodyList[bodyID] = null;

    $('#body-panel').attr('hidden', 'hidden');

    var filter_content = '.evidence[data-id='+bodyID+']';
    var p_div = $(filter_content);

    if(p_div!=null&&p_div.length>0){
        p_div.remove();
    }
}

//绘制连接点，返回连接点节点
function drawJoint(isNew,x,y,id,name,content,type){

    if(id==null)
        id = jointIndex++;

    if(name==null||name.length==0){
        if(content==null||content.length==0||content.length>10)
            name = '连接点'+(id+1);
        else
            name = content;
    }
    if(content==null||content.length==0){
        content = name;
    }

    var node = new JTopo.Node(name);
    node.id = id;
    node.content = content;
    node.fillColor = '255, 255, 255'; // 填充颜色
    node.borderColor = joint_color_num;
    node.borderWidth = 2;
    node.setSize(joint_width,joint_width);
    node.setLocation(x-(joint_width/2),y-(joint_width/2));
    node.shadow = "true";
    node.node_type = 'joint';

    jointList[node.id] = {'node':node,'type':type};
    scene.add(node);
    //添加操作至operationList
    if(isNew)
        operationList.push({'type':'add','nodes':[node]});

    node.click(function () {
        $('#head-panel').attr('hidden', 'hidden');
        $('#arrow-panel').attr('hidden', 'hidden');
        $('#body-panel').attr('hidden', 'hidden');

        $('#joint-name').val(node.text);
        $('#joint-type').val(jointList[node.id]['type']);
        $('#joint-content').val(node.content);
        $('#joint-panel').removeAttr("hidden");
        $('#joint-panel').attr('data-jid',node.id);
    });

    node.addEventListener('mouseup', function(event){
        handleNodeMenu(event,'joint',this);
    });
    node.addEventListener('mousedown', function(event){
        // console.log(this.x+"**"+this.y);
        x_origin = this.x;
        y_origin = this.y;
        sourceNode = this;
    });
    node.addEventListener('mouseout', function(event){
        isNodeClicked_right = false;
        isNodeClicked_left = false;
    });

    return node;
}

//删除连接点
function deleteJoint(jointID) {
    joint_delete.push(jointID);
    var joint = jointList[jointID]['node'];

    if(joint.inLinks!=null){
        var inl = joint.inLinks;
        for(var i = 0;i<inl.length;i++){
            deleteArrow(inl[i]);
        }
    }
    scene.remove(joint);
    jointList[jointID] = null;
    $('#joint-panel').attr('hidden', 'hidden');
}

//点击图元左侧列表相应证据高亮
function highlightEvidence() {
    $('.evidence').css('background-color', 'white');
    $('.evidence_plaintiff').css('background-color', '#5ed7e5');
    var nodeList_selected = scene.selectedElements;

    if(nodeList_selected.length>=1){

        for(var i = 0;i<nodeList_selected.length;i++){

            if(nodeList_selected[i].node_type=='header'){
                if(nodeList_selected[i].inLinks!= null){
                    var hid = nodeList_selected[i].id;
                    var filter_content = '.head_chain[data-id='+hid+']';
                    var e_div = $(filter_content);

                    e_div.css('background-color', 'yellow');
                }
            }

            if(nodeList_selected[i].node_type=='body'){
                var bid = nodeList_selected[i].id;
                var filter_content = '.evidence[data-id='+bid+']';
                var e_div = $(filter_content);

                e_div.css('background-color', 'yellow');
                e_div.find('.head_chain').css('background-color', 'yellow');
            }
        }
    }
}

//初始化右侧建模图
function initGraph(trusts,freeHeaders,joints,arrows) {

    var x = 10 + (body_width/2);
    var y = 10 + header_radius;
    var headerGap_x = 100;
    var headerGap_y = 40;
    var jointGap = 150;
    var pre_bx = -1;
    var pre_by = -1;
    var pre_hx = -1;
    var pre_hy = -1;
    var pre_jx = -1;
    var pre_jy = -1;

    for(var i = 0;i<trusts.length;i++){
        var body = trusts[i]['body'];
        var b_x = body['x'];
        var b_y = body['y'];

        if(b_x<=0){
            if(pre_bx>=0){
                b_x = pre_bx;
            }else{
                b_x = x;
            }
        }else{
            pre_bx = b_x;
        }
        if(b_y<=0){
            if(pre_by>=0){
                b_y = pre_by + body_height + headerGap_y;
            }else{
                b_y = y+(body_height + headerGap_y)*i;
            }
        }else{
            pre_by = b_y;
        }

        var b = drawBody(false,b_x,b_y,body['id'],body['name'],body['body'],body['type'],body['committer'],
            body['reason'],body['conclusion'],body['documentid'],body['isDefendant'],body['trust']);

        var headers = trusts[i]['headers'];
        for(var j = 0;j<headers.length;j++){
            var header = headers[j];
            var h_x = header['x'];
            var h_y = header['y'];

            if(h_x<=0){
                if(pre_hx>=0){
                    h_x = pre_hx;
                }else{
                    h_x = x + body_width/2 + headerGap_x + header_radius;
                }
            }else{
                pre_hx = h_x;
            }
            if(h_y<=0){
                if(pre_hy>=0){
                    h_y = pre_hy + headerGap_y + (header_radius*2);
                }else{
                    h_y = y;
                    y += headerGap_y + (header_radius*2);
                }
            }else{
                pre_hy = h_y;
            }

            var h = drawHeader(false,h_x,h_y,header['id'],header['name'],header['head']);
            addLink(b,h);

            if(j==headers.length-1){
                headerIndex = header['id']+1;
            }
        }

        if(i==trusts.length-1){
            bodyIndex = body['id']+1;
        }
    }

    for(var i = 0;i<freeHeaders.length;i++){
        var header = freeHeaders[i];
        var h_x = header['x'];
        var h_y = header['y'];

        if(h_x<=0){
            if(pre_hx>=0){
                h_x = pre_hx;
            }else{
                h_x = x + body_width/2 + headerGap_x + header_radius;
            }
        }else{
            pre_hx = h_x;
        }
        if(h_y<=0){
            if(pre_hy>=0){
                h_y = pre_hy + headerGap_y + (header_radius*2);
            }else{
                h_y = y;
                y += headerGap_y + (header_radius*2);
            }
        }else{
            pre_hy = h_y;
        }
        drawHeader(false,h_x,h_y,header['id'],header['name'],header['head']);
    }

    x+=body_width/2 + headerGap_x + header_radius;
    for(var i = 0;i<joints.length;i++){
        var joint = joints[i];
        var j_x = joint['x'];
        var j_y = joint['y'];

        if(j_x<=0){
            if(pre_jx>=0){
                j_x = pre_jx;
            }else{
                j_x = x + header_radius + jointGap + joint_width/2;
            }
        }else{
            pre_jx = j_x;
        }
        if(j_y<=0){
            if(pre_jy>=0){
                j_y = pre_jy + joint_width + headerGap_y;
            }else{
                j_y = y+(joint_width + headerGap_y)*i;
            }
        }else{
            pre_jy = j_y;
        }

        drawJoint(false,j_x,j_y,joint['id'],joint['name'],joint['content'],joint['type']);
    }

    for(var i = 0;i<arrows.length;i++){
        var arrow = arrows[i];
        addArrow(headerList[arrow['nodeFrom_hid']],jointList[arrow['nodeTo_jid']]['node'],arrow['id'],arrow['name'],arrow['content']);
    }

}

//排版
function typeSetting() {
    var x = 10 + (body_width/2);
    var y = 10 + header_radius;
    var headerGap_x = 100;
    var headerGap_y = 40;
    var jointGap = 150;
    var t = 0;

    for(var bid in bodyList){

        var body = bodyList[bid]['node'];
        body.x = x;

        var outLinks = body.outLinks;
        if(outLinks!=null)
            body.y = y+((outLinks.length-1)*(2*header_radius + headerGap_y)/2);
        else
            body.y = y+(body_height + headerGap_y)*t;

        if(outLinks!=null)
        for(var i = 0;i<outLinks.length;i++){
            var header = outLinks[i].nodeZ;
            header.x = x + body_width/2 + headerGap_x + header_radius;
            header.y = y;
            y += headerGap_y + (header_radius*2);
        }
        t++;
    }

    t = 0;
    x+=body_width/2 + headerGap_x + header_radius;
    for(var jid in jointList){
        var joint = jointList[jid]['node'];
        joint.x = x + header_radius + jointGap + joint_width/2;
        var y_max = 0;
        var y_min = 10000000;
        var inLinks = joint.inLinks;

        if(inLinks!=null){
            for(var i = 0;i<inLinks.length;i++){
                var header = inLinks[i].nodeA;
                if(header.y>y_max){
                    y_max = header.y;
                }
                if(header.y<y_min){
                    y_min = header.y;
                }
            }
            joint.y = (y_min + y_max)/2;
        }else{
            joint.y = y+(joint_width + headerGap_y)*t;
        }
        t++;
    }
}