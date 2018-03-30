package com.ecm.controller;

import com.ecm.model.*;
import com.ecm.service.ModelManageService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value="/model")
public class ModelController {
    @Autowired
    private ModelManageService modelManageService;

    @RequestMapping(value="/getEvidences")
    public JSONObject getEvidences(@RequestParam("cid") int cid){

        return modelManageService.getEvidences(cid);
    }

//    @RequestMapping(value="/getJoints")
//    public List<MOD_Joint> getJoints(@RequestParam("cid") int cid){
//
//        return modelManageService.getJoints(cid);
//    }
//
//    @RequestMapping(value="/getArrows")
//    public List<MOD_Arrow> getArrows(@RequestParam("cid") int cid){
//
//        return modelManageService.getArrows(cid);
//    }


}
