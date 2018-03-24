/**
 * Created by deng on 2018/3/16.
 */
var idCounter = 0;
var borderColors = ['66, 140, 109', '253, 185, 51', '243, 113, 92', '66, 106, 179'];
var borderTypes = ["证据", "事实", "法条", "结论"];

// 储存森林，forest中每个是tree，tree中每个是node节点
var forest = Array.of();
// 存储所有link
var links = Array.of();

var isNodeRightClick = false; // 用来判断右键点击来源

var mouseX;
var mouseY;

//用于记录鼠标拖拽框选、复制粘贴的变量
var copyNodeArr = Array.of();//保存要被复制的节点数组
var mouseClickX;//鼠标上一次点击的位置X坐标（不论左键还是右键点击）
var mouseClickY;//鼠标上一次点击的位置Y坐标（不论左键还是右键点击）
var copyAreaLeft;//框选区域的最左边X坐标
var copyAreaTop;//框选区域的最上边Y坐标
//var startPosX;
//var startPosY;
//var endPosX;
//var endPosY;
//var selectedRangeNode;
//var isAnyNodeSelected = false;

$(document).ready(function () {
    canvas = document.getElementById('canvas');
    stage = new JTopo.Stage(canvas); // 创建一个舞台对象
    scene = new JTopo.Scene(stage); // 创建一个场景对象

    stage.mode = "select"; //将舞台对象的模式设置为“可选择”，这样支持框选

    stage.addEventListener("mousemove", function (event) {
        $("#posX").text(event.pageX - $("#canvas").offset().left);
        $("#posY").text(event.pageY - $("#canvas").offset().top);
    });

    stage.addEventListener("mouseup", function (event) {
        console.log("mouse up");

        mouseClickX = event.pageX - $("#canvas").offset().left;
        mouseClickY = event.pageY - $("#canvas").offset().top;

        if (!isNodeRightClick && event.button == 2) {
            $("#element-id").hide();
            $("#element-name").hide();
            $("#hr").hide();
            $("#del-element-li").hide();
            $("#mod-element-li").hide();

            mouseX = event.pageX;
            mouseY = event.pageY;

            $("#stageMenu").css({
                top: event.pageY,
                left: event.pageX
            }).show();
        } else if (event.button == 0) {
            $("#stageMenu").hide();

            //endPosX = event.pageX - $("#canvas").offset().left;
            //endPosY = event.pageY - $("#canvas").offset().top;
            $("#endPosX").text(mouseClickX);
            $("#endPosY").text(mouseClickY);
            $("#myAction").text("鼠标左键松开");

            /*
            var nodeList = scene.getDisplayedNodes();
            var length = nodeList.length;
            console.log(length);
            for (var i = 0; i < length; i++) {
                isAnyNodeSelected |= nodeList[i].selected;
            }

            //如果当前没有任何节点被选中，那么说明在移动鼠标来选定框选区
            if(isAnyNodeSelected == false) {
                //删除前一个选框
                if (selectedRangeNode != undefined) {
                    scene.remove(selectedRangeNode);
                }

                //注：只考虑肉眼能看见的选中框，非常小的区域画出来会是一个小点，不予考虑
                if (Math.abs(startPosX - endPosX) > 0.05 && Math.abs(startPosY - endPosY) > 0.05) {

                    //在场景上添加一个近似透明、不覆盖其他节点的节点，作为选中框
                    selectedRangeNode = new JTopo.Node("");
                    selectedRangeNode.setBound(startPosX, startPosY, Math.abs(endPosX - startPosX), Math.abs(endPosY - startPosY));
                    selectedRangeNode.borderColor = '155,155,155';
                    selectedRangeNode.fillColor = '255, 255, 255';
                    selectedRangeNode.borderWidth = 1;
                    selectedRangeNode.borderRadius = 1;
                    selectedRangeNode.alpha = 0.3;
                    selectedRangeNode.zIndex = 11;  // 是否覆盖其他，这里设置为可选的最小值，不覆盖其他
                    scene.add(selectedRangeNode);

                    var areaLeftPos = endPosX > startPosX ? startPosX : endPosX;
                    var areaRightPos = endPosX > startPosX ? endPosX : startPosX;
                    var areaTopPos = endPosY > startPosY ? startPosY : endPosY;
                    var areaBottomPos = endPosY > startPosY ? endPosY : startPosY;
                    console.log("Area left:"+areaLeftPos+",right:"+areaRightPos+",top:"+areaTopPos+",bottom:"+areaBottomPos);
                    for (var i = 0; i < length; i++) {
                        var tempNode = nodeList[i];
                        var thisLeftPos = tempNode.x;
                        var thisRightPos = tempNode.x+tempNode.width;
                        var thisTopPos = tempNode.y;
                        var thisBottomPos = tempNode.y+tempNode.height;
                        console.log("Node left:"+thisLeftPos+",right:"+thisRightPos+",top:"+thisTopPos+",bottom:"+thisBottomPos);
                        if ( ( (thisLeftPos >= areaLeftPos) || (thisRightPos <= areaRightPos) ) && (thisLeftPos < areaRightPos) &&
                             ( (thisTopPos >= areaTopPos) || (thisBottomPos <= areaBottomPos) ) && (thisTopPos < areaBottomPos) &&
                             ( tempNode != selectedRangeNode) ) {
                            //只要和被选中区域有交叉，这个节点就算是在选中区域内，改为被选中状态
                            tempNode.selected = true;
                            isAnyNodeSelected = true;
                            copyNodeArr.push(tempNode);
                        }
                    }
                }
            }

            //有节点被选中，那么说明已有框选区，在移动框选区中的内容
            else{
                //移动之后，将被选中的节点回复原状
                for(var i=0; i<copyNodeArr.length; i++) {
                    copyNodeArr[i].selected = false;
                }
                isAnyNodeSelected = false;
                copyNodeArr = [];

                //删除选框
                if (selectedRangeNode != undefined) {
                    scene.remove(selectedRangeNode);
                }
            }
            */
        }
    });

    window.addEventListener("mousedown", function (event) {
        console.log("mouse down");

        mouseClickX = event.pageX - $("#canvas").offset().left;
        mouseClickY = event.pageY - $("#canvas").offset().top;

        if (event.button == 0) {
            //startPosX = event.pageX - $("#canvas").offset().left;
            //startPosY = event.pageY - $("#canvas").offset().top;
            $("#startPosX").text(mouseClickX);
            $("#startPosY").text(mouseClickY);
            $("#myAction").text("鼠标左键按下");
        }
    });

    window.addEventListener("keydown", function(event) {
        //console.log("key "+event.keyCode+" pressed");

        if(event.ctrlKey && event.keyCode === 67) {
            $("#myAction").text('你按下了CTRL+C');

            //将框选区域的左边界定为场景对象的右边界，框选区域的上边界定为场景对象的下边界
            copyAreaLeft = stage.width;
            copyAreaTop = stage.height;
            //console.log(copyAreaLeft+", "+copyAreaTop);

            //循环查找当前场景中的所有显示节点，若被选中，则加入待复制的节点数组中
            var nodeList = scene.getDisplayedNodes();
            var nodeListLen = nodeList.length;
            for (var i = 0; i < nodeListLen; i++) {
                if(nodeList[i].selected) {
                    copyNodeArr.push(nodeList[i]);
                    copyAreaLeft = nodeList[i].x < copyAreaLeft ? nodeList[i].x : copyAreaLeft;//将框选区域的左边界定为所有选中节点的最小左边界值
                    copyAreaTop = nodeList[i].y < copyAreaTop ? nodeList[i].y : copyAreaTop;//将框选区域的上边界定为所有选中节点的最小上边界值
                }
            }
            console.log("现在selectedArr里面有"+copyNodeArr.length+"个节点将被复制");
        }
        if(event.ctrlKey && event.keyCode === 86) {
            $("#myAction").text('你按下了CTRL+V');

            //获取当前的鼠标位置，以当前鼠标位置作为起始位置进行粘贴
            //console.log("上一次鼠标点击位置:"+mouseClickX+","+mouseClickY);

            //逐一粘贴每个节点
            console.log("现在selectedArr里面有"+copyNodeArr.length+"个节点将被粘贴");
            for(var i = 0; i < copyNodeArr.length; i++){
                //注：这里类似于对象赋值，不能用等于号直接让新节点等于老节点
                //var thisCopyNode = new JTopo.Node(copyNodeArr[i].text);
                //console.log(copyNodeArr[i].x + ", "+copyAreaLeft+", "+mouseClickX);
                console.log("粘贴位置："+(copyNodeArr[i].x-copyAreaLeft+mouseClickX)+","+(copyNodeArr[i].y-copyAreaTop+mouseClickY));
                //thisCopyNode.setLocation((copyNodeArr[i].x-copyAreaLeft+mouseClickX), (copyNodeArr[i].y-copyAreaTop+mouseClickY));
                //scene.add(thisCopyNode);
                drawNodeWithPosition(copyNodeArr[i].text, copyNodeArr[i].type, copyNodeArr[i].detail, copyNodeArr[i].parentId,
                    (copyNodeArr[i].x-copyAreaLeft+mouseClickX), (copyNodeArr[i].y-copyAreaTop+mouseClickY));
            }
            //清空被选中的节点列表
            copyNodeArr = [];
        }

    });

    window.addEventListener("keyup", function(event) {
        //console.log("key "+event.keyCode+" released");

        if(event.ctrlKey && event.keyCode === 67) { //复制已经选中的节点或者连线
            $("#myAction").text('你松开了CTRL+C');
        }
        else if(event.ctrlKey && event.keyCode === 86) {//粘贴上次复制的节点或者连线
            $("#myAction").text('你松开了CTRL+V');
        }

    });


    bindMenuClickEvent();

    // drawNode("123", 2, 3, null);
    // drawNode("1234", 2, 3, 1);
    // drawNode("12345", 2, 3, 2);
    // drawNode("1234577", 2, 3, 2);
    // drawNode("1234577", 2, 3, 3);
    // drawNode("1234577", 2, 3, 5);
    // drawNode("123457781923123123123", 2, 3, 2);
    // drawNode("你好你好你好你好啊啊啊啊啊", 2, 3, 2);

    // drawNode("123456", 1, 3, null);
});

