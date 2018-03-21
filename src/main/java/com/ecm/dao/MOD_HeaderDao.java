package com.ecm.dao;

import com.ecm.model.MODPK;
import com.ecm.model.MOD_Header;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MOD_HeaderDao extends JpaRepository<MOD_Header, MODPK> {

    public MOD_Header save(MOD_Header header);

    public void deleteByIdAndCid(int id,int cid);

    public void deleteAllByCid(int cid);

    public List<MOD_Header> findByCid(int cid);
}
