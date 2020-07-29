package com.example.myapplication;

import android.app.ProgressDialog;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class Fragment_AddProductBooking extends Fragment {
    public Fragment_AddProductBooking() {

    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_addproductbooking, container, false);
        try {
        Integer[] imgList = {R.mipmap.first, R.mipmap.first, R.mipmap.first, R.mipmap.first, R.mipmap.first,R.mipmap.first, R.mipmap.first, R.mipmap.first, R.mipmap.first, R.mipmap.first};

            RecyclerView recyclerView = (RecyclerView) view.findViewById(R.id.addProductCartRecycler);
            final ArrayList<Inventory_ModelClass> ListInventory = new ArrayList<Inventory_ModelClass>();
            final ProductAdapter_BookingCart productAdapter_bookingCart = new ProductAdapter_BookingCart(getContext(), ListInventory, imgList, "addProduct");
            recyclerView.setHasFixedSize(true);
            recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
            recyclerView.setAdapter(productAdapter_bookingCart);

            final ProgressDialog progressDialog = new ProgressDialog(getContext());
            progressDialog.setMessage("...Loading");
            progressDialog.show();
            constants_class.getInstance().hitGetEndPoint(constants_class.getInstance().inventoryurl, getContext(),
                    new constants_class.VolleyCallback() {
                        @Override
                        public void onSuccessResponse(JSONObject response) throws JSONException {


                            JSONArray invenoryList = response.getJSONArray("inventoryList");
                            for (int i = 0; i < invenoryList.length(); i++) {
                                JSONObject iterateObject = invenoryList.getJSONObject(i);
                                JSONObject inventoryObject = iterateObject.getJSONObject("inventory");
                                JSONObject productDetail = inventoryObject.getJSONObject("_products");
                                Inventory_ModelClass inventory = new Inventory_ModelClass(productDetail.getString("name"), productDetail.getString("category"), productDetail.getString("company"), inventoryObject.getInt("price"), inventoryObject.getInt("id"),
                                        productDetail.getString("imageUrl"));
                                ListInventory.add(inventory);


                            }
                            productAdapter_bookingCart.notifyDataSetChanged();
                            progressDialog.dismiss();
                        }
                    });
        } catch (Exception ex) {
            Toast.makeText(getContext(), "error is" + ex.getMessage(), Toast.LENGTH_SHORT).show();
        }

        return view;
    }

//    @Override
//    public boolean onCreateOptionsMenu(Menu menu) {
//        getMenuInflater().inflate(R.menu.deliverystatus_menu,menu);//super.onCreateOptionsMenu(menu);
//        return true;
//    }
    //return view;

}
