package com.example.myapplication;

public class CustomerOrders_ModelClass {
    public int orderId,totalitem,subtotal,totalpayment;
    public String datetime;

    public CustomerOrders_ModelClass(int orderId, int totalitem, int subtotal, int totalpayment, String datetime) {
        this.orderId = orderId;
        this.totalitem = totalitem;
        this.subtotal = subtotal;
        this.totalpayment = totalpayment;
        this.datetime = datetime;
    }
}
