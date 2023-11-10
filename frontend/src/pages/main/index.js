import React, { useEffect, useState } from "react";
import StationList from "../../components/station/StationList";
import { useLocation } from "react-router-dom";
import { getPoints } from "../../api/Station";

const Profile = ({ avatar, name }) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <img
      src={avatar}
      alt="Profile Avatar"
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "10px",
        marginRight: "5px",
      }}
    />

    <span>{name}</span>
  </div>
);

const middlePoint = ({ points, idx }) => {
  if (points.length == idx + 1) {
    return <></>;
  }
  let p1 = points[idx];
  let p2 = points[idx + 1];

  let p1x = p1["x"] + 500;
  let p1y = p1["y"] + 200;
  let p2x = p2["x"] + 500;
  let p2y = p2["y"] + 200;
  let x1 = p1x;
  let y1 = p1y;
  let x2;
  let y2;
  let x3 = p2x;
  let y3 = p2y;
  let flag = Math.random([0, 1], 1);

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
  return [
    [x1, y1],
    [x2, y2],
    [x3, y3],
  ];
};
export const Line = ({ points, color }) => {
  if (points.length === 0 || points.length === 1) {
    return null;
  }
  if (points.length === 2) {
    const point_list = middlePoint({ points: points, idx: 0 });
    const point_props = point_list
      .map((elem) => `${elem[0]},${elem[1]}`)
      .join(" ");
    return (
      <polyline
        points={point_props}
        style={{ fill: "transparent", stroke: color, strokeWidth: 5 }}
        stroke-linejoin="round"
      />
    );
  } else {
    const point_list_temp = points.map((_, i) =>
      middlePoint({ points: points, idx: i })
    );
    const last_point = point_list_temp[point_list_temp.length - 1];
    const point_list_temp2 = point_list_temp.slice(
      0,
      point_list_temp.length - 1
    );
    const point_list = point_list_temp2.map((elem) => elem.slice(0, -1)).flat();
    point_list.push(last_point);
    const point_props = point_list
      .map((elem) => `${elem[0]},${elem[1]}`)
      .join(" ");
    return (
      <polyline
        points={point_props}
        style={{ fill: "transparent", stroke: color, strokeWidth: 5 }}
        stroke-linejoin="round"
      />
    );
  }
};

const chatcolors = [
  "red",
  "blue",
  "green",
  "#759C69",
  "#E68CB9",
  "#6E665D",
  "#5D7ED6",
  "#4A66C5",
  "#72AEC3",
  "#67A6C5",
  "#A45C3F",
  "#7A93AA",
  "#FA9400",
  "#BA2710",
  "#5E82C4",
  "#79402A",
  "#723E47",
  "#DC814E",
  "#B85F91",
  "#499370",
  "#78A569",
  "#E59C1B",
  "#519D3C",
  "#8E5897",
  "#868544",
  "#5BA688",
  "#FFE84E",
  "#535f2D",
  "#CE8E00",
  "#91A543",
  "#797C7f",
  "#DBDD6B",
  "#4C69C4",
  "#CE5EC9",
  "#FF7800",
  "#898C94",
  "#CE5155",
  "#4B8D9C",
  "#2F388B",
  "#BE49BC",
  "#3A5996",
  "#7F499F",
  "#C6936B",
  "#B49EA9",
  "#9C459E",
  "#D9B6BA",
  "#7865c2",
  "#CA88A3",
  "#B87C4B",
  "#CA5374",
  "#5888C8",
  "#796552",
  "#E1DE19",
  "#A88C82",
  "#aeb1bd",
  "#D34944",
  "#ACABAE",
  "#EFB422",
  "#8ABC2F",
  "#9A9A9D",
  "#966047",
  "#57929e",
  "#ED582C",
  "#434352",
  "#294233",
  "#8EBF00",
  "#6F659D",
];

export const MainPage = () => {
  const location = useLocation();
  const [owner, setOwner] = useState();
  const [repo, setRepo] = useState();
  const [points, setPoints] = useState();
  const [hoverPoint, setHoverPoint] = useState();

  useEffect(() => {
    const parts = location.pathname.split("/");
    setOwner(parts[1]);
    setRepo(parts[2]);
  }, [location]);

  useEffect(() => {
    owner &&
      repo &&
      getPoints(owner, repo, "main").then((res) => {
        setPoints(res);
      });
  }, [repo]);

  console.log(hoverPoint);

  return (
    <div>
      <svg height="1800" width="1000">
        {points &&
          points.map((elem, index) => {
            return <Line points={elem} color={chatcolors[index]} />;
          })}
        {points &&
          points.map((elem, index) => {
            return (
              <StationList
                points={elem}
                color={chatcolors[index]}
                onHoverPoint={(p) => setHoverPoint(p)}
              />
            );
          })}
        {hoverPoint && (
          <svg id="data">
            <foreignObject
              x={hoverPoint.point["x"] + 500 + 40}
              y={hoverPoint.point["y"] + 200 - 80}
              fill="white"
              width="300"
              height="200"
              transform={`translate(${20}, ${20})`}
            >
              <body xmlns="http://www.w3.org/1999/xhtml">
                <div
                  style={{
                    padding: 20,
                    borderRadius: 20,
                    backgroundColor: "white",
                    border: "1px solid black",
                  }}
                >
                  <div>{hoverPoint.station.title}</div>
                  <br />
                  {hoverPoint.station.assignees.map((assignee) => (
                    <div key={assignee.login}>
                      <Profile
                        avatar={assignee.avatar_url}
                        name={assignee.login}
                      />
                    </div>
                  ))}
                  <br />
                  <div>Time : {hoverPoint.station.created_at}</div>
                  <div>
                    Draft : {hoverPoint.station.draft ? "true" : "false"}
                  </div>
                  <div>State : {hoverPoint.station.state}</div>
                </div>
              </body>
            </foreignObject>
          </svg>
        )}
      </svg>
    </div>
  );
};
