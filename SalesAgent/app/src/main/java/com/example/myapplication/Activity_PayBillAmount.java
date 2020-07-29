package com.example.myapplication;

import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class Activity_PayBillAmount extends AppCompatActivity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_paybillamount);
        getSupportActionBar().setTitle("Pay Order Bill");
        getSupportActionBar().setBackgroundDrawable(new ColorDrawable(Color.parseColor("#00574B")));
        try {

            if (getIntent().getStringExtra("parentActivity").equals("outstandingBalancectivity")) {
                ArrayList<Integer> agentOrderStatusList = (ArrayList<Integer>) getIntent().getSerializableExtra("agentOrderStatusList");
              //  Toast.makeText(getApplicationContext(), "last" + agentOrderStatusList.size(), Toast.LENGTH_SHORT).show();
            }
        } catch (Exception ex) {
            Toast.makeText(getApplicationContext(), ex.getMessage() + Integer.toString(OrderManagement_ModelClass.customer_modelClass.agentOrderStatusId), Toast.LENGTH_SHORT).show();
        }
    }

    public void paybillButton(View view) throws JSONException {
        String url = "http://sndwebapi.spikotech.com/api/CustomerOrderPayments";
        EditText billamountEditView = (EditText) findViewById(R.id.EditpaidAmount_paybillamountActivity);
        try {

            if (getIntent().getStringExtra("parentActivity").equals("outstandingBalancectivity")) {
                ArrayList<Integer> agentOrderStatusList = (ArrayList<Integer>) getIntent().getSerializableExtra("agentOrderStatusList");
         //       Toast.makeText(getApplicationContext(), "last" + agentOrderStatusList.size(), Toast.LENGTH_SHORT).show();
                JSONArray jsonArray = new JSONArray();
                for (int i = 0; i < agentOrderStatusList.size(); i++) {
                    JSONObject jsonObject = new JSONObject();
                    jsonObject.put("AgentOrderStatusId", agentOrderStatusList.get(i));
                    jsonObject.put("AmountPaid", Integer.parseInt(billamountEditView.getText().toString()));
                    jsonArray.put(jsonObject);
                }
                JSONObject requestBody = new JSONObject();
                requestBody.put("orderPaymentList", jsonArray);

                constants_class.getInstance().hitPutEndPoint_body(url, requestBody.toString(), getApplicationContext(),
                        new constants_class.VolleyCallback() {
                            @Override
                            public void onSuccessResponse(JSONObject response) throws JSONException {
                             //   Toast.makeText(getApplicationContext(), "update outstanding blnce" + response, Toast.LENGTH_SHORT).show();
                                Intent intent=new Intent(getApplicationContext(),MainActivity.class);
                                startActivity(intent);
                            }
                        });
            }
        } catch (Exception ex) {
          //  Toast.makeText(getApplicationContext(), "click called paying", Toast.LENGTH_SHORT).show();
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("AgentOrderStatusId", OrderManagement_ModelClass.customer_modelClass.agentOrderStatusId);
            jsonObject.put("AmountPaid", Integer.parseInt(billamountEditView.getText().toString()));
            constants_class.getInstance().hitPostEndPoint(url, jsonObject.toString(), getApplicationContext(),
                    new constants_class.VolleyCallback() {
                        @Override
                        public void onSuccessResponse(JSONObject response) {
                        //    Toast.makeText(getApplicationContext(), "response is" + response, Toast.LENGTH_LONG).show();
                            Intent intent=new Intent(getApplicationContext(),MainActivity.class);
                            startActivity(intent);
                        }
                    });
        }


    }
}
