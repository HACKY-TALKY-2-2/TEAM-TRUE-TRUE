import React, { useState, useEffect } from "react";
import getPRdata from "./DummyData";
import Station from "./Station";
import "./Station.css";

const StationList = (props) => {
  const [stationInfo, setStationInfo] = useState();
  const [stationDiv, setStationDiv] = useState();

  useEffect(() => {
    setStationInfo(getPRdata());
  }, []);

  useEffect(() => {
    console.log(stationInfo);
    let stations = [];
    stationInfo &&
      stationInfo.map((station, index) => {
        stations.push(
          <Station
            key={station.id}
            link={station.html_url}
            px={props.points[index][0]}
            py={props.points[index][1]}
            prTitle={station.title}
            strokeColor="red"
            body={station.body}
            assignees={station.assignees}
            created_at={station.created_at}
            draft={station.draft}
            state={station.state}
          />
        );
      });

    setStationDiv(stations);
  }, [stationInfo]);

  return <>{stationDiv}</>;
};

export default StationList;
