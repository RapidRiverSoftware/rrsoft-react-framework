import React from 'react';

const Icon = ({ width, height, strokeWidth, stroke }) =>
  (<svg
    width={width}
    height={height}
    viewBox={`${-(width / 2) + 3.8} ${-(height / 2) + 3.8} ${width} ${height}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1.167.167l7.666 7.666M8.833.167L1.167 7.833" />
    </g>
  </svg>);

Icon.defaultProps = {
  width: 10,
  height: 8,
  stroke: '#FFFFFF',
  strokeWidth: 1,
};

export default Icon;
