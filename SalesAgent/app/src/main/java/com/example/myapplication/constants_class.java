package com.example.myapplication;

import android.content.Context;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Cache;
import com.android.volley.NetworkResponse;
import com.android.volley.ParseError;
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

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

public class constants_class {
    public String loginurl = "http://sndwebapi.spikotech.com/api/Users/Login";
    public String inventoryurl = "http://sndwebapi.spikotech.com/api/Inventory/";
    public String customerurl = "http://sndwebapi.spikotech.com/api/Customers/";
    public String placeorderurl = "http://sndwebapi.spikotech.com/api/OrderManagement/placeOrder";
    public String deliverorderurl = "http://sndwebapi.spikotech.com/api/OrderManagement/";
    public String deliveredOrderDetailurl="http://sndwebapi.spikotech.com/api/OrderManagement/deliveredOrderDetail";
    public String returnOrderurl="http://sndwebapi.spikotech.com/api/OrderManagement/returnOrder";
    public String shopClosedClaimendURL="http://sndwebapi.spikotech.com/api/OrderManagement/shopvisitedclaim";
    public Integer agentId, distId;
    private static constants_class instance = null;
    public ArrayList<Integer> IdList;
    public boolean specificClearCacheCalled=false;
    public boolean allClearCacheCalled=false;
   public boolean dayStart=false;
    constants_class() {   //default private

    }

    public static constants_class getInstance() {
        if (instance == null) {
            instance = new constants_class();

        }

        return instance;
    }

    public interface VolleyCallback {
        void onSuccessResponse(JSONObject response) throws JSONException;
    }

    public void setAgentDist_Id(int AgentId, int DistId) {
        if(!getAgentId(AgentId)) {
            agentId = AgentId;
            distId = DistId;
            inventoryurl += distId;

            customerurl += agentId;
        }


    }
    public boolean getAgentId(int Agent_Id){ //to check if id already set to avoid override
        boolean isExist=false;
        if(agentId!=null && agentId==Agent_Id) {
           isExist=true;
        }
        return isExist;

    }



