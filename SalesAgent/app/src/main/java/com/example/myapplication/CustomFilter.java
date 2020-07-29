package com.example.myapplication;

import android.widget.Filter;

import java.util.ArrayList;

public class CustomFilter extends Filter {

        ProductAdapter_ViewProduct adapter;
        ArrayList<Inventory_ModelClass> filterList;
        public CustomFilter(ArrayList<Inventory_ModelClass> filterList, ProductAdapter_ViewProduct adapter)
        {
            this.adapter=adapter;
            this.filterList=filterList;
        }
        //FILTERING OCURS
        @Override
        protected FilterResults performFiltering(CharSequence constraint) {
            FilterResults results=new FilterResults();
            //CHECK CONSTRAINT VALIDITY
            if(constraint != null && constraint.length() > 0)
            {
                //CHANGE TO UPPER
                constraint=constraint.toString().toUpperCase();
                //STORE OUR FILTERED PLAYERS
                ArrayList<Inventory_ModelClass> filteredPlayers=new ArrayList<>();
                for (int i=0;i<filterList.size();i++)
                {
                    //CHECK
                    if(filterList.get(i).name.toUpperCase().contains(constraint))
                    {
                        //ADD PLAYER TO FILTERED PLAYERS
                        filteredPlayers.add(filterList.get(i));
                    }
                }
                results.count=filteredPlayers.size();
                results.values=filteredPlayers;
            }else
            {
                results.count=filterList.size();
                results.values=filterList;
            }
            return results;
        }
        @Override
        protected void publishResults(CharSequence constraint, FilterResults results) {
            adapter.ListInventory= (ArrayList<Inventory_ModelClass>) results.values;
            //REFRESH
            adapter.notifyDataSetChanged();
        }
}
