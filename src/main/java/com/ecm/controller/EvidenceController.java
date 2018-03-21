package com.ecm.controller;

import com.ecm.keyword.manager.TypeCalculator;
import com.ecm.model.Evidence_Body;
import com.ecm.model.Evidence_Document;

import com.ecm.service.EvidenceService;
import com.google.gson.JsonArray;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


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

      int id=evidenceService.findIdByAjxhAndType(ajxh,type);
      if(id!=-1){

          evidence_document.setId(id);
      }
      evidence_document=evidenceService.saveOrUpdate(evidence_document);

      evidenceService.deleteBodyAll(evidence_document.getId());
     // String test="1、test1。2、test2。3、test3";
      String[] tests=text.split("[0-9]+、");
      for(String str:tests){
            if(!str.isEmpty()){
                Evidence_Body evidence_body=new Evidence_Body();
                evidence_body.setCase_id(ajxh);
                evidence_body.setDocumentid(evidence_document.getId());
                evidence_body.setBody(str);
                evidence_body.setType(typeCalculator.calType(str));
                evidence_body=evidenceService.save(evidence_body);

                JSONObject jsonObject = new JSONObject();

                jsonObject.put("id",evidence_body.getId());
                jsonObject.put("document_id",evidence_body.getDocumentid());
                jsonObject.put("body",evidence_body.getBody());
                jsonObject.put("type",evidence_body.getType());

                res.add(jsonObject);
            }

        }

        return res;

    }

    @PostMapping(value = "/deleteBody")
    public int deleteBody(@RequestParam("id") int id){
        System.out.println(id);
        evidenceService.deleteBodyById(id);
        return 0;
    }


    @PostMapping(value = "/addBody")
    public Evidence_Body addBody(@RequestParam("ajxh") int ajxh, @RequestParam("type") int type, @RequestParam("body") String body,@RequestParam("document_id") int document_id){
        Evidence_Body evidence_body=new Evidence_Body();
        evidence_body.setCase_id(ajxh);
        evidence_body.setDocumentid(document_id);
        evidence_body.setType(type);
        evidence_body.setBody(body);
        evidenceService.save(evidence_body);
        return evidence_body;
    }
    @PostMapping(value = "/updateBodyById")
    public void updateBodyById(@RequestParam("id") int id,@RequestParam("body") String body){
         evidenceService.updateBodyById(body,id);

    }
    @PostMapping(value = "/updateTypeById")
    public void updateTypeById(@RequestParam("id") int id,@RequestParam("type") int type){
        evidenceService.updateTypeById(type,id);

    }

    @PostMapping(value = "/updateTrustById")
    public void updateTrustById(@RequestParam("id") int id,@RequestParam("trust") int trust){
        evidenceService.updateTrustById(trust,id);

    }


    @RequestMapping(value="/getContent")
    public JSONArray getAllCases(@RequestParam("ajxh") int ajxh){
        JSONArray res=new JSONArray();
        for(int i=0;i<=1;i++){
            Evidence_Document evidence_document= evidenceService.findDocuByAjxhAndType(ajxh,i);
            JSONObject jsonObject = new JSONObject();

            jsonObject.put("id",evidence_document.getId());
            jsonObject.put("text",evidence_document.getText());
            jsonObject.put("type",evidence_document.getType());
            List<Evidence_Body> evidence_bodies=evidenceService.findBodyByDocu(evidence_document.getId());
            JSONArray bodylist=new JSONArray();
            for(Evidence_Body evidence_body:evidence_bodies){
                JSONObject temp = new JSONObject();
                temp.put("id",evidence_body.getId());
                temp.put("body",evidence_body.getBody());
                temp.put("type",evidence_body.getType());
                temp.put("trust",evidence_body.getTrust());
                bodylist.add(temp);
            }
            jsonObject.put("bodylist",bodylist);
            res.add(jsonObject);
        }
        return res;

    }


    }
