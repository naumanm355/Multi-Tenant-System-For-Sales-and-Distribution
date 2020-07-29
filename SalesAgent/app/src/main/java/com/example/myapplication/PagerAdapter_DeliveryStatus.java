package com.example.myapplication;

import android.content.Context;
import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentPagerAdapter;
import androidx.fragment.app.ListFragment;

import org.json.JSONArray;

public class PagerAdapter_DeliveryStatus extends FragmentPagerAdapter {
    Integer tabCount;
    Context context;
    String TargetActivity="jkh";
    JSONArray jsonArray;

//    public PagerAdapter_DeliveryStatus(FragmentManager fm, Context context, int tabCount, String targetActivity) {
//        super(fm);
//        this.tabCount=tabCount;
//        this.context=context;
//        this.TargetActivity=targetActivity;
//    }
    public PagerAdapter_DeliveryStatus(FragmentManager fm, Context context, int tabCount, String targetActivity, JSONArray response) {
        super(fm);
this.tabCount=tabCount;
this.context=context;
this.TargetActivity=targetActivity;
        jsonArray=response;
    }

    @Override
    public Fragment getItem(int position) {
        Bundle bundle=new Bundle();
        bundle.putString("TargetActivity",TargetActivity);
        bundle.putString("JsonArray",jsonArray.toString());


        switch (position){
            case 0:
                Fragment_Pending_BookingDelivery fragment_pendingDelivery=new Fragment_Pending_BookingDelivery();
                fragment_pendingDelivery.setArguments(bundle);
                return  fragment_pendingDelivery;
            case 1:
                Fragment_Visited_BookingDelivery fragment_visitedDelivery=new Fragment_Visited_BookingDelivery();
                fragment_visitedDelivery.setArguments(bundle);
                return  fragment_visitedDelivery;
            case 2:
               Fragment_Productive_BookingDelivery fragment_productiveDelivery=new Fragment_Productive_BookingDelivery();
                fragment_productiveDelivery.setArguments(bundle);
                return  fragment_productiveDelivery;
        }
        return null;
    }

    @Override
    public int getCount() {
        return tabCount;
    }
}
