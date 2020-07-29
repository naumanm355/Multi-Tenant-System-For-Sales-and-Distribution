package com.example.myapplication;

import android.content.Context;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class Fragment_Pending_BookingDelivery extends Fragment {
    public Fragment_Pending_BookingDelivery() {
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        // return super.onCreateView(inflater, container, savedInstanceState);
        View view = inflater.inflate(R.layout.fragment_recyclerview_deliverstatus, container, false);
//Bundle bundle=this.getArguments();
     //   Toast.makeText(getContext(), "now in pending fragment" + this.getArguments().getString("TargetActivity"), Toast.LENGTH_SHORT).show();
        RecyclerAdapter_Customers adapter = null;
        try {
            JSONArray jsonArray = new JSONArray(this.getArguments().getString("JsonArray"));
       //     Toast.makeText(getContext(), "now list in pending fragment", Toast.LENGTH_SHORT).show();
            ArrayList<Customer_ModelClass> list = new ArrayList<Customer_ModelClass>();
            for (int i = 0; i < jsonArray.length(); i++) {
                JSONObject iterateObject = jsonArray.getJSONObject(i);
                String targettype = iterateObject.getJSONObject("targettype").getString("type");
                String ordertype = iterateObject.getJSONObject("ordertype").getString("orderStatus");
                JSONObject agentCustomerObj = iterateObject.getJSONObject("agent_Customer");
                JSONObject cusomerObject = iterateObject.getJSONObject("customerInfo");
                if (ordertype.equals(this.getArguments().getString("TargetActivity")) && targettype.equals("Pending")) {
                    JSONObject agentOrdetStatusObject = iterateObject.getJSONObject("agentOrderStatusObject");
//if(agentOrdetStatusObject.getString("endDate").be)

                    //     if (!endDatePassed(agentOrdetStatusObject.getString("endDate"))) { all pending target must be shown
         //               Toast.makeText(getContext(), "yes good" + agentOrdetStatusObject.getString("endDate"), Toast.LENGTH_SHORT).show();
                        Customer_ModelClass object = new Customer_ModelClass();
                        object.agentCustomerId = agentCustomerObj.getInt("id");
                        object.name = cusomerObject.getString("firstName") + " " + cusomerObject.getString("lastName");
                        object.address = cusomerObject.getString("address");

                        object.customerordertype = ordertype;
                        object.agentOrderStatusId = agentOrdetStatusObject.getInt("id");
                        list.add(object);
                  //  }
                }
                else if (targettype.equals("Pending") && this.getArguments().getString("TargetActivity").equals("StartDay")) {
                    JSONObject agentOrdetStatusObject = iterateObject.getJSONObject("agentOrderStatusObject");
//if(agentOrdetStatusObject.getString("endDate").be)

             //      if (!endDatePassed(agentOrdetStatusObject.getString("endDate"))) { all pending target must be shown
           //             Toast.makeText(getContext(), "yes good" + agentOrdetStatusObject.getString("endDate"), Toast.LENGTH_SHORT).show();
                        Customer_ModelClass object = new Customer_ModelClass();
                        object.agentCustomerId = agentCustomerObj.getInt("id");
                        object.name = cusomerObject.getString("firstName") + " " + cusomerObject.getString("lastName");
                        object.address = cusomerObject.getString("address");

                        object.customerordertype = ordertype;
                        object.agentOrderStatusId = agentOrdetStatusObject.getInt("id");
                        list.add(object);
                //    }
                }
                adapter = manipulatePendingCustomer(list);
            }

        } catch (JSONException e) {
            e.printStackTrace();
        }
//        catch (ParseException e) {
//            e.printStackTrace();
//        }
//        } catch (ParseException e) {
//            e.printStackTrace();
//        }

        RecyclerView recyclerView = (RecyclerView) view.findViewById(R.id.recyclerViewPendingDelivery);
        recyclerView.setHasFixedSize(true);
        LinearLayoutManager layoutManager = new LinearLayoutManager(getContext());
        recyclerView.setLayoutManager(layoutManager);
        recyclerView.addItemDecoration(new DividerItemDecoration(recyclerView.getContext(), DividerItemDecoration.VERTICAL));
        recyclerView.setAdapter(adapter);
        return view;
    }

    public boolean endDatePassed(String endDate) throws ParseException {
        boolean isReached = true;
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date extratDate = dateFormat.parse(endDate);

        Date calendarDate = Calendar.getInstance().getTime();
        String currentDateFormat = dateFormat.format(calendarDate);
        Date currentDate = dateFormat.parse(currentDateFormat);
        if (extratDate.after(currentDate) || extratDate.equals(currentDate)) {
            isReached = false;
        }

        return isReached;
    }

    public RecyclerAdapter_Customers manipulatePendingCustomer(ArrayList<Customer_ModelClass> pendingCustomerList) {
      //  Toast.makeText(getContext(), "pending customer list in manipulte is " + pendingCustomerList, Toast.LENGTH_SHORT).show();
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

        Integer[] imgList = {R.mipmap.first, R.mipmap.first, R.mipmap.first, R.mipmap.first, R.mipmap.first, R.mipmap.first, R.mipmap.first, R.mipmap.first, R.mipmap.first, R.mipmap.first};

        //   ArrayList<Inventory_ModelClass> list=new ArrayList<Inventory_ModelClass>();

        RecyclerAdapter_Customers adapter = new RecyclerAdapter_Customers(getContext(), pendingCustomerList, imgList,
                this.getArguments().getString("TargetActivity"));

        return adapter;

    }
}
