package com.ecm.service.impl;

import com.ecm.dao.LogicNodeDao;
import com.ecm.keyword.model.EvidenceModel;
import com.ecm.keyword.model.FactRelationModel;
import com.ecm.keyword.model.LinkPointModel;
import com.ecm.model.LogicNode;
import com.ecm.service.LogicService;
import com.ecm.util.LogicExcelGenerator;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import net.sf.json.JSONObject;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.util.CellRangeAddress;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by deng on 2018/3/28.
 */
@Service
@PropertySource(value = { "classpath:application.properties" }, encoding = "utf-8")
public class LogicServiceImpl implements LogicService {
	@Autowired
	private LogicNodeDao logicNodeDao;

	@Value("${download.logicnode.excel}")
	private String downloadExcelPath;
	@Value("${download.logicnode.report}")
	private String downloadReportPath;

	@Override
	public List<LogicNode> getAllNodesByCaseID(int caseID) {
		List<LogicNode> logicNodes = logicNodeDao.findByCaseID(caseID);
		return logicNodes;
	}

	@Override
	public String generateExcelFile(String logicJson) {
		JSONObject jsonObject = JSONObject.fromObject(logicJson);
		String logicNodesStr = jsonObject.getString("json");
		Gson gson = new GsonBuilder().create();
		LogicNode[] array = gson.fromJson(logicNodesStr, LogicNode[].class);
		List<LogicNode> logicNodes = Arrays.asList(array);
		// List<LogicNode> logicNode = logicNodeDao.findByCaseID(41722);
		new LogicExcelGenerator(downloadExcelPath, logicNodes).generateExcelFile();
		return downloadExcelPath;
	}

