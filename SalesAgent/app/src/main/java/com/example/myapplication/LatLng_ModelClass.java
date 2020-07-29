package com.example.myapplication;


import android.content.Context;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.widget.Toast;

import org.json.JSONException;
import org.json.JSONObject;

public class LatLng_ModelClass {
    public Customer_ModelClass Customer;
    public  Context context;
    public double latitude;
    public double longitude;
//    public int distance;

    public LatLng_ModelClass(Context context) {
        this.context=context;
        Customer = new Customer_ModelClass();



    }
    public void getGeocode(){
        GeocodingLocation locationAddress = new GeocodingLocation();
        locationAddress.getAddressFromLocation(Customer.address,
                context, new GeocoderHandler());
    }

    private class GeocoderHandler extends Handler {
        @Override
        public void handleMessage(Message message) {
          //  String locationAddress;
            switch (message.what) {
                case 1:
                    Bundle bundle = message.getData();
               //     locationAddress = bundle.getString("objectResponse");
                    try {
                        JSONObject jsonObject =new JSONObject(bundle.getString("objectResponse"));
                        latitude=jsonObject.getDouble("lat");
                        longitude=jsonObject.getDouble("long");
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }

                    break;
                default:break;
                   // locationAddress = null;
            }

         Toast.makeText(context, "kkk" + String.valueOf(latitude), Toast.LENGTH_SHORT).show();
            //  latLongTV.setText(locationAddress);

        }
    }


}
