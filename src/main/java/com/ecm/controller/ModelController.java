package com.ecm.controller;

import com.ecm.model.MOD_Body;
import com.ecm.model.MOD_Header;
import com.ecm.service.ModelManageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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

    @RequestMapping(value="/saveBodies")
    public void saveBodies(@RequestBody List<MOD_Body> bodies){

        modelManageService.saveBodys(bodies);
    }
}
