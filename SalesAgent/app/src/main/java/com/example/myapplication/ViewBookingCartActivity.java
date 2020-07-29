package com.example.myapplication;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Locale;

public class ViewBookingCartActivity extends AppCompatActivity {
    public JSONArray jsonArray;
    final ArrayList<Inventory_ModelClass> inventoryList = new ArrayList<>();

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activitycart_viewcart);
        getSupportActionBar().setTitle("Booking Cart");
        Intent intent = getIntent();
      //  Toast.makeText(getApplicationContext(), "in viewcrt after return " + intent.getIntExtra("agentOrderStatusId", 0), Toast.LENGTH_SHORT).show();
        Integer[] imgList = {R.mipmap.first, R.mipmap.first, R.mipmap.first, R.mipmap.first, R.mipmap.first};
        RecyclerView recyclerView = (RecyclerView) findViewById(R.id.viewProduct_CartRecycler);

        final ProductAdapter_BookingCart productAdapter_bookingCart = new ProductAdapter_BookingCart(getApplicationContext(), inventoryList,
                imgList, "viewCartActivity_ReturnOrder");
        recyclerView.setHasFixedSize(true);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        recyclerView.setAdapter(productAdapter_bookingCart);


        final TextView totalItem = (TextView) findViewById(R.id.viewCart_totalItemCount);

        final TextView subTotalView = (TextView) findViewById(R.id.viewCart_subTotal);
        final TextView TotalView = (TextView) findViewById(R.id.viewCart_Total);


        final JSONObject jsonObject = new JSONObject();
        try {
            jsonObject.put("AgentOrderStatusId", intent.getIntExtra("agentOrderStatusId", 0));
        } catch (JSONException e) {
            e.printStackTrace();
        }

        constants_class.getInstance().hitPostEndPoint(constants_class.getInstance().deliveredOrderDetailurl, jsonObject.toString(), getApplicationContext(),
                new constants_class.VolleyCallback() {
                    @Override
                    public void onSuccessResponse(JSONObject response) throws JSONException {

                        int subTotal = 0, total = 0;
                        JSONArray jsonArray = response.getJSONArray("orderDetailList");
                        Toast.makeText(getApplicationContext(), "response from order detail is" + jsonArray, Toast.LENGTH_SHORT).show();
                        for (int i = 0; i < jsonArray.length(); i++) {
                            JSONObject iterativeObject = jsonArray.getJSONObject(i);
                            //  JSONArray orderDetiailList=iterativeObject.getJSONArray("orderDetailList");
                            Inventory_ModelClass inventory_modelClass = new Inventory_ModelClass();
                            inventory_modelClass.name = iterativeObject.getString("name");
                            inventory_modelClass.category = iterativeObject.getString("category");
                            inventory_modelClass.company = iterativeObject.getString("company");
                            inventory_modelClass.price = iterativeObject.getInt("inv_price");
                            inventory_modelClass.orderqty = iterativeObject.getInt("qty");
                            inventory_modelClass.subtotal = inventory_modelClass.price * inventory_modelClass.orderqty;
                            inventory_modelClass.inveId = iterativeObject.getInt("inventoryId");
                            inventory_modelClass.orderProductId = iterativeObject.getInt("orderproductId");

                            subTotal += inventory_modelClass.subtotal;
                            inventoryList.add(inventory_modelClass);
                        }
                        //        Toast.makeText(getApplicationContext(),"length iss"+inventoryList.size(),Toast.LENGTH_SHORT).show();
                        //   try {
                        productAdapter_bookingCart.notifyDataSetChanged();


                        totalItem.setText(Integer.toString(jsonArray.length()));
                        subTotalView.setText(Integer.toString(subTotal));
                        TotalView.setText(Integer.toString(subTotal));
                    }
                });


//
//        for (int i = 0; i < OrderManagement_ModelClass.bookingCart_addedproduct.size(); i++) {
//            subTotal += OrderManagement_ModelClass.bookingCart_addedproduct.get(i).subtotal;
//
//            JSONObject inventoryObject=new JSONObject();
//            Inventory_ModelClass iterativeInv=OrderManagement_ModelClass.bookingCart_addedproduct.get(i);
//            try {
//                inventoryObject.put("InventoryId",iterativeInv.inveId);
//
//            } catch (JSONException e) {
//                e.printStackTrace();
//            }
//        }
//        subTotalView.setText(Integer.toString(subTotal));
//        TotalView.setText(Integer.toString(subTotal));

