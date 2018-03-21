package com.ecm.model;

import javax.persistence.*;

@Entity
@Table(name="MOD_LINK")
@IdClass(MODPK.class)
public class MOD_Link {

    @Id
    private int id;
    @Id
    private int cid;
    @Column(name = "headerId")
    private int nodeFrom_hid;
    @Column(name = "bodyId")
    private int nodeTo_bid;

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

    public int getNodeFrom_hid() {
        return nodeFrom_hid;
    }

    public void setNodeFrom_hid(int nodeFrom_hid) {
        this.nodeFrom_hid = nodeFrom_hid;
    }

    public int getNodeTo_bid() {
        return nodeTo_bid;
    }

    public void setNodeTo_bid(int nodeTo_bid) {
        this.nodeTo_bid = nodeTo_bid;
    }
}
