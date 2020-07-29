package com.example.myapplication;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.mikhaellopez.circularimageview.CircularImageView;

import java.util.ArrayList;

public class ProductAdapter_DeliveryPreview extends RecyclerView.Adapter<ProductAdapter_DeliveryPreview.ViewHolder> {
    // String[] MainTitleList,SubTitleList;
    ArrayList<Inventory_ModelClass> InventoryList;
    Integer[] ImageList;
    Context context;
//    public ProductAdapter_DeliveryPreview(Context applicationContext, String[] mainTitleList, String[] subTitleList, Integer[] imageList){
//        MainTitleList=mainTitleList;
//        SubTitleList=subTitleList;
//        ImageList=imageList;
//        context=applicationContext;
//    }

    public ProductAdapter_DeliveryPreview(Context context, ArrayList<Inventory_ModelClass> inventoryList, Integer[] imgList) {
        this.context = context;
        InventoryList = inventoryList;
        ImageList = imgList;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(parent.getContext());
        View convertView = inflater.inflate(R.layout.productdelivery_customitem, parent, false);
        ViewHolder viewHolder = new ViewHolder(convertView);
        return viewHolder;
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, final int position) {
        //   holder.productName.setText(MainTitleList[position]);
        //   holder.productBrand.setText(SubTitleList[position]);

        holder.productName.setText(InventoryList.get(position).name);
        holder.productBrand.setText(InventoryList.get(position).company);
        holder.productQty.setText(Integer.toString(InventoryList.get(position).orderqty));
        holder.productImg.setImageResource(ImageList[position]);
//        holder.layout.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                Toast.makeText(context,"You clicked item having Shop name"+MainTitleList[position],Toast.LENGTH_SHORT).show();
//                Intent intent=new Intent(context, LoginActivity.class);
//                context.startActivity(intent);
//            }
//        });
    }


    @Override
    public int getItemCount() {
        return InventoryList.size();
    }

    public static class ViewHolder extends RecyclerAdapter_Customers.ViewHolder {
        public TextView productName;
        public TextView productBrand;
        public TextView productQty;
        public CircularImageView productImg;
        //  public RelativeLayout layout;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            productName = itemView.findViewById(R.id.deliveryProductName);
            productBrand = itemView.findViewById(R.id.deliveryProductBrand);
            productQty = itemView.findViewById(R.id.deliveryProductQ);
            productImg = itemView.findViewById(R.id.deliveryProductImg);
            //   layout=itemView.findViewById(R.id.productdeliveryitemlayout);
        }
    }
}
