package com.example.myapplication;

import android.content.Context;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

import com.squareup.picasso.Callback;
import com.squareup.picasso.Picasso;

import java.util.ArrayList;

public class ProductAdapter_BookingCart extends RecyclerView.Adapter<ProductAdapter_BookingCart.ViewHolder> {
    String[] MainTitleList, SubTitleList;
    Integer[] ImageList;
    ArrayList<Inventory_ModelClass> listInventory;

    Context context;

    //    public ProductAdapter_BookingCart(Context applicationContext, String[] maintitleList, String[] subtitleList, Integer[] imgList) {
//        context=applicationContext;
//        MainTitleList=maintitleList;
//        SubTitleList=subtitleList;
//        ImageList=imgList;
//    }
    public String activeactivity = "n";

    public ProductAdapter_BookingCart(Context applicationContext, ArrayList<Inventory_ModelClass> ListInventory, Integer[] imgList, String activeActivity) {
        context = applicationContext;
        listInventory = ListInventory;
        ImageList = imgList;
        this.activeactivity = activeActivity;
    }

    public ProductAdapter_BookingCart(Context applicationContext, Integer[] imgList, String viewCartActivity) {
        context = applicationContext;
        ImageList = imgList;
        activeactivity = viewCartActivity;
        listInventory = OrderManagement_ModelClass.bookingCart_addedproduct;
    }


    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(context);
        View convertView = inflater.inflate(R.layout.customproduct_orderbooking, parent, false);

