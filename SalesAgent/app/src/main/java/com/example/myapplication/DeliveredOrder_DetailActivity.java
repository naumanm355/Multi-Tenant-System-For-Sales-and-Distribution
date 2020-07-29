package com.example.myapplication;

import android.app.ProgressDialog;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class DeliveredOrder_DetailActivity extends AppCompatActivity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activitydetail_deliveredorder);
        getSupportActionBar().setTitle("Order Detail");
        getSupportActionBar().setBackgroundDrawable(new ColorDrawable(Color.parseColor("#00574B")));
        final RecyclerView recyclerView=(RecyclerView) findViewById(R.id.detail_deliveredorder_recycler);
        recyclerView.hasFixedSize();
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        String[] maintitleList = {
                "Title 1", "Title 2",
                "Title 3", "Title 4",
                "Title 5"
        };

        String[] subtitleList = {
                "Sub Title 1", "Sub Title 2",
                "Sub Title 3", "Sub Title 4",
                "Sub Title 5"
        };

        Intent getInent=getIntent();
        final ProgressDialog progressDialog=new ProgressDialog(this);
        progressDialog.setMessage("...Loading");
        progressDialog.show();
     //   final String url="https://salesanddistribbackend20191109042537.azurewebsites.net/api/OrderManagement/deliveredOrderDetail";
        final ArrayList<Inventory_ModelClass> billItems=new ArrayList<>();
        JSONObject jsonObject=new JSONObject();
        try {
            jsonObject.put("AgentOrderStatusId",getInent.getIntExtra("agentOrderStatusId",0));
        } catch (JSONException e) {
            e.printStackTrace();
        }

        constants_class.getInstance().hitPostEndPoint(constants_class.getInstance().deliveredOrderDetailurl,jsonObject.toString() ,getApplicationContext(),
                new constants_class.VolleyCallback() {
                    @Override

                    public void onSuccessResponse(JSONObject response) throws JSONException {
                        int subtotalBill=0;
//                          Toast.makeText(getApplicationContext(),"order  detail"+response,Toast.LENGTH_SHORT).show();
                        JSONArray allOrdersList=response.getJSONArray("orderDetailList");
                        for(int i=0;i<allOrdersList.length();i++){
                            JSONObject iterativeObject=allOrdersList.getJSONObject(i);
                            Inventory_ModelClass inventory_modelClass=new Inventory_ModelClass();
                            inventory_modelClass.name=iterativeObject.getString("name");
                            inventory_modelClass.category=iterativeObject.getString("category");
                            inventory_modelClass.company=iterativeObject.getString("company");
                            inventory_modelClass.price=iterativeObject.getInt("inv_price");
                            inventory_modelClass.orderqty=iterativeObject.getInt("qty");
                            inventory_modelClass.subtotal= inventory_modelClass.orderqty* inventory_modelClass.price;
                            subtotalBill+=inventory_modelClass.subtotal;
                            billItems.add(inventory_modelClass);
                        }
                        TextView subtotalView=(TextView)  findViewById(R.id.viewCart_subTotal);
                        TextView totalView=(TextView)  findViewById(R.id.viewCart_Total);
                        TextView totalItemView=(TextView)  findViewById(R.id.viewCart_totalItemCount);
                        totalItemView.setText(Integer.toString(billItems.size()));
                        subtotalView.setText(Integer.toString(subtotalBill));
                        totalView.setText(Integer.toString(subtotalBill));
                   //     Toast.makeText(getApplicationContext(),"lilkjsss"+billItems.size(),Toast.LENGTH_SHORT).show();
                        RecyclerAdapter_Detail_DeliveredOrder adapter=new RecyclerAdapter_Detail_DeliveredOrder(billItems);
                        recyclerView.setAdapter(adapter);
                        progressDialog.dismiss();

                    }
                });


    }
}
