package com.ecm.dao;


import com.ecm.model.Evidence_Body;
import com.ecm.model.Evidence_Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;


public interface EvidenceBodyDao extends JpaRepository<Evidence_Body, Integer> {



    @Query(value = "select u from  Evidence_Body u where u.documentid= ?1")
    public List<Evidence_Body> getAllByDocumentid(int documentid);

    public Evidence_Body save(Evidence_Body evi);

    public void deleteById(int id);

    public void deleteAllByDocumentid(int document_id);

    @Modifying
    @Query("update Evidence_Body c set c.body = ?1 where c.id=?2")
    public void updateBodyById(String body, int id);

    @Modifying
    @Query("update Evidence_Body c  set c.type = ?1 where c.id=?2")
    public void updateTypeById(int type, int id);

    @Modifying
    @Query("update Evidence_Body c  set c.trust = ?1 where c.id=?2")
    public void updateTrustById(int trust, int id);

}
