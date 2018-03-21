package com.ecm.controller;

import com.ecm.model.*;
import com.ecm.service.ModelManageService;
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

    @RequestMapping(value="/saveHeaders")
    public void saveHeaders(@RequestBody List<MOD_Header> headers){

        modelManageService.saveHeaders(headers);
    }

    @RequestMapping(value="/deleteHeaders")
    public void deleteHeaders(@RequestParam("cid") int cid){

        modelManageService.deleteHeadersByCid(cid);
    }

    @RequestMapping(value="/saveBodies")
    public void saveBodies(@RequestBody List<Evidence_Body> bodies){

        modelManageService.saveBodies(bodies);
    }

    @RequestMapping(value="/deleteBodies")
    public void deleteBodies(@RequestParam("cid") int cid){

        modelManageService.deleteBodiesByCid(cid);
    }

    @RequestMapping(value="/saveJoints")
    public void saveJoints(@RequestBody List<MOD_Joint> joints){

        modelManageService.saveJoints(joints);
    }

    @RequestMapping(value="/deleteJoints")
    public void deleteJoints(@RequestParam("cid") int cid){

        modelManageService.deleteJointsByCid(cid);
    }

    @RequestMapping(value="/saveArrows")
    public void saveArrows(@RequestBody List<MOD_Arrow> arrows){

        modelManageService.saveArrows(arrows);
    }

    @RequestMapping(value="/deleteArrows")
    public void deleteArrows(@RequestParam("cid") int cid){

        modelManageService.deleteArrowsByCid(cid);
    }

    @RequestMapping(value="/saveLinks")
    public void saveLinks(@RequestBody List<MOD_Link> links){

        modelManageService.saveLinks(links);
    }

    @RequestMapping(value="/deleteLinks")
    public void deleteLinks(@RequestParam("cid") int cid){

        modelManageService.deleteLinksByCid(cid);
    }
}