function drawNode(topic, type, detail, parentId) {
    // 以自增的方式生成id
    idCounter++;

    // 将中文字符以2个长度的英文字母替换
    var topicLength = 32 + topic.replace(/[\u0391-\uFFE5]/g, "aa").length * 8;

    var node = new JTopo.Node(topic);
    node.id = idCounter;
    node.borderColor = borderColors[type];

    node.fillColor = '255, 255, 255';
    node.borderWidth = 2;
    node.textPosition = 'Middle_Center';
    node.borderRadius = 3;

    // 根据内容长度决定node宽度
    node.setSize(topicLength, 24);
    // 设置树的方向
    // node.layout = {type: 'tree', direction: 'left', width: 70, height: 120};

    node.addEventListener('mouseup', function (event) {
        nodeClickEvent(node.id, event);
    });
    node.addEventListener('mouseout', function (event) {
        isNodeRightClick = false;
    });

    scene.add(node);

    if (parentId == null || parentId == "null") {
        // node.setLocation(100, 50 + forest.length * 70 + 24);
        node.setLocation(mouseX - $("#canvas").offset().left, mouseY - $("#canvas").offset().top);

        var tree = Array.of();
        tree.push({
            node: node,
            id: idCounter,
            topic: topic,
            type: type,
            detail: detail,
            parentId: parentId
        });
        forest.push(tree);

        // JTopo.layout.layoutNode(scene, node, true);
    } else {
        // 将节点插入到具体的tree中
        var targetTreeNum = -1;
        var parentNode = null;
        for (var m = 0, len1 = forest.length; m < len1; m++) {
            var tree = forest[m];
            for (var n = 0, len2 = tree.length; n < len2; n++) {
                if (parentId == tree[n].id) {
                    tree.push({
                        node: node,
                        id: idCounter,
                        topic: topic,
                        type: type,
                        detail: detail,
                        parentId: parentId
                    });

                    targetTreeNum = m;
                    parentNode = tree[n].node;
                    break;
                }
            }

            if (targetTreeNum != -1) {
                break;
            }
        }

        node.setLocation(mouseX - $("#canvas").offset().left, mouseY - $("#canvas").offset().top);

        // forest[targetTreeNum][0].node.setLocation(100 + (getTreeMaxDepth(forest[targetTreeNum]) - 1) * 120, 50);

        drawLink(parentNode, node);

        // JTopo.layout.layoutNode(scene, forest[targetTreeNum][0].node, true);
    }
}

