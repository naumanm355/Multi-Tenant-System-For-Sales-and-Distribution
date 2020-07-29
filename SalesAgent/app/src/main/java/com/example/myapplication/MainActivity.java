package com.example.myapplication;

import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.Toast;

import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.cardview.widget.CardView;
import androidx.drawerlayout.widget.DrawerLayout;

import com.google.android.material.navigation.NavigationView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class MainActivity extends AppCompatActivity {
    Context context = this;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        final Toolbar toolbar = (Toolbar) findViewById(R.id.dashboardToolbar);
        setSupportActionBar(toolbar);
        toolbar.setTitleTextColor(getResources().getColor(R.color.white));
        toolbar.setBackgroundColor(getResources().getColor(R.color.colorPrimaryDark));

        // getSupportActionBar().setBackgroundDrawable(new ColorDrawable(Color.parseColor("#00574B")));
        NavigationView navigationView = (NavigationView) findViewById(R.id.navigationView);
        DrawerLayout drawerLayout = (DrawerLayout) findViewById(R.id.drawerlayout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(this, drawerLayout, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawerLayout.addDrawerListener(toggle);
        toggle.syncState();
        toggle.getDrawerArrowDrawable().setColor(getResources().getColor(R.color.white));

//        constants_class.getInstance().hitGetEndPoint(constants_class.getInstance().customerurl, getApplicationContext(), new constants_class.VolleyCallback() {
//            @Override
//            public void onSuccessResponse(JSONObject response) throws JSONException {
             try {
                 LatLng_ModelClass latLng_modelClass = new LatLng_ModelClass(getApplicationContext());
                 latLng_modelClass.Customer.address = " Fazal Din's Pharma Plus, Shalimar Larechs Colony, Lahore, Punjab 54000, Pakistan";
                 latLng_modelClass.Customer.name = "Fazal Din's Pharma Plus";
                 latLng_modelClass.getGeocode();
                 CustDist_LatLng_ListClass.getInstance().latLng_modelList.add(latLng_modelClass);

                 LatLng_ModelClass latLng_modelClass1 = new LatLng_ModelClass(getApplicationContext());
                 latLng_modelClass1.Customer.address = "Shalimar Link Rd, Mughalpura, Shalimar Town, Lahore, Punjab, Pakistan clinix";
                 latLng_modelClass1.Customer.name = "clinix";
                 latLng_modelClass1.getGeocode();
                 CustDist_LatLng_ListClass.getInstance().latLng_modelList.add(latLng_modelClass1);

                 LatLng_ModelClass latLng_modelClass2 = new LatLng_ModelClass(getApplicationContext());
                 latLng_modelClass2.Customer.address = "2 Shalimar Link Road, Sahowari Ramgarh, Lahore, Punjab 54000, Pakistan";
                 latLng_modelClass2.Customer.name = "Shalimar Pharmacy";
                 latLng_modelClass2.getGeocode();
                 CustDist_LatLng_ListClass.getInstance().latLng_modelList.add(latLng_modelClass2);

                 LatLng_ModelClass latLng_modelClass3 = new LatLng_ModelClass(getApplicationContext());
                 latLng_modelClass3.Customer.address = " Ramgarh, Lahore, Punjab 54000, Pakistan ";
                 latLng_modelClass3.Customer.name = "care plus";
                 latLng_modelClass3.getGeocode();
                 CustDist_LatLng_ListClass.getInstance().latLng_modelList.add(latLng_modelClass3);

                 LatLng_ModelClass latLng_modelClass4 = new LatLng_ModelClass(getApplicationContext());
                 latLng_modelClass4.Customer.address = " 153 Shalimar Link Road, opposite Police Station, Gunj Mughalpura, Lahore, Punjab 54840, Pakistan";
                 latLng_modelClass4.Customer.name = "Chaudhry Medical Store";
                 latLng_modelClass4.getGeocode();
                 CustDist_LatLng_ListClass.getInstance().latLng_modelList.add(latLng_modelClass4);

                 LatLng_ModelClass latLng_modelClass5 = new LatLng_ModelClass(getApplicationContext());
                 latLng_modelClass5.Customer.address = "Ramghar Bazar Road, Ramgarh Lahore, Punjab, Pakistan";
                 latLng_modelClass5.Customer.name = "Al Nafay pharmacy";
                 latLng_modelClass5.getGeocode();
                 CustDist_LatLng_ListClass.getInstance().latLng_modelList.add(latLng_modelClass5);

                 LatLng_ModelClass latLng_modelClass6 = new LatLng_ModelClass(getApplicationContext());
                 latLng_modelClass6.Customer.address = "Hassan PArk, 20 Daras Rd, Singhpura, Lahore, Punjab 54000, Pakistan";
                 latLng_modelClass6.Customer.name = "Shah Zaib Pharmacy";
                 latLng_modelClass6.getGeocode();
                 CustDist_LatLng_ListClass.getInstance().latLng_modelList.add(latLng_modelClass6);

                 LatLng_ModelClass latLng_modelClass7 = new LatLng_ModelClass(getApplicationContext());
                 latLng_modelClass7.Customer.address = " 153 Shalimar Link Road, opposite Police Station, Gunj Mughalpura, Lahore, Punjab 54840, Pakistan";
                 latLng_modelClass7.Customer.name = "Chaudhry Medical Store";
                 latLng_modelClass7.getGeocode();
                 CustDist_LatLng_ListClass.getInstance().latLng_modelList.add(latLng_modelClass7);

                 LatLng_ModelClass latLng_modelClass8 = new LatLng_ModelClass(getApplicationContext());
                 latLng_modelClass8.Customer.address = "Ramghar Bazar Road, Ramgarh Lahore, Punjab, Pakistan";
                 latLng_modelClass8.Customer.name = "Al Nafay pharmacy";
                 latLng_modelClass8.getGeocode();
                 CustDist_LatLng_ListClass.getInstance().latLng_modelList.add(latLng_modelClass8);

                 LatLng_ModelClass latLng_modelClass9 = new LatLng_ModelClass(getApplicationContext());
                 latLng_modelClass9.Customer.address = "Hassan PArk, 20 Daras Rd, Singhpura, Lahore, Punjab 54000, Pakistan";
                 latLng_modelClass9.Customer.name = "Shah Zaib Pharmacy";
                 latLng_modelClass9.getGeocode();
                 CustDist_LatLng_ListClass.getInstance().latLng_modelList.add(latLng_modelClass9);

                 LatLng_ModelClass latLng_modelClass10 = new LatLng_ModelClass(getApplicationContext());
                 latLng_modelClass10.Customer.address = "216 A NEW MUSLIM TOWN, Block A Muslim Town, Lahore, Punjab 54900, Pakistan";
                 latLng_modelClass10.Customer.name = "ONCOLINK PHARMA DISTRIBUTOR";
                 latLng_modelClass10.getGeocode();
                 CustDist_LatLng_ListClass.getInstance().latLng_modelList.add(latLng_modelClass10);


             }
             catch (Exception ex){
             //    Toast.makeText(getApplicationContext(), "errororro" + ex.getMessage(), Toast.LENGTH_SHORT).show();
             }
        CardView btn = (CardView) findViewById(R.id.dashboardCrdNavDelivery);
        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //     toolbar.inflateMenu(R.menu.menu2);
                Intent intent = new Intent(context, BookingDeliveryStatus_MainActivity.class);
                intent.putExtra("targetActivity", "Delivery");
                startActivity(intent);
            }
        });
        CardView btn1 = (CardView) findViewById(R.id.dashboardCrdNavViewPrd);
        btn1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(context, ViewProductActivity.class);
                startActivity(intent);
            }
        });


        CardView startDay = (CardView) findViewById(R.id.dashboardCrdNavstartDay);
