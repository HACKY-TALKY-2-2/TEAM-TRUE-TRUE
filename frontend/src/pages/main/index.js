const middle = ({ p1, p2 }) => {
  return p1 > p2 ? (p1 - p2) / 2 : (p2 - p1) / 2;
};

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

export const Circle = ({ point }) => {
  return (
    <>
      <circle
        cx="726.233"
        cy="814.867"
        fill="#FFFFFF"
        id="역_방화"
        r="5"
        stroke="#8936E0"
        stroke-miterlimit="10"
        stroke-width="2"
      ></circle>
    </>
  );
};

export const MainPage = () => {
  return (
    <div>
      <svg height="1800" width="1000">
        <Line
          points={[
            [0.3083684532534876, 0.215042519790858],

            [-6.191521025296183, 12.85626080753097],

            [20.696794276261016, 27.274364573073363],

            [-21.699749694588277, -38.43329054272247],

            [85.7614263898851, -1.6803928969165072],

            [-32.07794728623703, -40.71238732826135],

            [60.221380266638064, -17.442267802601226],

            [86.35400722612385, 77.32388715643313],

            [27.9945892038752, 75.76315966165056],

            [99.28765970470937, -1.9765621412533978],

            [85.86770787563042, 58.91700414278008],

            [34.94460754570934, 87.8222480768569],
          ]}
          color={"red"}
        />
        <Circle point={[400, 1000]} />
      </svg>
    </div>
  );
};