//增加的功能，在指定的位置上画指定内容和类型的节点
function drawNodeWithPosition(topic, type, detail, parentId, posX, posY) {
    // 以自增的方式生成id
    idCounter++;

    // 将中文字符以2个长度的英文字母替换
    var topicLength = 32 + topic.replace(/[\u0391-\uFFE5]/g, "aa").length * 8;

    var node = new JTopo.Node(topic);
    node.id = idCounter;
    node.borderColor = borderColors[type];

    node.fillColor = '255, 255, 255';
    node.borderWidth = 2;
    node.textPosition = 'Middle_Center';
    node.borderRadius = 3;

    // 根据内容长度决定node宽度
    node.setSize(topicLength, 24);
    // 设置树的方向
    // node.layout = {type: 'tree', direction: 'left', width: 70, height: 120};

    node.addEventListener('mouseup', function (event) {
        nodeClickEvent(node.id, event);
    });
    node.addEventListener('mouseout', function (event) {
        isNodeRightClick = false;
    });

    scene.add(node);

    if (parentId == null || parentId == "null") {
        // node.setLocation(100, 50 + forest.length * 70 + 24);
        node.setLocation(posX, posY);

        var tree = Array.of();
        tree.push({
            node: node,
            id: idCounter,
            topic: topic,
            type: type,
            detail: detail,
            parentId: parentId
        });
        forest.push(tree);

        // JTopo.layout.layoutNode(scene, node, true);
    } else {
        // 将节点插入到具体的tree中
        var targetTreeNum = -1;
        var parentNode = null;
        for (var m = 0, len1 = forest.length; m < len1; m++) {
            var tree = forest[m];
            for (var n = 0, len2 = tree.length; n < len2; n++) {
                if (parentId == tree[n].id) {
                    tree.push({
                        node: node,
                        id: idCounter,
                        topic: topic,
                        type: type,
                        detail: detail,
                        parentId: parentId
                    });

                    targetTreeNum = m;
                    parentNode = tree[n].node;
                    break;
                }
            }

            if (targetTreeNum != -1) {
                break;
            }
        }

        node.setLocation(mouseX - $("#canvas").offset().left, mouseY - $("#canvas").offset().top);

        // forest[targetTreeNum][0].node.setLocation(100 + (getTreeMaxDepth(forest[targetTreeNum]) - 1) * 120, 50);

        drawLink(parentNode, node);

        // JTopo.layout.layoutNode(scene, forest[targetTreeNum][0].node, true);
    }
}


