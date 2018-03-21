package com.ecm.service;

import com.ecm.model.Evidence_Body;
import com.ecm.model.Evidence_Document;
import com.ecm.model.Evidence_Head;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

public interface EvidenceService{

    public Evidence_Document saveOrUpdate(Evidence_Document evidence_document);

    public int findIdByAjxhAndType(int ajxh, int type);
    public Evidence_Document findDocuByAjxhAndType(int ajxh, int type);
    public List<Evidence_Body> findBodyByDocu(int documentid);
    public Evidence_Body save(Evidence_Body evidence_body);

    public void deleteBodyById(int id);

    public void deleteBodyAll(int document_id);



    public void updateBodyById(String body, int id);

    public void updateTypeById(int type, int id);
    public void updateTrustById(int trust, int id);

    List<Evidence_Head> createHead(int documentid);
}
