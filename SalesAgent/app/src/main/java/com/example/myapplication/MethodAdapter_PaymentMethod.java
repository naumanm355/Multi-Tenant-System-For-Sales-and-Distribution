package com.example.myapplication;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

import com.mikhaellopez.circularimageview.CircularImageView;

import java.util.ArrayList;

public class MethodAdapter_PaymentMethod extends RecyclerView.Adapter<MethodAdapter_PaymentMethod.ViewHolder> {

    String[] MainTitleList;
    Integer[] ImageList;
    Context context;
    ArrayList<Integer> agentOrderStatusList;
    public MethodAdapter_PaymentMethod(Context context, String[] maintitleList, Integer[] imgList) {
this.MainTitleList=maintitleList;
        this.ImageList=imgList;
        this.context=context;
}
    public MethodAdapter_PaymentMethod(Context context, String[] maintitleList, Integer[] imgList,  ArrayList<Integer>  agentOrderStatusList) {
        this.MainTitleList=maintitleList;
        this.ImageList=imgList;
        this.context=context;
        this.agentOrderStatusList=agentOrderStatusList;
    }



    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater=LayoutInflater.from(parent.getContext());
        View  convertView =inflater.inflate(R.layout.paymentmethod_customitem,parent,false);
        MethodAdapter_PaymentMethod.ViewHolder viewHolder=new MethodAdapter_PaymentMethod.ViewHolder(convertView);
        return viewHolder;
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, final int position) {

        holder.MainTitle.setText(MainTitleList[position]);

        holder.imgView.setImageResource(ImageList[position]);
        holder.cardView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(context,"You success",Toast.LENGTH_SHORT).show();
                Intent intent=new Intent(context, Activity_PayBillAmount.class);
                try {
                    if (agentOrderStatusList.size() > 0) {
                        intent.putExtra("parentActivity", "outstandingBalancectivity");
                        intent.putExtra("agentOrderStatusList", agentOrderStatusList);
                    }
                }catch (Exception ex){

                }
                context.startActivity(intent);
            }
        });
    }

    @Override
    public int getItemCount() {
        return MainTitleList.length;
    }


    public static class ViewHolder  extends RecyclerView.ViewHolder{
        public TextView MainTitle;
       public CircularImageView imgView;
        public CardView cardView;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            MainTitle=itemView.findViewById(R.id.paymentMethodName);
           imgView=itemView.findViewById(R.id.paymentMethodImg);
            cardView=itemView.findViewById(R.id.paymentMethodCardView);

        }
    }


}
