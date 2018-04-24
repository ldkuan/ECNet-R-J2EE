package com.ecm.service;

import net.sf.json.JSONObject;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileManageService {

    public String saveFileUpload(MultipartFile multipartFile) throws Exception;

    public String writeResultJson(JSONObject jsonObject, String path) throws IOException;

    public String exportExcel(String modelsJsonStr);

}