function drawLink(parentNode, node) {
    var link = new JTopo.Link(parentNode, node);
    scene.add(link);
    links.push(link);
}

function bindMenuClickEvent() {
    $('#add-element-li').click(function (event) {
        $('#stageMenu').hide();
        prepareAddModel(getId());
        $("#node-add-modal").modal('show')
    });

    $('#mod-element-li').click(function (event) {
        $('#stageMenu').hide();
        prepareEditModel(getId());
        $("#node-edit-modal").modal('show')
    });

    $('#del-element-li').click(function (event) {
        $('#stageMenu').hide();
        prepareDelModel(getId());
        $("#node-del-modal").modal('show')
    });

    function getId() {
        if ($('#element-id').css("display") == "none") {
            return null;
        } else {
            var idStr = $('#element-id').text();
            return idStr.substring(idStr.indexOf('：') + 1);
        }
    }
}

function prepareAddModel(id) {
    $("#node-add-modal .alert").hide();

    $("#node-add-modal #node-add-topic-input").val("");
    $("#node-add-modal #node-add-detail-input").val("");
    $("#node-add-modal #node-add-type-select").val("证据");
    $("#node-add-modal #node-add-leadTo-select").empty();

    prepareSelect($("#node-add-modal #node-add-leadTo-select"), id, null);
}

