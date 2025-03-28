package com.skill_sharing_platform.skill_sharing_platform.Exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(long id){
        super("could not find id" + id);
    }
    public UserNotFoundException(String message){
        super(message);
    }
}
