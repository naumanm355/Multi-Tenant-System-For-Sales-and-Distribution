package com.example.myapplication;

import android.app.ProgressDialog;
import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.View;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.material.tabs.TabLayout;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class AddProduct_BookingActivity extends AppCompatActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getSupportActionBar().setTitle("Order Booking");
        setContentView(R.layout.activitycart_addproduct);
        Intent intent=getIntent();

      //  Toast.makeText(getApplicationContext(),"customer id in add product booking is "+intent.getIntExtra("agentOrderStatusId",0),Toast.LENGTH_SHORT).show();
        final ProgressDialog progressDialog=new ProgressDialog(this);
        progressDialog.setMessage("...Loading");
        progressDialog.show();
        constants_class.getInstance().hitGetEndPoint(constants_class.getInstance().inventoryurl, getApplicationContext(),
                new constants_class.VolleyCallback() {
                    @Override
                    public void onSuccessResponse(JSONObject response) throws JSONException {
                        ArrayList<Inventory_ModelClass> ListInventory = new ArrayList<Inventory_ModelClass>();
 //Toast.makeText(getApplicationContext(),"response is "+response,Toast.LENGTH_SHORT).show();
                        JSONArray invenoryList = response.getJSONArray("inventoryList");
                        for (int i = 0; i < invenoryList.length(); i++) {
                            JSONObject iterateObject = invenoryList.getJSONObject(i);
                            JSONObject inventoryObject = iterateObject.getJSONObject("inventory");
                            JSONObject productDetail = inventoryObject.getJSONObject("_products");
                            Inventory_ModelClass inventory = new Inventory_ModelClass(productDetail.getString("name"), productDetail.getString("category"), productDetail.getString("company"), inventoryObject.getInt("price"),inventoryObject.getInt("id"));
                            ListInventory.add(inventory);


                        }
               //         Toast.makeText(getApplicationContext(),"image is "+ListInventory.get(0).imageUrl,Toast.LENGTH_SHORT).show();
                        mapProduct_inadapter(ListInventory);
                        progressDialog.dismiss();
                    }
                });



    }
public void mapProduct_inadapter(ArrayList<Inventory_ModelClass> ListInventory){
  //  Toast.makeText(getApplicationContext(),"inventory length in add product adapter is "+ListInventory.size(),Toast.LENGTH_SHORT).show();
    String[] maintitleList = {
            "Title 1", "Title 2",
            "Title 3", "Title 4",
            "Title 5"
    };

    String[] subtitleList = {
            "Sub Title 1", "Sub Title 2",
            "Sub Title 3", "Sub Title 4",
            "Sub Title 5"
    };


    Integer[] imgList = {R.mipmap.first, R.mipmap.first, R.mipmap.first, R.mipmap.first, R.mipmap.first};
    RecyclerView recyclerView=(RecyclerView) findViewById(R.id.addProductCartRecycler);
    ProductAdapter_BookingCart productAdapter_bookingCart =new ProductAdapter_BookingCart(getApplicationContext(),ListInventory,imgList,"addProduct");
    recyclerView.setHasFixedSize(true);
    recyclerView.setLayoutManager(new LinearLayoutManager(this));
    recyclerView.setAdapter(productAdapter_bookingCart);

}
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
       getMenuInflater().inflate(R.menu.deliverystatus_menu,menu);//super.onCreateOptionsMenu(menu);
    return true;
    }
    public void navigateViewCartActivity(View v){
        Intent getIntent=getIntent();
        Intent intent=new Intent(this,ViewBookingCartActivity.class);

       intent.putExtra("agentOrderStatusId", getIntent.getIntExtra("agentOrderStatusId",0));
        startActivity(intent);
    }
}
