package com.ecm.dao;

import com.ecm.model.MODPK;
import com.ecm.model.MOD_Link;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MOD_LinkDao extends JpaRepository<MOD_Link, MODPK> {

    public MOD_Link save(MOD_Link link);

    public void deleteByIdAndCid(int id,int cid);

    public List<MOD_Link> findByCid(int cid);
}
