import React, { useState, useEffect } from "react";
import getPRdata from "./DummyData";
import Station from "./Station";
import { getPRDatas } from "../../api/Station";
import "./Station.css";

const StationList = (props) => {
    const [stationInfo, setStationInfo] = useState();
    const [stationDiv, setStationDiv] = useState();

    // useEffect(() => {
    //     setStationInfo(getPRdata());
    //     // getPRDatas("sparcs-kaist", "taxi-app").then((res) => {
    //     //     console.log(res);
    //     //     setStationInfo(res);
    //     // });
    // }, []);

    useEffect(() => {
        // console.log(props.color);
        // console.log(props.points);
        let stations = [];
        props.points.map((station, index) => {
            stations.push(
                <Station
                    key={station.pr.id}
                    link={station.pr.html_url}
                    px={props.points[index]["x"] + 500}
                    py={props.points[index]["y"] + 200}
                    prTitle={station.pr.title}
                    strokeColor={props.color}
                    body={station.pr.body}
                    assignees={station.pr.assignees}
                    created_at={station.pr.created_at}
                    draft={station.pr.draft}
                    state={station.pr.state}
                />
            );
        });

        setStationDiv(stations);
    }, [stationInfo]);

    return <>{stationDiv}</>;
};

export default StationList;
