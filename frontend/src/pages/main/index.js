import StationList from "../../components/station/StationList";

export const Line = ({ points, color }) => {
    return points.map((elem, i) => {
        if (points.length === i + 1) {
            return null;
        }
        let p1 = points[i];
        let p2 = points[i + 1];
        let [p1x, p1y] = p1;
        let [p2x, p2y] = p2;
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

        return (
            <polyline
                points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`}
                style={{ fill: "transparent", stroke: color, strokeWidth: 5 }}
                stroke-linejoin="round"
            />
        );
    });
};

export const MainPage = () => {
    const points = [
        [500 + 0.3083684532534876, 200 + 0.215042519790858],

        [500 + -6.191521025296183, 200 + 12.85626080753097],

        [500 + 20.696794276261016, 200 + 27.274364573073363],

        [500 + -21.699749694588277, 200 + -38.43329054272247],

        [500 + 85.7614263898851, 200 + -1.6803928969165072],

        [500 + -32.07794728623703, 200 + -40.71238732826135],

        [500 + 60.221380266638064, 200 + -17.442267802601226],

        [500 + 86.35400722612385, 200 + 77.32388715643313],

        [500 + 27.9945892038752, 200 + 75.76315966165056],

        [500 + 99.28765970470937, 200 + -1.9765621412533978],

        [500 + 85.86770787563042, 200 + 58.91700414278008],

        [500 + 34.94460754570934, 200 + 87.8222480768569],
    ];

    return (
        <div>
            <svg height="1800" width="1000">
                <Line points={points} color={"red"} />
                <StationList points={points} />
            </svg>
        </div>
    );
};
