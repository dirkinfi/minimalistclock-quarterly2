
import React from 'react';

interface ClockFaceProps {
  hourAngle: number;
  minuteAngle: number;
}

const ClockFace: React.FC<ClockFaceProps> = ({ hourAngle, minuteAngle }) => {
  const center = 100;
  const radius = 95;

  const numbers = [];
  for (let i = 1; i <= 12; i++) {
    const angle = (i * 30 - 90) * (Math.PI / 180); // -90 to start from top
    const x = center + Math.cos(angle) * (radius - 18);
    const y = center + Math.sin(angle) * (radius - 18);
    numbers.push(
      <text
        key={`num-${i}`}
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="15"
        fontFamily="sans-serif"
        fill="black"
      >
        {i}
      </text>
    );
  }

  const markers = [];
  for (let i = 0; i < 12; i++) {
    const angle = i * 30 * (Math.PI / 180);
    const x1 = center + Math.cos(angle) * (radius - 2);
    const y1 = center + Math.sin(angle) * (radius - 2);
    const x2 = center + Math.cos(angle) * (radius - 8);
    const y2 = center + Math.sin(angle) * (radius - 8);
    markers.push(
      <line
        key={`marker-${i}`}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        className="stroke-black"
        strokeWidth="2.5"
      />
    );
  }

  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%">
      {/* Clock Border */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        className="stroke-black fill-white"
        strokeWidth="3"
      />

      {/* Hour Markers */}
      {markers}
      
      {/* Numbers */}
      {numbers}

      {/* Hour Hand */}
      <line
        x1={center}
        y1={center}
        x2={center}
        y2={center - 50} // Length of the hour hand
        className="stroke-black"
        strokeWidth="5"
        strokeLinecap="round"
        transform={`rotate(${hourAngle}, ${center}, ${center})`}
      />
      
      {/* Minute Hand */}
      <line
        x1={center}
        y1={center}
        x2={center}
        y2={center - 80} // Length of the minute hand
        className="stroke-black"
        strokeWidth="3"
        strokeLinecap="round"
        transform={`rotate(${minuteAngle}, ${center}, ${center})`}
      />

      {/* Center dot */}
      <circle cx={center} cy={center} r="3" className="fill-black" />
    </svg>
  );
};

export default ClockFace;
