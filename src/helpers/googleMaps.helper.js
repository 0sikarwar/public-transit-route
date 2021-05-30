export const addGoogleApiJs = () => {
  const GOOGLE_SCRIPT = `https://maps.googleapis.com/maps/api/js`;
  const script = document.createElement("script");
  script.setAttribute("src", GOOGLE_SCRIPT);
  script.setAttribute("async", false);
  script.setAttribute("data-page-type", "checkout");
  document.head.appendChild(script);
};

export const initMap = (pathCoordinates, colorObj) => {
  const map = new window.google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: pathCoordinates[0][0],
    mapTypeId: "roadmap",
  });
  const lineSymbol = {
    path: window.google.maps.SymbolPath.FORWARD_OPEN_ARROW,
  };
  pathCoordinates.forEach((coordinates, index) => {
    new window.google.maps.Polyline({
      path: coordinates,
      geodesic: true,
      strokeColor: colorObj[index],
      strokeOpacity: 0.6,
      strokeWeight: 2,
      icons: [
        {
          icon: lineSymbol,
          offset: "100%",
          repeat: "50px",
        },
      ],
      map: map,
    });
  });
};

export const randomColor = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16);
