/**
 * 获取数据库中画布节点数据
 */
function loadLogicNodes() {
	$.ajax({
		type : "GET",
		url : "/logic/getAll",
		data : {
			caseID : cid
		},
		async : false,
		success : function(data) {
			loadData(data);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest.status);
			alert(XMLHttpRequest.readyState);
			alert(textStatus);
		}
	});
}

/**
 * 将画布节点数据保存至数据库中
 * 
 * @param data
 */
function saveLogicNodes(data) {
	$.ajax({
		type : "POST",
		url : "/logic/saveAll?caseID=" + cid,
		data : data,
		contentType : "application/json",
		success : function(data) {
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest.status);
			alert(XMLHttpRequest.readyState);
			alert(textStatus);
		}
	});
}

/**
 * 查询根据频率统计推荐的法条数据
 * 
 * @param detail
 * @returns {Array}
 */
function queryFrequencyLaws(detail) {
	var lawsDiv = $("#laws");
	lawsDiv.empty();
	$('#id_loading').show();
	var timer = setInterval(loadingDots, 1000);

	$.ajax({
		type : "GET",
		url : "http://127.0.0.1:8088/frequency",
		async : false,
		data : {
			content : detail,
			limit : 20
		},
		success : function(data) {
			var laws = [];
			for (var i = 0; i < data.length; i++) {
				laws.push(data[i].law);
			}

			$('#id_loading').hide();
			clearInterval(timer);
			prepareLawsDiv(lawsDiv, laws);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest.status);
			alert(XMLHttpRequest.readyState);
			alert(textStatus);
		}
	});
}

function queryMindLaws(detail) {
	var lawsDiv = $("#laws");
	lawsDiv.empty();
	$('#id_loading').show();
	var timer = setInterval(loadingDots, 1000);

	$.ajax({
		type : "POST",
		url : "http://127.0.0.1:5000/query",
		data : {
			content : detail
		},
		success : function(data) {
			$('#id_loading').hide();
			clearInterval(timer);
			prepareLawsDiv(lawsDiv, eval(data));
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest.status);
			alert(XMLHttpRequest.readyState);
			alert(textStatus);
		}
	});
}