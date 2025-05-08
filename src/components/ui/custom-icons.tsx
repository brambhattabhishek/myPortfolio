
import React from "react";

export const CodeChefIcon = ({ size = 24, color = "currentColor", className = "", ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M11.579 6.332c-4.127.033-10.514 1.659-10.61 7.72-.096 6.062 9.821 10.15 10.61 3.642.497-4.099-6.865-5.604-10.61-3.642" />
      <path d="M12.421 6.332c4.127.033 10.514 1.659 10.61 7.72.096 6.062-9.821 10.15-10.61 3.642-.497-4.099 6.865-5.604 10.61-3.642" />
      <path d="M9 2L9.9 4H14.1L15 2" />
    </svg>
  );
};