        return new ViewHolder(convertView);
    }

    @Override
    public void onBindViewHolder(@NonNull final ProductAdapter_BookingCart.ViewHolder holder, final int position) {
//        holder.Maintitle.setText(MainTitleList[position]);
//        holder.Subtitle.setText(SubTitleList[position]);
//        holder.imgView.setImageResource(ImageList[position]);
        holder.name.setText(listInventory.get(position).name);
        holder.category.setText(listInventory.get(position).category);
        holder.brand.setText(listInventory.get(position).company);
        holder.price.setText(Integer.toString(listInventory.get(position).price));
        Picasso.get().load(listInventory.get(position).imageUrl)
                .into(holder.imgView , new Callback() {
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
        holder.qty.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {
             //   Toast.makeText(context, "before change is start" + start + "count" + count + "after" + after + "seq" + s, Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
            //    Toast.makeText(context, "on change is start" + start + "count" + count + "before" + before + "seq" + s, Toast.LENGTH_SHORT).show();
            }

            @Override
            public void afterTextChanged(Editable s) {
             //   Toast.makeText(context, "after change is start editable " + s, Toast.LENGTH_SHORT).show();
                if (s.length() != 0) {
                    holder.subtotal.setText(Integer.toString(Integer.parseInt(holder.qty.getText().toString()) * listInventory.get(position).price));
                } else {
                    holder.subtotal.setText("SubTotal");
                }
            }
        });
        //   Toast.makeText(context,"value is "+holder.qty.toString(),Toast.LENGTH_SHORT).show();

        try {
            if (OrderManagement_ModelClass.bookingCart_addedproduct.size() > 0) {  //set  if add activity and viewCart
                if (getIndex(listInventory.get(position)) != -1) {
                    holder.subtotal.setText(Integer.toString(OrderManagement_ModelClass.bookingCart_addedproduct.get(position).subtotal));
                    holder.qty.setText(Integer.toString(OrderManagement_ModelClass.bookingCart_addedproduct.get(position).orderqty));
                    holder.addProduct_cartIcon.setImageResource(R.drawable.ic_shopping_cart_black_24dp_addedproduct);
                }
            } else if (activeactivity.equals("viewCartActivity_ReturnOrder")) { //set if return order
                holder.subtotal.setText(Integer.toString(listInventory.get(position).subtotal));
                holder.qty.setText(Integer.toString(listInventory.get(position).orderqty));
                //   holder.addProduct_cartIcon.setImageResource(R.drawable.ic_shopping_cart_black_24dp_addedproduct);
            }
        } catch (Exception ex) {
            Toast.makeText(context, "error", Toast.LENGTH_SHORT).show();
        }
        final Inventory_ModelClass selectedInventory = listInventory.get(position);
        final Inventory_ModelClass newCartProduct = new Inventory_ModelClass();

        if (activeactivity.equals("viewCartActivity") || activeactivity.equals("viewCartActivity_ReturnOrder")) {
            holder.addProduct_cartIcon.setImageResource(R.drawable.ic_remove_shopping_cart_black_24dp);
            holder.addProduct_cartIcon.setOnClickListener(new View.OnClickListener() {

                @Override
                public void onClick(View v) {
                 //   Toast.makeText(context, "gettt " ,Toast.LENGTH_SHORT).show();
                    OrderManagement_ModelClass.bookingCart_addedproduct.remove(getIndex(selectedInventory));
                }
            });
        }
        if (activeactivity.equals("viewCartActivity_ReturnOrder")) {
            newCartProduct.orderProductId = selectedInventory.orderProductId;
        }
else {
            holder.addProduct_cartIcon.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    if (activeactivity.equals("addProduct")) {
                        holder.addProduct_cartIcon.setImageResource(R.drawable.ic_shopping_cart_black_24dp_addedproduct);
                    }
                    newCartProduct.name = selectedInventory.name;
                    newCartProduct.category = selectedInventory.category;
                    newCartProduct.company = selectedInventory.company;
                    newCartProduct.price = selectedInventory.price;
                    newCartProduct.subtotal = Integer.parseInt(holder.subtotal.getText().toString());
                    newCartProduct.inveId = selectedInventory.inveId;
                    newCartProduct.orderqty = Integer.parseInt(holder.qty.getText().toString());

                    if (getIndex(newCartProduct) == -1) {  //not exist item
               //         Toast.makeText(context, "new added in " + newCartProduct.name, Toast.LENGTH_SHORT).show();
                        OrderManagement_ModelClass.bookingCart_addedproduct.add(newCartProduct);

                    } else {
             //           Toast.makeText(context, "updated" + getIndex(newCartProduct), Toast.LENGTH_SHORT).show();
                        OrderManagement_ModelClass.bookingCart_addedproduct.set(getIndex(newCartProduct), newCartProduct);
                    }

                    //  this.notifyAll();
                }

            });
        }

      //  holder.imgView.setImageResource(ImageList[position]);

    }

    public int getIndex(Inventory_ModelClass inventory_modelClass) {
        int index = -1;
      //  Toast.makeText(context, "size" + OrderManagement_ModelClass.bookingCart_addedproduct.size(), Toast.LENGTH_SHORT).show();
        if (OrderManagement_ModelClass.bookingCart_addedproduct.size() > 0) {
            for (Inventory_ModelClass inventory : OrderManagement_ModelClass.bookingCart_addedproduct) {
              //  Toast.makeText(context, "new  i " + inventory_modelClass.name + "existing check" + inventory.name, Toast.LENGTH_SHORT).show();
                if (inventory.name.equals(inventory_modelClass.name) && inventory.category.equals(inventory_modelClass.category) && inventory.company.equals(inventory_modelClass.company)) {
               //     Toast.makeText(context, "foundedd new  i " + inventory_modelClass.name + "existing check" + inventory.name, Toast.LENGTH_SHORT).show();
                    index = OrderManagement_ModelClass.bookingCart_addedproduct.indexOf(inventory);
                    break;
                }
            }
        }
        return index;
    }


    @Override
    public int getItemCount() {
        return listInventory.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {

        public TextView name, category, brand, price, subtotal;
        public EditText qty;
        public ImageView addProduct_cartIcon;
        public ImageView imgView;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            name = itemView.findViewById(R.id.addProductName);
            category = itemView.findViewById(R.id.addProducttype);
            brand = itemView.findViewById(R.id.addProductbrand);
            price = itemView.findViewById(R.id.addProductPrice);
            imgView = itemView.findViewById(R.id.addProductImg);
            qty = itemView.findViewById(R.id.addProduct_addQTY);
            subtotal = itemView.findViewById(R.id.addProduct_subtotal);
            addProduct_cartIcon = itemView.findViewById(R.id.addProduct_inCartIcon);
        }
    }
}
