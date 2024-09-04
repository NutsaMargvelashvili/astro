import React from "react";
import Skymap from "./Skymap";
import onecandidate from "../onecandidate"; // for testing detail pages

function App() {
  return (
    <div>
      <div className="container">
        <h1 className={"astromap_caption"}>Explore the Night Sky</h1>
        {/* testing the front page sky map */}
        {/* <Skymap data={candidates} showCircle={true} showPoly={false} /> */}
        {/* testing the detail page sky map summary */}
        <Skymap data={[onecandidate]} showCircle={true} showPoly={true} />
      </div>
    </div>
  );
}

export default App;
