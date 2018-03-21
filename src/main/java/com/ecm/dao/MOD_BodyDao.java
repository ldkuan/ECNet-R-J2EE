package com.ecm.dao;

import com.ecm.model.MODPK;
import com.ecm.model.MOD_Body;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MOD_BodyDao extends JpaRepository<MOD_Body, MODPK> {

    public MOD_Body save(MOD_Body body);

    public void deleteByIdAndCid(int id,int cid);

    public List<MOD_Body> findByCid(int cid);
}
