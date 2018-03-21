package com.ecm.model;

public class MOD_Body {

    private int id;
    private int cid;
    private String name;
    private String content;
    private int x;
    private int y;
    private String type;
    private String committer;
    private String reason;
    private String conclusion;
    private int isDefendant;//0-原告证据   1-被告证据

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCommitter() {
        return committer;
    }

    public void setCommitter(String committer) {
        this.committer = committer;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getConclusion() {
        return conclusion;
    }

    public void setConclusion(String conclusion) {
        this.conclusion = conclusion;
    }

    public int transTypeToInt(){
        switch(type)
        {
            case "证人证言":
                return 0;

            case "被告人供述和辩解":
                return 1;

            case "书证":
                return 2;

            case "鉴定结论":
                return 3;

            case "勘验、-检查笔录":
                return 4;

            default:
                return 5;

        }

    }
}
