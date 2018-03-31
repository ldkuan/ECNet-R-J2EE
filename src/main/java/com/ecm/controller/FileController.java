package com.ecm.controller;

import com.ecm.keyword.model.FactModel;
import com.ecm.keyword.reader.ReaderFactory;
import com.ecm.keyword.reader.XMLReader;
import com.ecm.keyword.reader.XMLReaderCri;
import com.ecm.keyword.writer.XmlWriter;
import com.ecm.service.ModelManageService;
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

//    @Autowired
//    private ModelManageService modelManageService;

    @RequestMapping(value = "/upload")
    public Map<String, Object> uploadFile(HttpServletRequest request, HttpServletResponse response) throws Exception {
        request.setCharacterEncoding("UTF-8");

        Map<String, Object> json = new HashMap<String, Object>();
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;

        /** 页面控件的文件流* */
        MultipartFile multipartFile = null;
        Map map = multipartRequest.getFileMap();
        for (Iterator i = map.keySet().iterator(); i.hasNext(); ) {
            Object obj = i.next();
            multipartFile = (MultipartFile) map.get(obj);

        }
        /** 获取文件的后缀* */
        String filename = multipartFile.getOriginalFilename();
        System.out.println("Uploaded:" + filename);

        File file = new File("file/xml/temp.xml");
        try {
            multipartFile.transferTo(file);
            file.deleteOnExit();
        } catch (Exception e) {
            e.printStackTrace();
        }

        String filePath = "file/xml/";
        XmlWriter xmlWriter = new XmlWriter();
        xmlWriter.write(file,filePath+filename);

        System.out.println(file.getName());
//        ArrayList<FactModel> factList = new ArrayList<FactModel>();
//        ReaderFactory fac = new ReaderFactory();
//        XMLReader xmlReader = new XMLReader();
//        String type = xmlReader.getType(filePath+filename);
//        xmlReader = fac.createXMLReader(type);
//        if (factList.size() > 0) {
//            for (int i = 0; i < factList.size(); i++) {
//                System.out.println(factList.get(i));
//            }
//        }

        String path = "";


        json.put("message", "应用上传成功");
        json.put("status", true);
        json.put("filePath", path);
        return json;
    }

    public static  void main(String args[]){
        File f = new File(".");

        String absolutePath = f.getAbsolutePath();

        System.out.println(absolutePath);
    }
}