    // post update delete method
    public void hitPostEndPoint(String endpoint_url, final String requestBody, final Context activityContext, final VolleyCallback callback) {

        RequestQueue mRequesQueue = Volley.newRequestQueue(activityContext);
        try {
            StringRequest mStringRequest = new StringRequest(Request.Method.POST, endpoint_url,
                    new Response.Listener<String>() {
                        @Override
                        public void onResponse(String response) {
                            try {
                                callback.onSuccessResponse(new JSONObject(response));
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                        }
                    }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    Toast.makeText(activityContext, "error is "+ error, Toast.LENGTH_SHORT).show();
                }
            }) {
                @Override
                public String getBodyContentType() {
                    return "application/json; charset=utf-8";
                }

                @Override
                public byte[] getBody() throws AuthFailureError {
                    try {
                        return requestBody == null ? null : requestBody.getBytes("utf-8");
                    } catch (UnsupportedEncodingException uee) {
                        VolleyLog.wtf("Unsupported Encoding while trying to get the bytes of %s using %s", requestBody, "utf-8");
                        return null;
                    }
                }
            };
            mRequesQueue.add(mStringRequest);

        } catch (Exception e) {
            Toast.makeText(activityContext, "post error", Toast.LENGTH_SHORT).show();

        }
    }

    public void hitGetEndPoint(String endpoint_url, final Context activityContext, final VolleyCallback callback) {

        RequestQueue mRequesQueue = Volley.newRequestQueue(activityContext);
        try {
            StringRequest mStringRequest = new StringRequest(Request.Method.GET, endpoint_url,
                    new Response.Listener<String>() {
                        @Override
                        public void onResponse(String response) {
                            Toast.makeText(activityContext, "get response" + response, Toast.LENGTH_SHORT).show();
                            try {
                                callback.onSuccessResponse(new JSONObject(response));
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                        }
                    }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    Toast.makeText(activityContext, "network error", Toast.LENGTH_SHORT).show();
                }
            })
            {
                @Override
                protected Response<String> parseNetworkResponse(NetworkResponse response) {
                    try {
                        Cache.Entry cacheEntry = HttpHeaderParser.parseCacheHeaders(response);
                        if (cacheEntry == null) {
                            cacheEntry = new Cache.Entry();
                        }
                        final long cacheHitButRefreshed = 3 * 60 * 1000; // in 3 minutes cache will be hit, but also refreshed on background
                        final long cacheExpired = 24*60*60 * 1000; // in 24 hours this cache entry expires completely
                        long now = System.currentTimeMillis();
                        final long softExpire = now + cacheHitButRefreshed;
                        final long ttl = now + cacheExpired;
                        cacheEntry.data = response.data;
                        cacheEntry.softTtl = softExpire;
                        cacheEntry.ttl = ttl;
                        String headerValue;
                        headerValue = response.headers.get("Date");
                        if (headerValue != null) {
                            cacheEntry.serverDate = HttpHeaderParser.parseDateAsEpoch(headerValue);
                        }
                        headerValue = response.headers.get("Last-Modified");
                        if (headerValue != null) {
                            cacheEntry.lastModified = HttpHeaderParser.parseDateAsEpoch(headerValue);
                        }
                        cacheEntry.responseHeaders = response.headers;
                        final String jsonString = new String(response.data,
                                HttpHeaderParser.parseCharset(response.headers));
                        return Response.success(new String(jsonString), cacheEntry);
                    } catch (UnsupportedEncodingException e) {
                        return Response.error(new ParseError(e));
                    }
                }

                @Override
                protected void deliverResponse(String response) {


                    super.deliverResponse(response);
                }

                @Override
                public void deliverError(VolleyError error) {
                    super.deliverError(error);
                }

                @Override
                protected VolleyError parseNetworkError(VolleyError volleyError) {
                    return super.parseNetworkError(volleyError);
                }
            };
            mRequesQueue.add(mStringRequest);
            if(specificClearCacheCalled){
                mRequesQueue.getCache().remove(endpoint_url);
                specificClearCacheCalled=false;
            }
            else if(allClearCacheCalled){
                mRequesQueue.getCache().clear();
                allClearCacheCalled=false;
            }

        } catch (Exception e) {
            Toast.makeText(activityContext, "post error", Toast.LENGTH_SHORT).show();

        }
    }

    public void hitPutEndPoint(String endpoint_url, final Context activityContext, final VolleyCallback callback) {

        RequestQueue mRequesQueue = Volley.newRequestQueue(activityContext);
        try {
            StringRequest mStringRequest = new StringRequest(Request.Method.PUT, endpoint_url,

                    new Response.Listener<String>() {
                        @Override
                        public void onResponse(String response) {
                            try {
                                callback.onSuccessResponse(new JSONObject(response));
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                        }
                    }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    Toast.makeText(activityContext, "network error in put" + error, Toast.LENGTH_SHORT).show();
                }
            });
            mRequesQueue.add(mStringRequest);

        } catch (Exception e) {
            Toast.makeText(activityContext, "post error", Toast.LENGTH_SHORT).show();

        }
    }

    public void hitPutEndPoint_body(String endpoint_url, final String requestBody, final Context activityContext, final VolleyCallback callback) {

        RequestQueue mRequesQueue = Volley.newRequestQueue(activityContext);
        try {
            StringRequest mStringRequest = new StringRequest(Request.Method.PUT, endpoint_url,
                    new Response.Listener<String>() {
                        @Override
                        public void onResponse(String response) {
                            try {
                                callback.onSuccessResponse(new JSONObject(response));
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                        }
                    }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    Toast.makeText(activityContext, "network error", Toast.LENGTH_SHORT).show();
                }
            }) {
                @Override
                public String getBodyContentType() {
                    return "application/json; charset=utf-8";
                }

                @Override
                public byte[] getBody() throws AuthFailureError {
                    try {
                        return requestBody == null ? null : requestBody.getBytes("utf-8");
                    } catch (UnsupportedEncodingException uee) {
                        VolleyLog.wtf("Unsupported Encoding while trying to get the bytes of %s using %s", requestBody, "utf-8");
                        return null;
                    }
                }
            };
            mRequesQueue.add(mStringRequest);

        } catch (Exception e) {
            Toast.makeText(activityContext, "post error", Toast.LENGTH_SHORT).show();

        }
    }

}

