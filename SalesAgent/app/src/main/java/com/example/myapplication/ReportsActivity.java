package com.example.myapplication;

import android.app.ProgressDialog;
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

public class ReportsActivity extends AppCompatActivity {
    final ArrayList<Customer_ModelClass> list = new ArrayList<Customer_ModelClass>();
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_reports);
        getSupportActionBar().setTitle("Reports");
        getSupportActionBar().setBackgroundDrawable(new ColorDrawable(Color.parseColor("#00574B")));
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

        final Integer[] imgList = {R.mipmap.first, R.mipmap.first, R.mipmap.first, R.mipmap.first, R.mipmap.first};
        final RecyclerAdapter_Customers adapter = new RecyclerAdapter_Customers(getApplicationContext(), list, imgList, "OrderDeliveredActivity");
        RecyclerView recyclerView = (RecyclerView) findViewById(R.id.report_recycler);
        recyclerView.setHasFixedSize(true);
        LinearLayoutManager layoutManager = new LinearLayoutManager(getApplicationContext());
        recyclerView.setLayoutManager(layoutManager);
        recyclerView.addItemDecoration(new DividerItemDecoration(recyclerView.getContext(), DividerItemDecoration.VERTICAL));
        recyclerView.setAdapter(adapter);

        final ProgressDialog progressDialog = new ProgressDialog(this);
        progressDialog.setMessage("...Loading");
        progressDialog.show();
        Toast.makeText(getApplicationContext(), "url" + constants_class.getInstance().inventoryurl.substring(77), Toast.LENGTH_SHORT).show();

        constants_class.getInstance().hitGetEndPoint(constants_class.getInstance().customerurl, getApplicationContext(), new constants_class.VolleyCallback() {
            @Override
            public void onSuccessResponse(JSONObject response) throws JSONException {

               // Toast.makeText(getApplicationContext(), "url" + constants_class.getInstance().customerurl + "show agent customer" + response, Toast.LENGTH_SHORT).show();
                progressDialog.dismiss();
                try {
                    JSONArray jsonArray = response.getJSONArray("agentCustomerList");
                    for (int i = 0; i < jsonArray.length(); i++) {
                        JSONObject iterateObject = jsonArray.getJSONObject(i);
                        String targettype = iterateObject.getJSONObject("targettype").getString("type");
                        String ordertype = iterateObject.getJSONObject("ordertype").getString("orderStatus");
                        JSONObject agentCustomerObj = iterateObject.getJSONObject("agent_Customer");
                        JSONObject cusomerObject = iterateObject.getJSONObject("customerInfo");
                     if(!isCustomerExist(agentCustomerObj.getInt("id"))) {
                         if (ordertype.equals("Delivery") && targettype.equals("Productive")) {
                             Customer_ModelClass object = new Customer_ModelClass();
                             object.agentCustomerId = agentCustomerObj.getInt("id");
                             object.customerordertype="";
                             object.name = cusomerObject.getString("firstName") + " " + cusomerObject.getString("lastName");
                             object.address = cusomerObject.getString("address");

                             list.add(object);

                         }
                     }
                    }

                } catch (JSONException e) {
                    e.printStackTrace();
                }
                adapter.notifyDataSetChanged();

            }
        });
    }
    public boolean isCustomerExist(int agentCustomerId) //agentCustomerId is unique for every customer
    {
        boolean isExist=false;

        for (Customer_ModelClass customer:list) {
            if(customer.agentCustomerId==agentCustomerId){
                isExist=true;
                break;
            }
        }
        return isExist;
    }
//    public void manipulateProduciveDeliveryCustomer(ArrayList<Customer_ModelClass> list){
//        final Integer[] imgList = {R.mipmap.first, R.mipmap.first, R.mipmap.first, R.mipmap.first, R.mipmap.first};
//        RecyclerAdapter_Customers adapter=new RecyclerAdapter_Customers(getApplicationContext(),list,imgList, "OrderDeliveredActivity");
//        RecyclerView recyclerView=(RecyclerView)  findViewById(R.id.report_recycler);
//        recyclerView.setHasFixedSize(true);
//        LinearLayoutManager layoutManager=new LinearLayoutManager(getApplicationContext());
//        recyclerView.setLayoutManager(layoutManager);
//
//        recyclerView.addItemDecoration(new DividerItemDecoration(recyclerView.getContext(), DividerItemDecoration.VERTICAL));
//        recyclerView.setAdapter(adapter);
//    }
}
