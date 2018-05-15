/**
 * Created by deng on 2018/3/16.
 */
var idCounter = 0;
var borderColors = [ '66, 140, 109', '253, 185, 51', '243, 113, 92',
		'66, 106, 179' ];
var borderTypes = [ "证据", "事实", "法条", "结论" ];

// 储存森林，forest中每个是tree，tree中每个是node节点
var forest = Array.of();
// 保存历史节点
var historyForests = Array.of();
// 存储所有link
var links = Array.of();
// 保存历史连线
var historyLinks = Array.of();
// 用来判断右键点击来源
var isNodeRightClick = false;
// 当前图是直线图or曲线图
var isCurve = false;
// 用来判断是否进行了拖拽行为
var isDragged = false;

var mouseX;
var mouseY;

var dotNum = 0;

var logicJson = [];
var json = {};

function getRelation() {
	// var data = new FormData($('#uploadForm')[0]);
	$.ajax({
		type : "GET",
		dataType : "json",
		url : "logic/upload",
		data : {
			path : ''
		},
		// async : false,
		// cache : false,
		// contentType : false,
		// processData : false,
		success : function(data) {
			// console.log(data);
			// loadData(data.json);
			// compose();
		},
	});
}

$(document)
		.ready(
				function() {
					canvas = document.getElementById('canvas');
					stage = new JTopo.Stage(canvas); // 创建一个舞台对象
					scene = new JTopo.Scene(stage); // 创建一个场景对象

					stage.mode = "select"; // 将舞台对象的模式设置为“可选择”，这样支持框选

					stage.addEventListener("mousemove", function(event) {
						$("#posX").text(
								event.pageX - $("#canvas").offset().left);
						$("#posY")
								.text(event.pageY - $("#canvas").offset().top);
					});

					stage.addEventListener("mousedown", function(event) {
						saveScene();
					});

					stage.addEventListener("mousedrag", function(event) {
						isDragged = true;
					});

					stage.addEventListener("mouseup", function(event) {
						if (!isNodeRightClick && event.button == 2) {
							$("#element-id").hide();
							$("#element-name").hide();
							$("#hr").hide();
							$("#del-element-li").hide();
							$("#mod-element-li").hide();
							$("#hr2").hide();
							$("#advice-element-li").hide();
							$("#mul-advice-element-li").hide();
							$("#add-element-li").show();

							mouseX = event.pageX;
							mouseY = event.pageY;

							$("#stageMenu").css({
								top : event.pageY,
								left : event.pageX
							}).show();
						} else if (event.button == 0) {
							$("#stageMenu").hide();
						}

						if (!isDragged) {
							deleteScene();
						}
						isDragged = false;
					});

					bindMenuClickEvent();

					$('#print-btn').click(function() {
						stage.saveImageInfo(undefined, undefined, "文书说理逻辑图");
					});
					// $('#save-btn').click(function() {
					// saveData();
					// });
					// $('#excel-btn').attr("href",
					// "/logic/generateExcel?caseID=" + cid);
					// $('#xml-btn').attr("href", "/logic/generateXML?caseID=" +
					// cid);

					// 每五秒自动保存
					// setInterval("saveData()",5000);

					// loadLogicNodes();
					// getRelation();
					// let ss = [];
					// let zj = [];
					// $.getJSON("logic/getJson", function(data) {
					// var evidence = data.json.factList;
					// var len = evidence.length;
					// for (var i = 0; i < evidence.length; i++) {
					// ss.push({
					// "id" : i + 1,
					// "caseID" : 41722,
					// "nodeID" : i + 1,
					// "parentNodeID" : -1,
					// "topic" : "事实" + (i + 1),
					// "detail" : evidence[i].content,
					// "type" : 1,
					// "x" : 80,
					// "y" : 50 * (i + 1)
					// });
					// var link = evidence[i].linkPointList;
					// for (var j = 0; j < link.length; j++) {
					// zj.push({
					// "id" : len + zj.length + 1,
					// "caseID" : 41722,
					// "nodeID" : len + zj.length + 1,
					// "parentNodeID" : i + 1,
					// "topic" : evidence[i].evidenceList[link[j].index].name,
					// "detail" :
					// evidence[i].evidenceList[link[j].index].content,
					// "type" : 0,
					// "x" : 80,
					// "y" : 50 * (len + zj.length + 1)
					// })
					// }
					// }
					// logicJson = ss.concat(zj);
					// loadData(logicJson);
					// compose();
					// json.json = logicJson;
					// });
					logicJson = [
							{
								"id" : 3,
								"caseID" : 41722,
								"nodeID" : 3,
								"parentNodeID" : 1,
								"topic" : "事实1",
								"detail" : "2015年3月10日19时58分许，被告人罗某甲驾驶湘N×××××小型面包车在怀化市鹤城区迎丰路由东往西行驶，当该车行驶至迎丰东路市四中门口路段时因未注意避让行人，将横穿马路的被害人彭某乙撞倒后驾车逃逸。",
								"type" : 1,
								"x" : 80,
								"y" : 150
							},
							{
								"id" : 15,
								"caseID" : 41722,
								"nodeID" : 15,
								"parentNodeID" : 1,
								"topic" : "事实2",
								"detail" : "当日20时01分许，被告人胡某甲驾驶湘N×××××小型出租车从鹤城区迎丰路由东往西行驶路过该路段时，因超速行驶将上述交通事故受伤倒地的被害人彭某乙再次碾压，造成被害人彭某乙当场死亡的重大交通事故。",
								"type" : 1,
								"x" : 80,
								"y" : 750
							},
							{
								"id" : 26,
								"caseID" : 41722,
								"nodeID" : 26,
								"parentNodeID" : 1,
								"topic" : "事实3",
								"detail" : "经公安交警部门认定，被告人罗某甲、胡某甲负此次事故的主要责任，被害人彭某乙负此次事故的次要责任。",
								"type" : 1,
								"x" : 80,
								"y" : 1300
							},
							{
								"id" : 33,
								"caseID" : 41722,
								"nodeID" : 33,
								"parentNodeID" : 28,
								"topic" : "事实4",
								"detail" : "案发后，被告人胡某甲在事故现场等待交警部门处理。",
								"type" : 1,
								"x" : 80,
								"y" : 1650
							},
							{
								"id" : 35,
								"caseID" : 41722,
								"nodeID" : 35,
								"parentNodeID" : 28,
								"topic" : "事实5",
								"detail" : "后二被告人及湘N×××××小型面包车车主、湘N×××××小型出租车车主共同赔偿了被害人近亲属各项损失费63．5万元，取得被害人近亲属的谅解。",
								"type" : 1,
								"x" : 80,
								"y" : 1750
							},
							{
								"id" : 4,
								"caseID" : 41722,
								"nodeID" : 4,
								"parentNodeID" : 3,
								"topic" : "户籍证明",
								"detail" : "证明被告人罗某甲、胡某甲及被害人彭某乙的身份情况。",
								"type" : 0,
								"x" : 80,
								"y" : 200
							},
							{
								"id" : 5,
								"caseID" : 41722,
								"nodeID" : 5,
								"parentNodeID" : 3,
								"topic" : "公安机关出具的到案经过",
								"detail" : "公安机关出具的到案经过，证明抓获被告人罗某甲的事实经过以及被告人胡某甲案发后在现场等候交警部门处理情况。",
								"type" : 0,
								"x" : 80,
								"y" : 250
							},
							{
								"id" : 6,
								"caseID" : 41722,
								"nodeID" : 6,
								"parentNodeID" : 3,
								"topic" : "机动车驾驶证信息",
								"detail" : "机动车驾驶证信息，证明被告人罗某甲、胡某甲办理了机动车驾驶证。机动车登记信息及行驶证（复印件），证明肇事车辆湘N×××××小型面包车所有人系包太全、肇事车辆湘N×××××小型出租车所有人系陈高兵。",
								"type" : 0,
								"x" : 80,
								"y" : 300
							},
							{
								"id" : 7,
								"caseID" : 41722,
								"nodeID" : 7,
								"parentNodeID" : 3,
								"topic" : "公安局凭证",
								"detail" : "怀化市公安局交通警察支队事故处理大队公安交通管理行政强制措施凭证，证明怀化市公安局交通警察支队事故处理大队对被告人罗某甲、胡某甲所驾驶的肇事车辆依法予以扣留的情况。",
								"type" : 0,
								"x" : 80,
								"y" : 350
							},
							{
								"id" : 8,
								"caseID" : 41722,
								"nodeID" : 8,
								"parentNodeID" : 3,
								"topic" : "胡某乙的证言",
								"detail" : "证明2015年3月10日20时许，其开车至怀化市鹤城区皇廷大酒店门前路段时，突然发现车前方一辆银灰色面包车将一位行人撞倒在靠近中心隔离墩右边第一根车道上，其立刻将车停下，发现肇事面包车将行人撞倒后继续往前行驶了6-7米远的距离踩了一脚刹车，但是车子没有停，而是加大油门飞快往前方驶去逃离了案发现场，于是其打了右转向灯避开行人后也走了。并证明行人是被面包车的左前方车头撞倒的，行人被撞后意识还比较清醒，双手还可以活动，但不能站起来。",
								"type" : 0,
								"x" : 80,
								"y" : 400
							},
							{
								"id" : 9,
								"caseID" : 41722,
								"nodeID" : 9,
								"parentNodeID" : 3,
								"topic" : "李某的证言",
								"detail" : "证明2015年3月10日19时50分许，其与丈夫从怀化市鹤城区盛世佳园往老市公安局方向散步，其二人走到怀化市四中大门口路段时，就发现一个老人半躺在马路中间，老人前方大约17米左右有一辆银灰色五菱面包车，面包车驾驶员好像知道发生了交通事故，但是没有停车，继续开车往市委方向走了，于是其丈夫拦下一辆私家车去追逃跑的面包车。当时行人意识比较清醒，还知道呼叫驾驶员停车。后老人被一辆黄色出租车撞击，拖离原案发地30米左右，被车辆压在车底下，后被人拖出车底。",
								"type" : 0,
								"x" : 80,
								"y" : 450
							},
							{
								"id" : 10,
								"caseID" : 41722,
								"nodeID" : 10,
								"parentNodeID" : 3,
								"topic" : "罗某乙的证言",
								"detail" : "证明2015年3月10日19时30分许，其和罗群在罗某甲家吃完饭，罗某甲说开车送其与罗群去河西，于是其和罗群坐上罗某甲驾驶的车牌为湘N×××××号面包车，当时其坐在副驾驶上一直玩手机，在回河西的路上罗某甲说要回乡下去接他亲戚，正好其也要回去带点腊肉上来，于是罗某甲就驾车去了辰溪县长田湾，快到家的时候罗某甲发现面包车左边的反光镜坏了，其没问什么情况。第二天早上8、9点钟，罗某甲给其打电话说交警队的民警要他把车开到交警队去看一下，其就要罗某甲开过去看看。",
								"type" : 0,
								"x" : 80,
								"y" : 500
							},
							{
								"id" : 11,
								"caseID" : 41722,
								"nodeID" : 11,
								"parentNodeID" : 3,
								"topic" : "罗某甲的供述",
								"detail" : "证明2015年3月10日20时许，其驾驶湘N×××××的小型面包车从鹤城区三眼桥小当家幼儿园旁的一楼出租房送罗某乙和罗群去河西建材市场，途径鹤城区迎丰路第四中学门口路段时，车子撞到了一名横过马路的行人，当时其发现了，车上的罗某乙就叫其开车快走，其心里害怕，没有停车继续往前面开走了。第二天其开车到怀化市市委门口，就被执勤的公安民警抓获了。",
								"type" : 0,
								"x" : 80,
								"y" : 550
							},
							{
								"id" : 12,
								"caseID" : 41722,
								"nodeID" : 12,
								"parentNodeID" : 3,
								"topic" : "怀化市方正司法鉴定中心司法鉴定意见",
								"detail" : "证明被害人彭某乙系交通事故中车辆碰撞致颅脑损伤，颅内出血及胸腔脏器损伤导致呼吸循环衰竭而死亡。其骨骨折，颅脑损伤，颅内出血，颈椎骨折脱位，颈髓损伤死亡。右面部、右颈肩部及右胸腹外侧损伤系车辆碾压，挤压所形成。",
								"type" : 0,
								"x" : 80,
								"y" : 600
							},
							{
								"id" : 13,
								"caseID" : 41722,
								"nodeID" : 13,
								"parentNodeID" : 3,
								"topic" : "湖南明鉴司法鉴定所交通事故交通事故现场散落物比对分析鉴定意见",
								"detail" : "湖南明鉴司法鉴定所交通事故交通事故现场散落物比对分析鉴定意见，证明经检验，2015年3月10日发生在怀化市四中学校门前路段的交通事故现场遗留车辆散落物（左侧后视镜）与湘N×××××五菱牌小型面包车缺失的左侧后视镜相吻合。",
								"type" : 0,
								"x" : 80,
								"y" : 650
							},
							{
								"id" : 14,
								"caseID" : 41722,
								"nodeID" : 14,
								"parentNodeID" : 3,
								"topic" : "道路交通事故现场勘查笔录、交通事故情况记录、交通事故现场图及照片。",
								"detail" : "道路交通事故现场勘查笔录、交通事故情况记录、交通事故现场图及照片，证明案发现场位置、概貌。",
								"type" : 0,
								"x" : 80,
								"y" : 700
							},
							{
								"id" : 16,
								"caseID" : 41722,
								"nodeID" : 16,
								"parentNodeID" : 15,
								"topic" : "户籍证明",
								"detail" : "证明被告人罗某甲、胡某甲及被害人彭某乙的身份情况。",
								"type" : 0,
								"x" : 80,
								"y" : 800
							},
							{
								"id" : 17,
								"caseID" : 41722,
								"nodeID" : 17,
								"parentNodeID" : 15,
								"topic" : "公安机关出具的到案经过",
								"detail" : "公安机关出具的到案经过，证明抓获被告人罗某甲的事实经过以及被告人胡某甲案发后在现场等候交警部门处理情况。",
								"type" : 0,
								"x" : 80,
								"y" : 850
							},
							{
								"id" : 18,
								"caseID" : 41722,
								"nodeID" : 18,
								"parentNodeID" : 15,
								"topic" : "机动车驾驶证信息",
								"detail" : "机动车驾驶证信息，证明被告人罗某甲、胡某甲办理了机动车驾驶证。机动车登记信息及行驶证（复印件），证明肇事车辆湘N×××××小型面包车所有人系包太全、肇事车辆湘N×××××小型出租车所有人系陈高兵。",
								"type" : 0,
								"x" : 80,
								"y" : 900
							},
							{
								"id" : 19,
								"caseID" : 41722,
								"nodeID" : 19,
								"parentNodeID" : 15,
								"topic" : "公安局凭证",
								"detail" : "怀化市公安局交通警察支队事故处理大队公安交通管理行政强制措施凭证，证明怀化市公安局交通警察支队事故处理大队对被告人罗某甲、胡某甲所驾驶的肇事车辆依法予以扣留的情况。",
								"type" : 0,
								"x" : 80,
								"y" : 950
							},
							{
								"id" : 20,
								"caseID" : 41722,
								"nodeID" : 20,
								"parentNodeID" : 15,
								"topic" : "李某的证言",
								"detail" : "证明2015年3月10日19时50分许，其与丈夫从怀化市鹤城区盛世佳园往老市公安局方向散步，其二人走到怀化市四中大门口路段时，就发现一个老人半躺在马路中间，老人前方大约17米左右有一辆银灰色五菱面包车，面包车驾驶员好像知道发生了交通事故，但是没有停车，继续开车往市委方向走了，于是其丈夫拦下一辆私家车去追逃跑的面包车。当时行人意识比较清醒，还知道呼叫驾驶员停车。后老人被一辆黄色出租车撞击，拖离原案发地30米左右，被车辆压在车底下，后被人拖出车底。",
								"type" : 0,
								"x" : 80,
								"y" : 1000
							},
							{
								"id" : 21,
								"caseID" : 41722,
								"nodeID" : 21,
								"parentNodeID" : 15,
								"topic" : "胡某甲的供述",
								"detail" : "证明2015年3月10日20时许，其驾驶一辆牌照为湘N×××××号黄色出租车搭乘一名乘客从城东市场往太平桥走，当时车速大概每小时50公里，途径鹤城区四中门前路段时，突然车正前方保险杆不知道撞到什么东西，直到行驶至鹤城区皇延大酒店门前路段时气囊爆了，其便下车走到车子右边看见地上有血，便蹲下来看，发现一个约40岁左右的男子睡在其车前面，才知道自己撞到行人了，当时其直行在隔离墩右边的第二根车道，于是其马上报警和喊救护车。并证明其在怀化市汽驾二校上班，此次出行是帮亲戚谭再发代班开的士车。",
								"type" : 0,
								"x" : 80,
								"y" : 1050
							},
							{
								"id" : 22,
								"caseID" : 41722,
								"nodeID" : 22,
								"parentNodeID" : 15,
								"topic" : "怀化市方正司法鉴定中心司法鉴定意见",
								"detail" : "证明被害人彭某乙系交通事故中车辆碰撞致颅脑损伤，颅内出血及胸腔脏器损伤导致呼吸循环衰竭而死亡。其骨骨折，颅脑损伤，颅内出血，颈椎骨折脱位，颈髓损伤死亡。右面部、右颈肩部及右胸腹外侧损伤系车辆碾压，挤压所形成。",
								"type" : 0,
								"x" : 80,
								"y" : 1100
							},
							{
								"id" : 23,
								"caseID" : 41722,
								"nodeID" : 23,
								"parentNodeID" : 15,
								"topic" : "湖南明鉴司法鉴定所交通事故车辆痕迹鉴定意见",
								"detail" : "湖南明鉴司法鉴定所交通事故车辆痕迹鉴定意见，证明湘N×××××长安牌小型轿车的车体痕迹、系该车正面碰撞可塑性物体（人体）所形成，在高度、位置、形态及受力方向上具有一一对应的痕迹对特征。",
								"type" : 0,
								"x" : 80,
								"y" : 1150
							},
							{
								"id" : 24,
								"caseID" : 41722,
								"nodeID" : 24,
								"parentNodeID" : 15,
								"topic" : "湖南明鉴司法鉴定所交通事故车辆行驶速度检验意见",
								"detail" : "湖南明鉴司法鉴定所交通事故车辆行驶速度检验意见，证明经检验，湘N×××××长安牌小型轿车的行驶速度约为62．95km／h。",
								"type" : 0,
								"x" : 80,
								"y" : 1200
							},
							{
								"id" : 25,
								"caseID" : 41722,
								"nodeID" : 25,
								"parentNodeID" : 15,
								"topic" : "道路交通事故现场勘查笔录、交通事故情况记录、交通事故现场图及照片。",
								"detail" : "道路交通事故现场勘查笔录、交通事故情况记录、交通事故现场图及照片，证明案发现场位置、概貌。",
								"type" : 0,
								"x" : 80,
								"y" : 1250
							},
							{
								"id" : 27,
								"caseID" : 41722,
								"nodeID" : 27,
								"parentNodeID" : 26,
								"topic" : "怀化市公安局交通警察支队事故处理大队道路交通事故认定书",
								"detail" : "怀化市公安局交通警察支队事故处理大队道路交通事故认定书，证明被告人罗某甲、胡某甲承担事故的主要责任；被害人彭某乙承担事故的次要责任。",
								"type" : 0,
								"x" : 80,
								"y" : 1350
							},
							{
								"id" : 34,
								"caseID" : 41722,
								"nodeID" : 34,
								"parentNodeID" : 33,
								"topic" : "公安机关出具的到案经过",
								"detail" : "公安机关出具的到案经过，证明抓获被告人罗某甲的事实经过以及被告人胡某甲案发后在现场等候交警部门处理情况。",
								"type" : 0,
								"x" : 80,
								"y" : 1700
							},
							{
								"id" : 36,
								"caseID" : 41722,
								"nodeID" : 36,
								"parentNodeID" : 35,
								"topic" : "机动车驾驶证信息",
								"detail" : "机动车驾驶证信息，证明被告人罗某甲、胡某甲办理了机动车驾驶证。机动车登记信息及行驶证（复印件），证明肇事车辆湘N×××××小型面包车所有人系包太全、肇事车辆湘N×××××小型出租车所有人系陈高兵。",
								"type" : 0,
								"x" : 80,
								"y" : 1800
							},
							{
								"id" : 37,
								"caseID" : 41722,
								"nodeID" : 37,
								"parentNodeID" : 35,
								"topic" : "交通事故赔偿协议书、协议书、谅解书、收条",
								"detail" : "交通事故赔偿协议书、协议书、谅解书、收条，证明被告人罗某甲、湘N×××××小型面包车车主包太全、被告人胡某甲、湘N×××××小型出租车车主陈高兵等人与被害人近亲属已达成了赔偿协议，赔偿被害人近亲属经济损失共计63．5万元，取得了被害人近亲属谅解的情况。",
								"type" : 0,
								"x" : 80,
								"y" : 1850
							},
							{
								"id" : 38,
								"caseID" : 41722,
								"nodeID" : 38,
								"parentNodeID" : 35,
								"topic" : "证人彭某甲的证言",
								"detail" : "证明被害人彭某乙系其父亲，发生交通事故后，肇事司机等人已赔偿其和母亲经济损失63．5万元，并已取得其和母亲谅解的有关情况。",
								"type" : 0,
								"x" : 80,
								"y" : 1900
							},
							{
								"id" : 1,
								"caseID" : 41722,
								"nodeID" : 1,
								"parentNodeID" : -1,
								"topic" : "结论1",
								"detail" : "被告人罗某甲、胡某甲违反道路交通安全法规，以致发生致一人死亡的重大交通事故，且负事故主要责任；被告人罗某甲在肇事后逃逸，二被告人的行为均已构成交通肇事罪。公诉机关指控被告人罗某甲、胡某甲交通肇事罪罪名成立。",
								"type" : 3,
								"x" : 80,
								"y" : 50
							},
							{
								"id" : 28,
								"caseID" : 41722,
								"nodeID" : 28,
								"parentNodeID" : -1,
								"topic" : "结论2",
								"detail" : "案发后，被告人胡某甲留在现场等候交警部门处理，并如实供述其犯罪事实，具有自首情节，可以从轻处罚。被告人罗某甲、胡某甲积极赔偿了被害人近亲属的经济损失，取得了被害人近亲属的谅解，且案发后认罪态度较好，确有悔罪表现。结合社区矫正机构所作建议对被告人罗某甲、胡某甲实行社区矫正意见，对被告人罗某甲、胡某甲可以适用缓刑。",
								"type" : 3,
								"x" : 80,
								"y" : 1400
							}, {
								"id" : 2,
								"caseID" : 41722,
								"nodeID" : 2,
								"parentNodeID" : 1,
								"topic" : "《中华人民共和国刑法》第一百三十三条",
								"detail" : "",
								"type" : 2,
								"x" : 80,
								"y" : 100
							}, {
								"id" : 29,
								"caseID" : 41722,
								"nodeID" : 29,
								"parentNodeID" : 28,
								"topic" : "《中华人民共和国刑法》第六十七条",
								"detail" : "",
								"type" : 2,
								"x" : 80,
								"y" : 1450
							}, {
								"id" : 30,
								"caseID" : 41722,
								"nodeID" : 30,
								"parentNodeID" : 28,
								"topic" : "《中华人民共和国刑法》第七十二条",
								"detail" : "",
								"type" : 2,
								"x" : 80,
								"y" : 1500
							}, {
								"id" : 31,
								"caseID" : 41722,
								"nodeID" : 31,
								"parentNodeID" : 28,
								"topic" : "《中华人民共和国刑法》第七十三条",
								"detail" : "",
								"type" : 2,
								"x" : 80,
								"y" : 1550
							}, {
								"id" : 32,
								"caseID" : 41722,
								"nodeID" : 32,
								"parentNodeID" : 28,
								"topic" : "《中华人民共和国刑法》第七十六条",
								"detail" : "",
								"type" : 2,
								"x" : 80,
								"y" : 1600
							} ];
					loadData(logicJson);
					compose();
					json.json = logicJson;
					prepareConclusionSelect();
				});

