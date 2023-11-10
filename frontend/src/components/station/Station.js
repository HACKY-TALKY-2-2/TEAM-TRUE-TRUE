import React, { useState } from "react";
import "./Station.css";

const Station = (props) => {
    function moveLink() {
        const linkTag = document.createElement("a");
        linkTag.href = props.link;
        linkTag.setAttribute("target", "_blank");
        linkTag.click();
    }

    return (
        <svg>
            <circle
                className="station"
                onClick={() => {
                    moveLink();
                }}
                onMouseOver={() => props.onHover(true)}
                onMouseOut={() => props.onHover(false)}
                cx={props.px}
                cy={props.py}
                fill="#FFFFFF"
                r="6"
                stroke={props.strokeColor}
                strokeWidth="3"
            />
            {/* <text
                x={props.px}
                y={props.py + 20}
                fill="#000000"
                textAnchor="middle"
                alignmentBaseline="middle"
                fontSize={12}
            >
                {props.prTitle}
            </text> */}
        </svg>
    );
};

export default Station;
