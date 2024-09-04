// /* A custom Hook that can used as script tag */

// import React, { useState, useEffect } from "react";

// function ImportScript(props) {
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = props.resourceUrl;
//     script.async = true;
//     document.body.appendChild(script);
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, [resourceUrl]);

// export default ImportScript;
