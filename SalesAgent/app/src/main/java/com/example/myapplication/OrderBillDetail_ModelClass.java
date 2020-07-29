package com.example.myapplication;

public class OrderBillDetail_ModelClass {
    public int agentOrderStatusId,totalitem,subtotal,total;
    public String orderdate;

    public OrderBillDetail_ModelClass(int agentOrderStatusId, int totalitem, int subtotal, String orderdate) {
        this.agentOrderStatusId = agentOrderStatusId;
        this.totalitem = totalitem;
        this.subtotal = subtotal;
        this.orderdate = orderdate;
    }
    public OrderBillDetail_ModelClass(){

    }
}
