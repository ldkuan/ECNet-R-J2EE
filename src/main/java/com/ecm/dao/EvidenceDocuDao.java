package com.ecm.dao;


import com.ecm.model.Evidence_Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface EvidenceDocuDao extends JpaRepository<Evidence_Document, Integer> {


    public Evidence_Document save(Evidence_Document evi);



}
