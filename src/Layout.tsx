import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="lg:max-w-[70%] lg:mx-auto lg:border-x-2 min-h-screen px-4 pt-4">
      {children}
    </div>
  );
};

export default Layout;
