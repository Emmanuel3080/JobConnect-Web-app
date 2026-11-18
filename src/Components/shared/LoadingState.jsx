import React from "react";

/**
 * Loading placeholder.
 * - `fullScreen`: centred spinner on the Warm Sand canvas.
 * - otherwise: `count` pulsing skeleton blocks using `itemClassName`.
 */
const LoadingState = ({
  fullScreen = false,
  count = 3,
  className = "space-y-3",
  itemClassName = "h-20 rounded-xl",
}) => {
  if (fullScreen) {
    return (
      <div className="min-h-screen bg-[#F4F1EA] flex items-center justify-center" role="status">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#14243A] border-t-transparent" />
        <span className="sr-only">Loading</span>
      </div>
    );
  }

  return (
    <div className={className} role="status" aria-label="Loading">
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className={`bg-[#FFFCF6] border border-[#E5DED2] animate-pulse ${itemClassName}`}
        />
      ))}
    </div>
  );
};

export default LoadingState;
