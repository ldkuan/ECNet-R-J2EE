package com.ecm.dao;

import com.ecm.model.MODPK;
import com.ecm.model.MOD_Arrow;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MOD_ArrowDao extends JpaRepository<MOD_Arrow, MODPK> {

    public MOD_Arrow save(MOD_Arrow arrow);

    public void deleteByIdAndCaseID(int id,int cid);

    public void deleteAllByCaseID(int cid);

    public List<MOD_Arrow> findAllByCaseID(int cid);
}
