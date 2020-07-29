package com.example.myapplication;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

public class RecyclerAdapter_Detail_DeliveredOrder extends RecyclerView.Adapter<RecyclerAdapter_Detail_DeliveredOrder.ViewHolder> {
    //public  String[] MaintitleList;
//  public  String[] SubtitleList;
    public ArrayList<Inventory_ModelClass> billItems;


    public RecyclerAdapter_Detail_DeliveredOrder(ArrayList<Inventory_ModelClass> billProduct) {

        billItems = billProduct;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(parent.getContext());
        View convertView = inflater.inflate(R.layout.customdetail_deliveredorder, parent, false);
        return new ViewHolder(convertView);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        holder.name.setText(billItems.get(position).name);
        holder.category.setText(billItems.get(position).category);
        holder.price.setText(Integer.toString(billItems.get(position).price));
        holder.qty.setText(Integer.toString(billItems.get(position).orderqty));
        holder.subtotal.setText(Integer.toString(billItems.get(position).subtotal));
    }

    @Override
    public int getItemCount() {
        return billItems.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        public TextView name;
        public TextView category;
        public TextView qty;
        public TextView price;
        public TextView subtotal;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            name = itemView.findViewById(R.id.productNameV_detail_deliveredorder);
            category = itemView.findViewById(R.id.productTypeV_detail_deliveredorder);
            qty = itemView.findViewById(R.id.productqtyV_detail_deliveredorder);
            price = itemView.findViewById(R.id.productPriceV_detail_deliveredorder);
            subtotal = itemView.findViewById(R.id.productsubtotV_detail_deliveredorder);
        }
    }
}
