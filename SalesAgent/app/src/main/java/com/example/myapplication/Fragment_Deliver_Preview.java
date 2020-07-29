package com.example.myapplication;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.mikhaellopez.circularimageview.CircularImageView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;


public class Fragment_Deliver_Preview extends Fragment {

    public Fragment_Deliver_Preview() {
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        //return super.onCreateView(inflater, container, savedInstanceState);
        final View view =inflater.inflate(R.layout.fragment_orderdeliver_preview,container,false);
        Toolbar toolbar=(Toolbar) view.findViewById(R.id.deliverpreviewtoolbar);
        //  toolbar.setTitle("mbmf");
        ((AppCompatActivity)getActivity()).setSupportActionBar(toolbar);
        ((AppCompatActivity)getActivity()).getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        ((AppCompatActivity)getActivity()).getSupportActionBar().setDisplayShowHomeEnabled(true);

//        LayoutInflater inflater=(LayoutInflater)getSystemService(Context.LAYOUT_INFLATER_SERVICE);
      //  View retailerDetailView=inflater.inflate(R.layout.retailerdetail_customitem,null);
        View retailerDetailView=view.findViewById(R.id.retailerdetail_previewActivity);

      //Toast.makeText(getContext(),"in preview frgment object nme is"+OrderManagement_ModelClass.customer_modelClass.name,Toast.LENGTH_SHORT).show();
        TextView shopName=(TextView) retailerDetailView.findViewById(R.id.shopName);
        TextView shopAddress=(TextView) retailerDetailView.findViewById(R.id.shopAddress);
        TextView orderType=(TextView)  retailerDetailView.findViewById(R.id.ordertypetxt);
        CircularImageView shopkeeperImg=(CircularImageView) retailerDetailView.findViewById(R.id.shopkeeperImg);
        shopName.setText(OrderManagement_ModelClass.customer_modelClass.name);
        shopAddress.setText(OrderManagement_ModelClass.customer_modelClass.address);
        shopkeeperImg.setImageResource(R.mipmap.first);
        orderType.setText(OrderManagement_ModelClass.customer_modelClass.customerordertype);  // value is empty
        final Customer_ModelClass customer=OrderManagement_ModelClass.customer_modelClass;
//constants_class.getInstance().deliverorderurl+=customer.agentCustomerId;


        final String[] maintitleList = {
                "Title 1", "Title 2",
                "Title 3", "Title 4",
                "Title 5"
        };

        final String[] subtitleList = {
                "Sub Title 1", "Sub Title 2",
                "Sub Title 3", "Sub Title 4",
                "Sub Title 5"
        };
        final Integer[] imgList = {R.mipmap.first, R.mipmap.first, R.mipmap.first, R.mipmap.first, R.mipmap.first,R.mipmap.first, R.mipmap.first, R.mipmap.first, R.mipmap.first, R.mipmap.first};
        final String url="http://sndwebapi.spikotech.com/api/OrderManagement/getBookedOrderDetail";
JSONObject jsonObject=new JSONObject();
        try {
            jsonObject.put("AgentOrderStatusId",customer.agentOrderStatusId);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        String requestbody=jsonObject.toString();

        constants_class.getInstance().hitPostEndPoint(url, requestbody,getContext(),
                new constants_class.VolleyCallback() {
                    @Override
                    public void onSuccessResponse(JSONObject response) throws JSONException {
         //               Toast.makeText(getContext(),"customer.agentOrderStatusId"+customer.agentOrderStatusId+"url"+response,Toast.LENGTH_SHORT).show();
                     //   Toast.makeText(getContext(),"get book detail"+response,Toast.LENGTH_SHORT).show();
                        int subTotal=0;
                        JSONArray getDetailList=response.getJSONArray("customerorderList");

                        ArrayList<Inventory_ModelClass> inventoryList=new ArrayList<>();
                        for(int i=0;i<getDetailList.length();i++){
                            JSONObject iterateObject = getDetailList.getJSONObject(i);
//                            JSONObject getProduct=iterateObject.getJSONObject("product");
//                            JSONObject getOrderDetail=iterateObject.getJSONObject("orderproduct");
                            Inventory_ModelClass inventory_modelClass=new Inventory_ModelClass();
                            inventory_modelClass.name=iterateObject.getString("name");
                            inventory_modelClass.company=iterateObject.getString("company");
                            inventory_modelClass.orderqty=iterateObject.getInt("qty");
                            subTotal+=inventory_modelClass.orderqty*iterateObject.getInt("inv_price");
                            inventoryList.add(inventory_modelClass);
                        }

               //         Toast.makeText(getContext(),"in preview frgment after lis is"+inventoryList.size(),Toast.LENGTH_SHORT).show();
                        ProductAdapter_DeliveryPreview adapter_deliveryPreview=new ProductAdapter_DeliveryPreview(getContext(),inventoryList,imgList);
                        RecyclerView recyclerView=(RecyclerView) view.findViewById(R.id.deliveryPreviewRecycler);
                        // ProductAdapter_DeliveryPreview adapter_deliveryPreview=new ProductAdapter_DeliveryPreview(getContext(),maintitleList,subtitleList,imgList);
                        recyclerView.setHasFixedSize(true);
                        LinearLayoutManager layoutManager=new LinearLayoutManager(getContext());
                        recyclerView.setLayoutManager(layoutManager);
                        recyclerView.addItemDecoration(new DividerItemDecoration(recyclerView.getContext(), DividerItemDecoration.VERTICAL));
                        recyclerView.setAdapter(adapter_deliveryPreview);

                        OrderManagement_ModelClass.orderBillDetail_modelClass.totalitem=inventoryList.size();
                        OrderManagement_ModelClass.orderBillDetail_modelClass.subtotal=subTotal;
                    }
                });


        return view;
    }


//    @Override
//    protected void onCreate(@Nullable Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//        setContentView(R.layout.fragment_orderdeliver_preview);
//    Toolbar toolbar=(Toolbar) findViewById(R.id.deliverpreviewtoolbar);
//  //  toolbar.setTitle("mbmf");
//     setSupportActionBar(toolbar);
//     getSupportActionBar().setDisplayHomeAsUpEnabled(true);
//     getSupportActionBar().setDisplayShowHomeEnabled(true);
//
////        LayoutInflater inflater=(LayoutInflater)getSystemService(Context.LAYOUT_INFLATER_SERVICE);
////        View retailerDetailView=inflater.inflate(R.layout.retailerdetail_customitem,null);
//        View retailerDetailView=findViewById(R.id.retailerdetail_previewActivity);
//        TextView shopName=(TextView) retailerDetailView.findViewById(R.id.shopName);
//        TextView shopAddress=(TextView) retailerDetailView.findViewById(R.id.shopAddress);
//     CircularImageView shopkeeperImg=(CircularImageView) retailerDetailView.findViewById(R.id.shopkeeperImg);
//        shopName.setText("Bismillah grocery store");
//        shopAddress.setText("Shama Park Street No. 3 near daragowala Lahore");
//        shopkeeperImg.setImageResource(R.mipmap.first);
//
//
//        String[] maintitleList = {
//                "Title 1", "Title 2",
//                "Title 3", "Title 4",
//                "Title 5"
//        };
//
//        String[] subtitleList = {
//                "Sub Title 1", "Sub Title 2",
//                "Sub Title 3", "Sub Title 4",
//                "Sub Title 5"
//        };
//        ;
//        Integer[] imgList = {R.mipmap.first, R.mipmap.first, R.mipmap.first, R.mipmap.first, R.mipmap.first};
//        RecyclerView recyclerView=(RecyclerView) findViewById(R.id.deliveryPreviewRecycler);
//        ProductAdapter_DeliveryPreview adapter_deliveryPreview=new ProductAdapter_DeliveryPreview(getApplicationContext(),maintitleList,subtitleList,imgList);
//        recyclerView.setHasFixedSize(true);
//        LinearLayoutManager layoutManager=new LinearLayoutManager(getApplicationContext());
//        recyclerView.setLayoutManager(layoutManager);
//        recyclerView.addItemDecoration(new DividerItemDecoration(recyclerView.getContext(), DividerItemDecoration.VERTICAL));
//        recyclerView.setAdapter(adapter_deliveryPreview);
//      //  return view;
//    }


}
