package com.ecm.service;

import net.sf.json.JSONObject;
import org.springframework.web.multipart.MultipartFile;

public interface FileManageService {

    public String saveFileUpload(MultipartFile multipartFile) throws Exception;

}
