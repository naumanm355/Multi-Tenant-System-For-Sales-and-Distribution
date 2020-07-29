package com.example.myapplication;

import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import com.google.android.material.bottomnavigation.BottomNavigationView;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class OrderDeliveryMainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        try {
            setContentView(R.layout.activitymain_orderdelivery);
//            getSupportActionBar().setTitle("Order Delivery");
//            getSupportActionBar().setBackgroundDrawable(new ColorDrawable(Color.parseColor("#00574B")));

            FragmentManager fragmentManager = getSupportFragmentManager();
            FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
            Fragment_Deliver_Preview hm = new Fragment_Deliver_Preview();
            fragmentTransaction.replace(R.id.orderdelivereFrameLay, hm);
            fragmentTransaction.commit();


            BottomNavigationView bottomNavigationView = (BottomNavigationView) findViewById(R.id.orderMainBtmNaview);
            bottomNavigationView.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {
                @Override
                public boolean onNavigationItemSelected(@NonNull MenuItem menuItem) {

                    switch (menuItem.getItemId()) {
                        case R.id.orderdetailItemBtm:

                            Fragment_Deliver_Preview fragmentDeliverPreview = new Fragment_Deliver_Preview();

                            loadFragment(fragmentDeliverPreview);
                            break;
                        case R.id.orderdelivereItemBtm:
                            Fragment_DeliveryConfirm fragmentDeliveryConfirm = new Fragment_DeliveryConfirm();
                            loadFragment(fragmentDeliveryConfirm);
                            break;
                        case R.id.ordernotdelivItemBtm:
                            try {
                                dialogBox();
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                            break;
                        case R.id.ordercontactItemBtm:
//                            Intent intent=new Intent(getApplicationContext(),MapActivity.class);
//                            startActivity(intent);
                            Fragment_DeliveryContact fragmentDeliveryContact = new Fragment_DeliveryContact();
                            loadFragment(fragmentDeliveryContact);
                            break;


                    }
                    return true;
                }
            });
        } catch (Exception ex) {
            Toast.makeText(getApplicationContext(), "error" + ex.getMessage(), Toast.LENGTH_SHORT).show();
        }
    }

    public void loadFragment(Fragment fragment) {
        Intent getIntent = getIntent();
        // Customer_ModelClass customer_modelClass= getIntent.getParcelableExtra("customerObject");
//        Bundle bundle=new Bundle();
//        bundle.putSerializable("customerObject", (Serializable) customer_modelClass);
//        fragment.setArguments(bundle);
        FragmentTransaction fragmentTransaction = getSupportFragmentManager().beginTransaction();

        fragmentTransaction.replace(R.id.orderdelivereFrameLay, fragment);
        fragmentTransaction.commit();
    }

    public void dialogBox() throws JSONException {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        LayoutInflater inflater = getLayoutInflater();
        View view = inflater.inflate(R.layout.customdialog_deliveryfail, null);
        builder.setView(view);
        Button shopClosedView = (Button) view.findViewById(R.id.failedAchieve_ShopClosed);

        shopClosedView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(getApplicationContext(), "you click1", Toast.LENGTH_SHORT).show();
            }
        });
        Button notVisitedView = (Button) view.findViewById(R.id.failedAchieve_NotVisited);
        Toast.makeText(getApplicationContext(), "you click1", Toast.LENGTH_SHORT).show();
        shopClosedView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(getApplicationContext(), "you click2", Toast.LENGTH_SHORT).show();
            }
        });
        Button outOfRangeView = (Button) view.findViewById(R.id.failedAchieve_OutOfRange);
        Date calendarDate = Calendar.getInstance().getTime();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        String currentDateTime = df.format(calendarDate);
        final JSONObject jsonObject = new JSONObject();
        jsonObject.put("AgentOrderStatusId", getIntent().getIntExtra("agentOrderStatusId", 0));  //or OrderManagement.customer_modelclass.AgentOrderStatusId
        jsonObject.put("ClaimType", "Shop Closed");
        jsonObject.put("ClaimDate", currentDateTime);
        shopClosedView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Toast.makeText(getApplicationContext(), "you click 3", Toast.LENGTH_SHORT).show();

                constants_class.getInstance().hitPostEndPoint(constants_class.getInstance().shopClosedClaimendURL, jsonObject.toString(),
                        getApplicationContext(), new constants_class.VolleyCallback() {
                            @Override
                            public void onSuccessResponse(JSONObject response) throws JSONException {
                                Toast.makeText(getApplicationContext(), "claim response" + response, Toast.LENGTH_SHORT).show();
                            }
                        });
            }
        });


        AlertDialog dialog = builder.create();

        //  dialog.setTitle("Ask question");
        dialog.show();


    }
}
