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
    private String bio;
    private String profilePicture;
    private String coverImage;
    private boolean isFollowing;

    public User(){

    }

    public long getId(){
        return id;

    }

    public void setId(long id){
        this.id = id;

    }

    public String getusername(){
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

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    // Getter and Setter for profilePicture
    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    // Getter and Setter for coverImage
    public String getCoverImage() {
        return coverImage;
    }

    public void setCoverImage(String coverImage) {
        this.coverImage = coverImage;
    }

    // Getter and Setter for isFollowing
    public boolean isFollowing() {
        return isFollowing;
    }

    public void setFollowing(boolean isFollowing) {
        this.isFollowing = isFollowing;
    }

    public User(long id, String username, String email, String password, String bio, String profilePicture, String coverImage, boolean isFollowing){
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.bio = bio;
        this.profilePicture = profilePicture;
        this.coverImage = coverImage;
        this.isFollowing = isFollowing;
    }



}
