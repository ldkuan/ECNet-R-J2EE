/**
 * 获取数据库中画布节点数据
 */
function loadLogicNodes() {
	$
			.ajax({
				type : "GET",
				url : "/logic/getAll",
				data : {
					caseID : cid
				},
				async : false,
				success : function(data) {
					// loadData(data);
					loadData([
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
							} ]);
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					// alert(XMLHttpRequest.status);
					// alert(XMLHttpRequest.readyState);
					// alert(textStatus);
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