//transfer modelJson
//and then call mytopo.js: initGraph() to display
function modelTransfer(modelJson) {
    var allfacts = modelJson['factList'];
    var facts = new Array();
    var headers = new Array();
    var joints = new Array();
    var evidences = new Array();
    var arrows = new Array();

    var f_index = 0;
    var a_index = 0;


    if (allfacts.length > 0) {
        evidences = allfacts[0]['evidenceList'];
    } else {
        evidences = [];
    }


    for (var i = 0; i < allfacts.length; i++) {
        var tempFact = allfacts[i];
        facts[f_index] = {
            id: f_index,
            name: "",
            content: tempFact['content'],
            type: ""
        };
        f_index++;

        joints.concat(tempFact['linkPointList']);

        var tempEvidences = tempFact['evidenceList'];
        for (var j = 0; j < tempEvidences.length; j++) {
            var tempHeadList = tempEvidences[j]['headList'];

            if (tempHeadList.length > 0) {
                headers.concat(tempHeadList);
            }

        }


    }

    initGraph2(evidences, headers, joints, arrows, facts);


}


function initGraph2(evidences, headers, joints, arrows, facts) {

    var x = 10 + (body_width / 2);
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
    var pre_fx = -1;
    var pre_fy = -1;

    for (var i = 0; i < evidences.length; i++) {
        var body = evidences[i];
        pre_bx = 150;
        pre_by += 150;

        var b = drawBody(true, pre_bx, pre_by, body['id'], body['name'], body['body'], body['type'], body['submitter'],
            body['reason'], body['result'], body['documentid'], body['isDefendant'], body['trust']);


    }

    console.log(headers);
    //
    //     var headers = trusts[i]['headers'];
    for (var j = 0; j < headers.length; j++) {
        var header = headers[j];
        pre_hx = 200;
        pre_hy +=150;

        var h = drawHeader(false, pre_hx, pre_hy, header['id'], header, header['head']);
        addLink(b, h);

    //     if (headerIndex < header['id']) {
    //         headerIndex = header['id'] + 1;
    //     }
    // }
    //
    //     if(bodyIndex<body['id']){
    //         bodyIndex = body['id']+1;
    //     }
    }
    //
    // for(var i = 0;i<freeHeaders.length;i++){
    //     var header = freeHeaders[i];
    //     var h_x = header['x'];
    //     var h_y = header['y'];
    //
    //     if(h_x<=0){
    //         if(pre_hx>=0){
    //             h_x = pre_hx;
    //         }else{
    //             h_x = x + body_width/2 + headerGap_x + header_radius;
    //         }
    //     }
    //     pre_hx = h_x;
    //
    //     if(h_y<=0){
    //         if(pre_hy>=0){
    //             h_y = pre_hy + headerGap_y + (header_radius*2);
    //         }else{
    //             h_y = y;
    //             y += headerGap_y + (header_radius*2);
    //         }
    //     }
    //     pre_hy = h_y;
    //
    //     drawHeader(false,h_x,h_y,header['id'],header['name'],header['head']);
    //
    //     if(headerIndex<header['id']){
    //         headerIndex = header['id']+1;
    //     }
    // }
    //
    // y = 10 + header_radius;
    // x+=body_width/2 + headerGap_x + header_radius;
    // for(var i = 0;i<facts.length;i++){
    //     var fact = facts[i];
    //     var f_x = fact['x'];
    //     var f_y = fact['y'];
    //
    //     if(f_x<=0){
    //         if(pre_fx>=0){
    //             f_x = pre_fx;
    //         }else{
    //             f_x = x + header_radius + jointGap + joint_width/2 + body_width/2 + headerGap_x + (joint_width/2);
    //         }
    //     }
    //     pre_fx = f_x;
    //
    //     if(f_y<=0){
    //         if(pre_fy>=0){
    //             f_y = pre_jy + body_height + headerGap_y;
    //         }else{
    //             f_y = y;
    //             y+=joint_width + headerGap_y;
    //         }
    //     }
    //     pre_fy = f_y;
    //
    //     drawFact(false,f_x,f_y,fact['id'],fact['name'],fact['content'],fact['type']);
    //     if(factIndex<fact['id']){
    //         factIndex = fact['id']+1;
    //     }
    // }
    //
    // y = 10 + header_radius;
    // for(var i = 0;i<joints.length;i++){
    //     var joint = joints[i];
    //     var j_x = joint['x'];
    //     var j_y = joint['y'];
    //
    //     if(j_x<=0){
    //         if(pre_jx>=0){
    //             j_x = pre_jx;
    //         }else{
    //             j_x = x + header_radius + jointGap + joint_width/2;
    //         }
    //     }
    //     pre_jx = j_x;
    //
    //     if(j_y<=0){
    //         if(pre_jy>=0){
    //             j_y = pre_jy + joint_width + headerGap_y;
    //         }else{
    //             j_y = y;
    //             y+=joint_width + headerGap_y;
    //         }
    //     }
    //     pre_jy = j_y;
    //
    //     var jnode = drawJoint(false,j_x,j_y,joint['id'],joint['name'],joint['content'],joint['type']);
    //     if(joint['factID']>=0)
    //         addLink(jnode,factList[joint['factID']]['node']);
    //     if(jointIndex<joint['id']){
    //         jointIndex = joint['id']+1;
    //     }
    // }
    //
    // for(var i = 0;i<arrows.length;i++){
    //     var arrow = arrows[i];
    //     addArrow(headerList[arrow['nodeFrom_hid']],jointList[arrow['nodeTo_jid']]['node'],arrow['id'],arrow['name'],arrow['content']);
    // }

}