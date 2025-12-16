import React, { useEffect, useState } from "react";

interface CircularProgressProps {
  value: number; // 0 to 100
  size?: number; // Size in pixels
  strokeWidth?: number; // Thickness of the circle
  children?: React.ReactNode; // Content inside the circle
  color?: string; // Optional custom color class
}

const CircularProgress = ({
  value,
  size = 120,
  strokeWidth = 10,
  children,
  color = "text-orange-500", // Default to your orange theme
}: CircularProgressProps) => {
  // 1. We start with the progress at 0 purely for the animation effect
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(value);
    }, 200);
    return () => clearTimeout(timer);
  }, [value]);

  // Calculate SVG parameters
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Ensure value is between 0 and 100
  const normalizedValue = Math.min(100, Math.max(0, progress));
  const offset = circumference - (normalizedValue / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* SVG Container */}
      <svg
        className="transform -rotate-90 w-full h-full"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background Circle (Gray) */}
        <circle
          className="text-gray-200"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />

        {/* Progress Circle (Orange/Primary) */}
        <circle
          className={`${color} transition-all ease-out`}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round" // Makes the ends rounded
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            transitionDuration: "1s",
            strokeDasharray: circumference,
            strokeDashoffset: offset,
          }}
        />
      </svg>

      {/* Inner Content (Children) */}
      <div className="absolute flex flex-col items-center justify-center text-center">
        {children}
      </div>
    </div>
  );
};

export default CircularProgress;
