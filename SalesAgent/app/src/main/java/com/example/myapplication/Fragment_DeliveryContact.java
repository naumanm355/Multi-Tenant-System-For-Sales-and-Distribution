package com.example.myapplication;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentTransaction;

public class Fragment_DeliveryContact extends Fragment {
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
      View view= inflater.inflate(R.layout.fragment_deliverycontact,container,false);//super.onCreateView(inflater, container, savedInstanceState);
        Fragment_googlemap fragment_googlemap=new Fragment_googlemap();
        FragmentTransaction transaction=getChildFragmentManager().beginTransaction();
        transaction.replace(R.id.mapFrameLayout, fragment_googlemap);
        transaction.commit();

        return view;
    }
}
