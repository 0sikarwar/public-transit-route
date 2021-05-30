import { useEffect, useState } from "react";
import Table from "./Table";
import { getStop, stopList, randomColor } from "../helpers/routes.helper";
import { initMap } from "../helpers/googleMaps.helper";

const ShowRouteDetails = (props) => {
  const [tableData, setTableData] = useState(null);
  const [routeColor, setRouteColor] = useState(null);
  useEffect(() => {
    if (props.searchedRoute?.length) {
      const coordinateArr = [];
      const routeColorObj = {};
      const colorArr = [];
      const currentTableData = props.searchedRoute.map((item) => {
        const stops = item.selectedStopIds
          .split("/")
          .map((key) => getStop(Number(key), stopList));
        const coordinates = [];
        const color = randomColor();
        item.stops = stops
          .map((item) => {
            coordinates.push({
              lat: Number(item.latitude),
              lng: Number(item.longitude),
            });
            return item.name;
          })
          .join(" => ");
        routeColorObj[item.routeId] = color;
        colorArr.push(color);
        coordinateArr.push(coordinates);
        return item;
      });
      initMap(coordinateArr, colorArr);
      setRouteColor(routeColorObj);
      setTableData(currentTableData);
    } else {
      setRouteColor(null);
      setTableData(null);
    }
  }, [props.searchedRoute]);
  return (
    <>
      {tableData ? (
        <div className="box">
          <Table list={tableData} />
          <div className="flex flex-between mt-20">
            <h3>Map view</h3>
            <div className="flex">
              <h4> Route Colors: </h4>
              {Object.keys(routeColor).map((key, index) => (
                <div key={index} className="p-5">
                  <div>{key}</div>
                  <hr
                    style={{
                      width: "50px",
                      border: "3px solid " + routeColor[key],
                      opacity: 0.6,
                      borderRadius: "3px",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <h3>No data found</h3>
      )}
      <div
        id="map"
        style={{
          width: "100%",
          height: "400px",
          display: tableData ? "block" : "none",
        }}
      ></div>
    </>
  );
};

export default ShowRouteDetails;