function addBtnEvent() {
    const $alert = $('#node-add-modal .alert');
    $alert.empty();
    $alert.hide();

    var topic = $('#node-add-topic-input').val();
    var detail = $('#node-add-detail-input').val();
    var type = borderTypes.indexOf($('#node-add-type-select').val());
    var leadTo = $('#node-add-leadTo-select').val();
    // 发起验证
    // const checkCode = validateAddModal();

    // if (checkCode === LogicValidate.OK) {
    //     const id = me.graphModel.insertNode(topic, type, detail, leadTo);
    //     me.logOperation(new AddOperation(id, me));
    drawNode(topic, type, detail, leadTo);
    $('#node-add-modal').modal('hide');
    // me.redraw();
    // return;
// }
//     var hint = LogicValidator.generateHint(checkCode);
//     if (hint) {
//         $alert.append(hint);
//         $alert.show();
//     }
}

function prepareEditModel(id) {
    $("#node-edit-modal .alert").hide();
    var node = findNodeById(id);
    $("#node-edit-modal #node-edit-type-select").removeAttr("disabled");
    $("#node-edit-modal #node-edit-leadTo-select").removeAttr("disabled");
    if (node) {
        $("#node-edit-modal #node-edit-id-input").val(node.id);
        $("#node-edit-modal #node-edit-topic-input").val(node.topic);
        $("#node-edit-modal #node-edit-detail-input").val(node.detail);
        $("#node-edit-modal #node-edit-type-select").val(borderTypes[node.type]);

        prepareSelect($("#node-edit-modal #node-edit-leadTo-select"), null, node.id);
        $("#node-edit-modal #node-edit-leadTo-select").val(node.parentId ? node.parentId : "null");
    }
}

function editBtnEvent() {
    const $alert = $('#node-edit-modal .alert');
    $alert.empty();
    $alert.hide();

    const id = $('#node-edit-id-input').val();
    const topic = $('#node-edit-topic-input').val();
    const detail = $('#node-edit-detail-input').val();
    const type = borderTypes.indexOf($('#node-edit-type-select').val());
    const leadTo = $('#node-edit-leadTo-select').val();

    // 发起验证
    // const checkCode = LogicValidator.validateEditModal(me.graphModel);

    // if (checkCode === LogicValidate.OK) {
    //     me.logOperation(new RemoveAndEditOperation(me.graphModel, me));
    //     me.graphModel.modifyNode(id, topic, type, detail, leadTo);

    var node = findNodeById(id);

    // 修改forest内数据
    moveNode(id, leadTo);

    // 修改连线
    editLink(id, node.parentId, id, leadTo);

    // 修改node信息
    node.topic = topic;
    node.detail = detail;
    node.type = type;
    node.parentId = leadTo;

    // 修改图上的node文字、宽度、边框颜色
    var topicLength = 32 + topic.replace(/[\u0391-\uFFE5]/g, "aa").length * 8;
    node.node.setSize(topicLength, 24);
    node.node.text = topic;
    node.node.borderColor = borderColors[type];


    $('#node-edit-modal').modal('hide');
    $(".node-info-wrapper .node-panel").hide();
    // me.redraw();
    // return;
    // }
    // const hint = LogicValidator.generateHint(checkCode);
    // if (hint) {
    //     $alert.append(hint);
    //     $alert.show();
    // }
}

function prepareDelModel(id) {
    var node = findNodeById(id);
    var parentTopic = node && node.parentId != "null" ? findNodeById(node.parentId).topic : "";
    $("#node-del-modal .del-id-td").text(node.id);
    $("#node-del-modal .del-topic-td").text(node.topic);
    $("#node-del-modal .del-type-td").text(borderTypes[node.type]);
    $("#node-del-modal .del-detail-td").text(node.detail);
    $("#node-del-modal .del-leadTo-td").text(node.parentId + " " + parentTopic);
}

