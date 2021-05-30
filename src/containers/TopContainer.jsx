import { useEffect, useState } from "react";
import Tab from "../components/Tabs/Tab";
import Tabs from "../components/Tabs";
import AddEditRoute from "../components/AddEditRoute";
import { getStop, stopList } from "../helpers/routes.helper";
import GetRouteDetails from "../components/GetRouteDetails";

const TopContainer = (props) => {
  const [active, setActive] = useState(0);
  const [routeToEdit, setRouteToEdit] = useState(null);
  const handleChange = (newActive) => setActive(newActive);
  const updateRoutesList = (addedRoutes) => {
    const currentRoute = [...props.routesList];
    if (props.editIndex > -1) {
      currentRoute[props.editIndex] = addedRoutes[0];
      setRouteToEdit(null);
    } else {
      currentRoute.push(...addedRoutes);
    }
    props.setRoutesList(currentRoute);
  };

  useEffect(() => {
    const selectedRoute = { ...props.routesList[props.editIndex] };
    if (Object.keys(selectedRoute).length) {
      selectedRoute.selectedStopIds = selectedRoute.selectedStopIds.split("/");
      const stops = [];
      selectedRoute.selectedStopIds.forEach((id, index) => {
        stops.push(getStop(Number(id), stopList));
        selectedRoute.selectedStopIds[index] = Number(id);
      });
      selectedRoute.stops = stops;
      setRouteToEdit(selectedRoute);
    }
  }, [props.editIndex]);

  return (
    <div>
      <Tabs active={active} onChange={handleChange}>
        <Tab title="Add Route">
          <AddEditRoute
            updateRoutesList={updateRoutesList}
            routeToEdit={routeToEdit}
          />
        </Tab>
        <Tab title="Get Route">
          <GetRouteDetails
            routeId={props.searchRouteId}
            setRouteId={props.setSearchRouteId}
            setRouteDetail={props.setRouteDetail}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default TopContainer;
