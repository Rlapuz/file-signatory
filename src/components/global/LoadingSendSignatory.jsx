import React from "react";

export const LoadingSendSignatory = () => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
        <div className="loader"></div>
        <div className="loader"></div>
      </div>
    </>
  );
};
