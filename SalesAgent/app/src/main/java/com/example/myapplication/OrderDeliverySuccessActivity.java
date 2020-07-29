package com.example.myapplication;


import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import org.json.JSONException;
import org.json.JSONObject;

public class OrderDeliverySuccessActivity extends AppCompatActivity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_orderdelivery_success);
       getSupportActionBar().setTitle("Order Confirmation");

        getSupportActionBar().setBackgroundDrawable(new ColorDrawable(Color.parseColor("#00574B")));


    }


    public void laterDeliverypayment(View view) throws JSONException {
        AlertDialog.Builder builder=new AlertDialog.Builder(this);
        View paylaterView=getLayoutInflater().inflate(R.layout.customdialog_paymentlater,null);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("AgentOrderStatusId", OrderManagement_ModelClass.customer_modelClass.agentOrderStatusId);
        jsonObject.put("AmountPaid", 0);
        String url="http://sndwebapi.spikotech.com/api/CustomerOrderPayments";
        constants_class.getInstance().hitPostEndPoint(url, jsonObject.toString(), getApplicationContext(),
                new constants_class.VolleyCallback() {
                    @Override
                    public void onSuccessResponse(JSONObject response) {
                      //  Toast.makeText(getApplicationContext(), "response is" + response, Toast.LENGTH_LONG).show();
                        Intent intent=new Intent(getApplicationContext(),MainActivity.class);
                        startActivity(intent);

                    }
                });
        builder.setView(paylaterView);
        AlertDialog dialog=builder.create();
        dialog.setTitle("Payment later");
        dialog.show();

        }
    public void deliveryPaymentNow(View view) {
      Intent intent=new Intent(this,PaymentMethodsActivity.class);
        startActivity(intent);
    }

}
