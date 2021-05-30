import { useEffect, useState } from "react";
import Tab from "../components/Tabs/Tab";
import Tabs from "../components/Tabs";
import Table from "../components/Table";
import ShowRouteDetails from "../components/ShowRouteDetails";
import { Dropdown } from "../components/FormElements";
import { export2File } from "../helpers/routes.helper";
const BottomContainer = (props) => {
  const [active, setActive] = useState(0);

  const handleChange = (newActive) => setActive(newActive);

  const handleDelete = (index) => {
    const currentRouteList = [...props.routesList];
    currentRouteList.splice(index, 1);
    props.setRoutesList(currentRouteList);
  };

  const handleEdit = (index) => {
    props.setEditIndex(index);
  };

  useEffect(() => {
    if (props.searchedRoute) {
      setActive(1);
    }
  }, [props.searchedRoute]);

  const handleDownloadClick = (e) => {
    export2File(
      Object.keys(props.routesList[0]),
      props.routesList,
      e.target.value
    );
  };
  return (
    <div>
      <Tabs active={active} onChange={handleChange}>
        <Tab title="Show All route">
          <div className="flex flex-between">
            <h4>List of all routes</h4>
            <div className="flex">
              <Dropdown
                label="Download data"
                list={[".txt", ".csv"]}
                onChange={handleDownloadClick}
              />
            </div>
          </div>
          {props.routesList.length ? (
            <Table
              list={props.routesList}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ) : (
            "No record found"
          )}
        </Tab>
        <Tab title="Searched Route Details" disabled={!props.searchedRoute}>
          {props.searchedRoute && (
            <ShowRouteDetails searchedRoute={props.searchedRoute} />
          )}
        </Tab>
      </Tabs>
    </div>
  );
};

export default BottomContainer;
