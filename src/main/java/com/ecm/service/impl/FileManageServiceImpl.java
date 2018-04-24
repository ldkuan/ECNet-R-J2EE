package com.ecm.service.impl;


import com.ecm.keyword.model.EvidenceModel;
import com.ecm.keyword.model.FactModel;
import com.ecm.keyword.model.FactRelationModel;
import com.ecm.keyword.model.LinkPointModel;
import com.ecm.keyword.writer.JsonWriter;
import com.ecm.service.FileManageService;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import nju.software.wsjx.facade.impl.WsModelFacadeImpl;
import nju.software.wsjx.model.wsSegmentationModel.WsModel;
import nju.software.wsjx.util.FileUtil;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.RegionUtil;
import org.jdom.JDOMException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.*;

@Service
public class FileManageServiceImpl implements FileManageService {
    @Override
    public String saveFileUpload(MultipartFile multipartFile) throws Exception {
        /** 获取文件的后缀* */
        String filename = multipartFile.getOriginalFilename();
        System.out.println("Uploaded:" + filename);

        String[] filenames = filename.split("\\.");
        String fileType = filenames[filenames.length - 1];


        //得到 接受请求的绝对路径
        File f = new File("");
        String absolutePath = f.getAbsolutePath();
        System.out.println(absolutePath);


        if (fileType.equals("doc") || fileType.equals("docx")) {
            savefile(multipartFile, absolutePath + "/file/doc/temp.doc");
            //注意路径形式，只到temp没有后缀
            transferFile(absolutePath + "/file/doc/temp.doc", absolutePath + "/file/xml/");

        } else if (fileType.equals("txt")) {
            savefile(multipartFile, absolutePath + "/file/txt/temp.txt");
            //注意路径形式，只到temp没有后缀
            transferFile(absolutePath + "/file/txt/temp.txt", absolutePath + "/file/xml/");
        } else {
            savefile(multipartFile, absolutePath + "/file/xml/temp.xml");

        }

        return absolutePath + "/file/xml/temp.xml";
    }


