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
        console.log(props.owner, props.repo);
        props.owner &&
            props.repo &&
            getPRDatas(props.owner, props.repo).then((res) => {
                console.log(res);
                setStationInfo(res);
            });
    }, [props.owner, props.repo]);

    useEffect(() => {
        // console.log(props.color);
        // console.log(props.points);
        let stations = [];
        stationInfo &&
            stationInfo.map((station, index) => {
                stations.push(
                    <Station
                        key={station.id}
                        link={station.html_url}
                        px={props.points[index] ? props.points[index][0] : -1}
                        py={props.points[index] ? props.points[index][1] : -1}
                        prTitle={station.title}
                        strokeColor={props.color}
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