function exportExcel() {
	// if ($.session.get('logicJson') != undefined) {
	// var logicJson = $.session.get('logicJson');
	$.ajax({
		type : "POST",
		url : "logic/generateExcel",
		data : {
			'logicJson' : JSON.stringify(json),
		},
		success : function(response, status, request) {
			let a = document.createElement('a');
			a.href = "logic/downloadExcel";
			a.download = '说理逻辑表.xls';
			a.click();
		},
		error : function() {
			alert("导出文件异常，请重试！");
		}
	});
	// } else {
	// alert("没有说理逻辑模型!")
	// }
}

function exportReport() {
	var modelsJson = $.session.get('modelsJson');
	$
			.ajax({
				type : "POST",
				url : "logic/generateReport",
				data : {
					'modelsJson' : JSON
							.stringify({
								"factList" : [ {
									"content" : "2015年3月10日19时58分许，被告人罗某甲驾驶湘N×××××小型面包车在怀化市鹤城区迎丰路由东往西行驶，当该车行驶至迎丰东路市四中门口路段时因未注意避让行人，将横穿马路的被害人彭某乙撞倒后驾车逃逸。",
									"keyWordMap" : {
										"what" : [ "南京华", "南向北", "路口右", "电动自行车" ],
										"how much" : [],
										"where" : [ "紫薇路", "清流路口" ],
										"when" : [ "2014年6月6日13时" ],
										"who" : [ "李某" ]
									},
									"evidenceList" : [
											{
												"result" : "采信",
												"reason" : "经一审或二审庭审质证",
												"submitter" : "原告",
												"headList" : [ "罗某甲", "胡某甲",
														"彭某乙" ],
												"name" : "户籍证明",
												"id" : 0,
												"type" : "书证",
												"content" : "证明被告人罗某甲、胡某甲及被害人彭某乙的身份情况。",
												"keyWordMap" : {
													"what" : [],
													"how much" : [],
													"where" : [],
													"when" : [],
													"who" : []
												}
											},
											{
												"result" : "",
												"reason" : "",
												"submitter" : "",
												"headList" : [ "罗某甲", "胡某甲",
														"现场等候" ],
												"name" : "公安机关出具的到案经过",
												"id" : 0,
												"type" : "",
												"content" : "公安机关出具的到案经过，证明抓获被告人罗某甲的事实经过以及被告人胡某甲案发后在现场等候交警部门处理情况。",
												"keyWordMap" : {
													"what" : [],
													"how much" : [],
													"where" : [],
													"when" : [],
													"who" : []
												}
											},
											{
												"result" : "",
												"reason" : "",
												"submitter" : "",
												"headList" : [ "罗某甲", "胡某甲",
														"湘N×××××小型面包车", "包太全",
														"湘N×××××小型出租车", "陈高兵" ],
												"name" : "机动车驾驶证信息",
												"id" : 0,
												"type" : "",
												"content" : "机动车驾驶证信息",
												"keyWordMap" : {
													"what" : [],
													"how much" : [],
													"where" : [],
													"when" : [],
													"who" : []
												}
											},
											{
												"result" : "",
												"reason" : "",
												"submitter" : "",
												"headList" : [ "罗某甲", "胡某甲",
														"肇事车辆" ],
												"name" : "公安局凭证",
												"id" : 0,
												"type" : "",
												"content" : "公安局凭证",
												"keyWordMap" : {
													"what" : [],
													"how much" : [],
													"where" : [],
													"when" : [],
													"who" : []
												}
											},
											{
												"result" : "",
												"reason" : "",
												"submitter" : "",
												"headList" : [ "湘N×××××小型面包车",
														"包太全", "胡某甲",
														"湘N×××××小型出租车", "陈高兵",
														"被害人近亲属", "赔偿协议",
														"63．5万元", "谅解" ],
												"name" : "交通事故赔偿协议书、协议书、谅解书、收条",
												"id" : 0,
												"type" : "",
												"content" : "交通事故赔偿协议书、协议书、谅解书、收条",
												"keyWordMap" : {
													"what" : [],
													"how much" : [],
													"where" : [],
													"when" : [],
													"who" : []
												}
											},
											{
												"result" : "",
												"reason" : "",
												"submitter" : "",
												"headList" : [
														"2015年3月10日20时许",
														"怀化市鹤城区皇廷大酒店门前路段",
														"一辆银灰色面包车", "一位行人",
														"撞倒", "肇事面包车", "逃离",
														"行人", "撞倒", "清醒" ],
												"name" : "胡某乙的证言",
												"id" : 0,
												"type" : "",
												"content" : "胡某乙的证言",
												"keyWordMap" : {
													"what" : [],
													"how much" : [],
													"where" : [],
													"when" : [],
													"who" : []
												}
											},
											{
												"result" : "",
												"reason" : "",
												"submitter" : "",
												"headList" : [
														"2015年3月10日19时50分许",
														"怀化市四中大门口路段", "一个老人",
														"银灰色五菱面包车", "继续开车",
														"行人", "清醒", "黄色出租车",
														"撞击" ],
												"name" : "李某的证言",
												"id" : 0,
												"type" : "",
												"content" : "李某的证言",
												"keyWordMap" : {
													"what" : [],
													"how much" : [],
													"where" : [],
													"when" : [],
													"who" : []
												}
											},
											{
												"result" : "",
												"reason" : "",
												"submitter" : "",
												"headList" : [
														"2015年3月10日19时30分许",
														"罗群", "罗某甲",
														"湘N×××××号面包车",
														"面包车左边的反光镜坏了" ],
												"name" : "罗某乙的证言",
												"id" : 0,
												"type" : "",
												"content" : "罗某乙的证言",
												"keyWordMap" : {
													"what" : [],
													"how much" : [],
													"where" : [],
													"when" : [],
													"who" : []
												}
											},
											{
												"result" : "",
												"reason" : "",
												"submitter" : "",
												"headList" : [ "彭某乙", "肇事司机等人",
														"赔偿", "63．5万元", "其和母亲",
														"谅解" ],
												"name" : "证人彭某甲的证言",
												"id" : 0,
												"type" : "",
												"content" : "证人彭某甲的证言",
												"keyWordMap" : {
													"what" : [],
													"how much" : [],
													"where" : [],
													"when" : [],
													"who" : []
												}
											},
											{
												"result" : "",
												"reason" : "",
												"submitter" : "",
												"headList" : [
														"2015年3月10日20时许",
														"湘N×××××的小型面包车", "罗某乙",
														"罗群", "鹤城区迎丰路第四中学门口路段",
														"撞到", "行人", "继续往前面开走了" ],
												"name" : "罗某甲的供述",
												"id" : 0,
												"type" : "",
												"content" : "罗某甲的供述",
												"keyWordMap" : {
													"what" : [],
													"how much" : [],
													"where" : [],
													"when" : [],
													"who" : []
												}
											},
											{
												"result" : "",
												"reason" : "",
												"submitter" : "",
												"headList" : [
														"2015年3月10日20时许",
														"湘N×××××号黄色出租车",
														"车速大概每小时50公里",
														"鹤城区四中门前路段",
														"一个约40岁左右的男子", "撞到" ],
												"name" : "胡某甲的供述",
												"id" : 0,
												"type" : "",
												"content" : "胡某甲的供述",
												"keyWordMap" : {
													"what" : [],
													"how much" : [],
													"where" : [],
													"when" : [],
													"who" : []
												}
											},
											{
												"result" : "",
												"reason" : "",
												"submitter" : "",
												"headList" : [ "彭某乙" ],
												"name" : "怀化市方正司法鉴定中心司法鉴定意见",
												"id" : 0,
												"type" : "",
												"content" : "怀化市方正司法鉴定中心司法鉴定意见",
												"keyWordMap" : {
													"what" : [],
													"how much" : [],
													"where" : [],
													"when" : [],
													"who" : []
												}
											},
											{
												"result" : "",
												"reason" : "",
												"submitter" : "",
												"headList" : [
														"湘N×××××长安牌小型轿车",
														"湘N×××××五菱牌小型面包车" ],
												"name" : "湖南明鉴司法鉴定所交通事故车辆技术状况检验意见",
												"id" : 0,
												"type" : "",
												"content" : "湖南明鉴司法鉴定所交通事故车辆技术状况检验意见",
												"keyWordMap" : {
													"what" : [],
													"how much" : [],
													"where" : [],
													"when" : [],
													"who" : []
												}
											},
											{
												"result" : "",
												"reason" : "",
												"submitter" : "",
												"headList" : [ "湘N×××××长安牌小型轿车" ],
												"name" : "湖南明鉴司法鉴定所交通事故车辆痕迹鉴定意见",
												"id" : 0,
												"type" : "",
												"content" : "湖南明鉴司法鉴定所交通事故车辆痕迹鉴定意见",
												"keyWordMap" : {
													"what" : [],
													"how much" : [],
													"where" : [],
													"when" : [],
													"who" : []
												}
											},
											{
												"result" : "",
												"reason" : "",
												"submitter" : "",
												"headList" : [
														"湘N×××××长安牌小型轿车",
														"行驶速度约为62．95km／h" ],
												"name" : "湖南明鉴司法鉴定所交通事故车辆行驶速度检验意见",
												"id" : 0,
												"type" : "",
												"content" : "湖南明鉴司法鉴定所交通事故车辆行驶速度检验意见",
												"keyWordMap" : {
													"what" : [],
													"how much" : [],
													"where" : [],
													"when" : [],
													"who" : []
												}
											},
											{
												"result" : "",
												"reason" : "",
												"submitter" : "",
												"headList" : [ "2015/3/10",
														"怀化市四中学校门前路段", "左侧后视镜",
														"湘N×××××五菱牌小型面包车" ],
												"name" : "湖南明鉴司法鉴定所交通事故交通事故现场散落物比对分析鉴定意见",
												"id" : 0,
												"type" : "",
												"content" : "湖南明鉴司法鉴定所交通事故交通事故现场散落物比对分析鉴定意见",
												"keyWordMap" : {
													"what" : [],
													"how much" : [],
													"where" : [],
													"when" : [],
													"who" : []
												}
											},
											{
												"result" : "",
												"reason" : "",
												"submitter" : "",
												"headList" : [ "胡某甲" ],
												"name" : "怀化市方正司法鉴定中心司法鉴定意见",
												"id" : 0,
												"type" : "",
												"content" : "怀化市方正司法鉴定中心司法鉴定意见",
												"keyWordMap" : {
													"what" : [],
													"how much" : [],
													"where" : [],
													"when" : [],
													"who" : []
												}
											},
											{
												"result" : "",
												"reason" : "",
												"submitter" : "",
												"headList" : [ "罗某甲", "胡某甲",
														"主要责任", "彭某乙", "次要责任" ],
												"name" : "怀化市公安局交通警察支队事故处理大队道路交通事故认定书",
												"id" : 0,
												"type" : "",
												"content" : "怀化市公安局交通警察支队事故处理大队道路交通事故认定书",
												"keyWordMap" : {
													"what" : [],
													"how much" : [],
													"where" : [],
													"when" : [],
													"who" : []
												}
											},
											{
												"result" : "",
												"reason" : "",
												"submitter" : "",
												"headList" : [ "案发现场位置、概貌" ],
												"name" : "道路交通事故现场勘查笔录、交通事故情况记录、交通事故现场图及照片。",
												"id" : 0,
												"type" : "",
												"content" : "道路交通事故现场勘查笔录、交通事故情况记录、交通事故现场图及照片。",
												"keyWordMap" : {
													"what" : [],
													"how much" : [],
													"where" : [],
													"when" : [],
													"who" : []
												}
											},

									],
									"linkPointList" : [ {
										"value" : "罗某甲",
										"evidenceValue" : "罗某甲",
										"index" : 0
									}, {
										"value" : "彭某乙",
										"evidenceValue" : "彭某乙",
										"index" : 0
									}, {
										"value" : "罗某甲",
										"evidenceValue" : "罗某甲",
										"index" : 1
									}, {
										"value" : "罗某甲",
										"evidenceValue" : "罗某甲",
										"index" : 2
									}, {
										"value" : "湘N×××××小型面包车",
										"evidenceValue" : "湘N×××××小型面包车",
										"index" : 2
									}, {
										"value" : "罗某甲",
										"evidenceValue" : "罗某甲",
										"index" : 3
									}, {
										"value" : "湘N×××××小型面包车",
										"evidenceValue" : "肇事车辆",
										"index" : 3
									}, {
										"value" : "2015年3月10日20时许",
										"evidenceValue" : "2015年3月10日20时许",
										"index" : 5
									}, {
										"value" : "迎丰东路市四中门口路段",
										"evidenceValue" : "怀化市鹤城区皇廷大酒店门前路段",
										"index" : 5
									}, {
										"value" : "湘N×××××小型面包车",
										"evidenceValue" : "一辆银灰色面包车",
										"index" : 5
									}, {
										"value" : "彭某乙",
										"evidenceValue" : "一位行人",
										"index" : 5
									}, {
										"value" : "撞",
										"evidenceValue" : "撞倒",
										"index" : 5
									}, {
										"value" : "湘N×××××小型面包车",
										"evidenceValue" : "肇事面包车",
										"index" : 5
									}, {
										"value" : "驾车逃逸",
										"evidenceValue" : "逃离",
										"index" : 5
									}, {
										"value" : "彭某乙",
										"evidenceValue" : "行人",
										"index" : 5
									}, {
										"value" : "撞",
										"evidenceValue" : "撞倒",
										"index" : 5
									}, {
										"value" : "清醒",
										"evidenceValue" : "清醒",
										"index" : 5
									}, {
										"value" : "迎丰东路市四中门口路段",
										"evidenceValue" : "怀化市四中大门口路段",
										"index" : 6
									}, {
										"value" : "2015年3月10日20时许",
										"evidenceValue" : "2015年3月10日19时50分许",
										"index" : 6
									}, {
										"value" : "彭某乙",
										"evidenceValue" : "一个老人",
										"index" : 6
									}, {
										"value" : "湘N×××××小型面包车",
										"evidenceValue" : "银灰色五菱面包车",
										"index" : 6
									}, {
										"value" : "驾车逃逸",
										"evidenceValue" : "继续开车",
										"index" : 6
									}, {
										"value" : "彭某乙",
										"evidenceValue" : "行人",
										"index" : 6
									}, {
										"value" : "清醒",
										"evidenceValue" : "清醒",
										"index" : 6
									}, {
										"value" : "2015年3月10日20时许",
										"evidenceValue" : "2015年3月10日19时30分许",
										"index" : 7
									}, {
										"value" : "罗群",
										"evidenceValue" : "罗群",
										"index" : 7
									}, {
										"value" : "罗某甲",
										"evidenceValue" : "罗某甲",
										"index" : 7
									}, {
										"value" : "湘N×××××小型面包车",
										"evidenceValue" : "湘N×××××号面包车",
										"index" : 7
									}, {
										"value" : "面包车左反光镜",
										"evidenceValue" : "面包车左边的反光镜坏了",
										"index" : 7
									}, {
										"value" : "2015年3月10日20时许",
										"evidenceValue" : "2015年3月10日20时许",
										"index" : 9
									}, {
										"value" : "湘N×××××小型面包车",
										"evidenceValue" : "湘N×××××小型面包车",
										"index" : 9
									}, {
										"value" : "罗某乙",
										"evidenceValue" : "罗某乙",
										"index" : 9
									}, {
										"value" : "罗群",
										"evidenceValue" : "罗群",
										"index" : 9
									}, {
										"value" : "迎丰东路市四中门口路段",
										"evidenceValue" : "鹤城区迎丰路第四中学门口路段",
										"index" : 9
									}, {
										"value" : "撞",
										"evidenceValue" : "撞到",
										"index" : 9
									}, {
										"value" : "彭某乙",
										"evidenceValue" : "行人",
										"index" : 9
									}, {
										"value" : "驾车逃逸",
										"evidenceValue" : "继续往前面开走了",
										"index" : 9
									}, {
										"value" : "彭某乙",
										"evidenceValue" : "彭某乙",
										"index" : 11
									}, {
										"value" : "2015/3/10",
										"evidenceValue" : "2015/3/10",
										"index" : 15
									}, {
										"value" : "迎丰东路市四中门口路段",
										"evidenceValue" : "怀化市四中学校门前路段",
										"index" : 15
									}, {
										"value" : "面包车左反光镜",
										"evidenceValue" : "左侧后视镜",
										"index" : 15
									}, {
										"value" : "湘N×××××小型面包车",
										"evidenceValue" : "湘N×××××五菱牌小型面包车",
										"index" : 15
									}, {
										"value" : "迎丰东路市四中门口路段",
										"evidenceValue" : "案发现场位置、概貌",
										"index" : 18
									} ]
								} ]
							}),
					'logicJson' : JSON.stringify(json),
				},
				success : function(response, status, request) {
					let a = document.createElement('a');
					a.href = "logic/downloadReport";
					a.download = '证据分析报告.xls';
					a.click();
				},
				error : function() {
					alert("导出文件异常，请重试！");
				}
			});
}

