package com.ecm.controller;

import com.ecm.keyword.manager.TypeCalculator;
import com.ecm.model.Evidence_Body;
import com.ecm.model.Evidence_Document;

import com.ecm.service.EvidenceService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value="/evidence")
public class EvidenceController {

    @Autowired
    private EvidenceService evidenceService;

    @PostMapping(value = "/document")
    public JSONArray save(@RequestParam("ajxh") int ajxh, @RequestParam("type") int type, @RequestParam("text") String text){
        JSONArray res = new JSONArray();
        TypeCalculator typeCalculator=new TypeCalculator();
      Evidence_Document evidence_document=new Evidence_Document();
      evidence_document.setAjxh(ajxh);
      evidence_document.setText(text);
      evidence_document.setType(type);

      evidence_document=evidenceService.save(evidence_document);

     // String test="1、test1。2、test2。3、test3";
      String[] tests=text.split("[0-9]+、");
      for(String str:tests){
            if(!str.isEmpty()){
                Evidence_Body evidence_body=new Evidence_Body();
                evidence_body.setCase_id(ajxh);
                evidence_body.setDocument_id(evidence_document.getId());
                evidence_body.setBody(str);
                evidence_body.setType(typeCalculator.calType(str));
                evidence_body=evidenceService.save(evidence_body);

                JSONObject jsonObject = new JSONObject();

                jsonObject.put("id",evidence_body.getId());
                jsonObject.put("document_id",evidence_body.getDocument_id());
                jsonObject.put("body",evidence_body.getBody());
                jsonObject.put("type",evidence_body.getType());

                res.add(jsonObject);
            }

        }

        return res;

    }





}
