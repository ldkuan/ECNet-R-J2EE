package com.ecm.service.impl;

import com.ecm.dao.EvidenceBodyDao;
import com.ecm.dao.EvidenceDocuDao;
import com.ecm.model.Evidence_Body;
import com.ecm.model.Evidence_Document;
import com.ecm.service.EvidenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EvidenceServiceImpl implements EvidenceService {


    @Autowired
    public EvidenceDocuDao evidenceDocuDao;
    @Autowired
    public EvidenceBodyDao evidenceBodyDao;


    @Override
    public Evidence_Document saveOrUpdate(Evidence_Document evidence_document) {
        return evidenceDocuDao.save(evidence_document);
    }

    @Override
    public int findIdByAjxhAndType(int ajxh, int type) {
        Evidence_Document evidence_document=evidenceDocuDao.getEvidenceDocument(ajxh, type);
        if(evidence_document==null){
            return -1;
        }else{
            return evidence_document.getId();
        }
    }

    @Override
    public Evidence_Document findDocuByAjxhAndType(int ajxh, int type) {
        return evidenceDocuDao.getEvidenceDocument(ajxh, type);
    }

    @Override
    public List<Evidence_Body> findBodyByDocu(int documentid) {
        return evidenceBodyDao.getAllByDocumentid(documentid);
    }

    @Override
    public Evidence_Body save(Evidence_Body evidence_body) {
        return evidenceBodyDao.save(evidence_body);
    }
    @Transactional
    @Override
    public void deleteBodyById(int id) {
         evidenceBodyDao.deleteById(id);
         return;
    }
    @Transactional
    @Override
    public void deleteBodyAll(int document_id) {
        evidenceBodyDao.deleteAllByDocumentid(document_id);
    }

    @Transactional
    @Override
    public void updateBodyById(String body, int id) {
        evidenceBodyDao.updateBodyById(body,id);
    }
@Transactional
    @Override
    public void updateTypeById(int type, int id) {
        evidenceBodyDao.updateTypeById(type,id);
    }
    @Transactional
    @Override
    public void updateTrustById(int trust, int id) {
        evidenceBodyDao.updateTrustById(trust,id);
    }
}
