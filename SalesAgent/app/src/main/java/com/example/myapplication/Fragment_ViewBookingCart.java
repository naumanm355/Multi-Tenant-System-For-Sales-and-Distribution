package com.example.myapplication;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class Fragment_ViewBookingCart extends Fragment {
    public Fragment_ViewBookingCart() {

    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_viewbookingcart, container, false);
        try {
      //      Toast.makeText(getContext(), "mn " + this.getArguments().getInt("agentOrderStatusId", 0), Toast.LENGTH_SHORT).show();
            View billdetailView = (View) view.findViewById(R.id.viewCart_billDetailCard);


            TextView totalItem = (TextView) billdetailView.findViewById(R.id.viewCart_totalItemCount);
            totalItem.setText(Integer.toString(OrderManagement_ModelClass.bookingCart_addedproduct.size()));
            TextView subTotalView = (TextView) billdetailView.findViewById(R.id.viewCart_subTotal);
            TextView TotalView = (TextView) billdetailView.findViewById(R.id.viewCart_Total);

            int subTotal = 0, total = 0;
            for (int i = 0; i < OrderManagement_ModelClass.bookingCart_addedproduct.size(); i++) {
                subTotal += OrderManagement_ModelClass.bookingCart_addedproduct.get(i).subtotal;
//
//            JSONObject inventoryObject = new JSONObject();
//            Inventory_ModelClass iterativeInv = OrderManagement_ModelClass.bookingCart_addedproduct.get(i);
//            try {
//                inventoryObject.put("InventoryId", iterativeInv.inveId);
//            //    inventoryObject.put("InventoryId", iterativeInv.inveId);
//            } catch (JSONException e) {
//                e.printStackTrace();
//            }
            }
            OrderManagement_ModelClass.orderBillDetail_modelClass.totalitem = OrderManagement_ModelClass.bookingCart_addedproduct.size();
            OrderManagement_ModelClass.orderBillDetail_modelClass.subtotal = subTotal;
            OrderManagement_ModelClass.orderBillDetail_modelClass.total = subTotal;
            subTotalView.setText(Integer.toString(subTotal));
            TotalView.setText(Integer.toString(subTotal));

            Integer[] imgList = {R.mipmap.first, R.mipmap.first, R.mipmap.first, R.mipmap.first, R.mipmap.first, R.mipmap.first, R.mipmap.first, R.mipmap.first, R.mipmap.first, R.mipmap.first};
            RecyclerView recyclerView = (RecyclerView) view.findViewById(R.id.viewProduct_CartRecycler);
            ProductAdapter_BookingCart productAdapter_bookingCart = new ProductAdapter_BookingCart(getContext(), imgList, "viewCartActivity");
            recyclerView.setHasFixedSize(true);
            recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
            recyclerView.setAdapter(productAdapter_bookingCart);

//        try {
//            confirmBooking();
//        } catch (JSONException e) {
//            e.printStackTrace();
//        }
        }
        catch (Exception e){
            e.printStackTrace();
        }

        return view;
    }

//    public void confirmBooking() throws JSONException {
//        JSONArray postArray = new JSONArray();
//        for (int i = 0; i < OrderManagement_ModelClass.bookingCart_addedproduct.size(); i++) {
//            JSONObject inventoryObject = new JSONObject();
//            Inventory_ModelClass iterativeObj = OrderManagement_ModelClass.bookingCart_addedproduct.get(i);
//            inventoryObject.put("AgentOrderStatusId", this.getArguments().getInt("agentOrderStatusId", 0));
//            inventoryObject.put("InventoryId", iterativeObj.inveId);
//            inventoryObject.put("QTY", iterativeObj.orderqty);
//            inventoryObject.put("OrderDate", "2018-03-29T13:34:00.000");
//            postArray.put(inventoryObject);
//        }
//
//        JSONObject jsonBody = new JSONObject();
//        jsonBody.put("ListOrderProduct", postArray);
//        final String requestBody = jsonBody.toString();
//        constants_class.getInstance().hitPostEndPoint(constants_class.getInstance().placeorderurl, requestBody, getContext(),
//                new constants_class.VolleyCallback() {
//                    @Override
//                    public void onSuccessResponse(JSONObject response) throws JSONException {
//                        Toast.makeText(getContext(), "booking success response" + response, Toast.LENGTH_SHORT).show();
//
//                    }
//                });
//
//    }

}
