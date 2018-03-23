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

    @Autowired
    private EvidenceBodyDao evidenceBodyDao;
    @Autowired
    private EvidenceHeadDao evidenceHeadDao;
    @Autowired
    private MOD_JointDao jointDao;
    @Autowired
    private MOD_ArrowDao arrowDao;

    @Override
    public JSONObject getEvidences(int cid) {
        JSONObject res = new JSONObject();
        JSONArray trusts = new JSONArray();
        JSONArray untrusts = new JSONArray();

        List<Evidence_Body> bodies = evidenceBodyDao.findAllByCaseID(cid);
        for(int i = 0;i<bodies.size();i++){
            Evidence_Body body = bodies.get(i);
            int bid = body.getId();

            if(body.getTrust()==1){
                JSONObject jo = new JSONObject();
                jo.put("body",body);
//                jo.put("bid",bid);
//                jo.put("documentID",body.getDocumentid());
//                jo.put("name",body.getName());
//                jo.put("content",body.getBody());
//                jo.put("isDefendant",body.getIsDefendant());
//                jo.put("type",body.getType());
//                jo.put("committer",body.getCommitter());
//                jo.put("reason",body.getReason());
//                jo.put("conclusion",body.getConclusion());
//                jo.put("x",body.getX());
//                jo.put("y",body.getY());

                List<Evidence_Head> headers = evidenceHeadDao.findAllByCaseIDAndBodyid(cid,bid);
                jo.put("headers",headers);
                trusts.add(jo);
            }else{
                JSONObject jo = new JSONObject();
                jo.put("content",body.getBody());
                jo.put("isDefendant",body.getIsDefendant());
                List<String> headers = evidenceHeadDao.findContentsByCaseIDAndBodyid(cid,bid);
                jo.put("headers",headers);
                untrusts.add(jo);
            }
        }

        List<Evidence_Head> freeHeaders = evidenceHeadDao.findAllByCaseIDAndBodyid(cid,-1);
        res.put("trusts",trusts);
        res.put("untrusts",untrusts);
        res.put("freeHeaders",freeHeaders);
        res.put("joints",jointDao.findAllByCaseID(cid));
        res.put("arrows",arrowDao.findAllByCaseID(cid));

        return res;
    }

//    @Override
//    public List<MOD_Joint> getJoints(int cid) {
//        return jointDao.findAllByCaseID(cid);
//    }
//
//    @Override
//    public List<MOD_Arrow> getArrows(int cid) {
//        return arrowDao.findAllByCaseID(cid);
//    }

    @Override
    @Transactional
    public void saveHeaders(List<Evidence_Head> headers) {
        for(int i = 0;i<headers.size();i++){
            evidenceHeadDao.save(headers.get(i));
        }
    }

    @Override
    @Transactional
    public void deleteHeadersByCid(int cid) {
        evidenceHeadDao.deleteAllByCaseID(cid);
    }

    @Override
    public void saveBodies(List<Evidence_Body> bodies) {
        for(int i = 0;i<bodies.size();i++){
            evidenceBodyDao.save(bodies.get(i));
        }
    }

    @Override
    @Transactional
    public void deleteBodiesByCid(int cid) {
        evidenceBodyDao.deleteAllByCaseID(cid);
    }

    @Override
    public void saveJoints(List<MOD_Joint> joints) {
        for(int i = 0;i<joints.size();i++){
            jointDao.save(joints.get(i));
        }
    }

    @Override
    @Transactional
    public void deleteJointsByCid(int cid) {
        jointDao.deleteAllByCaseID(cid);
    }

    @Override
    public void saveArrows(List<MOD_Arrow> arrows) {
        for(int i = 0;i<arrows.size();i++){
            arrowDao.save(arrows.get(i));
        }
    }

    @Override
    @Transactional
    public void deleteArrowsByCid(int cid) {
        arrowDao.deleteAllByCaseID(cid);
    }
}
