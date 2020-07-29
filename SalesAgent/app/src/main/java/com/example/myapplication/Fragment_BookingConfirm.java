package com.example.myapplication;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentTransaction;

import com.mikhaellopez.circularimageview.CircularImageView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class Fragment_BookingConfirm extends Fragment {
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_orderbooking_confirm, container, false);
        try {
            Fragment_googlemap fragment_googlemap = new Fragment_googlemap();
            FragmentTransaction transaction = getChildFragmentManager().beginTransaction();
            transaction.replace(R.id.mapFrameLayout, fragment_googlemap);
            transaction.commit();


            View retailerDetailView = view.findViewById(R.id.bookingconfirmretailorDetail);
            TextView shopName = (TextView) retailerDetailView.findViewById(R.id.shopName);
            TextView shopAddress = (TextView) retailerDetailView.findViewById(R.id.shopAddress);
            TextView ordertype = (TextView) retailerDetailView.findViewById(R.id.ordertypetxt);
            CircularImageView shopkeeperImg = (CircularImageView) retailerDetailView.findViewById(R.id.shopkeeperImg);
            shopName.setText(OrderManagement_ModelClass.customer_modelClass.name);
            shopAddress.setText(OrderManagement_ModelClass.customer_modelClass.address);
            shopkeeperImg.setImageResource(R.mipmap.first);
            ordertype.setText(OrderManagement_ModelClass.customer_modelClass.customerordertype);


            View billdetailView = (View) view.findViewById(R.id.bookingconfirmbillDetail);


            TextView totalItem = (TextView) billdetailView.findViewById(R.id.viewCart_totalItemCount);
            totalItem.setText(Integer.toString(OrderManagement_ModelClass.bookingCart_addedproduct.size()));
            TextView subTotalView = (TextView) billdetailView.findViewById(R.id.viewCart_subTotal);
            TextView TotalView = (TextView) billdetailView.findViewById(R.id.viewCart_Total);
            subTotalView.setText(Integer.toString(OrderManagement_ModelClass.orderBillDetail_modelClass.subtotal));
            TotalView.setText(Integer.toString(OrderManagement_ModelClass.orderBillDetail_modelClass.total));

            ;


            try {

                confirmBooking(view, this.getArguments().getInt("agentOrderStatusId", 0));
            } catch (JSONException e) {
                e.printStackTrace();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return view;
        // return super.onCreateView(inflater, container, savedInstanceState);
    }

    public void confirmBooking(View view, final int agentOrderStatusId) throws JSONException {
        Button button = (Button) view.findViewById(R.id.confirmBookingBtn);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Date date = Calendar.getInstance().getTime();
                SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                String currentDateTime = df.format(date);
                JSONArray postArray = new JSONArray();
                for (int i = 0; i < OrderManagement_ModelClass.bookingCart_addedproduct.size(); i++) {
                    JSONObject inventoryObject = new JSONObject();
                    Inventory_ModelClass iterativeObj = OrderManagement_ModelClass.bookingCart_addedproduct.get(i);

                    try {
                        inventoryObject.put("AgentOrderStatusId", agentOrderStatusId);
                        inventoryObject.put("InventoryId", iterativeObj.inveId);
                        inventoryObject.put("QTY", iterativeObj.orderqty);
                        inventoryObject.put("OrderDate", currentDateTime);
                        postArray.put(inventoryObject);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }


                }


                JSONObject jsonBody = new JSONObject();
                try {
                    jsonBody.put("ListOrderProduct", postArray);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                final String requestBody = jsonBody.toString();
                constants_class.getInstance().hitPostEndPoint(constants_class.getInstance().placeorderurl, requestBody, getContext(),
                        new constants_class.VolleyCallback() {
                            @Override
                            public void onSuccessResponse(JSONObject response) throws JSONException {
                               Toast.makeText(getContext(), "booking success response" + response, Toast.LENGTH_SHORT).show();

                            }
                        });
                //now destroy OrderManagement_ModelClass
                OrderManagement_ModelClass.bookingCart_addedproduct.removeAll(OrderManagement_ModelClass.bookingCart_addedproduct);
                OrderManagement_ModelClass.customer_modelClass = null;
                OrderManagement_ModelClass.orderBillDetail_modelClass = null;
            }
        });


    }

}