import { useEffect, useState } from "react";
import BottomContainer from "./containers/BottomContainer";
import TopContainer from "./containers/TopContainer";
import { addGoogleApiJs } from "./helpers/googleMaps.helper";
import "./styles/App.css";

const App = () => {
  const [routesList, setRoutesList] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [searchRouteId, setSearchRouteId] = useState("");
  const [searchedRoute, setSearchRoute] = useState(null);
  useEffect(() => {
    if (window.localStorage) {
      const temp = localStorage.getItem("routesList");
      temp && setRoutesList(JSON.parse(temp));
    }
    addGoogleApiJs();
  }, []);

  useEffect(() => {
    if (window.localStorage) {
      localStorage.setItem("routesList", JSON.stringify(routesList));
    }
    editIndex > -1 && setEditIndex(-1);
  }, [routesList]);

  const setRouteDetail = () => {
    const routeIds = searchRouteId.split(",").map((id) => id.trim());
    const temp = routesList.filter((item) => routeIds.includes(item.routeId));
    setSearchRoute(temp);
  };

  return (
    <div className="App">
      <TopContainer
        routesList={routesList}
        setRoutesList={setRoutesList}
        editIndex={editIndex}
        searchRouteId={searchRouteId}
        setSearchRouteId={setSearchRouteId}
        setRouteDetail={setRouteDetail}
      />
      <BottomContainer
        routesList={routesList}
        setRoutesList={setRoutesList}
        setEditIndex={setEditIndex}
        searchedRoute={searchedRoute}
      />
    </div>
  );
};

export default App;
