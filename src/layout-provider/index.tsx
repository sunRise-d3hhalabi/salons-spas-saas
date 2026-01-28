"use client";
import { usePathname } from "next/navigation";
import React from "react";
import PrivateLayout from "./private-layout";
import PublicLayout from "./public-layout";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();

  const isPrivate =
    pathName.startsWith("/user") || pathName.startsWith("/salon-spa-owner");

  if (isPrivate) {
    return <PrivateLayout>{children}</PrivateLayout>;
  } else {
    return <PublicLayout>{children}</PublicLayout>;
  }
  return <div>LayoutProvider</div>;
}

export default LayoutProvider;
