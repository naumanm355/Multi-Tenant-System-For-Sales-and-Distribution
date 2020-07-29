//package com.example.myapplication;
//
//import android.view.LayoutInflater;
//import android.view.View;
//import android.view.ViewGroup;
//import android.widget.ImageView;
//import android.widget.LinearLayout;
//import android.widget.TextView;
//


//import androidx.annotation.NonNull;
//import androidx.recyclerview.widget.RecyclerView;
//
//import java.util.ArrayList;
//
//public class ProductAdapter_ViewProduct extends RecyclerView.Adapter<ProductAdapter_ViewProduct.ViewHolder> {
//    String[] MainTitleList,SubTitleList;
//    Integer[] ImageList;
//
//    public ProductAdapter_ViewProduct(String[] maintitleList, String[] subtitleList, Integer[] imgList) {
//        MainTitleList=maintitleList;
//        SubTitleList=subtitleList;
//        ImageList=imgList;
//    }
//
//
//    @NonNull
//    @Override
//    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
//        LayoutInflater inflater=LayoutInflater.from(parent.getContext());
//        View convertView=inflater.inflate(R.layout.customproduct_viewitem,parent,false);
//
//
//        return new ViewHolder(convertView);
//    }
//
//    @Override
//    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
//        holder.MainTitle.setText(MainTitleList[position]);
//        holder.SubTitle.setText(SubTitleList[position]);
//        holder.imgView.setImageResource(ImageList[position]);
//    }
//
//    @Override
//    public int getItemCount() {
//        return  MainTitleList.length;
//    }
//    public  static  class ViewHolder extends RecyclerView.ViewHolder{
//        public TextView MainTitle;
//        public TextView SubTitle;
//        public ImageView imgView;
//       // public LinearLayout layout;
//
//        public ViewHolder(@NonNull View itemView) {
//            super(itemView);
//            MainTitle=itemView.findViewById(R.id.viewProductName);
//            SubTitle=itemView.findViewById(R.id.viewProductbrand);
//            imgView=itemView.findViewById(R.id.viewProductImg);
//          //  layout=itemView.findViewById(R.id.shopDetailitemLayout);
//
//        }
//
//    }
//}


package com.example.myapplication;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.squareup.picasso.Callback;
import com.squareup.picasso.Picasso;

import java.util.ArrayList;
import java.util.List;

public class ProductAdapter_ViewProduct extends RecyclerView.Adapter<ProductAdapter_ViewProduct.ViewHolder> {
    ArrayList<Inventory_ModelClass> ListInventory;
  Context context;
    public ProductAdapter_ViewProduct(ArrayList<Inventory_ModelClass> listInventory, Context applicationContext) {
        ListInventory = listInventory;
      context=applicationContext;
    }


    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(parent.getContext());
        View convertView = inflater.inflate(R.layout.customproduct_viewitem, parent, false);


        return new ViewHolder(convertView);
    }

    @Override
    public void onBindViewHolder(@NonNull final ViewHolder holder, int position) {
        holder.name.setText(ListInventory.get(position).name);
        holder.category.setText(ListInventory.get(position).category);
          holder.brand.setText(ListInventory.get(position).company);
          holder.price.setText(Integer.toString(ListInventory.get(position).price) );
        holder.prodImage.setImageResource(R.mipmap.nationaltomatoketchup);
          if(ListInventory.get(position).imageUrl!=null) {

              Picasso.get().load(ListInventory.get(position).imageUrl)
                      .into(holder.prodImage, new Callback() {
                          @Override
                          public void onSuccess() {
                              //, "ssuccess", Toast.LENGTH_SHORT).show();

                          }

                          @Override
                          public void onError(Exception e) {

                              //       Toast.makeText(context, "ereror image response book view" + e.getMessage(), Toast.LENGTH_SHORT).show();
//                                String updatedImageUrl;
//                                if (uri.contains("https")){
//                                    updatedImageUrl = uri.replace("https", "http");
//                                }else{
//                                    updatedImageUrl = uri.replace("http", "https");
//                                }
//                                loadImage(imageView, updatedImageUrl);
                          }
                      });
          }

    }

    @Override
    public int getItemCount() {
        return ListInventory.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        public TextView name, category, brand, price;
        public ImageView prodImage;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            name = itemView.findViewById(R.id.viewProductName);
            category = itemView.findViewById(R.id.viewProductCategory);
            price = itemView.findViewById(R.id.viewProductPrice);
            brand = itemView.findViewById(R.id.viewProductbrand);
            prodImage=itemView.findViewById(R.id.viewProductImg);
        }

    }
}
