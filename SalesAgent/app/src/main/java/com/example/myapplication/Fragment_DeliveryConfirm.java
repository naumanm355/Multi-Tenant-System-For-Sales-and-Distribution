package com.example.myapplication;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentTransaction;

import com.mikhaellopez.circularimageview.CircularImageView;

import org.json.JSONException;
import org.json.JSONObject;

public class Fragment_DeliveryConfirm extends Fragment {
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        // super.onCreateView(inflater, container, savedInstanceState);
        View view = inflater.inflate(R.layout.fragment_orderdelivery_confirm, container, false);
        Toolbar toolbar=(Toolbar) view.findViewById(R.id.deliverconfirmtoolbar);
        //  toolbar.setTitle("mbmf");
        ((AppCompatActivity)getActivity()).setSupportActionBar(toolbar);
        ((AppCompatActivity)getActivity()).getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        ((AppCompatActivity)getActivity()).getSupportActionBar().setDisplayShowHomeEnabled(true);

        Fragment_googlemap fragment_googlemap=new Fragment_googlemap();
        FragmentTransaction transaction=getChildFragmentManager().beginTransaction();
        transaction.replace(R.id.mapFrameLayout, fragment_googlemap);
        transaction.commit();

        View retailerDetailView = view.findViewById(R.id.deliveryconfirmRetailorDetail);
        TextView shopName = (TextView) retailerDetailView.findViewById(R.id.shopName);
        TextView shopAddress = (TextView) retailerDetailView.findViewById(R.id.shopAddress);
        TextView orderType=(TextView)  retailerDetailView.findViewById(R.id.ordertypetxt);
        CircularImageView shopkeeperImg = (CircularImageView) retailerDetailView.findViewById(R.id.shopkeeperImg);
        shopName.setText(OrderManagement_ModelClass.customer_modelClass.name);
        shopAddress.setText(OrderManagement_ModelClass.customer_modelClass.address);
        shopkeeperImg.setImageResource(R.mipmap.first);
        orderType.setText(OrderManagement_ModelClass.customer_modelClass.customerordertype);
        View billDetailView=view.findViewById(R.id.deliveryconfirmbillDetail);

        TextView totalItemView=(TextView) billDetailView.findViewById(R.id.viewCart_totalItemCount);
        TextView subtotalView=(TextView) billDetailView.findViewById(R.id.viewCart_subTotal);
        TextView totalView=(TextView) billDetailView.findViewById(R.id.viewCart_Total);
        totalItemView.setText(Integer.toString(OrderManagement_ModelClass.orderBillDetail_modelClass.totalitem));
        subtotalView.setText(Integer.toString(OrderManagement_ModelClass.orderBillDetail_modelClass.subtotal));
        totalView.setText(Integer.toString(OrderManagement_ModelClass.orderBillDetail_modelClass.subtotal));


        navigateOrderDeliverySuccess(view,OrderManagement_ModelClass.customer_modelClass.agentOrderStatusId);
        return view;
    }

    public void navigateOrderDeliverySuccess(final View view,int agentOrderStatusId) {
        final String url="http://sndwebapi.spikotech.com/api/OrderManagement/"+agentOrderStatusId;
     //   Toast.makeText(getContext(), "delivery put call" + url, Toast.LENGTH_SHORT).show();
        Button btn = (Button) view.findViewById(R.id.confirmDeliveryBtn);
        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                constants_class.getInstance().hitPutEndPoint(url, getContext(), new constants_class.VolleyCallback() {
                    @Override
                    public void onSuccessResponse(JSONObject response) {
                  //      Toast.makeText(getContext(), "confirm call put response" + response, Toast.LENGTH_SHORT).show();
                        Intent intent = new Intent(getContext(), OrderDeliverySuccessActivity.class);
                        getContext().startActivity(intent);
                    }
                });

            }
        });


    }

}
