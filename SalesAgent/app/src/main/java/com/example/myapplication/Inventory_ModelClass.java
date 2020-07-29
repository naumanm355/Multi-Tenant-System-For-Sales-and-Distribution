package com.example.myapplication;

public class Inventory_ModelClass {
    public String name,category,company,imageUrl;
    public int price,subtotal,inveId,orderqty;
    public int orderProductId; //return order show item to select quantity
//view product
    public Inventory_ModelClass(String name, String category, String company, int price) {
        this.name = name;
        this.category = category;
        this.company = company;
        this.price = price;

    }
    public Inventory_ModelClass(String name, String category, String company, int price,String ImageUrl) {
        this.name = name;
        this.category = category;
        this.company = company;
        this.price = price;
        this.imageUrl=ImageUrl;
    }
    //add product  in cart
    public Inventory_ModelClass(String name, String category, String company, int price,int id) {
        this.name = name;
        this.category = category;
        this.company = company;
        this.price = price;
        inveId=id;
    }
    public Inventory_ModelClass(String name, String category, String company, int price,int id,String imageUrl) {
        this.name = name;
        this.category = category;
        this.company = company;
        this.price = price;
        inveId=id;
        this.imageUrl=imageUrl;
    }
    //selected product view cart
    public Inventory_ModelClass(String name, String category, String company, int price,int subtotal,int Qty,int id) {
        this.name = name;
        this.category = category;
        this.company = company;
        this.price = price;
        this.subtotal=subtotal;
        orderqty=Qty;
        inveId=id;
    }
    //return order view cart
    public Inventory_ModelClass() {

    }

}
