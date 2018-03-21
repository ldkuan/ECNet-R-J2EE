package com.ecm.dao;


import com.ecm.model.Evidence_Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface EvidenceDocuDao extends JpaRepository<Evidence_Document, Integer> {

    @Query(value = "select u from  Evidence_Document u where u.case_id= ?1 and u.type=?2")
    public Evidence_Document getEvidenceDocument(int ajxh,int type);

    public Evidence_Document save(Evidence_Document evi);



}