    private String savefile(MultipartFile multipartFile, String path) throws IOException {

        File file = new File(path);
        if (!file.exists()) {
            System.out.println("文件不存在，重新创建");
            file.createNewFile();
        }
        try {
            multipartFile.transferTo(file);
            file.deleteOnExit();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return "";
    }

    private String transferFile(String fromPath, String toPath) throws IOException, JDOMException {

        FileUtil fileUtil = new FileUtil();

        File f = new File(fromPath);

        System.out.println(f.getAbsolutePath());
        String name = f.getAbsolutePath();
        byte[] wsnr = fileUtil.getContent(name);
        InputStream is = new ByteArrayInputStream(wsnr);
        WsModelFacadeImpl wsModelFacadeImpl = new WsModelFacadeImpl();
        WsModel wsModel = wsModelFacadeImpl.jxDocument(is, name);
        int posa = name.lastIndexOf('.');
        int posb = name.lastIndexOf('\\');
        String fname = name.substring(posb + 1, posa);
        if (wsModel != null)
            wsModel.transformToXml(toPath, "temp");
        else {
            System.out.println("error");
        }

        return "";
    }


    @Override
    public String writeResultJson(JSONObject jsonObject, String path) throws IOException {
        JsonWriter jsonWriter = new JsonWriter();
        jsonWriter.writeJsonToFile(path, jsonObject.toString());

        return "";
    }

    @Override
    public String exportExcel(String modelsJsonStr) {

        JSONObject jsonObject = JSONObject.fromObject(modelsJsonStr);

        String factListString = jsonObject.getString("factList");
//        JSONArray factArray = JSONArray.fromObject(factListString);
//        for (int i = 0; i < factArray.size(); i++) {
//            JSONObject job = factArray.getJSONObject(i);  // 遍历 jsonarray 数组，把每一个对象转成 json 对象
//            System.out.println(job.get("content"));  // 得到 每个对象中的属性值
//        }
        List<FactRelationModel> factRelationModelList = new ArrayList<>();
        if (!factListString.equals("")) {
            Gson gson = new GsonBuilder().create();
            FactRelationModel[] arr = gson.fromJson(factListString, FactRelationModel[].class);
            factRelationModelList = Arrays.asList(arr);
        }
//        for (FactRelationModel factRelationModel : factRelationModelList) {
//            System.out.println("********************************************");
//            System.out.println(factRelationModel.getContent());
//            List<LinkPointModel> linkPointModels = factRelationModel.getLinkPointList();
//            for (LinkPointModel linkPointModel : linkPointModels) {
//                System.out.println(linkPointModel.getValue());
//                System.out.println(linkPointModel.getEvidenceValue());
//                System.out.println(linkPointModel.getIndex());
//            }
//        }

        List<EvidenceModel> evidenceModelList = new ArrayList<>();
        if (factRelationModelList.size() > 0) {
            evidenceModelList = factRelationModelList.get(0).getEvidenceList();
        }


        //创建workbook
        HSSFWorkbook workbook = new HSSFWorkbook();
        Map number = new HashMap();//链体id与证据清单序号

        // 标题字体对象
        HSSFFont titleFont = workbook.createFont();
//        titleFont.setBold(true);
        titleFont.setFontHeightInPoints((short) 16);
//        font.setFontName("新宋体");
        titleFont.setColor(HSSFColor.BLUE.index);

        //列名字体
        HSSFFont cNameFont = workbook.createFont();
//        cNameFont.setBold(true);
        cNameFont.setFontHeightInPoints((short) 10);
//        font.setFontName("新宋体");
        cNameFont.setColor(HSSFColor.BLUE.index);

        //单元格字体
        HSSFFont font = workbook.createFont();
//        font.setBold(false);
        font.setFontHeightInPoints((short) 10);
//        font.setFontName("新宋体");
        cNameFont.setColor(HSSFColor.BLACK.index);

        //标题样式
        HSSFCellStyle titleStyle = workbook.createCellStyle();
        titleStyle.setAlignment(CellStyle.ALIGN_CENTER);
        titleStyle.setVerticalAlignment(CellStyle.ALIGN_CENTER);
        titleStyle.setFont(titleFont);
        titleStyle.setWrapText(true);//自动换行

        //列名样式
        HSSFCellStyle cStyle = workbook.createCellStyle();
//        cStyle.setAlignment(HorizontalAlignment.CENTER);
//        cStyle.setVerticalAlignment(VerticalAlignment.CENTER);
        cStyle.setAlignment(CellStyle.ALIGN_CENTER);
        cStyle.setVerticalAlignment(CellStyle.ALIGN_CENTER);
        cStyle.setFont(cNameFont);
        cStyle.setWrapText(true);
        //设置边框样式
//        cStyle.setBorderTop(BorderStyle.THIN);
//        cStyle.setBorderBottom(BorderStyle.THIN);
//        cStyle.setBorderLeft(BorderStyle.THIN);
//        cStyle.setBorderRight(BorderStyle.THIN);
        //设置边框颜色
//        cStyle.setTopBorderColor(HSSFColor.BLACK.index);
//        cStyle.setBottomBorderColor(HSSFColor.BLACK.index);
//        cStyle.setLeftBorderColor(HSSFColor.BLACK.index);
//        cStyle.setRightBorderColor(HSSFColor.BLACK.index);

        //列名样式
        HSSFCellStyle style = workbook.createCellStyle();
        style.setAlignment(CellStyle.ALIGN_CENTER);
        style.setVerticalAlignment(CellStyle.ALIGN_CENTER);
        style.setFont(font);
        style.setWrapText(true);
        //设置边框样式
//        style.setBorderTop(BorderStyle.THIN);
//        style.setBorderBottom(BorderStyle.THIN);
//        style.setBorderLeft(BorderStyle.THIN);
//        style.setBorderRight(BorderStyle.THIN);

        //创建证据清单sheet
        HSSFSheet sheet1 = workbook.createSheet("证据清单");
//        sheet1.autoSizeColumn(1, true);
        CellRangeAddress callRangeAddress = new CellRangeAddress(0, 0, 1, 9);//起始行,结束行,起始列,结束列
        sheet1.addMergedRegion(callRangeAddress);
        HSSFRow row = sheet1.createRow(0);
        HSSFCell cell = row.createCell(1);
        cell.setCellValue("证据清单");
        cell.setCellStyle(titleStyle);

        HSSFRow row2 = sheet1.createRow(1);
        String[] titles = {"序号", "证据名称", "证据明细", "证据种类（下拉）", "提交人", "质证理由", "质证结论（下拉）", "链头信息", "该链头在证据中的关键文本（短句）"};
        for (int i = 1; i <= titles.length; i++) {
            HSSFCell cell2 = row2.createCell(i);
            //加载单元格样式
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
//                RegionUtil.setBorderBottom(1,cra, sheet1);
//                RegionUtil.setBorderLeft(1,cra, sheet1);
//                RegionUtil.setBorderRight(1,cra, sheet1);
//                RegionUtil.setBorderTop(1,cra, sheet1);
//                setRegionStyle(sheet1,cra,style);
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


        //创建事实清单sheet
        HSSFSheet sheet2 = workbook.createSheet("事实清单");
//        sheet2.autoSizeColumn(1, true);
        CellRangeAddress callRangeAddress2 = new CellRangeAddress(0, 0, 1, 7);//起始行,结束行,起始列,结束列
        sheet2.addMergedRegion(callRangeAddress2);
        HSSFRow r1 = sheet2.createRow(0);
        HSSFCell c1 = r1.createCell(1);
        c1.setCellValue("事实清单");
        c1.setCellStyle(titleStyle);

        HSSFRow r2 = sheet2.createRow(1);
        String[] titles2 = {"序号", "事实名称", "事实明细(较长文本)", "来自事实的链头（联结点）", "来自证据的链头", "证据序号(引用证据清单的序号)", "与链头相关的证据中的关键文本(短句)"};
        for (int i = 1; i <= titles2.length; i++) {
            HSSFCell cell2 = r2.createCell(i);
            //加载单元格样式
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
//                System.out.println(evidenceIndex);
//                System.out.println(evidenceModelList.get(evidenceIndex).getContent());
//                System.out.println(evidenceMap);
                List<Integer> hids = evidenceMap.get(evidenceModelList.get(evidenceIndex));
//                for (Integer inte : hids)
//                    System.out.println(inte);
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
//                    RegionUtil.setBorderBottom(1,cra, sheet1);
//                    RegionUtil.setBorderLeft(1,cra, sheet1);
//                    RegionUtil.setBorderRight(1,cra, sheet1);
//                    RegionUtil.setBorderTop(1,cra, sheet1);
//                   setRegionStyle(sheet2,cra,style);
                }
                HSSFCell ctemp4 = rowtemp.getCell(4);
                if (ctemp4 == null) {
                    ctemp4 = rowtemp.createCell(4);
                    ctemp4.setCellStyle(style);
                }
                ctemp4.setCellValue(joint.getValue());

                for (int k = 0; k < hNum; k++) {
                    int hid = hids.get(k);
//                    System.out.println(hid);
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
                    //Map,HashMap并没有实现Iteratable接口.不能用于增强for循环.
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
//                    RegionUtil.setBorderBottom(1,crat, sheet1);
//                    RegionUtil.setBorderLeft(1,crat, sheet1);
//                    RegionUtil.setBorderRight(1,crat, sheet1);
//                    RegionUtil.setBorderTop(1,crat, sheet1);
//                    setRegionStyle(sheet2,crat,style);
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


        File f = new File("");
        String absolutePath = f.getAbsolutePath();
        File file = new File(absolutePath + "/file/excel/model.xls");
        try {
            if (!file.exists()) {
                file.createNewFile();
            }

            FileOutputStream fileOut = new FileOutputStream(file);
            workbook.write(fileOut);
//            workbook.close();
            fileOut.close();

        } catch (IOException e) {
            e.printStackTrace();
        }

        return "";
    }
}
