package com.example.myapplication;

import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.JsonReader;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.AuthFailureError;
import com.android.volley.NetworkResponse;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.HttpHeaderParser;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.net.ssl.HttpsURLConnection;

public class LoginActivity extends AppCompatActivity {
    final Context context = this;
    final String url = "https://salesanddistribbackend20191109042537.azurewebsites.net/api/";

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        //date into string
        Date date = Calendar.getInstance().getTime();
        SimpleDateFormat df = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
        String formattedDate = df.format(date);

        //string into date




//        Button btn = (Button) findViewById(R.id.chck);
//        btn.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
////                RequestQueue mRequestQueue = Volley.newRequestQueue(getApplicationContext());
//                String url = "https://salesanddistribbackend20191109042537.azurewebsites.net/api/Packages";
////                StringRequest mStringRequest = new StringRequest(Request.Method.GET, url,
////                        new Response.Listener<String>() {
////                            @Override
////                            public void onResponse(String response) {
////                                Toast.makeText(getApplicationContext(), "Response" + response.toString(), Toast.LENGTH_SHORT).show();
////                            }
////                        }, new Response.ErrorListener() {
////                    @Override
////                    public void onErrorResponse(VolleyError error) {
////                        Toast.makeText(getApplicationContext(), "error" + error.toString(), Toast.LENGTH_SHORT).show();
////                    }
////
////                });
////
////                mRequestQueue.add(mStringRequest);
//                constants_class.getInstance().hitGetEndPoint(url, getApplicationContext(), new constants_class.VolleyCallback() {
//                    @Override
//                    public void onSuccessResponse(JSONObject response) throws JSONException {
//                        Toast.makeText(getApplicationContext(), "Response get" + response.toString(), Toast.LENGTH_SHORT).show();
//                    }
//                });
//            }
//        });



    }


    public void openMainActivity(View view) throws JSONException {
        String username = ((EditText) findViewById(R.id.username)).getText().toString();
        String password = ((EditText) findViewById(R.id.password)).getText().toString();
        JSONObject jsonBody = new JSONObject();
        jsonBody.put("Email", username);
        jsonBody.put("Password", password);

        String requestBody = jsonBody.toString();
        final ProgressDialog progressDialog=new ProgressDialog(this);
        progressDialog.setMessage("...authenticating");
        progressDialog.show();
        constants_class.getInstance().hitPostEndPoint(constants_class.getInstance().loginurl, requestBody, getApplicationContext(),
                new constants_class.VolleyCallback() {
                    @Override
                    public void onSuccessResponse(JSONObject response) throws JSONException {

                        if (response.getString("signInStatus").equals("Authorized")) {
                            constants_class.getInstance().setAgentDist_Id(response.getInt("userId"), response.getInt("distId"));
                      progressDialog.dismiss();
                      constants_class.getInstance().dayStart=true;
                          //  Toast.makeText(getApplicationContext(), "all is is " + response, Toast.LENGTH_SHORT).show();
                          //  Toast.makeText(getApplicationContext(), "set value is " + constants_class.getInstance().distId, Toast.LENGTH_SHORT).show();
                            Intent intent = new Intent(context, MainActivity.class);
                            startActivity(intent);
                        } else {
                            Toast.makeText(getApplicationContext(), "UnAuthorized Login", Toast.LENGTH_SHORT).show();
                        }
                     //   Toast.makeText(getApplicationContext(), "inventory url"+constants_class.getInstance().inventoryurl, Toast.LENGTH_SHORT).show();
                    }
                });
//
//
        //  Toast.makeText(getApplicationContext(),"response is "+jsonResponse,Toast.LENGTH_SHORT).show();
//        RequestQueue mRequesQueue = Volley.newRequestQueue(this);
//        try {
//            JSONObject jsonBody = new JSONObject();
//            jsonBody.put("Email", username);
//            jsonBody.put("Password", password);
//
//            final String requestBody = jsonBody.toString();
//            StringRequest mStringRequest = new StringRequest(Request.Method.POST, constants_class.getInstance().loginurl,
//                    new Response.Listener<String>() {
//                        @Override
//                        public void onResponse(String response) {
//                            try {
//                                JSONObject jsonObject = new JSONObject(response);
//
//                            // jsonObject.getInt("userId")   Toast.makeText(getApplicationContext(), jsonObject.getString("signInStatus"), Toast.LENGTH_SHORT).show();
//                                if (jsonObject.getString("signInStatus").equals("Authorized")) {
//                                    constants_class.getInstance().setAgentDist_Id(jsonObject.getInt("userId"),jsonObject.getInt("distId"));
//                                   Toast.makeText(getApplicationContext(), "agent Id is "+response, Toast.LENGTH_SHORT).show();
//                                    Intent intent = new Intent(context, MainActivity.class);
//                                    startActivity(intent);
//                                } else {
//                                    Toast.makeText(getApplicationContext(), "UnAuthorized Login", Toast.LENGTH_SHORT).show();
//                                }
//
//                            } catch (JSONException e) {
//                                Toast.makeText(getApplicationContext(), "post error" + e.getMessage(), Toast.LENGTH_SHORT).show();
//                            }
//
//                        }
//                    }, new Response.ErrorListener() {
//                @Override
//                public void onErrorResponse(VolleyError error) {
//                    Toast.makeText(getApplicationContext(), "network error", Toast.LENGTH_SHORT).show();
//                }
//            }) {
//                @Override
//                public String getBodyContentType() {
//                    return "application/json; charset=utf-8";
//                }
//
//                @Override
//                public byte[] getBody() throws AuthFailureError {
//                    try {
//                        return requestBody == null ? null : requestBody.getBytes("utf-8");
//                    } catch (UnsupportedEncodingException uee) {
//                        VolleyLog.wtf("Unsupported Encoding while trying to get the bytes of %s using %s", requestBody, "utf-8");
//                        return null;
//                    }
//                }
//            };
//            mRequesQueue.add(mStringRequest);
//
//        } catch (JSONException e) {
//            e.printStackTrace();
//        }
    }
}
