package com.ecm.model;

import java.io.Serializable;

public class JudgmentPK implements Serializable {

    private String aid;
    private String jid;

    public String getAid() {
        return aid;
    }

    public void setAid(String aid) {
        this.aid = aid;
    }

    public String getJid() {
        return jid;
    }

    public void setJid(String jid) {
        this.jid = jid;
    }
}
