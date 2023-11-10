const middle = ({ p1, p2 }) => {
  return p1 > p2 ? (p1 - p2) / 2 : (p2 - p1) / 2;
};

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
            [1000, 300],
            [10, 10],
          ]}
          color={"red"}
        />
        <Circle point={[400, 1000]} />
      </svg>
    </div>
  );
};
