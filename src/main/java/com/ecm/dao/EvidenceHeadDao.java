package com.ecm.dao;


import com.ecm.model.Evidence_Document;
import com.ecm.model.Evidence_Head;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface EvidenceHeadDao extends JpaRepository<Evidence_Head, Integer> {

    @Query(value = "select u from  Evidence_Head u where u.documentid=?1")
    public List<Evidence_Head> getEvidenceHead(int documentid);





}
