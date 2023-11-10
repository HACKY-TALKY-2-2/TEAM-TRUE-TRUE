const middle = ({p1, p2}) => {
  return p1 > p2 ? (p1-p2)/2 : (p2-p1)/2;
}

export const Line = ({points, color}) => {
  const [p1, p2] = points;
  const [p1x, p1y] = p1;
  const [p2x, p2y] = p2;
  const x1 = p1x;
  const y1 = p1y;
  const x2 = (p2x - p1x) > (p2y - p1y) ? (p2x - (p2y - p1y)) : p1x;
  const y2 = (p2x - p1x) > (p2y - p1y) ? p1y : (p2y - (p2x - p1x))
  const x3 = p2x;
  const y3 = p2y;

  return (
    <polyline points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`} style={{fill: 'transparent', stroke: color, strokeWidth: 5}} stroke-linejoin="round" />
  )
}

export const Circle = ({point}) => {
  return (
    <>
      <circle cx="726.233" cy="814.867" fill="#FFFFFF" id="역_방화" r="5" stroke="#8936E0" stroke-miterlimit="10" stroke-width="2"></circle>
    </>
  )
}


export const MainPage = () => {
  return (
    <div>
      <svg height="1800" width="1000">
        <Line points={[[400, 1000], [40, 100]]} color={'red'} />
        <Circle point={[400, 1000]} />
      </svg>
    </div>
  );
}

