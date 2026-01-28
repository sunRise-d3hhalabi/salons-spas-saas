import React from "react";

function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1>Header of PrivateLayout</h1>
      {children}
    </div>
  );
}

export default PrivateLayout;