// 删除当前节点。如果当前节点非根节点，子节点向上移动；若为根节点，则删除该树
function delNodeBtnEvent() {
    var id = $('#node-del-modal table .del-id-td').text();

    var node = findNodeById(id);
    var treeNum = findTreeNumOfNode(id);
    var tree = forest[treeNum];
    if (tree.indexOf(node) == 0) {
        // 删除该棵树的所有连线和node
        for (var m = 0, len = tree.length; m < len; m++) {
            var nodeA = tree[m];
            scene.remove(nodeA.node);

            for (var n = 0; n < m; n++) {
                var nodeZ = tree[n];
                editLink(nodeA.id, nodeZ.id, null, null);
            }
        }

        forest.splice(treeNum, 1);
    } else {
        var parentNode = findNodeById(node.parentId);
        for (var i = 0; i < tree.length; i++) {
            var nodeZ = tree[i];
            if (nodeZ.id != node.id) {
                editLink(node.id, nodeZ.id, null, null);
                if (parentNode.id != nodeZ.id) {
                    drawLink(parentNode.node, nodeZ.node);
                }
            }
        }
        scene.remove(node.node);
        tree.splice(tree.indexOf(node), 1);
    }
    $('#node-del-modal').modal('hide');
}

// 删除当前节点及其子节点
function delNodeAndItsChildrenBtnEvent() {
    var delNodes = Array.of();
    var node = findNodeById($('#node-del-modal table .del-id-td').text());
    delNodes.push(node);

    // 递归删除子节点
    delNodeAndItsChildren(delNodes, node.id);
    // 删除当前节点
    scene.remove(node.node);
    editLink(node.id, node.parentId, null, null);

    // 删除node在树中的信息
    var tree = forest[findTreeNumOfNode(node.id)];
    for (var m = 0, len = delNodes.length; m < len; m++) {
        tree.splice(tree.indexOf(delNodes[m]), 1);
    }

    $('#node-del-modal').modal('hide');
}

function delNodeAndItsChildren(delNodes, id) {
    var node = findNodeById(id);
    var treeNum = findTreeNumOfNode(id);
    var tree = forest[treeNum];
    for (var m = 0, len = tree.length; m < len; m++) {
        var nodeA = tree[m];
        if (nodeA.parentId == id) {
            delNodes.push(nodeA);

            scene.remove(nodeA.node);
            editLink(nodeA.id, node.id, null, null);
            delNodeAndItsChildren(delNodes, nodeA.id);
        }
    }
}

// 生成"指向"下拉框内容
function prepareSelect($select, id, self) {
    $select.empty();
    if (id) {
        // 只添加所选节点信息
        var node = findNodeById(id);
        $select.append("<option value='" + id + "'>" + id + " " + node.topic + "</option>");
    } else {
        // 将除self以外的所有节点信息增加到"指向"中
        var html = "";
        html += "<option value='null'>无</option>"
        for (var m = 0, len1 = forest.length; m < len1; m++) {
            var tree = forest[m];
            for (var n = 0, len2 = tree.length; n < len2; n++) {
                var id = parseInt(tree[n].id);
                if (id != self) {
                    html += "<option value='" + id + "'>" + id + " " + tree[n].topic + "</option>";
                }
            }
        }
        $select.append(html);
    }
}

// node左键点击显示信息panel，右键点击弹出菜单
function nodeClickEvent(id, event) {
    var node = findNodeById(id);
    if (event.button == 2) {// 右键
        isNodeRightClick = true;

        mouseX = event.pageX;
        mouseY = event.pageY;

        $("#element-id").show();
        $("#element-name").show();
        $("#hr").show();
        $("#del-element-li").show();
        $("#mod-element-li").show();

        $("#element-id").html("<a>id：" + id + "</a>");
        $("#element-name").html("<a>名称：" + node.topic + "</a>");

        // 当前位置弹出菜单（div）
        $("#stageMenu").css({
            top: event.pageY,
            left: event.pageX
        }).show();
    } else if (event.button == 0) {
        // 左键点击节点显示node的信息panel
        $(".node-info-wrapper .node-panel .alert").hide();
        var $infoPanel = $(".node-info-wrapper .node-panel");
        var $panelIdInput = $(".node-info-wrapper #panel-id-input");
        var $panelTopicInput = $(".node-info-wrapper #panel-topic-input");
        var $panelTypeSelect = $(".node-info-wrapper #panel-type-select");
        var $panelLeadToSelect = $(".node-info-wrapper #panel-leadTo-select");
        var $panelDetailInput = $(".node-info-wrapper #panel-detail-input");

        // 清掉各种状态
        $infoPanel.removeClass("panel-primary panel-info panel-danger panel-success panel-warning");
        $panelTypeSelect.removeAttr("disabled");
        $panelLeadToSelect.removeAttr("disabled");

        // 填入信息
        $panelIdInput.val(node.id);
        $panelTopicInput.val(node.topic);
        $panelDetailInput.val(node.detail);
        $panelTypeSelect.val(borderTypes[node.type]);
        // LogicPainter.fillLeadToSelect(graphModel, node.id, node.type, $(".node-info-wrapper #panel-leadTo-select"));
        prepareSelect($(".node-info-wrapper #panel-leadTo-select"), null, node.id);
        $(".node-info-wrapper #panel-leadTo-select").val(node.parentId ? node.parentId : "null");

        switch (node.type) {
            case 0:
                $infoPanel.addClass("panel-success");
                break;
            case 1:
                $infoPanel.addClass("panel-warning");
                break;
            case 2:
                $infoPanel.addClass("panel-danger");
                break;
            case 3:
                $infoPanel.addClass("panel-info");
                break;
        }

        $infoPanel.show();
    }
}

