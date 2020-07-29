package com.example.myapplication;

import java.util.ArrayList;
import java.util.List;

public class CustDist_LatLng_ListClass {
    public static CustDist_LatLng_ListClass custDist_latLng_listClass=null;
     ArrayList<LatLng_ModelClass> latLng_modelList=new ArrayList<LatLng_ModelClass>();
    CustDist_LatLng_ListClass(){

    }
    public static CustDist_LatLng_ListClass getInstance(){
        if(custDist_latLng_listClass==null){
            custDist_latLng_listClass=new CustDist_LatLng_ListClass();
        }
        return custDist_latLng_listClass;
    }
}
