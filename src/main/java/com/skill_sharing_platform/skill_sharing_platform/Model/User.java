package com.skill_sharing_platform.skill_sharing_platform.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class User {
    @Id
    @GeneratedValue
    private Long id;
    private String username;
    private String email;
    private String password;

    public User(){

    }

    public long getId(){
        return id;

    }

    public void setId(long id){
        this.id = id;

    }

    public String username(long id){
        return username;
    }

    public void setusername(String username){
        this.username = username;
    }

    public String getEmail(){
        return email;
    }

    public void setEmail(String email){
        this.email = email;
    }

    public String getPassword(){
        return password;
    }

    public void setPassword(String password){
        this.password = password;
    }

    public User(long id, String username, String email, String password){
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }



}
