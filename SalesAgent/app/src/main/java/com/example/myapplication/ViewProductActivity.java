package com.example.myapplication;

import android.app.ProgressDialog;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.ProgressBar;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.android.volley.Cache;
import com.android.volley.NetworkResponse;
import com.android.volley.ParseError;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.HttpHeaderParser;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

public class ViewProductActivity extends AppCompatActivity {
    ArrayList<Inventory_ModelClass> ListInventory;
    ProductAdapter_ViewProduct productAdapter_viewProduct;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_viewproduct);
        getSupportActionBar().setTitle("Products");
        // getSupportActionBar().sett
        getSupportActionBar().setBackgroundDrawable(new ColorDrawable(Color.parseColor("#00574B")));
        Integer[] imgList = {R.mipmap.nationaltomatoketchup, R.mipmap.nationaltomatoketchup, R.mipmap.nationaltomatoketchup};
        RecyclerView recyclerView = (RecyclerView) findViewById(R.id.viewProductRecycler);

        ListInventory = new ArrayList<Inventory_ModelClass>();
        productAdapter_viewProduct = new ProductAdapter_ViewProduct(ListInventory,getApplicationContext());
        recyclerView.setHasFixedSize(true);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        recyclerView.setAdapter(productAdapter_viewProduct);

        final ProgressDialog progressDialog = new ProgressDialog(this);
        progressDialog.setMessage("...loading");
        progressDialog.show();
        // constants_class.getInstance().specificClearCacheCalled=true;
        constants_class.getInstance().hitGetEndPoint(constants_class.getInstance().inventoryurl, getApplicationContext(), new constants_class.VolleyCallback() {
            @Override
            public void onSuccessResponse(JSONObject response) throws JSONException {

                JSONArray invenoryList = response.getJSONArray("inventoryList");
                for (int i = 0; i < invenoryList.length(); i++) {
                    JSONObject iterateObject = invenoryList.getJSONObject(i);
                    JSONObject inventoryObject = iterateObject.getJSONObject("inventory");
                    JSONObject productDetail = inventoryObject.getJSONObject("_products");
                    Inventory_ModelClass inventory = new Inventory_ModelClass(productDetail.getString("name"), productDetail.getString("category"), productDetail.getString("company"), productDetail.getInt("price"),
                            productDetail.getString("imageUrl"));
                    ListInventory.add(inventory);
                }

                productAdapter_viewProduct.notifyDataSetChanged();
                progressDialog.dismiss();

            }

        });

//        StringRequest jsonArrayRequest = new StringRequest(constants_class.getInstance().inventoryurl, new Response.Listener<String>() {
//            @Override
//            public void onResponse(String response) {
//
//                try {
//                    JSONObject jsonObject=new JSONObject(response);
//                    JSONArray invenoryList = jsonObject.getJSONArray("inventoryList");
//                    for (int i = 0; i < invenoryList.length(); i++) {
//                        JSONObject iterateObject = invenoryList.getJSONObject(i);
//                        JSONObject inventoryObject = iterateObject.getJSONObject("inventory");
//                        JSONObject productDetail = inventoryObject.getJSONObject("_products");
//                        Inventory_ModelClass inventory = new Inventory_ModelClass(productDetail.getString("name"), productDetail.getString("category"), productDetail.getString("company"), productDetail.getInt("price"));
//                        ListInventory.add(inventory);
//                    }
//                } catch (JSONException e) {
//                    e.printStackTrace();
//                }
//
//
//                productAdapter_viewProduct.notifyDataSetChanged();
//
//                progressDialog.dismiss();
//            }
//        }, new Response.ErrorListener() {
//            @Override
//            public void onErrorResponse(VolleyError error) {
//                Log.e("Volley", error.toString());
//                progressDialog.dismiss();
//            }
//        }) {
//            @Override
//            protected Response<String> parseNetworkResponse(NetworkResponse response) {
//                try {
//                    Cache.Entry cacheEntry = HttpHeaderParser.parseCacheHeaders(response);
//                    if (cacheEntry == null) {
//                        cacheEntry = new Cache.Entry();
//                    }
//                    final long cacheHitButRefreshed = 3 * 60 * 1000; // in 3 minutes cache will be hit, but also refreshed on background
//                    final long cacheExpired = 24*60*60 * 1000; // in 24 hours this cache entry expires completely
//                    long now = System.currentTimeMillis();
//                    final long softExpire = now + cacheHitButRefreshed;
//                    final long ttl = now + cacheExpired;
//                    cacheEntry.data = response.data;
//                    cacheEntry.softTtl = softExpire;
//                    cacheEntry.ttl = ttl;
//                    String headerValue;
//                    headerValue = response.headers.get("Date");
//                    if (headerValue != null) {
//                        cacheEntry.serverDate = HttpHeaderParser.parseDateAsEpoch(headerValue);
//                    }
//                    headerValue = response.headers.get("Last-Modified");
//                    if (headerValue != null) {
//                        cacheEntry.lastModified = HttpHeaderParser.parseDateAsEpoch(headerValue);
//                    }
//                    cacheEntry.responseHeaders = response.headers;
//                    final String jsonString = new String(response.data,
//                            HttpHeaderParser.parseCharset(response.headers));
//                    return Response.success(new String(jsonString), cacheEntry);
//                } catch (UnsupportedEncodingException e) {
//                    return Response.error(new ParseError(e));
//                }
//            }
//
//            @Override
//            protected void deliverResponse(String response) {
//
//
//                super.deliverResponse(response);
//            }
//
//            @Override
//            public void deliverError(VolleyError error) {
//                super.deliverError(error);
//            }
//
//            @Override
//            protected VolleyError parseNetworkError(VolleyError volleyError) {
//                return super.parseNetworkError(volleyError);
//            }
//        };
//        RequestQueue requestQueue = Volley.newRequestQueue(this);
//
//        requestQueue.add(jsonArrayRequest);
//

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        //return super.onCreateOptionsMenu(menu);
        getMenuInflater().inflate(R.menu.sync_searchmenu, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        switch (item.getItemId()) {
            case R.id.syncItem_syncsearchmenu:
                final ProgressDialog progressDialog = new ProgressDialog(this);
                ListInventory.clear();
                progressDialog.setMessage("...loading");
                progressDialog.show();
                constants_class.getInstance().specificClearCacheCalled = true;
                constants_class.getInstance().hitGetEndPoint(constants_class.getInstance().inventoryurl, getApplicationContext(), new constants_class.VolleyCallback() {
                    @Override
                    public void onSuccessResponse(JSONObject response) throws JSONException {

                        JSONArray invenoryList = response.getJSONArray("inventoryList");
                        for (int i = 0; i < invenoryList.length(); i++) {
                            JSONObject iterateObject = invenoryList.getJSONObject(i);
                            JSONObject inventoryObject = iterateObject.getJSONObject("inventory");
                            JSONObject productDetail = inventoryObject.getJSONObject("_products");
                            Inventory_ModelClass inventory = new Inventory_ModelClass(productDetail.getString("name"), productDetail.getString("category"), productDetail.getString("company"), productDetail.getInt("price"),
                                    productDetail.getString("imageUrl"));
                            ListInventory.add(inventory);
                        }

                        productAdapter_viewProduct.notifyDataSetChanged();
                        progressDialog.dismiss();

                    }

                });

        }
        return super.onOptionsItemSelected(item);
    }
}
