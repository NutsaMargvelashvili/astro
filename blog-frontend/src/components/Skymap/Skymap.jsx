import React, { useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 0.25em 1em;
  margin: 1em;
  border-radius: 10px;
  border: 2px solid ${(props) => props.theme.main};
`;

function Skymap(props) {
  useEffect(() => {
    const loadScript = (url) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = url;
        script.type = "text/javascript";
        script.defer = true;
        script.charset = "utf-8";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
        document.head.appendChild(script);
      });
    };

    const initAladin = async () => {
      try {
        // Load external scripts
        await loadScript("http://code.jquery.com/jquery-1.9.1.min.js");
        await loadScript("http://aladin.u-strasbg.fr/AladinLite/api/v2/latest/aladin.min.js");

        // Wait for Aladin to be available
        const A = window.A;

        if (!A) {
          throw new Error("Aladin library is not available on the global object");
        }

        let fov = 180;
        let targetCenter = "0.00 0.00";
        if (props.showPoly) {
          fov = 100;
          targetCenter = `${props.data[0].ra} ${props.data[0].dec}`;
        }

        let aladin = A.aladin("#aladin-lite-div", {
          survey: "P/DSS2/color",
          fov: fov,
          showShareControl: true,
          target: targetCenter
        });

        let EHEList = [];
        let HESEList = [];
        let GoldList = [];
        let BronzeList = [];

        let eheoverlay = A.graphicOverlay({
          name: "EHE Error circle",
          color: "#063fcf",
          lineWidth: 3
        });
        aladin.addOverlay(eheoverlay);

        let heseoverlay = A.graphicOverlay({
          name: "HESE Error circle",
          color: "#b31800",
          lineWidth: 3
        });
        aladin.addOverlay(heseoverlay);

        let bronzeoverlay = A.graphicOverlay({
          name: "HESE Bronze Error circle",
          color: "#cd7f32",
          lineWidth: 3
        });
        aladin.addOverlay(bronzeoverlay);

        let goldoverlay = A.graphicOverlay({
          name: "HESE Gold Error circle",
          color: "#d4af37",
          lineWidth: 3
        });
        aladin.addOverlay(goldoverlay);

        // Add markers
        props.data.forEach((info) => {
          if (info.ra != null) {
            let desc = `<p style="color:black;"><em>Alert type:</em> ${info.type}`;
            desc += `<br/><em>RA:</em> ${info.ra} <em>Dec:</em> ${info.dec}`;
            desc += `<br/><em>Trigger time:</em> ${info.time}<br/>`;
            desc += `<br/>Report <a target="_blank" href="api/candidate/${info._id}">Link</a></p>`;

            let marker = A.marker(info.ra, info.dec, {
              popupTitle: `<b style="color:black;">${info.name}</b>`,
              popupDesc: desc
            });

            if (info.type === "hese-bronze") BronzeList.push(marker);
            else if (info.type === "hese-gold") GoldList.push(marker);
            else if (info.type === "ehe") EHEList.push(marker);
            else HESEList.push(marker);

            if (props.showCircle && avg50Err(info) !== 0) {
              let circle = A.circle(info.ra, info.dec, avg50Err(info));
              if (info.type === "hese-bronze") bronzeoverlay.add(circle);
              else if (info.type === "hese-gold") goldoverlay.add(circle);
              else if (info.type === "ehe") eheoverlay.add(circle);
              else heseoverlay.add(circle);
            }
          }
        });

        // Show polylines
        if (props.showPoly) {
          props.data.forEach((info) => {
            if (info.json !== undefined) {
              if (info.json.contour50 !== undefined) {
                let footprintLayer = A.graphicOverlay({
                  name: "50% contour",
                  color: "yellow",
                  lineWidth: 2
                });
                aladin.addOverlay(footprintLayer);
                footprintLayer.addFootprints([A.polygon(info.json.contour50)]);
              }
              if (info.json.contour90 !== undefined) {
                let footprintLayer = A.graphicOverlay({
                  name: "90% contour",
                  color: "orange",
                  lineWidth: 2
                });
                aladin.addOverlay(footprintLayer);
                footprintLayer.addFootprints([A.polygon(info.json.contour90)]);
              }
            }
          });
        }

        let EHELayer = A.catalog({
          name: "IceCube EHE Alerts",
          sourceSize: 12,
          color: "blue",
          onClick: "showPopup"
        });
        aladin.addCatalog(EHELayer);

        let HESELayer = A.catalog({
          name: "IceCube HESE Alerts",
          sourceSize: 12,
          color: "red",
          onClick: "showPopup"
        });
        aladin.addCatalog(HESELayer);

        let BronzeLayer = A.catalog({
          name: "IceCube HESE Bronze Alerts",
          sourceSize: 12,
          color: "green",
          onClick: "showPopup"
        });
        aladin.addCatalog(BronzeLayer);

        let GoldLayer = A.catalog({
          name: "IceCube HESE Gold Alerts",
          sourceSize: 12,
          color: "yellow",
          onClick: "showPopup"
        });
        aladin.addCatalog(GoldLayer);

        EHELayer.addSources(EHEList);
        HESELayer.addSources(HESEList);
        BronzeLayer.addSources(BronzeList);
        GoldLayer.addSources(GoldList);
      } catch (error) {
        console.error("Error initializing Aladin:", error);
      }
    };

    initAladin();
  }, [props.data, props.showCircle, props.showPoly]);

  return (
      <Wrapper>
        <h2>This area is for the skymap.</h2>

        <div
            id="aladin-lite-div"
            style={{ width: "1000px", height: "600px" }}
        ></div>
      </Wrapper>
)
  ;
}

function avg50Err(info) {
  let cnt = 0;
  let sum = 0.0;
  if (info.ra50plus !== undefined) {
    sum += Math.abs(info.ra50plus);
    cnt += 1;
  }
  if (info.ra50minus !== undefined) {
    sum += Math.abs(info.ra50minus);
    cnt += 1;
  }
  if (info.dec50plus !== undefined) {
    sum += Math.abs(info.dec50plus);
    cnt += 1;
  }
  if (info.dec50minus !== undefined) {
    sum += Math.abs(info.dec50minus);
    cnt += 1;
  }
  if (cnt === 0) return 0;
  return (1.0 * sum) / cnt;
}

export default Skymap;
