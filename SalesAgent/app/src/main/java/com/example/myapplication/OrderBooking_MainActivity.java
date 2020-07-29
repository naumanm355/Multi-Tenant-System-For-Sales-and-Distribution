package com.example.myapplication;

import android.content.Intent;
import android.content.res.ColorStateList;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import com.google.android.material.bottomnavigation.BottomNavigationItemView;
import com.google.android.material.bottomnavigation.BottomNavigationView;

import org.json.JSONException;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class OrderBooking_MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activitymain_orderbooking);
        getSupportActionBar().setTitle("Order Booking");
        getSupportActionBar().setBackgroundDrawable(new ColorDrawable(Color.parseColor("#00574B")));

        Intent intent = getIntent();
   //     Toast.makeText(getApplicationContext(), "customer id in  booking main activity is " + intent.getIntExtra("agentOrderStatusId", 0), Toast.LENGTH_SHORT).show();

        FragmentManager fm = getSupportFragmentManager();
        FragmentTransaction fragmentTransaction = fm.beginTransaction();
        final Fragment_AddProductBooking fragment_addProductBooking = new Fragment_AddProductBooking();
        fragmentTransaction.replace(R.id.orderbookingFrameLayout, fragment_addProductBooking);
        fragmentTransaction.commit();

        final BottomNavigationView bottomNavigationView = (BottomNavigationView) findViewById(R.id.orderbookingMainBtmNaview);
        bottomNavigationView.setItemIconTintList(ColorStateList.valueOf(getResources().getColor(R.color.white)));
        bottomNavigationView.setItemTextColor(ColorStateList.valueOf(getResources().getColor(R.color.white)));
        bottomNavigationView.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem menuItem) {

                Intent getInt = getIntent();
                Bundle bundle = new Bundle();
                switch (menuItem.getItemId()) {
                    case R.id.addproductCart_itemBtmNV:

                        Fragment_AddProductBooking fragment_addProductBooking = new Fragment_AddProductBooking();

                        loadFragment(fragment_addProductBooking);
                        break;
                    case R.id.viewproductCart_itemBtmNV:
               //         Toast.makeText(getApplicationContext(), "view called" + getInt.getIntExtra("agentOrderStatusId", 0), Toast.LENGTH_SHORT).show();

                        bundle.putInt("agentOrderStatusId", getInt.getIntExtra("agentOrderStatusId", 0));
                        Fragment_ViewBookingCart fragment_viewBookingCart = new Fragment_ViewBookingCart();
                        fragment_viewBookingCart.setArguments(bundle);
                        loadFragment(fragment_viewBookingCart);
                        break;
                    case R.id.bookingconfirm_itemBtmNV:

                 //       Toast.makeText(getApplicationContext(), "booking confirm called" + getInt.getIntExtra("agentOrderStatusId", 0), Toast.LENGTH_SHORT).show();
                        bundle.putInt("agentOrderStatusId", getInt.getIntExtra("agentOrderStatusId", 0));
                        Fragment_BookingConfirm fragment_bookingConfirm = new Fragment_BookingConfirm();
                        fragment_bookingConfirm.setArguments(bundle);
                        loadFragment(fragment_bookingConfirm);
                        break;
                    case R.id.bookingfailed_itemBtmNV:
                        try {
                            dialogBox();
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                        break;


                }
                return true;
            }
        });
    }

    public void loadFragment(Fragment fragment) {
        Intent getIntent = getIntent();
        //    Customer_ModelClass customer_modelClass= getIntent.getParcelableExtra("customerObject");
//        Bundle bundle=new Bundle();
//        bundle.putSerializable("customerObject", (Serializable) customer_modelClass);
//        fragment.setArguments(bundle);

        FragmentTransaction fragmentTransaction = getSupportFragmentManager().beginTransaction();

        fragmentTransaction.replace(R.id.orderbookingFrameLayout, fragment);
  //      fragmentTransaction.addToBackStack(null);
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
          //      Toast.makeText(getApplicationContext(), "you click1", Toast.LENGTH_SHORT).show();
            }
        });
         Button notVisitedView = (Button) view.findViewById(R.id.failedAchieve_NotVisited);
       // Toast.makeText(getApplicationContext(), "you click1", Toast.LENGTH_SHORT).show();
        shopClosedView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
            //    Toast.makeText(getApplicationContext(), "you click2", Toast.LENGTH_SHORT).show();
            }
        });
         Button outOfRangeView = (Button) view.findViewById(R.id.failedAchieve_OutOfRange);
         Date calendarDate= Calendar.getInstance().getTime();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        String currentDateTime = df.format(calendarDate);
        final JSONObject jsonObject=new JSONObject();
        jsonObject.put("AgentOrderStatusId",getIntent().getIntExtra("agentOrderStatusId", 0));
        jsonObject.put("ClaimType","Shop Closed");
        jsonObject.put("ClaimDate",currentDateTime);
        shopClosedView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

         //       Toast.makeText(getApplicationContext(), "you click 3", Toast.LENGTH_SHORT).show();

                constants_class.getInstance().hitPostEndPoint(constants_class.getInstance().shopClosedClaimendURL, jsonObject.toString(),
                        getApplicationContext(), new constants_class.VolleyCallback() {
                            @Override
                            public void onSuccessResponse(JSONObject response) throws JSONException {
                             //   Toast.makeText(getApplicationContext(),"claim response"+response,Toast.LENGTH_SHORT).show();
                            }
                        });
            }
        });


        AlertDialog dialog = builder.create();

        //  dialog.setTitle("Ask question");
        dialog.show();


    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.sync_searchmenu,menu);
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
      //  Toast.makeText(getApplicationContext(),"ljkwenfj",Toast.LENGTH_SHORT).show();
        switch (item.getItemId()){
            case R.id.syncItem_syncsearchmenu:
                constants_class.getInstance().specificClearCacheCalled=true;

        }
        return super.onOptionsItemSelected(item);
    }
}
