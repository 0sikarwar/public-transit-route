import { Input } from "./FormElements";

const GetRouteDetails = (props) => {
  return (
    <div className="box flex flex-middle">
      <Input
        label={"Enter Comma (,) saprated Route ID"}
        value={props.routeId || ""}
        onChange={(e) => props.setRouteId(e.target.value)}
        className="w-300"
      />
      <button
        className="button m-5"
        onClick={() => props.routeId && props.setRouteDetail()}
      >
        Submit
      </button>
    </div>
  );
};

export default GetRouteDetails;
