package com.ecm.model;

import javax.persistence.*;

@Entity
@Table(name="PUB_XTGL_YHB")
public class User {

    @Id
    @Column(name = "YHBH")
    private String id;
    @Column(name = "YHDM")
    private String name;
    @Column(name = "YHKL")
    private String password;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
