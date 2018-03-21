package com.ecm.model;

import javax.persistence.*;

@Entity
@Table(name="EVIDENCE_HEAD")
public class Evidence_Head {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "ajxh")
    private int case_id;
    @Column(name = "document_id")
    private int documentid;
    @Column(name = "body_id")
    private int bodyid;
    @Column(name = "head")
    private String head;
    private String name;
    private int x;
    private int y;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCase_id() {
        return case_id;
    }

    public void setCase_id(int case_id) {
        this.case_id = case_id;
    }

    public int getDocumentid() {
        return documentid;
    }

    public void setDocumentid(int documentid) {
        this.documentid = documentid;
    }

    public int getBodyid() {
        return bodyid;
    }

    public void setBodyid(int bodyid) {
        this.bodyid = bodyid;
    }

    public String getHead() {
        return head;
    }

    public void setHead(String head) {
        this.head = head;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }
}
