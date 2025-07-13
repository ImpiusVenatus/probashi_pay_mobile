import * as React from "react";
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={64}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="#1E5B00"
        d="M32 64c17.673 0 32-14.327 32-32C64 14.327 49.673 0 32 0 14.327 0 0 14.327 0 32c0 17.673 14.327 32 32 32Z"
        style={{
          fill: "#1e5b00",
          // fill: "color(display-p3 .1176 .3569 0)",
          fillOpacity: 1,
        }}
      />
      <path
        fill="#F0263C"
        d="M32 48c8.837 0 16-7.163 16-16s-7.163-16-16-16-16 7.163-16 16 7.163 16 16 16Z"
        style={{
          fill: "#f0263c",
          // fill: "color(display-p3 .9412 .149 .2353)",
          fillOpacity: 1,
        }}
      />
    </g>
    <defs>
      <clipPath id="a">
        <path
          fill="#fff"
          d="M0 0h64v64H0z"
          style={{
            fill: "#fff",
            fillOpacity: 1,
          }}
        />
      </clipPath>
    </defs>
  </svg>
);
export default SvgComponent;
