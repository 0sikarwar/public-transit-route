import { useEffect, useState } from "react";
import {
  getFileDataInObj,
  getStop,
  routeFields,
  stopList,
} from "../helpers/routes.helper";
import { Dropdown, Input } from "./FormElements";
import Table from "./Table";

const AddEditRoute = (props) => {
  const [routeData, setRouteData] = useState({});
  const [file, setFile] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleDataChange = (e) => {
    const element = e.target;
    const currentRouteData = { ...routeData };
    currentRouteData[element.name] = element.value;
    if (element.name === "stops") {
      currentRouteData.selectedStopIds = element.updatedKeysArr;
    }
    setRouteData(currentRouteData);
  };

  useEffect(() => {
    if (props.routeToEdit) {
      setIsSubmitted(false);
      setRouteData(props.routeToEdit);
    }
  }, [props.routeToEdit]);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const getFileData = async () => {
    if (file) {
      const fileInObj = await getFileDataInObj(file);
      if (fileInObj) {
        setRouteData(fileInObj);
        setIsSubmitted(true);
      }
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      let dataToSave = {};
      if (routeData.list) {
        dataToSave = routeData.list;
      } else {
        Object.keys(routeData).forEach((key) => {
          if (key !== "stops" && key !== "selectedStopIds") {
            dataToSave[key] = routeData[key];
          } else if (key === "selectedStopIds") {
            dataToSave.selectedStopIds = routeData.selectedStopIds.join("/");
          }
        });
      }
      props.updateRoutesList(routeData.list ? dataToSave : [dataToSave]);
    }
  }, [isSubmitted]);

  const getRouteDataForTable = () => {
    const obj = {};
    Object.keys(routeData).forEach((key) => {
      if (key !== "stops" && key !== "selectedStopIds") {
        obj[key] = routeData[key];
      } else if (key === "selectedStopIds") {
        obj.selectedStops = routeData.selectedStopIds
          .map((key) => getStop(key, stopList).name)
          .join(" => ");
      }
    });
    return obj;
  };

  const resetState = () => {
    setRouteData({});
    setFile(null);
    setIsSubmitted(false);
  };

  return !isSubmitted ? (
    <>
      <div className="box">
        <div className="flex flex-middle ">
          {routeFields().map((field) =>
            field.type === "dropdown" ? (
              <Dropdown
                {...field}
                value={routeData[field.name] || ""}
                onChange={handleDataChange}
                className={field.key === "stops" && "l-dropdown"}
                selectedKeysArr={
                  field.key === "stops" && (routeData.selectedStopIds || [])
                }
              />
            ) : (
              <Input
                {...field}
                value={routeData[field.name] || ""}
                onChange={handleDataChange}
              />
            )
          )}
          <button
            className="button m-5"
            onClick={() =>
              Object.keys(routeData).length && setIsSubmitted(true)
            }
          >
            Submit
          </button>
        </div>
        {!!routeData.stops?.length && (
          <div>
            <h4> Stops are selected in Following order </h4>
            <div>{routeData.stops.map((item) => item.name).join(" => ")}</div>
          </div>
        )}
      </div>
      <h3>OR</h3>
      <div className="box flex flex-middle">
        <h4>Import from file: </h4>
        <input type="file" onChange={onFileChange} className="m-5" />
        <button className="button" onClick={getFileData}>
          Submit
        </button>
      </div>
    </>
  ) : (
    (routeData?.column || Object.keys(routeData).length) && (
      <div className="box">
        <button className="button" onClick={resetState}>
          Add More routes
        </button>
        <h4>Following routes added/updated</h4>
        <Table
          column={routeData?.column}
          list={routeData?.list || [getRouteDataForTable()]}
        />
      </div>
    )
  );
};

export default AddEditRoute;
