import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService';
import { MapContainer, TileLayer, Marker, Circle, CircleMarker, Popup, Tooltip ,Polygon , Rectangle  } from "react-leaflet";
import { Icon } from "leaflet";
import './leaflet@1.6.0.css';
import './leaflet-map.css';
import * as parkData from "./data/skateboard-parks.json";
export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { forecasts: [], loading: true, activePark: JSON, setActivePark:JSON };
  }

  componentDidMount() {
    this.populateWeatherData();
  }

  static renderForecastsTable(forecasts) {
    //return (   
    //   <table className='table table-striped' aria-labelledby="tabelLabel">
    //     <thead>
    //       <tr>
    //         <th>Date</th>
    //         <th>Temp. (C)</th>
    //         <th>Temp. (F)</th>
    //         <th>Summary</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {forecasts.map(forecast =>
    //         <tr key={forecast.date}>
    //           <td>{forecast.date}</td>
    //           <td>{forecast.temperatureC}</td>
    //           <td>{forecast.temperatureF}</td>
    //           <td>{forecast.summary}</td>
    //         </tr>
    //       )}
    //     </tbody>
    //   </table>
    // );


    return (
      <MapContainer center={[45.4, -75.7]} zoom={12}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    );
  }

  
  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderForecastsTable(this.state.forecasts);

    return (
      <div>
        <h1 id="tabelLabel" >Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  callThisHere(){
    console.log("here");
  }

  async populateWeatherData() {
    const token = await authService.getAccessToken();
    const response = await fetch('weatherforecast', {
      headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    this.setState({ forecasts: data, loading: false });
  }
}
