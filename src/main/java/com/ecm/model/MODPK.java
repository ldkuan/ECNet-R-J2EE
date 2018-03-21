package com.ecm.model;

import java.io.Serializable;

public class MODPK implements Serializable {

    private int id;
    private int cid;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCid() {
        return cid;
    }

    public void setCid(int cid) {
        this.cid = cid;
    }
}