//        String[] maintitleList = {
//                "Title 1", "Title 2",
//                "Title 3", "Title 4",
//                "Title 5"
//        };
//
//        String[] subtitleList = {
//                "Sub Title 1", "Sub Title 2",
//                "Sub Title 3", "Sub Title 4",
//                "Sub Title 5"
//        };

//
    }

    public void viewCart_CancelBtn(View v) {

        Intent intent = new Intent(this, LoginActivity.class);
        startActivity(intent);

    }

//    public boolean isExist(Inventory_ModelClass inventory_Prv) {
//        boolean isExist = false;
//        Toast.makeText(getApplicationContext(), "retain size" + OrderManagement_ModelClass.bookingCart_addedproduct.size(), Toast.LENGTH_SHORT).show();
//        for (Inventory_ModelClass inventory_Up : OrderManagement_ModelClass.bookingCart_addedproduct) {
//            if (inventory_Prv.name.equals(inventory_Up.name) && inventory_Prv.category.equals(inventory_Up.category) &&
//                    inventory_Prv.company.equals(inventory_Up.company)) {
//                //       OrderManagement_ModelClass.bookingCart_addedproduct.add(inventory_Prv);
//                isExist = true;
//                // Toast.makeText(getApplicationContext(),"index inventory"+inventory_Prv.name,Toast.LENGTH_SHORT).show();
//            }
//        }
//        return isExist;
//    }

    public void viewCart_ConfirmBtn(View v) throws JSONException {
        //  Intent getIntent = getIntent();
        //     SimpleDateFormat dateFormat=new SimpleDateFormat("YYYY-MM-ddTHH:mm:ss", Locale.CHINA); //+dateFormat.format(new Date())
        //   Toast.makeText(getApplicationContext(),"current date is "+dateFormat.format(new Date()),Toast.LENGTH_SHORT).show();

        //check if item not update then retain its quantity

//        if (OrderManagement_ModelClass.bookingCart_addedproduct.size() < inventoryList.size()) {
//            for (Inventory_ModelClass inventory_Prv : inventoryList) {
//                if (!isExist(inventory_Prv)) {
//                    OrderManagement_ModelClass.bookingCart_addedproduct.add(inventory_Prv);
//                }
//            }aaaaaaaaaaaaaaaaaaaaaa
//        }
//Toast.makeText(getApplicationContext(),"size ja is"+OrderManagement_ModelClass.bookingCart_addedproduct.get(2).name,Toast.LENGTH_SHORT).show();
            JSONArray postArray = new JSONArray();
            for (int i = 0; i < OrderManagement_ModelClass.bookingCart_addedproduct.size(); i++) {
                JSONObject inventoryObject = new JSONObject();
                Inventory_ModelClass iterativeObj = OrderManagement_ModelClass.bookingCart_addedproduct.get(i);
                inventoryObject.put("AgentOrderStatusId", getIntent().getIntExtra("agentOrderStatusId", 0));
                inventoryObject.put("InventoryId", iterativeObj.inveId);
                inventoryObject.put("QTY", iterativeObj.orderqty);
                inventoryObject.put("OrderDate", "2018-03-29T13:34:00.000");
                inventoryObject.put("Id", iterativeObj.orderProductId);
                postArray.put(inventoryObject);
            }
//
            JSONObject jsonBody = new JSONObject();
            jsonBody.put("ListOrderProduct", postArray);
            final String requestBody = jsonBody.toString();
            constants_class.getInstance().hitPostEndPoint(constants_class.getInstance().returnOrderurl, requestBody, getApplicationContext(),
                    new constants_class.VolleyCallback() {
                        @Override
                        public void onSuccessResponse(JSONObject response) throws JSONException {
                     //       Toast.makeText(getApplicationContext(), "return update success response" + response, Toast.LENGTH_SHORT).show();

                            Intent intent = new Intent(getApplicationContext(), LoginActivity.class);
                            startActivity(intent);
                        }
                    });




    }

}