	@Override
	public String generateReportFile(String modelsJson, String logicJson) {
		JSONObject jsonObject1 = JSONObject.fromObject(modelsJson);
		String factListString = jsonObject1.getString("factList");
		List<FactRelationModel> factRelationModelList = new ArrayList<>();
		if (!factListString.equals("")) {
			Gson gson = new GsonBuilder().create();
			FactRelationModel[] arr = gson.fromJson(factListString, FactRelationModel[].class);
			factRelationModelList = Arrays.asList(arr);
		}
		List<EvidenceModel> evidenceModelList = new ArrayList<>();
		if (factRelationModelList.size() > 0) {
			evidenceModelList = factRelationModelList.get(0).getEvidenceList();
		}

		// 创建workbook
		HSSFWorkbook workbook = new HSSFWorkbook();
		Map number = new HashMap();

		// 标题字体对象
		HSSFFont titleFont = workbook.createFont();
		titleFont.setFontHeightInPoints((short) 16);
		titleFont.setColor(HSSFColor.BLUE.index);

		// 列名字体
		HSSFFont cNameFont = workbook.createFont();
		cNameFont.setFontHeightInPoints((short) 10);
		cNameFont.setColor(HSSFColor.BLUE.index);

		// 单元格字体
		HSSFFont font = workbook.createFont();
		font.setFontHeightInPoints((short) 10);
		cNameFont.setColor(HSSFColor.BLACK.index);

		// 标题样式
		HSSFCellStyle titleStyle = workbook.createCellStyle();
		titleStyle.setAlignment(CellStyle.ALIGN_CENTER);
		titleStyle.setVerticalAlignment(CellStyle.ALIGN_CENTER);
		titleStyle.setFont(titleFont);
		titleStyle.setWrapText(true);

		// 列名样式
		HSSFCellStyle cStyle = workbook.createCellStyle();
		cStyle.setAlignment(CellStyle.ALIGN_CENTER);
		cStyle.setVerticalAlignment(CellStyle.ALIGN_CENTER);
		cStyle.setFont(cNameFont);
		cStyle.setWrapText(true);

		// 列名样式
		HSSFCellStyle style = workbook.createCellStyle();
		style.setAlignment(CellStyle.ALIGN_CENTER);
		style.setVerticalAlignment(CellStyle.ALIGN_CENTER);
		style.setFont(font);
		style.setWrapText(true);

		// 创建证据清单sheet
		HSSFSheet sheet1 = workbook.createSheet("证据清单");
		CellRangeAddress callRangeAddress = new CellRangeAddress(0, 0, 1, 9);// 起始行,结束行,起始列,结束列
		sheet1.addMergedRegion(callRangeAddress);
		HSSFRow row = sheet1.createRow(0);
		HSSFCell cell = row.createCell(1);
		cell.setCellValue("证据清单");
		cell.setCellStyle(titleStyle);

		HSSFRow row2 = sheet1.createRow(1);
		String[] titles = { "序号", "证据名称", "证据明细", "证据种类（下拉）", "提交人", "质证理由", "质证结论（下拉）", "链头信息", "该链头在证据中的关键文本（短句）" };
		for (int i = 1; i <= titles.length; i++) {
			HSSFCell cell2 = row2.createCell(i);
			cell2.setCellStyle(cStyle);
			cell2.setCellValue(titles[i - 1]);
		}
		int rowNum = 2;
		for (int i = 0; i < evidenceModelList.size(); i++) {
			HSSFRow hrow = sheet1.createRow(rowNum);
			EvidenceModel body = evidenceModelList.get(i);
			int bid = body.getId();
			List<String> headers = body.getHeadList();
			int hNum = headers.size();
			if (hNum > 1)
				for (int j = 1; j <= 7; j++) {
					CellRangeAddress cra = new CellRangeAddress(rowNum, rowNum + hNum - 1, j, j);
					sheet1.addMergedRegion(cra);
				}
			HSSFCell ctemp1 = hrow.getCell(1);
			if (ctemp1 == null) {
				ctemp1 = hrow.createCell(1);
				ctemp1.setCellStyle(style);
			}
			ctemp1.setCellValue(i + 1);
			number.put(bid, i + 1);
			HSSFCell ctemp2 = hrow.getCell(2);
			if (ctemp2 == null) {
				ctemp2 = hrow.createCell(2);
				ctemp2.setCellStyle(style);
			}
			ctemp2.setCellValue(body.getName());
			HSSFCell ctemp3 = hrow.getCell(3);
			if (ctemp3 == null) {
				ctemp3 = hrow.createCell(3);
				ctemp3.setCellStyle(style);
			}
			ctemp3.setCellValue(body.getContent());
			HSSFCell ctemp4 = hrow.getCell(4);
			if (ctemp4 == null) {
				ctemp4 = hrow.createCell(4);
				ctemp4.setCellStyle(style);
			}
			ctemp4.setCellValue(body.getType());
			HSSFCell ctemp5 = hrow.getCell(5);
			if (ctemp5 == null) {
				ctemp5 = hrow.createCell(5);
				ctemp5.setCellStyle(style);
			}
			ctemp5.setCellValue(body.getSubmitter());
			HSSFCell ctemp6 = hrow.getCell(6);
			if (ctemp6 == null) {
				ctemp6 = hrow.createCell(6);
				ctemp6.setCellStyle(style);
			}
			ctemp6.setCellValue(body.getReason());
			HSSFCell ctemp7 = hrow.getCell(7);
			if (ctemp7 == null) {
				ctemp7 = hrow.createCell(7);
				ctemp7.setCellStyle(style);
			}
			ctemp7.setCellValue("Trust");
			for (int k = 0; k < hNum; k++) {
				String h = headers.get(k);
				HSSFRow rowtemp;
				if (k == 0) {
					rowtemp = hrow;
				} else {
					rowtemp = sheet1.createRow(rowNum);
				}
				HSSFCell ctempk_8 = rowtemp.createCell(8);
				ctempk_8.setCellValue(h);
				ctempk_8.setCellStyle(style);
				HSSFCell ctempk_9 = rowtemp.createCell(9);
				ctempk_9.setCellValue(h);
				ctempk_9.setCellStyle(style);
				rowNum++;
			}
			if (hNum == 0) {
				rowNum++;
			}
		}

		// 创建事实清单sheet
		HSSFSheet sheet2 = workbook.createSheet("事实清单");
		CellRangeAddress callRangeAddress2 = new CellRangeAddress(0, 0, 1, 7);// 起始行,结束行,起始列,结束列
		sheet2.addMergedRegion(callRangeAddress2);
		HSSFRow r1 = sheet2.createRow(0);
		HSSFCell c1 = r1.createCell(1);
		c1.setCellValue("事实清单");
		c1.setCellStyle(titleStyle);
		HSSFRow r2 = sheet2.createRow(1);
		String[] titles2 = { "序号", "事实名称", "事实明细(较长文本)", "来自事实的链头（联结点）", "来自证据的链头", "证据序号(引用证据清单的序号)",
				"与链头相关的证据中的关键文本(短句)" };
		for (int i = 1; i <= titles2.length; i++) {
			HSSFCell cell2 = r2.createCell(i);
			cell2.setCellStyle(cStyle);
			cell2.setCellValue(titles2[i - 1]);
		}
		int startRow = 2;
		int endRow = 2;
		for (int i = 0; i < factRelationModelList.size(); i++) {
			startRow = endRow;
			HSSFRow hrow = sheet2.createRow(endRow);
			FactRelationModel fact = factRelationModelList.get(i);
			int fid = i;
			List<LinkPointModel> joints = fact.getLinkPointList();
			int jNum = joints.size();

			HashMap<String, List<Integer>> map = new HashMap<>();
			for (LinkPointModel linkPointModel : joints) {

				if (!map.containsKey(linkPointModel.getValue())) {
					List<Integer> list = new ArrayList<>();
					list.add(linkPointModel.getIndex());
					map.put(linkPointModel.getValue(), list);
				} else {
					List<Integer> list = new ArrayList<>();
					list = map.get(linkPointModel.getValue());
					list.add(linkPointModel.getIndex());
					map.put(linkPointModel.getValue(), list);
				}
			}

			List<String> headList = new ArrayList<>();
			HashMap<EvidenceModel, List<Integer>> evidenceMap = new HashMap<>();
			for (int index = 0; index < evidenceModelList.size(); index++) {
				EvidenceModel evidenceModel = evidenceModelList.get(index);

				int count = 0;
				for (int e = 0; e < index; e++) {
					count += evidenceModelList.get(e).getHeadList().size();
				}
				if (count > 0)
					count--;
				List<Integer> headIds = new ArrayList<>();
				List<String> tempHeadList = evidenceModel.getHeadList();
				for (int r = 0; r < tempHeadList.size(); r++) {
					headIds.add(count);
					count++;
				}
				evidenceMap.put(evidenceModel, headIds);

				headList.addAll(evidenceModel.getHeadList());
			}
			for (int j = 0; j < jNum; j++) {
				LinkPointModel joint = joints.get(j);
				int evidenceIndex = joint.getIndex();
				List<Integer> hids = evidenceMap.get(evidenceModelList.get(evidenceIndex));
				int hNum = hids.size();
				HSSFRow rowtemp;
				if (j == 0) {
					rowtemp = hrow;
				} else {
					rowtemp = sheet2.createRow(endRow);
				}

				if (hNum > 1) {
					CellRangeAddress cra = new CellRangeAddress(endRow, endRow + hNum - 1, 4, 4);
					sheet2.addMergedRegion(cra);
				}
				HSSFCell ctemp4 = rowtemp.getCell(4);
				if (ctemp4 == null) {
					ctemp4 = rowtemp.createCell(4);
					ctemp4.setCellStyle(style);
				}
				ctemp4.setCellValue(joint.getValue());
				for (int k = 0; k < hNum; k++) {
					int hid = hids.get(k);
					String head = headList.get(hid);
					HSSFRow rtmp;
					if (k == 0) {
						rtmp = rowtemp;
					} else {
						rtmp = sheet2.createRow(endRow);
					}
					HSSFCell ctemp5 = rtmp.createCell(5);
					ctemp5.setCellValue(head);
					ctemp5.setCellStyle(style);

					HSSFCell ctemp6 = rtmp.createCell(6);
					EvidenceModel key = new EvidenceModel();
					for (EvidenceModel evidenceModel : evidenceMap.keySet()) {
						if (evidenceMap.get(evidenceModel).contains(hid)) {
							key = evidenceModel;
						}
					}
					ctemp6.setCellValue(evidenceModelList.indexOf(key));
					ctemp6.setCellStyle(style);

					HSSFCell ctemp7 = rtmp.createCell(7);
					ctemp7.setCellValue(head);
					ctemp7.setCellStyle(style);
					endRow++;
				}
				if (hNum == 0) {
					HSSFCell ctemp5 = rowtemp.createCell(5);
					ctemp5.setCellStyle(style);
					HSSFCell ctemp6 = rowtemp.createCell(6);
					ctemp6.setCellStyle(style);
					HSSFCell ctemp7 = rowtemp.createCell(7);
					ctemp7.setCellStyle(style);
					endRow++;
				}
			}
			if (jNum == 0) {
				HSSFCell ctemp4 = hrow.createCell(4);
				ctemp4.setCellStyle(style);
				endRow++;
			}
			if (endRow - 1 > startRow) {
				for (int m = 1; m <= 3; m++) {
					CellRangeAddress crat = new CellRangeAddress(startRow, endRow - 1, m, m);
					sheet2.addMergedRegion(crat);
				}
			}
			HSSFCell ctemp1 = hrow.getCell(1);
			if (ctemp1 == null) {
				ctemp1 = hrow.createCell(1);
				ctemp1.setCellStyle(style);
			}
			ctemp1.setCellValue(i + 1);

			HSSFCell ctemp2 = hrow.getCell(2);
			if (ctemp2 == null) {
				ctemp2 = hrow.createCell(2);
				ctemp2.setCellStyle(style);
			}
			ctemp2.setCellValue(fact.getContent());

			HSSFCell ctemp3 = hrow.getCell(3);
			if (ctemp3 == null) {
				ctemp3 = hrow.createCell(3);
				ctemp3.setCellStyle(style);
			}
			ctemp3.setCellValue(fact.getContent());
		}

		// 创建说理逻辑表sheet
		JSONObject jsonObject2 = JSONObject.fromObject(logicJson);
		String logicNodesStr = jsonObject2.getString("json");
		Gson gson = new GsonBuilder().create();
		LogicNode[] array = gson.fromJson(logicNodesStr, LogicNode[].class);
		List<LogicNode> logicNodes = Arrays.asList(array);
		List<LogicNode> nodes;
		Map<Integer, LogicNode> nodeMap;
		List<Integer> roots;
		String[] types = { "证据", "事实", "法条", "结论" };

		nodes = logicNodes;
		nodeMap = new HashMap<>();
		for (LogicNode node : nodes) {
			nodeMap.put(node.getNodeID(), node);
		}

		roots = new ArrayList<>();
		for (LogicNode node : nodes) {
			int parentNodeID = node.getParentNodeID();
			if (parentNodeID == -1) {
				roots.add(node.getNodeID());
			}
		}

		HSSFSheet sheet3 = workbook.createSheet("说理逻辑表");
		HSSFRow firstRow = sheet3.createRow(0);
		for (short i = 0; i < types.length; i++) {
			HSSFCell cell3 = firstRow.createCell(i);
			cell3.setCellValue(types[i]);
		}

		for (int i = 0; i < roots.size(); i++) {
			String evidenceStr = "";
			String factStr = "";
			String lawStr = "";
			String conclusionStr = "";

			for (LogicNode node : nodes) {
				if (isChildOrSelf(nodeMap, roots.get(i), node.getNodeID())) {
					switch (node.getType()) {
					case 0:
						evidenceStr += node.getTopic() + "、";
						break;
					case 1:
						factStr += node.getTopic() + "、";
						break;
					case 2:
						lawStr += node.getTopic() + "、";
						break;
					case 3:
						conclusionStr += node.getTopic() + "、";
						break;
					}
				}
			}

			HSSFRow row3 = sheet3.createRow(i + 1);
			row3.createCell(0).setCellValue(getColumnStr(evidenceStr));
			row3.createCell(1).setCellValue(getColumnStr(factStr));
			row3.createCell(2).setCellValue(getColumnStr(lawStr));
			row3.createCell(3).setCellValue(getColumnStr(conclusionStr));
		}

		File file = new File(downloadReportPath);
		FileOutputStream fos = null;
		try {
			if (!file.exists()) {
				file.createNewFile();
			}
			fos = new FileOutputStream(file);
			workbook.write(fos);
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				fos.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return downloadReportPath;
	}

	private String getColumnStr(String str) {
		if (str.length() > 0) {
			return str.substring(0, str.length() - 1);
		} else {
			return "无";
		}
	}

	private boolean isChildOrSelf(Map<Integer, LogicNode> nodeMap, int pID, int id) {
		if (nodeMap.get(id).getNodeID() == pID)
			return true;
		else if (nodeMap.get(id).getParentNodeID() == -1)
			return false;
		else if (nodeMap.get(id).getParentNodeID() == pID)
			return true;
		else
			return isChildOrSelf(nodeMap, pID, nodeMap.get(id).getParentNodeID());
	}
}
