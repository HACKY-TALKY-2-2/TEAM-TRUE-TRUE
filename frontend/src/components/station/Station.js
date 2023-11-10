import React, { useEffect, useState } from "react";
import "./Station.css";

const Profile = ({ avatar, name }) => (
    <div style={{ display: "flex", alignItems: "center" }}>
        <img
            src={avatar}
            alt="Profile Avatar"
            style={{ width: "20px", height: "20px", borderRadius: "10px", marginRight: "5px" }}
        />
        <span>{name}</span>
    </div>
);

const Station = (props) => {
    const [isHovered, setIsHovered] = useState(false);

    function moveLink() {
        const linkTag = document.createElement("a");
        linkTag.href = props.link;
        linkTag.setAttribute("target", "_blank");
        linkTag.click();
    }

    return (
        <svg>
            {isHovered && (
                <>
                    <rect
                        x={props.px + 40}
                        y={props.py - 80}
                        width="300"
                        height="200"
                        rx="20" // x 방향의 모서리 반지름
                        ry="20" // y 방향의 모서리 반지름
                        fill="white"
                        stroke="black"
                        strokeWidth="2"
                    />

                    <foreignObject
                        x={props.px + 40}
                        y={props.py - 80}
                        fill="white"
                        width="300"
                        height="200"
                        transform={`translate(${20}, ${20})`}
                    >
                        <body xmlns="http://www.w3.org/1999/xhtml">
                            <div>Assignees:</div>
                            {props.assignees.map((assignee) => (
                                <div key={assignee.login}>
                                    <Profile avatar={assignee.avatar_url} name={assignee.login} />
                                </div>
                            ))}
                            <br />
                            <div>Time : {props.created_at}</div>
                            <br />
                            <div>draft : {props.draft ? "true" : "false"}</div>
                            <br />
                            <div>Stage : {props.state}</div>
                        </body>
                    </foreignObject>
                </>
            )}

            <circle
                className="station"
                onClick={() => {
                    moveLink();
                }}
                onMouseOver={() => setIsHovered(true)}
                onMouseOut={() => setIsHovered(false)}
                cx={props.px}
                cy={props.py}
                fill="#FFFFFF"
                id="역_방화"
                r="10"
                stroke={props.strokeColor}
                strokeWidth="5"
            />
            <text
                x={props.px}
                y={props.py + 20}
                fill="#000000"
                textAnchor="middle"
                alignmentBaseline="middle"
                fontSize={12}
            >
                {props.prTitle}
            </text>
        </svg>
    );
};

export default Station;
