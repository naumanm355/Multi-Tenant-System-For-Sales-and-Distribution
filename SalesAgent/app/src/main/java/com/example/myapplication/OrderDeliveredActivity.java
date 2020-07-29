package com.example.myapplication;

import android.app.ProgressDialog;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class OrderDeliveredActivity extends AppCompatActivity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activityreport_orderdelivered);
        getSupportActionBar().setTitle("Customer Orders");
        getSupportActionBar().setBackgroundDrawable(new ColorDrawable(Color.parseColor("#00574B")));
        try {
            final RecyclerView recyclerView = (RecyclerView) findViewById(R.id.orderdelivered_recycler);
            recyclerView.hasFixedSize();
            recyclerView.setLayoutManager(new LinearLayoutManager(this));

            final String[] maintitleList = {
                    "Title 1", "Title 2",
                    "Title 3", "Title 4",
                    "Title 5"
            };

            final String[] subtitleList = {
                    "Sub Title 1", "Sub Title 2",
                    "Sub Title 3", "Sub Title 4",
                    "Sub Title 5"
            };

            Intent getInent = getIntent();
            final ProgressDialog progressDialog = new ProgressDialog(this);
            progressDialog.setMessage("...Loading");
            progressDialog.show();
            final String url = constants_class.getInstance().deliverorderurl + getInent.getIntExtra("agentcustomerId", 0);//"https://salesanddistribbackend20191109042537.azurewebsites.net/api/OrderManagement/" + getInent.getIntExtra("agentcustomerId", 0);
            final ArrayList<OrderBillDetail_ModelClass> billDetail_modelClasses = new ArrayList<>();
            constants_class.getInstance().hitGetEndPoint(url, getApplicationContext(),
                    new constants_class.VolleyCallback() {
                        @Override
                        public void onSuccessResponse(JSONObject response) throws JSONException {

                       //     Toast.makeText(getApplicationContext(), "get all order detail" + response, Toast.LENGTH_SHORT).show();
                            JSONArray allOrdersList = response.getJSONArray("orderdetailList");
                            for (int i = 0; i < allOrdersList.length(); i++) {
                                JSONObject iterativeObject = allOrdersList.getJSONObject(i);
                                OrderBillDetail_ModelClass billDetail = new OrderBillDetail_ModelClass();
                                JSONObject statusObject = iterativeObject.getJSONObject("status");
                                if (statusObject.getString("targetstatus").equals("Productive") &&
                                        statusObject.getString("orderstatus").equals("Delivery")) {
                                    billDetail.agentOrderStatusId = iterativeObject.getInt("agentOrderStatusId");
                                    billDetail.orderdate = iterativeObject.getString("orderDate");
                                    billDetail.totalitem = iterativeObject.getInt("totalItems");
                                    billDetail.subtotal = iterativeObject.getInt("subTotal");
                                    billDetail_modelClasses.add(billDetail);
                                }
                            }
                         //   Toast.makeText(getApplicationContext(), "lisss" + billDetail_modelClasses.get(0).orderdate, Toast.LENGTH_SHORT).show();
                            RecyclerAdapter_ShowDeliveredOrders adapter = new RecyclerAdapter_ShowDeliveredOrders(getApplicationContext(), billDetail_modelClasses);
                            recyclerView.setAdapter(adapter);
                            progressDialog.dismiss();

                        }
                    });
        }
        catch (Exception ex){
         //   Toast.makeText(getApplicationContext(), "lisss" + ex.getMessage(), Toast.LENGTH_SHORT).show();
        }

    }
}
