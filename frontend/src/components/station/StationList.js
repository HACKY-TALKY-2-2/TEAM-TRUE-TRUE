import React, { useState, useEffect } from "react";
import getPRdata from "./DummyData";
import Station from "./Station";
import "./Station.css";

export const Line = ({ points, color }) => {
    const [p1, p2] = points;
    let [p1x, p1y] = p1;
    let [p2x, p2y] = p2;
    const x1 = p1x;
    const y1 = p1y;
    let x2;
    let y2;
    const x3 = p2x;
    const y3 = p2y;
    let flag = 1;

    //무조건 p1x<p2x ...
    if (p1x > p2x) {
        [p1x, p2x] = [p2x, p1x];
        [p1y, p2y] = [p2y, p1y];
    }

    if (Math.abs(p1x - p2x) > Math.abs(p1y - p2y)) {
        //1,2
        if (flag) {
            x2 = p2y > p1y ? p2x - (p2y - p1y) : p2x - (p1y - p2y);
            y2 = p1y;
        } else {
            x2 = p2y > p1y ? p1x + (p2y - p1y) : p1x + (p1y - p2y);
            y2 = p2y;
        }
    } else {
        if (flag) {
            x2 = p1x;
            y2 = p2y > p1y ? p2y - (p2x - p1x) : p2y + (p2x - p1x);
        } else {
            x2 = p2x;
            y2 = p2y > p1y ? p1y + (p2x - p1x) : p1y - (p2x - p1x);
        }
    }

    return (
        <polyline
            points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`}
            style={{ fill: "transparent", stroke: color, strokeWidth: 5 }}
            stroke-linejoin="round"
        />
    );
};

const StationList = () => {
    const testPos = [
        [60.221380266638064, -17.442267802601226],
        [86.35400722612385, 77.32388715643313],
        [27.9945892038752, 75.76315966165056],
        [99.28765970470937, -1.9765621412533978],
        [85.86770787563042, 58.91700414278008],
        [34.94460754570934, 87.8222480768569],
    ];

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
                        px={400 + testPos[index][0]}
                        py={100 + testPos[index][1]}
                        prTitle={station.title}
                        strokeColor="black"
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
