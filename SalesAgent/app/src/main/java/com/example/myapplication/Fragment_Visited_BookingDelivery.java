package com.example.myapplication;

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

public class Fragment_Visited_BookingDelivery extends Fragment {
    public Fragment_Visited_BookingDelivery() {
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        // return super.onCreateView(inflater, container, savedInstanceState);
        View view = inflater.inflate(R.layout.fragment_recyclerview_deliverstatus, container, false);

        //  Toast.makeText(getContext(),"now in visited fragment"+this.getArguments().getString("TargetActivity"),Toast.LENGTH_SHORT).show();

//        String[] maintitleList = {
//                "Title 1", "Title 2",
//                "Title 3", "Title 4",
//                "Title 5", "Title 1", "Title 2",
//                "Title 3", "Title 4",
//                "Title 5"
//        };
//
//        String[] subtitleList = {
//                "Sub Title 1", "Sub Title 2",
//                "Sub Title 3", "Sub Title 4",
//                "Sub Title 5","Sub Title 1", "Sub Title 2",
//                "Sub Title 3", "Sub Title 4",
//                "Sub Title 5"
//        };
//;
//        Integer[] imgList = {R.mipmap.first, R.mipmap.first, R.mipmap.first, R.mipmap.first, R.mipmap.first,R.mipmap.first, R.mipmap.first, R.mipmap.first, R.mipmap.first, R.mipmap.first};
//     //   RecyclerAdapter_Customers adapter=new RecyclerAdapter_Customers(getContext(), maintitleList,subtitleList,imgList,
//            //    this.getArguments().getString("TargetActivity"));
        RecyclerAdapter_Customers adapter = null;
        try {
            JSONArray jsonArray = new JSONArray(this.getArguments().getString("JsonArray"));
          //  Toast.makeText(getContext(), "now list in pending fragment" + jsonArray.getJSONObject(0).getJSONObject("targettype"), Toast.LENGTH_SHORT).show();
            ArrayList<Customer_ModelClass> list = new ArrayList<Customer_ModelClass>();
            for (int i = 0; i < jsonArray.length(); i++) {
                JSONObject iterateObject = jsonArray.getJSONObject(i);
                String targettype = iterateObject.getJSONObject("targettype").getString("type");
                String ordertype = iterateObject.getJSONObject("ordertype").getString("orderStatus");
                JSONObject cusomerObject = iterateObject.getJSONObject("customerInfo");
                JSONObject agentCustomerObj=iterateObject.getJSONObject("agent_Customer");
                if (ordertype.equals(this.getArguments().getString("TargetActivity")) && targettype.equals("Visited")) {
                    JSONObject agentOrdetStatusObject = iterateObject.getJSONObject("agentOrderStatusObject");
//if(agentOrdetStatusObject.getString("endDate").be)

               //     if (!endDatePassed(agentOrdetStatusObject.getString("endDate"))) { all visited target must be shown
                        Toast.makeText(getContext(), "yes good" + agentOrdetStatusObject.getString("endDate"), Toast.LENGTH_SHORT).show();
                        Customer_ModelClass object = new Customer_ModelClass();
                        object.agentCustomerId = agentCustomerObj.getInt("id");
                        object.name = cusomerObject.getString("firstName") + " " + cusomerObject.getString("lastName");
                        object.address = cusomerObject.getString("address");

                        object.customerordertype = ordertype;
                        object.agentOrderStatusId = agentOrdetStatusObject.getInt("id");
                        list.add(object);
                   // }
                } else if (targettype.equals("Visited") && this.getArguments().getString("TargetActivity").equals("StartDay")) {
                    JSONObject agentOrdetStatusObject = iterateObject.getJSONObject("agentOrderStatusObject");
//if(agentOrdetStatusObject.getString("endDate").be)

                    //     if (!endDatePassed(agentOrdetStatusObject.getString("endDate"))) { all visited target must be shown
                 //       Toast.makeText(getContext(), "yes good" + agentOrdetStatusObject.getString("endDate"), Toast.LENGTH_SHORT).show();
                        Customer_ModelClass object = new Customer_ModelClass();
                        object.agentCustomerId = agentCustomerObj.getInt("id");
                        object.name = cusomerObject.getString("firstName") + " " + cusomerObject.getString("lastName");
                        object.address = cusomerObject.getString("address");

                        object.customerordertype = ordertype;
                        object.agentOrderStatusId = agentOrdetStatusObject.getInt("id");
                        list.add(object);
                 //   }
                }
                adapter = manipulateVisitedCustomer(list);
            }

        } catch (
                JSONException e) {
            e.printStackTrace();
        }
//        catch (ParseException e) {
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
    public RecyclerAdapter_Customers manipulateVisitedCustomer(ArrayList<Customer_ModelClass> visitedCustomerList) {
      //  Toast.makeText(getContext(), "visited customer list in manipulte is " + visitedCustomerList.size(), Toast.LENGTH_SHORT).show();
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

        //   ArrayList<Inventory_ModelClass> list=new ArrayList<Inventory_ModelClass>();

        RecyclerAdapter_Customers adapter = new RecyclerAdapter_Customers(getContext(), visitedCustomerList, imgList,
                this.getArguments().getString("TargetActivity"));

        return adapter;

    }
}
