package com.example.myapplication;

public class Customer_ModelClass {
    public int agentCustomerId,agentOrderStatusId;
    public String name,email,contact,address,customerordertype;

    public Customer_ModelClass(int agentCustomerId, String name, String email, String contact, String address) {
        this.agentCustomerId = agentCustomerId;
        this.name = name;
        this.email = email;
        this.contact = contact;
        this.address = address;
    }
    public Customer_ModelClass(){

    }

//    public int getAgentCustomerId() {
//        return agentCustomerId;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public String getContact() {
//        return contact;
//    }
//
//    public String getAddress() {
//        return address;
//    }
}