function editLink(oldNodeAId, oldNodeZId, newNodeAId, newNodeZId) {
    var oldLink = findLinkByNodeId(oldNodeAId, oldNodeZId);
    if (oldLink != null) {
        scene.remove(oldLink);
        links.splice(links.indexOf(oldLink), 1);
    }

    if ((newNodeAId != null && newNodeAId != "null") && (newNodeZId != null && newNodeZId != "null")) {
        var newLink = new JTopo.Link(findNodeById(newNodeAId).node, findNodeById(newNodeZId).node);
        scene.add(newLink);
        links.push(newLink);
    }
}

// 移动节点时，需要修改forest内存储的数据
function moveNode(id, newParentId) {
    if (newParentId == null || newParentId == "null") {
        var tree = Array.of();
        var oldTree = forest[findTreeNumOfNode(id)];
        var nodeLoc = oldTree.indexOf(findNodeById(id));
        for (var i = nodeLoc, len = oldTree.length; i < len; i++) {
            tree.push(oldTree[i]);
        }
        oldTree.splice(nodeLoc);
        forest.push(tree);
    } else {
        for (var m = 0, len = forest.length; m < len; m++) {
            // 判断当前节点是否是一棵树的根节点
            if (forest[m][0].id == id) {
                // 直接将原树的节点拼接到新树后
                var newTree = forest[findTreeNumOfNode(newParentId)];
                for (var n = 0, len2 = forest[m].length; n < len2; n++) {
                    newTree.push(forest[m][n]);
                }

                // 删除原树
                forest.splice(m, 1);

                return;
            }
        }

        // 不是根节点，判断是否迁移到另一棵树上
        var oldTreeNum = findTreeNumOfNode(id);
        var newTreeNum = findTreeNumOfNode(newParentId);
        if (oldTreeNum != newTreeNum) {
            var node = findNodeById(id);
            // 节点需要迁移到另一棵树上，将node移动到新树上然后从原树上删除
            forest[newTreeNum].push(node);
            console.log(node);
            console.log(forest[oldTreeNum].indexOf(node));
            forest[oldTreeNum].splice(forest[oldTreeNum].indexOf(node), 1);
        }
        // 不需要迁移到另一棵树上时不需要修改forest内的数据内容
        return;
    }
}

// 根据link的两个端点找到link
function findLinkByNodeId(nodeAId, nodeZId) {
    for (var i = 0, len = links.length; i < len; i++) {
        var link = links[i];
        if (link.nodeA.id == nodeAId && link.nodeZ.id == nodeZId || link.nodeA.id == nodeZId && link.nodeZ.id == nodeAId) {
            return link;
        }
    }
    return null;
}

// 根据node的id获得node信息
function findNodeById(id) {
    for (var m = 0, len1 = forest.length; m < len1; m++) {
        var tree = forest[m];
        for (var n = 0, len2 = tree.length; n < len2; n++) {
            if (id == tree[n].id) {
                return tree[n];
            }
        }
    }
    return null;
}

// 找到node所在树的序号
function findTreeNumOfNode(id) {
    for (var m = 0, len1 = forest.length; m < len1; m++) {
        var tree = forest[m];
        for (var n = 0, len2 = tree.length; n < len2; n++) {
            if (tree[n].id == id) {
                return m;
            }
        }
    }
}
