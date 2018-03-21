package com.ecm.service.impl;

import com.ecm.dao.EvidenceBodyDao;
import com.ecm.dao.EvidenceDocuDao;
import com.ecm.model.Evidence_Body;
import com.ecm.model.Evidence_Document;
import com.ecm.service.EvidenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EvidenceServiceImpl implements EvidenceService {


    @Autowired
    public EvidenceDocuDao evidenceDocuDao;
    @Autowired
    public EvidenceBodyDao evidenceBodyDao;
    @Override
    public Evidence_Document save(Evidence_Document evidence_document) {
        return evidenceDocuDao.save(evidence_document);
    }

    @Override
    public Evidence_Body save(Evidence_Body evidence_body) {
        return evidenceBodyDao.save(evidence_body);
    }

    @Override
    public void deleteById(int id) {
         evidenceBodyDao.deleteById(id);
         return;
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
}
