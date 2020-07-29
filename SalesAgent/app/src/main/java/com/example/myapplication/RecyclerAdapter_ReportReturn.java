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

public class RecyclerAdapter_ReportReturn extends RecyclerView.Adapter<RecyclerAdapter_ReportReturn.ViewHolder>  {
     Context context;
     String[] Maintitlelist;
     String[] Subtitlelist;
     Integer[] ImageList;
     String tw="lkjh";

    public RecyclerAdapter_ReportReturn(Context applicationContext, String[] maintitleList, String[] subtitleList, Integer[] imgList, String orderDeliveredActivity) {
        context=applicationContext;
        Maintitlelist=maintitleList;
        Subtitlelist=subtitleList;
        ImageList=imgList;
        tw=orderDeliveredActivity;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater=LayoutInflater.from(context);
        View convertView=inflater.inflate(R.layout.retailerdetail_customitem,parent,false);
        return new ViewHolder(convertView);
       // return null;
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {

        holder.MainTitle.setText(Maintitlelist[position]);
        holder.SubTitle.setText(Subtitlelist[position]);
        holder.imgView.setImageResource(ImageList[position]);
        holder.layout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent=new Intent(context,PaymentMethodsActivity.class);
                context.startActivity(intent);
            }
        });
    }

    @Override
    public int getItemCount() {
        return Maintitlelist.length;
    }


    public static class ViewHolder extends RecyclerView.ViewHolder{

        public TextView MainTitle;
        public TextView SubTitle;
        public ImageView imgView;
        public CardView layout;
        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            MainTitle = itemView.findViewById(R.id.shopName);
            SubTitle = itemView.findViewById(R.id.shopAddress);
            imgView = itemView.findViewById(R.id.shopkeeperImg);



        }
    }
}

