package com.ecm.dao;


import com.ecm.model.Evidence_Body;
import com.ecm.model.Evidence_Document;
import org.springframework.data.jpa.repository.JpaRepository;


public interface EvidenceBodyDao extends JpaRepository<Evidence_Body, Integer> {


    public Evidence_Body save(Evidence_Body evi);



}
