import React from "react";

function Loader({ parentHeight = 200 }: { parentHeight: number }) {
  return (
    <div
      style={{ height: parentHeight }}
      className="flex justify-center items-center"
    >
      <div className="h-10 w-10 border-8 border-primary border-t-gray-300 rounded-full animate-spin"></div>
    </div>
  );
}

export default Loader;
