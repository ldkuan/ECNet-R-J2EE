package com.ecm.model;

import javax.persistence.*;

@Entity
@Table(name="PUB_SPRY")
@IdClass(JudgmentPK.class)
public class Judgment {

    @Id
    @Column(name = "AJXH")
    private String aid;
    @Id
    @Column(name = "SPRYBH")
    private String jid;
    @Column(name = "FG")
    private String hasJudge;
    @Column(name = "SFCBR")
    private String isUndertaker;
    @Column(name = "XM")
    private String realName;

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

    public String getHasJudge() {
        return hasJudge;
    }

    public void setHasJudge(String hasJudge) {
        this.hasJudge = hasJudge;
    }

    public String getIsUndertaker() {
        return isUndertaker;
    }

    public void setIsUndertaker(String isUndertaker) {
        this.isUndertaker = isUndertaker;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }
}
