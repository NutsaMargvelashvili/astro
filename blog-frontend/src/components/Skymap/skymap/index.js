function include(file) {
  var script = document.createElement("script");
  script.src = file;
  script.type = "text/javascript";
  script.defer = true;
  script.charset = "utf-8";

  document.getElementsByTagName("head").item(0).appendChild(script);
}

/* Include Many js files */
include("http://code.jquery.com/jquery-1.9.1.min.js");
include("http://aladin.u-strasbg.fr/AladinLite/api/v2/latest/aladin.min.js");
