package com.example.myapplication;


import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

public class PaymentMethodsActivity extends AppCompatActivity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_paymentmethods);
        getSupportActionBar().setTitle("Order Payment");
        getSupportActionBar().setBackgroundDrawable(new ColorDrawable(Color.parseColor("#00574B")));
        TextView totalPaymentView = (TextView) findViewById(R.id.paymentMethodActTotal);

        String[] maintitleList = {
                "JAZZ CASH", "EASY PAISE",
                "KONNET", "BANK ACCOUNT"};
        Integer[] imgList = {R.mipmap.first, R.mipmap.first, R.mipmap.first, R.mipmap.first, R.mipmap.first};

        RecyclerView recyclerView = (RecyclerView) findViewById(R.id.paymentMethodActRecycler);
        recyclerView.setHasFixedSize(true);
        LinearLayoutManager layoutManager = new LinearLayoutManager(this);
        recyclerView.setLayoutManager(layoutManager);
        //  recyclerView.addItemDecoration(new DividerItemDecoration(recyclerView.getContext(), DividerItemDecoration.VERTICAL));

        try {
            if (getIntent().getStringExtra("parentActivity").equals("outsandingBalanceActivity")) {
                try {
                    ArrayList<Integer> agentOrderStatusIdsList = (ArrayList<Integer>) getIntent().getSerializableExtra("agentOrderStatusIdsList");
                    totalPaymentView.setText(getIntent().getStringExtra("amounttoPay"));
                    MethodAdapter_PaymentMethod adapter_paymentMethod = new MethodAdapter_PaymentMethod(this, maintitleList, imgList, agentOrderStatusIdsList);
                    recyclerView.setAdapter(adapter_paymentMethod);
                } catch (Exception ex) {
                    Toast.makeText(getApplicationContext(), "error in method" + ex.getMessage(), Toast.LENGTH_SHORT).show();
                }


            }

        } catch (Exception ex) {
            Toast.makeText(getApplicationContext(), "errror in method after " + ex.getMessage(), Toast.LENGTH_SHORT).show();
            totalPaymentView.setText(Integer.toString(OrderManagement_ModelClass.orderBillDetail_modelClass.subtotal));
            MethodAdapter_PaymentMethod adapter_paymentMethod = new MethodAdapter_PaymentMethod(this, maintitleList, imgList);
            recyclerView.setAdapter(adapter_paymentMethod);

        }


    }
}
