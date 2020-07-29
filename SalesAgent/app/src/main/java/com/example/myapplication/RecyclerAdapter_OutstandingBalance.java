package com.example.myapplication;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class RecyclerAdapter_OutstandingBalance extends RecyclerView.Adapter<RecyclerAdapter_OutstandingBalance.ViewHolder>  {
     Context context;
     ArrayList<CustomerOutstandingBalance_ModelClass> customerOutBalList;
     ArrayList<Customer_ModelClass> customerInfoList;
//     String[] Maintitlelist;
//     String[] Subtitlelist;
//     Integer[] ImageList;
//
//    public RecyclerAdapter_OutstandingBalance(Context applicationContext, String[] maintitleList, String[] subtitleList, Integer[] imgList) {
//        context=applicationContext;
//        Maintitlelist=maintitleList;
//        Subtitlelist=subtitleList;
//        ImageList=imgList;
//    }

    public RecyclerAdapter_OutstandingBalance(Context applicationContext, ArrayList<CustomerOutstandingBalance_ModelClass> listCustomerOutstandingBalance, ArrayList<Customer_ModelClass> customerList) {
    context=applicationContext;
    customerOutBalList=listCustomerOutstandingBalance;
        customerInfoList=customerList;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater=LayoutInflater.from(context);
        View convertView=inflater.inflate(R.layout.customlayout_outstandingbalance,parent,false);
        return new ViewHolder(convertView);
       // return null;
    }

    @Override
    public void onBindViewHolder(@NonNull final ViewHolder holder, final int position) {

//      holder.mainTitle.setText(Maintitlelist[position]);
//        holder.subTitle.setText(Subtitlelist[position]);
        holder.customerNamView.setText(customerOutBalList.get(position).customername);
        holder.totalPaymentView.setText(Integer.toString(customerOutBalList.get(position).totalAmount));
        int remainingAmount=customerOutBalList.get(position).totalAmount-customerOutBalList.get(position).amountPaid;
        holder.remainingAmountView.setText(Integer.toString(customerOutBalList.get(position).amountPaid));
        holder.amountPaidView.setText(Integer.toString(customerOutBalList.get(position).amountPaid));
        holder.remainingAmountView.setText(Integer.toString(remainingAmount));
        holder.layout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                List<Integer> ListagentOrderStatusIds=new ArrayList<>();
                for(Customer_ModelClass customer_modelClass:customerInfoList){  //filter agentOrderStatusId  list  of selected  customer
                    if(customer_modelClass.name.equals(customerOutBalList.get(position).customername)){
                        ListagentOrderStatusIds.add(customer_modelClass.agentOrderStatusId);
                    }
                }
                Intent intent=new Intent(context,PaymentMethodsActivity.class);
                intent.putExtra("agentOrderStatusIdsList", (Serializable) ListagentOrderStatusIds);
                intent.putExtra("parentActivity", "outsandingBalanceActivity");
               intent.putExtra("amounttoPay", holder.remainingAmountView.getText());
                context.startActivity(intent);
            }
        });
    }

    @Override
    public int getItemCount() {
        return customerOutBalList.size();
    }


    public static class ViewHolder extends RecyclerView.ViewHolder{


        public TextView customerNamView;
        public TextView amountPaidView;
        public TextView totalPaymentView;
        public TextView remainingAmountView;
        public CardView layout;
        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            customerNamView=itemView.findViewById(R.id.custN_outstnd);
            totalPaymentView=itemView.findViewById(R.id.totalbalanceV_outstnd);
            remainingAmountView=itemView.findViewById(R.id.amountRemV_outstnd);
            amountPaidView=itemView.findViewById(R.id.amountPaidV_outstnd);
            layout=itemView.findViewById(R.id.outstandBal_customParent);



        }
    }
}

