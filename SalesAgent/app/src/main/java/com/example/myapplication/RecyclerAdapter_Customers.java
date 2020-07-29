package com.example.myapplication;

import android.content.Context;
import android.content.Intent;
import android.os.Parcelable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.io.Serializable;
import java.util.ArrayList;

public class RecyclerAdapter_Customers extends RecyclerView.Adapter<RecyclerAdapter_Customers.ViewHolder> {
    //  String[] MainTitleList, SubTitleList;
    Integer[] ImageList;
    Context context;
    String nextTargetActivity = "kmjhg";
    ArrayList<Customer_ModelClass> customer_List;
    Boolean isProductiveFragment = false;

//    public RecyclerAdapter_Customers(Context context, String[] maintitleList, String[] subtitleList, Integer[] imgList, String orderDeliveryMain) {
//
//
//        this.MainTitleList = maintitleList;
//        this.SubTitleList = subtitleList;
//        this.ImageList = imgList;
//        this.context = context;
//        nextTargetActivity = orderDeliveryMain;
//    }
//
//    public RecyclerAdapter_Customers(Context context, String[] maintitleList, String[] subtitleList, Integer[] imgList) {
//
//
//        this.MainTitleList = maintitleList;
//        this.SubTitleList = subtitleList;
//        this.ImageList = imgList;
//        this.context = context;
//
//    }

//    public RecyclerAdapter_Customers(Context context, ArrayList<Customer_ModelClass> pendingCustomerList,Integer[] ImageList) {
//        this.context=context;
//       // customer_List=pendingCustomerList;
//
//    }

    public RecyclerAdapter_Customers(Context context, ArrayList<Customer_ModelClass> pendingCustomerList, Integer[] ImageList, String targetActivity) {
        this.context = context;
        //   customer_List=pendingCustomerList;
        nextTargetActivity = targetActivity;
        this.ImageList = ImageList;
        //  MainTitleList=MainArray;
        //  SubTitleList=Subarray;
        customer_List = pendingCustomerList;
    }

    public RecyclerAdapter_Customers(Context context, ArrayList<Customer_ModelClass> pendingCustomerList, Integer[] ImageList, String targetActivity, Boolean isProductiveFragment) {
        this.context = context;
        //   customer_List=pendingCustomerList;
        nextTargetActivity = targetActivity;
        this.ImageList = ImageList;
        //  MainTitleList=MainArray;
        //  SubTitleList=Subarray;
        customer_List = pendingCustomerList;
        this.isProductiveFragment = isProductiveFragment;
    }

    @Override
    public RecyclerAdapter_Customers.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(parent.getContext());
        View convertView = inflater.inflate(R.layout.retailerdetail_customitem, parent, false);
        ViewHolder viewHolder = new ViewHolder(convertView);
        return viewHolder;
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, final int position) {

        holder.MainTitle.setText(customer_List.get(position).name);
        holder.SubTitle.setText(customer_List.get(position).address);
        holder.imgView.setImageResource(ImageList[position]);

        if (nextTargetActivity.equals("StartDay")) { //show type if start day
            holder.OrderTypeView.setText(customer_List.get(position).customerordertype);
        }
        else {
            holder.OrderTypeView.setText(""); //no need to show for other like booking,deliver
        }
     //     Toast.makeText(context, "You clicked" +customer_List.get(position).customerordertype, Toast.LENGTH_SHORT).show();
        if (!isProductiveFragment) {  //disable clicking for productive fragment

            holder.layout.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
//
//
                    if (customer_List.get(position).customerordertype.equals("Booking")) {
                        Toast.makeText(context, "You clicked item" +nextTargetActivity, Toast.LENGTH_SHORT).show();
                        try {
                        customer_List.get(position).customerordertype = "";

                            OrderManagement_ModelClass.customer_modelClass = customer_List.get(position);

                            Intent intent = new Intent(context, OrderBooking_MainActivity.class);
                            intent.putExtra("agentOrderStatusId", customer_List.get(position).agentOrderStatusId);
                            context.startActivity(intent);
                        }
                        catch (Exception ex){
                            Toast.makeText(context, "error in booking" +ex.getMessage(), Toast.LENGTH_SHORT).show();
                        }


                    } else if (customer_List.get(position).customerordertype.equals("Delivery")) {  //else if (nextTargetActivity.equals("Delivery")) {
                        customer_List.get(position).customerordertype = "";

                        try {
                            OrderManagement_ModelClass.customer_modelClass = customer_List.get(position);
                            Toast.makeText(context, "nkf" + nextTargetActivity, Toast.LENGTH_SHORT).show();
                            Intent intent = new Intent(context, OrderDeliveryMainActivity.class);
                            //    intent.putExtra("customerObject",customer_List.get(position));
                            intent.putExtra("agentOrderStatusId", customer_List.get(position).agentOrderStatusId);
                            context.startActivity(intent);
                        } catch (Exception ex) {
                            Toast.makeText(context, "errroro" + ex.getMessage(), Toast.LENGTH_SHORT).show();
                        }
                    } else if (nextTargetActivity.equals("OrderDeliveredActivity")) {
                        //     customer_List.get(position).customerordertype="";
                        Intent intent = new Intent(context, OrderDeliveredActivity.class);
                        intent.putExtra("agentcustomerId", customer_List.get(position).agentCustomerId);
                        context.startActivity(intent);
                    } else if (customer_List.get(position).customerordertype.equals("Return")) {  //as to return order booking edit is perform

                        Intent intent = new Intent(context, ViewBookingCartActivity.class);
                        intent.putExtra("agentOrderStatusId", customer_List.get(position).agentOrderStatusId);
                        context.startActivity(intent);
                    } else {
                        Toast.makeText(context, "none " + nextTargetActivity, Toast.LENGTH_SHORT).show();
                    }
//                    } catch (Exception ex) {

                    // }
                }

            });


        }
    }

    @Override
    public int getItemCount() {
        return customer_List.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        public TextView MainTitle;
        public TextView SubTitle;
        public ImageView imgView;
        public LinearLayout layout;
        public TextView OrderTypeView;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            MainTitle = itemView.findViewById(R.id.shopName);
            SubTitle = itemView.findViewById(R.id.shopAddress);
            imgView = itemView.findViewById(R.id.shopkeeperImg);
            OrderTypeView = itemView.findViewById(R.id.ordertypetxt);
            layout = itemView.findViewById(R.id.shopDetailitemLayout);
        }
    }
}