try {
    final CardView endDay = (CardView) findViewById(R.id.dashboardCrdNavEndDay);
    final CardView product = (CardView) findViewById(R.id.dashboardCrdNavViewPrd);
    final CardView booking = (CardView) findViewById(R.id.NavOrderBooking);
    final CardView delivery = (CardView) findViewById(R.id.dashboardCrdNavDelivery);
    final CardView returnOrder = (CardView) findViewById(R.id.NavReturnOrder);
    final CardView outStanding = (CardView) findViewById(R.id.NavOutStandingAct);
    final CardView report = (CardView) findViewById(R.id.NavReports);

    //     startDay.setEnabled(false);
    if (constants_class.getInstance().dayStart) {
        endDay.setEnabled(false);
        product.setEnabled(false);
        booking.setEnabled(false);
        delivery.setEnabled(false);
        returnOrder.setEnabled(false);
        outStanding.setEnabled(false);
        report.setEnabled(false);
    }

    startDay.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
          //  Toast.makeText(getApplicationContext(), "start", Toast.LENGTH_SHORT).show();
            constants_class.getInstance().dayStart = false;
            endDay.setEnabled(true);
            product.setEnabled(true);
            booking.setEnabled(true);
            delivery.setEnabled(true);
            returnOrder.setEnabled(true);
            outStanding.setEnabled(true);
            report.setEnabled(true);
            Intent intent = new Intent(context, BookingDeliveryStatus_MainActivity.class);
            intent.putExtra("targetActivity", "StartDay");
            startActivity(intent);
            //  Toast.makeText(getApplicationContext(), Boolean.toString(constants_class.getInstance().dayStart), Toast.LENGTH_SHORT).show();

        }
    });
}
catch (Exception ex){
    Toast.makeText(getApplicationContext(), ex.getMessage(), Toast.LENGTH_SHORT).show();
}

    }
//    public boolean isCustomerExist(int agentCustomerId) //agentCustomerId is unique for every customer
//    {
//        boolean isExist=false;
//
//        for (LatLng_ModelClass latLng_modelClass:CustDist_LatLng_ListClass.getInstance().latLng_modelList) {
//            if(latLng_modelClass.Customer.agentCustomerId==agentCustomerId){
//                isExist=true;
//                break;
//            }
//        }
//        return isExist;
//    }
    public void NavigateOrderBooking(View view) {
        //   Intent intent=new Intent(this, AddProduct_BookingActivity.class);
        Intent intent = new Intent(context, BookingDeliveryStatus_MainActivity.class);
        intent.putExtra("targetActivity", "Booking");
        startActivity(intent);
    }

    public void NavigateOutStandingAct(View view) {
        Intent intent = new Intent(this, OutstandingBalanceActivity.class);
        startActivity(intent);
    }

    public void NavigateReports(View view) {
        Intent intent = new Intent(this, ReportsActivity.class);
        startActivity(intent);
    }

    public void NavigateReturnOrder(View view) {
        Intent intent = new Intent(this, ActivityCustomers_ReturnOrder.class);
        startActivity(intent);
    }
}
