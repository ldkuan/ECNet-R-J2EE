package com.ecm.controller;

import com.ecm.keyword.manager.HeadCreator;
import com.ecm.keyword.model.FactModel;
import com.ecm.keyword.reader.JsonReader;
import com.ecm.keyword.reader.ReaderFactory;
import com.ecm.keyword.reader.XMLReader;
import com.ecm.keyword.reader.XMLReaderCri;
import com.ecm.keyword.writer.XmlWriter;
import com.ecm.service.FileManageService;
import com.ecm.service.ModelManageService;
import com.google.gson.JsonObject;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

import java.nio.file.Files;
import java.text.MessageFormat;
import java.util.*;


@RestController
@RequestMapping(value = "/file")
public class FileController {

    @Autowired
    private FileManageService fileManageService;
    @Autowired
    private ModelManageService modelManageService;


    @RequestMapping(value = "/upload")
    public Map<String, Object> uploadFile(HttpServletRequest request, HttpServletResponse response) throws Exception {
        request.setCharacterEncoding("UTF-8");

        System.out.println("--------------------");
        Map<String, Object> json = new HashMap<String, Object>();
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;

        /** 页面控件的文件流* */
        MultipartFile multipartFile = null;
        Map map = multipartRequest.getFileMap();
        for (Iterator i = map.keySet().iterator(); i.hasNext(); ) {
            Object obj = i.next();
            multipartFile = (MultipartFile) map.get(obj);

        }
        //得到 接受请求的绝对路径
        File f = new File("");
        String absolutePath = f.getAbsolutePath();


        //存储上传的文件
        String savePath = fileManageService.saveFileUpload(multipartFile);

//        从存储的文件中 得到证据链模型
        JSONArray factArray = modelManageService.getModel(absolutePath + "/file/xml/");

        //将证据链模型递交 关系计算服务器  返回有事实证据联系的 证据链模型
        JSONObject modelsJson = HeadCreator.getHead(factArray);
        System.out.println(modelsJson.toString());


        File file = new File(absolutePath + "/file/xml/result/a.json");
        String content = FileUtils.readFileToString(file, "UTF-8");
        JSONObject jsonObject = JSONObject.fromObject(content);

        json.put("message", "文件上传成功");
        json.put("status", true);
        json.put("filePath", absolutePath + "\\file\\xml\\temp.xml");
        json.put("fileContent", "");
        json.put("modelsJson", modelsJson);
        return json;
    }


}
