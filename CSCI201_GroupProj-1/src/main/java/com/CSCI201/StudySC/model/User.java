package com.CSCI201.StudySC.model;

public class User {
    private String fullName;
    private String password;
    private String uscEmail;

    // Constructor(s) go here if needed

    // Getter and setter for fullName
    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    // Getter and setter for password
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // Getter and setter for uscEmail
    public String getUscEmail() {
        return uscEmail;
    }

    public void setUscEmail(String uscEmail) {
        this.uscEmail = uscEmail;
    }
    
    @Override
    public String toString() {
        return "User{" +
                "fullName='" + fullName + '\'' +
                ", password='" + password + '\'' +
                ", uscEmail='" + uscEmail + '\'' +
                '}';
    }
    
}