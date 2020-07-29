package com.example.myapplication;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

public class RecyclerAdapter_ShowDeliveredOrders extends RecyclerView.Adapter<RecyclerAdapter_ShowDeliveredOrders.ViewHolder> {
    String[] MainTitleList, SubTitleList;
    ArrayList<OrderBillDetail_ModelClass> Orderbill_List;
    Context context;
//    public RecyclerAdapter_ShowDeliveredOrders(Context applicationContext, String[] maintitleList, String[] subtitleList) {
//        context=applicationContext;
//        MainTitleList=maintitleList;
//        SubTitleList=subtitleList;
//
//    }

    public RecyclerAdapter_ShowDeliveredOrders(Context applicationContext, ArrayList<OrderBillDetail_ModelClass> orderbill_List) {
    this.context=applicationContext;
        this.Orderbill_List=orderbill_List;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater=LayoutInflater.from(context);
        View convertView =inflater.inflate(R.layout.customitem_deliveredorder,parent,false);

        return new ViewHolder(convertView);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, final int position) {
       holder.orderdate.setText(Orderbill_List.get(position).orderdate);
        holder.subtotal.setText(Integer.toString(Orderbill_List.get(position).subtotal));
        holder.totalitem.setText(Integer.toString(Orderbill_List.get(position).totalitem));
        holder.layout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent=new Intent(context,DeliveredOrder_DetailActivity.class);
                intent.putExtra("agentOrderStatusId",Orderbill_List.get(position).agentOrderStatusId);
                context.startActivity(intent);
            }
        });

    }

    @Override
    public int getItemCount() {
        return Orderbill_List.size();
    }

    public  static class ViewHolder extends RecyclerView.ViewHolder{
         public    TextView orderdate;
         public TextView totalitem;
         public TextView subtotal;
       // public     TextView Subtitle;
        public CardView layout;
        public ViewHolder(@NonNull View itemView) {
            super(itemView);
         //   Maintitle=itemView.findViewById(R.id.orderIdV_deliveredorder);
            orderdate=itemView.findViewById(R.id.orderDateV_deliveredorder);
            totalitem=itemView.findViewById(R.id.orderItemV_deliveredorder);
            subtotal=itemView.findViewById(R.id.orderPaymentV_deliveredorder);
            layout=itemView.findViewById(R.id.deliveredorderitem_mainlayout);

        }
    }
}
