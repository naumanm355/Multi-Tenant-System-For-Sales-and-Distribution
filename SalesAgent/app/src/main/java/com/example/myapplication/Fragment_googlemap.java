package com.example.myapplication;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.app.ActivityCompat;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;

import android.content.Context;
import android.location.Criteria;
import android.location.LocationManager;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;

import android.location.Location;
import android.Manifest;
import android.content.pm.PackageManager;
import android.widget.Toast;
import android.location.LocationListener;

import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GooglePlayServicesUtil;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.android.gms.maps.model.Polyline;
import com.google.android.gms.maps.model.PolylineOptions;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;


public class Fragment_googlemap extends Fragment implements OnMapReadyCallback, TaskLoadedCallback {

    GoogleMap mMap;
    static final int RequestCode = 100;
    FusedLocationProviderClient fusedLocationProviderClient;
    Location mlocation, mlocation1, mLocation2;
    private Polyline currentPolyline;
    private MarkerOptions place1, place2;
    ArrayList<MarkerOptions> listMarkerOption = new ArrayList<>();

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        //super.onCreateView(inflater, container, savedInstanceState);

        View view = inflater.inflate(R.layout.fragment_googlemap, container, false);
        fusedLocationProviderClient = LocationServices.getFusedLocationProviderClient(getContext());
//        try {
//            Toast.makeText(getContext(), "click", Toast.LENGTH_SHORT).show();
//            new FetchURL(getContext()).execute(getUrl(place1.getPosition(), place2.getPosition(), "driving"), "driving");
//            Toast.makeText(getContext(), "after click", Toast.LENGTH_SHORT).show();
            //  place1 = new MarkerOptions().position(new LatLng(27.658143, 85.3199503)).title("Location 1");
            //   place2 = new MarkerOptions().position(new LatLng(27.667491, 85.3208583)).title("Location 2");


//        } catch (Exception e) {
//            Toast.makeText(getContext(), "error for route : " + e.getMessage(), Toast.LENGTH_SHORT).show();
//            place1 = new MarkerOptions().position(new LatLng(27.658143, 85.3199503)).title("Location 1");
//            place2 = new MarkerOptions().position(new LatLng(27.667491, 85.3208583)).title("Location 2");

            for (LatLng_ModelClass latLng_modelClass : CustDist_LatLng_ListClass.getInstance().latLng_modelList) {
                MarkerOptions markerOptions = new MarkerOptions();
            //   Toast.makeText(getContext(), "enter : "+latLng_modelClass.Customer.name, Toast.LENGTH_SHORT).show();
                markerOptions.position(new LatLng(latLng_modelClass.latitude, latLng_modelClass.longitude)).title(latLng_modelClass.Customer.name);
                listMarkerOption.add(markerOptions);

            }
        SupportMapFragment mapFragment = (SupportMapFragment) getChildFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);

           // Toast.makeText(getContext(), "lengt h : " + listMarkerOption.size(), Toast.LENGTH_SHORT).show();