function drawNode(x, y, id, topic, type, detail, parentId) {
	// 将中文字符以2个长度的英文字母替换
	var topicLength = 32 + topic.replace(/[\u0391-\uFFE5]/g, "aa").length * 8;

	var node = new JTopo.Node(topic);
	node.id = id ? id : ++idCounter;
	node.borderColor = borderColors[type];

	node.fillColor = '255, 255, 255';
	node.borderWidth = 2;
	node.textPosition = 'Middle_Center';
	node.borderRadius = 3;

	// 根据内容长度决定node宽度
	node.setSize(topicLength, 24);
	// 设置树的方向
	node.layout = {
		type : 'tree',
		direction : 'left',
		width : 80,
		height : 280
	};

	node.addEventListener('mouseup', function(event) {
		nodeClickEvent(node.id, event);
	});
	node.addEventListener('mouseout', function(event) {
		isNodeRightClick = false;
	});
	node.setLocation(x, y);

	scene.add(node);

	if (parentId == null || parentId == "null") {
		var tree = Array.of();
		tree.push({
			node : node,
			id : node.id,
			topic : topic,
			type : type,
			detail : detail,
			parentId : parentId
		});
		forest.push(tree);
	} else {
		// 将节点插入到具体的tree中
		var targetTreeNum = -1;
		var parentNode = null;
		for (var m = 0, len1 = forest.length; m < len1; m++) {
			var tree = forest[m];
			for (var n = 0, len2 = tree.length; n < len2; n++) {
				if (parentId == tree[n].id) {
					tree.push({
						node : node,
						id : idCounter,
						topic : topic,
						type : type,
						detail : detail,
						parentId : parentId
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
		drawLink(parentNode, node);
	}
	return node.id;
}

/**
 * 将两个节点连起来，同时修改了forest数据、links数据以及node的parentId属性
 * 
 * @param nodeId
 * @param parentId
 */
function linkTwoSingleNode(nodeId, parentId) {
	var node = findNodeById(nodeId);

	moveNode(nodeId, parentId);
	editLink(nodeId, node.parentId, nodeId, parentId);
	node.parentId = parentId;
}

function drawLink(parentNode, node) {
	var link = isCurve ? new JTopo.CurveLink(parentNode, node, "")
			: new JTopo.Link(parentNode, node);
	scene.add(link);
	links.push(link);
}

function bindMenuClickEvent() {
	$('#add-element-li').click(function(event) {
		$('#stageMenu').hide();
		prepareAddModal(getId());
		$("#node-add-modal").modal('show');
	});

	$('#mod-element-li').click(function(event) {
		$('#stageMenu').hide();
		prepareEditModal(getId());
		$("#node-edit-modal").modal('show');
	});

	$('#del-element-li').click(function(event) {
		$('#stageMenu').hide();
		prepareDelModal(getId());
		$("#node-del-modal").modal('show');
	});

	$('#advice-element-li').click(function(event) {
		$('#stageMenu').hide();
		prepareLawModal(getId());
		$("#law-recommend-modal").modal('show');
	});

	$('#mul-advice-element-li').click(function(event) {
		$('#stageMenu').hide();
		prepareMulLawModal()
		$("#mul-law-recommend-modal").modal('show');
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

function prepareAddModal(id) {
	$("#node-add-modal .alert").hide();

	$("#node-add-modal #node-add-topic-input").val("");
	$("#node-add-modal #node-add-detail-input").val("");
	$("#node-add-modal #node-add-type-select").val("法条");
	$("#node-add-modal #node-add-leadTo-select").empty();

	prepareSelect($("#node-add-modal #node-add-leadTo-select"), id, null);
}

function addBtnEvent() {
	saveScene();

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
	// const id = me.graphModel.insertNode(topic, type, detail, leadTo);
	// me.logOperation(new AddOperation(id, me));
	drawNode(mouseX - $("#canvas").offset().left, mouseY
			- $("#canvas").offset().top, null, topic, type, detail, leadTo);
	$('#node-add-modal').modal('hide');
	// me.redraw();
	// return;
	// }
	// var hint = LogicValidator.generateHint(checkCode);
	// if (hint) {
	// $alert.append(hint);
	// $alert.show();
	// }

	prepareConclusionSelect();
}

function prepareEditModal(id) {
	$("#node-edit-modal .alert").hide();
	var node = findNodeById(id);
	$("#node-edit-modal #node-edit-type-select").removeAttr("disabled");
	$("#node-edit-modal #node-edit-leadTo-select").removeAttr("disabled");
	if (node) {
		$("#node-edit-modal #node-edit-id-input").val(node.id);
		$("#node-edit-modal #node-edit-topic-input").val(node.topic);
		$("#node-edit-modal #node-edit-detail-input").val(node.detail);
		$("#node-edit-modal #node-edit-type-select")
				.val(borderTypes[node.type]);

		prepareSelect($("#node-edit-modal #node-edit-leadTo-select"), null,
				node.id);
		$("#node-edit-modal #node-edit-leadTo-select").val(
				node.parentId ? node.parentId : "null");
	}
}

function editBtnEvent() {
	saveScene();

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
	// me.logOperation(new RemoveAndEditOperation(me.graphModel, me));
	// me.graphModel.modifyNode(id, topic, type, detail, leadTo);

	var node = findNodeById(id);

	// 修改forest内数据、修改连线、修改node的parentId
	linkTwoSingleNode(id, leadTo);

	// 修改node信息
	node.topic = topic;
	node.detail = detail;
	node.type = type;

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
	// $alert.append(hint);
	// $alert.show();
	// }

	prepareConclusionSelect();
}

function prepareDelModal(id) {
	var node = findNodeById(id);
	var parentTopic = node && node.parentId != "null" && node.parentId != null ? findNodeById(node.parentId).topic
			: "";
	$("#node-del-modal .del-id-td").text(node.id);
	$("#node-del-modal .del-topic-td").text(node.topic);
	$("#node-del-modal .del-type-td").text(borderTypes[node.type]);
	$("#node-del-modal .del-detail-td").text(node.detail);
	$("#node-del-modal .del-leadTo-td").text(node.parentId + " " + parentTopic);
}

// 删除当前节点。如果当前节点非根节点，子节点向上移动；若为根节点，则删除该树
function delNodeBtnEvent() {
	saveScene();

	var id = $('#node-del-modal table .del-id-td').text();
	delNode(id);

	$('#node-del-modal').modal('hide');

	prepareConclusionSelect();
}

function delNode(id) {
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
				// 删除所有与目标节点之间的连线
				editLink(node.id, nodeZ.id, null, null);
				if (parentNode.id != nodeZ.id
						&& findLinkByNodeId(parentNode.id, nodeZ.id) == null) {
					// 子节点与目标节点的父节点连线
					drawLink(parentNode.node, nodeZ.node);
				}
			}
		}
		scene.remove(node.node);
		tree.splice(tree.indexOf(node), 1);
	}
}

// 删除当前节点及其子节点
function delNodeAndItsChildrenBtnEvent() {
	saveScene();

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

	prepareConclusionSelect();
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

function prepareLawModal(id) {
	lawsFrequencyBtn(false);

	var node = findNodeById(id);
	$("#node-law-id").val(id);
	$("#node-law-topic").val(node.topic);
	$("#node-law-detail").val(node.detail);

	// queryFrequencyLaws(node.detail);
	var lawsDiv = $("#laws");
	lawsDiv.empty();
	var laws = [ "中华人民共和国刑法_第六十七条", "中华人民共和国刑法_第六十八条" ];
	prepareLawsDiv(lawsDiv, laws);
}

function prepareMulLawModal() {
	lawsFrequencyBtn(true);

	var lawsDiv = $("#mul-laws");
	lawsDiv.empty();
	// TODO:获得根据多个事实推荐的法条
	var laws = [ {
		"law" : "中华人民共和国刑法_第六十七条",
		"content" : "犯罪以后自动投案,如实供述自己的罪行的,是自首。对于自首的犯罪分子,可以从轻或者减轻处罚。其中,犯罪较轻的,可以免除处罚。"
	} ];

	prepareLawsDiv(lawsDiv, laws);
}

function lawsFrequencyBtn(isMultiple) {
	if (isMultiple) {
		$("#mulFrequencyBtn").addClass("active");
		$("#mulLawSumBtn").removeClass("active");
		$("#mulMindBtn").removeClass("active");
	} else {
		$("#frequencyBtn").addClass("active");
		$("#lawSumBtn").removeClass("active");
		$("#mindBtn").removeClass("active");
	}
}

function lawsSumBtn(isMultiple) {
	if (isMultiple) {
		$("#mulFrequencyBtn").removeClass("active");
		$("#mulLawSumBtn").addClass("active");
		$("#mulMindBtn").removeClass("active");
	} else {
		$("#frequencyBtn").removeClass("active");
		$("#lawSumBtn").addClass("active");
		$("#mindBtn").removeClass("active");
	}
}

function lawsMindBtn(isMultiple) {
	if (isMultiple) {
		$("#mulFrequencyBtn").removeClass("active");
		$("#mulLawSumBtn").removeClass("active");
		$("#mulMindBtn").addClass("active");
	} else {
		$("#frequencyBtn").removeClass("active");
		$("#lawSumBtn").removeClass("active");
		$("#mindBtn").addClass("active");

		queryMindLaws(findNodeById($("#node-law-id").val()).detail);
	}
}

function prepareLawsDiv(lawsDiv, laws) {
	for (var i = 0, len = laws.length; i < len; i++) {
		var div = document.createElement("div");
		div.setAttribute("class", "form-group");
		var checkbox = document.createElement("input");
		checkbox.setAttribute("style", "margin-right:5px;");
		checkbox.setAttribute("type", "checkbox");
		checkbox.setAttribute("id", "checkbox-" + i);
		var a = document.createElement("a");
		a.setAttribute("id", "law-" + i);
		a.setAttribute("onclick", "lawClick(" + i + ")");
		a.text = laws[i];
		var textarea = document.createElement("textarea");
		textarea.value = "犯罪以后自动投案，如实供述自己的罪行的，是自首。对于自首的犯罪分子，可以从轻或者减轻处罚。其中，犯罪较轻的，可以免除处罚。";
		textarea.setAttribute("class", "form-control");
		textarea.setAttribute("style", "display: none;");
		textarea.setAttribute("id", "textarea-" + i);
		textarea.setAttribute("disabled", "disabled");

		div.append(checkbox);
		div.append(a);
		div.append(textarea);
		lawsDiv.append(div);
	}
}

function lawClick(id) {
	if ($("#textarea-" + id).css('display') == "none") {
		$("#textarea-" + id).show();
	} else {
		$("#textarea-" + id).hide();
	}

}

function lawAdviceEvent() {
	var factNodeId = $("#node-law-id").val();
	var factNode = findNodeById(factNodeId);
	var parentId = factNode.parentId;
	if (parentId == null || parentId == "null") {
		parentId = drawNode(factNode.node.x + 80, factNode.node.y, null, "结论",
				3, "系统自动生成的结论", null);

		// 将事实节点与结论节点连接起来
		linkTwoSingleNode(factNodeId, parentId);
		// moveNode(factNodeId, parentId);
		// factNode.parentId = parentId;
		// editLink(factNodeId, null, factNodeId, parentId);
	}

	var checkboxes = $("#laws input[type=checkbox]:checked");
	for (var i = 0, len = checkboxes.length; i < len; i++) {
		var id = checkboxes[i].id.substring(checkboxes[i].id.indexOf("-") + 1);

		var lawA = $("#law-" + id);
		var topic = lawA.text();
		var detail = lawA.attr("title");
		if (topic.length > 15) {
			topic = "法条";
			detail = lawA.text() + "\n" + lawA.attr("title");
		}

		// 不重复时添加节点
		if (!isLawRepeated(parentId, topic, detail)) {
			drawNode(factNode.node.x, factNode.node.y + 50, null, topic, 2,
					detail, parentId);
		}
	}

	$("#law-recommend-modal").modal("hide");

	prepareConclusionSelect();
}

function mulLawAdviceEvent() {
	// var factNodes = getSelectedNodes();
	// for()

	$("#mul-law-recommend-modal").modal("hide");
}

// 生成"指向"下拉框内容
function prepareSelect($select, id, self) {
	$select.empty();
	if (id) {
		// 只添加所选节点信息
		var node = findNodeById(id);
		$select.append("<option value='" + id + "'>" + id + " " + node.topic
				+ "</option>");
	} else {
		var children = getAllChildren(self); // self的所有子节点

		// 将除self以外的所有非子节点信息增加到"指向"中
		var html = "<option value='null'>无</option>";
		for (var m = 0, len1 = forest.length; m < len1; m++) {
			var tree = forest[m];
			for (var n = 0, len2 = tree.length; n < len2; n++) {
				var id = parseInt(tree[n].id);
				if (id != self && children.indexOf(id) == -1) {
					html += "<option value='" + id + "'>" + id + " "
							+ tree[n].topic + "</option>";
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

		var selectedNodes = getSelectedNodes();
		if (selectedNodes.length > 1) {
			// 多选nodes
			var isFact = true;
			for (var i = 0; i < selectedNodes.length; i++) {
				if (borderColors.indexOf(selectedNodes[i].borderColor) != 1) {
					isFact = false;
					break;
				}
			}

			$("#add-element-li").hide();
			$("#element-id").hide();
			$("#element-name").hide();
			$("#hr").hide();
			$("#del-element-li").hide();
			$("#mod-element-li").hide();
			$("#hr2").hide();
			$("#advice-element-li").hide();
			if (isFact) {
				// 多选事实nodes
				$("#mul-advice-element-li").show();
			}
		} else {
			// 单选node
			$("#mul-advice-element-li").hide();
			$("#element-id").show();
			$("#element-name").show();
			$("#hr").show();
			$("#del-element-li").show();
			$("#mod-element-li").show();
			if (node.type == 1) {
				// 事实节点
				$("#hr2").show();
				$("#advice-element-li").show();
			} else {
				$("#hr2").hide();
				$("#advice-element-li").hide();
			}
			if (node.type == 0 || node.type == 1) {
				// 证据节点和事实节点不允许编辑和删除
				$("#mod-element-li").hide();
				$("#del-element-li").hide();
			}

			$("#element-id").html("<a>id：" + id + "</a>");
			$("#element-name").html("<a>名称：" + node.topic + "</a>");
		}

		// 当前位置弹出菜单（div）
		$("#stageMenu").css({
			top : event.pageY,
			left : event.pageX
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
		$infoPanel
				.removeClass("panel-primary panel-info panel-danger panel-success panel-warning");
		$panelTypeSelect.removeAttr("disabled");
		$panelLeadToSelect.removeAttr("disabled");

		// 填入信息
		$panelIdInput.val(node.id);
		$panelTopicInput.val(node.topic);
		$panelDetailInput.val(node.detail);
		$panelTypeSelect.val(borderTypes[node.type]);
		// LogicPainter.fillLeadToSelect(graphModel, node.id, node.type,
		// $(".node-info-wrapper #panel-leadTo-select"));
		prepareSelect($(".node-info-wrapper #panel-leadTo-select"), null,
				node.id);
		$(".node-info-wrapper #panel-leadTo-select").val(
				node.parentId ? node.parentId : "null");

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

		if (node.type == 0 || node.type == 1) {
			$("#panel-del-btn").addClass("disabled");
			$("#panel-save-btn").addClass("disabled");
			$("#panel-topic-input").attr("readonly", "readonly");
			$("#panel-detail-input").attr("readonly", "readonly");
			$("#panel-type-select").attr("disabled", "disabled");
			$("#panel-leadTo-select").attr("disabled", "disabled");
		} else {
			$("#panel-del-btn").removeClass("disabled");
			$("#panel-save-btn").removeClass("disabled");
			$("#panel-topic-input").removeAttr("readonly");
			$("#panel-detail-input").removeAttr("readonly");
			$("#panel-type-select").removeAttr("disabled");
			$("#panel-leadTo-select").removeAttr("disabled");
		}

		$infoPanel.show();
	}
}

/**
 * 编辑node间的连线，当后两个参数存在空值时，即为删除该连线，否则为重新与新端点连线
 * 
 * @param oldNodeId
 * @param oldParentNodeId
 * @param newNodeId
 * @param newParentNodeId
 */
function editLink(oldNodeId, oldParentNodeId, newNodeId, newParentNodeId) {
	var oldLink = findLinkByNodeId(oldNodeId, oldParentNodeId);
	if (oldLink != null) {
		scene.remove(oldLink);
		links.splice(links.indexOf(oldLink), 1);
	}

	if ((newNodeId != null && newNodeId != "null")
			&& (newParentNodeId != null && newParentNodeId != "null")) {
		drawLink(findNodeById(newParentNodeId).node,
				findNodeById(newNodeId).node);
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
		if (nodeLoc != 0) {
			oldTree.splice(nodeLoc);
		} else {
			forest.splice(findTreeNumOfNode(id), 1);
		}
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

/**
 * 根据连线的两个端点找到link
 * 
 * @param nodeAId
 *            link的一个端点id
 * @param nodeZId
 *            link的另外一个端点id
 * @returns {*}
 */
function findLinkByNodeId(nodeAId, nodeZId) {
	for (var i = 0, len = links.length; i < len; i++) {
		var link = links[i];
		if (link.nodeA.id == nodeAId && link.nodeZ.id == nodeZId
				|| link.nodeA.id == nodeZId && link.nodeZ.id == nodeAId) {
			return link;
		}
	}
	return null;
}

/**
 * 根据node的id获得自定义node信息
 * 
 * @param id
 *            node的id
 * @returns {*}
 */
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

/**
 * 找到node所在树的序号
 * 
 * @param id
 *            node的id
 * @returns {number} node所在树的序号
 */
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

function getAllChildren(parentId) {
	if (parentId == null)
		return [];

	var children = getDirectChildren(parentId);
	for (var i = 0; i < children.length; i++) {
		children.concat(getAllChildren(children[i]));
	}
	return children;
}

function getDirectChildren(parentId) {
	var result = Array.of();

	var tree = forest[findTreeNumOfNode(parentId)];
	for (var i = 0; i < tree.length; i++) {
		if (tree[i].parentId == parentId) {
			result.push(tree[i].id);
		}
	}

	return result;
}

/**
 * 获得scene中所有选中的JTopo的node
 * 
 * @returns {*}
 */
function getSelectedNodes() {
	var selectedNodes = Array.of();
	var nodes = scene.getDisplayedNodes();
	for (var i = 0; i < nodes.length; i++) {
		if (nodes[i].selected) {
			selectedNodes.push(nodes[i]);
		}
	}
	return selectedNodes;
}

/**
 * 自动排版
 */
function compose() {
	saveScene();

	// 思路是先直接重新排版，然后根据树的minX和minY再对树的根节点的位置进行调整，再重新排版
	for (var m = 0, len1 = forest.length; m < len1; m++) {
		JTopo.layout.layoutNode(scene, forest[m][0].node, true);
	}

	var lastMaxY = 0; // 上棵树的maxY
	for (var m = 0, len1 = forest.length; m < len1; m++) {
		var minX = forest[m][0].node.x;
		var minY = forest[m][0].node.y;
		for (var n = 0, len2 = forest[m].length; n < len2; n++) {
			minX = forest[m][n].node.x < minX ? forest[m][n].node.x : minX;
			minY = forest[m][n].node.y < minY ? forest[m][n].node.y : minY;
		}
		forest[m][0].node.setLocation(forest[m][0].node.x + (80 - minX),
				forest[m][0].node.y + 50 + (lastMaxY - minY));
		JTopo.layout.layoutNode(scene, forest[m][0].node, true);

		// 因为排版后y的值有变化，因此需要在排完版后再计算lastMaxY
		for (var n = 0, len2 = forest[m].length; n < len2; n++) {
			lastMaxY = forest[m][n].node.y > lastMaxY ? forest[m][n].node.y
					: lastMaxY;
		}
	}
}

/**
 * 显示直/曲线图
 */
function curveGraph() {
	isCurve = !isCurve;

	var text = isCurve ? "显示直线图" : "显示曲线图";
	$("#line-btn").text(text);

	for (var i = 0, len = links.length; i < len; i++) {
		var link = isCurve ? new JTopo.CurveLink(links[i].nodeA,
				links[i].nodeZ, "") : new JTopo.Link(links[i].nodeA,
				links[i].nodeZ);
		scene.remove(links[i]);
		links.splice(i, 1, link);
		scene.add(link);
	}
}

/**
 * 保存画布
 */
function saveScene() {
	var historyForest = Array.of();
	for (var m = 0, len1 = forest.length; m < len1; m++) {
		var tree = forest[m];
		var backupTree = Array.of();
		for (var n = 0, len2 = tree.length; n < len2; n++) {
			backupTree.push({
				x : tree[n].node.x,
				y : tree[n].node.y,
				id : tree[n].id,
				topic : tree[n].topic,
				type : tree[n].type,
				detail : tree[n].detail,
				parentId : tree[n].parentId
			});
		}
		historyForest.push(backupTree);
	}
	historyForests.push(historyForest);

	var historyLink = Array.of();
	for (var i = 0, len = links.length; i < len; i++) {
		historyLink.push({
			parentNodeId : links[i].nodeA.id,
			nodeId : links[i].nodeZ.id
		});
	}
	historyLinks.push(historyLink);

	$("#revoke-btn").removeClass("disabled");
}

function deleteScene() {
	historyForests.pop();
	historyLinks.pop();
}

/**
 * 撤销
 */
function repeal() {
	scene.clear();
	forest.splice(0, forest.length);
	links.splice(0, links.length);

	var lastForest = historyForests.pop();
	for (var m = 0, len1 = lastForest.length; m < len1; m++) {
		var tree = lastForest[m];
		for (var n = 0, len2 = tree.length; n < len2; n++) {
			drawNode(tree[n].x, tree[n].y, tree[n].id, tree[n].topic,
					tree[n].type, tree[n].detail, null);
		}
	}

	var lastLinks = historyLinks.pop();
	for (var i = 0, len = lastLinks.length; i < len; i++) {
		var nodeId = lastLinks[i].nodeId, parentNodeId = lastLinks[i].parentNodeId;
		linkTwoSingleNode(nodeId, parentNodeId);
	}

	if (historyForests.length == 0) {
		$("#revoke-btn").addClass("disabled");
	}
}

/**
 * 判断父节点下要添加的法条是否重复
 * 
 * @param parentId
 * @param lawTopic
 * @param lawDetail
 * @returns {boolean}
 */
function isLawRepeated(parentId, lawTopic, lawDetail) {
	if (parentId == null || parent == "null")
		return false;

	var parentNodeChildren = getDirectChildren(parentId);
	for (var i = 0; i < parentNodeChildren.length; i++) {
		var childNode = findNodeById(parentNodeChildren[i]);
		if (childNode.type == 2 && childNode.topic == lawTopic
				&& childNode.detail == lawDetail) {
			return true;
		}
	}
	return false;
}

function prepareConclusionSelect() {
	$("#conclusion-select").empty();
	$("#conclusion-select").append($("<option>").val(0).text("无"));
	for (var m = 0, len1 = forest.length; m < len1; m++) {
		var tree = forest[m];
		for (var n = 0, len2 = tree.length; n < len2; n++) {
			if (tree[n].type == 3) {
				$("#conclusion-select").append(
						$("<option>").val(tree[n].id).text(tree[n].topic));
			}
		}
	}
}

function conclusionSelectChangeEvent() {
	var selectVal = $("#conclusion-select").val();
	if (selectVal == 0) {
		$("#canvas-div").scrollTop(0);
	} else {
		$("#canvas-div").scrollTop(
				findNodeById($("#conclusion-select").val()).node.y - 50);
	}
}

/**
 * 加载从数据库中读取获得的节点信息至画布上
 * 
 * @param data
 */
function loadData(data) {
	// 先画节点
	for (var i = 0; i < data.length; i++) {
		if (idCounter < data[i].nodeID)
			idCounter = data[i].nodeID;
		drawNode(data[i].x, data[i].y, data[i].nodeID, data[i].topic,
				data[i].type, data[i].detail, null);
	}

	// 节点画完后再连线
	for (var i = 0; i < data.length; i++) {
		if (data[i].parentNodeID == -1)
			continue;
		linkTwoSingleNode(data[i].nodeID, data[i].parentNodeID)
	}
}

function saveData() {
	var nodes = Array.of();
	for (var m = 0, len1 = forest.length; m < len1; m++) {
		var tree = forest[m];
		for (var n = 0, len2 = tree.length; n < len2; n++) {
			var parentId = tree[n].parentId == null
					|| tree[n].parentId == "null" ? -1 : tree[n].parentId;

			nodes.push({
				caseID : cid,
				nodeID : tree[n].id,
				parentNodeID : parentId,
				topic : tree[n].topic,
				detail : tree[n].detail,
				type : tree[n].type,
				x : tree[n].node.x,
				y : tree[n].node.y
			});
		}
	}

	saveLogicNodes(JSON.stringify(nodes));
}

function loadingDots() {
	if (dotNum >= 3) {
		$('#id_loading_dots').text('');
		dotNum = 0;
	} else {
		dotNum++;
		$('#id_loading_dots').text($('#id_loading_dots').text() + ' ●');
	}
}