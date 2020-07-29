package com.example.myapplication;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.viewpager.widget.ViewPager;

import com.google.android.material.navigation.NavigationView;
import com.google.android.material.tabs.TabLayout;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class BookingDeliveryStatus_MainActivity extends AppCompatActivity {
    final Context context=this;
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activitymain_deliverybooking_status);

     //   Toast.makeText(context,getIntent().getStringExtra("targetActivity").toString(),Toast.LENGTH_LONG).show();

        final Toolbar toolbar=(Toolbar) findViewById(R.id.deliveryStatusToolbar);
        setSupportActionBar(toolbar);
        toolbar.setTitleTextColor(getResources().getColor(R.color.white));



        NavigationView navigationView=(NavigationView)  findViewById(R.id.deliveryStatusNaView);
        DrawerLayout drawerLayout=(DrawerLayout)  findViewById(R.id.deliveryStatusdrawer);
        ActionBarDrawerToggle toggle=new ActionBarDrawerToggle(this,drawerLayout,toolbar,R.string.navigation_drawer_open,R.string.navigation_drawer_close);
        drawerLayout.addDrawerListener(toggle);
        toggle.syncState();
        toggle.getDrawerArrowDrawable().setColor(getResources().getColor(R.color.white));

        final ProgressDialog progressDialog=new ProgressDialog(this);
        progressDialog.setMessage("...Loading");
        progressDialog.show();
       // constants_class.getInstance().specificClearCacheCalled=true;
        constants_class.getInstance().hitGetEndPoint(constants_class.getInstance().customerurl, getApplicationContext(), new constants_class.VolleyCallback() {
            @Override
            public void onSuccessResponse(JSONObject response) throws JSONException {
                progressDialog.dismiss();
          //      Toast.makeText(getApplicationContext(),"show agent customer"+response.getJSONArray("agentCustomerList"),Toast.LENGTH_SHORT).show();
                pagerFunctinality(response.getJSONArray("agentCustomerList"));

            }
        });


    }
    public void pagerFunctinality(JSONArray response){
        TabLayout tabLayout=(TabLayout) findViewById(R.id.deliveryStatusTabLayout);
        tabLayout.removeAllTabs();
        tabLayout.addTab(tabLayout.newTab().setText("Pending"));
        tabLayout.addTab(tabLayout.newTab().setText("Visited"));
        tabLayout.addTab(tabLayout.newTab().setText("Productive"));
        final ViewPager viewPager=(ViewPager) findViewById(R.id.deliveryStatusViewPager);
        PagerAdapter_DeliveryStatus adapter_deliveryStatus=new PagerAdapter_DeliveryStatus(getSupportFragmentManager(),context,tabLayout.getTabCount(),getIntent().getStringExtra("targetActivity"),response);
        viewPager.setAdapter(adapter_deliveryStatus);
      //  viewPager.not
        viewPager.addOnPageChangeListener(new TabLayout.TabLayoutOnPageChangeListener(tabLayout));
        tabLayout.addOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {
                viewPager.setCurrentItem(tab.getPosition());
            }

            @Override
            public void onTabUnselected(TabLayout.Tab tab) {

            }

            @Override
            public void onTabReselected(TabLayout.Tab tab) {

            }
        });

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
         getMenuInflater().inflate(R.menu.sync_searchmenu,menu); //return super.onCreateOptionsMenu(menu);
         return  true;
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        switch (item.getItemId()){
            case R.id.syncItem_syncsearchmenu:
                constants_class.getInstance().specificClearCacheCalled=true;
                final ProgressDialog progressDialog=new ProgressDialog(this);
                progressDialog.setMessage("...Loading");
                progressDialog.show();
                // constants_class.getInstance().specificClearCacheCalled=true;
                constants_class.getInstance().hitGetEndPoint(constants_class.getInstance().customerurl, getApplicationContext(), new constants_class.VolleyCallback() {
                    @Override
                    public void onSuccessResponse(JSONObject response) throws JSONException {
                        progressDialog.dismiss();
                //        Toast.makeText(getApplicationContext(),"show agent customer"+response.getJSONArray("agentCustomerList"),Toast.LENGTH_SHORT).show();
                        pagerFunctinality(response.getJSONArray("agentCustomerList"));

                    }
                });

        }
        return super.onOptionsItemSelected(item);
    }
}
