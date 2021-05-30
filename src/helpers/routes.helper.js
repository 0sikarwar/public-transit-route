export const routeFields = (stops) => [
  {
    key: "name",
    name: "name",
    label: "Route Name",
    type: "Text",
  },
  {
    key: "direction",
    name: "direction",
    label: "Route Direction",
    type: "dropdown",
    list: ["Up", "Down"],
  },
  {
    key: "routeId",
    name: "routeId",
    label: "Route Id",
    type: "Text",
  },
  {
    key: "status",
    name: "status",
    label: "Route Status",
    type: "dropdown",
    list: ["Active", "Inactive"],
  },
  {
    key: "routeType",
    name: "routeType",
    label: "Route Type",
    type: "dropdown",
    list: ["AC", "General"],
  },
  {
    key: "stops",
    name: "stops",
    label: "Route Stops",
    type: "dropdown",
    list: stops || stopList,
    keyToMatch: "stopId",
    multiSelect: true,
  },
];

export const stopList = [
  {
    stopId: 1,
    name: "Collector Office",
    latitude: "19.0609",
    longitude: "72.8496",
  },
  {
    stopId: 2,
    name: "Parel, Gautam Nagar",
    latitude: "19.009161",
    longitude: "72.837608",
  },
  {
    stopId: 3,
    name: "Gateway Of India Mumbai",
    latitude: "18.922064",
    longitude: "72.834641",
  },
  {
    stopId: 4,
    name: "Chhatrapati Shivaji International Airport",
    latitude: "19.097403",
    longitude: "72.874245",
  },
  {
    stopId: 5,
    name: "Borivali, Mumbai",
    latitude: "19.228825",
    longitude: "72.854118",
  },
  {
    stopId: 6,
    name: "Girgaum Chowpatty",
    latitude: "18.954269",
    longitude: "72.811501",
  },
];

export const getStop = (id, stopList) =>
  stopList.filter((item) => item.stopId === id)[0];

export const getFileDataInObj = (file) => {
  const regex = /^([a-zA-Z0-9\s_\\.\-:()])+(.csv|.txt)$/;
  if (regex.test(file.name.toLowerCase())) {
    if (typeof FileReader != "undefined") {
      return new Promise((resolve, reject) => {
        try {
          let column;
          const list = [];
          const reader = new FileReader();
          reader.onload = function (e) {
            const rows = e.target.result.split(/\r\n|\n/);
            column = rows[0].split(",").map((str) => str.replace(/"/g, ""));
            for (let i = 1; i < rows.length; i++) {
              const cells = rows[i].split(",");
              if (cells.length === column.length) {
                const obj = {};
                for (let j = 0; j < cells.length; j++) {
                  obj[column[j]] = cells[j].replace(/"/g, "");
                }
                list.push(obj);
              }
            }
            resolve({ list, column });
          };
          reader.readAsText(file);
        } catch (e) {
          reject(e);
        }
      });
    } else {
      console.error("This browser does not support HTML5.");
      return null;
    }
  } else {
    alert("Please choose valid CSV or TXT file");
    return null;
  }
};

export const export2File = (column, list, fileType) => {
  const csvString = [
    [column.map((key) => '"' + key + '"')],
    ...list.map((item) => [
      column.map((key) => '"' + item[key] + '"').join(","),
    ]),
  ]
    .map((e) => e.join(","))
    .join("\r\n");

  const element = document.createElement("a");
  element.href = "data:text/csv;charset=utf-8," + encodeURI(csvString);
  element.target = "_blank";
  element.download = "route" + fileType;
  element.click();
};

export const randomColor = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16);
