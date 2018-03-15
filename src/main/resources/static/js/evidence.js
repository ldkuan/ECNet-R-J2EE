
$(function(){
    var caseID = "XXXXXXXXXX";
    var caseBrief = "XXXXXXXXXX";
    var caseContent = "XXXXXXXXX纠纷一案";
    var underTaker = "XXX";
    var caseDate = "XXX";

    $("#caseID").text(caseID);
    $("#caseBrief").text(caseBrief);
    $("#caseContent").text(caseContent);
    $("#underTaker").text(underTaker);
    $("#caseDate").text(caseDate);

    initEvidences();
});

function initEvidences() {
    var evidences_adoption = [{"证据":"证据1XXXXXXXXXXXXXXX","链头":["链头1","链头2"],"原告":1},
        {"证据":"证据2XXXXXXXXXXXXXXX","链头":["链头1","链头2"],"原告":0},
        {"证据":"证据3XXXXXXXXXXXXXXX","链头":["链头1","链头2"],"原告":0}];
    initList("#adoption",evidences_adoption);


    var evidences_rejection = [{"证据":"证据1XXXXXXXXXXXXXXX","链头":["链头1","链头2"],"原告":1},
        {"证据":"证据2XXXXXXXXXXXXXXX","链头":["链头1","链头2"],"原告":0},
        {"证据":"证据3XXXXXXXXXXXXXXX","链头":["链头1","链头2"],"原告":0}];
    initList("#rejection",evidences_rejection);
}

//初始化采信未采信列表
function initList(parentID,evidences) {

    var content = "";
    var headerId = 0;

    for(var i = 0;i<evidences.length;i++){
        var evidenceTemp = evidences[i];
        var classTemp = "evidence evidence_splitLine";
        var idTemp = "heads_chain";
        var dataattr_body = "";
        var dataattr_header = "";
        // if(i<evidences.length-1)
        //     classTemp+=" evidence_splitLine";
        if(evidenceTemp['原告']==1)
            classTemp += " evidence_plaintiff";
        if(parentID=='#rejection') {
            idTemp += "_";
        }else{
            dataattr_body = "data-id='"+i+"'";
        }

        content+="<div class=\""+classTemp+"\" "+dataattr_body+">\n" +
            "                            <a data-toggle=\"collapse\" href=\"#"+idTemp+i+"\" class=\"evidence_a\">\n" +
            evidenceTemp['证据']+"</a>" +
            "                            <div id=\""+idTemp+i+"\" class=\"panel-collapse collapse in\">\n" +
            "                                <div class=\"head_div\">";

        for(var j = 0;j<evidenceTemp['链头'].length;j++){
            if(parentID=='#adoption') {
                dataattr_header = "data-id='"+(headerId++)+"'";
            }
            content+="<span class=\"head_chain\" "+dataattr_header+">"+evidenceTemp['链头'][j]+"</span>";
        }
        content+="</div></div></div>";
    }
    $(parentID).find(".panel-body").html(content);
}

//添加采信证据，id:链体id，evidence_content:证据内容
function addEvidence(id,evidence_content) {

    var filter_content = '.evidence[data-id='+id+']';
    var p_div = $(filter_content);

    if(p_div==null||p_div.length==0){
        var div_html="<div class=\"evidence evidence_splitLine\" data-id='"+id+"'>\n" +
            "                            <a data-toggle=\"collapse\" href=\"#heads_chain"+id+"\" class=\"evidence_a\">\n" +
            evidence_content+"</a></div>";

        $("#adoption").find(".panel-body").append(div_html);
    }
}

//添加链头
function addHeaderofChain(header_content,header_id,body_id) {
    var filter_content = '.evidence[data-id='+body_id+']';
    var p_div = $(filter_content);

    if(p_div!=null&&p_div.length>0){
        var id = p_div.find('a').first().attr("href").substring(1);

        if(p_div.find('.head_div')==null||p_div.find('.head_div').length==0){

            var add_html = " <div id=\""+id+"\" class=\"panel-collapse collapse in\">\n" +
                "                                <div class=\"head_div\">" +
                "<span class=\"head_chain\" data-id='"+header_id+"'>"+header_content+"</span></div></div>";
            p_div.append(add_html);
        }else{
            var header_div = p_div.find('span[data-id='+header_id+']');

            if(header_div==null||header_div.length==0){
                var add_html = "<span class=\"head_chain\" data-id='"+header_id+"'>"+header_content+"</span>";
                p_div.find('.head_div').append(add_html);
            }
        }
    }
}