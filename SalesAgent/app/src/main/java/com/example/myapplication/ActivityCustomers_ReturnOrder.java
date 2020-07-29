package com.example.myapplication;

import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.widget.CursorAdapter;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

public class ActivityCustomers_ReturnOrder extends AppCompatActivity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activitycustomers_returnorder);
        getSupportActionBar().setTitle("Return Order");
        getSupportActionBar().setBackgroundDrawable(new ColorDrawable(Color.parseColor("#00574B")));
        final ArrayList<Customer_ModelClass> returnOrderCustomerList = new ArrayList<Customer_ModelClass>();
        RecyclerView recyclerView = (RecyclerView) findViewById(R.id.returnOrder_customer_recycler);
        recyclerView.hasFixedSize();
        recyclerView.addItemDecoration(new DividerItemDecoration(recyclerView.getContext(), DividerItemDecoration.VERTICAL));
        Integer[] imgList = {R.mipmap.first, R.mipmap.first, R.mipmap.first, R.mipmap.first, R.mipmap.first};
        final RecyclerAdapter_Customers adapter = new RecyclerAdapter_Customers(getApplicationContext(), returnOrderCustomerList, imgList, "ReturnOrderAcivity");
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        recyclerView.setAdapter(adapter);
       // Toast.makeText(getApplicationContext(), "return called", Toast.LENGTH_SHORT).show();
        constants_class.getInstance().hitGetEndPoint(constants_class.getInstance().customerurl, getApplicationContext(),
                new constants_class.VolleyCallback() {
                    @Override
                    public void onSuccessResponse(JSONObject response) throws JSONException {
                        try {
                            JSONArray jsonArray = response.getJSONArray("agentCustomerList");
                            for (int i = 0; i < jsonArray.length(); i++) {
                                JSONObject iterateObject = jsonArray.getJSONObject(i);
                                String targettype = iterateObject.getJSONObject("targettype").getString("type");
                                String ordertype = iterateObject.getJSONObject("ordertype").getString("orderStatus");
                                JSONObject agentCustomerObj = iterateObject.getJSONObject("agent_Customer");
                                JSONObject cusomerObject = iterateObject.getJSONObject("customerInfo");
                                if (ordertype.equals("Return")) {
                                    JSONObject agentOrdetStatusObject = iterateObject.getJSONObject("agentOrderStatusObject");
//if(agentOrdetStatusObject.getString("endDate").be)

                                    if (!endDatePassed(agentOrdetStatusObject.getString("endDate"))) {

                                        Customer_ModelClass object = new Customer_ModelClass();
                                        object.agentCustomerId = agentCustomerObj.getInt("id");
                                        object.name = cusomerObject.getString("firstName") + " " + cusomerObject.getString("lastName");
                                        object.address = cusomerObject.getString("address");

                                        object.customerordertype = ordertype;
                                        object.agentOrderStatusId = agentOrdetStatusObject.getInt("id");
                                        returnOrderCustomerList.add(object);
                                    }
                                }

                            }
//                            for (int i = 0; i < jsonArray.length(); i++) {
//                                JSONObject iterativeObject = jsonArray.getJSONObject(i);
//
//                                String ordertype = iterativeObject.getJSONObject("ordertype").getString("orderStatus");
//                                JSONObject customerInfo = iterativeObject.getJSONObject("customerInfo");
//                                JSONObject agentOrdetStatusObject = iterativeObject.getJSONObject("agentOrderStatusObject");
//                                if(ordertype.equals("Return")) {
//                                    if (!endDatePassed(agentOrdetStatusObject.getString("endDate"))) {
//                                        Customer_ModelClass customer_modelClass = new Customer_ModelClass();
//                                        customer_modelClass.agentOrderStatusId = iterativeObject.getInt("agentOrderStatusId");
//                                        customer_modelClass.name = customerInfo.getString("firstName") + " " + customerInfo.getString("lastName");
//                                        customer_modelClass.address = customerInfo.getString("address");
//                                        customer_modelClass.customerordertype = "";
//                                        returnOrderCustomerList.add(customer_modelClass);
//                                    }
//                                }
//                            }


                        } catch (JSONException e) {
                            e.printStackTrace();
                        } catch (ParseException e) {
                            e.printStackTrace();
                        }

                        adapter.notifyDataSetChanged();

                    }
                });
    }
    public boolean endDatePassed(String endDate) throws ParseException {
        boolean isReached = true;
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date extratDate = dateFormat.parse(endDate);

        Date calendarDate = Calendar.getInstance().getTime();
        String currentDateFormat = dateFormat.format(calendarDate);
        Date currentDate = dateFormat.parse(currentDateFormat);
        if (extratDate.after(currentDate) || extratDate.equals(currentDate)) {
            isReached = false;
        }

        return isReached;
    }
}
