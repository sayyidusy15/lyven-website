const orbits = [
  { cx: 840, cy: 430, rx: 1040, ry: 390, rotate: -7, duration: "32s", begin: "-9s", reverse: false },
  { cx: 805, cy: 420, rx: 585, ry: 640, rotate: 8, duration: "24s", begin: "-17s", reverse: true },
  { cx: 990, cy: 410, rx: 760, ry: 560, rotate: 27, duration: "35s", begin: "-23s", reverse: false },
  { cx: 720, cy: 500, rx: 930, ry: 330, rotate: -23, duration: "27s", begin: "-5s", reverse: true },
];

function ellipsePath(cx: number, cy: number, rx: number, ry: number) {
  return `M ${cx - rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx + rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx - rx} ${cy}`;
}

export default function OrbitBackground() {
  return (
    <div className="lyven-orbits" aria-hidden="true">
      <svg viewBox="0 0 1680 850" preserveAspectRatio="xMidYMid slice" role="presentation">
        <defs>
          <radialGradient id="orbitNode" cx="35%" cy="30%" r="70%">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.3" stopColor="#a9d2ff" />
            <stop offset="1" stopColor="#0066ff" />
          </radialGradient>
          <filter id="nodeGlow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {orbits.map((orbit, index) => {
          const path = ellipsePath(orbit.cx, orbit.cy, orbit.rx, orbit.ry);
          const transform = `rotate(${orbit.rotate} ${orbit.cx} ${orbit.cy})`;

          return (
            <g className="lyven-orbits__orbit" transform={transform} key={path}>
              <path id={`lyven-orbit-${index + 1}`} d={path} />
              <circle className="lyven-orbits__moving-node" r={index === 2 ? 8 : 6.5} fill="url(#orbitNode)" filter="url(#nodeGlow)">
                <animateMotion
                  dur={orbit.duration}
                  begin={orbit.begin}
                  repeatCount="indefinite"
                  keyPoints={orbit.reverse ? "1;0" : "0;1"}
                  keyTimes="0;1"
                  calcMode="linear"
                >
                  <mpath href={`#lyven-orbit-${index + 1}`} />
                </animateMotion>
              </circle>
              <circle
                className="lyven-orbits__static-node"
                cx={orbit.cx - orbit.rx}
                cy={orbit.cy}
                r="7"
                fill="url(#orbitNode)"
                filter="url(#nodeGlow)"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
