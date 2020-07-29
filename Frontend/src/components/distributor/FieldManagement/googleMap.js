// import React, { Component } from 'react'
// import {
//   GoogleMap,
//   withScriptjs,
//   withGoogleMap,
//   DirectionsRenderer,
//   Marker,
//   InfoWindow
// } from "react-google-maps";
// import avatarImage from "../../other/imgaes/uet.png";
// const dataList = [
//   { id: 1, address: "Liaqat Hall, UET", coordinates: [31.5816332, 74.3523838] },
//   { id: 2, address: "Lahore, Punjab, Pakistan", coordinates: [31.52037, 74.358749] },
//   { id: 3, address: "Faisalabad, Punjab, Pakistan", coordinates: [31.450365, 73.134964] },
//   { id: 4, address: "Gujranwala, Punjab, Pakistan", coordinates: [32.162369, 74.183083] },
//   { id: 5, address: "Multan, Punjab, Pakistan", coordinates: [30.157457, 71.524918] },
//   { id: 6, address: "Sheikhupura, Punjab, Pakistan", coordinates: [31.70878, 73.984673] },
//   { id: 7, address: "Sialkot, Punjab, Pakistan", coordinates: [32.52002, 74.560043] }
// ];
// const directionsService = [new window.google.maps.DirectionsService()];
// export default class MyMap extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selected: null,
//       directions: null,
//     }
//     this.mmap = this.mmap.bind(this)
//   }
//   mmap() {
//     return (
//       <GoogleMap
//         defaultZoom={8}
//         defaultCenter={{ lat: 31.56192, lng: 74.348083 }}
//       >
//         {dataList.map(city => (
//           <Marker
//             key={city.id}
//             title={city.address}
//             icon={{
//               url: avatarImage,
//               scaledSize: new window.google.maps.Size(25, 25) //size in pixel
//             }}
//             position={{ lat: city.coordinates[0], lng: city.coordinates[1] }}
//             onMouseOver={() => {
//               this.setState({
//                 selected: city
//               })
//             }}
//           />
//         ))}
//         {this.state.selected && (
//           <InfoWindow
//             position={{
//               lat: this.state.selected.coordinates[0],
//               lng: this.state.selected.coordinates[1]
//             }}
//             onCloseClick={() => {
//               this.setState({
//                 selected: null
//               })
//             }}
//           >
//             <div>
//               <p><b>{this.state.selected.address}</b></p>
//             </div>
//           </InfoWindow>
//         )}
//         <DirectionsRenderer directions={this.state.directions} />
//       </GoogleMap>
//     );
//   }

//   componentDidMount() {

//     const origin = { lat: 30.157457, lng: 71.524918 };
//     const destination = { lat: 31.52037, lng: 74.358749 };
//     directionsService.route(
//       {
//         origin: origin,
//         destination: destination,
//         // travelMode: TravelMode,

//         travelMode: window.google.maps.TravelMode.DRIVING
//       },
//       (result, status) => {
//         if (status === window.google.maps.DirectionsStatus.OK) {
//           this.setState({
//             directions: result
//           })
//         } else {
//           console.error(`error fetching directions ${result}`);
//         }
//       }
//     );
//   }
//   render() {
//     const WrappedMap = withScriptjs(withGoogleMap(this.mmap));


//     return (
//       <div>
//         <WrappedMap
//           googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBW2MiuJHeaCp1nLAmo8OBODuVwF3exCtE`}
//           loadingElement={<div style={{ height: "100%" }} />}
//           containerElement={<div style={{ height: "500px" }} />}
//           mapElement={<div style={{ height: "100%" }} />}

//         />
//       </div>
//     )
//   }
// }



