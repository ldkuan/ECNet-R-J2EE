package com.ecm.service;

import com.ecm.model.Evidence_Body;
import com.ecm.model.Evidence_Document;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;

public interface EvidenceService{

    public Evidence_Document save(Evidence_Document evidence_document);

    public Evidence_Body save(Evidence_Body evidence_body);

    public void deleteById(int id);


    public void updateBodyById(String body, int id);

    public void updateTypeById(int type, int id);

}
