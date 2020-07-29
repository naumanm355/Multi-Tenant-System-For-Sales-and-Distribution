package com.example.myapplication;

import java.util.ArrayList;

public class OrderManagement_ModelClass {
    public static Customer_ModelClass customer_modelClass=new Customer_ModelClass(); //use to show customer detail in delivery preview,delivery onfirm and booking confirm
    public static ArrayList<Inventory_ModelClass> bookingCart_addedproduct=new ArrayList<Inventory_ModelClass>(); //use to show item product in view product
    public static OrderBillDetail_ModelClass orderBillDetail_modelClass=new OrderBillDetail_ModelClass();

}
