package com.ecm.service.impl;

import com.ecm.service.FileManageService;
import nju.software.wsjx.facade.impl.WsModelFacadeImpl;
import nju.software.wsjx.model.wsSegmentationModel.WsModel;
import nju.software.wsjx.util.FileUtil;
import org.jdom.JDOMException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;

@Service
public class FileManageServiceImpl implements FileManageService {
    @Override
    public String saveFileUpload(MultipartFile multipartFile) throws Exception {
        /** 获取文件的后缀* */
        String filename = multipartFile.getOriginalFilename();
        System.out.println("Uploaded:" + filename);

        String fileType = filename.split("\\.")[1];


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
}
