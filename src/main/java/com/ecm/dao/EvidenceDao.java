package com.ecm.dao;


import com.ecm.model.Evidence_Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface EvidenceDao extends JpaRepository<Evidence_Document, Integer> {

    @Query(value = "select u.password from User u where u.name = ?1")
    public String getPassword(String name);


}
