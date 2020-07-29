package com.example.myapplication;

import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class OutstandingBalanceActivity extends AppCompatActivity {
    final ArrayList<CustomerOutstandingBalance_ModelClass> listCustomerOutstandingBalance = new ArrayList<>();
        ArrayList<Customer_ModelClass> customerList=new ArrayList<>();  //to specify bill mount of all pending balance order of specifc customer
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_outstandingbalance);
        getSupportActionBar().setTitle("Outstanding Balance");
        getSupportActionBar().setBackgroundDrawable(new ColorDrawable(Color.parseColor("#00574B")));
        String[] maintitleList = {
                "Title kwwn", "Title 2",
                "Title 3", "Title 4",
                "Title 5"
        };

        String[] subtitleList = {
                "Sub Title 1", "Sub Title 2",
                "Sub Title 3", "Sub Title 4",
                "Sub Title 5"
        };

        Integer[] imgList = {R.mipmap.nationaltomatoketchup, R.mipmap.nationaltomatoketchup, R.mipmap.nationaltomatoketchup, R.mipmap.nationaltomatoketchup,
                R.mipmap.nationaltomatoketchup};
        RecyclerView recyclerView = (RecyclerView) findViewById(R.id.outstandBal_recycle);

//        RecyclerAdapter_OutstandingBalance recyclerAdapter_outstandingBalance=new RecyclerAdapter_OutstandingBalance(getApplicationContext(),maintitleList,subtitleList,imgList);
        final RecyclerAdapter_OutstandingBalance recyclerAdapter_outstandingBalance = new
                RecyclerAdapter_OutstandingBalance(getApplicationContext(), listCustomerOutstandingBalance,customerList);
        recyclerView.hasFixedSize();
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        recyclerView.setAdapter(recyclerAdapter_outstandingBalance);
        String url = "http://sndwebapi.spikotech.com/api/CustomerOrderPayments/" + constants_class.getInstance().agentId;

        constants_class.getInstance().hitGetEndPoint(url, getApplicationContext(),
                new constants_class.VolleyCallback() {
                    @Override
                    public void onSuccessResponse(JSONObject response) throws JSONException {
                        JSONArray jsonArray = response.getJSONArray("customersOutstandingBalList");
                        for (int i = 0; i < jsonArray.length(); i++) {
                            JSONObject iterativeObject = jsonArray.getJSONObject(i);
                            CustomerOutstandingBalance_ModelClass customerOutstandingBalance_modelClass = new CustomerOutstandingBalance_ModelClass();

                            customerOutstandingBalance_modelClass.customername = iterativeObject.getString("customername");
                            customerOutstandingBalance_modelClass.amountPaid = iterativeObject.getInt("amountPaid");
                            customerOutstandingBalance_modelClass.totalAmount = iterativeObject.getInt("totalPayment");

                            //customer info for later payment
                            Customer_ModelClass customer_modelClass=new Customer_ModelClass();
                            customer_modelClass.name=iterativeObject.getString("customername");
                            customer_modelClass.agentOrderStatusId=iterativeObject.getInt("agentOrderStatusId");
                            customerList.add(customer_modelClass);

                            if (getIndex(customerOutstandingBalance_modelClass.customername)==-1) {

                                listCustomerOutstandingBalance.add(customerOutstandingBalance_modelClass);
                            } else {

                             //   CustomerOutstandingBalance_ModelClass objectBeingUpdate = listCustomerOutstandingBalance.get(i);
                                try {
                  //                  Toast.makeText(getApplicationContext(), "so up index" +getIndex(customerOutstandingBalance_modelClass.customername), Toast.LENGTH_SHORT).show();
                                     CustomerOutstandingBalance_ModelClass objectBeingUpdate=listCustomerOutstandingBalance.get(getIndex(customerOutstandingBalance_modelClass.customername));
                                       objectBeingUpdate.amountPaid += customerOutstandingBalance_modelClass.amountPaid;
                                       objectBeingUpdate.totalAmount += customerOutstandingBalance_modelClass.totalAmount;
                                       listCustomerOutstandingBalance.set(getIndex(customerOutstandingBalance_modelClass.customername), objectBeingUpdate);
                                }
                                catch (Exception ex){
                                    Toast.makeText(getApplicationContext(), "so error" + ex.getMessage(), Toast.LENGTH_SHORT).show();

                                }

                            }
                        }
                        recyclerAdapter_outstandingBalance.notifyDataSetChanged();

                    }
                });


    }

    public int getIndex(String customername) {  //get index of last element if same element exist
        int index = -1;
        if (listCustomerOutstandingBalance.size() > 0) {
            for (CustomerOutstandingBalance_ModelClass customerOutstandingbalance : listCustomerOutstandingBalance) {
                if (customerOutstandingbalance.customername.equals(customername)) {
                    index=listCustomerOutstandingBalance.indexOf(customerOutstandingbalance);
                    break;
                }
            }
        }
        return index;
    }

}