//            SupportMapFragment mapFragment = (SupportMapFragment) getChildFragmentManager()
//                    .findFragmentById(R.id.map);
//            mapFragment.getMapAsync(this);
//            GeocodingLocation locationAddress = new GeocodingLocation();
//             locationAddress.getAddressFromLocation("Hollywood Blvd & Vine St \n" +
//                            "Los Angeles CA 90028",
//                    getContext(), new Fragment_googlemap.GeocoderHandler());
            //  Toast.makeText(getContext(), "locc"+lo, Toast.LENGTH_SHORT).show();
      //  }


        return view;
    }


    @Override
    public void onRequestPermissionsResult(int requestCode, String permissions[], int[] grantResults) {
        switch (requestCode) {
            case RequestCode: {
                if (grantResults.length > 0
                        && grantResults[0] == PackageManager.PERMISSION_GRANTED) {//    SmsManager smsManager = SmsManager.getDefault();
               //     Toast.makeText(getContext(), "haha permission granted.", Toast.LENGTH_LONG).show();
                    LatLng sydney = new LatLng(mlocation.getLatitude(), mlocation.getLongitude());
                    mMap.addMarker(new MarkerOptions().position(sydney).title("Current Location"));

                    mMap.moveCamera(CameraUpdateFactory.newLatLng(sydney));


                } else {
                //    Toast.makeText(getContext(), "SMS faild, please try again.", Toast.LENGTH_LONG).show();
                    return;
                }
            }
        }

    }

    @Override
    public void onTaskDone(Object... values) {
        if (currentPolyline != null) {
            currentPolyline.remove();
        }
        currentPolyline = mMap.addPolyline((PolylineOptions) values[0]);
    }


    /**
     * Manipulates the map once available.
     * This callback is triggered when the map is ready to be used.
     * This is where we can add markers or lines, add listeners or move the camera. In this case,
     * we just add a marker near Sydney, Australia.
     * If Google Play services is not installed on the device, the user will be prompted to install
     * it inside the SupportMapFragment. This method will only be triggered once the user has
     * installed Google Play services and returned to the app.
     */

    @Override
    public void onMapReady(GoogleMap googleMap) {
        try {
            mMap = googleMap;
            Toast.makeText(getActivity(), "current loocation is called", Toast.LENGTH_SHORT).show();
            // LatLng sydney = new LatLng(mlocation.getLatitude(), mlocation.getLongitude());
           LatLng sydney = new LatLng(listMarkerOption.get(0).getPosition().latitude, listMarkerOption.get(0).getPosition().longitude);
         //   mMap.addMarker(new MarkerOptions().position(sydney).title("Current Location"))
                 for (MarkerOptions markerOptions : listMarkerOption) {

                                  mMap.addMarker(markerOptions);
                                }
            mMap.moveCamera(CameraUpdateFactory.newLatLng(sydney));
        }
        catch (Exception ex){
            Toast.makeText(getContext(), "error is "+ex.getMessage(), Toast.LENGTH_LONG).show();
        }
     //   mMap.addMarker(markerOptions);
        //mMap.moveCamera(CameraUpdateFactory.newLatLng(sydney));
//        if (ActivityCompat.checkSelfPermission(getContext(), Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED &&
//                ActivityCompat.checkSelfPermission(getContext(), Manifest.permission.ACCESS_COARSE_LOCATION) !=
//                        PackageManager.PERMISSION_GRANTED) {
//            Toast.makeText(getContext(), "all permission granted.", Toast.LENGTH_LONG).show();
//            ActivityCompat.requestPermissions(getActivity(), new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, RequestCode);
//            //   return;
//        }
//
//        Task<Location> task = fusedLocationProviderClient.getLastLocation();
//        task.addOnSuccessListener(new OnSuccessListener<Location>() {
//            @Override
//            public void onSuccess(Location location) {
//
//                if (location != null) {
//                    Toast.makeText(getActivity(), "current loocation is" + location.getLatitude(), Toast.LENGTH_SHORT).show();
//
//                    mlocation = location;
//
//                    LatLng sydney = new LatLng(mlocation.getLatitude(), mlocation.getLongitude());
//                    mMap.addMarker(new MarkerOptions().position(sydney).title("Current Location"));
//                    for (MarkerOptions markerOptions : listMarkerOption) {
//
//                        mMap.addMarker(markerOptions);
//                    }
////                    mMap.addMarker(place1);
////                    mMap.addMarker(place2);
//                    mMap.moveCamera(CameraUpdateFactory.newLatLng(sydney));
//
//                }
//              // Toast.makeText(getContext(), "call"+listMarkerOption.get(0).getPosition(), Toast.LENGTH_LONG).show();
//            }
//        });


         mMap.animateCamera(CameraUpdateFactory.zoomTo(15));
    }

    private class GeocoderHandler extends Handler {
        @Override
        public void handleMessage(Message message) {
            String locationAddress;
            switch (message.what) {
                case 1:
                    Bundle bundle = message.getData();
                    locationAddress = bundle.getString("objectResponse");
                    break;
                default:
                    locationAddress = null;
            }

         //   Toast.makeText(getContext(), "jckn" + locationAddress, Toast.LENGTH_SHORT).show();
            //  latLongTV.setText(locationAddress);

        }
    }


}
