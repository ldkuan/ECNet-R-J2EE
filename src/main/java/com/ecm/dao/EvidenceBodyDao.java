package com.ecm.dao;


import com.ecm.model.Evidence_Body;
import com.ecm.model.Evidence_Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;


public interface EvidenceBodyDao extends JpaRepository<Evidence_Body, Integer> {


    public Evidence_Body save(Evidence_Body evi);
    public void deleteById(int id);


    @Modifying
    @Query("update Evidence_Body c set c.body = ?1 where c.id=?2")
    public void updateBodyById(String body, int id);

    @Modifying
    @Query("update Evidence_Body c  set c.type = ?1 where c.id=?2")
    public void updateTypeById(int type, int id);

}
