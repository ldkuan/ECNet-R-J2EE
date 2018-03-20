package com.ecm.service;

import com.ecm.model.Evidence_Body;
import com.ecm.model.Evidence_Document;

public interface EvidenceService{

    public Evidence_Document save(Evidence_Document evidence_document);

    public Evidence_Body save(Evidence_Body evidence_body);

}