import React, { Component } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  DirectionsRenderer,
  Marker
} from "react-google-maps";
import { compose, withProps, lifecycle, withState } from "recompose";
const dataList = [
  { coordinates: [31.5816332, 74.3523838] },
  { coordinates: [31.52037, 74.358749] },
  { coordinates: [31.450365, 73.134964] },
  { coordinates: [32.162369, 74.183083] },
  { coordinates: [30.157457, 71.524918] },
  { coordinates: [31.70878, 73.984673] },
  { coordinates: [32.52002, 74.560043] }
];
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      directions: null,
      directions1: null,
      directionList: [],
      coord: [
        { lat: 31.5816332, lng: 74.3523838 }, //Liaqat Hall
        { lat: 31.52037, lng: 74.358749 }, //Lahore
        { lat: 31.450365, lng: 73.134964 }, //Faisalabad
        { lat: 30.157457, lng: 71.524918 } //Multan
      ]
    }
  }
  // callcoord(obj, index) {
  //   if (index + 1 != this.state.coord.length) {
  //     return <ul>
  //       <li key={index}>{obj.lat} {obj.lng}</li>
  //       <li key={index + 1}>{this.state.coord[index + 1].lat} {this.state.coord[index + 1].lng}</li>
  //     </ul>
  //   }
  // }
  // componentDidMount() {

  //   this.state.coord.map((obj, index) => {
  //     if (index + 1 != this.state.coord.length) {
  //       // console.log(obj.lat + " " + this.state.coord[index + 1].lat)
  //       // return <ul>
  //       //   <li key={index}>{obj.lat} {obj.lng}</li>
  //       //   <li key={index + 1}>{this.state.coord[index + 1].lat} {this.state.coord[index + 1].lng}</li>
  //       // </ul>
  //     }
  //   })

  // }
  render() {

    // this.state.coord.map((obj, index) => {
    //   if (index + 1 != this.state.coord.length) {
    //     return <ul>
    //       <li key={index}>{obj.lat} {obj.lng}</li>
    //       <li key={index + 1}>{this.state.coord[index + 1].lat} {this.state.coord[index + 1].lng}</li>
    //     </ul>
    //   }
    // })
    var coord = this.state.coord;
    var completeRoute = [];
    const MapWithADirectionsRenderer = compose(
      withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBW2MiuJHeaCp1nLAmo8OBODuVwF3exCtE",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `500px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
      }),
      withScriptjs,
      withGoogleMap,
      lifecycle({
        componentWillMount() {
          // alert("in will mount " + coord[0].lat)
          var DirectionsService = new window.google.maps.DirectionsService();
          // DirectionsService.route({
          //   origin: new window.google.maps.LatLng(coord[0].lat, coord[0].lng),
          //   destination: new window.google.maps.LatLng(coord[1].lat, coord[1].lng),
          //   travelMode: 'WALKING'//window.google.maps.TravelMode.WALKING,
          // },
          //   (result, status) => {
          //     if (status === window.google.maps.DirectionsStatus.OK) {
          //       alert(JSON.stringify(result))  //result.geocoded_waypoints
          //       var list = this.state.directionList;
          //       list.push(result)
          //       this.setState({
          //         directionList: list,
          //       });
          //       //completeRoute.push(result)

          //     } else {
          //       console.error(`error fetching directions ${result}`);
          //     }
          //   });
          // DirectionsService.route({
          //   origin: new window.google.maps.LatLng(coord[1].lat, coord[1].lng),
          //   destination: new window.google.maps.LatLng(coord[2].lat, coord[2].lng),
          //   travelMode: 'WALKING'//window.google.maps.TravelMode.WALKING,
          // },
          //   (result, status) => {
          //     if (status === window.google.maps.DirectionsStatus.OK) {
          //       //  alert(JSON.stringify(result))  //result.geocoded_waypoints
          //       var list = this.state.directionList;
          //       list.push(result)
          //       this.setState({
          //         directionList: list,
          //       });
          //       // completeRoute.push(result)
          //       alert("final length is" + this.state.directionList[1])
          //     } else {
          //       console.error(`error fetching directions ${result}`);
          //     }
          //   });
          coord.map((obj, index) => {
            if (index + 1 != coord.length) {
              //  console.log("origin" + obj.lat + "," + obj.lng)
              //  console.log("\ndes" + coord[index + 1].lat + "," + coord[index + 1].lng)


              DirectionsService.route({
                origin: new window.google.maps.LatLng(31.5816332, 74.3523838),
                destination: new window.google.maps.LatLng(30.157457, 71.524918),
                waypoints: [{ location: 'Okara Punjab, Pakistan' },
                { location: 'Arifwala Pakpattan, Punjab, Pakistan' },
                { location: 'Sahiwal District, Punjab, Pakistan' }],
                travelMode: 'WALKING'//window.google.maps.TravelMode.WALKING,
              }, (result, status) => {
                console.log(result)
                if (status === window.google.maps.DirectionsStatus.OK) {
                  this.setState({
                    directions: result,
                  });
                } else {
                  console.error(`error fetching directions ${result}`);
                }
              });

            }
          })



        }
      })
    )(props =>
      <GoogleMap
        defaultZoom={5}
        defaultCenter={new window.google.maps.LatLng(31.5816332, 74.3523838)}
      >
        {/* {completeRoute.length}
        <Marker title="Marker" position={new window.google.maps.LatLng(30.157457, 71.524918)} />
        {completeRoute.map((obj) => <DirectionsRenderer directions={obj} />

        )} */}
        {props.directions && <DirectionsRenderer directions={props.directions} />}
        {/*{props.directions1 && <DirectionsRenderer directions={props.directions1} />} */}
      </GoogleMap>
    );


    return (
      <div >
        <MapWithADirectionsRenderer />
      </div>

    )
  }
}

