package com.ecm.service.impl;

import com.ecm.dao.*;
import com.ecm.model.*;
import com.ecm.service.ModelManageService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ModelManageServiceImpl implements ModelManageService {


    @Override
    public JSONObject getEvidences(int cid) {
        JSONObject res = new JSONObject();
        JSONArray trusts = new JSONArray();
        JSONArray untrusts = new JSONArray();

        return  res;
    }



}
